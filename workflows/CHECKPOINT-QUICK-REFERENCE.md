# 🚀 Quick Reference: 5-Checkpoint Progression System

**Version:** v11.2.0
**Date:** 2026-03-30
**Status:** ✅ ACTIVE

---

## 📍 The 3 MANDATORY Checkpoints

### **Checkpoint 1: Documentation Gate Complete** 📚
- **Progress:** 33%
- **Stage:** Analysis
- **Location:** After Phase 0 (Documentation Gate)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js update "TKT-{ID}" 33 "Analysis" "Documentation gate complete - all docs read and validated"
  ```

### **Checkpoint 2: Implementation Starts** 🔨
- **Progress:** 67%
- **Stage:** Development
- **Location:** Before Phase 1 (Implementation)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js update "TKT-{ID}" 67 "Development" "Starting implementation"
  ```

### **Checkpoint 3: Task Complete** 🎉
- **Progress:** 100%
- **Stage:** Testing
- **Status:** Completed
- **Location:** After Phase 2 (Testing)
- **Command:**
  ```bash
  node ticketTrackerIntegration.js complete "TKT-{ID}" "Task completed successfully"
  ```

---

## 🎯 What This Fixes

**Before (BROKEN):**
```
0% → 67% → 100% (jumping, skipping stages)
Planning → Development → Testing (skipping Analysis)
```

**After (FIXED):**
```
0% → 33% → 67% → 100% (smooth progression)
Planning → Analysis → Development → Testing → Completed
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
