# Service Selection Logic (Documentation-Driven)

**Version:** 2.0.0
**Purpose:** Agent decides which repo to use based on DOCUMENTATION (no hardcoding)

---

## 🚨 PROBLEM: Agent Creates New Service When It Should Use Existing

**Current Issue:**
```
Task: "Create blog module"
Agent: "I'll create new blog-service" ← WRONG! ❌
```

**Root Cause:**
Agent doesn't **READ** existing repo documentation to understand what they do.

---

## ✅ SOLUTION: NEVER Create New Service (Unless Proven Necessary)

**🔒 DEFAULT BEHAVIOR: ALWAYS USE EXISTING SERVICE**

**Agent MUST:**

1. **READ** ARCHITECTURE.md from EACH existing repo ✅
2. **READ** SERVICE_RULES.md from EACH existing repo ✅
3. **FIND** which existing service can handle the task ✅
4. **USE** that existing service ✅
5. **NEVER** create new service WITHOUT proof from docs 🚫

**🚨 CRITICAL: The default is ALWAYS to use an existing service!**
**New service creation is ONLY allowed if documentation explicitly proves it's necessary!**

---

## 📋 Step-by-Step Service Selection

### Phase: Service Selection Analysis

**🚨 CRITICAL: This happens BEFORE any implementation**

---

#### Step 1: Discover All Existing Repos (DYNAMIC)

```bash
# Find all repos in workspace dynamically
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

find "$WORKSPACE_ROOT" -maxdepth 2 -name ".git" -type d
```

**Expected repos (examples - actual list discovered dynamically):**
```
[Discovered via find command - could be any repos]
```

**🚨 If you find existing repos, YOU MUST USE ONE OF THEM!**

---

#### Step 2: Discover and Read Documentation from All Repos (DYNAMIC)

**🎯 Discover repos dynamically, then read documentation:**

```bash
# Step 2a: Find all repos dynamically (no hardcoding!)
WORKSPACE_ROOT=$(pwd)
while [ "$WORKSPACE_ROOT" != "/" ] && [ ! -d "$WORKSPACE_ROOT/.git" ]; do
  WORKSPACE_ROOT=$(dirname "$WORKSPACE_ROOT")
done

# Discover all repos (find .git directories)
REPOS=$(find "$WORKSPACE_ROOT" -maxdepth 2 -name ".git" -type d -exec dirname {} \;)

echo "🔍 Discovered repos:"
echo "$REPOS"

# Step 2b: For EACH discovered repo, read documentation
for repo in $REPOS; do
  echo "📖 READING: $repo/docs/ARCHITECTURE.md"
  if [ -f "$repo/docs/ARCHITECTURE.md" ]; then
    cat "$repo/docs/ARCHITECTURE.md"
  else
    echo "⚠️ No ARCHITECTURE.md found in $repo"
  fi

  echo "📖 READING: $repo/docs/SERVICE_RULES.md"
  if [ -f "$repo/docs/SERVICE_RULES.md" ]; then
    cat "$repo/docs/SERVICE_RULES.md"
  else
    echo "⚠️ No SERVICE_RULES.md found in $repo"
  fi

  echo "📖 READING: $repo/docs/STRUCTURE.md"
  if [ -f "$repo/docs/STRUCTURE.md" ]; then
    cat "$repo/docs/STRUCTURE.md"
  else
    echo "⚠️ No STRUCTURE.md found in $repo"
  fi
done
```

**✅ Result: All repos discovered dynamically, documentation read without hardcoding!**

---

#### Step 3: Extract Service Capabilities

**From documentation, extract:**

**What features does this service handle?**

```markdown
## Service Capability Matrix (Example format - actual services discovered dynamically)

**[SERVICE-NAME-1]:**
- Features: [From ARCHITECTURE.md]
- Domain: [From ARCHITECTURE.md]
- Bounds: [From SERVICE_RULES.md]

**[SERVICE-NAME-2]:**
- Features: [From ARCHITECTURE.md]
- Domain: [From ARCHITECTURE.md]
- Bounds: [From SERVICE_RULES.md]

**[Continue for all discovered services...]**
```

---

#### Step 4: Match Task to Existing Service

**Question:** Which existing service should handle this feature?

**Decision Process:**

