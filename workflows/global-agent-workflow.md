# Global Agent Workflow - Master Control System

**Version:** 7.0.0
**Last Updated:** 2026-03-19
**Purpose:** System-aware engineering agent with environment detection, dynamic workflow inference, automatic pipeline construction, and intelligent change propagation

**What's New in v7.0:**
- 🏗️ **Master Control System** - Core execution framework for all agent operations ✨ NEW
- 🔍 **Environment Detection** - Automatically detects microservice vs monolith architecture ✨ NEW
- 🌊 **System Flow Discovery** - Understands how changes flow across the entire system
- ⚙️ **Dynamic Pipeline Construction** - Automatically builds execution pipelines based on system flow
- 🔄 **Workflow-Aware Execution** - Follows detected workflows instead of hardcoded rules
- 🎯 **System-Level Understanding** - Operates like a senior engineer who understands the entire system

**Previous Features (from v6.0):**
- 🎁 Package-Based Architecture Support
- 🔄 Automatic Package Propagation
- 📦 Package Lifecycle Detection
- 🔗 Cross-Repository Synchronization
- ✨ Visible Repository Analysis
- 📊 Live Progress Table
- 📝 Detailed Logs
- 🔄 Sequential Processing

---

# 🏗️ MASTER CONTROL SYSTEM (CORE FRAMEWORK)

**This is the MANDATORY operating protocol for ALL tasks.**

## 🏁 Phase 0: Environment Detection (MANDATORY)

**Before performing ANY implementation, the agent MUST:**

### Step 0.1: Perform Full Directory Scan

```bash
# Scan workspace root
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/

# Detect project structure
find ${WORKSPACE_ROOT} -maxdepth 2 -type d -name ".git" | sed 's|/.git||'
```

### Step 0.2: Identify Project Architecture

**CRITICAL: Determine which execution mode to activate.**

---

### 🌐 [SCENARIO A] Microservice Architecture Detected

**Detection Criteria:**
- ✅ Multiple root-level repositories/services detected
- ✅ Independent `package.json` files across folders
- ✅ Inter-service dependencies identified
- ✅ Separate git repositories

**👉 Action: ACTIVATE DEPENDENCY-FIRST EXECUTION MODE**

**Required Behavior:**

1. **Identify Repository Types:**
   - **Source Repositories** - Where shared logic, models, or core definitions exist
   - **Dependent Repositories** - Services consuming shared logic
   - **Execution/Sync Repositories** - Responsible for applying or syncing changes
   - **Client Layers** - Frontend, app, or UI-based systems

2. **Follow Upstream → Downstream Execution Model:**
   ```
   Source Repositories
       ↓ (version/build if required)
   Dependent Repositories
       ↓ (consume and integrate)
   Execution/Sync Repositories
       ↓ (apply changes)
   Client Layers
       ↓ (UI updates if required)
   ```

3. **Dynamic Inference (NO Hardcoding):**
   - Infer flow from repository analysis
   - Detect dependency relationships automatically
   - Build execution pipeline dynamically

---

### 📦 [SCENARIO B] Monolith Architecture Detected

**Detection Criteria:**
- ✅ Single repository structure
- ✅ Centralized `src/` directory
- ✅ Single `package.json` at root
- ✅ One git repository

**👉 Action: ACTIVATE DIRECT LOCAL EXECUTION MODE**

**Required Behavior:**

1. **Implement Locally:**
   - Create/modify entities/models locally
   - Register in initialization/config files
   - Implement service and controller logic
   - Ensure environment/config integration

2. **Validate End-to-End:**
   - Test within same repository
   - Verify all integrations work
   - No cross-repository propagation needed

---

## 🧠 Intelligence Rules (CRITICAL)

### 🔍 Rule 1: The "Where Else?" Rule

**After creating or modifying ANY component, the agent MUST:**
- ✅ Search for similar patterns across the repository
- ✅ Identify ALL required integration points
- ✅ Update ALL related files (index, registry, config, loaders, etc.)
- ❌ NEVER leave a module partially integrated

### 🔗 Rule 2: Dependency Awareness Rule

**The agent MUST:**
- ✅ Detect relationships between repositories
- ✅ Identify which repos depend on others
- ✅ Propagate changes accordingly
- ❌ NEVER consider a task complete if dependent systems are not updated

### 📦 Rule 3: Version Consistency Rule

**If the project uses versioned dependencies:**
- ✅ Ensure updated versions are reflected in ALL consuming repositories
- ❌ NEVER allow outdated or broken references

### 🔄 Rule 4: Feature Completeness Rule

**If a task describes a feature:**
- ✅ Implement FULL functionality (not partial)
- ✅ Implement ALL required operations (e.g., CRUD if applicable)
- ✅ Implement in ALL layers involved (backend, integration, UI if required)

### 🧪 Rule 5: Testing & Self-Fix Rule

**After implementation:**
1. Generate test scenarios
2. Execute or simulate functionality
3. Detect errors
4. Fix issues
5. Repeat until stable

### 🧠 Rule 6: System Thinking Rule

**The agent MUST think in terms of:**
- ✅ Systems (not files)
- ✅ Workflows (not single repository)
- ✅ Dependencies (not isolated changes)

## 🚫 Critical Restrictions

- ❌ Do NOT hardcode repository names or file names
- ❌ Do NOT assume architecture
- ❌ Do NOT skip analysis
- ❌ Do NOT partially implement features
- ❌ Do NOT stop before full system integration

---

## 🧪 TESTING PHASE CONFIGURATION (2025-03-18)

**Current Mode:** **TESTING** 🧪

**Git Operations:** **DISABLED** ❌

During testing phase, the agent must:
- ✅ Perform code implementation
- ✅ Run validation and testing
- ✅ Verify functionality locally
- ❌ **NOT** create Git branches
- ❌ **NOT** commit changes
- ❌ **NOT** push to remote repositories
- ❌ **NOT** create Pull Requests

**Workflow Behavior:**
After completing implementation, validation, and testing, the agent must **STOP** without triggering any Git actions.

