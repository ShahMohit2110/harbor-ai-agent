# Harbor AI Agent Memory

**Last Updated:** 2026-03-13

## 🆕 Dynamic Multi-Repository Agent (v2.0)

The Harbor AI Agent has been upgraded to support **dynamic multi-repository development** without hardcoded service assumptions.

### New Capabilities

1. **Automatic Repository Discovery** ⚡ RUNTIME
   - Scans workspace for all git repositories **when agent starts**
   - Analyzes repository structure and technology stack **automatically on startup**
   - Detects project types (backend, frontend, mobile, shared) **at runtime**
   - Builds repository relationship map **every agent execution**

   **🚨 IMPORTANT:** This happens as a **runtime workflow step**, NOT during setup.
   - No pre-analysis required
   - No manual setup commands
   - Fresh analysis on every agent startup
   - See `AGENT_STARTUP_WORKFLOW.md` for complete startup sequence

2. **Dynamic Task Routing**
   - Analyzes task requirements automatically
   - Determines affected repositories dynamically
   - No hardcoded service mapping required
   - Adapts to new repositories seamlessly

3. **Repository Memory System**
   - Stores discovered repository information
   - Auto-generates repository documentation
   - Maintains relationship graphs
   - Updates with each scan

4. **Testing Mode** 🧪
   - Safe environment for testing agent behavior
   - Creates local branches only
   - Does NOT push to remote
   - Does NOT create Pull Requests
   - Does NOT update Azure DevOps tickets
   - Generates implementation summaries

### Enabling Testing Mode

Set environment variable:
```bash
export HARBOR_AI_TESTING_MODE=true
```

Or in `.env`:
```env
HARBOR_AI_TESTING_MODE=true
```

### New Documentation Files

- `workflows/dynamic-workflow.md` - Dynamic multi-repository workflow
- `workflows/testing-mode.md` - Testing mode configuration
- `tools/repository-scanner.md` - Repository scanner tool
- `memory/repo-analysis/*.md` - Individual repository analyses (generated at runtime)

### Workflow Changes

**Old (Hardcoded):**
1. Read `service-map.md` for predefined services
2. Look up task in static service mapping
3. Implement in known service locations

**New (Dynamic):**
1. Scan workspace for all repositories
2. Analyze each repository structure
3. Match task requirements to repository capabilities
4. Implement in discovered repositories

### What Stayed the Same

✅ Planning workflow
✅ Code quality standards
✅ Testing requirements
✅ Branch naming conventions
✅ Commit message format

---

## 🚨 CRITICAL: Multi-Repository Execution Fix (2026-03-13)

**Issue Fixed:** Agent was only modifying harborWebsite repository instead of ALL relevant repositories.

### Root Cause

The `execution.md` workflow was designed for single-repository execution:
- Mentioned "target service" (singular)
- Had "Navigate to Primary Service Directory" (singular)
- No loop or iteration over multiple repositories
- No explicit enforcement of multi-repository execution

### The Fix

Updated `execution.md` with:

1. **"Multi-Repository Execution (MANDATORY)" Section**
   - MANDATORY reading of Repository Impact Analysis report
   - Requires extracting complete repository list
   - Creates checklist of ALL repositories requiring changes

2. **Updated Step 2 (Identify Affected Services)**
   - MANDATORY Repository Impact Analysis reading
   - Extraction of repository list from impact analysis
   - Creation of repository execution checklist
   - Validation checkpoint before proceeding

3. **Added Step 3.5 (Multi-Repository Loop Planning)**
   - Determines implementation order based on dependencies
   - Creates repository loop structure
   - Pre-implementation verification checklist

4. **Added Step 7.5 (Repository Loop Check)**
   - Checks repository execution status
   - Loops back to Step 4 if more repositories need changes
   - Verifies ALL repositories complete before testing

5. **Updated Prerequisites Section**
   - Added Repository Impact Analysis as MANDATORY prerequisite
   - Verification checkpoints for impact analysis completion
   - Required reading service-specific rules for ALL affected services

### Key Behavioral Changes

**Before Fix:**
- Agent would identify multiple repos in impact analysis
- Then implement in only ONE repo (typically harborWebsite)
- Other repos were ignored

**After Fix:**
- Agent MUST read impact analysis report before implementation
- Agent MUST create checklist of ALL affected repositories
- Agent MUST implement in EACH repository on checklist
- Agent MUST verify ALL repositories complete before testing
- Loop structure ensures no repository is skipped

### Verification

To verify multi-repository execution is working:

1. **Check for impact analysis report:**
   ```bash
   ls -la harbor-ai/agent-progress/*-repository-impact-analysis.md
   ```

2. **Check implementation summary:**
   ```bash
   cat harbor-ai/agent-progress/task-{id}-summary.md
   ```
   Should list ALL affected repositories

3. **Verify agent behavior:**
   - Scans workspace for ALL repositories
   - Analyzes EACH repository for relevance
   - Creates checklist of ALL affected repositories
   - Implements in EACH repository on checklist

### Documentation

See `MULTI_REPOSITORY_FIX_SUMMARY.md` for complete details of the fix.

---

## harborSharedModels Special Workflow 🚨

**CRITICAL: These rules apply ONLY to `harborSharedModels` service. All other services follow the standard Harbor AI workflow.**

### Purpose
`harborSharedModels` is a **shared model library** containing common data models used across multiple Harbor services. Any change requires **version updates and strict handling**.

### Case 1: Updating an Existing Model
When modifying an **existing model file** (adding/removing fields or updating logic):
1. Make the required changes in the model file
2. Open `package.json`
3. **Increment the version number** to the next version

**Mandatory:** Version update in `package.json` is required whenever a model is modified.

