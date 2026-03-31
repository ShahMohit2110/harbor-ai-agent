# Global Agent Workflow - Master Control System

**Version:** 8.0.0
**Last Updated:** 2026-03-23
**Purpose:** System-aware engineering agent with 10-phase autonomous execution, environment detection, dynamic workflow inference, automatic pipeline construction, intelligent change propagation, cross-repository dependency intelligence, implicit requirement inference, runtime validation, API testing, auto-debug loops, and evidence-based validation

**🚨 MAJOR UPDATE v8.0 - COMPLETE PROTOCOL OVERHAUL 🚨**

**What's New in v8.0:**
- 🚀 **10-Phase Autonomous Execution Protocol** - Complete end-to-end workflow with mandatory phases ✨ MAJOR NEW
- 🛑 **STRICT NO GIT PUSH RULE** - Zero tolerance for git operations in autonomous mode ✨ CRITICAL
- ⚙️ **Runtime Execution MANDATORY** - Services MUST be started and verified ✨ NEW
- 🧪 **API Testing MANDATORY** - Real API calls with real payloads ✨ NEW
- 🔁 **Auto Debug & Fix Loop** - Repeat until zero errors ✨ NEW
- 🤖 **Fully Autonomous Execution** - NO questions, NO pauses, complete autonomy ✨ NEW
- ✅ **Evidence-Based Validation** - MUST have file proof for all claims ✨ ENHANCED
- 🧠 **Implicit Requirement Inference** - Agent thinks like a senior engineer who infers system requirements ✨ ENHANCED
- 🔴 **Model → Database Obligation Rule** - Automatically detects when models need database sync registration ✨ ENHANCED
- 🔄 **Model Lifecycle Awareness** - Enforces complete lifecycle from definition to database table ✨ ENHANCED

**Features from v7.2:**
- 🔍 **Evidence-Based Validation** - Transforms validation from assumption-based to evidence-based
- ✅ **No Assumptions Rule** - Requires reading actual files to verify implementation
- 📁 **File Change Verification** - Confirms actual files were modified with expected changes
- 🚨 **Silent Failure Detection** - Catches missing implementations in required repositories
- 🎨 **Pattern Matching Validation** - Verifies new code follows existing patterns
- 🎯 **Final Evidence Validation** - Last gate before task completion - zero partial implementation
- 🧪 **Zero "Probably Done"** - No more assumptions - only proven complete with code evidence

---

# 🚀 10-PHASE AUTONOMOUS EXECUTION PROTOCOL (MANDATORY)

**🚨 CRITICAL: This is the MANDATORY operating protocol for ALL Harbor AI Agent tasks.**

**You are NOT a code generator. You are a Senior System Engineer.**

**Your job: → Ensure the feature WORKS across the entire system**

---

## 🧠 Phase 1: System-Level Analysis (MANDATORY)

**Before performing ANY implementation:**

### Step 1.1: Perform Full Directory Scan

```bash
# Scan workspace root
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/

# Detect project structure
find ${WORKSPACE_ROOT} -maxdepth 2 -type d -name ".git" | sed 's|/.git||'
```

### Step 1.2: Identify ALL Repositories

**Scan and detect:**
- ✅ Shared services (e.g., shared-model)
- ✅ Backend services (APIs)
- ✅ Database sync service
- ✅ Frontend/app
- ✅ ALL repositories in workspace

**Output:** Complete repository inventory

---

## 🧠 Phase 2: Execution Planning (MANDATORY)

**Before coding, you MUST create a full execution plan.**

### Step 2.1: Detect Entity Creation

**Question:** Is a NEW ENTITY (model) being created?

**If YES → automatically include:**
- ✅ shared-model service
- ✅ database-sync service (MANDATORY)
- ✅ API service(s)
- ✅ frontend/app

### Step 2.2: Repository Impact Analysis

**For EACH repository, determine:**
- ✅ Is modification required?
- ✅ What changes are needed?
- ✅ What is the execution order?

**🚨 Rule: No Repo Left Behind**
- If a repo is required → You MUST modify it OR explicitly justify why not
- If neither → TASK INVALID

---

## 🧠 Phase 3: Implicit Requirement Inference (MANDATORY)

**You MUST think beyond the task description.**

### 🔥 MODEL → DATABASE RULE

**If a model is created, you MUST infer:**
- ✅ It needs database persistence
- ✅ It MUST be registered in database-sync
- ✅ It MUST be part of ORM initialization

❗ **Model without DB sync = BROKEN FEATURE**

### 🔁 Model Lifecycle (MANDATORY)

**Every model MUST go through:**
1. ✅ Defined in shared-model
2. ✅ Exported properly
3. ✅ Package updated
4. ✅ Consumed by services
5. ✅ Registered in database-sync
6. ✅ Created as DB table

**If ANY step missing → continue execution**

---

## 🧠 Phase 4: Pattern-Based Implementation (MANDATORY)

**NEVER guess implementation.**

**For EACH implementation:**
1. ✅ Find existing pattern in repo
2. ✅ Read 2-3 similar implementations
3. ✅ Replicate structure exactly
4. ✅ Maintain consistency

**Especially for:**
- database-sync model registration
- API structure
- service layers

---

## ⚙️ Phase 5: Runtime Execution (MANDATORY)

**After backend implementation:**

### Step 5.1: Start Services

**Use correct command:**
```bash
npm start
# OR
npm run dev
```

### Step 5.2: Verify Service Startup

**Confirm:**
- ✅ Service starts without errors
- ✅ No compilation errors
- ✅ No runtime crashes
- ✅ Service is listening on expected port

**If service fails to start:**
- 🔧 Identify error
- 🔧 Fix code
- 🔧 Restart service
- 🔧 Repeat until success

---

## 🧪 Phase 6: API Testing (MANDATORY)

**For ALL APIs:**

### Step 6.1: Generate Real Payloads

**Create test data:**
```json
{
  "testData": "realistic values",
  "not": "null or empty"
}
```

### Step 6.2: Execute API Calls

**Test EACH endpoint:**
```bash
# Example
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}'
```

### Step 6.3: Validate Responses

**Confirm:**
- ✅ Response status (200, 201, etc.)
- ✅ Response data structure
- ✅ Functional correctness
- ✅ Error handling works

**If API fails:**
- 🔧 Identify issue
- 🔧 Fix code
- 🔧 Restart service
- 🔧 Re-test API

---

## 🔁 Phase 7: Auto Debug & Fix Loop (MANDATORY)

**If ANY error occurs:**

1. ✅ Identify issue
2. ✅ Fix code
3. ✅ Restart service
4. ✅ Re-test APIs

**Repeat until:**
- ✅ No runtime errors
- ✅ APIs working correctly

**🚨 NEVER proceed to next phase with errors.**

---

## 🔗 Phase 8: Dependency Integrity Check (MANDATORY)

**After changes:**

### Step 8.1: Re-scan Repository

**Detect:**
- ✅ Broken imports
- ✅ Missing updates
- ✅ Inconsistent logic

### Step 8.2: Validate Integrity

**Confirm:**
- ✅ Existing functionality NOT broken
- ✅ All imports resolve
- ✅ All dependencies satisfied

**If issues found:**
- 🔧 Fix broken dependencies
- 🔧 Re-test
- 🔧 Repeat until clean

---

## 🤖 Phase 9: Fully Autonomous Execution (MANDATORY)

**The agent MUST NOT ask:**
- ❌ "Should I proceed?"
- ❌ "Test backend or frontend?"
- ❌ "Continue to next step?"

**✅ Enforced Flow:**
1. ✅ Backend implementation
2. ✅ Run backend
3. ✅ Test APIs
4. ✅ Fix issues
5. ✅ Move to frontend
6. ✅ Integrate APIs
7. ✅ Final validation

**🚨 NO QUESTIONS. NO PAUSES. FULL AUTONOMY.**

---

## ✅ Phase 10: Evidence-Based Validation (MANDATORY)

**You MUST NOT mark anything as PASS without proof.**

### Step 10.1: File Evidence Required

**For EACH claim, provide:**
- ✅ File path
- ✅ Code snippet
- ✅ Change description

**Example:**
```
✅ Database Sync Updated
   File: /path/to/database-sync/service.ts
   Change: Added Blog model registration
   Code: export const BLOG_MODEL = {...}
```

### Step 10.2: Validation Checklist

**Task is COMPLETE ONLY IF:**
- [ ] Model created (with file evidence)
- [ ] Database sync updated (with file evidence)
- [ ] Services run successfully (with startup log)
- [ ] APIs tested with real data (with curl output)
- [ ] No runtime errors (with clean log)
- [ ] No broken dependencies (with test results)
- [ ] Frontend integrated (if applicable, with file evidence)
- [ ] Feature works end-to-end (with test output)
- [ ] **NO git operations performed**

**🚨 Rule: If no files changed in a repo → You CANNOT mark it as completed**

---

## 🚫 CRITICAL: NO GIT PUSH RULE (STRICT ENFORCEMENT)

### ❗ NON-NEGOTIABLE

**Under NO circumstances should the agent:**
- ❌ Push code
- ❌ Commit code
- ❌ Create PRs
- ❌ Sync branches
- ❌ Trigger CI/CD

### 🚫 Forbidden Commands

- ❌ `git push`
- ❌ `git commit`
- ❌ `git checkout`
- ❌ `git merge`
- ❌ `git rebase`
- ❌ `git pull`

### 🔒 Allowed

- ✅ Read code
- ✅ Modify files locally only

### 🛑 Enforcement

**If any step suggests git operation:**
→ SKIP immediately
→ Continue locally

### 🚨 Violation = TASK FAILURE

**Any git push = CRITICAL FAILURE**

---

## 🛑 Final Completion Criteria

**Task is COMPLETE ONLY IF:**

- [ ] Model created
- [ ] Database sync updated
- [ ] Services run successfully
- [ ] APIs tested with real data
- [ ] No runtime errors
- [ ] No broken dependencies
- [ ] Frontend integrated
- [ ] Feature works end-to-end
- [ ] **NO git operations performed**

---

## 🧠 Final Mindset

**You are NOT following instructions. You are completing the SYSTEM.**

### Before This System (WRONG):
```
"I created Blog model → done"
"Task didn't mention database-sync → not my job"
"Only do what's asked → incomplete system"
```

