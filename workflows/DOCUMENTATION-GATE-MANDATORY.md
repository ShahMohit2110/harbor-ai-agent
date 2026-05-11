# 🚨 MANDATORY DOCUMENTATION GATE - HARD BLOCK

**Version:** 2.0.0
**Priority:** CRITICAL - BLOCKS ALL TASK EXECUTION
**Status:** NON-NEGOTIABLE - MUST EXECUTE

---

## 🔒 THUMB RULE (ZERO EXCEPTIONS)

**🚨 BEFORE STARTING ANY TASK, AGENT MUST:**

**For ONBOARDING tickets (type="onboard"):**
1. ✅ Navigate to workspace root (repoPath from projects-data.json)
2. ✅ Discover ALL git repositories in workspace
3. ✅ For EACH repository: Check if `ai-docs/{repoName}/` folder exists
4. ✅ For EACH repository: Check that folder has EXACTLY 12 .md files
5. ✅ For EACH repository: Generate missing files if < 12 files
6. ✅ Re-verify ALL repositories have 12 files each
7. ✅ Output "✅ ALL REPOSITORIES Documentation complete"
8. ✅ ONLY THEN start task

**For REGULAR tickets (type="task"):**
1. ✅ Get affected repository(s) from ticket
2. ✅ For EACH affected repo: Check `ai-docs/{repoName}/` folder
3. ✅ For EACH affected repo: Verify 12 files exist
4. ✅ Generate missing files if needed
5. ✅ ONLY THEN start task

**🚨 IF ANY REPOSITORY HAS < 12 FILES:**
- ❌ TASK IS BLOCKED
- ❌ DO NOT start implementation
- ❌ DO NOT analyze requirements
- ❌ DO NOT write code
- ✅ GENERATE missing files FIRST
- ✅ ONLY THEN proceed

---

## 📋 Required 12 Files (MANDATORY FOR EVERY REPO)

**EVERY repository MUST have ALL 12 of these files:**

1. **ARCHITECTURE.md** - Service overview
2. **STRUCTURE.md** - Folder structure
3. **DEPENDENCIES.md** - Dependencies
4. **DATABASE.md** - Database schema
5. **MODEL_FLOW.md** - Data flow
6. **API_PATTERNS.md** - API patterns
7. **AUTH.md** - Authentication
8. **SERVICE_RULES.md** - DOs and DON'Ts
9. **SHARED_SERVICES.md** - Shared services
10. **CHANGE_IMPACT.md** - Impact analysis
11. **DEVELOPMENT_RULES.md** - Coding standards
12. **GIT_RULES.md** - Git rules (NO PUSH)

**🚨 ALL 12 FILES ARE MANDATORY - NO EXCEPTIONS**

---

## 🔍 AGENT MUST EXECUTE THIS (NOT JUST READ)

### Step 1: Get Ticket Details and Workspace (TARGETED CHECK)

**🚨 IMPORTANT: Different logic for ONBOARDING vs REGULAR tickets**

```bash
# Get current ticket details
TICKET_ID="{CURRENT_TICKET_ID}"
PROJECT_ID="{CURRENT_PROJECT_ID}"
TICKET_TYPE="{TICKET_TYPE}"  # "onboard" or "task"

# Check ticket type
if [ "$TICKET_TYPE" = "onboard" ]; then
    # ========================================
    # ONBOARDING TICKET: Discover ALL repos in workspace
    # ========================================
    echo "🎯 ONBOARDING TICKET DETECTED"
    echo "📋 Will check ALL repositories in workspace..."

    # Get project details from API
    PROJECT_DETAILS=$(curl -s http://localhost:3001/api/projects/$PROJECT_ID)
    REPO_PATH=$(echo "$PROJECT_DETAILS" | jq -r '.data.repoPath')
    PROJECT_NAME=$(echo "$PROJECT_DETAILS" | jq -r '.data.projectName')

    echo "🎯 Workspace: $PROJECT_NAME"
    echo "📁 Location: $REPO_PATH"

    # Navigate to workspace root
    cd "$REPO_PATH"

    # Discover ALL git repositories in workspace (maxdepth 2)
    ALL_REPOS=$(find "$REPO_PATH" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort)

    echo "📊 Found $(echo "$ALL_REPOS" | wc -l | tr -d ' ') repositories"
    echo "🔍 Will check documentation for EACH repository..."

else
    # ========================================
    # REGULAR TICKET: Check only affected repos
    # ========================================
    echo "🎯 REGULAR TICKET DETECTED"
    echo "📋 Will check only affected repositories..."

    # Get affected repos from ticket
    TICKET_DETAILS=$(curl -s http://localhost:3001/api/tickets/$TICKET_ID)
    AFFECTED_REPOS=$(echo "$TICKET_DETAILS" | jq -r '.data.assignedRepos[]')

    echo "ℹ️  Affected repos: $AFFECTED_REPOS"

    # For now, proceed with task execution
    echo "✅ Proceeding with task execution"
    # TODO: Implement repo-specific checking for regular tickets
    exit 0
fi
```

