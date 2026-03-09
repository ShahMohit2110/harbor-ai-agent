# Harbor AI - Master Workflow Document

**Document Version:** 1.0.0
**Last Updated:** 2025-03-06
**Owner:** Harbor AI Development Team

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Workflow Overview](#workflow-overview)
3. [Documentation Files Reference](#documentation-files-reference)
4. [Complete Workflow Phases](#complete-workflow-phases)
5. [General Workflow Rules](#general-workflow-rules)
6. [Phase Transition Criteria](#phase-transition-criteria)
7. [Error Handling and Recovery](#error-handling-and-recovery)
8. [Workflow Diagrams](#workflow-diagrams)
9. [Quick Reference](#quick-reference)
10. [Autonomous Workflow Continuation](#autonomous-workflow-continuation)

---

## Purpose and Scope

This document defines the **complete end-to-end workflow** that Harbor-AI must follow when processing development tasks from Azure DevOps. It serves as the **master instruction file** that coordinates all other documentation files and ensures consistent, safe, and high-quality software development.

### Objectives

- Provide a single source of truth for the complete AI development workflow
- Coordinate all documentation files into a cohesive process
- Ensure strict adherence to workflow phases in the correct order
- Maintain code quality and system integrity
- Prevent skipping critical phases or making assumptions

### When to Use This Workflow

**This workflow MUST be used for:**
- All Azure DevOps work items assigned to Harbor-AI
- Feature development
- Bug fixes
- Enhancements and improvements
- Refactoring tasks
- Performance optimizations

**This workflow MUST NOT be bypassed for:**
- Emergency hotfixes (use emergency hotfix workflow)
- Documentation-only changes
- Configuration updates

**🚨 EXCEPTION: harborSharedModels Service**

The `harborSharedModels` service follows a **DIFFERENT workflow** from all other services.

**When a task involves harborSharedModels:**
- ❌ DO NOT use this standard workflow
- ✅ INSTEAD: Follow `workflows/harbor-shared-models-workflow.md`
- Key differences: No PRs, version updates mandatory, no tests, branch from main (not dev)

**Detection:** The agent will automatically detect when a task involves `harborSharedModels` and apply the special workflow.

### Workflow Philosophy

The Harbor AI workflow follows these principles:

1. **Sequential Execution** - Phases must be completed in order
2. **No Skipping** - Every phase is mandatory
3. **Documentation First** - Understand before implementing
4. **Quality Gates** - Each phase has validation criteria
5. **Safety First** - Never compromise system integrity

---

## ⚠️ CRITICAL RULE: Working Directory Management

**🚨 THE MOST CRITICAL RULE IN THE ENTIRE WORKFLOW:**

**NEVER create or modify code files while in the `harbor-ai/` directory!**

The `harbor-ai/` directory is for documentation and configuration ONLY. It should NEVER contain:
- `.ts` files (TypeScript code)
- `package.json` files
- `tsconfig.json` files
- Any other code files

### Why This Rule Exists

Your Harbor system has the following structure:
```
/Users/mohitshah/Documents/HarborService/
├── harbor-ai/              ← Documentation ONLY (you are here)
├── harborUserSvc/          ← Actual User Service code
├── harborJobSvc/           ← Actual Job Service code
├── harborNotificationSvc/  ← Actual Notification Service code
├── harborSocketSvc/        ← Actual Socket Service code
└── ... (other services)
```

### ✅ CORRECT WORKFLOW:

1. **Start in `harbor-ai/`** - Read documentation and understand requirements
2. **Identify target service** - Determine which service needs modification (e.g., `harborJobSvc`)
3. **Navigate to service directory** - `cd /Users/mohitshah/Documents/HarborService/harborJobSvc`
4. **Verify location** - Run `pwd` to confirm you're in the right place
5. **Create/modify files** - Now you can safely make changes

### ❌ WRONG WORKFLOW:

1. Stay in `harbor-ai/` directory
2. Create `.ts` files or modify `package.json` here
3. **This breaks the entire system structure!**

### How to Verify You're in the Right Place

```bash
# Check current directory
pwd

# ✅ CORRECT output examples:
# /Users/mohitshah/Documents/HarborService/harborJobSvc
# /Users/mohitshah/Documents/HarborService/harborUserSvc

# ❌ WRONG output:
# /Users/mohitshah/Documents/HarborService/harbor-ai

# Verify you should see these files:
ls -la

# ✅ CORRECT (you're in a service directory):
# package.json  tsconfig.json  controllers/  services/  repository/

# ❌ WRONG (you're still in harbor-ai):
# agents/  workflows/  architecture/  context/
```

### This Rule Is Enforced at Multiple Points

This critical rule is reinforced in:
- **Phase 4, Step 4** - Explicit navigation step before implementation
- **execution.md** - Detailed directory navigation protocol
- **harbor-backend-agent.md** - Agent-specific instructions

**This rule is so critical that violating it will cause immediate system failure.**

---

---

## Workflow Overview

### The 6-Phase Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              HARBOR AI DEVELOPMENT WORKFLOW                   │
└─────────────────────────────────────────────────────────────┘

   Azure DevOps Task
          ↓
   ┌──────────────┐
   │ PHASE 1      │  Task Intake
   │ Task Intake  │  → task-intake.md
   └──────────────┘
          ↓
   ┌──────────────┐
   │ PHASE 2      │  System Understanding
   │ System       │  → architecture-overview.md
   │ Understanding│  → service-map.md
   └──────────────┘
          ↓
   ┌──────────────┐
   │ PHASE 3      │  Planning
   │ Planning     │  → planning.md
   └──────────────┘
          ↓
   ┌──────────────┐
   │ PHASE 4      │  Execution
   │ Execution    │  → execution.md
   │              │  → coding-rules.md
   └──────────────┘
          ↓
   ┌──────────────┐
   │ PHASE 5      │  Testing
   │ Testing      │  → testing.md
   └──────────────┘
          ↓
   ┌──────────────┐
   │ PHASE 6      │  Pull Request
   │ Pull Request │  → pr.md
   └──────────────┘
          ↓
   Pull Request Created
```

### Phase Summary

| Phase | Name | Documentation | Output | Duration |
|-------|------|---------------|--------|----------|
| 1 | Task Intake | task-intake.md | Structured task summary | 5-10 min |
| 2 | System Understanding | architecture-overview.md, service-map.md | Service identification | 5 min |
| 3 | Planning | planning.md | Implementation plan | 15-30 min |
| 4 | Execution | execution.md, coding-rules.md | Implemented code | 30-60 min |
| 5 | Testing | testing.md | Test results | 15-30 min |
| 6 | Pull Request | pr.md | Pull request | 5-10 min |

**Total Estimated Time:** 1-2 hours per task (varies by complexity)

---

## Documentation Files Reference

### Core Documentation Files

Harbor-AI has access to the following documentation files that guide behavior throughout the workflow:

#### **1. architecture-overview.md**
**Purpose:** System-level architecture documentation
**Used In:** Phase 2 (System Understanding)
**Contains:**
- System architecture style
- List of all services
- Service communication patterns
- Data ownership
- Technology stack
- Design principles

#### **2. service-map.md**
**Purpose:** Service responsibility mapping
**Used In:** Phase 2 (System Understanding)
**Contains:**
- Service descriptions
- Feature-to-service mapping
- Service ownership rules
- Decision trees for service identification
- Quick reference guide

#### **3. coding-rules.md**
**Purpose:** Platform-wide coding standards
**Used In:** Phase 4 (Execution)
**Contains:**
- Microservice architecture principles
- Code quality standards
- AI agent workflow rules
- Testing requirements
- Safety rules
- Common pitfalls

#### **4. task-intake.md**
**Purpose:** Task processing and understanding
**Used In:** Phase 1 (Task Intake)
**Contains:**
- How to read Azure DevOps tickets
- Requirement analysis
- Task type classification
- Change type identification
- Completeness validation
- Structured task summary format

#### **5. planning.md**
**Purpose:** Implementation planning template
**Used In:** Phase 3 (Planning)
**Contains:**
- Planning template with 20 sections
- Architecture validation
- Risk assessment
- Implementation phases
- Testing strategy
- Rollback planning

#### **6. execution.md**
**Purpose:** Code execution protocol
**Used In:** Phase 4 (Execution)
**Contains:**
- 10-step execution workflow
- Code organization patterns
- Quality gates
- Error handling
- Integration safety

#### **7. testing.md**
**Purpose:** Testing validation protocol
**Used In:** Phase 5 (Testing)
**Contains:**
- 10-step testing workflow
- Test categories
- Test summary templates
- Issue severity classification
- Automated fix guidelines

#### **8. pr.md**
**Purpose:** Pull request creation protocol
**Used In:** Phase 6 (Pull Request)
**Contains:**
- Branch naming conventions
- Commit message standards
- PR description templates
- PR quality rules
- Review guidelines

#### **9. harbor-shared-models-workflow.md** 🚨 SPECIAL
**Purpose:** harborSharedModels special workflow
**Used In:** When task involves harborSharedModels service
**Contains:**
- Special workflow rules for shared model library
- Model update scenarios (existing vs new)
- Version update requirements
- Git workflow differences (no PRs, branch from main)
- Execution restrictions (no tests, no npm start)

**IMPORTANT:** This workflow REPLACES the standard workflow when harborSharedModels is involved.

### Documentation Usage Matrix

| Phase | Primary Docs | Secondary Docs | Reference Docs |
|-------|--------------|----------------|---------------|
| 1 - Task Intake | task-intake.md | - | - |
| 2 - System Understanding | architecture-overview.md, service-map.md | - | - |
| 3 - Planning | planning.md | service-map.md | architecture-overview.md |
| 4 - Execution | execution.md | coding-rules.md | service-map.md |
| 5 - Testing | testing.md | planning.md | execution.md |
| 6 - Pull Request | pr.md | testing.md | coding-rules.md |

---

## Complete Workflow Phases

## PHASE 1: Task Intake

**Objective:** Convert Azure DevOps work item into structured development task

**Primary Documentation:** `task-intake.md`

### Step 1.1: Receive Azure DevOps Task

**Action:** Harbor-AI receives a new work item from Azure DevOps

**Extract Information:**
- Task ID (e.g., HARBOR-123)
- Title
- Description
- Acceptance Criteria
- Tags/Labels
- Linked Work Items
- Priority
- Assignee

### Step 1.2: Process Using task-intake.md

**Follow task-intake.md workflow:**

1. **Read the Work Item**
   - Extract all ticket information
   - Read description and acceptance criteria
   - Review linked work items
   - Check attachments

2. **Understand the Requirement**
   - Analyze what needs implementation
   - Define expected behavior
   - Identify problem being solved
   - Extract business context

3. **Identify Affected Services**
   - Use service-map.md for reference
   - Map features to services
   - Verify service boundaries
   - Create service impact table

4. **Identify Task Type**
   - Classify as: Feature, Bug Fix, Enhancement, Refactor, or Performance
   - Document task type with justification

5. **Identify Required Changes**
   - Determine change types: API, Database, Logic, Validation, Events
   - List all required changes
   - Create change inventory

6. **Validate Requirement Completeness**
   - Check for all required information
   - Identify missing information
   - Assess clarity level

### Step 1.3: Produce Structured Task Summary

**Output:** Structured task summary document

**Required Sections:**
```markdown
# Task Summary: HARBOR-XXX

## Basic Information
- Task ID, Title, Type, Priority

## Requirement Summary
Clear description of what needs implementation

## Affected Services
Primary and secondary services

## Expected Behavior
Functional and non-functional requirements

## Required Changes
List of all changes needed

## Acceptance Criteria
Success criteria

## Dependencies
Related work items

## Risk Assessment
Risk level and mitigation
```

### Step 1.4: Completeness Check

**Decision Point:**

**✅ Requirements Complete:**
- Proceed to Phase 2

**⚠️ Requirements Need Clarification:**
- Request clarification from task assignee
- Wait for response
- Re-process task when clarification received
- Do NOT proceed to Phase 2

**Phase 1 Success Criteria:**
- [x] Task information extracted
- [x] Requirement analyzed
- [x] Services identified
- [x] Task type classified
- [x] Changes identified
- [x] Completeness validated
- [x] Structured summary created

**Phase 1 Output:** Structured task summary document

---

## PHASE 2: System Understanding

**Objective:** Understand Harbor architecture and service responsibilities before planning

**Primary Documentation:** `architecture-overview.md`, `service-map.md`

### Step 2.1: Read architecture-overview.md

**Purpose:** Understand the Harbor platform architecture

**Read and Understand:**

1. **System Overview**
   - Harbor as job marketplace
   - Microservice architecture
   - API Gateway pattern

2. **List of Services**
   - All 10+ services
   - Service responsibilities
   - Service boundaries

3. **Service Communication**
   - REST APIs
   - WebSocket (socket-service)
   - Message Queues
   - Event-driven communication

4. **Data Ownership**
   - Which service owns which data
   - Database boundaries
   - Shared data layer (harbor-shared-models)

5. **Technology Stack**
   - Backend: TypeScript, Node.js, Express.js
   - Database: PostgreSQL with Sequelize
   - Communication: Azure Service Bus, Redis
   - Infrastructure: Azure AKS, ACR, Key Vault

### Step 2.2: Read service-map.md

**Purpose:** Understand service ownership and feature mapping

**Read and Understand:**

1. **Service Descriptions**
   - Each service's purpose
   - Service capabilities
   - Service boundaries

2. **Service Responsibility Matrix**
   - Feature-to-service mapping
   - Domain ownership
   - Cross-service interaction rules

3. **Service Ownership Rules**
   - What each service owns
   - What each service doesn't own
   - Decision trees for service identification

### Step 2.3: Apply to Current Task

**Action:** Use architecture knowledge to validate Phase 1 service identification

**Verification:**
- [ ] Services identified in Phase 1 are correct
- [ ] Service boundaries are respected
- [ ] No cross-boundary violations planned
- [ ] Communication patterns understood

**Example Validation:**
```markdown
**Task:** Add job filtering API

**Phase 1 Service Identification:**
- Primary: job-service ✓
- Secondary: api-gateway ✓

**Phase 2 Verification:**
- Job filtering → job-service ✓ (correct per service-map.md)
- API Gateway routing → api-gateway ✓ (correct per architecture-overview.md)
- No user-service modifications ✓ (correct, not user-related)
- No notification-service ✓ (correct, no notifications in scope)
```

### Step 2.4: Document Architecture Understanding

**Output:** Architecture notes for the task

**Include:**
- Services involved and their roles
- Communication patterns needed
- Data flow between services
- Dependencies on other services
- Integration points

**Phase 2 Success Criteria:**
- [x] Architecture overview understood
- [x] Service map understood
- [x] Service identification validated
- [x] Architecture boundaries confirmed
- [x] Communication patterns identified

**Phase 2 Output:** Validated service identification with architecture context

---

## PHASE 3: Planning

**Objective:** Create detailed implementation plan

**Primary Documentation:** `planning.md`

### Step 3.1: Read planning.md Template

**Action:** Review the complete planning template

**Understand Template Sections:**
1. Task Overview
2. Business Objective
3. Affected Services
4. API Changes
5. Database Changes
6. Event/Queue Changes
7. Dependencies
8. Architecture Validation
9. Risks/Edge Cases
10. Implementation Plan
11. Testing Plan
12. Rollback Plan
13. Deployment Plan
14. Monitoring & Observability
15. Documentation Updates
16. Success Criteria Verification
17. Approval & Sign-Off
18. Planning Summary
19. Planning Checklist

### Step 3.2: Create Implementation Plan

**Action:** Fill out planning.md template with task-specific details

**Use Phase 1 and Phase 2 outputs:**

**1. Task Overview:**
```markdown
- Task ID: HARBOR-XXX
- Title: [From Phase 1]
- Description: [From Phase 1 summary]
- Success Criteria: [From Phase 1 acceptance criteria]
```

**2. Affected Services:**
```markdown
- Primary Service: [From Phase 1, validated in Phase 2]
- Secondary Services: [From Phase 1, validated in Phase 2]
- Impact Level: [High/Medium/Low]
```

**3. API Changes:**
```markdown
**New Endpoints:**
- METHOD /path - Description
  - Request format
  - Response format

**Modified Endpoints:**
- METHOD /path - Description of changes
```

**4. Database Changes:**
```markdown
**New Tables:**
- table_name - Description

**Modified Tables:**
- table_name - Changes needed

**Migrations:**
- Migration files required
```

**5. Implementation Plan:**
```markdown
**Phase 1: Backend API**
- Step 1: Create controller method
- Step 2: Implement service logic
- Step 3: Create repository queries
- Step 4: Add validation

**Phase 2: Database**
- Step 1: Create migration
- Step 2: Add indexes

**Phase 3: Integration**
- Step 1: Update API Gateway
- Step 2: Test integration
```

**6. Testing Plan:**
```markdown
**Unit Tests:**
- Test filter logic
- Test validation
- Test edge cases

**Integration Tests:**
- Test API endpoint
- Test database queries
- Test error handling

**Manual Tests:**
- Test with curl/Postman
- Verify response format
- Test pagination
```

**7. Rollback Plan:**
```markdown
**Triggers:**
- Critical bugs found
- Performance degradation
- Data integrity issues

**Procedure:**
1. Revert migration
2. Rollback code
3. Verify system stable
```

### Step 3.3: Validate Architecture

**Use architecture-overview.md and service-map.md:**

**Checks:**
- [ ] Service boundaries maintained
- [ ] Data ownership respected
- [ ] Communication patterns appropriate
- [ ] No breaking changes (or documented)
- [ ] Backward compatibility preserved

### Step 3.4: Risk Assessment

**Identify and Document Risks:**

**Technical Risks:**
- Performance issues
- Database query complexity
- Integration challenges

**Business Risks:**
- Feature adoption
- User experience impact

**Mitigation Strategies:**
- Performance testing
- Code review
- Gradual rollout

### Step 3.5: Complete Planning Checklist

**Use planning.md checklist:**

**Pre-Implementation:**
- [ ] All sections of planning.md completed
- [ ] Architecture validation passed
- [ ] Risks identified and mitigated
- [ ] Testing strategy defined
- [ ] Rollback plan documented
- [ ] Success criteria measurable

**Phase 3 Success Criteria:**
- [x] Planning document complete
- [x] Implementation steps defined
- [x] Architecture validated
- [x] Risks assessed
- [x] Testing planned
- [x] Rollback strategy documented
- [x] All checklist items passed

**Phase 3 Output:** Complete planning.md document

---

## PHASE 4: Execution

**Objective:** Implement the planned changes

**Primary Documentation:** `execution.md`, `coding-rules.md`

### Step 4.1: Read execution.md

**Action:** Review the complete execution protocol

**Understand 10-Step Workflow:**
1. Understand the Task
2. Identify Affected Services
3. Follow Coding Standards
4. Implement the Changes
5. Validate Code Quality
6. Error Checking
7. Integration Safety
8. Testing
9. Final Validation
10. Summary of Changes

### Step 4.2: Read coding-rules.md

**Action:** Review platform-wide coding standards

**Focus Areas:**
- Microservice architecture principles
- Code quality standards
- AI agent workflow rules
- Safety rules
- Common pitfalls

### Step 4.3: Implement Changes

**Follow execution.md workflow:**

**Step 1: Understand the Task**
- Review planning.md
- Understand task scope
- Identify success criteria

**Step 2: Identify Affected Services**
- Use service-map.md
- Verify from planning.md
- Only modify necessary services

**Step 3: Follow Coding Standards**
- Read coding-rules.md
- Read service-specific coding rules
- Follow existing patterns

**Step 4: Navigate to Service Directory (CRITICAL)**
- **⚠️ CRITICAL:** Navigate to the correct service directory BEFORE making any changes
- Never create files while in the `harbor-ai/` directory
- Navigate to service directory (e.g., `cd ../harborJobSvc`)
- Verify current directory is correct

**Step 5: Implement the Changes**
- Create new files (if required)
- Modify existing files (if required)
- Follow code organization patterns
- Implement API endpoints
- Implement service logic
- Implement database changes
- Implement validation

**Code Organization:**
```typescript
// Controller Layer (controllers/)
export const jobController = {
  async methodName(req: Request, res: Response) {
    // Implementation
  }
};

// Service Layer (services/)
export const jobService = {
  async methodName(input: InputType) {
    // Business logic
  }
};

// Repository Layer (repositories/)
export const jobRepository = {
  async methodName(data: DataType) {
    // Data access
  }
};
```

**Step 5: Validate Code Quality**
- Check code placement (inside exports)
- Remove unused imports
- Remove unused variables
- Organize imports correctly

**Step 6: Error Checking**
- Validate syntax
- Compile TypeScript
- Build service
- Fix all errors

**Step 7: Integration Safety**
- Validate API contracts
- Check backward compatibility
- Ensure safe service communication

**Step 8: Testing**
- Run existing tests
- Create new tests (if needed)
- Manual testing
- Check for runtime errors

**Step 9: Final Validation**
- Rebuild service
- Run linter
- Start service
- Verify health check

**Step 10: Summary of Changes**
- Document files created
- Document files modified
- Document API changes
- Document database changes

### Step 4.4: Execute Implementation Plan

**Follow the plan from Phase 3:**

**Example Execution:**
```markdown
**Implementation Phase 1: Backend API**

Step 1: Create controller method
File: harborJobSvc/controllers/jobController.ts
- Add getFilteredJobs method
- Follow controller pattern
- Add error handling

Step 2: Implement service logic
File: harborJobSvc/services/jobService.ts
- Add filterJobs method
- Implement business logic
- Add validation

Step 3: Create repository queries
File: harborJobSvc/repositories/jobRepository.ts
- Add findByFilters method
- Build dynamic queries
- Add pagination

Step 4: Add validation
File: harborJobSvc/validators/jobValidators.ts
- Add filter validation schema
- Validate location format
- Validate salary range
```

### Step 4.5: Build and Verify

**Commands:**
```bash
# Navigate to service
cd harborJobSvc

# Build service
npm run build

# Verify no errors
echo $?
# Expected: 0

# Start service
npm run start

# Verify health
curl http://localhost:3001/health
# Expected: 200 OK

# Test new endpoint
curl http://localhost:3001/api/jobs/filter?location=Remote
# Expected: 200 OK with filtered results
```

**Phase 4 Success Criteria:**
- [x] All planned changes implemented
- [x] Code follows coding standards
- [x] TypeScript compiles successfully
- [x] Service builds without errors
- [x] Service starts without crashes
- [x] New functionality works
- [x] Existing functionality not broken
- [x] Changes documented

**Phase 4 Output:** Implemented code with execution summary

---

## PHASE 5: Testing

**Objective:** Validate all changes are safe and correct

**Primary Documentation:** `testing.md`

### Step 5.1: Read testing.md

**Action:** Review the complete testing protocol

**Understand 10-Step Testing Workflow:**
1. Understand the Implemented Changes
2. Build Verification
3. Service Startup Check
4. API Validation
5. Backward Compatibility Check
6. Logical Validation
7. Dependency Safety
8. Code Quality Validation
9. Error Handling Verification
10. Final Validation Before PR

### Step 5.2: Execute Testing Workflow

**Follow testing.md workflow:**

**Step 1: Understand the Implemented Changes**
- Review execution summary
- Identify files created/modified
- Identify affected services

**Step 2: Build Verification**
```bash
# TypeScript compilation
npx tsc --noEmit
# Expected: No errors

# Build service
npm run build
# Expected: Success, no warnings

# Verify build artifacts
ls -la dist/
# Expected: All files present
```

**Step 3: Service Startup Check**
```bash
# Start service
npm run start &
SERVICE_PID=$!

# Wait for startup
sleep 3

# Test health endpoint
curl http://localhost:3001/health
# Expected: 200 OK

# Check logs for errors
tail -20 logs/combined.log | grep -i error
# Expected: No errors

# Stop service
kill $SERVICE_PID
```

**Step 4: API Validation**
```bash
# Test new endpoint
curl -X GET "http://localhost:3001/api/jobs/filter?location=Remote&salaryMin=50000"
# Expected: 200 OK with filtered results

# Test validation
curl -X GET "http://localhost:3001/api/jobs/filter?salaryMin=invalid"
# Expected: 400 Bad Request with validation error

# Test authentication (if required)
curl -X GET "http://localhost:3001/api/jobs/filter?location=Remote"
# Expected: 401 Unauthorized (no token)
```

**Step 5: Backward Compatibility Check**
```bash
# Test existing endpoints
curl -X GET "http://localhost:3001/api/jobs"
# Expected: Still works

curl -X GET "http://localhost:3001/api/jobs/valid-id"
# Expected: Still works
```

**Step 6: Logical Validation**
- Verify requirements from planning.md met
- Test edge cases
- Verify business logic
- Check data integrity

**Step 7: Dependency Safety**
```bash
# Test service communication (if applicable)
# Test event publishing (if applicable)
# Test database operations
```

**Step 8: Code Quality Validation**
```bash
# Run linter
npm run lint
# Expected: No errors

# Check for unused code
# Verify imports organized
# Verify code structure
```

**Step 9: Error Handling Verification**
```bash
# Test error scenarios
# Verify error response format
# Check error logging
# Test graceful degradation
```

**Step 10: Final Validation Before PR**
```bash
# Clean build
rm -rf dist/
npm run build

# Final service test
npm run start &
# Test complete user flow
# Verify all functionality
kill $SERVICE_PID
```

### Step 5.3: Generate Test Summary

**Use testing.md template:**

```markdown
# Test Summary Report

## Test Overview
- Task: HARBOR-XXX
- Test Date: [Timestamp]
- Testing Duration: [X minutes]

## Tested Services
| Service | Tests Run | Passed | Failed | Status |
|---------|-----------|--------|--------|--------|
| job-service | 45 | 45 | 0 | ✅ PASS |

## Files Validated
- Created files: [List]
- Modified files: [List]

## APIs Verified
- New APIs: [List with test results]
- Existing APIs: [List with compatibility tests]

## Test Results by Category
- ✅ Compilation Tests: PASS
- ✅ Startup Tests: PASS
- ✅ API Tests: PASS
- ✅ Backward Compatibility Tests: PASS
- ✅ Logic Tests: PASS
- ✅ Integration Tests: PASS
- ✅ Code Quality Tests: PASS
- ✅ Error Handling Tests: PASS

## Issues Found
- Critical: 0
- Major: 0
- Minor: 0

## Pull Request Readiness
**Status:** ✅ READY FOR PULL REQUEST
```

### Step 5.4: Handle Test Failures

**If Issues Found:**

**Critical Issues:**
- STOP - Fix immediately
- Re-test after fix
- Do NOT proceed to Phase 6

**Major Issues:**
- Fix before proceeding
- Re-test after fix
- Document fix

**Minor Issues:**
- Fix automatically if possible
- Document in test summary
- May proceed if documented

**Phase 5 Success Criteria:**
- [x] All tests passed
- [x] Zero critical issues
- [x] Zero major issues
- [x] Minor issues fixed or documented
- [x] Test summary generated
- [x] Service builds successfully
- [x] Service runs without errors

**Phase 5 Output:** Complete test summary with all results

---

## PHASE 6: Pull Request Creation

**Objective:** Create pull request for code review and merge

**Primary Documentation:** `pr.md`

### Step 6.1: Verify Prerequisites

**Check All Previous Phases Complete:**
- [x] Phase 1 complete (Task Intake)
- [x] Phase 2 complete (System Understanding)
- [x] Phase 3 complete (Planning)
- [x] Phase 4 complete (Execution)
- [x] Phase 5 complete (Testing)

**Verify Test Summary:**
- [x] All tests passing
- [x] Zero critical issues
- [x] Zero major issues
- [x] Ready for PR confirmed

### Step 6.2: Read pr.md

**Action:** Review the complete pull request protocol

**Understand 8-Step PR Workflow:**
1. Verify Testing Completion
2. Prepare Branch
3. Stage Changes
4. Commit Changes
5. Push Branch
6. Create Pull Request
7. Pull Request Description
8. Final Validation

### Step 6.3: Execute PR Workflow

**Follow pr.md workflow:**

**Step 1: Verify Testing Completion**
- Review test summary
- Confirm build success
- Confirm no runtime errors

**Step 2: Prepare Branch**
```bash
# Switch to base branch
git checkout dev

# Pull latest changes
git pull origin dev

# Create feature branch
git checkout -b feature/HARBOR-XXX-short-description

# Example:
git checkout -b feature/HARBOR-123-add-job-filter
```

**Step 3: Stage Changes**
```bash
# Review changes
git status

# Stage only relevant files
git add harborJobSvc/controllers/jobController.ts
git add harborJobSvc/services/jobService.ts
git add harborJobSvc/repositories/jobRepository.ts
git add harborJobSvc/routes/jobRoutes.ts
git add harborJobSvc/validators/jobValidators.ts
git add harborJobSvc/tests/

# Do NOT stage:
# - .env files
# - node_modules/
# - dist/
# - logs/
```

**Step 4: Commit Changes**
```bash
# Create commit with proper message
git commit -m "HARBOR-XXX: Add job filtering API

Implemented job filtering by location and salary range.
Added validation, pagination, and error handling.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

**Step 5: Push Branch**
```bash
# Push to remote
git push -u origin feature/HARBOR-XXX-short-description

# Verify push
git branch -r
```

**Step 6: Create Pull Request**
```bash
# Using GitHub CLI
gh pr create \
  --base dev \
  --title "HARBOR-XXX: Add job filtering API" \
  ---body-file pr-description.md
```

**Step 7: Pull Request Description**

**Use pr.md template:**

```markdown
## Task
Add job filtering functionality to job search API

## Context
Users need ability to filter jobs by location and salary range
to find relevant opportunities more efficiently.

## Changes Implemented

### Added
- Job filtering by location (city, state, Remote)
- Job filtering by salary range (min, max)
- Pagination support
- Filter validation

### Modified
- `jobController.ts` - Added getFilteredJobs method
- `jobService.ts` - Added filterJobs method
- `jobRepository.ts` - Added findByFilters method

## Services Affected

### Primary Service
- **job-service** - Implemented filtering logic and API endpoint

### Secondary Services
- **api-gateway** - Registered new route

## Files Modified

### New Files
- `harborJobSvc/validators/jobFilterValidators.ts`

### Modified Files
- `harborJobSvc/controllers/jobController.ts`
- `harborJobSvc/services/jobService.ts`
- `harborJobSvc/repositories/jobRepository.ts`
- `harborJobSvc/routes/jobRoutes.ts`

## API Changes

### New Endpoints
- **GET /api/jobs/filter** - Search and filter jobs
  - Query Params: `location`, `salaryMin`, `salaryMax`, `page`, `limit`
  - Response: Paginated list of filtered jobs

## Testing Summary

### Test Results
- ✅ Compilation Tests: PASS
- ✅ Startup Tests: PASS
- ✅ API Tests: PASS
- ✅ Backward Compatibility Tests: PASS
- ✅ Logic Tests: PASS
- ✅ Integration Tests: PASS
- ✅ Code Quality Tests: PASS
- ✅ Error Handling Tests: PASS

### Test Metrics
- Total Tests Run: 45
- Tests Passed: 45
- Tests Failed: 0

### Performance Metrics
- Average Response Time: 12ms
- Average Query Time: 8ms

## Breaking Changes
None

## Migration Guide
Not applicable

## Notes
- Filters are optional and composable
- Default pagination: 20 items per page
- Performance validated under load

## Checklist
- [x] Code follows `coding-rules.md` standards
- [x] All tests passing
- [x] No critical or major issues
- [x] Service builds successfully
- [x] Service runs without errors
- [x] Documentation updated

## Related Issues
- Related Issue: #HARBOR-123

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

**Step 8: Final Validation**
- Verify PR details
- Check no merge conflicts
- Confirm all changes visible
- Ready for review

### Step 6.4: Submit for Review

**Action:**
- PR created successfully
- Notify reviewers
- Wait for feedback
- Address review comments
- Obtain approvals
- Merge after approval

**Phase 6 Success Criteria:**
- [x] All previous phases complete
- [x] Test summary shows ready for PR
- [x] Feature branch created
- [x] Changes committed with proper message
- [x] Branch pushed successfully
- [x] PR created with complete description
- [x] No merge conflicts
- [x] Ready for review

**Phase 6 Output:** Pull request created and submitted for review

---

## General Workflow Rules

### Rule 1: Sequential Phase Execution

**✅ REQUIRED:**
- Complete phases in order: 1 → 2 → 3 → 4 → 5 → 6
- Each phase must be complete before starting next
- All success criteria must be met

**❌ PROHIBITED:**
- Skipping phases
- Reordering phases
- Starting implementation before planning
- Creating PR before testing

---

### Rule 2: No Coding Before Planning

**✅ REQUIRED:**
- Complete Phase 1 (Task Intake) before writing any code
- Complete Phase 2 (System Understanding) before writing any code
- Complete Phase 3 (Planning) before writing any code
- Have complete implementation plan before Phase 4 (Execution)

**❌ PROHIBITED:**
- Writing code during Phase 1, 2, or 3
- Making assumptions about implementation
- Skipping planning to "save time"

---

### Rule 3: No PR Before Testing

**✅ REQUIRED:**
- Complete Phase 5 (Testing) before Phase 6 (PR)
- All tests must pass
- Zero critical issues
- Zero major issues
- Test summary generated

**❌ PROHIBITED:**
- Creating PR with failing tests
- Creating PR with critical issues
- Creating PR with major issues
- Skipping testing phase

---

### Rule 4: Always Follow Documentation

**✅ REQUIRED:**
- Read relevant documentation for each phase
- Follow workflow steps in order
- Use templates provided
- Adhere to standards defined

**❌ PROHIBITED:**
- Ignoring documentation
- Skipping workflow steps
- Not using templates
- Making up own process

---

### Rule 5: Maintain Code Quality

**✅ REQUIRED:**
- Follow coding-rules.md in Phase 4
- Follow service-specific coding rules
- Maintain code quality standards
- Pass all quality gates

**❌ PROHIBITED:**
- Violating coding standards
- Skipping quality checks
- Compromising on quality
- Merging low-quality code

---

### Rule 6: Respect Service Boundaries

**✅ REQUIRED:**
- Use service-map.md to identify services
- Modify only necessary services
- Respect service ownership
- Maintain service boundaries

**❌ PROHIBITED:**
- Modifying wrong services
- Violating service boundaries
- Cross-service data access
- Bypassing API contracts

---

### Rule 7: Document Everything

**✅ REQUIRED:**
- Document task summary in Phase 1
- Document implementation plan in Phase 3
- Document execution summary in Phase 4
- Document test results in Phase 5
- Document PR description in Phase 6

**❌ PROHIBITED:**
- Skipping documentation
- Incomplete documentation
- Vague descriptions
- Missing summaries

---

### Rule 8: Safety First

**✅ REQUIRED:**
- Validate before implementing
- Test before PR
- Have rollback plan
- Preserve backward compatibility

**❌ PROHIBITED:**
- Risking system stability
- Breaking existing functionality
- Skipping validation
- No rollback plan

---

### Rule 9: Missing Environment Variables (CRITICAL)

**🚨 ABSOLUTE RULE: Missing environment variables MUST NOT terminate the workflow.**

**✅ REQUIRED:**
- When encountering missing env vars (STRIPE_SECRET_KEY, API_KEY, DATABASE_URL, etc.):
  1. Ask the user ONCE for the missing value
  2. Store it immediately in the relevant .env file
  3. Reload environment and continue execution automatically
  4. NEVER ask for the same variable again (check .env first)
- Continue through all phases: Testing → Git → PR → Ticket closure
- Configuration values are persistent once provided

**❌ PROHIBITED:**
- Stopping the workflow when environment variables are missing
- Asking for the same environment variable multiple times
- Failing to store provided values in .env files
- Saying "ready for testing" or "implementation complete" and stopping after fixing env vars
- Skipping phases due to missing configuration

**Examples of Required Environment Variables:**
- STRIPE_SECRET_KEY
- API_KEY
- DATABASE_URL
- JWT_SECRET
- Any other service-specific configuration values

---

## Phase Transition Criteria

### From Phase 1 to Phase 2

**Can Proceed When:**
- [x] Task information extracted completely
- [x] Requirement analyzed and understood
- [x] Services identified (tentative)
- [x] Task type classified
- [x] Changes identified
- [x] Completeness validated
- [x] Structured task summary created
- [x] Requirements are complete (not "Needs Clarification")

**Cannot Proceed When:**
- Requirements incomplete
- Missing critical information
- Task unclear
- Services cannot be identified

---

### From Phase 2 to Phase 3

**Can Proceed When:**
- [x] Architecture overview read and understood
- [x] Service map read and understood
- [x] Service identification validated
- [x] Architecture boundaries confirmed
- [x] Communication patterns identified

**Cannot Proceed When:**
- Architecture not understood
- Service identification incorrect
- Service boundaries violated

---

### From Phase 3 to Phase 4

**Can Proceed When:**
- [x] Planning document complete
- [x] All sections filled out
- [x] Implementation plan defined
- [x] Architecture validation passed
- [x] Risks assessed and mitigated
- [x] Testing strategy defined
- [x] Rollback plan documented
- [x] All checklist items passed

**Cannot Proceed When:**
- Planning incomplete
- Architecture validation failed
- No rollback plan
- Testing not defined

---

### From Phase 4 to Phase 5

**Can Proceed When:**
- [x] All planned changes implemented
- [x] Code follows coding standards
- [x] TypeScript compiles successfully
- [x] Service builds without errors
- [x] Service starts without crashes
- [x] Changes documented

**Cannot Proceed When:**
- Implementation incomplete
- Build fails
- Service doesn't start
- Coding standards violated

---

### From Phase 5 to Phase 6

**Can Proceed When:**
- [x] All tests passed
- [x] Zero critical issues
- [x] Zero major issues
- [x] Minor issues fixed or documented
- [x] Test summary generated
- [x] Service builds successfully
- [x] Service runs without errors

**Cannot Proceed When:**
- Tests failing
- Critical issues present
- Major issues present
- Test summary incomplete

---

### From Phase 6 to Complete

**Can Consider Complete When:**
- [x] PR created successfully
- [x] PR description complete
- [x] No merge conflicts
- [x] Ready for review
- [x] All documentation complete

---

## Error Handling and Recovery

### Phase 1 Errors: Incomplete Requirements

**Symptom:** Cannot extract required information

**Recovery:**
1. Identify missing information
2. Create clarification request
3. Submit to task assignee
4. Wait for response
5. Re-process task when clarification received
6. Do NOT proceed to Phase 2

---

### Phase 2 Errors: Service Identification Conflict

**Symptom:** Service identification doesn't match architecture

**Recovery:**
1. Re-read service-map.md
2. Re-read architecture-overview.md
3. Re-evaluate service mapping
4. Validate against service ownership rules
5. Correct service identification
6. Proceed to Phase 3 when correct

---

### Phase 3 Errors: Architecture Validation Failed

**Symptom:** Plan violates architecture principles

**Recovery:**
1. Identify architecture violation
2. Review service boundaries
3. Modify plan to respect boundaries
4. Re-validate architecture
5. Update implementation plan
6. Proceed when validation passes

---

### Phase 4 Errors: Build Failure

**Symptom:** Code doesn't compile or build

**Recovery:**
1. Read error messages
2. Fix compilation errors
3. Fix syntax errors
4. Verify dependencies
5. Rebuild until successful
6. Do NOT proceed to Phase 5 until build succeeds

---

### Phase 5 Errors: Test Failures

**Symptom:** Tests failing or issues found

**Recovery:**

**Critical Issues:**
1. STOP immediately
2. Fix critical issue
3. Re-test
4. Do NOT proceed to Phase 6 until all critical issues resolved

**Major Issues:**
1. Fix major issue
2. Re-test
3. Document fix
4. Proceed when all major issues resolved

**Minor Issues:**
1. Attempt automatic fix
2. Re-test
3. Document if cannot fix
4. May proceed if documented appropriately

---

### Phase 6 Errors: PR Creation Failure

**Symptom:** Cannot create PR or merge conflicts

**Recovery:**
1. Identify error (push failure, merge conflict, etc.)
2. Resolve error
3. Re-test if code changes made
4. Retry PR creation
5. Proceed when PR created successfully

---

## Workflow Diagrams

### High-Level Workflow

```
┌─────────────────────────────────────────────────────────────┐
│             HARBOR AI MASTER WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘

    Azure DevOps
         Task
          │
          ▼
   ┌──────────────┐
   │  PHASE 1     │  Task Intake
   │              │  → task-intake.md
   │  Extract &   │
   │  Understand  │
   │  Requirements│
   └──────┬───────┘
          │ Complete Requirements
          ▼
   ┌──────────────┐
   │  PHASE 2     │  System Understanding
   │              │  → architecture-overview.md
   │  Validate    │  → service-map.md
   │  Architecture│
   └──────┬───────┘
          │ Services Validated
          ▼
   ┌──────────────┐
   │  PHASE 3     │  Planning
   │              │  → planning.md
   │  Create      │
   │  Plan        │
   └──────┬───────┘
          │ Plan Complete
          ▼
   ┌──────────────┐
   │  PHASE 4     │  Execution
   │              │  → execution.md
   │  Implement   │  → coding-rules.md
   │  Changes     │
   └──────┬───────┘
          │ Implementation Complete
          ▼
   ┌──────────────┐
   │  PHASE 5     │  Testing
   │              │  → testing.md
   │  Validate    │
   │  Changes     │
   └──────┬───────┘
          │ All Tests Pass
          ▼
   ┌──────────────┐
   │  PHASE 6     │  Pull Request
   │              │  → pr.md
   │  Create PR   │
   └──────┬───────┘
          │ PR Created
          ▼
    Pull Request
      Submitted
```

### Detailed Decision Flow

```
                    ┌──────────────┐
                    │ Azure DevOps  │
                    │ Task Received │
                    └───────┬──────┘
                            │
                ┌───────────▼───────────┐
                │   PHASE 1: INTAKE     │
                └───────────┬───────────┘
                            │
                    ┌───────▼───────┐
                    │ Requirements  │
                    │  Complete?    │
                    └───────┬───────┘
                            │
                   ┌────────┴────────┐
                   │                 │
                 YES                NO
                   │                 │
         ┌─────────▼─────────┐       │
         │   PHASE 2:        │       │
         │   UNDERSTANDING   │       │
         └─────────┬─────────┘       │
                   │                 │
         ┌─────────▼─────────┐       │
         │ Services          │       │
         │ Identified?       │       │
         └─────────┬─────────┘       │
                   │                 │
          ┌────────┴────────┐        │
          │                 │        │
        YES                NO       │
          │                 │        │
  ┌───────▼───────┐         │        │
  │  PHASE 3:     │         │        │
  │  PLANNING     │         │        │
  └───────┬───────┘         │        │
          │                 │        │
  ┌───────▼───────┐         │        │
  │  Plan         │         │        │
  │  Valid?       │         │        │
  └───────┬───────┘         │        │
          │                 │        │
  ┌───────┴────────┐        │        │
  │                │        │        │
YES               NO       │        │
  │                │        │        │
  │    ┌───────────▼──┐     │        │
  │    │ Fix Plan     │     │        │
  │    │ Re-validate  │─────┘        │
  │    └───────────┬──┘              │
  │                │                 │
  │    ┌───────────▼──┐              │
  ▼    ▼              ▼              ▼
┌────────────────────────────────────┐
│   PHASE 4: EXECUTION               │
└────────────┬───────────────────────┘
             │
     ┌───────▼───────┐
     │ Implementation│
     │ Complete?     │
     └───────┬───────┘
             │
    ┌────────┴────────┐
    │                 │
  YES               NO
    │                 │
    │    ┌───────────▼──┐
    │    │ Fix Issues   │
    │    │ Re-implement │
    │    └───────────┬──┘
    │                │
    │    ┌───────────▼──┐
    ▼    ▼              ▼
┌────────────────────────────────────┐
│   PHASE 5: TESTING                 │
└────────────┬───────────────────────┘
             │
     ┌───────▼───────┐
     │ All Tests     │
     │ Pass?         │
     └───────┬───────┘
             │
    ┌────────┴────────┐
    │                 │
  YES               NO
    │                 │
    │    ┌───────────▼──┐
    │    │ Fix Issues   │
    │    │ Re-test      │
    │    └───────────┬──┘
    │                │
    │    ┌───────────▼──┐
    ▼    ▼              ▼
┌────────────────────────────────────┐
│   PHASE 6: PULL REQUEST            │
└────────────┬───────────────────────┘
             │
     ┌───────▼───────┐
     │ PR Created    │
     │ Successfully? │
     └───────┬───────┘
             │
    ┌────────┴────────┐
    │                 │
  YES               NO
    │                 │
    │    ┌───────────▼──┐
    │    │ Fix Issues   │
    │    │ Retry        │
    │    └───────────┬──┘
    │                │
    ▼                ▼
┌────────────┐  ┌────────────┐
│ WORKFLOW   │  │ HANDLE     │
│ COMPLETE   │  │ ERROR      │
└────────────┘  └────────────┘
```

---

## Quick Reference

### Phase Quick Reference

| Phase | Name | Documentation | Key Output | Cannot Proceed If |
|-------|------|---------------|------------|-------------------|
| 1 | Task Intake | task-intake.md | Task summary | Requirements incomplete |
| 2 | System Understanding | architecture-overview.md, service-map.md | Validated services | Architecture misunderstood |
| 3 | Planning | planning.md | Implementation plan | Plan incomplete or invalid |
| 4 | Execution | execution.md, coding-rules.md | Implemented code | Build fails or service crashes |
| 5 | Testing | testing.md | Test results | Tests failing or critical issues |
| 6 | Pull Request | pr.md | Pull request | Previous phases incomplete |

### Documentation Quick Reference

| Documentation | Used In Phase | Purpose |
|---------------|---------------|---------|
| task-intake.md | 1 | Process Azure DevOps tasks |
| architecture-overview.md | 2, 3 | Understand system architecture |
| service-map.md | 2, 3, 4 | Identify correct services |
| coding-rules.md | 4 | Follow coding standards |
| planning.md | 3 | Create implementation plan |
| execution.md | 4 | Implement changes correctly |
| testing.md | 5 | Validate all changes |
| pr.md | 6 | Create pull request |

### Command Quick Reference

**Phase 1: Task Intake**
```bash
# No commands required
# Read and analyze Azure DevOps ticket
```

**Phase 2: System Understanding**
```bash
# No commands required
# Read documentation files
```

**Phase 3: Planning**
```bash
# No commands required
# Create planning document
```

**Phase 4: Execution**
```bash
# Build service
npm run build

# Start service
npm run start

# Test endpoint
curl http://localhost:3001/api/endpoint
```

**Phase 5: Testing**
```bash
# TypeScript compilation
npx tsc --noEmit

# Build service
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

**Phase 6: Pull Request**
```bash
# Create branch
git checkout -b feature/HARBOR-XXX-description

# Stage changes
git add <files>

# Commit changes
git commit -m "HARBOR-XXX: Description"

# Push branch
git push -u origin feature/HARBOR-XXX-description

# Create PR
gh pr create --base dev --title "HARBOR-XXX: Description"
```

### Success Criteria Quick Reference

**Phase 1 Success:**
- [x] Task summary created
- [x] Services identified
- [x] Requirements complete

**Phase 2 Success:**
- [x] Architecture understood
- [x] Services validated

**Phase 3 Success:**
- [x] Planning document complete
- [x] Architecture validated

**Phase 4 Success:**
- [x] Implementation complete
- [x] Service builds and runs

**Phase 5 Success:**
- [x] All tests pass
- [x] No critical/major issues

**Phase 6 Success:**
- [x] PR created
- [x] Ready for review

---

## Autonomous Workflow Continuation

### Overview

This section defines the **mandatory autonomous execution behavior** for the Harbor AI agent. The agent must execute the complete development workflow automatically without stopping after intermediate stages, ensuring end-to-end task completion from task intake through ticket closure.

### Core Principle

**The Harbor AI agent must execute the complete development lifecycle autonomously:**

```
Task Intake → Planning → Execution → Testing →
Pull Request Creation → Azure DevOps Ticket Update
```

**This pipeline must execute without interruption, pauses, or requests for user confirmation.**

---

### Mandatory Continuous Execution

**Rule 1: Complete Workflow Execution**

The Harbor AI agent **MUST** execute the complete workflow through all stages:

1. **Phase 1: Task Intake**
   - Parse Azure DevOps task
   - Identify affected services
   - Create task summary

2. **Phase 2: System Understanding**
   - Read architecture documentation
   - Validate service identification
   - Understand dependencies

3. **Phase 3: Planning**
   - Create implementation plan
   - Document API changes
   - Document database changes
   - Plan testing strategy

4. **Phase 4: Execution**
   - Implement code changes
   - Follow coding standards
   - Add validation and error handling

5. **Phase 5: Testing**
   - Build service successfully
   - Run all tests
   - Validate changes
   - Verify integration points

6. **Phase 6: Pull Request Creation**
   - Create feature branch
   - Commit changes
   - Push to remote
   - Create Pull Request

7. **Phase 7: Azure DevOps Ticket Update**
   - Update ticket status to "Closed"
   - Add PR link and implementation summary

**The agent MUST NOT stop between phases. The workflow must continue automatically from start to finish.**

---

### Rule 2: Post-Testing Automatic Continuation

**After completing the Testing stage (Phase 5), the agent MUST:**

❌ **MUST NOT:**
- Stop and display "Next Steps"
- Ask user for manual testing
- Request confirmation to proceed
- Display "Would you like me to continue?"
- Pause or wait for user input

✅ **MUST AUTOMATICALLY:**
1. **Create Feature Branch**
   - Use branch naming convention: `feature/<ticket-id>-short-description`
   - Switch to new branch
   - Verify branch is clean

2. **Commit Changes**
   - Stage all relevant files
   - Create commit with descriptive message
   - Include ticket ID in commit message
   - Add co-authorship attribution

3. **Push to Remote**
   - Push branch to remote repository
   - Verify push succeeded
   - Confirm branch is visible on GitHub

4. **Create Pull Request**
   - Create PR targeting `dev` branch
   - Use PR title format: `[<ticket-id>] Short description`
   - Include complete PR description with:
     - Azure DevOps ticket ID
     - Implementation summary
     - List of modified services
     - Files modified
     - Testing summary
     - Breaking changes (if any)
   - Verify PR is ready for review

5. **Update Azure DevOps Ticket**
   - Change ticket status to "Closed"
   - Add comment with:
     - Pull Request link
     - Branch name
     - Implementation summary
   - Confirm ticket update succeeded

**This entire sequence must happen automatically without user intervention.**

---

### Rule 3: Post-Execution Automatic Continuation

**🚨 CRITICAL RULE - NEVER STOP AFTER IMPLEMENTATION:**

**After completing the Execution stage (Phase 4), the agent MUST:**

❌ **MUST NOT:**
- Say "Development done" and stop
- Say "Implementation completed" and stop
- Say "Ready for testing" and stop
- Say "Ready for deployment" and stop
- Say "The feature is fully implemented" and stop
- Display any completion message and stop execution
- Wait for user input or confirmation
- Ask "Should I continue to testing?"
- Display implementation summary and stop

✅ **MUST AUTOMATICALLY:**
1. **Verify Build Success**
   - Confirm service builds without errors
   - Verify no TypeScript compilation errors
   - Check service starts successfully

2. **IMMEDIATELY Continue to Testing**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/testing.md`
   - Execute all testing phases
   - Run all tests
   - Validate changes
   - Verify integration points

3. **Continue to PR Creation**
   - After tests pass, create feature branch
   - Commit and push changes
   - Create Pull Request

4. **Complete Ticket Closure**
   - Update Azure DevOps ticket status
   - Add PR link to ticket
   - Confirm ticket is closed

**🚨 THIS IS NOT OPTIONAL - EXECUTION IS ONLY PHASE 4 OF 7**

**The workflow is:** Planning → Execution → Testing → PR → Ticket Closure

**You are at Phase 4. There are 3 MORE PHASES to complete. DO NOT STOP.**

**Rationale:**
The Execution phase is ONLY the implementation step. It is NOT the final step. The agent must continue through testing, PR creation, and ticket closure to complete the autonomous development lifecycle.

---

### Rule 4: Prohibited Messages and Behaviors

**The agent MUST NOT display or communicate the following:**

❌ **Prohibited Messages:**
- "Next Steps:" followed by manual instructions
- "You should now test this manually"
- "Would you like me to continue?"
- "Should I create a pull request?"
- "Do you want me to push the changes?"
- "Please verify and then I'll create a PR"
- "Let me know if you want me to proceed"
- Any message asking for permission to continue

❌ **Prohibited Behaviors:**
- Stopping after testing phase
- Presenting options or menus
- Requesting manual confirmation between phases
- Waiting for user approval to create PR
- Displaying "what's next" options
- Offering alternative paths

**Rationale:**
When Harbor AI is activated, the user expects complete task execution, not partial implementation followed by a request to continue. The agent's responsibility includes the full development lifecycle.

---

### Rule 5: Complete Lifecycle Responsibility

**The Harbor AI agent must assume responsibility for:**

✅ **Full Development Lifecycle:**
1. **Implementation**
   - Write code changes
   - Follow architectural patterns
   - Implement features and fixes

2. **Validation**
   - Build service successfully
   - Run all tests
   - Verify changes work correctly
   - Test integration points

3. **Code Commit**
   - Create appropriate branches
   - Commit changes with proper messages
   - Follow commit standards

4. **Pull Request Creation**
   - Create comprehensive PRs
   - Include complete descriptions
   - Target appropriate branches
   - Ensure PR is review-ready

5. **Ticket Completion**
   - Update Azure DevOps tickets
   - Close completed tasks
   - Link PRs to tickets
   - Document implementation

**The agent is NOT just an implementation assistant—it is a complete development automation system.**

---

### Rule 6: Conditions for Stopping

**The agent MUST ONLY stop and request user input when:**

1. **Build Failure**
   - Service fails to compile
   - TypeScript errors cannot be resolved
   - Dependency conflicts cannot be automatically resolved
   - Build configuration issues

2. **Test Failure**
   - Automated tests fail after implementation
   - Test failures cannot be automatically fixed
   - Critical issues are detected during testing
   - Integration tests fail

3. **Missing Requirements**
   - Task description is incomplete
   - Acceptance criteria are not defined
   - API specifications are missing
   - Database changes are unclear
   - Service to modify is not specified

4. **Ambiguous Requirements**
   - Multiple valid interpretations exist
   - Conflicting requirements are present
   - Technical approach is unclear
   - Architectural decisions are needed

5. **Authentication/Access Issues**
   - Cannot connect to Azure DevOps
   - Cannot push to remote repository
   - Missing credentials or permissions

**In all other cases, the agent MUST continue autonomously through the complete workflow.**

---

### Rule 7: Successful Completion Criteria

**A task is considered successfully completed when:**

- ✅ All workflow phases completed
- ✅ Service builds successfully
- ✅ All tests pass
- ✅ Feature branch created
- ✅ Changes committed and pushed
- ✅ Pull Request created and ready for review
- ✅ Azure DevOps ticket updated to "Closed"
- ✅ PR link added to ticket

**At this point, the agent should:**
- Generate completion summary
- Log all actions taken
- Report successful task completion
- Check for additional tasks
- If tasks exist: Begin next task autonomously
- If no tasks: Enter standby mode

---

### Autonomous Execution Flowchart

```
┌─────────────────────────────────────────────────────────────┐
│          HARBOR AI - AUTONOMOUS EXECUTION MODE             │
└─────────────────────────────────────────────────────────────┘

   START: User activates Harbor AI
      ↓
   Fetch highest priority Azure DevOps task
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 1: Task Intake                                 │
   │ • Parse task requirements                            │
   │ • Identify affected services                         │
   │ • Create task summary                                │
   └──────────────────────────────────────────────────────┘
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 2: System Understanding                        │
   │ • Read architecture docs                             │
   │ • Validate service identification                    │
   │ • Understand dependencies                            │
   └──────────────────────────────────────────────────────┘
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 3: Planning                                    │
   │ • Create implementation plan                         │
   │ • Document changes                                   │
   │ • Plan testing strategy                              │
   └──────────────────────────────────────────────────────┘
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 4: Execution                                   │
   │ • Implement code changes                             │
   │ • Follow coding standards                            │
   │ • Add validation & error handling                    │
   └──────────────────────────────────────────────────────┘
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 5: Testing                                     │
   │ • Build service                                      │
   │ • Run tests                                          │
   │ • Validate changes                                   │
   └──────────────────────────────────────────────────────┘
      ↓
   🚨 CRITICAL DECISION POINT 🚨
   │
   ├─ Build failed? → STOP, report error, request input
   ├─ Tests failed? → STOP, report error, request input
   └─ Success? → CONTINUE AUTOMATICALLY ⬇️
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 6: Pull Request Creation                       │
   │ • Create feature branch                              │
   │ • Commit changes                                     │
   │ • Push to remote                                     │
   │ • Create Pull Request                                │
   │ • Target: dev branch                                 │
   └──────────────────────────────────────────────────────┘
      ↓
   ┌──────────────────────────────────────────────────────┐
   │ PHASE 7: Azure DevOps Ticket Update                  │
   │ • Update ticket status to "Closed"                   │
   │ • Add PR link and summary                            │
   │ • Confirm ticket updated                             │
   └──────────────────────────────────────────────────────┘
      ↓
   ✅ TASK COMPLETE
   │
   ├─ Generate completion summary
   ├─ Check for additional tasks
   ├─ Tasks exist? → Begin next task autonomously
   └─ No tasks? → Enter standby mode
```

---

### Examples of Proper Autonomous Behavior

#### Example 1: Successful Autonomous Execution

**Input:**
```
User: "Start Harbor AI"
```

**Agent Behavior:**
```
✅ Fetch tasks from Azure DevOps
✅ Select highest priority task
✅ Phase 1: Task Intake - Parse task
✅ Phase 2: System Understanding - Read docs
✅ Phase 3: Planning - Create plan
✅ Phase 4: Execution - Implement feature
✅ Phase 5: Testing - Build and test
✅ Phase 6: Create branch, commit, push, create PR
✅ Phase 7: Update ticket to Closed
✅ Generate completion summary
✅ Check for next task
```

**Output:**
```
Task HARBOR-1234 completed successfully.

Branch: feature/1234-add-user-filtering
Pull Request: https://github.com/org/repo/pull/56
Ticket: Updated to Closed

Beginning next task: HARBOR-1235...
```

#### Example 2: Stop Condition - Build Failure

**Input:**
```
User: "Start Harbor AI"
```

**Agent Behavior:**
```
✅ Fetch tasks from Azure DevOps
✅ Select highest priority task
✅ Phase 1-4: Complete successfully
✅ Phase 5: Testing
   ❌ Build failed with TypeScript errors
   ❌ Cannot resolve automatically

STOP and report:
"Build failed during testing phase.
Error: 15 TypeScript errors found
Location: harbor-users/service/usersController.ts

Unable to resolve automatically. Please review errors and provide guidance."
```

---

### Summary: Autonomous Execution Mandate

**✅ MANDATORY BEHAVIOR:**
- Execute complete workflow without stopping
- Continue automatically through all phases
- Create PR after successful testing
- Update Azure DevOps ticket after PR creation
- Only stop for build/test failures or missing requirements
- Assume full lifecycle responsibility

**❌ PROHIBITED BEHAVIOR:**
- Stopping after testing phase
- Asking "Should I continue?"
- Displaying "Next Steps" for manual execution
- Requesting permission to create PR
- Offering options or menus
- Treating PR creation as optional

**🎯 CORE PRINCIPLE:**
Harbor AI is an autonomous development system, not a code generation assistant. When activated, it must complete the full development lifecycle from task intake through ticket closure without manual intervention.

---

## Conclusion

This master workflow document defines the complete, end-to-end process that Harbor-AI must follow when implementing development tasks. By strictly adhering to this workflow, Harbor-AI ensures:

1. **Quality** - Every phase has validation criteria
2. **Safety** - Architecture and coding standards enforced
3. **Consistency** - Standardized process for all tasks
4. **Traceability** - Complete documentation at each phase
5. **Reliability** - Thorough testing before PR

**Remember:**
- Follow phases in order
- Never skip phases
- Always use relevant documentation
- Maintain code quality
- Respect service boundaries
- Document everything
- Test thoroughly
- Safety first

**Workflow Success = High-Quality, Safe, and Reliable Software Development**

---

**END OF MASTER WORKFLOW DOCUMENT**

---

*For questions or issues related to this workflow, refer to:*
- Individual phase documentation files
- Architecture documentation
- Service ownership maps
- Coding standards
*This document coordinates all other Harbor AI documentation files.*