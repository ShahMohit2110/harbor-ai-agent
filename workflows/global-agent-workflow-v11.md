# Global Agent Workflow - Master Control System v11.0

**Version:** 11.0.0
**Last Updated:** 2026-03-25
**Purpose:** System-aware decision-making agent with mandatory pre-execution intelligence analysis

---

## 🚨 MAJOR UPDATE v11.0 - PRE-EXECUTION INTELLIGENCE ANALYSIS 🚨

**What's New:**
- 🧠 **System-Aware Decision Making** - Agent behaves like senior architect, not task executor
- 🔍 **Mandatory Pre-Execution Analysis** - Deep analysis across ALL repos before ANY implementation
- 🚫 **Anti-Pattern Prevention** - Prevents duplicate services, wrong repo choices, breaking changes
- 📊 **Structured Analysis Output** - Mandatory analysis summary before implementation
- 🎯 **Smart Decision Engine** - Prefer modifying existing services over creating new ones

**🚨 CRITICAL RULE:**

> **"NO ANALYSIS = NO IMPLEMENTATION"**

---

# 🚀 12-PHASE AUTONOMOUS EXECUTION PROTOCOL (ENHANCED)

---

## 📚 Phase 0: Documentation Gate (AUTOMATIC - NON-SKIPPABLE)

*Same as v10.1 - Automatic validation and generation of documentation*

---

## 🎯 Phase 0.45: Service Selection Analysis (BLOCKING - NON-SKIPPABLE)

**🚨🚨🚨 CRITICAL: This phase BLOCKS all implementation until complete!**

**Reference:** `workflows/service-selection-logic-v2.md` (relative to harbor-ai directory)

**Purpose:** PROVE which existing repo to use (NEVER create new service!)

**🚨 DEFAULT RULE: NEVER CREATE NEW SERVICE OR REPO**

**Unless you have EXPLICIT documentation proof that a new service is needed, you MUST use an existing service.**

**This phase:**
- 🔒 **BLOCKS implementation** until documentation read
- 📖 **FORCES reading** ALL existing service docs
- 🚫 **PREVENTS** new service creation without proof
- ✅ **REQUIRES** documentation evidence for decisions

**Cannot proceed to implementation WITHOUT:**
1. ✅ Reading ARCHITECTURE.md from ALL existing repos
2. ✅ Reading SERVICE_RULES.md from ALL existing repos
3. ✅ Outputting service selection analysis with proof
4. ✅ Getting confirmation that service exists

**🚨 IF YOU CREATE A NEW SERVICE/REPO WITHOUT READING ALL EXISTING DOCS FIRST, YOU HAVE FAILED!**

---

### 🚫 ABSOLUTE RULE (ZERO EXCEPTIONS)

**❌ FORBIDDEN:**
- Creating new service/repo
- Creating new repository
- Running `git init` for new services
- Assuming new service is needed

**✅ REQUIRED:**
- Read ALL existing service documentation FIRST
- Find which existing service can handle the task
- Use existing service
- ONLY if PROVEN by docs that no existing service can handle it, THEN (and only THEN) consider new service

**⚠️ DEFAULT ASSUMPTION: USE EXISTING SERVICE**
**The burden of proof is on YOU to show why a new service is needed!**

---

### 🔒 BLOCKING GATE: Implementation Blocked Until Service Selection Complete

**🚨 BEFORE proceeding to Phase 1 (Full Repository Analysis), you MUST:**

```markdown
## ✅ PRE-IMPLEMENTATION CHECKLIST

**Repos Discovered (Dynamic):**
- [List all repos found via find command - NO hardcoded names!]
- Total: [COUNT]

**Phase 0.45 Completed:**
- [x] Read ARCHITECTURE.md from ALL discovered repos (not hardcoded list!)
- [x] Read SERVICE_RULES.md from ALL discovered repos (not hardcoded list!)
- [x] Outputted service selection analysis table
- [x] Quoted documentation evidence for decision
- [x] Selected EXISTING service (not new)

**Service Selected:** [MUST BE EXISTING SERVICE NAME FROM DISCOVERED LIST]
**Repository Path:** [MUST BE PATH TO EXISTING REPO FROM DISCOVERED LIST]
**New Service:** NONE (creating new service = FAIL)

**Evidence from documentation:**
> [Quote from SERVICE_RULES.md showing why this service can handle the task]

🟢 **ONLY WHEN ALL ABOVE CHECKED, PROCEED TO PHASE 1**
```

**❌ IF NOT COMPLETE:**
```
❌ IMPLEMENTATION BLOCKED
Complete Phase 0.45 (Service Selection Analysis) first!
Read all documentation, output analysis, select existing service.
```

---

## 🧠 Phase 1: Full Repository Analysis Engine (MANDATORY)

---

### 📊 Service Selection Process

**Step 1: Discover All Existing Services**
```bash
find /workspace -maxdepth 2 -name ".git" -type d
```

**Step 2: Read Documentation from EACH Service**
```bash
# For EACH service, READ:
- docs/ARCHITECTURE.md (what it does)
- docs/SERVICE_RULES.md (what it allows/prohibits)
- docs/STRUCTURE.md (how it's organized)
```

