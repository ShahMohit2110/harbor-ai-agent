# 🎨 Visual Guide: Harbor AI Agent Workflow with Checkpoints

**Version:** v11.2.0
**Date:** 2026-03-30

---

## 📊 Complete Workflow Diagram

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    HARBOR AI AGENT WORKFLOW v11.2.0                         ║
║              MANDATORY 5-CHECKPOINT PROGRESSION SYSTEM                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

START
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 0.0: MANDATORY TICKET CREATION                                        │
│ ───────────────────────────────                                            │
│ ✅ Fetch Azure DevOps task                                                 │
│ ✅ Create ticket in tracker                                                │
│ ✅ Start ticket in tracker                                                 │
│ ✅ Verify ticket exists                                                    │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 0: DOCUMENTATION GATE                                                │
│ ─────────────────────────                                                 │
│ ✅ Validate all repos have /docs folder                                    │
│ ✅ Verify all repos have 12/12 .md files                                   │
│ ✅ Generate missing documentation (if needed)                              │
│ ✅ READ ALL documentation from ALL repos                                   │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✅ CHECKPOINT 1: DOCUMENTATION GATE COMPLETE                              ┃
┃ ─────────────────────────────────────                                     ┃
┃ 📊 Progress: 0% → 25%                                                     ┃
┃ 📍 Stage: Planning → Analysis                                             ┃
┃ 🔧 Command:                                                               ┃
┃   node ticketTrackerIntegration.js update "TKT-{ID}" 25 "Analysis"       ┃
┃ ✅ Verify: curl shows "progress":25                                       ┃
┃ 🟢 ONLY THEN proceed to next phase                                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 0.45: SERVICE SELECTION ANALYSIS                                     │
│ ─────────────────────────────────                                        │
│ ✅ Read ARCHITECTURE.md from ALL repos                                     │
│ ✅ Read SERVICE_RULES.md from ALL repos                                    │
│ ✅ Select existing service (NEVER create new!)                             │
│ ✅ Output service selection analysis with proof                            │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 0.5: PRE-EXECUTION INTELLIGENCE ANALYSIS                            │
│ ──────────────────────────────────────────                                 │
│ ✅ Repository Discovery                                                    │
│ ✅ Documentation Intelligence Scan                                         │
│ ✅ Deep Understanding Extraction                                           │
│ ✅ Cross-Repository Impact Analysis                                        │
│ ✅ Shared Service Awareness                                                │
│ ✅ Conflict & Risk Detection                                               │
│ ✅ Execution Plan Output                                                   │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASES 1-5: ANALYSIS & PLANNING                                            │
│ ───────────────────────────────                                           │
│ ✅ Full Repository Analysis                                                │
│ ✅ Cross-Service Intelligence                                              │
│ ✅ Documentation Generation (if needed)                                    │
│ ✅ Execution Planning                                                      │
│ ✅ Implicit Requirement Inference                                         │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✅ CHECKPOINT 2: IMPLEMENTATION STARTS                                    ┃
┃ ──────────────────────────────                                           ┃
┃ 📊 Progress: 25% → 50%                                                    ┃
┃ 📍 Stage: Analysis → Development                                          ┃
┃ 🔧 Command:                                                               ┃
┃   node ticketTrackerIntegration.js update "TKT-{ID}" 50 "Development"    ┃
┃ ✅ Verify: curl shows "progress":50                                       ┃
┃ 🟢 ONLY THEN start implementation                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 6: PATTERN-BASED IMPLEMENTATION                                      │
│ ──────────────────────────────────                                        │
│ ✅ Implement features following existing patterns                          │
│ ✅ Report file changes (automatic tracker captures this)                  │
│ ✅ Write code following service rules                                      │
│ ✅ Maintain architecture integrity                                         │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✅ CHECKPOINT 3: IMPLEMENTATION COMPLETE                                  ┃
┃ ───────────────────────────────────                                      ┃
┃ 📊 Progress: 50% → 75%                                                    ┃
┃ 📍 Stage: Development → Testing                                           ┃
┃ 🔧 Command:                                                               ┃
┃   node ticketTrackerIntegration.js update "TKT-{ID}" 75 "Testing"        ┃
┃ ✅ Verify: curl shows "progress":75                                       ┃
┃ 🟢 ONLY THEN proceed to testing                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASES 7-9: TESTING & DEBUGGING                                            │
│ ──────────────────────────────                                             │
│ ✅ Runtime Execution                                                       │
│ ✅ API Testing                                                             │
│ ✅ Auto Debug & Fix Loop (until zero errors)                              │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✅ CHECKPOINT 4: TESTING COMPLETE                                         ┃
┃ ────────────────────────────                                              ┃
┃ 📊 Progress: 75% → 90%                                                    ┃
┃ 📍 Stage: Testing → Deployment                                            ┃
┃ 🔧 Command:                                                               ┃
┃   node ticketTrackerIntegration.js update "TKT-{ID}" 90 "Deployment"     ┃
┃ ✅ Verify: curl shows "progress":90                                       ┃
┃ 🟢 ONLY THEN proceed to finalization                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  ↓
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASES 10-12: FINALIZATION & GIT                                           │
│ ─────────────────────────────────                                        │
│ ✅ Evidence-Based Validation                                              │
│ ✅ Documentation Update                                                   │
│ ✅ Git Integration (LOCAL COMMIT ONLY - NO PUSH)                          │
│    ├─ Stage changes locally                                                │
│ ├─ Commit locally                                                         │
│ └─ NO git push, NO branches, NO PRs                                       │
└────────────────────────────────────────────────────────────────────────────┘
  ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✅ CHECKPOINT 5: TASK COMPLETE                                            ┃
