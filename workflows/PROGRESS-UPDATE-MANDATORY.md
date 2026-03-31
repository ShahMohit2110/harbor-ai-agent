# 🚨 PROGRESS UPDATE - MANDATORY EXECUTION GUIDE

**Date:** 2026-03-30
**Status:** ✅ FIXED - Progress updates now MANDATORY with specific percentages
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

**Progress Update Timeline (4-Stage System):**
```
Phase Start:     0%   → Initial state (Planning)
Phase 1 Complete: 33%  → Documentation/Analysis complete (Analysis stage)
Phase 2 Complete: 67%  → Implementation started (Development stage)
Phase 3 Complete: 100% → Implementation complete, testing done (Testing stage - COMPLETE)
```

---

## 🔧 HOW TO UPDATE PROGRESS (MANDATORY)

### **Method 1: Bash Command (REQUIRED during workflow execution)**

```bash
# Update progress to 33%
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-137" 33 "Analysis" "Documentation and analysis complete"

# Update progress to 67%
node ticketTrackerIntegration.js update "TKT-137" 67 "Development" "Implementation started - core features in progress"

# Complete ticket (100%)
node ticketTrackerIntegration.js complete "TKT-137" "Task completed successfully - implementation and testing complete"
```

### **Method 2: API Call (Alternative)**

```bash
# Update progress via API
curl -X PUT http://localhost:3001/api/tickets/TKT-137/progress \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 67,
    "stage": "Development",
    "message": "Implementation started - core features in progress"
  }'
```

---

## 📋 MANDATORY CHECKPOINTS

**🚨 At EACH phase completion, AGENT MUST:**

### **Checkpoint 1: After Documentation Gate (33%)**
```bash
node ticketTrackerIntegration.js update "TKT-{ID}" 33 "Analysis" "Documentation gate complete - all docs read and validated"
```

### **Checkpoint 2: After Implementation Starts (67%)**
```bash
node ticketTrackerIntegration.js update "TKT-{ID}" 67 "Development" "Core implementation started - main features in progress"
```

### **Checkpoint 3: After Testing Complete (100%)**
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
"progress":33
"progress":67
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
✅ Phase 0: Documentation Gate
   ↓
   Execute: node ticketTrackerIntegration.js update "TKT-137" 33 "Analysis" "Docs complete"
   Verify: curl shows "progress":33
   ↓
✅ Phase 1: Implementation Starts
   ↓
   Execute: node ticketTrackerIntegration.js update "TKT-137" 67 "Development" "Implementation started"
   Verify: curl shows "progress":67
   ↓
✅ Phase 2: Testing Complete
   ↓
   Execute: node ticketTrackerIntegration.js complete "TKT-137" "Task complete - implementation and testing done"
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

- [ ] Progress updated to 33% after documentation
- [ ] Progress updated to 67% after implementation starts
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
**Next Review:** 2026-04-30