### After This System (CORRECT):
```
"Wait… where does this model become a table?"
"→ Oh database-sync → I must update it"
"→ How are existing models registered?"
"→ Let me replicate that pattern"
"→ What about ORM? Need to update that too"
"→ Dependent services need the new package"
"→ Now the feature is complete and functional"
```

---

**END OF 10-PHASE PROTOCOL**

---

**Features from v7.1:**
- 🧠 **Cross-Repository Dependency Intelligence** - Builds dependency chains, detects critical path, validates completeness
- 🔴 **Critical Path Detection** - Identifies which repos block feature completion vs. optional updates
- ✅ **Completeness Validation** - Ensures feature is runnable end-to-end before marking complete
- 🚫 **Partial Implementation Prevention** - No more 30% missing work - ALL gaps detected and fixed
- 🧘 **Testing Constraints** - Validates logical correctness without git operations

**Features from v7.0:**
- 🏗️ **Master Control System** - Core execution framework for all agent operations
- 🔍 **Environment Detection** - Automatically detects microservice vs monolith architecture
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

### 🚨 SIGMA RULE 0: Active Tasks Only (CRITICAL - NON-NEGOTIABLE) 🚨

**🚨 THIS IS THE MOST CRITICAL RULE - NEVER FETCH CLOSED TASKS 🚨**

**THE RULE:**
**The Harbor AI Agent MUST ONLY fetch and work on tasks where `State = Active`**

**STRICTLY FORBIDDEN:**
- ❌ **NEVER** fetch tasks where `State = Closed`
- ❌ **NEVER** fetch tasks where `State = Resolved`
- ❌ **NEVER** fetch tasks where `State = Removed`
- ❌ **NEVER** fetch tasks where `State = New`
- ❌ **NEVER** fetch tasks where `State = In Progress`

**REQUIRED BEHAVIOR:**
1. **Azure DevOps Query MUST Filter:** `State = 'Active'` ONLY
2. **Double-Check Before Processing:** Verify task state == Active before starting work
3. **Skip Non-Active Tasks:** If a task is not Active, skip it immediately
4. **Log Filtered Tasks:** Document which tasks were skipped and why

**QUERY EXAMPLE:**
```sql
SELECT [System.Id], [System.Title], [System.State]
FROM WorkItems
WHERE [System.TeamProject] = @project
  AND [System.State] = 'Active'  -- 👈 CRITICAL: ONLY ACTIVE
  AND [System.WorkItemType] IN ('User Story', 'Task')
ORDER BY [Microsoft.VSTS.Common.Priority] ASC, [System.ChangedDate] ASC
```

**VALIDATION CHECKLIST (MANDATORY):**
- [ ] Query includes `WHERE [System.State] = 'Active'`
- [ ] No Closed tasks in fetched results
- [ ] No Resolved tasks in fetched results
- [ ] No New tasks in fetched results
- [ ] Only Active tasks are processed

**FAILURE CONSEQUENCES:**
- Fetching Closed tasks → WASTED EFFORT (task already done)
- Fetching Resolved tasks → DUPLICATE WORK (task already implemented)
- Fetching New tasks → WRONG WORKFLOW (task not ready for development)

**🚨 THIS RULE HAS ZERO EXCEPTIONS 🚨**

---

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

### 🔄 Rule 7: Model Lifecycle Awareness (NEW - MANDATORY) 🔄 ✨ (2026-03-23)

**Every model MUST go through a complete lifecycle to be functional:**

```
1. ✅ Defined in shared-model repository
   ↓
2. ✅ Published as package (version + build)
   ↓
3. ✅ Consumed by services (package install)
   ↓
4. ✅ Registered in database-sync
   ↓
5. ✅ Materialized as DB table (ORM registration)
```

**❗ CRITICAL RULE:**

```
If ANY step in the lifecycle is missing → System is INCOMPLETE

Examples of broken lifecycles:
❌ Model defined but not in database-sync → No table created
❌ Model in database-sync but not in ORM → Table not created
❌ Model in ORM but package not built → Services can't consume
❌ Package built but not installed → Services use old version
```

**Enforcement:**

```
When agent creates/modifies a model:

1. Agent MUST detect current lifecycle stage
2. Agent MUST identify missing stages
3. Agent MUST complete ALL remaining stages
4. Agent MUST validate end-to-end lifecycle

Only then → Task is complete
```

**Example - Blog Model Creation:**

```
❌ WRONG (Incomplete Lifecycle):
   - Created Blog model in shared-model
   - Published package
   - Stopped → System broken

✅ CORRECT (Complete Lifecycle):
   - Created Blog model in shared-model ✅
   - Updated version (1.0.0 → 1.1.0) ✅
   - Built package ✅
   - Registered in database-sync ✅
   - Added to ORM entities ✅
   - Updated dependent services ✅
   - Validated table will be created ✅
   - System is functional ✅
```

**Integration with Implicit Requirement Inference:**

This rule works with Phase 5.75 (Implicit Requirement Inference):
- Phase 5.75 detects model creation
- Rule 7 enforces complete lifecycle
- Together → No incomplete features

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

15. **Cross-Repository Dependency Intelligence** (Phase 5.7) 🧠 ✨ NEW (2026-03-23)
    - **Builds complete dependency chains from source to consumer**
    - Identifies source of truth repositories
    - Identifies dependent repositories that consume shared logic
    - Identifies database realization services (CRITICAL for models)
    - Identifies entry points (API, frontend, app)
    - **Critical Path Detection** - Marks repos as 🔴 CRITICAL, 🟡 DEPENDENT, 🟢 OPTIONAL
    - **Intelligent Decision Making** - Determines required actions for each repo type
    - **Completeness Validation** - Ensures feature is runnable end-to-end
    - **Partial Implementation Prevention** - Detects and fixes ALL gaps before completion
    - **Risk Assessment** - Identifies missing database sync, package builds, etc.
    - **Non-breaking enhancement** - Purely additive intelligence layer

16. **Evidence-Based Validation** (Phase 6.9) 🔍 ✨ NEW (2026-03-23)
    - **Transforms validation from assumption-based to evidence-based**
    - **No Assumptions Rule** - Requires reading actual files to verify implementation
    - **Evidence Requirement Per Check** - Each check needs specific proof (imports, registrations, exports)
    - **File Change Verification** - Confirms actual files were modified with expected changes
    - **Silent Failure Detection** - Catches missing implementations in required repositories
    - **Pattern Matching Validation** - Verifies new code follows existing patterns
    - **Final Evidence Validation** - Last gate before task completion
    - **Zero Partial Implementation** - No more "probably done" - only proven complete
    - **Non-breaking enhancement** - Purely additive validation layer

17. **Implicit Requirement Inference** (Phase 5.75) 🧠 ✨ NEW (2026-03-23)
    - **Teaches agent to think like a senior engineer who infers system requirements**
    - **Domain Event Detection** - Automatically detects new models, entities, services
    - **System Obligation Enforcement** - Infers database sync, ORM registration, etc.
    - **Model → Database Obligation Rule** - Models are NOT usable until registered in database-sync
    - **Auto-Trigger Dependent Repositories** - Database-sync automatically updated when models created
    - **Pattern-Based Implementation** - Replicates existing patterns instead of guessing
    - **Task Description ≠ Complete Truth** - Agent infers missing requirements from architecture
    - **Critical Thinking Enhancement** - "If I create something, I must ensure it actually WORKS"
    - **Non-breaking enhancement** - Purely additive intelligence layer

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

### Phase 5.7: Cross-Repository Dependency Intelligence (NEW - MANDATORY) 🧠 ✨ (2026-03-23)

**🚨 CRITICAL: This phase transforms the agent from file-editor to system-level architect.**

**This is a NON-BREAKING enhancement.** It adds deep dependency intelligence without modifying existing detection logic.

#### What This Phase Does

After detecting repository roles and understanding packages, this phase:
1. **Builds dependency chains** - Understands the complete flow from source to consumer
2. **Identifies critical path** - Detects which repos are blocking vs. optional
3. **Validates completeness** - Ensures feature is runnable end-to-end
4. **Prevents partial implementation** - No more 30% missing work

#### Step 5.7.1: Identify Dependency Flow

**For the given task, build a complete dependency chain:**

```javascript
async function identifyDependencyFlow(task, repositories, roles) {
  console.log('\n🧠 Identifying Dependency Flow...\n');

  const flow = {
    sourceOfTruth: null,      // Where core logic/models live
    dependentRepos: [],        // Services consuming the core
    databaseRealization: null, // Service responsible for DB schema
    entryPoints: [],           // API, frontend, app layers
    criticalPath: [],          // Repos that BLOCK the feature
    optionalPath: []           // Nice-to-have updates
  };

  // 1. Find source of truth
  flow.sourceOfTruth = await findSourceOfTruth(repositories, task);
  console.log(`📍 Source of Truth: ${flow.sourceOfTruth.name}`);

  // 2. Find dependents
  flow.dependentRepos = await findDependents(flow.sourceOfTruth, repositories);
  console.log(`🔗 Dependent Repositories: ${flow.dependentRepos.map(r => r.name).join(', ')}`);

  // 3. Find database sync service
  flow.databaseRealization = await findDatabaseSyncService(repositories, roles);
  if (flow.databaseRealization) {
    console.log(`🗄️  Database Realization: ${flow.databaseRealization.name}`);
  }

  // 4. Find entry points
  flow.entryPoints = await findEntryPoints(repositories, task);
  console.log(`🚪 Entry Points: ${flow.entryPoints.map(r => r.name).join(', ')}`);

  return flow;
}

async function findSourceOfTruth(repositories, task) {
  // Check for shared models, types, or core definitions
  for (const repo of repositories) {
    const isSource = await checkIfSourceRepository(repo, task);
    if (isSource) return repo;
  }
  return null;
}

async function findDependents(sourceRepo, allRepos) {
  const dependents = [];
  for (const repo of allRepos) {
    if (repo.name === sourceRepo.name) continue;
    const depends = await checkDependency(repo, sourceRepo);
    if (depends) dependents.push(repo);
  }
  return dependents;
}

async function findDatabaseSyncService(repositories, roles) {
  // Find repo with DATABASE_SYNC_SERVICE role
  return roles.find(r => r.role === 'DATABASE_SYNC_SERVICE')?.repository;
}

async function findEntryPoints(repositories, task) {
  return repositories.filter(repo =>
    repo.type === 'Frontend' ||
    repo.type === 'Mobile App' ||
    repo.type === 'API Gateway' ||
    repo.purpose?.includes('API')
  );
}
```