**Purpose:**
- Prevent unwanted commits or pushes during testing
- Allow safe validation of code changes locally
- Enable testing without manual reverts

**Status:** This rule remains in effect until explicitly re-enabled by the user.

---

## 🚨 CORE PHILOSOPHY

**This agent thinks like a senior systems engineer, not a file editor.**

The agent must:
- ✅ **Visible Analysis** - Perform analysis transparently with real-time progress tracking ✨ NEW
- ✅ **Deep Analysis** - Perform comprehensive multi-stage repository analysis before ANY implementation
- ✅ **Complete Understanding** - Fully understand the entire system structure, dependencies, and patterns
- ✅ **Accurate Impact Detection** - Precisely determine ALL repositories affected by a change
- ✅ **Pattern Learning** - Detect and follow ALL implicit patterns and rules in each repository
- ✅ **System Integrity** - Verify complete integration across ALL repositories before completion
- ✅ **Zero Partial Implementation** - NEVER deliver partially integrated features

**The agent must NEVER:**
- ❌ Perform analysis silently without displaying progress
- ❌ Hide the analysis process from the user
- ❌ Begin implementation without deep repository analysis
- ❌ Assume which repositories are affected - MUST analyze dependency graph
- ❌ Skip repositories that depend on modified code
- ❌ Ignore implicit patterns or rules in repositories
- ❌ Consider a feature complete without cross-repository verification
- ❌ Use hardcoded rules - MUST detect patterns from the codebase

---

## 📊 INTEGRATED ANALYSIS SYSTEMS

This workflow integrates the following deep analysis systems:

1. **Visible Repository Analysis** (`visible-repository-analysis.md`) ✨
   - **Transparent, observable analysis with real-time progress tracking**
   - Live updating table showing analysis status
   - Detailed logs during analysis
   - Sequential repository processing
   - Complete analysis summary

2. **Deep Repository Analysis** (`deep-repository-analysis.md`)
   - Comprehensive repository discovery and classification
   - Structural pattern detection
   - Integration pattern detection
   - Repository rule detection

3. **Cross-Repository Dependency Mapper** (`cross-repository-dependency-mapper.md`)
   - Complete dependency graph construction
   - Dependency type classification
   - Change propagation analysis
   - Implementation order calculation

4. **System Flow Discovery** (`system-flow-discovery.md`) 🌊 ✨ NEW
   - **System-level understanding of how changes flow across repositories**
   - Repository role identification (sources, transformers, consumers)
   - Integration pattern detection
   - Change flow graph construction
   - Execution pipeline inference

5. **Dynamic Pipeline Construction** (`system-flow-discovery.md`) ⚙️ ✨ NEW
   - **Automatic execution pipeline generation based on system flow**
   - Affected repository identification
   - Relevant flow selection
   - Task-specific flow customization
   - Execution plan generation with rollback strategy

6. **Feature Impact Analyzer** (`feature-impact-analyzer.md`)
   - Task requirement parsing
   - Domain identification
   - Repository impact scoring
   - Affected repository determination

7. **Repository Rule Detector** (`repository-rule-detector.md`)
   - Version update rule detection
   - Model registration pattern detection
   - API registration pattern detection
   - Export/index file rule detection
   - Dependency synchronization rule detection

8. **Package Lifecycle Detection** (`package-lifecycle-detection.md`) 📦
   - Automatic package repository detection
   - Package type classification (shared library, built library, publishable package, local package, monorepo package)
   - Lifecycle stage detection (version, build, publish, install)
   - Consumer identification and integration pattern detection
   - Dependency synchronization rule detection

9. **Package Propagation Workflow** (`package-propagation-workflow.md`) 🔄
   - Automatic package change propagation
   - Version management (manual, lerna, changesets, standard-version)
   - Build execution for built packages
   - Publishing workflow (if required)
   - Consumer synchronization (version updates, installs, code updates)
   - Cross-repository validation

10. **Cross-Repository Synchronization** (`cross-repository-synchronization.md`)
    - Source-of-truth repository detection
    - Consumer relationship mapping
    - Synchronization pattern detection
    - Automatic consumer updates

11. **Module Registration Awareness** (`module-registration-awareness.md`) 🔧
    - Module registration pattern detection
    - Pre-creation analysis
    - Registration step execution
    - Integration verification

12. **Testing & Self-Validation** (`testing-and-self-validation.md`) 🧪
    - Test scenario generation
    - Build validation
    - Automated testing
    - Error detection and auto-fix loop
    - Final validation

13. **System Integrity Checker** (`system-integrity-checker.md`)
    - Repository coverage verification
    - Cross-repository consistency checks
    - Project convention verification
    - Build and test verification
    - End-to-end integration verification

14. **Repository Role Detection** (`intelligence/repository-role-detection.md`) 🏷️ ✨ NEW (2026-03-19)
    - **Automatic detection of repository roles from code patterns**
    - PUBLISHABLE_PACKAGE detection - Identifies packages that need publishing
    - DATABASE_SYNC_SERVICE detection - Identifies services that sync database schemas
    - Role-based execution ordering - Ensures correct dependency flow
    - Validation gates - Prevents incomplete task completion
    - **Non-breaking enhancement** - Purely additive, no existing logic modified

---

---

## 🚨 MANDATORY STARTUP: Visible Repository Analysis Phase

### 🚨 CRITICAL: Visible, Transparent Analysis Runs BEFORE Any Implementation

**When the agent starts, it MUST perform VISIBLE repository analysis.**

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/visible-repository-analysis.md`

**This analysis is:**
- ✅ **VISIBLE** - User sees progress table and detailed logs
- ✅ **SEQUENTIAL** - One repository at a time
- ✅ **TRANSPARENT** - Every step is logged
- ✅ **OBSERVABLE** - Real-time status updates

---

### Phase 0: Visible Repository Analysis (NEW - MANDATORY)

**🚨 CRITICAL: This phase makes the analysis process FULLY VISIBLE to the user.**

#### Step 0.1: Display Analysis Header

```
## 🔍 Beginning Deep Repository Analysis

