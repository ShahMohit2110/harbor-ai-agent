# Harbor AI Agent v2.0 - Dynamic Multi-Repository Architecture

**Migration Date:** 2026-03-11
**Version:** 2.0.0
**Status:** ✅ Architecture Designed and Documented

---

## Executive Summary

The Harbor AI Agent has been transformed from a **hardcoded, predefined service architecture** into a **dynamic, flexible multi-repository development system**. This transformation enables the agent to:

- Automatically discover and analyze any repository in the workspace
- Adapt to different architectures and technologies
- Coordinate changes across multiple repositories
- Work safely with testing mode before production deployment
- Build its own knowledge base through repository memory

---

## Key Changes

### 1. Repository Discovery System

**New File:** `tools/repository-scanner.md`

**Capabilities:**
- Scans workspace parent directory for all git repositories
- Analyzes repository structure automatically
- Detects project types: backend, frontend, mobile, shared library
- Identifies frameworks: Express.js, Next.js, React Native, etc.
- Infers repository purpose from code patterns

**How It Works:**
```
1. Scan /Users/mohitshah/Documents/HarborService/
2. Find all directories with .git folder
3. Analyze package.json in each repository
4. Detect framework and technology stack
5. Generate repository analysis document
6. Store in agent-memory/repo-analysis/{repo-name}.md
```

### 2. Dynamic Workflow

**New File:** `workflows/dynamic-workflow.md`

**New Workflow Phases:**

**Phase 0: Repository Discovery** (NEW)
```
When agent starts:
- Scan workspace for repositories
- Load repository memory
- Build repository map
- Identify relationships
```

**Phase 1: Task Intake** (ENHANCED)
```
Instead of:
- Looking up hardcoded service-map.md

Now:
- Analyze task requirements
- Search repository memory
- Match capabilities to task
- Identify affected repositories dynamically
```

**Phase 2: Dynamic Planning** (NEW)
```
- Analyze each affected repository
- Understand existing structure
- Generate multi-repository plan
- Resolve implementation order
```

**Phase 3: Multi-Repository Execution** (NEW)
```
- Create branches in each repository
- Implement changes in dependency order
- Switch contexts between repositories
- Follow repository-specific patterns
```

### 3. Memory System

**New Files:**
- `memory/repo-analysis/template.md` - Analysis template
- `memory/repo-analysis/{repo-name}.md` - Individual analyses (generated at runtime)

**What Gets Stored:**
```yaml
repository:
  name: harborUserSvc
  path: /Users/mohitshah/Documents/HarborService/harborUserSvc
  type: backend
  framework: Express.js
  language: TypeScript

detected_apis:
  - POST /user-svc/user
  - GET /user-svc/user/:id
  - PUT /user-svc/user/:id

inferred_purpose: User and profile management service

relationships:
  depends_on: [harborSharedModels]
  used_by: [harborWebsite, HarborApp]
```

### 4. Testing Mode

**New File:** `workflows/testing-mode.md`

**Purpose:** Safe testing environment without external changes

**Behavior:**
```
✅ DOES:
- Scan workspace
- Plan changes
- Create local branches
- Implement code
- Run tests locally
- Generate summary reports

❌ DOES NOT:
- Push branches to remote
- Create Pull Requests
- Update Azure DevOps tickets
- Modify external systems
```

**Enable:**
```bash
export HARBOR_AI_TESTING_MODE=true
```

**Example Output:**
```
Testing Mode Summary
===================
Task: Add user availability status

Affected Repositories:
1. harborUserSvc
   Branch: feature/task-123 (local only)
   Build: PASSED
   Tests: PASSED
   Pushed: NO (testing mode)

2. harborWebsite
   Branch: feature/task-123-ui (local only)
   Build: PASSED
   Tests: PASSED
   Pushed: NO (testing mode)

Report saved to: agent-progress/task-123-summary.md
```

---

## Architecture Comparison

### Before (v1.0 - Hardcoded)

```
User Task
    ↓
Azure DevOps Fetch
    ↓
Read service-map.md (PREDEFINED)
    ↓
Lookup in static service list
    ↓
Plan for known service
    ↓
Implement in known location
    ↓
Test & PR
```

**Limitations:**
- Only works with predefined services
- Can't adapt to new repositories
- Requires manual updates to service-map.md
- No knowledge of actual code structure
- Rigid workflow

### After (v2.0 - Dynamic)

```
User Task
    ↓
Workspace Scan (AUTOMATIC)
    ↓
Repository Analysis (AUTOMATIC)
    ↓
Task → Repository Matching (DYNAMIC)
    ↓
Multi-Repository Planning (DYNAMIC)
    ↓
Context Switching & Implementation (DYNAMIC)
    ↓
Test & Generate Summary (FLEXIBLE)
    ↓
[Testing Mode: STOP] OR [Production: PR & Push]
```

