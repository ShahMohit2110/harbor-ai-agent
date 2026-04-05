# 🔄 Ticket Source Migration: Azure DevOps → Harbor Ticket Tracker

**Version:** 2.0.0
**Date:** 2026-04-04
**Status:** ACTIVE - MANDATORY FOR ALL AGENT EXECUTIONS

---

## 📋 Overview

The Harbor AI Agent ticket source has been **migrated** from Azure DevOps API to **Harbor Ticket Tracker** local JSON files.

---

## 🎯 What Changed?

### **BEFORE (v1.0 - Azure DevOps):**

```
User: "start harbor-ai"
  ↓
Agent calls: node .azure-fetch-query.js
  ↓
Fetches tasks from Azure DevOps API
  ↓
Creates NEW ticket in Harbor Ticket Tracker
  ↓
Starts working on ticket
```

### **AFTER (v2.0 - Harbor Ticket Tracker):**

```
User: "start harbor-ai"
  ↓
Agent reads: harbor-ticket-tracker/backend/data/tickets-data.json
  ↓
Filters for: status = "pending" OR "In Progress"
  ↓
Selects highest priority ticket
  ↓
Starts EXISTING ticket in tracker
  ↓
Starts working on ticket
```

---

## ✅ Key Improvements

1. **No External API Dependencies**
   - ❌ Old: Requires Azure DevOps PAT, org, project credentials
   - ✅ New: Reads local JSON file only

2. **No Duplicate Tickets**
   - ❌ Old: Creates duplicate ticket in tracker
   - ✅ New: Works with existing synced tickets

3. **Faster Execution**
   - ❌ Old: API call overhead, network latency
   - ✅ New: Direct file read, instant

4. **Better Integration**
   - ❌ Old: Two separate systems (Azure + Tracker)
   - ✅ New: Single source of truth (Tracker)

5. **Offline Capability**
   - ❌ Old: Requires internet connection to Azure
   - ✅ New: Works completely offline

---

## 🔧 Technical Details

### **Ticket Source File**

**Location:**
```
harbor-ticket-tracker/backend/data/tickets-data.json
```

**Structure:**
```json
{
  "tickets": [
    {
      "id": "TKT-146",
      "title": "API Requirement: Fetch Jobs Matching User Skills",
      "description": "...",
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
  ]
}
```

### **Filtering Logic**

**Status Filter:**
```bash
jq '.tickets[] | select(.status == "pending" or .status == "In Progress")'
```

**Priority Sorting:**
```bash
jq 'sort_by(.priority, .createdAt) | .[0]'
```

**Priority Order:** High > Medium > Low
**Secondary Sort:** Oldest first (createdAt)

---

## 📝 Updated Workflow Files

### **Modified Files:**

1. ✅ `workflows/PHASE-0-MANDATORY-TICKET-CREATION.md` (v2.0)
   - Updated to read from Harbor Ticket Tracker JSON
   - Removed Azure DevOps fetch step
   - Added JSON filtering and selection logic

### **Deprecated Files:**

1. ⚠️ `.azure-fetch-query.js` (kept for backup/reference)
   - No longer used in main workflow
   - Can be removed in future cleanup

---

## 🚀 Migration Checklist

When migrating from v1.0 to v2.0, verify:

- [x] Harbor Ticket Tracker backend is running (`npm run dev`)
- [x] Tickets are synced from Azure DevOps (via sync button)
- [x] `tickets-data.json` exists and contains pending tickets
- [x] Agent can read JSON file using `jq` command
- [x] Agent can start ticket via API call
- [x] Workflow updated to use new source

---

## 🔧 Troubleshooting

### **Issue: No pending tickets found**

**Symptom:**
```
⚠️  No pending tickets found in Harbor Ticket Tracker
```

**Solution:**
1. Open Harbor Ticket Tracker UI: http://localhost:5173
2. Click "Sync from Azure DevOps" button
3. Verify tickets appear in UI
4. Check ticket status is "pending" or "In Progress"

### **Issue: JSON file not found**

**Symptom:**
```
❌ Tickets file not found: .../tickets-data.json
```

