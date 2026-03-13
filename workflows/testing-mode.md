# Testing Mode Configuration

**Version:** 1.0.0
**Last Updated:** 2026-03-11
**Purpose:** Configure Harbor AI Agent for safe testing without external changes

---

## Overview

Testing Mode allows the Harbor AI Agent to implement and validate changes locally without pushing to remote repositories, creating Pull Requests, or updating Azure DevOps tickets.

---

## Enabling Testing Mode

### Method 1: Environment Variable

```bash
export HARBOR_AI_TESTING_MODE=true
```

### Method 2: .env File

Add to `harbor-ai/.env`:

```env
# Testing Mode Configuration
HARBOR_AI_TESTING_MODE=true
TESTING_MODE_SKIP_PUSH=true
TESTING_MODE_SKIP_PR=true
TESTING_MODE_SKIP_TICKET_UPDATE=true
TESTING_MODE_BRANCH_PREFIX=test-
```

### Method 3: Command Line Flag

```
/start-harbor-ai --testing-mode
```

---

## Testing Mode Behavior

### What DOES Happen

✅ **Creates local branches**
- Feature branches created locally
- Branch names follow convention: `test-feature-{name}` or `feature/task-{id}`

✅ **Implements code changes**
- All planned changes are implemented
- Code follows quality standards
- TypeScript compilation passes

✅ **Runs tests locally**
- Unit tests execute
- Integration tests run
- Build process succeeds

✅ **Commits changes locally**
- Changes committed to local branches
- Commit messages follow conventions
- Git history is clean

✅ **Generates summary report**
- Full implementation summary created
- Test results documented
- Branch names and changes listed
- Saved to `agent-progress/task-{id}-summary.md`

### What DOES NOT Happen

❌ **Does NOT push branches**
```
Branches remain local only
No remote push executed
Branches stay on developer machine
```

❌ **Does NOT create Pull Requests**
```
No GitHub PRs created
No Bitbucket PRs created
No merge requests created
```

❌ **Does NOT update Azure DevOps tickets**
```
No ticket status changes
No comments added to tickets
No work item updates
```

---

## Testing Mode Workflow

### Complete Lifecycle

```
1. Receive Task
   ↓
2. Scan Workspace Repositories
   ↓
3. Analyze & Plan Multi-Repository Changes
   ↓
4. Create Local Branches (in each repo)
   ↓
5. Implement Code Changes
   ↓
6. Run Tests Locally
   ↓
7. Verify Builds Pass
   ↓
8. Generate Summary Report
   ↓
9. STOP (Do NOT push)
```

### Output Example

```yaml
Testing Mode Summary
===================

Task: Add user availability status
Azure DevOps ID: #123

Affected Repositories:
---------------------

1. harborUserSvc
   Branch: feature/task-123-user-availability (local only)
   Changes:
     - Added availability field to User model
     - Created GET/PUT /user-svc/availability endpoints
     - Added validation middleware
   Status: ✅ Build PASSED
   Status: ✅ Tests PASSED
   Pushed: ❌ NO (testing mode)

2. harborWebsite
   Branch: feature/task-123-user-availability-ui (local only)
   Changes:
     - Added availability badge to profile pages
     - Created availability settings page
     - Updated Redux store
   Status: ✅ Build PASSED
   Status: ✅ Tests PASSED
   Pushed: ❌ NO (testing mode)

Summary:
--------
Total repositories affected: 2
Branches created: 2 (local only)
Builds passed: 2/2
Tests passed: 2/2

Next Steps:
----------
To complete this task:
1. Review changes in each repository
2. Push branches manually:
   - cd harborUserSvc && git push origin feature/task-123-user-availability
   - cd harborWebsite && git push origin feature/task-123-user-availability-ui
3. Create Pull Requests manually
4. Update Azure DevOps ticket manually

Report saved to: agent-progress/task-123-summary.md
```

---

## Disabling Testing Mode

### Disable and Run Full Workflow

```bash
# Disable testing mode
export HARBOR_AI_TESTING_MODE=false

# Or remove from .env
# HARBOR_AI_TESTING_MODE=false

# Restart agent
/start-harbor-ai
```

### Full Production Workflow

When testing mode is disabled, the agent will:

1. ✅ Implement changes
2. ✅ Test locally
3. ✅ **Push branches to remote**
4. ✅ **Create Pull Requests**
5. ✅ **Update Azure DevOps tickets to "Closed"**

---

## Testing Mode Use Cases

### When to Use Testing Mode

✅ **Use testing mode when:**
- First time running the agent
- Verifying agent behavior
- Testing new features
- Debugging agent issues
- Wanting to review changes before pushing
- Running in development environment
- Validating workflow changes

### When to Disable Testing Mode

✅ **Disable testing mode when:**
- Ready for production use
- Want full automation
- Confident in agent behavior
- Running CI/CD pipeline
- Need end-to-end automation

---

## Configuration Options

### Environment Variables

```env
# Enable testing mode
HARBOR_AI_TESTING_MODE=true

# Branch prefix for testing
TESTING_MODE_BRANCH_PREFIX=test-

# Skip specific steps
TESTING_MODE_SKIP_PUSH=true
TESTING_MODE_SKIP_PR=true
TESTING_MODE_SKIP_TICKET_UPDATE=true

# Keep local branches after testing
TESTING_MODE_KEEP_BRANCHES=true

# Generate detailed reports
TESTING_MODE_VERBOSE_REPORTS=true
```

### Branch Naming

