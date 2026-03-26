# 🚨 CRITICAL: NEVER CREATE NEW SERVICE OR REPO - ABSOLUTE BLOCK

**Version:** 1.0.0
**Priority:** CRITICAL
**Status:** ABSOLUTE BLOCK - ZERO EXCEPTIONS

---

## 🔒 ABSOLUTE RULE: NEVER CREATE NEW SERVICE OR REPO

**🚨 THIS IS AN ABSOLUTE BLOCK - AGENT CANNOT CREATE NEW SERVICES**

**From USER REQUIREMENT:**
> "SEE AGAIN LIKE WHY HE CREATING A NEW SERVICE WE NOT CREATED NEW REPO YAR"

**The agent MUST:**
- ✅ ALWAYS use existing services
- ✅ READ ALL documentation from ALL services
- ✅ FIND which existing service can handle the task
- ✅ USE existing service

**The agent MUST NEVER:**
- ❌ Create new service
- ❌ Create new repository
- ❌ Run `git init` for new services
- ❌ Run `mkdir` for new services
- ❌ Assume new service is needed
- ❌ Decide without reading documentation

---

## 🚨 BLOCKING MECHANISM

### Phase 0.45: Service Selection - HARD BLOCK

**🚨 BEFORE AGENT CAN DECIDE TO CREATE NEW SERVICE, AGENT MUST:**

### Step 1: Read ALL Existing Service Documentation (MANDATORY)

```bash
# Discover ALL existing services
find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||'

# For EACH service, READ documentation:
for repo in $(find "$WORKSPACE_ROOT" -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "📖 READING: $repo/docs/ARCHITECTURE.md"
    cat "$repo/docs/ARCHITECTURE.md"

    echo "📖 READING: $repo/docs/SERVICE_RULES.md"
    cat "$repo/docs/SERVICE_RULES.md"

    echo "📖 READING: $repo/docs/STRUCTURE.md"
    cat "$repo/docs/STRUCTURE.md"
done
```

**🚨 VALIDATION CHECKLIST:**

Before making ANY decision, agent MUST:
- [ ] READ ARCHITECTURE.md from EVERY existing service
- [ ] READ SERVICE_RULES.md from EVERY existing service
- [ ] READ STRUCTURE.md from EVERY existing service
- [ ] UNDERSTAND what each service does
- [ ] UNDERSTAND service boundaries
- [ ] UNDERSTAND extension rules

**❌ IF NOT COMPLETE: CANNOT DECIDE - MUST READ FIRST**

### Step 2: Find Existing Service That Can Handle Task

**For EACH existing service, answer:**

```markdown
## Service Analysis for [TASK-NAME]

**Service 1: [SERVICE-NAME-1]**
- What does it do? (From ARCHITECTURE.md)
- What are its boundaries? (From SERVICE_RULES.md)
- Can it handle this task? (Check extension rules)
- Evidence from documentation: [QUOTE from SERVICE_RULES.md]

**Service 2: [SERVICE-NAME-2]**
- What does it do? (From ARCHITECTURE.md)
- What are its boundaries? (From SERVICE_RULES.md)
- Can it handle this task? (Check extension rules)
- Evidence from documentation: [QUOTE from SERVICE_RULES.md]

**[Continue for ALL services...]**
```

**🚨 MANDATORY OUTPUT:**

Agent MUST output this analysis BEFORE making any decision:

```markdown
## Service Selection Analysis - [TASK-NAME]

**Task:** [TASK-DESCRIPTION]

**Existing Services Analyzed:**
- [SERVICE-1]: [Capabilities from ARCHITECTURE.md]
- [SERVICE-2]: [Capabilities from ARCHITECTURE.md]
- [SERVICE-3]: [Capabilities from ARCHITECTURE.md]

**Documentation Review:**

**[SERVICE-1]/docs/SERVICE_RULES.md says:**
> [QUOTE showing what this service can handle]

**[SERVICE-2]/docs/SERVICE_RULES.md says:**
> [QUOTE showing what this service can handle]

**[SERVICE-3]/docs/SERVICE_RULES.md says:**
> [QUOTE showing what this service can handle]

**Decision:**
✅ **USE EXISTING: [SELECTED-SERVICE]**
  Reason: [QUOTE from SERVICE_RULES.md showing this service can handle it]

**New Service:** NONE (creating new service = FAIL)

**Repository to use:** [SELECTED-SERVICE-NAME]
**New Service to create:** NONE
```