Workspace: /Users/mohitshah/Documents/HarborService/
Repositories Discovered: {count}
```

#### Step 0.2: Initialize Progress Table

**Display initial table with all repositories marked as "Pending":**

```markdown
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                    |
| ----------------------- | ------------ | ------------------- | ------------------------ |
| harborSharedModels      | ⏳ Pending    | Unknown             | Not started              |
| harborUserSvc           | ⏳ Pending    | Unknown             | Not started              |
| harborJobSvc            | ⏳ Pending    | Unknown             | Not started              |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started              |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started              |
| harborApp               | ⏳ Pending    | Unknown             | Not started              |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started              |

**Progress:** 0/7 repositories analyzed (0%)
```

#### Step 0.3: Sequential Repository Analysis

**For EACH repository, perform VISIBLE analysis:**

**1. Mark as "In Progress"**
- Update table to show 🔄 In Progress status

**2. Display Repository Header**
```
### 🔍 Analyzing: {Repository Name}
```

**3. Display Detailed Logs**
```
📂 Scanning folder structure...
   ✅ Found: {directories}
   ✅ Detected: {project type}

🏗️  Detecting architecture patterns...
   ✅ Pattern: {pattern}
   ✅ Entry points: {entry points}
   ✅ Key features: {features}

📦 Identifying dependencies...
   ✅ Local dependencies: {deps}
   ✅ External dependencies: {deps}

🎯 Understanding repository role...
   ✅ Purpose: {purpose}
   ✅ Key features: {features}
   ✅ Relationships: {relationships}

📋 Detecting repository rules...
   ✅ Version management: {required/not}
   ✅ File organization: {pattern}
   ✅ Integration pattern: {pattern}
   ✅ Build process: {commands}
   ✅ Testing: {framework}

✅ Analysis complete for {Repository Name}
```

**4. Mark as "Completed"**
- Update table to show ✅ Completed status
- Update notes with summary
- Update progress percentage

**5. Continue to Next Repository**
- Repeat steps 1-4 for ALL repositories

#### Step 0.4: Display Analysis Summary

**After ALL repositories are analyzed:**

```
## ✅ Repository Analysis Complete

**Total Repositories Analyzed:** {count}
**Duration:** {time}

### 📊 Repository Summary

| Repository         | Type              | Purpose                          |
| ------------------ | ----------------- | -------------------------------- |
| harborSharedModels | Shared Library    | Models and types shared across services |
| harborUserSvc      | Backend Service   | User management and authentication |
| harborJobSvc       | Backend Service   | Job lifecycle and scheduling      |
| harborNotificationSvc | Backend Service | Email and SMS notifications      |
| harborWebsite      | Frontend Web      | Web application (Next.js)         |
| harborApp          | Mobile App        | Mobile application (React Native) |
| harborApiGateway   | Gateway           | API gateway and routing           |

### 🔗 Dependency Graph

{dependency graph visualization}

### 📋 Detected Patterns

{list of detected patterns}

### 🎯 Ready for Task Processing

Agent is now ready to process tasks with complete understanding of the workspace.
```

---

### Phase 1: Repository Discovery (DEEP)

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/deep-repository-analysis.md`

**🚨 CRITICAL: This phase runs WITHIN the visible analysis loop.**

**For EACH repository (during visible analysis):**

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

**🚨 CRITICAL: Display this information in the visible logs.**

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

### Phase 3.5: System Flow Discovery (NEW - MANDATORY) 🌊

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/system-flow-discovery.md`

**🚨 CRITICAL: This phase transforms the agent from repository-level operator to system-level intelligence engine.**

#### What This Phase Does

After understanding individual repositories (Phases 1-3), this phase builds a **System Flow Map** that captures:

- **Source Repositories** - Where changes originate (shared libraries, models, types)
- **Transformer Repositories** - Services that transform data (backend services)
- **Consumer Repositories** - Applications that consume data (frontend, mobile)
- **Change Flows** - How changes propagate from sources through transformers to consumers
- **Execution Pipelines** - The complete workflow required for any change

#### 3.5.1 Identify Repository Roles

**Classify EACH repository by its role in the system:**

```javascript
async function identifyRepositoryRoles(repositories) {
  return {
    sources: [
      // Shared libraries, model repositories, type definitions
      { name: "harborSharedModels", type: "sharedLibrary", exports: [...] }
    ],
    transformers: [
      // Backend services that transform and expose APIs
      { name: "harborUserSvc", type: "backendService", transforms: [...] }
    ],
    consumers: [
      // Frontend, mobile apps that consume APIs
      { name: "harborWebsite", type: "frontend", consumes: [...] }
    ]
  };
}
```

#### 3.5.2 Detect Integration Patterns

**For EACH repository, detect how it integrates with others:**

```javascript
async function detectIntegrationPatterns(repositories, roles) {
  // Detect:
  // - Import-based integration
  // - API-based integration
  // - Code generation
  // - File synchronization

  return [
    {
      repository: "harborUserSvc",
      consumesFrom: [
        { source: "harborSharedModels", type: "import-based" }
      ],
      producesFor: [
        { consumer: "harborWebsite", type: "api-based" }
      ]
    }
  ];
}
```

#### 3.5.3 Build Change Flow Graph

**For EACH source repository, trace how changes flow through the system:**

```javascript
async function buildChangeFlowGraph(repositories, roles, integrations) {
  return [
    {
      flowId: "user-model-change-flow",
      trigger: "User model modified in harborSharedModels",
      steps: [
        { step: 1, repository: "harborSharedModels", action: "Update User model" },
        { step: 2, repository: "harborSharedModels", action: "Version update" },
        { step: 3, repository: "harborUserSvc", action: "Update dependency version" },
        { step: 4, repository: "harborUserSvc", action: "Install dependencies" },
        { step: 5, repository: "harborUserSvc", action: "Update API" },
        { step: 6, repository: "harborWebsite", action: "Update API client" },
        { step: 7, repository: "harborWebsite", action: "Update UI" },
        { step: 8, repository: "all", action: "System validation" }
      ],
      repositoriesInvolved: ["harborSharedModels", "harborUserSvc", "harborWebsite"]
    }
  ];
}
```

#### 3.5.4 Infer Execution Pipelines

**Group flow steps into executable stages:**

```javascript
async function inferExecutionPipelines(flowGraph) {
  return {
    "user-model-change-flow": {
      stages: [
        {
          stageNumber: 1,
          repository: "harborSharedModels",
          actions: ["Update User model", "Version update"]
        },
        {
          stageNumber: 2,
          repository: "harborUserSvc",
          actions: ["Update dependency", "Install", "Update API", "Build"]
        },
        {
          stageNumber: 3,
          repository: "harborWebsite",
          actions: ["Update client", "Update UI", "Build"]
        }
      ],
      validationPoints: [...],
      rollbackPlan: {...}
    }
  };
}
```

#### 3.5.5 Display System Flow Map

**🚨 CRITICAL: Display the System Flow Map to the user:**

```markdown
## 🌊 System Flow Map Generated