**Step 3: Extract Service Capabilities**
From documentation, understand:
- What domain does this service handle?
- What features does it provide?
- What extensions does it allow?
- What does it prohibit?

**Step 4: Match Task to Service**
- Can ANY existing service handle this task?
- Check SERVICE_RULES.md for each service
- Look for "allows extension" rules
- Find BEST match

**Step 5: Make Documentation-Based Decision**
- If service found: USE IT (don't create new)
- If no service found: Only THEN create new
- Decision MUST include reasoning from documentation

---

### 📋 Service Selection Output

**Agent MUST output:**

```markdown
## Service Selection Analysis

**Task:** {task}

**Services Analyzed:**
- service-A: {capabilities from ARCHITECTURE.md}
- service-B: {capabilities from ARCHITECTURE.md}
- service-C: {capabilities from ARCHITECTURE.md}

**Documentation Review:**
- service-A/docs/SERVICE_RULES.md: {rules}
- service-B/docs/SERVICE_RULES.md: {rules}

**Decision:**
✅ USE_EXISTING: {service-name}
  Reason: {from SERVICE_RULES.md}

OR

✅ CREATE_NEW: {service-name}
  Reason: No existing service can handle this (proven by docs)
```

---

### 🚨 Anti-Pattern Prevention

**❌ WRONG:**
```
Task: "Create blog module"
Agent: "I'll create blog-service" ← NO DOCUMENTATION READ!
```

**✅ RIGHT:**
```
Task: "Create blog module"
Agent:
  1. Read user-service/docs/SERVICE_RULES.md
  2. Read job-service/docs/SERVICE_RULES.md
  3. Read notification-service/docs/SERVICE_RULES.md
  4. Found: job-service allows "blog content about jobs"
  5. Decision: USE job-service (not create new)
```

---

## 🧠 Phase 0.5: Pre-Execution Intelligence Analysis v2.0 (NEW - MANDATORY)

**🚨 CRITICAL: This phase continues after service selection**

**Reference:** `workflows/pre-execution-intelligence-analysis-v2.md` (relative to harbor-ai directory)

**Purpose:** Deep analysis with repository type classification and operation decision making

**🆕 v2.0 Key Capabilities:**
- 🔴 **Shared Package Detection** - Identifies services that need package publishing
- 🔵 **Database Infrastructure Detection** - Identifies database-sync services
- 🟢 **Business Logic Detection** - Identifies regular microservices
- 📋 **Completeness Verification** - Ensures ALL CRUD methods and files are created
- 🔗 **Dependency Chain Mapping** - Maps publish → sync → implement flow

**This phase CANNOT be:**
- ❌ Skipped
- ❌ Bypassed
- ❌ Rushed
- ❌ Partially completed

---

### 🚫 STRICT RULE (NON-NEGOTIABLE)

**Before performing ANY code change, file creation, or implementation:**

- ❌ DO NOT write code immediately
- ❌ DO NOT create new services blindly
- ❌ DO NOT modify any repo without full understanding

✅ **ALWAYS complete the Pre-Execution Intelligence Analysis first**

---

### 📊 Step-by-Step Analysis Protocol

#### 🔍 Step 1: Repository Discovery

**Scan the entire workspace:**

```bash
# Navigate to workspace root dynamically (discover from current location)
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

cd ${WORKSPACE_ROOT}

# Find ALL git repositories dynamically
find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort
```

**Identify and classify:**

1. **All repositories** in the workspace
2. **Service boundaries** - What does each service do?
3. **Service types:**
   - 🎯 **Core Service** - Business logic service (e.g., harborUserSvc)
   - 📦 **Shared Service** - Common package used by multiple services
   - 🔧 **Infrastructure Service** - Gateway, auth, etc.
   - 🎨 **Frontend Service** - UI/Frontend application

**Classification Example:**
```markdown
Repository Classification (v2.0 - Enhanced):
🔴 Shared Package Services:
- shared-models → Shared Package (publish required)
- harbor-shared → Shared Package (publish required)

🔵 Database Infrastructure Services:
- database-sync → Database Infrastructure (sync required)

🟢 Business Logic Services:
- harborUserSvc → Business Logic (CRUD implementation)
- harborJobSvc → Business Logic (CRUD implementation)

🟡 Gateway Services:
- api-gateway → Gateway (route updates)

🟣 Frontend Applications:
- harborWebsite → Frontend (UI implementation)
```

---

#### 📂 Step 2: Documentation Intelligence Scan (CRITICAL)

**For EACH repository discovered, READ ALL documentation:**

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

**Critical Files to Read:**
- `ARCHITECTURE.md` - Service overview, relationships
- `STRUCTURE.md` - Folder structure, responsibilities
- `DEPENDENCIES.md` - External and internal dependencies
- `SERVICE_RULES.md` - Business logic constraints
- `SHARED_SERVICES.md` - What shared services are used
- `CHANGE_IMPACT.md` - Impact of changes
- `GIT_RULES.md` - Git rules (NO PUSH, NO BRANCHES)

**🚨 Validation Checklist:**

Before proceeding, verify:
- [ ] READ ALL repos' ARCHITECTURE.md
- [ ] READ ALL repos' SHARED_SERVICES.md
- [ ] READ ALL repos' CHANGE_IMPACT.md
- [ ] READ ALL repos' SERVICE_RULES.md
- [ ] Understood cross-repository relationships
- [ ] Identified shared services and dependencies
- [ ] Mapped service boundaries

---

#### 🎯 Step 2.5: Operation Decision Tree (NEW in v2.0)

**🚨 CRITICAL: For EACH repository, determine what operations are required**

**Based on repository type, automatically determine required operations:**

**A. Shared Package Service (🔴)**
```
Detection: Has "publishConfig" in package.json
Operations:
  ✅ Implement changes (models, types)
  ✅ Increment package version (semver)
  ✅ Run: npm run build
  ✅ Run: npm publish
  ✅ Update CHANGELOG.md
  ❌ NEVER: Push code, deploy to server
```

**B. Database Infrastructure Service (🔵)**
```
Detection: Name contains "database", "sync", "migration"
Operations:
  ✅ Update package.json to latest shared version
  ✅ Run: npm install
  ✅ Configure/register new models
  ✅ Run: npm start (test sync)
  ✅ Verify database schema changes
  ❌ NEVER: Push code (unless permanent config change)
```

**C. Business Logic Service (🟢)**
```
Detection: Has controllers/, services/, repositories/
Operations:
  ✅ Update package.json to latest shared version
  ✅ Run: npm install
  ✅ Implement Controller (ALL CRUD methods)
  ✅ Implement Service (ALL business logic)
  ✅ Implement Repository (ALL data access)
  ✅ Add Routes (ALL endpoints)
  ✅ Add DTOs, middleware
  ✅ Test locally with .env
  ❌ NEVER: Push code, deploy to server, create new service
```

**Example - Blog Module:**
```markdown
Repository: shared-models
Type: 🔴 Shared Package
Decision: MUST publish package
Actions:
  1. Create Blog.ts model
  2. Bump version: 2.0.0 → 2.1.0
  3. npm run build
  4. npm publish

Repository: database-sync
Type: 🔵 Database Infrastructure
Decision: MUST sync models
Actions:
  1. Update package.json: "shared-model": "^2.1.0"
  2. npm install
  3. Register Blog model
  4. npm start (sync)

Repository: job-service
Type: 🟢 Business Logic
Decision: MUST implement complete CRUD
Actions:
  1. Update package.json: "shared-model": "^2.1.0"
  2. npm install
  3. Create BlogController (GET, POST, PUT, DELETE)
  4. Create BlogService (all business logic)
  5. Create BlogRepository (all data access)
  6. Add routes, DTOs, middleware
```

---

#### 🧠 Step 3: Deep Understanding Extraction

**From documentation, extract and build internal understanding:**

##### 1. Architecture Mapping

**Understand:**
- How each service fits in the system
- Upstream dependencies (what this service depends on)
- Downstream dependents (who depends on this service)
- Communication patterns (API / events / shared DB)

**Example Output:**
```markdown
Architecture Mapping:
harborUserSvc:
  - Upstream: shared-models, harborShared
  - Downstream: None (leaf service)
  - Communication: REST API

harborJobSvc:
  - Upstream: shared-models, harborShared, harborUserSvc
  - Downstream: None (leaf service)
  - Communication: REST API + Events

shared-models:
  - Upstream: None (base library)
  - Downstream: ALL services
  - Communication: N/A (shared library)
```

##### 2. Dependency Graph

**Map dependencies:**
- Which services depend on this repo?
- Which shared modules are used?
- Impact radius of changes

**Example:**
```markdown
Dependency Graph:
shared-models (HIGH IMPACT)
  ├─ harborUserSvc
  ├─ harborJobSvc
  ├─ harborBlogSvc
  └─ harborWebsite

harborShared (MEDIUM IMPACT)
  ├─ harborUserSvc
  ├─ harborJobSvc
  └─ harborBlogSvc
```

##### 3. Service Rules

**Extract business logic constraints:**
- What operations are allowed?
- What operations are restricted?
- Data ownership rules

##### 4. Git Rules

**Understand git strategy:**
- 🚫 DO NOT push directly to branch
- Create feature branches
- PR requirements
- Commit standards

##### 5. Structure Understanding

**Map code organization:**
- Folder structure
- Existing patterns
- Code conventions

---

#### 🔗 Step 3.5: Dependency Chain Mapping (NEW in v2.0)

**🚨 CRITICAL: Map the complete dependency flow for the task**

**Build dependency chain:**
```
[Shared Package] → (publish) → [Database Sync] → [Business Services] → [Gateway] → [Frontend]
```

**For EACH node in chain:**
1. What changes are needed?
2. What dependencies must be satisfied first? (prerequisites)
3. What version updates are required?
4. What files MUST be created/modified?

**Example - Blog Module:**
```markdown
Dependency Chain:

1. shared-model (Shared Package)
   ├─ Changes: Create Blog.ts model
   ├─ Prerequisites: None
   └─ Post-actions: Version bump → Build → Publish

2. database-sync (Database Infrastructure)
   ├─ Changes: Register Blog model
   ├─ Prerequisites: shared-model@2.1.0 published
   └─ Post-actions: npm install → Configure → Test sync

3. job-service (Business Logic)
   ├─ Changes: Implement Blog CRUD
   ├─ Prerequisites: shared-model@2.1.0 available
   └─ Post-actions: npm install → Implement Controller/Service/Repository

4. api-gateway (Gateway)
   ├─ Changes: Add /api/blog routes
   ├─ Prerequisites: job-service has blog endpoints
   └─ Post-actions: Update routes

5. website (Frontend)
   ├─ Changes: Create blog UI
   ├─ Prerequisites: api-gateway has /api/blog routing
   └─ Post-actions: Create pages/components
```

---

#### 🔗 Step 4: Cross-Repository Impact Analysis

**Based on the task, identify:**

1. **Affected Repositories:**
   - Which repo(s) need to be modified?
   - Which repo(s) should NOT be touched?

2. **Implementation Feasibility:**
   - Is this feature already partially implemented somewhere?
   - Can this be implemented in an existing service?
   - Do we really need a new service?

3. **🚨 CRITICAL DECISION:**

   > **DO NOT create new repo/service if existing one can handle it**

**Decision Tree:**
```markdown
Task: "Add user notifications"

Analysis:
1. ✅ Check: Does harborNotificationSvc exist?
   → YES → Use existing service
   → NO → Check if existing service can handle it

2. ✅ Check: Can harborUserSvc handle notifications?
   → Check SERVICE_RULES.md
   → Check ARCHITECTURE.md
   → If NO → Create new service
   → If YES → Extend existing service

3. ✅ Final Decision:
   → Modify existing service (NO new service needed)
```

---

#### 🧩 Step 5: Shared Service Awareness

**If any repo is marked as Shared/Common:**

⚠️ **HIGH IMPACT - Changes MUST consider:**
- All dependent services
- Backward compatibility
- Breaking changes
- Version updates

**Example:**
```markdown
Shared Service Impact Analysis:

Task: "Modify User model in shared-models"

Impact:
- 🔴 HIGH IMPACT - shared-models used by ALL services
- 🔴 AFFECTED SERVICES:
  - harborUserSvc (will break)
  - harborJobSvc (will break)
  - harborBlogSvc (will break)
  - harborWebsite (will break)

Required Actions:
1. Update shared-models User model
2. Update ALL dependent services
3. Ensure backward compatibility
4. Coordinate release across all services
```

---

#### ⚠️ Step 6: Conflict & Risk Detection

**Before implementation, identify:**

1. **Breaking Changes:**
   - API contract changes
   - Data model changes
   - Interface changes

2. **Cross-Service Impact:**
   - Will this break other services?
   - Do dependent services need updates?

3. **Data Inconsistency Risks:**
   - Database schema changes
   - Data migration needs
   - Transactional integrity

4. **API Contract Changes:**
   - Request/response changes
   - Error handling changes
   - Authentication changes

---

#### 📝 Step 7: Execution Plan (MANDATORY OUTPUT)

**Before writing code, OUTPUT a structured analysis plan:**

```markdown
### 📊 ANALYSIS SUMMARY

**Task:** {Task description}

---

#### 1. Affected Repositories:
- ✅ repo-A (PRIMARY)
- ✅ repo-B (SECONDARY)

#### 2. Unaffected Repositories:
- ❌ repo-C (NO CHANGES)
- ❌ repo-D (NO CHANGES)

#### 3. Dependencies Impact:
- repo-A → used by repo-B, repo-C
- repo-B → used by repo-D
- shared-models → used by ALL

#### 4. Approach:
- ✅ Modify existing service: repo-A
- ❌ NO new service needed
- 🔄 Extends existing functionality

#### 5. Risks:
- ⚠️ API contract change in repo-A
- ⚠️ May break repo-B, repo-C
- ⚠️ Requires coordination

#### 6. Shared Modules Impact:
- ❌ NO - Shared modules not affected
  OR
- ✅ YES - shared-models affected (HIGH IMPACT)

#### 7. Git Strategy:
- Create feature branch in repo-A
- DO NOT push directly
- Follow repo's GIT_RULES.md

#### 8. Cross-Repo Sync Requirements:
- ❌ NO sync needed
  OR
- ✅ YES - Update repo-B, repo-C after repo-A changes

#### 9. Final Decision:
- ✅ Safe to proceed
  OR
- ⚠️ Needs clarification: {what needs clarification}

---

### 🎯 IMPLEMENTATION PLAN

**Phase 1: Changes in repo-A**
- File: repo-A/src/file1.ts
- Change: Add new function X
- Reason: Needed for feature Y

**Phase 2: Changes in repo-B** (if needed)
- File: repo-B/src/file2.ts
- Change: Update function Z
- Reason: Adapt to repo-A changes

**Phase 3: Testing**
- Test repo-A changes
- Test repo-B integration
- Verify no breaking changes

---

### 🚨 PROCEEDING TO IMPLEMENTATION

✅ Analysis Complete
✅ All documentation read
✅ Impact assessed
✅ Risks identified
✅ Approach validated

🟢 **NOW PROCEEDING TO IMPLEMENTATION**
```

---

### 🚀 Step 8: Implementation (ONLY AFTER ANALYSIS)

**ONLY AFTER completing ALL above steps:**

1. Start implementation
2. Follow repo structure & rules
3. Make minimal, precise changes
4. Respect service boundaries
5. Maintain backward compatibility

---

#### ✅ Step 8.5: Completeness Verification (NEW in v2.0)

**🚨 CRITICAL: Verify ALL required files and methods are created**

**For EACH repository type, verify completeness:**

**Shared Package Service (🔴):**
```markdown
- [ ] Model file created with ALL fields
- [ ] Model has proper types/interfaces
- [ ] Model exported correctly
- [ ] Package version incremented
- [ ] npm run build successful
- [ ] npm publish successful
- [ ] CHANGELOG.md updated
```

**Database Infrastructure Service (🔵):**
```markdown
- [ ] package.json updated to latest version
- [ ] npm install successful
- [ ] New model imported/registered
- [ ] Sync script run successfully
- [ ] Database schema verified
```

**Business Logic Service (🟢):**
```markdown
Controller (MANDATORY - ALL CRUD METHODS):
- [ ] getAll() - GET /api/resource
- [ ] getById(id) - GET /api/resource/:id
- [ ] create(data) - POST /api/resource
- [ ] update(id, data) - PUT /api/resource/:id
- [ ] delete(id) - DELETE /api/resource/:id

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
- [ ] GET /api/resource
- [ ] GET /api/resource/:id
- [ ] POST /api/resource
- [ ] PUT /api/resource/:id
- [ ] DELETE /api/resource/:id

Additional:
- [ ] DTOs defined (CreateDTO, UpdateDTO, ResponseDTO)
- [ ] Middleware added (auth, validation)
- [ ] Error handling implemented
- [ ] Tests pass locally with .env
```

**Frontend Application (🟣):**
```markdown
Pages (MANDATORY - ALL CRUD PAGES):
- [ ] List page - app/resource/page.tsx
- [ ] Create page - app/resource/create/page.tsx
- [ ] Detail page - app/resource/[id]/page.tsx
- [ ] Edit page - app/resource/[id]/edit/page.tsx

Components:
- [ ] List component (table, cards)
- [ ] Form component (create/edit)
- [ ] Detail component
- [ ] Delete confirmation

API Integration:
- [ ] API service file created
- [ ] getAll() API method
- [ ] getById(id) API method
- [ ] create(data) API method
- [ ] update(id, data) API method
- [ ] delete(id) API method
- [ ] Error handling implemented
- [ ] Loading states implemented
```

---

### 🛑 Anti-Pattern Prevention

**The agent MUST NOT:**

1. ❌ Create new repo/service unless explicitly required
2. ❌ Duplicate logic across services
3. ❌ Ignore documentation
4. ❌ Violate service boundaries
5. ❌ Break dependent services
6. ❌ Make unchecked changes to shared services

---

### 🧠 Smart Behavior

**The agent SHOULD:**

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

---

### 🔄 Sync Awareness

**If change affects multiple services:**

1. Clearly mention sync requirement
2. Suggest updates in dependent repos
3. Coordinate changes across services
4. Maintain compatibility

---

### 🏁 Final Rule

> **"NO ANALYSIS = NO IMPLEMENTATION"**

**This rule is NON-NEGOTIABLE.**

---

## 🔬 Phase 0.75: Self-Auditing Verification System (NEW - MANDATORY)

**🚨 CRITICAL: This is the NEW mandatory phase that ensures agent verifies all work before marking complete.**

**Reference:** `workflows/self-auditing-verification-system.md` (relative to harbor-ai directory)

**Purpose:** Agent verifies its own work - catches missing imports, forgotten commands, incomplete work

**🆕 Key Capabilities:**
- ✅ **File Creation Verification** - Verifies all files exist and compile
- ✅ **Import/Inclusion Verification** - Verifies all imports added (catches missing model imports!)
- ✅ **Command Execution Verification** - Verifies all commands ran successfully (catches forgotten npm start!)
- ✅ **Continuation Verification** - Prevents agent from getting stuck
- ✅ **Self-Audit Loop** - Agent asks "Am I done?" before proceeding

**This phase CANNOT be:**
- ❌ Skipped
- ❌ Bypassed
- ❌ Rushed
- ❌ Marked complete without verification

---

### 🚫 STRICT RULE (NON-NEGOTIABLE)

**After completing work on ANY repository, BEFORE marking complete:**

- ❌ DO NOT assume file is correct
- ❌ DO NOT assume imports are added
- ❌ DO NOT assume commands succeeded
- ❌ DO NOT move to next repo without verification

✅ **ALWAYS run self-audit verification before proceeding**

---

### 📋 Verification Layers

#### Layer 1: File Creation Verification

**After creating ANY file, agent MUST:**

```markdown
File Creation Checklist:
- [ ] File exists at correct path
- [ ] File has content (not empty)
- [ ] File has correct syntax
- [ ] File compiles/runs without errors
- [ ] File has all required exports
- [ ] File has all required imports
```

**How to verify (dynamically, no hardcoding):**

```bash
# For each created file:
file="path/to/file.ts"

# 1. Check file exists
test -f "$file" || echo "ERROR: File not created!"

# 2. Check file not empty
test -s "$file" || echo "ERROR: File is empty!"

# 3. Check syntax (TypeScript)
npx tsc --noEmit "$file" || echo "ERROR: Syntax errors!"

# 4. Check exports
grep -q "export" "$file" || echo "WARNING: No exports found!"

# 5. Check imports satisfied
npx tsc --noEmit || echo "ERROR: Imports not satisfied!"
```

---

#### Layer 2: Import/Inclusion Verification

**🚨 THIS CATCHES THE "MISSING MODEL IMPORT" BUG**

**After creating a model, agent MUST:**

```markdown
Model Inclusion Checklist:
- [ ] Model exported from entity registry
- [ ] Model imported in database config
- [ ] Model imported in files that use it
- [ ] All files compile with imports
```

**How to find files dynamically (based on documentation):**

```javascript
// Read IMPORT_PATTERNS.md to understand repo patterns
const importPatterns = readDocumentation(repo, 'IMPORT_PATTERNS.md');

// Find files that need the model
const filesNeedingModel = findFilesByPattern(repo, importPatterns);

// Add import to each file
for (const file of filesNeedingModel) {
  addImportToFile(file, modelName);

  // Verify file still compiles
  if (!fileCompiles(file)) {
    throw new Error(`File ${file} doesn't compile after adding ${modelName} import!`);
  }
}
```

**Example - Blog Model:**

```markdown
Model Created: models/Blog.ts