**🚨 IF "New Service: CREATE-NEW-SERVICE-NAME" APPEARS, THIS IS A FAILURE!**

---

### Step 3: PROVE New Service is Needed (If Claiming No Existing Service Works)

**🚨 ONLY if agent wants to create new service, it MUST provide:**

```markdown
## PROOF THAT NEW SERVICE IS NEEDED

**Claim:** No existing service can handle [TASK-NAME]

**Evidence from ALL services:**

**[SERVICE-1]/docs/SERVICE_RULES.md:**
> "This service does NOT handle: [TASK-NAME]"
> "Cannot extend for: [TASK-NAME]"

**[SERVICE-2]/docs/SERVICE_RULES.md:**
> "This service does NOT handle: [TASK-NAME]"
> "Cannot extend for: [TASK-NAME]"

**[SERVICE-3]/docs/SERVICE_RULES.md:**
> "This service does NOT handle: [TASK-NAME]"
> "Cannot extend for: [TASK-NAME]"

**[Continue for ALL services...]**

**Conclusion:**
ALL existing services explicitly prohibit this task.
PROVEN by documentation that no existing service can handle it.
Therefore, new service is justified.

**New Service:** [NEW-SERVICE-NAME]
**Justification:** All [COUNT] existing services explicitly prohibit this task
**Evidence:** [Quotes from each service's SERVICE_RULES.md]
```

**🚨 WITHOUT THIS EVIDENCE, NEW SERVICE CREATION IS BLOCKED!**

---

## 🚨 HARD BLOCKING RULES

**The agent CANNOT create new service UNLESS:**

1. ✅ Read ARCHITECTURE.md from EVERY existing service
2. ✅ Read SERVICE_RULES.md from EVERY existing service
3. ✅ Read STRUCTURE.md from EVERY existing service
4. ✅ Output analysis showing what each service can handle
5. ✅ Quote from SERVICE_RULES.md for EACH service
6. ✅ Show that ALL services explicitly prohibit the task
7. ✅ Provide documentation evidence for the claim

**IF ANY OF ABOVE MISSING:**
```
❌ BLOCKED: Cannot create new service
Reason: Documentation analysis not complete
Action: Read ALL documentation first
```

---

## 🚫 FORBIDDEN ACTIONS

**The agent MUST NOT:**

```bash
# ❌ FORBIDDEN - Cannot create new service
mkdir ../[NEW-SERVICE-NAME]
git init ../[NEW-SERVICE-NAME]
cd ../[NEW-SERVICE-NAME]
npm init -y
# ANY command to create new service/repo
```

**If agent attempts any of these:**
```
🚨 CRITICAL ERROR: NEW SERVICE CREATION ATTEMPTED
Action: BLOCKED
Reason: Must use existing service
Recovery: Read documentation and find existing service
```

---

## ✅ CORRECT BEHAVIOR

**Task:** "Add blog module"

**Agent CORRECT behavior:**

```markdown
## Service Selection Analysis

**Task:** Add blog module

**Step 1: Reading ALL documentation**
- ✅ Read [SERVICE-1]/docs/ARCHITECTURE.md
- ✅ Read [SERVICE-1]/docs/SERVICE_RULES.md
- ✅ Read [SERVICE-2]/docs/ARCHITECTURE.md
- ✅ Read [SERVICE-2]/docs/SERVICE_RULES.md
- ✅ Read [SERVICE-3]/docs/ARCHITECTURE.md
- ✅ Read [SERVICE-3]/docs/SERVICE_RULES.md

**Step 2: Analysis**

**[SERVICE-1] (job-service):**
- ARCHITECTURE.md says: "Manages job lifecycle and job-related content"
- SERVICE_RULES.md says: "Can extend for: Job-related content (blog posts about jobs)"
- Can handle task: YES

**[SERVICE-2] (user-service):**
- SERVICE_RULES.md says: "NOT ALLOWED: Blog content (use job-service)"
- Can handle task: NO

**Step 3: Decision**
✅ **USE EXISTING: job-service**
  Reason: SERVICE_RULES.md explicitly allows "Job-related content (blog posts about jobs)"

**New Service:** NONE
**Repository:** job-service

**Step 4: Implementation**
Implementing blog module in job-service...
```