#### Step 5.7.2: Build Dependency Chain

**Construct the logical dependency chain:**

```javascript
async function buildDependencyChain(flow) {
  console.log('\n🔗 Building Dependency Chain...\n');

  const chain = {
    stages: [],
    visualization: ''
  };

  // Stage 1: Source
  if (flow.sourceOfTruth) {
    chain.stages.push({
      stage: 1,
      name: 'Source Package',
      repository: flow.sourceOfTruth.name,
      action: 'Update models/types',
      blocking: true
    });
  }

  // Stage 2: Package Build (if applicable)
  const isPackage = await checkIfPackageRepository(flow.sourceOfTruth);
  if (isPackage) {
    chain.stages.push({
      stage: 2,
      name: 'Package Build',
      repository: flow.sourceOfTruth.name,
      action: 'Version → Build → Publish',
      blocking: true
    });
  }

  // Stage 3: Dependent Services
  for (const dep of flow.dependentRepos) {
    chain.stages.push({
      stage: chain.stages.length + 1,
      name: 'Dependent Service',
      repository: dep.name,
      action: 'Update dependency → Install → Integrate',
      blocking: true
    });
  }

  // Stage 4: Database Sync (CRITICAL if models changed)
  if (flow.databaseRealization) {
    chain.stages.push({
      stage: chain.stages.length + 1,
      name: 'Database Synchronization',
      repository: flow.databaseRealization.name,
      action: 'Register models → Sync schema',
      blocking: true,
      critical: 'THIS STEP CANNOT BE SKIPPED'
    });
  }

  // Stage 5: Entry Points
  for (const entry of flow.entryPoints) {
    chain.stages.push({
      stage: chain.stages.length + 1,
      name: 'Entry Point',
      repository: entry.name,
      action: 'Update UI/API integration',
      blocking: false
    });
  }

  // Build visualization
  chain.visualization = chain.stages.map(s =>
    `${s.blocking ? '🔴' : '🟡'} Stage ${s.stage}: ${s.name}\n` +
    `   └─ Repository: ${s.repository}\n` +
    `   └─ Action: ${s.action}${s.critical ? `\n   └─ ${s.critical}` : ''}`
  ).join('\n\n');

  return chain;
}
```

#### Step 5.7.3: Detect Critical Path

**Mark repositories by criticality:**

```javascript
async function detectCriticalPath(chain, task) {
  console.log('\n⚠️  Detecting Critical Path...\n');

  const criticality = {
    critical: [],    // 🔴 Feature will break if not updated
    dependent: [],   // 🟡 Uses updated logic
    optional: []     // 🟢 UI or indirect usage
  };

  for (const stage of chain.stages) {
    const repo = stage.repository;

    // 🔴 CRITICAL: Source packages
    if (stage.name === 'Source Package' || stage.name === 'Package Build') {
      criticality.critical.push({
        repository: repo,
        reason: 'Source of truth - all others depend on this',
        impact: 'BLOCKING'
      });
    }

    // 🔴 CRITICAL: Database sync
    if (stage.critical?.includes('CANNOT BE SKIPPED')) {
      criticality.critical.push({
        repository: repo,
        reason: 'Database schema must match models - feature will fail without this',
        impact: 'BLOCKING'
      });
    }

    // 🟡 DEPENDENT: Services consuming source
    if (stage.name === 'Dependent Service' && stage.blocking) {
      criticality.dependent.push({
        repository: repo,
        reason: 'Consumes source package - must integrate changes',
        impact: 'HIGH PRIORITY'
      });
    }

    // 🟢 OPTIONAL: UI layers
    if (stage.name === 'Entry Point' && !stage.blocking) {
      criticality.optional.push({
        repository: repo,
        reason: 'User-facing layer - important but not blocking',
        impact: 'MEDIUM PRIORITY'
      });
    }
  }

  return criticality;
}
```

#### Step 5.7.4: Intelligent Decision Making

**Make decisions based on dependency intelligence:**

```javascript
async function makeIntelligentDecisions(flow, chain, criticality) {
  console.log('\n🧠 Making Intelligent Decisions...\n');

  const decisions = {
    packageActions: [],
    consumerActions: [],
    databaseActions: [],
    risks: [],
    completenessChecks: []
  };

  // Decision 1: Package Handling
  const sourceIsPackage = await checkIfPackageRepository(flow.sourceOfTruth);
  if (sourceIsPackage) {
    console.log('📦 Source is a package repository');

    decisions.packageActions = [
      'Update version',
      'Build package',
      'Simulate publish (do not push)'
    ];

    console.log('→ REQUIRED: Version update, build, and publish simulation');
  }

  // Decision 2: Consumer Synchronization
  if (flow.dependentRepos.length > 0) {
    console.log(`\n🔗 Found ${flow.dependentRepos.length} dependent consumers`);

    for (const consumer of flow.dependentRepos) {
      decisions.consumerActions.push({
        repository: consumer.name,
        actions: [
          'Update package version usage',
          'Ensure compatibility',
          'Install updated dependency'
        ]
      });
    }
  }

  // Decision 3: Database Sync (CRITICAL)
  if (flow.databaseRealization) {
    console.log('\n🗄️  Database sync service detected');

    decisions.databaseActions = [
      'Register new model in database sync',
      'Ensure sync logic includes new entity',
      'THIS STEP CANNOT BE SKIPPED'
    ];

    console.log('→ CRITICAL: Database sync is REQUIRED for feature to work');
  }

  // Decision 4: Risk Assessment
  decisions.risks = await assessRisks(chain, criticality);

  // Decision 5: Completeness Checks
  decisions.completenessChecks = [
    'Model exists in shared package',
    'Package version updated',
    'Package usable by other services',
    'Database sync includes new model',
    'API uses correct model',
    'Feature is runnable end-to-end'
  ];

  return decisions;
}

async function assessRisks(chain, criticality) {
  const risks = [];

  // Risk 1: Missing database sync
  if (criticality.critical.some(c => c.reason.includes('Database'))) {
    const hasDbSync = chain.stages.some(s => s.name.includes('Database'));
    if (!hasDbSync) {
      risks.push({
        severity: 'CRITICAL',
        risk: 'Database sync not in chain',
        impact: 'Feature will not work - tables will not exist',
        mitigation: 'Add database sync stage to chain'
      });
    }
  }

  // Risk 2: Missing package build
  const sourceStage = chain.stages.find(s => s.name === 'Source Package');
  if (sourceStage && !chain.stages.some(s => s.name === 'Package Build')) {
    const isPackage = await checkIfPackageRepository(sourceStage.repository);
    if (isPackage) {
      risks.push({
        severity: 'HIGH',
        risk: 'Package not built after changes',
        impact: 'Dependent services cannot use updated code',
        mitigation: 'Add package build stage'
      });
    }
  }

  return risks;
}
```

#### Step 5.7.5: Avoid Incomplete Work

**Before proceeding, validate completeness:**

```javascript
async function validateCompleteness(decisions, task) {
  console.log('\n✅ Step 6: Completeness Validation\n');

  const questions = [
    {
      question: 'If I run the system locally, will the database table exist?',
      critical: true
    },
    {
      question: 'If I run the system locally, will the API recognize the new model?',
      critical: true
    },
    {
      question: 'If I run the system locally, will the frontend display the feature?',
      critical: false
    }
  ];

  for (const q of questions) {
    console.log(`❓ ${q.question}`);

    if (q.critical) {
      // Check if chain ensures this
      const ensured = await checkIfChainEnsures(chain, q.question);
      if (!ensured) {
        console.log(`❌ NO - Feature will be incomplete!\n`);
        throw new Error(`Critical validation failed: ${q.question}`);
      } else {
        console.log(`✅ YES - Chain ensures this\n`);
      }
    }
  }

  return true;
}
```

#### Step 5.7.6: Completion Validation (MANDATORY)

**Final checklist before finishing task:**

```javascript
async function finalCompletionValidation(decisions, chain) {
  console.log('\n🎯 Final Completion Validation\n');

  const checklist = [
    { item: 'Model exists in shared package', check: () => checkModelExists(decisions) },
    { item: 'Package version updated', check: () => checkVersionUpdated(decisions) },
    { item: 'Package usable by other services', check: () => checkPackageUsable(decisions) },
    { item: 'Database sync includes new model', check: () => checkDatabaseSync(decisions) },
    { item: 'API uses correct model', check: () => checkApiModel(decisions) },
    { item: 'Feature is runnable end-to-end', check: () => checkEndToEnd(decisions) }
  ];

  const results = [];

  for (const item of checklist) {
    const passed = await item.check();
    results.push({ item: item.item, passed });
    console.log(`${passed ? '✅' : '❌'} ${item.item}`);
  }

  const allPassed = results.every(r => r.passed);

  if (!allPassed) {
    console.log('\n❌ VALIDATION FAILED - Feature is incomplete!\n');
    console.log('Missing steps:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.item}`);
    });
    throw new Error('Feature validation failed - incomplete implementation');
  }

  console.log('\n✅ All validations passed - Feature is complete!\n');
  return results;
}
```

#### Step 5.7.7: Display Dependency Intelligence Summary

**🚨 CRITICAL: Display the dependency intelligence summary to the user:**

```markdown
## 🧠 Cross-Repository Dependency Intelligence

### Dependency Flow Detected

**Source of Truth:**
📍 harborSharedModels - Shared Library (User, Job, Notification models)

**Dependent Repositories:**
🔗 harborUserSvc - Backend Service (consumes User model)
🔗 harborJobSvc - Backend Service (consumes Job model)
🔗 harborNotificationSvc - Backend Service (consumes Notification model)

**Database Realization:**
🗄️  harborUserSvc - DATABASE_SYNC_SERVICE (syncs all models to database)

**Entry Points:**
🚪 harborWebsite - Frontend (consumes User/Job APIs)
🚪 harborApp - Mobile (consumes User/Job APIs)

### Dependency Chain

