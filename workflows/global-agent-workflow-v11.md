# Global Agent Workflow - Master Control System v11.0

## 🔴 READ THIS FIRST - NO NEW REPOSITORIES

**Reference:** `NO-NEW-REPOS.md`

**🚨 BEFORE DOING ANYTHING, AGENT MUST:**
1. ✅ Read `NO-NEW-REPOS.md`
2. ✅ Discover ALL existing repositories
3. ✅ Choose ONE existing repository
4. ✅ Work in that existing repository
5. ✅ NEVER create new repository

**This is NON-NEGOTIABLE.**

**Version:** 11.2.0
**Last Updated:** 2026-03-30
**Purpose:** System-aware decision-making agent with mandatory pre-execution intelligence analysis and MANDATORY 5-checkpoint progress progression system

**🆕 v11.2.0 - MANDATORY 5-CHECKPOINT PROGRESSION SYSTEM:**
- ✅ Checkpoint 1: After Documentation Gate → 25% (Analysis)
- ✅ Checkpoint 2: Before Implementation → 50% (Development)
- ✅ Checkpoint 3: After Implementation → 75% (Testing)
- ✅ Checkpoint 4: After Testing → 90% (Deployment)
- ✅ Checkpoint 5: After Git Integration → 100% (Completed)
- ✅ Each checkpoint MANDATES progress update before proceeding
- ✅ Prevents stage skipping and ensures smooth progression
- ✅ Reference: `workflows/PROGRESS-UPDATE-MANDATORY.md`

**🚨 DYNAMIC PATH CONFIGURATION:**

All commands in this workflow use dynamic paths. Set environment variable:

```bash
# Option 1: Set environment variable (recommended)
export HARBOR_AI_ROOT="$(pwd)"
export HARBOR_TRACKER_UTILS="${HARBOR_AI_ROOT}/harbor-ticket-tracker/backend/src/utils"

# Option 2: Let workflow auto-detect (fallback)
# Workflow will automatically find paths relative to current directory
```

**All checkpoint commands use:** `cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"`

---

## 🔴 READ THIS FIRST - NO BRANCH CREATION

**Reference:** `NO-BRANCH-CREATION.md`

**🚨 BEFORE DOING ANYTHING, AGENT MUST:**
1. ✅ Read `NO-BRANCH-CREATION.md`
2. ✅ Understand: NO BRANCH CREATION
3. ✅ Work on CURRENT branch only
4. ✅ NO git commands
5. ✅ ONLY then proceed

**This is NON-NEGOTIABLE.**

---

## 🔴 PHASE 0.0: MANDATORY TICKET CREATION (NON-SKIPPABLE)

**🚨 THIS IS THE ABSOLUTE FIRST STEP - CANNOT BE SKIPPED - ZERO EXCEPTIONS**

**Reference:** `workflows/PHASE-0-MANDATORY-TICKET-CREATION.md`

**Before ANYTHING else, agent MUST:**

1. ✅ Fetch Azure DevOps task
2. ✅ **IMMEDIATELY CREATE TICKET IN TRACKER** (execute bash command)
3. ✅ **IMMEDIATELY START TICKET** (execute bash command)
4. ✅ Verify ticket exists in tracker
5. ✅ ONLY THEN proceed to Phase 0 (Documentation Gate)

**🚨 IF THIS STEP IS SKIPPED: CRITICAL FAILURE**

**Quick Reference Commands:**

```bash
# After fetching Azure DevOps task, IMMEDIATELY execute this ONE command:

cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
./mandatory-ticket-creation.sh "${AZURE_DEVOPS_ID}" "${AZURE_DEVOPS_TITLE}" "${AZURE_DEVOPS_DESCRIPTION}" "${SELECTED_SERVICE}"

# This single command creates AND starts the ticket automatically
# Expected output: "🎉 MANDATORY TICKET CREATION COMPLETE" + "🟢 PROCEEDING TO PHASE 0"
```

**See:** `workflows/PHASE-0-MANDATORY-TICKET-CREATION.md` for complete details

---

## 🚨 MAJOR UPDATE v11.0 - PRE-EXECUTION INTELLIGENCE ANALYSIS 🚨

**What's New:**
- 🧠 **System-Aware Decision Making** - Agent behaves like senior architect, not task executor
- 🔍 **Mandatory Pre-Execution Analysis** - Deep analysis across ALL repos before ANY implementation
- 🚫 **Anti-Pattern Prevention** - Prevents duplicate services, wrong repo choices, breaking changes
- 📊 **Structured Analysis Output** - Mandatory analysis summary before implementation
- 🎯 **Smart Decision Engine** - Prefer modifying existing services over creating new ones
- 🚨 **AUTONOMOUS EXECUTION** - NO PERMISSION CHECKPOINTS - Agent continues automatically until complete

**🚨 CRITICAL RULES:**

> **"NO BRANCH CREATION - WORK ON CURRENT BRANCH ONLY - ZERO EXCEPTIONS"**
>
> **"NO GIT COMMANDS AT ALL - NO ADD, COMMIT, PUSH, STATUS, LOG, DIFF, CHECKOUT"**
>
> **"NO DOCUMENTATION = NO TASK - ALL REPOS MUST HAVE 12/12 FILES"**
>
> **"NO ANALYSIS = NO IMPLEMENTATION"**
>
> **"NO PERMISSION CHECKPOINTS - FULL AUTONOMY"**

---

## 🔴 ABSOLUTE PROHIBITION - NO BRANCH CREATION

**🚨 AGENT MUST NOT:**
- ❌ Create new branches (feature branches, any branches)
- ❌ Switch branches (git checkout, git switch)
- ❌ Use ANY git commands (add, commit, push, status, log, diff)
- ❌ Modify git repository in ANY way

**✅ AGENT ONLY:**
- ✅ Writes/modifies code files
- ✅ Runs tests
- ✅ Updates documentation
- ✅ Works on CURRENT BRANCH ONLY

**User handles ALL git operations including branch creation.**

---

## 🚨 CRITICAL: MANDATORY FIRST STEP - DOCUMENTATION GATE

**Reference:** `workflows/DOCUMENTATION-GATE-MANDATORY.md`

**🚨 THUMB RULE - ZERO EXCEPTIONS:**

**BEFORE DOING ANYTHING ELSE, AGENT MUST:**

1. ✅ Discover ALL repositories in workspace
2. ✅ Check EACH repository has docs/ folder
3. ✅ Count .md files in EACH docs/ folder
4. ✅ Verify EACH repo has EXACTLY 12 .md files
5. ✅ Generate missing files if count < 12
6. ✅ Re-verify ALL repos have 12/12 files
7. ✅ Output "✅ ALL REPOS: Documentation complete"
8. ✅ ONLY THEN proceed to task

**🚨 IF ANY REPO HAS < 12 FILES:**
- ❌ TASK IS BLOCKED
- ❌ DO NOT analyze requirements
- ❌ DO NOT write code
- ✅ GENERATE missing files FIRST
- ✅ ONLY THEN proceed

**This is the ABSOLUTE FIRST STEP - BEFORE ANYTHING ELSE.**

---

## 🚨 CRITICAL: FOR ALL COMMAND EXECUTION


---

# 🚀 12-PHASE AUTONOMOUS EXECUTION PROTOCOL (ENHANCED - FULLY AUTONOMOUS)

---

## 📚 Phase 0: Documentation Gate (AUTOMATIC - NON-SKIPPABLE - ALL REPOS - MANDATORY)

**Reference:** `workflows/DOCUMENTATION-GATE-MANDATORY.md` ⭐ PRIMARY - USE THIS

**🚨 CRITICAL: DOCUMENTATION MUST BE COMPLETE FOR EVERY REPOSITORY**

**🚨 CRITICAL: THIS IS THE ABSOLUTE FIRST STEP - MUST EXECUTE BEFORE ANYTHING ELSE**

**Agent MUST:**
1. ✅ EXECUTE documentation gate checks (use Bash tool to run commands)
2. ✅ COUNT files in each repo (must be exactly 12)
3. ✅ GENERATE missing files (use Write tool)
4. ✅ VERIFY all repos have 12/12 files
5. ✅ OUTPUT verification summary
6. ✅ ONLY THEN proceed to Phase 0.5

**Expected Output:**
```bash
🔍 Discovered repositories: [list all repos]
📚 Checking: [each repo]
✅/❌ [file count and generation]
🔍 FINAL VERIFICATION
✅ ALL REPOS: Documentation complete
✅ Total repos validated: [count]
✅ Each repo has 12/12 files present
🟢 PROCEEDING TO TASK EXECUTION
```

**If agent does NOT output this, Phase 0 FAILED.**

**🚨 CRITICAL: NEVER CREATE NEW SERVICE OR REPO - ABSOLUTE BLOCK**

**Reference:** `workflows/NEVER-CREATE-NEW-SERVICE.md`

**🚨 CRITICAL: THIS GATE BLOCKS ALL TASK EXECUTION UNTIL DOCUMENTATION IS COMPLETE**

**🚨 CRITICAL: AGENT MUST ACTUALLY EXECUTE THESE COMMANDS, NOT JUST READ THEM**

**Agent MUST:**
1. ✅ ACTUALLY RUN the repository discovery command (not just read it)
2. ✅ ACTUALLY CHECK each repo's docs folder (not just assume it exists)
3. ✅ ACTUALLY COUNT files in each docs folder (not just check existence)
4. ✅ OUTPUT the validation results (must show "X/12 files present")
5. ✅ ACTUALLY CREATE missing files if count < 12
6. ✅ OUTPUT "Generating missing file..." for each missing file
7. ✅ ONLY THEN proceed to task execution

**If agent does NOT output validation results, it FAILED to execute Phase 0.**

---

### Step 1: Discover ALL Repositories (MUST EXECUTE - NOT JUST READ)

```bash
# Find ALL git repositories in workspace (dynamic discovery)
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

cd "$WORKSPACE_ROOT"

# Discover ALL repos dynamically
find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort
```

**🚨 NOTE: Repositories are discovered dynamically at runtime.**
**NO hardcoded list. The `find` command will discover ALL git repositories automatically.**

**Example of what might be discovered (NOT a hardcoded list):**
```
Result will vary based on what's in your workspace.
Example: harbor-ai, harborApp, harborWebsite, harborUserSvc, etc.
Actual list is discovered dynamically when agent runs.
```

### Step 2: Validate Documentation for EVERY Repository (MANDATORY - BLOCKS TASK EXECUTION)

**🚨 CRITICAL: THIS STEP BLOCKS TASK EXECUTION UNTIL ALL DOCUMENTATION IS COMPLETE**

**🚨 CRITICAL: READ ALL DOCUMENTATION FROM ALL EXISTING SERVICES FIRST**

**Before making ANY decision about which service to use, agent MUST:**

**First, validate EVERY repo has complete documentation:**

1. ✅ Read ARCHITECTURE.md from EVERY existing service
2. ✅ Read SERVICE_RULES.md from EVERY existing service
3. ✅ Read STRUCTURE.md from EVERY existing service
4. ✅ Understand what each service can handle
5. ✅ Find existing service that can handle the task
6. ✅ ONLY if ALL services explicitly prohibit task, consider new service

**🚨 IF THIS STEP IS SKIPPED: BLOCKED**

**For EACH discovered repository, check if `/docs` folder exists and has ALL 12 required files:**

**Required Documentation Files (12 Total - MANDATORY):**
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

**For EACH repository, check:**