Step 1: Find entity registry (from IMPORT_PATTERNS.md)
  File: src/entities/index.ts
  Action: Add `export * from './Blog';`
  Verify: npx tsc --noEmit (no errors)

Step 2: Find database config (from IMPORT_PATTERNS.md)
  File: src/database/connection.ts
  Action: Import Blog, add to entities array
  Verify: npx tsc --noEmit (no errors)

Step 3: Find files using Blog model
  Files: BlogController.ts, BlogRepository.ts
  Action: Add `import { Blog } from '../../entities/Blog';`
  Verify: npx tsc --noEmit (no errors)

Step 4: Final verification
  Run: npx tsc --noEmit
  Should: Show no errors
```

---

#### Layer 3: Command Execution Verification

**🚨 THIS CATCHES THE "FORGOT NPM START" BUG**

**After running ANY command, agent MUST:**

```markdown
Command Execution Checklist:
- [ ] Command executed
- [ ] Command output checked
- [ ] Success indicators verified
- [ ] No errors in output
```

**How to verify commands (based on COMMAND_VERIFY.md):**

```bash
# Example: npm install
npm install

# Verify success (from COMMAND_VERIFY.md)
test -f package-lock.json || echo "ERROR: package-lock.json not created!"
test -d node_modules || echo "ERROR: node_modules not created!"
grep -q "ERR!" npm-debug.log && echo "ERROR: npm install had errors!"

