# Harbor AI Agent - Verification Checklist

**Use this checklist to verify the fixes are working correctly.**

---

## Test 1: Startup Behavior Verification

### Step 1: Clear Agent Memory
```bash
# Clear any previous agent context
# Start a fresh session
```

### Step 2: Issue Startup Command
**Say exactly:** "start your work"

### Step 3: Verify Expected Behavior

**✅ SHOULD HAPPEN:**
- [ ] Agent immediately acknowledges command
- [ ] Agent fetches Azure DevOps tasks (or attempts to)
- [ ] Agent selects highest priority task
- [ ] Agent begins workflow without asking questions
- [ ] Agent provides status updates

**❌ SHOULD NOT HAPPEN:**
- [ ] Agent asks "What would you like me to start?"
- [ ] Agent asks "Should I fetch tasks or do something else?"
- [ ] Agent presents a menu of options
- [ ] Agent asks for permission to proceed
- [ ] Agent asks "What should I work on?"

**Result:** ✅ PASS / ❌ FAIL

---

## Test 2: Git Workflow Verification

### Step 1: Start a Task
Let the agent begin working on a task (either real or test)

### Step 2: Monitor Agent Actions

**✅ SHOULD HAPPEN (in order):**
- [ ] Agent creates feature branch from `dev`
- [ ] Branch name follows format: `feature/<ticket-id>-<description>`
- [ ] Agent navigates to service directory
- [ ] Agent implements code changes
- [ ] Agent runs tests
- [ ] Agent commits changes with proper message
- [ ] Agent pushes branch to remote
- [ ] Agent creates Pull Request
- [ ] Agent gets PR URL
- [ ] **ONLY THEN**: Agent closes Azure DevOps ticket

**❌ SHOULD NOT HAPPEN:**
- [ ] Agent closes ticket before creating branch
- [ ] Agent closes ticket before committing
- [ ] Agent closes ticket before pushing
- [ ] Agent closes ticket before creating PR
- [ ] Agent modifies files without creating branch first

**Result:** ✅ PASS / ❌ FAIL

---

## Test 3: Error Handling Verification

### Step 1: Simulate Git Failure
Create a scenario where Git workflow might fail (e.g., push fails)

### Step 2: Verify Agent Behavior

**✅ SHOULD HAPPEN:**
- [ ] Agent reports the error clearly
- [ ] Agent does NOT close the ticket
- [ ] Agent preserves ticket in current state
- [ ] Agent waits for further instructions

**❌ SHOULD NOT HAPPEN:**
- [ ] Agent closes ticket despite Git failure
- [ ] Agent proceeds as if nothing happened
- [ ] Agent ignores the error

**Result:** ✅ PASS / ❌ FAIL

---

## Test 4: Multiple Startup Commands

### Step 1: Test Various Trigger Phrases
Test each of these commands (in separate sessions):

**Commands to Test:**
- [ ] "start your work"
- [ ] "start harbor-ai"
- [ ] "harbor-ai start working"
- [ ] "begin work"
- [ ] "start working on tickets"
- [ ] "start working on tasks"

**Expected Behavior for All:**
- [ ] Agent immediately begins workflow
- [ ] Agent does NOT ask questions
- [ ] Agent fetches Azure DevOps tasks

**Result:** ✅ PASS / ❌ FAIL

---

## Quick Validation Commands

### Check Documentation Files
```bash
# Verify MEMORY.md was updated
grep -n "MANDATORY STARTUP TRIGGERS" ~/.claude/projects/-Users-mohitshah-Documents-HarborService-harbor-ai/memory/MEMORY.md

# Verify agent instructions were updated
grep -n "CRITICAL: Git Workflow Enforcement" /Users/mohitshah/Documents/HarborService/harbor-ai/agents/harbor-backend-agent.md

# Verify execution workflow was updated
grep -n "CRITICAL GATE: Git Workflow Completion" /Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md
```

**Expected Output:**
- All grep commands should return matching lines
- If any grep returns nothing, that file wasn't updated correctly

---

## Common Issues and Solutions

### Issue: Agent Still Asks Questions
**Possible Causes:**
1. Agent not reading updated MEMORY.md
2. Agent session has cached old behavior
3. Trigger phrase not recognized

**Solutions:**
- Clear agent memory and restart session
- Use exact trigger phrases from documentation
- Verify MEMORY.md was updated correctly

### Issue: Agent Skips Git Workflow
**Possible Causes:**
1. Agent not reading updated documentation
2. Documentation not loaded in correct order
3. Critical gate sections not being read

**Solutions:**
- Verify all documentation files are present
- Check agent is reading files in correct order
- Ensure agent reads execution.md before attempting to close tickets

### Issue: Agent Closes Tickets Without PR
**Possible Causes:**
1. Agent not enforcing critical gate
2. Agent reading old documentation version
3. Failure handling not working correctly

**Solutions:**
- Verify execution.md has critical gate section
- Check agent is reading pr.md before closing tickets
- Monitor agent's workflow progression

---

## Success Criteria

### All Tests Must Pass:
- [ ] Test 1: Startup Behavior ✅
- [ ] Test 2: Git Workflow ✅
- [ ] Test 3: Error Handling ✅
- [ ] Test 4: Multiple Commands ✅

### Overall Result: ✅ PASS / ❌ FAIL

---

## Next Steps After Verification

### If All Tests Pass:
✅ Agent is working correctly
✅ Fixes are successful
✅ Agent ready for production use

### If Any Tests Fail:
❌ Review failed test(s)
❌ Check specific issue in troubleshooting section
❌ Verify documentation files were updated correctly
❌ Re-read and re-apply fixes if needed

---

## Additional Notes

**Important:**
- These fixes are designed to be permanent
- Do not remove or weaken the enforcement language
- The agent relies on these instructions for proper behavior
- Regular monitoring is recommended to ensure compliance

**Questions or Issues:**
- Review HARBOR_AI_FIXES_SUMMARY.md for detailed information
- Check each modified file for specific changes
- Verify all documentation files are present and readable

---

**End of Verification Checklist**
