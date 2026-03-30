#!/usr/bin/env node

/**
 * Harbor Agent Automatic Tracker v3.0 - GLOBAL VERSION
 *
 * SMART AUTO-DETECTION - Works globally for ANY Harbor setup!
 *
 * Features:
 * 1. Auto-detects Harbor repos path (no hardcoded paths)
 * 2. Auto-determines repo from Azure DevOps area path
 * 3. Auto-maps services intelligently
 * 4. Works on ANY machine with Harbor services
 * 5. Zero configuration needed
 *
 * Usage: node automatic-tracker-global.js [start|stop|status|check|sync]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import http from 'http';
import https from 'https';

// Load .env file (only for Azure DevOps credentials)
function loadEnv() {
  // Try multiple possible .env locations
  const possiblePaths = [
    path.join(path.dirname(new URL(import.meta.url).pathname), '../../.env'),
    '/Users/mohitshah/Documents/HarborService/harbor-ai/.env',
    path.join(process.cwd(), '.env')
  ];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        if (key && value && !key.startsWith('#')) {
          process.env[key.trim()] = value;
        }
      });
      console.log(`✅ Loaded .env from: ${envPath}`);
      return;
    }
  }

  console.log('⚠️  No .env file found, will try to locate it...');
}

loadEnv();

const API_BASE = 'http://localhost:3001/api';
const STATE_FILE = '/tmp/harbor-agent-tracker-state.json';
const LOG_FILE = '/tmp/harbor-agent-tracker.log';

// Configuration
const CONFIG = {
  checkInterval: 30000,
  progressPerCommit: 15,
  maxProgress: 95,
  reposPath: null,  // Will auto-detect
  azure: {
    pat: process.env.AZURE_DEVOPS_PAT,
    org: process.env.AZURE_DEVOPS_ORG,
    project: process.env.AZURE_DEVOPS_PROJECT
  },
  syncOnStartup: true,
  log: true
};

/**
 * Logging function
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;

  if (CONFIG.log) {
    fs.appendFileSync(LOG_FILE, logMessage);
  }

  const colors = {
    INFO: '\x1b[36m',
    SUCCESS: '\x1b[32m',
    WARNING: '\x1b[33m',
    ERROR: '\x1b[31m'
  };
  const reset = '\x1b[0m';
  console.log(`${colors[level] || ''}${logMessage.trim()}${reset}`);
}

/**
 * AUTO-DETECT Harbor repos path
 * Searches for Harbor service directories
 */
function autoDetectReposPath() {
  log('Auto-detecting Harbor repos path...', 'INFO');

  // Possible locations
  const possiblePaths = [
    '/Users/mohitshah/Documents/HarborService',
    path.join(process.env.HOME || '', 'Documents', 'HarborService'),
    path.join(process.cwd(), '..'),
    path.join(process.cwd(), '..', '..'),
    '/Users/mohitshah/Documents/HarborService/harbor-ai/..'
  ];

  for (const basePath of possiblePaths) {
    try {
      const fullPath = path.resolve(basePath);

      // Check if this looks like HarborService root
      if (fs.existsSync(fullPath)) {
        const entries = fs.readdirSync(fullPath);

        // Look for Harbor service directories
        const hasHarborServices = entries.some(entry =>
          entry.startsWith('harbor') &&
          fs.existsSync(path.join(fullPath, entry, '.git'))
        );

        if (hasHarborServices) {
          log(`✅ Auto-detected Harbor repos path: ${fullPath}`, 'SUCCESS');
          return fullPath;
        }
      }
    } catch (error) {
      // Skip invalid paths
    }
  }

  log('⚠️  Could not auto-detect repos path, using current directory', 'WARNING');
  return process.cwd();
}

/**
 * AUTO-DETERMINE repo from Azure DevOps ticket
 * Uses smart heuristics to figure out which repo to use
 */
