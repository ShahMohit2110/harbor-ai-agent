# Repository Impact Analysis Workflow

**Version:** 1.0.0
**Last Updated:** 2026-03-13
**Purpose:** Mandatory workspace-wide repository evaluation before implementation

---

## 🚨 CRITICAL: THIS PHASE IS MANDATORY

**This workflow MUST be executed BEFORE any implementation begins.**

**NO EXCEPTIONS.**

---

## Purpose

The Repository Impact Analysis phase ensures that the agent:

1. **Discovers ALL repositories** in the workspace dynamically
2. **Analyzes each repository** to understand its purpose, structure, and technology
3. **Evaluates task impact** across ALL repositories
4. **Identifies ALL relevant repositories** that require changes
5. **Creates a complete implementation plan** covering all affected repositories

**This prevents the agent from:**
- ❌ Modifying only one repository when others are also affected
- ❌ Making assumptions about which repositories are relevant
- ❌ Missing repositories that contain related code
- ❌ Creating incomplete implementations that don't address the full scope

---

## When This Workflow Runs

**Execution Point:** AFTER Planning Phase, BEFORE Execution Phase

```
Task Intake → Planning → **REPOSITORY IMPACT ANALYSIS** → Execution → Testing → PR → Closure
```

---

## Workflow Phases

### Phase 1: Workspace Discovery

#### 1.1 Scan Workspace Root

**Action:** Scan the parent directory of the harbor-ai agent directory

**Steps:**

1. **Identify workspace root:**
   ```bash
   # The agent is located at: /Users/mohitshah/Documents/HarborService/harbor-ai/
   # The workspace root is: /Users/mohitshah/Documents/HarborService/
   ```

2. **List all directories in workspace root:**
   ```bash
   ls -la /Users/mohitshah/Documents/HarborService/
   ```

