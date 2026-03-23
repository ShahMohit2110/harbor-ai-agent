# Harbor AI - Execution Protocol

**Document Version:** 1.0.0
**Last Updated:** 2025-03-18
**Owner:** Harbor AI Development Team

---

## 🧪 TESTING PHASE CONFIGURATION (2025-03-18)

**Current Mode:** **TESTING** 🧪

**Git Operations:** **DISABLED** ❌

During testing phase, this workflow:
- ✅ Performs all implementation work
- ✅ Verifies builds succeed
- ✅ Executes validation
- ✅ Continues to testing phase
- ❌ **NOT** create Git branches
- ❌ **NOT** commit changes
- ❌ **NOT** create Pull Requests
- ❌ **NOT** close tickets

**Workflow Behavior:**
After completing testing phase, the agent **STOPS** without Git operations.

**Purpose:**
- Test implementation logic safely
- Validate all changes work correctly
- Prevent unwanted commits during testing

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Prerequisites](#prerequisites)
3. [Execution Workflow](#execution-workflow)
4. [Critical Rules and Constraints](#critical-rules-and-constraints)
5. [Quality Gates](#quality-gates)
6. [Error Handling and Recovery](#error-handling-and-recovery)
7. [Common Pitfalls](#common-pitfalls)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Quick Reference Checklist](#quick-reference-checklist)

---

## Purpose and Scope

This document defines the **standard execution protocol** that Harbor-AI must follow when implementing a task after the planning phase has been completed and approved.

### ⚠️ CRITICAL RULE: Working Directory Management

**🚨 THE MOST CRITICAL RULE IN THIS DOCUMENT:**

**NEVER create or modify code files while in the `harbor-ai/` directory!**

The `harbor-ai/` directory is for documentation and configuration ONLY. It should NEVER contain:
- `.ts` files (TypeScript code)
- `package.json` files
- `tsconfig.json` files
- Any other code files

**✅ CORRECT WORKFLOW:**
1. Start in `harbor-ai/` directory (for reading documentation)
2. Identify target service (e.g., `harborJobSvc`, `harborUserSvc`)
3. **Navigate to the service directory BEFORE making any changes**
4. Create/modify files in the service directory

**❌ WRONG WORKFLOW:**
1. Stay in `harbor-ai/` directory
2. Create .ts files or package.json files here
3. This breaks the entire system structure!

**This rule is so critical that Step 4 of this workflow is dedicated entirely to navigating to the correct directory.**

### ⚠️ CRITICAL RULE: Autonomous Workflow Continuation

**🚨 SECOND MOST CRITICAL RULE - NEVER STOP AFTER IMPLEMENTATION:**

**The execution phase is NOT the final step. It is ONE STEP in the complete autonomous workflow.**

**🚨 ABSOLUTE PROHIBITIONS:**
After completing implementation, you MUST **NEVER**:
- Say "Development done" and stop
- Say "Implementation completed" and stop
- Say "Ready for testing" and stop
- Say "Ready for deployment" and stop
- Say "The feature is fully implemented" and stop
- Display ANY completion message and stop execution
- Wait for user input or confirmation
- Ask "Should I continue?" or present options

**✅ MANDATORY BEHAVIOR:**
1. Complete implementation
2. Verify build succeeds
3. **IMMEDIATELY** continue to `testing.md` workflow
4. Execute all testing phases

**🧪 TESTING MODE:**
5. After testing completes: **STOP**
6. DO NOT create PRs
7. DO NOT close tickets

**🚀 NORMAL MODE (when testing is disabled):**
5. Continue to PR creation
6. Complete ticket closure
7. **ONLY THEN** report final completion

**🚨 THIS IS NOT OPTIONAL - THIS IS AN AUTONOMOUS PIPELINE**

**Testing Mode Workflow:** **Planning → Execution → Testing → STOP**
**Normal Mode Workflow:** **Planning → Execution → Testing → PR → Ticket Closure**

You do NOT stop after Execution. In testing mode, you stop after Testing. In normal mode, you continue until the ENTIRE workflow is complete.

### Objectives

- Ensure consistent, safe, and predictable code changes across Harbor's microservices
- Maintain architectural integrity and service boundaries
- Enforce coding standards and best practices
- Minimize integration risks and breaking changes
- Provide clear documentation of all modifications

### When to Use This Protocol

**This protocol MUST be used for:**
- Implementing features approved in `planning.md`
- Fixing bugs that require code changes
- Modifying existing functionality
- Adding new API endpoints
- Database schema modifications
- Service-to-service communication changes

**This protocol does NOT apply to:**
- Pure research or exploration tasks
- Documentation-only changes
- Configuration updates that don't require code changes

---

## Prerequisites

### Mandatory Pre-Execution Reading

**⚠️ CRITICAL: The Repository Impact Analysis MUST be completed BEFORE this phase.**

**Before starting ANY implementation, Harbor-AI MUST read the following files in order:**

#### 0. 🚨 Repository Impact Analysis Report (MANDATORY)

**⚠️ This is NOT optional. The Repository Impact Analysis MUST be completed FIRST.**

```
agent-progress/{task-id}-repository-impact-analysis.md
```

**This report contains:**
- **ALL** repositories in the workspace that were analyzed
- **EACH** repository evaluated for task relevance
- **SPECIFIC** changes required for each affected repository
- **IMPLEMENTATION ORDER** for multi-repository changes
- **DECISION VALIDATION** with all 6 validation questions answered ✨ NEW
- **CROSS-PLATFORM CONSISTENCY VERIFICATION** ✨ NEW
- **DECISION LOCK** confirming all affected repositories ✨ NEW

**⚠️ IF THIS FILE DOES NOT EXIST:**
1. **STOP IMMEDIATELY**
2. **Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/repository-impact-analysis.md`**
3. **Execute the complete Repository Impact Analysis phase**
4. **Complete ALL 6 decision validation questions** ✨ NEW
5. **Verify cross-platform consistency** ✨ NEW
6. **Generate the impact analysis report with decision lock** ✨ NEW
7. **Only THEN return to this execution phase**

**🚨 CRITICAL: You CANNOT proceed to implementation without completing Repository Impact Analysis AND Decision Validation.**

#### 1. Planning Documentation
```
harbor-ai/planning.md
```
- Contains the approved implementation plan
- Defines scope, affected services, API changes, database changes
- Specifies testing requirements and acceptance criteria

#### 2. Repository Analysis (Dynamic)
```
agent-memory/repo-analysis/ (generated at runtime)
```
- Contains discovered repository information
- Identifies which repositories own specific features
- Prevents repository boundary violations
- Ensures changes are made in the correct repository
- Generated automatically when agent starts

#### 3. Global Coding Rules
```
harbor-ai/coding-rules.md
```
- Defines platform-wide coding standards
- Specifies AI agent workflows
- Establishes safety rules and constraints

#### 4. Service-Specific Coding Rules
For **EACH** affected service (from Repository Impact Analysis), read:
```
{service-directory}/coding-rules.md
```
Examples:
- `harborUserSvc/coding-rules.md`
- `harborJobSvc/coding-rules.md`
- `harborNotificationSvc/coding-rules.md`
- `harborWebsite/coding-rules.md` (if applicable)
- Other services as identified in Repository Impact Analysis

**🚨 IMPORTANT: Read service-specific rules for ALL affected repositories, not just one.**

**Verification Checkpoint:**
- [ ] **Repository Impact Analysis has been completed** (MANDATORY)
- [ ] **Repository Impact Analysis report exists and has been read** (MANDATORY)
- [ ] **All affected repositories identified in impact analysis** (MANDATORY)
- [ ] Planning document exists and is approved
- [ ] All affected services are identified
- [ ] Service-specific coding rules are available for **ALL** affected services
- [ ] Required dependencies are installed

**⚠️ If any mandatory checkpoint fails, DO NOT proceed. Complete the missing phase first.**

---

## 🚨 CRITICAL: Multi-Repository Execution (MANDATORY)

**⚠️ IMPORTANT: This phase REQUIRES the Repository Impact Analysis to be completed FIRST.**

### MANDATORY Pre-Execution Checkpoint

**Before ANY implementation begins, you MUST:**

1. **Read the Repository Impact Analysis Report**
   - File: `{harbor-ai}/agent-progress/{task-id}-repository-impact-analysis.md`
   - This file was created in the previous phase (Repository Impact Analysis)

2. **Extract the Complete Repository List**
   - Identify ALL repositories marked as "Relevant" in the impact analysis
   - Note the impact level (High/Medium/Low) for each repository
   - Note the specific changes required for each repository

3. **Verify Multi-Repository Scope**
   - If impact analysis lists 1 repository → Implement in 1 repository
   - If impact analysis lists 2 repositories → Implement in BOTH repositories
   - If impact analysis lists 3+ repositories → Implement in ALL repositories

**🚨 CRITICAL RULE: You MUST implement changes in EVERY repository identified in the impact analysis.**

**❌ FORBIDDEN:**
- Implementing changes in only ONE repository when impact analysis identifies MULTIPLE
- Skipping repositories marked as "Relevant"
- Assuming a repository doesn't need changes without checking the impact analysis

**✅ REQUIRED:**
- Read the complete impact analysis report
- Create a checklist of ALL repositories that need changes
- Implement changes in EACH repository on the checklist
- Verify ALL repositories have been modified before proceeding

### Multi-Repository Execution Pattern

**For EACH repository identified in the impact analysis, repeat Steps 4-7:**

```markdown
Repository Execution Loop:
┌─────────────────────────────────────┐
│ Repository 1: {name}                 │
│ - Step 4: Create branch              │
│ - Step 5: Navigate to repository     │
│ - Step 6: Implement changes          │
│ - Step 7: Validate & commit          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Repository 2: {name}                 │
│ - Step 4: Create branch              │
│ - Step 5: Navigate to repository     │
│ - Step 6: Implement changes          │
│ - Step 7: Validate & commit          │
└─────────────────────────────────────┘
              ↓
          Continue...
              ↓
┌─────────────────────────────────────┐
│ Repository N: {name}                 │
│ - Step 4: Create branch              │
│ - Step 5: Navigate to repository     │
│ - Step 6: Implement changes          │
│ - Step 7: Validate & commit          │
└─────────────────────────────────────┘
```

**🚨 ABSOLUTE RULE: Do NOT proceed to testing phase until ALL repositories have been modified.**

---

## Execution Workflow

### Step 1: Understand the Task

#### 1.1 Read the Planning Document
- **Action:** Read the complete `planning.md` file for the current task
- **Focus Areas:**
  - Task objective and success criteria
  - Affected services and impact levels
  - API changes (new endpoints, modifications)
  - Database changes (tables, migrations)
  - Event/queue changes
  - Testing requirements
  - Rollback plan

#### 1.2 Clarify Scope Boundaries
- **What to Implement:**
  - Features explicitly listed in planning document
  - Necessary supporting code for those features
  - Required error handling and validation

- **What NOT to Implement:**
  - Features not mentioned in planning document
  - "Nice-to-have" enhancements
  - Refactoring unrelated to the task
  - Performance optimizations not specified

#### 1.3 Identify Success Criteria
Extract explicit acceptance criteria from the planning document:
```markdown
Example Success Criteria:
- Users can successfully create a job posting
- Job notifications are sent to eligible seekers
- API returns 201 Created on success
- Validation errors return 400 Bad Request
```

**Output of Step 1:** Clear understanding of what needs to be built, where it should be built, and how success will be measured.

---

### Step 2: Identify Affected Services

#### 2.1 🚨 MANDATORY: Read Repository Impact Analysis

**⚠️ CRITICAL: This step REQUIRES the Repository Impact Analysis to be completed.**

**If the Repository Impact Analysis has NOT been completed:**
1. **STOP immediately**
2. **Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/repository-impact-analysis.md`**
3. **Execute ALL phases of the repository impact analysis**
4. **Generate the complete impact analysis report**
5. **Only THEN return to this step**

#### 2.2 Extract Repository List from Impact Analysis

**Read the Repository Impact Analysis Report:**
```bash
# Location of the impact analysis report
cat /Users/mohitshah/Documents/HarborService/harbor-ai/agent-progress/{task-id}-repository-impact-analysis.md
```

**Extract the following information:**
```markdown
## Affected Repositories (from impact analysis)

1. **harborUserSvc**
   - Impact: HIGH
   - Changes: Add availability endpoints, update user model

2. **harborWebsite**
   - Impact: MEDIUM
   - Changes: Add availability UI components

3. **harborSocketSvc**
   - Impact: MEDIUM
   - Changes: Broadcast availability changes

(Additional repositories as identified in the impact analysis)

## Decision Validation (from impact analysis) ✨ NEW

**Validation Questions:**
- [ ] Q1: Have I checked ALL repositories for potential impact? YES/NO
- [ ] Q2: Is this feature required in more than one repository? YES/NO
- [ ] Q3: Are there multiple platforms serving similar roles? YES/NO
- [ ] Q4: Will changes in one repository require updates in dependent repositories? YES/NO
- [ ] Q5: Are shared models/types/configurations being modified? YES/NO
- [ ] Q6: Does this feature exist in multiple repositories that require consistency? YES/NO

**Cross-Platform Consistency:** REQUIRED/NOT REQUIRED

**Decision Lock:** CONFIRMED ✅
```

#### 2.3 Create Repository Execution Checklist

**Create a checklist of ALL repositories that need changes:**

```markdown
## Repository Execution Checklist

Task: {task title}

Repositories requiring changes:
- [ ] harborUserSvc - HIGH impact
- [ ] harborWebsite - MEDIUM impact
- [ ] harborSocketSvc - MEDIUM impact
- [ ] (Other repositories from impact analysis)

Total repositories: {count}
```

**🚨 CRITICAL RULE: You MUST check off EACH repository as you complete it.**
**Do NOT proceed to testing until ALL repositories are checked.**

#### 2.4 Use Service Map
- **Action:** Reference `harbor-ai/agent-memory/repo-analysis/ (dynamic repository analysis)`
- **Process:**
  1. Map each feature in the planning document to its owning service
  2. **⚠️ CROSS-REFERENCE with Repository Impact Analysis results**
  3. **⚠️ VERIFY that all repositories from impact analysis are included**
  4. Document cross-service dependencies

**⚠️ VALIDATION CHECKPOINT:**
- [ ] Repository Impact Analysis has been completed
- [ ] Impact analysis report has been read
- [ ] All affected repositories have been identified
- [ ] Repository execution checklist has been created
- [ ] NO repositories have been skipped or omitted

**If any checkpoint fails, STOP and complete the Repository Impact Analysis phase first.**

#### 2.5 Service Impact Analysis
Create a service impact table (using data from Repository Impact Analysis):

| Service | Role | Impact Level | Changes Required | Status |
|---------|------|--------------|------------------|--------|
| harborJobSvc | Primary | High | Add job creation endpoint, validation logic | Pending |
| harborUserSvc | Secondary | Low | Update user profile schema reference | Pending |
| harborNotificationSvc | Secondary | Medium | Add job notification event handler | Pending |

**⚠️ IMPORTANT: The "Status" column tracks completion for EACH repository.**
**Update status to "Complete" only after changes are implemented in that repository.**

#### 2.6 Validate Service Boundaries
- **Check:** Does this change respect service ownership?
- **Verify:** Are we modifying the correct service for this feature?
- **Confirm:** No cross-boundary data access (e.g., Job Service directly accessing User database)

**Output of Step 2:** Clear list of services to modify, with specific changes for each service.

---

### Step 3: Follow Coding Standards

#### 3.1 Read Global Coding Rules
- **File:** `harbor-ai/coding-rules.md`
- **Key Sections to Review:**
  - Microservice Architecture Principles
  - Code Quality Standards
  - Modification Guidelines
  - AI Safety Rules
  - Common Pitfalls

#### 3.2 Read Service-Specific Rules
For each affected service, read its `coding-rules.md`:
- **Controller-Service-Repository Pattern:** How to organize code
- **API Response Format:** Standard response structure
- **Error Handling:** How to handle errors
- **Validation:** Input validation requirements
- **Database Access:** ORM patterns and queries

#### 3.3 Understand Existing Patterns
Before writing new code, analyze existing implementations:
```bash
# Example: Understanding how to add a new endpoint
1. Read existing controller to understand pattern
2. Read corresponding service layer
3. Check repository layer for data access
4. Verify validation approach
5. Follow same pattern for new endpoint
```

**Output of Step 3:** Understanding of all coding standards and patterns that must be followed.

---

### 🚨 Step 3.5: Multi-Repository Loop Planning

**⚠️ CRITICAL: This step ensures ALL repositories are modified.**

#### 3.5.1 Determine Implementation Order

**Based on the Repository Impact Analysis, determine the order for implementing changes:**

```markdown
## Repository Implementation Order

1. harborSharedModels (if applicable) - Must be FIRST (other repos depend on it)
2. Primary Backend Service (e.g., harborUserSvc) - Main implementation
3. Secondary Backend Services (e.g., harborNotificationSvc) - Supporting changes
4. Frontend Services (e.g., harborWebsite) - UI changes
5. Mobile Services (e.g., HarborApp) - Mobile UI

⚠️ CRITICAL: Implement in THIS ORDER to respect dependencies.
```

#### 3.5.2 Create Repository Loop Structure

**For EACH repository in the impact analysis, you will execute Steps 4-7:**

```markdown
## Repository Execution Loop

Repository 1 of {total}: {repository-name}
├── Step 4: Create feature branch in {repository-name}
├── Step 5: Navigate to {repository-name}
├── Step 6: Implement changes in {repository-name}
├── Step 7: Validate and commit in {repository-name}
└── Step 7.5: Mark {repository-name} as complete in checklist

⬇️ (If more repositories exist, loop back to Step 4 for next repository)

Repository 2 of {total}: {repository-name}
├── Step 4: Create feature branch in {repository-name}
├── Step 5: Navigate to {repository-name}
├── Step 6: Implement changes in {repository-name}
├── Step 7: Validate and commit in {repository-name}
└── Step 7.5: Mark {repository-name} as complete in checklist

⬇️ (Continue until ALL repositories are complete)

⚠️ Only proceed to Step 8 (Testing) when ALL repositories are marked complete.
```

#### 3.5.3 Validation Checkpoint Before Implementation

**Before proceeding to Step 4, verify:**

```markdown
## Pre-Implementation Checklist

Repository Impact Analysis:
- [ ] Repository Impact Analysis has been completed
- [ ] Impact analysis report has been read
- [ ] All affected repositories identified: {list repositories}
- [ ] Total repositories to modify: {count}

Repository Execution Checklist Created:
- [ ] Checklist includes ALL repositories from impact analysis
- [ ] Implementation order determined
- [ ] Dependencies identified

Ready to Proceed?
- [ ] YES - All repositories identified, ready to implement
- [ ] NO - Need to complete Repository Impact Analysis first

⚠️ If "NO", DO NOT proceed. Go back and complete Repository Impact Analysis.
```

**🚨 ABSOLUTE RULE: Do NOT proceed to Step 4 until this checklist is complete.**

---

### Step 4: Create Feature Branch (Repeat for EACH Repository)

**🚨 CRITICAL STEP - MUST BE COMPLETED BEFORE ANY CODE CHANGES**

#### 4.1 Why This Step is Critical

**This step prevents the common issue where code changes are made to the wrong branch.**

Without creating a new branch first, the AI may accidentally:
- Modify code on `main` or `dev` branches
- Mix unrelated changes together
- Make it difficult to track which changes belong to which task
- Create conflicts when submitting PRs

#### 4.2 Navigate to HarborService Root

**First, navigate to the HarborService root directory:**
```bash
# Navigate to HarborService root
cd /Users/mohitshah/Documents/HarborService

# Verify you're in the right location
pwd
# Expected: /Users/mohitshah/Documents/HarborService

# Check current branch
git branch
# Shows current branch (might be main, dev, or another)
```

#### 4.3 Switch to Base Branch (dev)

**Always create feature branches from the `dev` branch:**
```bash
# Switch to dev branch
git checkout dev

# Pull latest changes from dev
git pull origin dev

# Verify you're on dev branch
git branch
# Expected output: * dev
```

**If `dev` branch doesn't exist, create it:**
```bash
# Create dev branch from main
git checkout -b dev main

# ⚠️ TESTING MODE: Git push DISABLED
# # Push to remote
# git push -u origin dev
```

#### 4.4 Create Feature Branch

**Branch Naming Format:**
```
feature/<task-id>-<short-description>
```

**Examples:**
- `feature/HARBOR-123-add-job-filter`
- `feature/HARBOR-456-fix-auth-error`
- `feature/HARBOR-789-improve-performance`

**Create New Branch:**
```bash
# Format: feature/<task-id>-<description>
git checkout -b feature/HARBOR-123-add-job-filter

# Verify branch created
git branch
# Expected output: * feature/HARBOR-123-add-job-filter
```

**Branch Naming Rules:**
- [ ] Use task ID from Azure DevOps (e.g., HARBOR-123)
- [ ] Use lowercase for task ID
- [ ] Use hyphens to separate words in description
- [ ] Keep description short (max 50 characters)
- [ ] Use only alphanumeric characters and hyphens
- [ ] No spaces or special characters

#### 4.5 Verify Branch Status

**Check Working Directory is Clean:**
```bash
# Check working directory is clean
git status

# Expected output:
# On branch feature/HARBOR-123-add-job-filter
# nothing to commit, working tree clean
```

**If Working Directory Not Clean:**
```bash
# If there are uncommitted changes, stash them
git stash

# Or reset if they're unrelated
git reset --hard HEAD
```

#### 4.6 Verify Branch Creation

**Confirm you're on the correct branch:**
```bash
# Show current branch
git branch --show-current
# Expected: feature/HARBOR-123-add-job-filter

# Show branch tracking
git branch -vv
# Expected: * feature/HARBOR-123-add-job-filter <guid> [origin/feature/HARBOR-123-add-job-filter]
```

**Output of Step 4:** New feature branch created from `dev`, working directory clean, ready for code changes.

---

### Step 5: Navigate to Target Service Directory

**⚠️ CRITICAL STEP - MUST BE COMPLETED BEFORE ANY CODE CHANGES**

#### 5.1 Determine Primary Service Directory

- **Action:** Identify the primary service directory from Step 2
- **Example Directories:**
  - `../harborUserSvc` - User service
  - `../harborJobSvc` - Job service
  - `../harborNotificationSvc` - Notification service
  - `../harborSocketSvc` - Socket service
  - `../harborApiGateWay` - API Gateway
  - `../harborSharedModels` - Shared models

#### 5.2 Navigate to Primary Service Directory

**IMPORTANT:** You MUST navigate to the service directory BEFORE creating or modifying any files.

```bash
# Navigate to the target service directory from HarborService root
cd <service-name>
```

**Examples:**
```bash
# For job-related tasks:
cd /Users/mohitshah/Documents/HarborService/harborJobSvc

# For user-related tasks:
cd /Users/mohitshah/Documents/HarborService/harborUserSvc

# For notification-related tasks:
cd /Users/mohitshah/Documents/HarborService/harborNotificationSvc
```

#### 5.3 Verify Current Directory

**Always verify you're in the correct location:**
```bash
# Check current directory
pwd

# Expected output examples:
# /Users/mohitshah/Documents/HarborService/harborJobSvc
# /Users/mohitshah/Documents/HarborService/harborUserSvc
# /Users/mohitshah/Documents/HarborService/harborNotificationSvc

# Verify you're NOT in harbor-ai directory
pwd | grep -v "harbor-ai"
```

#### 5.4 Verify Service Structure

**Confirm you're in the right place:**
```bash
# You should see these files/directories:
ls -la

# Expected output:
# package.json  ✅
# tsconfig.json  ✅
# controllers/  ✅
# services/  ✅
# repository/  ✅
# routes/  ✅
# index.ts  ✅

# If you see these, you're in the WRONG place:
# agents/  ❌
# workflows/  ❌
# context/  ❌
# tools/  ❌
# (These indicate you're still in harbor-ai directory)
```

**🚨 CRITICAL WARNINGS:**

**❌ WRONG:** Creating files while in `harbor-ai/` directory
- This will generate .ts files and package.json in the documentation directory
- **NEVER create code files in the harbor-ai directory**

**✅ CORRECT:** Navigate to service directory first, then create files
- All .ts files must be created in service directories
- All package.json modifications must be done in service directories

**Output of Step 5:** Confirmed to be in the correct service directory with proper structure verified.

---

### Step 6: Implement the Changes

#### 6.1 File Creation and Modification

**For New Files:**
- Place files in correct directory structure
- Follow existing naming conventions
- Use appropriate file extensions (.ts, .js, .json)
- Include necessary imports and exports

**For Existing Files:**
- Read the file completely before editing
- Preserve existing code style and formatting
- Maintain existing imports (add new ones as needed)
- Don't remove code unless explicitly required

#### 6.2 Code Organization

**Controller Layer** (`controllers/`):
```typescript
// ✅ CORRECT: Follow controller pattern
export const jobController = {
  async createJob(req: Request, res: Response) {
    // Implementation
  }
};
```

**Service Layer** (`services/`):
```typescript
// ✅ CORRECT: Business logic in service
export const jobService = {
  async createJob(jobData: CreateJobDTO) {
    // Business logic
  }
};
```

**Repository Layer** (`repositories/` or `models/`):
```typescript
// ✅ CORRECT: Data access in repository
export const jobRepository = {
  async create(data: CreateJobDTO) {
    return await Job.create(data);
  }
};
```

#### 6.3 API Implementation

**Route Definition:**
```typescript
// routes/jobRoutes.ts
router.post(
  '/jobs',
  validateRequest(createJobSchema),
  authenticateToken,
  jobController.createJob
);
```

**Controller Implementation:**
```typescript
// controllers/jobController.ts
export const jobController = {
  async createJob(req: Request, res: Response) {
    try {
      const job = await jobService.createJob(req.body);
      return res.status(201).json({
        success: true,
        data: job,
        message: 'Job created successfully'
      });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
};
```

#### 6.4 Database Changes

**For New Tables/Models:**
```typescript
// models/Job.ts
import { DataTypes, Model } from 'sequelize';

export class Job extends Model {
  static init(sequelize) {
    return super.init.call(this, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // ... other fields
    }, {
      sequelize,
      modelName: 'Job',
      tableName: 'jobs'
    });
  }
}
```

**For Schema Modifications:**
- Check if migration is required
- Follow existing migration patterns
- Ensure backward compatibility if needed

#### 6.5 Event/Queue Implementation

**Publishing Events:**
```typescript
// services/jobService.ts
import { messageQueue } from '../config/queue';

export const jobService = {
  async createJob(jobData: CreateJobDTO) {
    const job = await jobRepository.create(jobData);

    // Publish event
    await messageQueue.publish('job.created', {
      jobId: job.id,
      employerId: job.employerId
    });

    return job;
  }
};
```

**Subscribing to Events:**
```typescript
// handlers/eventHandlers.ts
messageQueue.subscribe('job.created', async (event) => {
  await notificationService.sendJobNotifications(event);
});
```

#### 6.6 Validation Implementation

**Request Validation Schema:**
```typescript
// validators/jobValidators.ts
export const createJobSchema = {
  title: {
    in: ['body'],
    isString: true,
    isLength: { min: 5, max: 200 },
    errorMessage: 'Title must be between 5 and 200 characters'
  },
  description: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Description is required'
  }
  // ... other validations
};
```

**Validation Middleware:**
```typescript
// middleware/validation.ts
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  };
};
```

**Output of Step 6:** All code changes implemented according to specifications and standards.

---

### 🚨 Step 6.5: Module Registration Awareness (MANDATORY)

#### ⚠️ CRITICAL: MANDATORY Module Registration Detection

**This step is MANDATORY when creating ANY new module.**

**Never skip module registration detection. This prevents runtime errors caused by incomplete integration.**

#### 6.5.1 Purpose

**The Problem:**
- ❌ Agent creates a new module file (model, service, controller, etc.)
- ❌ Agent forgets to register the module in required locations
- ❌ Module is not accessible at runtime
- ❌ Application crashes or fails to recognize the new module

**The Solution:**
- ✅ Detect ALL registration points before creating module
- ✅ Complete ALL registration steps after creating module
- ✅ Verify module is fully integrated before proceeding

#### 6.5.2 When Is This Step Required?

**This step is MANDATORY when:**
- Creating a new model (ORM model, database schema)
- Creating a new service (business logic service)
- Creating a new controller (API controller)
- Creating a new entity (TypeORM entity, Sequelize model)
- Creating a new repository (data access layer)
- Creating a new route (API route)
- Creating ANY structural component that needs to be integrated

**This step is NOT required when:- Modifying existing module code (no registration needed)
- Updating configuration (unless new module is added)
- Changing existing logic (no new module)

#### 6.5.3 Module Registration Workflow

**🚨 MANDATORY: Read the full Module Registration Awareness document before creating ANY module.**```
Location: /Users/mohitshah/Documents/HarborService/harbor-ai/workflows/module-registration-awareness.md
```**Phase 1: Pre-Creation Analysis (MANDATORY)**

Before creating ANY module, complete this analysis:

**1. Identify Similar Existing Modules**
```bash
# Search for existing modules of the same type
# Example: If creating a new model, search for existing models
find . -name "*.model.ts" -o -name "*Model.ts"
# OR
find . -path "*/models/*" -name "*.ts"
```

**2. Analyze Integration Patterns**

For **EACH** similar existing module, identify:

- **Where is it imported?**
  ```bash
  grep -r "from.*ExistingModel" --include="*.ts" .
  ```

- **Where is it registered?**
  - Barrel exports (`index.ts` files)
  - Central configuration files
  - ORM/database registration files
  - Route registration files

- **What is the initialization pattern?**
  - Is there an `init()` function?
  - Is there a setup/registration file?
  - Is there a loader/registry pattern?

**3. Document Registration Requirements**

Create a checklist of ALL registration points:

```markdown
## Module Registration Checklist

Module Type: {model/service/controller/etc}

Registration Points Detected:
- [ ] models/index.ts (barrel export)
- [ ] database/index.ts (ORM registration)
- [ ] routes/index.ts (route registration)
- [ ] server.ts (app initialization)
- [ ] {other registration points}
```

**Phase 2: Module Creation**

After completing Phase 1 analysis:
1. Create the module file following detected patterns
2. Apply ALL registration steps from checklist

**❌ FORBIDDEN:**
- Creating the module file only
- Skipping registration steps
- Assuming "it should work automatically"

**✅ REQUIRED:**
- Complete ALL registration steps from the checklist
- Update ALL files that reference similar modules
- Add exports to ALL barrel files
- Register in ALL initialization files

**Phase 3: Verification (MANDATORY)**

Before proceeding, verify:

**1. Registration Completeness**
```bash
# Verify the registration file includes the new module
grep -n "NewModule" /path/to/registration/file.ts
```

**2. Syntax Check**
```bash
# Compile to check for errors
npm run build
# OR
tsc --noEmit
```

**3. Import Resolution**
- No "Cannot find module" errors
- No undefined references
- All exports are valid

**4. Runtime Integration**
- Module can be imported
- Module is initialized (if required)
- Module is accessible (API endpoint, ORM, etc.)

**5. Consistency Verification**
- File structure matches existing modules
- Export pattern matches existing modules
- Registration pattern matches existing modules
- Import pattern matches existing modules
- Initialization pattern matches existing modules

#### 6.5.4 Common Registration Patterns

**Pattern 1: Barrel Export**
```typescript
// models/index.ts
export { User } from './user.model';
export { Job } from './job.model';
// ✅ ADD NEW MODULE HERE
export { NewModule } from './new-module.model';
```

**Pattern 2: ORM Registration**
```typescript
// database/index.ts
import { User } from '../models/user.model';
import { Job } from '../models/job.model';
// ✅ ADD IMPORT HERE
import { NewModule } from '../models/new-module.model';

export const db = {
  User,
  Job,
  // ✅ REGISTER HERE
  NewModule,
  sequelize
};
```

**Pattern 3: Route Registration**
```typescript
// routes/index.ts
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
// ✅ ADD IMPORT HERE
import newModuleRoutes from './new-module.routes';

const router = Router();
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
// ✅ REGISTER ROUTE HERE
router.use('/new-modules', newModuleRoutes);
```

**Pattern 4: Service Registration**
```typescript
// services/container.ts
import { UserService } from './user.service';
import { JobService } from './job.service';
// ✅ ADD IMPORT HERE
import { NewModuleService } from './new-module.service';

container.bind<UserService>('UserService').to(UserService);
container.bind<JobService>('JobService').to(JobService);
// ✅ REGISTER SERVICE HERE
container.bind<NewModuleService>('NewModuleService').to(NewModuleService);
```

#### 6.5.5 Pre-Implementation Checklist

**Before creating ANY module, complete this checklist:**

```markdown
## Module Registration Pre-Implementation Checklist

Module to Create: {module name}
Module Type: {model/service/controller/etc}

### Phase 1: Analysis Complete
- [ ] Searched for existing similar modules
- [ ] Identified integration patterns
- [ ] Documented all registration points
- [ ] Created registration requirements checklist

### Phase 2: Pattern Detection
- [ ] Detected barrel export pattern: {YES/NO + location}
- [ ] Detected ORM registration pattern: {YES/NO + location}
- [ ] Detected route registration pattern: {YES/NO + location}
- [ ] Detected service registration pattern: {YES/NO + location}
- [ ] Detected configuration pattern: {YES/NO + location}
- [ ] Detected migration pattern: {YES/NO + location}
- [ ] Detected loader/registry pattern: {YES/NO + location}

### Ready to Proceed?
- [ ] YES - All registration points identified
- [ ] NO - Need more analysis

⚠️ If "NO", DO NOT proceed with module creation.
```

#### 6.5.6 Post-Implementation Checklist

**After creating the module, complete this checklist:**

```markdown
## Module Registration Post-Implementation Checklist

Module Created: {module name}

### Phase 1: Module File Created
- [ ] Module file created following detected patterns
- [ ] File structure matches existing modules
- [ ] Code follows existing conventions

### Phase 2: Registration Complete
- [ ] Barrel export updated (if required)
- [ ] ORM registration updated (if required)
- [ ] Route registration updated (if required)
- [ ] Service registration updated (if required)
- [ ] Configuration updated (if required)
- [ ] Migration created (if required)
- [ ] Loader/registry updated (if required)

### Phase 3: Verification
- [ ] All registration files updated
- [ ] Module can be imported without errors
- [ ] TypeScript compilation succeeds
- [ ] No "Cannot find module" errors
- [ ] Module follows exact same pattern as existing modules
- [ ] Module is initialized (if required)
- [ ] Module is accessible (API endpoint, ORM, etc.)

### Phase 4: Consistency Check
- [ ] Module structure matches existing modules
- [ ] Export pattern matches existing modules
- [ ] Registration pattern matches existing modules
- [ ] Import pattern matches existing modules
- [ ] Initialization pattern matches existing modules

### Ready to Proceed?
- [ ] YES - All checks passed, module fully integrated
- [ ] NO - Registration incomplete, fix before proceeding

⚠️ If "NO", fix registration issues before proceeding.
```

#### 6.5.7 Critical Rules

**Rule 1: Never Assume Auto-Registration**

❌ **FORBIDDEN ASSUMPTIONS:**
- "The framework will detect it automatically"
- "It should work without registration"
- "I'll add registration later"

✅ **REQUIRED BEHAVIOR:**
- **ALWAYS** detect registration patterns
- **ALWAYS** complete ALL registration steps
- **NEVER** assume auto-registration without evidence

**Rule 2: Never Skip Verification**

❌ **FORBIDDEN:**
- Creating module file only
- Assuming registration worked without testing
- Proceeding without compilation check

✅ **REQUIRED:**
- **ALWAYS** compile to verify
- **ALWAYS** test import
- **ALWAYS** verify runtime integration

**Rule 3: Never Hardcode File Names**

❌ **FORBIDDEN:**
```typescript
// ❌ WRONG: Hardcoded assumption
// "Add to models/index.ts" (file might not exist)
```

✅ **REQUIRED:**
```typescript
// ✅ CORRECT: Dynamic detection
// 1. Search for registration files
find . -name "index.ts" -path "*/models/*"

// 2. Analyze existing patterns
grep -r "export.*Model" models/index.ts

// 3. Follow detected pattern
```

**Rule 4: Follow Exact Patterns**

❌ **FORBIDDEN:**
- Creating a new registration pattern
- Using a different export style
- "Improving" the existing pattern

✅ **REQUIRED:**
- **EXACTLY** match existing patterns
- **EXACTLY** match export style
- **NEVER** deviate from detected pattern

#### 6.5.8 Output

**Output of Step 6.5:**
- All new modules fully registered and integrated
- All registration points updated
- Module verified as accessible
- Repository consistency maintained

**⚠️ CRITICAL: Do NOT proceed to Step 7 until Module Registration is complete.**

---

### Step 7: Pattern Consistency Verification

#### 🚨 MANDATORY: Pattern Consistency Verification

**⚠️ CRITICAL RULE: This step is MANDATORY before finalizing any changes.**

**Never skip pattern consistency verification. This prevents incomplete implementations.**

#### 7.1 Purpose

The agent must verify that changes are **consistent with the repository's existing patterns** before finalizing.

**Example of the Problem:**
- ❌ Adding a translation key to `en.json` but forgetting `fr.json` and `es.json`
- ❌ This breaks the translation system's consistency
- ❌ Repository becomes inconsistent

**Solution:**
- ✅ Detect ALL instances of the pattern
- ✅ Update ALL relevant files
- ✅ Maintain repository consistency

#### 7.2 Pattern Categories to Verify

**Common patterns that must be checked:**

1. **Multi-Language Translation Systems**
   - Multiple language files: `en.json`, `fr.json`, `es.json`, etc.
   - Translation directories: `locales/`, `i18n/`, `translations/`, `lang/`
   - ✅ When adding a translation key, add it to ALL language files

2. **Configuration Structures**
   - Multiple environment configs: `.env.development`, `.env.production`, `.env.test`
   - Config files: `config/` directory, multiple config variants
   - ✅ When adding config, add to ALL config files/environments

3. **Environment Variable Usage**
   - `.env` files, `process.env` usage
   - ✅ When adding environment variable, add to ALL relevant `.env` files
   - ✅ Document in `.env.example` or similar

4. **Shared Utilities**
   - `utils/`, `helpers/`, `lib/` directories
   - ✅ Check if existing utility can be used instead of creating new code

5. **API Conventions**
   - Consistent API response structures
   - Standard error handling patterns
   - ✅ Follow existing API response format
   - ✅ Use existing error handling patterns

6. **Folder Organization**
   - Consistent folder structures across features
   - ✅ Place new files in locations consistent with existing patterns

7. **Reusable Components**
   - `components/` directories, shared UI components
   - ✅ Check if existing component can be used

8. **Naming Conventions**
   - File naming, variable naming, API endpoint naming
   - ✅ Follow existing naming conventions

#### 7.3 Pattern Detection Workflow

**Step 1: Identify the Change Type**
- What type of change am I making? (translation, config, API, UI, etc.)

**Step 2: Search for Similar Patterns**
```bash
# Find all language files
find . -name "*.json" -path "*/locales/*" -o -name "*.json" -path "*/i18n/*"

# Find all config files
find . -name "config.*" -o -name "*.config.*" -o -name ".env.*"

# Using Grep tool to search for patterns
```

**Step 3: Analyze the Pattern Structure**
- How many files use this pattern?
- What is the structure/organization?
- What are the naming conventions?

**Step 4: Apply Changes Consistently**
- Update ALL instances of the pattern
- Verify consistency across all files
- No files were missed or skipped

#### 7.4 Verification Questions

**Before finalizing ANY change, the agent MUST ask itself:**

- [ ] Did I detect ALL instances of this pattern in the repository?
- [ ] Did I update ALL relevant files?
- [ ] Are my changes consistent with existing patterns?
- [ ] Did I follow naming conventions?
- [ ] Could this change require updates in other related files?
- [ ] Does the repository remain consistent after my changes?

#### 7.5 Examples

**❌ WRONG (Inconsistent):**
```json
// Only updates en.json
{
  "newKey": "New value"
}
```
**Problem:** fr.json, es.json, de.json don't have the key

**✅ CORRECT (Consistent):**
```json
// Updates ALL language files
// en.json: { "newKey": "New value" }
// fr.json: { "newKey": "Nouvelle valeur" }
// es.json: { "newKey": "Nuevo valor" }
// de.json: { "newKey": "Neuer Wert" }
```

#### 7.6 Mandatory Verification Step

**Before proceeding to validation, the agent MUST:**

1. Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/pattern-consistency-verification.md`
2. Detect patterns for the type of change made
3. Search for all instances of the pattern
4. Verify consistency across all instances
5. Fix any inconsistencies found
6. Only then proceed to validation phase

**🚨 CRITICAL: Pattern Consistency Verification is MANDATORY**
**DO NOT skip this step. DO NOT proceed to validation without completing this step.**

#### 7.7 Agent Behavior Rules

**✅ REQUIRED:**
- Always detect patterns before making changes
- Always update all instances of a pattern
- Always follow existing conventions
- Always verify consistency before finalizing

**❌ PROHIBITED:**
- NEVER assume single-file implementation
- NEVER skip pattern detection
- NEVER apply changes inconsistently
- NEVER proceed without verification

**Output of Step 7:** All pattern consistency verified. Repository is consistent. All relevant files updated.

---

### Step 8: Validate Code Quality

#### 5.1 Code Placement Validation

**✅ CORRECT - Inside Exports:**
```typescript
export const jobController = {
  async createJob(req: Request, res: Response) {
    // Method is inside export
  }
};
```

**❌ INCORRECT - Outside Exports:**
```typescript
// Function defined outside export
async function createJob(req: Request, res: Response) {
  // Implementation
}

export const jobController = {
  createJob // Reference
};
```

#### 5.2 Unused Code Prevention

**Check for:**
- Unused imports
- Unused variables
- Commented-out code
- Dead code branches

**Example - Remove Unused Code:**
```typescript
// ❌ INCORRECT: Unused import
import { validateJob, validateUser, unusedFunction } from './validators';

// ✅ CORRECT: Only import what's used
import { validateJob, validateUser } from './validators';
```

#### 5.3 Import Management

**Import Order:**
```typescript
// 1. Node.js built-ins
import { Request, Response, NextFunction } from 'express';

// 2. External packages
import { DataTypes, Model } from 'sequelize';

// 3. Internal modules
import { Job } from '../models/Job';
import { validateRequest } from '../middleware/validation';
```

**Import Validation:**
- All imported modules must be available
- No circular dependencies
- Use relative paths correctly (`../`, `./`)

#### 5.4 Dependency Verification

**Check Dependencies:**
```json
// package.json
{
  "dependencies": {
    "express": "^4.18.0",
    "sequelize": "^6.0.0",
    // ... ensure all used packages are listed
  }
}
```

**If new dependencies are needed:**
- Add to package.json
- Run `npm install` or `yarn install`
- Document in planning document

#### 🚨 CRITICAL: harbor-shared-models Dependency Updates

**When working with harbor-shared-models dependency:**

**❌ NEVER use file path references:**
```json
"harbor-shared-models": "file:../harborSharedModels"  // WRONG!
```

**✅ ALWAYS use the exact version number from harborSharedModels/package.json:**
```json
"harbor-shared-models": "1.2.5"  // CORRECT
```

**Required Process:**
1. Read the current version from `harborSharedModels/package.json`
2. Update the dependency in your service's `package.json` to use that exact version
3. Run `npm install` to update node_modules

**Why this matters:**
- Version tracking and reproducible builds
- Production deployments require published versions
- Proper dependency resolution in npm

**Affected Services:**
- harborUserSvc
- harborJobSvc
- harborNotificationSvc
- harborSocketSvc
- harborGateway

**Reference:** See `workflows/harbor-shared-models-workflow.md` for complete details.

**Output of Step 5:** Code that follows placement rules, has no unused code, proper imports, and verified dependencies.

---

### Step 6: Error Checking

#### 6.1 Syntax Validation

**Common Syntax Errors to Check:**
- Missing brackets `{ }`
- Missing semicolons (if required)
- Incorrect string quotes (mix of `'` and `"`)
- Missing commas in objects/arrays
- Incorrect async/await usage

**Example Syntax Check:**
```typescript
// ❌ INCORRECT: Missing bracket
async function createJob(jobData: CreateJobDTO) {
  try {
    const job = await jobRepository.create(jobData);
    return job;
  catch (error) {  // Missing closing brace for try
    throw error;
  }
}

// ✅ CORRECT: Proper syntax
async function createJob(jobData: CreateJobDTO) {
  try {
    const job = await jobRepository.create(jobData);
    return job;
  } catch (error) {
    throw error;
  }
}
```

#### 6.2 TypeScript Compilation

**Run TypeScript Compiler:**
```bash
# Compile TypeScript
npx tsc --noEmit

# Or use the build script
npm run build

# Or use the development watch mode
npm run dev
```

**Fix Compilation Errors:**
- Type mismatches
- Missing type definitions
- Incorrect type annotations
- Implicit any types

**Example - Type Error Fix:**
```typescript
// ❌ INCORRECT: Implicit any
async function createJob(jobData) {
  // Implementation
}

// ✅ CORRECT: Explicit type
async function createJob(jobData: CreateJobDTO) {
  // Implementation
}
```

#### 6.3 Build Verification

**Build the Service:**
```bash
# Navigate to service directory
cd harborJobSvc

# Install dependencies (if needed)
npm install

# Build the project
npm run build

# Verify no build errors
```

**Expected Output:**
```
✓ Build completed successfully
✓ No TypeScript errors
✓ All files compiled
```

**If Build Fails:**
1. Read error messages carefully
2. Fix identified issues
3. Rebuild until successful
4. Do not proceed with failing build

**Output of Step 6:** Code with no syntax errors, successful TypeScript compilation, and successful service build.

---

**🚨 CRITICAL REMINDER: DO NOT STOP AFTER BUILD VERIFICATION**

**If the build succeeds, you MUST:**
- **NOT** say "Build successful, implementation complete"
- **NOT** stop or wait for user input
- **NOT** display completion messages
- **IMMEDIATELY** continue to Step 7 and complete all remaining steps
- **THEN** proceed to `testing.md` workflow automatically

**The build success is just ONE validation step, NOT the end of the workflow.**

---

### Step 7: Integration Safety

#### 7.1 API Contract Validation

**Verify API Contracts:**
- Request/response format matches documentation
- Status codes are appropriate (200, 201, 400, 401, 404, 500)
- Error response structure is consistent
- Headers are set correctly

**Standard Response Format:**
```typescript
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [ /* specific errors */ ]
  }
}
```

#### 7.2 Backward Compatibility

**For Breaking Changes:**
- Update API version
- Document deprecation timeline
- Provide migration guide
- Coordinate with consuming services

**For Non-Breaking Changes:**
- Add new optional fields
- Maintain existing endpoint behavior
- Don't remove or modify required fields
- Keep response structure compatible

#### 7.3 Service Communication Safety

**REST API Calls:**
```typescript
// ✅ CORRECT: Proper error handling for service calls
async function getUserFromUserService(userId: string) {
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/users/${userId}`
    );
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user');
  }
}
```

**Event Publishing:**
```typescript
// ✅ CORRECT: Safe event publishing with error handling
async function publishJobCreatedEvent(job: Job) {
  try {
    await messageQueue.publish('job.created', {
      jobId: job.id,
      employerId: job.employerId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Log error but don't fail the operation
    logger.error('Failed to publish job.created event', { error, jobId: job.id });
  }
}
```

#### 7.4 Database Transaction Safety

**For Multi-Step Operations:**
```typescript
// ✅ CORRECT: Use transactions for data consistency
async function createJobWithSkills(jobData: CreateJobDTO, skills: string[]) {
  const transaction = await sequelize.transaction();

  try {
    const job = await Job.create(jobData, { transaction });

    await JobSkill.bulkCreate(
      skills.map(skill => ({ jobId: job.id, skill })),
      { transaction }
    );

    await transaction.commit();
    return job;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

**Output of Step 7:** Changes that maintain API contracts, preserve backward compatibility, and ensure safe service communication.

---

### 🚨 Step 7.5: Repository Loop Check (CRITICAL)

**⚠️ CRITICAL: This step ensures ALL repositories are modified before proceeding.**

#### 7.5.1 Check Repository Execution Status

**Review your Repository Execution Checklist:**

```markdown
## Repository Execution Checklist Status

Task: {task title}

Repositories requiring changes:
- [✅] harborUserSvc - HIGH impact - **COMPLETED**
- [ ] harborWebsite - MEDIUM impact - **PENDING**
- [ ] harborSocketSvc - MEDIUM impact - **PENDING**

Completed: 1 of {total} repositories
Remaining: {count} repositories
```

#### 7.5.2 Loop Decision

**IF there are more repositories to implement:**

✅ **Loop back to Step 4 for the next repository**
1. Return to Step 4: Create Feature Branch
2. Create branch in the next repository
3. Navigate to that repository
4. Implement changes for that repository
5. Validate and commit changes
6. Return to Step 7.5 to check status again

**IF ALL repositories are complete:**

✅ **Proceed to Step 8: Testing**
1. Verify all repositories on the checklist are marked complete
2. Verify all repositories have committed changes
3. Proceed to testing phase

#### 7.5.3 Final Verification Before Testing

**Before proceeding to Step 8, verify:**

```markdown
## Final Pre-Testing Verification

Repository Impact Analysis Compliance:
- [ ] ALL repositories from impact analysis have been modified
- [ ] NO repositories were skipped
- [ ] NO repositories were omitted
- [ ] Changes implemented in the correct dependency order

Repository Execution Checklist:
- [ ] Total repositories to modify: {count}
- [ ] Total repositories completed: {count}
- [ ] ALL checkboxes marked: ✅

Branch Status:
- [ ] Feature branches created in ALL repositories
- [ ] Changes committed in ALL repositories
- [ ] No uncommitted changes remaining

⚠️ ONLY proceed to Step 8 if ALL items are checked.
```

**🚨 ABSOLUTE RULE: Do NOT proceed to Step 8 (Testing) until ALL repositories are complete.**

**❌ FORBIDDEN:**
- Proceeding to testing with incomplete repository changes
- Assuming a repository "doesn't need changes" without checking impact analysis
- Skipping repositories marked as "Relevant" in impact analysis

**✅ REQUIRED:**
- Complete implementation in ALL repositories from impact analysis
- Verify ALL repositories have committed changes
- Update checklist for ALL repositories before proceeding

---

### Step 8: Testing (Only After ALL Repositories Complete)

#### 8.1 Run Existing Tests

**If Tests Exist:**
```bash
# Run all tests
npm test

# Run specific test file
npm test -- --testPathPattern=job

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Verify Test Results:**
- All existing tests still pass
- No tests are broken by changes
- Test coverage remains adequate

#### 8.2 Create New Tests (If Required)

**Unit Tests for New Functions:**
```typescript
// tests/services/jobService.test.ts
describe('jobService.createJob', () => {
  it('should create a job successfully', async () => {
    const jobData = {
      title: 'Software Engineer',
      description: 'Build great software',
      employerId: '123e4567-e89b-12d3-a456-426614174000'
    };

    const result = await jobService.createJob(jobData);

    expect(result).toHaveProperty('id');
    expect(result.title).toBe(jobData.title);
  });

  it('should throw error for invalid job data', async () => {
    const invalidData = { title: '' };

    await expect(
      jobService.createJob(invalidData)
    ).rejects.toThrow('Validation failed');
  });
});
```

**Integration Tests for API Endpoints:**
```typescript
// tests/api/jobApi.test.ts
describe('POST /jobs', () => {
  it('should create a job and return 201', async () => {
    const response = await request(app)
      .post('/jobs')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Software Engineer',
        description: 'Build great software'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
  });

  it('should return 400 for invalid data', async () => {
    const response = await request(app)
      .post('/jobs')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: '' }); // Invalid

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
```

#### 8.3 Manual Testing

**Start the Service:**
```bash
# Navigate to service directory
cd harborJobSvc

# Start development server
npm run dev

# Or start production build
npm run start
```

**Test API Endpoints:**
```bash
# Test with curl
curl -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Software Engineer",
    "description": "Build great software"
  }'

# Test with Postman or similar tool
# Import API collection and test endpoints
```

**Verify:**
- Endpoint responds correctly
- Data is saved to database
- Events are published (if applicable)
- Notifications are sent (if applicable)

#### 8.4 Runtime Error Verification

**Check for Runtime Errors:**
- Service starts without crashes
- No unhandled promise rejections
- No memory leaks
- Proper error logging

**Monitor Service Logs:**
```bash
# View logs
npm run dev

# Or use a log monitoring tool
tail -f logs/combined.log
```

**Output of Step 8:** Tests pass, manual testing successful, no runtime errors detected.

---

### Step 9: Final Validation

#### 9.1 Build Success Confirmation

**Rebuild the Service:**
```bash
# Clean build
rm -rf dist/
npm run build

# Verify build completed
echo $?
# Should output: 0

# Check dist directory exists
ls -la dist/
```

**Verify Build Artifacts:**
- All TypeScript files compiled to JavaScript
- Source maps generated (if needed)
- No build warnings or errors
- Correct file structure in dist/

#### 9.2 Lint Verification

**Run Linter:**
```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint -- --fix

# Run Prettier (if configured)
npm run format:check
npm run format:fix
```

**Expected Output:**
```
✓ No linting errors
✓ Code formatting consistent
✓ No style violations
```

#### 9.3 Type Checking

**Final Type Check:**
```bash
# Run TypeScript compiler in check mode
npx tsc --noEmit

# Should complete with no errors
```

#### 9.4 Service Startup Verification

**Start Service and Verify:**
```bash
# Start the service
npm run start

# Service should start successfully
# Check logs for:
✓ Server listening on port 3001
✓ Database connected
✓ Message queue connected
✓ Service ready
```

**Test Service Health:**
```bash
# Test health endpoint
curl http://localhost:3001/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-03-06T10:00:00.000Z"
}
```

#### 9.5 Cross-Service Integration Test

**If Multiple Services Were Modified:**
```bash
# Start all affected services
cd harborUserSvc && npm run start &
cd harborJobSvc && npm run start &
cd harborNotificationSvc && npm run start &

# Test cross-service workflow
# Example: Create a job → Verify notification sent
```

**Output of Step 9:** Service builds successfully, no lint errors, starts without errors, health check passes.

---

### Step 10: Summary of Changes

#### 10.1 Files Created

List all new files created:

```markdown
## Files Created

### Controller Layer
- `harborJobSvc/controllers/jobController.ts` (NEW)
  - Added createJob, updateJob, deleteJob methods
  - Implements validation and error handling

### Service Layer
- `harborJobSvc/services/jobService.ts` (NEW)
  - Business logic for job operations
  - Event publishing for job.created

### Repository Layer
- `harborJobSvc/repositories/jobRepository.ts` (NEW)
  - Database access methods
  - Query optimization

### Routes
- `harborJobSvc/routes/jobRoutes.ts` (NEW)
  - POST /jobs - Create new job
  - GET /jobs/:id - Get job by ID
  - PUT /jobs/:id - Update job
  - DELETE /jobs/:id - Delete job

### Validators
- `harborJobSvc/validators/jobValidators.ts` (NEW)
  - Request validation schemas
  - Custom validation rules

### Tests
- `harborJobSvc/tests/services/jobService.test.ts` (NEW)
  - Unit tests for job service
- `harborJobSvc/tests/api/jobApi.test.ts` (NEW)
  - Integration tests for job API
```

#### 10.2 Files Modified

List all modified files with changes:

```markdown
## Files Modified

### harborJobSvc
- `harborJobSvc/models/Job.ts` (MODIFIED)
  - Added status field
  - Added createdAt and updatedAt timestamps
  - Added validation rules

- `harborJobSvc/app.ts` (MODIFIED)
  - Registered new job routes
  - Added error handling middleware
  - Added request logging middleware

- `harborJobSvc/package.json` (MODIFIED)
  - Added joi package for validation
  - Added bull package for queue management

### harborUserSvc
- `harborUserSvc/services/userService.ts` (MODIFIED)
  - Added getUserProfile method
  - Updated to support job profile references

### harborNotificationSvc
- `harborNotificationSvc/handlers/eventHandlers.ts` (MODIFIED)
  - Added job.created event handler
  - Implemented notification logic
```

#### 10.3 APIs Added or Updated

Document all API changes:

```markdown
## API Changes

### New Endpoints

#### POST /jobs
**Description:** Create a new job posting
**Authentication:** Required (Bearer token)
**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Build great software",
  "location": "Remote",
  "salary": {
    "min": 80000,
    "max": 120000,
    "currency": "USD"
  },
  "skills": ["JavaScript", "TypeScript", "Node.js"]
}
```
**Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Software Engineer",
    "status": "active",
    "createdAt": "2025-03-06T10:00:00.000Z"
  },
  "message": "Job created successfully"
}
```

#### GET /jobs/:id
**Description:** Get job by ID
**Authentication:** Not required
**Response:** 200 OK

### Modified Endpoints

#### GET /users/:userId/profile
**Changes:**
- Added `postedJobs` array in response
- Added `totalJobs` count
- Includes job status information

### Deprecated Endpoints

*None in this implementation*
```

#### 10.4 Database Changes

Document database modifications:

```markdown
## Database Changes

### New Tables

#### jobs
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Modified Tables

#### users
- Added column: `employer_profile_id` (UUID, nullable)
- Added index: `idx_employer_profile_id`

### New Migrations
- Migration file: `20250306_create_jobs_table.js`
- Migration file: `20250306_add_employer_profile_to_users.js`
```

#### 10.5 Event Changes

Document event-related changes:

```markdown
## Event/Queue Changes

### New Events Published

#### job.created
**Payload:**
```json
{
  "eventId": "evt_123",
  "eventType": "job.created",
  "timestamp": "2025-03-06T10:00:00.000Z",
  "data": {
    "jobId": "123e4567-e89b-12d3-a456-426614174000",
    "employerId": "123e4567-e89b-12d3-a456-426614174001",
    "title": "Software Engineer"
  }
}
```

### New Event Subscriptions

#### harborNotificationSvc subscribes to:
- `job.created` - Sends notifications to eligible job seekers
- `job.updated` - Updates notification preferences

### Queue Changes
- Added queue: `job-notifications`
- Added processor: 3 concurrent workers
```

#### 10.6 Configuration Changes

Document configuration updates:

```markdown
## Configuration Changes

### Environment Variables Added
```
JOB_SERVICE_PORT=3001
JOB_SERVICE_DB_URL=postgresql://...
JOB_SERVICE_REDIS_URL=redis://...
```

### New Configuration Files
- `harborJobSvc/config/queue.config.js` - Message queue configuration
- `harborJobSvc/config/logger.config.js` - Logger configuration

### Modified Configuration Files
- `harborJobSvc/.env.example` - Added new environment variables
```

#### 10.7 Testing Summary

Document testing performed:

```markdown
## Testing Summary

### Unit Tests
- Job Service: ✓ 15/15 tests passed
- Job Repository: ✓ 10/10 tests passed
- Validators: ✓ 8/8 tests passed
- **Total:** 33/33 tests passed (100%)

### Integration Tests
- POST /jobs: ✓ Passed
- GET /jobs/:id: ✓ Passed
- PUT /jobs/:id: ✓ Passed
- DELETE /jobs/:id: ✓ Passed
- **Total:** 12/12 tests passed (100%)

### Manual Testing
- Created job via API: ✓ Success
- Verified database record: ✓ Success
- Verified event published: ✓ Success
- Verified notification sent: ✓ Success

### Performance Tests
- Load test: 100 requests/second
- Average response time: 45ms
- P95 response time: 120ms
- **Status:** Within acceptable limits
```

---

**🚨 FINAL CRITICAL REMINDER: YOU ARE NOT DONE**

**After completing Step 10, you MUST:**
- **NOT** say "Implementation complete" or "Summary done"
- **NOT** display the summary and stop
- **NOT** wait for user input
- **IMMEDIATELY** continue to the quality gates validation
- **THEN** proceed to `testing.md` workflow automatically

**The execution phase is NOT complete until you have:**
1. ✅ Completed all 10 steps
2. ✅ Passed all quality gates
3. ✅ **Proceeded to testing.md workflow**
4. ✅ Completed all testing phases
5. ✅ Created PR
6. ✅ Updated ticket

**You are currently at step 3 of 6. DO NOT STOP.**

---

## Critical Rules and Constraints

### Mandatory Rules

#### 1. Single Service Rule
**✅ ALLOWED:**
- Modify only the primary service identified in planning
- Add simple event handlers in secondary services

**❌ PROHIBITED:**
- Modify multiple unrelated services
- Make changes across services without planning approval

#### 2. Architecture Boundary Rule
**✅ ALLOWED:**
- Modify code within service boundaries
- Use public APIs for cross-service communication
- Publish events for other services to consume

**❌ PROHIBITED:**
- Direct database access across service boundaries
- Import internal modules from other services
- Bypass API gateway for service-to-service calls

#### 3. Minimal Change Rule
**✅ ALLOWED:**
- Add code necessary for the planned feature
- Fix bugs discovered during implementation
- Improve error handling for new code

**❌ PROHIBITED:**
- Refactor unrelated code
- Add "bonus" features not in planning
- Optimize code not related to the task

#### 4. Build Success Rule
**✅ REQUIRED:**
- Service must build successfully
- No TypeScript compilation errors
- No linting errors
- All tests must pass

**❌ UNACCEPTABLE:**
- Proceeding with build failures
- Committing code with compilation errors
- Skipping tests to save time

### Safety Constraints

#### 1. No Breaking Changes Without Approval
- All breaking changes must be documented in planning.md
- Must have approval from technical lead
- Must include migration guide

#### 2. No Data Loss
- Database migrations must preserve data
- Use transactions for multi-step operations
- Test rollback procedures

#### 3. No Security Vulnerabilities
- Validate all input data
- Sanitize all output data
- Use parameterized queries
- Follow OWASP guidelines

#### 4. No Performance Degradation
- Monitor query performance
- Add database indexes if needed
- Avoid N+1 query problems
- Test with realistic data volumes

---

## Quality Gates

### Gate 1: Pre-Execution Validation
**Criteria:**
- [ ] Planning document exists and is approved
- [ ] All affected services are identified
- [ ] Service-specific coding rules are available
- [ ] Required dependencies are documented

**Status:** Must pass before starting implementation

---

### Gate 2: Code Quality Validation
**Criteria:**
- [ ] All functions inside exports
- [ ] No unused imports or variables
- [ ] Proper import organization
- [ ] Dependencies are verified

**Status:** Must pass before compilation

---

### Gate 3: Build Validation
**Criteria:**
- [ ] No syntax errors
- [ ] TypeScript compilation successful
- [ ] No build warnings
- [ ] All files compiled correctly

**Status:** Must pass before testing

---

### Gate 4: Integration Safety Validation
**Criteria:**
- [ ] API contracts maintained
- [ ] Backward compatibility preserved
- [ ] Service communication safe
- [ ] Database transactions used appropriately

**Status:** Must pass before testing

---

### Gate 5: Testing Validation
**Criteria:**
- [ ] All existing tests pass
- [ ] New tests created (if required)
- [ ] Manual testing successful
- [ ] No runtime errors

**Status:** Must pass before final validation

---

### Gate 6: Final Validation
**Criteria:**
- [ ] Service builds successfully
- [ ] No lint errors
- [ ] Service starts without errors
- [ ] Health check passes

**Status:** Must pass before marking task complete

---

## Error Handling and Recovery

### Compilation Errors

#### TypeScript Compilation Errors
**Symptoms:**
```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
```

**Recovery Steps:**
1. Read the error message carefully
2. Identify the file and line number
3. Fix the type mismatch
4. Re-run compilation: `npx tsc --noEmit`
5. Repeat until all errors are resolved

#### Build Errors
**Symptoms:**
```
Build failed with 15 errors
```

**Recovery Steps:**
1. Check for missing dependencies
2. Verify all imports are correct
3. Check for syntax errors
4. Fix issues one by one
5. Rebuild after each fix

### Runtime Errors

#### 🚨 CRITICAL: Missing Environment Variables

**ABSOLUTE RULE: Missing environment variables MUST NOT terminate the workflow.**

**Symptoms:**
```
Error: Service didn't start due to missing STRIPE_SECRET_KEY environment variable
Error: Required environment variable DATABASE_URL is not defined
```

**Recovery Steps:**
1. **Ask the user ONCE** for the missing value:
   - "Required environment variable STRIPE_SECRET_KEY is missing. Please provide the value so the agent can continue."
2. **Store it immediately** in the relevant .env file:
   - Navigate to the service directory
   - Add `VARIABLE_NAME=value` to the .env file
   - If .env doesn't exist, create it
3. **Reload environment** and continue execution automatically
4. **NEVER ask for the same variable again** - always check .env first

**CRITICAL RULES:**
- Missing env vars MUST NOT stop the workflow
- After storing, continue through: Testing → Git → PR → Ticket closure
- Configuration values are persistent - once provided, they're remembered
- Do NOT ask "should I continue?" - JUST continue after storing the value

#### Service Won't Start
**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Recovery Steps:**
1. Check if another process is using the port: `lsof -i :3001`
2. Kill the process or change port
3. Verify environment variables are set (see Missing Environment Variables section above)
4. Check database connection

#### Database Errors
**Symptoms:**
```
Error: relation "jobs" does not exist
```

**Recovery Steps:**
1. Run database migrations: `npm run migrate`
2. Verify table exists in database
3. Check database connection string
4. Verify database user has correct permissions

### Test Failures

#### Unit Test Failures
**Symptoms:**
```
FAIL tests/services/jobService.test.ts
  ✕ should create job (50ms)
```

**Recovery Steps:**
1. Read test failure message
2. Identify what assertion failed
3. Debug the code or test
4. Re-run tests: `npm test`

#### Integration Test Failures
**Symptoms:**
```
Expected: 201
Received: 500
```

**Recovery Steps:**
1. Check service logs for error details
2. Verify service is running
3. Check API endpoint configuration
4. Verify request data format

### Integration Failures

#### Service Communication Failures
**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:3002
```

**Recovery Steps:**
1. Verify target service is running
2. Check service discovery configuration
3. Verify network connectivity
4. Check firewall rules

#### Event Queue Failures
**Symptoms:**
```
Error: Failed to publish event to queue
```

**Recovery Steps:**
1. Verify message queue service is running
2. Check queue connection configuration
3. Verify event payload structure
4. Check queue permissions

---

## Common Pitfalls

### 1. Modifying Wrong Service
**❌ Pitfall:**
Making changes to the wrong service due to misunderstanding service ownership.

**✅ Prevention:**
- Always consult agent-memory/repo-analysis/ (dynamic repository analysis)
- Verify service ownership
- Cross-reference with architecture.md

### 2. Breaking Service Boundaries
**❌ Pitfall:**
Directly accessing another service's database or internal modules.

**✅ Prevention:**
- Use public APIs for cross-service communication
- Publish events for other services
- Never import internal modules from other services

### 3. Ignoring Build Errors
**❌ Pitfall:**
Proceeding with implementation despite build failures.

**✅ Prevention:**
- Fix all build errors before continuing
- Never commit code that doesn't build
- Treat build errors as blocking issues

### 4. Creating Unused Code
**❌ Pitfall:**
Writing code that's never called or exported incorrectly.

**✅ Prevention:**
- Ensure all functions are inside exports
- Remove commented-out code
- Use linter to detect unused code

### 5. Skipping Tests
**❌ Pitfall:**
Not running tests or skipping test creation.

**✅ Prevention:**
- Run all tests before completing task
- Create tests for new functionality
- Never skip test requirements

### 6. Forgetting Error Handling
**❌ Pitfall:**
Not adding proper error handling for new code.

**✅ Prevention:**
- Wrap all async operations in try-catch
- Use consistent error response format
- Log all errors appropriately

### 7. Hardcoding Configuration
**❌ Pitfall:**
Hardcoding values like ports, URLs, or secrets.

**✅ Prevention:**
- Use environment variables for configuration
- Create configuration files
- Never commit secrets or hardcoded values

### 8. Not Following Existing Patterns
**❌ Pitfall:**
Creating new patterns instead of following existing conventions.

**✅ Prevention:**
- Read existing code before writing new code
- Follow established patterns in the service
- Maintain consistency with existing codebase

---

## Troubleshooting Guide

### Issue: "Cannot find module" Error

**Symptoms:**
```
Error: Cannot find module './validators/jobValidators'
```

**Diagnosis:**
1. Check if file exists at specified path
2. Verify import path is correct
3. Check file extension

**Solution:**
```typescript
// ❌ INCORRECT: Wrong path
import { validateJob } from '../validators/jobValidators';

// ✅ CORRECT: Correct path
import { validateJob } from './validators/jobValidators';
```

---

### Issue: "Property does not exist on type" Error

**Symptoms:**
```
error TS2339: Property 'createJob' does not exist on type 'typeof jobController'
```

**Diagnosis:**
1. Function not exported correctly
2. Function outside export object
3. Typo in function name

**Solution:**
```typescript
// ❌ INCORRECT: Function outside export
async function createJob(req: Request, res: Response) {
  // Implementation
}
export const jobController = {
  createJob // Wrong reference
};

// ✅ CORRECT: Function inside export
export const jobController = {
  async createJob(req: Request, res: Response) {
    // Implementation
  }
};
```

---

### Issue: Service Fails to Start

**Symptoms:**
```
npm run start
> harborJobSvc@1.0.0 start
> node dist/index.js

Error: Server failed to start
```

**Diagnosis:**
1. Check if port is already in use
2. Verify environment variables are set
3. Check database connection
4. Review error logs

**Solution:**
```bash
# Check port usage
lsof -i :3001

# Kill process if needed
kill -9 <PID>

# Set environment variables
export DB_URL=postgresql://...
export REDIS_URL=redis://...

# Check logs
tail -f logs/error.log
```

---

### Issue: Tests Pass But Service Fails in Production

**Symptoms:**
- All tests pass in development
- Service fails in production environment

**Diagnosis:**
1. Environment configuration differences
2. Missing environment variables
3. Database schema differences
4. Dependency version mismatches

**Solution:**
- Verify production environment variables
- Run database migrations in production
- Check dependency versions match
- Test in staging environment first

---

### Issue: Performance Degradation After Changes

**Symptoms:**
- API response times increased significantly
- Database queries slowed down
- Memory usage increased

**Diagnosis:**
1. Check for N+1 query problems
2. Verify database indexes exist
3. Review query efficiency
4. Check for memory leaks

**Solution:**
```typescript
// ❌ INCORRECT: N+1 query problem
async function getJobsWithEmployers() {
  const jobs = await Job.findAll();

  // N+1 query problem: queries employer for each job
  for (const job of jobs) {
    job.employer = await User.findByPk(job.employerId);
  }

  return jobs;
}

// ✅ CORRECT: Use eager loading
async function getJobsWithEmployers() {
  const jobs = await Job.findAll({
    include: [{
      model: User,
      as: 'employer'
    }]
  });

  return jobs;
}
```

---

## Quick Reference Checklist

### Before Starting Implementation

**Pre-Execution:**
- [ ] Read and understand `planning.md`
- [ ] Identify all affected services using `agent-memory/repo-analysis/ (dynamic repository analysis)`
- [ ] Read `harbor-ai/coding-rules.md`
- [ ] Read service-specific `coding-rules.md` files
- [ ] Verify all dependencies are documented
- [ ] **CRITICAL: Prepare to create feature branch from dev**

**Validation:**
- [ ] Planning document is approved
- [ ] Scope is clearly defined
- [ ] Success criteria are measurable
- [ ] Rollback plan exists
- [ ] **Branch name ready: feature/<task-id>-<description>**

---

### During Implementation

**Branch Management (CRITICAL):**
- [ ] Switched to dev branch
- [ ] Created feature branch from dev
- [ ] Verified branch name format: `feature/<task-id>-<description>`
- [ ] Confirmed working directory is clean
- [ ] Verified current branch before making changes

**Code Quality:**
- [ ] All functions are inside exports
- [ ] No unused imports or variables
- [ ] Imports are organized correctly
- [ ] Dependencies are verified
- [ ] Code follows existing patterns

**Error Handling:**
- [ ] All async operations have try-catch
- [ ] Error responses follow standard format
- [ ] Errors are logged appropriately
- [ ] Sensitive data not in error messages

**Security:**
- [ ] Input validation implemented
- [ ] Output sanitization implemented
- [ ] SQL injection prevented (parameterized queries)
- [ ] Authentication/authorization checked

---

### After Implementation

**Build & Compile:**
- [ ] TypeScript compiles without errors
- [ ] Service builds successfully
- [ ] No build warnings
- [ ] All files in dist/ directory

**Code Quality:**
- [ ] Linter passes (no errors)
- [ ] Code formatted consistently
- [ ] No commented-out code
- [ ] No console.log statements left

**Testing:**
- [ ] All existing tests pass
- [ ] New tests created (if required)
- [ ] Tests cover new functionality
- [ ] Manual testing successful

**Integration:**
- [ ] API contracts maintained
- [ ] Backward compatibility preserved
- [ ] Service communication works
- [ ] Database operations successful

**Validation:**
- [ ] Service starts without errors
- [ ] Health check passes
- [ ] No runtime errors in logs
- [ ] Performance acceptable

**Documentation:**
- [ ] All changes documented
- [ ] API documentation updated
- [ ] Database changes recorded
- [ ] Event changes documented

---

### Before Marking Task Complete

**Final Checks:**
- [ ] All quality gates passed
- [ ] All tests passing
- [ ] Service builds successfully
- [ ] Service runs without errors
- [ ] Documentation complete
- [ ] Summary of changes provided

**Ready for Deployment:**
- [ ] Code reviewed (if required)
- [ ] Staging testing successful
- [ ] Rollback plan verified
- [ ] Monitoring configured
- [ ] Deployment plan ready

---

## Execution Summary Template

Use this template to provide a summary after completing execution:

```markdown
# Execution Summary

## Task Overview
**Task:** [Task name from planning.md]
**Planning Document:** [Link to planning.md]
**Execution Date:** [YYYY-MM-DD]
**Executor:** Harbor-AI

## Changes Implemented

### Files Created
- [List all new files]

### Files Modified
- [List all modified files]

### APIs Added/Updated
- [List all API changes]

### Database Changes
- [List all database modifications]

### Event/Queue Changes
- [List all event/queue modifications]

## Validation Results

### Build Status
✓ TypeScript compilation: Passed
✓ Build successful: Passed
✓ Linting: Passed

### Testing Results
✓ Unit tests: [X]/[Y] passed
✓ Integration tests: [X]/[Y] passed
✓ Manual testing: Passed
✓ Runtime validation: Passed

### Integration Validation
✓ API contracts: Maintained
✓ Backward compatibility: Preserved
✓ Service communication: Working
✓ Database operations: Successful

## Known Issues
[List any known issues or limitations]

## Deployment Notes
[Any special deployment considerations]

## Next Steps
[Recommended next actions]

---
**Execution Status:** ✅ COMPLETE
**All Quality Gates:** ✅ PASSED
**Ready for Deployment:** ✅ YES
```

---

## Appendix: Execution Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    EXECUTION WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘

   Step 1: Understand Task
   └─ Read planning.md
   └─ Clarify scope boundaries
   └─ Identify success criteria
            ↓
   Step 2: Identify Affected Services
   └─ Use agent-memory/repo-analysis/ (dynamic repository analysis)
   └─ Create service impact table
   └─ Validate service boundaries
            ↓
   Step 3: Follow Coding Standards
   └─ Read global coding-rules.md
   └─ Read service-specific rules
   └─ Understand existing patterns
            ↓
   Step 4: Create Feature Branch
   └─ Navigate to HarborService root
   └─ Switch to dev branch
   └─ Create feature branch from dev
   └─ Verify branch status
            ↓
   Step 5: Navigate to Service Directory
   └─ Identify target service directory
   └─ Navigate to service directory
   └─ Verify service structure
            ↓
   Step 6: Implement Changes
   └─ Create/modify files
   └─ Follow code organization
   └─ Implement API/DB/Events
            ↓
   Step 7: Validate Code Quality
   └─ Check code placement
   └─ Remove unused code
   └─ Verify imports and dependencies
            ↓
   Step 8: Error Checking
   └─ Validate syntax
   └─ Compile TypeScript
   └─ Verify build success
            ↓
   Step 9: Integration Safety
   └─ Validate API contracts
   └─ Check backward compatibility
   └─ Ensure safe service communication
            ↓
   Step 10: Testing
   └─ Run existing tests
   └─ Create new tests (if needed)
   └─ Perform manual testing
   └─ Check for runtime errors
            ↓
   Step 11: Final Validation
   └─ Rebuild service
   └─ Run linter
   └─ Start service
   └─ Verify health check
            ↓
   Step 12: Summary of Changes
   └─ Document files created
   └─ Document files modified
   └─ Document API changes
   └─ Provide execution summary

```

---

## 🚨 CRITICAL GATE: Git Workflow Completion

**BEFORE proceeding to Phase 6 (Pull Request), the following MUST be completed:**

### Mandatory Pre-PR Checklist

**✅ Branch Creation (Step 4)**
- [ ] Created feature branch from `dev`
- [ ] Branch follows naming convention: `feature/<ticket-id>-<description>`
- [ ] Working directory is clean
- [ ] Currently on feature branch

**✅ Code Implementation (Steps 5-10)**
- [ ] Navigated to correct service directory
- [ ] Created/modified required files
- [ ] Code follows coding standards
- [ ] TypeScript compilation successful
- [ ] All tests passing
- [ ] Service starts without errors

**🚨 CRITICAL: NEXT STEPS (MANDATORY)**

**⚠️ TESTING MODE: Git Operations Disabled**

**Git operations are currently DISABLED for testing purposes.**

**Git operations that would normally execute (DISABLED in testing mode):**

<!--
1. **Commit Changes**
   ```bash
   git add <files>
   git commit -m "<ticket-id>: <description>"
   ```

2. **Push to Remote**
   ```bash
   git push -u origin feature/<ticket-id>-<description>
   ```

3. **Create Pull Request**
   ```bash
   gh pr create --base dev --title "<ticket-id>: <description>" --body "<PR description>"
   ```

4. **ONLY THEN: Close Ticket**
   - Verify PR created successfully
   - Get PR URL
   - Update Azure DevOps ticket status to "Closed"
   - Add PR link to ticket

**❌ PROHIBITED ACTIONS:**
- **NEVER** close ticket without completing Git workflow
- **NEVER** close ticket if push failed
- **NEVER** close ticket if PR creation failed
- **NEVER** skip commit step
- **NEVER** skip push step
- **NEVER** skip PR creation step

**✅ IF Git WORKFLOW FAILS:**
- DO NOT close ticket
- Report error to user
- Preserve ticket in current state
- Wait for further instructions
-->

---

## 🚨 TESTING MODE: Stop Execution Here

**⚠️ TESTING MODE: Workflow Stops After Execution**

**Git operations and subsequent phases are DISABLED for testing purposes.**

**Normal workflow (DISABLED in testing mode):**

<!--
**🚨 CRITICAL RULE - AUTONOMOUS WORKFLOW CONTINUATION:**

**After completing the execution phase, you MUST:**

✅ **IMMEDIATELY continue to Phase 4: Testing & Self-Validation**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/testing-and-self-validation.md`
   - Execute the complete testing and self-validation workflow
   - **CRITICAL:** Continue testing loop until ALL errors are resolved
   - **CRITICAL:** Auto-fix all detected issues
   - **CRITICAL:** Validate functionality end-to-end
   - DO NOT stop or ask for permission
   - DO NOT display "Next Steps" or wait for user input
   - This is an AUTONOMOUS workflow - continue automatically

❌ **PROHIBITED ACTIONS:**
- **DO NOT** stop after implementation
- **DO NOT** skip testing and self-validation - this is MANDATORY
- **DO NOT** proceed to PR creation if testing fails
- **DO NOT** display "The implementation is ready for testing"
- **DO NOT** ask "Would you like me to continue?"
- **DO NOT** wait for user confirmation
- **DO NOT** present options or menus

✅ **MANDATORY BEHAVIOR:**
1. Complete all execution validation steps
2. **IMMEDIATELY** proceed to `testing-and-self-validation.md` workflow
3. Execute comprehensive testing and validation
4. **IF errors detected:** Apply auto-fix procedures and re-test
5. **Continue fix-and-test loop until feature works correctly**
6. **ONLY THEN:** Proceed to PR creation workflow
7. Continue to PR creation after all tests pass
8. Complete the full lifecycle autonomously

**Rationale:**
The Harbor AI agent is designed as an autonomous development system. The execution phase is ONE STEP in the complete workflow, not the final step. The agent must continue through testing → PR creation → ticket closure without interruption.

**Reference:**
See `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/ai-workflow.md` section "Autonomous Workflow Continuation" for complete rules on autonomous execution.
-->

**✅ TESTING MODE BEHAVIOR:**

After completing code implementation:

1. ✅ **Complete all execution validation steps**
2. ✅ **Run validation workflow (build, type-check, lint)**
3. ✅ **Fix any detected errors**
4. ✅ **Re-validate until project is stable**
5. ✅ **Output completion message**
6. ⏹️ **STOP EXECUTION HERE**

**Completion Message:**
```
✅ Code changes completed and validated successfully in the affected repositories.
✅ Project builds without errors.
✅ No TypeScript or linting errors detected.
🚫 Git operations are currently disabled in testing mode.
📝 Changes have been applied locally only.
🔄 To re-enable Git operations and continue to testing, see execution.md workflow.
```

**❌ DO NOT:**
- Continue to testing phase
- Create Git branches
- Commit changes
- Push to remote
- Create Pull Requests
- Update Azure DevOps tickets

**To Re-enable Full Workflow:**
1. Edit `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`
2. Uncomment the Git operations section
3. Uncomment the "Continue to Next Phase" section
4. Remove the testing mode stop instruction

---

**END OF EXECUTION PROTOCOL**

---

*For questions or issues related to this execution protocol, please refer to:*
- `harbor-ai/planning.md` - Planning guidelines
- `harbor-ai/agent-memory/repo-analysis/ (dynamic repository analysis)` - Service ownership
- `harbor-ai/coding-rules.md` - Coding standards
- `harbor-ai/architecture-overview.md` - System architecture