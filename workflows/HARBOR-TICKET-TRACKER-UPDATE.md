# 🚨 Harbor Ticket Tracker Progress Update - MANDATORY

**Version:** 2.0.0 - Admin Stage Compatible
**Status:** ✅ UPDATED - Use Harbor Ticket Tracker API
**Purpose:** Define how Harbor AI agent updates ticket progress in Harbor Ticket Tracker

---

## 🎯 THE PROBLEM

**What was happening:**
- Agent was using Azure DevOps update logic for Harbor Ticket Tracker
- Agent used `node -e` with inline JavaScript (wrong method)
- Progress updates were not showing in the UI
- Backend API was not being called correctly

---

## ✅ THE SOLUTION

**🚨 MANDATORY RULE: All ticket updates MUST use Harbor Ticket Tracker API**

---

## 📋 Update Methods

### **Method 1: ticketTrackerIntegration.js (RECOMMENDED)**

```bash
# Navigate to utils directory
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils

# Update progress (25% - Analysis complete)
node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Analysis phase complete - all docs read and validated"

# Update progress (50% - Planning complete)
node ticketTrackerIntegration.js update "TKT-137" 50 "Development" "Planning complete - starting implementation"

# Update progress (75% - Development complete)
node ticketTrackerIntegration.js update "TKT-137" 75 "Testing" "Development complete - starting testing"

# Complete ticket (100%)
node ticketTrackerIntegration.js complete "TKT-137" "Task completed successfully - implementation and testing complete"
```

### **Method 2: Direct API Call (ALTERNATIVE)**

```bash
# Start ticket (Admin → Analysis)
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TKT-137",
    "stage": "Analysis",
    "message": "Harbor AI Agent started working on this ticket"
  }'

# Update progress
curl -X PUT http://localhost:3001/api/tickets/TKT-137/progress \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 25,
    "stage": "Planning",
    "message": "Analysis phase complete"
  }'

# Complete ticket
curl -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TKT-137",
    "message": "Task completed successfully"
  }'
```

---

## 📊 Progress Update Timeline (Admin Stage Compatible)

```
Phase Start:        0%   → Initial state (Admin)
Phase 0 Complete:   10%  → Admin complete, moving to Analysis
Phase 1 Complete:   25%  → Analysis complete, moving to Planning
Phase 2 Complete:   50%  → Planning complete, moving to Development
Phase 3 Complete:   75%  → Development complete, moving to Testing
Phase 4 Complete:  100%  → Testing complete, Task DONE
```

---

## 🚨 MANDATORY CHECKPOINTS

### **Checkpoint 0: Start Ticket (Admin → Analysis)**
```bash
# When agent starts working on ticket
node ticketTrackerIntegration.js update "TKT-{ID}" 10 "Analysis" "Harbor AI Agent started working - Admin phase complete"
```

### **Checkpoint 1: After Analysis Phase (25%)**
```bash
node ticketTrackerIntegration.js update "TKT-{ID}" 25 "Planning" "Analysis phase complete - all docs read and validated"
```

### **Checkpoint 2: After Planning Phase (50%)**
```bash
node ticketTrackerIntegration.js update "TKT-{ID}" 50 "Development" "Planning complete - starting implementation"
```

### **Checkpoint 3: After Development Phase (75%)**
```bash
node ticketTrackerIntegration.js update "TKT-{ID}" 75 "Testing" "Development complete - starting testing"
```

### **Checkpoint 4: After Testing Phase (100%)**
```bash
node ticketTrackerIntegration.js complete "TKT-{ID}" "Task completed successfully - implementation and testing complete"
```

---

## ❌ WHAT NOT TO DO

**DO NOT use:**
- ❌ `node -e "const fs = require('fs');..."` - Direct JSON manipulation
- ❌ Azure DevOps update logic - Wrong system
- ❌ Manual JSON file editing - Bypasses API
- ❌ Write directly to tickets-data.json - File locking issues

**DO:**
- ✅ Use `ticketTrackerIntegration.js` script
- ✅ Call Harbor Ticket Tracker API endpoints
- ✅ Verify updates with curl commands
- ✅ Check UI to confirm progress shows

---

## 🧪 VERIFICATION

**After each update, verify:**

```bash
# Check ticket status
curl -s http://localhost:3001/api/tickets/TKT-137 | jq '.data | {id, status, stage, progress}'

# Expected output:
{
  "id": "TKT-137",
  "status": "In Progress",
  "stage": "Planning",
  "progress": 25
}
```

**Check UI:**
1. Open http://localhost:5173
2. Navigate to ticket detail
3. Verify progress bar shows correct percentage
4. Verify stage indicator shows correct stage
5. Verify activities timeline shows update

---

## 🔧 TROUBLESHOOTING

### **Issue: Progress not updating in UI**

**Solution:**
1. Verify backend API is running: `curl http://localhost:3001/api/health`
2. Check console for errors
3. Verify API response: `curl -s http://localhost:3001/api/tickets/TKT-137 | jq '.data.progress'`
4. Refresh browser (Ctrl+Shift+R)

### **Issue: ticketTrackerIntegration.js not found**

**Solution:**
```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
ls -la ticketTrackerIntegration.js
```

If file doesn't exist, check:
- Backend directory structure
- File was not accidentally deleted
- Correct working directory

### **Issue: API returns error**

**Solution:**
1. Check backend server is running on port 3001
2. Check ticket ID exists
3. Check request format is correct
4. Check backend logs for errors

---

## 📋 COMPLETE WORKFLOW EXAMPLE

```bash
# 1. Agent starts working
echo "🎯 Agent starting work on TKT-137"
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
node ticketTrackerIntegration.js update "TKT-137" 10 "Analysis" "Harbor AI Agent started working"

# 2. Agent completes analysis phase
echo "📚 Analysis complete - updating progress"
node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Analysis phase complete - all docs read and validated"

# 3. Verify update
echo "🔍 Verifying update..."
curl -s http://localhost:3001/api/tickets/TKT-137 | jq '.data | {id, status, stage, progress}'

# 4. Continue with next phase...
```

---

## 🎯 SUMMARY

**Correct Method:**
```bash
node ticketTrackerIntegration.js update "TKT-ID" PERCENT STAGE "MESSAGE"
```

**Incorrect Methods:**
- ❌ `node -e "const fs = require('fs')..."`
- ❌ Direct JSON manipulation
- ❌ Azure DevOps logic

**Key Points:**
- ✅ Use ticketTrackerIntegration.js script
- ✅ Call Harbor Ticket Tracker API
- ✅ Update at each checkpoint (0%, 10%, 25%, 50%, 75%, 100%)
- ✅ Verify updates in UI

---

**Last Updated:** 2026-04-04
**Version:** 2.0.0 - Admin Stage Compatible
**Status:** ✅ ACTIVE - MANDATORY FOR ALL AGENT EXECUTIONS
