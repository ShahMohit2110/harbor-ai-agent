# Global Agent Workflow - Deep Repository Intelligence

**Version:** 4.0.0
**Last Updated:** 2026-03-18
**Purpose:** Fully autonomous agent with deep repository analysis, comprehensive dependency mapping, and system integrity verification

---

## 🚨 CORE PHILOSOPHY

**This agent thinks like a senior systems engineer, not a file editor.**

The agent must:
- ✅ **Deep Analysis** - Perform comprehensive multi-stage repository analysis before ANY implementation
- ✅ **Complete Understanding** - Fully understand the entire system structure, dependencies, and patterns
- ✅ **Accurate Impact Detection** - Precisely determine ALL repositories affected by a change
- ✅ **Pattern Learning** - Detect and follow ALL implicit patterns and rules in each repository
- ✅ **System Integrity** - Verify complete integration across ALL repositories before completion
- ✅ **Zero Partial Implementation** - NEVER deliver partially integrated features

**The agent must NEVER:**
- ❌ Begin implementation without deep repository analysis
- ❌ Assume which repositories are affected - MUST analyze dependency graph
- ❌ Skip repositories that depend on modified code
- ❌ Ignore implicit patterns or rules in repositories
- ❌ Consider a feature complete without cross-repository verification
- ❌ Use hardcoded rules - MUST detect patterns from the codebase

---

## 📊 INTEGRATED ANALYSIS SYSTEMS

This workflow integrates the following deep analysis systems:

1. **Deep Repository Analysis** (`deep-repository-analysis.md`)
   - Comprehensive repository discovery and classification
   - Structural pattern detection
   - Integration pattern detection
   - Repository rule detection

2. **Cross-Repository Dependency Mapper** (`cross-repository-dependency-mapper.md`)
   - Complete dependency graph construction
   - Dependency type classification
   - Change propagation analysis
   - Implementation order calculation

3. **Feature Impact Analyzer** (`feature-impact-analyzer.md`)
   - Task requirement parsing
   - Domain identification
   - Repository impact scoring
   - Affected repository determination

4. **Repository Rule Detector** (`repository-rule-detector.md`)
   - Version update rule detection
   - Model registration pattern detection
   - API registration pattern detection
   - Export/index file rule detection
   - Dependency synchronization rule detection

5. **System Integrity Checker** (`system-integrity-checker.md`)
   - Repository coverage verification
   - Cross-repository consistency checks
   - Project convention verification
   - Build and test verification
   - End-to-end integration verification

---

---

## MANDATORY STARTUP: Deep Repository Analysis Phase

### 🚨 CRITICAL: Deep Analysis Runs BEFORE Any Implementation

**When the agent starts, it MUST perform comprehensive repository analysis.**

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/deep-repository-analysis.md`

---

### Phase 1: Repository Discovery (DEEP)

**🚨 CRITICAL: This is NOT a simple directory scan. This is DEEP discovery.**

#### 1.1 Workspace Scanning

```bash
# Workspace root
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/

# Find ALL git repositories
find ${WORKSPACE_ROOT} -maxdepth 2 -type d -name ".git" | sed 's|/.git||'
```

#### 1.2 Repository Classification

**For EACH repository, perform comprehensive classification:**

**Read:**
- `deep-repository-analysis.md` Section 1.2: Repository Classification

**Execute classification algorithm:**
- Detect repository type (Backend Service, Frontend Web, Mobile App, Shared Library, etc.)
- Infer repository purpose from multiple data sources
- Identify repository role in the system
- Calculate confidence scores

**Output for each repository:**
```javascript
{
  name: "harborUserSvc",
  path: "/path/to/harborUserSvc",
  type: "Backend Service",
  purpose: "User management API service",
  responsibilities: [
    "User authentication",
    "User profile management",
    "User preferences",
    "User availability"
  ],
  confidence: 95
}
```

---

### Phase 2: Structural Pattern Detection

**Reference:** `deep-repository-analysis.md` Section 2: Structural Pattern Detection

#### 2.1 Directory Structure Analysis

**For EACH repository:**

**Analyze:**
- Full directory tree
- Key directories and their purposes
- Architectural pattern (Layered, MVC, Modular, DDD, etc.)
- All entry points (main.js, server.js, App.tsx, etc.)

**Detect:**
- How code is organized
- Where new features should be placed
- What the architectural pattern is

#### 2.2 Entry Point Analysis

**Find ALL entry points:**
- Main entry points (main.js, server.js, app.js)
- Next.js specific (app/, pages/)
- React Native specific (App.tsx, index.tsx)
- API routes
- Exported modules

#### 2.3 Dependency Declaration Analysis

**Understand dependency management:**
- Package manager detection (npm, bun, yarn, pnpm)
- Local dependencies
- External dependencies
- Version strategy
- Workspace references

#### 2.4 Import/Export Pattern Analysis

**Understand module system:**
- Barrel export patterns
- Named export patterns
- Relative vs absolute imports
- Path mapping
- Module resolution (CommonJS, ES Modules)

#### 2.5 Module Registration Pattern Detection

**Detect how new modules are registered:**
- API route registration
- Controller registration
- Service registration
- Model registration
- Middleware registration
- Component registration

#### 2.6 Shared Resource Pattern Detection

**Detect shared resource usage:**
- Shared models
- Shared utilities
- Shared types
- Shared configurations
- Shared constants

---

### Phase 3: Cross-Repository Dependency Mapping

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/cross-repository-dependency-mapper.md`

