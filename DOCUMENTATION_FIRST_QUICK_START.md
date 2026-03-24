# Documentation-First Harbor AI Agent - Quick Start Guide

**Version:** 10.0.0
**Last Updated:** 2026-03-24
**Status:** 🔴 ENFORCED - MANDATORY FOR ALL TASKS

---

## 🎯 Overview

The Harbor AI Agent now operates on a **Documentation-First** approach. This means:

- ✅ Documentation is the **SINGLE SOURCE OF TRUTH** for every repository
- ✅ Documentation is **automatically validated** before ANY task
- ✅ Documentation is **automatically generated** if missing
- ✅ It is **impossible** to proceed without valid documentation

---

## 🚀 How It Works

### Automatic Pre-Task Validation

**When you give the agent ANY task:**

```
You: "Create a new Blog model"

Agent:
┌────────────────────────────────────────────┐
│ 🔒 PRE-TASK VALIDATION (AUTOMATIC)         │
├────────────────────────────────────────────┤
│ 1. Detecting repository...                 │
│    → Found: harborBlogSvc                  │
│                                             │
│ 2. Validating /docs folder...              │
│    → ❌ Missing                            │
│                                             │
│ 3. Auto-generating documentation...        │
│    ✅ ARCHITECTURE.md (2.3 KB)             │
│    ✅ STRUCTURE.md (1.8 KB)                │
│    ✅ DEPENDENCIES.md (1.2 KB)             │
│    ✅ SERVICE_RULES.md (2.1 KB)            │
│    ✅ SHARED_SERVICES.md (1.5 KB)          │
│    ✅ CHANGE_IMPACT.md (1.1 KB)            │
│    ✅ DEVELOPMENT_RULES.md (1.9 KB)        │
│    ✅ GIT_RULES.md (0.9 KB)                │
│    ✅ DATABASE.md (2.4 KB)                 │
│    ✅ MODEL_FLOW.md (3.2 KB)               │
│    ✅ API_PATTERNS.md (1.7 KB)             │
│    ✅ AUTH.md (1.3 KB)                     │
│                                             │
│ 4. Validating generated files...           │
│    ✅ All files present                    │
│    ✅ All files > 500 bytes                │
│    ✅ All critical sections present        │
│                                             │
│ 5. Loading documentation context...        │
│    ✅ Architecture loaded                  │
│    ✅ Service rules loaded                 │
│    ✅ Model flow loaded                    │
│    ✅ All dependencies mapped              │
│                                             │
│ ✅ VALIDATION COMPLETE                     │
│                                             │
│ NOW PROCEEDING WITH TASK:                  │
│ "Create a new Blog model"                  │
│                                             │
│ With full documentation context:           │
│ - Following model flow pattern from       │
│   docs/MODEL_FLOW.md                       │
│ - Applying service rules from              │
│   docs/SERVICE_RULES.md                    │
│ - Ensuring database sync compatibility     │
└────────────────────────────────────────────┘
```

---

## 📚 Required Documentation Files

### MANDATORY Files (All Repositories)

1. **ARCHITECTURE.md**
   - Service overview and purpose
   - Cross-service relationships
   - Dependency graph

2. **STRUCTURE.md**
   - Folder structure
   - Layer responsibilities

3. **DEPENDENCIES.md**
   - External dependencies
   - Internal dependencies

4. **SERVICE_RULES.md**
   - DOs and DON'Ts
   - Service boundaries

5. **SHARED_SERVICES.md**
   - Shared service inventory
   - Impact analysis

6. **CHANGE_IMPACT.md**
   - Change impact analysis
   - Safe change guidelines

7. **DEVELOPMENT_RULES.md**
   - Coding standards
   - Naming conventions

8. **GIT_RULES.md**
   - Git workflow rules
   - PR requirements

### CONDITIONAL Files (If Applicable)

9. **DATABASE.md** (if database exists)
10. **MODEL_FLOW.md** (if models exist)
11. **API_PATTERNS.md** (if API exists)
12. **AUTH.md** (if auth exists)

---

## 🎨 Usage Examples

### Example 1: New Repository (No Documentation)

**Scenario:** You just cloned a new repository with no `/docs` folder.

**What happens:**

