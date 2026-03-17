# Harbor AI Agent - Startup Workflow

**Version:** 3.0.0 (GLOBAL AGENT)
**Last Updated:** 2026-03-17
**Purpose:** Complete agent startup and execution workflow - Fully Dynamic, Repository-Aware

---

## 🚨 CRITICAL: Global Agent Mode (NEW)

**The Harbor AI Agent is now a FULLY DYNAMIC, REPOSITORY-AWARE GLOBAL DEVELOPMENT AGENT.**

**What This Means:**
- The agent NO longer relies on predefined rules or hardcoded logic
- The agent DISCOVERS and UNDERSTANDS all repositories dynamically on startup
- The agent LEARNS patterns from the codebase itself
- The agent ADAPTS to any project structure automatically

**Key Principles:**
- ✅ DISCOVER - Find all repositories dynamically
- ✅ UNDERSTAND - Learn each repository's purpose from its code
- ✅ DETECT - Infer patterns and workflows from the codebase
- ✅ ADAPT - Follow actual implementation patterns, not assumptions
- ✅ VERIFY - Ensure cross-repository consistency

**🚨 CRITICAL: Runtime Analysis, Not Setup**

**Repository analysis is a RUNTIME workflow step, NOT a setup/configuration step.**

---

## Complete Startup Sequence

### Step 0: User Triggers Agent Start

User executes one of:
```bash
/start-harbor-ai
start harbor-ai
run harbor-ai
harbor-ai start work
```

### Step 1: Agent Initialization

```
Harbor AI Agent Starting...
Version: 2.0.0
Mode: Testing/Production
Workspace: /Users/mohitshah/Documents/HarborService/
```

### Step 2: Workspace Analysis & Pattern Detection (RUNTIME) ⚡

**This is the FIRST phase of agent execution.**

**The agent now performs TWO critical analyses:**

1. **Repository Discovery & Understanding**
2. **Pattern Detection & Workflow Inference**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 1: Workspace Analysis & Pattern Detection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ Scanning workspace for git repositories...
   Found: harborUserSvc (.git detected)
   Found: harborJobSvc (.git detected)
   Found: harborWebsite (.git detected)
   Found: HarborApp (.git detected)
   Found: harborSharedModels (.git detected)
   Found: harborApiGateWay (.git detected)
   Found: harborNotificationSvc (.git detected)
   Found: harborSocketSvc (.git detected)
   Total: 8 repositories

→ Analyzing repository structures & purposes...
   harborUserSvc: Backend Service (Express.js, TypeScript)
   harborJobSvc: Backend Service (Express.js, TypeScript)
   harborWebsite: Frontend Web (Next.js, TypeScript)
   HarborApp: Mobile App (React Native, TypeScript)
   harborSharedModels: Shared Library (TypeScript)
   harborApiGateWay: Backend API Gateway (Express.js, TypeScript)
   harborNotificationSvc: Backend Service (Express.js, TypeScript)
   harborSocketSvc: Backend Service (Express.js + Socket.io, TypeScript)

→ Detecting patterns across repositories...
   ✅ Shared Module Pattern detected (harborSharedModels)
      - Exports models/types
      - Multiple consumers
      - Version management in use
   ✅ API Service Pattern detected (harborUserSvc, harborJobSvc, etc.)
      - Layered architecture (routes → controllers → services → repositories)
      - Express.js framework
      - REST API design
   ✅ Frontend Pattern detected (harborWebsite)
      - Next.js App Router
      - Component-based
      - API client integration
   ✅ Version Management Pattern detected
      - Semantic versioning in use
      - Dependency version references
      - Update workflow inferred
   ✅ Build Pattern detected
      - Build scripts in package.json
      - Docker configuration present
      - CI/CD configured

→ Inferring workflows from codebase...
   ✅ Shared Module Update workflow inferred
      1. Update models → bump version → update dependencies → install
   ✅ API Service workflow inferred
      1. Routes → Controllers → Services → Repositories
   ✅ Frontend workflow inferred
      1. Components → API calls → State management

→ Generating repository memory...
   Writing: agent-memory/repo-analysis/harborUserSvc.md
   Writing: agent-memory/repo-analysis/harborJobSvc.md
   Writing: agent-memory/repo-analysis/harborWebsite.md
   Writing: agent-memory/repo-analysis/HarborApp.md
   Writing: agent-memory/repo-analysis/harborSharedModels.md
   Writing: agent-memory/repo-analysis/harborApiGateWay.md
   Writing: agent-memory/repo-analysis/harborNotificationSvc.md
   Writing: agent-memory/repo-analysis/harborSocketSvc.md

→ Building in-memory repository relationship graph...
   harborSharedModels ← (used by) ← harborUserSvc, harborJobSvc, harborNotificationSvc, harborSocketSvc
   harborApiGateWay ← (routes to) ← All backend services
   harborWebsite ← (calls) ← harborApiGateWay
   HarborApp ← (calls) ← harborApiGateWay

→ Workspace analysis & pattern detection complete.
```

### Step 3: Task Fetching

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 2: Task Intake
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ Connecting to Azure DevOps...
   Organization: HarborApp
   Project: Harbor

→ Fetching active work items...
   Found: Task #123 - Add user availability status
   Found: Task #124 - Implement CMS feature
   Total: 2 active tasks

→ Selecting highest priority task...
   Selected: Task #123 - Add user availability status
```

### Step 4: Task Planning

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 3: Dynamic Planning
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ Analyzing task requirements...
   Task: Add user availability status
   Keywords: user, availability, status

→ Resolving affected repositories...
   harborUserSvc (score: 95) - User profile data management
   harborWebsite (score: 60) - Display availability on UI
   HarborApp (score: 40) - Optional mobile integration

