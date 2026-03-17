# Global Agent Workflow - Dynamic Repository Discovery & Adaptive Intelligence

**Version:** 3.0.0
**Last Updated:** 2026-03-17
**Purpose:** Fully dynamic, repository-aware global development agent that adapts to any project structure

---

## 🚨 CORE PHILOSOPHY

**This agent is NOT rule-based. It is ADAPTIVE.**

The agent must:
- ✅ **Discover** - Find all repositories dynamically
- ✅ **Understand** - Learn each repository's purpose from its code
- ✅ **Detect** - Infer patterns and workflows from the codebase
- ✅ **Adapt** - Follow actual implementation patterns, not assumptions
- ✅ **Verify** - Ensure cross-repository consistency

**The agent must NEVER:**
- ❌ Assume all projects follow the same structure
- ❌ Use hardcoded rules about how projects work
- ❌ Apply generic patterns blindly
- ❌ Make decisions without verifying from the codebase

---

## MANDATORY STARTUP: Repository Discovery & Understanding Phase

### Phase 1: Workspace Discovery (AUTOMATIC on Startup)

**🚨 CRITICAL: This phase runs EVERY TIME the agent starts.**

When the user starts the agent (e.g., "start harbor-ai"), the agent MUST:

#### 1.1 Scan All Repositories in Workspace

**Action:** Scan the parent directory of harbor-ai to discover all repositories

```bash
# Workspace root is the parent of harbor-ai
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/

# List all directories
ls -la ${WORKSPACE_ROOT}

# For each directory, check if it's a git repository
# by checking for .git subdirectory
```

**Output:** List of all git repositories in workspace

#### 1.2 Analyze Each Repository's Purpose

**For EACH repository, perform DEEP analysis:**

**Step 1: Read Core Configuration Files**

```
Priority order:
1. package.json (if exists) - reveals framework, dependencies, scripts
2. tsconfig.json (if exists) - reveals TypeScript configuration
3. README.md (if exists) - often states purpose
4. pom.xml, requirements.txt, go.mod (for non-JS projects)
5. Dockerfile, docker-compose.yml (reveals runtime behavior)
6. .env.example (reveals configuration needs)
```

**Step 2: Analyze Directory Structure**

```
For each repository, map the directory structure:

Example inference:
- src/controllers/, src/routes/ → API service
- app/, pages/ → Next.js/web application
- ios/, android/ → Mobile application
- No main/server entry, mostly exports → Shared library
- migrations/, models/, sequelize/ → Database service
- public/, static/, assets/ → Static assets or frontend
```

**Step 3: Detect Technology Stack**

```
From package.json dependencies, detect:
- Backend: express, fastify, nestjs, koa, hapi
- Frontend: next, react, vue, angular, svelte
- Mobile: react-native, flutter, ionic
- Database: sequelize, typeorm, mongoose, prisma
- Testing: jest, cypress, playwright, mocha
- Build: webpack, vite, rollup, esbuild
```

**Step 4: Infer Repository Purpose**

```
Based on ALL collected data, infer purpose with confidence score:

Purpose Categories:
1. Backend Service - API endpoints, business logic, database access
2. Frontend Website - Web UI, pages, browser-based
3. Mobile Application - iOS/Android app
4. Shared Library - Code consumed by other repositories
5. Gateway/Proxy - API Gateway, authentication proxy
6. Worker/Job Service - Background processing
7. Database Service - Database migrations, management
8. Notification Service - Email, SMS, push notifications
9. Socket/Real-time Service - WebSocket, real-time updates
10. Infrastructure/DevOps - CI/CD, deployment, tooling
```

#### 1.3 Detect Patterns Across Repositories

**CRITICAL: This is where the agent LEARNS from the codebase.**

**Pattern Detection:**

**1. Shared Module Pattern**
```
Detect:
- Does a repository export modules that others import?
- Do multiple repositories depend on a common package?
- Are there index.ts/barrel files?

If YES → This is a shared module pattern
Infer workflow:
  1. Changes to shared module require version update
  2. Dependent services must update their dependencies
  3. Install/update required across all consumers
```

