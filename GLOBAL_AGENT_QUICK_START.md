# Global Agent Quick Start Guide

**Version:** 3.0.0
**Last Updated:** 2026-03-17

---

## What is the Global Agent?

The Harbor AI Agent is now a **fully dynamic, repository-aware global development agent** that can:

- ✅ **Discover** all repositories in your workspace automatically
- ✅ **Understand** each repository's purpose by analyzing its code
- ✅ **Detect** implementation patterns from your codebase
- ✅ **Adapt** to any project structure without configuration
- ✅ **Verify** consistency across all affected repositories

**No manual configuration required.** The agent learns from your code.

---

## Quick Start

### Starting the Agent

Simply run any of these commands:

```bash
start harbor-ai
# OR
run harbor-ai
# OR
harbor-ai start work
```

**That's it!** The agent will:

1. **Automatically discover** all repositories in your workspace
2. **Analyze** each repository's structure and purpose
3. **Detect** patterns and workflows from your codebase
4. **Fetch** tasks from Azure DevOps
5. **Begin** working on the highest priority task

### What Happens on Startup?

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 1: Workspace Analysis & Pattern Detection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ Scanning workspace for git repositories...
   Found: 8 repositories

→ Analyzing repository structures & purposes...
   harborUserSvc: Backend Service
   harborWebsite: Frontend Web
   HarborApp: Mobile App
   ...

→ Detecting patterns across repositories...
   ✅ Shared Module Pattern detected
   ✅ API Service Pattern detected
   ✅ Frontend Pattern detected
   ✅ Version Management Pattern detected

→ Inferring workflows from codebase...
   ✅ Workflows learned from your code

→ Workspace analysis complete.
```

---

## How It Works

### 1. Repository Discovery

The agent automatically finds all git repositories in your workspace:

```
/Users/mohitshah/Documents/HarborService/
├── harbor-ai/           # Agent (excluded)
├── harborUserSvc/       # ✅ Discovered
├── harborWebsite/       # ✅ Discovered
├── HarborApp/           # ✅ Discovered
├── harborSharedModels/  # ✅ Discovered
└── ...                  # ✅ All repos discovered
```

### 2. Purpose Analysis

For each repository, the agent analyzes:

**What it reads:**
- `package.json` - Dependencies, scripts, framework
- `tsconfig.json` - TypeScript configuration
- Directory structure - Source organization
- Code files - Implementation patterns

**What it learns:**
- Repository type (Backend, Frontend, Mobile, Shared Library)
- Technology stack (Express, Next.js, React Native, etc.)
- Purpose (API service, web app, mobile app, shared module)
- Dependencies (which repos depend on which)

### 3. Pattern Detection

The agent analyzes your codebase to detect patterns:

**Example Patterns Detected:**

| Pattern | How It's Detected | Inferred Workflow |
|---------|------------------|------------------|
| Shared Module | index.ts exports, multiple consumers | Update → Bump version → Update deps → Install |
| API Service | Routes, controllers, services | Routes → Controllers → Services → Repos |
| Frontend | App router, components, API calls | Components → API → State → Style |
| Version Management | package.json versions, changelog | Semantic versioning, dependency updates |

### 4. Task Processing

When processing a task, the agent:

1. **Resolves affected repositories** dynamically (not hardcoded)
2. **Follows detected patterns** (not assumptions)
3. **Implements in dependency order** (shared libs → backend → frontend)
4. **Verifies cross-repository consistency** (all repos updated correctly)

---

## Example Workflow

### Task: "Add user availability feature"

#### Step 1: Repository Resolution

Agent analyzes task and resolves affected repositories:

```
Task Keywords: "user", "availability", "status"

Repository Scoring:
- harborUserSvc: 95 points (User domain, APIs)
- harborSharedModels: 85 points (User model)
- harborWebsite: 60 points (Displays user info)
- HarborApp: 50 points (Shows user profiles)

Affected Repositories: ALL 4
```

#### Step 2: Implementation Order

Agent determines order based on dependencies:

```
1. harborSharedModels (shared library)
   ↓ Update User model, bump version

2. harborUserSvc (depends on models)
   ↓ Update dependency version, install, add API

3. harborWebsite (depends on API)
   ↓ Add UI components

4. HarborApp (depends on API)
   ↓ Add mobile UI
```

#### Step 3: Pattern Following

Agent follows detected patterns in each repository:

**harborUserSvc (detected pattern: Layered Architecture)**
```
Following existing pattern:
✅ Add routes in src/routes/
✅ Add controller in src/controllers/
✅ Add service in src/services/
✅ Update models in src/models/
```

**harborWebsite (detected pattern: Next.js App Router)**
```
Following existing pattern:
✅ Add page in app/profile/
✅ Add component in components/
✅ Add API call in lib/api/
✅ Update types in types/
```

#### Step 4: Cross-Repository Verification

Agent verifies consistency:

```
✅ harborSharedModels version updated
✅ harborUserSvc dependency updated
✅ harborUserSvc imports resolve correctly
✅ harborWebsite API integration works
✅ harborApp mobile UI added
✅ All builds passing
```

---

## Key Features

### ✅ No Configuration Required

**Before (Rule-Based):**
```yaml
# Manual configuration required
repositories:
  - name: harborUserSvc
    type: backend
    path: /path/to/harborUserSvc
  - name: harborWebsite
    type: frontend
    path: /path/to/harborWebsite
