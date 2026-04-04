# 🚨 MANDATORY: Progress Update Commands - READ THIS FIRST!

**🚨 CRITICAL: ALL PROGRESS UPDATES MUST USE THIS EXACT METHOD!**

**Version:** 2.0.0 - Admin Stage Compatible  
**Date:** 2026-04-04  
**Status:** ✅ MANDATORY - ZERO EXCEPTIONS

---

## 🔴 FORBIDDEN METHODS (DO NOT USE!)

❌ **NEVER use this command:**
```bash
node -e "const fs = require('fs'); const data = JSON.parse(fs.readFileSync('...')); ..."
```

**❌ This method bypasses the API and causes inconsistent updates**

---

## ✅ CORRECT METHOD (MANDATORY!)

**🚨 ALL progress updates MUST use this EXACT command:**

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils

node ticketTrackerIntegration.js update "TKT-{ID}" {PERCENT} "{STAGE}" "{MESSAGE}"
```

---

## 📋 Checkpoint Commands (Copy & Paste!)

### **Checkpoint 0: Agent Starts (10% - Admin → Analysis)**
```bash
node ticketTrackerIntegration.js update "TKT-137" 10 "Analysis" "Harbor AI Agent started working - Admin phase complete"
```

### **Checkpoint 1: Analysis Complete (25% - Analysis → Planning)**
```bash
node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Analysis phase complete - all docs read and validated"
```

### **Checkpoint 2: Planning Complete (50% - Planning → Development)**
```bash
node ticketTrackerIntegration.js update "TKT-137" 50 "Development" "Planning complete - starting implementation"
```

### **Checkpoint 3: Development Complete (75% - Development → Testing)**
```bash
node ticketTrackerIntegration.js update "TKT-137" 75 "Testing" "Development complete - starting testing"
```

### **Checkpoint 4: Testing Complete (100% - Done)**
```bash
node ticketTrackerIntegration.js complete "TKT-137" "Task completed successfully - implementation and testing complete"
```

---

## 🎯 VERIFICATION (MANDATORY AFTER EACH UPDATE!)

**After running each command, VERIFY:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-137 | jq '.data | {progress, stage, status}'
```

**Expected outputs:**

| Checkpoint | Progress | Stage | Status |
|-----------|---------|-------|--------|
| 0 | 10 | Analysis | In Progress |
| 1 | 25 | Planning | In Progress |
| 2 | 50 | Development | In Progress |
| 3 | 75 | Testing | In Progress |
| 4 | 100 | Testing | **Completed** |

---

## 🚨 CRITICAL RULES

1. ✅ **NEVER use `node -e`** commands for updates
2. ✅ **ALWAYS use `ticketTrackerIntegration.js`** script
3. ✅ **VERIFY** each update with curl command
4. ✅ **PROCEED to next phase ONLY after verification**

---

## 🔧 Troubleshooting

**If progress doesn't update in UI:**

1. **Check the command output:**
   - ✅ Should see: `✅ Ticket TKT-XXX updated successfully`
   - ❌ If you see: `⚠️  API Request Failed`

2. **Check backend is running:**
   ```bash
   curl http://localhost:3001/api/health
   ```

3. **Manual API test:**
   ```bash
   cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
   node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Test update"
   ```

4. **Check UI:**
   - Refresh browser (Ctrl+Shift+R)
   - Navigate to ticket detail
   - Verify progress bar shows correct percentage

---

## 📋 Quick Reference Card

**Full Command Template:**
```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
node ticketTrackerIntegration.js update "TKT-{ID}" {PERCENT} "{STAGE}" "{MESSAGE}"
```

**Examples:**
```bash
# 10% - Agent starts
node ticketTrackerIntegration.js update "TKT-137" 10 "Analysis" "Agent started working"

# 25% - Analysis complete
node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Analysis complete"

# 50% - Planning complete
node ticketTrackerIntegration.js update "TKT-137" 50 "Development" "Planning complete"

# 75% - Development complete
node ticketTrackerIntegration.js update "TKT-137" 75 "Testing" "Development complete"

# 100% - Done
node ticketTrackerIntegration.js complete "TKT-137" "Task completed"
```

---

**Last Updated:** 2026-04-04  
**Version:** 2.0.0  
**Status:** ✅ MANDATORY - USE THESE EXACT COMMANDS