**Testing Mode Disabled:**
```
feature/task-{id}-{short-name}
```

**Testing Mode Enabled:**
```
test-feature/task-{id}-{short-name}
```

Or configure custom prefix:
```
{TESTING_MODE_BRANCH_PREFIX}feature/task-{id}-{short-name}
```

---

## Manual Push After Testing

### Step-by-Step Manual Completion

If testing mode was enabled and you want to complete the task:

1. **Review Changes**
   ```bash
   # Review changes in each repository
   cd harborUserSvc
   git diff main..feature/task-123-user-availability
   ```

2. **Push Branches**
   ```bash
   # Push each branch manually
   cd harborUserSvc
   git push origin feature/task-123-user-availability

   cd ../harborWebsite
   git push origin feature/task-123-user-availability-ui
   ```

3. **Create Pull Requests**
   ```bash
   # Use gh CLI or create manually in GitHub
   gh pr create --repo harborUserSvc --base dev --head feature/task-123-user-availability
   gh pr create --repo harborWebsite --base dev --head feature/task-123-user-availability-ui
   ```

4. **Update Azure DevOps**
   ```bash
   # Update ticket status manually
   # Or use: az boards work-item update --id 123 --state "Closed"
   ```

---

## Troubleshooting

### Testing Mode Not Working

**Issue:** Agent still pushes branches

**Solution:**
```bash
# Verify environment variable is set
echo $HARBOR_AI_TESTING_MODE
# Should output: true

# Check .env file
cat harbor-ai/.env
# Should contain: HARBOR_AI_TESTING_MODE=true

# Restart agent
```

### Local Branches Not Created

**Issue:** No branches created locally

**Solution:**
```bash
# Check agent logs for errors
# Verify git repositories are accessible
# Check write permissions

# Test manually
cd harborUserSvc
git checkout -b test-branch
echo "test" > test.txt
git add test.txt
git commit -m "test commit"
```

### Tests Failing in Testing Mode

**Issue:** Tests fail, agent continues

**Solution:**
```bash
# Run tests manually to debug
cd harborUserSvc
npm test

# Check for missing dependencies
npm install

# Verify TypeScript compilation
npm run build
```

---

## Safety Features

### Protected Branches

Testing mode prevents pushes to:
- `main` branch
- `dev` branch
- `master` branch
- `production` branch
- Any branch matching `*/release/*`

### Confirmation Prompts

In testing mode, agent may ask for confirmation:
- Before creating branches
- Before making changes
- Before running tests

These can be disabled:
```env
TESTING_MODE_AUTO_CONFIRM=true
```

### Dry Run Mode

For maximum safety, use dry run:
```env
HARBOR_AI_DRY_RUN=true
```

Dry run:
- ✅ Plans changes
- ❌ Does NOT create branches
- ❌ Does NOT modify files
- ❌ Does NOT run tests
- ✅ Reports what would happen

---

## Monitoring Testing Mode

### Log Files

```bash
# View agent activity
tail -f harbor-ai/logs/agent.log

# View testing mode specific logs
tail -f harbor-ai/logs/testing-mode.log
```

### Summary Reports

```bash
# List all testing mode summaries
ls -la harbor-ai/agent-progress/

# View specific task summary
cat harbor-ai/agent-progress/task-123-summary.md
```

---

## Migration: Testing → Production

### When Ready to Go Live

1. **Disable testing mode:**
   ```bash
   export HARBOR_AI_TESTING_MODE=false
   ```

2. **Clean up test branches:**
   ```bash
   # Option 1: Delete local test branches
   cd harborUserSvc
   git branch -D test-feature-*

   # Option 2: Rename test branches to feature branches
   git branch -m test-feature-123 feature/task-123
   ```

3. **Run agent in production mode:**
   ```bash
   /start-harbor-ai
   ```

4. **Monitor first production run:**
   - Watch for push confirmations
   - Verify PRs created
   - Confirm tickets updated

---

## Best Practices

### Development Workflow

1. **Start with testing mode enabled**
2. **Verify agent behavior**
3. **Review generated changes**
4. **Fix any issues**
5. **Disable testing mode**
6. **Run full production workflow**

### CI/CD Integration

```yaml
# .github/workflows/harbor-ai.yml
name: Harbor AI Agent

on:
  push:
    branches: [main]

jobs:
  harbor-ai:
    runs-on: ubuntu-latest
    steps:
      - name: Run Harbor AI Agent
        env:
          HARBOR_AI_TESTING_MODE: ${{ github.event_name == 'pull_request' }}
        run: |
          /start-harbor-ai
```

---

## FAQ

### Q: Can I switch between testing and production mode?

**A:** Yes. Change the environment variable and restart the agent.

### Q: What happens to existing branches when switching modes?

**A:** Existing branches remain. New branches will use the appropriate naming convention.

### Q: Does testing mode affect Azure DevOps integration?

**A:** In testing mode, the agent still fetches tasks from Azure DevOps but doesn't update them.

### Q: Can I push branches manually while in testing mode?

**A:** Yes. Testing mode only prevents automatic pushes. Manual pushes work normally.

### Q: How do I know if testing mode is active?

**A:** Check the agent startup logs:
```
Harbor AI Agent Starting...
Testing Mode: ENABLED
Branches will NOT be pushed
PRs will NOT be created
Tickets will NOT be updated
```

---

**Status:** ✅ Ready for Implementation
**Related:** `workflows/dynamic-workflow.md`, `workflows/ai-workflow.md`