# Example: npm start (database-sync)
npm start &
NPM_PID=$!
sleep 5

# Verify success (from COMMAND_VERIFY.md)
ps -p $NPM_PID || echo "ERROR: npm start process died!"
grep -q "Database synced" logs/app.log || echo "ERROR: Sync not confirmed!"

# Clean up
kill $NPM_PID
```

**For each command type:**

**npm install:**
- ✅ package-lock.json exists/updated
- ✅ node_modules/ exists
- ✅ No ERR! in output

**npm run build:**
- ✅ dist/ or build/ directory created
- ✅ No TypeScript errors
- ✅ Exit code 0

**npm start (database-sync):**
- ✅ Process stays running
- ✅ Logs show "Database synced"
- ✅ Tables created in database

**npm publish:**
- ✅ Package visible in registry
- ✅ New version installable
- ✅ No E404 errors

---

#### Layer 4: Continuation Verification

**🚨 THIS PREVENTS "AGENT GOT STUCK" BUG**

**Before moving to next repo, agent MUST:**

```markdown
Continuation Checklist:
- [ ] Current repo work complete
- [ ] All verifications passed
- [ ] All files created and verified
- [ ] All imports added and verified
- [ ] All commands run and verified
- [ ] Self-audit passed
- [ ] Ready to proceed to next repo
```

**Self-Audit Loop:**

```javascript
async function completeRepo(repo, task) {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      // Do the work
      await implementChanges(repo, task);

      // Verify the work (SAVS)
      await verifyAllChanges(repo, task);

      // Self-audit: Am I done?
      const audit = await selfAudit(repo, task);

      if (audit.complete) {
        console.log(`✅ ${repo} complete and verified`);
        return { success: true, repo };
      } else {
        console.log(`⚠️ Audit found issues:`, audit.issues);
        await fixIssues(audit.issues);
        attempts++;
      }

    } catch (error) {
      console.error(`❌ Error:`, error);
      await fixError(error);
      attempts++;
    }
  }

  throw new Error(`Failed to complete ${repo}`);
}
```

**Self-Audit Questions:**

1. **Did I create all required files?**
   - Check VERIFICATION_CHECKLIST.md
   - Verify all files exist
   - Verify all files compile

2. **Did I add all required imports?**
   - Check IMPORT_PATTERNS.md
   - Verify model exported
   - Verify model imported in config
   - Verify model imported in using files

3. **Did I run all required commands?**
   - Check COMMAND_VERIFY.md
   - Verify npm install succeeded
   - Verify npm run build succeeded
   - Verify npm start succeeded (if database-sync)

4. **Does everything compile?**
   - Run `npx tsc --noEmit`
   - Should show no errors

5. **Can I safely move to next repo?**
   - Only if ALL above are YES

---

### 📊 Repository Completion Verification

**Before marking ANY repository complete, agent MUST:**

```markdown
## Repository Completion Verification

