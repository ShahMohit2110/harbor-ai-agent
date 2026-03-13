# Harbor AI Agent - Runtime Analysis Update

**Date:** 2026-03-11
**Type:** Behavior Clarification
**Impact:** Workflow Phase Definition

---

## Change Summary

**Issue:** Repository analysis was incorrectly described as happening during "setup" or "configuration".

**Fix:** Repository analysis now explicitly defined as a **runtime workflow step** that executes during agent startup.

---

## What Changed

### Before (Incorrect)

Repository analysis was implied to happen during:
- Setup phase
- Configuration step
- Pre-agent initialization

This would create:
- Stale repository data
- Need for manual refresh
- Outdated workspace understanding

### After (Correct)

Repository analysis **ONLY** happens during:
- Agent startup workflow
- Runtime execution phase
- Every agent invocation

This ensures:
- Fresh repository data
- Automatic workspace detection
- Current workspace understanding

---

## Correct Workflow

```
User Action:
  /start-harbor-ai
     ↓
Agent Startup:
  "Starting Harbor AI Agent..."
     ↓
Phase 1: Workspace Analysis (RUNTIME) ⚡
  - Scan workspace repositories
  - Analyze each repository structure
  - Generate/update memory files
  - Build repository map
     ↓
Phase 2: Task Processing
  - Fetch tasks from Azure DevOps
  - Plan implementation
  - Execute changes
     ↓
Phase 3: Testing & Git Operations
  - Run tests
  - Push branches (production mode)
  - Create PRs (production mode)
```

---

## Key Principles

### 1. Runtime, Not Setup

❌ **INCORRECT:**
```
Setup → Analyze Repos → Generate Memory → Agent Ready
```

✅ **CORRECT:**
```
Start Agent → Analyze Repos → Continue Workflow
```

### 2. Every Startup

Workspace analysis runs on **every agent startup**:
- First time: Analyzes and generates memory
- Subsequent times: Re-analyzes and updates memory
- Always fresh: No stale data

### 3. No Manual Steps

Users do **NOT**:
- Run setup commands
- Pre-generate repository files
- Manually trigger scans
- Refresh repository data

Users **ONLY**:
- Start the agent: `/start-harbor-ai`
- Everything else is automatic

---

## Updated Files

### 1. `workflows/dynamic-workflow.md`

**Changes:**
- Moved "Repository Discovery" from Phase 0 to Phase 1
- Clarified Phase 1 is a runtime step
- Added warning about setup vs runtime
- Updated all phase numbers

**Key Addition:**
```markdown
## 🚨 CRITICAL: When Repository Analysis Happens

**Repository analysis and memory generation is a RUNTIME workflow step, NOT a setup step.**

### When Does Workspace Analysis Run?

**ONLY when the agent starts execution:**

User triggers:
- `start harbor-ai`
- `run harbor-ai`
- `harbor-ai start work`
- `/start-harbor-ai`
```

### 2. `tools/repository-scanner.md`

**Changes:**
- Added "When Repository Scanner Runs" section
- Clarified execution is during agent startup
- Updated commands to be optional/debugging only
- Emphasized automatic execution

**Key Addition:**
```markdown
## 🚨 CRITICAL: When Repository Scanner Runs

**The Repository Scanner is executed as a RUNTIME workflow step during agent startup, NOT during setup.**

### Execution Trigger

The scanner runs **ONLY when the user starts the agent**
```

### 3. `QUICK_START_V2.md`

**Changes:**
- Updated "What Happens Automatically" section
- Clarified workspace analysis is Phase 1 of runtime
- Added "When Repository Analysis Happens" section
- Updated troubleshooting section

**Key Addition:**
```markdown
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
```

### 4. `memory/MEMORY.md`

**Changes:**
- Added ⚡ RUNTIME indicator to repository discovery
- Clarified analysis happens at startup
- Referenced new startup workflow document

**Key Addition:**
```markdown
1. **Automatic Repository Discovery** ⚡ RUNTIME
   - Scans workspace for all git repositories **when agent starts**
   - Analyzes repository structure and technology stack **automatically on startup**

   **🚨 IMPORTANT:** This happens as a **runtime workflow step**, NOT during setup.
   - No pre-analysis required
   - Fresh analysis on every agent startup
```

### 5. `README.md`

**Changes:**
- Updated "Dynamic Repository Discovery" section
- Added runtime indicators
- Referenced startup workflow document

