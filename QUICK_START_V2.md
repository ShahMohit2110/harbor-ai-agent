# Harbor AI Agent v2.0 - Quick Start Guide

**Version:** 2.0.0
**Last Updated:** 2026-03-11

---

## What's New in v2.0?

The Harbor AI Agent is now a **dynamic multi-repository development agent** that:

✅ Automatically discovers all repositories in your workspace
✅ Analyzes repository structure and technology stack
✅ Dynamically routes tasks to appropriate repositories
✅ Works safely with **Testing Mode** before production deployment
✅ Builds its own knowledge base through repository memory

---

## Quick Start

### 1. Enable Testing Mode (Recommended First Step)

Testing mode allows you to safely test the agent without pushing changes:

```bash
# Set testing mode environment variable
export HARBOR_AI_TESTING_MODE=true
```

Or add to `harbor-ai/.env`:
```env
HARBOR_AI_TESTING_MODE=true
```

### 2. Start the Agent

```bash
# Navigate to harbor-ai directory
cd /Users/mohitshah/Documents/HarborService/harbor-ai

# Start the agent
/start-harbor-ai
```

### 3. What Happens Automatically

When the agent starts in testing mode:

```
PHASE 1: Workspace Analysis (RUNTIME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ✅ Scans workspace for all git repositories
2. ✅ Analyzes each repository structure
3. ✅ Detects frameworks and technologies
4. ✅ Generates/updates repository memory files
5. ✅ Builds repository relationship map

PHASE 2: Task Processing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ✅ Fetches tasks from Azure DevOps
7. ✅ Plans implementation for each task
8. ✅ Creates local branches
9. ✅ Implements code changes
10. ✅ Runs tests locally
11. ✅ Generates summary reports
12. ✅ STOPS (does not push or create PRs)
```

**Key Point:** Workspace analysis (steps 1-5) happens **automatically at startup**, not during setup. This ensures the repository analysis is always based on the **current workspace state**.

### 4. Review Results

After the agent completes, review the summary:

```bash
# View implementation summary
cat agent-progress/task-{id}-summary.md
```

Example output:
```yaml
Testing Mode Summary
===================
Task: Add user availability status

Affected Repositories:
1. harborUserSvc
   Branch: feature/task-123 (local only)
   Build: ✅ PASSED
   Tests: ✅ PASSED
   Pushed: ❌ NO (testing mode)

2. harborWebsite
   Branch: feature/task-123-ui (local only)
   Build: ✅ PASSED
   Tests: ✅ PASSED
   Pushed: ❌ NO (testing mode)
```

### 5. Manual Review and Push

If you're satisfied with the changes:

```bash
# Push branches manually
cd /Users/mohitshah/Documents/HarborService/harborUserSvc
git push origin feature/task-123

cd /Users/mohitshah/Documents/HarborService/harborWebsite
git push origin feature/task-123-ui

# Create PRs manually (or use gh CLI)
gh pr create --base dev --head feature/task-123
```

---

## Production Mode (Full Automation)

Once you're confident with the agent behavior:

### 1. Disable Testing Mode

```bash
export HARBOR_AI_TESTING_MODE=false
```

Or remove from `.env`:
```env
# HARBOR_AI_TESTING_MODE=true  # Comment or remove this line
```

### 2. Start the Agent

```bash
/start-harbor-ai
```

### 3. Full Automation

In production mode, the agent will:

```
PHASE 1: Workspace Analysis (RUNTIME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ✅ Scans workspace for all git repositories
2. ✅ Analyzes each repository structure
3. ✅ Detects frameworks and technologies
4. ✅ Generates/updates repository memory files
5. ✅ Builds repository relationship map

PHASE 2: Full Production Workflow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ✅ Fetch and plan tasks from Azure DevOps
7. ✅ Implement code changes
8. ✅ Run tests
9. ✅ Create branches
10. ✅ Push to remote
11. ✅ Create Pull Requests
12. ✅ Update Azure DevOps tickets to "Closed"
```

