# 🧠 Pre-Execution Intelligence Analysis

**Version:** 1.0.0
**Last Updated:** 2026-03-25
**Purpose:** Transform agent from task executor to system-aware decision maker

---

## 🚨 CRITICAL: This is the MANDATORY analysis phase for ALL tasks

**Before ANY code implementation, the agent MUST:**

1. ✅ Discover ALL repositories in workspace
2. ✅ Read ALL documentation files
3. ✅ Extract deep understanding of system
4. ✅ Analyze cross-repository impact
5. ✅ Identify shared services and dependencies
6. ✅ Detect conflicts and risks
7. ✅ Create structured execution plan

**🚨 This phase CANNOT be:**
- ❌ Skipped
- ❌ Bypassed
- ❌ Rushed
- ❌ Partially completed

---

## 🚫 STRICT RULE (NON-NEGOTIABLE)

**Before performing ANY code change, file creation, or implementation:**

- ❌ DO NOT write code immediately
- ❌ DO NOT create new services blindly
- ❌ DO NOT modify any repo without full understanding

✅ **ALWAYS complete the Pre-Execution Intelligence Analysis first**

---

## 📊 Step-by-Step Analysis Protocol

### 🔍 Step 1: Repository Discovery

**Objective:** Map the entire workspace and classify all repositories

**Action:**

```bash
# Navigate to workspace root
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/
cd ${WORKSPACE_ROOT}

# Find ALL git repositories
find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort
```

**Classify Each Repository:**

1. **Core Service** - Business logic service
   - Example: `harborUserSvc`, `harborJobSvc`
   - Characteristics: Contains business logic, has APIs, manages domain

2. **Shared Service** - Common package used by multiple services
   - Example: `shared-models`, `harborShared`
   - Characteristics: Library/package, no standalone runtime, HIGH IMPACT

3. **Infrastructure Service** - Gateway, auth, infrastructure
   - Example: `api-gateway`, `auth-service`
   - Characteristics: Cross-cutting concerns, used by multiple services

4. **Frontend Service** - UI/Frontend application
   - Example: `harborWebsite`
   - Characteristics: Client-side code, UI components

**Output Format:**

```markdown
### Repository Discovery

**Total Repositories Found:** X

**Classification:**

#### Core Services (Business Logic):
- harborUserSvc - User management service
- harborJobSvc - Job management service
- harborBlogSvc - Blog service

#### Shared Services (HIGH IMPACT):
- shared-models - Shared data models (CRITICAL - used by ALL)
- harborShared - Shared utilities (MEDIUM - used by backend services)

#### Infrastructure Services:
- api-gateway - API gateway
- harborNotificationSvc - Notification service
- socket-service - WebSocket service

#### Frontend Services:
- harborWebsite - Frontend (Next.js)
```

---

### 📂 Step 2: Documentation Intelligence Scan (CRITICAL)

**Objective:** Read and understand ALL documentation across ALL repositories

**🚨 CRITICAL: This is the MOST IMPORTANT step**

**Action:**

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

**Critical Files to Read (for EACH repo):**

1. **ARCHITECTURE.md** (MANDATORY)
   - Service overview
   - Microservice role
   - Cross-service relationships
   - Shared service classification
   - Dependency graph

2. **STRUCTURE.md** (MANDATORY)
   - Folder structure
   - Responsibilities of each layer
   - File organization

3. **DEPENDENCIES.md** (MANDATORY)
   - External dependencies
   - Internal dependencies
   - Shared packages used

4. **SERVICE_RULES.md** (CRITICAL)
   - Inter-service communication rules
   - DOs and DON'Ts
   - Service boundaries

5. **SHARED_SERVICES.md** (CRITICAL)
   - List of shared services/packages
   - How they are used
   - Dependency relationships

6. **CHANGE_IMPACT.md** (CRITICAL)
   - If this service is modified:
     - Which services are affected
     - Impact level (low/medium/high)
     - Safe change guidelines

