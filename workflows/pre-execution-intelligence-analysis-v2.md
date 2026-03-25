# Pre-Execution Intelligence Analysis v2.0

**🚨 MANDATORY PHASE: Runs AFTER Phase 0 (Documentation Reading) and BEFORE Phase 1 (Task Planning)**

**Reference:** `/harbor-ai/workflows/global-agent-workflow-v11.md` - Phase 0.5

---

## Purpose

Transform agent from passive implementer to **system-aware decision maker** that:

1. ✅ Identifies repository types and roles (Shared Package vs Regular Service)
2. ✅ Maps dependency chains across services
3. ✅ Determines required operations for each repo type
4. ✅ Creates execution plan with proper sequencing
5. ✅ Ensures complete implementation (no missing files)

---

## 🎯 Core Problems Solved

**Problem 1:** Agent creates new services when existing ones should be used
**Solution:** Repository type classification + decision tree

**Problem 2:** Agent doesn't know when to publish packages (shared-model)
**Solution:** Package service detection + mandatory publish operations

**Problem 3:** Agent misses database-sync service updates
**Solution:** Database infrastructure service detection + sync operations

**Problem 4:** Agent implements incomplete CRUD (missing files/methods)
**Solution:** Completeness verification checklist for each repo type

---

## Step 1: Repository Classification Matrix

**For EACH repository in workspace, classify into ONE of:**

### A. Shared Package Services 🔴

**Detection Criteria:**
```bash
# Check package.json for:
- "publishConfig" registry present
- "private": false or missing
- Docs mention: "publish", "package", "npm publish"
- Used by multiple services as dependency
- No direct API/endpoints (it's a library)
```

**Examples:** `shared-model`, `shared-utils`, `shared-types`, `harbor-shared-models`

**Required Operations:**
1. ✅ Implement changes (models, types, utilities)
2. ✅ **MANDATORY:** Increment package version (semver)
3. ✅ **MANDATORY:** Build package (`npm run build`)
4. ✅ **MANDATORY:** Publish package (`npm publish`)
5. ✅ Update CHANGELOG.md
6. ❌ **NEVER:** Push code branch, deploy to server, create API

---

### B. Database Infrastructure Services 🔵

**Detection Criteria:**
```bash
# Check docs/STRUCTURE.md + package.json for:
- Name contains: "database", "db", "sync", "migration", "prisma"
- Docs mention: "sync models", "migrate", "database schema", "TypeORM sync"
- Automatically applies changes from shared packages
- Has database connection logic
- No business logic, just schema sync
```

**Examples:** `database-sync`, `db-migration`, `prisma-service`, `harborDatabaseSync`

**Required Operations:**
1. ✅ Update package.json to latest shared package version
2. ✅ Run `npm install` to get new packages
3. ✅ **MANDATORY:** Configure/register new models/tables
4. ✅ **MANDATORY:** Test sync locally (`npm start` or sync command)
5. ✅ Verify database schema changes (check DB)
6. ❌ **NEVER:** Push code branch (unless config changes are permanent)

---

### C. Business Logic Services (Microservices) 🟢

**Detection Criteria:**
```bash
# Check docs/ARCHITECTURE.md + structure for:
- Has API endpoints (controllers, routes)
- Uses shared packages as dependencies
- Implements business logic
- Has service layer
- Has repository pattern
- Not shared package, not database sync
```

**Examples:** `user-service`, `job-service`, `notification-service`, `blog-service`

**Required Operations:**
1. ✅ Update package.json to use latest shared package version
2. ✅ Run `npm install` to get new packages
3. ✅ Implement **Controller** (ALL CRUD methods)
4. ✅ Implement **Service** (ALL business logic)
5. ✅ Implement **Repository** (ALL data access methods)
6. ✅ Add **Routes** (ALL endpoints)
7. ✅ Add **Middleware** (auth, validation)
8. ✅ Add **DTOs** (request/response types)
9. ✅ Test locally with `.env`
10. ❌ **NEVER:** Push code branch, deploy to server, create new service

---

### D. Gateway/Orchestrator Services 🟡