**2. API Service Pattern**
```
Detect:
- Express/Fastify/Nest.js present?
- Routes/controllers structure?
- API endpoints defined?
- Service layer pattern?

If YES → This is an API service pattern
Infer workflow:
  1. Changes start in routes/controllers
  2. Business logic in service layer
  3. Data access in repositories/models
  4. API changes require client updates
```

**3. Frontend Pattern**
```
Detect:
- Next.js/React present?
- app/ or pages/ directory?
- Component structure?
- API calls to backend services?

If YES → This is a frontend pattern
Infer workflow:
  1. Changes start in components/pages
  2. API client calls backend services
  3. State management (Redux, Context, etc.)
  4. Styling follows component library patterns
```

**4. Version Management Pattern**
```
Detect:
- Do repositories use specific versions of shared packages?
- Is there a package.json version field?
- Are there changelogs or version tags?

If YES → This project uses version management
Infer workflow:
  1. Shared module changes require version bump
  2. Dependent services update dependency version
  3. npm install/bun install required
  4. Verify no breaking changes
```

**5. Build/Deploy Pattern**
```
Detect:
- Is there a build script in package.json?
- Are there Dockerfiles?
- Is there CI/CD configuration (.github, .gitlab-ci.yml)?
- Are there deployment scripts?

If YES → This project has build/deploy workflow
Infer workflow:
  1. Build required before deploy
  2. Tests must pass
  3. Docker images built (if using Docker)
  4. Deploy to specific environment
```

#### 1.4 Build Repository Relationship Graph

**After analyzing all repositories, build a dependency graph:**

```
Example graph:

harborSharedModels (shared library)
  ↓ exports models
  ↓
harborUserSvc (consumes models) → harborWebsite (consumes API)
  ↓ provides API                  ↓ provides UI
  ↓                                ↓
harborApp (mobile) → harborApiGateWay (gateway)

harborJobSvc (background jobs)
  ↓ consumes APIs
  ↓
harborUserSvc
harborNotificationSvc
```

**Identify:**
- Which repositories depend on which
- How changes propagate across repositories
- What the implementation order must be
- Which repositories are affected by a change

---

## Phase 2: Task Intake & Dynamic Resolution

### 2.1 Parse Task Requirements

**Extract from task:**
1. **Feature/Functionality** - What is being built/changed?
2. **Affected Domain** - User, Job, Notification, etc.?
3. **User-Facing Changes** - UI, API, both?
4. **Data Models** - Are new/changed models needed?

### 2.2 Dynamic Repository Resolution

**🚨 CRITICAL: Do NOT use hardcoded mappings.**

**Instead, use the repository relationship graph:**

```
Algorithm:
1. Parse task for domain keywords (user, job, notification, etc.)
2. For each repository in graph:
   a. Check inferred purpose
   b. Check detected APIs/endpoints
   c. Check domain relevance
   d. Calculate relevance score

3. Sort by relevance score
4. Return affected repositories

Relevance Score:
- Domain match: 50 points
- API/endpoint match: 30 points
- Technology fit: 10 points
- Relationship: 10 points
```

**Example:**
```
Task: "Add user availability feature"

Analysis:
- harborUserSvc: User domain, has user APIs → 90 points
- harborSharedModels: Has User model → 70 points
- harborWebsite: Displays user info → 60 points
- harborApp: Shows user profiles → 50 points

Affected Repositories:
1. harborUserSvc (HIGH) - Add availability API
2. harborSharedModels (HIGH) - Add availability to User model
3. harborWebsite (MEDIUM) - Display availability
4. harborApp (MEDIUM) - Display availability
```

---

## Phase 3: Dynamic Planning (Pattern-Based)

### 3.1 Understand Existing Patterns

**Before planning, analyze existing patterns in affected repositories:**

**For each repository:**

1. **Read existing code** to understand patterns:
   - How are APIs structured? (REST, GraphQL, etc.)
   - How are components organized?
   - How is state managed?
   - What is the file naming convention?
   - How are tests organized?