### Repository Roles

**Sources (2):**
- harborSharedModels: Shared Library (User, Job, Notification models)
- harborTranslations: Translation Repository

**Transformers (3):**
- harborUserSvc: Backend Service (User management, authentication)
- harborJobSvc: Backend Service (Job lifecycle, scheduling)
- harborNotificationSvc: Backend Service (Email, SMS notifications)

**Consumers (2):**
- harborWebsite: Frontend (Next.js web app)
- harborApp: Mobile (React Native app)

### Change Flows Detected (3)

**Flow 1:** user-model-change-flow
├─ Trigger: User model modified in harborSharedModels
├─ Repositories: harborSharedModels → harborUserSvc → harborWebsite → harborApp
└─ Steps: 8 (3 stages)

**Flow 2:** job-model-change-flow
├─ Trigger: Job model modified in harborSharedModels
├─ Repositories: harborSharedModels → harborJobSvc → harborWebsite
└─ Steps: 7 (3 stages)

**Flow 3:** translation-change-flow
├─ Trigger: Translation added to harborTranslations
├─ Repositories: harborTranslations → harborWebsite → harborApp
└─ Steps: 5 (2 stages)

### Execution Pipelines Ready

Agent is now ready to execute tasks with full system-level understanding.
```

#### Output

A **System Flow Map** that:
- Captures how the entire system operates
- Identifies all change propagation paths
- Provides execution pipelines for any task
- Enables autonomous workflow inference

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

#### 4.4 🚨 Decision Validation Step (MANDATORY) ✨ NEW

**🚨 CRITICAL: BEFORE proceeding to implementation, validate ALL decisions.**

**Reference:** `feature-impact-analyzer.md` Step 11-14

**The agent MUST explicitly answer these 6 validation questions:**

1. **Have I checked ALL repositories for potential impact?**
   - Explicit YES/NO answer required
   - Must list ALL repositories analyzed
   - Must provide evidence

2. **Is this feature required in more than one repository?**
   - Explicit YES/NO answer required
   - Must identify all affected repositories
   - Must provide reasoning

3. **Are there multiple platforms serving similar roles?**
   - Identify frontend platforms (harborWebsite, harborApp, etc.)
   - Identify if task affects multiple platforms in same category
   - Verify cross-platform consistency requirements

4. **Will changes in one repository require updates in dependent repositories?**
   - Check dependency graph
   - Identify all dependents
   - Determine if dependent repos need updates

5. **Are shared models/types/configurations being modified?**
   - Identify shared resources being modified
   - Verify ALL consumers are included in impact analysis
   - Check if version updates are required

6. **Does this feature exist in multiple repositories that require consistency?**
   - Check if feature exists in multiple repos
   - Determine if feature parity is required
   - Verify all repos with this feature are updated

**Decision Lock Format:**

```markdown
## 🚨 FINAL DECISION LOCK

**Task:** {task title}

**Affected Repositories:** {count}

**Repository List:**
1. {repository-name} - {Impact Level} - {Reasoning}
2. {repository-name} - {Impact Level} - {Reasoning}
...

**Cross-Platform Consistency:** {REQUIRED/NOT REQUIRED}

**If Consistency Required:**
- Platform Group: {Frontend/Mobile/Backend}
- Repositories in Group: {list}
- Consistency Reasoning: {reasoning}

**Implementation Order:**
1. {repository} - {reason}
2. {repository} - {reason}
...

**Validation Confirmation:**
- [ ] All 6 validation questions answered
- [ ] All repositories explicitly listed
- [ ] Cross-platform consistency verified
- [ ] Implementation order determined
- [ ] NO repositories omitted without explicit reasoning
- [ ] NO assumptions made without evidence

**Decision Status:** LOCKED ✅

**Proceeding to implementation with {count} repositories.**
```

**🚨 ABSOLUTE RULE:**

```
IF ANY validation question is unanswered → DO NOT PROCEED
IF cross-platform consistency is uncertain → RE-ANALYZE
IF implementation order is unclear → RE-ANALYZE
IF confidence is LOW → RE-ANALYZE
```

**Cross-Platform Consistency Examples:**

**Example 1: User Profile Redesign**
```
Task: "Redesign the user profile page"

Analysis:
- harborWebsite has user profile page → AFFECTED
- harborApp has user profile screen → AFFECTED

Decision: BOTH must be updated
Reasoning: Both are user-facing platforms with profile functionality
Cross-Platform Consistency: REQUIRED
```

**Example 2: User Availability Feature**
```
Task: "Add user availability status feature"

Analysis:
- harborUserSvc manages user data → AFFECTED (API)
- harborWebsite displays user data → AFFECTED (UI)
- harborApp displays user data → AFFECTED (UI)