**Detection Criteria:**
```bash
# Check for:
- Name: "api-gateway", "gateway", "orchestrator"
- Routes requests to backend services
- Aggregates responses
- Has service discovery
```

**Examples:** `api-gateway`, `harbor-gateway`

**Required Operations:**
1. ✅ Add new routes to gateway
2. ✅ Update service discovery (if needed)
3. ✅ Add middleware if needed
4. ❌ **NEVER:** Push code branch, deploy to server

---

### E. Frontend Applications 🟣

**Detection Criteria:**
```bash
# Check package.json + structure for:
- Next.js, React, Vue, Angular
- Has package.json but no "publishConfig"
- Consumer of APIs only (not producer)
- Has pages, components, UI
```

**Examples:** `website`, `app`, `admin-portal`, `harborWebsite`

**Required Operations:**
1. ✅ Create/update pages (list, create, edit, detail)
2. ✅ Implement API integration (fetch/axios)
3. ✅ Add routing if needed
4. ✅ Implement state management (Redux/Context)
5. ✅ Add UI components (forms, tables, cards)
6. ✅ Add form validation
7. ❌ **NEVER:** Push code branch, deploy to server

---

## Step 2: Operation Decision Tree

**For EACH repository, answer these questions IN ORDER:**

### Q1: Is this a Shared Package Service?

**How to check:**
1. Read `repo/package.json` → Look for `"publishConfig"` or `"private": false`
2. Read `repo/docs/ARCHITECTURE.md` → Look for "package", "publish", "library"
3. Read `repo/docs/SERVICE_RULES.md` → Look for publishing rules

**Decision:**
- ✅ **YES** → This is a **Shared Package Service**
  - Must: Implement changes → Increment version → Build → Publish
  - Never: Push code, deploy to server

- ❌ **NO** → Continue to Q2

---

### Q2: Is this a Database Infrastructure Service?

**How to check:**
1. Check repo name → Contains "database", "db", "sync", "migration"?
2. Read `repo/docs/ARCHITECTURE.md` → Mentions "sync", "migration", "schema"?
3. Read `repo/docs/SERVICE_RULES.md` → Describes automatic sync behavior?

**Decision:**
- ✅ **YES** → This is a **Database Infrastructure Service**
  - Must: Update package version → Configure models → Test sync
  - Never: Push code (unless permanent config change)

- ❌ **NO** → Continue to Q3

---

### Q3: Is this a Business Logic Microservice?

**How to check:**
1. Read `repo/docs/ARCHITECTURE.md` → Has "business logic", "API endpoints"?
2. Check repo structure → Has `controllers/`, `services/`, `repositories/`?
3. Not shared package, not database sync

**Decision:**
- ✅ **YES** → This is a **Business Logic Microservice**
  - Must: Update packages → Implement complete CRUD (Controller/Service/Repository/Routes)
  - Never: Push code, deploy to server

- ❌ **NO** → Continue to Q4

---

### Q4: Does this service need code changes at all?

**How to check:**
1. Review task requirements
2. Check if feature belongs in this service
3. Check if this service is affected by changes

**Decision:**
- ✅ **YES** → Implement changes based on service type
- ❌ **NO** → Skip this repo

---

## Step 3: Dependency Chain Mapping

**Build dependency graph for the task:**

```
[Shared Package] → (publish) → [Database Sync] → [Business Services] → [Gateway] → [Frontend]
```

**For EACH node in chain, determine:**

1. **What changes are needed?** (based on task + docs)
2. **What dependencies must be satisfied first?** (prerequisites)
3. **What version updates are required?** (package versions)
4. **What files MUST be created/modified?** (complete list)

### Example - Blog Module Task