```
1. 🔴 harborSharedModels (Source)
   └─ Action: Update models
   └─ Blocking: YES - all others depend on this

2. 🔴 harborSharedModels (Package Build)
   └─ Action: Version → Build → Publish
   └─ Blocking: YES - consumers need published package

3. 🟡 harborUserSvc (Consumer)
   └─ Action: Update dependency → Install → Integrate
   └─ Blocking: YES - API must use updated models

4. 🟡 harborJobSvc (Consumer)
   └─ Action: Update dependency → Install → Integrate
   └─ Blocking: YES - API must use updated models

5. 🔴 harborUserSvc (Database Sync)
   └─ Action: Register models → Sync schema
   └─ Blocking: YES - THIS STEP CANNOT BE SKIPPED
   └─ Critical: Database tables must exist

6. 🟢 harborWebsite (Entry Point)
   └─ Action: Update UI/API integration
   └─ Blocking: NO - UI updates

7. 🟢 harborApp (Entry Point)
   └─ Action: Update UI/API integration
   └─ Blocking: NO - UI updates
```

### Critical Path Analysis

**🔴 CRITICAL (3 repositories):**
- harborSharedModels - Source of truth, must be first
- harborSharedModels (package) - Must build and publish
- harborUserSvc (database sync) - Tables won't exist without this

**🟡 DEPENDENT (2 repositories):**
- harborUserSvc - Consumes shared models
- harborJobSvc - Consumes shared models

**🟢 OPTIONAL (2 repositories):**
- harborWebsite - UI layer
- harborApp - UI layer

### Intelligent Decisions

**Package Actions:**
✅ Update version in harborSharedModels
✅ Build harborSharedModels package
✅ Simulate publish (do not push to git)

**Consumer Actions:**
✅ harborUserSvc: Update dependency version, install, integrate
✅ harborJobSvc: Update dependency version, install, integrate

**Database Actions:**
✅ harborUserSvc: Register new models in database sync
✅ harborUserSvc: Ensure sync logic includes new entities
⚠️  CRITICAL: This step cannot be skipped

### Completeness Checks

✅ Model exists in shared package
✅ Package version updated
✅ Package usable by other services
✅ Database sync includes new model
✅ API uses correct model
✅ Feature is runnable end-to-end

### Risk Assessment

**No risks detected** - All dependencies understood and planned

### Execution Mode

**🧘 Testing Constraints:**
- ✅ Perform code implementation
- ✅ Run validation and testing
- ✅ Verify functionality locally
- ❌ DO NOT push code to git
- ❌ DO NOT deploy services
- ❌ DO NOT create commits/PRs

**Focus:** Logical completeness and dependency correctness

---

✨ **Dependency Intelligence Complete - System fully understood!**
```

---

### Enforcement Rules

**🚨 Rule: Partial Implementation is FAILURE**

```
IF ANY of these are true → Task is NOT complete:
❌ Missing database sync
❌ Missing model registration
❌ Missing package version update
❌ Missing package build
❌ Missing consumer dependency updates
❌ Feature not runnable end-to-end

Agent MUST:
✅ Fix ALL gaps before finishing
✅ Re-validate until ALL checks pass
✅ NEVER mark incomplete work as complete
```

**🧘 Execution Constraint:**

```
During TESTING mode:
✅ Simulate build + dependency correctness
✅ Verify logical flow
✅ Validate all integration points
❌ DO NOT push to git
❌ DO NOT deploy services
❌ DO NOT create commits

Purpose:
- Prevent unwanted commits during testing
- Allow safe validation of dependency correctness
- Enable testing without manual reverts
```

---

### Phase 5.75: Implicit Requirement Inference (MANDATORY) 🧠 ✨ (2026-03-23)

**🚨 CRITICAL: This phase teaches the agent to think like a senior engineer who infers system requirements that are NOT explicitly mentioned in the task.**

**This is a MANDATORY enhancement that prevents incomplete feature implementation.**

---

## 🔥 Core Philosophy

**The agent does NOT follow instructions. The agent completes the SYSTEM.**

**Current Thinking (BEFORE this phase):**
> "Task didn't mention database-sync → I won't touch it"

**Senior Engineer Thinking (AFTER this phase):**
> "New model = DB table needed → database-sync MUST be updated"

This is called **Implicit Requirement Inference**.

---

## 🎯 What This Phase Does

After analyzing dependencies and before implementation, this phase:
1. **Detects domain events** (new models, entities, services)
2. **Infers system obligations** (database sync, registrations, integrations)
3. **Auto-triggers dependent repositories** (even if not mentioned in task)
4. **Enforces completeness** (feature is NOT complete until ALL obligations are met)

---

## 📋 Step 5.75.1: Detect Domain Events

**While analyzing changes, the agent MUST detect:**

```javascript
async function detectDomainEvents(task, changes) {
  console.log('\n🔍 Detecting Domain Events...\n');

  const events = [];

  // 1. Detect New Model Creation
  const newModels = changes.filter(c =>
    c.type === 'NEW_ENTITY' ||
    c.type === 'NEW_MODEL' ||
    c.file?.includes('model') ||
    c.file?.includes('entity')
  );

  if (newModels.length > 0) {
    events.push({
      type: 'MODEL_CREATED',
      entities: newModels,
      severity: 'CRITICAL',
      inferredRequirements: ['DATABASE_SYNC', 'MODEL_REGISTRATION']
    });

    console.log(`🔴 Detected: ${newModels.length} new model(s) created`);
    console.log(`Models: ${newModels.map(m => m.name).join(', ')}\n`);
  }

  // 2. Detect Model Modifications
  const modifiedModels = changes.filter(c =>
    c.type === 'MODIFIED_ENTITY' ||
    c.type === 'MODIFIED_MODEL'
  );

  if (modifiedModels.length > 0) {
    events.push({
      type: 'MODEL_MODIFIED',
      entities: modifiedModels,
      severity: 'HIGH',
      inferredRequirements: ['DATABASE_SYNC_UPDATE']
    });

    console.log(`🟡 Detected: ${modifiedModels.length} model(s) modified`);
    console.log(`Models: ${modifiedModels.map(m => m.name).join(', ')}\n`);
  }

  // 3. Detect New Service Creation
  const newServices = changes.filter(c =>
    c.type === 'NEW_SERVICE' ||
    c.file?.includes('service')
  );

  if (newServices.length > 0) {
    events.push({
      type: 'SERVICE_CREATED',
      entities: newServices,
      severity: 'HIGH',
      inferredRequirements: ['SERVICE_REGISTRATION', 'API_INTEGRATION']
    });

    console.log(`🟡 Detected: ${newServices.length} new service(s) created`);
    console.log(`Services: ${newServices.map(s => s.name).join(', ')}\n`);
  }

  return events;
}
```

---

## 🚨 Step 5.75.2: Enforce System Obligations

**If a NEW MODEL is created, the agent MUST automatically infer:**

### 🔴 Database Obligation (MANDATORY)

**A model is NOT usable until:**
- ✅ It is registered in database sync system
- ✅ It is included in ORM initialization
- ✅ It can create/sync table in database

**❗ CRITICAL THINKING RULE:**

```
Creating a model WITHOUT database sync = INCOMPLETE FEATURE

Even if:
- APIs are written ✅
- Frontend is ready ✅

System will FAIL at runtime ❌

Table does not exist → Database error → Feature broken
```

---

## 🧩 Step 5.75.3: Auto-Trigger Dependent Repositories

**If a model is created in a shared repository, the agent MUST automatically:**

```javascript
async function autoTriggerDependentRepos(domainEvents, repositories) {
  console.log('\n🔗 Auto-Triggering Dependent Repositories...\n');

  const actions = [];

  for (const event of domainEvents) {
    // For MODEL_CREATED events
    if (event.type === 'MODEL_CREATED') {

      // 1. Locate database-sync repository
      const dbSyncRepo = repositories.find(r =>
        r.roles?.includes('DATABASE_SYNC_SERVICE') ||
        r.name?.toLowerCase().includes('databasesync') ||
        r.name?.toLowerCase().includes('db-sync')
      );

      if (dbSyncRepo) {
        console.log(`🔴 Database Sync Repository Found: ${dbSyncRepo.name}`);
        console.log(`⚠️  ACTION REQUIRED: Register new model(s) in database sync\n`);

        actions.push({
          repository: dbSyncRepo.name,
          action: 'REGISTER_MODEL',
          entities: event.entities,
          reason: 'Model requires database table to function',
          severity: 'CRITICAL',
          blocking: true
        });
      } else {
        console.log(`⚠️  WARNING: No database-sync repository found`);
        console.log(`🔎 Searched for: DATABASE_SYNC_SERVICE role or similar naming pattern\n`);
      }

      // 2. Locate ORM/TypeORM configuration repository
      const ormRepo = repositories.find(r =>
        r.roles?.includes('ORM_CONFIGURATION') ||
        r.hasTypeORMConfig === true
      );

      if (ormRepo) {
        console.log(`🔴 ORM Configuration Repository Found: ${ormRepo.name}`);
        console.log(`⚠️  ACTION REQUIRED: Register model in ORM entities\n`);

        actions.push({
          repository: ormRepo.name,
          action: 'REGISTER_ORM_ENTITY',
          entities: event.entities,
          reason: 'ORM must recognize model to create database table',
          severity: 'CRITICAL',
          blocking: true
        });
      }

      // 3. Locate dependent services that consume models
      const dependentServices = repositories.filter(r =>
        r.dependencies?.includes('shared-models') ||
        r.dependencies?.includes('harborSharedModels')
      );

      if (dependentServices.length > 0) {
        console.log(`🟡 Found ${dependentServices.length} dependent service(s):`);
        dependentServices.forEach(s => console.log(`   - ${s.name}`));
        console.log(`⚠️  ACTION REQUIRED: Update model imports and dependencies\n`);

        actions.push({
          repositories: dependentServices.map(r => r.name),
          action: 'UPDATE_MODEL_DEPENDENCY',
          entities: event.entities,
          reason: 'Services must consume updated model package',
          severity: 'HIGH',
          blocking: false
        });
      }
    }
  }

  return actions;
}
```

---

## 🔁 Step 5.75.4: Pattern-Based Implementation

**🚨 DO NOT GUESS. The agent MUST:**

```javascript
async function patternBasedImplementation(actions, repositories) {
  console.log('\n🔣 Executing Pattern-Based Implementation...\n');

  for (const action of actions) {
    console.log(`\n📋 Action: ${action.action}`);
    console.log(`📍 Repository: ${action.repository}`);
    console.log(`🎯 Entities: ${action.entities.map(e => e.name).join(', ')}\n`);

    const repo = repositories.find(r => r.name === action.repository);

    switch (action.action) {
      case 'REGISTER_MODEL':

        // Find existing model registration pattern
        const existingModels = await findExistingModelsInDatabaseSync(repo);
        console.log(`🔍 Found ${existingModels.length} existing model(s) registered`);
        console.log(`Pattern: ${existingModels[0]?.pattern || 'unknown'}\n`);

        // Replicate the SAME pattern for new model
        const registrationCode = await generateRegistrationCode(
          action.entities[0],
          existingModels[0]
        );

        await addModelToDatabaseSync(repo, action.entities[0], registrationCode);
        console.log(`✅ Model registered in database sync\n`);

        break;

      case 'REGISTER_ORM_ENTITY':

        // Find existing ORM entity pattern
        const existingEntities = await findExistingOrmEntities(repo);
        console.log(`🔍 Found ${existingEntities.length} existing ORM entity(ies) registered`);
        console.log(`Pattern: ${existingEntities[0]?.pattern || 'unknown'}\n`);

        // Replicate the SAME pattern
        await addOrmEntity(repo, action.entities[0], existingEntities[0]);
        console.log(`✅ Entity registered in ORM configuration\n`);

        break;

      case 'UPDATE_MODEL_DEPENDENCY':

        // Update package version in dependent services
        await updatePackageVersion(repo, action.entities[0]);
        await installUpdatedPackage(repo);
        console.log(`✅ Model dependency updated in ${repo.name}\n`);

        break;
    }
  }
}
```

---

## 🚫 Step 5.75.5: Task Description is NOT Complete Truth

**The agent MUST understand:**

```
The task description may be incomplete.

