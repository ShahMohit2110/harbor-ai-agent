# 🚀 Harbor AI Agent v2.0 - Quick Reference Card

**For:** Developers working with Harbor AI Agent
**Version:** 11.0.0 with v2.0 Intelligence
**Last Updated:** 2026-03-25

---

## ⚡ Quick Start

### What Changed?

**v2.0 adds:** Intelligent repository classification and automatic operation determination

**Before:**
```bash
Task: "Create blog module"
Agent: "I'll create new blog-service" ❌ WRONG
```

**After:**
```bash
Task: "Create blog module"
Agent: "I'll use existing job-service" ✅ CORRECT
Agent: "I'll publish shared-model package" ✅ CORRECT
Agent: "I'll update database-sync" ✅ CORRECT
```

---

## 🎯 Repository Types (NEW)

### 🔴 Shared Package Service

**Examples:** `shared-model`, `shared-utils`

**How to recognize:**
- Has `publishConfig` in package.json
- Docs mention "publish", "package"
- No API endpoints (it's a library)

**Agent will automatically:**
1. ✅ Implement changes (models, types)
2. ✅ **Increment version** (2.0.0 → 2.1.0)
3. ✅ **Run `npm run build`**
4. ✅ **Run `npm publish`**
5. ✅ Update CHANGELOG.md

**Agent will NEVER:**
- ❌ Push code to server
- ❌ Deploy to server

---

### 🔵 Database Infrastructure Service

**Examples:** `database-sync`, `db-migration`

**How to recognize:**
- Name contains "database", "sync", "migration"
- Docs mention "sync models", "database schema"

**Agent will automatically:**
1. ✅ Update package.json to latest shared version
2. ✅ **Run `npm install`**
3. ✅ **Configure/register new models**
4. ✅ **Test sync locally** (`npm start`)

**Agent will NEVER:**
- ❌ Push code to server (unless permanent config)

---

### 🟢 Business Logic Service (Microservice)

**Examples:** `user-service`, `job-service`, `notification-service`

**How to recognize:**
- Has `controllers/`, `services/`, `repositories/` folders
- Has API endpoints
- Implements business logic

**Agent will automatically:**
1. ✅ Update package.json to latest shared version
2. ✅ **Run `npm install`**
3. ✅ **Implement Controller** (ALL CRUD methods)
4. ✅ **Implement Service** (ALL business logic)
5. ✅ **Implement Repository** (ALL data access)
6. ✅ **Add Routes** (ALL endpoints)
7. ✅ Add DTOs, middleware

**Agent will NEVER:**
- ❌ Push code to server
- ❌ Deploy to server
- ❌ Create new service (use existing!)

---

### 🟡 Gateway Service

**Examples:** `api-gateway`

**Agent will:**
- ✅ Add new routes
- ✅ Update service discovery

---

### 🟣 Frontend Application

**Examples:** `website`, `app`, `admin-portal`

**Agent will:**
- ✅ Create pages (list, create, edit, detail)
- ✅ Create components
- ✅ Implement API integration
- ✅ Add routing, state management

---

## 📊 Decision Flow (NEW)

```
Agent receives task
    ↓
READ ALL documentation (Phase 0)
    ↓
CLASSIFY repositories (Phase 0.5 - NEW!)
    ↓
For each repo:
    Is it Shared Package? → YES → Publish package
        ↓ NO
    Is it Database Infra? → YES → Sync models
        ↓ NO
    Is it Business Logic? → YES → Implement complete CRUD
        ↓ NO
    Skip this repo
    ↓
MAP dependency chain
    ↓
VERIFY completeness
    ↓
IMPLEMENT (Phase 1-12)
```

---

## 🎯 Example: Blog Module

### Task:
```bash
"Create blog module with CRUD operations"
```

### Agent Analysis (v2.0):

#### Step 1: Repository Classification
```
✅ shared-model      → 🔴 Shared Package
✅ database-sync     → 🔵 Database Infrastructure
✅ job-service       → 🟢 Business Logic (use existing!)
✅ api-gateway       → 🟡 Gateway
✅ website           → 🟣 Frontend
```

#### Step 2: Dependency Chain
```
shared-model (publish 2.1.0)
  ↓
database-sync (update → sync)
  ↓
job-service (update → implement CRUD)
  ↓
api-gateway (add routes)
  ↓
website (create UI)
```

#### Step 3: Operations Determined

**shared-model:**
```bash
1. Create models/Blog.ts
2. Update package.json: "version": "2.1.0"
3. npm run build
4. npm publish
5. Update CHANGELOG.md
```

**database-sync:**
```bash
1. Update package.json: "shared-model": "^2.1.0"
2. npm install
3. Import Blog model in sync config
4. npm start (test sync)
5. Verify blog table in database
```

**job-service:**
```bash
1. Update package.json: "shared-model": "^2.1.0"
2. npm install
3. Create controllers/BlogController.ts
   - getAll() ✅
   - getById(id) ✅
   - create(data) ✅
   - update(id, data) ✅
   - delete(id) ✅
4. Create services/BlogService.ts
   - getAll() ✅
   - getById(id) ✅
   - create(data) ✅
   - update(id, data) ✅
   - delete(id) ✅
5. Create repositories/BlogRepository.ts
   - findAll() ✅
   - findById(id) ✅
   - create(data) ✅
   - update(id, data) ✅
   - delete(id) ✅
6. Create routes/blog.routes.ts
   - GET /api/blogs ✅
   - GET /api/blogs/:id ✅
   - POST /api/blogs ✅
   - PUT /api/blogs/:id ✅
   - DELETE /api/blogs/:id ✅
7. Create dto/blog.dto.ts
8. Add middleware
9. Test with .env
```

#### Step 4: Completeness Verification
```
✅ shared-model: Model created, version bumped, published
✅ database-sync: Updated, model registered, sync tested
✅ job-service: Controller (ALL methods), Service (ALL logic),
                 Repository (ALL data), Routes (ALL endpoints),
                 DTOs, middleware
✅ api-gateway: Routes added
✅ website: Pages, components, API integration
```

---

## ✅ Completeness Checklist (NEW)

### For Business Logic Service:

**Controller (MANDATORY):**
- [ ] `getAll()` - GET /api/resource
- [ ] `getById(id)` - GET /api/resource/:id
- [ ] `create(data)` - POST /api/resource
- [ ] `update(id, data)` - PUT /api/resource/:id
- [ ] `delete(id)` - DELETE /api/resource/:id

**Service (MANDATORY):**
- [ ] `getAll()` business logic
- [ ] `getById(id)` business logic
- [ ] `create(data)` business logic
- [ ] `update(id, data)` business logic
- [ ] `delete(id)` business logic

**Repository (MANDATORY):**
- [ ] `findAll()` data access
- [ ] `findById(id)` data access
- [ ] `create(data)` data access
- [ ] `update(id, data)` data access
- [ ] `delete(id)` data access

**Routes (MANDATORY):**
- [ ] GET /api/resource
- [ ] GET /api/resource/:id
- [ ] POST /api/resource
- [ ] PUT /api/resource/:id
- [ ] DELETE /api/resource/:id

**Additional:**
- [ ] DTOs defined (CreateDTO, UpdateDTO, ResponseDTO)
- [ ] Middleware added (auth, validation)
- [ ] Error handling implemented
- [ ] Tests pass locally with .env

---

## 🚫 What Agent Will NOT Do

### ❌ Wrong Patterns (Prevented):

1. **Creating unnecessary new services**
   ```
   Task: "Add blog feature"
   Wrong: "I'll create new blog-service"
   Right: "I'll use existing job-service"
   ```

2. **Forgetting package publish**
   ```
   Task: "Update shared-model"
   Wrong: "Model created, done!"
   Right: "Model created → Version bumped → Build → Publish"
   ```

3. **Skipping database-sync**
   ```
   Task: "Add new model"
   Wrong: "Model created, done!"
   Right: "Model created → Update database-sync → Test sync"
   ```

4. **Incomplete CRUD**
   ```
   Task: "Add blog CRUD"
   Wrong: "Created Controller with GET method"
   Right: "Created Controller with GET, POST, PUT, DELETE"
   ```

5. **Missing files**
   ```
   Task: "Add blog CRUD"
   Wrong: "Created Controller, done!"
   Right: "Created Controller, Service, Repository, Routes, DTOs"
   ```

---

## 🔧 How to Verify Agent is Working

### Check these things:

1. **Repository Classification:**
   - [ ] Agent identifies shared-model as Shared Package
   - [ ] Agent identifies database-sync as Database Infrastructure
   - [ ] Agent identifies job-service as Business Logic

2. **Operations Determined:**
   - [ ] Agent publishes shared-model package
   - [ ] Agent updates database-sync
   - [ ] Agent implements complete CRUD

3. **Completeness:**
   - [ ] ALL CRUD methods present (GET, POST, PUT, DELETE)
   - [ ] ALL files created (Controller, Service, Repository, Routes, DTOs)
   - [ ] ALL layers complete (not just Controller)

4. **Architecture:**
   - [ ] No new services created unnecessarily
   - [ ] Existing services reused
   - [ ] Dependency chain followed

---

## 📁 File Locations

### Framework Files:
```
/harbor-ai/workflows/
├── pre-execution-intelligence-analysis-v2.md    (Main framework)
├── global-agent-workflow-v11.md                 (Updated workflow)
├── v11-microservice-intelligence-guide.md       (Implementation guide)
└── SOLUTION-SUMMARY.md                          (This summary)
```

### Key Sections to Read:

1. **Repository Classification** → v2.0 framework, Step 1
2. **Operation Decision Tree** → v2.0 framework, Step 2
3. **Dependency Chain Mapping** → v2.0 framework, Step 3
4. **Completeness Verification** → v2.0 framework, Step 4

---

## 🎓 Common Scenarios

### Scenario 1: Simple Feature (No Shared Changes)

**Task:** "Add user search API"

**Agent Analysis:**
```
- shared-model: ❌ NO CHANGES (User model exists)
- database-sync: ❌ NO CHANGES
- user-service: ✅ ADD search endpoint
- api-gateway: ✅ ADD /api/users/search
- website: ✅ ADD search UI
```

**Result:** No package publish, no database sync

---

### Scenario 2: New Model (Shared Changes)

**Task:** "Create blog module"

**Agent Analysis:**
```
- shared-model: ✅ CREATE Blog model → PUBLISH
- database-sync: ✅ REGISTER Blog → SYNC
- job-service: ✅ IMPLEMENT Blog CRUD
- api-gateway: ✅ ADD /api/blogs routes
- website: ✅ CREATE blog UI
```

**Result:** Package publish, database sync, complete CRUD

---

### Scenario 3: Model Update (Breaking Change)

**Task:** "Add email field to User model"

**Agent Analysis:**
```
- shared-model: ✅ UPDATE User model → PUBLISH
- database-sync: ✅ SYNC User changes
- user-service: ✅ UPDATE User CRUD
- job-service: ✅ UPDATE (uses User model)
- website: ✅ UPDATE user profile
```

**Result:** Package publish, all dependent services updated

---

## 💡 Tips for Developers

### When reviewing agent output:

1. **Check repository classification**
   - Are repos classified correctly?
   - Is shared-model marked as Shared Package?
   - Is database-sync marked as Database Infrastructure?

2. **Check operations determined**
   - Does agent publish shared packages?
   - Does agent update database-sync?
   - Does agent implement complete CRUD?

3. **Check completeness**
   - Are ALL CRUD methods present?
   - Are ALL layers implemented (Controller/Service/Repository)?
   - Are ALL files created?

4. **Check architecture**
   - Did agent create unnecessary new services?
   - Did agent reuse existing services?
   - Did agent follow dependency chain?

---

## 🚨 Troubleshooting

### Problem: Agent creates new service

**Solution:**
- Check if agent read documentation
- Verify repository classification happened
- Ensure agent checked SERVICE_RULES.md

### Problem: Agent doesn't publish package

**Solution:**
- Verify agent detected shared-model as Shared Package
- Check if agent read package.json
- Ensure operation decision tree ran

### Problem: Agent skips database-sync

**Solution:**
- Verify agent detected database-sync as Database Infrastructure
- Check if agent read database-sync documentation
- Ensure dependency chain was mapped

### Problem: Incomplete CRUD (missing methods)

**Solution:**
- Verify completeness verification ran
- Check if agent enforced all required methods
- Ensure agent didn't mark complete prematurely

---

## 📞 Quick Help

### Agent is not working correctly?

1. **Check logs for Phase 0.5**
   - Did repository classification happen?
   - Was dependency chain mapped?
   - Was completeness verified?

2. **Check documentation reading**
   - Did agent read ALL documentation?
   - Were ARCHITECTURE.md files read?
   - Were SERVICE_RULES.md files read?

3. **Check analysis output**
   - Was structured analysis produced?
   - Were all repos classified?
   - Were all operations determined?

---

## 🎯 Success Checklist

**Agent is working correctly when:**

- [ ] Classifies repos correctly (Shared/DB/Business)
- [ ] Publishes shared packages automatically
- [ ] Updates database-sync automatically
- [ ] Implements complete CRUD (ALL methods)
- [ ] Creates ALL required files
- [ ] Uses existing services (doesn't create new)
- [ ] Follows dependency chain
- [ ] Doesn't push code to servers
- [ ] Tests locally with .env

---

## 📚 Further Reading

**Detailed Documentation:**
- `/harbor-ai/workflows/pre-execution-intelligence-analysis-v2.md` (Full framework)
- `/harbor-ai/workflows/v11-microservice-intelligence-guide.md` (Implementation guide)
- `/harbor-ai/workflows/global-agent-workflow-v11.md` (Complete workflow)

**Examples:**
- Blog module example (shared changes + CRUD)
- User profile example (model update)
- Simple feature example (no shared changes)

---

**End of Quick Reference**

**Version:** 2.0.0
**Date:** 2026-03-25
**Status:** Ready to Use