**Advantages:**
- Works with any repository structure
- Adapts to new repositories automatically
- Builds knowledge from code analysis
- Flexible, multi-repository coordination
- Safe testing mode

---

## New File Structure

```
harbor-ai/
├── workflows/
│   ├── ai-workflow.md           # Master workflow (existing)
│   ├── dynamic-workflow.md      # NEW: Dynamic multi-repo workflow
│   ├── testing-mode.md          # NEW: Testing mode guide
│   ├── planning.md              # Planning template (existing)
│   ├── execution.md             # Execution workflow (existing)
│   ├── testing.md               # Testing workflow (existing)
│   └── pr.md                    # PR workflow (existing)
├── tools/
│   ├── repository-scanner.md    # NEW: Repository scanner tool
│   └── azure-devops-fetch.md    # Azure DevOps integration (existing)
├── memory/
│   ├── MEMORY.md                # Updated: New workflow info
│   ├── harbor-agent-memory.md   # System knowledge (existing)
│   └── repo-analysis/           # NEW: Repository analyses (generated at runtime)
│       ├── template.md          # Analysis template
│       └── {repo-name}.md       # Individual repo analyses
├── agents/
│   └── harbor-backend-agent.md  # Agent behavior (existing)
└── README.md                    # Updated: New features section
```

---

## Backward Compatibility

### What Was Preserved

✅ **Existing Workflows:**
- `workflows/ai-workflow.md` - Master workflow still valid
- `workflows/planning.md` - Planning template still used
- `workflows/execution.md` - Execution process unchanged
- `workflows/testing.md` - Testing requirements same
- `workflows/pr.md` - PR creation unchanged

✅ **Agent Behavior:**
- Autonomous execution preserved
- Code quality standards same
- Testing requirements unchanged
- Branch naming conventions same

### What Changed

🔄 **Task Intake:**
- OLD: Lookup in service-map.md
- NEW: Analyze task → Search repository memory → Match capabilities

🔄 **Service Resolution:**
- OLD: Hardcoded service list
- NEW: Dynamic repository matching

🔄 **Planning:**
- OLD: Single repository plan
- NEW: Multi-repository coordination

🔄 **Execution:**
- OLD: Work in one repository
- NEW: Context switch across multiple repositories

---

## Dynamic Repository Resolution

### Algorithm

```
Input: Task description ("Build CMS pages")

Step 1: Parse Keywords
- Keywords: "CMS", "pages", "content", "management"

Step 2: Score Each Repository
For each repository in memory:
  - Check purpose match (50 points)
  - Check API/endpoint match (30 points)
  - Check technology fit (10 points)
  - Check relationships (10 points)

Step 3: Sort & Filter
- Sort by score (highest first)
- Filter above threshold (50+ points)
- Limit to top 5 repositories

Step 4: Return Affected Repositories
[
  { repo: harborWebsite, score: 95, impact: HIGH },
  { repo: harborUserSvc, score: 85, impact: MEDIUM }
]
```

### Example Results

| Task | Primary Repo | Secondary Repos | Reasoning |
|------|-------------|-----------------|-----------|
| "Add user availability" | harborUserSvc (90) | harborWebsite (60) | User data + UI display |
| "Build CMS pages" | harborWebsite (95) | harborUserSvc (85) | Web UI + Backend APIs |
| "Payment processing" | harborJobSvc (90) | harborUserSvc (70) | Job escrow + User payouts |
| "Real-time chat" | harborSocketSvc (100) | NotificationSvc (40) | WebSocket + Notifications |

---

## Testing Mode Deep Dive

### Use Cases

1. **First-Time Setup**
   - Verify agent configuration
   - Test repository scanning
   - Validate workflow

2. **Feature Development**
   - Test new agent capabilities
   - Validate code generation
   - Review before pushing

3. **Debugging**
   - Investigate agent behavior
   - Test fixes
   - Validate changes

4. **CI/CD Testing**
   - Automated testing pipeline
   - Validation before production
   - Safety checks

### Testing vs Production Mode

| Aspect | Testing Mode | Production Mode |
|--------|-------------|-----------------|
| Workspace Scan | ✅ Yes | ✅ Yes |
| Repository Analysis | ✅ Yes | ✅ Yes |
| Task Planning | ✅ Yes | ✅ Yes |
| Branch Creation | ✅ Local | ✅ Local + Remote |
| Code Implementation | ✅ Yes | ✅ Yes |
| Local Testing | ✅ Yes | ✅ Yes |
| Push to Remote | ❌ No | ✅ Yes |
| Create PRs | ❌ No | ✅ Yes |
| Update Tickets | ❌ No | ✅ Yes |

---

## Implementation Guide

### For Agent Developers

1. **Update Agent Startup:**
   ```bash
   # At startup, run:
   scan-workspace
   load-repository-memory
   build-repository-map
   ```

