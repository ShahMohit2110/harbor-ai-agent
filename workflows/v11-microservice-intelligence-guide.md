# v11.0 Microservice Intelligence Implementation Guide

**Version:** 11.0.0
**Last Updated:** 2026-03-25
**Purpose:** Guide for implementing microservice-aware decision making in Harbor AI Agent

---

## 🎯 Problem Solved

**User's Original Problem:**

1. ❌ Agent creates new services when existing ones should be used
2. ❌ Agent doesn't publish shared-model packages (breaking dependencies)
3. ❌ Agent doesn't update database-sync service (DB out of sync)
4. ❌ Agent implements incomplete CRUD (missing methods/files)
5. ❌ Agent makes wrong architectural decisions

**Root Cause:**
Agent lacked **repository type classification** and **operation decision intelligence**.

**Solution:**
v2.0 Pre-Execution Intelligence Analysis with:
- 🔴 Shared Package Detection
- 🔵 Database Infrastructure Detection
- 🟢 Business Logic Detection
- 📋 Completeness Verification
- 🔗 Dependency Chain Mapping

---

## 📁 Files Created/Updated

### New Files Created:

1. **`/harbor-ai/workflows/pre-execution-intelligence-analysis-v2.md`**
   - Complete v2.0 analysis framework
   - Repository classification matrix
   - Operation decision tree
   - Completeness verification checklists

### Files Updated:

1. **`/harbor-ai/workflows/global-agent-workflow-v11.md`**
   - Updated Phase 0.5 to reference v2.0
   - Added repository type classification
   - Added operation decision tree
   - Added dependency chain mapping
   - Added completeness verification

---

## 🔧 How It Works

### Step 1: Repository Type Classification

**Agent automatically classifies each repository into ONE of:**

#### A. Shared Package Service 🔴

**Detection:**
```bash
# Check package.json for:
- "publishConfig" registry present
- "private": false or missing
- Docs mention: "publish", "package", "npm publish"
```

**Examples:** `shared-model`, `shared-utils`, `harbor-shared-models`

**Automatically Determines:**
- ✅ Must increment version (semver)
- ✅ Must run `npm run build`
- ✅ Must run `npm publish`
- ✅ Must update CHANGELOG.md
- ❌ Never push code or deploy to server

---

#### B. Database Infrastructure Service 🔵

**Detection:**
```bash
# Check docs/STRUCTURE.md for:
- Name contains: "database", "db", "sync", "migration"
- Docs mention: "sync models", "migrate", "database schema"
```

**Examples:** `database-sync`, `harborDatabaseSync`, `db-migration`

**Automatically Determines:**
- ✅ Must update package.json to latest shared version
- ✅ Must run `npm install`
- ✅ Must configure/register new models
- ✅ Must test sync locally
- ❌ Never push code (unless permanent config change)

---

#### C. Business Logic Service 🟢

**Detection:**
```bash
# Check structure for:
- Has controllers/, services/, repositories/
- Has API endpoints
- Implements business logic
```

**Examples:** `user-service`, `job-service`, `notification-service`

**Automatically Determines:**
- ✅ Must update package.json to latest shared version
- ✅ Must run `npm install`
- ✅ Must implement **complete CRUD** (Controller + Service + Repository + Routes)
- ✅ Must create ALL methods (GET, POST, PUT, DELETE)
- ❌ Never push code or deploy to server
- ❌ Never create new service (use existing)

---

### Step 2: Dependency Chain Mapping

**Agent builds dependency flow:**

```
shared-model (publish) → database-sync (sync) → job-service (implement) → api-gateway (routes) → website (UI)
```

**For each node, agent determines:**
1. What changes are needed?
2. What prerequisites must be satisfied?
3. What post-actions are required?

**Example - Blog Module:**
```markdown
1. shared-model (Shared Package 🔴)
   Prerequisites: None
   Changes: Create Blog.ts model
   Post-actions: Version bump → Build → Publish

2. database-sync (Database Infrastructure 🔵)
   Prerequisites: shared-model@2.1.0 must be published
   Changes: Register Blog model
   Post-actions: npm install → Configure → Test sync

3. job-service (Business Logic 🟢)
   Prerequisites: shared-model@2.1.0 available
   Changes: Implement Blog CRUD
   Post-actions: npm install → Create Controller/Service/Repository/Routes
```

---

### Step 3: Completeness Verification

**Agent verifies ALL required items are complete:**

**For Business Logic Service:**
```markdown
Completeness Checklist:

Controller (MANDATORY - ALL CRUD METHODS):
- [ ] getAll() - GET /api/blogs
- [ ] getById(id) - GET /api/blogs/:id
- [ ] create(data) - POST /api/blogs
- [ ] update(id, data) - PUT /api/blogs/:id
- [ ] delete(id) - DELETE /api/blogs/:id

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
- [ ] GET /api/blogs
- [ ] GET /api/blogs/:id
- [ ] POST /api/blogs
- [ ] PUT /api/blogs/:id
- [ ] DELETE /api/blogs/:id
```

