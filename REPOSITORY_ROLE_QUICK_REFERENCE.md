# 🚀 Repository Role Detection - Quick Reference

**Version:** 1.0.0 | **Last Updated:** 2026-03-19

---

## 🎯 What This Does

Automatically detects repository roles from **code patterns** (not hardcoding):

| Role | Detects | Actions |
|------|---------|---------|
| **PUBLISHABLE_PACKAGE** | Packages with `publish` script | version → build → publish |
| **DATABASE_SYNC_SERVICE** | Services with `sequelize.sync()` | database-sync after models |
| **BACKEND_SERVICE** | API servers | consume packages |
| **FRONTEND_SERVICE** | Web/mobile apps | consume APIs |

---

## 🔍 How Detection Works

### PUBLISHABLE_PACKAGE (Score ≥ 70%)

```javascript
Signals detected:
✅ Has "publish" script in package.json      (+40 points)
✅ Not marked as "private": true             (+40 points)
✅ Has publishConfig                        (+25 points)
✅ Exports modules                          (+25 points)
✅ Has consumers                            (+15 points)
✅ Has version field                        (+15 points)
✅ No server code                           (+15 points)

Total: 175 points (95% confidence)
→ Action: Publish after changes
```

### DATABASE_SYNC_SERVICE (Score ≥ 50%)

```javascript
Signals detected:
✅ Uses sequelize.sync()                    (+40 points)
✅ Has "sync" script in package.json        (+35 points)
✅ Has migrations directory                 (+30 points)
✅ Has database connection                  (+20 points)
✅ Has models directory                     (+15 points)
✅ Has database packages                    (+10 points)

Total: 150 points (82% confidence)
→ Action: Sync database if models change
```

---

## 📋 Execution Order

```
Stage 1: PUBLISHABLE_PACKAGE (if modified)
   ├─ Version update
   ├─ Build (if required)
   └─ Publish (BLOCKING)
         ↓
Stage 2: DATABASE_SYNC_SERVICE (if models changed)
   └─ Sync database schema
         ↓
Stage 3: BACKEND_SERVICE (consume packages)
   └─ Update dependencies, implement changes
         ↓
Stage 4: FRONTEND_SERVICE (consume APIs)
   └─ Update UI
```

---

## ✅ Validation Gates

Before task completion, agent verifies:

```javascript
// Check 1: If package modified → was it published?
if (packageModified && !packagePublished) {
  ❌ FAILED: Execute publish workflow
}

// Check 2: If DB sync service exists → was sync executed?
if (modelsChanged && !syncExecuted) {
  ❌ FAILED: Execute database sync
}

// Only when all pass → Task complete
```

---

## 🚨 NO HARDCODING

### ❌ Wrong Way (Hardcoded)

```javascript
if (repo.name === 'harborSharedModels') {
  publish();
}
```

### ✅ Right Way (Pattern-Based)

```javascript
const score = calculatePublishableScore(signals);
if (score >= 70) {
  publish();
}
```

---

## 📁 Files

| File | Purpose |
|------|---------|
| `intelligence/repository-role-detection.md` | Detection logic |
| `REPOSITORY_ROLE_DETECTION_INTEGRATION_GUIDE.md` | Integration steps |
| `REPOSITORY_ROLE_DETECTION_SUMMARY.md` | Full details |
| `workflows/global-agent-workflow.md` | Phase 5.6 & 6.5 |

---

## 🧪 Test It

```bash
# Agent will automatically:
1. Analyze all repositories
2. Detect roles from patterns
3. Display execution order
4. Execute in correct sequence
5. Validate completion

# Example output:
🏷️ Repository Role Detection
├─ harborSharedModels → PUBLISHABLE_PACKAGE (95%)
├─ harborUserSvc → DATABASE_SYNC_SERVICE (82%)
└─ harborWebsite → FRONTEND_SERVICE (78%)

Execution order automatically determined!
```

---

## 🎯 Key Points

- ✅ **Automatic** - No configuration needed
- ✅ **Pattern-based** - Learns from code
- ✅ **Confidence-based** - Shows reasoning
- ✅ **Blocking** - Publish must complete
- ✅ **Validating** - Checks all steps
- ✅ **Non-breaking** - Purely additive

---

**Status:** 🟢 Active | **Confidence:** 95% | **Risk:** 🟢 Low