```
┌─────────────────────────────────────────────────────────────────┐
│ DEPENDENCY CHAIN: Blog Module                                   │
└─────────────────────────────────────────────────────────────────┘

shared-model (Shared Package Service)
  ├─ Changes: Create Blog.ts model with all fields
  ├─ Prerequisites: None
  ├─ Post-actions:
  │   1. Increment version: 2.0.0 → 2.1.0
  │   2. Run: npm run build
  │   3. Run: npm publish
  │   4. Update CHANGELOG.md
  └─ Files:
      ├─ models/Blog.ts (CREATE)
      ├─ types/blog.ts (CREATE)
      ├─ package.json (UPDATE - version bump)
      └─ CHANGELOG.md (UPDATE)

database-sync (Database Infrastructure Service)
  ├─ Changes: Import and register Blog model
  ├─ Prerequisites: shared-model@2.1.0 must be published
  ├─ Post-actions:
  │   1. Update package.json: "shared-model": "^2.1.0"
  │   2. Run: npm install
  │   3. Register Blog model in sync configuration
  │   4. Run: npm start (syncs DB)
  │   5. Verify blog table created in database
  └─ Files:
      ├─ package.json (UPDATE - dependency version)
      └─ src/models/index.ts or similar (UPDATE - import Blog)

[job-service OR user-service] (Business Logic Service - which one owns blogs?)
  ├─ Changes: Create Blog CRUD operations
  ├─ Prerequisites: shared-model@2.1.0 available
  ├─ Post-actions:
  │   1. Update package.json: "shared-model": "^2.1.0"
  │   2. Run: npm install
  │   3. Implement Controller (ALL methods)
  │   4. Implement Service (ALL business logic)
  │   5. Implement Repository (ALL data access)
  │   6. Add Routes (ALL endpoints)
  │   7. Add DTOs, middleware
  │   8. Test with .env
  └─ Files:
      ├─ package.json (UPDATE)
      ├─ controllers/BlogController.ts (CREATE - GET, POST, PUT, DELETE)
      ├─ services/BlogService.ts (CREATE - all business logic)
      ├─ repositories/BlogRepository.ts (CREATE - all data access)
      ├─ routes/blog.routes.ts (CREATE - all routes)
      ├─ dto/blog.dto.ts (CREATE)
      ├─ middleware/blog.validation.ts (CREATE)
      └─ tests/blog.test.ts (CREATE)

api-gateway (Gateway Service)
  ├─ Changes: Add /api/blog routes
  ├─ Prerequisites: job-service has blog endpoints
  ├─ Post-actions:
  │   1. Add blog routes to gateway
  │   2. Update service discovery (if needed)
  └─ Files:
      ├─ routes/blog.ts (CREATE)
      └─ config/services.ts (UPDATE - if needed)

website (Frontend Application)
  ├─ Changes: Create blog UI pages
  ├─ Prerequisites: api-gateway has /api/blog routes
  ├─ Post-actions:
  │   1. Create blog pages
  │   2. Create blog components
  │   3. Create API service
  │   4. Add routing
  └─ Files:
      ├─ app/blog/page.tsx (CREATE - list blogs)
      ├─ app/blog/create/page.tsx (CREATE - create form)
      ├─ app/blog/[id]/page.tsx (CREATE - blog detail)
      ├─ app/blog/[id]/edit/page.tsx (CREATE - edit form)
      ├─ components/BlogList.tsx (CREATE)
      ├─ components/BlogForm.tsx (CREATE)
      ├─ services/blogApi.ts (CREATE)
      └─ types/blog.ts (CREATE)
```

---

## Step 4: Completeness Verification

**For EACH identified change, verify ALL items are complete:**

### A. Shared Package Service Completeness

```markdown
## [repo-name] Completeness Checklist

### Model Creation
- [ ] Model file created with ALL required fields
- [ ] Model has proper types/interfaces
- [ ] Model exported correctly
- [ ] Model has validation decorators (if using TypeORM/class-validator)
- [ ] Model has relations defined (if needed)

### Package Management
- [ ] package.json version incremented (semver: major/minor/patch)
- [ ] npm run build completed successfully
- [ ] npm publish completed successfully
- [ ] CHANGELOG.md updated with changes

### Documentation
- [ ] Model documented (comments or separate doc file)
- [ ] Breaking changes noted (if any)
```

---

### B. Database Infrastructure Service Completeness

