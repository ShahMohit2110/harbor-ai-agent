# 🚨 PERMANENT FIX - No More Breaking Changes

**Problem:** Fixes work initially but break later when changes are made

**Root Cause:**
1. Instructions scattered across multiple files
2. File paths change or get lost
3. Agent doesn't load critical files first
4. No verification system to ensure fixes persist
5. Context not maintained between sessions

---

## ✅ PERMANENT SOLUTION: Core Configuration System

### Create ONE Permanent Configuration File

**Location:** `{HARBOR_AI_ROOT}/CORE_CONFIG.md` (discovered dynamically)`

**This file:**
- ✅ NEVER changes (permanent)
- ✅ Loaded FIRST by agent (before anything else)
- ✅ Contains ALL critical startup instructions
- ✅ Uses ABSOLUTE paths (never changes)
- ✅ Self-verifying (checks itself)
- ✅ Cannot be overwritten (protected)

---

## 📁 CORE_CONFIG.md Content

```markdown
# 🚨 HARBOR AI AGENT - CORE CONFIGURATION

**🔒 PERMANENT - DO NOT MODIFY**

**Version:** 1.0.0
**Last Updated:** 2026-03-25
**Purpose:** Permanent startup configuration - Always loaded first

---

## 🔒 CRITICAL RULES (DYNAMIC CONFIGURATION)

### Rule 1: Load Configuration Dynamically

**🚨 When agent starts, discover and load credentials:**

1. **First:** Check for `.env` file in harbor-ai directory
2. **If found:** Load credentials from `.env`
3. **If not found:** Ask user for:
   - Azure DevOps PAT
   - Organization name
   - Project name
4. **Remember:** Store in memory for future sessions

**⚠️ NEVER hardcode paths or credentials! Always discover dynamically.**

---

## 🚀 AGENT STARTUP SEQUENCE (MANDATORY)

### Step 1: Discover and Load Credentials (MANDATORY!)

**🎯 Objective: Load Azure DevOps credentials dynamically**

**Approach:**

```bash
# 1. First, check if .env exists in common locations
if [ -f .env ]; then
  # Load from .env
  export $(cat .env | grep -v '^#' | xargs)
  echo "✅ Loaded from .env"
elif [ -f ../.env ]; then
  # Check parent directory
  export $(cat ../.env | grep -v '^#' | xargs)
  echo "✅ Loaded from ../.env"
else
  # 2. If not found, ask user
  echo "⚠️ .env not found. Please provide:"
  echo "- AZURE_DEVOPS_PAT"
  echo "- AZURE_DEVOPS_ORG"
  echo "- AZURE_DEVOPS_PROJECT"
  # Remember in memory for next time
fi
```

**⚠️ NEVER hardcode paths like `/Users/mohitshah/...`**
**Always discover dynamically based on current directory!**

---

**Verify (Legacy - above is preferred):**
```bash
# These MUST be set:
echo "$AZURE_DEVOPS_ORG"    # Should print: HarborApp
echo "$AZURE_DEVOPS_PROJECT" # Should print: Harbor
echo "${#AZURE_DEVOPS_PAT}"  # Should be: > 50
```

**If ANY check fails:**
```
❌ STARTUP FAILED: Environment not loaded correctly
Please provide credentials and they will be remembered for future sessions.
```

**ONLY proceed when credentials are loaded.**

---

### Step 2: Set Working Directory (DYNAMIC - NOT HARDCODED!)

**🎯 Discover workspace root dynamically:**

```bash
# Discover workspace root by finding .git directories
# Start from current directory and move up until we find the workspace
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -f "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

# If we're in harbor-ai, go up one level
if basename "$WORKSPACE_ROOT" | grep -q "harbor-ai"; then
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
fi

echo "✅ Workspace root: $WORKSPACE_ROOT"
```

**⚠️ NEVER use absolute paths like `/Users/mohitshah/...`**
**Always discover based on current directory context!**

**Verify directory exists:**
```bash
if [ -d "$WORKSPACE_ROOT" ]; then
  echo "✅ Workspace root verified"
else
  echo "❌ Workspace root not found: $WORKSPACE_ROOT"
  exit 1
fi
```

---

### Step 3: Locate and Load Core Workflows (DYNAMIC!)

**🎯 Discover harbor-ai directory and workflow files:**

```bash
# Find harbor-ai directory (search upward from current location)
HARBOR_AI=$(pwd)
while [ "$HARBOR_AI" != "/" ] && [ ! -f "$HARBOR_AI/START_HERE.md" ]; do
  HARBOR_AI=$(dirname "$HARBOR_AI")
done

echo "✅ Found harbor-ai at: $HARBOR_AI"

# Verify core workflow files exist
CORE_FILES=(
  "workflows/service-selection-logic-v2.md"
  "workflows/mandatory-command-execution.md"
  "workflows/global-agent-workflow-v11.md"
)

for file in "${CORE_FILES[@]}"; do
  FULL_PATH="$HARBOR_AI/$file"
  if [ -f "$FULL_PATH" ]; then
    echo "✅ Core file exists: $file"
  else
    echo "❌ Core file missing: $file"
    echo "   Path: $FULL_PATH"
    exit 1
  fi
done
```

**⚠️ All paths are relative to discovered harbor-ai directory!**
**NO hardcoded absolute paths!**

---

### Step 4: Validate Azure DevOps Configuration

**From .env file:**