→ Planning implementation order...
   1. harborSharedModels - Update User model (if needed)
   2. harborUserSvc - Add availability APIs
   3. harborWebsite - Add availability UI

→ Generating multi-repository plan...
   Plan created for 3 repositories
```

### Step 5: Implementation

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 4: Multi-Repository Execution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ Repository: harborSharedModels
   Branch: feature/task-123-user-availability (from main)
   Changes: Add availability field to User model
   Build: ✅ PASSED
   Status: READY

→ Repository: harborUserSvc
   Branch: feature/task-123-user-availability (from dev)
   Changes: Add availability endpoints
   Build: ✅ PASSED
   Tests: ✅ PASSED
   Status: READY

→ Repository: harborWebsite
   Branch: feature/task-123-user-availability-ui (from dev)
   Changes: Add availability UI components
   Build: ✅ PASSED
   Tests: ✅ PASSED
   Status: READY
```

### Step 6: Testing & Git Operations

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 5: Testing & Git Operations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ All builds passed
→ All tests passed

[Testing Mode]
→ Creating local branches only
→ NOT pushing to remote
→ NOT creating Pull Requests
→ NOT updating Azure DevOps tickets
→ Generating summary report...

[Production Mode]
→ Pushing branches to remote
→ Creating Pull Requests
→ Updating Azure DevOps tickets to "Closed"
```

### Step 7: Complete

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent Execution Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tasks Completed: 1
Branches Created: 3 (local)
Builds Passed: 3/3
Tests Passed: 3/3

Summary Report: agent-progress/task-123-summary.md
```

---

## Key Points

### 1. Workspace Analysis is Phase 1

It is **NOT** a setup step. It is the **first phase of agent execution**.

### 2. Analysis Happens on Every Startup

Every time the agent starts, it:
- Scans the workspace
- Analyzes repositories
- Generates fresh memory files

This ensures:
- No stale data
- Current workspace state
- Automatic detection of changes

### 3. No Manual Setup Required

Users do **NOT** need to:
- Run setup commands
- Pre-generate repository files
- Manually trigger scans
- Configure repository lists

### 4. Automatic Workspace Adaptation

If the workspace changes:
- New repository added → Detected on next startup
- Repository deleted → Removed from memory on next startup
- Repository modified → Re-analyzed on next startup

---

## Execution Flow Diagram

```
User Command
    ↓
[start harbor-ai]
    ↓
Agent Startup
    ↓
┌─────────────────────────────────┐
│ PHASE 1: Workspace Analysis     │  ← FIRST PHASE
│ - Scan repositories             │
│ - Analyze structure             │
│ - Generate memory files         │
│ - Build relationship map        │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ PHASE 2: Task Intake            │
│ - Fetch from Azure DevOps       │
│ - Parse requirements            │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ PHASE 3: Dynamic Planning       │
│ - Resolve repositories          │
│ - Generate multi-repo plan      │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ PHASE 4: Execution              │
│ - Create branches               │
│ - Implement changes             │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ PHASE 5: Testing & Git Ops      │
│ - Run tests                     │
│ - Push branches (production)    │
│ - Create PRs (production)       │
│ - Update tickets (production)   │
└─────────────────────────────────┘
    ↓
Complete
```

---

## Comparison: Correct vs Incorrect Approaches

### ❌ INCORRECT: Setup-Based Analysis

```
Setup Phase:
  1. User runs: setup-harbor-ai
  2. Script scans workspace
  3. Generates repository files
  4. Agent "ready" to use

Runtime Phase:
  1. User runs: start harbor-ai
  2. Agent loads pre-generated files
  3. Agent processes tasks

Problem: Stale data, manual refresh needed
```

### ✅ CORRECT: Runtime Analysis

```
Runtime Phase:
  1. User runs: start harbor-ai
  2. Agent scans workspace (FRESH)
  3. Agent generates repository files
  4. Agent loads memory
  5. Agent processes tasks

Benefit: Always fresh, automatic, no manual steps
```

---

## FAQ

### Q: When should I run repository analysis?

**A:** You don't need to run it manually. It happens automatically when you start the agent.

### Q: Do I need to update repository files when I add a new repo?

**A:** No. Just restart the agent. It will detect and analyze the new repository automatically.

### Q: What if I change a repository's structure?

**A:** Restart the agent. It will re-analyze all repositories and update the memory files.

### Q: Can I disable workspace analysis?

**A:** No, workspace analysis is a required phase of agent startup. It ensures the agent has current information about the workspace.

### Q: How long does workspace analysis take?

**A:** Typically 5-15 seconds depending on the number of repositories and their size.

---

## Related Documentation

### Core Global Agent Documentation
- `workflows/global-agent-workflow.md` - **NEW: Complete global agent workflow with adaptive intelligence**
- `workflows/pattern-detection-system.md` - **NEW: Pattern detection and workflow inference system**
- `workflows/dynamic-workflow.md` - Dynamic repository discovery
- `tools/repository-scanner.md` - Repository scanner details

### Execution Workflows
- `workflows/planning.md` - Planning phase
- `workflows/repository-impact-analysis.md` - Repository impact analysis
- `workflows/execution.md` - Execution phase
- `workflows/pattern-consistency-verification.md` - Pattern consistency verification
- `workflows/validation-and-autofix.md` - Validation & auto-fix
- `workflows/testing.md` - Testing phase
- `workflows/pr.md` - Pull request creation

### Quick Start & Configuration
- `QUICK_START_V2.md` - Quick start guide
- `workflows/testing-mode.md` - Testing mode configuration
- `MEMORY.md` - Agent memory and behavior

---

**Status:** ✅ Global Agent Mode Active
**Last Updated:** 2026-03-17
**Version:** 3.0.0
