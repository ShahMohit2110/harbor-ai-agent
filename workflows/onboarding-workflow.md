# Harbor Agent Onboarding Workflow

**Purpose:** Guide the agent through onboarding tickets (type="onboard")

**Version:** 1.0.0  
**Date:** 2026-04-05

---

## 🎯 What is an Onboarding Ticket?

An **onboarding ticket** is automatically created when a new Project is added. Its purpose is to:

1. **NOT** perform full repository analysis (like regular tickets)
2. **NOT** scan all repositories
3. **ONLY** create documentation structure for the target project
4. Prepare the project for future development tickets

---

## 🔍 Detecting Onboarding Tickets

**Check ticket type before processing:**

```javascript
// When agent picks a ticket
const ticketType = ticket.type || "task"  // default is "task"

if (ticketType === "onboard") {
  // → Use ONBOARDING WORKFLOW
} else {
  // → Use REGULAR WORKFLOW (unchanged)
}
```

---

## 📋 Onboarding Workflow Steps

### Step 1: Get Project Details

From the onboarding ticket, extract:
```json
{
  "id": "TKT-Onboard-XXX",
  "type": "onboard",
  "projectId": "PRJ-XXX",
  "title": "Onboarding: Project Name",
  "description": "Repository: /path/to/repo"
}
```

**API Call:**
```bash
curl -s http://localhost:3001/api/projects/{projectId} | python3 -c "import sys,json; d=json.load(sys.stdin)['data']; print(d['repoPath'])"
```

### Step 2: Create Centralized Documentation Structure

**🆕 IMPORTANT: Documentation is now centralized in `ai-docs/` folder at workspace root**

**🆕 NEW: One folder PER REPOSITORY, not per project**

**🚨 CRITICAL: 100% DYNAMIC - NO HARDCODED NAMES**
- ✅ repoPath comes from API (DYNAMIC)
- ✅ Repositories discovered via `find` command (DYNAMIC)
- ✅ Folder names from actual repository names (DYNAMIC)
- ❌ NO hardcoded repository names anywhere

**Get repoPath from projects-data.json and create ai-docs structure for EACH repo:**
```bash
# Get project details from API
REPO_PATH=$(curl -s http://localhost:3001/api/projects/{projectId} | jq -r '.data.repoPath')
PROJECT_NAME=$(curl -s http://localhost:3001/api/projects/{projectId} | jq -r '.data.projectName')

# Navigate to the repoPath (workspace root)
cd "$REPO_PATH"

echo "🎯 Workspace: $PROJECT_NAME"
echo "📁 Location: $REPO_PATH"
echo "🔍 Discovering repositories in workspace..."

# Find ALL git repositories in workspace (maxdepth 2 for immediate children)
ALL_REPOS=$(find "$REPO_PATH" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort)

echo "📊 Found $(echo "$ALL_REPOS" | wc -l | tr -d ' ') repositories"

# For EACH repository, create ai-docs/{repoName}/ folder
for REPO in $ALL_REPOS; do
    # Extract repo name from path
    REPO_NAME=$(basename "$REPO")

    echo ""
    echo "📦 Processing repository: $REPO_NAME"
    echo "   Path: $REPO"

    # Sanitize repo name for folder (remove spaces, special chars)
    SANITIZED_NAME=$(echo "$REPO_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

    # Create ai-docs folder for this repository at workspace root
    mkdir -p "ai-docs/$SANITIZED_NAME"

    echo "   ✅ Created: ai-docs/$SANITIZED_NAME/"
    echo "   📁 Full path: $REPO_PATH/ai-docs/$SANITIZED_NAME/"

    # Check if folder already has 12 files
    MD_COUNT=$(find "ai-docs/$SANITIZED_NAME" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
    echo "   📄 Existing files: $MD_COUNT/12"

    if [ "$MD_COUNT" -lt 12 ]; then
        echo "   📝 Need to generate $((12 - MD_COUNT)) files..."
        # Files will be generated in Step 3
    else
        echo "   ✅ All 12 files already present"
    fi
done

echo ""
echo "✅ ai-docs structure created for all repositories"
echo "📍 Base location: $REPO_PATH/ai-docs/"
```

**⚠️ CRITICAL: 100% DYNAMIC - NO HARDCODED REPOSITORY NAMES**

