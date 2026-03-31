#!/usr/bin/env node

/**
 * Harbor Agent API Integration Test
 *
 * This script tests if the Harbor Agent can successfully call the Ticket Tracker API
 *
 * Run: node test-agent-integration.js
 */

const API_BASE = 'http://localhost:3001/api';

async function callAPI(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error(`❌ API Error:`, error.message);
    return null;
  }
}

async function testIntegration() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║     🧪 Harbor Agent API Integration Test                      ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // Test 1: Check API Health
  console.log('📊 Test 1: Checking API Health...');
  const health = await callAPI('/health');
  if (health) {
    console.log('✅ API is healthy!');
    console.log(`   Tickets: ${health.data.ticketsCount}`);
    console.log(`   Activities: ${health.data.activitiesCount}\n`);
  } else {
    console.log('❌ API is not responding!');
    console.log('   Make sure the backend server is running:');
    console.log('   cd harbor-ticket-tracker/backend && npm run dev\n');
    return;
  }

  // Test 2: Create a Test Ticket
  console.log('🎫 Test 2: Creating test ticket...');
  const testTicketId = `TKT-TEST-${Date.now()}`;

  const createResult = await callAPI('/tickets', 'POST', {
    id: testTicketId,
    title: 'Harbor Agent Integration Test',
    description: 'Testing if Harbor Agent can create tickets via API',
    priority: 'High',
    assignedRepos: ['testRepo'],
    assignee: 'Harbor Agent',
    tags: ['test', 'integration']
  });

  if (createResult) {
    console.log('✅ Test ticket created!');
    console.log(`   ID: ${createResult.data.id}`);
    console.log(`   Title: ${createResult.data.title}\n`);
  } else {
    console.log('❌ Failed to create ticket!\n');
    return;
  }

  // Test 3: Start Working on Ticket
  console.log('🚀 Test 3: Simulating Harbor Agent starting work...');
  const startResult = await callAPI('/harbor-agent/start', 'POST', {
    ticketId: testTicketId,
    stage: 'Development',
    message: 'Harbor Agent started working on this ticket'
  });

  if (startResult) {
    console.log('✅ Agent started working!');
    console.log(`   Status: ${startResult.data.status}`);
    console.log(`   Stage: ${startResult.data.stage}\n`);
  } else {
    console.log('❌ Failed to start!\n');
    return;
  }

  // Wait 3 seconds
  console.log('⏳ Waiting 3 seconds (simulating work)...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Test 4: Update Progress
  console.log('📈 Test 4: Updating progress...');
  const progressResult = await callAPI(`/tickets/${testTicketId}/progress`, 'PUT', {
    progress: 50,
    stage: 'Development',
    message: 'Halfway done - implemented core feature'
  });

  if (progressResult) {
    console.log('✅ Progress updated!');
    console.log(`   Progress: ${progressResult.data.progress}%`);
    console.log(`   Message: ${progressResult.data.updatedAt}\n`);
  } else {
    console.log('❌ Failed to update progress!\n');
    return;
  }

  // Wait another 2 seconds
  console.log('⏳ Waiting 2 seconds (more work)...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test 5: Complete Ticket
  console.log('🎉 Test 5: Completing ticket...');
  const completeResult = await callAPI('/harbor-agent/complete', 'POST', {
    ticketId: testTicketId,
    message: 'Successfully completed integration test'
  });

  if (completeResult) {
    console.log('✅ Ticket completed!');
    console.log(`   Status: ${completeResult.data.status}`);
    console.log(`   Progress: ${completeResult.data.progress}%\n`);
  } else {
    console.log('❌ Failed to complete!\n');
    return;
  }

  // Final Check
  console.log('🔍 Final check: Fetching all tickets...');
  const tickets = await callAPI('/tickets');

  if (tickets) {
    console.log('✅ API is working perfectly!');
    console.log(`   Total tickets: ${tickets.data.length}`);
    console.log(`   Your test ticket: ${testTicketId}`);
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║     ✅ ALL TESTS PASSED!                                    ║');
    console.log('║                                                            ║');
    console.log('║     Check the UI: http://localhost:5173                    ║');
    console.log('║     You should see your test ticket!                        ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');
  }
}

// Run the test
testIntegration().catch(console.error);