```
Task: "[Example task - replace with actual]"

Step 1: Analyze task requirements
- [Extract requirements from task description]

Step 2: Check existing services (discovered dynamically)
- [SERVICE-1]: [Features from ARCHITECTURE.md]
- [SERVICE-2]: [Features from ARCHITECTURE.md]
- [SERVICE-3]: [Features from ARCHITECTURE.md]
- [Continue for all discovered services...]

Step 3: Find BEST match
- Check which service can handle the requirements
- Check SERVICE_RULES.md for each service

Step 4: Check SERVICE_RULES.md for each service
- Read [SERVICE-1]/docs/SERVICE_RULES.md
  - [Extract rules and constraints]
- Read [SERVICE-2]/docs/SERVICE_RULES.md
  - [Extract rules and constraints]

Step 5: Make decision based on DOCUMENTATION ONLY
- Option A: Use [SERVICE-X] (if allowed by SERVICE_RULES.md)
- Option B: Consider new service (only if all existing services prohibit it)

Step 6: Check ARCHITECTURE.md for guidance
- Read ARCHITECTURE.md from relevant services
- Look for: Service boundaries, domain separation
- Follow documentation guidance

Step 7: Final Decision
- Based on DOCUMENTATION only
- NO assumptions
- DOCUMENTATION decides
```

---

#### Step 5: Decision Output

**Agent MUST output:**

```markdown
## Service Selection Analysis

**Task:** Create blog module

**Existing Services Analyzed:**

| Service | Features | Can Handle Task? | Reason |
|---------|----------|------------------|---------|
| [SERVICE-1] | [From ARCHITECTURE.md] | [YES/NO/MAYBE] | [From SERVICE_RULES.md] |
| [SERVICE-2] | [From ARCHITECTURE.md] | [YES/NO/MAYBE] | [From SERVICE_RULES.md] |
| [SERVICE-3] | [From ARCHITECTURE.md] | [YES/NO/MAYBE] | [From SERVICE_RULES.md] |

**Documentation Review:**

**[SELECTED-SERVICE]/docs/SERVICE_RULES.md says:**
- [Quote relevant rules that allow this feature]

**[SELECTED-SERVICE]/docs/ARCHITECTURE.md says:**
- [Quote relevant architecture guidance]

**Decision:**
✅ **USE EXISTING: [SELECTED-SERVICE]**

**Reasoning:**
- [Quote from SERVICE_RULES.md showing this is allowed]
- [Quote from ARCHITECTURE.md showing this fits]
- NO need for new service

**Repository to use:** [SELECTED-SERVICE]
**Repository path:** [FULL PATH FROM DISCOVERY]
**New service to create:** NONE
```

---

## 🚨 BLOCKING CHECK: Must Output Before Proceeding

**🔒 AGENT CANNOT PROCEED TO IMPLEMENTATION WITHOUT:**

1. ✅ **Reading ARCHITECTURE.md** from ALL existing repos
2. ✅ **Reading SERVICE_RULES.md** from ALL existing repos
3. ✅ **Outputting the analysis table** (shown above)
4. ✅ **Showing documentation evidence** for the decision
5. ✅ **Selecting an EXISTING service** (not creating new)

**⚠️ IF THE AGENT DOES NOT OUTPUT THE ANALYSIS ABOVE, IT HAS FAILED!**

**Implementation is BLOCKED until:**
```markdown
## ✅ SERVICE SELECTION COMPLETE

**Discovered Repos:** [DYNAMIC LIST - output from find command]
**Total Repos Found:** [COUNT]

**Documentation Read:**
- [x] [REPO-1-NAME]/docs/ARCHITECTURE.md
- [x] [REPO-1-NAME]/docs/SERVICE_RULES.md
- [x] [REPO-2-NAME]/docs/ARCHITECTURE.md
- [x] [REPO-2-NAME]/docs/SERVICE_RULES.md
- [x] [... continue for ALL discovered repos ...]

**Selected Service:** [EXISTING SERVICE NAME]
**Repository Path:** [FULL PATH TO SELECTED REPO]
**New Service:** NONE (creating new service = FAIL)
**Reason:** [DOCUMENTATION EVIDENCE QUOTED]

🟢 **PROCEEDING TO IMPLEMENTATION IN: [EXISTING SERVICE]**
```

**🚨 IF "New Service: CREATE-NEW-SERVICE-NAME" APPEARS, THIS IS A FAILURE!**

---

## 🚨 FINAL RULE: DEFAULT TO EXISTING

**The default decision is ALWAYS:**
- ✅ Use existing service
- ❌ Do NOT create new service