Decision: ALL 3 must be updated
Reasoning:
- Backend: Add availability API
- Web: Add availability UI
- Mobile: Add availability UI
- Feature parity required across platforms
Cross-Platform Consistency: REQUIRED
```

**Uncertainty Resolution:**

**IF the agent is uncertain about ANY repository impact:**

1. **Search repository code** for task-related keywords
2. **Check API endpoints** for relevant endpoints
3. **Check UI components** for related screens/pages
4. **Verify dependencies** - does this repo depend on affected code?
5. **Check dependents** - do other repos depend on this repo?

**After additional analysis, re-run ALL validation questions.**

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

### Phase 5.5: Package-Based Architecture Detection (NEW - MANDATORY) ✨

**🚨 CRITICAL: This phase detects package-based architectures and their propagation requirements.**

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/package-lifecycle-detection.md`

#### Step 5.5.1: Detect Package Repositories

**For EACH repository, determine if it behaves as a package:**

```javascript
async function detectPackageRepositories(repositories) {
  const packageRepos = [];

  for (const repo of repositories) {
    const packageInfo = await detectPackageRepository(repo);

    if (packageInfo.isPackage) {
      console.log(`📦 Package detected: ${repo.name}`);
      console.log(`   Type: ${packageInfo.packageType}`);
      console.log(`   Confidence: ${packageInfo.confidence}%`);

      packageRepos.push({
        repository: repo,
        packageInfo: packageInfo
      });
    }
  }

  return packageRepos;
}
```

#### Step 5.5.2: Build Package Lifecycle Maps

**For EACH package repository, build its complete lifecycle:**

```javascript
async function buildPackageLifecycleMaps(packageRepos) {
  const lifecycleMaps = [];

  for (const packageRepo of packageRepos) {
    console.log(`🔍 Building lifecycle map for ${packageRepo.repository.name}...`);

    const lifecycleMap = await buildPackageLifecycleMap(packageRepo.repository);

    console.log(`   Lifecycle stages:`);
    console.log(`   - Source changes: ${lifecycleMap.lifecycle.sourceChanges ? '✅' : '❌'}`);
    console.log(`   - Version update: ${lifecycleMap.lifecycle.versionUpdate.required ? '✅' : '❌'}`);
    console.log(`   - Build: ${lifecycleMap.lifecycle.build.required ? '✅' : '❌'}`);
    console.log(`   - Publish: ${lifecycleMap.lifecycle.publish.required ? '✅' : '❌'}`);
    console.log(`   - Install: ${lifecycleMap.lifecycle.install.required ? '✅' : '❌'}`);

    console.log(`   Consumers: ${lifecycleMap.consumers.length}`);

    lifecycleMaps.push(lifecycleMap);
  }

  return lifecycleMaps;
}
```

#### Step 5.5.3: Detect Propagation Requirements

**For EACH package repository, determine if it requires propagation:**

```javascript
async function detectPropagationRequirements(packageRepo, task) {
  const willBeModified = await checkIfTaskModifiesPackage(packageRepo, task);

  if (!willBeModified) {
    return {
      requiresPropagation: false,
      reason: 'Package not modified by task'
    };
  }

  const consumers = packageRepo.consumers;

  if (consumers.length === 0) {
    return {
      requiresPropagation: false,
      reason: 'No consumers found'
    };
  }

  return {
    requiresPropagation: true,
    consumers: consumers,
    lifecycle: packageRepo.lifecycle,
    syncRules: packageRepo.syncRules
  };
}
```

#### Step 5.5.4: Build Propagation Strategy

**For EACH package that requires propagation, build the strategy:**

```javascript
async function buildPropagationStrategy(packageRepo, task) {
  const strategy = {
    // Package information
    package: packageRepo.repository,
    packageType: packageRepo.packageType,

    // Lifecycle stages to execute
    stages: [],

    // Consumers to synchronize
    consumers: packageRepo.consumers,

    // Implementation order
    order: [],

    // Validation requirements
    validation: []
  };

  // Determine lifecycle stages
  if (packageRepo.lifecycle.versionUpdate.required) {
    strategy.stages.push('version-update');
  }

  if (packageRepo.lifecycle.build.required) {
    strategy.stages.push('build');
  }

  if (packageRepo.lifecycle.publish.required) {
    strategy.stages.push('publish');
  }

  // Calculate implementation order
  strategy.order = calculatePackageImplementationOrder(packageRepo);

  // Determine validation requirements
  strategy.validation = determineValidationRequirements(packageRepo);

  return strategy;
}
```

#### Step 5.5.5: Display Package Architecture Summary

**After analyzing all packages, display a summary:**

```markdown
## 📦 Package Architecture Analysis

**Package Repositories Detected:** {count}

### Package: harborSharedModels
- Type: Shared Library
- Lifecycle: Manual version, no build, install required
- Consumers: 3 repositories
  - harborUserSvc (version-based: ^1.2.3)
  - harborJobSvc (version-based: ^1.2.3)
  - harborNotificationSvc (version-based: ^1.2.3)

### Package: harborUIComponents
- Type: Built Library (TypeScript)
- Lifecycle: Manual version, TypeScript build, install required
- Consumers: 2 repositories
  - harborWebsite (version-based: ^2.0.0)
  - harborApp (version-based: ^2.0.0)

### Propagation Requirements

**Task affects:** harborSharedModels

**Propagation required:** YES

**Implementation order:**
1. harborSharedModels (source)
   - Update models
   - Bump version
   - Commit changes

2. harborUserSvc (consumer)
   - Update dependency version
   - Run npm install
   - Update code to use new models

3. harborJobSvc (consumer)
   - Update dependency version
   - Run npm install
   - Update code to use new models

4. harborNotificationSvc (consumer)
   - Update dependency version
   - Run npm install
   - Update code to use new models

**Validation:**
- All consumers use same version
- All imports resolve correctly
- All builds pass
```

---

