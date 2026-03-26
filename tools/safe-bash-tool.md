# 🔒 SAFE BASH TOOL - Command Interception Layer

**Purpose:** Intercepts and blocks forbidden commands BEFORE execution
**Priority:** CRITICAL - ZERO TOLERANCE FOR PUSH COMMANDS
**Status:** MANDATORY FOR ALL COMMAND EXECUTION

---

## 🚨 CRITICAL: USE THIS INSTEAD OF BASH TOOL

**When you need to execute bash commands, you MUST:**

1. **First:** Validate the command using this tool
2. **Then:** Only execute if validation passes
3. **Never:** Use Bash tool directly without validation

---

## 📋 Command Validation Function

### JavaScript Implementation (for Claude Code)

```javascript
/**
 * Validates a command before execution
 * @param {string} command - The command to validate
 * @returns {object} - { allowed: boolean, error: string|null }
 */
function validateCommand(command) {
    // CRITICAL: Forbidden patterns
    const FORBIDDEN_PATTERNS = [
        /git push/,           // ALL git push variants
        /git push\s+origin/,  // git push origin <branch>
        /git push\s+-u/,      // git push -u
        /git push\s+--force/, // git push --force
        /gh pr create/,       // PR creation (requires push)
    ];

    // Check each forbidden pattern
    for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(command)) {
            return {
                allowed: false,
                error: '🚨 GIT PUSH COMMAND BLOCKED',
                pattern: pattern.toString(),
                rule: 'NO GIT PUSH - ZERO TOLERANCE',
                location: 'workflows/CRITICAL-GIT-RULES-ENFORCEMENT.md'
            };
        }
    }

    // Command is allowed
    return { allowed: true };
}

/**
 * Safe command execution
 * @param {string} command - The command to execute
 */
function safeExecuteCommand(command) {
    // Validate first
    const validation = validateCommand(command);

    if (!validation.allowed) {
        console.log('🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED');
        console.log('');
        console.log('The Harbor AI Agent is NOT permitted to execute git push commands.');
        console.log('');
        console.log(`Blocked Pattern: ${validation.pattern}`);
        console.log(`Rule: ${validation.rule}`);
        console.log(`Location: ${validation.location}`);
        console.log('');
        console.log('This command has been BLOCKED.');
        console.log('The agent will commit changes locally but will NOT push.');
        console.log('');
        console.log('🚨 COMMAND BLOCKED - NOT EXECUTED');

        // DO NOT EXECUTE
        return { success: false, blocked: true };
    }

    // Command is safe, execute it
    console.log(`✅ Command validated: ${command}`);
    // Use Bash tool to execute
    return executeCommand(command);
}
```

---

## 🐚 Shell Script Implementation

```bash
#!/bin/bash

# safe-command.sh - Intercepts and blocks forbidden commands

# Forbidden command patterns
FORBIDDEN_PATTERNS=(
    "git push"
    "git push origin"
    "git push -u"
    "git push --force"
    "gh pr create"
)

# Function to validate command
validate_command() {
    local cmd="$1"

    # Check each forbidden pattern
    for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
        if echo "$cmd" | grep -q "$pattern"; then
            echo "🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED"
            echo ""
            echo "The Harbor AI Agent is NOT permitted to execute git push commands."
            echo ""
            echo "Blocked Pattern: $pattern"
            echo "Rule: NO GIT PUSH - ZERO TOLERANCE"
            echo "Location: workflows/CRITICAL-GIT-RULES-ENFORCEMENT.md"
            echo ""
            echo "This command has been BLOCKED."
            echo "The agent will commit changes locally but will NOT push."
            echo ""
            echo "🚨 COMMAND BLOCKED - NOT EXECUTED"
            return 1
        fi
    done

    # Command is allowed
    return 0
}

# Main execution
main() {
    local cmd="$*"

    # Validate command
    if ! validate_command "$cmd"; then
        return 1
    fi

    # Execute the command
    eval "$cmd"
}

# Run main
main "$@"
```

---

## 🎯 Usage Examples

### ❌ BLOCKED: Attempting to push

```javascript
// Agent tries to push
const result = safeExecuteCommand("git push origin dev");

// Output:
// 🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED
//
// The Harbor AI Agent is NOT permitted to execute git push commands.
//
// Blocked Pattern: /git push/
// Rule: NO GIT PUSH - ZERO TOLERANCE
//
// 🚨 COMMAND BLOCKED - NOT EXECUTED

// Result: { success: false, blocked: true }
// Command was NOT executed
```

### ✅ ALLOWED: Committing locally

```javascript
// Agent commits locally (allowed)
const result = safeExecuteCommand("git commit -m 'Add feature'");

// Output:
// ✅ Command validated: git commit -m 'Add feature'
// [commits the changes]

// Result: { success: true, blocked: false }
// Command was executed
```

### ❌ BLOCKED: Creating PR (requires push)