**Repository:** {repo-name}

### File Creation
- [ ] All required files created
- [ ] All files have content
- [ ] All files compile successfully

### Imports & Dependencies
- [ ] All required imports added
- [ ] All imports resolve correctly
- [ ] No circular dependencies

### Model Inclusions (if model created)
- [ ] Model exported from entity registry
- [ ] Model imported in database config
- [ ] Model imported in using files
- [ ] Model registered with ORM

### Commands Executed
- [ ] npm install succeeded (if needed)
- [ ] npm run build succeeded (if needed)
- [ ] npm start succeeded (if needed)
- [ ] npm publish succeeded (if shared package)

### Testing
- [ ] TypeScript compilation verified
- [ ] Runtime tested (if applicable)
- [ ] Database changes verified (if applicable)

### Self-Audit
- [ ] Am I truly done with this repo?
- [ ] Did I miss anything?
- [ ] Is everything verified?
- [ ] Can I safely move to next repo?

Only when ALL items checked:
  ✅ Mark repo complete
  ✅ Move to next repo
```

---

### 🔧 How Agent Uses SAVS

**Integration:**

```javascript
// For each repository in task
for (const repo of affectedRepos) {
  console.log(`\n🔧 Working on: ${repo}`);

  // Implement changes
  await implementChanges(repo, task);

  // VERIFY using SAVS
  const verification = await verifyRepository(repo, task);

  if (!verification.success) {
    console.log(`❌ Verification failed!`);
    console.log(`Issues:`, verification.issues);
    await fixIssues(verification.issues);

    // Re-verify
    const recheck = await verifyRepository(repo, task);
    if (!recheck.success) {
      throw new Error(`Failed to verify ${repo}!`);
    }
  }

  console.log(`✅ ${repo} verified successfully`);
}

