#!/usr/bin/env node

/**
 * Harbor Agent Automatic Tracker
 *
 * This script automatically tracks agent progress and updates the ticket tracker.
 * It monitors:
 * 1. Current active ticket
 * 2. Git commits and file changes
 * 3. Work progress
 * 4. Auto-completes tickets when work is done
 *
 * Usage: node automatic-tracker.js [start|stop|status|check]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import http from 'http';

const API_BASE = 'http://localhost:3001/api';
const STATE_FILE = '/tmp/harbor-agent-tracker-state.json';
const LOG_FILE = '/tmp/harbor-agent-tracker.log';

// Configuration
const CONFIG = {
  checkInterval: 30000,      // Check every 30 seconds
  progressPerCommit: 15,     // Each commit = 15% progress
  maxProgress: 95,           // Max auto-progress (save 5% for manual completion)
  reposPath: '/Users/mohitshah/Documents/HarborService',
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

  // Also print to console
  const colors = {
    INFO: '\x1b[36m',      // Cyan
    SUCCESS: '\x1b[32m',   // Green
    WARNING: '\x1b[33m',   // Yellow
    ERROR: '\x1b[31m'      // Red
  };
  const reset = '\x1b[0m';
  console.log(`${colors[level] || ''}${logMessage.trim()}${reset}`);
}

/**
 * Make HTTP request to API
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

      res.on('data', (chunk) => {
        responseData += chunk;
      });

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
    log(`Error getting commit count for ${repoPath}: ${error.message}`, 'ERROR');
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
    log(`Error getting latest commit for ${repoPath}: ${error.message}`, 'ERROR');
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

    // Parse the output to get file changes
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
          diff: ''  // Can add full diff if needed
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
    log(`Error getting file changes: ${error.message}`, 'ERROR');
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
      // Find ticket with harborAgentActive = true and status != 'Completed'
      const activeTicket = result.data.data.find(t =>
        t.harborAgentActive === true &&
        t.status !== 'Completed'
      );

      return activeTicket || null;
    }

    return null;
  } catch (error) {
    log(`Error getting active ticket: ${error.message || error}`, 'ERROR');
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
    } else {
      log(`Failed to update progress: ${result.error || 'Unknown error'}`, 'ERROR');
      return false;
    }
  } catch (error) {
    log(`Error updating progress: ${error.message}`, 'ERROR');
    return false;
  }
}

/**
 * Complete ticket
 */
async function completeTicket(ticketId, message) {
  try {
    const result = await makeAPIRequest('/harbor-agent/complete', 'POST', {
      ticketId,
      message
    });

    if (result.success) {
      log(`Completed ticket ${ticketId}`, 'SUCCESS');
      return true;
    } else {
      log(`Failed to complete ticket: ${result.error || 'Unknown error'}`, 'ERROR');
      return false;
    }
  } catch (error) {
    log(`Error completing ticket: ${error.message}`, 'ERROR');
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

  // Get active ticket
  const activeTicket = await getActiveTicket();

  if (!activeTicket) {
    log('No active ticket found', 'WARNING');

    // Clear state if no active ticket
    if (state.currentTicketId) {
      log(`Clearing state for previous ticket ${state.currentTicketId}`, 'INFO');
      saveState({
        ...state,
        currentTicketId: null,
        currentRepo: null,
        lastCommitHash: null,
        startCommitCount: 0,
        currentProgress: 0
      });
    }

    return;
  }

  log(`Found active ticket: ${activeTicket.id} - ${activeTicket.title}`, 'INFO');

  // Determine repo path from assignedRepos
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

  // Get current commit info
  const currentCommitCount = getCommitCount(repoPath);
  const latestCommit = getLatestCommit(repoPath);

  if (!latestCommit) {
    log('Could not get latest commit', 'ERROR');
    return;
  }

  // Initialize or update state
  let newState = { ...state };

  if (!state.currentTicketId || state.currentTicketId !== activeTicket.id) {
    // New ticket
    log(`Starting to track new ticket: ${activeTicket.id}`, 'INFO');

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

  // Check for new commits
  if (latestCommit !== state.lastCommitHash) {
    const newCommits = currentCommitCount - state.startCommitCount;

    if (newCommits > 0) {
      log(`Detected ${newCommits} new commit(s)`, 'INFO');

      // Calculate progress
      const progressIncrease = Math.min(newCommits * CONFIG.progressPerCommit, CONFIG.maxProgress - state.currentProgress);
      const newProgress = Math.min(state.currentProgress + progressIncrease, CONFIG.maxProgress);

      log(`Progress: ${state.currentProgress}% -> ${newProgress}%`, 'INFO');

      // Get file changes
      const fileChanges = getFileChanges(repoPath, state.lastCommitHash);

      log(`Files changed: ${fileChanges.summary.totalFiles} (+${fileChanges.summary.additions}, -${fileChanges.summary.deletions})`, 'INFO');

      // Update tracker
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
  } else {
    log('No new commits detected', 'INFO');
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

  log('Starting automatic tracking...', 'INFO');

  // Check if API is available
  const healthCheck = await makeAPIRequest('/health');
  if (!healthCheck.success) {
    log('Cannot connect to Ticket Tracker API. Make sure the backend is running.', 'ERROR');
    return;
  }

  log('Connected to Ticket Tracker API', 'SUCCESS');

  // Update state
  saveState({
    ...state,
    isRunning: true
  });

  log('Automatic tracking started', 'SUCCESS');
  log(`Checking for progress every ${CONFIG.checkInterval / 1000} seconds...`, 'INFO');

  // Start checking loop
  setInterval(checkProgress, CONFIG.checkInterval);

  // Check immediately
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

  console.log('\n📊 Harbor Agent Automatic Tracker Status\n');
  console.log('━'.repeat(60));

  if (state.isRunning) {
    console.log(`Status: 🟢 Running`);
    console.log(`Current Ticket: ${state.currentTicketId || 'None'}`);
    console.log(`Current Repo: ${state.currentRepo || 'None'}`);
    console.log(`Current Progress: ${state.currentProgress}%`);
    console.log(`Last Commit: ${state.lastCommitHash || 'None'}`);
  } else {
    console.log(`Status: 🔴 Stopped`);
  }

  console.log('━'.repeat(60));

  // Show active ticket
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
 * Check progress once (manual check)
 */
async function checkOnce() {
  log('Manual progress check...', 'INFO');
  await checkProgress();
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
      await checkOnce();
      break;

    default:
      console.log('Usage: node automatic-tracker.js [start|stop|status|check]');
      console.log('');
      console.log('Commands:');
      console.log('  start   - Start automatic tracking');
      console.log('  stop    - Stop automatic tracking');
      console.log('  status  - Show tracking status');
      console.log('  check   - Check for progress once');
      break;
  }
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`;

if (isMainModule) {
  main().catch(error => {
    log(`Fatal error: ${error.message}`, 'ERROR');
    process.exit(1);
  });
}

export {
  startTracking,
  stopTracking,
  checkProgress,
  showStatus
};