```markdown
## [repo-name] Completeness Checklist

### Package Updates
- [ ] package.json updated to latest shared package version
- [ ] npm install completed successfully
- [ ] No dependency conflicts

### Model Configuration
- [ ] New model imported in sync configuration
- [ ] Model registered with ORM (TypeORM/Prisma)
- [ ] Sync script run successfully
- [ ] Database table/structure verified
- [ ] Indexes/constraints added (if needed)

### Testing
- [ ] Local database sync tested
- [ ] Schema verified in database
- [ ] No errors in sync logs
```

---

### C. Business Logic Service Completeness

```markdown
## [repo-name] Completeness Checklist

### Package Management
- [ ] package.json updated to latest shared package version
- [ ] npm install completed successfully

### Controller (MANDATORY - ALL CRUD METHODS)
- [ ] Controller file created
- [ ] **getAll()** method - GET /api/resource
- [ ] **getById(id)** method - GET /api/resource/:id
- [ ] **create(data)** method - POST /api/resource
- [ ] **update(id, data)** method - PUT /api/resource/:id
- [ ] **delete(id)** method - DELETE /api/resource/:id
- [ ] Error handling implemented
- [ ] Validation implemented
- [ ] Response DTOs defined

### Service Layer (MANDATORY - ALL BUSINESS LOGIC)
- [ ] Service file created
- [ ] **getAll()** method - business logic for listing
- [ ] **getById(id)** method - business logic for detail
- [ ] **create(data)** method - business logic for creation
- [ ] **update(id, data)** method - business logic for update
- [ ] **delete(id)** method - business logic for deletion
- [ ] Business rules implemented
- [ ] Error handling implemented
- [ ] Transactions used (if needed)

### Repository Layer (MANDATORY - ALL DATA ACCESS)
- [ ] Repository file created
- [ ] **findAll()** method - database query for list
- [ ] **findById(id)** method - database query for detail
- [ ] **create(data)** method - database insert
- [ ] **update(id, data)** method - database update
- [ ] **delete(id)** method - database delete
- [ ] Query optimization (relations, selects)
- [ ] Error handling implemented

### Routes (MANDATORY - ALL ENDPOINTS)
- [ ] Routes file created
- [ ] **GET /api/resource** → controller.getAll
- [ ] **GET /api/resource/:id** → controller.getById
- [ ] **POST /api/resource** → controller.create
- [ ] **PUT /api/resource/:id** → controller.update
- [ ] **DELETE /api/resource/:id** → controller.delete
- [ ] Middleware applied (auth, validation)
- [ ] Routes registered in app

### DTOs/Types
- [ ] Request DTOs defined (CreateDTO, UpdateDTO)
- [ ] Response DTOs defined
- [ ] Validation decorators added
- [ ] Types exported

### Middleware
- [ ] Authentication middleware (if needed)
- [ ] Validation middleware (if needed)
- [ ] Error handling middleware
- [ ] Logging middleware (if needed)

### Testing
- [ ] Unit tests created
- [ ] Integration tests created
- [ ] Tests pass locally with .env
```

---

### D. Frontend Application Completeness

```markdown
## [repo-name] Completeness Checklist

### Pages (MANDATORY - ALL CRUD PAGES)
- [ ] **List page** - app/resource/page.tsx
- [ ] **Create page** - app/resource/create/page.tsx
- [ ] **Detail page** - app/resource/[id]/page.tsx
- [ ] **Edit page** - app/resource/[id]/edit/page.tsx

### Components
- [ ] List component (table, cards)
- [ ] Form component (create/edit form)
- [ ] Detail component (view single item)
- [ ] Delete confirmation component

### API Integration
- [ ] API service file created
- [ ] **getAll()** API method
- [ ] **getById(id)** API method
- [ ] **create(data)** API method
- [ ] **update(id, data)** API method
- [ ] **delete(id)** API method
- [ ] Error handling implemented
- [ ] Loading states implemented

### State Management
- [ ] Redux/Context setup (if needed)
- [ ] State actions defined
- [ ] State reducers implemented

### Routing
- [ ] Routes configured
- [ ] Navigation implemented
- [ ] Route guards (if needed)

### UI/UX
- [ ] Form validation added
- [ ] Error messages displayed
- [ ] Loading indicators added
- [ ] Success feedback added
```