2. **Task Processing:**
   ```bash
   # When task received:
   analyze-task-requirements
   resolve-affected-repositories
   generate-multi-repo-plan
   execute-in-dependency-order
   ```

3. **Testing Mode:**
   ```bash
   # Check environment variable:
   if HARBOR_AI_TESTING_MODE == true:
     skip-push()
     skip-pr()
     skip-ticket-update()
     generate-summary-report()
   ```

### For Users

1. **Enable Testing Mode:**
   ```bash
   export HARBOR_AI_TESTING_MODE=true
   /start-harbor-ai
   ```

2. **Review Results:**
   ```bash
   cat agent-progress/task-{id}-summary.md
   ```

3. **Manual Push (if satisfied):**
   ```bash
   cd {repository}
   git push origin feature/task-{id}
   ```

4. **Disable Testing Mode:**
   ```bash
   export HARBOR_AI_TESTING_MODE=false
   /start-harbor-ai
   ```

---

## Migration Checklist

### Pre-Migration

- [ ] Backup existing harbor-ai directory
- [ ] Document current agent behavior
- [ ] Identify hardcoded assumptions
- [ ] List all repositories in workspace

### Migration Steps

- [ ] Create `tools/repository-scanner.md`
- [ ] Create `workflows/dynamic-workflow.md`
- [ ] Create `workflows/testing-mode.md`
- [ ] Create `memory/repo-analysis/` directory
- [ ] Create `memory/repo-analysis/template.md`
- [ ] Update `README.md` with new features
- [ ] Update `memory/MEMORY.md` with v2.0 info
- [ ] Test repository scanner
- [ ] Test dynamic resolution
- [ ] Test testing mode

### Post-Migration

- [ ] Verify existing workflows still work
- [ ] Test with a simple task
- [ ] Review generated repository analyses
- [ ] Validate backward compatibility
- [ ] Update documentation

---

## Future Enhancements

### Phase 2: Advanced Features

1. **API Endpoint Detection**
   - Parse route files automatically
   - Extract OpenAPI/Swagger specs
   - Build API dependency graph

2. **Intelligent Caching**
   - Cache repository analysis
   - Smart re-scan triggers
   - Change detection

3. **Visual Documentation**
   - Generate architecture diagrams
   - Service dependency visualization
   - API mapping

4. **Learning System**
   - Learn from past implementations
   - Improve repository understanding
   - Pattern recognition

### Phase 3: Full Autonomy

1. **Self-Healing**
   - Detect and fix errors
   - Automatic retries
   - Rollback on failure

2. **Predictive Planning**
   - Suggest improvements
   - Identify optimization opportunities
   - Proactive issue detection

3. **Collaboration**
   - Multi-agent coordination
   - Distributed task execution
   - Consensus building

---

## Frequently Asked Questions

### Q: Will my existing workflows break?

**A:** No. All existing workflows are preserved. The dynamic workflow is an additional capability that extends the agent, not replaces it.

### Q: Do I need to update my repositories?

**A:** No. The agent automatically discovers and analyzes any repository structure. No changes needed to your code.

### Q: Can I still use service-map.md?

**A:** Yes. The service-map.md is still useful as a reference and for understanding service boundaries. It's no longer the ONLY source of truth.

### Q: How do I know if testing mode is enabled?

**A:** Check the agent startup logs. It will display:
```
Harbor AI Agent Starting...
Testing Mode: ENABLED
```

### Q: Can I switch between testing and production mode?

**A:** Yes. Change the `HARBOR_AI_TESTING_MODE` environment variable and restart the agent.

### Q: What happens if a new repository is added?

**A:** The agent will automatically discover it during the next workspace scan and generate a new repository analysis.

---

## Summary

The Harbor AI Agent v2.0 represents a significant evolution from a hardcoded, predefined system to a flexible, dynamic multi-repository development agent. Key improvements:

1. **Automatic Discovery** - No manual configuration needed
2. **Dynamic Adaptation** - Works with any repository structure
3. **Safe Testing** - Testing mode prevents unwanted changes
4. **Memory System** - Builds knowledge over time
5. **Backward Compatible** - Existing workflows preserved

The agent is now capable of understanding unknown repositories, adapting to different architectures, and coordinating changes across multiple codebases - making it a truly autonomous development system.

---

**Status:** ✅ Architecture Complete
**Next Steps:**
1. Implement repository scanner
2. Integrate with existing workflows
3. Add testing mode to agent startup
4. Validate with real tasks
5. Deploy to production

**Documentation Created:**
- ✅ `tools/repository-scanner.md`
- ✅ `workflows/dynamic-workflow.md`
- ✅ `workflows/testing-mode.md`
- ✅ `memory/repo-analysis/template.md`
- ✅ Updated `README.md`
- ✅ Updated `memory/MEMORY.md`
- ✅ This migration guide

---

**Document Version:** 1.0.0
**Last Updated:** 2026-03-11
**Author:** Harbor AI Architecture Team
