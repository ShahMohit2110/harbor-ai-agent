# 🚨 MANDATORY DOCUMENTATION GATE - HARD BLOCK

**Version:** 2.0.0
**Priority:** CRITICAL - BLOCKS ALL TASK EXECUTION
**Status:** NON-NEGOTIABLE - MUST EXECUTE

---

## 🔒 THUMB RULE (ZERO EXCEPTIONS)

**🚨 BEFORE STARTING ANY TASK, AGENT MUST:**

1. ✅ Check EVERY repo has docs/ folder
2. ✅ Check EVERY repo has EXACTLY 12 .md files in docs/
3. ✅ Count files for EACH repo
4. ✅ Generate missing files for ANY repo with < 12 files
5. ✅ Re-verify ALL repos have 12 files
6. ✅ Output "✅ ALL REPOS: Documentation complete"
7. ✅ ONLY THEN start task

**🚨 IF ANY REPO HAS < 12 FILES:**
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

### Step 1: Discover ALL Repositories

```bash
# Navigate to workspace root
cd /Users/mohitshah/Documents/HarborService

# Find ALL repos
ALL_REPOS=$(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort)

echo "🔍 Discovered repositories:"
echo "$ALL_REPOS"
echo "Total: $(echo "$ALL_REPOS" | wc -l | tr -d ' ') repos"
```

### Step 2: Check EACH Repository (MANDATORY - EXECUTE FOR EACH)

```bash
# For EACH repository
for repo in $ALL_REPOS; do
    REPO_NAME=$(basename "$repo")

    echo ""
    echo "📚 Checking: $REPO_NAME"

    # Check if docs/ folder exists
    if [ ! -d "$repo/docs" ]; then
        echo "❌ NO DOCS FOLDER: $repo/docs/"
        echo "   Creating docs/ folder..."
        mkdir -p "$repo/docs"
        echo "   ✅ Created: $repo/docs/"
    else
        echo "✅ DOCS FOLDER EXISTS: $repo/docs/"
    fi

    # Count .md files in docs/
    MD_COUNT=$(find "$repo/docs" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')

    echo "   Current files: $MD_COUNT/12"

    # Check if exactly 12 files
    if [ "$MD_COUNT" -ne 12 ]; then
        echo "❌ INCOMPLETE: $REPO_NAME has only $MD_COUNT/12 files"
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
            if [ ! -f "$repo/docs/$file" ]; then
                MISSING_FILES+=("$file")
            fi
        done

        echo "   Generating ${#MISSING_FILES[@]} missing files..."

        # Generate each missing file
        for file in "${MISSING_FILES[@]}"; do
            echo "   📝 Generating: $repo/docs/$file"

            # Use Write tool to generate the file
            # Generate appropriate content based on:
            # - Repo type (backend/frontend/shared)
            # - File type (ARCHITECTURE vs STRUCTURE vs etc.)
            # - Existing code in the repo
        done

        echo "   ✅ Generated all missing files for $REPO_NAME"
    else
        echo "✅ COMPLETE: $REPO_NAME has all 12 files"
    fi
done
```

### Step 3: Final Verification (MANDATORY)

```bash
echo ""
echo "🔍 FINAL VERIFICATION"

ALL_COMPLETE=true
TOTAL_REPOS=0
COMPLETE_REPOS=0

for repo in $ALL_REPOS; do
    REPO_NAME=$(basename "$repo")
    TOTAL_REPOS=$((TOTAL_REPOS + 1))

    # Count files
    MD_COUNT=$(find "$repo/docs" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')

    if [ "$MD_COUNT" -eq 12 ]; then
        echo "✅ $REPO_NAME: 12/12 files complete"
        COMPLETE_REPOS=$((COMPLETE_REPOS + 1))
    else
        echo "❌ $REPO_NAME: $MD_COUNT/12 files (INCOMPLETE)"
        ALL_COMPLETE=false
    fi
done

echo ""
echo "Verification Summary:"
echo "  Total repos: $TOTAL_REPOS"
echo "  Complete repos: $COMPLETE_REPOS"
echo "  Incomplete repos: $((TOTAL_REPOS - COMPLETE_REPOS))"

if [ "$ALL_COMPLETE" = true ]; then
    echo ""
    echo "✅ ALL REPOS: Documentation complete"
    echo "✅ Total repos validated: $TOTAL_REPOS"
    echo "✅ Each repo has 12/12 files present"
    echo "🟢 PROCEEDING TO TASK EXECUTION"
else
    echo ""
    echo "❌ DOCUMENTATION INCOMPLETE"
    echo "❌ CANNOT PROCEED TO TASK EXECUTION"
    echo ""
    echo "ACTION REQUIRED:"
    echo "1. Generate missing documentation files"
    echo "2. Re-verify all repos"
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

```bash
🔍 Discovered repositories:
./harbor-ai
./harborApp
./harborWebsite
./harborUserSvc
[... other repos]
Total: 10 repos

📚 Checking: harbor-ai
✅ DOCS FOLDER EXISTS: harbor-ai/docs/
   Current files: 8/12
❌ INCOMPLETE: harbor-ai has only 8/12 files
   MISSING: 4 files
   Generating 4 missing files...
   📝 Generating: harbor-ai/docs/DATABASE.md
   📝 Generating: harbor-ai/docs/MODEL_FLOW.md
   📝 Generating: harbor-ai/docs/API_PATTERNS.md
   📝 Generating: harbor-ai/docs/AUTH.md
   ✅ Generated all missing files for harbor-ai

📚 Checking: harborApp
✅ DOCS FOLDER EXISTS: harborApp/docs/
   Current files: 1/12
❌ INCOMPLETE: harborApp has only 1/12 files
   MISSING: 11 files
   Generating 11 missing files...
   📝 Generating: harborApp/docs/STRUCTURE.md
   📝 Generating: harborApp/docs/DEPENDENCIES.md
   [... 9 more files]
   ✅ Generated all missing files for harborApp

[... continue for all repos]

🔍 FINAL VERIFICATION
✅ harbor-ai: 12/12 files complete
✅ harborApp: 12/12 files complete
✅ harborWebsite: 12/12 files complete
✅ harborUserSvc: 12/12 files complete
[... all repos]

Verification Summary:
  Total repos: 10
  Complete repos: 10
  Incomplete repos: 0

✅ ALL REPOS: Documentation complete
✅ Total repos validated: 10
✅ Each repo has 12/12 files present
🟢 PROCEEDING TO TASK EXECUTION
```

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
    ├─ Discover all repos
    ├─ Check each repo's docs/
    ├─ Count files (must be 12)
    ├─ Generate missing files
    └─ Verify all complete
    ↓
If NOT complete → BLOCK → Generate files → Re-verify
    ↓
If complete → PROCEED
    ↓
Phase 0.5: Intelligence Analysis
    ↓
[Rest of workflow]
```

---

## ✅ Summary

**Rule:** ALL repos must have ALL 12 documentation files

**Enforcement:**
1. Agent discovers ALL repos
2. Agent checks EACH repo
3. Agent COUNTS files (not just checks existence)
4. Agent GENERATES missing files
5. Agent VERIFIES all have 12 files
6. Agent OUTPUTS verification summary
7. ONLY THEN proceeds to task

**If gate fails:**
- Task is BLOCKED
- No implementation starts
- No code is written
- Agent generates missing files first

**This is NON-NEGOTIABLE - ZERO EXCEPTIONS**

---

**Status:** 🔒 ACTIVE - MANDATORY PRE-EXECUTION GATE
**Version:** 2.0.0
**Date:** 2026-03-26
**Priority:** CRITICAL - THUMB RULE FOR AGENT