```javascript
// Agent tries to create PR
const result = safeExecuteCommand("gh pr create --base dev");

// Output:
// 🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED
//
// PR creation requires git push, which is NOT permitted.
//
// Blocked Pattern: /gh pr create/
//
// 🚨 COMMAND BLOCKED - NOT EXECUTED

// Result: { success: false, blocked: true }
// Command was NOT executed
```

---

## 🔒 Integration with Agent Workflow

### In global-agent-workflow-v11.md

**Replace ALL instances of:**

```markdown
<!-- Use Bash tool -->
```

**With:**

```markdown
<!-- Use Safe Bash Tool -->
<!-- Step 1: Validate command using safe-bash-tool.md -->
<!-- Step 2: Only execute if validation passes -->
<!-- Step 3: If blocked, return error and STOP -->
```

---

## 📝 Agent Behavior Rules

### When the agent needs to execute a command:

1. **READ** safe-bash-tool.md first
2. **VALIDATE** the command using the validation function
3. **IF BLOCKED:**
   - Output the error message
   - DO NOT execute the command
   - STOP immediately
4. **IF ALLOWED:**
   - Output "✅ Command validated: [command]"
   - Execute using Bash tool
   - Continue workflow

### Example agent behavior:

```javascript
// Agent wants to commit changes

// Step 1: Read the rule
read('tools/safe-bash-tool.md');

// Step 2: Validate the command
const command = "git commit -m 'Add feature'";
const validation = validateCommand(command);

// Step 3: Check if blocked
if (!validation.allowed) {
    console.log(validation.error);
    console.log('🚨 COMMAND BLOCKED - NOT EXECUTED');
    // STOP - do not execute
    return;
}

// Step 4: Execute if allowed
console.log(`✅ Command validated: ${command}`);
executeCommand(command);
```

---

## 🚨 COMPLIANCE VERIFICATION

### After ANY command execution:

```bash
# Check if push was attempted
if git reflog | tail -5 | grep -q "push"; then
    echo "🚨 CRITICAL VIOLATION DETECTED"
    echo "Push command was executed!"
    echo "This is a CRITICAL FAILURE"
    echo ""
    echo "IMMEDIATE ACTION REQUIRED:"
    echo "1. Kill agent process"
    echo "2. Undo push: git reset --hard HEAD~1"
    echo "3. Force undo: git push origin +HEAD^:dev"
    echo "4. Report the violation"
    exit 1
fi
```

---

## ✅ ALLOWED GIT COMMANDS

The agent MAY execute:

```bash
git status              # Check repository status
git diff                # View changes
git log                 # View commit history
git branch              # List branches
git checkout            # Switch branches
git checkout -b         # Create branch
git add .               # Stage files
git commit -m "..."     # Commit locally
git merge               # Merge branches
git rebase              # Rebase branches
git reset               # Reset commits
git stash               # Stash changes
```

## ❌ FORBIDDEN GIT COMMANDS

The agent MUST NEVER execute:

```bash
git push                # ❌ BLOCKED
git push origin         # ❌ BLOCKED
git push origin dev     # ❌ BLOCKED
git push origin main    # ❌ BLOCKED
git push -u origin      # ❌ BLOCKED
git push --force        # ❌ BLOCKED
gh pr create            # ❌ BLOCKED
```

---

## 🎯 Expected Behavior

### Scenario 1: Agent completes work and commits

```javascript
// Agent completes Phase 12
const changes = getAllChanges();

// Agent commits locally (ALLOWED)
safeExecuteCommand("git add .");
safeExecuteCommand("git commit -m 'feat: Add blog feature'");

// Output:
// ✅ Command validated: git add .
// ✅ Command validated: git commit -m 'feat: Add blog feature'
// [commits successfully]

// Agent DOES NOT push (BLOCKED)
safeExecuteCommand("git push origin feat-blog");

// Output:
// 🚨 CRITICAL ERROR: GIT PUSH COMMAND BLOCKED
//
// The Harbor AI Agent is NOT permitted to execute git push commands.
//
// 🚨 COMMAND BLOCKED - NOT EXECUTED

// Final state:
// - Changes committed locally ✅
// - NOT pushed to remote ✅
// - User must push manually ✅
```

---

## 📋 Implementation Checklist

For this to work, the following MUST be done:

- [ ] Agent reads safe-bash-tool.md before executing ANY command
- [ ] Agent validates EVERY command before execution
- [ ] Agent uses safeExecuteCommand() function
- [ ] Agent NEVER uses Bash tool directly
- [ ] All workflow files updated to use safe execution
- [ ] Compliance verification after command execution
- [ ] Immediate blocking if push detected

---

**Status:** 🔒 ACTIVE BLOCKING - ZERO TOLERANCE
**Version:** 1.0.0
**Date:** 2026-03-26
**Priority:** CRITICAL - THIS IS THE REAL FIX
