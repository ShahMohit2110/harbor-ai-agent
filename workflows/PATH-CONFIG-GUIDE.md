# 🔧 API Endpoint Configuration Guide

**Purpose:** Configure Harbor Ticket Tracker API endpoint for agent workflows

---

## 🎯 Default Configuration

**Default API Endpoint:** `http://localhost:3001/api`

All workflow files use this endpoint to dynamically fetch:
- `repoPath` - The workspace root path
- `projectName` - The project name
- `projectId` - The project identifier

---

## 📡 How to Change API Endpoint

If your Harbor Ticket Tracker runs on a different port or host, update these workflow files:

### Files to Update:

1. **workflows/onboarding-workflow.md**
   - Line 55: `curl -s http://localhost:3001/api/projects/{projectId}`
   - Line 65: `curl -s http://localhost:3001/api/projects/{projectId}`
   - Line 167: `curl -X POST http://localhost:3001/api/projects/{projectId}/complete`

2. **workflows/DOCUMENTATION-GATE-MANDATORY.md**
   - Line 59: `curl -s http://localhost:3001/api/projects`

### Find & Replace Command:

```bash
cd /Users/mohitshah/Documents/harbor-AI

# Replace localhost:3001 with your actual endpoint
find workflows/ -name "*.md" -type f -exec sed -i '' 's|localhost:3001|YOUR-HOST:PORT|g' {} +
```

**Example:**
```bash
# If API runs on port 4000
find workflows/ -name "*.md" -type f -exec sed -i '' 's|localhost:3001|localhost:4000|g' {} +
```

---

## ✅ Dynamic Path Verification

**CRITICAL:** All workspace paths are determined DYNAMICALLY:

```bash
# ✅ CORRECT - Dynamic path from API
REPO_PATH=$(curl -s http://localhost:3001/api/projects/{projectId} | jq -r '.data.repoPath')
# Result: /actual/user/path/to/workspace/ (dynamic)

# ❌ WRONG - Hardcoded path (NEVER DO THIS)
# REPO_PATH="/Users/mohitshah/Documents/HarborService/"  # EXAMPLE OF WRONG USAGE
# Result: Static path (breaks on different systems)
```

**All workflow files use dynamic path resolution:**
- ✅ `repoPath` extracted from API response
- ✅ `projectName` extracted from API response
- ✅ Workspace root determined from first project's repoPath
- ✅ NO hardcoded user paths in workflows

---

## 🔍 Verification Commands

**Check if workflows are using dynamic paths:**

```bash
# Should return NO RESULTS (no hardcoded paths)
grep -r "Users/mohitshah" workflows/
grep -r "Documents/Harbor" workflows/

# Should return API calls (dynamic)
grep -r "repoPath" workflows/
grep -r "jq -r '.data" workflows/
```

---

## 📊 Current Status

✅ **All paths are DYNAMIC**
- Workspace root: Fetched from API
- repoPath: Extracted from projects-data.json
- projectName: Extracted from projects-data.json
- ai-docs location: `{repoPath}/ai-docs/{sanitized-projectName}/`

❌ **NO hardcoded paths in workflows**

---

## 🚀 Best Practices

1. **Always use API calls** to get paths
2. **Never hardcode user paths** in workflows
3. **Use environment variables** for API endpoints if needed
4. **Document any custom API endpoints** in this file

---

**Last Updated:** 2026-04-12
**Status:** ✅ All paths are dynamic
