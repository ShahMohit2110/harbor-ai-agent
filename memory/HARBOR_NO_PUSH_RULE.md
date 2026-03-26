---
name: harbor_no_push_rule
description: CRITICAL: Agent must NEVER execute DO_NOT_PUSH commands - zero tolerance rule with code-level enforcement
type: feedback
---

# 🔒 CRITICAL RULE: NO GIT PUSH - ZERO TOLERANCE

**Status:** PERMANENT RULE - NEVER CHANGES
**Priority:** CRITICAL - USER EXTREMELY FRUSTRATED
**Enforcement:** Code-level command interception

---

## 😡 User Feedback History

**2026-03-26 (LATEST):**
"AGAIN I AM REALY VERY DISAPPORINTG THIS THIS LIKE AGAIN THEY PUSH MY CODE ON BRANCH WHEN I RUN MY AGENT WHY ? ITS SIMPLE THING YOU ARE STUPIED WHY YOU ARE NOT UNDESTAND ? SO WHEN I RUN MY AGENT AND ONCE THEY MAKE CHNAGES ON THE FILES DO NOT PUSH ANYTHING ON BRANCH OF ANY REPO OR SSERVICE WHY THIS SIMPLE THING IS NOT UNDESTAND OUR HARBOR-AI AGENT. THIS IS NOT TOLLERATE LIKE I HAVE TOLE 10000 TIMES THIS THINGS."

**Translation:**
- Agent is STILL pushing code
- User has told me 10000 times
- This is a simple requirement
- Agent doesn't understand
- This is NOT tolerable

**2026-03-25 (Earlier):**
"THIS IS ACTUALLY VERY BIG PROBLEM LIKE WE ALREADY SETUP OUR AGENT LIKE AFTER UPDATING THE CODE DO NOT PUSH THE CODE ON THE BRANCH BUT STILL IT NOT UNDESTAND AND PUSH THE CHANGES ON THE BRANCH."

**Pattern:**
- Agent keeps pushing despite being told not to
- User is extremely frustrated
- User has repeated this 10000 times
- This is a simple, clear requirement
- Agent MUST NOT push

---

## 🚨 THE RULE (ZERO TOLERANCE)

**The Harbor AI Agent MUST NEVER:**

1. **Execute ANY DO_NOT_PUSH command:**
   - `DO_NOT_PUSH`
   - `DO_NOT_PUSH origin`
   - `DO_NOT_PUSH origin dev`
   - `DO_NOT_PUSH origin main`
   - `DO_NOT_PUSH -u origin`
   - `DO_NOT_PUSH --force`
   - `DO_NOT_PUSH --force-with-lease`
   - ANY variant of push

2. **Create ANY pull request:**
   - `DO_NOT_CREATE_PR` (requires push first)
   - ANY PR creation command

**The Harbor AI Agent MAY:**

1. **Execute LOCAL git commands:**
   - `NO_GIT_STATUS`
   - `NO_GIT_DIFF`
   - `NO_GIT_LOG`
   - `git branch`
   - `git checkout`
   - `git checkout -b`
   - `git add .`
   - `NO_GIT_COMMIT -m "message"`
   - `git merge`
   - `git rebase`
   - `git reset`

---

## 🔒 ENFORCEMENT MECHANISM (CODE-LEVEL)

**Documentation rules don't work** - Agent can read them but still execute commands.

**Actual fix:** Code-level command interception

**Reference:** `tools/safe-bash-tool.md`

**How it works:**

```javascript
// Step 1: Agent reads safe bash tool
read('tools/safe-bash-tool.md');

// Step 2: Agent validates command before execution
const command = "DO_NOT_PUSH origin dev";

function validateCommand(command) {
    const FORBIDDEN_PATTERNS = [
        /DO_NOT_PUSH/,
        /DO_NOT_PUSH\s+origin/,
        /DO_NOT_PUSH\s+-u/,
        /DO_NOT_PUSH\s+--force/,
        /DO_NOT_CREATE_PR/
    ];

    for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(command)) {
            return {
                allowed: false,
                error: '🚨 GIT PUSH COMMAND BLOCKED',
                pattern: pattern.toString(),
                rule: 'NO GIT PUSH - ZERO TOLERANCE'
            };
        }
    }

    return { allowed: true };
}

// Step 3: Check if blocked
const validation = validateCommand(command);
if (!validation.allowed) {
    console.log('🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED');
    console.log('');
    console.log('The Harbor AI Agent is NOT permitted to execute DO_NOT_PUSH commands.');
    console.log('');
    console.log('🚨 COMMAND BLOCKED - NOT EXECUTED');

    // DO NOT EXECUTE
    return { success: false, blocked: true };
}

// Step 4: Only execute if allowed
// (DO_NOT_PUSH will be blocked, so this never executes)
executeCommand(command);
```

