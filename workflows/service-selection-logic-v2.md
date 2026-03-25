# Service Selection Logic (Documentation-Driven)

**Version:** 2.0.0
**Purpose:** Agent decides which repo to use based on DOCUMENTATION (no hardcoding)

---

## 🚨 PROBLEM: Agent Creates New Service When It Should Use Existing

**Current Issue:**
```
Task: "Create blog module"
Agent: "I'll create new blog-service" ← WRONG!
```

**Root Cause:**
Agent doesn't **READ** existing repo documentation to understand what they do.

---

## ✅ SOLUTION: Documentation-Driven Service Selection

**Agent MUST:**

1. **READ** ARCHITECTURE.md from EACH existing repo
2. **UNDERSTAND** what features each repo handles
3. **DECIDE** based on documentation whether to use existing or create new
4. **NEVER** create new service WITHOUT proof from docs that it's needed

---

## 📋 Step-by-Step Service Selection

### Phase: Service Selection Analysis

**🚨 CRITICAL: This happens BEFORE any implementation**

---

#### Step 1: Discover All Existing Repos

```bash
# Find all repos in workspace
find /Users/mohitshah/Documents/HarborService -maxdepth 2 -name ".git" -type d
```

**Result:**
```
- shared-models
- database-sync
- user-service
- job-service
- notification-service
- socket-service
- api-gateway
- website
```

---

#### Step 2: Read Each Repo's Documentation

**For EACH repo, READ these files:**

```bash
# For each repo
for repo in user-service job-service notification-service; do
  echo "📖 READING: $repo/docs/ARCHITECTURE.md"
  cat "$repo/docs/ARCHITECTURE.md"

  echo "📖 READING: $repo/docs/SERVICE_RULES.md"
  cat "$repo/docs/SERVICE_RULES.md"

  echo "📖 READING: $repo/docs/STRUCTURE.md"
  cat "$repo/docs/STRUCTURE.md"
done
```

---

#### Step 3: Extract Service Capabilities

**From documentation, extract:**

**What features does this service handle?**

```markdown
## Service Capability Matrix

**user-service:**
- Features: User management, user profiles, authentication
- Domain: User data
- Bounds: Manages user accounts only

**job-service:**
- Features: Job creation, job management, job applications
- Domain: Job data
- Bounds: Manages job lifecycle

**notification-service:**
- Features: Email notifications, SMS notifications, push notifications
- Domain: Notifications
- Bounds: Manages notification delivery

**socket-service:**
- Features: WebSocket connections, real-time messaging
- Domain: Real-time communication
- Bounds: Manages WebSocket connections
```

---

#### Step 4: Match Task to Existing Service

**Question:** Which existing service should handle this feature?

**Decision Process:**

```
Task: "Create blog module"

Step 1: Analyze task requirements
- Blog module = content management, blog posts
- Domain: Content/Blog data
- CRUD operations needed

Step 2: Check existing services
- user-service: Handles users (NOT blog content)
- job-service: Handles jobs (NOT blog content)
- notification-service: Handles notifications (NOT blog content)
- socket-service: Handles WebSocket (NOT blog content)

Step 3: Find BEST match
- None of the existing services handle blog content
- Question: Can blog fit into any existing service?

Step 4: Check SERVICE_RULES.md for each service
- Read user-service/docs/SERVICE_RULES.md
  - "Manages user data only"
  - "Should not handle unrelated features"
- Read job-service/docs/SERVICE_RULES.md
  - "Manages job lifecycle"
  - "Can be extended for related features"
  - "Blog could be considered job-related content"

Step 5: Make decision
- Option A: Add blog to job-service (blog = content about jobs)
- Option B: Create new blog-service (separate concern)

Step 6: Check ARCHITECTURE.md for guidance
- Read /ARCHITECTURE.md or shared docs
- Look for: "Service boundaries", "Domain separation"
- If docs say: "Keep job and content separate" → Create new service
- If docs say: "Related features can be grouped" → Use job-service

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

| Service | Features | Can Handle Blog? | Reason |
|---------|----------|------------------|---------|
| user-service | User management | NO | Different domain |
| job-service | Job management | MAYBE | Blog could be job-related content |
| notification-service | Notifications | NO | Different domain |
| socket-service | WebSocket | NO | Infrastructure service |

**Documentation Review:**

**job-service/docs/SERVICE_RULES.md says:**
- "Manages job lifecycle and job-related content"
- "Can be extended for features related to jobs"

**ARCHITECTURE.md says:**
- "Group related features in same service"
- "Avoid service fragmentation"

**Decision:**
✅ **USE EXISTING: job-service**

**Reasoning:**
- Blog content is related to jobs (job postings, blog about jobs)
- job-service SERVICE_RULES allows extensions for related features
- ARCHITECTURE recommends grouping related features
- NO need for new service

**Repository to use:** job-service
**New service to create:** NONE
```

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
