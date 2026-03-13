# Dynamic Multi-Repository Workflow

**Version:** 2.0.0
**Last Updated:** 2026-03-11
**Purpose:** Dynamic repository discovery and task routing

---

## 🚨 CRITICAL: When Repository Analysis Happens

**Repository analysis and memory generation is a RUNTIME workflow step, NOT a setup step.**

### ❌ WRONG: Analysis During Setup
```
Setup Phase → Analyze Repositories → Generate Memory → Agent Ready
```
**This approach is INCORRECT because:**
- Memory becomes stale
- Doesn't reflect current workspace state
- Requires manual refresh

### ✅ CORRECT: Analysis During Agent Startup
```
User starts agent → Workspace Analysis → Generate/Update Memory → Continue Workflow
```
**This approach is CORRECT because:**
- Analysis is always fresh
- Reflects current workspace state
- Automatic on every startup
- No stale data

### When Does Workspace Analysis Run?

**ONLY when the agent starts execution:**

User triggers:
- `start harbor-ai`
- `run harbor-ai`
- `harbor-ai start work`
- `/start-harbor-ai`

Agent responds:
1. ✅ Scan workspace repositories
2. ✅ Analyze each repository structure
3. ✅ Generate/update repository memory files
4. ✅ Continue with task processing

---

## Overview

This workflow extends the Harbor AI Agent to work dynamically with any repository structure, eliminating hardcoded service assumptions.

---

## Workflow Phases

### Phase 1: Workspace Analysis (Runtime Startup) ⚡

**🚨 CRITICAL: This phase runs ONLY when the agent starts execution, NOT during setup.**

**Trigger:** User executes command like:
- `start harbor-ai`
- `run harbor-ai`
- `harbor-ai start work`
- `/start-harbor-ai`

At this moment, the agent performs:

1. **Workspace Repository Scan**
   ```
   Scan parent directory for all git repositories
   - Identify all directories with .git folder
   - Skip node_modules, .git, build artifacts
   - Build list of all repositories
   ```

2. **Real-Time Repository Analysis**
   ```
   For each discovered repository:
   - Read package.json (if exists)
   - Analyze directory structure
   - Detect framework and technology
   - Identify repository type
   - Detect APIs, routes, models
   - Infer repository purpose
   ```

3. **Generate/Update Memory Files**
   ```
   Create or update:
   - agent-memory/repo-analysis/{repo-name}.md (for each repo)

   These files reflect the CURRENT workspace state
   ```

4. **Build In-Memory Repository Map**
   - Build repository graph from analyses
   - Identify relationships and dependencies
   - Load into memory for task routing

5. **Validate Workspace State**
   - Check all repositories are accessible
   - Verify git status
   - Identify current branches
   - Detect any conflicts

**Why This Approach:**
- ✅ Analysis is always fresh and current
- ✅ No stale setup data
- ✅ Adapts to workspace changes automatically
- ✅ Runs on every agent startup

### Phase 2: Task Intake

1. **Parse Task Requirements**
   - Extract feature/functionality description
   - Identify technical keywords
   - Determine change scope

2. **Dynamic Service Resolution** (NEW)
   ```
   Instead of: Looking up hardcoded service-map.md

   Now:
   - Analyze task requirements
   - Search repository memory for matching capabilities
   - Identify affected repositories based on:
     * Detected APIs and endpoints
     * Inferred repository purposes
     * Technology stack
     - Repository relationships
   ```

3. **Generate Affected Repositories List**
   ```yaml
   affected_repositories:
     - name: harborUserSvc
       impact: HIGH
       reason: User profile data management
       changes:
         - Add new API endpoints
         - Update database models
     - name: harborWebsite
       impact: MEDIUM
       reason: UI changes for new feature
       changes:
         - Add new pages
         - Update components
     - name: harborSharedModels
       impact: LOW
       reason: Shared type definitions
       changes:
         - Add new model types
   ```

### Phase 3: Dynamic Planning

1. **Analyze Each Affected Repository**
   - Read repository-specific analysis (from Phase 1)
   - Understand current structure
   - Identify entry points
   - Map out changes needed

2. **Generate Multi-Repository Plan**
   ```
   For each affected repository:
   - Determine implementation approach
   - Identify file locations
   - Plan API changes (if backend)
   - Plan UI changes (if frontend)
   - Consider dependencies
   ```

3. **Dependency Resolution**
   ```
   Identify implementation order:
   1. Shared libraries (harborSharedModels)
   2. Backend services (dependencies first)
   3. Frontend clients
   4. Mobile applications
   ```

### Phase 4: Multi-Repository Execution

1. **Branch Strategy**
   ```bash
   For each repository:
   - Create feature branch: feature/task-{id}-{short-name}
   - From appropriate base branch (dev/main)
   - Track branch in agent memory
   ```

2. **Implementation Order**
   ```
   Implement in dependency order:
   1. harborSharedModels (if needed)
   2. Primary backend service
   3. Secondary backend services
   4. Frontend clients
   5. Mobile apps
   ```

