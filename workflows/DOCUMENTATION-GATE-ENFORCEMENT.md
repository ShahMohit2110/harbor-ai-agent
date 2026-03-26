# 🚨 CRITICAL: DOCUMENTATION GATE - PRE-TASK VALIDATION

**Version:** 1.1.0
**Priority:** CRITICAL - BLOCKS ALL TASK EXECUTION
**Status:** MANDATORY - FIRST CHECK BEFORE ANY WORK

---

## 🔒 THE RULE

**🚨 BEFORE PICKING UP ANY TASK, AGENT MUST:**

1. ✅ Check EVERY repo has a `docs/` folder
2. ✅ Check EVERY repo has ALL 12 required .md files
3. ✅ **COUNT files to ensure EXACTLY 12 present**
4. ✅ Generate missing `docs/` folders if needed
5. ✅ Generate missing .md files if needed
6. ✅ **OUTPUT validation results for EACH repo**
7. ✅ **OUTPUT file count for EACH repo**
8. ✅ Validate ALL documentation is complete
9. ✅ ONLY THEN proceed to task execution

**🚨 CRITICAL: AGENT MUST ACTUALLY EXECUTE THESE COMMANDS**

**Agent MUST:**
- ✅ ACTUALLY RUN the bash commands to check files (not just read the workflow)
- ✅ ACTUALLY COUNT files in each docs folder
- ✅ OUTPUT the validation results (must see output in agent logs)
- ✅ OUTPUT file counts for each repo (must see "X/12 files present")
- ✅ ACTUALLY CREATE missing files using Write tool
- ✅ OUTPUT "Generating: repo/docs/FILE.md" for each file created
- ✅ OUTPUT "✅ Generated all missing files for repo" when complete

**🚨 IF AGENT DOES NOT OUTPUT VALIDATION RESULTS, PHASE 0 FAILED**

**Expected Output:**
```
🔍 Discovering repositories...
harbor-ai
harborApp
harborWebsite
[other repos]

📚 Validating: harborApp
❌ harborApp: Only 1/12 files present
   MISSING: STRUCTURE.md
   MISSING: DEPENDENCIES.md
   [... 9 more missing files]
   Generating missing files...
   📝 Generating: harborApp/docs/STRUCTURE.md
   📝 Generating: harborApp/docs/DEPENDENCIES.md
   [... generate all 11 files]
   ✅ Generated all missing files for harborApp

🔍 FINAL VALIDATION
✅ ALL REPOS: Documentation complete
✅ Total repos validated: [number]
🟢 PROCEEDING TO TASK EXECUTION
```

**If NO validation output is seen, agent SKIPPED Phase 0 = CRITICAL FAILURE**

**If ANY repo is missing documentation:**
- ❌ BLOCK task execution
- ✅ Generate missing documentation FIRST
- ✅ Validate all files exist
- ✅ OUTPUT "All repos have 12/12 files present"
- ✅ ONLY THEN proceed to task

---

## 📋 Required Documentation Files (12 Total - MANDATORY)

**For EVERY repository in workspace, MUST have:**

1. **ARCHITECTURE.md** - Service overview, relationships, dependency graph
2. **STRUCTURE.md** - Folder structure, layer responsibilities
3. **DEPENDENCIES.md** - External and internal dependencies
4. **DATABASE.md** - DB type, ORM, schema, relationships (if applicable)
5. **MODEL_FLOW.md** - Complete data flow (controller → service → repository → DB)
6. **API_PATTERNS.md** - Request/response, error handling (if applicable)
7. **AUTH.md** - Authentication & authorization flow (if applicable)
8. **SERVICE_RULES.md** - DOs and DON'Ts, boundaries
9. **SHARED_SERVICES.md** - Shared service inventory and impact
10. **CHANGE_IMPACT.md** - Impact analysis and safe change guidelines
11. **DEVELOPMENT_RULES.md** - Coding standards, conventions
12. **GIT_RULES.md** - Git rules (NO PUSH, NO BRANCHES)

**🚨 ALL 12 FILES ARE MANDATORY FOR EVERY REPO**

---

## 🚀 PRE-TASK VALIDATION WORKFLOW

### Step 1: Discover ALL Repositories

```bash
# Find ALL git repositories in workspace
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

cd "$WORKSPACE_ROOT"

# Discover ALL repos dynamically
ALL_REPOS=$(find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort)

echo "🔍 Discovered repositories:"
echo "$ALL_REPOS"
echo "Total: $(echo "$ALL_REPOS" | wc -l) repos"
```

### Step 2: Validate Documentation for EACH Repository