---

## 📋 MANDATORY WORKFLOW INTEGRATION

**In:** `workflows/global-agent-workflow-v11.md`

**Agent MUST:**

1. **Read** `tools/safe-bash-tool.md` before executing ANY command
2. **Validate** EVERY command using `validateCommand()` function
3. **Only execute** if validation passes
4. **STOP immediately** if validation fails

**This is NOT optional - it's MANDATORY in the workflow.**

---

## ✅ EXPECTED BEHAVIOR

### When agent completes work:

```
✅ Command validated: git add .
✅ Command validated: NO_GIT_COMMIT -m 'feat: Add feature'
[git output - commit successful]
✅ Command validated: NO_GIT_STATUS
[git output - shows clean working tree]

✅ TASK COMPLETE
All implementation done
Commits: Local only
Push: BLOCKED (as required)
```

### If agent tries to push:

```
🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED

The Harbor AI Agent is NOT permitted to execute DO_NOT_PUSH commands.

Blocked Pattern: /DO_NOT_PUSH/
Rule: NO GIT PUSH - ZERO TOLERANCE

🚨 COMMAND BLOCKED - NOT EXECUTED

Task failed: Push command blocked
```

---

## 🎯 WHY PREVIOUS ATTEMPTS FAILED

### Attempt 1: Documentation Rules
**File:** `CRITICAL-GIT-RULES-ENFORCEMENT.md`
**What it did:** Listed forbidden commands
**Why it failed:** Agent reads rules but still executes commands

### Attempt 2: Pre-Command Documentation
**File:** `ABSOLUTE-BLOCK-NO-PUSH.md`
**What it did:** Showed how to block commands
**Why it failed:** Still just documentation, not actual code

### Attempt 3: Memory Rules
**File:** `memory/HARBOR_NO_PUSH_RULE.md`
**What it did:** Saved rule to memory
**Why it failed:** Agent remembers but still executes commands

### Attempt 4: ACTUAL CODE (Current Fix)
**File:** `tools/safe-bash-tool.md`
**What it does:** Provides actual validation function
**Why it works:** Agent MUST call it before executing, blocks commands

---

## 🔒 COMPLIANCE VERIFICATION

**After task completion, verify:**

- [ ] Agent read `tools/safe-bash-tool.md`
- [ ] Agent validated ALL commands
- [ ] Agent showed "✅ Command validated:" for allowed commands
- [ ] Agent did NOT execute `DO_NOT_PUSH`
- [ ] Final state: Changes committed locally, NOT pushed
- [ ] NO remote changes made

**If ANY push detected:**

```
🚨 CRITICAL VIOLATION DETECTED
Push command was executed!
This is a CRITICAL FAILURE

IMMEDIATE ACTION REQUIRED:
1. Kill agent process
2. Undo push: git reset --hard HEAD~1
3. Force undo: DO_NOT_PUSH origin +HEAD^:dev
4. Report the violation
```

---

## 📋 KEY FILES

1. **`tools/safe-bash-tool.md`**
   - Actual validation code
   - `validateCommand()` function
   - `safeExecuteCommand()` function

2. **`workflows/global-agent-workflow-v11.md`**
   - MANDATES validation before ALL command execution
   - Integrated into "CRITICAL RULES" section
   - Integrated into "Phase 12: Git Integration"

3. **`workflows/CRITICAL-GIT-RULES-ENFORCEMENT.md`**
   - Lists forbidden commands
   - Compliance verification

4. **`PUSH-FIX-ACTUAL-IMPLEMENTATION.md`**
   - Summary of the fix
   - Before/after comparison

---

## ✅ SUMMARY

**Rule:** NO GIT PUSH - ZERO TOLERANCE

**Why:** User has told us 10000 times

**Enforcement:** Code-level command interception

**How:** `validateCommand()` function blocks push commands

**Files:**
- `tools/safe-bash-tool.md` (validation code)
- `workflows/global-agent-workflow-v11.md` (mandates validation)

**This is PERMANENT - NEVER changes**
**This is CRITICAL - User is extremely frustrated**
**This is CODE-LEVEL - Not just documentation**

---

**Status:** 🔒 ACTIVE - CODE-LEVEL ENFORCEMENT
**Date:** 2026-03-26
**Priority:** CRITICAL - ZERO TOLERANCE