The agent MUST:
✅ Think beyond instructions
✅ Consider system architecture
✅ Fill missing steps
✅ Infer implicit requirements

The agent MUST NOT:
❌ Only do what's explicitly mentioned
❌ Assume "not mentioned = not required"
❌ Leave system in broken state
```

---

## 🧠 Step 5.75.6: Final Thinking Model

**You are not following instructions. You are completing the SYSTEM.**

### Before This Phase (WRONG):
```
"I created Blog model → done"
"Task didn't mention database-sync → not my job"
```

### After This Phase (CORRECT):
```
"Wait… where does this model become a table?"
"→ Oh database-sync → I must update it"
"→ How are existing models registered?"
"→ Let me replicate that pattern"
"→ Now the feature is complete"
```

---

## 🛑 Step 5.75.7: Completion Rule

**Task is NOT complete until:**

```
✔ Model exists in source repository
✔ Model is registered in database sync
✔ Model is included in ORM configuration
✔ Model can create table in database
✔ Dependent services are updated
✔ System can run without failure

If ANY step missing → Continue execution
```

---

## 🎯 Example: Blogs Module Implementation

### Task Description:
```
"Create a Blogs module with Blog model"
```

### Agent Thinking (WITH Implicit Requirement Inference):

```
🔍 Domain Event Detected:
   → NEW MODEL: Blog

🧠 Implicit Requirements Inferred:
   → Database sync needed (CRITICAL)
   → ORM registration needed (CRITICAL)
   → Model export needed (HIGH)
   → Dependent services may need updates (MEDIUM)

🔗 Repositories Auto-Triggered:
   → harborDatabaseSync (REGISTER_MODEL)
   → harborOrmConfig (REGISTER_ORM_ENTITY)
   → harborBlogService (CONSUME_MODEL)

🔣 Pattern-Based Implementation:
   → Found existing User model in database-sync
   → Replicated registration pattern for Blog
   → Found existing ORM entity pattern
   → Replicated entity registration for Blog

✅ Completion Status:
   → Blog model created ✅
   → Database sync updated ✅
   → ORM configuration updated ✅
   → Table will be created on next sync ✅
   → Feature is runnable end-to-end ✅
```

---

### WITHOUT Implicit Requirement Inference (WRONG):

```
❌ Blog model created
❌ Database sync NOT updated
❌ Table NOT created
❌ Feature FAILS at runtime
```

---

## 🔄 Integration with Dependency Intelligence

**This phase works AFTER Phase 5.7 (Cross-Repository Dependency Intelligence):**

1. **Phase 5.7** identifies:
   - Source repositories (where models are defined)
   - Database realization services (database-sync)
   - Dependent services

2. **Phase 5.75** uses this information to:
   - Detect domain events (model creation)
   - Infer system obligations (database sync required)
   - Auto-trigger dependent repositories (database-sync)
   - Enforce completeness (feature not complete until all obligations met)

---

## 🚨 Enforcement Rules

**Rule: Implicit Requirements are MANDATORY**

```
IF domain event detected (model created):
   → All inferred requirements are MANDATORY
   → Not optional, not "if mentioned in task"
   → Required for system to function

Agent MUST:
✅ Detect all domain events
✅ Infer all system obligations
✅ Execute all required actions
✅ Validate completeness

Agent MUST NOT:
❌ Skip inferred requirements
❌ Wait for explicit instructions
❌ Leave system in broken state
```

---

## 📊 Output Format

**After completing this phase, the agent MUST output:**

```
## 🧠 Implicit Requirement Inference Complete

### 🔍 Domain Events Detected:
- MODEL_CREATED: Blog, Post, Comment

### 🎯 Inferred Requirements:
✅ DATABASE_SYNC (CRITICAL) → harborDatabaseSync
✅ ORM_REGISTRATION (CRITICAL) → harborOrmConfig
✅ MODEL_EXPORT (HIGH) → harborSharedModels
✅ DEPENDENT_UPDATE (MEDIUM) → harborBlogService

### 🔗 Repositories Auto-Triggered:
✅ harborDatabaseSync - REGISTER_MODEL (Blocking)
✅ harborOrmConfig - REGISTER_ORM_ENTITY (Blocking)
⏳ harborBlogService - UPDATE_DEPENDENCY (Non-blocking)

### 🔣 Pattern-Based Implementation:
✅ Replicated User model registration pattern for Blog
✅ Replicated existing ORM entity pattern
✅ All registrations follow existing conventions

### 🛑 Completion Validation:
✅ Model exists in source
✅ Model registered in database sync
✅ Model registered in ORM
✅ Dependent services updated
✅ System is runnable

Status: Ready for implementation
```

---

## 🔥 Key Insight

**This enhancement solves the core problem:**

> "Agent does what's asked, but doesn't complete the system"

**Now the agent thinks:**

> "If I create something, I must ensure it actually WORKS in the system."

---

## 🎯 Non-Breaking Enhancement

**This phase:**
- ✅ Is purely additive
- ✅ Does not modify existing logic
- ✅ Adds intelligence layer on top
- ✅ Prevents incomplete implementation
- ✅ Automatically enforces system completeness

---

✨ **Implicit Requirement Inference Complete - Agent now thinks like a senior engineer!**

---

### Phase 5.8: Missed Implementation Recovery (OPTIONAL BOOSTER) 🔁 ✨ (2026-03-23)

**🚨 CRITICAL: This phase eliminates partial implementation by scanning for missing integrations.**

**This is an OPTIONAL but HIGHLY RECOMMENDED enhancement.** It acts as a safety net to catch any missed implementations.

#### What This Phase Does

After all implementation phases are complete, this phase:
1. **Re-scans all repositories** for patterns where new entities should exist
2. **Detects missing implementations** automatically
3. **Auto-fixes gaps** without user intervention
4. **Ensures zero partial implementation**

#### Step 5.8.1: Re-Scan for Missing Implementations

**After all changes, scan for gaps:**

```javascript
async function reScanForMissingImplementations(repositories, task) {
  console.log('\n🔁 Scanning for Missed Implementations...\n');

  const gaps = [];

  // 1. Check for model registration gaps
  for (const repo of repositories) {
    const models = await extractModelsFromTask(task);
    const registrations = await findModelRegistrationPatterns(repo);

    for (const model of models) {
      const isRegistered = registrations.some(r => r.includes(model));
      if (!isRegistered) {
        gaps.push({
          repository: repo.name,
          type: 'MODEL_REGISTRATION',
          missing: model,
          severity: 'HIGH',
          pattern: registrations[0] || 'unknown'
        });
      }
    }
  }

  // 2. Check for export/index gaps
  for (const repo of repositories) {
    const exports = await findExportPatterns(repo);
    const newFiles = await getNewlyCreatedFiles(repo, task);

    for (const file of newFiles) {
      const isExported = exports.some(e => e.includes(file));
      if (!isExported) {
        gaps.push({
          repository: repo.name,
          type: 'EXPORT_MISSING',
          missing: file,
          severity: 'MEDIUM',
          pattern: exports[0] || 'index.ts'
        });
      }
    }
  }

  // 3. Check for database sync gaps
  const dbSyncRepo = repositories.find(r =>
    await hasDatabaseSyncRole(r)
  );

  if (dbSyncRepo) {
    const models = await extractModelsFromTask(task);
    const syncedModels = await getSyncedModels(dbSyncRepo);

    for (const model of models) {
      if (!syncedModels.includes(model)) {
        gaps.push({
          repository: dbSyncRepo.name,
          type: 'DATABASE_SYNC_MISSING',
          missing: model,
          severity: 'CRITICAL',
          reason: 'Database table will not exist - feature will fail'
        });
      }
    }
  }

  // 4. Check for API registration gaps
  for (const repo of repositories) {
    if (repo.type === 'Backend Service') {
      const apis = await extractApisFromTask(task);
      const registeredApis = await getRegisteredApis(repo);

      for (const api of apis) {
        const isRegistered = registeredApis.some(r => r.includes(api));
        if (!isRegistered) {
          gaps.push({
            repository: repo.name,
            type: 'API_REGISTRATION_MISSING',
            missing: api,
            severity: 'HIGH',
            reason: 'API endpoint will not be accessible'
          });
        }
      }
    }
  }

  return gaps;
}
```

#### Step 5.8.2: Auto-Fix Detected Gaps

**Automatically fix all detected gaps:**

```javascript
async function autoFixGaps(gaps) {
  console.log('\n🔧 Auto-Fixing Detected Gaps...\n');

  const fixed = [];

  for (const gap of gaps) {
    console.log(`Fixing: ${gap.type} in ${gap.repository}`);
    console.log(`Missing: ${gap.missing}`);
    console.log(`Severity: ${gap.severity}\n`);

    let result;

    switch (gap.type) {
      case 'MODEL_REGISTRATION':
        result = await fixModelRegistration(gap);
        break;
      case 'EXPORT_MISSING':
        result = await fixExportMissing(gap);
        break;
      case 'DATABASE_SYNC_MISSING':
        result = await fixDatabaseSyncMissing(gap);
        break;
      case 'API_REGISTRATION_MISSING':
        result = await fixApiRegistrationMissing(gap);
        break;
    }

    if (result.success) {
      console.log(`✅ Fixed: ${gap.missing}\n`);
      fixed.push(gap);
    } else {
      console.log(`❌ Failed to fix: ${gap.missing}\n`);
      console.log(`Error: ${result.error}\n`);
    }
  }

  return fixed;
}