```
You: "Add user authentication"

Agent:
🔒 PRE-TASK VALIDATION
❌ /docs folder missing
🔄 Auto-generating documentation...
✅ Generated 12 files
✅ Loaded documentation context

Now implementing: "Add user authentication"
Following patterns from: docs/AUTH.md, docs/API_PATTERNS.md
```

**Result:** Documentation automatically created, task implemented correctly.

---

### Example 2: Existing Repository (Complete Documentation)

**Scenario:** Repository already has complete `/docs`.

**What happens:**

```
You: "Create new API endpoint"

Agent:
🔒 PRE-TASK VALIDATION
✅ /docs folder exists
✅ All 12 files present
✅ All files validated
✅ Loaded documentation context

Now implementing: "Create new API endpoint"
Following patterns from: docs/API_PATTERNS.md, docs/ARCHITECTURE.md
```

**Result:** Quick validation (~2 seconds), task implemented with full context.

---

### Example 3: Partial Documentation

**Scenario:** Repository has `/docs` but missing some files.

**What happens:**

```
You: "Update database schema"

Agent:
🔒 PRE-TASK VALIDATION
✅ /docs folder exists
❌ Missing: MODEL_FLOW.md
❌ Missing: CHANGE_IMPACT.md
🔄 Generating missing files...
✅ Generated 2 files
✅ Loaded documentation context

Now implementing: "Update database schema"
Following patterns from: docs/MODEL_FLOW.md
```

**Result:** Only missing files generated, task implemented correctly.

---

## 🛠️ Manual Documentation Generation

**If you want to generate/update documentation manually:**

### Option 1: Using the Tool

```
You: "Please generate documentation for this repository"

Agent:
✅ Running documentation validator...
✅ Analyzing repository structure...
✅ Generating all 12 files...
✅ Complete!
```

### Option 2: Manual Invocation

**Read the documentation validator tool:**

```bash
# View the tool
cat harbor-ai/tools/documentation-validator-tool.md

# The tool provides step-by-step commands for:
# - Validation
# - Generation
# - Quality checks
```

---

## 🔍 Understanding Documentation Structure

### What's In Each File

**ARCHITECTURE.md**
```markdown
# Service Name Architecture

## Service Overview
- What this service does
- Why it exists
- Key responsibilities

## Microservice Role
- Type: Backend/Frontend/Shared
- Position in system

## Cross-Service Relationships
- Upstream dependencies
- Downstream dependents
- Shared services used

## Dependency Graph
[ASCII diagram of service relationships]
```

**MODEL_FLOW.md**
```markdown
# Model Flow

## Complete Data Flow
Request → Controller → Service → Repository → Database

## Model Lifecycle
1. Define model (src/models/)
2. Publish to shared-model
3. Consume in other services
4. Sync via database-sync
5. Materialize in database

## Example: User Model
- Defined in harborUserSvc
- Published to @harbor/shared-model
- Consumed by harborBlogSvc
- Synced via harborDatabaseSync
- Materialized in PostgreSQL
```

**SERVICE_RULES.md**
```markdown
# Service Rules

## DOs
✅ Use shared models from @harbor/shared-model
✅ Follow model flow pattern
✅ Validate all inputs
✅ Handle errors gracefully

## DON'Ts
❌ Don't access other service's database directly
❌ Don't duplicate model definitions
❌ Don't bypass shared services
❌ Don't hardcode configurations

## Service Boundaries
- This service owns: User data
- This service doesn't own: Blog data
- Communicate via: APIs
```

---

## 🎯 Benefits

### 1. Safer Changes

**Before:**
```
Agent: "I'll update the User model"
→ Changes model in harborUserSvc
→ BREAKS harborBlogSvc (which consumes User model)
→ BREAKS harborApp (which displays User data)
→ System broken 😱
```

**After:**
```
Agent: "I'll update the User model"
→ Reads docs/SHARED_SERVICES.md
→ Sees User model is shared
→ Checks docs/CHANGE_IMPACT.md
→ Understands 5 services depend on it
→ Plans safe change approach
→ System works ✅
```

### 2. Complete Implementation

**Before:**
```
Task: "Create Blog model"
→ Creates Blog model
→ Done?
→ NO! Missing: database-sync, ORM, API
→ System incomplete ❌
```

**After:**
```
Task: "Create Blog model"
→ Reads docs/MODEL_FLOW.md
→ Understands full lifecycle
→ Creates model + database-sync + ORM + API
→ System complete ✅
```

