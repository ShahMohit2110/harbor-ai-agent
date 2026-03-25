# 🚀 START HERE - Harbor AI Agent

**🔒 PERMANENT STARTUP INSTRUCTIONS**

---

## ⚡ Quick Start (Read This First!)

**🚨 When the Harbor AI Agent starts, it MUST:**

### Step 1: Load Configuration (Dynamic)

**Check for Azure DevOps credentials:**

1. **First:** Try to load from `.env` file in current directory
2. **If not found:** Ask user for required information
3. **Remember:** Store in memory for future sessions

**Required credentials:**
- `AZURE_DEVOPS_PAT` - Personal Access Token
- `AZURE_DEVOPS_ORG` - Organization name (e.g., HarborApp)
- `AZURE_DEVOPS_PROJECT` - Project name (e.g., Harbor)

### Step 2: Read Core Configuration

```bash
# Read the permanent core configuration
cat CORE_CONFIG.md
```

**⚠️ DO NOT proceed with tasks until credentials are loaded!**

---

## 🎯 The Key to Permanent Fixes

**The Problem:** Fixes work, then break later
**The Solution:** ONE permanent configuration file that NEVER changes

### This File: START_HERE.md
**Purpose:** Points to CORE_CONFIG.md (always the first thing to read)

### Core File: CROP_CONFIG.md
**Purpose:** Contains permanent startup instructions that never break

---

## 📋 What Makes This Permanent

### 1. Absolute Paths (Never Break)

```
❌ WRONG: Relative paths
   - ../workflows/file.md (breaks when you move)
   - ./file.md (breaks when you change directory)

✅ RIGHT: Absolute paths
   - /Users/mohitshah/Documents/HarborService/harbor-ai/workflows/file.md
   - Always works, no matter where you are
```

### 2. Single Source of Truth

```
❌ WRONG: Instructions scattered across files
   - Some in CLAUDE.md
   - Some in workflow files
   - Some in other files
   - Hard to maintain, breaks when files change

✅ RIGHT: ONE file with all startup instructions
   - CROP_CONFIG.md has EVERYTHING
   - Always read this first
   - Other files can change, startup stays the same
```

### 3. Self-Verifying

```
❌ WRONG: Assume files exist
   - "Read workflow file"
   - But what if file was deleted?
   - Agent breaks

✅ RIGHT: Verify files exist before using
   - "Check if workflow file exists"
   - If missing: Report error, don't break
   - Self-diagnosing
```

### 4. Mandatory Checklist

```
❌ WRONG: Skip steps if in rush
   - "I'll just skip .env loading this time"
   - Breaks immediately

✅ RIGHT: ALL steps mandatory
   - Load .env
   - Validate variables
   - Verify files
   - Test connection
   - No shortcuts
```

---

## 🔄 Why Fixes Break (And How This Prevents It)

### Common Causes of Breaking:

1. **File Paths Change**
   - Problem: Relative paths break when you move directories
   - Solution: Use absolute paths (never change)

2. **Instructions Scattered**
   - Problem: Changes in one file don't reflect in others
   - Solution: ONE source of truth (CROP_CONFIG.md)

3. **No Verification**
   - Problem: Files deleted or moved, agent doesn't notice
   - Solution: Verify everything before using

4. **Shortcuts Taken**
   - Problem: Skip steps to go faster, breaks
   - Solution: MANDATORY checklist, no skipping

5. **No Recovery**
   - Problem: When something breaks, don't know what's wrong
   - Solution: Diagnostic mode in CROP_CONFIG.md

### How This System Prevents Breaking:

1. ✅ **Absolute paths** - Never break due to directory changes
2. ✅ **Single source** - CROP_CONFIG.md has everything
3. ✅ **Self-verifying** - Checks itself before running
4. ✅ **Mandatory steps** - Can't skip anything
5. ✅ **Diagnostic mode** - Can tell you what's wrong

---

## 📁 File Structure (Permanent)

```
/harbor-ai/
├── START_HERE.md (this file)
│   └── Points to: CROP_CONFIG.md
│
├── CROP_CONFIG.md (PERMANENT - Never changes)
│   ├── .env loading instructions
│   ├── Working directory setup
│   ├── Core file loading
│   ├── Validation steps
│   └── Recovery diagnostics
│
├── .env (Your credentials - permanent)
│   ├── AZURE_DEVOPS_PAT
│   ├── AZURE_DEVOPS_ORG
│   └── AZURE_DEVOPS_PROJECT
│
└── workflows/
    ├── service-selection-logic-v2.md (won't break)
    ├── mandatory-command-execution.md (won't break)
    └── global-agent-workflow-v11.md (won't break)
```

---

## 🚀 How Agent Starts (Permanent Sequence)

### Every Time Agent Starts:

```
1. Agent loads
   ↓
2. READ: START_HERE.md (this file)
   ↓
3. READ: CROP_CONFIG.md (permanent instructions)
   ↓
4. EXECUTE: Startup sequence from CROP_CONFIG.md
   ├─ Load .env
   ├─ Set working directory
   ├─ Load core files
   ├─ Validate everything
   └─ Test connection
   ↓
5. ONLY THEN: Proceed with agent tasks
```

**This sequence NEVER changes.**

---

## ✅ Verification (Is It Working?)

### Test 1: Read Core Config
```bash
cat /Users/mohitshah/Documents/HarborService/harbor-ai/CORE_CONFIG.md
```

**Expected:** Shows complete startup instructions

### Test 2: Check .env
```bash
cat /Users/mohitshah/Documents/HarborService/harbor-ai/.env
```

**Expected:** Shows your Azure DevOps credentials

### Test 3: Check Core Files
```bash
ls -la /Users/mohitshah/Documents/HarborService/harbor-ai/workflows/
```

**Expected:** Shows all workflow files

### Test 4: Run Diagnostic
```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai
source .env
echo "Org: $AZURE_DEVOPS_ORG"
```

**Expected:** Shows "Org: HarborApp"

---

## 🛡️ Protection Rules

### What Can Change:
- Task-specific instructions
- New feature files
- Bug fixes
- Documentation improvements

### What CANNOT Change:
- **START_HERE.md** location
- **CROP_CONFIG.md** location
- **CROP_CONFIG.md** startup sequence
- Absolute paths to core files
- .env file location

---

## 🎯 How to Use

### For Agent Development:

**When agent starts:**

1. **READ** `/Users/mohitshah/Documents/HarborService/harbor-ai/START_HERE.md`

2. **READ** `/Users/mohitshah/Documents/HarborService/harbor-ai/CORE_CONFIG.md`

3. **FOLLOW** the startup sequence in CROP_CONFIG.md

4. **VERIFY** all checklist items pass

5. **ONLY THEN** proceed with tasks

### For Making Changes:

**When you need to add/change something:**

1. **Create new file** for new feature (don't modify core)
2. **Update CROP_CONFIG.md** ONLY if:
   - Adding a new core file (rare)
   - Changing absolute path (rare)
3. **NEVER modify** the startup sequence itself

---

## ✅ Summary

**The Problem:**
- Fixes work initially
- Break when changes are made
- Hard to maintain

**The Solution:**
- ONE permanent core configuration (CROP_CONFIG.md)
- ONE entry point (START_HERE.md)
- Absolute paths (never break)
- Self-verifying (catches issues)
- Mandatory steps (can't skip)

**The Result:**
- ✅ Works immediately
- ✅ Works permanently
- ✅ Self-diagnosing if issues
- ✅ Easy to maintain
- ✅ No more breaking

---

**🔒 This system is PERMANENT and will NOT break!**

**End of START_HERE**