**New service is ONLY allowed if:**
- Documentation explicitly says so
- OR all existing services explicitly prohibit the feature in their SERVICE_RULES.md
- AND you quote the exact documentation proving this

**Without explicit documentation proof, you MUST use an existing service!**

---

## 🚫 ANTI-PATTERN: Wrong Decision

**❌ WRONG:**
```markdown
Task: "Create blog module"

Agent (BAD):
- Doesn't read existing service documentation
- Assumes: "Blog needs new service"
- Creates: blog-service (WRONG!)

Result: Service fragmentation, unnecessary complexity
```

**✅ CORRECT:**
```markdown
Task: "Create blog module"

Agent (GOOD):
- READS all existing service documentation
- UNDERSTANDS what each service does
- FINDS job-service can handle blog content
- USES existing job-service

Result: Reuses existing service, maintains simplicity
```

---

## 🔍 How Agent Reads Documentation

### For Each Service:

```javascript
// READ service capabilities from documentation
function analyzeService(serviceName) {
  const architecture = readDocumentation(serviceName, 'ARCHITECTURE.md');
  const serviceRules = readDocumentation(serviceName, 'SERVICE_RULES.md');
  const structure = readDocumentation(serviceName, 'STRUCTURE.md');

  // EXTRACT: What does this service do?
  const capabilities = {
    features: extractFeatures(architecture),
    domain: extractDomain(architecture),
    bounds: extractBounds(serviceRules),
    canExtend: extractExtensionRules(serviceRules)
  };

  return capabilities;
}

// Example: job-service
const jobService = analyzeService('job-service');
// Returns:
{
  features: ['Job creation', 'Job management', 'Job applications'],
  domain: 'Job data',
  bounds: 'Manages job lifecycle',
  canExtend: ['Job-related content', 'Job postings']
}
```

---

### Match Task to Service:

```javascript
// DECIDE which service to use
function selectService(task, allServices) {
  // Analyze task
  const taskDomain = analyzeTaskDomain(task);
  const taskRequirements = extractRequirements(task);

  // Check each service
  for (const service of allServices) {
    const capabilities = analyzeService(service);

    // Can this service handle the task?
    if (canServiceHandleTask(capabilities, taskDomain)) {
      // Check SERVICE_RULES.md
      const serviceRules = readDocumentation(service, 'SERVICE_RULES.md');

      // Does service allow this feature?
      if (serviceRules.allowsExtension(taskRequirements)) {
        return {
          decision: 'USE_EXISTING',
          service: service,
          reason: serviceRules.getReason()
        };
      }
    }
  }

  // If no service can handle it
  return {
    decision: 'CREATE_NEW',
    reason: 'No existing service can handle this feature'
  };
}
```

---

## 📊 Documentation-Driven Decision Tree

**Agent follows this tree (based on DOCUMENTATION):**

```
START: Task received
  ↓
READ all repos' ARCHITECTURE.md
  ↓
READ all repos' SERVICE_RULES.md
  ↓
UNDERSTAND each service's capabilities
  ↓
QUESTION: Can any existing service handle this?
  ↓
  YES → Check SERVICE_RULES.md
    ↓
    Allows extension? → YES → USE EXISTING SERVICE
    ↓
    Allows extension? → NO → Check other services
  ↓
  NO → Check other services
  ↓
QUESTION: Did we find a service?
  ↓
  YES → USE IT
  ↓
  NO → Only THEN create new service
  ↓
OUTPUT: Decision with reasoning from documentation
```

---

## 📝 Required Documentation for Service Selection

**For EACH service, docs/MUST contain:**

### ARCHITECTURE.md
```markdown
# Service Architecture

## Purpose
What this service does

## Domain
What data/domain this service manages

## Capabilities
What features this service provides

## Extension Points
What features can be added to this service
```

### SERVICE_RULES.md
```markdown
# Service Rules

## What This Service Handles
- Feature 1
- Feature 2

## What This Service Does NOT Handle
- Not Feature X
- Not Feature Y

## Extension Rules
CAN extend: [related features]
CANNOT extend: [unrelated features]
```

---

## 🎯 Example: Blog Module Decision

### Documentation Analysis:

**job-service/docs/ARCHITECTURE.md:**
```markdown
# Job Service Architecture

## Purpose
Manages job lifecycle and job-related content

## Domain
Job data, job postings, job applications

## Capabilities
- Job creation
- Job management
- Job applications

## Extension Points
Can extend for:
- Job-related content (blog posts about jobs)
- Job postings
- Career content
```

