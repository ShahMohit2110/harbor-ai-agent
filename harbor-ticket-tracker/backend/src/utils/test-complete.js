#!/usr/bin/env node

/**
 * Test Script: Complete Ticket
 * This simulates what the Harbor Agent should call when it completes work
 */

const API_BASE = 'http://localhost:3001/api';

async function completeTicket(ticketId) {
  console.log(`🎉 Testing completion for ticket: ${ticketId}`);

  try {
    const response = await fetch(`${API_BASE}/harbor-agent/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticketId,
        message: 'Harbor Agent completed all work successfully',
        filesChanged: [
          {
            path: 'harborJobSvc/routes/create-counter-offer.js',
            changeType: 'modified',
            additions: 25,
            deletions: 10,
            diff: 'diff --git a/routes/create-counter-offer.js b/routes/create-counter-offer.js\n...'
          }
        ],
        summary: {
          totalFiles: 1,
          additions: 25,
          deletions: 10
        }
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Ticket completed successfully!');
      console.log('Status: Completed');
      console.log('Stage: Deployment');
      console.log('Progress: 100%');
      console.log('');
      console.log('Check the ticket detail page to verify the status is updated.');
    } else {
      console.log('❌ Failed to complete ticket:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Get ticket ID from command line
const ticketId = process.argv[2] || 'TKT-137';

completeTicket(ticketId);