```bash
# For EACH repository
for repo in $ALL_REPOS; do
    REPO_NAME=$(basename "$repo")
    echo ""
    echo "📚 Validating: $REPO_NAME"

    # Check if docs/ folder exists
    if [ ! -d "$repo/docs" ]; then
        echo "❌ NO DOCS FOLDER: $repo/docs/"
        echo "   Creating docs/ folder..."
        mkdir -p "$repo/docs"
        echo "   ✅ Created: $repo/docs/"
    else
        echo "✅ DOCS FOLDER EXISTS: $repo/docs/"
    fi

    # Check if all 12 required files exist
    MISSING_COUNT=0
    MISSING_FILES=()

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

    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$repo/docs/$file" ]; then
            echo "   ❌ MISSING: $repo/docs/$file"
            MISSING_FILES+=("$file")
            MISSING_COUNT=$((MISSING_COUNT + 1))
        else
            echo "   ✅ EXISTS: $repo/docs/$file"
        fi
    done

    # If missing files, generate them
    if [ $MISSING_COUNT -gt 0 ]; then
        echo "⚠️  $REPO_NAME: Missing $MISSING_COUNT files"
        echo "   Generating missing files..."

        # Generate each missing file
        for file in "${MISSING_FILES[@]}"; do
            echo "   📝 Generating: $repo/docs/$file"
            # Call documentation generation script
            # This would generate appropriate content for each file
        done

        echo "   ✅ Generated all missing files for $REPO_NAME"
    else
        echo "✅ $REPO_NAME: All 12 files present"
    fi
done
```

### Step 3: Final Validation

```bash
echo ""
echo "🔍 FINAL VALIDATION"

ALL_COMPLETE=true

for repo in $ALL_REPOS; do
    REPO_NAME=$(basename "$repo")

    # Check docs folder exists
    if [ ! -d "$repo/docs" ]; then
        echo "❌ FAIL: $REPO_NAME - No docs folder"
        ALL_COMPLETE=false
        continue
    fi

    # Check all 12 files exist
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

    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$repo/docs/$file" ]; then
            echo "❌ FAIL: $REPO_NAME - Missing $file"
            ALL_COMPLETE=false
        fi
    done
done

if [ "$ALL_COMPLETE" = true ]; then
    echo ""
    echo "✅ ALL REPOS: Documentation complete"
    echo "✅ Total repos validated: $(echo "$ALL_REPOS" | wc -l)"
    echo "🟢 PROCEEDING TO TASK EXECUTION"
else
    echo ""
    echo "❌ DOCUMENTATION INCOMPLETE"
    echo "❌ Cannot proceed to task execution"
    echo "Please generate missing documentation files first"
    exit 1
fi
```

---

## 🚨 BLOCKING RULE

**Task execution is BLOCKED until:**

```markdown
## Documentation Validation Checklist

**Discovered Repositories:** {count}

### Per-Repository Validation:

**{REPO-1}:**
- [ ] docs/ folder exists
- [ ] ARCHITECTURE.md present
- [ ] STRUCTURE.md present
- [ ] DEPENDENCIES.md present
- [ ] DATABASE.md present (if applicable)
- [ ] MODEL_FLOW.md present (if applicable)
- [ ] API_PATTERNS.md present (if applicable)
- [ ] AUTH.md present (if applicable)
- [ ] SERVICE_RULES.md present
- [ ] SHARED_SERVICES.md present
- [ ] CHANGE_IMPACT.md present
- [ ] DEVELOPMENT_RULES.md present
- [ ] GIT_RULES.md present
- Status: COMPLETE or INCOMPLETE

**{REPO-2}:**
- [Same checklist]
- Status: COMPLETE or INCOMPLETE

**[Continue for ALL repos...]**

### Final Validation:
- [ ] ALL repos have docs/ folder
- [ ] ALL repos have ARCHITECTURE.md
- [ ] ALL repos have STRUCTURE.md
- [ ] ALL repos have DEPENDENCIES.md
- [ ] ALL repos have DATABASE.md (if applicable)
- [ ] ALL repos have MODEL_FLOW.md (if applicable)
- [ ] ALL repos have API_PATTERNS.md (if applicable)
- [ ] ALL repos have AUTH.md (if applicable)
- [ ] ALL repos have SERVICE_RULES.md
- [ ] ALL repos have SHARED_SERVICES.md
- [ ] ALL repos have CHANGE_IMPACT.md
- [ ] ALL repos have DEVELOPMENT_RULES.md
- [ ] ALL repos have GIT_RULES.md

**Overall Status:**
- [ ] ✅ COMPLETE - Proceed to task
- [ ] ❌ INCOMPLETE - Generate missing files first
```

**❌ IF INCOMPLETE:**
```
❌ TASK BLOCKED - DOCUMENTATION INCOMPLETE

Missing Documentation:
- Repository: {repo-name}
- Missing files: {list}

ACTION REQUIRED:
1. Generate missing documentation files
2. Re-validate all repos
3. Only then proceed to task

CANNOT PROCEED UNTIL ALL DOCUMENTATION IS COMPLETE
```

---

## 🎯 Example Output

### ✅ Correct - All Documentation Complete:

