#!/usr/bin/env node

/**
 * Harbor Agent Ticket Tracker Integration
 *
 * This script automatically calls the Ticket Tracker API during agent execution
 * Usage: node ticketTrackerIntegration.js <command> <args>
 *
 * Commands:
 *   create <ticketData.json>   - Create a new ticket
 *   start <ticketId> <stage> <message>   - Start working on a ticket
 *   update <ticketId> <progress> <stage> <message> [fileChanges.json]  - Update progress
 *   complete <ticketId> <message> [fileChanges.json]  - Complete a ticket
 */

import fs from 'fs';
import path from 'path';
import http from 'http';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Make HTTP request to Ticket Tracker API
 */
function makeAPIRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
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
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`API Error ${res.statusCode}: ${parsed.error || responseData}`));
          }
        } catch (e) {
          resolve(responseData);
        }
      });
    });

    req.on('error', (error) => {
      // Don't fail - log error and continue
      console.error(`⚠️  API Request Failed: ${error.message}`);
      resolve(null); // Return null to allow continuation
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Create a new ticket
 */
async function createTicket(ticketData) {
  console.log(`🎫 Creating ticket: ${ticketData.id}`);

  try {
    const result = await makeAPIRequest('/tickets', 'POST', ticketData);

    if (result && result.success) {
      console.log(`✅ Ticket ${ticketData.id} created successfully`);
      return result.data;
    } else {
      console.log(`⚠️  Ticket creation skipped (API unavailable)`);
      return null;
    }
  } catch (error) {
    console.log(`⚠️  Ticket creation failed: ${error.message}`);
    return null;
  }
}

/**
 * Start working on a ticket
 */
async function startTicket(ticketId, stage = 'Development', message = null) {
  console.log(`🎯 Starting ticket: ${ticketId}`);

  try {
    const result = await makeAPIRequest('/harbor-agent/start', 'POST', {
      ticketId,
      stage,
      message: message || `Harbor Agent started working on ${ticketId}`
    });

    if (result && result.success) {
      console.log(`✅ Ticket ${ticketId} started successfully`);
      return result.data;
    } else {
      console.log(`⚠️  Ticket start skipped (API unavailable)`);
      return null;
    }
  } catch (error) {
    console.log(`⚠️  Ticket start failed: ${error.message}`);
    return null;
  }
}

/**
 * Update ticket progress
 */
async function updateProgress(ticketId, progress, stage = null, message = null, fileChanges = null) {
  console.log(`📈 Updating progress: ${ticketId} -> ${progress}%`);

  const requestBody = {
    progress,
    stage,
    message: message || `Progress updated to ${progress}%`
  };

  if (fileChanges) {
    requestBody.filesChanged = fileChanges.filesChanged || [];
    requestBody.summary = fileChanges.summary || null;
    if (fileChanges.filesChanged) {
      console.log(`📊 Including ${fileChanges.filesChanged.length} file changes`);
    }
  }

  try {
    const result = await makeAPIRequest(`/tickets/${ticketId}/progress`, 'PUT', requestBody);

    if (result && result.success) {
      console.log(`✅ Ticket ${ticketId} progress updated`);
      return result.data;
    } else {
      console.log(`⚠️  Progress update skipped (API unavailable)`);
      return null;
    }
  } catch (error) {
    console.log(`⚠️  Progress update failed: ${error.message}`);
    return null;
  }
}

/**
 * Complete a ticket
 */
async function completeTicket(ticketId, message = null, fileChanges = null) {
  console.log(`🎉 Completing ticket: ${ticketId}`);

  const requestBody = {
    ticketId,
    message: message || `Harbor Agent completed ${ticketId}`
  };

  if (fileChanges) {
    requestBody.filesChanged = fileChanges.filesChanged || [];
    requestBody.summary = fileChanges.summary || null;
    if (fileChanges.filesChanged) {
      console.log(`📊 Including ${fileChanges.filesChanged.length} file changes`);
    }
  }

  try {
    const result = await makeAPIRequest('/harbor-agent/complete', 'POST', requestBody);

    if (result && result.success) {
      console.log(`✅ Ticket ${ticketId} completed successfully`);
      return result.data;
    } else {
      console.log(`⚠️  Ticket completion skipped (API unavailable)`);
      return null;
    }
  } catch (error) {
    console.log(`⚠️  Ticket completion failed: ${error.message}`);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.error('Usage: node ticketTrackerIntegration.js <command> <args>');
    console.error('Commands: create, start, update, complete');
    process.exit(1);
  }

  try {
    switch (command) {
      case 'create':
        if (args.length < 2) {
          console.error('Usage: node ticketTrackerIntegration.js create <ticketData.json>');
          process.exit(1);
        }
        const ticketData = JSON.parse(fs.readFileSync(args[1], 'utf8'));
        await createTicket(ticketData);
        break;

      case 'start':
        if (args.length < 2) {
          console.error('Usage: node ticketTrackerIntegration.js start <ticketId> [stage] [message]');
          process.exit(1);
        }
        await startTicket(args[1], args[2], args[3]);
        break;

      case 'update':
        if (args.length < 4) {
          console.error('Usage: node ticketTrackerIntegration.js update <ticketId> <progress> <stage> <message> [fileChanges.json]');
          process.exit(1);
        }
        const progress = parseInt(args[2]);
        const fileChangesData = args[5] ? JSON.parse(fs.readFileSync(args[5], 'utf8')) : null;
        await updateProgress(args[1], progress, args[3], args[4], fileChangesData);
        break;

      case 'complete':
        if (args.length < 2) {
          console.error('Usage: node ticketTrackerIntegration.js complete <ticketId> [message] [fileChanges.json]');
          process.exit(1);
        }
        const completeFileChanges = args[3] ? JSON.parse(fs.readFileSync(args[3], 'utf8')) : null;
        await completeTicket(args[1], args[2], completeFileChanges);
        break;

      default:
        console.error(`Unknown command: ${command}`);
        console.error('Available commands: create, start, update, complete');
        process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`;

if (isMainModule) {
  main();
}

export {
  createTicket,
  startTicket,
  updateProgress,
  completeTicket
};