```

**After (Global Agent):**
```
# No configuration needed!
# Agent discovers everything automatically
```

### ✅ Works with Any Project Structure

**Monorepo:**
```
my-project/
├── packages/
│   ├── shared/
│   ├── backend/
│   └── frontend/
└── package.json
```

**Multi-Repo:**
```
workspace/
├── service-a/
├── service-b/
├── frontend/
└── shared/
```

**Mixed:**
```
workspace/
├── monorepo/
│   └── packages/
├── standalone-service/
└── another-frontend/
```

**Agent adapts to ANY structure!**

### ✅ Adapts to Your Patterns

**Your project uses custom file organization?**
- Agent learns it and follows it

**Your project uses unique naming conventions?**
- Agent detects it and uses it

**Your project has special build processes?**
- Agent infers it and executes it

**No generic rules. Just your patterns.**

---

## Common Scenarios

### Scenario 1: Adding a New Repository

**Setup:**
```bash
# Clone a new repository to workspace
cd /Users/mohitshah/Documents/HarborService/
git clone new-payment-service
```

**Agent Behavior:**
1. Next startup: "start harbor-ai"
2. Agent discovers new-payment-service
3. Analyzes its structure and purpose
4. Adds it to repository relationship graph
5. Can now route tasks to it

**No configuration needed!**

### Scenario 2: Cross-Repository Feature

**Task:** "Add payment processing"

**Agent Behavior:**
1. Detects affected repos:
   - new-payment-service (HIGH)
   - harborSharedModels (for Payment model)
   - harborWebsite (for checkout UI)
   - HarborApp (for mobile payment)

2. Implements in dependency order

3. Verifies consistency across all repos

### Scenario 3: Shared Module Update

**Task:** "Update User model with new field"

**Agent Behavior:**
1. Detects shared module pattern
2. Updates harborSharedModels/User model
3. Bumps version in harborSharedModels
4. Updates dependency in ALL consuming services
5. Runs install in all consuming services
6. Verifies all imports resolve

---

## Testing Mode

The agent supports testing mode for development:

```bash
# Enable testing mode
export HARBOR_AI_TESTING_MODE=true

# Start agent
start harbor-ai
```

**Testing Mode Behavior:**
- Creates local branches
- Implements changes
- Runs tests
- **Stops before pushing** (no remote changes)

**Production Mode (default):**
- Creates branches
- Implements changes
- Runs tests
- Pushes to remote
- Creates Pull Requests
- Closes tickets

---

## Troubleshooting

### Q: Agent didn't discover my repository

**A:** Check:
- Repository is in workspace root (parent of harbor-ai)
- Repository has `.git` directory
- Repository is not in `.gitignore`

### Q: Agent detected wrong repository type

**A:** The agent learns from your code. Ensure:
- `package.json` is present and accurate
- Directory structure reflects actual purpose
- Code follows clear patterns

### Q: Agent not following my project's patterns

**A:** The agent learns from existing code. Check:
- Similar features exist in the repository
- Code follows consistent patterns
- Patterns are detectable from structure

---

## Advanced Usage

### Custom Workspace Root

If your workspace is not the parent of harbor-ai:

```bash
export WORKSPACE_ROOT=/path/to/your/workspace
start harbor-ai
```

### Manual Repository Refresh

To force re-analysis of repositories:

```bash
# Delete cached analysis
rm -rf harbor-ai/agent-memory/repo-analysis/

# Restart agent
start harbor-ai
```

### Debug Pattern Detection

To see what patterns were detected:

```bash
# View repository analysis
cat harbor-ai/agent-memory/repo-analysis/{repo-name}.md
```

---

## Next Steps

1. **Start the agent:** `start harbor-ai`
2. **Watch it analyze** your workspace
3. **Review detected patterns** in agent-memory/
4. **Let it process tasks** automatically

---

## Documentation

- **Global Agent Workflow:** `workflows/global-agent-workflow.md`
- **Pattern Detection System:** `workflows/pattern-detection-system.md`
- **Transformation Summary:** `GLOBAL_AGENT_TRANSFORMATION.md`
- **Startup Workflow:** `AGENT_STARTUP_WORKFLOW.md`

---

## Support

If you encounter issues:

1. Check the agent memory: `harbor-ai/agent-memory/`
2. Review repository analysis: `harbor-ai/agent-memory/repo-analysis/`
3. Check workflow documentation: `harbor-ai/workflows/`

---

**Status:** ✅ Global Agent Mode Active
**Version:** 3.0.0
**Last Updated:** 2026-03-17

---

**End of Global Agent Quick Start Guide**
