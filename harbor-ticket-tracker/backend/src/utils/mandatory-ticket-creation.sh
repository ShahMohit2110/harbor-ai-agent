#!/bin/bash

# Harbor Agent Mandatory Ticket Creation
# This script MUST be executed immediately after fetching Azure DevOps task
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

echo "🎯 MANDATORY TICKET CREATION - PHASE 0.0"
echo "======================================"
echo ""
echo "📋 Task Information:"
echo "  ID: $TASK_ID"
echo "  Title: $TITLE"
echo "  Service: $SERVICE"
echo ""

# Change to integration script directory
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils

# Step 1: Create ticket data JSON
echo "📝 Step 1: Creating ticket data..."
cat > /tmp/ticket-data.json << EOF
{
  "id": "TKT-${TASK_ID}",
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

# Step 2: Create ticket
echo "🎫 Step 2: Creating ticket in tracker..."
node ticketTrackerIntegration.js create /tmp/ticket-data.json

# Verify creation
echo ""
echo "🔍 Step 3: Verifying ticket creation..."
if curl -s http://localhost:3001/api/tickets/TKT-${TASK_ID} | grep -q "\"id\":\"TKT-${TASK_ID}\""; then
  echo "✅ TICKET TKT-${TASK_ID} CREATED SUCCESSFULLY"
else
  echo "❌ TICKET CREATION FAILED"
  exit 1
fi

echo ""

# Step 4: Start ticket
echo "▶️  Step 4: Starting ticket..."
node ticketTrackerIntegration.js start "TKT-${TASK_ID}" "Development" "Harbor AI Agent started working on ${TITLE}"

# Verify started
echo ""
echo "🔍 Step 5: Verifying ticket started..."
if curl -s http://localhost:3001/api/tickets/TKT-${TASK_ID} | grep -q '"status":"In Progress"'; then
  echo "✅ TICKET TKT-${TASK_ID} STARTED SUCCESSFULLY"
else
  echo "❌ TICKET START FAILED"
  exit 1
fi

echo ""
echo "🎉 MANDATORY TICKET CREATION COMPLETE"
echo "======================================"
echo ""
echo "✅ Ticket: TKT-${TASK_ID}"
echo "✅ Status: In Progress"
echo "✅ Stage: Development"
echo ""
echo "🟢 PROCEEDING TO PHASE 0: Documentation Gate"
echo ""
