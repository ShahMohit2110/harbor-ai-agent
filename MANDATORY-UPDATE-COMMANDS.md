# 🚨 MANDATORY: Progress Update Commands - READ THIS FIRST!

**🚨 CRITICAL: ALL PROGRESS UPDATES MUST USE THIS EXACT METHOD!**

**Version:** 4.0.0 - Stage Sync Fix  
**Date:** 2026-04-04
**Status:** ✅ MANDATORY - ZERO EXCEPTIONS

---

## 🎯 CRITICAL: Progress-Stage Mapping (READ THIS!)

**Understanding when stages complete:**

| Progress | Active Stage | Completed Stage | Agent Action |
|----------|-------------|-----------------|--------------|
| 0% | None | None | Ticket created (Pending) |
| 5% | Admin | None | Agent starts working |
| 10% | Analysis | Admin ✅ | Documentation analysis begins |
| 25% | Planning | Analysis ✅ | Planning phase begins |
| 50% | Development | Planning ✅ | Implementation begins |
| 75% | Testing | Development ✅ | Testing begins |
| 100% | Done | Testing ✅ | Task complete |

**Key Rule:** A stage completes when the NEXT stage starts (e.g., Admin completes at 10% when Analysis starts)

---

## ✅ CORRECT METHOD (MANDATORY!)

**🚨 ALL progress updates MUST use this EXACT command:**

### Option 1: Global Wrapper (RECOMMENDED - Works from any directory)
```bash
harbor-ticket-update "TKT-{ID}" {PERCENT} "{STAGE}" "{MESSAGE}"
```

### Option 2: Direct path (Absolute path)
```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
node ticketTrackerIntegration.js update "TKT-{ID}" {PERCENT} "{STAGE}" "{MESSAGE}"
```

---

## 📋 Agent Workflow Checkpoint Commands

### **Step 1: Agent Starts Working (5% - Admin Active)**
```bash
harbor-ticket-update "TKT-137" 5 "Admin" "Harbor AI Agent started working on this ticket"
```
**UI shows:** Admin stage active (blue), all others pending (gray)

### **Step 2: Documentation Analysis Complete (10% - Analysis Active, Admin Complete)**
```bash
harbor-ticket-update "TKT-137" 10 "Analysis" "Documentation gate complete - all docs read and validated"
```
**UI shows:** Analysis active (blue), Admin completed (green ✅)

### **Step 3: Analysis Complete, Planning Starts (25% - Planning Active, Analysis Complete)**
```bash
harbor-ticket-update "TKT-137" 25 "Planning" "Analysis phase complete - requirements analyzed, starting planning"
```
**UI shows:** Planning active (blue), Admin & Analysis completed (green ✅)

### **Step 4: Planning Complete, Implementation Starts (50% - Development Active, Planning Complete)**
```bash
harbor-ticket-update "TKT-137" 50 "Development" "Planning complete - starting implementation"
```
**UI shows:** Development active (blue), Admin, Analysis & Planning completed (green ✅)

### **Step 5: Implementation Complete, Testing Starts (75% - Testing Active, Development Complete)**
```bash
harbor-ticket-update "TKT-137" 75 "Testing" "Development complete - starting testing phase"
```
**UI shows:** Testing active (blue), Admin, Analysis, Planning & Development completed (green ✅)

### **Step 6: Task Complete (100% - All Stages Complete)**
```bash
harbor-ticket-update "TKT-137" 100 "Testing" "Task completed successfully - all phases complete"
# OR use complete command:
harbor-ticket-complete "TKT-137" "Task completed successfully"
```
**UI shows:** All stages completed (green ✅), Status = Completed

---

## 🎯 VERIFICATION (MANDATORY AFTER EACH UPDATE!)

**After running each command, VERIFY:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-137 | python3 -c "import sys, json; d=json.load(sys.stdin)['data']; print(f\"Progress: {d['progress']}%, Stage: {d['stage']}, Status: {d['status']}\")"
```

**Expected outputs:**

| Step | Progress | Stage | Status | UI Shows |
|------|---------|-------|--------|----------|
| 1 | 5 | Admin | In Progress | Admin active |
| 2 | 10 | Analysis | In Progress | Admin ✅, Analysis active |
| 3 | 25 | Planning | In Progress | Admin ✅, Analysis ✅, Planning active |
| 4 | 50 | Development | In Progress | Admin ✅, Analysis ✅, Planning ✅, Development active |
| 5 | 75 | Testing | In Progress | Admin ✅, Analysis ✅, Planning ✅, Development ✅, Testing active |
| 6 | 100 | Testing | Completed | All ✅ |

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