---

## Step 5: Output Format (MANDATORY)

**After analysis, produce this structured output:**

```markdown
## 🧠 Pre-Execution Intelligence Analysis v2.0

**Task:** {Task description}
**Date:** {Current date}
**Agent:** Harbor AI Agent v11.0

---

### 📊 Repository Classification

| Repository | Type | Changes Required | Prerequisites | Post-Actions |
|------------|------|------------------|---------------|--------------|
| shared-model | Shared Package 🔴 | Create Blog model | None | Version ↑, Build, Publish |
| database-sync | DB Infrastructure 🔵 | Register Blog | shared-model@2.1.0 | npm install, Test sync |
| job-service | Business Logic 🟢 | CRUD operations | shared-model@2.1.0 | npm install, Implement |
| api-gateway | Gateway 🟡 | Add /api/blog | job-service endpoints | Update routes |
| website | Frontend 🟣 | Blog pages | api-gateway routing | Implement UI |

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

### 📋 Execution Sequence

#### Phase 1: Shared Package (shared-model)
**File: models/Blog.ts**
- [x] Create Blog model with all fields
- [x] Export Blog model
- [x] Add types

**File: package.json**
- [x] Increment version: 2.0.0 → 2.1.0

**Actions:**
- [x] npm run build
- [x] npm publish
- [x] Update CHANGELOG.md

---

#### Phase 2: Database Layer (database-sync)
**File: package.json**
- [x] Update: "shared-model": "^2.1.0"
- [x] Run: npm install

**File: src/models/index.ts**
- [x] Import Blog model
- [x] Register in ORM configuration

**Actions:**
- [x] npm start (test sync)
- [x] Verify blog table in database

---

#### Phase 3: Business Logic (job-service)
**File: package.json**
- [x] Update: "shared-model": "^2.1.0"
- [x] Run: npm install

**File: controllers/BlogController.ts**
- [x] getAll() - GET /api/blogs
- [x] getById(id) - GET /api/blogs/:id
- [x] create(data) - POST /api/blogs
- [x] update(id, data) - PUT /api/blogs/:id
- [x] delete(id) - DELETE /api/blogs/:id

**File: services/BlogService.ts**
- [x] getAll() - Business logic
- [x] getById(id) - Business logic
- [x] create(data) - Business logic
- [x] update(id, data) - Business logic
- [x] delete(id) - Business logic

**File: repositories/BlogRepository.ts**
- [x] findAll() - Data access
- [x] findById(id) - Data access
- [x] create(data) - Data access
- [x] update(id, data) - Data access
- [x] delete(id) - Data access

**File: routes/blog.routes.ts**
- [x] GET /api/blogs
- [x] GET /api/blogs/:id
- [x] POST /api/blogs
- [x] PUT /api/blogs/:id
- [x] DELETE /api/blogs/:id

**File: dto/blog.dto.ts**
- [x] CreateBlogDto
- [x] UpdateBlogDto
- [x] BlogResponseDto

---

#### Phase 4: Gateway (api-gateway)
**File: routes/blog.ts**
- [x] Add /api/blog routes
- [x] Configure proxy to job-service

---

#### Phase 5: Frontend (website)
**File: app/blog/page.tsx**
- [x] Blog list page

**File: app/blog/create/page.tsx**
- [x] Blog create page

**File: app/blog/[id]/page.tsx**
- [x] Blog detail page

**File: app/blog/[id]/edit/page.tsx**
- [x] Blog edit page

**File: components/BlogList.tsx**
- [x] Blog list component

**File: components/BlogForm.tsx**
- [x] Blog form component

**File: services/blogApi.ts**
- [x] getAll()
- [x] getById(id)
- [x] create(data)
- [x] update(id, data)
- [x] delete(id)

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
- [x] Controller (ALL methods)
- [x] Service (ALL logic)
- [x] Repository (ALL data access)
- [x] Routes (ALL endpoints)
- [x] DTOs defined

**api-gateway:** ✅ COMPLETE
- [x] Routes added

**website:** ✅ COMPLETE
- [x] All pages created
- [x] Components created
- [x] API integration

---

### 🎯 Decision Summary

**Shared Package Detection:** ✅
- shared-model identified as Shared Package Service
- Package publish operation included

**Database Infrastructure Detection:** ✅
- database-sync identified as Database Infrastructure Service
- Model sync operation included

**Business Logic Detection:** ✅
- job-service identified as Business Logic Service
- Complete CRUD implementation planned

**No New Service Created:** ✅
- Used existing job-service for blog feature
- Did NOT create new blog-service

**Complete Implementation:** ✅
- ALL CRUD methods planned
- ALL files identified
- NO missing items

---

### 🚢 Ready for Implementation

✅ **Analysis Complete**
✅ **All Repos Classified**
✅ **Dependency Chain Mapped**
✅ **Operations Defined**
✅ **Completeness Verified**

🟢 **PROCEEDING TO IMPLEMENTATION**
```