// Final cross-repo verification
await verifyCrossRepoDependencies(affectedRepos);
```

---

## ⚙️ Phase 0.85: Mandatory Command Execution (NEW - MANDATORY)

**🚨 CRITICAL: This phase PREVENTS forgotten commands (like npm start)!**

**Reference:** `workflows/mandatory-command-execution.md` (relative to harbor-ai directory)

**Purpose:** Agent MUST run ALL required commands and VERIFY they succeeded

**🆕 Key Capabilities:**
- 📖 **Read COMMAND_VERIFY.md** to identify required commands
- ⚡ **Execute ALL required commands** (not optional!)
- ✅ **Verify EACH command succeeded** (check success indicators)
- 🔄 **Retry failed commands** (up to 3 times)
- 🚫 **Block completion** until ALL commands verified

**This phase CANNOT be:**
- ❌ Skipped
- ❌ Marked complete without running commands
- ❌ Marked complete without verifying commands

---

### 🚫 STRICT RULE (NON-NEGOTIABLE)

**After implementing changes in a repo:**

- ❌ DO NOT mark complete without running commands
- ❌ DO NOT assume command succeeded without verification
- ❌ DO NOT move to next repo without command verification

✅ **ALWAYS execute required commands and verify success**

---

### 📊 Command Execution Process

**Step 1: Identify Required Commands (from documentation)**

```bash
# Read COMMAND_VERIFY.md from repo
cat repo/docs/COMMAND_VERIFY.md