### Phase 5.6: Repository Role Detection (NEW - MANDATORY) 🏷️ ✨ (2026-03-19)

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/intelligence/repository-role-detection.md`

**🚨 CRITICAL: This phase automatically detects repository roles from code patterns, NOT from configuration.**

**This is a NON-BREAKING enhancement.** It adds intelligent role detection without modifying existing behavior.

#### What This Phase Does

After understanding packages and their lifecycles, this phase:
1. **Detects PUBLISHABLE_PACKAGE** - Repositories that require publishing after changes
2. **Detects DATABASE_SYNC_SERVICE** - Repositories that sync database schemas
3. **Builds execution order** - Determines correct sequence of operations
4. **Creates validation gates** - Ensures no steps are skipped

#### Step 5.6.1: Detect Publishable Packages

**For EACH repository, detect if it requires publishing:**

```javascript
async function detectPublishablePackages(repositories) {
  const results = [];

  for (const repo of repositories) {
    const signals = {
      // Strong indicators
      hasPublishScript: await hasScript(repo, 'publish'),
      isNotPrivate: await checkPackagePrivate(repo) === false,
      hasPublishConfig: await hasField(repo, 'publishConfig'),

      // Supporting indicators
      exportsModules: await hasExports(repo),
      hasConsumers: await hasDependents(repo),
      hasVersion: await hasVersionField(repo),
      noServerEntry: await lacksServerCode(repo)
    };

    const score = calculatePublishableScore(signals);
    const isPackage = score >= 70;

    if (isPackage) {
      console.log(`📦 ${repo.name}`);
      console.log(`   ✅ PUBLISHABLE_PACKAGE detected (${score}% confidence)`);
      console.log(`   → Will publish after changes\n`);

      results.push({
        repository: repo,
        role: 'PUBLISHABLE_PACKAGE',
        confidence: score,
        requiredActions: ['version-update', 'build', 'publish'],
        blocking: true
      });
    }
  }

  return results;
}
```

#### Step 5.6.2: Detect Database Sync Services

**For EACH repository, detect if it performs database synchronization:**

```javascript
async function detectDatabaseSyncServices(repositories) {
  const results = [];

  for (const repo of repositories) {
    const signals = {
      // Strong indicators
      hasSequelizeSync: await codeContains(repo, 'sequelize.sync('),
      hasSyncScript: await hasScript(repo, 'sync') ||
                     await hasScript(repo, 'db:sync'),

      // Supporting indicators
      hasModels: await hasDirectory(repo, 'models'),
      hasMigrations: await hasDirectory(repo, 'migrations'),
      hasDatabaseConnection: await hasDatabaseSetup(repo),
      ormType: await detectOrm(repo)
    };

    const score = calculateDatabaseSyncScore(signals);
    const isDbSync = score >= 50;

    if (isDbSync) {
      console.log(`🗄️  ${repo.name}`);
      console.log(`   ✅ DATABASE_SYNC_SERVICE detected (${score}% confidence)`);
      console.log(`   → Will sync database if models change\n`);

      results.push({
        repository: repo,
        role: 'DATABASE_SYNC_SERVICE',
        confidence: score,
        requiredActions: ['database-sync'],
        trigger: 'model-changes'
      });
    }
  }

  return results;
}
```

#### Step 5.6.3: Build Execution Order

**Automatically determine execution order from detected roles:**

```javascript
async function buildExecutionOrder(repositories) {
  // Detect all roles
  const packages = await detectPublishablePackages(repositories);
  const dbServices = await detectDatabaseSyncServices(repositories);
  const backends = await detectBackendServices(repositories);
  const frontends = await detectFrontendServices(repositories);

  const stages = [];

  // Stage 1: Publishable packages (must be first)
  if (packages.length > 0) {
    stages.push({
      stage: 1,
      name: 'Package Publishing',
      repositories: packages,
      reason: 'Shared code must be published before consumers can use it',
      blocking: true
    });
  }

  // Stage 2: Database sync (after packages, if models changed)
  if (dbServices.length > 0) {
    stages.push({
      stage: 2,
      name: 'Database Synchronization',
      repositories: dbServices,
      reason: 'Database schema must match updated models',
      trigger: 'model-changes',
      blocking: false
    });
  }

  // Stage 3: Backend services (consume packages)
  if (backends.length > 0) {
    stages.push({
      stage: 3,
      name: 'Backend Services',
      repositories: backends,
      reason: 'Services consume published packages'
    });
  }

  // Stage 4: Frontend (consume backend APIs)
  if (frontends.length > 0) {
    stages.push({
      stage: 4,
      name: 'Frontend Applications',
      repositories: frontends,
      reason: 'Frontend consumes backend APIs'
    });
  }

  return stages;
}
```

#### Step 5.6.4: Display Role Detection Summary

**🚨 CRITICAL: Display the role detection summary to the user:**

```markdown
## 🏷️ Repository Role Detection Complete

### Detected Roles

**Publishable Packages (2):**
- harborSharedModels (95% confidence)
  - Actions: version-update → build → publish
- harborTranslations (82% confidence)
  - Actions: version-update → build → publish

**Database Sync Services (1):**
- harborUserSvc (88% confidence)
  - Trigger: model-changes
  - Action: database-sync

### Execution Flow

**Stage 1:** Package Publishing
├─ harborSharedModels → BLOCKING (must complete before Stage 2)
└─ harborTranslations → BLOCKING (must complete before Stage 2)

**Stage 2:** Database Synchronization
└─ harborUserSvc → runs if models changed

**Stage 3:** Backend Services
├─ harborUserSvc
└─ harborJobSvc

**Stage 4:** Frontend Applications
├─ harborWebsite
└─ harborApp

✨ All roles detected automatically from code patterns!
```

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
  testingRulesDetected: false,

  // Package-Based Architecture Detection ✨ NEW
  packageRepositoriesDetected: false,
  packageTypesClassified: false,
  packageLifecycleMapsBuilt: false,
  packageConsumersIdentified: false,
  propagationRequirementsDetected: false,
  propagationStrategiesBuilt: false,

  // Repository Role Detection ✨ NEW (2026-03-19)
  publishablePackagesDetected: false,
  databaseSyncServicesDetected: false,
  executionOrderDetermined: false,
  roleValidationRulesDefined: false
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

### Startup Sequence (UPDATED with Visible Analysis)

```
1. User: "start harbor-ai" (or similar trigger)