**If ANY item missing:**
- ❌ Implementation marked incomplete
- ⚠️ Agent must complete missing items
- ✅ Cannot proceed until ALL items checked

---

## 🚀 How to Use

### For Agent Implementation:

**1. Update agent behavior to use v2.0 analysis:**

```markdown
## Phase 0.5: Pre-Execution Intelligence Analysis v2.0

**Mandatory Steps:**

1. Read /harbor-ai/workflows/pre-execution-intelligence-analysis-v2.md
2. Classify ALL repositories (Shared Package / DB Infra / Business Logic)
3. Map dependency chain
4. Determine operations for each repo type
5. Verify completeness checklist
6. Output structured analysis
7. Only THEN proceed to implementation
```

**2. Integration Point:**

```javascript
// In agent execution flow:
if (phase === "0.5") {
  // Run v2.0 analysis
  const analysis = await runIntelligenceAnalysisV2(task);

  // Verify analysis complete
  if (!analysis.complete) {
    throw new Error("Analysis incomplete - cannot proceed");
  }

  // Verify repository types classified
  if (!analysis.repositoriesClassified) {
    throw new Error("Repositories not classified - cannot proceed");
  }

  // Verify dependency chain mapped
  if (!analysis.dependencyChainMapped) {
    throw new Error("Dependency chain not mapped - cannot proceed");
  }

  // Proceed to implementation
  return proceedToPhase1(analysis);
}
```

---

### For Manual Testing:

**Test Case 1: Blog Module (Full Feature)**

```bash
# Input:
"Create blog module with CRUD operations"

# Expected Analysis Output:

## 📊 Repository Classification

| Repository | Type | Changes Required | Post-Actions |
|------------|------|------------------|--------------|
| shared-model | 🔴 Shared Package | Create Blog model | Version ↑, Build, Publish |
| database-sync | 🔵 DB Infrastructure | Register Blog | npm install, Test sync |
| job-service | 🟢 Business Logic | CRUD operations | npm install, Implement |
| api-gateway | 🟡 Gateway | Add /api/blog | Update routes |
| website | 🟣 Frontend | Blog pages | Implement UI |

## 🔗 Dependency Chain

shared-model (publish 2.1.0)
  ↓
database-sync (update → sync)
  ↓
job-service (update → implement CRUD)
  ↓
api-gateway (add routes)
  ↓
website (create UI)

## ✅ Completeness Verification

shared-model: ✅
- [x] Model created
- [x] Version bumped
- [x] Published

database-sync: ✅
- [x] Package updated
- [x] Model registered
- [x] Sync tested

job-service: ✅
- [x] Controller (GET, POST, PUT, DELETE)
- [x] Service (all business logic)
- [x] Repository (all data access)
- [x] Routes (all endpoints)
- [x] DTOs defined
```

**Expected Behavior:**
- ✅ Agent detects shared-model needs package publish
- ✅ Agent updates database-sync (not skipped!)
- ✅ Agent implements complete CRUD in job-service
- ✅ Agent creates ALL methods (GET, POST, PUT, DELETE)
- ✅ Agent doesn't create new "blog-service"
- ✅ Agent creates ALL required files

---

**Test Case 2: User Profile Update**

```bash
# Input:
"Add user profile update feature"

# Expected Analysis:

## 📊 Repository Classification

| Repository | Type | Changes Required | Post-Actions |
|------------|------|------------------|--------------|
| shared-model | 🔴 Shared Package | Update User model | Version ↑, Build, Publish |
| database-sync | 🔵 DB Infrastructure | Register changes | npm install, Test sync |
| user-service | 🟢 Business Logic | Update User CRUD | npm install, Implement |
| website | 🟣 Frontend | Update profile page | Implement UI |

## 🔗 Dependency Chain

shared-model (publish 2.2.0)
  ↓
database-sync (update → sync)
  ↓
user-service (update → implement)
  ↓
website (update UI)
```

**Expected Behavior:**
- ✅ Agent updates existing User model (not creates new)
- ✅ Agent publishes package update
- ✅ Agent updates database-sync
- ✅ Agent updates user-service (not creates new)
- ✅ Agent implements ALL CRUD methods for profile update

---

## 🔍 Detection Logic

### Shared Package Service Detection