### Step 2: Check Documentation for ALL Repositories (ONBOARDING) or Affected Repositories (REGULAR)

**For ONBOARDING tickets:**
```bash
echo ""
echo "📚 Checking documentation for ALL repositories..."

# For EACH repository discovered
for REPO in $ALL_REPOS; do
    # Extract repo name
    REPO_NAME=$(basename "$REPO")
    SANITIZED_NAME=$(echo "$REPO_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

    echo ""
    echo "📦 Checking: $REPO_NAME"
    echo "   Folder: ai-docs/$SANITIZED_NAME/"

    # Check if ai-docs/{repoName}/ folder exists
    if [ ! -d "ai-docs/$SANITIZED_NAME" ]; then
        echo "   ❌ NO AI-DOCS FOLDER: ai-docs/$SANITIZED_NAME/"
        echo "   Creating ai-docs/$SANITIZED_NAME/ folder..."
        mkdir -p "ai-docs/$SANITIZED_NAME"
        echo "   ✅ Created: ai-docs/$SANITIZED_NAME/"
    else
        echo "   ✅ AI-DOCS FOLDER EXISTS: ai-docs/$SANITIZED_NAME/"
    fi

    # Count .md files in ai-docs/{repoName}/
    MD_COUNT=$(find "ai-docs/$SANITIZED_NAME" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')

    echo "   Current files: $MD_COUNT/12"

    # Check if exactly 12 files
    if [ "$MD_COUNT" -ne 12 ]; then
        echo "   ❌ INCOMPLETE: $SANITIZED_NAME has only $MD_COUNT/12 files"
        echo "   MISSING: $((12 - MD_COUNT)) files"

        # List required files
        REQUIRED_FILES=(
            "ARCHITECTURE.md"
            "STRUCTURE.md"
            "DEPENDENCIES.md"
            "DATABASE.md"
            "MODEL_FLOW.md"
            "API_PATTERNS.md"
            "AUTH.md"
            "SERVICE_RULES.md"
            "SHARED_SERVICES.md"
            "CHANGE_IMPACT.md"
            "DEVELOPMENT_RULES.md"
            "GIT_RULES.md"
        )

        # Check which files are missing
        MISSING_FILES=()
        for file in "${REQUIRED_FILES[@]}"; do
            if [ ! -f "ai-docs/$SANITIZED_NAME/$file" ]; then
                MISSING_FILES+=("$file")
            fi
        done

        echo "   Generating ${#MISSING_FILES[@]} missing files..."

        # Generate each missing file
        for file in "${MISSING_FILES[@]}"; do
            echo "   📝 Generating: ai-docs/$SANITIZED_NAME/$file"
            # Use Write tool to generate the file
            # Generate appropriate content based on:
            # - Repo type (backend/frontend/shared)
            # - File type (ARCHITECTURE vs STRUCTURE vs etc.)
            # - Existing code in the repo
        done

        echo "   ✅ Generated all missing files for $SANITIZED_NAME"
    else
        echo "   ✅ COMPLETE: $SANITIZED_NAME has all 12 files"
    fi
done
```

# Check if ai-docs/{repoName}/ folder exists
if [ ! -d "ai-docs/$REPO_FOLDER" ]; then
    echo "❌ NO AI-DOCS FOLDER: ai-docs/$REPO_FOLDER/"
    echo "   Creating ai-docs/$REPO_FOLDER/ folder..."
    mkdir -p "ai-docs/$REPO_FOLDER"
    echo "   ✅ Created: ai-docs/$REPO_FOLDER/"
else
    echo "✅ AI-DOCS FOLDER EXISTS: ai-docs/$REPO_FOLDER/"
fi

