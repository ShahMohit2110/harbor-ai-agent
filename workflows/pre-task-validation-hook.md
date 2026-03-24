# Pre-Task Validation Hook

**Version:** 1.0.0
**Last Updated:** 2026-03-24
**Purpose:** AUTOMATIC enforcement of documentation validation before ANY task

---

## 🚨 CRITICAL: THIS HOOK BLOCKS EXECUTION

**This hook is automatically triggered BEFORE ANY task implementation.**

**It makes it IMPOSSIBLE to proceed without proper documentation.**

---

## Hook Trigger Points

**This hook is automatically invoked when:**

1. ✅ User provides a task description
2. ✅ Agent starts ANY implementation work
3. ✅ Agent is about to modify ANY file
4. ✅ Agent begins ANY phase of workflow

**🚨 CANNOT be skipped, bypassed, or disabled.**

---

## Hook Execution Flow

### Step 1: Detect Target Repository

```bash
# Identify current repository
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
REPO_NAME=$(basename "$REPO_ROOT")

echo "🔍 Validating repository: $REPO_NAME"
```

---

### Step 2: Invoke Documentation Validator

**Automatically invoke the Documentation Validator Tool:**

```bash
# Navigate to repository
cd "$REPO_ROOT"

# Invoke validator
echo "📚 Running Documentation Validator..."
# (Documentation validation logic from documentation-validator-tool.md)
```

---

### Step 3: Validation Result

**✅ PASS - Documentation Valid**

```
✅ Documentation Validation: PASSED

All required files present:
✅ docs/ARCHITECTURE.md
✅ docs/STRUCTURE.md
✅ docs/DEPENDENCIES.md
✅ docs/SERVICE_RULES.md
✅ docs/SHARED_SERVICES.md
✅ docs/CHANGE_IMPACT.md
✅ docs/DEVELOPMENT_RULES.md
✅ docs/GIT_RULES.md
✅ docs/DATABASE.md (conditional)
✅ docs/MODEL_FLOW.md (conditional)

Documentation loaded into context.
Ready to proceed with task execution.

🟢 PROCEEDING TO TASK IMPLEMENTATION
```

**❌ FAIL - Documentation Missing/Incomplete**

```
❌ Documentation Validation: FAILED

Missing required files:
❌ docs/ARCHITECTURE.md
❌ docs/STRUCTURE.md
❌ docs/MODEL_FLOW.md

🔄 AUTO-GENERATING DOCUMENTATION...

Scanning repository structure...
Analyzing dependencies...
Detecting models and database...
Identifying service boundaries...

✅ Generated 8 documentation files
✅ Validation complete
✅ Documentation loaded into context

🟢 NOW PROCEEDING TO TASK IMPLEMENTATION
```

---

### Step 4: Load Documentation Context

**After validation, load all documentation:**

```bash
# Read all documentation files
for file in docs/*.md; do
    echo "=== Loading: $file ==="
    cat "$file"
done
```

**Store in agent context:**
- Architecture understanding
- Service boundaries and rules
- Model flow and data patterns
- Dependencies and relationships
- Development rules
- Git workflow rules

---

### Step 5: Proceed to Task

**ONLY after validation passes:**

```
📋 Task: {Original task description}

📚 Context Loaded:
- Architecture: {Service type and role}
- Dependencies: {Key dependencies}
- Models: {Model patterns}
- Rules: {Service-specific rules}

🎯 Beginning implementation with full documentation context...
```

---

## Enforcement Behavior

### Blocking Mechanism

**The hook uses a blocking pattern:**

```javascript
// Pseudo-code for hook behavior
function executeTask(task) {
    // Step 1: ALWAYS validate documentation first
    const validation = validateDocumentation();

    if (!validation.passed) {
        // Step 2: Auto-generate if missing
        generateDocumentation();

        // Step 3: Re-validate
        const revalidation = validateDocumentation();

        if (!revalidation.passed) {
            // Step 4: BLOCK if still failing
            throw new Error("Cannot proceed without valid documentation");
        }
    }

    // Step 5: Load context
    const context = loadDocumentation();

    // Step 6: ONLY NOW proceed with task
    return executeTaskWithContext(task, context);
}
```

### Cannot Be Bypassed

**🚨 Critical enforcement points:**

1. **No "skip" option** - Hook cannot be disabled
2. **No "override" flag** - Cannot bypass validation
3. **No manual exception** - Must pass validation to proceed
4. **No partial execution** - All files must be valid

---

## Integration with Agent Workflow

### Automatic Insertion

**This hook is automatically inserted:**

1. **After** user provides task
2. **Before** ANY workflow phase
3. **Before** ANY file modification
4. **Before** ANY code generation