**job-service/docs/SERVICE_RULES.md:**
```markdown
# Job Service Rules

## What This Service Handles
- Job CRUD operations
- Job applications
- Job-related content

## Extension Rules
✅ ALLOWED:
- Blog posts about jobs
- Career advice content
- Job listings

❌ NOT ALLOWED:
- User management
- Notifications (use notification-service)
```

**user-service/docs/SERVICE_RULES.md:**
```markdown
# User Service Rules

## What This Service Handles
- User accounts
- User profiles
- Authentication

## Extension Rules
❌ NOT ALLOWED:
- Blog content (use job-service or content-service)
- Job management (use job-service)
```

### Agent Decision Process:

```
Task: "Create blog module"

Step 1: Analyze task
- Domain: Blog content
- Type: Content management

Step 2: Check services
- user-service: SERVICE_RULES says "NOT ALLOWED: Blog content"
- job-service: SERVICE_RULES says "ALLOWED: Blog posts about jobs"
- notification-service: Not relevant

Step 3: Decision
✅ USE: job-service
❌ DON'T CREATE: blog-service

Reason: job-service documentation explicitly allows blog content
```

---

## ✅ Verification

**Before creating ANY new service, agent MUST:**

1. ✅ Read ALL existing service documentation
2. ✅ Understand ALL service capabilities
3. ✅ Check if ANY service can handle the feature
4. ✅ Only create new service if PROVEN (from docs) that it's needed
5. ✅ Output decision with documentation-based reasoning

**🚨 CRITICAL RULE:**

> **"DOCUMENTATION DECIDES - NOT ASSUMPTIONS"**

---

## 🚨 Implementation in Agent

```javascript
// In Phase 0.5 (Intelligence Analysis)
async function selectServiceForTask(task) {
  console.log('\n🔍 Service Selection Analysis');

  // Step 1: Discover all services
  const services = discoverAllServices();

  // Step 2: Read all documentation
  const serviceCapabilities = {};
  for (const service of services) {
    const arch = readDocumentation(service, 'ARCHITECTURE.md');
    const rules = readDocumentation(service, 'SERVICE_RULES.md');

    serviceCapabilities[service] = {
      domain: extractDomain(arch),
      features: extractFeatures(arch),
      allowsExtension: extractExtensionRules(rules),
      prohibits: extractProhibitedRules(rules)
    };
  }

  // Step 3: Analyze task
  const taskDomain = analyzeTaskDomain(task);
  const taskType = analyzeTaskType(task);

  // Step 4: Find matching service
  for (const [service, capabilities] of Object.entries(serviceCapabilities)) {
    // Check if service can handle this task
    if (capabilities.domain.includes(taskDomain) ||
        capabilities.allowsExtension.includes(taskType)) {

      // Check if service prohibits this task
      if (!capabilities.prohibits.includes(taskType)) {
        return {
          decision: 'USE_EXISTING',
          service: service,
          reasoning: `Service ${service} allows ${taskType} based on SERVICE_RULES.md`
        };
      }
    }
  }

  // If no service found
  return {
    decision: 'CREATE_NEW',
    reasoning: 'No existing service can handle this feature based on documentation review'
  };
}
```

---

## 📋 Service Selection Checklist

**Agent MUST complete this checklist before deciding:**

```markdown
## Service Selection Checklist

**Task:** {task description}

### Documentation Review
- [ ] Read ARCHITECTURE.md for ALL existing services
- [ ] Read SERVICE_RULES.md for ALL existing services
- [ ] Understood capabilities of ALL services
- [ ] Understood extension rules of ALL services

### Task Analysis
- [ ] Analyzed task domain
- [ ] Analyzed task requirements
- [ ] Identified task type

### Matching
- [ ] Checked if any service can handle this task
- [ ] Checked service extension rules
- [ ] Verified service doesn't prohibit this task

### Decision
- [ ] Decision based on DOCUMENTATION (not assumptions)
- [ ] Decision has reasoning from docs
- [ ] Decision output in structured format

**Decision:**
- [ ] USE_EXISTING: {service name}
  OR
- [ ] CREATE_NEW: {service name} (only if PROVEN necessary)
```

---

**End of Service Selection Logic**

**Key Principle:** DOCUMENTATION DECIDES - NOT ASSUMPTIONS