```javascript
function detectSharedPackageService(repo) {
  const packageJson = readPackageJson(repo);

  // Check for publish configuration
  const hasPublishConfig = !!packageJson.publishConfig;
  const isNotPrivate = packageJson.private !== true;

  // Check documentation
  const docs = readDocumentation(repo);
  const mentionsPublish = docs.includes("publish") ||
                         docs.includes("package") ||
                         docs.includes("npm publish");

  // Decision
  if (hasPublishConfig || isNotPrivate || mentionsPublish) {
    return {
      type: "SHARED_PACKAGE",
      operations: [
        "IMPLEMENT_CHANGES",
        "INCREMENT_VERSION",
        "BUILD_PACKAGE",
        "PUBLISH_PACKAGE",
        "UPDATE_CHANGELOG"
      ],
      prohibited: [
        "PUSH_CODE",
        "DEPLOY_TO_SERVER"
      ]
    };
  }

  return null;
}
```

---

### Database Infrastructure Service Detection

```javascript
function detectDatabaseInfrastructureService(repo) {
  const repoName = repo.name.toLowerCase();
  const docs = readDocumentation(repo);

  // Check name patterns
  const hasDbInName = repoName.includes("database") ||
                     repoName.includes("db") ||
                     repoName.includes("sync") ||
                     repoName.includes("migration");

  // Check documentation
  const mentionsSync = docs.includes("sync models") ||
                      docs.includes("migrate") ||
                      docs.includes("database schema");

  // Decision
  if (hasDbInName || mentionsSync) {
    return {
      type: "DATABASE_INFRASTRUCTURE",
      operations: [
        "UPDATE_PACKAGE_VERSION",
        "NPM_INSTALL",
        "CONFIGURE_MODELS",
        "TEST_SYNC"
      ],
      prohibited: [
        "PUSH_CODE", // Unless permanent config change
        "DEPLOY_TO_SERVER"
      ]
    };
  }

  return null;
}
```

---

### Business Logic Service Detection

```javascript
function detectBusinessLogicService(repo) {
  const structure = getRepoStructure(repo);

  // Check for typical microservice structure
  const hasControllers = structure.includes("controllers/");
  const hasServices = structure.includes("services/");
  const hasRepositories = structure.includes("repositories/");
  const hasRoutes = structure.includes("routes/");

  // Decision
  if (hasControllers && hasServices && hasRepositories) {
    return {
      type: "BUSINESS_LOGIC",
      operations: [
        "UPDATE_PACKAGE_VERSION",
        "NPM_INSTALL",
        "IMPLEMENT_CONTROLLER", // ALL CRUD methods
        "IMPLEMENT_SERVICE",    // ALL business logic
        "IMPLEMENT_REPOSITORY", // ALL data access
        "ADD_ROUTES",           // ALL endpoints
        "ADD_DTOS",
        "ADD_MIDDLEWARE",
        "TEST_LOCALLY"
      ],
      prohibited: [
        "PUSH_CODE",
        "DEPLOY_TO_SERVER",
        "CREATE_NEW_SERVICE" // Use existing!
      ]
    };
  }

  return null;
}
```

---

## 📊 Expected Output Format

**After analysis, agent MUST output:**

```markdown
## 🧠 Pre-Execution Intelligence Analysis v2.0

**Task:** Create blog module with CRUD operations
**Date:** 2026-03-25
**Agent:** Harbor AI Agent v11.0

---

### 📊 Repository Classification

| Repository | Type | Changes Required | Prerequisites | Post-Actions |
|------------|------|------------------|---------------|--------------|
| shared-model | 🔴 Shared Package | Create Blog model | None | Version ↑, Build, Publish |
| database-sync | 🔵 DB Infrastructure | Register Blog | shared-model@2.1.0 | npm install, Test sync |
| job-service | 🟢 Business Logic | CRUD operations | shared-model@2.1.0 | npm install, Implement |
| api-gateway | 🟡 Gateway | Add /api/blog | job-service endpoints | Update routes |
| website | 🟣 Frontend | Blog pages | api-gateway routing | Implement UI |

---

### 🔗 Dependency Chain

```
1. shared-model (publish package 2.1.0)
   ↓
2. database-sync (update to 2.1.0 → sync models)
   ↓
3. job-service (update to 2.1.0 → implement CRUD)
   ↓
4. api-gateway (add routes)
   ↓