# Extract required commands based on repo type
```

**Repository Type → Required Commands:**
- **Shared Package:** npm run build, npm publish
- **Database Infrastructure:** npm install, **npm start** (MANDATORY!)
- **Business Logic:** npm install, npx tsc --noEmit

**Step 2: Execute Each Command MANDATORILY**

```javascript
for (const cmd of requiredCommands) {
  let attempts = 0;
  while (attempts < 3) {
    // Execute command
    const result = executeCommand(cmd);

    // Verify success
    if (verifyCommandSuccess(cmd, result)) {
      break; // Success, move to next command
    }

    // Failed, retry
    attempts++;
  }
}
```

**Step 3: Verify Each Command Succeeded**

**For npm install:**
- ✅ package-lock.json exists/updated
- ✅ node_modules/ exists
- ✅ No ERR! in output

**For npm run build:**
- ✅ dist/ or build/ created
- ✅ No TypeScript errors

**For npm start (database-sync) ← YOUR ISSUE!**
- ✅ Process stays running (doesn't crash)
- ✅ Logs show "Database synced" or "Server started"
- ✅ Tables created in database
- ✅ Process stopped cleanly

**Step 4: Only Mark Complete When All Verified**

```markdown
Command Completion Checklist:
- [ ] All required commands executed
- [ ] npm install verified
- [ ] npm run build verified (if needed)
- [ ] npm start verified ← THIS WAS MISSING!
- [ ] npm publish verified (if needed)
```

---

### 📋 Command Execution Output

**Agent MUST output:**

```markdown
## Command Execution

**Repository:** {repo-name}

**Required Commands (from COMMAND_VERIFY.md):**
- npm install
- npm start ← MANDATORY for database-sync!

