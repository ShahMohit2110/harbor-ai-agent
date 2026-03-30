#!/usr/bin/env node

/**
 * Harbor Agent Automatic Tracker v2.0
 *
 * ENHANCED VERSION - Auto-fetches all active Azure DevOps tickets on startup
 *
 * Features:
 * 1. Fetches ALL active tickets from Azure DevOps on startup
 * 2. Auto-creates them in the tracker
 * 3. Monitors commits and updates progress
 * 4. Keeps Azure DevOps and Tracker in sync
 *
 * Usage: node automatic-tracker-v2.js [start|stop|status|check|sync]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import http from 'http';
import https from 'https';

// Load .env file
function loadEnv() {
  const envPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../.env');

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      if (key && value && !key.startsWith('#')) {
        process.env[key.trim()] = value;
      }
    });
  }
}

loadEnv();

const API_BASE = 'http://localhost:3001/api';
const STATE_FILE = '/tmp/harbor-agent-tracker-state.json';
const LOG_FILE = '/tmp/harbor-agent-tracker.log';

// Configuration
const CONFIG = {
  checkInterval: 30000,      // Check every 30 seconds
  progressPerCommit: 15,     // Each commit = 15% progress
  maxProgress: 95,           // Max auto-progress (save 5% for manual)
  reposPath: process.env.HARBOR_REPOS_PATH || '/Users/mohitshah/Documents/HarborService',
  syncOnStartup: true,       // Fetch all active tickets on startup
  azure: {
    pat: process.env.AZURE_DEVOPS_PAT,
    org: process.env.AZURE_DEVOPS_ORG,
    project: process.env.AZURE_DEVOPS_PROJECT
  },
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
    // Step 1: Execute WIQL query
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

    // Step 2: Get work item IDs
    const workItemIds = queryResult.workItems.map(wi => wi.id);

    // Step 3: Batch fetch work item details
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

    // Step 4: Format tickets
    const formattedTickets = allTickets.map(task => {
      const fields = task.fields;
      const areaPath = fields['System.AreaPath'] || '';

      // Determine service repo from area path
      const repo = determineRepoFromAreaPath(areaPath);

      return {
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
        assignedRepos: repo ? [repo] : [],
        assignee: 'Harbor Agent',
        progress: 0,
        harborAgentActive: true
      };
    });

    log(`Retrieved details for ${formattedTickets.length} active tickets`, 'SUCCESS');
    return formattedTickets;

  } catch (error) {
    log(`Error fetching Azure DevOps tickets: ${error.message}`, 'ERROR');
    return [];
  }
}

/**
 * Determine repo from area path
 */
function determineRepoFromAreaPath(areaPath) {
  // Service mappings from .env
  const mappings = {
    'harborJobSvc': 'harborJobSvc',
    'harborUserSvc': 'harborUserSvc',
    'harborWebsite': 'harborWebsite'
  };

  // Check if any service name appears in the area path
  for (const [service, repo] of Object.entries(mappings)) {
    if (areaPath.includes(service)) {
      return repo;
    }
  }

  // Default: try to extract from area path
  const parts = areaPath.split('\\');
  for (const part of parts) {
    if (mappings[part]) {
      return mappings[part];
    }
  }

  return null;
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
    // Check if ticket exists
    const checkResult = await makeAPIRequest(`/tickets/${ticketData.id}`);

    if (checkResult.success) {
      // Ticket exists - update it
      log(`Ticket ${ticketData.id} already exists in tracker`, 'INFO');
      return true;
    } else {
      // Ticket doesn't exist - create it
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
        log(`Created ticket ${ticketData.id} - ${ticketData.title}`, 'SUCCESS');

        // Start the ticket
        await makeAPIRequest('/harbor-agent/start', 'POST', {
          ticketId: ticketData.id,
          stage: 'Planning',
          message: `Auto-synced from Azure DevOps - Ready to start`
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
  log('AZURE DEVOPS SYNC - Fetching all active tickets', 'INFO');
  log('═══════════════════════════════════════════════════════════', 'INFO');

  const azureTickets = await fetchActiveAzureDevOpsTickets();

  if (azureTickets.length === 0) {
    log('No active tickets to sync', 'WARNING');
    return {
      total: 0,
      created: 0,
      updated: 0,
      failed: 0
    };
  }

  log(`Found ${azureTickets.length} active tickets in Azure DevOps`, 'INFO');
  log('Syncing to tracker...', 'INFO');

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const ticket of azureTickets) {
    const success = await syncTicketToTracker(ticket);

    if (success) {
      const checkResult = await makeAPIRequest(`/tickets/${ticket.id}`);
      if (checkResult.success) {
        // Check if it was just created or already existed
        // For now, count all as synced
        created++;
      }
    } else {
      failed++;
    }
  }

  const summary = {
    total: azureTickets.length,
    created,
    updated,
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
 */
function getFileChanges(repoPath, sinceHash = null) {
  try {
    let cmd = 'git diff --stat HEAD~1 HEAD';
    if (sinceHash) {
      cmd = `git diff --stat ${sinceHash} HEAD`;
    }

    const output = execSync(cmd, {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    const lines = output.split('\n');
    const filesChanged = [];

    for (const line of lines) {
      const match = line.match(/(.*)\s+\|\s+(\d+)\s+([+-]+)/);
      if (match) {
        const [, filePath, changes, type] = match;
        const additions = (type.match(/\+/g) || []).length;
        const deletions = (type.match(/-/g) || []).length;

        filesChanged.push({
          path: filePath.trim(),
          changeType: 'modified',
          additions: additions,
          deletions: deletions,
          diff: ''
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
  } catch (error) {
    return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
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
        t.status !== 'Completed'
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

    if (fileChanges) {
      requestBody.filesChanged = fileChanges.filesChanged || [];
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
    log('No active ticket found', 'WARNING');
    return;
  }

  log(`Found active ticket: ${activeTicket.id}`, 'INFO');

  const repoName = activeTicket.assignedRepos && activeTicket.assignedRepos[0];
  if (!repoName) {
    log('No repo assigned to ticket', 'WARNING');
    return;
  }

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

      const stage = newProgress < 50 ? 'Development' : newProgress < 75 ? 'Testing' : 'Deployment';
      const success = await updateTicketProgress(
        activeTicket.id,
        newProgress,
        stage,
        `Auto-detected progress: ${newCommits} new commit(s), ${fileChanges.summary.totalFiles} file(s) changed`,
        fileChanges
      );

      if (success) {
        newState = {
          ...state,
          lastCommitHash: latestCommit,
          currentProgress: newProgress
        };

        saveState(newState);
      }
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

  log('Starting automatic tracking v2.0...', 'INFO');

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

  // Sync all active tickets from Azure DevOps
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

  console.log('\n📊 Harbor Agent Automatic Tracker v2.0 Status\n');
  console.log('━'.repeat(60));

  if (state.isRunning) {
    console.log(`Status: 🟢 Running`);
    console.log(`Version: 2.0 (with Azure DevOps sync)`);
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
      console.log('Usage: node automatic-tracker-v2.js [start|stop|status|check|sync]');
      console.log('');
      console.log('Commands:');
      console.log('  start   - Start automatic tracking with Azure DevOps sync');
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