7. **GIT_RULES.md** (MANDATORY)
   - 🚫 DO NOT push code
   - 🚫 DO NOT create/switch branches
   - ✅ Only local changes

**🚨 Validation Checklist:**

Before proceeding to Step 3, verify:

```markdown
### Documentation Reading Validation

**harbor-ai:**
- [ ] docs/ARCHITECTURE.md
- [ ] docs/STRUCTURE.md
- [ ] docs/DEPENDENCIES.md
- [ ] docs/SERVICE_RULES.md
- [ ] docs/SHARED_SERVICES.md
- [ ] docs/CHANGE_IMPACT.md

**shared-models:**
- [ ] docs/ARCHITECTURE.md ⚠️ CRITICAL
- [ ] docs/CHANGE_IMPACT.md ⚠️ CRITICAL

**harborUserSvc:**
- [ ] docs/ARCHITECTURE.md
- [ ] docs/SHARED_SERVICES.md
- [ ] docs/CHANGE_IMPACT.md
- [ ] docs/SERVICE_RULES.md

**harborJobSvc:**
- [ ] docs/ARCHITECTURE.md
- [ ] docs/SHARED_SERVICES.md
- [ ] docs/CHANGE_IMPACT.md
- [ ] docs/SERVICE_RULES.md

**[Repeat for ALL other repos]**

✅ **ALL DOCUMENTATION READ AND UNDERSTOOD**
```

---

### 🧠 Step 3: Deep Understanding Extraction

**Objective:** Extract structured understanding from documentation

#### 3.1 Architecture Mapping

**For each service, understand:**

```markdown
### Architecture Mapping

**harborUserSvc:**
- Role: User management service
- Upstream Dependencies:
  - shared-models (User models)
  - harborShared (utilities)
- Downstream Dependents: None (leaf service)
- Communication Pattern: REST API
- Database: PostgreSQL (via TypeORM)
- Service Boundary: Manages user data and authentication

**harborJobSvc:**
- Role: Job management service
- Upstream Dependencies:
  - shared-models (Job, User models)
  - harborShared (utilities)
  - harborUserSvc (user validation via API)
- Downstream Dependents: None (leaf service)
- Communication Pattern: REST API + Events
- Database: PostgreSQL (via TypeORM)
- Service Boundary: Manages job lifecycle

**shared-models:**
- Role: Shared data models library
- Upstream Dependencies: None (base library)
- Downstream Dependents: ALL services
- Communication Pattern: N/A (shared library)
- Service Boundary: Provides common data structures
- Impact Level: 🔴 HIGH - Changes affect ALL services
```

#### 3.2 Dependency Graph

**Create visual dependency mapping:**

```markdown
### Dependency Graph

```
shared-models (HIGH IMPACT)
  ├─ harborUserSvc
  ├─ harborJobSvc
  ├─ harborBlogSvc
  └─ harborWebsite

harborShared (MEDIUM IMPACT)
  ├─ harborUserSvc
  ├─ harborJobSvc
  └─ harborBlogSvc

harborUserSvc
  └─ harborJobSvc (depends on user validation)

api-gateway
  ├─ harborUserSvc
  ├─ harborJobSvc
  └─ harborBlogSvc
```

**Impact Analysis:**
- Changing `shared-models` → Affects ALL services
- Changing `harborShared` → Affects backend services
- Changing `harborUserSvc` → Affects harborJobSvc
```

#### 3.3 Service Rules

**Extract business logic constraints:**

```markdown
### Service Rules

**harborUserSvc:**
✅ ALLOWED:
- Manage user data
- Handle authentication
- Expose user APIs

❌ NOT ALLOWED:
- Access harborJobSvc database directly
- Share internal models
- Create tight coupling with other services

**harborJobSvc:**
✅ ALLOWED:
- Manage job data
- Call harborUserSvc API for user validation
- Publish job events

❌ NOT ALLOWED:
- Access harborUserSvc database directly
- Modify user data directly
- Bypass user validation
```

