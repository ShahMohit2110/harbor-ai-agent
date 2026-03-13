# Repository Analyzer Tool

**Version:** 1.0.0
**Last Updated:** 2026-03-13
**Purpose:** Practical tool for workspace-wide repository analysis

---

## 🚨 When to Use This Tool

This tool is used during **Phase 4: Repository Impact Analysis** of the Harbor AI workflow.

**Trigger:** After completing Phase 3 (Planning), before Phase 5 (Execution)

---

## Tool Purpose

This tool provides the agent with a systematic approach to:

1. **Scan the workspace** for all git repositories
2. **Analyze each repository** to understand its structure and purpose
3. **Evaluate task impact** across all repositories
4. **Determine which repositories** require changes

---

## Repository Scanner Commands

### Step 1: List Workspace Directories

```bash
# Navigate to workspace root
cd /Users/mohitshah/Documents/HarborService/

# List all directories
ls -la
```

**Expected Output:** List of all directories including:
- harbor-ai (agent directory - exclude from analysis)
- harborUserSvc
- harborJobSvc
- harborWebsite
- harborApp
- harborNotificationSvc
- harborSocketSvc
- harborApiGateWay
- harborSharedModels
- Other git repositories

### Step 2: Identify Git Repositories

For each directory, check if it's a git repository:

```bash
# Check if directory is a git repository
cd {directory-name}
git status

# OR check for .git directory
ls -la | grep .git
```

**Criteria for Git Repository:**
- `.git` directory exists
- `git status` command succeeds
- Not the `harbor-ai` directory itself

### Step 3: Analyze Repository Structure

For each git repository discovered:

```bash
# Navigate to repository
cd /Users/mohitshah/Documents/HarborService/{repository-name}

# Check for package.json (Node.js projects)
cat package.json

# List directory structure
ls -la
ls -la src/     # if exists
ls -la app/     # if exists
ls -la lib/     # if exists

# List source files
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | head -20
```

### Step 4: Detect Framework and Technology

**From package.json, identify:**

**Backend Indicators:**
- `"express"` - Express.js backend service
- `"@nestjs/core"` - NestJS backend service
- `"fastify"` - Fastify backend service
- `"sequelize"` or `"typeorm"` - Database ORM (backend)
- `"bull"` - Queue processing (backend)

**Frontend Web Indicators:**
- `"next"` - Next.js web application
- `"react"` + `"vite"` - React + Vite web app
- `"antd"` or `"@mui/material"` - UI component library (web)

**Mobile App Indicators:**
- `"react-native"` - React Native mobile app
- `"expo"` - Expo mobile app
- `ios/` and `android/` folders - Native/React Native

**Shared Library Indicators:**
- No `"main"` or `"start"` script
- Mostly exports in index.ts
- Multiple other repos depend on it

### Step 5: Identify Key Features

**For Backend Services:**
```bash
# Find API routes
find . -path "*/routes/*.ts" -o -path "*/controllers/*.ts" | head -10

# Find data models
find . -path "*/models/*.ts" -o -path "*/entities/*.ts" | head -10

# List main directories
ls -la src/
```

**For Frontend/Web:**
```bash
# Find pages/routes
ls -la app/          # Next.js App Router
ls -la pages/        # Next.js Pages Router
ls -la src/routes/   # React Router

# Find components
find . -path "*/components/*.tsx" -o -path "*/components/*.jsx" | head -10
```

**For Mobile Apps:**
```bash
# Find screens
find . -path "*/screens/*.tsx" -o -path "*/screens/*.ts" | head -10

# List platform folders
ls -la ios/
ls -la android/
```

---

## Task Impact Evaluation

### Step 6: Evaluate Task Against Each Repository

**For the given task, analyze:**

1. **Does the repository have related files?**
   - Search for keywords related to the task
   - Check for feature-specific files

2. **Example: Task is "Redesign profile page"**

   ```bash
   # In harborWebsite:
   find . -iname "*profile*" -o -iname "*user*" | grep -E "\.(tsx?|jsx?)$"

   # In harborApp:
   find . -iname "*profile*" -o -iname "*user*" | grep -E "\.(tsx?|jsx?)$"

   # In harborUserSvc:
   find . -iname "*profile*" -o -iname "*user*" | grep -E "\.ts$"
   ```

3. **Decision based on findings:**
   - Files found → Repository is RELEVANT
   - No related files → Repository is NOT RELEVANT

---

## Output Format

### Repository Analysis Summary

For each repository, document:

```markdown
### Repository: {name}

**Path:** /Users/mohitshah/Documents/HarborService/{name}
**Type:** Backend Service / Frontend Website / Mobile App / Shared Library
**Language:** TypeScript / JavaScript
**Framework:** {framework detected}

**Technology Stack:**
- Main Framework: {Express, Next.js, React Native, etc.}
- Database: {PostgreSQL, MongoDB, etc.} (if backend)
- UI Library: {Ant Design, Material UI, etc.} (if frontend)
- Build Tool: {Webpack, Vite, etc.}

**Directory Structure:**
```
{key directories}
```

**Purpose:**
{Inferred based on structure and dependencies}

**Key Files/Features:**
- {file/feature 1}
- {file/feature 2}

---

**Task Impact Analysis:**

**Related to Task:** YES / NO
**Impact Level:** HIGH / MEDIUM / LOW / NONE
**Reasoning:** {Why this repository is or isn't relevant}

**Changes Required:** (if relevant)
- [ ] {specific change 1}
- [ ] {specific change 2}
```

---

## Complete Analysis Example

### Example: "Redesign Profile Page" Task

**Repositories Discovered:** 9

#### 1. harborWebsite
- **Type:** Frontend Website
- **Framework:** Next.js
- **Analysis:** Contains web profile page
- **Related:** ✅ YES - Has `app/profile/view/page.tsx`
- **Impact:** HIGH
- **Changes:** Update profile page UI components

#### 2. harborApp
- **Type:** Mobile App
- **Framework:** React Native
- **Analysis:** Contains mobile profile screen
- **Related:** ✅ YES - Has `screens/ProfileScreen.tsx`
- **Impact:** HIGH
- **Changes:** Update mobile profile screen UI

#### 3. harborUserSvc
- **Type:** Backend Service
- **Framework:** Express
- **Analysis:** Provides user profile API
- **Related:** ❌ NO - API doesn't need changes for UI redesign
- **Impact:** NONE
- **Changes:** None (API remains unchanged)

#### 4-9. [Other Repositories]
- **Related:** ❌ NO
- **Impact:** NONE
- **Changes:** None

---

## Decision Matrix

| Repository | Type | Has Related Code? | Impact | Include? |
|------------|------|-------------------|--------|----------|
| harborWebsite | Frontend | ✅ Yes | HIGH | ✅ Yes |
| harborApp | Mobile | ✅ Yes | HIGH | ✅ Yes |
| harborUserSvc | Backend | ❌ No | NONE | ❌ No |
| ... | ... | ... | ... | ... |

---

## Implementation Plan

### Repositories Requiring Changes:

1. **harborWebsite** (Primary)
   - Update profile page component
   - Update styles
   - Test responsive design

2. **harborApp** (Primary)
   - Update profile screen component
   - Update mobile layout
   - Test on iOS/Android

### Implementation Order:
1. harborWebsite (web UI)
2. harborApp (mobile UI)

### Dependencies:
- No cross-repository dependencies
- Can implement in parallel

---

## Integration with Agent Workflow

### Automatic Execution

The agent automatically executes this workflow:

1. **After Planning Phase:**
   - Agent reads `repository-impact-analysis.md`
   - Agent executes repository scanning commands
   - Agent analyzes each repository
   - Agent creates impact analysis report

2. **Before Execution Phase:**
   - Agent has complete list of relevant repositories
   - Agent knows which repositories to modify
   - Agent proceeds with implementation in all relevant repositories

3. **Execution Phase:**
   - Agent iterates through all relevant repositories
   - Agent makes required changes in each repository
   - Agent ensures complete coverage of task scope

---

## Safety Checks

### Before Proceeding to Implementation

✅ **Confirm ALL of these:**
- [ ] Workspace scanned for all repositories
- [ ] Each repository analyzed for structure and purpose
- [ ] Task impact evaluated for EACH repository
- [ ] Relevance decision made for EACH repository
- [ ] All relevant repositories identified
- [ ] Implementation plan created for ALL relevant repositories

❌ **FORBIDDEN:**
- Proceeding to implementation without completing analysis
- Assuming which repositories are relevant
- Skipping repositories without analysis
- Modifying only one repository without checking others

---

## Quick Reference Commands

```bash
# List workspace directories
ls -la /Users/mohitshah/Documents/HarborService/

# Check if git repository
cd {directory} && git status

# Read package.json
cat package.json

# Find source files
find . -name "*.ts" -o -name "*.tsx" | head -20

# Search for feature-related files
find . -iname "*{keyword}*" | grep -E "\.(tsx?|jsx?)$"

# List directory structure
tree -L 2 -I 'node_modules|.git'
# OR
ls -la && ls -la src/ && ls -la app/
```

---

**End of Repository Analyzer Tool**