2. Agent: ## 🔍 Beginning Deep Repository Analysis
   Workspace: /Users/mohitshah/Documents/HarborService/
   Repositories Discovered: 7

3. Agent: ## 📊 Repository Analysis Progress
   [Displays table with all repos marked as "Pending"]

4. Agent: ### 🔍 Analyzing: harborSharedModels
   📂 Scanning folder structure...
   🏗️  Detecting architecture patterns...
   📦 Identifying dependencies...
   🎯 Understanding repository role...
   📋 Detecting repository rules...
   ✅ Analysis complete for harborSharedModels
   [Updates table: harborSharedModels ✅ Completed]

5. Agent: ### 🔍 Analyzing: harborUserSvc
   [Repeats detailed logs for harborUserSvc]
   [Updates table: harborUserSvc ✅ Completed]

6. Agent: [Continues for ALL repositories...]

7. Agent: ## ✅ Repository Analysis Complete
   **Total Repositories Analyzed:** 7
   **Duration:** 42 seconds

   [Displays summary, dependency graph, detected patterns]

8. Agent: Fetching tasks from Azure DevOps...

9. Agent: Processing tasks...
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
14. [SKIP IN TESTING MODE] Create PRs
15. [SKIP IN TESTING MODE] Close tickets
```

**🧪 Testing Mode Note:** Steps 14-15 are SKIPPED during testing phase. After validation, the agent STOPs without Git operations.

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

### 3.4 Dynamic Pipeline Construction (NEW - MANDATORY) ⚙️

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/system-flow-discovery.md`

**🚨 CRITICAL: This phase transforms planning from static to dynamic.**

#### What This Does

Instead of following hardcoded rules, the agent:
1. **Selects the relevant system flow** from the System Flow Map
2. **Customizes the flow** for the specific task
3. **Generates an execution pipeline** with stages, steps, and validation points
4. **Creates a rollback plan** in case of failures

#### 3.4.1 Identify Affected Repositories

```javascript
async function identifyAffectedRepositories(task, systemFlowMap) {
  const affected = [];

  // Check which repositories are affected by the task
  for (const repo of getAllRepositories()) {
    const impact = await analyzeTaskImpact(task, repo);
    if (impact.level > 0) {
      affected.push({
        repository: repo,
        impactLevel: impact.level, // high/medium/low
        changesRequired: impact.changes
      });
    }
  }

  return affected;
}
```

#### 3.4.2 Select Relevant System Flow

```javascript
async function selectRelevantFlow(task, affectedRepos, systemFlowMap) {
  // Find the flow that matches the task's impact
  const primaryAffected = affectedRepos[0];

  // Find flow for this repository
  const relevantFlow = systemFlowMap.flows.find(
    f => f.source === primaryAffected.repository.name ||
         f.repositoriesInvolved.includes(primaryAffected.repository.name)
  );

  if (!relevantFlow) {
    // Generate ad-hoc flow if none exists
    return await generateAdHocFlow(task, affectedRepos);
  }

  return relevantFlow;
}
```

#### 3.4.3 Customize Flow for Task

```javascript
async function customizeFlowForTask(flow, task, affectedRepos) {
  const customized = { ...flow };

  // Add task-specific context to each step
  customized.steps = await Promise.all(customized.steps.map(async step => {
    return {
      ...step,
      taskContext: {
        taskId: task.id,
        taskType: task.type,
        taskDescription: task.description
      },
      implementationDetails: await generateImplementationDetails(step, task)
    };
  }));

  return customized;
}
```

#### 3.4.4 Generate Execution Plan

```javascript
async function generateExecutionPlan(customizedFlow) {
  return {
    planId: `execution-plan-${Date.now()}`,
    flow: customizedFlow.flowId,
    stages: await buildExecutionStages(customizedFlow),
    totalStages: customizedFlow.estimatedSteps,
    estimatedDuration: await estimatePipelineDuration(customizedFlow),
    validationPoints: await identifyValidationPoints(customizedFlow),
    rollbackPlan: await generateRollbackPlan(customizedFlow)
  };
}
```

#### 3.4.5 Display Execution Plan

**🚨 CRITICAL: Display the execution plan to the user:**

```markdown
## ⚙️ Execution Pipeline Constructed

**Task:** {task description}
**Flow:** {flow name}
**Affected Repositories:** {list}

### Pipeline Stages (3)

**Stage 1:** harborSharedModels
├─ Update User model
├─ Update exports
├─ Bump version: 1.2.3 → 1.2.4
└─ No build required

**Stage 2:** harborUserSvc
├─ Update dependency: harbor-shared-models@1.2.4
├─ Install dependencies
├─ Update API endpoints for new field
└─ Build service

**Stage 3:** harborWebsite
├─ Update API client
├─ Update UI components
└─ Build frontend

### Validation Points (2)

✓ After Stage 1: Package validation
✓ After Stage 3: System validation

### Rollback Plan

If any stage fails:
1. Revert changes in current repository
2. Continue rollback in reverse order
3. Restore system to previous state

### Estimated Duration: 4m 30s

Ready to execute pipeline.
```

---

## Phase 4: Execution (Pipeline-Following) ⚙️

**🚨 CRITICAL: Execute according to the constructed pipeline from Phase 3.4.**

### 4.1 Pipeline Execution

**Execute the stages defined in the execution plan:**