#### 3.1 Build Dependency Graph

**Construct comprehensive dependency graph:**

```javascript
// For each repository
- Extract local dependencies
- Extract external dependencies
- Detect API dependencies
- Detect data model dependencies
- Detect shared resource dependencies

// Build graph
const graph = {
  nodes: [all repositories],
  edges: [all dependencies]
};
```

#### 3.2 Dependency Type Classification

**Classify each dependency:**
- Code Dependency (imports)
- API Dependency (service calls)
- Database Dependency (shared DB)
- Config Dependency (shared config)
- Type Dependency (TypeScript types)
- Resource Dependency (shared files)

#### 3.3 Dependency Propagation Analysis

**Understand how changes propagate:**
- Direct dependents
- Transitive dependents
- Ripple effect calculation

#### 3.4 Implementation Order Calculation

**Calculate correct implementation order:**
- Topological sort
- Circular dependency detection
- Layer-based ordering

---

### Phase 4: Feature Impact Analysis

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/feature-impact-analyzer.md`

#### 4.1 Task Requirement Parsing

**When a task is received:**

```javascript
function parseTaskRequirements(task) {
  return {
    featureType: identifyFeatureType(task),
    domain: identifyDomain(task),
    dataModels: extractDataModels(task),
    apis: extractApis(task),
    uiComponents: extractUiComponents(task),
    userInteractions: extractUserInteractions(task),
    businessLogic: extractBusinessLogic(task),
    nonFunctional: extractNonFunctionalRequirements(task)
  };
}
```

#### 4.2 Repository Impact Scoring

**Score EACH repository by relevance:**

```javascript
function scoreRepositoryImpact(repository, task, requirements) {
  const score = {
    domainMatch: repository.domain === requirements.domain ? 50 : 0,
    apiMatch: repository.apis.some(api => requirements.apis.includes(api)) ? 30 : 0,
    modelMatch: repository.models.some(model => requirements.dataModels.includes(model)) ? 20 : 0,
    techFit: calculateTechFit(repository, requirements) ? 10 : 0,
    consumerRelevance: calculateConsumerRelevance(repository, requirements) ? 10 : 0
  };

  return {
    totalScore: sum(score),
    classification: score.totalScore >= 70 ? 'PRIMARY' :
                  score.totalScore >= 40 ? 'SECONDARY' :
                  score.totalScore >= 20 ? 'TERTIARY' : 'NONE'
  };
}
```

#### 4.3 Affected Repository Determination

**Determine ALL affected repositories:**

```javascript
const affected = {
  primary: [],    // Directly implement the feature
  secondary: [],  // Consume the feature
  tertiary: []    // May need updates
};

// Score all repositories
// Classify by score
// Add dependency-based repositories
// Calculate implementation order
```

---

### Phase 5: Repository Rule Detection

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/repository-rule-detector.md`

**🚨 CRITICAL: Detect ALL implicit rules before implementation.**

#### 5.1 Version Update Rule Detection

**Detect if version updates are required:**
- Check for package.json version
- Check for version references in other repos
- Check for changelog
- Infer versioning workflow

#### 5.2 Model Registration Rule Detection

**Detect how models are registered:**
- Barrel export in models/index.ts
- ORM registration in database/index.ts
- Sequelize.sync() pattern
- Migration-based pattern

#### 5.3 API Registration Rule Detection

**Detect how APIs are registered:**
- Centralized routes in routes/index.ts
- Controller-based pattern
- Nest.js module-based
- Fastify plugin-based

#### 5.4 Export/Index File Rule Detection

**Detect if index files must be updated:**
- Find all index.ts files
- Detect export patterns
- Infer export instruction

#### 5.5 Dependency Synchronization Rule Detection

**Detect dependency sync requirements:**
- Local dependency versioning
- Install requirements
- Build requirements
- Lock file requirements

#### 5.6 Installation Rule Detection

**Detect installation patterns:**
- Package manager detection
- Install triggers
- Install command
- Lock file handling

#### 5.7 Build Rule Detection

**Detect build patterns:**
- Build script detection
- Build output directory
- Build requirements
- TypeScript compilation
- Bundler detection

#### 5.8 Testing Rule Detection

**Detect testing patterns:**
- Test framework detection
- Test directory location
- Test file naming
- Coverage requirements

---

### Phase 6: Analysis Completion Verification

**🚨 CRITICAL: Verify analysis is complete before proceeding.**

**Analysis Checklist:**