async function fixModelRegistration(gap) {
  // Find the registration pattern (e.g., models/index.ts)
  const repo = await getRepository(gap.repository);
  const pattern = gap.pattern;

  // Read the registration file
  const registrationFile = await findRegistrationFile(repo, pattern);

  // Add the missing model
  const content = await readFile(registrationFile);
  const updated = addExport(content, gap.missing);

  await writeFile(registrationFile, updated);

  return { success: true };
}

async function fixDatabaseSyncMissing(gap) {
  // Find the database sync file
  const repo = await getRepository(gap.repository);
  const syncFile = await findDatabaseSyncFile(repo);

  // Read the sync file
  const content = await readFile(syncFile);

  // Add the missing model to sync
  const updated = addModelToSync(content, gap.missing);

  await writeFile(syncFile, updated);

  return { success: true };
}
```

#### Step 5.8.3: Re-Validate After Fixes

**After fixing gaps, re-validate everything:**

```javascript
async function reValidateAfterFixes(repositories, task) {
  console.log('\n🔄 Re-Validating After Fixes...\n');

  // Re-scan for any remaining gaps
  const remainingGaps = await reScanForMissingImplementations(repositories, task);

  if (remainingGaps.length > 0) {
    console.log(`⚠️  ${remainingGaps.length} gaps remaining:\n`);

    for (const gap of remainingGaps) {
      console.log(`  - ${gap.repository}: ${gap.type} (${gap.missing})`);
      console.log(`    Severity: ${gap.severity}\n`);
    }

    // Try fixing remaining gaps
    const fixed = await autoFixGaps(remainingGaps);

    // Re-validate again
    return await reValidateAfterFixes(repositories, task);
  }

  console.log('✅ No gaps detected - Implementation is complete!\n');
  return { complete: true, gaps: [] };
}
```

#### Step 5.8.4: Display Recovery Summary

**🚨 CRITICAL: Display the recovery summary to the user:**

```markdown
## 🔁 Missed Implementation Recovery

### Scan Results

**Repositories Scanned:** 7
**Patterns Checked:** 4
**Gaps Detected:** 3

### Detected Gaps

**1. CRITICAL: Database Sync Missing**
- Repository: harborUserSvc
- Type: DATABASE_SYNC_MISSING
- Missing: UserAvailability model
- Reason: Database table will not exist - feature will fail
- Action: Adding model to database sync...

**2. HIGH: Model Registration Missing**
- Repository: harborSharedModels
- Type: MODEL_REGISTRATION
- Missing: UserAvailability
- Pattern: models/index.ts
- Action: Adding export to index.ts...

**3. MEDIUM: Export Missing**
- Repository: harborUserSvc
- Type: EXPORT_MISSING
- Missing: user-availability.service.ts
- Pattern: services/index.ts
- Action: Adding export to index.ts...

### Auto-Fix Results

✅ Fixed: UserAvailability added to database sync
✅ Fixed: UserAvailability added to models/index.ts
✅ Fixed: user-availability.service.ts added to exports

### Re-Validation

🔄 Re-scanning for remaining gaps...
✅ No gaps detected - Implementation is complete!

### Recovery Summary

**Before Recovery:** 3 gaps detected (1 CRITICAL, 1 HIGH, 1 MEDIUM)
**After Recovery:** 0 gaps detected
**Status:** ✅ Implementation is complete and consistent

---

✨ **Missed Implementation Recovery Complete - Zero partial implementation!**
```

---

### Enforcement Rules

**🚨 Rule: Zero Partial Implementation**

```
AFTER all implementation phases:
1. Re-scan ALL repositories
2. Detect ALL missing integrations
3. Auto-fix ALL detected gaps
4. Re-validate until zero gaps remain

IF gaps remain after first fix:
→ Re-run auto-fix
→ Continue until zero gaps

ONLY when zero gaps detected:
→ Mark implementation as complete
```

**🎯 Goal:**

```
Eliminate partial implementation entirely:
✅ No missing model registrations
✅ No missing database sync entries
✅ No missing exports
✅ No missing API registrations
✅ Feature works end-to-end
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
  roleValidationRulesDefined: false,

  // Cross-Repository Dependency Intelligence ✨ NEW (2026-03-23)
  dependencyFlowIdentified: false,
  dependencyChainBuilt: false,
  criticalPathDetected: false,
  intelligentDecisionsMade: false,
  completenessValidated: false,
  riskAssessmentComplete: false,

  // Missed Implementation Recovery ✨ NEW (2026-03-23)
  rescannedForMissingImplementations: false,
  gapsDetected: false,
  gapsAutoFixed: false,
  reValidatedAfterFixes: false,

  // Evidence-Based Validation ✨ NEW (2026-03-23)
  noAssumptionsValidated: false,
  evidenceGatheredForAllChecks: false,
  fileChangesVerified: false,
  silentFailuresDetected: false,
  patternMatchingValidated: false,
  finalEvidenceValidationPassed: false
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

### Phase 6.9: Evidence-Based Validation (MANDATORY) 🔍 ✨ (2026-03-23)

**🚨 CRITICAL: This phase transforms validation from assumption-based to evidence-based.**

**Reference:** `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/evidence-based-validation.md`

**🚨 CRITICAL: This phase runs AFTER ALL other validation phases and BEFORE marking task as complete.**

#### What This Phase Does

After all implementation and validation is complete, this phase:
1. **Rejects assumptions** - No more "probably done" checks
2. **Requires evidence** - Every check must be proven with actual code
3. **Detects silent failures** - Catches missing implementations that previous checks missed
4. **Enforces pattern matching** - Verifies new code follows existing patterns
5. **Validates with file changes** - Requires actual file modifications as proof

#### Step 6.9.1: No Assumptions Rule

**🚨 CRITICAL: Do NOT assume something is implemented.**

```javascript
async function validateNoAssumptions(checks, repositories) {
  console.log('\n🔍 Step 6.9.1: No Assumptions Validation\n');

  const evidenceChecks = [];

  for (const check of checks) {
    console.log(`❓ Check: ${check.description}`);

    // DO NOT assume - VERIFY by reading actual files
    const evidence = await gatherEvidence(check, repositories);

    if (!evidence.hasEvidence) {
      console.log(`❌ FAIL: No evidence found\n`);
      evidenceChecks.push({
        check: check.description,
        status: 'FAIL',
        reason: 'No implementation evidence found',
        requiredAction: check.requiredAction
      });
    } else {
      console.log(`✅ PASS: Evidence verified\n`);
      evidenceChecks.push({
        check: check.description,
        status: 'PASS',
        evidence: evidence.files
      });
    }
  }

  return evidenceChecks;
}

async function gatherEvidence(check, repositories) {
  const evidence = {
    hasEvidence: false,
    files: []
  };

  // Check 1: Does the file exist?
  if (check.expectedFile) {
    for (const repo of repositories) {
      const filePath = path.join(repo.path, check.expectedFile);
      if (await fileExists(filePath)) {
        evidence.files.push(filePath);
        evidence.hasEvidence = true;
      }
    }
  }

  // Check 2: Is the code present in the file?
  if (check.expectedCode && evidence.files.length > 0) {
    for (const file of evidence.files) {
      const content = await readFile(file);
      if (content.includes(check.expectedCode)) {
        evidence.hasEvidence = true;
      } else {
        evidence.hasEvidence = false;
        break;
      }
    }
  }

  // Check 3: Is the integration present?
  if (check.expectedIntegration) {
    for (const repo of repositories) {
      const integrationFile = path.join(repo.path, check.integrationFile);
      if (await fileExists(integrationFile)) {
        const content = await readFile(integrationFile);
        if (content.includes(check.expectedIntegration)) {
          evidence.hasEvidence = true;
          evidence.files.push(integrationFile);
        }
      }
    }
  }

  return evidence;
}
```

#### Step 6.9.2: Evidence Requirement Per Check

**🚨 CRITICAL: Each check requires SPECIFIC evidence.**