### 3. Cross-Service Awareness

**Before:**
```
Task: "Update shared-model"
→ Updates package
→ Doesn't know who uses it
→ Breaks 3 services 😱
```

**After:**
```
Task: "Update shared-model"
→ Reads docs/CHANGE_IMPACT.md
→ Knows harborUserSvc, harborBlogSvc, harborApp use it
→ Coordinates updates across all services
→ All services work ✅
```

---

## 📊 Validation States

### State 1: Not Started

```
⏳ Documentation: Not validated
```

### State 2: Validating

```
🔍 Documentation: Validating...
Checking /docs folder...
Verifying files...
```

### State 3: Generating (if needed)

```
🔄 Documentation: Generating...
Analyzing repository...
Creating files...
```

### State 4: Complete

```
✅ Documentation: Valid and loaded
Ready to proceed!
```

---

## 🔧 Troubleshooting

### Issue: "Documentation validation failed"

**Solution:**
```
1. Check if /docs folder exists
2. Check if all required files are present
3. Check if files have content (> 500 bytes)
4. Run documentation generation manually
```

### Issue: "Generated documentation is incomplete"

**Solution:**
```
1. Manually review generated files
2. Add missing sections
3. Update with service-specific information
4. Re-run validation
```

### Issue: "Validation takes too long"

**Note:**
```
- First time: ~30-60 seconds (generates all files)
- Subsequent: ~2 seconds (quick validation)
- This is normal and expected
```

---

## 🎓 Best Practices

### 1. Keep Documentation Updated

**When you make changes:**
```
1. Update relevant documentation files
2. Keep docs in sync with code
3. Validate before committing
```

### 2. Review Generated Documentation

**First time generation:**
```
1. Review all generated files
2. Add service-specific details
3. Correct any inaccuracies
4. Commit documentation with code
```

### 3. Use Documentation as Reference

**When implementing:**
```
1. Check docs/SERVICE_RULES.md first
2. Follow patterns in docs/MODEL_FLOW.md
3. Respect boundaries in docs/ARCHITECTURE.md
4. Verify impact in docs/CHANGE_IMPACT.md
```

---

## 📚 Related Files

### Core Files

- **`/harbor-ai/tools/documentation-validator-tool.md`**
  - Validation and generation tool
  - Complete step-by-step guide

- **`/harbor-ai/workflows/pre-task-validation-hook.md`**
  - Automatic enforcement hook
  - Trigger mechanism

- **`/harbor-ai/workflows/global-agent-workflow.md`**
  - Phase 0: Documentation Gate
  - Overall workflow

### Configuration Files

- **`/CLAUDE.md`**
  - Main instructions
  - Enforcement declaration

---

## 🚀 Getting Started

### First Time Setup

**For each repository:**

1. **Let the agent auto-generate**
   ```
   You: "Generate documentation for this repo"
   Agent: ✅ Generated 12 files
   ```

2. **Review and customize**
   ```
   You: Review docs/ files and add specifics
   ```

3. **Commit documentation**
   ```bash
   git add docs/
   git commit -m "docs: add repository documentation"
   ```

### Daily Usage

**Just work normally:**

```
You: "Implement feature X"
Agent:
  🔒 Validates documentation
  📚 Loads context
  🎯 Implements feature correctly
```

---

## ✅ Success Criteria

**You know it's working when:**

- ✅ All tasks start with validation
- ✅ Documentation is automatically generated
- ✅ Agent uses documentation for implementation
- ✅ No more "breaking changes"
- ✅ No more incomplete implementations
- ✅ Cross-service awareness improves

---

## 🎯 Summary

**The Documentation-First Harbor AI Agent:**

1. 🔒 **Automatically validates** documentation before ANY task
2. 🔄 **Automatically generates** documentation if missing
3. 📚 **Automatically loads** documentation into context
4. 🎯 **Uses documentation** for correct implementation
5. ✅ **Makes it impossible** to proceed without documentation

**Result:** Safer changes, complete implementations, better cross-service awareness.

---

**End of Quick Start Guide**

**Questions?** Reference:
- `/harbor-ai/tools/documentation-validator-tool.md` - Tool details
- `/harbor-ai/workflows/pre-task-validation-hook.md` - Hook details
- `/harbor-ai/workflows/global-agent-workflow.md` - Phase 0 details