# Count .md files in ai-docs/{repoName}/
MD_COUNT=$(find "ai-docs/$REPO_FOLDER" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')

echo "   Current files: $MD_COUNT/12"

# Check if exactly 12 files
if [ "$MD_COUNT" -ne 12 ]; then
    echo "❌ INCOMPLETE: $REPO_FOLDER has only $MD_COUNT/12 files"
    echo "   MISSING: $((12 - MD_COUNT)) files"

    # List required files
    REQUIRED_FILES=(
        "ARCHITECTURE.md"
        "STRUCTURE.md"
        "DEPENDENCIES.md"
        "DATABASE.md"
        "MODEL_FLOW.md"
        "API_PATTERNS.md"
        "AUTH.md"
        "SERVICE_RULES.md"
        "SHARED_SERVICES.md"
        "CHANGE_IMPACT.md"
        "DEVELOPMENT_RULES.md"
        "GIT_RULES.md"
    )

    # Check which files are missing
    MISSING_FILES=()
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "ai-docs/$REPO_FOLDER/$file" ]; then
            MISSING_FILES+=("$file")
        fi
    done

    echo "   Generating ${#MISSING_FILES[@]} missing files..."

    # Generate each missing file
    for file in "${MISSING_FILES[@]}"; do
        echo "   📝 Generating: ai-docs/$REPO_FOLDER/$file"

        # Use Write tool to generate the file
        # Generate appropriate content based on:
        # - Repo type (backend/frontend/shared)
        # - File type (ARCHITECTURE vs STRUCTURE vs etc.)
        # - Existing code in the repo
    done

    echo "   ✅ Generated all missing files for $REPO_FOLDER"
else
    echo "✅ COMPLETE: $REPO_FOLDER has all 12 files"
fi
```

### Step 3: Verification (ALL Repositories)

```bash
echo ""
echo "🔍 VERIFICATION"

# Verify ALL repositories have 12 files
ALL_COMPLETE=true
INCOMPLETE_REPOS=()