```javascript
async function validateDatabaseSyncIntegration(repositories, task) {
  console.log('\n🧾 Step 6.9.2: Evidence-Based Database Sync Validation\n');

  const checks = [
    {
      description: 'New model is imported in database sync service',
      evidenceType: 'IMPORT_STATEMENT',
      required: (task) => task.includesNewModel,
      gatherEvidence: async (repo, task) => {
        const syncFile = await findDatabaseSyncFile(repo);
        if (!syncFile) return { hasEvidence: false };

        const content = await readFile(syncFile);
        const modelName = extractModelName(task);

        // Check for import statement
        const hasImport = content.includes(`import ${modelName}`)
                      || content.includes(`require('./${modelName}')`)
                      || content.includes(`from './${modelName}'`);

        return {
          hasEvidence: hasImport,
          file: syncFile,
          evidence: hasImport ? `Found import for ${modelName}` : 'No import found'
        };
      }
    },
    {
      description: 'Model is registered in sync configuration',
      evidenceType: 'REGISTRATION',
      required: (task) => task.includesNewModel,
      gatherEvidence: async (repo, task) => {
        const syncFile = await findDatabaseSyncFile(repo);
        if (!syncFile) return { hasEvidence: false };

        const content = await readFile(syncFile);
        const modelName = extractModelName(task);

        // Check for model registration pattern
        // Examples: sync(), models.push(), db[modelName]
        const patterns = [
          `${modelName}.sync`,
          `models.${modelName}`,
          `${modelName}.init`,
          `sequelize.import('${modelName}')`,
          `require('./${modelName}')`
        ];

        const hasRegistration = patterns.some(p => content.includes(p));

        return {
          hasEvidence: hasRegistration,
          file: syncFile,
          evidence: hasRegistration ? `Found registration for ${modelName}` : 'No registration found'
        };
      }
    },
    {
      description: 'Model is included in Sequelize/ORM initialization',
      evidenceType: 'ORM_INIT',
      required: (task) => task.includesNewModel,
      gatherEvidence: async (repo, task) => {
        const initFile = await findOrmInitFile(repo);
        if (!initFile) return { hasEvidence: false };

        const content = await readFile(initFile);
        const modelName = extractModelName(task);

        // Check if model is in initialization
        const hasInit = content.includes(modelName);

        return {
          hasEvidence: hasInit,
          file: initFile,
          evidence: hasInit ? `Found ${modelName} in ORM init` : 'Model not in ORM init'
        };
      }
    }
  ];

  const results = [];

  for (const check of checks) {
    if (check.required(task)) {
      console.log(`🔍 Checking: ${check.description}`);

      for (const repo of repositories) {
        const evidence = await check.gatherEvidence(repo, task);

        if (evidence.hasEvidence) {
          console.log(`✅ PASS: ${evidence.evidence}`);
          console.log(`   File: ${evidence.file}\n`);
          results.push({ check: check.description, status: 'PASS', evidence });
        } else {
          console.log(`❌ FAIL: ${check.description}`);
          console.log(`   Reason: No evidence found\n`);
          results.push({ check: check.description, status: 'FAIL', evidence });
        }
      }
    }
  }

  return results;
}
```

#### Step 6.9.3: File Change Verification

**🚨 CRITICAL: Verify actual files were modified.**

```javascript
async function verifyFileChanges(repositories, task) {
  console.log('\n📁 Step 6.9.3: File Change Verification\n');

  const verificationResults = [];

  for (const repo of repositories) {
    console.log(`🔍 Repository: ${repo.name}`);

    // Get list of files that SHOULD have been modified
    const expectedChanges = await getExpectedChanges(repo, task);

    console.log(`   Expected changes: ${expectedChanges.length} files`);

    let actualChanges = [];
    let missingChanges = [];

    for (const expectedFile of expectedChanges) {
      const filePath = path.join(repo.path, expectedFile.path);

      if (await fileExists(filePath)) {
        // Check if file was actually modified
        const wasModified = await checkFileModified(filePath, task);

        if (wasModified) {
          actualChanges.push(filePath);
          console.log(`   ✅ Modified: ${expectedFile.path}`);
        } else {
          missingChanges.push(filePath);
          console.log(`   ❌ Not modified: ${expectedFile.path}`);
        }
      } else {
        missingChanges.push(filePath);
        console.log(`   ❌ Missing: ${expectedFile.path}`);
      }
    }

    if (missingChanges.length > 0) {
      console.log(`\n   ⚠️  WARNING: ${missingChanges.length} expected changes not found\n`);
      verificationResults.push({
        repository: repo.name,
        status: 'INCOMPLETE',
        actualChanges,
        missingChanges
      });
    } else {
      console.log(`\n   ✅ All expected changes verified\n`);
      verificationResults.push({
        repository: repo.name,
        status: 'COMPLETE',
        actualChanges
      });
    }
  }

  return verificationResults;
}

async function checkFileModified(filePath, task) {
  // Check if file contains expected changes from task
  const content = await readFile(filePath);

  // Check for task-specific indicators
  const taskKeywords = extractTaskKeywords(task);

  for (const keyword of taskKeywords) {
    if (content.includes(keyword)) {
      return true;
    }
  }

  return false;
}
```

#### Step 6.9.4: Silent Failure Detection

**🚨 CRITICAL: Detect missing implementations in required repositories.**

```javascript
async function detectSilentFailures(repositories, task, validationResults) {
  console.log('\n🚨 Step 6.9.4: Silent Failure Detection\n');

  const failures = [];

  // Rule 1: If feature includes new database entity, database-sync repo is REQUIRED
  if (task.includesNewModel) {
    const dbSyncRepo = repositories.find(r => r.role === 'DATABASE_SYNC_SERVICE');

    if (!dbSyncRepo) {
      failures.push({
        severity: 'CRITICAL',
        type: 'MISSING_REQUIRED_REPO',
        message: 'No database-sync service found, but task requires new model',
        impact: 'Database table will not exist - feature will fail'
      });
    } else {
      // Check if database-sync was actually modified
      const wasModified = validationResults.some(r =>
        r.repository === dbSyncRepo.name && r.status === 'COMPLETE'
      );

      if (!wasModified) {
        failures.push({
          severity: 'CRITICAL',
          type: 'MISSING_DATABASE_SYNC',
          repository: dbSyncRepo.name,
          message: 'Database sync service not modified, but task requires new model',
          impact: 'Database table will not exist - feature will fail',
          requiredAction: `Add ${task.modelName} to database sync in ${dbSyncRepo.name}`
        });
      }
    }
  }

  // Rule 2: If feature includes shared model, shared-models repo is REQUIRED
  if (task.includesSharedModel) {
    const sharedModelRepo = repositories.find(r => r.type === 'Shared Library');

    if (!sharedModelRepo) {
      failures.push({
        severity: 'HIGH',
        type: 'MISSING_REQUIRED_REPO',
        message: 'No shared models repository found',
        impact: 'Model will not be available to other services'
      });
    }
  }

  // Rule 3: If package was modified, version MUST be updated
  for (const repo of repositories) {
    if (repo.role === 'PUBLISHABLE_PACKAGE' && repo.wasModified) {
      const versionUpdated = await checkVersionUpdated(repo);

      if (!versionUpdated) {
        failures.push({
          severity: 'HIGH',
          type: 'MISSING_VERSION_UPDATE',
          repository: repo.name,
          message: 'Package was modified but version not updated',
          impact: 'Dependent services will not receive updates',
          requiredAction: `Bump version in ${repo.name}/package.json`
        });
      }
    }
  }

  // Rule 4: If package was modified, build MUST be executed
  for (const repo of repositories) {
    if (repo.role === 'PUBLISHABLE_PACKAGE' && repo.wasModified) {
      const buildExecuted = await checkBuildExecuted(repo);

      if (!buildExecuted) {
        failures.push({
          severity: 'HIGH',
          type: 'MISSING_BUILD',
          repository: repo.name,
          message: 'Package was modified but not built',
          impact: 'Package will not be usable by dependent services',
          requiredAction: `Run build in ${repo.name}`
        });
      }
    }
  }

  if (failures.length > 0) {
    console.log(`⚠️  Detected ${failures.length} silent failures:\n`);

    for (const failure of failures) {
      console.log(`   ${failure.severity}: ${failure.type}`);
      if (failure.repository) console.log(`   Repository: ${failure.repository}`);
      console.log(`   Message: ${failure.message}`);
      console.log(`   Impact: ${failure.impact}`);
      if (failure.requiredAction) console.log(`   Action: ${failure.requiredAction}`);
      console.log('');
    }
  } else {
    console.log('✅ No silent failures detected\n');
  }

  return failures;
}
```

#### Step 6.9.5: Pattern Matching Validation

**🚨 CRITICAL: Verify new code follows existing patterns.**

```javascript
async function validatePatternMatching(repositories, task) {
  console.log('\n🎨 Step 6.9.5: Pattern Matching Validation\n');

  const patternChecks = [];

  for (const repo of repositories) {
    // Find existing models in this repository
    const existingModels = await findExistingModels(repo);

    if (existingModels.length > 0) {
      console.log(`🔍 Repository: ${repo.name}`);
      console.log(`   Analyzing patterns from ${existingModels.length} existing models\n`);

      // Identify the pattern used by existing models
      const pattern = await identifyPattern(repo, existingModels[0]);

      console.log(`   Detected pattern: ${pattern.name}`);
      console.log(`   Pattern elements: ${pattern.elements.join(', ')}\n`);

      // Check if new implementation follows the same pattern
      const newImplementations = await getNewImplementations(repo, task);

      for (const impl of newImplementations) {
        console.log(`   Checking: ${impl.name}`);

        const followsPattern = await checkFollowsPattern(impl, pattern);

        if (followsPattern.matches) {
          console.log(`   ✅ Follows pattern\n`);
          patternChecks.push({
            repository: repo.name,
            implementation: impl.name,
            status: 'PASS',
            pattern: pattern.name
          });
        } else {
          console.log(`   ❌ Does not follow pattern`);
          console.log(`   Missing: ${followsPattern.missing.join(', ')}\n`);
          patternChecks.push({
            repository: repo.name,
            implementation: impl.name,
            status: 'FAIL',
            pattern: pattern.name,
            missing: followsPattern.missing
          });
        }
      }
    }
  }

  return patternChecks;
}

async function identifyPattern(repo, referenceModel) {
  const pattern = {
    name: 'unknown',
    elements: []
  };

  // Check for common pattern elements

  // 1. Model file in models/ directory
  const modelsDir = path.join(repo.path, 'src/models');
  const modelFile = path.join(modelsDir, `${referenceModel}.model.ts`);
  if (await fileExists(modelFile)) {
    pattern.elements.push('model-file');
  }

  // 2. Export in models/index.ts
  const indexFile = path.join(repo.path, 'src/models/index.ts');
  if (await fileExists(indexFile)) {
    const content = await readFile(indexFile);
    if (content.includes(referenceModel)) {
      pattern.elements.push('index-export');
    }
  }

  // 3. Service file in services/ directory
  const serviceFile = path.join(repo.path, `src/services/${referenceModel}.service.ts`);
  if (await fileExists(serviceFile)) {
    pattern.elements.push('service-file');
  }

  // 4. Controller in controllers/ directory
  const controllerFile = path.join(repo.path, `src/controllers/${referenceModel}.controller.ts`);
  if (await fileExists(controllerFile)) {
    pattern.elements.push('controller-file');
  }

  // 5. Routes registration
  const routesFile = path.join(repo.path, 'src/routes/index.ts');
  if (await fileExists(routesFile)) {
    const content = await readFile(routesFile);
    if (content.includes(referenceModel)) {
      pattern.elements.push('routes-registration');
    }
  }

  // Identify pattern name based on elements
  if (pattern.elements.includes('model-file') && pattern.elements.includes('index-export')) {
    pattern.name = 'MVC-with-index-export';
  } else if (pattern.elements.includes('model-file')) {
    pattern.name = 'basic-model';
  }

  return pattern;
}

async function checkFollowsPattern(implementation, pattern) {
  const result = {
    matches: true,
    missing: []
  };

  // Check if implementation has all pattern elements
  for (const element of pattern.elements) {
    switch (element) {
      case 'model-file':
        if (!implementation.hasModelFile) {
          result.matches = false;
          result.missing.push('model-file');
        }
        break;
      case 'index-export':
        if (!implementation.hasIndexExport) {
          result.matches = false;
          result.missing.push('index-export');
        }
        break;
      case 'service-file':
        if (!implementation.hasServiceFile) {
          result.matches = false;
          result.missing.push('service-file');
        }
        break;
      case 'controller-file':
        if (!implementation.hasControllerFile) {
          result.matches = false;
          result.missing.push('controller-file');
        }
        break;
      case 'routes-registration':
        if (!implementation.hasRoutesRegistration) {
          result.matches = false;
          result.missing.push('routes-registration');
        }
        break;
    }
  }

  return result;
}
```