---

## 🚨 Important: When Repository Analysis Happens

### ❌ Common Misconception

**Wrong:** "I need to run a setup command to analyze repositories"

**Right:** "Repository analysis happens automatically when I start the agent"

### ✅ Correct Understanding

```
DO NOT:
❌ Run setup commands before using agent
❌ Pre-generate repository files
❌ Manually trigger repository scans

DO:
✅ Start the agent: /start-harbor-ai
✅ Agent automatically analyzes workspace
✅ Agent generates/updates memory files
✅ Agent proceeds with tasks
```

### Execution Flow

```
User Action:
  /start-harbor-ai
     ↓
Agent Response:
  "Starting Harbor AI Agent..."
     ↓
  "Beginning Workspace Analysis..."
     ↓
  "Found 10 repositories..."
     ↓
  "Analyzing harborUserSvc..."
  "Analyzing harborJobSvc..."
  "Analyzing harborWebsite..."
     ↓
  "Generated repository memory..."
     ↓
  "Fetching tasks from Azure DevOps..."
     ↓
  "Processing tasks..."
```

### Why This Approach?

1. **Always Fresh Data**
   - Every startup gets current state
   - No stale repository information
   - Detects workspace changes automatically

2. **Zero Setup**
   - No pre-configuration needed
   - No manual scan commands
   - Works immediately

3. **Automatic Updates**
   - New repositories detected on next startup
   - Changed repositories re-analyzed
   - No manual refresh needed

---

## Understanding the Agent's New Capabilities

### Automatic Repository Discovery

The agent automatically discovers all repositories in your workspace:

```
/Users/mohitshah/Documents/HarborService/
├── harborUserSvc/          ← Discovered: Backend Service
├── harborJobSvc/           ← Discovered: Backend Service
├── harborWebsite/          ← Discovered: Frontend Web
├── HarborApp/              ← Discovered: Mobile App
├── harborSharedModels/     ← Discovered: Shared Library
└── harbor-ai/              ← Discovered: Tooling
```

For each repository, the agent:
- Reads `package.json` to detect frameworks
- Analyzes folder structure
- Identifies the repository purpose
- Detects APIs and endpoints
- Builds a relationship map

### Dynamic Task Routing

When you give the agent a task, it automatically determines which repositories are affected:

**Example Task:** "Build CMS pages"

**Agent Analysis:**
1. Keywords: "CMS", "pages", "content"
2. Matches:
   - `harborWebsite` (95) - Web UI for CMS pages
   - `harborUserSvc` (85) - Backend APIs for CMS content
3. Plan:
   - harborUserSvc: Create CMS CRUD APIs
   - harborWebsite: Create CMS page routes and UI

### Repository Memory

The agent builds its own knowledge base:

```
harbor-ai/agent-memory/
└── repo-analysis/
    ├── harborUserSvc.md         # User service analysis
    ├── harborJobSvc.md          # Job service analysis
    ├── harborWebsite.md         # Website analysis
    └── ...
```

Each analysis contains:
- Repository type and purpose
- Technology stack
- Detected APIs and routes
- Dependencies and relationships
- Inferred capabilities

**Note:** These files are generated at runtime during agent startup, not pre-configured.

---

## Common Workflows

### Workflow 1: Test Agent with New Feature

```bash
# 1. Enable testing mode
export HARBOR_AI_TESTING_MODE=true

# 2. Start agent
/start-harbor-ai

# 3. Agent will:
#    - Scan workspace
#    - Fetch task: "Add user availability"
#    - Plan changes for harborUserSvc + harborWebsite
#    - Create local branches
#    - Implement code
#    - Run tests
#    - Generate summary

# 4. Review summary
cat agent-progress/task-123-summary.md

# 5. If satisfied, push manually
cd harborUserSvc && git push origin feature/task-123
```