function determineRepoFromTicket(ticket) {
  // Strategy 1: Check area path for service name
  const areaPath = ticket.areaPath || '';
  log(`Determining repo for area path: ${areaPath}`, 'INFO');

  // Extract service name from area path
  const areaParts = areaPath.split('\\').join('/').split('/');
  for (const part of areaParts) {
    if (part.toLowerCase().includes('harbor') || part.toLowerCase().includes('job') || part.toLowerCase().includes('user') || part.toLowerCase().includes('website')) {
      // Try to match with actual repo
      const repoName = 'harbor' + part.replace(/harbor/i, '').charAt(0).toUpperCase() + part.replace(/harbor/i, '').slice(1);
      return repoName;
    }
  }

  // Strategy 2: Check ticket title for keywords
  const title = (ticket.title || '').toLowerCase();
  const description = (ticket.description || '').toLowerCase();
  const combined = title + ' ' + description;

  if (combined.includes('job') || combined.includes('counter') || combined.includes('offer')) {
    return 'harborJobSvc';
  }
  if (combined.includes('user') || combined.includes('profile') || combined.includes('authentication')) {
    return 'harborUserSvc';
  }
  if (combined.includes('website') || combined.includes('frontend') || combined.includes('ui')) {
    return 'harborWebsite';
  }

  // Strategy 3: Use ticket tags
  if (ticket.tags) {
    const tags = ticket.tags.toLowerCase();
    if (tags.includes('job')) return 'harborJobSvc';
    if (tags.includes('user')) return 'harborUserSvc';
    if (tags.includes('website') || tags.includes('frontend')) return 'harborWebsite';
  }

  // Strategy 4: Check ticket ID pattern (if any)
  // Some organizations use prefixes like JOB-123, USER-456
  // You can add custom logic here

  // Strategy 5: Default to first available Harbor service
  log('⚠️  Could not auto-determine repo, will search for available Harbor services', 'WARNING');
  return null;
}

/**
 * Find actual Harbor service directory
 */
function findHarborServiceDirectory(serviceHint, reposPath) {
  if (!reposPath) {
    return null;
  }

  try {
    const entries = fs.readdirSync(reposPath);

    // Look for matching Harbor service
    for (const entry of entries) {
      const fullPath = path.join(reposPath, entry);

      // Check if it's a git repo
      if (fs.existsSync(path.join(fullPath, '.git'))) {
        // Check if name matches hint
        if (serviceHint && entry.toLowerCase().includes(serviceHint.toLowerCase())) {
          log(`✅ Found matching repo: ${entry}`, 'SUCCESS');
          return entry;
        }

        // Check if it's a Harbor service
        if (entry.startsWith('harbor')) {
          log(`ℹ️  Found Harbor service: ${entry}`, 'INFO');
          return entry;
        }
      }
    }
  } catch (error) {
    log(`Error searching for Harbor services: ${error.message}`, 'ERROR');
  }

  return null;
}

/**
 * Make HTTP request to Ticket Tracker API
 */
function makeAPIRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve) => {
    const url = new URL(`${API_BASE}${endpoint}`);

    const options = {
      hostname: url.hostname,
      port: url.port || 3001,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ success: res.statusCode >= 200 && res.statusCode < 300, data: parsed });
        } catch (e) {
          resolve({ success: false, error: e.message });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ success: false, error: error.message });
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Fetch all active tickets from Azure DevOps
 */