3. **Context Switching**
   ```
   For each repository:
   - Navigate to repository directory
   - Load repository-specific rules
   - Understand existing patterns
   - Implement changes following patterns
   - Run tests
   - Commit changes
   - Switch to next repository
   ```

### Phase 5: Testing (TESTING MODE - No Push)

1. **Local Testing Only**
   ```bash
   For each repository:
   - Run build (npm run build / bun run build)
   - Run tests (npm test / bun test)
   - Verify no TypeScript errors
   - Check linting
   ```

2. **DO NOT (Testing Mode)**
   - ❌ DO NOT push branches
   - ❌ DO NOT create Pull Requests
   - ❌ DO NOT update Azure DevOps tickets

3. **Testing Mode Output**
   ```yaml
   testing_results:
     harborUserSvc:
       branch: feature/task-123-user-availability
       build: PASSED
       tests: PASSED
       status: READY (not pushed)

     harborWebsite:
       branch: feature/task-123-user-availability-ui
       build: PASSED
       tests: PASSED
       status: READY (not pushed)
   ```

### Phase 6: Reporting (Testing Mode)

1. **Generate Summary Report**
   ```
   - List all affected repositories
   - Show changes made in each
   - Display test results
   - Show branch names (local only)
   - Note: Branches not pushed (testing mode)
   ```

2. **Create Implementation Summary**
   ```
   Location: harbor-ai/agent-progress/task-{id}-summary.md

   Contents:
   - Task description
   - Affected repositories
   - Changes per repository
   - Test results
   - Next steps (manual push required)
   ```

---

## Dynamic Repository Resolution Algorithm

### Algorithm

```
Input: Task description
Output: List of affected repositories

1. Parse task for keywords
2. For each repository in memory:
   a. Check inferred purpose
   b. Check detected APIs/endpoints
   c. Check technology stack
   d. Calculate relevance score

3. Sort by relevance score
4. Filter repositories above threshold
5. Return sorted list

Relevance Score Calculation:
- Purpose match: 50 points
- API/endpoint match: 30 points
- Technology fit: 10 points
- Relationship to other repos: 10 points
```

### Example

Task: "Build CMS pages"

Analysis:
1. Keywords: "CMS", "pages", "content"
2. Repository Scoring:

| Repository | Purpose Match | API Match | Tech Fit | Relations | Total |
|------------|--------------|-----------|----------|-----------|-------|
| harborUserSvc | User profiles | CMS APIs | Backend API | Used by clients | 80 |
| harborWebsite | Web UI | Page routes | Frontend | Calls backend | 90 |
| HarborApp | Mobile UI | Screen routes | Mobile | Calls backend | 60 |

3. Affected Repositories:
   - harborWebsite (HIGH) - Add CMS pages
   - harborUserSvc (MEDIUM) - Add CMS APIs
   - HarborApp (LOW) - Optional mobile integration

---

## Repository Context Loading

When working on a repository:

1. **Load Repository Analysis**
   ```bash
   Read: agent-memory/repo-analysis/{repo-name}.md
   ```

2. **Understand Structure**
   - Source directories
   - Entry points
   - Framework conventions
   - Existing patterns

3. **Adapt to Patterns**
   - Match existing code style
   - Follow framework conventions
   - Use existing libraries
   - Maintain consistency

---

## Memory Updates

### After Implementation

1. **Update Repository Analysis**
   - If structure changed significantly
   - If new APIs/endpoints added
   - If technology stack changed

2. **Update Repository Map**
   - If new repository added
   - If relationships changed
   - If purposes clarified

3. **Store Task History**
   ```
   Location: agent-progress/task-{id}-summary.md

   Stores:
   - Task description
   - Repositories affected
   - Changes made
   - Test results
   ```

---

## Testing Mode Configuration

### Enable Testing Mode

Set environment variable:
```bash
HARBOR_AI_TESTING_MODE=true
```

Or in `.env`:
```env
# Testing Mode Configuration
HARBOR_AI_TESTING_MODE=true
TESTING_MODE_SKIP_PUSH=true
TESTING_MODE_SKIP_PR=true
TESTING_MODE_SKIP_TICKET_UPDATE=true
```

### Testing Mode Behavior

When `HARBOR_AI_TESTING_MODE=true`:

1. Create branches locally
2. Implement all changes
3. Run tests locally
4. Verify builds pass
5. Generate summary report
6. **STOP** - Do not push

### Disable Testing Mode

```bash
HARBOR_AI_TESTING_MODE=false
```

Normal behavior:
1. Create branches
2. Implement changes
3. Run tests
4. Push branches
5. Create PRs
6. Update tickets

---

## Decision Making: Dynamic vs Hardcoded

### When to Use Dynamic Resolution

Use dynamic discovery when:
- Task is not clearly defined
- Repository structure unknown
- New repositories added
- Cross-cutting concerns

### When to Use Repository Memory

