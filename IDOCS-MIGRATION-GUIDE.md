# 🔄 Documentation Migration: Distributed → Centralized

**Version:** 1.0.0
**Date:** 2026-04-11
**Status:** ✅ ACTIVE - New Standard

---

## 📋 Overview

**🚨 MAJOR ARCHITECTURAL CHANGE**

The Harbor AI documentation system has migrated from a **distributed model** (docs folder in each repository) to a **centralized model** (single `ai-docs` folder at workspace root).

---

## 🔄 What Changed?

### **BEFORE (Distributed - v1.0)**

```
workspace/
├── repo-1/
│   ├── docs/
│   │   ├── ARCHITECTURE.md
│   │   ├── STRUCTURE.md
│   │   └── ... (12 files)
│   └── src/
├── repo-2/
│   ├── docs/
│   │   ├── ARCHITECTURE.md
│   │   └── ... (12 files)
│   └── src/
└── repo-3/
    ├── docs/
    │   └── ... (12 files)
    └── src/
```

**Issues:**
- ❌ Documentation scattered across repos
- ❌ Hard to maintain consistency
- ❌ Duplicate documentation efforts
- ❌ Difficult to get cross-repo view

### **AFTER (Centralized - v2.0)** ✅

```
workspace/
├── ai-docs/              # 🆕 SINGLE CENTRALIZED FOLDER
│   ├── repo-1/
│   │   ├── ARCHITECTURE.md
│   │   ├── STRUCTURE.md
│   │   └── ... (12 files)
│   ├── repo-2/
│   │   ├── ARCHITECTURE.md
│   │   └── ... (12 files)
│   └── repo-3/
│       └── ... (12 files)
├── repo-1/
│   └── src/             # ✅ No docs folder
├── repo-2/
│   └── src/             # ✅ No docs folder
└── repo-3/
    └── src/             # ✅ No docs folder
```

**Benefits:**
- ✅ Single source of truth for AI documentation
- ✅ Easy to maintain consistency
- ✅ Clear separation: AI docs vs. repo code
- ✅ Simplified backup and version control
- ✅ Easier cross-repository documentation

---

## 🎯 Required 12 Files (Same as Before)

**EACH repository subfolder in `ai-docs/` must have ALL 12 files:**

1. **ARCHITECTURE.md** - Service overview and relationships
2. **STRUCTURE.md** - Folder structure and responsibilities
3. **DEPENDENCIES.md** - External and internal dependencies
4. **DATABASE.md** - DB schema, ORM, relationships
5. **MODEL_FLOW.md** - Data flow through the system
6. **API_PATTERNS.md** - Request/response patterns
7. **AUTH.md** - Authentication/authorization
8. **SERVICE_RULES.md** - DOs and DON'Ts for the service
9. **SHARED_SERVICES.md** - Shared service inventory
10. **CHANGE_IMPACT.md** - Impact analysis guidelines
11. **DEVELOPMENT_RULES.md** - Coding standards
12. **GIT_RULES.md** - Git workflow rules

---

## 🔍 Agent Workflow Changes

### **Documentation Gate (Updated)**

**OLD:**
```bash
# Check each repo's docs/ folder
if [ ! -d "$repo/docs" ]; then
    mkdir -p "$repo/docs"
fi
```

**NEW:**
```bash
# Check ai-docs/{repoName}/ folder
if [ ! -d "ai-docs/$repoName" ]; then
    mkdir -p "ai-docs/$repoName"
fi
```

### **Onboarding Workflow (Updated)**

**OLD:**
```bash
# Navigate to repository
cd {repoPath}/docs

# Create documentation files
```

**NEW:**
```bash
# Navigate to centralized location
cd workspace-root/ai-docs/{repoName}

# Create documentation files
```

---

## 📂 Path Reference Guide

### **OLD Paths (v1.0 - Deprecated):**
- `repo-1/docs/ARCHITECTURE.md`
- `repo-2/docs/STRUCTURE.md`
- `repo-3/docs/API_PATTERNS.md`

### **NEW Paths (v2.0 - Current):**
- `ai-docs/repo-1/ARCHITECTURE.md`
- `ai-docs/repo-2/STRUCTURE.md`
- `ai-docs/repo-3/API_PATTERNS.md`

---

## ⚠️ Migration Steps (For Existing Projects)

### **If you have existing `docs/` folders:**

1. **Create `ai-docs/` folder:**
   ```bash
   mkdir -p ai-docs
   ```

2. **Move each repo's docs:**
   ```bash
   # For each repository
   mv repo-1/docs ai-docs/repo-1
   mv repo-2/docs ai-docs/repo-2
   mv repo-3/docs ai-docs/repo-3
   ```

