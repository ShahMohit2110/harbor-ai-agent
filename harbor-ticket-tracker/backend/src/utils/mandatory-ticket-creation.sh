#!/bin/bash

# Harbor Agent Mandatory Ticket Creation
# This script MUST be executed immediately after fetching Azure DevOps task
# ✅ FIXED: Now checks if ticket already exists before creating
# Usage: ./mandatory-ticket-creation.sh <task-id> "<title>" "<description>" "<service>"

set -e  # Exit on error

if [ $# -lt 4 ]; then
  echo "❌ ERROR: Missing required arguments"
  echo "Usage: $0 <task-id> \"<title>\" \"<description>\" <service>"
  echo ""
  echo "Example:"
  echo "  $0 12345 \"Implement feature\" \"Add new feature\" harborUserSvc"
  exit 1
fi

TASK_ID="$1"
TITLE="$2"
DESCRIPTION="$3"
SERVICE="$4"
TICKET_ID="TKT-${TASK_ID}"

echo "🎯 MANDATORY TICKET CREATION - PHASE 0.0"
echo "======================================"
echo ""
echo "📋 Task Information:"
echo "  ID: $TASK_ID"
echo "  Ticket ID: $TICKET_ID"
echo "  Title: $TITLE"
echo "  Service: $SERVICE"
echo ""

# Change to integration script directory (dynamic path)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ✅ FIX 1: Check if ticket already exists
echo "🔍 Step 1: Checking if ticket already exists..."
if curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -q "\"id\":\"${TICKET_ID}\""; then
  echo "✅ Ticket ${TICKET_ID} ALREADY EXISTS - Skipping creation"
  echo ""
  echo "📊 Current ticket status:"
  curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -o '"status":"[^"]*"' | head -1
  curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -o '"progress":[^,]*' | head -1
  curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -o '"stage":"[^"]*"' | head -1
  echo ""

  # ✅ FIX 2: Only start ticket if it's not already in progress
  if curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -q '"status":"In Progress"\|"status":"Pending"'; then
    echo "▶️  Step 2: Starting existing ticket..."
    node ticketTrackerIntegration.js start "${TICKET_ID}" "Development" "Harbor AI Agent resumed working on ${TITLE}"
    echo ""
    echo "✅ TICKET ${TICKET_ID} STARTED/RESUMED"
  else
    echo "ℹ️  Ticket already in progress or completed - skipping start"
  fi

  echo ""
  echo "🎉 TICKET ALREADY EXISTS - REUSING EXISTING TICKET"
  echo "======================================"
  echo ""
  echo "✅ Ticket: ${TICKET_ID}"
  echo "✅ Reusing existing ticket - no duplicate created"
  echo ""
  echo "🟢 PROCEEDING TO PHASE 0: Documentation Gate"
  echo ""
  exit 0
fi

echo "❌ Ticket does not exist - creating new ticket"
echo ""

# Step 2: Create ticket data JSON
echo "📝 Step 2: Creating ticket data..."
cat > /tmp/ticket-data.json << EOF
{
  "id": "${TICKET_ID}",
  "title": "${TITLE}",
  "description": "${DESCRIPTION}",
  "priority": "High",
  "assignedRepos": ["${SERVICE}"],
  "assignee": "Harbor Agent",
  "tags": ["azure-devops", "automation"]
}
EOF

echo "✅ Ticket data created: /tmp/ticket-data.json"
echo ""

# Step 3: Create ticket
echo "🎫 Step 3: Creating ticket in tracker..."
node ticketTrackerIntegration.js create /tmp/ticket-data.json

# Verify creation
echo ""
echo "🔍 Step 4: Verifying ticket creation..."
if curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -q "\"id\":\"${TICKET_ID}\""; then
  echo "✅ TICKET ${TICKET_ID} CREATED SUCCESSFULLY"
else
  echo "❌ TICKET CREATION FAILED"
  exit 1
fi

echo ""

# Step 5: Start ticket
echo "▶️  Step 5: Starting ticket..."
node ticketTrackerIntegration.js start "${TICKET_ID}" "Development" "Harbor AI Agent started working on ${TITLE}"

# Verify started
echo ""
echo "🔍 Step 6: Verifying ticket started..."
if curl -s http://localhost:3001/api/tickets/${TICKET_ID} | grep -q '"status":"In Progress"'; then
  echo "✅ TICKET ${TICKET_ID} STARTED SUCCESSFULLY"
else
  echo "❌ TICKET START FAILED"
  exit 1
fi

echo ""
echo "🎉 MANDATORY TICKET CREATION COMPLETE"
echo "======================================"
echo ""
echo "✅ Ticket: ${TICKET_ID}"
echo "✅ Status: In Progress"
echo "✅ Stage: Development"
echo ""
echo "🟢 PROCEEDING TO PHASE 0: Documentation Gate"
echo ""