**Key Addition:**
```markdown
### Dynamic Repository Discovery ⚡
- **Runtime workspace scanning** - Discovers all git repositories **when agent starts**
- **Repository analysis** - Analyzes structure, framework, and purpose **at startup**

**🚨 Critical:** Repository analysis happens as a **runtime workflow step** when the agent starts, NOT during setup.
```

### 6. `AGENT_STARTUP_WORKFLOW.md` (NEW)

**Purpose:**
- Complete startup sequence documentation
- Phase-by-phase execution flow
- Comparison of correct vs incorrect approaches
- FAQ about when analysis happens

---

## Workflow Phases (Updated)

### Phase 1: Workspace Analysis (RUNTIME) ⚡

**Execution:** Automatically when agent starts

**Activities:**
1. Scan workspace for git repositories
2. Analyze each repository structure
3. Detect frameworks and technologies
4. Generate/update memory files
5. Build repository relationship map

**Duration:** 5-15 seconds (depending on workspace size)

### Phase 2: Task Intake

**Execution:** After workspace analysis complete

**Activities:**
1. Fetch tasks from Azure DevOps
2. Parse requirements
3. Classify task type

### Phase 3: Dynamic Planning

**Execution:** After task intake

**Activities:**
1. Resolve affected repositories
2. Generate multi-repository plan
3. Determine implementation order

### Phase 4: Execution

**Execution:** After planning

**Activities:**
1. Create branches
2. Implement changes
3. Test locally

### Phase 5: Git Operations

**Execution:** After implementation

**Activities:**
1. Run tests
2. Push branches (production mode only)
3. Create PRs (production mode only)
4. Update tickets (production mode only)

---

## Benefits of Runtime Analysis

### 1. Always Fresh Data

Every agent startup gets:
- Current repository list
- Latest repository structures
- Up-to-date technology detection
- Current relationship map

### 2. Zero Configuration

No need for:
- Setup commands
- Pre-generation steps
- Manual configuration files
- Repository lists

### 3. Automatic Adaptation

Automatically handles:
- New repositories added
- Existing repositories removed
- Repository structure changes
- Technology stack updates

### 4. Simple User Experience

Users only need to:
```bash
/start-harbor-ai
```

Everything else is automatic.

---

## Testing & Validation

### Verification Checklist

- [x] Repository analysis defined as runtime step
- [x] All workflow phases updated with correct numbering
- [x] Documentation clarifies setup vs runtime
- [x] Quick start guide reflects correct behavior
- [x] Troubleshooting section updated
- [x] New startup workflow document created

### Testing Recommendations

When implementing the agent:

1. **Test Fresh Startup**
   - Start agent in clean workspace
   - Verify workspace analysis runs first
   - Check memory files are generated

2. **Test Restart Behavior**
   - Make workspace changes (add/remove repo)
   - Restart agent
   - Verify updated analysis

3. **Test No Stale Data**
   - Modify repository structure
   - Restart agent
   - Verify new structure is detected

---

## FAQ

### Q: When does repository analysis happen?

**A:** Only when the agent starts execution. It's Phase 1 of the runtime workflow.

### Q: Do I need to run setup commands?

**A:** No. Just start the agent with `/start-harbor-ai`. Workspace analysis happens automatically.

### Q: What if I add a new repository?

**A:** Restart the agent. It will detect and analyze the new repository automatically.

### Q: How often does analysis run?

**A:** Every time the agent starts. This ensures data is always fresh.

### Q: Can I disable workspace analysis?

**A:** No, it's a required phase of agent startup to ensure the agent has current workspace information.

---

## Related Documentation

- `AGENT_STARTUP_WORKFLOW.md` - Complete startup sequence
- `workflows/dynamic-workflow.md` - Dynamic workflow phases
- `tools/repository-scanner.md` - Scanner implementation details
- `QUICK_START_V2.md` - User quick start guide

---

## Summary

**Change:** Repository analysis moved from implied "setup" to explicit "runtime workflow phase"

**Impact:**
- ✅ Fresh repository data on every startup
- ✅ No manual setup required
- ✅ Automatic workspace adaptation
- ✅ Simpler user experience

**Status:** ✅ Documentation Updated
**Implementation:** Ready for development

---

**Document Version:** 1.0.0
**Last Updated:** 2026-03-11