#### 3.4 Git Rules

**Understand git strategy:**

```markdown
### Git Rules

**ALL Repositories:**
- 🚫 DO NOT push directly to branch
- 🚫 DO NOT create branches (use local branches only)
- ✅ Create local feature branches
- ✅ Commit locally
- ✅ Follow commit message standards
- ✅ NO automatic pushing
```

#### 3.5 Structure Understanding

**Map code organization:**

```markdown
### Code Structure

**harborUserSvc:**
```
src/
├── controllers/     - Request handlers
├── services/        - Business logic
├── repositories/    - Data access
├── models/          - TypeORM entities (from shared-models)
├── dto/             - Data transfer objects
└── middleware/      - Express middleware
```

**Patterns:**
- Controllers handle HTTP requests
- Services contain business logic
- Repositories handle database operations
- Models imported from shared-models
```

---

### 🔗 Step 4: Cross-Repository Impact Analysis

**Objective:** Determine which repos are affected and how to implement

**Based on the task, identify:**

#### 4.1 Affected Repositories

**Question:** Which repo(s) need to be modified?

```markdown
Task: "Add user notifications"

Analysis:
1. ✅ Check: Does notification service exist?
   → Search: harborNotificationSvc exists ✅

2. ✅ Check: What does harborNotificationSvc do?
   → Read: harborNotificationSvc/docs/ARCHITECTURE.md
   → Result: Handles all notification types

3. ✅ Decision: Use existing harborNotificationSvc
   → NO new service needed
   → Extend existing service
```

**Decision Tree:**

```markdown
### Implementation Approach Decision

**Question:** Should we create a new service or modify existing?

**Step 1:** Check if relevant service exists
- ✅ EXISTS → Use it
- ❌ DOESN'T EXIST → Go to Step 2

**Step 2:** Check if existing service can handle it
- ✅ YES → Extend existing service
- ❌ NO → Go to Step 3

**Step 3:** Check if feature belongs in multiple services
- ✅ YES → Create shared service
- ❌ NO → Create new service

**Final Decision:**
- ✅ Modify existing service (PREFERRED)
- ⚠️ Create new service (LAST RESORT)
```

#### 4.2 Implementation Feasibility

**Analyze:**
- Is this feature already partially implemented?
- Can this be implemented in an existing service?
- Do we really need a new service?

#### 4.3 Unaffected Repositories

**Identify repos that should NOT be touched:**

```markdown
**Task:** "Add user notifications"

**Affected Repositories:**
- ✅ harborNotificationSvc - Add notification logic
- ✅ shared-models - Add notification models (if needed)

**Unaffected Repositories:**
- ❌ harborUserSvc - NO CHANGES (unless triggering notifications)
- ❌ harborJobSvc - NO CHANGES
- ❌ harborWebsite - NO CHANGES (unless displaying notifications)
- ❌ api-gateway - NO CHANGES
```

---

### 🧩 Step 5: Shared Service Awareness

**Objective:** Identify shared services and assess impact

**⚠️ HIGH IMPACT - Shared services affect MULTIPLE services**

#### 5.1 Identify Shared Services

**From SHARED_SERVICES.md files:**

```markdown
### Shared Services Inventory

**shared-models** (🔴 CRITICAL - HIGH IMPACT)
- Used by: ALL services
- Contains: User, Job, Blog models
- Impact: Breaking changes affect ENTIRE system

**harborShared** (🟡 MEDIUM IMPACT)
- Used by: All backend services
- Contains: Utilities, helpers, middleware
- Impact: Changes affect backend services

**harborNotificationSvc** (🟢 LOW IMPACT)
- Used by: Services that need notifications
- Contains: Notification logic
- Impact: Changes affect notification consumers
```