#### Step 6.9.6: Final Evidence Validation

**🚨 CRITICAL: Final gate before task completion.**

```javascript
async function finalEvidenceValidation(repositories, task, previousResults) {
  console.log('\n🎯 Step 6.9.6: Final Evidence Validation\n');

  const allChecks = {
    databaseSync: await validateDatabaseSyncIntegration(repositories, task),
    fileChanges: await verifyFileChanges(repositories, task),
    silentFailures: await detectSilentFailures(repositories, task, previousResults),
    patternMatching: await validatePatternMatching(repositories, task)
  };

  // Count failures
  const failures = {
    databaseSync: allChecks.databaseSync.filter(c => c.status === 'FAIL'),
    fileChanges: allChecks.fileChanges.filter(r => r.status === 'INCOMPLETE'),
    silentFailures: allChecks.silentFailures,
    patternMatching: allChecks.patternMatching.filter(c => c.status === 'FAIL')
  };

  const totalFailures = failures.databaseSync.length +
                       failures.fileChanges.length +
                       failures.silentFailures.length +
                       failures.patternMatching.length;

  if (totalFailures > 0) {
    console.log(`\n❌ EVIDENCE VALIDATION FAILED`);
    console.log(`   Total failures: ${totalFailures}\n`);

    console.log('📋 Failure Summary:\n');

    if (failures.databaseSync.length > 0) {
      console.log(`Database Sync Integration (${failures.databaseSync.length}):`);
      failures.databaseSync.forEach(f => {
        console.log(`  ❌ ${f.check}`);
        console.log(`     ${f.evidence.evidence}\n`);
      });
    }

    if (failures.fileChanges.length > 0) {
      console.log(`File Changes (${failures.fileChanges.length}):`);
      failures.fileChanges.forEach(f => {
        console.log(`  ❌ ${f.repository}: Incomplete`);
        console.log(`     Missing: ${f.missingChanges.length} files\n`);
      });
    }

    if (failures.silentFailures.length > 0) {
      console.log(`Silent Failures (${failures.silentFailures.length}):`);
      failures.silentFailures.forEach(f => {
        console.log(`  ${f.severity}: ${f.type}`);
        console.log(`  ${f.message}`);
        console.log(`  Action: ${f.requiredAction}\n`);
      });
    }

    if (failures.patternMatching.length > 0) {
      console.log(`Pattern Matching (${failures.patternMatching.length}):`);
      failures.patternMatching.forEach(f => {
        console.log(`  ❌ ${f.repository}: ${f.implementation}`);
        console.log(`     Missing: ${f.missing.join(', ')}\n`);
      });
    }

    console.log('🚨 TASK CANNOT BE MARKED COMPLETE\n');
    console.log('Required actions:');
    console.log('1. Fix all identified failures');
    console.log('2. Re-run evidence validation');
    console.log('3. Only mark complete when ALL checks PASS\n');

    return {
      status: 'FAILED',
      failures,
      totalFailures
    };
  }

  console.log('✅ ALL EVIDENCE VALIDATIONS PASSED\n');
  console.log('📋 Validation Summary:\n');
  console.log(`✅ Database Sync Integration: ${allChecks.databaseSync.length} checks passed`);
  console.log(`✅ File Changes: ${allChecks.fileChanges.filter(r => r.status === 'COMPLETE').length} repositories complete`);
  console.log(`✅ Silent Failures: 0 detected`);
  console.log(`✅ Pattern Matching: ${allChecks.patternMatching.length} implementations verified`);
  console.log('\n✨ TASK IS EVIDENTIALLY COMPLETE\n');

  return {
    status: 'PASSED',
    allChecks
  };
}
```

#### Step 6.9.7: Display Evidence Validation Summary

**🚨 CRITICAL: Display the evidence validation summary to the user:**

```markdown
## 🔍 Evidence-Based Validation Complete

### Database Sync Integration

✅ New model is imported in database sync service
   File: harborUserSvc/src/database/sync.ts
   Evidence: Found import for UserAvailability

✅ Model is registered in sync configuration
   File: harborUserSvc/src/database/sync.ts
   Evidence: Found registration for UserAvailability

✅ Model is included in Sequelize/ORM initialization
   File: harborUserSvc/src/models/index.ts
   Evidence: Found UserAvailability in ORM init

### File Change Verification

✅ harborSharedModels: 3/3 files modified
   ✅ src/models/UserAvailability.model.ts (created)
   ✅ src/models/index.ts (modified - export added)
   ✅ package.json (modified - version bumped)

✅ harborUserSvc: 5/5 files modified
   ✅ src/models/UserAvailability.model.ts (imported)
   ✅ src/database/sync.ts (registration added)
   ✅ src/services/user-availability.service.ts (created)
   ✅ src/controllers/user-availability.controller.ts (created)
   ✅ src/routes/index.ts (routes registered)

### Silent Failure Detection

✅ No silent failures detected

### Pattern Matching

✅ harborSharedModels: UserAvailability follows pattern
   Pattern: MVC-with-index-export
   Elements: model-file, index-export ✅

✅ harborUserSvc: UserAvailability follows pattern
   Pattern: MVC-with-index-export
   Elements: model-file, index-export, service-file, controller-file, routes-registration ✅

### Final Result

✅ ALL EVIDENCE VALIDATIONS PASSED
→ Task is evidentially complete
→ All code exists
→ All patterns followed
→ All integrations verified

---

✨ **Evidence-Based Validation Complete - Zero assumptions, 100% proof!**
```

**🚨 ENFORCEMENT RULE:**

```
IF ANY evidence check fails → DO NOT mark task as complete
IF file changes missing → Fix and re-validate
IF silent failures detected → Fix and re-validate
IF pattern matching fails → Fix and re-validate
ONLY when ALL evidence checks PASS → Task can be marked complete

NO EXCEPTIONS
NO ASSUMPTIONS
NO PROBABLY
EVIDENCE ONLY
```

**🎯 Core Philosophy:**

```
Your job is NOT to feel correct
Your job is to PROVE correctness with code evidence

PASS is allowed ONLY IF:
✅ Code exists
✅ Pattern followed
✅ Integration verified

Else → FAIL (even if agent thinks it's correct)
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

**🚨 CRITICAL: NO GIT PUSH RULE - ABSOLUTE ZERO TOLERANCE 🚨**

**This is a NON-NEGOTIABLE rule with ZERO exceptions:**

### 🚫 ABSOLUTELY FORBIDDEN (Under ANY Circumstances)

**The agent MUST NEVER:**
- ❌ `git push` - **ABSOLUTELY FORBIDDEN**
- ❌ `git commit` - **ABSOLUTELY FORBIDDEN**
- ❌ `git checkout` - **ABSOLUTELY FORBIDDEN**
- ❌ `git merge` - **ABSOLUTELY FORBIDDEN**
- ❌ `git rebase` - **ABSOLUTELY FORBIDDEN**
- ❌ `git pull` - **ABSOLUTELY FORBIDDEN**
- ❌ Create branches - **ABSOLUTELY FORBIDDEN**
- ❌ Create PRs - **ABSOLUTELY FORBIDDEN**
- ❌ Close tickets - **ABSOLUTELY FORBIDDEN**
- ❌ ANY git operation that modifies remote state - **ABSOLUTELY FORBIDDEN**

### ✅ ALLOWED OPERATIONS

**The agent MAY ONLY:**
- ✅ Read files
- ✅ Modify files locally
- ✅ Run services locally
- ✅ Test APIs locally
- ✅ Validate changes locally

### 🛑 ENFORCEMENT MECHANISM

**If ANY step suggests a git operation:**
1. → **SKIP immediately**
2. → **DO NOT ask**
3. → **DO NOT confirm**
4. → **Continue with next local operation**

### 🚨 VIOLATION CONSEQUENCES

**ANY git operation = CRITICAL TASK FAILURE**
- Task is marked as FAILED
- All progress is discarded
- Agent must restart from beginning

### 🎯 VALID COMPLETION

**Task is COMPLETE when:**
- ✅ All code changes made locally
- ✅ All services running successfully
- ✅ All APIs tested and working
- ✅ All validations passed
- ✅ Feature works end-to-end
- ✅ **ZERO git operations performed**

**🧪 TESTING MODE BEHAVIOR:**
- After validation/testing is complete: **STOP**
- DO NOT create Git branches
- DO NOT commit changes
- DO NOT push to remote
- DO NOT create Pull Requests
- DO NOT close tickets

**🚀 NORMAL MODE BEHAVIOR:**
- **There is NO normal mode that allows git operations**
- **ALL modes are testing/local-only modes**
- **NO git operations under ANY circumstances**

---

**End of Global Agent Workflow**
