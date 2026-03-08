# 🚨 CRITICAL WORKFLOW REMINDER

**Read this BEFORE stopping at any point in the workflow.**

---

## 🚨 NEVER STOP AFTER IMPLEMENTATION

**If you just finished writing code, YOU ARE NOT DONE.**

**The workflow has 7 phases:**
1. Task Intake ✅
2. System Understanding ✅
3. Planning ✅
4. Execution ← **YOU ARE HERE**
5. Testing ← **NEXT**
6. Pull Request ← **THEN THIS**
7. Ticket Closure ← **FINALLY HERE**

**You must complete ALL 7 phases autonomously.**

---

## 🚨 PROHIBITED COMPLETION MESSAGES

**After implementation, you MUST NEVER say:**
- ❌ "Development done" (and stop)
- ❌ "Implementation completed" (and stop)
- ❌ "Ready for testing" (and stop)
- ❌ "Ready for deployment" (and stop)
- ❌ "The feature is fully implemented" (and stop)
- ❌ Any variation that implies completion and stops execution

**INSTEAD: Immediately continue to testing.md workflow.**

---

## ✅ CORRECT POST-IMPLEMENTATION BEHAVIOR

**After you finish writing code:**

1. **Verify the build succeeds**
   ```bash
   npm run build
   # Must exit with code 0
   ```

2. **IMMEDIATELY continue to testing**
   - Read: `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/testing.md`
   - Execute ALL testing phases
   - DO NOT stop or ask for permission

3. **After tests pass, create PR**
   - Read: `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/pr.md`
   - Create feature branch from `dev`
   - Commit and push changes
   - Create Pull Request targeting `dev`

4. **After PR created, close ticket**
   - Add PR link to Azure DevOps ticket
   - Update ticket status to "Closed"

5. **ONLY THEN report completion**

---

## 🚨 CHECKPOINT VERIFICATION

**Before stopping, ask yourself:**

- [ ] Did I complete ALL 7 workflow phases?
- [ ] Did I run tests and verify they pass?
- [ ] Did I create a Pull Request?
- [ ] Did I update the Azure DevOps ticket?
- [ ] Is the ticket status "Closed"?

**If ANY checkbox is unchecked, YOU ARE NOT DONE. Continue the workflow.**

---

## 🚨 THIS IS AN AUTONOMOUS PIPELINE

**The Harbor AI agent is NOT a code completion assistant.**

**It is a COMPLETE development automation system that:**
- Fetches tasks from Azure DevOps
- Plans implementation approach
- Writes code
- **Runs tests**
- **Creates Pull Requests**
- **Closes tickets**

**You do NOT stop until the ENTIRE lifecycle is complete.**

---

## 🚨 WHEN TO STOP

**ONLY stop if:**
- Build fails (and you cannot fix it)
- Tests fail (and you cannot fix them)
- Requirements are incomplete (and you need clarification)

**DO NOT stop if:**
- Implementation is complete (continue to testing)
- Tests pass (continue to PR creation)
- PR is created (continue to ticket closure)

---

**Remember: The user wants COMPLETE task automation, not partial implementation.**

**Finish what you started.**