#### 5.2 Impact Assessment

**For each shared service used:**

```markdown
### Shared Service Impact Analysis

**Task:** "Modify User model in shared-models"

**Affected Services:**
- 🔴 harborUserSvc (WILL BREAK - User model changes)
- 🔴 harborJobSvc (WILL BREAK - References User model)
- 🔴 harborBlogSvc (WILL BREAK - References User model)
- 🔴 harborWebsite (WILL BREAK - Uses User types)

**Impact Level:** 🔴 CRITICAL

**Required Actions:**
1. Update shared-models User model
2. Update ALL dependent services:
   - harborUserSvc
   - harborJobSvc
   - harborBlogSvc
   - harborWebsite
3. Ensure backward compatibility
4. Coordinate release across all services
5. Test all integrations

**Risk:** 🔴 HIGH - Breaking change across entire system
```

---

### ⚠️ Step 6: Conflict & Risk Detection

**Objective:** Identify potential problems BEFORE implementation

#### 6.1 Breaking Changes Detection

**Check for:**
- API contract changes
- Data model changes
- Interface changes
- Removed functionality

```markdown
### Breaking Changes Analysis

**Question:** Will this change break existing functionality?

**API Contract Changes:**
- ❌ Changing request/response format → BREAKING
- ❌ Removing endpoints → BREAKING
- ✅ Adding new endpoints → SAFE
- ✅ Adding optional fields → SAFE

**Data Model Changes:**
- ❌ Removing fields → BREAKING
- ❌ Changing field types → BREAKING
- ❌ Renaming fields → BREAKING
- ✅ Adding optional fields → SAFE
- ✅ Adding new models → SAFE

**Interface Changes:**
- ❌ Changing function signatures → BREAKING
- ❌ Removing functions → BREAKING
- ✅ Adding new functions → SAFE
```

#### 6.2 Cross-Service Impact

**Check if changes will break other services:**

```markdown
### Cross-Service Impact

**Task:** "Modify User model"

**Upstream Impact (services that depend on this):**
- harborJobSvc → Uses User model → WILL BREAK
- harborBlogSvc → Uses User model → WILL BREAK
- harborWebsite → Uses User types → WILL BREAK

**Downstream Impact (services this depends on):**
- shared-models → Will update → OK
- harborShared → Not affected → OK

**Mitigation:**
1. Maintain backward compatibility
2. Add new fields as optional
3. Update all dependent services
4. Coordinate release
```

#### 6.3 Data Inconsistency Risks

**Check for:**
- Database schema changes
- Data migration needs
- Transactional integrity

```markdown
### Data Consistency Risks

**Database Schema Changes:**
- ❌ Removing columns → DATA LOSS
- ⚠️ Changing column types → Needs migration
- ✅ Adding columns → Safe (with default values)

**Data Migration:**
- ⚠️ Schema change requires migration
- ⚠️ Data transformation needed
- ⚠️ Backup required before migration

**Transactional Integrity:**
- ⚠️ Multiple table updates need transactions
- ⚠️ Distributed transactions needed
- ⚠️ Rollback strategy required
```

#### 6.4 API Contract Changes

**Check for:**
- Request/response changes
- Error handling changes
- Authentication changes

```markdown
### API Contract Changes

**Request Changes:**
- ❌ Removing required fields → BREAKING
- ⚠️ Adding required fields → BREAKING
- ✅ Adding optional fields → SAFE

**Response Changes:**
- ❌ Removing fields → BREAKING
- ❌ Changing field types → BREAKING
- ✅ Adding fields → SAFE

**Error Handling:**
- ❌ Changing error codes → BREAKING
- ✅ Adding new error codes → SAFE

**Authentication:**
- ⚠️ Changing auth headers → Coordinated update
- ⚠️ Changing token format → Coordinated update
```

---

### 📝 Step 7: Execution Plan (MANDATORY OUTPUT)