### Workflow 2: Full Production Automation

```bash
# 1. Ensure testing mode is disabled
export HARBOR_AI_TESTING_MODE=false

# 2. Start agent
/start-harbor-ai

# 3. Agent will:
#    - Scan workspace
#    - Fetch all active tasks
#    - Implement each task
#    - Push branches
#    - Create PRs
#    - Close tickets

# 4. Monitor progress
# Check Azure DevOps for updated tickets
# Check GitHub for created PRs
```

### Workflow 3: Add New Repository

```bash
# 1. Add new repository to workspace
cd /Users/mohitshah/Documents/HarborService/
git clone new-repo

# 2. Restart agent
/start-harbor-ai

# 3. Agent will automatically:
#    - Discover new repository
#    - Analyze its structure
#    - Add to repository map
#    - Include in future task routing
```

---

## Configuration

### Environment Variables

Create or update `harbor-ai/.env`:

```env
# Azure DevOps Configuration
AZURE_DEVOPS_ORG=HarborApp
AZURE_DEVOPS_PROJECT=Harbor
AZURE_DEVOPS_PAT=your-personal-access-token

# Workspace Configuration
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/

# Testing Mode (IMPORTANT)
HARBOR_AI_TESTING_MODE=true  # Set to false for production

# Repository Scanner
AUTO_SCAN_ON_STARTUP=true
SCAN_CACHE_HOURS=24
```

---

## Troubleshooting

### Agent doesn't discover my repository

**Solution:**
```bash
# Verify repository is a git repo
cd /path/to/your/repo
git status

# Ensure it's in the workspace parent
ls /Users/mohitshah/Documents/HarborService/

# Restart agent (workspace analysis runs automatically)
/start-harbor-ai
```

**Note:** Workspace analysis happens automatically on every agent startup. No manual scan command needed.

### Testing mode not working

**Solution:**
```bash
# Verify environment variable
echo $HARBOR_AI_TESTING_MODE
# Should output: true

# Check .env file
cat harbor-ai/.env
# Should contain: HARBOR_AI_TESTING_MODE=true

# Restart agent
```

### Want to see what agent discovered

**Solution:**
```bash
# View individual repository analysis
cat harbor-ai/agent-memory/repo-analysis/harborUserSvc.md

# View all analyses
ls -la harbor-ai/agent-memory/repo-analysis/
```

---

## Next Steps

1. **Start with Testing Mode**
   - Set `HARBOR_AI_TESTING_MODE=true`
   - Run agent with a simple task
   - Review generated changes

2. **Review Repository Analyses**
   - Review individual repo analyses in `agent-memory/repo-analysis/`
   - Verify agent understanding is correct

3. **Test with Simple Tasks**
   - Small feature additions
   - Bug fixes
   - Documentation updates

4. **Disable Testing Mode**
   - Set `HARBOR_AI_TESTING_MODE=false`
   - Run full production workflow
   - Monitor agent behavior

5. **Monitor and Improve**
   - Review implementation summaries
   - Provide feedback
   - Update documentation as needed

---

## Documentation Reference

- **Migration Guide:** `HARBOR_AI_V2_MIGRATION.md` - Complete v2.0 architecture details
- **Dynamic Workflow:** `workflows/dynamic-workflow.md` - Multi-repository coordination
- **Testing Mode:** `workflows/testing-mode.md` - Testing mode configuration
- **Repository Scanner:** `tools/repository-scanner.md` - Repository discovery system
- **Main README:** `README.md` - Project overview

---

## Support

For questions or issues:

1. Check the documentation in `workflows/` and `tools/`
2. Review `agent-memory/` for discovered repository information
3. Examine `agent-progress/` for implementation summaries
4. Review `HARBOR_AI_V2_MIGRATION.md` for architecture details

---

**Version:** 2.0.0
**Status:** Ready for Testing
**Last Updated:** 2026-03-11