Use repository memory when:
- Task aligns with known patterns
- Repository structure is well-understood
- Implementation follows conventions
- Similar features exist

### Hybrid Approach

1. Use dynamic discovery to find affected repositories
2. Use repository memory to understand structure
3. Use known patterns for implementation
4. Update memory if patterns change

---

## Error Handling

### Repository Not Found

```
Error: Repository analysis not found

Action:
1. Run repository scanner
2. Generate new analysis
3. Proceed with implementation
```

### Unclear Purpose

```
Warning: Repository purpose unclear (confidence < 50%)

Action:
1. Analyze structure more deeply
2. Look for additional indicators
3. Ask user for clarification (if needed)
```

### Dependency Conflicts

```
Error: Repository dependency version mismatch

Action:
1. Identify conflicting versions
2. Update shared dependencies
3. Ensure compatibility
```

---

## Examples

### Example 1: Simple Feature

Task: "Add user availability status"

Dynamic Resolution:
1. Keywords: "user", "availability"
2. Match repositories:
   - harborUserSvc (90) - User data
   - harborWebsite (60) - Display status
   - HarborApp (50) - Mobile status

Plan:
- harborUserSvc: Add availability field, API endpoints
- harborWebsite: Display availability on profiles
- HarborApp: (Optional) Show availability

### Example 2: Complex Feature

Task: "Build CMS pages with backend API"

Dynamic Resolution:
1. Keywords: "CMS", "pages", "API"
2. Match repositories:
   - harborWebsite (95) - Web pages
   - harborUserSvc (85) - Content management APIs
   - HarborApp (40) - Optional mobile

Plan:
- harborUserSvc: Create CMS CRUD APIs
- harborSharedModels: Add CMS content models
- harborWebsite: Create CMS page routes and UI
- HarborApp: (Optional) Mobile CMS integration

### Example 3: Unknown Repository

Task: "Add feature to new analytics service"

Dynamic Resolution:
1. Keywords: "analytics", "service"
2. Scan workspace:
   - Found: harborAnalyticsSvc (new!)
3. Analyze: Backend service, Express.js
4. Match repositories:
   - harborAnalyticsSvc (100) - NEW
   - harborApiGateWay (50) - Add routing

Plan:
- harborAnalyticsSvc: Implement analytics feature
- harborApiGateWay: Add route to analytics service
- Update repository memory with new service

---

## Tools and Commands

### Scan Workspace

```bash
# Triggered automatically at startup
scan-workspace
```

### Update Repository Memory

```bash
# Manual trigger
update-repo-memory --repo harborUserSvc
```

### View Repository Map

```bash
# Show repository relationships
show-repo-map
```

### Analyze Task

```bash
# Test dynamic resolution for a task
analyze-task "Build user profiles feature"
```

---

## Configuration

### Environment Variables

```env
# Workspace Configuration
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/
HARBOR_AI_ROOT=/Users/mohitshah/Documents/HarborService/harbor-ai/

# Repository Scanner
SCAN_DEPTH=2
SCAN_CACHE_HOURS=24
AUTO_SCAN_ON_STARTUP=true

# Testing Mode
HARBOR_AI_TESTING_MODE=false

# Dynamic Resolution
RESOLUTION_THRESHOLD=50
MAX_AFFECTED_REPOS=5
```

### Memory Paths

```yaml
workspace_root: /Users/mohitshah/Documents/HarborService/
agent_memory: harbor-ai/agent-memory/
repo_analyses: agent-memory/repo-analysis/
task_history: agent-progress/
```

---

## Transition from Hardcoded

### What Changed

| Before (Hardcoded) | After (Dynamic) |
|-------------------|-----------------|
| Read `service-map.md` | Scan workspace |
| Predefined service list | Discovered repositories |
| Static service mapping | Dynamic resolution |
| Known repository paths | Detected git repositories |
| Fixed workflow phases | Flexible, multi-repo |

### What Stayed the Same

| Aspect | Status |
|--------|--------|
| Planning workflow | ✅ Preserved |
| Code quality standards | ✅ Preserved |
| Testing requirements | ✅ Preserved |
| Branch naming | ✅ Preserved |
| Commit conventions | ✅ Preserved |

### Migration Path

1. Phase 1: Add repository scanner (NEW)
2. Phase 2: Create repository memory (NEW)
3. Phase 3: Update task intake to use memory (EXTEND)
4. Phase 4: Add testing mode configuration (NEW)
5. Phase 5: Keep existing workflows (PRESERVE)

---

## Checklist

### For Each Task

- [ ] Scan workspace for repositories
- [ ] Load repository memory
- [ ] Analyze task requirements
- [ ] Resolve affected repositories dynamically
- [ ] Generate multi-repository plan
- [ ] Implement in dependency order
- [ ] Test each repository locally
- [ ] Update repository memory if needed
- [ ] Generate summary report
- [ ] (Testing mode) Stop before push
- [ ] (Production mode) Continue to PR

---

**Status:** ✅ Ready for Implementation
**Next:** Implement repository scanner and update workflows