**Objective:** Create structured analysis plan BEFORE implementation

**🚨 This is the FINAL step before implementation**

**🚨 MUST be completed BEFORE writing ANY code**

#### 7.1 Analysis Summary Template

```markdown
### 📊 ANALYSIS SUMMARY

**Task:** {Task description}

**Date:** {Current date}
**Agent:** Harbor AI Agent v11.0

---

#### 1. Affected Repositories:

**Primary:**
- ✅ repo-A (PRIMARY) - Main implementation
- ✅ repo-B (SECONDARY) - Dependent changes

**Reasoning:**
- repo-A: Contains core functionality for feature
- repo-B: Needs updates to adapt to repo-A changes

---

#### 2. Unaffected Repositories:

**NO Changes Needed:**
- ❌ repo-C - Not related to feature
- ❌ repo-D - Not related to feature
- ❌ repo-E - Not related to feature

**Reasoning:**
- Feature is isolated to repo-A and repo-B
- No dependencies on repo-C, repo-D, repo-E

---

#### 3. Dependencies Impact:

**Dependency Graph:**
```
repo-A (primary)
  ├─ depends on: shared-models
  └─ used by: repo-B, repo-C

repo-B (secondary)
  ├─ depends on: repo-A, shared-models
  └─ used by: repo-D
```

**Impact Assessment:**
- ✅ Changes in repo-A will affect repo-B (will update)
- ✅ Changes in shared-models NOT needed
- ❌ repo-C will be affected but not in scope (documented)
- ❌ repo-D will be affected but not in scope (documented)

---

#### 4. Approach:

**Implementation Strategy:**
- ✅ Modify existing service: repo-A
- ❌ NO new service needed
- 🔄 Extends existing functionality in repo-A
- 🔄 Updates dependent service repo-B

**Rationale:**
- Feature fits within repo-A's service boundaries
- repo-A/docs/SERVICE_RULES.md allows this functionality
- No need for new service (would be duplication)

---

#### 5. Risks:

**Identified Risks:**

1. ⚠️ **API contract change in repo-A**
   - Risk: May break repo-B, repo-C
   - Mitigation: Maintain backward compatibility
   - Action: Add new fields as optional

2. ⚠️ **Data model change**
   - Risk: Requires database migration
   - Mitigation: Create migration script
   - Action: Test migration thoroughly

3. ⚠️ **Performance impact**
   - Risk: New feature may slow down repo-A
   - Mitigation: Add caching if needed
   - Action: Monitor performance

---

#### 6. Shared Modules Impact:

**Impact Assessment:**
- ❌ NO - Shared modules not affected
  OR
- ✅ YES - shared-models affected (HIGH IMPACT)

**If YES:**
```
shared-models Changes:
- Add: Notification model
- Modify: User model (add notification preferences)

Impact:
- 🔴 harborUserSvc (will break - needs update)
- 🔴 harborJobSvc (will break - needs update)
- 🔴 harborBlogSvc (will break - needs update)
- 🔴 harborWebsite (will break - needs update)

Required Actions:
1. Update shared-models
2. Update ALL dependent services
3. Coordinate release
4. Test all integrations
```

---

#### 7. Git Strategy:

**Branching Strategy:**
- Create feature branch: `feature/add-notifications`
- Base branch: `dev`
- NO pushing to remote
- Local commits only

**Commit Strategy:**
- Organized by functionality
- Clear commit messages
- Follow repo's GIT_RULES.md

---

#### 8. Cross-Repo Sync Requirements:

**Sync Needed:**
- ❌ NO - Changes isolated to repo-A
  OR
- ✅ YES - Multiple repos need coordinated updates

**If YES:**
```
Sync Requirements:
1. First: Update repo-A (primary)
2. Second: Update repo-B (depends on repo-A)
3. Third: Test integration
4. Fourth: Verify no breaking changes

