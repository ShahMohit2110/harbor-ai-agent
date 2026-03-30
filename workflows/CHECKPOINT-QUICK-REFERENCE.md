# 🚀 Quick Reference: 5-Checkpoint Progression System

**Version:** v11.2.0
**Date:** 2026-03-30
**Status:** ✅ ACTIVE

---

## 📍 The 5 MANDATORY Checkpoints

### **Checkpoint 1: Documentation Gate Complete** 📚
- **Progress:** 25%
- **Stage:** Analysis
- **Location:** After Phase 0 (Documentation Gate)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js update "TKT-{ID}" 25 "Analysis" "Documentation complete"
  ```

### **Checkpoint 2: Implementation Starts** 🔨
- **Progress:** 50%
- **Stage:** Development
- **Location:** Before Phase 6 (Implementation)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js update "TKT-{ID}" 50 "Development" "Starting implementation"
  ```

### **Checkpoint 3: Implementation Complete** ✅
- **Progress:** 75%
- **Stage:** Testing
- **Location:** After Phase 6 (Implementation)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js update "TKT-{ID}" 75 "Testing" "Implementation complete"
  ```

### **Checkpoint 4: Testing Complete** 🧪
- **Progress:** 90%
- **Stage:** Deployment
- **Location:** After Phase 9 (Testing/Debug)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js update "TKT-{ID}" 90 "Deployment" "Testing complete"
  ```

### **Checkpoint 5: Task Complete** 🎉
- **Progress:** 100%
- **Stage:** Deployment
- **Status:** Completed
- **Location:** After Phase 12 (Git Integration)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js complete "TKT-{ID}" "Task completed successfully"
  ```

---

## 🎯 What This Fixes

**Before (BROKEN):**
```
0% → 50% → 100% (jumping, skipping stages)
Planning → Development → Deployment (skipping Analysis, Testing)
```

**After (FIXED):**
```
0% → 25% → 50% → 75% → 90% → 100% (smooth progression)
Planning → Analysis → Development → Testing → Deployment → Completed
```

---

## ✅ Verification Commands

**Check current progress:**
```bash
curl -s http://localhost:3001/api/tickets/TKT-{ID} | grep -o '"progress":[0-9]*'
```

**Check stage:**
```bash
curl -s http://localhost:3001/api/tickets/TKT-{ID} | grep -o '"stage":"[^"]*"'
```

**Check status:**
```bash
curl -s http://localhost:3001/api/tickets/TKT-{ID} | grep -o '"status":"[^"]*"'
```

---

## 📋 Expected Agent Output

At each checkpoint, agent should output:

```markdown
✅ CHECKPOINT X COMPLETE:
- Progress updated to: X%
- Stage set to: [Stage Name]
- Message: [Description]
🟢 PROCEEDING TO NEXT PHASE
```

---

## 🚨 Troubleshooting

**Problem:** Progress not updating
**Solution:**
1. Check backend is running: `curl -s http://localhost:3001/api/health`
2. Check ticket exists: `curl -s http://localhost:3001/api/tickets/TKT-{ID}`
3. Re-run progress update command
4. Verify with curl command above

**Problem:** Stage not matching progress
**Solution:** Backend auto-sync should handle this. If not:
1. Check `server.js` has stageProgressMap logic
2. Restart backend server
3. Trigger progress update again

---

## 📚 Related Documents

- **Full Workflow:** `global-agent-workflow-v11.md`
- **Mandatory Guide:** `PROGRESS-UPDATE-MANDATORY.md`
- **Update Summary:** `WORKFLOW-V11.2-UPDATE-SUMMARY.md`
- **Fix Documentation:** `PROGRESS_TRACKING_FIX.md`

---

**Last Updated:** 2026-03-30
**Version:** 11.2.0
**Status:** ✅ ACTIVE