```javascript
const analysisChecklist = {
  // Repository Discovery
  allRepositoriesDiscovered: false,
  repositoriesClassified: false,
  purposesInferred: false,

  // Structural Pattern Detection
  directoryStructureAnalyzed: false,
  entryPointsDetected: false,
  dependencyDeclarationsAnalyzed: false,
  importExportPatternsAnalyzed: false,
  moduleRegistrationPatternsDetected: false,
  sharedResourcePatternsDetected: false,

  // Cross-Repository Dependency Mapping
  dependencyGraphBuilt: false,
  dependenciesClassified: false,
  propagationAnalyzed: false,
  implementationOrderCalculated: false,

  // Feature Impact Analysis
  taskRequirementsParsed: false,
  featureTypeClassified: false,
  domainIdentified: false,
  repositoriesScored: false,
  affectedRepositoriesDetermined: false,

  // Repository Rule Detection
  versionUpdateRulesDetected: false,
  modelRegistrationRulesDetected: false,
  apiRegistrationRulesDetected: false,
  exportRulesDetected: false,
  dependencySyncRulesDetected: false,
  installationRulesDetected: false,
  buildRulesDetected: false,
  testingRulesDetected: false
};

// Verify ALL items are true before proceeding
const analysisComplete = Object.values(analysisChecklist).every(item => item === true);

if (!analysisComplete) {
  throw new Error('Analysis incomplete. Cannot proceed to implementation.');
}
```

**✅ ONLY when ALL checks pass → Continue to implementation**

---

## 🚨 CRITICAL RULES

### Rule 1: Analysis Before Implementation

**❌ WRONG:**
```
User: "Add user availability feature"
Agent: "I'll start implementing in harborUserSvc"
```

**✅ RIGHT:**
```
User: "Add user availability feature"
Agent: "Beginning deep repository analysis..."
Agent: "Building dependency graph..."
Agent: "Analyzing feature impact..."
Agent: "Detecting repository rules..."
Agent: "Analysis complete. Affected repositories: harborSharedModels, harborUserSvc, harborWebsite, harborApp"
Agent: "Beginning implementation in dependency order..."
```

### Rule 2: Never Assume Affected Repositories

**❌ WRONG:**
```
Agent: "This is a user feature, so I'll only modify harborUserSvc"
```

**✅ RIGHT:**
```
Agent: "Analyzing dependency graph..."
Agent: "harborUserSvc depends on harborSharedModels → Must modify"
Agent: "harborWebsite consumes user APIs → Must modify"
Agent: "harborApp consumes user APIs → Must modify"
Agent: "Affected repositories: harborSharedModels, harborUserSvc, harborWebsite, harborApp"
```

### Rule 3: Never Ignore Implicit Rules

**❌ WRONG:**
```
Agent: "I'll create the new model file"
```

**✅ RIGHT:**
```
Agent: "Detecting model registration rules..."
Agent: "Pattern detected: Barrel export in models/index.ts"
Agent: "Action: 1) Create model file, 2) Add export to models/index.ts"
```

### Rule 4: Never Deliver Partial Integration

**❌ WRONG:**
```
Agent: "Implementation complete. harborUserSvc now has user availability."
```

**✅ RIGHT:**
```
Agent: "Verifying cross-repository consistency..."
Agent: "✅ harborSharedModels updated and versioned"
Agent: "✅ harborUserSvc implemented API"
Agent: "✅ harborWebsite updated UI"
Agent: "✅ harborApp updated mobile screens"
Agent: "✅ All repositories build successfully"
Agent: "✅ All tests pass"
Agent: "Feature complete and fully integrated."
```

---

## WORKFLOW INTEGRATION

### Startup Sequence

```
1. User: "start harbor-ai" (or similar trigger)
2. Agent: Beginning deep repository analysis...
3. Agent: Scanning workspace for repositories...
4. Agent: Discovered N repositories
5. Agent: Classifying repositories...
6. Agent: Detecting structural patterns...
7. Agent: Building dependency graph...
8. Agent: Detecting repository rules...
9. Agent: Deep analysis complete
10. Agent: Fetching tasks from Azure DevOps...
11. Agent: Processing tasks...
```

### Task Processing Sequence

```
For each task:
1. Parse task requirements
2. Identify domain and feature type
3. Score repository impact
4. Determine affected repositories
5. Add dependency-based repositories
6. Calculate implementation order
7. Detect repository rules for affected repos
8. Create implementation plan
9. Execute implementation (following detected rules)
10. Verify cross-repository consistency
11. Run system integrity checks
12. Validate all repositories build
13. Validate all tests pass
14. Create PRs
15. Close tickets
```

---

## 🚨 CRITICAL: Autonomous Execution

**After completing analysis and implementation, the agent MUST:**

✅ **Continue AUTOMATICALLY to system integrity verification**
- Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/system-integrity-checker.md`
- Verify ALL affected repositories were modified
- Verify cross-repository consistency
- Verify project conventions were followed
- Verify all builds pass
- Verify all tests pass
- Fix any issues found
- Continue until ALL checks pass

✅ **Continue AUTOMATICALLY to the next workflow phase**
- Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`
- Use the analysis results
- Implement changes in ALL affected repositories
- Follow detected patterns (not assumptions)
- Ensure cross-repository consistency
- DO NOT stop or ask for permission
- DO NOT display "Analysis complete"
- Continue AUTOMATICALLY through all phases

---

**End of Global Agent Workflow v4.0 - Deep Repository Intelligence**
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