```bash
for repo in $(find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "Checking $repo/docs/..."

    # Check if docs folder exists
    if [ ! -d "$repo/docs" ]; then
        echo "❌ NO DOCS FOLDER: $repo"
        echo "   Creating docs folder and generating all 12 files..."
        mkdir -p "$repo/docs"
        # Generate all 12 files
    else
        echo "✅ DOCS FOLDER EXISTS: $repo"
    fi

    # Check if all 12 required files exist
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

    MISSING_FILES=()

    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$repo/docs/$file" ]; then
            MISSING_FILES+=("$file")
        fi
    done

    if [ ${#MISSING_FILES[@]} -gt 0 ]; then
        echo "❌ MISSING FILES in $repo/docs/:"
        for file in "${MISSING_FILES[@]}"; do
            echo "   - $file"
        done
        echo "   Generating missing files..."
        # Generate missing files
    else
        echo "✅ ALL 12 FILES PRESENT: $repo/docs/"
    fi
done
```

**🚨 CRITICAL CHECKLIST (Must be TRUE for EVERY repo):**

```markdown
## Documentation Validation Report

**Discovered Repositories:** {count} (discovered dynamically via `find` command)

### Per-Repository Documentation Status:

**{DYNAMIC-REPO-NAME-1}:**
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
- Status: {COMPLETE/INCOMPLETE}

**{DYNAMIC-REPO-NAME-2}:**
- [ ] [Same checklist for each discovered repo]
- Status: {COMPLETE/INCOMPLETE}

**[Continue for ALL dynamically discovered repos - one checklist per repo]**

**🚨 CRITICAL: Agent MUST OUTPUT this exact validation summary:**

```bash
🔍 FINAL VALIDATION
✅ ALL REPOS: Documentation complete
✅ Total repos validated: {count}
✅ Each repo has 12/12 files present
🟢 PROCEEDING TO TASK EXECUTION
```

**If agent does NOT output this summary, Phase 0 FAILED.**

---

### Special Repo Types (Detected Dynamically):

**React Native Apps (e.g., [REACT-NATIVE-APP-NAME]):**
If a repo is detected as React Native, additional checks:
- [ ] STRUCTURE.md covers React Native project structure
- [ ] DEPENDENCIES.md covers npm packages, React Native dependencies
- [ ] DATABASE.md covers Realm/SQLite if applicable
- [ ] MODEL_FLOW.md covers component flow, state management
- [ ] API_PATTERNS.md covers API integration patterns
- [ ] AUTH.md covers React Native auth (tokens, biometrics)
- [ ] SERVICE_RULES.md covers React Native development rules
- [ ] SHARED_SERVICES.md covers shared React Native components
- [ ] CHANGE_IMPACT.md covers React Native bundle rebuild impact
- [ ] DEVELOPMENT_RULES.md covers React Native coding standards
- [ ] GIT_RULES.md covers NO PUSH rule

**Frontend Apps (e.g., Next.js, React):**
If a repo is detected as Frontend, additional checks:
- [ ] STRUCTURE.md covers frontend project structure
- [ ] DEPENDENCIES.md covers npm packages
- [ ] API_PATTERNS.md covers API integration patterns
- [ ] Other frontend-specific documentation

**Backend Services (e.g., Node.js, Python):**
If a repo is detected as Backend Service, additional checks:
- [ ] DATABASE.md covers database schema
- [ ] MODEL_FLOW.md covers data flow
- [ ] API_PATTERNS.md covers endpoint patterns
- [ ] Other backend-specific documentation

### Summary:
- Total Repos Discovered: {count} (discovered dynamically)
- Repos with Complete Docs: {count}
- Repos with Incomplete Docs: 0
- Overall Status: ✅ COMPLETE (proceed) OR ❌ INCOMPLETE (fix first)
```

**If ANY repository has incomplete documentation:**
```
❌ DOCUMENTATION INCOMPLETE
Repository: {repo-name}
Missing Files: {list}
Action: AUTO-GENERATING MISSING FILES...
Please wait...
✅ Documentation generation complete for {repo-name}
```

**Only proceed to task execution when:**
```
✅ ALL repositories have docs/ folder
✅ ALL repositories have ALL 12 required .md files
✅ NO missing documentation in any repo
✅ ALL repos validated
🟢 PROCEEDING TO TASK EXECUTION
```

**❌ IF DOCUMENTATION INCOMPLETE:**
```
❌ TASK BLOCKED - DOCUMENTATION INCOMPLETE

Repository: {repo-name}
Missing files: {list}

ACTION REQUIRED:
1. Generate missing documentation files
2. Validate all repos
3. Only then proceed to task

CANNOT PROCEED UNTIL ALL DOCUMENTATION IS COMPLETE
```

**🚨 TASK EXECUTION IS BLOCKED UNTIL ALL DOCUMENTATION IS COMPLETE**

**This check happens BEFORE the agent picks up ANY task.**

**If any repo is missing documentation:**
1. ❌ BLOCK task execution
2. ✅ Generate missing documentation
3. ✅ Re-validate all repos
4. ✅ Only then proceed to task
```

### Step 3: READ ALL Documentation (MANDATORY - CRITICAL)

**🚨 THIS STEP CANNOT BE SKIPPED 🚨**

**For EVERY repository, READ EVERY .md file:**

```bash
# Navigate to workspace root
cd "$WORKSPACE_ROOT"

