# 🚀 Repository Role Detection - Integration Guide

**Version:** 1.0.0
**Last Updated:** 2026-03-19
**Purpose:** Integration guide for pattern-based repository role detection

---

## ✅ What Was Already Implemented

Your agent already has these detection systems:

| File | Detection Type | Status |
|------|---------------|--------|
| `package-lifecycle-detection.md` | Publishable packages ✅ | Complete |
| `repository-rule-detector.md` | Database sync ✅ | Complete |
| `auto-operation-detection.md` | Auto-operations ✅ | Complete |
| `repository-role-detection.md` (NEW) | Unified role detection ✅ | New |

---

## 🔧 Integration Steps

### Step 1: Update Main Workflow

Add role detection to the main workflow Phase 1:

```markdown
### Phase 1.5: Repository Role Detection (NEW - MANDATORY)

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/intelligence/repository-role-detection.md`

**🚨 CRITICAL: Detect repository roles before implementation.**

For EACH repository, detect:

1. **PUBLISHABLE_PACKAGE** - Does this repo need publishing?
2. **DATABASE_SYNC_SERVICE** - Does this repo sync databases?
3. **BACKEND_SERVICE** - Is this an API service?
4. **FRONTEND_SERVICE** - Is this a frontend app?

Output:
```javascript
{
  repository: "harborSharedModels",
  role: "PUBLISHABLE_PACKAGE",
  confidence: 95,
  requiredActions: ["version-update", "build", "publish"]
}
```

This is NON-BREAKING and purely additive.
```

### Step 2: Update Execution Flow

Add role-based execution ordering:

```markdown
### Phase 4.5: Role-Based Execution Ordering (NEW)

**Before implementing, determine execution order from detected roles:**

1. **PUBLISHABLE_PACKAGE** (if modified)
   - Update version
   - Build (if required)
   - Publish (BLOCKING)
   - ↓ Must complete before consumers proceed

2. **DATABASE_SYNC_SERVICE** (if models changed)
   - Verify model registration
   - Run sync command
   - ↓ Must happen after package publish

3. **BACKEND_SERVICE** (consume packages)
   - Update dependencies
   - Install packages
   - Implement changes
   - ↓ Frontend depends on this

4. **FRONTEND_SERVICE** (consume APIs)
   - Update API clients
   - Implement UI changes
```

### Step 3: Add Validation Gate

Add validation before task completion:

```markdown
### Phase 7: Role-Based Validation (NEW - MANDATORY)

**Before marking task complete, verify:**

```javascript
await validateRepositoryTasks(affectedRepositories, task);

// Validates:
// - If package modified → was it published?
// - If DB sync service exists → was it executed?
// - No dependency step was skipped
```

If validation fails:
1. Display what was missed
2. Execute missing steps
3. Re-validate
4. Only proceed when all checks pass
```

---

## 📋 Integration Checklist

Use this checklist to verify integration:

- [ ] Repository role detection added to Phase 1
- [ ] Role-based execution ordering added to Phase 4
- [ ] Role-based validation added to Phase 7
- [ ] All detections are pattern-based (not hardcoded)
- [ ] No existing functionality is broken
- [ ] Confidence scores are displayed
- [ ] Execution order is visible to user
- [ ] Validation prevents incomplete tasks

---

## 🧪 Testing the Integration

### Test Case 1: Package Modification

```bash
# Given: harborSharedModels is a PUBLISHABLE_PACKAGE
# When: Models are modified
# Then:
# ✅ Version is incremented
# ✅ Package is built (if required)
# ✅ Package is published
# ✅ Dependent services are updated
# ❌ Agent does NOT proceed until publish completes
```

### Test Case 2: Database Sync

```bash
# Given: harborUserSvc is a DATABASE_SYNC_SERVICE
# When: Models are modified in harborSharedModels
# Then:
# ✅ harborSharedModels is published first
# ✅ harborUserSvc runs database sync
# ✅ Schema is verified
# ❌ Agent does NOT skip sync step
```

### Test Case 3: No Hardcoding

```bash
# Given: Any new repository
# When: Repository is added to workspace
# Then:
# ✅ Agent detects role from patterns
# ✅ No configuration changes needed
# ✅ Works automatically
```

---

## 🎯 Key Principles

### ✅ DO:

- Detect roles from code patterns
- Use confidence scores
- Display reasoning to user
- Execute in dependency order
- Validate before completion

### ❌ DON'T:

- Hardcode repository names
- Assume roles from name patterns
- Skip validation steps
- Break existing workflows
- Make changes without detection

---

## 📊 Example Flow

```
Task: "Add email field to User model"

1. 🔍 Role Detection
   harborSharedModels → PUBLISHABLE_PACKAGE (95%)
   harborUserSvc → DATABASE_SYNC_SERVICE (82%)
   harborWebsite → FRONTEND_SERVICE (78%)

2. 📋 Execution Plan
   Stage 1: harborSharedModels
     → Add email field to User model
     → Increment version
     → Build
     → Publish

   Stage 2: harborUserSvc
     → Update dependency version
     → Install
     → Sync database

   Stage 3: harborWebsite
     → Update API client
     → Add email field to UI

3. ✅ Validation
   ✓ Package published
   ✓ Database synced
   ✓ All services updated
   ✓ No steps skipped

4. 🎉 Complete
```

---

## 🚨 Important Notes

1. **Non-Breaking**: This is purely additive. No existing code is modified.

2. **Pattern-Based**: All detection uses code patterns, not hardcoded names.

3. **Confidence-Based**: Every decision includes a confidence score and reasoning.

4. **Visible**: The user sees all decisions and their rationale.

5. **Blocking**: Critical steps (like publish) block progress until complete.

---

## 🔗 Related Files

| File | Purpose |
|------|---------|
| `intelligence/repository-role-detection.md` | Role detection logic |
| `workflows/package-lifecycle-detection.md` | Package lifecycle detection |
| `workflows/repository-rule-detector.md` | Repository rule detection |
| `intelligence/auto-operation-detection.md` | Auto-operation detection |
| `workflows/global-agent-workflow.md` | Main workflow (update needed) |

---

## 📝 Next Steps

1. ✅ **DONE**: Created `repository-role-detection.md`
2. ⏭️ **TODO**: Update `global-agent-workflow.md` to reference new detection
3. ⏭️ **TODO**: Test on actual repositories
4. ⏭️ **TODO**: Monitor confidence scores
5. ⏭️ **TODO**: Refine detection patterns if needed

---

**Version:** 1.0.0
**Status:** 🟢 Ready for Integration
**Risk:** 🟢 Low (Non-breaking enhancement)

---

*Last Updated: 2026-03-19*