The `find` command DISCOVERS all git repositories at runtime. NO repository names are hardcoded in the workflow.

**Example (for illustration only - actual repos will be discovered dynamically):**
- `repoPath`: `{from API - DYNAMIC}` (workspace root)
- `projectName`: `{from API - DYNAMIC}`
- Repositories found in workspace: `{DISCOVERED by find command}`
  - Example: `/path/to/workspace/{discovered-repo-1}`
  - Example: `/path/to/workspace/{discovered-repo-2}`
  - Example: `/path/to/workspace/{discovered-repo-3}`

**Final structure created:**
```
/Users/mohitshah/Documents/HarborService/ai-docs/
├── harborapi/
│   ├── ARCHITECTURE.md
│   ├── STRUCTURE.md
│   └── ... (12 files)
├── harboruser/
│   ├── ARCHITECTURE.md
│   ├── STRUCTURE.md
│   └── ... (12 files)
├── harborauth/
│   └── ... (12 files)
├── harborpayment/
│   └── ... (12 files)
└── harbordatabase/
    └── ... (12 files)
```

**Note:** ALL paths are determined dynamically from the `repoPath` field in projects-data.json. No hardcoded paths.

**Create the following files (if they don't exist):**

1. **ARCHITECTURE.md** - Service overview and relationships
2. **STRUCTURE.md** - Folder structure and layer responsibilities
3. **DEPENDENCIES.md** - External and internal dependencies
4. **SERVICE_RULES.md** - DOs and DON'Ts for the service
5. **SHARED_SERVICES.md** - Shared service inventory
6. **CHANGE_IMPACT.md** - Impact analysis guidelines
7. **DEVELOPMENT_RULES.md** - Coding standards
8. **GIT_RULES.md** - Git workflow rules
9. **API_PATTERNS.md** - Request/response patterns
10. **AUTH.md** - Authentication/authorization (if applicable)
11. **DATABASE.md** - DB schema, ORM, relationships (if applicable)
12. **MODEL_FLOW.md** - Data flow through the system

### Step 3: Generate Documentation Files for EACH Repository

**For EACH repository discovered in Step 2, generate the 12 required files:**

```bash
# Required files for each repository
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

# Loop through each repository and generate files
for REPO in $ALL_REPOS; do
    REPO_NAME=$(basename "$REPO")
    SANITIZED_NAME=$(echo "$REPO_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

    echo ""
    echo "📝 Generating documentation for: $REPO_NAME"
    echo "   Folder: ai-docs/$SANITIZED_NAME/"

    # Check which files are missing
    MISSING_FILES=()
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "ai-docs/$SANITIZED_NAME/$file" ]; then
            MISSING_FILES+=("$file")
        fi
    done

    if [ ${#MISSING_FILES[@]} -eq 0 ]; then
        echo "   ✅ All 12 files already exist for $REPO_NAME"
        continue
    fi

    echo "   📄 Generating ${#MISSING_FILES[@]} missing files..."

    # Generate each missing file
    for file in "${MISSING_FILES[@]}"; do
        echo "      📝 Creating: $file"

        # Generate content based on file type and repo analysis
        # Use Read tool to analyze the repository structure
        # Generate appropriate content for each file type
        # (see templates below)

    done

    echo "   ✅ Generated all files for $REPO_NAME"
done
```

**Important:** For each file, analyze the ACTUAL repository code to generate accurate, repository-specific documentation. Do NOT use generic templates.

## Entry Points
{Identify main entry points: index.js, App.tsx, main.go, etc.}
```

**Key Changes:**
- ✅ **{REPO_NAME}** - Use actual repository name (e.g., "harborApi", "harborUser")
- ✅ **{REPO_PATH}** - Use actual repository path
- ✅ **Analyze actual code** - Don't use templates, analyze the real repository
- ✅ **Detect technology stack** - From package.json, requirements.txt, pom.xml, etc.
- ✅ **Document actual structure** - Use Read tool to explore the repository

**STRUCTURE.md Template:**
```markdown
# Project Structure

## Folder Organization
```
{repoPath}/
├── src/            # Source code
├── tests/          # Test files
└── package.json    # Dependencies

Note: AI-generated documentation is stored in: ai-docs/{projectRepoName}/
```

## Layer Responsibilities
<!-- Describe each layer's purpose -->
```

**...and so on for each file**

### Step 4: Update Progress

**Update progress through stages:**

```bash
# 10% - Discovered repositories
cd "$HARBOR_TRACKER_UTILS"
node ticketTrackerIntegration.js update "{ticketId}" 10 "Analysis" "Discovered $(echo "$ALL_REPOS" | wc -l | tr -d ' ') repositories in workspace"

# 25% - Created ai-docs folders for all repos
node ticketTrackerIntegration.js update "{ticketId}" 25 "Planning" "Created ai-docs folders for all repositories"

# 50% - Generated documentation files for all repos
node ticketTrackerIntegration.js update "{ticketId}" 50 "Development" "Generated 12 documentation files for each repository"
```

### Step 5: Mark Project Onboarding Complete

```bash
curl -X POST http://localhost:3001/api/projects/{projectId}/complete
```

### Step 6: Complete Onboarding Ticket

```bash
harbor-ticket-complete "{ticketId}" "Project onboarding completed successfully"
```

---

## 🚫 DO NOT Do in Onboarding

- ❌ Do NOT perform full repository scan outside the workspace
- ❌ Do NOT read documentation from other workspaces/projects
- ❌ Do NOT create any implementation code
- ❌ Do NOT modify existing code in repositories
- ❌ Do NOT make any architectural decisions
- ❌ Do NOT create ai-docs folder in harbor-ai repository

---

## ✅ DO in Onboarding

- ✅ Navigate to repoPath (workspace root) from projects-data.json
- ✅ Discover ALL git repositories in that workspace
- ✅ Create `ai-docs/{repoName}/` folder for EACH repository
- ✅ Generate REPO-SPECIFIC documentation (analyze actual code)
- ✅ Update ticket progress appropriately
- ✅ Mark project onboarding as complete when done
- ✅ Complete the onboarding ticket

---

## 🧪 Verification

After onboarding, verify:

1. ✅ `ai-docs/` folder exists at workspace root (repoPath location)
2. ✅ `ai-docs/` contains ONE folder PER REPOSITORY (not one folder for entire project)
3. ✅ Each repository folder has all 12 documentation files
4. ✅ Each file contains REPO-SPECIFIC content (not generic templates)
5. ✅ `project.onboardingCompleted = true`
6. ✅ Onboarding ticket marked complete
7. ✅ Regular ticket workflow still works

**Example verification:**
```bash
# Check workspace has ai-docs folder
ls /Users/mohitshah/Documents/HarborService/ai-docs/

# Should see one folder per repository
# harborapi/
# harboruser/
# harborauth/
# harborpayment/
# harbordatabase/

# Each folder should have 12 .md files
ls /Users/mohitshah/Documents/HarborService/ai-docs/harborapi/ | wc -l
# Should return: 12
```

---

## 📊 Example Flow

```
User creates project "Harbor Backend Services"
    ↓
Backend creates onboarding ticket: TKT-Onboard-ABC
    ↓
Agent picks up TKT-Onboard-ABC
    ↓
Agent detects type="onboard"
    ↓
Agent fetches project details from API:
    - repoPath: "/Users/mohitshah/Documents/HarborService/"
    - projectName: "Harbor Backend Services"
    ↓
Agent navigates to repoPath (workspace root)
    ↓
Agent discovers ALL git repositories in workspace:
    - harborApi/
    - harborUser/
    - harborAuth/
    - harborPayment/
    - harborDatabase/
    ↓
For EACH repository, agent:
    1. Creates ai-docs/{repoName}/ folder
    2. Analyzes the repository code
    3. Generates 12 REPO-SPECIFIC documentation files
    ↓
Final structure:
    /HarborService/ai-docs/
    ├── harborapi/     (12 files specific to harborApi)
    ├── harboruser/    (12 files specific to harborUser)
    ├── harborauth/    (12 files specific to harborAuth)
    ├── harborpayment/ (12 files specific to harborPayment)
    └── harbordatabase/(12 files specific to harborDatabase)
    ↓
Agent updates project.onboardingCompleted = true
    ↓
Agent marks ticket complete
    ↓
Now ALL repositories in workspace are ready for development tickets!
```

---

**Last Updated:** 2026-04-11
**Version:** 2.0.0 - Multi-Repository Support
**Status:** ✅ Ready for Implementation
