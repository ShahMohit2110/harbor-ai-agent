#!/usr/bin/env node

/**
 * Test File Changes Capture
 *
 * This tests the automatic tracker's ability to capture file changes
 */

import { execSync } from 'child_process';

const API_BASE = 'http://localhost:3001/api';

async function testFileChanges() {
  console.log('🧪 Testing File Changes Capture\n');

  // 1. Check if backend is running
  try {
    await fetch(`${API_BASE}/tickets`);
    console.log('✅ Backend is running\n');
  } catch (error) {
    console.log('❌ Backend is not running. Please start it first:');
    console.log('   cd backend && npm run dev\n');
    return;
  }

  // 2. Get a ticket to test with
  const ticketsResponse = await fetch(`${API_BASE}/tickets`);
  const ticketsData = await ticketsResponse.json();
  const tickets = ticketsData.data;

  if (tickets.length === 0) {
    console.log('❌ No tickets found. Please sync from Azure DevOps first.');
    return;
  }

  const ticket = tickets[0];
  console.log(`📋 Testing with ticket: ${ticket.id}`);
  console.log(`   Title: ${ticket.title}\n`);

  // 3. Check if ticket has assigned repo
  if (!ticket.assignedRepos || ticket.assignedRepos.length === 0) {
    console.log('❌ Ticket has no assigned repos. Cannot test file changes.');
    return;
  }

  const repoName = ticket.assignedRepos[0];
  console.log(`📁 Assigned repo: ${repoName}\n`);

  // 4. Simulate file changes by updating the latest activity
  console.log('📝 Simulating file changes...');

  const testFileChanges = {
    filesChanged: [
      {
        path: `${repoName}/src/test-file.js`,
        changeType: 'modified',
        additions: 15,
        deletions: 5,
        diff: `diff --git a/src/test-file.js b/src/test-file.js
index 1234567..abcdefg 100644
--- a/src/test-file.js
+++ b/src/test-file.js
@@ -10,7 +10,7 @@
-  console.log('old code');
+  console.log('new code');
+  // Added this line
+  // And this one
 function test() {
   return true;
`
      }
    ],
    summary: {
      totalFiles: 1,
      additions: 15,
      deletions: 5
    }
  };

  try {
    const response = await fetch(`${API_BASE}/tickets/${ticket.id}/activities/latest/files`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testFileChanges)
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ File changes added to activity!\n');
      console.log('📊 Summary:');
      console.log(`   Files: ${testFileChanges.summary.totalFiles}`);
      console.log(`   Additions: +${testFileChanges.summary.additions}`);
      console.log(`   Deletions: -${testFileChanges.summary.deletions}\n`);
      console.log('🎯 Check the ticket detail page to see the file changes!');
    } else {
      console.log('❌ Failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testFileChanges();
