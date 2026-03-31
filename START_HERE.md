# 🚀 START HERE - Harbor AI Agent

**🔒 PERMANENT STARTUP INSTRUCTIONS**

---

## ⚡ Quick Start (Read This First!)

**🚨 When the Harbor AI Agent starts, it MUST:**

### Step 1: MANDATORY Documentation Gate (FIRST - BEFORE ANYTHING ELSE)

**Reference:** `workflows/DOCUMENTATION-GATE-MANDATORY.md`

**🚨 THUMB RULE: NO DOCUMENTATION = NO TASK**

**Agent MUST:**
1. ✅ Discover ALL repositories in workspace
2. ✅ Check EACH repository has docs/ folder
3. ✅ Count .md files in EACH docs/ folder (must be 12)
4. ✅ Generate missing files if count < 12
5. ✅ Re-verify ALL repos have 12/12 files
6. ✅ Output "✅ ALL REPOS: Documentation complete"
7. ✅ ONLY THEN proceed to task

**⚠️ DO NOT proceed with ANY task until documentation gate is PASSED!**

---

### Step 2: Load Configuration (Dynamic)

**Check for Azure DevOps credentials:**

1. **First:** Try to load from `.env` file in current directory
2. **If not found:** Ask user for required information
3. **Remember:** Store in memory for future sessions

**Required credentials:**
- `AZURE_DEVOPS_PAT` - Personal Access Token
- `AZURE_DEVOPS_ORG` - Organization name (e.g., HarborApp)
- `AZURE_DEVOPS_PROJECT` - Project name (e.g., Harbor)

**⚠️ DO NOT proceed with tasks until documentation gate is PASSED!**

---

### Step 3: Read Main Workflow

```bash
# Read the main workflow
cat workflows/global-agent-workflow-v11.md
```

**This contains the complete 12-phase autonomous execution protocol.**

---

## 🎯 Agent Execution Flow

**Order is CRITICAL:**

1. **Documentation Gate** (FIRST - MANDATORY)
   - Validate all repos have complete documentation
   - Generate missing files
   - Verify 12/12 files present

2. **Phase 0.5: Pre-Execution Intelligence Analysis**
   - Read all documentation
   - Analyze system impact
   - Plan implementation

3. **Phase 1-12: Implementation**
   - Execute complete workflow
   - Commit locally (NO PUSH)
   - Complete task

---

### 1. Absolute Paths (Never Break)

```
❌ WRONG: Relative paths
   - ../workflows/file.md (breaks when you move)
   - ./file.md (breaks when you change directory)

✅ RIGHT: Absolute paths
   - {HARBOR_AI_ROOT}/workflows/file.md
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

3. **No Verification**
   - Problem: Files deleted or moved, agent doesn't notice
   - Solution: Verify everything before using

4. **Shortcuts Taken**
   - Problem: Skip steps to go faster, breaks
   - Solution: MANDATORY checklist, no skipping

5. **No Recovery**
   - Problem: When something breaks, don't know what's wrong

### How This System Prevents Breaking:

1. ✅ **Absolute paths** - Never break due to directory changes
3. ✅ **Self-verifying** - Checks itself before running
4. ✅ **Mandatory steps** - Can't skip anything
5. ✅ **Diagnostic mode** - Can tell you what's wrong

---

## 📁 File Structure (Permanent)

```
/harbor-ai/
├── START_HERE.md (this file)
│
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
   ↓
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
```

**Expected:** Shows complete startup instructions

### Test 2: Check .env
```bash
cat $HARBOR_AI_ROOT/.env
```

**Expected:** Shows your Azure DevOps credentials

### Test 3: Check Core Files
```bash
ls -la $HARBOR_AI_ROOT/workflows/
```

**Expected:** Shows all workflow files

### Test 4: Run Diagnostic
```bash
cd $HARBOR_AI_ROOT
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
- Absolute paths to core files
- .env file location

---

## 🎯 How to Use

### For Agent Development:

**When agent starts:**

1. **READ** `$HARBOR_AI_ROOT/START_HERE.md`



4. **VERIFY** all checklist items pass

5. **ONLY THEN** proceed with tasks

### For Making Changes:

**When you need to add/change something:**

1. **Create new file** for new feature (don't modify core)
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