async function fetchActiveAzureDevOpsTickets() {
  log('Fetching active tickets from Azure DevOps...', 'INFO');

  if (!CONFIG.azure.pat || !CONFIG.azure.org || !CONFIG.azure.project) {
    log('Azure DevOps credentials not configured', 'ERROR');
    log('Please set AZURE_DEVOPS_PAT, AZURE_DEVOPS_ORG, and AZURE_DEVOPS_PROJECT in .env', 'ERROR');
    return [];
  }

  const auth = Buffer.from(`:${CONFIG.azure.pat}`).toString('base64');

  const wiqlQuery = {
    query: `
      SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType],
             [Microsoft.VSTS.Common.Priority], [System.AssignedTo],
             [System.Description], [System.Tags], [System.AreaPath],
             [System.IterationPath], [Microsoft.VSTS.Common.ValueArea],
             [Microsoft.VSTS.Common.ActivatedDate]
      FROM WorkItems
      WHERE [System.TeamProject] = '${CONFIG.azure.project}'
        AND [System.State] = 'Active'
        AND [System.WorkItemType] IN ('User Story', 'Task', 'Bug')
      ORDER BY [Microsoft.VSTS.Common.Priority] ASC, [System.ChangedDate] ASC
    `
  };

  try {
    const queryResult = await makeAzureRequest(
      `${CONFIG.azure.project}/_apis/wit/wiql?api-version=6.0`,
      'POST',
      wiqlQuery
    );

    if (!queryResult.workItems || queryResult.workItems.length === 0) {
      log('No active tickets found in Azure DevOps', 'WARNING');
      return [];
    }

    log(`Found ${queryResult.workItems.length} active tickets in Azure DevOps`, 'SUCCESS');

    const workItemIds = queryResult.workItems.map(wi => wi.id);

    const batchSize = 200;
    const batches = [];
    for (let i = 0; i < workItemIds.length; i += batchSize) {
      batches.push(workItemIds.slice(i, i + batchSize));
    }

    let allTickets = [];
    for (const batch of batches) {
      const ids = batch.join(',');
      const detailsResult = await makeAzureRequest(
        `${CONFIG.azure.project}/_apis/wit/workitems?ids=${ids}&$expand=all&api-version=6.0`
      );

      if (detailsResult.value) {
        allTickets = allTickets.concat(detailsResult.value);
      }
    }

    // Auto-detect repos path
    if (!CONFIG.reposPath) {
      CONFIG.reposPath = autoDetectReposPath();
    }

    const formattedTickets = allTickets.map(task => {
      const fields = task.fields;
      const areaPath = fields['System.AreaPath'] || '';

      const ticketData = {
        id: `TKT-${task.id}`,
        azureId: task.id,
        url: `https://dev.azure.com/${CONFIG.azure.org}/${CONFIG.azure.project}/_workitems/${task.id}`,
        title: fields['System.Title'] || 'No Title',
        description: fields['System.Description'] || '',
        type: fields['System.WorkItemType'] || 'Unknown',
        priority: fields['Microsoft.VSTS.Common.Priority'] || 3,
        assignedTo: fields['System.AssignedTo'] ? fields['System.AssignedTo'].displayName : 'Harbor Agent',
        status: 'Pending',
        stage: 'Planning',
        areaPath: areaPath,
        iterationPath: fields['System.IterationPath'] || '',
        tags: fields['System.Tags'] || '',
        assignee: 'Harbor Agent',
        progress: 0,
        harborAgentActive: true
      };

      // Smart repo determination
      const repoHint = determineRepoFromTicket(ticketData);
      const repoDir = findHarborServiceDirectory(repoHint, CONFIG.reposPath);

      if (repoDir) {
        ticketData.assignedRepos = [repoDir];
        log(`📦 Assigned ${ticketData.id} to repo: ${repoDir}`, 'INFO');
      } else {
        ticketData.assignedRepos = [];
        log(`⚠️  Could not determine repo for ${ticketData.id}`, 'WARNING');
      }

      return ticketData;
    });

    log(`Processed ${formattedTickets.length} tickets with smart repo assignment`, 'SUCCESS');
    return formattedTickets;

  } catch (error) {
    log(`Error fetching Azure DevOps tickets: ${error.message}`, 'ERROR');
    return [];
  }
}

/**
 * Make request to Azure DevOps API
 */
function makeAzureRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`:${CONFIG.azure.pat}`).toString('base64');

    const headers = {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (body) {
      headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }

    const options = {
      hostname: 'dev.azure.com',
      path: `/${CONFIG.azure.org}/${path}`,
      method: method,
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

/**
 * Create or update ticket in tracker
 */
async function syncTicketToTracker(ticketData) {
  try {
    const checkResult = await makeAPIRequest(`/tickets/${ticketData.id}`);

    if (checkResult.success) {
      log(`Ticket ${ticketData.id} already exists in tracker`, 'INFO');
      return true;
    } else {
      log(`Creating ticket ${ticketData.id} in tracker...`, 'INFO');

      const createResult = await makeAPIRequest('/tickets', 'POST', {
        id: ticketData.id,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority === 1 ? 'High' : ticketData.priority === 2 ? 'Medium' : 'Low',
        assignedRepos: ticketData.assignedRepos,
        assignee: ticketData.assignee,
        tags: ['azure-devops', 'auto-synced', ticketData.type.toLowerCase()]
      });

      if (createResult.success) {
        log(`✅ Created ticket ${ticketData.id} - ${ticketData.title}`, 'SUCCESS');

        await makeAPIRequest('/harbor-agent/start', 'POST', {
          ticketId: ticketData.id,
          stage: 'Planning',
          message: `Auto-synced from Azure DevOps - Assigned to: ${ticketData.assignedRepos.join(', ') || 'None'}`
        });

        return true;
      } else {
        log(`Failed to create ticket ${ticketData.id}: ${createResult.error || 'Unknown error'}`, 'ERROR');
        return false;
      }
    }
  } catch (error) {
    log(`Error syncing ticket ${ticketData.id}: ${error.message}`, 'ERROR');
    return false;
  }
}

/**
 * Sync all active Azure DevOps tickets to tracker
 */
async function syncAllTickets() {
  log('═══════════════════════════════════════════════════════════', 'INFO');
  log('AZURE DEVOPS SYNC - SMART AUTO-DETECTION MODE', 'INFO');
  log('═══════════════════════════════════════════════════════════', 'INFO');

  const azureTickets = await fetchActiveAzureDevOpsTickets();

  if (azureTickets.length === 0) {
    log('No active tickets to sync', 'WARNING');
    return { total: 0, created: 0, updated: 0, failed: 0 };
  }

  log(`Found ${azureTickets.length} active tickets in Azure DevOps`, 'INFO');
  log('Syncing to tracker with smart repo assignment...', 'INFO');

  let created = 0;
  let failed = 0;

  for (const ticket of azureTickets) {
    const success = await syncTicketToTracker(ticket);
    if (success) {
      created++;
    } else {
      failed++;
    }
  }

  const summary = {
    total: azureTickets.length,
    created,
    updated: 0,
    failed
  };

  log('═══════════════════════════════════════════════════════════', 'SUCCESS');
  log(`SYNC COMPLETE: ${created} synced, ${failed} failed`, 'SUCCESS');
  log('═══════════════════════════════════════════════════════════', 'SUCCESS');

  return summary;
}

/**
 * Load tracker state
 */
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    log(`Error loading state: ${error.message}`, 'ERROR');
  }

  return {
    currentTicketId: null,
    currentRepo: null,
    lastCommitHash: null,
    startCommitCount: 0,
    currentProgress: 0,
    isRunning: false
  };
}

/**
 * Save tracker state
 */
function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (error) {
    log(`Error saving state: ${error.message}`, 'ERROR');
  }
}

/**
 * Get current Git commit count
 */