┃ ─────────────────────────                                                 ┃
┃ 📊 Progress: 90% → 100%                                                   ┃
┃ 📍 Stage: Deployment → Deployment                                         ┃
┃ 🎯 Status: In Progress → Completed                                        ┃
┃ 🔧 Command:                                                               ┃
┃   node ticketTrackerIntegration.js complete "TKT-{ID}" "Complete"        ┃
┃ ✅ Verify: curl shows "progress":100, "status":"Completed"               ┃
┃ 🟢 TASK COMPLETE - ALL CHECKPOINTS PASSED                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  ↓
🎉 TASK COMPLETE
```

---

## 🎯 Key Visual Patterns

### **Progress Flow:**
```
0%    25%    50%    75%    90%    100%
│      │      │      │      │       │
▼      ▼      ▼      ▼      ▼       ▼
Plan   Anal   Dev    Test   Dep    Done
```

### **Stage Progression:**
```
Planning → Analysis → Development → Testing → Deployment → Completed
   (0%)      (25%)       (50%)        (75%)      (90%)       (100%)
```

### **Checkpoint Pattern:**
```
PHASE COMPLETE → CHECKPOINT → VERIFY → NEXT PHASE
```

---

## ⚠️ Critical Rules

1. **NEVER Skip Checkpoints**
   - Each checkpoint is MANDATORY
   - Cannot proceed to next phase without passing checkpoint

2. **ALWAYS Verify Progress**
   - After each checkpoint, verify with curl
   - Only proceed if correct percentage shown

3. **NEVER Jump Stages**
   - Must visit stages in order
   - No skipping from Planning to Development

4. **ALWAYS Update Before Proceeding**
   - Progress update must happen BEFORE next phase
   - Not after, not during, but BEFORE

---

## 📋 Verification Checklist

Use this checklist to verify agent is following workflow:

- [ ] Checkpoint 1: 25% after Documentation Gate
- [ ] Checkpoint 2: 50% before Implementation
- [ ] Checkpoint 3: 75% after Implementation
- [ ] Checkpoint 4: 90% after Testing
- [ ] Checkpoint 5: 100% after Git Integration
- [ ] All stages visited in order
- [ ] No stage skipping observed
- [ ] Progress updates verified with curl
- [ ] UI shows correct progress bar movement
- [ ] Activities timeline shows all updates

---

## 🐛 Troubleshooting Flowchart

```
Progress not updating?
  │
  ├─ Backend running?
  │   ├─ NO → Start backend server
  │   └─ YES → Check ticket exists
  │       │
  │       ├─ NO → Create ticket first
  │       └─ YES → Re-run checkpoint command
  │
  └─ Still not working?
      → Check PROGRESS-UPDATE-MANDATORY.md
      → Check PROGRESS_TRACKING_FIX.md
```

---

**Last Updated:** 2026-03-30
**Version:** 11.2.0
**Status:** ✅ ACTIVE