### Case 2: Adding a New Model
When **creating a new model file**:
1. Create the new model file inside the `models` folder
2. Add an export entry in `models/index.ts`
3. Register the model in `src/index.ts`
4. **Update the version in `package.json`**

### Git Workflow Rules (DIFFERENT from standard Harbor workflow)
For `harborSharedModels`:
1. Create a **new branch from the `main` branch** (not dev)
2. Apply all required model changes
3. Commit and push changes to the new branch
4. **DO NOT CREATE A PULL REQUEST** - only push to branch

### Execution Restrictions
For `harborSharedModels` service:
- ❌ Do **NOT run tests**
- ❌ Do **NOT run `npm start`**
- ✅ Only **update and version** the service

### 🚨 CRITICAL: Dependency Update Rules

**When harborSharedModels version is updated, ANY service that depends on it MUST reference the NEW VERSION NUMBER, NOT a file path.**

**❌ WRONG:**
```json
"harbor-shared-models": "file:../harborSharedModels"
```

**✅ CORRECT:**
```json
"harbor-shared-models": "1.2.5"
```

**Required Process:**
1. Read current version from `harborSharedModels/package.json`
2. Update dependency in other service's `package.json` to use that EXACT version number
3. NEVER use `file:../harborSharedModels` or any file path reference
4. Run `npm install` in the service directory

**Affected Services:**
- harborUserSvc
- harborJobSvc
- harborNotificationSvc
- harborSocketSvc
- harborGateway

### Scope Limitation
These rules apply **EXCLUSIVELY** to `harborSharedModels`.

For all other services (harborUserSvc, harborJobSvc, harborNotificationSvc, harborSocketSvc, harborGateway):
- Continue using the **standard Harbor AI workflow**
- Continue generating **Pull Requests to the `dev` branch**
- Continue running tests and validations

---

## Project Structure

**Working Directory:** `/Users/mohitshah/Documents/HarborService/harbor-ai`

This is the documentation directory. Code implementations go in service directories:
- **harborUserSvc** (User Service - Port 3001)
- **harborJobSvc** (Job Service - Port 3004)
- **harborNotificationSvc** (Notification Service - Port 3003)
- **harborSocketSvc** (Socket Service)
- **harborGateway** (API Gateway - Port 7000)
- **harborSharedModels** (Shared Model Library) - Uses special workflow (see above)

**CRITICAL:** Never create .ts or package.json files in harbor-ai directory. Always navigate to the correct service directory before implementing.

---

## Key Documentation Files

- `workflows/repository-impact-analysis.md` - **🚨 MANDATORY: Workspace-wide repository evaluation BEFORE implementation**
- `workflows/harbor-shared-models-workflow.md` - **SPECIAL workflow for harborSharedModels**
- `workflows/ai-workflow.md` - Master workflow document (7 phases)
- `workflows/planning.md` - Planning template
- `workflows/execution.md` - Execution workflow
- `workflows/testing.md` - Testing workflow
- `workflows/pr.md` - Pull Request workflow
- `tools/azure-devops-fetch.md` - Fetch Azure DevOps tasks
- `tools/azure-devops-update-ticket.md` - Update tickets to "Closed"
- `tools/repository-scanner.md` - Repository scanning tool

---

## 🚨 CRITICAL: Repository Impact Analysis Phase (MANDATORY)

**New Phase 4: Repository Impact Analysis**

**As of 2026-03-13, the Harbor AI workflow includes a MANDATORY Repository Impact Analysis phase that runs AFTER Planning and BEFORE Execution.**

### What This Phase Does

1. **Workspace Discovery**
   - Scans the entire workspace for ALL git repositories
   - Validates each repository
   - No hardcoded repository names

2. **Repository Analysis**
   - Analyzes each repository's structure
   - Detects technology stack (framework, language, etc.)
   - Infers repository purpose (backend, frontend, mobile, shared)
   - Documents repository characteristics

3. **Task Impact Evaluation**
   - Evaluates the task requirements against EACH repository
   - Determines which repositories contain related code
   - Assesses impact level for each repository

4. **Relevance Determination**
   - Explicitly decides: Include or Exclude each repository
   - Documents reasoning for each decision
   - Identifies ALL repositories requiring changes

5. **Multi-Repository Planning**
   - Creates implementation order
   - Identifies cross-repository dependencies
   - Plans changes for ALL relevant repositories

### Why This Phase is MANDATORY

**Problem:** Without this phase, the agent might modify only one repository (e.g., the website) even when other repositories (e.g., the mobile app) also contain related code that needs to be updated.

**Example:** Task is "Redesign the profile page"
- ❌ **Without analysis:** Agent might only update `harborWebsite`
- ✅ **With analysis:** Agent discovers and updates BOTH `harborWebsite` AND `harborApp` (mobile app)

### Forbidden Actions

The agent MUST NOT:
- ❌ Skip the Repository Impact Analysis phase
- ❌ Proceed to execution without completing repository analysis
- ❌ Assume which repositories are relevant without analysis
- ❌ Use hardcoded repository lists or mappings

### Workflow Order

```
Task Intake → System Understanding → Planning → **Repository Impact Analysis (MANDATORY)** → Execution → Testing → PR → Closure
```

### Documentation Reference

See `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/repository-impact-analysis.md` for complete implementation details.

---

## 🚨 CRITICAL: Workflow Phase Changes

**As of 2026-03-13, the Harbor AI workflow has 7 phases (increased from 6):**

1. Task Intake
2. System Understanding
3. Planning
4. **Repository Impact Analysis** (NEW - MANDATORY)
5. Execution (was Phase 4)
6. Testing (was Phase 5)
7. Pull Request Creation (was Phase 6)
