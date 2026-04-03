# 🚨 PROGRESS UPDATE - MANDATORY EXECUTION GUIDE

**Date:** 2026-04-01
**Version:** v12.0 - NEW STAGE SEQUENCE
**Status:** ✅ UPDATED - Progress updates now MANDATORY with new stage sequence
**Issue:** Agent was completing phases but progress percentage stayed at 0%

---

## 🎯 THE PROBLEM

**What was happening:**
- Agent completed "Phase 1", "Phase 2", etc.
- Activities were logged with descriptions
- **BUT progress percentage stayed at 0%**
- UI showed no progress bar movement

**Root Cause:**
- Agent was NOT calling the progress update API
- Agent was only logging activities
- No actual progress percentage was being set

---

## ✅ THE SOLUTION

**🚨 DYNAMIC PATH CONFIGURATION:**

Set environment variable for dynamic paths:

```bash
export HARBOR_TRACKER_UTILS="./harbor-ticket-tracker/backend/src/utils"
# OR auto-detect from workflow:
export HARBOR_TRACKER_UTILS="${HARBOR_AI_ROOT}/harbor-ticket-tracker/backend/src/utils"
```

**All commands below use:** `cd "${HARBOR_TRACKER_UTILS}"`

---

**🚨 MANDATORY RULE: Progress MUST be updated at EACH phase completion**

**🆕 NEW Progress Update Timeline (4-Stage System - Updated Sequence):**
```
Phase Start:        0%   → Initial state (Analysis)
Phase 1 Complete:   25%  → Analysis complete, moving to Planning
Phase 2 Complete:   50%  → Planning complete, moving to Development
Phase 3 Complete:   75%  → Development complete, moving to Testing
Phase 4 Complete:  100%  → Testing complete, Task DONE
```

**🆕 NEW Stage Sequence:**
1. **Analysis** (0-25%): Analyze requirements, documents, and existing code
2. **Planning** (25-50%): Define implementation approach and steps
3. **Development** (50-75%): Perform actual implementation
4. **Testing** (75-100%): Validate and test the implementation

---

## 🔧 HOW TO UPDATE PROGRESS (MANDATORY)

### **Method 1: Bash Command (REQUIRED during workflow execution)**

```bash
# Update progress to 25% (Analysis → Planning)
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Analysis phase complete - all docs read and validated"

# Update progress to 50% (Planning → Development)
node ticketTrackerIntegration.js update "TKT-137" 50 "Development" "Planning complete - starting implementation"

# Update progress to 75% (Development → Testing)
node ticketTrackerIntegration.js update "TKT-137" 75 "Testing" "Development complete - starting testing"

# Complete ticket (100%)
node ticketTrackerIntegration.js complete "TKT-137" "Task completed successfully - implementation and testing complete"
```

### **Method 2: API Call (Alternative)**

```bash
# Update progress via API
curl -X PUT http://localhost:3001/api/tickets/TKT-137/progress \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 50,
    "stage": "Development",
    "message": "Planning complete - starting implementation"
  }'
```

---

## 📋 MANDATORY CHECKPOINTS

**🚨 At EACH phase completion, AGENT MUST:**

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

### **Checkpoint 4: After Testing Complete (100%)**
```bash
node ticketTrackerIntegration.js complete "TKT-{ID}" "Task completed successfully - all tests passing, implementation complete"
```

---

## 🚨 VERIFICATION (MANDATORY)

**After EACH progress update, agent MUST verify:**

```bash
# Check current progress
curl -s http://localhost:3001/api/tickets/TKT-{ID} | grep -o '"progress":[0-9]*'
```

**Expected output:**
```
"progress":25
"progress":50
"progress":75
"progress":100
```

**If progress is NOT updated:**
- ❌ **PHASE IS NOT COMPLETE**
- ❌ **DO NOT PROCEED TO NEXT PHASE**
- ✅ **RE-RUN the progress update command**
- ✅ **Verify progress changed**
- ✅ **Only then proceed**

---

## 📊 EXAMPLE WORKFLOW

```
✅ Phase 0: Analysis (Documentation Gate)
   ↓
   Execute: node ticketTrackerIntegration.js update "TKT-137" 25 "Planning" "Analysis complete"
   Verify: curl shows "progress":25
   ↓
✅ Phase 1: Planning
   ↓
   Execute: node ticketTrackerIntegration.js update "TKT-137" 50 "Development" "Planning complete"
   Verify: curl shows "progress":50
   ↓
✅ Phase 2: Development
   ↓
   Execute: node ticketTrackerIntegration.js update "TKT-137" 75 "Testing" "Development complete"
   Verify: curl shows "progress":75
   ↓
✅ Phase 3: Testing Complete
   ↓
   Execute: node ticketTrackerIntegration.js complete "TKT-137" "Task complete - testing done"
   Verify: curl shows "progress":100
```

---

## 🔍 TROUBLESHOOTING

### **Problem: Progress stays at 0%**

**Check 1: Was the command executed?**
```bash
# Check recent activities
curl -s http://localhost:3001/api/activities | grep "Progress Update" | head -5
```

**Check 2: Was the API called?**
```bash
# Check if progress field exists
curl -s http://localhost:3001/api/tickets/TKT-{ID} | grep progress
```

**Check 3: Is backend running?**
```bash
curl -s http://localhost:3001/api/health
```

**Solution:**
```bash
# Manually update progress
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-{ID}" 50 "Development" "Manual progress update"
```

---

## ✅ FINAL CHECKLIST

Before marking task as complete, verify:

- [ ] Progress updated to 25% after analysis phase
- [ ] Progress updated to 50% after planning phase
- [ ] Progress updated to 75% after development phase
- [ ] Progress updated to 100% when task complete (testing done)
- [ ] Each update verified with curl command
- [ ] UI shows progress bar movement
- [ ] Activities timeline shows all progress updates

---

**🚨 CRITICAL: NO TASK IS COMPLETE WITHOUT 100% PROGRESS!**

**If progress is not 100%:**
- ❌ Task is NOT complete
- ❌ Do NOT mark as complete
- ✅ Update progress to 100%
- ✅ Only then mark as complete

---

**Status:** ✅ MANDATORY - All agents MUST follow this guide
**Version:** v12.0 - New Stage Sequence (Analysis → Planning → Development → Testing)
**Last Updated:** 2026-04-01