```javascript
async function executePipeline(executionPlan) {
  const results = {
    planId: executionPlan.planId,
    stages: [],
    status: 'in-progress'
  };

  try {
    // Execute each stage in order
    for (const stage of executionPlan.stages) {
      console.log(`\n📍 Stage ${stage.stageNumber}: ${stage.repository}`);

      const stageResult = await executeStage(stage);
      results.stages.push(stageResult);

      if (!stageResult.success) {
        throw new Error(`Stage ${stage.stageNumber} failed: ${stageResult.error}`);
      }

      console.log(`✅ Stage ${stage.stageNumber} complete`);
    }

    // Run validations
    for (const validationPoint of executionPlan.validationPoints) {
      const validationResult = await runValidation(validationPoint);
      if (!validationResult.passed) {
        throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
      }
    }

    results.status = 'success';
  } catch (error) {
    results.status = 'failed';
    results.error = error.message;

    // Execute rollback
    await executeRollback(executionPlan.rollbackPlan);
  }

  return results;
}
```

### 4.2 Context Switching & Pattern Adherence

**For EACH repository in the pipeline:**

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

### Phase 6.5: Role-Based Validation (NEW - MANDATORY) 🏷️ ✨ (2026-03-19)

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/intelligence/repository-role-detection.md`

**🚨 CRITICAL: Before task completion, validate that all role-based requirements were met.**

#### 6.5.1: Validate Publishable Packages

**For each repository with PUBLISHABLE_PACKAGE role:**

```javascript
async function validatePublishablePackages(repositories, task) {
  const results = [];

  for (const repo of repositories) {
    const role = await detectPublishablePackage(repo);

    if (role.role === 'PUBLISHABLE_PACKAGE') {
      const wasModified = await checkIfModified(repo, task);
      const wasPublished = await checkIfPublished(repo);

      if (wasModified && !wasPublished) {
        results.push({
          repository: repo.name,
          status: 'FAILED',
          reason: 'Package was modified but not published',
          requiredAction: 'Execute publish workflow before proceeding'
        });
      } else {
        results.push({
          repository: repo.name,
          status: 'PASSED',
          reason: wasModified ? 'Package was modified and published' : 'Package not modified, no action required'
        });
      }
    }
  }

  return results;
}
```

#### 6.5.2: Validate Database Sync Services

**For each repository with DATABASE_SYNC_SERVICE role:**

```javascript
async function validateDatabaseSyncServices(repositories, task) {
  const results = [];

  for (const repo of repositories) {
    const role = await detectDatabaseSyncService(repo);

    if (role.role === 'DATABASE_SYNC_SERVICE') {
      const modelsChanged = await checkModelsChanged(repo, task);
      const syncExecuted = await checkSyncExecuted(repo);

      if (modelsChanged && !syncExecuted) {
        results.push({
          repository: repo.name,
          status: 'FAILED',
          reason: 'Models changed but database sync not executed',
          requiredAction: 'Run database sync before proceeding'
        });
      } else {
        results.push({
          repository: repo.name,
          status: 'PASSED',
          reason: modelsChanged ? 'Models changed and database synced' : 'No model changes, no sync required'
        });
      }
    }
  }

  return results;
}
```

#### 6.5.3: Execute Validation and Auto-Fix

**🚨 CRITICAL: If validation fails, automatically execute missing steps:**

```javascript
async function executeRoleBasedValidation(repositories, task) {
  console.log('\n🏷️  Role-Based Validation\n');

  // Validate publishable packages
  const packageResults = await validatePublishablePackages(repositories, task);
  const dbResults = await validateDatabaseSyncServices(repositories, task);

  const allResults = [...packageResults, ...dbResults];
  const failures = allResults.filter(r => r.status === 'FAILED');

  if (failures.length > 0) {
    console.log('❌ Validation Failed. Missing steps detected:\n');

    for (const failure of failures) {
      console.log(`   ${failure.repository}:`);
      console.log(`   ❌ ${failure.reason}`);
      console.log(`   → Action: ${failure.requiredAction}\n`);
    }

    console.log('🔧 Executing missing steps...\n');

    // Auto-fix: Execute missing steps
    for (const failure of failures) {
      if (failure.requiredAction.includes('publish')) {
        const repo = repositories.find(r => r.name === failure.repository);
        console.log(`📤 Publishing ${failure.repository}...`);
        await executePublishablePackageWorkflow(repo);
      }

      if (failure.requiredAction.includes('database sync')) {
        const repo = repositories.find(r => r.name === failure.repository);
        console.log(`🗄️  Syncing database for ${failure.repository}...`);
        await executeDatabaseSyncWorkflow(repo);
      }
    }

    // Re-validate
    console.log('\n🔄 Re-validating...\n');
    return await executeRoleBasedValidation(repositories, task);
  }

  console.log('✅ All role-based validations passed!\n');
  return allResults;
}
```

#### 6.5.4: Display Validation Summary

```markdown
## 🏷️  Role-Based Validation Complete

### Publishable Packages

✅ harborSharedModels
   - Status: Modified and published
   - Version: 1.2.3 → 1.2.4

✅ harborTranslations
   - Status: No changes detected
   - Action: Not required

### Database Sync Services

✅ harborUserSvc
   - Status: Models changed, database synced
   - Sync: Completed successfully

### Validation Result

✅ ALL CHECKS PASSED
→ No steps were skipped
→ All role requirements were met
→ Task is complete

```

**🚨 ENFORCEMENT RULE:**

```
IF ANY validation fails → DO NOT mark task as complete
IF ANY step was skipped → Execute missing step
IF re-validation fails → Continue until all pass
ONLY when ALL pass → Task can be marked complete
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
9. [SKIP IN TESTING MODE] Create PRs
10. [SKIP IN TESTING MODE] Close tickets
```

**🧪 Testing Mode Note:** Steps 9-10 are SKIPPED during testing phase. After validation, the agent STOPs without Git operations.

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

**🧪 TESTING MODE BEHAVIOR:**
- After validation/testing is complete: **STOP**
- DO NOT create Git branches
- DO NOT commit changes
- DO NOT push to remote
- DO NOT create Pull Requests
- DO NOT close tickets

**🚀 NORMAL MODE BEHAVIOR (when testing is disabled):**
- After validation/testing is complete:
  - Create Git branches for all affected repositories
  - Commit changes with descriptive messages
  - Push to remote repositories
  - Create Pull Requests
  - Close Azure DevOps tickets

---

**End of Global Agent Workflow**