**Solution:**
1. Start Harbor Ticket Tracker backend:
   ```bash
   cd harbor-ticket-tracker/backend
   npm run dev
   ```
2. Sync tickets from Azure DevOps
3. Verify file is created

### **Issue: jq command not found**

**Symptom:**
```
jq: command not found
```

**Solution:**
```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

---

## 📊 Comparison Table

| Feature | Azure DevOps (v1.0) | Harbor Ticket Tracker (v2.0) |
|---------|-------------------|---------------------------|
| **Source** | Azure DevOps API | Local JSON file |
| **Authentication** | PAT token required | None (local file) |
| **Network** | Required (internet) | Not required (offline) |
| **Speed** | Slow (API call) | Fast (file read) |
| **Duplicate Tickets** | Yes (creates new) | No (uses existing) |
| **Reliability** | Depends on Azure | 100% (local) |
| **Offline Mode** | No | Yes |
| **Setup Complexity** | High (credentials) | Low (none) |

---

## 🎯 Example: Complete Workflow

```bash
# 1. User triggers agent
User: "start harbor-ai"

# 2. Agent reads pending tickets
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/data
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0]'

# 3. Output: Highest priority ticket
{
  "id": "TKT-146",
  "title": "API Requirement: Fetch Jobs Matching User Skills",
  "priority": "High",
  "status": "pending"
}

# 4. Agent sets variables
TICKET_ID="TKT-146"
TICKET_TITLE="API Requirement: Fetch Jobs Matching User Skills"

# 5. Agent starts ticket
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d "{\"ticketId\": \"${TICKET_ID}\", \"stage\": \"Planning\", \"message\": \"Starting work\"}"

# 6. Verify ticket started
curl -s http://localhost:3001/api/tickets/TKT-146 | jq '.data.status'
# Output: "In Progress"

# 7. Proceed with implementation...
```

---

## 🔄 Rollback Procedure (if needed)

If you need to rollback to Azure DevOps source:

1. Restore old workflow:
   ```bash
   git checkout HEAD~1 workflows/PHASE-0-MANDATORY-TICKET-CREATION.md
   ```

2. Update workflow to use Azure fetch:
   ```bash
   node .azure-fetch-query.js
   ```

3. Verify Azure DevOps credentials are set in `.env`

---

## ✅ Validation Steps

After migration, validate:

1. **Agent can read tickets:**
   ```bash
   cat harbor-ticket-tracker/backend/data/tickets-data.json | jq '.tickets | length'
   ```

2. **Agent can filter pending:**
   ```bash
   cat harbor-ticket-tracker/backend/data/tickets-data.json | jq '[.tickets[] | select(.status == "pending")] | length'
   ```

3. **Agent can start ticket:**
   ```bash
   curl -X POST http://localhost:3001/api/harbor-agent/start \
     -H "Content-Type: application/json" \
     -d '{"ticketId": "TKT-146", "stage": "Planning", "message": "Test"}'
   ```

4. **Full workflow test:**
   - Trigger agent: "start harbor-ai"
   - Verify ticket is selected
   - Verify ticket is started
   - Verify progress updates work

---

## 📚 Related Documentation

- `PHASE-0-MANDATORY-TICKET-CREATION.md` - Updated workflow (v2.0)
- `TICKET_TRACKER_INTEGRATION.md` - API integration guide
- `global-agent-workflow-v11.md` - Main agent workflow
- `harbor-ticket-tracker/README.md` - Tracker setup guide

---

## 🎉 Summary

**What Changed:**
- Ticket source: Azure DevOps API → Harbor Ticket Tracker JSON
- No new tickets created (uses existing synced tickets)
- Faster, more reliable, offline-capable

**What Stayed the Same:**
- Agent workflow phases (0-12)
- Progress tracking via API
- Ticket completion flow
- All other functionality

**Benefits:**
- ✅ Faster execution
- ✅ No external dependencies
- ✅ Better integration
- ✅ Offline capable
- ✅ Single source of truth

---

**Migration Date:** 2026-04-04
**Version:** 2.0.0
**Status:** ✅ ACTIVE - MANDATORY FOR ALL AGENT EXECUTIONS