```
🔍 Discovered repositories:
{workspace}/harbor-ai
{workspace}/harborApp
{workspace}/harborWebsite
{workspace}/harborUserSvc
{workspace}/harborJobSvc
Total: 5 repos

📚 Validating: harbor-ai
✅ DOCS FOLDER EXISTS: harbor-ai/docs/
✅ EXISTS: harbor-ai/docs/ARCHITECTURE.md
✅ EXISTS: harbor-ai/docs/STRUCTURE.md
✅ EXISTS: harbor-ai/docs/DEPENDENCIES.md
[... all 12 files ...]
✅ harbor-ai: All 12 files present

📚 Validating: harborApp
✅ DOCS FOLDER EXISTS: harborApp/docs/
✅ EXISTS: harborApp/docs/ARCHITECTURE.md
✅ EXISTS: harborApp/docs/STRUCTURE.md
[... all 12 files ...]
✅ harborApp: All 12 files present

[... continue for all repos ...]

🔍 FINAL VALIDATION
✅ ALL REPOS: Documentation complete
✅ Total repos validated: 5
🟢 PROCEEDING TO TASK EXECUTION
```

### ❌ Wrong - Missing Documentation:

```
🔍 Discovered repositories:
{workspace}/harbor-ai
{workspace}/harborApp
{workspace}/harborWebsite
Total: 3 repos

📚 Validating: harbor-ai
✅ DOCS FOLDER EXISTS: harbor-ai/docs/
✅ EXISTS: harbor-ai/docs/ARCHITECTURE.md
[... all 12 files ...]
✅ harbor-ai: All 12 files present

📚 Validating: harborApp
❌ NO DOCS FOLDER: harborApp/docs/
   Creating docs/ folder...
   ✅ Created: harborApp/docs/
   ❌ MISSING: harborApp/docs/STRUCTURE.md
   ❌ MISSING: harborApp/docs/DEPENDENCIES.md
   ❌ MISSING: harborApp/docs/SERVICE_RULES.md
   ⚠️  harborApp: Missing 3 files
   Generating missing files...
   📝 Generating: harborApp/docs/STRUCTURE.md
   📝 Generating: harborApp/docs/DEPENDENCIES.md
   📝 Generating: harborApp/docs/SERVICE_RULES.md
   ✅ Generated all missing files for harborApp

🔍 FINAL VALIDATION
✅ ALL REPOS: Documentation complete
✅ Total repos validated: 3
🟢 PROCEEDING TO TASK EXECUTION
```

---

## 📝 Auto-Generation Template

**When generating missing .md files, use this template:**

```markdown
# {FILE_NAME}

**Repository:** {REPO-NAME}
**Generated:** {DATE}
**Purpose:** {FILE_PURPOSE}

---

## {CONTENT_BASED_ON_FILE_TYPE}

*Auto-generated content based on repository analysis*
```

**For each file type:**

**ARCHITECTURE.md:**
- Repository purpose
- Main components
- Service relationships
- Technology stack

**STRUCTURE.md:**
- Folder structure
- File organization
- Layer responsibilities
- Entry points

**DEPENDENCIES.md:**
- External dependencies (npm, pip, etc.)
- Internal dependencies
- Version requirements

**DATABASE.md:**
- Database type (if applicable)
- ORM/ODM used
- Schema overview
- Relationships

**MODEL_FLOW.md:**
- Data flow diagram
- Request/response flow
- Layer interactions

**API_PATTERNS.md:**
- Endpoint patterns (if applicable)
- Request/response format
- Error handling
- Authentication

**AUTH.md:**
- Authentication method (if applicable)
- Authorization flow
- Token management
- Permission levels

**SERVICE_RULES.md:**
- What this service handles
- What it doesn't handle
- Extension rules
- Boundaries

**SHARED_SERVICES.md:**
- Shared services used
- Impact of shared service changes
- Dependencies

**CHANGE_IMPACT.md:**
- Impact of changes
- Breaking changes
- Migration requirements

**DEVELOPMENT_RULES.md:**
- Coding standards
- Conventions
- Best practices
- Linting rules

**GIT_RULES.md:**
- Branch strategy
- Commit conventions
- 🚨 **NO GIT PUSH - ZERO TOLERANCE**
- PR requirements
```

---

## 🔒 ENFORCEMENT

### Before Task Execution:

```bash
# Validation script
./validate-documentation.sh

if [ $? -ne 0 ]; then
    echo "❌ DOCUMENTATION VALIDATION FAILED"
    echo "   Task execution BLOCKED"
    echo "   Please complete documentation first"
    exit 1
fi

echo "✅ DOCUMENTATION VALIDATION PASSED"
echo "   Proceeding to task execution..."
```

### Automatic Recovery:

If documentation is incomplete:
1. ✅ Detect missing files
2. ✅ Generate missing files automatically
3. ✅ Re-validate
4. ✅ Only then proceed to task

---

## ✅ SUMMARY

**Rule:** ALL repos must have complete documentation BEFORE task execution

**Required:** 12 .md files in EVERY repo's docs/ folder

**Enforcement:**
- ✅ Check ALL repos before task execution
- ✅ Generate missing files automatically
- ✅ Validate all files exist
- ✅ Block task until complete

**Result:**
- ✅ All repos have complete documentation
- ✅ Agent can make informed decisions
- ✅ No assumptions about repo structure
- ✅ Proper implementation based on documentation

---

**Status:** 🔒 CRITICAL - BLOCKS ALL TASK EXECUTION
**Enforcement:** MANDATORY - NO EXCEPTIONS
**Date:** 2026-03-26