# For EACH repository
for repo in $(find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "📚 READING DOCUMENTATION: $repo"
    cd "$repo"

    # READ EVERY .md file in docs/
    for md_file in docs/*.md; do
        echo "  📖 READING: $md_file"
        # Actually READ the file content
        cat "$md_file"
        # Store in context
        echo "  ✅ LOADED INTO CONTEXT: $md_file"
    done

    cd ..
done
```

**🚨 CRITICAL VALIDATION CHECKLIST:**

Before proceeding to implementation, verify:
- [ ] Discovered ALL repos dynamically (no hardcoded list!)
- [ ] READ [EACH-DISCOVERED-REPO]/docs/ARCHITECTURE.md
- [ ] READ [EACH-DISCOVERED-REPO]/docs/STRUCTURE.md
- [ ] READ [EACH-DISCOVERED-REPO]/docs/DEPENDENCIES.md (if exists)
- [ ] READ [EACH-DISCOVERED-REPO]/docs/SERVICE_RULES.md (if exists)
- [ ] READ [EACH-DISCOVERED-REPO]/docs/SHARED_SERVICES.md (if exists)
- [ ] READ [EACH-DISCOVERED-REPO]/docs/CHANGE_IMPACT.md (if exists)
- [ ] READ ALL other .md files in docs/ for EACH repo
- [ ] Special attention to React Native repos (detected dynamically)
- [ ] Special attention to Frontend repos (detected dynamically)
- [ ] Special attention to Backend repos (detected dynamically)

**🚨 FOR ALL DISCOVERED REPOS (dynamic list, not hardcoded):**
- [ ] Repeat for ALL repositories found via find command
- [ ] NO exceptions
- [ ] NO skipping
- [ ] Output checklist with ACTUAL discovered repo names (not hardcoded!)
- [ ] READ EVERYTHING

### Step 4: ONLY THEN Proceed to Implementation

**ONLY AFTER completing ALL above steps:**

```markdown
✅ Documentation Reading Gate: PASSED

All repositories documentation read and understood:
- ✅ All ARCHITECTURE.md files read
- ✅ All SHARED_SERVICES.md files read
- ✅ All CHANGE_IMPACT.md files read
- ✅ [REACT-NATIVE-APP] (React Native) docs read
- ✅ Cross-repository relationships understood
- ✅ Service boundaries identified
- ✅ Dependencies mapped

🟢 NOW PROCEEDING TO TASK IMPLEMENTATION

With full documentation context:
- Architecture: [Understood]
- Dependencies: [Mapped]
- Service boundaries: [Identified]
- Change impact: [Analyzed]
```

---

**🚨 IF DOCUMENTATION GATE FAILS:**

```
❌ DOCUMENTATION GATE FAILED

Incomplete documentation detected:
- Repository: {repo-name}
- Missing files: {list}

ACTION REQUIRED:
1. Generate missing documentation files
2. Verify all files are present
3. Read all documentation
4. Only then proceed to implementation

CANNOT PROCEED UNTIL ALL DOCUMENTATION IS COMPLETE
```

**This gate is NON-SKIPPABLE and MANDATORY.**

---

## 🎯 CHECKPOINT 1: Progress Update After Documentation Gate (MANDATORY)

**🚨 CRITICAL: This is MANDATORY checkpoint #1 of 5**

**Reference:** `workflows/PROGRESS-UPDATE-MANDATORY.md`

**After Phase 0 (Documentation Gate) completes, agent MUST:**

**✅ Update Progress to 25% (Analysis Stage)**

```bash
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 25 "Analysis" "Documentation gate complete - all docs read and validated"
```

**✅ Verify Progress Updated:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep -o '"progress":[0-9]*'
```

**Expected Output:**
```
"progress":25
```

**🚨 IF PROGRESS IS NOT 25%:**
- ❌ DO NOT PROCEED TO NEXT PHASE
- ✅ RE-RUN the progress update command
- ✅ Verify progress changed to 25%
- ✅ Only then proceed

**✅ Output Confirmation:**
```markdown
✅ CHECKPOINT 1 COMPLETE:
- Progress updated to: 25%
- Stage set to: Analysis
- Message: Documentation gate complete
🟢 PROCEEDING TO PHASE 0.45
```

---

## 🎯 Phase 0.45: Service Selection Analysis (BLOCKING - NON-SKIPPABLE)

**🚨🚨🚨 CRITICAL: This phase BLOCKS all implementation until complete!**

**Reference:** `workflows/service-selection-logic-v2.md` (relative to harbor-ai directory)

**Purpose:** PROVE which existing repo to use (NEVER create new service!)

**🚨 DEFAULT RULE: NEVER CREATE NEW SERVICE OR REPO**

**Unless you have EXPLICIT documentation proof that a new service is needed, you MUST use an existing service.**

**This phase:**
- 🔒 **BLOCKS implementation** until documentation read
- 📖 **FORCES reading** ALL existing service docs
- 🚫 **PREVENTS** new service creation without proof
- ✅ **REQUIRES** documentation evidence for decisions

**Cannot proceed to implementation WITHOUT:**
1. ✅ Reading ARCHITECTURE.md from ALL existing repos
2. ✅ Reading SERVICE_RULES.md from ALL existing repos
3. ✅ Outputting service selection analysis with proof
4. ✅ Getting confirmation that service exists

**🚨 IF YOU CREATE A NEW SERVICE/REPO WITHOUT READING ALL EXISTING DOCS FIRST, YOU HAVE FAILED!**

---

### 🚫 ABSOLUTE RULE (ZERO EXCEPTIONS)

**❌ FORBIDDEN:**
- DO_NOT_CREATE_ANYTHING_NEW
- DO_NOT_CREATE_NEW_REPO
- Running `DO_NOT_INIT` for new services
- Assuming new service is needed

**✅ REQUIRED:**
- Read ALL existing service documentation FIRST
- Find which existing service can handle the task
- Use existing service
- ONLY if PROVEN by docs that no existing service can handle it, THEN (and only THEN) consider new service

**⚠️ DEFAULT ASSUMPTION: USE EXISTING SERVICE**
**The burden of proof is on YOU to show why a new service is needed!**

---

### 🔒 BLOCKING GATE: Implementation Blocked Until Service Selection Complete

**🚨 BEFORE proceeding to Phase 1 (Full Repository Analysis), you MUST:**

```markdown
## ✅ PRE-IMPLEMENTATION CHECKLIST

**Repos Discovered (Dynamic):**
- [List all repos found via find command - NO hardcoded names!]
- Total: [COUNT]

**Phase 0.45 Completed:**
- [x] Read ARCHITECTURE.md from ALL discovered repos (not hardcoded list!)
- [x] Read SERVICE_RULES.md from ALL discovered repos (not hardcoded list!)
- [x] Outputted service selection analysis table
- [x] Quoted documentation evidence for decision
- [x] Selected EXISTING service (not new)

**Service Selected:** [MUST BE EXISTING SERVICE NAME FROM DISCOVERED LIST]
**Repository Path:** [MUST BE PATH TO EXISTING REPO FROM DISCOVERED LIST]
**New Service:** NONE (creating new service = FAIL)

**Evidence from documentation:**
> [Quote from SERVICE_RULES.md showing why this service can handle the task]

🟢 **ONLY WHEN ALL ABOVE CHECKED, PROCEED TO PHASE 1**
```

**❌ IF NOT COMPLETE:**
```
❌ IMPLEMENTATION BLOCKED
Complete Phase 0.45 (Service Selection Analysis) first!
Read all documentation, output analysis, select existing service.
```

---

## 🎫 Phase 0.25: Ticket Tracker Integration (MANDATORY - NON-BLOCKING)

**Purpose:** Integrate with Harbor Ticket Tracker for real-time progress tracking

**🚨 CRITICAL: NON-BLOCKING INTEGRATION**
- If Ticket Tracker API is unavailable → Agent continues without tracking
- If API calls fail → Agent continues without tracking
- Tracking failures NEVER block task execution

### Integration Steps

**🚨 MANDATORY BASH COMMANDS (Execute in order):**

**Step 1: Create Ticket When Task Starts**
```bash
# After Azure DevOps task is fetched, create ticket in tracker
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"

# Create ticket data JSON
cat > /tmp/ticket-data.json << EOF
{
  "id": "TKT-${AZURE_DEVOPS_ID}",
  "title": "${AZURE_DEVOPS_TITLE}",
  "description": "${AZURE_DEVOPS_DESCRIPTION}",
  "priority": "High",
  "assignedRepos": ["${SELECTED_SERVICE}"],
  "assignee": "Harbor Agent",
  "tags": ["azure-devops", "automation"]
}
EOF

# Create ticket
node ticketTrackerIntegration.js create /tmp/ticket-data.json

# Verify ticket created
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep '"id":"TKT-${AZURE_DEVOPS_ID}"'
```

**Step 2: Start Ticket**
```bash
# When agent begins implementation
node ticketTrackerIntegration.js start "TKT-${AZURE_DEVOPS_ID}" "Development" "Harbor AI Agent started working on ${AZURE_DEVOPS_TITLE}"

# Verify ticket started
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep '"status":"In Progress"'
```

**Step 3: Verify Integration**
```bash
# Check ticket appears in tracker
curl -s http://localhost:3001/api/tickets | grep "TKT-${AZURE_DEVOPS_ID}"

# Check initial activity logged
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID}/activities | grep "Harbor Agent Started"
```

---

**JavaScript API Usage (Alternative):**

**Step 1: Import Ticket Tracker Helper**
```javascript
import { HarborAgentTracker } from './harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js'
import { reportSingleFileChange, reportMultipleFileChanges } from './harbor-ticket-tracker/backend/src/utils/fileChangesHelper.js'
```

**Step 2: Create Ticket When Task Starts**
```javascript
// After Azure DevOps task is fetched
const ticketData = {
  id: `TKT-${azureDevOpsId}`,
  title: azureDevOpsTitle,
  description: azureDevOpsDescription,
  priority: 'High',
  assignedRepos: [selectedService],
  assignee: 'Harbor Agent',
  tags: ['azure-devops', 'automation']
}

await HarborAgentTracker.createTicket(ticketData)
```

**Step 3: Start Ticket**
```javascript
// When agent begins implementation
await HarborAgentTracker.startTicket(
  `TKT-${azureDevOpsId}`,
  'Development',
  `Harbor AI Agent started working on ${azureDevOpsTitle}`
)
```

**Step 4: Update Progress at Milestones**
```javascript
// After significant progress (25%, 50%, 75%, 90%)
await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  25,  // Progress percentage
  'Development',
  'Completed user authentication implementation'
)

// With file changes
await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  50,
  'Development',
  'Implemented user login endpoint',
  reportSingleFileChange(
    'harborUserSvc/src/controllers/authController.js',
    45,  // 45 lines added
    12,  // 12 lines deleted
    '@@ -20,8 +20,53 @@\n+ export const login = async...' // Optional diff
  )
)
```

**Step 5: Complete Ticket**
```javascript
// When task is complete
await HarborAgentTracker.completeTicket(
  `TKT-${azureDevOpsId}`,
  `Successfully completed ${azureDevOpsTitle}`
)
```

### File Changes Reporting

**🚨 AUTOMATIC INTEGRATION - BASH COMMANDS (MANDATORY)**

**The agent MUST execute these bash commands during workflow execution:**

**When task is fetched from Azure DevOps:**
```bash
# Create ticket in tracker
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
cat > /tmp/ticket-data.json << EOF
{
  "id": "TKT-${AZURE_DEVOPS_ID}",
  "title": "${AZURE_DEVOPS_TITLE}",
  "description": "${AZURE_DEVOPS_DESCRIPTION}",
  "priority": "High",
  "assignedRepos": ["${SELECTED_SERVICE}"],
  "assignee": "Harbor Agent",
  "tags": ["azure-devops", "automation"]
}
EOF

node ticketTrackerIntegration.js create /tmp/ticket-data.json

# Start ticket
node ticketTrackerIntegration.js start "TKT-${AZURE_DEVOPS_ID}" "Development" "Starting implementation"
```

**When implementation starts (25% progress):**
```bash
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 25 "Development" "Started implementation"
```

**When core features implemented (50% progress):**
```bash
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 50 "Development" "Core features implemented"
```

**When testing starts (75% progress):**
```bash
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 75 "Testing" "Testing started"
```

**When ready for completion (90% progress):**
```bash
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 90 "Deployment" "Ready for completion"
```

**When task is complete (100% progress):**
```bash
node ticketTrackerIntegration.js complete "TKT-${AZURE_DEVOPS_ID}" "Successfully completed implementation"
```

**With file changes:**
```bash
# Create file changes JSON
cat > /tmp/file-changes.json << EOF
{
  "filesChanged": [
    {
      "path": "harborUserSvc/src/controllers/authController.js",
      "changeType": "added",
      "additions": 65,
      "deletions": 0,
      "diff": "@@ -0,0 +1,65 @@\\n+ export const login = async..."
    },
    {
      "path": "harborUserSvc/src/routes/userRoutes.js",
      "changeType": "modified",
      "additions": 12,
      "deletions": 5,
      "diff": "@@ -10,5 +10,12 @@\\n+ router.get('/login', authController.login)"
    }
  ],
  "summary": {
    "totalFiles": 2,
    "additions": 77,
    "deletions": 5
  }
}
EOF

# Update progress with file changes
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 50 "Development" "Implemented authentication" /tmp/file-changes.json
```

---

**JavaScript API Usage (Alternative):**

**Automatic File Change Tracking:**

When agent modifies files, report changes using helper functions:

```javascript
// Single file change
const fileChanges = reportSingleFileChange(
  'harborUserSvc/src/models/User.js',
  28,  // additions
  0    // deletions
)

await HarborAgentTracker.updateProgress(
  ticketId,
  75,
  'Development',
  'Added User model',
  fileChanges
)

// Multiple file changes
const fileChanges = reportMultipleFileChanges([
  { path: 'harborUserSvc/src/controllers/userController.js', additions: 65, deletions: 8 },
  { path: 'harborUserSvc/src/routes/userRoutes.js', additions: 42, deletions: 0 },
  { path: 'harborUserSvc/src/models/user.js', additions: 12, deletions: 0 }
])

await HarborAgentTracker.updateProgress(
  ticketId,
  90,
  'Testing',
  'Implementation complete',
  fileChanges
)
```

### Progress Milestones

Report progress at these milestones:
- **10%**: Requirements analysis complete
- **25%**: Implementation started
- **50%**: Core features implemented
- **75%**: Testing started
- **90%**: Ready for deployment
- **100%**: Complete

### Error Handling

**🚨 NON-BLOCKING: All API calls wrap errors gracefully**

```javascript
// HarborAgentTracker helper already has error handling
// If API fails, it logs error but returns null
// Agent continues execution regardless of API status

try {
  await HarborAgentTracker.updateProgress(...)
} catch (error) {
  // Error already logged by helper
  // Agent continues
}
```

### What Gets Tracked

**Tracked in Ticket Tracker UI:**
- ✅ Ticket creation and assignment
- ✅ Progress percentage (0-100%)
- ✅ Stage transitions (Planning → Analysis → Development → Testing → Deployment)
- ✅ Activity messages
- ✅ File changes (files modified, additions, deletions)
- ✅ Git diff-style code changes (if provided)

**NOT Tracked:**
- ❌ Git operations (add, commit, push - forbidden)
- ❌ Branch creation (forbidden)
- ❌ Any git repository modifications (forbidden)

### Verification

**After implementation, verify in Ticket Tracker UI:**
1. Open http://localhost:5173/ticket/TKT-{ID}
2. Check progress bar shows correct percentage
3. Check activity timeline shows updates
4. Check file changes display (if reported)
5. Verify no git operations were performed

---

## 🧠 Phase 1: Full Repository Analysis Engine (MANDATORY)

---

### 📊 Service Selection Process

**Step 1: Discover All Existing Services**
```bash
find /workspace -maxdepth 2 -name ".git" -type d
```

**Step 2: Read Documentation from EACH Service**
```bash
# For EACH service, READ:
- docs/ARCHITECTURE.md (what it does)
- docs/SERVICE_RULES.md (what it allows/prohibits)
- docs/STRUCTURE.md (how it's organized)
```

**Step 3: Extract Service Capabilities**
From documentation, understand:
- What domain does this service handle?
- What features does it provide?
- What extensions does it allow?
- What does it prohibit?

**Step 4: Match Task to Service**
- Can ANY existing service handle this task?
- Check SERVICE_RULES.md for each service
- Look for "allows extension" rules
- Find BEST match

**Step 5: Make Documentation-Based Decision**
- If service found: USE IT (don't create new)
- If no service found: Only THEN create new
- Decision MUST include reasoning from documentation

---

### 📋 Service Selection Output

**Agent MUST output:**

```markdown
## Service Selection Analysis

**Task:** {task}

**Services Analyzed:**
- service-A: {capabilities from ARCHITECTURE.md}
- service-B: {capabilities from ARCHITECTURE.md}
- service-C: {capabilities from ARCHITECTURE.md}

**Documentation Review:**
- service-A/docs/SERVICE_RULES.md: {rules}
- service-B/docs/SERVICE_RULES.md: {rules}

**Decision:**
✅ USE_EXISTING: {service-name}
  Reason: {from SERVICE_RULES.md}

OR

✅ CREATE_NEW: {service-name}
  Reason: No existing service can handle this (proven by docs)
```

---

### 🚨 Anti-Pattern Prevention

**❌ WRONG:**
```
Task: "Create blog module"
Agent: "I'll create blog-service" ← NO DOCUMENTATION READ!
```

**✅ RIGHT:**
```
Task: "Create blog module"
Agent:
  1. Read user-service/docs/SERVICE_RULES.md
  2. Read job-service/docs/SERVICE_RULES.md
  3. Read notification-service/docs/SERVICE_RULES.md
  4. Found: job-service allows "blog content about jobs"
  5. Decision: USE job-service (not create new)
```

---

## 🧠 Phase 0.5: Pre-Execution Intelligence Analysis v2.0 (NEW - MANDATORY)

**🚨 CRITICAL: This phase continues after service selection**

**Reference:** `workflows/pre-execution-intelligence-analysis-v2.md` (relative to harbor-ai directory)

**Purpose:** Deep analysis with repository type classification and operation decision making

**🆕 v2.0 Key Capabilities:**
- 🔴 **Shared Package Detection** - Identifies services that need package publishing
- 🔵 **Database Infrastructure Detection** - Identifies database-sync services
- 🟢 **Business Logic Detection** - Identifies regular microservices
- 📋 **Completeness Verification** - Ensures ALL CRUD methods and files are created
- 🔗 **Dependency Chain Mapping** - Maps publish → sync → implement flow

**This phase CANNOT be:**
- ❌ Skipped
- ❌ Bypassed
- ❌ Rushed
- ❌ Partially completed

---

### 🚫 STRICT RULE (NON-NEGOTIABLE)

**Before performing ANY code change, file creation, or implementation:**

- ❌ DO NOT write code immediately
- ❌ DO NOT create new services blindly
- ❌ DO NOT modify any repo without full understanding

✅ **ALWAYS complete the Pre-Execution Intelligence Analysis first**

---

### 📊 Step-by-Step Analysis Protocol

#### 🔍 Step 1: Repository Discovery

**Scan the entire workspace:**

```bash
# Navigate to workspace root dynamically (discover from current location)
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

cd ${WORKSPACE_ROOT}

# Find ALL git repositories dynamically
find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort
```

**Identify and classify:**

1. **All repositories** in the workspace
2. **Service boundaries** - What does each service do?
3. **Service types:**
   - 🎯 **Core Service** - Business logic service (e.g., [BACKEND-SERVICE-NAME])
   - 📦 **Shared Service** - Common package used by multiple services
   - 🔧 **Infrastructure Service** - Gateway, auth, etc.
   - 🎨 **Frontend Service** - UI/Frontend application

**Classification Example:**
```markdown
Repository Classification (v2.0 - Enhanced):
🔴 Shared Package Services:
- [SHARED-PACKAGE-NAME] → Shared Package (publish required)

🔵 Database Infrastructure Services:
- [DATABASE-SYNC-NAME] → Database Infrastructure (sync required)

🟢 Business Logic Services:
- [BACKEND-SERVICE-NAME] → Business Logic (CRUD implementation)

🟡 Gateway Services:
- [GATEWAY-SERVICE-NAME] → Gateway (route updates)

🟣 Frontend Applications:
- [FRONTEND-APP-NAME] → Frontend (UI implementation)
```

**🚨 CRITICAL: If multiple frontend applications are identified:**

**Reference:** `workflows/multi-frontend-implementation.md`

**Agent MUST:**
1. ✅ Identify ALL frontend repos (web, mobile, etc.)
2. ✅ Implement feature in ALL frontend repos
3. ✅ NOT skip ANY frontend repo
4. ✅ Verify ALL frontend repos have the feature

**⚠️  Feature is ONLY complete when implemented in ALL frontend apps.**

---

#### 📂 Step 2: Documentation Intelligence Scan (CRITICAL)

**For EACH repository discovered, READ ALL documentation:**

```bash
# For EACH repository
for repo in $(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "📚 READING DOCUMENTATION: $repo"
    cd "$repo"

    # READ EVERY .md file in docs/
    for md_file in docs/*.md; do
        echo "  📖 READING: $md_file"
        # Actually READ the file content
        cat "$md_file"
        # Store in context
        echo "  ✅ LOADED INTO CONTEXT: $md_file"
    done

    cd ..
done
```

**Critical Files to Read:**
- `ARCHITECTURE.md` - Service overview, relationships
- `STRUCTURE.md` - Folder structure, responsibilities
- `DEPENDENCIES.md` - External and internal dependencies
- `SERVICE_RULES.md` - Business logic constraints
- `SHARED_SERVICES.md` - What shared services are used
- `CHANGE_IMPACT.md` - Impact of changes
- `GIT_RULES.md` - Git rules (NO PUSH, NO BRANCHES)

**🚨 Validation Checklist:**

Before proceeding, verify:
- [ ] READ ALL repos' ARCHITECTURE.md
- [ ] READ ALL repos' SHARED_SERVICES.md
- [ ] READ ALL repos' CHANGE_IMPACT.md
- [ ] READ ALL repos' SERVICE_RULES.md
- [ ] Understood cross-repository relationships
- [ ] Identified shared services and dependencies
- [ ] Mapped service boundaries

---

#### 🎯 Step 2.5: Operation Decision Tree (NEW in v2.0)

**🚨 CRITICAL: For EACH repository, determine what operations are required**

**Based on repository type, automatically determine required operations:**

**A. Shared Package Service (🔴)**
```
Detection: Has "publishConfig" in package.json
Operations:
  ✅ Implement changes (models, types)
  ✅ Increment package version (semver)
  ✅ Run: npm run build
  ✅ Run: npm publish
  ✅ Update CHANGELOG.md
  ❌ NEVER: Push code, deploy to server
```

**B. Database Infrastructure Service (🔵)**
```
Detection: Name contains "database", "sync", "migration"
Operations:
  ✅ Update package.json to latest shared version
  ✅ Run: npm install
  ✅ Configure/register new models
  ✅ Run: npm start (test sync)
  ✅ Verify database schema changes
  ❌ NEVER: Push code (unless permanent config change)
```

**C. Business Logic Service (🟢)**
```
Detection: Has controllers/, services/, repositories/
Operations:
  ✅ Update package.json to latest shared version
  ✅ Run: npm install
  ✅ Implement Controller (ALL CRUD methods)
  ✅ Implement Service (ALL business logic)
  ✅ Implement Repository (ALL data access)
  ✅ Add Routes (ALL endpoints)
  ✅ Add DTOs, middleware
  ✅ Test locally with .env
  ❌ NEVER: Push code, deploy to server, create new service
```

**Example - Blog Module:**
```markdown
Repository: shared-models
Type: 🔴 Shared Package
Decision: MUST publish package
Actions:
  1. Create Blog.ts model
  2. Bump version: 2.0.0 → 2.1.0
  3. npm run build
  4. npm publish

Repository: database-sync
Type: 🔵 Database Infrastructure
Decision: MUST sync models
Actions:
  1. Update package.json: "shared-model": "^2.1.0"
  2. npm install
  3. Register Blog model
  4. npm start (sync)

Repository: job-service
Type: 🟢 Business Logic
Decision: MUST implement complete CRUD
Actions:
  1. Update package.json: "shared-model": "^2.1.0"
  2. npm install
  3. Create BlogController (GET, POST, PUT, DELETE)
  4. Create BlogService (all business logic)
  5. Create BlogRepository (all data access)
  6. Add routes, DTOs, middleware
```

---

#### 🧠 Step 3: Deep Understanding Extraction

**From documentation, extract and build internal understanding:**

##### 1. Architecture Mapping

**Understand:**
- How each service fits in the system
- Upstream dependencies (what this service depends on)
- Downstream dependents (who depends on this service)
- Communication patterns (API / events / shared DB)

**Example Output:**
```markdown
Architecture Mapping:
[BACKEND-SERVICE-1]:
  - Upstream: [SHARED-PACKAGE-1], [SHARED-PACKAGE-2]
  - Downstream: None (leaf service)
  - Communication: REST API

[BACKEND-SERVICE-2]:
  - Upstream: [SHARED-PACKAGE-1], [SHARED-PACKAGE-2], [BACKEND-SERVICE-1]
  - Downstream: None (leaf service)
  - Communication: REST API + Events

[SHARED-PACKAGE-NAME]:
  - Upstream: None (base library)
  - Downstream: ALL services
  - Communication: N/A (shared library)
```

##### 2. Dependency Graph

**Map dependencies:**
- Which services depend on this repo?
- Which shared modules are used?
- Impact radius of changes

**Example:**
```markdown
Dependency Graph:
[SHARED-PACKAGE-NAME] (HIGH IMPACT)
  ├─ [SERVICE-1]
  ├─ [SERVICE-2]
  ├─ [SERVICE-3]
  └─ [FRONTEND-APP]

[ANOTHER-SHARED-PACKAGE] (MEDIUM IMPACT)
  ├─ [SERVICE-1]
  ├─ [SERVICE-2]
  └─ [SERVICE-3]
```

##### 3. Service Rules

**Extract business logic constraints:**
- What operations are allowed?
- What operations are restricted?
- Data ownership rules

##### 4. Git Rules

**Understand git strategy:**
- 🚫 DO NOT push directly to branch
- Create feature branches
- PR requirements
- Commit standards

##### 5. Structure Understanding

**Map code organization:**
- Folder structure
- Existing patterns
- Code conventions

---

#### 🔗 Step 3.5: Dependency Chain Mapping (NEW in v2.0)

**🚨 CRITICAL: Map the complete dependency flow for the task**

**Build dependency chain:**
```
[Shared Package] → (publish) → [Database Sync] → [Business Services] → [Gateway] → [Frontend]
```

**For EACH node in chain:**
1. What changes are needed?
2. What dependencies must be satisfied first? (prerequisites)
3. What version updates are required?
4. What files MUST be created/modified?

**Example - Blog Module:**
```markdown
Dependency Chain:

1. [SHARED-PACKAGE-NAME] (Shared Package)
   ├─ Changes: Create Blog.ts model
   ├─ Prerequisites: None
   └─ Post-actions: Version bump → Build → Publish

2. [DATABASE-SYNC-NAME] (Database Infrastructure)
   ├─ Changes: Register Blog model
   ├─ Prerequisites: [SHARED-PACKAGE]@2.1.0 published
   └─ Post-actions: npm install → Configure → Test sync

3. [BACKEND-SERVICE-NAME] (Business Logic)
   ├─ Changes: Implement Blog CRUD
   ├─ Prerequisites: [SHARED-PACKAGE]@2.1.0 available
   └─ Post-actions: npm install → Implement Controller/Service/Repository

4. [GATEWAY-SERVICE-NAME] (Gateway)
   ├─ Changes: Add /api/blog routes
   ├─ Prerequisites: [BACKEND-SERVICE] has blog endpoints
   └─ Post-actions: Update routes

5. [FRONTEND-APP-NAME] (Frontend)
   ├─ Changes: Create blog UI
   ├─ Prerequisites: [GATEWAY-SERVICE] has /api/blog routing
   └─ Post-actions: Create pages/components
```

---

#### 🔗 Step 4: Cross-Repository Impact Analysis

**Based on the task, identify:**

1. **Affected Repositories:**
   - Which repo(s) need to be modified?
   - Which repo(s) should NOT be touched?

2. **Implementation Feasibility:**
   - Is this feature already partially implemented somewhere?
   - Can this be implemented in an existing service?
   - Do we really need a new service?

3. **🚨 CRITICAL DECISION:**

   > **DO NOT create new repo/service if existing one can handle it**

**Decision Tree:**
```markdown
Task: "[EXAMPLE TASK]"

Analysis:
1. ✅ Check: Does [SERVICE-NAME] exist?
   → YES → Use existing service
   → NO → Check if existing service can handle it

2. ✅ Check: Can [EXISTING-SERVICE] handle this?
   → Check SERVICE_RULES.md
   → Check ARCHITECTURE.md
   → If NO → Create new service
   → If YES → Extend existing service

3. ✅ Final Decision:
   → Modify existing service (NO new service needed)
```

---

#### 🧩 Step 5: Shared Service Awareness

**If any repo is marked as Shared/Common:**

⚠️ **HIGH IMPACT - Changes MUST consider:**
- All dependent services
- Backward compatibility
- Breaking changes
- Version updates

**Example:**
```markdown
Shared Service Impact Analysis:

Task: "Modify User model in shared-models"

Impact:
- 🔴 HIGH IMPACT - [SHARED-PACKAGE-NAME] used by ALL services
- 🔴 AFFECTED SERVICES:
  - [SERVICE-1] (will break)
  - [SERVICE-2] (will break)
  - [SERVICE-3] (will break)
  - [FRONTEND-APP] (will break)

Required Actions:
1. Update shared-models User model
2. Update ALL dependent services
3. Ensure backward compatibility
4. Coordinate release across all services
```

---

#### ⚠️ Step 6: Conflict & Risk Detection

**Before implementation, identify:**

1. **Breaking Changes:**
   - API contract changes
   - Data model changes
   - Interface changes

2. **Cross-Service Impact:**
   - Will this break other services?
   - Do dependent services need updates?

3. **Data Inconsistency Risks:**
   - Database schema changes
   - Data migration needs
   - Transactional integrity

4. **API Contract Changes:**
   - Request/response changes
   - Error handling changes
   - Authentication changes

---

#### 📝 Step 7: Execution Plan (MANDATORY OUTPUT)

**Before writing code, OUTPUT a structured analysis plan:**

```markdown
### 📊 ANALYSIS SUMMARY

**Task:** {Task description}

---

#### 1. Affected Repositories:
- ✅ repo-A (PRIMARY)
- ✅ repo-B (SECONDARY)

#### 2. Unaffected Repositories:
- ❌ repo-C (NO CHANGES)
- ❌ repo-D (NO CHANGES)

#### 3. Dependencies Impact:
- repo-A → used by repo-B, repo-C
- repo-B → used by repo-D
- shared-models → used by ALL

#### 4. Approach:
- ✅ Modify existing service: repo-A
- ❌ NO new service needed
- 🔄 Extends existing functionality

#### 5. Risks:
- ⚠️ API contract change in repo-A
- ⚠️ May break repo-B, repo-C
- ⚠️ Requires coordination

#### 6. Shared Modules Impact:
- ❌ NO - Shared modules not affected
  OR
- ✅ YES - shared-models affected (HIGH IMPACT)

#### 7. Git Strategy:
- Create feature branch in repo-A
- DO NOT push directly
- Follow repo's GIT_RULES.md

#### 8. Cross-Repo Sync Requirements:
- ❌ NO sync needed
  OR
- ✅ YES - Update repo-B, repo-C after repo-A changes

#### 9. Final Decision:
- ✅ Safe to proceed
  OR
- ⚠️ Needs clarification: {what needs clarification}

---

### 🎯 IMPLEMENTATION PLAN

**Phase 1: Changes in repo-A**
- File: repo-A/src/file1.ts
- Change: Add new function X
- Reason: Needed for feature Y

**Phase 2: Changes in repo-B** (if needed)
- File: repo-B/src/file2.ts
- Change: Update function Z
- Reason: Adapt to repo-A changes

**Phase 3: Testing**
- Test repo-A changes
- Test repo-B integration
- Verify no breaking changes

---

### 🚨 PROCEEDING TO IMPLEMENTATION

✅ Analysis Complete
✅ All documentation read
✅ Impact assessed
✅ Risks identified
✅ Approach validated

🟢 **NOW PROCEEDING TO IMPLEMENTATION**
```

---

### 🚀 Step 8: Implementation (ONLY AFTER ANALYSIS)

**ONLY AFTER completing ALL above steps:**

1. Start implementation
2. Follow repo structure & rules
3. Make minimal, precise changes
4. Respect service boundaries
5. Maintain backward compatibility

---

#### ✅ Step 8.5: Completeness Verification (NEW in v2.0)

**🚨 CRITICAL: Verify ALL required files and methods are created**

**For EACH repository type, verify completeness:**

**Shared Package Service (🔴):**
```markdown
- [ ] Model file created with ALL fields
- [ ] Model has proper types/interfaces
- [ ] Model exported correctly
- [ ] Package version incremented
- [ ] npm run build successful
- [ ] npm publish successful
- [ ] CHANGELOG.md updated
```

**Database Infrastructure Service (🔵):**
```markdown
- [ ] package.json updated to latest version
- [ ] npm install successful
- [ ] New model imported/registered
- [ ] Sync script run successfully
- [ ] Database schema verified
```

**Business Logic Service (🟢):**
```markdown
Controller (MANDATORY - ALL CRUD METHODS):
- [ ] getAll() - GET /api/resource
- [ ] getById(id) - GET /api/resource/:id
- [ ] create(data) - POST /api/resource
- [ ] update(id, data) - PUT /api/resource/:id
- [ ] delete(id) - DELETE /api/resource/:id

Service Layer (MANDATORY - ALL BUSINESS LOGIC):
- [ ] getAll() business logic
- [ ] getById(id) business logic
- [ ] create(data) business logic
- [ ] update(id, data) business logic
- [ ] delete(id) business logic

Repository Layer (MANDATORY - ALL DATA ACCESS):
- [ ] findAll() data access
- [ ] findById(id) data access
- [ ] create(data) data access
- [ ] update(id, data) data access
- [ ] delete(id) data access

Routes (MANDATORY - ALL ENDPOINTS):
- [ ] GET /api/resource
- [ ] GET /api/resource/:id
- [ ] POST /api/resource
- [ ] PUT /api/resource/:id
- [ ] DELETE /api/resource/:id

Additional:
- [ ] DTOs defined (CreateDTO, UpdateDTO, ResponseDTO)
- [ ] Middleware added (auth, validation)
- [ ] Error handling implemented
- [ ] Tests pass locally with .env
```

**Frontend Application (🟣):**
```markdown
Pages (MANDATORY - ALL CRUD PAGES):
- [ ] List page - app/resource/page.tsx
- [ ] Create page - app/resource/create/page.tsx
- [ ] Detail page - app/resource/[id]/page.tsx
- [ ] Edit page - app/resource/[id]/edit/page.tsx

Components:
- [ ] List component (table, cards)
- [ ] Form component (create/edit)
- [ ] Detail component
- [ ] Delete confirmation

API Integration:
- [ ] API service file created
- [ ] getAll() API method
- [ ] getById(id) API method
- [ ] create(data) API method
- [ ] update(id, data) API method
- [ ] delete(id) API method
- [ ] Error handling implemented
- [ ] Loading states implemented
```

---

### 🛑 Anti-Pattern Prevention

**The agent MUST NOT:**

1. ❌ Create new repo/service unless explicitly required
2. ❌ Duplicate logic across services
3. ❌ Ignore documentation
4. ❌ Violate service boundaries
5. ❌ Break dependent services
6. ❌ Make unchecked changes to shared services

---

### 🧠 Smart Behavior

**The agent SHOULD:**

1. ✅ **Prefer reuse over creation**
   - Reuse existing logic
   - Extend current modules
   - Follow existing patterns

2. ✅ **Respect service boundaries**
   - Never access another service's DB
   - Always use APIs
   - Maintain contracts

3. ✅ **Think before acting**
   - Analyze impact
   - Identify risks
   - Plan carefully

---

### 🔄 Sync Awareness

**If change affects multiple services:**

1. Clearly mention sync requirement
2. Suggest updates in dependent repos
3. Coordinate changes across services
4. Maintain compatibility

---

### 🏁 Final Rule

> **"NO ANALYSIS = NO IMPLEMENTATION"**

**This rule is NON-NEGOTIABLE.**

---

## 🔬 Phase 0.75: Self-Auditing Verification System (NEW - MANDATORY)

**🚨 CRITICAL: This is the NEW mandatory phase that ensures agent verifies all work before marking complete.**

**Reference:** `workflows/self-auditing-verification-system.md` (relative to harbor-ai directory)

**Purpose:** Agent verifies its own work - catches missing imports, forgotten commands, incomplete work

**🆕 Key Capabilities:**
- ✅ **File Creation Verification** - Verifies all files exist and compile
- ✅ **Import/Inclusion Verification** - Verifies all imports added (catches missing model imports!)
- ✅ **Command Execution Verification** - Verifies all commands ran successfully (catches forgotten npm start!)
- ✅ **Continuation Verification** - Prevents agent from getting stuck
- ✅ **Self-Audit Loop** - Agent asks "Am I done?" before proceeding

**This phase CANNOT be:**
- ❌ Skipped
- ❌ Bypassed
- ❌ Rushed
- ❌ Marked complete without verification

---

### 🚫 STRICT RULE (NON-NEGOTIABLE)

**After completing work on ANY repository, BEFORE marking complete:**

- ❌ DO NOT assume file is correct
- ❌ DO NOT assume imports are added
- ❌ DO NOT assume commands succeeded
- ❌ DO NOT move to next repo without verification

✅ **ALWAYS run self-audit verification before proceeding**

---

### 📋 Verification Layers

#### Layer 1: File Creation Verification

**After creating ANY file, agent MUST:**

```markdown
File Creation Checklist:
- [ ] File exists at correct path
- [ ] File has content (not empty)
- [ ] File has correct syntax
- [ ] File compiles/runs without errors
- [ ] File has all required exports
- [ ] File has all required imports
```

**How to verify (dynamically, no hardcoding):**

```bash
# For each created file:
file="path/to/file.ts"

# 1. Check file exists
test -f "$file" || echo "ERROR: File not created!"

# 2. Check file not empty
test -s "$file" || echo "ERROR: File is empty!"

# 3. Check syntax (TypeScript)
npx tsc --noEmit "$file" || echo "ERROR: Syntax errors!"

# 4. Check exports
grep -q "export" "$file" || echo "WARNING: No exports found!"

# 5. Check imports satisfied
npx tsc --noEmit || echo "ERROR: Imports not satisfied!"
```

---

#### Layer 2: Import/Inclusion Verification

**🚨 THIS CATCHES THE "MISSING MODEL IMPORT" BUG**

**After creating a model, agent MUST:**

```markdown
Model Inclusion Checklist:
- [ ] Model exported from entity registry
- [ ] Model imported in database config
- [ ] Model imported in files that use it
- [ ] All files compile with imports
```

**How to find files dynamically (based on documentation):**

```javascript

// Find files that need the model
const filesNeedingModel = findFilesByPattern(repo, importPatterns);

// Add import to each file
for (const file of filesNeedingModel) {
  addImportToFile(file, modelName);

  // Verify file still compiles
  if (!fileCompiles(file)) {
    throw new Error(`File ${file} doesn't compile after adding ${modelName} import!`);
  }
}
```

**Example - Blog Model:**

```markdown
Model Created: models/Blog.ts

  File: src/entities/index.ts
  Action: Add `export * from './Blog';`
  Verify: npx tsc --noEmit (no errors)

  File: src/database/connection.ts
  Action: Import Blog, add to entities array
  Verify: npx tsc --noEmit (no errors)

Step 3: Find files using Blog model
  Files: BlogController.ts, BlogRepository.ts
  Action: Add `import { Blog } from '../../entities/Blog';`
  Verify: npx tsc --noEmit (no errors)

Step 4: Final verification
  Run: npx tsc --noEmit
  Should: Show no errors
```

---

#### Layer 3: Command Execution Verification

**🚨 THIS CATCHES THE "FORGOT NPM START" BUG**

**After running ANY command, agent MUST:**

```markdown
Command Execution Checklist:
- [ ] Command executed
- [ ] Command output checked
- [ ] Success indicators verified
- [ ] No errors in output
```


```bash
# Example: npm install
npm install

test -f package-lock.json || echo "ERROR: package-lock.json not created!"
test -d node_modules || echo "ERROR: node_modules not created!"
grep -q "ERR!" npm-debug.log && echo "ERROR: npm install had errors!"

# Example: npm start (database-sync)
npm start &
NPM_PID=$!
sleep 5

ps -p $NPM_PID || echo "ERROR: npm start process died!"
grep -q "Database synced" logs/app.log || echo "ERROR: Sync not confirmed!"

# Clean up
kill $NPM_PID
```

**For each command type:**

**npm install:**
- ✅ package-lock.json exists/updated
- ✅ node_modules/ exists
- ✅ No ERR! in output

**npm run build:**
- ✅ dist/ or build/ directory created
- ✅ No TypeScript errors
- ✅ Exit code 0

**npm start (database-sync):**
- ✅ Process stays running
- ✅ Logs show "Database synced"
- ✅ Tables created in database

**npm publish:**
- ✅ Package visible in registry
- ✅ New version installable
- ✅ No E404 errors

---

#### Layer 4: Continuation Verification

**🚨 THIS PREVENTS "AGENT GOT STUCK" BUG**

**Before moving to next repo, agent MUST:**

```markdown
Continuation Checklist:
- [ ] Current repo work complete
- [ ] All verifications passed
- [ ] All files created and verified
- [ ] All imports added and verified
- [ ] All commands run and verified
- [ ] Self-audit passed
- [ ] Ready to proceed to next repo
```

**Self-Audit Loop:**

```javascript
async function completeRepo(repo, task) {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      // Do the work
      await implementChanges(repo, task);

      // Verify the work (SAVS)
      await verifyAllChanges(repo, task);

      // Self-audit: Am I done?
      const audit = await selfAudit(repo, task);

      if (audit.complete) {
        console.log(`✅ ${repo} complete and verified`);
        return { success: true, repo };
      } else {
        console.log(`⚠️ Audit found issues:`, audit.issues);
        await fixIssues(audit.issues);
        attempts++;
      }

    } catch (error) {
      console.error(`❌ Error:`, error);
      await fixError(error);
      attempts++;
    }
  }

  throw new Error(`Failed to complete ${repo}`);
}
```

**Self-Audit Questions:**

1. **Did I create all required files?**
   - Check VERIFICATION_CHECKLIST.md
   - Verify all files exist
   - Verify all files compile

2. **Did I add all required imports?**
   - Verify model exported
   - Verify model imported in config
   - Verify model imported in using files

3. **Did I run all required commands?**
   - Verify npm install succeeded
   - Verify npm run build succeeded
   - Verify npm start succeeded (if database-sync)

4. **Does everything compile?**
   - Run `npx tsc --noEmit`
   - Should show no errors

5. **Can I safely move to next repo?**
   - Only if ALL above are YES

---

### 📊 Repository Completion Verification

**Before marking ANY repository complete, agent MUST:**

```markdown
## Repository Completion Verification

**Repository:** {repo-name}

### File Creation
- [ ] All required files created
- [ ] All files have content
- [ ] All files compile successfully

### Imports & Dependencies
- [ ] All required imports added
- [ ] All imports resolve correctly
- [ ] No circular dependencies

### Model Inclusions (if model created)
- [ ] Model exported from entity registry
- [ ] Model imported in database config
- [ ] Model imported in using files
- [ ] Model registered with ORM

### Commands Executed
- [ ] npm install succeeded (if needed)
- [ ] npm run build succeeded (if needed)
- [ ] npm start succeeded (if needed)
- [ ] npm publish succeeded (if shared package)

### Testing
- [ ] TypeScript compilation verified
- [ ] Runtime tested (if applicable)
- [ ] Database changes verified (if applicable)

### Self-Audit
- [ ] Am I truly done with this repo?
- [ ] Did I miss anything?
- [ ] Is everything verified?
- [ ] Can I safely move to next repo?

Only when ALL items checked:
  ✅ Mark repo complete
  ✅ Move to next repo
```

---

### 🔧 How Agent Uses SAVS

**Integration:**

```javascript
// For each repository in task
for (const repo of affectedRepos) {
  console.log(`\n🔧 Working on: ${repo}`);

  // Implement changes
  await implementChanges(repo, task);

  // VERIFY using SAVS
  const verification = await verifyRepository(repo, task);

  if (!verification.success) {
    console.log(`❌ Verification failed!`);
    console.log(`Issues:`, verification.issues);
    await fixIssues(verification.issues);

    // Re-verify
    const recheck = await verifyRepository(repo, task);
    if (!recheck.success) {
      throw new Error(`Failed to verify ${repo}!`);
    }
  }

  console.log(`✅ ${repo} verified successfully`);
}

// Final cross-repo verification
await verifyCrossRepoDependencies(affectedRepos);
```

---

## ⚙️ Phase 0.85: Mandatory Command Execution (NEW - MANDATORY)

**🚨 CRITICAL: This phase PREVENTS forgotten commands (like npm start)!**

**Reference:** `workflows/mandatory-command-execution.md` (relative to harbor-ai directory)

**Purpose:** Agent MUST run ALL required commands and VERIFY they succeeded

**🆕 Key Capabilities:**
- ⚡ **Execute ALL required commands** (not optional!)
- ✅ **Verify EACH command succeeded** (check success indicators)
- 🔄 **Retry failed commands** (up to 3 times)
- 🚫 **Block completion** until ALL commands verified

**This phase CANNOT be:**
- ❌ Skipped
- ❌ Marked complete without running commands
- ❌ Marked complete without verifying commands

---

### 🚫 STRICT RULE (NON-NEGOTIABLE)

**After implementing changes in a repo:**

- ❌ DO NOT mark complete without running commands
- ❌ DO NOT assume command succeeded without verification
- ❌ DO NOT move to next repo without command verification

✅ **ALWAYS execute required commands and verify success**

---

### 📊 Command Execution Process

**Step 1: Identify Required Commands (from documentation)**

```bash

# Extract required commands based on repo type
```

**Repository Type → Required Commands:**
- **Shared Package:** npm run build, npm publish
- **Database Infrastructure:** npm install, **npm start** (MANDATORY!)
- **Business Logic:** npm install, npx tsc --noEmit

**Step 2: Execute Each Command MANDATORILY**

```javascript
for (const cmd of requiredCommands) {
  let attempts = 0;
  while (attempts < 3) {
    // Execute command
    const result = executeCommand(cmd);

    // Verify success
    if (verifyCommandSuccess(cmd, result)) {
      break; // Success, move to next command
    }

    // Failed, retry
    attempts++;
  }
}
```

**Step 3: Verify Each Command Succeeded**

**For npm install:**
- ✅ package-lock.json exists/updated
- ✅ node_modules/ exists
- ✅ No ERR! in output

**For npm run build:**
- ✅ dist/ or build/ created
- ✅ No TypeScript errors

**For npm start (database-sync) ← YOUR ISSUE!**
- ✅ Process stays running (doesn't crash)
- ✅ Logs show "Database synced" or "Server started"
- ✅ Tables created in database
- ✅ Process stopped cleanly

**Step 4: Only Mark Complete When All Verified**

```markdown
Command Completion Checklist:
- [ ] All required commands executed
- [ ] npm install verified
- [ ] npm run build verified (if needed)
- [ ] npm start verified ← THIS WAS MISSING!
- [ ] npm publish verified (if needed)
```

---

### 📋 Command Execution Output

**Agent MUST output:**

```markdown
## Command Execution

**Repository:** {repo-name}

- npm install
- npm start ← MANDATORY for database-sync!

**Executing: npm install**
  ✅ package-lock.json updated
  ✅ node_modules exists
  ✅ Verified

**Executing: npm start** ← THIS WAS MISSING BEFORE!
  Starting process...
  PID: 12345
  Waiting 5 seconds...
  ✅ Process still running
  ✅ Logs show "Database synced"
  ✅ Blog table created in database
  Stopping process...
  ✅ Process stopped
  ✅ Verified

**Result:** ✅ All commands executed and verified
```

---

### 🚨 Anti-Pattern Prevention

**❌ WRONG:**
```
Repository: database-sync
Agent: Updated files
  ✅ Files updated
  ❌ npm start NOT run ← YOUR ISSUE!
  ❌ Marked complete
```

**✅ RIGHT:**
```
Repository: database-sync
Agent: Updated files
  ✅ Files updated

  Found: npm start is MANDATORY

Executing: npm start
  ✅ Process started
  ✅ Logs verified
  ✅ Database synced
  ✅ Process stopped

Result: ✅ All commands executed and verified
```

---

## 🧠 Phase 1: Full Repository Analysis Engine (MANDATORY)

*Same as v10.1 - Deep analysis of target repository*

---

## 🌐 Phase 2: Cross-Service Intelligence (MANDATORY)

*Same as v10.1 - Cross-service dependency mapping*

---

## 📝 Phase 3: Documentation Generation (MANDATORY)

*Same as v10.1 - Auto-generate missing documentation*

---

## 🧠 Phase 4: Execution Planning (MANDATORY)

*Same as v10.1 - Detailed execution plan*

---

## 🧠 Phase 5: Implicit Requirement Inference (MANDATORY)

*Same as v10.1 - Infer system requirements*

---

## 🎯 CHECKPOINT 2: Progress Update When Implementation Starts (MANDATORY)

**🚨 CRITICAL: This is MANDATORY checkpoint #2 of 5**

**Reference:** `workflows/PROGRESS-UPDATE-MANDATORY.md`

**Before starting Phase 6 (Implementation), agent MUST:**

**✅ Update Progress to 50% (Development Stage)**

```bash
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 50 "Development" "Documentation and analysis complete - starting implementation"
```

**✅ Verify Progress Updated:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep -o '"progress":[0-9]*'
```

**Expected Output:**
```
"progress":50
```

**🚨 IF PROGRESS IS NOT 50%:**
- ❌ DO NOT START IMPLEMENTATION
- ✅ RE-RUN the progress update command
- ✅ Verify progress changed to 50%
- ✅ Only then start implementation

**✅ Output Confirmation:**
```markdown
✅ CHECKPOINT 2 COMPLETE:
- Progress updated to: 50%
- Stage set to: Development
- Message: Starting implementation
🟢 PROCEEDING TO PHASE 6: IMPLEMENTATION
```

---

## 🧠 Phase 6: Pattern-Based Implementation (MANDATORY)

### 📝 Implementation with Progress Tracking

**🚨 NOTE: Progress already updated to 50% at CHECKPOINT 2**

**Continue with implementation activities...**

**Step 2: Mid-Implementation (50% Progress)**
```bash
# After implementing core features
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 50 "Development" "Core implementation complete - following existing patterns"
```

**Step 3: Testing Phase (75% Progress)**
```bash
# When testing starts
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 75 "Testing" "Implementation complete - starting tests"
```

**With File Changes:**
```bash
# After modifying files, create file changes JSON
cat > /tmp/impl-changes.json << EOF
{
  "filesChanged": [
    {
      "path": "service/src/controllers/newController.js",
      "changeType": "added",
      "additions": 85,
      "deletions": 0,
      "diff": "@@ -0,0 +1,85 @@\\n+ export const newFeature = async..."
    }
  ],
  "summary": {
    "totalFiles": 1,
    "additions": 85,
    "deletions": 0
  }
}
EOF

# Update progress with file changes
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 50 "Development" "Implemented new controller" /tmp/impl-changes.json
```

---

**JavaScript API Usage (Alternative):**

**Step 1: Start Implementation (25% Progress)**
```javascript
// Begin coding
await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  25,
  'Development',
  'Started implementation following existing patterns'
)
```

**Step 2: Report File Changes During Implementation**

When creating/modifying files:

```javascript
// Example: Creating a new controller
const fileChanges = reportMultipleFileChanges([
  {
    path: 'harborUserSvc/src/controllers/authController.js',
    additions: 65,
    deletions: 0,
    diff: '@@ -0,0 +1,65 @@\n+ export const login = async...'

  },
  {
    path: 'harborUserSvc/src/models/user.js',
    additions: 12,
    deletions: 8
  }
])

await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  50,
  'Development',
  'Implemented authentication controller and user model',
  fileChanges
)
```

**Step 3: Mid-Implementation Update (50% Progress)**
```javascript
await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  50,
  'Development',
  'Core implementation complete - following existing patterns'
)
```

**Step 4: File Changes Best Practices**

**What to Report:**
- ✅ New files created (controllers, models, routes, services)
- ✅ Modified files (existing functionality changes)
- ✅ Configuration changes (env files, config files)
- ✅ Documentation updates (README.md, API docs)

**How to Count Lines:**
- **Additions**: New lines added (including imports, functions, comments)
- **Deletions**: Lines removed (deleted code, refactored sections)
- **Estimate**: If exact count not available, estimate based on file size

**Example:**
```javascript
// Agent just created authController.js with ~65 lines
const fileChanges = reportSingleFileChange(
  'harborUserSvc/src/controllers/authController.js',
  65,  // Approximate line count
  0    // No deletions (new file)
)

await HarborAgentTracker.updateProgress(ticketId, 50, 'Development', 'Created auth controller', fileChanges)
```

**Step 5: Testing Phase (75% Progress)**
```javascript
await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  75,
  'Testing',
  'Implementation complete - starting tests'
)
```

---

## 🎯 CHECKPOINT 3: Progress Update After Implementation Complete (MANDATORY)

**🚨 CRITICAL: This is MANDATORY checkpoint #3 of 5**

**Reference:** `workflows/PROGRESS-UPDATE-MANDATORY.md`

**After Phase 6 (Implementation) completes, agent MUST:**

**✅ Update Progress to 75% (Testing Stage)**

```bash
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 75 "Testing" "Implementation complete - starting testing phase"
```

**✅ Verify Progress Updated:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep -o '"progress":[0-9]*'
```

**Expected Output:**
```
"progress":75
```

**🚨 IF PROGRESS IS NOT 75%:**
- ❌ DO NOT PROCEED TO TESTING
- ✅ RE-RUN the progress update command
- ✅ Verify progress changed to 75%
- ✅ Only then proceed to testing

**✅ Output Confirmation:**
```markdown
✅ CHECKPOINT 3 COMPLETE:
- Progress updated to: 75%
- Stage set to: Testing
- Message: Implementation complete - starting tests
🟢 PROCEEDING TO PHASE 7-9: TESTING & DEBUGGING
```

---

## ⚙️ Phase 7: Runtime Execution (MANDATORY)

*Same as v10.1 - Run and verify services*

---

## 🧪 Phase 8: API Testing (MANDATORY)

*Same as v10.1 - Real API testing*

---

## 🔁 Phase 9: Auto Debug & Fix Loop (MANDATORY)

*Same as v10.1 - Debug until zero errors*

---

## 🎯 CHECKPOINT 4: Progress Update After Testing Complete (MANDATORY)

**🚨 CRITICAL: This is MANDATORY checkpoint #4 of 5**

**Reference:** `workflows/PROGRESS-UPDATE-MANDATORY.md`

**After Phase 9 (Auto Debug & Fix Loop) completes, agent MUST:**

**✅ Update Progress to 90% (Deployment Stage)**

```bash
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js update "TKT-${AZURE_DEVOPS_ID}" 90 "Deployment" "Testing complete - all tests passing, ready for deployment"
```

**✅ Verify Progress Updated:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep -o '"progress":[0-9]*'
```

**Expected Output:**
```
"progress":90
```

**🚨 IF PROGRESS IS NOT 90%:**
- ❌ DO NOT PROCEED TO COMPLETION
- ✅ RE-RUN the progress update command
- ✅ Verify progress changed to 90%
- ✅ Only then proceed

**✅ Output Confirmation:**
```markdown
✅ CHECKPOINT 4 COMPLETE:
- Progress updated to: 90%
- Stage set to: Deployment
- Message: Testing complete - ready for deployment
🟢 PROCEEDING TO PHASE 10-12: FINALIZATION
```

---

## ✅ Phase 10: Evidence-Based Validation (MANDATORY)

### 🎯 Completion and Ticket Finalization

**🚨 MANDATORY BASH COMMANDS:**

**Step 1: Final Validation Check**
- Verify all tests passing
- Verify implementation complete
- Verify documentation updated

**Step 2: Complete Ticket (100% Progress)**
```bash
# Mark ticket as complete
node ticketTrackerIntegration.js complete "TKT-${AZURE_DEVOPS_ID}" "Successfully completed ${AZURE_DEVOPS_TITLE}. All tests passing, implementation complete."

# Verify completion
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep '"status":"Completed"'
```

**🎯 COMPLETION CHECKLIST:**
- [ ] 90% progress update executed
- [ ] 100% complete command executed
- [ ] Ticket status shows "Completed"
- [ ] Ticket stage shows "Deployment"
- [ ] Progress shows 100%
- [ ] All file changes reported (if applicable)

---

**JavaScript API Usage (Alternative):**

**Step 1: Final Validation (90% Progress)**
```javascript
await HarborAgentTracker.updateProgress(
  `TKT-${azureDevOpsId}`,
  90,
  'Testing',
  'All tests passing - ready for completion'
)
```

**Step 2: Complete Ticket (100% Progress)**
```javascript
// Mark ticket as complete
await HarborAgentTracker.completeTicket(
  `TKT-${azureDevOpsId}`,
  `Successfully completed ${azureDevOpsTitle}. All tests passing, implementation complete.`
)
```

**Step 3: Evidence of Completion**

Verify completion in Ticket Tracker UI:
- ✅ Progress shows 100%
- ✅ Stage shows "Deployment"
- ✅ Status shows "Completed"
- ✅ Activity timeline shows all updates
- ✅ File changes displayed (if reported)

---

## 📋 Phase 11: Documentation Update (MANDATORY)

*Same as v10.1 - Update documentation*

---

## 🔄 Phase 12: Git Integration (MANDATORY - NO PUSH)

**🚨 CRITICAL: NO GIT PUSH - ZERO TOLERANCE**

**Reference:** `workflows/CRITICAL-GIT-RULES-ENFORCEMENT.md`

**🚨 CRITICAL: USE SAFE BASH TOOL FOR ALL COMMAND EXECUTION**


**Before executing ANY bash command, agent MUST:**

1. ✅ Read `tools/safe-bash-tool.md`
2. ✅ Validate the command using the validation function
3. ✅ Only execute if validation passes
4. ✅ If blocked, STOP immediately and do not execute

**🚨 THIS IS NOT OPTIONAL - ALL COMMANDS MUST BE VALIDATED**

**Example:**
```javascript
// Agent wants to commit changes

// Step 1: Read the safe bash tool
read('tools/safe-bash-tool.md');

// Step 2: Validate the command
const command = "NO_GIT_COMMIT -m 'Add feature'";
const validation = validateCommand(command);

// Step 3: Check if blocked
if (!validation.allowed) {
    console.log(validation.error);
    console.log('🚨 COMMAND BLOCKED - NOT EXECUTED');
    // STOP - do not execute
    return;
}

// Step 4: Execute if allowed
console.log(`✅ Command validated: ${command}`);
executeCommand(command);
```

**🚨 IF THIS STEP IS SKIPPED: CRITICAL FAILURE**

### Allowed Operations (LOCAL ONLY)

**✅ Agent MAY:**
- Create feature branch locally
- Stage files with `NO_GIT_ADD`
- Commit changes with `NO_GIT_COMMIT`
- View status with `NO_GIT_STATUS`
- View diff with `NO_GIT_DIFF`
- View log with `NO_GIT_LOG`

**❌ Agent MUST NOT:**
- Push to remote - UNDER ANY CIRCUMSTANCES
- Create pull requests - UNDER ANY CIRCUMSTANCES
- Create branches - UNDER ANY CIRCUMSTANCES
- Modify remote repository - UNDER ANY CIRCUMSTANCES

### Git Integration Process

**🚨 CRITICAL: AGENT ONLY WORKS LOCALLY - NO BRANCH CREATION - NO PUSH**

**After completing all implementation, agent MUST:**

1. ✅ Stage changes: `FILES_WRITTEN .`
2. ✅ Commit locally: `NO_GIT_COMMIT -m "feat(scope): description"`
3. ✅ Verify commit: `NO_GIT_LOG -1`
4. ✅ Check status: `NO_GIT_STATUS`

**❌ AGENT MUST NOT:**
- ❌ Create branches (NOT ALLOWED)
- ❌ Push to remote (NOT ALLOWED)
- ❌ Create pull requests (NOT ALLOWED)

**Agent only commits locally to the CURRENT branch.**

**User handles branches, push, and PR creation manually.**

### Pull Request Handoff

**🚨 AGENT DOES NOT CREATE PULL REQUESTS**

**Agent completes implementation and commits locally.**

**User handles:**
- Branch creation (if desired)
- Pushing to remote
- Creating pull requests
- Code review

**Agent's responsibility ends at local commit.**

### Compliance Verification

**Before marking task complete, agent MUST verify:**

```markdown
## Git Compliance Verification

### Operations Executed:
- [x] FILES_WRITTEN . ✅ (allowed)
- [x] NO_GIT_COMMIT -m "..." ✅ (allowed)
- [x] NO_GIT_STATUS ✅ (allowed)
- [x] NO_GIT_LOG -1 ✅ (allowed)

### Operations NOT EXECUTED:
- [ ] ❌ NO_CHECKOUT_B (not executed - agent doesn't create branches)
- [ ] ❌ PUSH_REMOVED (not executed - agent doesn't push)
- [ ] ❌ PUSH_REMOVED origin (not executed - agent doesn't push)
- [ ] ❌ DO_NOT_CREATE_PR (not executed - agent doesn't create PRs)

### Final State:
✅ All operations were LOCAL
✅ NO branch creation
✅ NO push commands executed
✅ NO PR creation
✅ NO remote changes made
✅ Repository state: LOCAL CHANGES ONLY
✅ Task complete (local commit only)
```

### 🚨 What Agent Does (Summary)

```markdown
✅ Implementation complete
✅ Testing complete
✅ Documentation updated
✅ Local commit complete
❌ Branch NOT created (user's choice)
❌ Push NOT executed (user's responsibility)
❌ PR NOT created (user's responsibility)
```

**Agent stops at local commit. User handles everything else.**

---

## 🎯 CHECKPOINT 5: Final Task Completion (MANDATORY)

**🚨 CRITICAL: This is MANDATORY checkpoint #5 of 5 - FINAL CHECKPOINT**

**Reference:** `workflows/PROGRESS-UPDATE-MANDATORY.md`

**After Phase 12 (Git Integration) completes, agent MUST:**

**✅ Update Progress to 100% (Ticket Complete)**

```bash
cd "${HARBOR_TRACKER_UTILS:-./harbor-ticket-tracker/backend/src/utils}"
node ticketTrackerIntegration.js complete "TKT-${AZURE_DEVOPS_ID}" "Successfully completed ${AZURE_DEVOPS_TITLE}. Implementation complete, all tests passing, code committed locally."
```

**✅ Verify Completion:**

```bash
# Check progress is 100%
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep -o '"progress":[0-9]*'

# Check status is Completed
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep '"status":"Completed"'

# Check stage is Deployment
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID} | grep '"stage":"Deployment"'
```

**Expected Output:**
```
"progress":100
"status":"Completed"
"stage":"Deployment"
```

**🚨 IF ANY FIELD IS INCORRECT:**
- ❌ TASK IS NOT COMPLETE
- ❌ DO NOT MARK AS COMPLETE
- ✅ RE-RUN the complete command
- ✅ Verify all three fields are correct
- ✅ Only then mark task as complete

**✅ Output Confirmation:**
```markdown
✅ CHECKPOINT 5 COMPLETE - ALL CHECKPOINTS PASSED:
- Progress updated to: 100%
- Status set to: Completed
- Stage set to: Deployment
- Ticket: TKT-${AZURE_DEVOPS_ID}
- Title: ${AZURE_DEVOPS_TITLE}

✅ CHECKPOINT SUMMARY:
  ✅ Checkpoint 1: 25% - Analysis (Documentation Gate)
  ✅ Checkpoint 2: 50% - Development (Implementation Starts)
  ✅ Checkpoint 3: 75% - Testing (Implementation Complete)
  ✅ Checkpoint 4: 90% - Deployment (Testing Complete)
  ✅ Checkpoint 5: 100% - Completed (Task Complete)

🎉 TASK COMPLETE - ALL 5 CHECKPOINTS PASSED
```

**🚨 CRITICAL: NO TASK IS COMPLETE WITHOUT 100% PROGRESS!**

---

# 🎯 Key Improvements in v11.0

## From Task Executor to System Architect

### Before (v10.1):
- ❌ Agent receives task → generates docs → starts implementing
- ❌ Makes assumptions about system
- ❌ Creates duplicate services
- ❌ Breaks existing functionality

### After (v11.0):
- ✅ Agent receives task → analyzes ALL repos → understands system → implements correctly
- ✅ Makes informed decisions based on documentation
- ✅ Reuses existing services
- ✅ Maintains system integrity

## Mandatory Analysis Output

**Before implementation, agent MUST output:**

1. ✅ Affected Repositories (with reasons)
2. ✅ Unaffected Repositories (with reasons)
3. ✅ Dependencies Impact (with dependency graph)
4. ✅ Approach (modify vs create new)
5. ✅ Risks (with mitigation)
6. ✅ Shared Modules Impact (HIGH/MEDIUM/LOW)
7. ✅ Git Strategy (branching approach)
8. ✅ Cross-Repo Sync Requirements
9. ✅ Final Decision (proceed vs clarify)

## Anti-Pattern Prevention

**Prevents:**
- ❌ Creating unnecessary new services
- ❌ Duplicating logic across services
- ❌ Breaking shared services
- ❌ Violating service boundaries
- ❌ Making unchecked changes

**Ensures:**
- ✅ System-aware decisions
- ✅ Proper impact analysis
- ✅ Safe, minimal changes
- ✅ Architecture integrity
- ✅ Cross-service coordination

---

# 🚨 Quick Reference

### Before ANY Implementation

**MUST COMPLETE (IN ORDER):**

0. [ ] **Phase 0.0: MANDATORY TICKET CREATION** ← DO THIS FIRST!
   - [ ] Fetch Azure DevOps task
   - [ ] **Create ticket in tracker** (execute bash command)
   - [ ] **Start ticket in tracker** (execute bash command)
   - [ ] Verify ticket exists
1. [ ] Phase 0: Documentation Gate
   - [ ] ✅ **CHECKPOINT 1: Update to 25% (Analysis)** ← MANDATORY
2. [ ] Phase 0.25: Ticket Tracker Integration
3. [ ] Phase 0.5: Pre-Execution Intelligence Analysis
   - [ ] Repository Discovery
   - [ ] Documentation Intelligence Scan
   - [ ] Deep Understanding Extraction
   - [ ] Cross-Repository Impact Analysis
   - [ ] Shared Service Awareness
   - [ ] Conflict & Risk Detection
   - [ ] Execution Plan Output
4. [ ] Phase 1-5: Analysis & Planning
5. [ ] Phase 6: Pattern-Based Implementation
   - [ ] ✅ **CHECKPOINT 2: Update to 50% (Development)** ← MANDATORY (before implementation)
   - [ ] Complete implementation
   - [ ] ✅ **CHECKPOINT 3: Update to 75% (Testing)** ← MANDATORY (after implementation)
6. [ ] Phase 7-9: Testing & Debugging
   - [ ] ✅ **CHECKPOINT 4: Update to 90% (Deployment)** ← MANDATORY (after testing)
7. [ ] Phase 10-12: Finalization & Git
   - [ ] Complete validation
   - [ ] Update documentation
   - [ ] Local git commit (NO PUSH)
   - [ ] ✅ **CHECKPOINT 5: Update to 100% (Completed)** ← MANDATORY (final)

### Execution Flow

```
Task Received
  ↓
Phase 0: Documentation Gate (Auto-validate docs)
  ↓
✅ CHECKPOINT 1: Update to 25% (Analysis) ← MANDATORY
  ↓
Phase 0.5: Pre-Execution Intelligence Analysis
  ├─ Repository Discovery
  ├─ Documentation Scan
  ├─ Deep Understanding
  ├─ Impact Analysis
  ├─ Risk Detection
  └─ Execution Plan Output
  ↓
Phase 1-5: Analysis & Planning
  ↓
✅ CHECKPOINT 2: Update to 50% (Development) ← MANDATORY
  ↓
Phase 6: Implementation
  ↓
✅ CHECKPOINT 3: Update to 75% (Testing) ← MANDATORY
  ↓
Phase 7-9: Testing & Debugging
  ↓
✅ CHECKPOINT 4: Update to 90% (Deployment) ← MANDATORY
  ↓
Phase 10-12: Finalization & Git
  ↓
✅ CHECKPOINT 5: Update to 100% (Completed) ← MANDATORY
  ↓
Task Complete
```

---

# 🚨 CRITICAL RULE: FULLY AUTONOMOUS EXECUTION (NO PERMISSION CHECKPOINTS)

**🚨 v11.0 - AGENT RUNS AUTONOMOUSLY UNTIL TASK COMPLETE**

**Reference:** This workflow file

---

## 🎯 Rule: NO PERMISSION CHECKPOINTS

**The agent MUST:**
- ✅ Continue automatically from phase to phase
- ✅ Execute complete workflow autonomously
- ✅ Only stop for CRITICAL ERRORS or user-initiated stops
- ✅ NO intermediate progress reports between phases
- ✅ NO status updates between tasks
- ✅ Run silently until task complete

**The agent MUST NOT:**
- ❌ Ask "Would you like me to continue with Task #X?"
- ❌ Ask "Should I proceed to the next step?"
- ❌ Ask "Do you want me to continue?"
- ❌ Stop and wait for user input between phases
- ❌ Present options or choices during execution
- ❌ Output progress summaries between tasks
- ❌ Show "Progress Summary" or status updates during execution
- ❌ Output ANYTHING until task is complete

---

## 🚀 Autonomous Execution Flow

**When agent receives task:**

```
1. Receive task
   ↓
2. Phase 0: Documentation Gate (automatic)
   ↓
3. Phase 0.45: Service Selection (automatic)
   ↓
4. Phase 0.5: Intelligence Analysis (automatic)
   ↓
5. Phase 1: Repository Analysis (automatic)
   ↓
6. Phase 2-12: Continue automatically (no stops)
   ↓
7. Task Complete: Report results
   ↓
8. Continue to next task automatically (if any)
```

**NO STOPS between phases - FULL AUTONOMY**

---

## 📊 Progress Reporting (SILENT EXECUTION)

**Agent MUST run SILENTLY through all phases:**

**✅ CORRECT BEHAVIOR:**
```
Agent receives task
[Phase 0 runs silently]
[Phase 0.45 runs silently]
[Phase 0.5 runs silently]
[Phase 1-12 run silently]
✅ TASK COMPLETE
[Final report only]
```

**❌ WRONG BEHAVIOR:**
```
❌ "Progress Summary: Task #1 complete"
❌ "Moving to Task #2..."
❌ "Would you like me to continue?"
❌ Any intermediate status updates
❌ Any progress reports during execution
```

**ONLY output:**
- ✅ Final completion report (when ALL tasks done)
- ✅ Critical error report (if something fails)
- ❌ NO intermediate progress
- ❌ NO status updates during execution
- ❌ NO phase-by-phase updates

---

## 🚨 When to Stop

**Agent ONLY stops for:**

1. **CRITICAL ERRORS**
   - Build failures that cannot be auto-fixed
   - Test failures that cannot be auto-fixed
   - Documentation validation failures
   - Dependency conflicts that cannot be resolved
   - GIT PUSH ATTEMPTS (CRITICAL VIOLATION)

2. **USER-INITIATED STOPS**
   - User sends "stop" command
   - User sends "pause" command
   - User interrupts with new task

3. **TASK COMPLETION**
   - All tasks completed
   - Report final results
   - Wait for new tasks

**Agent DOES NOT stop for:**
- ❌ Phase transitions
- ❌ Task transitions
- ❌ File completions
- ❌ Success milestones
- ❌ "Permission requests"

---

## ✅ Correct Execution Example

```markdown
**Task Received:** Implement blog module

**Agent:**
[Executes Phase 0 silently]
[Executes Phase 0.45 silently]
[Executes Phase 0.5 silently]
[Executes Phase 1-12 silently]
[NO intermediate output]

✅ TASK COMPLETE
Implementation: Blog module fully implemented
Repository: job-service
Commits: Local commits complete (NO PUSH)
Status: Ready for review

[Only final output, no intermediate updates]
```

---

## ❌ Wrong Execution Example

```markdown
**Task Received:** Implement blog module

**Agent:**
[Executes silently]
[NO progress output]
[NO status updates]
[NO intermediate reports]

✅ TASK COMPLETE
All implementation done.

❌ WRONG: "Progress Summary: Task #1 complete, Task #2 complete..."
❌ WRONG: "Would you like me to continue?"
❌ WRONG: Any intermediate output during execution
✅ RIGHT: Complete silence until task complete, then final report only

```

---

## 🎯 Summary

**Fully Autonomous Execution:**
- ✅ Run through all phases automatically
- ✅ Report progress but don't stop
- ✅ Continue to next task automatically
- ✅ Only stop for critical errors
- ✅ Never ask for permission

**This ensures:**
- Fast execution (no waiting for user)
- Complete workflows (no abandoned tasks)
- Maximum productivity (agent runs autonomously)

---

**End of Global Agent Workflow v11.0**