Coordination:
- Ensure repo-A changes are complete first
- Test repo-A before updating repo-B
- Verify repo-B works with updated repo-A
```

---

#### 9. Final Decision:

**Decision:**
- ✅ Safe to proceed

**Confidence Level:**
- High - All documentation read, impact analyzed, risks identified

**OR**

**Decision:**
- ⚠️ Needs clarification

**What needs clarification:**
- {Specific question or concern}

**Waiting for:**
- {User input or decision}

---

### 🎯 IMPLEMENTATION PLAN

**Phase 1: Changes in repo-A**

**File: repo-A/src/services/notification.service.ts**
- Change: Add notification service
- Reason: Core functionality for feature

**File: repo-A/src/controllers/notification.controller.ts**
- Change: Add notification endpoints
- Reason: Expose notification APIs

**File: repo-A/src/dto/notification.dto.ts**
- Change: Add notification DTOs
- Reason: Request/response validation

**Phase 2: Changes in repo-B** (if needed)

**File: repo-B/src/services/user.service.ts**
- Change: Update to handle notifications
- Reason: Adapt to repo-A changes

**Phase 3: Database Changes** (if needed)

**File: repo-A/migrations/XYZ-add-notifications.ts**
- Change: Add notifications table
- Reason: Store notification data

**Phase 4: Testing**

- Test repo-A notification endpoints
- Test repo-B integration
- Verify no breaking changes
- Performance testing

---

### 🚨 PROCEEDING TO IMPLEMENTATION

✅ **Analysis Complete**
✅ **All documentation read**
✅ **Impact assessed**
✅ **Risks identified**
✅ **Approach validated**
✅ **Execution plan created**

🟢 **NOW PROCEEDING TO IMPLEMENTATION**

**Next Step:** Phase 1 - Full Repository Analysis (existing v10.1 workflow)
```

---

### 🚀 Step 8: Implementation (ONLY AFTER ANALYSIS)

**ONLY AFTER completing ALL above steps:**

**Proceed with implementation following:**
1. Phase 1: Full Repository Analysis
2. Phase 2: Cross-Service Intelligence
3. Phase 3: Documentation Generation
4. Phase 4-12: Remaining workflow phases

**Implementation Guidelines:**
- Follow repo structure & rules
- Make minimal, precise changes
- Respect service boundaries
- Maintain backward compatibility
- Test thoroughly

---

## 🛑 Anti-Pattern Prevention

### What the Agent MUST NOT Do:

1. ❌ **Create new repo/service unless explicitly required**
   - Bad: Creating harborNotificationSvc when it already exists
   - Good: Using existing harborNotificationSvc

2. ❌ **Duplicate logic across services**
   - Bad: Copying notification logic to multiple services
   - Good: Using shared harborNotificationSvc

3. ❌ **Ignore documentation**
   - Bad: Assuming architecture without reading ARCHITECTURE.md
   - Good: Reading all docs before implementing

4. ❌ **Violate service boundaries**
   - Bad: Accessing another service's database directly
   - Good: Using APIs to communicate

5. ❌ **Break dependent services**
   - Bad: Changing shared-models without updating dependents
   - Good: Updating all dependent services

6. ❌ **Make unchecked changes to shared services**
   - Bad: Modifying shared-models without impact analysis
   - Good: Analyzing impact and updating all dependents

---

## 🧠 Smart Behavior

### What the Agent SHOULD Do:

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

4. ✅ **Maintain system integrity**
   - Consider all affected services
   - Coordinate changes
   - Ensure compatibility

---

## 🔄 Sync Awareness

**If change affects multiple services:**

1. Clearly mention sync requirement
2. Suggest updates in dependent repos
3. Coordinate changes across services
4. Maintain compatibility

---

## 🏁 Final Rule

> **"NO ANALYSIS = NO IMPLEMENTATION"**

**This rule is NON-NEGOTIABLE.**