---

## Integration with Global Workflow v11

**This becomes Phase 0.5 in the workflow:**

```
Phase 0: Documentation Reading Gate (READ ALL DOCS)
    ↓
Phase 0.5: Pre-Execution Intelligence Analysis v2.0 (THIS FILE)
    ↓
Phase 1-11: Rest of workflow
```

---

## Anti-Pattern Prevention

### ❌ WRONG: "User wants blog feature, I'll create new blog-service"
**Why:** Duplicate service, wrong architecture
**✅ RIGHT:** "Task requires CRUD operations, analyze which existing service owns this domain"

### ❌ WRONG: "Updated shared-model, done!"
**Why:** Missing publish step, other services can't use new package
**✅ RIGHT:** "Updated shared-model → Must bump version → Must build → Must publish → Other services can update"

### ❌ WRONG: "Created controller with GET method"
**Why:** Incomplete CRUD, missing POST/PUT/DELETE
**✅ RIGHT:** "Created controller with GET, POST, PUT, DELETE (complete CRUD)"

### ❌ WRONG: "Created Blog.ts file"
**Why:** Missing exports, types, validation
**✅ RIGHT:** "Created Blog.ts with all fields, types, exports, validation, relations, decorators"

### ❌ WRONG: "Updated job-service, done!"
**Why:** Missing database-sync step, DB not updated
**✅ RIGHT:** "Updated job-service → Must update database-sync → Must configure model → Must test sync"

---

## Enforcement

**Agent CANNOT proceed to Phase 1 until:**

1. ✅ All repos classified (Shared Package / DB Infra / Business Logic / Gateway / Frontend)
2. ✅ Dependency chain mapped (shared → DB sync → services → gateway → frontend)
3. ✅ Execution sequence defined (what to do in each repo, in what order)
4. ✅ Completeness checklist filled (ALL CRUD methods, ALL files)
5. ✅ Analysis output produced (structured format above)

**If agent skips this phase:**
- ❌ Incomplete implementation (missing files/methods)
- ❌ Broken dependencies (packages not published)
- ❌ Database out of sync (database-sync not updated)
- ❌ Wrong service choices (creating new services)
- ❌ Missing operations (no package publish, no DB sync)

---

## Dynamic Intelligence (No Hardcoding)

**This framework is DYNAMIC, not hardcoded:**

1. **Service Type Detection** → Based on documentation analysis, not hardcoded rules
2. **Operation Decision** → Based on service type + task requirements
3. **Dependency Chain** → Built dynamically based on actual dependencies in docs
4. **Completeness Check** → Based on what's required for each service type

**The agent READS documentation → UNDERSTANDS system → MAKES DECISIONS**

---

**Version:** 2.0.0
**Last Updated:** 2026-03-25
**Status:** MANDATORY PHASE
**Key Improvements:**
- Repository type classification (Shared Package vs Regular Service)
- Operation decision tree (when to publish, when to sync, when to implement)
- Completeness verification (checklist for each repo type)
- Dynamic intelligence (no hardcoding)
