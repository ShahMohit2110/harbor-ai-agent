# Azure DevOps Integration - Ticket Update Tool

**Tool Version:** 1.0.0
**Last Updated:** 2026-03-08
**Purpose:** Define how Harbor AI agent updates Azure DevOps work items to "Closed" status after PR creation

---

## Table of Contents

1. [Purpose](#purpose)
2. [Prerequisites](#prerequisites)
3. [API Endpoints](#api-endpoints)
4. [Implementation Steps](#implementation-steps)
5. [Retry Logic](#retry-logic)
6. [Error Handling](#error-handling)
7. [Example Commands](#example-commands)

---

## Purpose

This tool defines the process for updating Azure DevOps work items to "Closed" status after successfully creating a Pull Request. This is the **final mandatory step** in the Harbor AI development workflow.

**Critical Rules:**
- ✅ Ticket update MUST execute after PR creation
- ✅ Ticket update MUST NOT be skipped
- ✅ If update fails, retry up to 3 times
- ✅ Only report task completion after ticket is closed

---

## Prerequisites

### Required Environment Variables

```bash
AZURE_DEVOPS_PAT="your-personal-access-token"
AZURE_DEVOPS_ORG="HarborApp"
AZURE_DEVOPS_PROJECT="Harbor"
```

### Required Information

- **Ticket ID:** Extracted from branch name (format: `feature/<ticket-id>-description`)
- **PR URL:** From successful PR creation
- **Branch Name:** Current feature branch
- **Implementation Summary:** Brief description of changes

---

## API Endpoints

### Update Work Item State

**Endpoint:** `PATCH https://dev.azure.com/{org}/{project}/_apis/wit/workitems/{id}?api-version=6.0`

**Request Headers:**
```
Content-Type: application/json-patch+json
Authorization: Basic BASE64(:{PAT})
```

**Request Body:**
```json
[
  {
    "op": "add",
    "path": "/fields/System.State",
    "value": "Closed"
  },
  {
    "op": "add",
    "path": "/fields/System.Reason",
    "value": "Completed"
  }
]
```

### Add Comment to Work Item

**Endpoint:** `POST https://dev.azure.com/{org}/{project}/_apis/wit/workitems/{id}/comments?api-version=6.0`

**Request Headers:**
```
Content-Type: application/json
Authorization: Basic BASE64(:{PAT})
```

**Request Body:**
```json
{
  "text": "Pull Request created: {pr-url}\n\nBranch: {branch-name}\n\nSummary: {implementation-summary}"
}
```

---

## Implementation Steps

### Step 1: Extract Ticket ID

**From Branch Name:**
```bash
# Current branch format: feature/12345-add-user-filter
TICKET_ID=$(git branch --show-current | sed 's/feature\///' | sed 's/-.*//')
echo "Extracted Ticket ID: $TICKET_ID"
```

**Validation:**
- Verify TICKET_ID is numeric
- Verify TICKET_ID matches current task
- If extraction fails, use manual task ID

### Step 2: Prepare Update Payload

**Create JSON Patch:**
```bash
cat > /tmp/workitem-update.json <<EOF
[
  {
    "op": "add",
    "path": "/fields/System.State",
    "value": "Closed"
  },
  {
    "op": "add",
    "path": "/fields/System.Reason",
    "value": "Completed"
  }
]
EOF
```

### Step 3: Execute Update Request

**Using curl:**
```bash
# Encode PAT
PAT_B64=$(echo -n ":$AZURE_DEVOPS_PAT" | base64)

# Update work item
curl -X PATCH \
  "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}?api-version=6.0" \
  -H "Content-Type: application/json-patch+json" \
  -H "Authorization: Basic ${PAT_B64}" \
  -d @/tmp/workitem-update.json \
  -w "\nHTTP Status: %{http_code}\n"
```

**Expected Response:**
```json
{
  "id": 12345,
  "rev": 5,
  "fields": {
    "System.State": "Closed",
    "System.Reason": "Completed"
  }
}
```

### Step 4: Add PR Comment

**Create Comment Payload:**
```bash
cat > /tmp/workitem-comment.json <<EOF
{
  "text": "Pull Request created: ${PR_URL}\n\nBranch: ${BRANCH_NAME}\n\nSummary: ${IMPLEMENTATION_SUMMARY}"
}
EOF
```

**Post Comment:**
```bash
curl -X POST \
  "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}/comments?api-version=6.0" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic ${PAT_B64}" \
  -d @/tmp/workitem-comment.json \
  -w "\nHTTP Status: %{http_code}\n"
```

### Step 5: Verify Update

**Check Ticket Status:**
```bash
curl -X GET \
  "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}?api-version=6.0" \
  -H "Authorization: Basic ${PAT_B64}" \
  | jq '.fields["System.State"]'
```

**Expected Output:**
```
"Closed"
```

---

## Retry Logic

### Retry Strategy

If the ticket update fails, implement the following retry logic:

```bash
MAX_RETRIES=3
RETRY_COUNT=0
RETRY_DELAY=5  # seconds

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  # Attempt update
  RESPONSE=$(curl -s -X PATCH \
    "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}?api-version=6.0" \
    -H "Content-Type: application/json-patch+json" \
    -H "Authorization: Basic ${PAT_B64}" \
    -d @/tmp/workitem-update.json \
    -w "\n%{http_code}")

  HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)

  if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Ticket updated successfully"
    break
  else
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "❌ Update failed (attempt $RETRY_COUNT/$MAX_RETRIES)"
    echo "HTTP Status: $HTTP_STATUS"

    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
      echo "Retrying in ${RETRY_DELAY} seconds..."
      sleep $RETRY_DELAY
    fi
  fi
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "❌ Failed to update ticket after $MAX_RETRIES attempts"
  echo "Please update ticket manually: https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_workitems/edit/${TICKET_ID}"
  exit 1
fi
```

---

## Error Handling

### Common Errors

#### 401 Unauthorized
**Cause:** Invalid or expired PAT
**Resolution:**
- Verify AZURE_DEVOPS_PAT is set correctly
- Check PAT has not expired
- Confirm PAT has Work Item write permissions

#### 403 Forbidden
**Cause:** Insufficient permissions
**Resolution:**
- Verify PAT has Work Item write scope
- Check user has permission to modify work items
- Confirm project access

#### 404 Not Found
**Cause:** Invalid ticket ID or project
**Resolution:**
- Verify TICKET_ID is correct
- Check AZURE_DEVOPS_PROJECT is correct
- Confirm work item exists

#### 400 Bad Request
**Cause:** Invalid request body
**Resolution:**
- Verify JSON patch format is correct
- Check field names are valid
- Ensure state value is valid for project

### Error Reporting

**On Failure:**
```bash
echo "❌ Azure DevOps Ticket Update Failed"
echo ""
echo "Error Details:"
echo "- Ticket ID: $TICKET_ID"
echo "- HTTP Status: $HTTP_STATUS"
echo "- Response: $RESPONSE"
echo ""
echo "Manual Action Required:"
echo "1. Visit: https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_workitems/edit/${TICKET_ID}"
echo "2. Change status to 'Closed'"
echo "3. Add PR link: ${PR_URL}"
```

---

## Example Commands

### Complete Workflow Example

```bash
#!/bin/bash

# Configuration
TICKET_ID="12345"
PR_URL="https://github.com/org/repo/pull/56"
BRANCH_NAME="feature/12345-add-user-filter"
IMPLEMENTATION_SUMMARY="Added user filtering functionality with support for multiple filter criteria"

# Load environment
source /Users/mohitshah/Documents/HarborService/harbor-ai/.env

# Encode PAT
PAT_B64=$(echo -n ":$AZURE_DEVOPS_PAT" | base64)

# Step 1: Update ticket status
echo "Updating ticket #${TICKET_ID} to 'Closed'..."
curl -X PATCH \
  "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}?api-version=6.0" \
  -H "Content-Type: application/json-patch+json" \
  -H "Authorization: Basic ${PAT_B64}" \
  -d '[
    {"op": "add", "path": "/fields/System.State", "value": "Closed"},
    {"op": "add", "path": "/fields/System.Reason", "value": "Completed"}
  ]'

# Step 2: Add PR comment
echo "Adding PR link to ticket..."
curl -X POST \
  "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}/comments?api-version=6.0" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic ${PAT_B64}" \
  -d "{
    \"text\": \"Pull Request created: ${PR_URL}\n\nBranch: ${BRANCH_NAME}\n\nSummary: ${IMPLEMENTATION_SUMMARY}\"
  }"

# Step 3: Verify update
echo "Verifying ticket status..."
STATE=$(curl -s -X GET \
  "https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${TICKET_ID}?api-version=6.0" \
  -H "Authorization: Basic ${PAT_B64}" \
  | jq -r '.fields["System.State"]')

if [ "$STATE" = "Closed" ]; then
  echo "✅ Ticket #${TICKET_ID} successfully updated to 'Closed'"
  echo "✅ PR link added to ticket"
else
  echo "❌ Failed to update ticket. Current state: $STATE"
  exit 1
fi
```

---

## Quick Reference

**Required Variables:**
- `AZURE_DEVOPS_PAT` - Personal Access Token
- `AZURE_DEVOPS_ORG` - Organization name
- `AZURE_DEVOPS_PROJECT` - Project name
- `TICKET_ID` - Work item ID to update
- `PR_URL` - Pull Request URL
- `BRANCH_NAME` - Feature branch name
- `IMPLEMENTATION_SUMMARY` - Brief description

**API Endpoints:**
- Update: `PATCH .../_apis/wit/workitems/{id}?api-version=6.0`
- Comment: `POST .../_apis/wit/workitems/{id}/comments?api-version=6.0`
- Verify: `GET .../_apis/wit/workitems/{id}?api-version=6.0`

**Success Indicators:**
- HTTP 200 response
- State = "Closed"
- Reason = "Completed"

**Failure Indicators:**
- HTTP 4xx/5xx response
- State != "Closed"
- Network timeout

---

**Last Updated:** 2026-03-08
**Next Review:** When Azure DevOps API version changes