**The agent MUST:**
- ✅ Complete all 8 analysis steps
- ✅ Output structured analysis plan
- ✅ Get validation before proceeding
- ✅ Only then start implementation

**The agent MUST NOT:**
- ❌ Skip analysis steps
- ❌ Start implementation without analysis
- ❌ Make assumptions about system
- ❌ Ignore documentation

---

## 📋 Quick Reference

### Pre-Implementation Checklist

Before ANY code implementation, verify:

- [ ] **Step 1:** Repository Discovery completed
- [ ] **Step 2:** ALL documentation read
  - [ ] ALL repos' ARCHITECTURE.md
  - [ ] ALL repos' SHARED_SERVICES.md
  - [ ] ALL repos' CHANGE_IMPACT.md
  - [ ] ALL repos' SERVICE_RULES.md
- [ ] **Step 3:** Deep understanding extracted
  - [ ] Architecture mapped
  - [ ] Dependencies graphed
  - [ ] Service rules understood
  - [ ] Code structure understood
- [ ] **Step 4:** Cross-repository impact analyzed
- [ ] **Step 5:** Shared services identified
- [ ] **Step 6:** Conflicts and risks detected
- [ ] **Step 7:** Execution plan output created
- [ ] **Step 8:** Ready to implement

**Only when ALL items are checked:**
✅ Proceed to implementation

---

## 🎯 Example: Correct Analysis

### Task: "Add user notifications"

**Step 1: Repository Discovery**
```
Found 10 repos:
- harborUserSvc, harborJobSvc, harborNotificationSvc, shared-models, etc.
```

**Step 2: Documentation Scan**
```
Read ALL .md files in ALL repos' docs/ folders
```

**Step 3: Deep Understanding**
```
Learned:
- harborNotificationSvc exists (handles notifications)
- shared-models has Notification model
- harborUserSvc can trigger notifications
```

**Step 4: Impact Analysis**
```
Affected Repos:
- harborNotificationSvc (add notification logic)
- harborUserSvc (trigger notifications)

NOT Affected:
- harborJobSvc (not related)
```

**Step 5: Shared Services**
```
shared-models: NO changes needed (Notification model exists)
```

**Step 6: Risk Detection**
```
No breaking changes
Low risk
```

**Step 7: Execution Plan**
```
Approach: Use existing harborNotificationSvc
Modify: harborNotificationSvc (add logic), harborUserSvc (trigger)
Create: NO new services
```

**Result:** ✅ Correct implementation, no duplication

---

## ❌ Example: Wrong Approach (AVOID THIS)

### Task: "Add user notifications"

**Step 1: Repository Discovery**
```
❌ SKIPPED
```

**Step 2: Documentation Scan**
```
❌ SKIPPED (agent assumes knowledge)
```

**Step 3: Deep Understanding**
```
❌ SKIPPED (agent doesn't read docs)
```

**Step 4: Impact Analysis**
```
❌ SKIPPED (agent doesn't analyze)
```

**Step 5-7: All SKIPPED**

**Implementation:**
```
❌ Creates NEW harborNotificationService (duplicate!)
❌ Misses existing harborNotificationSvc
❌ Breaks system architecture
❌ Violates service boundaries
```

**Result:** ❌ Broken implementation, duplicate code, wasted effort

---

## Summary

**The Pre-Execution Intelligence Analysis transforms the agent from:**

**FROM:**
- ❌ Task executor
- ❌ Makes assumptions
- ❌ Creates duplicates
- ❌ Breaks things

**TO:**
- ✅ System-aware decision maker
- ✅ Reads documentation
- ✅ Reuses existing services
- ✅ Maintains system integrity

**Key Principle:**

> **"THINK BEFORE YOU ACT"**

**Analysis BEFORE Implementation = System Architect**

**Implementation WITHOUT Analysis = Task Executor**

**Be the Architect.**

---

**End of Pre-Execution Intelligence Analysis**