### Example Workflow

```
User: "Create a new Blog model"

Agent Response:
┌─────────────────────────────────────┐
│ 📚 PRE-TASK VALIDATION HOOK         │
├─────────────────────────────────────┤
│ 🔍 Detecting repository...          │
│    Found: harborBlogSvc             │
│                                      │
│ 📋 Validating documentation...      │
│    ❌ docs/ folder missing          │
│                                      │
│ 🔄 Auto-generating documentation... │
│    ✅ ARCHITECTURE.md               │
│    ✅ STRUCTURE.md                  │
│    ✅ MODEL_FLOW.md                 │
│    ✅ DATABASE.md                   │
│    ✅ SERVICE_RULES.md              │
│    ✅ All 12 files generated        │
│                                      │
│ ✅ Validation: PASSED               │
│ 📚 Context loaded                   │
└─────────────────────────────────────┘

Now proceeding with: "Create a new Blog model"
With full documentation context:
- Model flow patterns understood
- Database schema known
- Service rules applied
...
```

---

## Hook Configuration

### Trigger Words

**The hook is triggered by ANY task-related input:**

- "Create..."
- "Add..."
- "Implement..."
- "Build..."
- "Update..."
- "Fix..."
- "Modify..."
- "Change..."
- Any task description

### Exclusions

**The hook is NOT triggered for:**

- Information queries ("What is...", "How do I...")
- Documentation requests ("Show me...", "Read...")
- Status checks ("Status of...", "Current...")
- Exploration tasks ("Explore...", "Find...")

---

## Validation States

### State 1: Validation Pending

```
⏳ Pre-Task Validation: PENDING
Waiting for documentation validation...
```

### State 2: Validating

```
🔍 Pre-Task Validation: VALIDATING
Checking /docs folder...
Verifying required files...
Validating documentation quality...
```

### State 3: Generating (if needed)

```
🔄 Pre-Task Validation: GENERATING
Auto-generating missing documentation...
Analyzing repository structure...
Creating documentation files...
```

### State 4: Passed

```
✅ Pre-Task Validation: PASSED
All documentation validated and loaded.
Ready to proceed with task.
```

### State 5: Failed (should not happen)

```
❌ Pre-Task Validation: FAILED
Critical error - unable to generate documentation.
Please check repository structure.
```

---

## Error Handling

### If Repository Detection Fails

```
❌ Error: Unable to detect repository
Please ensure you're in a valid git repository.
```

### If Documentation Generation Fails

```
❌ Error: Documentation generation failed
Repository may be corrupted or inaccessible.
Please check:
- Git repository is valid
- File permissions are correct
- Disk space is available
```

### If Validation Still Fails After Generation

```
❌ Error: Documentation validation failed after generation
This should not happen. Please investigate:
- Generated file locations
- File permissions
- Disk write access
```

---

## Performance Considerations

### Execution Time

**Typical execution times:**

- Validation only: ~2 seconds
- Auto-generation: ~30-60 seconds (one-time cost)
- Subsequent validations: ~2 seconds

### Caching

**Documentation context is cached:**

- First run: Full validation + generation
- Subsequent runs: Quick validation only
- Cache invalidated when: Files change, docs modified

---

## Monitoring and Logging

### Validation Log

**Each validation is logged:**

```
[2026-03-24 10:30:45] PRE-TASK VALIDATION STARTED
[2026-03-24 10:30:46] Repository detected: harborBlogSvc
[2026-03-24 10:30:46] Validation started
[2026-03-24 10:30:47] ❌ docs/ folder missing
[2026-03-24 10:30:47] Auto-generation started
[2026-03-24 10:31:15] ✅ Generated 12 files
[2026-03-24 10:31:16] ✅ Validation passed
[2026-03-24 10:31:16] 📚 Context loaded (245KB)
[2026-03-24 10:31:17] PRE-TASK VALIDATION COMPLETE
```

---

## Success Metrics

### Validation Success Rate

**Target:** 100% of tasks pass documentation validation

**How achieved:**
- Automatic generation eliminates missing docs
- Quality checks ensure completeness
- Blocking enforcement prevents bypass

### Documentation Coverage

**Target:** 100% of repositories have complete documentation

**How achieved:**
- First-time auto-generation
- Ongoing validation
- Automatic updates when needed

---

## Quick Reference

### Trigger Conditions

- ANY task implementation
- ANY file modification
- ANY code generation

### What Happens

1. Detect repository
2. Validate `/docs`
3. Auto-generate if needed
4. Load documentation
5. Proceed to task

### Cannot Be

- ❌ Skipped
- ❌ Bypassed
- ❌ Disabled
- ❌ Overridden

---

**End of Pre-Task Validation Hook**