2. **Detect project conventions:**
   - Import paths (relative vs. absolute)
   - Code style (semicolons, quotes, etc.)
   - Error handling patterns
   - Logging patterns
   - Configuration patterns

### 3.2 Generate Multi-Repository Plan

**Based on DETECTED patterns, NOT assumptions:**

```
For each affected repository:
1. Analyze existing implementation of similar features
2. Identify the pattern used
3. Plan changes following that pattern
4. Ensure consistency with existing code

Example:
If harborUserSvc uses:
- Controllers in src/controllers/
- Services in src/services/
- Routes defined in src/routes/
- Sequelize models in src/models/

Then the plan MUST follow this structure:
- Add new controller in src/controllers/
- Add service logic in src/services/
- Add routes in src/routes/
- Add/update models in src/models/
```

### 3.3 Implementation Order

**Determine order based on DEPENDENCY GRAPH:**

```
Rule: Implement in dependency order

1. Shared libraries first (harborSharedModels)
   - Reason: Others depend on it
   - Action: Update models, bump version

2. Backend services (harborUserSvc, harborJobSvc, etc.)
   - Reason: Frontend depends on APIs
   - Action: Implement API endpoints

3. Frontend clients (harborWebsite)
   - Reason: Consumes backend APIs
   - Action: Implement UI components

4. Mobile apps (harborApp)
   - Reason: May mirror web functionality
   - Action: Implement mobile screens
```

---

## Phase 4: Execution (Pattern-Following)

### 4.1 Context Switching & Pattern Adherence

**For EACH repository in implementation order:**

1. **Navigate to repository**
   ```bash
   cd /path/to/repository
   ```

2. **Load repository context**
   - Read repository analysis
   - Understand detected patterns
   - Review existing similar code

3. **Implement following EXISTING patterns**
   - Match file structure
   - Match code style
   - Match naming conventions
   - Match error handling
   - Match testing approach

**🚨 CRITICAL: Do NOT introduce new patterns.**

### 4.2 Cross-Repository Consistency Verification

**After implementing in each repository, verify:**

```
Consistency Checklist:
- [ ] If shared model changed, is version updated?
- [ ] Are dependent repositories importing the updated version?
- [ ] Are API changes reflected in all clients?
- [ ] Are imports/exports consistent?
- [ ] Are language translations consistent (if applicable)?
- [ ] Are configuration changes synced?
- [ ] Are build/install steps followed as per project pattern?
```

### 4.3 Workflow Detection & Execution

**CRITICAL: Detect and follow project-specific workflows:**

**Example 1: Shared Module Update Workflow**
```
If detected pattern:
- harborSharedModels exports models
- Other services import from harborSharedModels
- package.json versions are used

Then execute:
1. Update models in harborSharedModels
2. Update package.json version (patch/minor/major)
3. For EACH dependent service:
   a. Update dependency version in package.json
   b. Run npm install/bun install
   c. Verify imports resolve
```

**Example 2: Frontend-Backend API Sync Workflow**
```
If detected pattern:
- Backend exposes APIs
- Frontend consumes APIs via API client
- API changes require frontend updates

Then execute:
1. Implement backend API changes
2. Update API client/type definitions
3. Update frontend components to use new API
4. Verify frontend can call backend successfully
```

---

## Phase 5: Validation & Auto-Fix

### 5.1 Project-Specific Validation

**Detect and run project-specific validation:**

```
For each repository, detect:
- Build command (npm run build, bun run build, etc.)
- Test command (npm test, bun test, etc.)
- Lint command (npm run lint, etc.)

Execute in order:
1. TypeScript compilation (if TypeScript)
2. Build process
3. Linting
4. Tests

If any fail, fix errors and re-run.
```

### 5.2 Auto-Fix Common Issues

**Based on detected project type:**

**Next.js Project:**
```
Common issues:
- Missing imports → Add import
- Type errors → Add type annotations
- Broken routes → Fix route paths
- Missing API calls → Add API integration
```

**Express Backend:**
```
Common issues:
- Missing middleware → Add middleware
- Route conflicts → Fix route paths
- Missing error handling → Add try-catch
- Database connection issues → Fix connection
```