**Executing: npm install**
  ✅ package-lock.json updated
  ✅ node_modules exists
  ✅ Verified

**Executing: npm start** ← THIS WAS MISSING BEFORE!
  Starting process...
  PID: 12345
  Waiting 5 seconds...
  ✅ Process still running
  ✅ Logs show "Database synced"
  ✅ Blog table created in database
  Stopping process...
  ✅ Process stopped
  ✅ Verified

**Result:** ✅ All commands executed and verified
```

---

### 🚨 Anti-Pattern Prevention

**❌ WRONG:**
```
Repository: database-sync
Agent: Updated files
  ✅ Files updated
  ❌ npm start NOT run ← YOUR ISSUE!
  ❌ Marked complete
```

**✅ RIGHT:**
```
Repository: database-sync
Agent: Updated files
  ✅ Files updated

Reading: COMMAND_VERIFY.md
  Found: npm start is MANDATORY

Executing: npm start
  ✅ Process started
  ✅ Logs verified
  ✅ Database synced
  ✅ Process stopped

Result: ✅ All commands executed and verified
```

---

## 🧠 Phase 1: Full Repository Analysis Engine (MANDATORY)

*Same as v10.1 - Deep analysis of target repository*

---

## 🌐 Phase 2: Cross-Service Intelligence (MANDATORY)

*Same as v10.1 - Cross-service dependency mapping*

---

## 📝 Phase 3: Documentation Generation (MANDATORY)

*Same as v10.1 - Auto-generate missing documentation*

---

## 🧠 Phase 4: Execution Planning (MANDATORY)

*Same as v10.1 - Detailed execution plan*

---

## 🧠 Phase 5: Implicit Requirement Inference (MANDATORY)

*Same as v10.1 - Infer system requirements*

---

## 🧠 Phase 6: Pattern-Based Implementation (MANDATORY)

*Same as v10.1 - Follow existing patterns*

---

## ⚙️ Phase 7: Runtime Execution (MANDATORY)

*Same as v10.1 - Run and verify services*

---

## 🧪 Phase 8: API Testing (MANDATORY)

*Same as v10.1 - Real API testing*

---

## 🔁 Phase 9: Auto Debug & Fix Loop (MANDATORY)

*Same as v10.1 - Debug until zero errors*

---

## ✅ Phase 10: Evidence-Based Validation (MANDATORY)

*Same as v10.1 - Evidence-based validation*

---

## 📋 Phase 11: Documentation Update (MANDATORY)

*Same as v10.1 - Update documentation*

---

## 🔄 Phase 12: Git Integration (MANDATORY)

*Same as v10.1 - Local git changes, NO PUSH*

---

# 🎯 Key Improvements in v11.0

## From Task Executor to System Architect

### Before (v10.1):
- ❌ Agent receives task → generates docs → starts implementing
- ❌ Makes assumptions about system
- ❌ Creates duplicate services
- ❌ Breaks existing functionality

### After (v11.0):
- ✅ Agent receives task → analyzes ALL repos → understands system → implements correctly
- ✅ Makes informed decisions based on documentation
- ✅ Reuses existing services
- ✅ Maintains system integrity

## Mandatory Analysis Output

**Before implementation, agent MUST output:**

1. ✅ Affected Repositories (with reasons)
2. ✅ Unaffected Repositories (with reasons)
3. ✅ Dependencies Impact (with dependency graph)
4. ✅ Approach (modify vs create new)
5. ✅ Risks (with mitigation)
6. ✅ Shared Modules Impact (HIGH/MEDIUM/LOW)
7. ✅ Git Strategy (branching approach)
8. ✅ Cross-Repo Sync Requirements
9. ✅ Final Decision (proceed vs clarify)

## Anti-Pattern Prevention

**Prevents:**
- ❌ Creating unnecessary new services
- ❌ Duplicating logic across services
- ❌ Breaking shared services
- ❌ Violating service boundaries
- ❌ Making unchecked changes

**Ensures:**
- ✅ System-aware decisions
- ✅ Proper impact analysis
- ✅ Safe, minimal changes
- ✅ Architecture integrity
- ✅ Cross-service coordination

---

# 🚨 Quick Reference

### Before ANY Implementation

**MUST COMPLETE:**

1. [ ] Phase 0: Documentation Gate
2. [ ] Phase 0.5: Pre-Execution Intelligence Analysis
   - [ ] Repository Discovery
   - [ ] Documentation Intelligence Scan
   - [ ] Deep Understanding Extraction
   - [ ] Cross-Repository Impact Analysis
   - [ ] Shared Service Awareness
   - [ ] Conflict & Risk Detection
   - [ ] Execution Plan Output
3. [ ] Phase 1-12: Remaining phases

### Execution Flow

```
Task Received
  ↓
Phase 0: Documentation Gate (Auto-validate docs)
  ↓
Phase 0.5: Pre-Execution Intelligence Analysis (NEW!)
  ├─ Repository Discovery
  ├─ Documentation Scan
  ├─ Deep Understanding
  ├─ Impact Analysis
  ├─ Risk Detection
  └─ Execution Plan Output
  ↓
Review Analysis Plan
  ↓
Phase 1-12: Implementation & Validation
```

---

**End of Global Agent Workflow v11.0**