5. website (create UI)
```

---

### ✅ Completeness Verification

**shared-model:** ✅ COMPLETE
- [x] Model created
- [x] Version bumped
- [x] Published

**database-sync:** ✅ COMPLETE
- [x] Package updated
- [x] Model registered
- [x] Sync tested

**job-service:** ✅ COMPLETE
- [x] Controller (GET, POST, PUT, DELETE)
- [x] Service (all business logic)
- [x] Repository (all data access)
- [x] Routes (all endpoints)
- [x] DTOs defined

**api-gateway:** ✅ COMPLETE
- [x] Routes added

**website:** ✅ COMPLETE
- [x] All pages created
- [x] Components created
- [x] API integration

---

### 🎯 Decision Summary

✅ **Shared Package Detection:** shared-model identified
✅ **Database Infrastructure Detection:** database-sync identified
✅ **Business Logic Detection:** job-service identified
✅ **No New Service Created:** Used existing job-service
✅ **Complete Implementation:** ALL CRUD methods planned

---

### 🚢 Ready for Implementation

✅ Analysis Complete
✅ All Repos Classified
✅ Dependency Chain Mapped
✅ Operations Defined
✅ Completeness Verified

🟢 **PROCEEDING TO IMPLEMENTATION**
```

---

## 🎯 Key Benefits

### Before v2.0:
- ❌ Agent creates new "blog-service" (unnecessary)
- ❌ Agent updates shared-model but doesn't publish (breaks dependencies)
- ❌ Agent skips database-sync (DB out of sync)
- ❌ Agent creates Controller with only GET method (incomplete CRUD)
- ❌ Agent creates some files, misses others (30% complete)

### After v2.0:
- ✅ Agent uses existing job-service (correct architecture)
- ✅ Agent publishes shared-model package (dependencies work)
- ✅ Agent updates database-sync (DB in sync)
- ✅ Agent creates complete CRUD (GET, POST, PUT, DELETE)
- ✅ Agent creates ALL required files (100% complete)

---

## 🚨 Anti-Pattern Prevention

**Prevents these patterns:**

### ❌ Pattern 1: Creating Unnecessary Services
```markdown
Task: "Add blog feature"
Wrong: "I'll create new blog-service"
Right: "I'll use existing job-service for blog feature"
```

### ❌ Pattern 2: Forgetting Package Publish
```markdown
Task: "Add Blog model to shared-models"
Wrong: "Model created, done!"
Right: "Model created → Version bumped → Build → Publish"
```

### ❌ Pattern 3: Skipping Database Sync
```markdown
Task: "Add Blog model"
Wrong: "Model created in shared-models, done!"
Right: "Model created → Update database-sync → Register model → Test sync"
```

### ❌ Pattern 4: Incomplete CRUD
```markdown
Task: "Add blog CRUD"
Wrong: "Created Controller with GET method"
Right: "Created Controller with GET, POST, PUT, DELETE (complete CRUD)"
```

### ❌ Pattern 5: Missing Files
```markdown
Task: "Add blog CRUD"
Wrong: "Created Controller and Service, done!"
Right: "Created Controller, Service, Repository, Routes, DTOs, Middleware (all files)"
```

---

## 📋 Implementation Checklist

**To integrate v2.0 into your agent:**

- [ ] Read `/harbor-ai/workflows/pre-execution-intelligence-analysis-v2.md`
- [ ] Update Phase 0.5 in workflow to use v2.0
- [ ] Implement repository type classification logic
- [ ] Implement operation decision tree
- [ ] Implement dependency chain mapping
- [ ] Implement completeness verification
- [ ] Test with blog module example
- [ ] Verify no new services created
- [ ] Verify package publish happens
- [ ] Verify database-sync updated
- [ ] Verify complete CRUD implementation
- [ ] Verify ALL files created

---

## 🎓 Training Examples

**Example 1: Simple Feature (No Shared Changes)**
```bash
Task: "Add user search API"

Analysis:
- shared-model: ❌ NO CHANGES (User model exists)
- database-sync: ❌ NO CHANGES
- user-service: ✅ ADD search endpoint
- api-gateway: ✅ ADD /api/users/search route
- website: ✅ ADD search UI

No package publish needed!
No database sync needed!
```

**Example 2: Complex Feature (Shared Changes)**
```bash
Task: "Add blog module with comments"

Analysis:
- shared-model: ✅ CREATE Blog model, Comment model
- database-sync: ✅ REGISTER Blog, Comment models
- job-service: ✅ IMPLEMENT Blog CRUD, Comment CRUD
- api-gateway: ✅ ADD /api/blogs, /api/comments routes
- website: ✅ CREATE blog pages, comment UI

Package publish REQUIRED!
Database sync REQUIRED!
Complete CRUD REQUIRED!
```

**Example 3: Model Update (Breaking Change)**
```bash
Task: "Add email field to User model"

Analysis:
- shared-model: ✅ UPDATE User model (add email)
- database-sync: ✅ REGISTER User model changes
- user-service: ✅ UPDATE User CRUD (handle email)
- job-service: ✅ UPDATE (uses User model)
- website: ✅ UPDATE user profile page

Package publish REQUIRED!
Database sync REQUIRED!
All dependent services updated!
```

---

**End of Implementation Guide**

**Version:** 11.0.0
**Last Updated:** 2026-03-25
**Status:** Ready for Implementation
