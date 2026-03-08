# Harbor AI - Task Intake Protocol

**Document Version:** 1.0.0
**Last Updated:** 2025-03-06
**Owner:** Harbor AI Development Team

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Prerequisites](#prerequisites)
3. [Task Intake Workflow](#task-intake-workflow)
4. [Task Type Classification](#task-type-classification)
5. [Change Type Identification](#change-type-identification)
6. [Requirement Completeness Validation](#requirement-completeness-validation)
7. [Structured Task Summary](#structured-task-summary)
8. [Task Intake Examples](#task-intake-examples)
9. [Common Scenarios](#common-scenarios)
10. [Clarification Requests](#clarification-requests)
11. [Quick Reference Checklist](#quick-reference-checklist)

---

## Purpose and Scope

This document defines the **standard task intake protocol** that Harbor-AI must follow when receiving and processing Azure DevOps work items before beginning the planning phase.

### Objectives

- Convert unstructured Azure DevOps tickets into clear, structured development tasks
- Extract all relevant information needed for planning
- Identify affected services using the service map
- Classify task type and required changes
- Validate requirement completeness before planning
- Provide a standardized task summary for the planning phase

### When to Use This Protocol

**This protocol MUST be used when:**
- A new Azure DevOps work item is assigned to Harbor-AI
- Processing tickets before implementation
- Converting business requirements into technical tasks
- Analyzing feature requests, bug reports, or enhancements

**This protocol does NOT apply to:**
- Emergency hotfixes (use hotfix workflow)
- Routine monitoring tasks
- Documentation-only updates

### Task Intake Philosophy

The Harbor AI task intake approach follows these principles:

1. **Understand Before Planning** - Fully comprehend requirements before creating plans
2. **Structure Everything** - Convert unstructured tickets into structured tasks
3. **Verify Completeness** - Ensure all necessary information is present
4. **Identify Services Early** - Determine affected services before planning
5. **Flag Missing Info** - Request clarification rather than assume

---

## Prerequisites

### Mandatory Pre-Intake Reading

**Before processing ANY task, Harbor-AI MUST have access to:**

#### 1. System Architecture Documentation

**Read these files to understand the system:**
```
harbor-ai/architecture-overview.md
harbor-ai/service-map.md
harbor-ai/coding-rules.md
```

**What to Extract:**
- System overview and architecture
- Service responsibilities and boundaries
- Coding standards and constraints
- Communication patterns between services

#### 2. Azure DevOps Work Item

**Required Work Item Fields:**
- **Task ID** - Unique identifier (e.g., HARBOR-123)
- **Title** - Brief description of the task
- **Description** - Detailed requirement explanation
- **Acceptance Criteria** - Definition of done
- **Tags/Labels** - Classification tags
- **Assigned To** - Person or team responsible
- **Priority** - Importance level
- **Iteration/Sprint** - Target release

**Optional but Helpful Fields:**
- **Linked Work Items** - Related tasks, bugs, or features
- **Attachments** - Screenshots, documents, mockups
- **Repro Steps** - For bug reports
- **Expected Behavior** - For bug reports
- **Actual Behavior** - For bug reports

#### 3. Domain Knowledge

**Understanding of Harbor Platform:**
- Harbor is a job marketplace connecting employers and job seekers
- Microservices architecture with 10+ services
- Real-time communication via WebSocket
- Event-driven architecture with message queues
- JWT-based authentication with Redis caching

**Verification Checkpoint:**
- [ ] Architecture documentation read
- [ ] Service map understood
- [ ] Coding rules reviewed
- [ ] Azure DevOps work item accessed
- [ ] All required fields present

---

## Task Intake Workflow

### Step 1: Read the Work Item

#### 1.1 Extract Basic Information

**Read the Azure DevOps Ticket and Extract:**

**Task Identification:**
```markdown
**Task ID:** HARBOR-123
**Title:** Add job filtering by location and salary range
**Work Item Type:** User Story / Bug / Task
**Assigned To:** Harbor-AI
**Priority:** 2 (High)
**Iteration:** Sprint 42
**Created Date:** 2025-03-06
**Tags:** feature, api, job-service, frontend
```

**Task Description:**
```markdown
**Description:**
Users need the ability to filter jobs based on location and salary range
to find relevant opportunities. Currently, users can only view all jobs
or search by keywords. This feature should improve user engagement and
help job seekers find opportunities faster.

**Business Value:**
- Improves user experience
- Increases job application rates
- Reduces time-to-hire for employers
```

**Acceptance Criteria:**
```markdown
**Acceptance Criteria:**
1. Users can filter jobs by location (city, state, or remote)
2. Users can filter jobs by salary range (min and max)
3. Users can combine multiple filters
4. Filters are optional and composable
5. API returns paginated results
6. Performance: Query response time < 100ms
7. Mobile and web UI support filters
```

**Linked Work Items:**
```markdown
**Related Work Items:**
- HARBOR-100: Job search API foundation
- HARBOR-110: Pagination implementation
- HARBOR-095: Mobile app job search screen
```

**Attachments:**
```markdown
**Attachments:**
- mockups/filter-ui-design.png
- api-spec/job-filter-endpoint.yaml
```

#### 1.2 Extract Context Information

**Business Context:**
- Why is this task needed?
- What problem does it solve?
- Who are the stakeholders?
- What is the business impact?

**Technical Context:**
- Are there dependencies on other tasks?
- Is this part of a larger feature?
- Are there constraints or limitations?
- Are there non-functional requirements?

**Output of Step 1:** Complete extraction of all information from the Azure DevOps work item.

---

### Step 2: Understand the Requirement

#### 2.1 Analyze What Needs to Be Implemented

**Identify the Core Requirement:**

**Example Analysis:**
```markdown
**Core Requirement:**
Add filtering functionality to the job search API to allow users to
filter jobs by location and salary range.

**Sub-Requirements:**
1. Backend API must accept filter parameters
2. Database queries must support filtering
3. API must return paginated, filtered results
4. Frontend must provide filter UI
5. Mobile app must support filters
```

#### 2.2 Determine Expected Behavior

**Define Success Criteria:**

**Functional Requirements:**
```markdown
**What Should Work:**
- GET /api/jobs?location=Remote&salaryMin=50000 returns matching jobs
- GET /api/jobs?location=NewYork returns jobs in New York
- GET /api/jobs?salaryMin=80000&salaryMax=120000 returns jobs in range
- Combining filters: ?location=Remote&salaryMin=60000 works correctly
- Pagination works with filters: ?page=1&limit=20
```

**Non-Functional Requirements:**
```markdown
**Performance:**
- Query response time < 100ms
- Support concurrent filter requests
- Database indexes for filter columns

**Security:**
- Authenticated users only
- Input validation on all parameters
- Prevent SQL injection

**Scalability:**
- Handle 1000+ concurrent filter requests
- Cache popular filter combinations
```

#### 2.3 Identify Problem Being Solved

**Analyze Business Problem:**
```markdown
**Current Problem:**
Users cannot efficiently find relevant jobs. They must scroll through
all jobs or rely on keyword search, which is insufficient for location
and salary preferences.

**Impact:**
- Poor user experience
- Lower application rates
- Longer time-to-hire

**Solution:**
Add location and salary range filters to enable precise job matching.
```

**Output of Step 2:** Clear understanding of what needs to be implemented, expected behavior, and problem being solved.

---

### Step 3: Identify Affected Services

#### 3.1 Use Service Map

**Reference `harbor-ai/service-map.md`:**

**Service Ownership Analysis:**
```markdown
**Feature:** Job filtering functionality

**Service Mapping:**
- Job search API → job-service (PRIMARY)
- Job data access → job-service (PRIMARY)
- API Gateway routing → api-gateway (SECONDARY)
- Frontend UI → Not a service (client-side)
- Mobile app → Not a service (client-side)
```

**Verify Service Boundaries:**
```markdown
**What Belongs in Job Service:**
- Job filtering logic ✓
- Database queries for jobs ✓
- Filter validation ✓
- Filter API endpoint ✓

**What Does NOT Belong:**
- UI components (frontend)
- Mobile app code (mobile)
- User authentication (user-service)
- Email notifications (notification-service)
```

#### 3.2 Create Service Impact Table

**Map Each Change to Affected Service:**

| Change Component | Affected Service | Impact Level | Justification |
|-----------------|------------------|--------------|----------------|
| Job filter API endpoint | job-service | Primary | Core filtering logic |
| Database query updates | job-service | Primary | Data access layer |
| API Gateway route update | api-gateway | Secondary | Route registration |
| Input validation | job-service | Primary | Request validation |
| Filter business logic | job-service | Primary | Filtering implementation |

#### 3.3 Verify No Cross-Boundary Violations

**Check Service Ownership:**
```markdown
✓ Job filtering → job-service (correct)
✓ Job queries → job-service (correct)
✓ API routes → job-service (correct)
✗ User profile updates → user-service (different service)
✗ Email notifications → notification-service (different service)
✗ Real-time updates → socket-service (different service)
```

**Output of Step 3:** Clear identification of which services are affected, with justification for each.

---

### Step 4: Identify Task Type

#### 4.1 Classify the Task

**Determine Task Type from These Categories:**

#### **Feature**
**Definition:** New functionality or capability being added to the system

**Characteristics:**
- Adds new user-facing functionality
- Creates new API endpoints
- Introduces new business logic
- Expands system capabilities

**Examples:**
- Add job filtering API
- Implement user notifications
- Add real-time chat feature

**Indicators:**
- Title contains "Add", "Implement", "Create"
- Description talks about new capability
- Acceptance criteria describe new functionality

---

#### **Bug Fix**
**Definition:** Fix for incorrect or unexpected behavior in existing functionality

**Characteristics:**
- Existing feature doesn't work as expected
- System crashes or errors occur
- Data corruption or loss
- Performance degradation

**Examples:**
- Fix authentication token expiration
- Resolve database connection timeout
- Fix memory leak in job service

**Indicators:**
- Title contains "Fix", "Resolve", "Bug"
- Description mentions "error", "crash", "doesn't work"
- Work item type is "Bug"

---

#### **Enhancement**
**Definition:** Improvement to existing functionality without major changes

**Characteristics:**
- Improves existing feature
- Adds small new capability to existing feature
- Enhances user experience
- Optimizes performance

**Examples:**
- Add search suggestions to job search
- Improve error messages
- Add sorting options to job listing

**Indicators:**
- Title contains "Improve", "Enhance", "Update"
- Description mentions "better", "faster", "improved"
- Modifies existing functionality

---

#### **Refactor**
**Definition:** Code restructuring without changing external behavior

**Characteristics:**
- No functional changes
- Improves code quality
- Enhances maintainability
- Reduces technical debt

**Examples:**
- Refactor job service to use repository pattern
- Extract common validation logic
- Improve error handling consistency

**Indicators:**
- Title contains "Refactor", "Clean up", "Restructure"
- Description mentions "code quality", "maintainability"
- Acceptance criteria mention no functional changes

---

#### **Performance Improvement**
**Definition:** Optimization to improve system performance

**Characteristics:**
- Focuses on speed, scalability, or resource usage
- Reduces response times
- Increases throughput
- Decreases resource consumption

**Examples:**
- Optimize database queries for job search
- Add caching to job listing API
- Implement database connection pooling

**Indicators:**
- Title contains "Optimize", "Performance", "Cache"
- Description mentions "slow", "timeout", "performance"
- Acceptance criteria include performance metrics

#### 4.2 Task Type Determination

**Apply Classification to Example Task:**

```markdown
**Task:** Add job filtering by location and salary range

**Analysis:**
- New functionality? YES ✓
- Existing feature modified? NO
- Bug fix? NO
- Refactoring? NO
- Performance focus? NO

**Task Type:** FEATURE

**Justification:**
This task adds new filtering capability to the job search API,
which didn't exist before. It's a new user-facing feature that
expands the system's capabilities.
```

**Output of Step 4:** Clear task type classification with justification.

---

### Step 5: Identify Required Changes

#### 5.1 Determine Change Types

**Analyze What Type of Work is Needed:**

**Possible Change Types:**

##### **New API Endpoint**
**Indicators:**
- Task requires new HTTP endpoint
- New URL route needed
- New controller method required

**Example:**
```markdown
**Required:** Create GET /api/jobs/filter endpoint
- New route in job-service
- New controller method
- New service logic
- New repository queries
```

---

##### **API Modification**
**Indicators:**
- Existing endpoint needs changes
- Request/response format changing
- Adding parameters to existing endpoint

**Example:**
```markdown
**Required:** Modify GET /api/jobs to accept filter parameters
- Update existing route handler
- Add query parameter parsing
- Update response format (if needed)
```

---

##### **Database Schema Update**
**Indicators:**
- New table needed
- New columns needed
- Index changes
- Migration required

**Example:**
```markdown
**Required:** Add indexes for filter columns
- Create index on jobs.location
- Create index on jobs.salary_min
- Create migration file
```

---

##### **Service Logic Update**
**Indicators:**
- New business rules
- New validation logic
- New processing steps
- Algorithm changes

**Example:**
```markdown
**Required:** Implement filter business logic
- Parse filter parameters
- Build dynamic queries
- Validate filter combinations
- Apply business rules
```

---

##### **Validation Changes**
**Indicators:**
- New input validation
- Updated validation rules
- New error messages
- Enhanced error handling

**Example:**
```markdown
**Required:** Add filter parameter validation
- Validate location format
- Validate salary range (min < max)
- Provide clear error messages
```

---

##### **Event or Socket Updates**
**Indicators:**
- Real-time notifications needed
- Event publishing
- WebSocket messages
- Event subscription

**Example:**
```markdown
**Required:** Publish event when job is filtered
- Publish job.filtered event
- Include filter criteria in event
```

---

##### **Notification Changes**
**Indicators:**
- Email notifications
- Push notifications
- In-app notifications
- SMS notifications

**Example:**
```markdown
**Required:** Notify users when matching jobs posted
- Send notification when new job matches filters
- Update notification preferences
```

#### 5.2 Create Change Inventory

**List All Required Changes:**

```markdown
**Required Changes for Task HARBOR-123:**

1. **New API Endpoint**
   - Create GET /api/jobs/filter in job-service
   - Add route: /api/jobs/filter
   - Implement controller method: getFilteredJobs

2. **Service Logic Update**
   - Implement filter parsing logic
   - Build dynamic database queries
   - Apply business rules for filters
   - Handle edge cases (no filters, invalid filters)

3. **Database Changes**
   - Add index on jobs.location column
   - Add index on jobs.salary_min and jobs.salary_max columns
   - Create migration file

4. **Validation Changes**
   - Add filter parameter validation
   - Validate location format (city, state, "Remote")
   - Validate salary range (min >= 0, max > min)

5. **API Gateway Update**
   - Register new route in api-gateway
   - Add route to job-service upstream

6. **Testing**
   - Unit tests for filter logic
   - Integration tests for API endpoint
   - Performance tests for query optimization

**Not Required:**
- No WebSocket changes (not real-time)
- No notification changes (not in scope)
- No frontend changes (separate task)
- No mobile app changes (separate task)
```

**Output of Step 5:** Complete inventory of all required changes, categorized by type.

---

### Step 6: Validate Requirement Completeness

#### 6.1 Check for Required Information

**Verify All Critical Information is Present:**

**Required for Features:**
- [ ] Clear feature description
- [ ] Acceptance criteria defined
- [ ] Expected behavior specified
- [ ] API requirements defined (if applicable)
- [ ] UI/UX requirements (if applicable)
- [ ] Business value identified

**Required for Bug Fixes:**
- [ ] Clear bug description
- [ ] Steps to reproduce
- [ ] Expected behavior
- [ ] Actual behavior
- [ ] Error messages/logs
- [ ] Impact assessment

**Required for All Tasks:**
- [ ] Task ID present
- [ ] Title clear and descriptive
- [ ] Priority assigned
- [ ] Assigned to clear
- [ ] Related work items linked (if applicable)

#### 6.2 Identify Missing Information

**Check for Common Gaps:**

**API Requirements:**
```markdown
⚠️ **Missing: API Request/Response Format**

**Question:** What should the API request/response look like?

**Needed:**
- Request format: Query parameters? Body?
- Response format: JSON structure?
- Status codes: 200, 400, 404?
- Error responses: Format and messages?

**Example of Missing Info:**
❌ "Add filter API"
✅ "Add GET /api/jobs/filter?location=Remote&salaryMin=50000
   Returns: { success: true, data: [...], pagination: {...} }"
```

**Business Rules:**
```markdown
⚠️ **Missing: Business Rules**

**Questions:**
- What constitutes a valid location?
- Can salary ranges overlap?
- Are there any restrictions on combinations?
- What's the maximum number of filters?

**Needed:**
- Clear business rules
- Validation requirements
- Edge case handling
- Constraints and limitations
```

**Performance Requirements:**
```markdown
⚠️ **Missing: Performance Requirements**

**Questions:**
- What's the acceptable response time?
- How many concurrent users?
- What's the expected data volume?

**Needed:**
- Response time requirements
- Throughput requirements
- Scalability requirements
- Performance targets
```

**Integration Points:**
```markdown
⚠️ **Missing: Integration Requirements**

**Questions:**
- Does this integrate with other features?
- Are there dependencies on other services?
- Will this affect existing functionality?

**Needed:**
- Integration points
- Dependencies
- Impact on existing features
- Migration requirements
```

#### 6.3 Flag Incomplete Requirements

**Determine if Task Can Proceed:**

**✅ **Requirements Complete - Can Proceed to Planning**
- All required information present
- Clear acceptance criteria
- API requirements defined
- Business rules specified
- Performance requirements known

**⚠️ **Minor Gaps - Can Proceed with Assumptions**
- Most information present
- Minor details missing (can assume standard patterns)
- Non-critical information missing
- Can clarify during planning

**❌ **Major Gaps - Needs Clarification**
- Core functionality unclear
- Missing acceptance criteria
- API requirements undefined
- Business rules missing
- Critical information absent

**Output of Step 6:** Assessment of requirement completeness with identification of missing information.

---

### Step 7: Prepare Structured Task Summary

#### 7.1 Create Task Summary Document

**Standard Task Summary Format:**

```markdown
# Task Summary: HARBOR-123

## Basic Information
- **Task ID:** HARBOR-123
- **Title:** Add job filtering by location and salary range
- **Task Type:** Feature
- **Priority:** 2 (High)
- **Assigned To:** Harbor-AI
- **Iteration:** Sprint 42

## Requirement Summary
Create a new API endpoint that allows users to filter jobs based on
location and salary range. Filters should be optional and composable,
enabling users to combine multiple filters for precise job matching.

## Business Context
**Problem:**
Users cannot efficiently find relevant jobs. Current job search only
supports keyword search, which is insufficient for location and salary
preferences.

**Solution:**
Add location and salary range filters to job search API.

**Business Value:**
- Improve user experience
- Increase job application rates
- Reduce time-to-hire for employers

## Affected Services

### Primary Service
- **job-service** - Implement filtering logic and API endpoint

### Secondary Services
- **api-gateway** - Register new route

### Not Affected
- user-service - No user-related changes
- notification-service - No notification changes
- socket-service - No real-time updates

## Expected Behavior

### Functional Requirements
1. Users can filter jobs by location (city, state, or "Remote")
2. Users can filter jobs by salary range (min and max)
3. Users can combine multiple filters
4. Filters are optional (can query with no filters)
5. API returns paginated results (default 20 items per page)
6. Invalid filters return clear error messages

### API Requirements
- **Endpoint:** GET /api/jobs/filter
- **Query Parameters:**
  - `location` (string, optional): City, state, or "Remote"
  - `salaryMin` (number, optional): Minimum salary
  - `salaryMax` (number, optional): Maximum salary
  - `page` (number, optional): Page number (default: 1)
  - `limit` (number, optional): Items per page (default: 20, max: 100)

- **Response Format (Success):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid",
        "title": "Software Engineer",
        "location": "Remote",
        "salaryMin": 80000,
        "salaryMax": 120000
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
  ```

- **Response Format (Error):**
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid salary range",
      "details": [
        {
          "field": "salaryMax",
          "message": "salaryMax must be greater than salaryMin"
        }
      ]
    }
  }
  ```

### Non-Functional Requirements
- **Performance:** Query response time < 100ms
- **Scalability:** Support 1000+ concurrent requests
- **Security:** Authenticated users only, input validation
- **Reliability:** Handle invalid inputs gracefully

## Required Changes

### 1. New API Endpoint
- Create GET /api/jobs/filter in job-service
- Implement controller method: getFilteredJobs
- Register route in api-gateway

### 2. Service Logic Update
- Implement filter parsing logic
- Build dynamic database queries
- Add filter validation
- Handle edge cases

### 3. Database Changes
- Add index on jobs.location column
- Add index on jobs.salary_min and jobs.salary_max columns
- Create migration file

### 4. Validation Changes
- Add filter parameter validation
- Validate location format
- Validate salary range (min < max)

### 5. Testing
- Unit tests for filter logic
- Integration tests for API endpoint
- Performance tests for query optimization

## Acceptance Criteria
1. ✓ Users can filter jobs by location
2. ✓ Users can filter jobs by salary range
3. ✓ Users can combine multiple filters
4. ✓ API returns paginated results
5. ✓ Performance: Query response time < 100ms
6. ✓ Invalid filters return clear error messages
7. ✓ Authentication required

## Dependencies
- HARBOR-100: Job search API foundation (Must complete first)
- HARBOR-110: Pagination implementation (Already complete)

## Out of Scope
- Frontend UI (separate task: HARBOR-125)
- Mobile app filters (separate task: HARBOR-126)
- Filter preferences saving (future enhancement)
- Advanced filters (skills, experience, etc.)

## Risk Assessment
- **Low Risk:** New endpoint, no existing functionality modified
- **Performance Risk:** High query volume may require optimization
- **Data Risk:** No data migration required

## Success Metrics
- API response time < 100ms
- 1000+ concurrent requests supported
- Zero bugs in production
- Positive user feedback

## Notes
- Follow existing API patterns in job-service
- Use parameterized queries to prevent SQL injection
- Consider caching popular filter combinations
- Document filter combinations in API docs
```

#### 7.2 Summary for Simple Tasks

**For Bug Fixes:**
```markdown
# Task Summary: HARBOR-456

## Basic Information
- **Task ID:** HARBOR-456
- **Title:** Fix authentication token validation error
- **Task Type:** Bug Fix
- **Priority:** 1 (Critical)

## Problem
Users receiving 401 errors when refreshing authentication tokens.
Root cause: Token validation logic incorrect in refresh endpoint.

## Affected Services
- **user-service** - Fix token validation

## Fix Required
Update token validation in authController.refreshToken method
to properly validate refresh token expiration and signature.

## Acceptance Criteria
- ✓ Valid refresh tokens return new access token
- ✓ Expired refresh tokens return 401 with clear error
- ✓ Invalid refresh tokens return 401 with clear error
```

**For Enhancements:**
```markdown
# Task Summary: HARBOR-789

## Basic Information
- **Task ID:** HARBOR-789
- **Title:** Add sorting options to job listing
- **Task Type:** Enhancement

## Enhancement
Add sorting capabilities to existing job listing API to allow
users to sort jobs by date, salary, and relevance.

## Affected Services
- **job-service** - Add sorting logic

## Changes Required
- Modify GET /api/jobs to accept sort parameter
- Implement sorting logic
- Add validation for sort field

## Acceptance Criteria
- ✓ Users can sort by date posted
- ✓ Users can sort by salary (high to low, low to high)
- ✓ Default sort: relevance
```

**Output of Step 7:** Complete structured task summary ready for planning phase.

---

### Step 8: Output for Planning Phase

#### 8.1 Prepare Planning Input

**Generate Structured Output:**

**After completing task intake, produce this output:**

```markdown
# Task Intake Complete

## Task Ready for Planning
**Task ID:** HARBOR-123
**Task Title:** Add job filtering by location and salary range
**Task Type:** Feature

## Planning Input

### Requirement Document
[Link to or include full task summary from Step 7]

### Affected Services
- Primary: job-service
- Secondary: api-gateway

### Required Changes
1. New API endpoint
2. Service logic update
3. Database schema update (indexes)
4. Validation changes

### Dependencies
- HARBOR-100: Job search API foundation

### Constraints
- Performance: < 100ms response time
- Security: Authenticated users only
- Compatibility: Must not break existing job search

### Risk Level
Low risk (new endpoint, no breaking changes)

## Next Steps
1. Review task summary
2. Proceed to planning.md
3. Create detailed implementation plan
4. Define testing strategy
5. Identify rollback plan

---
**Task Intake Status:** ✅ COMPLETE
**Ready for Planning:** ✅ YES
**Requirement Clarity:** ✅ CLEAR
```

#### 8.2 Handle Incomplete Requirements

**If Requirements Are Incomplete:**

```markdown
# Task Intake Incomplete

## Task Needs Clarification
**Task ID:** HARBOR-123
**Task Title:** Add job filtering by location and salary range

## Missing Information

### Critical Missing Information
❌ API request/response format not defined
❌ Business rules for filter validation not specified
❌ Performance requirements not stated
❌ Integration with existing features unclear

### Questions for Clarification

1. **API Format:**
   - Should filters be query parameters or request body?
   - What should the response format be?
   - What status codes should be returned?

2. **Business Rules:**
   - What constitutes a valid location?
   - Can salary ranges be negative?
   - What's the maximum number of filters?

3. **Performance:**
   - What's the acceptable response time?
   - How many concurrent users expected?

4. **Integration:**
   - Should filters be saved to user preferences?
   - Will this affect other job search features?

## Recommendation
**Status:** ❌ NEEDS CLARIFICATION
**Action:** Request clarification from task assignee
**Blocker:** Cannot proceed to planning without this information

## Next Steps
1. Submit clarification request
2. Wait for response
3. Update task summary with new information
4. Re-validate completeness
5. Proceed to planning when complete

---
**Task Intake Status:** ⚠️ INCOMPLETE
**Ready for Planning:** ❌ NO
**Action Required:** CLARIFICATION NEEDED
```

**Output of Step 8:** Clear indication of whether task is ready for planning or needs clarification.

---

## Task Type Classification

### Classification Decision Tree

```
                    ┌─────────────────┐
                    │   Read Task     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  What is the    │
                    │ primary goal?   │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │  New    │         │ Fix     │         │ Improve │
   │Feature? │         │ Problem?│         │Existing?│
   └────┬────┘         └────┬────┘         └────┬────┘
        │                   │                   │
      YES                 YES                 YES
        │                   │                   │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │ FEATURE │         │BUG FIX  │         │Enhance? │
   └─────────┘         └─────────┘         └────┬────┘
                                             │
                              ┌──────────────┼──────────────┐
                              │              │              │
                         ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
                         │ Code    │   │ Perf?  │   │ Restruc│
                         │ Quality?│   │         │   │ -ture?  │
                         └────┬────┘   └────┬────┘   └────┬────┘
                              │              │              │
                            YES            YES            YES
                              │              │              │
                         ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
                         │REFACTOR │   │PERF     │   │ENHANCE-│
                         │         │   │IMPROVE- │   │MENT    │
                         └─────────┘   │MENT     │   └─────────┘
                                       └─────────┘
```

### Quick Reference Guide

| Task Characteristic | Task Type | Example |
|---------------------|-----------|---------|
| Adds new functionality | Feature | Add job filtering API |
| Fixes broken behavior | Bug Fix | Fix authentication error |
| Improves existing feature | Enhancement | Add sorting to job list |
| Restructures code | Refactor | Extract repository layer |
| Optimizes performance | Performance | Add caching to API |

---

## Change Type Identification

### Change Type Matrix

| Change Type | Indicator | Example | Service Impact |
|-------------|-----------|---------|----------------|
| New API Endpoint | "Add endpoint", "Create API" | POST /api/jobs | High |
| API Modification | "Update endpoint", "Modify API" | Add filter param to GET /api/jobs | Medium |
| Database Schema | "Add table", "Add column", "Migration" | Create jobs table | High |
| Service Logic | "Implement logic", "Add validation" | Implement filter logic | Medium |
| Validation | "Add validation", "Improve errors" | Add input validation | Low |
| Event/Socket | "Publish event", "Real-time" | Publish job.created event | Medium |
| Notification | "Send email", "Notify user" | Send job alert email | Low |

### Change Type Examples

**New API Endpoint:**
```markdown
**Required:** Create POST /api/jobs
- New route
- New controller method
- New service logic
- New repository queries
```

**API Modification:**
```markdown
**Required:** Update GET /api/jobs to accept ?status=active
- Modify existing route handler
- Add query parameter parsing
- Update query logic
```

**Database Schema:**
```markdown
**Required:** Create jobs table
- Define table schema
- Create migration
- Run migration
- Update model
```

**Service Logic:**
```markdown
**Required:** Implement filter validation
- Add validation logic
- Return clear errors
- Handle edge cases
```

---

## Requirement Completeness Validation

### Completeness Checklist

#### For Features:
- [ ] Feature description clear
- [ ] Acceptance criteria defined
- [ ] Expected behavior specified
- [ ] API requirements defined (if applicable)
- [ ] UI/UX requirements (if applicable)
- [ ] Business value stated
- [ ] Success metrics defined

#### For Bug Fixes:
- [ ] Bug description clear
- [ ] Steps to reproduce provided
- [ ] Expected behavior stated
- [ ] Actual behavior described
- [ ] Error messages/logs included
- [ ] Impact assessed

#### For All Tasks:
- [ ] Task ID present
- [ ] Title descriptive
- [ ] Priority assigned
- [ ] Task type clear
- [ ] Dependencies identified
- [ ] Constraints noted

### Completeness Levels

**Level 1 - Complete (✅ Ready for Planning)**
- All required information present
- Clear acceptance criteria
- No ambiguity
- Can proceed directly to planning

**Level 2 - Mostly Complete (⚠️ Can Proceed with Assumptions)**
- Core information present
- Minor details missing
- Can assume standard patterns
- Can proceed, note assumptions in plan

**Level 3 - Incomplete (❌ Needs Clarification)**
- Critical information missing
- Unclear requirements
- Cannot make assumptions
- Must request clarification

---

## Task Intake Examples

### Example 1: Feature Addition

**Azure DevOps Ticket:**
```markdown
**Title:** Add user profile photo upload

**Description:**
Users should be able to upload a profile photo. The photo should be
stored in Azure Blob Storage and the URL should be saved in the user
profile.

**Acceptance Criteria:**
1. Users can upload JPEG, PNG, or GIF photos
2. Maximum file size: 5MB
3. Photos are automatically resized to 400x400
4. Photo URL is saved in user profile
5. Users can delete their photo

**Tags:** feature, user-service, storage
```

**Task Intake Output:**
```markdown
# Task Summary: HARBOR-201

## Basic Information
- **Task ID:** HARBOR-201
- **Title:** Add user profile photo upload
- **Task Type:** Feature

## Requirement Summary
Implement profile photo upload functionality for users. Photos will be
uploaded to Azure Blob Storage, resized to 400x400, and the URL will
be saved in the user profile.

## Affected Services
- **user-service** - Primary (upload endpoint, profile update)
- **shared-models** - Secondary (User model update)

## Expected Behavior
1. POST /api/users/profile-photo endpoint accepts file upload
2. Validates file type (JPEG, PNG, GIF)
3. Validates file size (max 5MB)
4. Uploads to Azure Blob Storage
5. Resizes image to 400x400
6. Saves photo URL to user profile
7. DELETE /api/users/profile-photo removes photo

## Required Changes
1. New API endpoint (POST /api/users/profile-photo)
2. Azure Blob Storage integration
3. Image processing (resize)
4. User model update (photoUrl field)
5. File validation logic

## Acceptance Criteria
- ✓ Supports JPEG, PNG, GIF
- ✓ Maximum file size 5MB
- ✓ Auto-resize to 400x400
- ✓ URL saved to profile
- ✓ Can delete photo
```

---

### Example 2: Bug Fix

**Azure DevOps Ticket:**
```markdown
**Title:** Fix: Job application not sent to employer

**Description:**
When a job seeker applies for a job, the employer is not receiving
the notification email. The application is being saved to the database
but the email notification is not being sent.

**Steps to Reproduce:**
1. Job seeker applies for a job
2. Application is saved successfully
3. Employer does not receive notification email

**Expected Behavior:**
Employer should receive email notification when someone applies

**Actual Behavior:**
Email notification is not sent

**Error Logs:**
[ERROR] Failed to send email: Connection timeout

**Priority:** 1 (Critical)
**Tags:** bug, notification-service, email
```

**Task Intake Output:**
```markdown
# Task Summary: HARBOR-302

## Basic Information
- **Task ID:** HARBOR-302
- **Title:** Fix: Job application not sent to employer
- **Task Type:** Bug Fix
- **Priority:** 1 (Critical)

## Problem
Job application notifications are not being sent to employers.
Applications are saved to database but email sending fails with
"Connection timeout" error.

## Affected Services
- **notification-service** - Primary (email sending logic)

## Root Cause
Email service connection timing out. Likely due to:
- Incorrect SMTP configuration
- Network connectivity issue
- Email service down
- Timeout value too low

## Fix Required
1. Verify SMTP configuration
2. Add retry logic for failed email sends
3. Increase timeout value
4. Add better error logging
5. Implement queue for email sending

## Acceptance Criteria
- ✓ Employer receives email when job seeker applies
- ✓ Email includes application details
- ✓ Failed sends are retried
- ✓ Clear error logging for failures
```

---

### Example 3: Incomplete Requirement

**Azure DevOps Ticket:**
```markdown
**Title:** Improve job search

**Description:**
The current job search is not good. We need to make it better.

**Priority:** 2
**Tags:** enhancement, job-service
```

**Task Intake Output:**
```markdown
# Task Intake Incomplete

## Task Needs Clarification
**Task ID:** HARBOR-403
**Title:** Improve job search

## Critical Missing Information

❌ **Problem Not Defined**
- What's wrong with current search?
- What makes it "not good"?

❌ **Requirements Not Specified**
- What improvements are needed?
- What's the expected behavior?

❌ **Acceptance Criteria Missing**
- How do we measure success?
- What are the specific requirements?

❌ **Scope Undefined**
- Is this a performance issue?
- Is this a functionality issue?
- Is this a UX issue?

## Questions for Clarification

1. **Current Issues:**
   - What specifically is wrong with current search?
   - Are there user complaints?
   - Any performance data?

2. **Improvements Needed:**
   - Better search algorithm?
   - More search filters?
   - Faster results?
   - Better relevance?

3. **Expected Behavior:**
   - What should the improved search do?
   - Any specific features needed?

4. **Success Criteria:**
   - How do we measure improvement?
   - What are the acceptance criteria?

## Recommendation
**Status:** ❌ NEEDS CLARIFICATION
**Action:** Reject task and request detailed requirements
**Blocker:** Cannot proceed without clear requirements
```

---

## Common Scenarios

### Scenario 1: Well-Defined Feature

**Characteristics:**
- Clear title and description
- Detailed acceptance criteria
- API requirements specified
- Business value stated
- Dependencies identified

**Action:**
✅ Proceed directly to planning phase

**Example:**
```markdown
**Title:** Add job bookmarking functionality

**Description:**
Users can bookmark jobs to save them for later. Bookmarks are stored
in the database and can be retrieved via API.

**Acceptance Criteria:**
1. POST /api/jobs/:id/bookmark bookmarks a job
2. DELETE /api/jobs/:id/bookmark removes bookmark
3. GET /api/users/bookmarks returns all bookmarks
4. Max 100 bookmarks per user

**Status:** ✅ Ready for planning
```

---

### Scenario 2: Vague Enhancement

**Characteristics:**
- Title says "improve" or "enhance"
- Description lacks specifics
- No clear acceptance criteria
- Subjective requirements

**Action:**
⚠️ Request clarification with specific questions

**Example:**
```markdown
**Title:** Improve job listing performance

**Description:**
The job listing is slow. Make it faster.

**Missing:**
- What's the current response time?
- What's the target response time?
- What's causing slowness?
- Any specific optimization areas?

**Status:** ⚠️ Needs clarification
```

---

### Scenario 3: Critical Bug with Good Details

**Characteristics:**
- Clear bug description
- Steps to reproduce provided
- Error logs included
- Impact assessed

**Action:**
✅ Proceed to planning (can start immediately)

**Example:**
```markdown
**Title:** Fix: Users cannot log in after password reset

**Description:**
After resetting password, users cannot log in with new password.

**Steps to Reproduce:**
1. User requests password reset
2. User sets new password
3. User tries to log in with new password
4. Login fails with "Invalid credentials"

**Error:** Password hash not being updated

**Status:** ✅ Ready for planning
```

---

### Scenario 4: Multi-Service Feature

**Characteristics:**
- Affects multiple services
- Complex integration required
- Multiple change types
- Higher risk

**Action:**
✅ Proceed to planning with emphasis on architecture validation

**Example:**
```markdown
**Title:** Implement real-time job notifications

**Description:**
When a new job is posted that matches a user's preferences, send
them a real-time notification via WebSocket.

**Affected Services:**
- job-service (publish event)
- socket-service (WebSocket notification)
- notification-service (manage preferences)

**Status:** ✅ Ready for planning (complex)
```

---

### Scenario 5: Missing Technical Details

**Characteristics:**
- Business requirement clear
- Technical implementation unclear
- API format not specified
- Data model undefined

**Action:**
⚠️ Can proceed with assumptions (document in plan)

**Example:**
```markdown
**Title:** Add user profile completion percentage

**Description:**
Show users how complete their profile is (0-100%).

**Missing:**
- Which fields count toward completion?
- How is percentage calculated?
- Where is this displayed?

**Action:** Proceed with standard assumptions
- All profile fields weighted equally
- API endpoint to calculate percentage
- Display in user profile header
- Note assumptions in plan

**Status:** ⚠️ Proceed with assumptions
```

---

## Clarification Requests

### How to Request Clarification

**When requirements are incomplete or unclear:**

#### 1. Identify Missing Information

Be specific about what's needed:
```markdown
**Clarification Needed for Task HARBOR-123**

**Missing Information:**

1. **API Request Format**
   - Question: Should filters be query parameters or request body?
   - Needed: To design API endpoint correctly

2. **Business Rules**
   - Question: What constitutes a valid location?
   - Needed: To implement validation logic

3. **Performance Requirements**
   - Question: What's the acceptable response time?
   - Needed: To optimize queries appropriately
```

#### 2. Provide Examples

Help the requester provide better information:
```markdown
**Example of Good Requirement:**

**Title:** Add job filtering by location

**Description:**
Create API endpoint GET /api/jobs?location=Remote that returns
jobs matching the location filter.

**API Response:**
{
  "success": true,
  "data": [...],
  "total": 150
}

**Acceptance Criteria:**
- Returns only jobs with matching location
- Returns 400 for invalid location
- Response time < 100ms
```

#### 3. Prioritize Questions

List questions in order of importance:
```markdown
**Critical Questions (Must Answer):**
1. What's the API request/response format?
2. What are the validation rules?

**Important Questions (Should Answer):**
3. What's the target performance?
4. Are there any constraints?

**Nice to Have:**
5. Any UI mockups available?
```

#### 4. Suggest Options

If multiple approaches exist, suggest options:
```markdown
**Question:** How should filters be specified?

**Option 1:** Query parameters
```
GET /api/jobs?location=Remote&salaryMin=50000
```
**Pros:** Simple, cacheable, RESTful
**Cons:** Limited complexity

**Option 2:** Request body
```
POST /api/jobs/filter
{
  "location": "Remote",
  "salaryMin": 50000
}
```
**Pros:** Flexible, supports complex filters
**Cons:** Not cacheable, less RESTful

**Recommendation:** Option 1 for simplicity, unless complex filters needed
```

### Clarification Template

```markdown
# Clarification Request: HARBOR-123

## Task Information
- **Task ID:** HARBOR-123
- **Title:** [Task Title]
- **Assigned To:** [Assignee]
- **Priority:** [Priority]

## Clarification Needed

### Critical Questions (Must Answer)
1. [Question 1]
   - Why needed: [Reason]
   - Impact: [What blocks]

2. [Question 2]
   - Why needed: [Reason]
   - Impact: [What blocks]

### Important Questions (Should Answer)
3. [Question 3]

4. [Question 4]

### Optional Questions (Nice to Have)
5. [Question 5]

## Suggestions (If Applicable)
[Provide options or recommendations]

## Examples (If Helpful)
[Show examples of good requirements]

## Next Steps
Please provide clarification by [Date] so we can proceed with planning.

---
**Status:** ⚠️ AWAITING CLARIFICATION
**Blocker:** Cannot proceed to planning
```

---

## Quick Reference Checklist

### During Task Intake

**Read Work Item:**
- [ ] Task ID extracted
- [ ] Title read
- [ ] Description read
- [ ] Acceptance criteria read
- [ ] Tags/labels noted
- [ ] Linked items reviewed

**Understand Requirement:**
- [ ] Core requirement identified
- [ ] Expected behavior defined
- [ ] Problem being solved understood
- [ ] Business value noted

**Identify Services:**
- [ ] Service map consulted
- [ ] Primary service(s) identified
- [ ] Secondary service(s) identified
- [ ] Service boundaries verified

**Classify Task:**
- [ ] Task type determined
- [ ] Change types identified
- [ ] Impact level assessed

**Validate Completeness:**
- [ ] Required information present
- [ ] Missing information noted
- [ ] Clarity assessed

**Prepare Summary:**
- [ ] Task summary created
- [ ] All changes listed
- [ ] Dependencies identified
- [ ] Risks assessed

### Before Proceeding to Planning

**If Requirements Complete:**
- [ ] Task summary reviewed
- [ ] All questions answered
- [ ] Services verified
- [ ] Ready for planning

**If Requirements Incomplete:**
- [ ] Missing info identified
- [ ] Clarification questions prepared
- [ ] Suggestions provided (if applicable)
- [ ] Clarification request sent

---

## Appendix: Task Intake Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    TASK INTAKE WORKFLOW                      │
└─────────────────────────────────────────────────────────────┘

   Step 1: Read Work Item
   └─ Extract task ID, title, description
   └─ Read acceptance criteria
   └─ Review tags and linked items
            ↓
   Step 2: Understand Requirement
   └─ Analyze what needs implementation
   └─ Define expected behavior
   └─ Identify problem being solved
            ↓
   Step 3: Identify Affected Services
   └─ Consult service-map.md
   └─ Map features to services
   └─ Verify service boundaries
            ↓
   Step 4: Identify Task Type
   └─ Classify: Feature, Bug Fix, Enhancement, etc.
   └─ Determine task characteristics
            ↓
   Step 5: Identify Required Changes
   └─ Determine change types needed
   └─ List all required modifications
            ↓
   Step 6: Validate Requirement Completeness
   └─ Check for required information
   └─ Identify missing information
   └─ Assess clarity
            ↓
   Decision Point
   ┌─────────────────┐
   │ Requirements    │
   │ Complete?       │
   └─────────────────┘
        ↓         ↓
      YES        NO
       ↓          ↓
   Step 7    Request
   Prepare   Clarification
   Summary   └─ Wait for response
   Summary       ↓
       │      Step 7
       │      Prepare Summary
       ↓          ↓
   Step 8    Step 8
   Output   Output
   for      for
   Planning Planning
       │          │
       └────┬─────┘
            ↓
      Ready for Planning Phase
```

---

**END OF TASK INTAKE PROTOCOL**

---

*For questions or issues related to task intake, please refer to:*
- `harbor-ai/architecture-overview.md` - System architecture
- `harbor-ai/service-map.md` - Service ownership
- `harbor-ai/coding-rules.md` - Coding standards
- `harbor-ai/planning.md` - Planning phase (next step)