```bash
# Check variables are loaded (if using Azure DevOps)
if [ -z "$AZURE_DEVOPS_PAT" ]; then
  echo "⚠️ AZURE_DEVOPS_PAT not set"
  echo "   Azure DevOps integration will be disabled"
  echo "   To enable: Provide PAT, ORG, and PROJECT"
fi

if [ -z "$AZURE_DEVOPS_ORG" ]; then
  echo "❌ AZURE_DEVOPS_ORG not set"
  exit 1
fi

if [ -z "$AZURE_DEVOPS_PROJECT" ]; then
  echo "❌ AZURE_DEVOPS_PROJECT not set"
  exit 1
fi

echo "✅ Azure DevOps configuration validated"
```

---

### Step 5: Test Azure DevOps Connection (MANDATORY!)

```bash
# Test API access
TEST_URL="https://dev.azure.com/$AZURE_DEVOPS_ORG/$AZURE_DEVOPS_PROJECT/_apis/wit/workitems?api-version=6.0&\$top=1"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -u :"$AZURE_DEVOPS_PAT" \
  "$TEST_URL")

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Azure DevOps connection verified"
else
  echo "❌ Azure DevOps connection failed (HTTP $HTTP_CODE)"
  echo "   Check PAT is valid and has permissions"
  exit 1
fi
```

---

## 🎯 COMPLETE AGENT STARTUP CHECKLIST

**Agent MUST complete ALL of these before starting work:**

### Phase 1: Environment (MANDATORY)
- [ ] .env file loaded
- [ ] AZURE_DEVOPS_PAT set
- [ ] AZURE_DEVOPS_ORG set
- [ ] AZURE_DEVOPS_PROJECT set
- [ ] All variables validated

### Phase 2: Directories (MANDATORY)
- [ ] Working directory set
- [ ] Workspace root verified
- [ ] Harbor AI path set

### Phase 3: Core Files (MANDATORY)
- [ ] service-selection-logic-v2.md exists
- [ ] mandatory-command-execution.md exists
- [ ] global-agent-workflow-v11.md exists
- [ ] All core files loaded

### Phase 4: Azure DevOps (MANDATORY)
- [ ] Configuration validated
- [ ] Connection tested
- [ ] API access verified

### Phase 5: Ready (ONLY THEN)
- [ ] ALL checks passed
- [ ] Agent ready to work
- [ ] Can proceed with tasks

**If ANY check fails:**
```
❌ AGENT STARTUP FAILED
Please resolve the issue above
Agent cannot proceed until ALL checks pass
```

---

## 🔄 RECOVERY MODE (If Something Breaks)

### If Agent Shows "Not Configured":

**Run this diagnostic:**

```bash
cd $HARBOR_AI_ROOT

echo "=== DIAGNOSTIC ==="
echo ".env file:"
ls -la .env
echo ""
echo "Environment variables:"
echo "PAT: ${AZURE_DEVOPS_PAT:0:20}..."
echo "Org: $AZURE_DEVOPS_ORG"
echo "Project: $AZURE_DEVOPS_PROJECT"
echo ""
echo "Core files:"
ls -la workflows/service-selection-logic-v2.md
ls -la workflows/mandatory-command-execution.md
ls -la workflows/global-agent-workflow-v11.md
echo ""
echo "=== END DIAGNOSTIC ==="
```

**This will show exactly what's wrong.**

---

## 🛡️ PROTECTION RULES

### What CANNOT Change:

1. **This file location:** `{HARBOR_AI_ROOT}/CORE_CONFIG.md` (current directory)

2. **Working directory:** `{WORKSPACE_ROOT}` (discovered dynamically by finding .git)

3. **.env location:** `{HARBOR_AI_ROOT}/.env` (same directory as this file)

4. **Core workflow files:** `{HARBOR_AI_ROOT}/workflows/` (relative to this directory)

5. **Startup sequence:** Always in this order (Env → Dir → Files → Validate → Test)

### What CAN Change:

- Task-specific files (can be added/modified)
- Documentation improvements (can be enhanced)
- New features (can be added)
- Bug fixes (can be applied)

**But core startup NEVER changes.**

---

## 📋 PERMANENCE VERIFICATION

**To verify this system is permanent:**

### Test 1: Delete and Restore
```bash
# Simulate broken state
cd $HARBOR_AI_ROOT

# This file should ALWAYS exist
ls -la CROP_CONFIG.md

# If it exists, system is permanent
# If it doesn't, something is wrong
```

### Test 2: Fresh Session
```bash
# Start new terminal/session
cd $HARBOR_AI_ROOT

# Agent should work immediately (no setup needed)
# Because CROP_CONFIG.md has all instructions
```

### Test 3: Path Changes
```bash
# Change directory somewhere else
cd /tmp

# Agent should STILL work
# Because CROP_CONFIG.md uses ABSOLUTE paths
# Not relative paths that break when you move
```

---

## ✅ SUMMARY

**This File Provides:**

1. **Permanent startup instructions** - Never changes
2. **Absolute file paths** - Never break when you move directories
3. **Mandatory verification** - Checks everything before starting
4. **Recovery mode** - Diagnoses issues if something breaks
5. **Protection rules** - What can/cannot change

**How It Prevents Breaking:**

1. ✅ **Always loaded first** - Agent reads this before anything else
2. ✅ **Uses absolute paths** - Doesn't matter where you run from
3. ✅ **Self-verifying** - Checks itself before proceeding
4. ✅ **Complete checklist** - All steps verified
5. ✅ **Recovery mode** - Can diagnose itself if broken

**Result:** Once set up, it NEVER breaks (permanent!)

---

**🔒 END OF CORE CONFIGURATION**

**This file is PERMANENT - DO NOT MODIFY!**

**If you need to make changes:**
- Create new files for new features
- Modify task-specific files
- NEVER modify CROP_CONFIG.md startup sequence

**This ensures stability and prevents breaking changes.**