3. **Identify git repositories:**
   - For each directory, check if `.git` subdirectory exists
   - Exclude the `harbor-ai` directory itself (that's the agent)
   - Exclude non-repository directories (`.claude`, node_modules, etc.)

#### 1.2 Validate Repositories

**For each discovered directory:**

1. Verify it's a valid git repository
2. Check repository is accessible
3. Gather basic metadata:
   - Repository name
   - Full path
   - Current branch
   - Git remote (if available)

**Output:** List of all repositories in workspace

```markdown
## Discovered Repositories

1. **harborUserSvc** - `/Users/mohitshah/Documents/HarborService/harborUserSvc`
2. **harborJobSvc** - `/Users/mohitshah/Documents/HarborService/harborJobSvc`
3. **harborWebsite** - `/Users/mohitshah/Documents/HarborService/harborWebsite`
4. **harborApp** - `/Users/mohitshah/Documents/HarborService/harborApp`
... (and all other repositories)
```

---

### Phase 2: Repository Analysis

#### 2.1 Analyze Each Repository

**For EACH discovered repository, perform the following analysis:**

**Step 1: Read package.json (if present)**

```bash
# Check if package.json exists
cat {repository-path}/package.json
```

Extract:
- Project name
- Dependencies (frameworks, libraries)
- Scripts (start, build, test)
- Project type indicators

**Step 2: Analyze Directory Structure**

```bash
# List directory structure
ls -la {repository-path}/
ls -la {repository-path}/src/  # if exists
ls -la {repository-path}/app/  # if exists
```

Identify:
- Source directories (src/, app/, lib/, etc.)
- Configuration files
- Entry points
- Test directories
- Build outputs

**Step 3: Detect Technology Stack**

Based on dependencies and structure, identify:
- **Language:** TypeScript, JavaScript, Python, etc.
- **Framework:** Express, Next.js, React Native, etc.
- **Build Tool:** Webpack, Vite, etc.
- **Database:** PostgreSQL, MongoDB, etc. (if backend)
- **Testing Framework:** Jest, Cypress, etc.

**Step 4: Infer Repository Purpose**

**Framework Detection Patterns:**

| Pattern | Framework | Type | Purpose |
|---------|-----------|------|---------|
| `express` in dependencies | Express.js | Backend | API service |
| `next` in dependencies | Next.js | Frontend | Web application |
| `react-native` in dependencies | React Native | Mobile | Mobile app |
| No main/start script, mostly exports | N/A | Shared | Shared library |
| `src/controllers/`, `src/routes/` | Any | Backend | API service |
| `app/` or `pages/` directory | Any | Frontend | Web app |
| `ios/` and `android/` folders | Any | Mobile | Mobile app |

**Purpose Categories:**

1. **Backend Service:** API endpoints, database access, business logic
2. **Frontend Website:** Web UI, pages, components
3. **Mobile Application:** Mobile app (React Native, Flutter)
4. **Shared Library:** Code shared by multiple repositories
5. **Gateway/Infrastructure:** API Gateway, authentication, etc.

#### 2.2 Repository Analysis Output

**For each repository, document:**

```markdown
### Repository: {name}

**Path:** {full-path}
**Type:** Backend Service / Frontend Website / Mobile App / Shared Library
**Language:** TypeScript / JavaScript / etc.
**Framework:** Express / Next.js / React Native / etc.

**Technology Stack:**
- Framework: {framework}
- Database: {database} (if applicable)
- UI Library: {UI library} (if frontend/mobile)
- Build Tool: {build tool}

**Structure:**
```
{directory tree}
```

**Purpose:**
{Inferred purpose based on analysis}

**Key Features Detected:**
- {feature 1}
- {feature 2}
- {feature 3}

**API Endpoints:** (for backend services)
- {endpoint 1}
- {endpoint 2}

**Routes/Pages:** (for frontend/mobile)
- {route/page 1}
- {route/page 2}
```

---

### Phase 3: Task Impact Analysis

#### 3.1 Analyze Task Requirements

**Review the task description and requirements:**

1. **What feature/change is being implemented?**
2. **What user-facing functionality is affected?**
3. **What data models are involved?**
4. **What APIs are affected?**
5. **What UI/components are affected?**

#### 3.2 Evaluate Impact on Each Repository

**For EACH analyzed repository, determine:**

**Question 1: Does this repository contain code related to the task?**

Consider:
- Does the repository have APIs/routes related to the feature?
- Does the repository have UI/components related to the feature?
- Does the repository have data models related to the feature?
- Does the repository have business logic related to the feature?

**Question 2: Will this repository require changes?**

Consider:
- Are API changes needed?
- Are UI changes needed?
- Are data model changes needed?
- Are configuration changes needed?
- Are dependency updates needed?

**Decision:** ✅ **Relevant** or ❌ **Not Relevant**

#### 3.3 Impact Analysis Decision Matrix

**For each repository, create an analysis entry:**

```markdown
### Repository: {name}

**Analysis:**
- **Relevant to Task:** YES / NO
- **Confidence:** High / Medium / Low
- **Impact Level:** High / Medium / Low / None

**Reasoning:**
{Why this repository is or is not relevant to the task}

**Changes Required:** (if relevant)
- [ ] {specific change 1}
- [ ] {specific change 2}
- [ ] {specific change 3}

**Related Features Found:**
- {feature 1 found in repository}
- {feature 2 found in repository}
```

---

### Phase 4: Repository Relevance Decision

#### 4.1 Final Relevance Determination

**For EACH repository, make an explicit decision:**

**✅ INCLUDE in Implementation Plan IF:**
- Repository contains code related to the task feature
- Repository requires changes to implement the task
- Repository is a dependency that needs version updates
- Repository's APIs/UI will be affected

**❌ EXCLUDE from Implementation Plan IF:**
- Repository has no code related to the task
- Repository is unaffected by the task
- Repository's functionality is orthogonal to the task

#### 4.2 Implementation Scope Definition

**Create a summary of repositories requiring changes:**

```markdown
## Repositories Requiring Changes

### Primary Repository
**Repository:** {name}
**Impact:** HIGH
**Changes:** {summary of changes}

### Secondary Repositories

1. **{repository-name}** - {Impact Level}
   - {required changes}

2. **{repository-name}** - {Impact Level}
   - {required changes}

### Unaffected Repositories

- {repository-name} - {reason why not affected}
- {repository-name} - {reason why not affected}
```

---

### Phase 5: Implementation Planning

#### 5.1 Create Multi-Repository Implementation Plan

**For EACH relevant repository, define:**

1. **Specific Changes Required**
2. **Implementation Order**
3. **Dependencies Between Repositories**
4. **Testing Strategy for Each Repository**

#### 5.2 Implementation Order

**Define the order in which repositories should be modified:**

**Rules:**
1. **Shared libraries first** - if harborSharedModels changes, it must be deployed first
2. **Backend services next** - API changes before UI changes
3. **Frontend/mobile last** - depend on backend APIs

**Example:**
```
1. harborSharedModels (if data models change)
2. harborUserSvc (if API changes needed)
3. harborWebsite (if UI changes needed)
4. harborApp (if mobile app changes needed)
```

#### 5.3 Cross-Repository Dependencies

**Identify dependencies between repository changes:**

```markdown
## Cross-Repository Dependencies

**harborSharedModels → harborUserSvc**
- harborUserSvc depends on updated models
- Must deploy harborSharedModels first

**harborUserSvc → harborWebsite**
- harborWebsite depends on new API endpoints
- Must implement harborUserSvc changes first
```

---

## Output Format

### Complete Repository Impact Analysis Report

**After completing all phases, generate a report:**

```markdown
# Repository Impact Analysis Report

**Task:** {task title}
**Analysis Date:** {date}
**Total Repositories Analyzed:** {count}

---

## 1. Workspace Discovery Results

**Discovered Repositories:** {count}

1. **{name}** - {path} - {type}
2. **{name}** - {path} - {type}
...

---

## 2. Repository Analysis Summary

| Repository | Type | Framework | Purpose |
|------------|------|-----------|---------|
| {name} | {type} | {framework} | {purpose} |
...

---

## 3. Task Impact Analysis

### Task Summary
**Title:** {task title}
**Description:** {task description}
**Requirements:** {key requirements}

### Impact Evaluation

| Repository | Relevant | Impact Level | Reasoning |
|------------|----------|-------------|-----------|
| {name} | ✅/❌ | High/Med/Low/None | {reasoning} |
...

---

## 4. Repositories Requiring Changes

### Primary Repository
**{name}** - {impact level}
- {change 1}
- {change 2}

### Secondary Repositories
**{name}** - {impact level}
- {change 1}

---

## 5. Implementation Plan

### Implementation Order
1. {repository} - {reason}
2. {repository} - {reason}

### Cross-Repository Dependencies
- {dependency 1}
- {dependency 2}

---

## 6. Analysis Complete

**Ready to proceed to execution phase: YES/NO**

**If NO:** {reason why not ready}

---
```

---

### Phase 6: Decision Validation (MANDATORY) ✨ NEW

#### 6.1 Pre-Implementation Decision Validation

**🚨 CRITICAL: BEFORE proceeding to implementation, validate ALL decisions.**

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/feature-impact-analyzer.md` Steps 11-14

**The agent MUST explicitly answer these 6 validation questions:**

1. **Have I checked ALL repositories for potential impact?**
   - Explicit YES/NO answer required
   - Must list ALL repositories analyzed
   - Must provide evidence

2. **Is this feature required in more than one repository?**
   - Explicit YES/NO answer required
   - Must identify all affected repositories
   - Must provide reasoning

3. **Are there multiple platforms serving similar roles?**
   - Identify frontend platforms (harborWebsite, harborApp, etc.)
   - Identify if task affects multiple platforms in same category
   - Verify cross-platform consistency requirements

4. **Will changes in one repository require updates in dependent repositories?**
   - Check dependency graph
   - Identify all dependents
   - Determine if dependent repos need updates

5. **Are shared models/types/configurations being modified?**
   - Identify shared resources being modified
   - Verify ALL consumers are included in impact analysis
   - Check if version updates are required

6. **Does this feature exist in multiple repositories that require consistency?**
   - Check if feature exists in multiple repos
   - Determine if feature parity is required
   - Verify all repos with this feature are updated

#### 6.2 Cross-Platform Consistency Verification

**🚨 CRITICAL: If multiple repositories serve similar roles, verify consistency.**

**For EACH group of repositories serving similar roles:**

**Frontend Platforms:**
- harborWebsite (Web)
- harborApp (Mobile)
- Other frontend platforms

**Question:** Does this task affect ALL frontend platforms?

**Backend Services:**
- harborUserSvc (User management)
- harborJobSvc (Job management)
- harborNotificationSvc (Notifications)
- Other backend services

**Question:** Does this task affect multiple backend services with similar functionality?

**Decision Logic:**

```javascript
function verifyCrossPlatformConsistency(task, affectedRepositories) {
  // Group affected repositories by type
  const frontend = affectedRepositories.filter(r => r.type === 'Frontend');
  const backend = affectedRepositories.filter(r => r.type === 'Backend');
  const mobile = affectedRepositories.filter(r => r.type === 'Mobile');

  // Check if task affects multiple platforms in same category
  if (frontend.length > 1) {
    // Verify ALL frontend platforms are included
    const allFrontend = getAllFrontendRepositories();
    const missing = allFrontend.filter(f => !affectedRepositories.includes(f));

    if (missing.length > 0) {
      // WARNING: Some frontend platforms may be missing
      return {
        consistencyRequired: true,
        platforms: frontend,
        missing: missing,
        recommendation: 'Include ALL frontend platforms for consistency'
      };
    }
  }

  return { consistencyRequired: false };
}
```

#### 6.3 Decision Lock Format

**After completing validation, generate the Decision Lock:**

```markdown
## 🚨 FINAL DECISION LOCK

**Task:** {task title}

**Affected Repositories:** {count}

**Repository List:**
1. {repository-name} - {Impact Level} - {Reasoning}
2. {repository-name} - {Impact Level} - {Reasoning}
...

**Cross-Platform Consistency:** {REQUIRED/NOT REQUIRED}

**If Consistency Required:**
- Platform Group: {Frontend/Mobile/Backend}
- Repositories in Group: {list}
- Consistency Reasoning: {reasoning}

**Implementation Order:**
1. {repository} - {reason}
2. {repository} - {reason}
...

**Validation Confirmation:**
- [ ] All 6 validation questions answered
- [ ] All repositories explicitly listed
- [ ] Cross-platform consistency verified
- [ ] Implementation order determined
- [ ] NO repositories omitted without explicit reasoning
- [ ] NO assumptions made without evidence

**Decision Status:** LOCKED ✅

**Proceeding to implementation with {count} repositories.**
```

#### 6.4 Uncertainty Resolution

**IF the agent is uncertain about ANY repository impact:**

**Resolution Actions:**

1. **Search repository code** for task-related keywords
2. **Check API endpoints** for relevant endpoints
3. **Check UI components** for related screens/pages
4. **Verify dependencies** - does this repo depend on affected code?
5. **Check dependents** - do other repos depend on this repo?

**After additional analysis, re-run ALL validation questions.**

#### 6.5 Validation Checkpoint

**Before proceeding to execution phase, verify:**

- [ ] All 6 validation questions answered with explicit YES/NO
- [ ] All affected repositories listed with reasoning
- [ ] Cross-platform consistency verified (if applicable)
- [ ] Implementation order determined
- [ ] NO repositories omitted without explicit reasoning
- [ ] NO assumptions made without evidence
- [ ] Confidence level is HIGH or MEDIUM (not LOW)
- [ ] Decision lock generated and confirmed

**🚨 IF ANY checkpoint fails, DO NOT PROCEED. Re-run analysis.**

---

## Integration with Agent Workflow

### Triggering This Workflow

**This workflow is triggered AUTOMATICALLY:**

1. After Planning phase completes successfully
2. Before Execution phase begins

**The agent MUST:**

1. Read this workflow document
2. Execute all 5 phases
3. Generate the complete impact analysis report
4. Only THEN proceed to execution phase

### Forbidden Actions

**The agent MUST NOT:**

- ❌ Skip this workflow phase
- ❌ Proceed to execution without completing repository analysis
- ❌ Assume which repositories are relevant without analysis
- ❌ Modify only one repository without checking others
- ❌ Use hardcoded repository lists or mappings

### Mandatory Continuation

**After completing repository impact analysis:**

✅ **IMMEDIATELY continue to Execution Phase**
- Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`
- Execute implementation across ALL relevant repositories
- DO NOT stop or ask for permission
- DO NOT display "Analysis complete, ready to proceed"
- Continue AUTOMATICALLY to implementation

---

## Examples

### Example 1: Profile Page Redesign

**Task:** "Redesign the user profile page"

**Repository Impact Analysis:**

**harborWebsite** ✅ RELEVANT
- Impact: HIGH
- Reasoning: Contains web profile page UI
- Changes: Update profile page component, styles

**harborApp** ✅ RELEVANT
- Impact: HIGH
- Reasoning: Contains mobile profile screen
- Changes: Update mobile profile screen UI

**harborUserSvc** ❌ NOT RELEVANT (for UI redesign)
- Impact: NONE
- Reasoning: Backend API doesn't need changes for UI redesign
- Changes: None (API remains the same)

**Result:** Implement changes in BOTH harborWebsite AND harborApp

---

### Example 2: Add User Availability Feature

**Task:** "Add user availability status feature"

**Repository Impact Analysis:**

**harborSharedModels** ✅ RELEVANT
- Impact: HIGH
- Reasoning: User model needs availability field
- Changes: Add availability property to User model

**harborUserSvc** ✅ RELEVANT
- Impact: HIGH
- Reasoning: Manages user data, needs API endpoints
- Changes: Add availability CRUD endpoints

**harborWebsite** ✅ RELEVANT
- Impact: MEDIUM
- Reasoning: Web UI needs to display/update availability
- Changes: Add availability UI components

**harborApp** ✅ RELEVANT
- Impact: MEDIUM
- Reasoning: Mobile UI needs to display/update availability
- Changes: Add availability UI components

**harborSocketSvc** ✅ RELEVANT
- Impact: MEDIUM
- Reasoning: Real-time availability updates
- Changes: Broadcast availability changes

**Result:** Implement changes in ALL 5 repositories, in dependency order

---

## 🚨 MANDATORY: Continue to Execution Phase

**🚨 CRITICAL RULE - AUTONOMOUS WORKFLOW CONTINUATION:**

**After completing the Repository Impact Analysis phase, you MUST:**

✅ **IMMEDIATELY continue to Execution Phase**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`
   - **USE THE RESULTS from this Repository Impact Analysis**
   - **Extract the list of ALL affected repositories from the impact analysis report**
   - **Implement changes in EVERY repository identified as "Relevant"**
   - **DO NOT skip any repositories listed in the impact analysis**
   - **DO NOT assume only one repository needs changes**
   - **Create a checklist of ALL repositories and verify ALL are modified**
   - DO NOT stop or ask for permission
   - DO NOT display "Analysis complete"
   - DO NOT wait for user confirmation
   - This is an AUTONOMOUS workflow - continue automatically

❌ **PROHIBITED ACTIONS:**
- **DO NOT** stop after repository analysis
- **DO NOT** ask "Should I proceed with implementation?"
- **DO NOT** present the analysis and wait for approval
- **DO NOT** skip execution phase
- **🚨 DO NOT implement changes in only ONE repository when impact analysis identifies MULTIPLE**
- **🚨 DO NOT default to harborWebsite or any other single repository**
- **🚨 DO NOT ignore the repository list from impact analysis**

✅ **MANDATORY BEHAVIOR:**
1. Complete all 5 phases of repository impact analysis
2. Generate complete impact analysis report
3. **Extract the complete list of affected repositories from the report**
4. **Create a checklist of ALL repositories requiring changes**
5. Confirm "Ready to proceed to execution: YES"
6. **IMMEDIATELY** proceed to `execution.md` workflow
7. **Follow the multi-repository execution pattern in execution.md**
8. **Implement changes in ALL relevant repositories** (not just one!)
9. **Verify ALL repositories on the checklist have been modified**
10. **Only proceed to testing after ALL repositories are complete**
11. Complete the full lifecycle autonomously

**🚨 CRITICAL REMINDER:**
The execution.md workflow has been updated to require:
- Reading the Repository Impact Analysis report
- Creating a checklist of ALL affected repositories
- Implementing changes in EACH repository on the checklist
- Looping through repositories until ALL are complete
- Verification that ALL repositories have been modified before testing

**⚠️ You MUST follow this multi-repository execution pattern.**
**⚠️ Do NOT default to implementing in only one repository.**
**⚠️ Use the Repository Impact Analysis results to determine which repositories need changes.**

---

**End of Repository Impact Analysis Workflow**