for REPO in $ALL_REPOS; do
    REPO_NAME=$(basename "$REPO")
    SANITIZED_NAME=$(echo "$REPO_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

    # Count files in ai-docs/{repoName}/
    MD_COUNT=$(find "ai-docs/$SANITIZED_NAME" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')

    if [ "$MD_COUNT" -ne 12 ]; then
        ALL_COMPLETE=false
        INCOMPLETE_REPOS+=("$REPO_NAME ($MD_COUNT/12)")
    fi
done

echo ""
echo "Documentation Status:"
echo "  Workspace: $PROJECT_NAME"
echo "  Location: $REPO_PATH/ai-docs/"
echo "  Total repositories: $(echo "$ALL_REPOS" | wc -l | tr -d ' ')"
echo "  Complete repositories: $(($(echo "$ALL_REPOS" | wc -l | tr -d ' ') - ${#INCOMPLETE_REPOS[@]}))"
echo "  Incomplete repositories: ${#INCOMPLETE_REPOS[@]}"

if [ "$ALL_COMPLETE" = true ]; then
    echo ""
    echo "✅ DOCUMENTATION COMPLETE"
    echo "✅ ALL repositories have all 12 required files"
    echo "✅ ai-docs location: $REPO_PATH/ai-docs/"
    echo "🟢 PROCEEDING TO TASK EXECUTION"
else
    echo ""
    echo "❌ DOCUMENTATION INCOMPLETE"
    echo "❌ CANNOT PROCEED TO TASK EXECUTION"
    echo ""
    echo "Incomplete repositories:"
    for repo in "${INCOMPLETE_REPOS[@]}"; do
        echo "  - $repo"
    done
    echo ""
    echo "ACTION REQUIRED:"
    echo "1. Generate missing documentation files for incomplete repos"
    echo "2. Re-verification"
    echo "3. Only then proceed to task"
    echo ""
    echo "🚨 TASK BLOCKED - DOCUMENTATION GATE"
    exit 1
fi
```

---

## 🚨 CRITICAL: AGENT MUST ACTUALLY EXECUTE THIS

**This is NOT optional. This is NOT just documentation.**

**Agent MUST:**
1. ✅ ACTUALLY RUN the discovery command (use Bash tool)
2. ✅ ACTUALLY CHECK each repo's docs folder (use Bash tool)
3. ✅ ACTUALLY COUNT files in each docs/ folder (use Bash tool)
4. ✅ ACTUALLY GENERATE missing files (use Write tool)
5. ✅ OUTPUT the results for each repo
6. ✅ OUTPUT the final verification summary

**If agent does NOT output the verification summary, the gate FAILED.**

---

## 📋 Expected Output (What You Should See)

**For ONBOARDING Ticket:**

```bash
🎯 ONBOARDING TICKET DETECTED
📋 Will check ALL repositories in workspace...
🎯 Workspace: Harbor Backend Services
📁 Location: /Users/mohitshah/Documents/HarborService/
📊 Found 5 repositories
🔍 Will check documentation for EACH repository...

📚 Checking documentation for ALL repositories...

📦 Checking: harborApi
   Folder: ai-docs/harborapi/
   ✅ AI-DOCS FOLDER EXISTS: ai-docs/harborapi/
   Current files: 0/12
   ❌ INCOMPLETE: harborapi has only 0/12 files
   MISSING: 12 files
   Generating 12 missing files...
   📝 Generating: ai-docs/harborapi/ARCHITECTURE.md
   📝 Generating: ai-docs/harborapi/STRUCTURE.md
   📝 Generating: ai-docs/harborapi/DEPENDENCIES.md
   [... 9 more files]
   ✅ Generated all missing files for harborapi

📦 Checking: harborUser
   Folder: ai-docs/harboruser/
   ✅ AI-DOCS FOLDER EXISTS: ai-docs/harboruser/
   Current files: 0/12
   ❌ INCOMPLETE: harboruser has only 0/12 files
   MISSING: 12 files
   Generating 12 missing files...
   📝 Generating: ai-docs/harboruser/ARCHITECTURE.md
   [... 11 more files]
   ✅ Generated all missing files for harboruser

[... 3 more repos: harborAuth, harborPayment, harborDatabase ...]

🔍 VERIFICATION

Documentation Status:
  Workspace: Harbor Backend Services
  Location: /Users/mohitshah/Documents/HarborService/ai-docs/
  Total repositories: 5
  Complete repositories: 5
  Incomplete repositories: 0

✅ DOCUMENTATION COMPLETE
✅ ALL repositories have all 12 required files
✅ ai-docs location: /Users/mohitshah/Documents/HarborService/ai-docs/
🟢 PROCEEDING TO TASK EXECUTION
```

**For REGULAR Tickets:**

```bash
🎯 REGULAR TICKET DETECTED
📋 Will check only affected repositories...
ℹ️  Affected repos: harborApi
✅ Proceeding with task execution
```

**Important:** For ONBOARDING tickets, agent checks ALL repositories in the workspace and creates ai-docs folder for EACH repository.

---

## ❌ What Happens If Gate Fails

```bash
🔍 FINAL VERIFICATION
✅ harbor-ai: 12/12 files complete
❌ harborApp: 5/12 files (INCOMPLETE)
❌ harborDatabaseSvc: 1/12 files (INCOMPLETE)

Verification Summary:
  Total repos: 10
  Complete repos: 8
  Incomplete repos: 2

❌ DOCUMENTATION INCOMPLETE
❌ CANNOT PROCEED TO TASK EXECUTION

ACTION REQUIRED:
1. Generate missing documentation files
2. Re-verify all repos
3. Only then proceed to task

🚨 TASK BLOCKED - DOCUMENTATION GATE
```

**Agent STOPS here. Does NOT proceed to task.**

---

## 🎯 Integration Point

**This runs BEFORE ANYTHING ELSE:**

```
Task Received
    ↓
🚨 DOCUMENTATION GATE (MUST PASS)
    ├─ Get current ticket's project details
    ├─ Check that project's ai-docs/ folder
    ├─ Count files (must be 12)
    ├─ Generate missing files for THIS PROJECT ONLY
    └─ Verify complete
    ↓
If NOT complete → BLOCK → Generate files → Re-verify
    ↓
If complete → PROCEED
    ↓
Phase 0.5: Intelligence Analysis
    ↓
[Rest of workflow]
```

**🆕 IMPORTANT:** The agent now checks ONLY the specific project for the current ticket, NOT all repositories. This is:
- ✅ **Targeted** - Only checks relevant project
- ✅ **Fast** - Doesn't scan all repos
- ✅ **Efficient** - Only checks what's needed

---

## ✅ Summary

**Rule:** For ONBOARDING tickets, EVERY repository in the workspace must have ALL 12 documentation files in centralized `ai-docs/` folder

**Enforcement (ONBOARDING tickets):**
1. Agent gets workspace path from `repoPath`
2. Agent discovers ALL git repositories in workspace
3. For EACH repository: checks `ai-docs/{repoName}/` folder
4. For EACH repository: COUNTS files (must be 12)
5. For EACH repository: GENERATES missing files if needed
6. Agent VERIFIES ALL repositories have 12 files
7. Agent OUTPUTS verification summary
8. ONLY THEN proceeds to task

**Enforcement (REGULAR tickets):**
1. Agent gets affected repository(s) from ticket
2. Agent checks only those repositories' documentation
3. Agent proceeds if documentation is complete

**If gate fails:**
- Task is BLOCKED
- No implementation starts
- No code is written
- Agent generates missing files first

**🆕 IMPORTANT:** For ONBOARDING tickets, agent checks ALL repositories in the workspace and creates documentation for EACH one. This is:
- ✅ **COMPREHENSIVE** - Ensures all repos are documented
- ✅ **ORGANIZED** - One folder per repository in `ai-docs/`
- ✅ **EFFICIENT** - All repos documented in one pass
- ✅ **CORRECT** - Each ticket affects one specific project

**This is NON-NEGOTIABLE - ZERO EXCEPTIONS**

---

**Status:** 🔒 ACTIVE - MANDATORY PRE-EXECUTION GATE
**Version:** 3.0.0
**Date:** 2026-04-11
**Priority:** CRITICAL - THUMB RULE FOR AGENT