**React Native Mobile:**
```
Common issues:
- Missing native modules → Link modules
- Platform-specific code → Add platform checks
- Navigation issues → Fix navigation config
```

---

## Phase 6: Cross-Repository Consistency Check (MANDATORY)

### 6.1 Verify Complete Implementation

**Before finishing, verify ALL repositories are consistent:**

```
Checklist:
- [ ] Are ALL affected repositories modified?
- [ ] Are shared modules updated and imported correctly?
- [ ] Are versions aligned across dependencies?
- [ ] Are API changes reflected in ALL clients?
- [ ] Are translations/config synced across all repos?
- [ ] Are all builds passing?
- [ ] Are all tests passing?
```

### 6.2 Dependency Propagation Verification

**Ensure changes propagate correctly:**

```
Example verification:
1. harborSharedModels updated
   ✅ Version bumped in package.json
   ✅ New exports added to index.ts

2. harborUserSvc updated
   ✅ package.json references new harborSharedModels version
   ✅ npm install/bun install executed
   ✅ Imports resolve correctly
   ✅ Build passes

3. harborWebsite updated
   ✅ API client updated for new endpoints
   ✅ Components using new API
   ✅ Build passes
```

---

## Adaptive Intelligence Rules

### Rule 1: No Assumptions Without Verification

**❌ WRONG:**
```
"This project uses npm, so I'll run npm install"
```

**✅ RIGHT:**
```
"Check package.json for scripts and engines:
- If 'npm' in scripts, use npm
- If 'bun' in scripts, use bun
- If 'yarn' in scripts, use yarn
- If no scripts, check for lock file (package-lock.json, bun.lockb, yarn.lock)"
```

### Rule 2: Follow Existing Patterns

**❌ WRONG:**
```
"I'll create a new feature following my preferred structure"
```

**✅ RIGHT:**
```
"Analyze existing features in this repository:
- Read 2-3 similar feature implementations
- Identify the pattern used
- Follow the EXACT same pattern
- Maintain consistency with existing code"
```

### Rule 3: Detect Workflow from Codebase

**❌ WRONG:**
```
"All projects require package.json version update"
```

**✅ RIGHT:**
```
"Detect if this project uses versioning:
- Check if harborSharedModels has package.json version
- Check if dependent services reference specific versions
- Check if there's a pattern of version updates
- If YES, follow the version update workflow
- If NO, don't introduce versioning"
```

### Rule 4: Cross-Repository Consistency

**❌ WRONG:**
```
"I'll implement the feature in harborWebsite only"
```

**✅ RIGHT:**
```
"Analyze which repositories are affected:
- harborSharedModels: Model changes? YES
- harborUserSvc: API changes? YES
- harborWebsite: UI changes? YES
- harborApp: Mobile UI? Check if it has similar feature

Implement in ALL relevant repositories, in dependency order"
```

---

## Workflow Integration

### Startup Sequence

```
1. User: "start harbor-ai"
2. Agent: Beginning workspace analysis...
3. Agent: Discovered N repositories...
4. Agent: Analyzing repository purposes...
5. Agent: Detecting patterns across repositories...
6. Agent: Building repository relationship graph...
7. Agent: Workspace analysis complete
8. Agent: Fetching tasks from Azure DevOps...
9. Agent: Beginning task processing...
```

### Task Processing Sequence

```
1. Parse task requirements
2. Resolve affected repositories dynamically
3. Generate multi-repository plan
4. Execute in dependency order
5. Follow detected patterns in each repo
6. Verify cross-repository consistency
7. Validate all repositories
8. Test all repositories
9. Create PRs
10. Close tickets
```

---

## 🚨 CRITICAL: Autonomous Execution

**After completing all phases, the agent MUST:**

✅ **Continue AUTOMATICALLY to the next workflow phase**
- Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`
- Use the repository analysis results
- Implement changes in ALL affected repositories
- Follow detected patterns (not assumptions)
- Ensure cross-repository consistency
- DO NOT stop or ask for permission
- DO NOT display "Analysis complete"
- Continue AUTOMATICALLY through all phases

---

**End of Global Agent Workflow**