3. **Verify structure:**
   ```bash
   ls -la ai-docs/
   # Should show: repo-1/, repo-2/, repo-3/, etc.

   ls -la ai-docs/repo-1/
   # Should show: 12 .md files
   ```

4. **Update agent workflows:**
   - The agent will automatically use the new structure
   - No code changes needed (workflows updated)

---

## 🚀 New Onboarding Flow

### **For New Projects:**

1. **Agent receives onboarding ticket**
2. **Agent creates `ai-docs/{projectName}/` folder**
3. **Agent generates 12 documentation files**
4. **Agent validates 12/12 files present**
5. **Onboarding complete**

### **Example:**

```bash
# Onboarding ticket: "Onboarding: harbor-user-service"

# Agent creates:
ai-docs/harbor-user-service/
├── ARCHITECTURE.md
├── STRUCTURE.md
├── DEPENDENCIES.md
├── DATABASE.md
├── MODEL_FLOW.md
├── API_PATTERNS.md
├── AUTH.md
├── SERVICE_RULES.md
├── SHARED_SERVICES.md
├── CHANGE_IMPACT.md
├── DEVELOPMENT_RULES.md
└── GIT_RULES.md
```

---

## ✅ Verification Commands

### **Check ai-docs structure:**
```bash
# List all repos in ai-docs
ls -la ai-docs/

# Count files for a specific repo
find ai-docs/repo-1 -name "*.md" | wc -l
# Should output: 12

# Verify all repos have 12 files
for repo in ai-docs/*/; do
    echo "$(basename "$repo"): $(find "$repo" -name "*.md" | wc -l) files"
done
```

---

## 🔄 Backward Compatibility

### **IMPORTANT: Old `docs/` folders should be removed after migration**

**Why?**
- Prevents confusion about which location is authoritative
- Avoids maintaining duplicate documentation
- Ensures agent uses correct paths

**How to safely remove:**
```bash
# After verifying ai-docs/ has all files
rm -rf repo-1/docs
rm -rf repo-2/docs
rm -rf repo-3/docs
```

---

## 📊 Comparison Summary

| Feature | Old (v1.0) | New (v2.0) |
|---------|-----------|-----------|
| **Location** | Each repo has `docs/` | Single `ai-docs/` at root |
| **Structure** | Distributed | Centralized |
| **Maintenance** | Per-repo | Single location |
| **Consistency** | Hard to enforce | Easy to verify |
| **Cross-repo view** | Difficult | Simple |
| **Backup** | Multiple locations | Single location |
| **Path length** | `repo-1/docs/FILE.md` | `ai-docs/repo-1/FILE.md` |

---

## 🎯 Benefits Summary

### **For AI Agent:**
- ✅ Single documentation gate check
- ✅ Consistent file paths across all repos
- ✅ Easier to validate completeness
- ✅ Simpler onboarding process

### **For Developers:**
- ✅ Clear separation: docs vs. code
- ✅ Easier to find AI-generated docs
- ✅ Better overview of all repos
- ✅ Simplified documentation maintenance

### **For Project:**
- ✅ Better organization
- ✅ Reduced duplication
- ✅ Improved consistency
- ✅ Easier migration and backup

---

## 📝 Updated Workflows

These workflow files have been updated:

1. ✅ `workflows/onboarding-workflow.md` - Creates ai-docs structure
2. ✅ `workflows/DOCUMENTATION-GATE-MANDATORY.md` - Checks ai-docs
3. ✅ `workflows/global-agent-workflow-v11.md` - Uses ai-docs paths
4. ✅ `START_HERE.md` - Updated documentation gate references
5. ✅ `RULES.md` - Updated rules to reference ai-docs

---

## ✅ Migration Checklist

For projects with existing `docs/` folders:

- [ ] Create `ai-docs/` folder at workspace root
- [ ] Move each repo's `docs/` to `ai-docs/{repoName}/`
- [ ] Verify all repos have 12/12 files in new location
- [ ] Test agent can access documentation
- [ ] Remove old `docs/` folders from repos
- [ ] Update any hardcoded path references
- [ ] Commit changes to version control

---

## 🚨 Important Notes

1. **AI Agent automatically uses new structure**
   - No agent code changes needed
   - Workflows updated to use `ai-docs/`

2. **Old `docs/` folders are deprecated**
   - Should be removed after migration
   - Agent will NOT check old locations

3. **Documentation requirements unchanged**
   - Still 12 files per repository
   - Same file names and content structure
   - Just different location

4. **Migration is one-time**
   - Once complete, no ongoing maintenance needed
   - New projects automatically use new structure

---

**Status:** ✅ ACTIVE - All workflows updated
**Version:** 2.0.0
**Date:** 2026-04-11
**Migration Required:** Yes (for existing projects with `docs/` folders)

---

**End of Migration Guide**