---

## ❌ WRONG BEHAVIOR

**Task:** "Add blog module"

**Agent WRONG behavior:**

```markdown
## Decision

✅ DECISION: CREATE NEW SERVICE

Service Name: harborBlogSvc

Justification:
1. ✅ Blogs module is content management (not user/job/notification/chat)
2. ✅ All existing services have clear boundaries excluding content management
3. ✅ PROVEN by documentation that no existing service can handle it

⏳ Creating harborBlogSvc...
```

**❌ THIS IS WRONG BECAUSE:**
- Agent didn't actually READ the documentation
- Agent made ASSUMPTIONS about service boundaries
- Agent didn't CHECK if job-service allows blog content
- Agent didn't PROVIDE quotes from SERVICE_RULES.md
- Agent created new service WITHOUT proof

---

## 🚨 ENFORCEMENT

### Automatic Blocking

**Before ANY new service creation, agent MUST:**

```bash
# Check if documentation was read
if [ ! -f "/tmp/documentation_reading_proof.md" ]; then
    echo "❌ ERROR: Cannot create new service"
    echo "   You must read ALL documentation first"
    echo "   Read SERVICE_RULES.md from ALL existing services"
    exit 1
fi

# Check if analysis was output
if ! grep -q "Service Selection Analysis" /tmp/agent_output.log; then
    echo "❌ ERROR: Cannot create new service"
    echo "   You must output service selection analysis"
    exit 1
fi

# Check if existing service was found
if grep -q "New Service: NONE" /tmp/agent_output.log; then
    echo "✅ Using existing service (correct)"
    exit 0
fi

# If claiming no existing service works, check for proof
if grep -q "New Service:" /tmp/agent_output.log; then
    if ! grep -q "PROOF THAT NEW SERVICE IS NEEDED" /tmp/agent_output.log; then
        echo "❌ ERROR: Cannot create new service"
        echo "   You must provide documentation proof"
        echo "   Quote from SERVICE_RULES.md for EACH service"
        exit 1
    fi
fi
```

---

## 📋 CHECKLIST

**Before creating new service, agent MUST:**

- [ ] Read ARCHITECTURE.md from EVERY existing service
- [ ] Read SERVICE_RULES.md from EVERY existing service
- [ ] Output service selection analysis
- [ ] Show what each service can handle
- [ ] Provide quotes from SERVICE_RULES.md
- [ ] Show that ALL services prohibit the task
- [ ] Provide documentation evidence
- [ ] Only THEN consider new service

**If ANY item missing:**
```
❌ BLOCKED: Cannot create new service
Complete checklist first
```

---

## 🎯 SUMMARY

**Rule:** NEVER CREATE NEW SERVICE OR REPO

**Agent MUST:**
- ✅ ALWAYS use existing services
- ✅ READ ALL documentation first
- ✅ FIND existing service that can handle task
- ✅ Provide documentation evidence

**Agent MUST NEVER:**
- ❌ Create new service without reading documentation
- ❌ Assume new service is needed
- ❌ Make decisions without evidence
- ❌ Create new repo

**Enforcement:**
- Hard block before new service creation
- Must read ALL documentation first
- Must provide documentation proof
- Must show all existing services prohibit task

**Without proof: BLOCKED**

---

**End of NEVER CREATE NEW SERVICE blocking rule**

**Status: 🔒 ABSOLUTE BLOCK - ZERO EXCEPTIONS**
**Enforcement:** MANDATORY
**Evidence Required:** YES
