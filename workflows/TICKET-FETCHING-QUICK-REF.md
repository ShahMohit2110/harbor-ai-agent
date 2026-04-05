# 🎫 Ticket Fetching Quick Reference

**Harbor AI Agent v2.0 - Harbor Ticket Tracker Integration**

**🚨 CRITICAL: READ THE CHECKPOINT COMMANDS SECTION BELOW!**
**All ticket progress updates MUST use the `harbor-ticket-update` command**

---

## 🚀 Quick Start

### **Fetch Pending Tickets (One-Liner)**

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/data && \
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0]'
```

---

## 📋 Step-by-Step

### **1. View All Pending Tickets**

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/data

cat tickets-data.json | jq '.tickets[] | select(.status == "pending" or .status == "In Progress")'
```

### **2. Get Highest Priority Ticket**

```bash
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0]'
```

### **3. Extract Ticket Information**

```bash
# Get ticket ID
cat tickets-data.json | jq -r '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0].id'

# Get ticket title
cat tickets-data.json | jq -r '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0].title'

# Get ticket description
cat tickets-data.json | jq -r '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0].description'
```

### **4. Start Ticket (CORRECT METHOD)**

**🚨 USE THIS COMMAND - Not the API directly:**
```bash
harbor-ticket-update "TKT-137" 5 "Admin" "Harbor AI Agent started working on this ticket"
```

**OR using API (if wrapper not available):**
```bash
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TKT-137",
    "stage": "Admin",
    "message": "Harbor AI Agent started working on this ticket"
  }'
```

**❌ DO NOT USE (wrong endpoint):**
```bash
# This endpoint does NOT exist:
curl -X PUT http://localhost:3001/api/tickets/TKT-137/start  # ❌ WRONG
```

### **5. Verify Ticket Started**

```bash
curl -s http://localhost:3001/api/tickets/TKT-146 | jq '.data | {id, title, status, stage, progress}'
```

---

## 🎯 Priority Order

**Sorting Logic:**
1. **Priority:** High > Medium > Low
2. **Date:** Oldest first (createdAt)

**Example:**
```bash
jq 'sort_by(.priority, .createdAt) | .[0]'
```

---

## 📊 Status Values

**Valid Statuses for Agent Selection:**
- `pending` - Not started yet
- `In Progress` - Currently being worked on

**Ignored Statuses:**
- `completed` - Already done
- `Cancelled` - Cancelled
- `Closed` - Closed

---

## 🔧 Troubleshooting

### **No pending tickets?**

```bash
# Check total tickets
cat tickets-data.json | jq '.tickets | length'

# Check pending tickets
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending")] | length'

# Sync from Azure DevOps
# → Go to http://localhost:5173
# → Click "Sync from Azure DevOps" button
```

### **jq not found?**

```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq

# Verify
jq --version
```

### **Backend not running?**

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend
node src/server.js
```

---

## 🎯 CHECKPOINT COMMANDS (MANDATORY)

**🚨 CRITICAL: Use these exact commands to update ticket progress!**

### **Checkpoint 0: Agent Starts (5% - Admin Active)**
```bash
harbor-ticket-update "TKT-{ID}" 5 "Admin" "Harbor AI Agent started working on this ticket"
```

### **Checkpoint 1: Documentation Complete (10% - Analysis Active)**
```bash
harbor-ticket-update "TKT-{ID}" 10 "Analysis" "Documentation gate complete - all docs read and validated"
```

### **Checkpoint 2: Analysis Complete (25% - Planning Active)**
```bash
harbor-ticket-update "TKT-{ID}" 25 "Planning" "Analysis phase complete - requirements analyzed"
```

### **Checkpoint 3: Planning Complete (50% - Development Active)**
```bash
harbor-ticket-update "TKT-{ID}" 50 "Development" "Planning complete - starting implementation"
```

### **Checkpoint 4: Development Complete (75% - Testing Active)**
```bash
harbor-ticket-update "TKT-{ID}" 75 "Testing" "Development complete - starting testing"
```

### **Checkpoint 5: Task Complete (100% - All Stages Complete)**
```bash
harbor-ticket-complete "TKT-{ID}" "Task completed successfully - all phases complete"
```

**🚨 ALWAYS verify the update worked:**
```bash
curl -s http://localhost:3001/api/tickets/TKT-{ID} | python3 -c "import sys, json; d=json.load(sys.stdin)['data']; print(f\"Progress: {d['progress']}%, Stage: {d['stage']}, Status: {d['status']}\")"
```

---

## 📝 Example Output

**Fetch Command Output:**
```json
{
  "id": "TKT-146",
  "title": "API Requirement: Fetch Jobs Matching User Skills",
  "description": "<div>We need to create a new API endpoint...</div>",
  "status": "pending",
  "priority": "High",
  "assignee": "Harbor Agent",
  "stage": "Planning",
  "progress": 0,
  "assignedRepos": [],
  "tags": ["azure-devops", "auto-synced"],
  "createdAt": "2026-04-02T07:16:32.859Z",
  "updatedAt": "2026-04-02T07:27:33.798Z"
}
```

**Start Ticket Output:**
```json
{
  "success": true,
  "message": "Ticket started successfully",
  "data": {
    "id": "TKT-146",
    "status": "In Progress",
    "stage": "Planning",
    "progress": 0
  }
}
```

---

## 🔄 Complete Workflow

```bash
# 1. Fetch highest priority pending ticket
TICKET_JSON=$(cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/data && \
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0]')

# 2. Extract ticket ID
TICKET_ID=$(echo "$TICKET_JSON" | jq -r '.id')

# 3. Extract ticket title
TICKET_TITLE=$(echo "$TICKET_JSON" | jq -r '.title')

# 4. Display ticket
echo "Selected Ticket: $TICKET_ID - $TICKET_TITLE"

# 5. Start ticket
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d "{\"ticketId\": \"${TICKET_ID}\", \"stage\": \"Planning\", \"message\": \"Starting work\"}"

# 6. Verify
curl -s http://localhost:3001/api/tickets/${TICKET_ID} | jq '.data | {id, status, stage}'
```

---

## 📚 Related Commands

**Update Progress:**
```bash
curl -X PUT http://localhost:3001/api/tickets/TKT-146/progress \
  -H "Content-Type: application/json" \
  -d '{"progress": 50, "stage": "Development", "message": "Halfway done"}'
```

**Complete Ticket:**
```bash
curl -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "TKT-146", "message": "Completed successfully"}'
```

**View All Tickets:**
```bash
curl -s http://localhost:3001/api/tickets | jq '.data[] | {id, title, status, priority}'
```

---

## ✅ Checklist

Before starting work on a ticket:

- [ ] Ticket fetched from JSON file
- [ ] Ticket status is "pending" or "In Progress"
- [ ] Ticket is highest priority
- [ ] Ticket started via API
- [ ] Ticket status updated to "In Progress"
- [ ] Ticket verified in tracker
- [ ] Proceed to Phase 0 (Documentation Gate)

---

**Last Updated:** 2026-04-04
**Version:** 2.0.0