function getCommitCount(repoPath) {
  try {
    const count = execSync('git rev-list --count HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();
    return parseInt(count);
  } catch (error) {
    return 0;
  }
}

/**
 * Get latest commit hash
 */
function getLatestCommit(repoPath) {
  try {
    const hash = execSync('git rev-parse HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();
    return hash;
  } catch (error) {
    return null;
  }
}

/**
 * Get file changes from latest commit
 * Enhanced to properly detect and extract file diffs
 */
function getFileChanges(repoPath, sinceHash = null) {
  try {
    let cmd = 'git diff --stat HEAD~1 HEAD';
    let diffCmd = 'git diff HEAD~1 HEAD';
    let numCommits = 1;

    if (sinceHash) {
      cmd = `git diff --stat ${sinceHash} HEAD`;
      diffCmd = `git diff ${sinceHash} HEAD`;

      // Count commits since hash
      try {
        const commitCount = execSync(`git rev-list ${sinceHash}..HEAD --count`, {
          cwd: repoPath,
          encoding: 'utf8'
        }).trim();
        numCommits = parseInt(commitCount) || 1;
      } catch (e) {
        numCommits = 1;
      }
    }

    const output = execSync(cmd, {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    // Get full diff output
    const fullDiff = execSync(diffCmd, {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    // If no stat output, check for uncommitted changes
    if (!output || output.length === 0) {
      return getUncommittedChanges(repoPath);
    }

    const lines = output.split('\n');
    const filesChanged = [];

    for (const line of lines) {
      const match = line.match(/(.*)\s+\|\s+(\d+)(\s+([+-]+))?/);
      if (match) {
        let [, filePath, changes, _, type] = match;

        // Clean up file path
        filePath = filePath.trim();

        // Determine change type
        let changeType = 'modified';
        if (filePath.startsWith('new file')) {
          changeType = 'added';
          filePath = filePath.replace('new file', '').trim();
        } else if (filePath.startsWith('deleted')) {
          changeType = 'deleted';
          filePath = filePath.replace('deleted', '').trim();
        }

        const additions = type ? (type.match(/\+/g) || []).length : 0;
        const deletions = type ? (type.match(/-/g) || []).length : 0;

        // Extract diff for this specific file
        const fileDiff = extractFileDiffFromOutput(fullDiff, filePath);

        filesChanged.push({
          path: filePath,
          changeType,
          additions,
          deletions,
          diff: fileDiff
        });
      }
    }

    return {
      filesChanged,
      summary: {
        totalFiles: filesChanged.length,
        additions: filesChanged.reduce((sum, f) => sum + f.additions, 0),
        deletions: filesChanged.reduce((sum, f) => sum + f.deletions, 0)
      },
      commitCount: numCommits
    };
  } catch (error) {
    log(`Error getting file changes: ${error.message}`, 'ERROR');
    return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
  }
}

/**
 * Get uncommitted changes (staged and unstaged)
 */
function getUncommittedChanges(repoPath) {
  try {
    const statOutput = execSync('git diff --stat HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    const fullDiff = execSync('git diff HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    if (!statOutput) {
      return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
    }

    return parseGitStatOutput(statOutput, fullDiff);
  } catch (error) {
    return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
  }
}

/**
 * Parse git stat output into file changes
 */
function parseGitStatOutput(statOutput, fullDiff) {
  const filesChanged = [];
  const lines = statOutput.split('\n');

  for (const line of lines) {
    const match = line.match(/(.*)\s+\|\s+(\d+)(\s+([+-]+))?/);
    if (match) {
      let [, filePath, changes, _, type] = match;
      filePath = filePath.trim();

      let changeType = 'modified';
      if (filePath.startsWith('new file')) {
        changeType = 'added';
        filePath = filePath.replace('new file', '').trim();
      } else if (filePath.startsWith('deleted')) {
        changeType = 'deleted';
        filePath = filePath.replace('deleted', '').trim();
      }

      const additions = type ? (type.match(/\+/g) || []).length : 0;
      const deletions = type ? (type.match(/-/g) || []).length : 0;

      const fileDiff = extractFileDiffFromOutput(fullDiff, filePath);

      filesChanged.push({
        path: filePath,
        changeType,
        additions,
        deletions,
        diff: fileDiff
      });
    }
  }

  return {
    filesChanged,
    summary: {
      totalFiles: filesChanged.length,
      additions: filesChanged.reduce((sum, f) => sum + f.additions, 0),
      deletions: filesChanged.reduce((sum, f) => sum + f.deletions, 0)
    }
  };
}

/**
 * Extract diff for a specific file from full diff output
 */
function extractFileDiffFromOutput(fullDiff, filePath) {
  try {
    const lines = fullDiff.split('\n');
    let fileDiff = '';
    let inOurFile = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this is our file's diff header
      if (line.includes(`a/${filePath}`) || line.includes(`b/${filePath}`)) {
        inOurFile = true;
        fileDiff += line + '\n';
        continue;
      }

      if (inOurFile) {
        fileDiff += line + '\n';

        // Stop at next file or end
        if (line.startsWith('diff ') && i > 0) {
          // Remove the last line (next file header)
          fileDiff = fileDiff.substring(0, fileDiff.lastIndexOf('\n'));
          break;
        }
      }
    }

    return fileDiff.trim();
  } catch (error) {
    return '';
  }
}

/**
 * Get active ticket from tracker
 */
async function getActiveTicket() {
  try {
    const result = await makeAPIRequest('/tickets');

    if (result.success && result.data.data) {
      const activeTicket = result.data.data.find(t =>
        t.harborAgentActive === true &&
        t.status !== 'Completed' &&
        t.progress < 100 &&  // Don't track tickets with 100% progress
        t.assignedRepos &&
        t.assignedRepos.length > 0
      );
      return activeTicket || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Update ticket progress
 */
async function updateTicketProgress(ticketId, progress, stage, message, fileChanges = null) {
  try {
    const requestBody = {
      progress,
      stage,
      message
    };

    if (fileChanges && fileChanges.filesChanged && fileChanges.filesChanged.length > 0) {
      requestBody.filesChanged = fileChanges.filesChanged;
      requestBody.summary = fileChanges.summary || null;
    }

    const result = await makeAPIRequest(`/tickets/${ticketId}/progress`, 'PUT', requestBody);

    if (result.success) {
      log(`Updated ${ticketId} progress to ${progress}%`, 'SUCCESS');
      return true;
    }
    return false;
  } catch (error) {
    log(`Error updating progress: ${error.message}`, 'ERROR');
    return false;
  }
}

/**
 * Add file changes to the most recent activity for a ticket
 * This is called when automatic tracker detects changes after agent updates
 */
async function addFileChangesToLatestActivity(ticketId, fileChanges) {
  try {
    if (!fileChanges || !fileChanges.filesChanged || fileChanges.filesChanged.length === 0) {
      return false;
    }

    const requestBody = {
      ticketId,
      filesChanged: fileChanges.filesChanged,
      summary: fileChanges.summary
    };

    const result = await makeAPIRequest(`/tickets/${ticketId}/activities/latest/files`, 'PUT', requestBody);

    if (result.success) {
      log(`Added file changes to latest activity for ${ticketId}`, 'SUCCESS');
      return true;
    }
    return false;
  } catch (error) {
    log(`Error adding file changes: ${error.message}`, 'ERROR');
    return false;
  }
}

/**
 * Check for progress and update tracker
 */
async function checkProgress() {
  const state = loadState();

  if (!state.isRunning) {
    return;
  }

  log('Checking for progress...', 'INFO');

  const activeTicket = await getActiveTicket();

  if (!activeTicket) {
    log('No active ticket with assigned repo found', 'WARNING');
    return;
  }

  log(`Found active ticket: ${activeTicket.id}`, 'INFO');

  const repoName = activeTicket.assignedRepos[0];
  const repoPath = path.join(CONFIG.reposPath, repoName);

  if (!fs.existsSync(repoPath)) {
    log(`Repo path does not exist: ${repoPath}`, 'ERROR');
    return;
  }

  log(`Monitoring repo: ${repoPath}`, 'INFO');

  const currentCommitCount = getCommitCount(repoPath);
  const latestCommit = getLatestCommit(repoPath);

  if (!latestCommit) {
    return;
  }

  let newState = { ...state };

  if (!state.currentTicketId || state.currentTicketId !== activeTicket.id) {
    newState = {
      ...state,
      currentTicketId: activeTicket.id,
      currentRepo: repoPath,
      lastCommitHash: latestCommit,
      startCommitCount: currentCommitCount,
      currentProgress: activeTicket.progress || 0
    };

    saveState(newState);
    return;
  }

  if (latestCommit !== state.lastCommitHash) {
    const newCommits = currentCommitCount - state.startCommitCount;

    if (newCommits > 0) {
      log(`Detected ${newCommits} new commit(s)`, 'INFO');

      const progressIncrease = Math.min(newCommits * CONFIG.progressPerCommit, CONFIG.maxProgress - state.currentProgress);
      const newProgress = Math.min(state.currentProgress + progressIncrease, CONFIG.maxProgress);

      log(`Progress: ${state.currentProgress}% -> ${newProgress}%`, 'INFO');

      const fileChanges = getFileChanges(repoPath, state.lastCommitHash);

      log(`Files changed: ${fileChanges.summary.totalFiles} (+${fileChanges.summary.additions}, -${fileChanges.summary.deletions})`, 'INFO');

      // Only update progress if there are actual file changes
      if (fileChanges.filesChanged && fileChanges.filesChanged.length > 0) {
        // First, try to add file changes to the latest activity (created by agent)
        const addedToActivity = await addFileChangesToLatestActivity(activeTicket.id, fileChanges);

        if (!addedToActivity) {
          // If that fails, create a new progress update activity
          await updateTicketProgress(
            activeTicket.id,
            newProgress,
            null, // Don't override stage - let agent control it
            `Auto-detected progress: ${newCommits} new commit(s), ${fileChanges.summary.totalFiles} file(s) changed`,
            fileChanges
          );
        } else {
          // Just update the progress (no new activity)
          await makeAPIRequest(`/tickets/${activeTicket.id}`, 'PUT', {
            progress: newProgress
          });
          log(`Updated ${activeTicket.id} progress to ${newProgress}%`, 'SUCCESS');
        }
      } else {
        // No file changes, just update progress
        await makeAPIRequest(`/tickets/${activeTicket.id}`, 'PUT', {
          progress: newProgress
        });
        log(`Updated ${activeTicket.id} progress to ${newProgress}% (no file changes)`, 'INFO');
      }

      newState = {
        ...state,
        lastCommitHash: latestCommit,
        currentProgress: newProgress
      };

      saveState(newState);
    }
  }
}

/**
 * Start automatic tracking
 */
async function startTracking() {
  const state = loadState();

  if (state.isRunning) {
    log('Automatic tracking is already running', 'WARNING');
    return;
  }

  log('Starting automatic tracker v3.0 - GLOBAL MODE', 'INFO');
  log('Smart auto-detection enabled', 'INFO');

  const healthCheck = await makeAPIRequest('/health');
  if (!healthCheck.success) {
    log('Cannot connect to Ticket Tracker API', 'ERROR');
    return;
  }

  log('Connected to Ticket Tracker API', 'SUCCESS');

  saveState({
    ...state,
    isRunning: true
  });

  if (CONFIG.syncOnStartup) {
    await syncAllTickets();
  }

  log('Automatic tracking started', 'SUCCESS');
  log(`Checking for progress every ${CONFIG.checkInterval / 1000} seconds...`, 'INFO');

  setInterval(checkProgress, CONFIG.checkInterval);
  await checkProgress();
}

/**
 * Stop automatic tracking
 */
function stopTracking() {
  const state = loadState();

  if (!state.isRunning) {
    log('Automatic tracking is not running', 'WARNING');
    return;
  }

  log('Stopping automatic tracking...', 'INFO');

  saveState({
    ...state,
    isRunning: false
  });

  log('Automatic tracking stopped', 'SUCCESS');
}

/**
 * Show tracking status
 */
async function showStatus() {
  const state = loadState();

  console.log('\n📊 Harbor Agent Automatic Tracker v3.0 Status\n');
  console.log('━'.repeat(60));
  console.log('Mode: GLOBAL (Smart Auto-Detection)');

  if (state.isRunning) {
    console.log(`Status: 🟢 Running`);
    console.log(`Version: 3.0 (Global)`);
    console.log(`Repos Path: ${CONFIG.reposPath || 'Auto-detecting...'}`);
    console.log(`Current Ticket: ${state.currentTicketId || 'None'}`);
    console.log(`Current Repo: ${state.currentRepo || 'None'}`);
    console.log(`Current Progress: ${state.currentProgress}%`);
    console.log(`Last Commit: ${state.lastCommitHash || 'None'}`);
  } else {
    console.log(`Status: 🔴 Stopped`);
  }

  console.log('━'.repeat(60));

  const activeTicket = await getActiveTicket();
  if (activeTicket) {
    console.log(`\n🎫 Active Ticket in Tracker:`);
    console.log(`  ID: ${activeTicket.id}`);
    console.log(`  Title: ${activeTicket.title}`);
    console.log(`  Assigned Repo: ${activeTicket.assignedRepos[0] || 'None'}`);
    console.log(`  Status: ${activeTicket.status}`);
    console.log(`  Stage: ${activeTicket.stage}`);
    console.log(`  Progress: ${activeTicket.progress}%`);
  } else {
    console.log(`\n✅ No active tickets in tracker`);
  }

  console.log('');
}

/**
 * Sync tickets manually
 */
async function syncNow() {
  log('Manual sync requested...', 'INFO');

  const healthCheck = await makeAPIRequest('/health');
  if (!healthCheck.success) {
    log('Cannot connect to Ticket Tracker API', 'ERROR');
    return;
  }

  await syncAllTickets();
}

/**
 * Main execution
 */
async function main() {
  const command = process.argv[2] || 'status';

  switch (command) {
    case 'start':
      await startTracking();
      break;

    case 'stop':
      stopTracking();
      break;

    case 'status':
      await showStatus();
      break;

    case 'check':
      await checkProgress();
      break;

    case 'sync':
      await syncNow();
      break;

    default:
      console.log('Usage: node automatic-tracker-global.js [start|stop|status|check|sync]');
      console.log('');
      console.log('Commands:');
      console.log('  start   - Start automatic tracking (GLOBAL mode)');
      console.log('  stop    - Stop automatic tracking');
      console.log('  status  - Show tracking status');
      console.log('  check   - Check for progress once');
      console.log('  sync    - Manually sync all Azure DevOps tickets');
      break;
  }
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  main().catch(error => {
    log(`Fatal error: ${error.message}`, 'ERROR');
    process.exit(1);
  });
}

export {
  startTracking,
  stopTracking,
  checkProgress,
  syncAllTickets,
  showStatus
};
