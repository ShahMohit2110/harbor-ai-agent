# Service Creation Decision Flow

**Version:** 1.0.0
**Last Updated:** 2026-03-24
**Purpose:** Prevent unnecessary microservice proliferation by enforcing strict decision-making rules

---

## 🚨 CRITICAL RULE

> **"Optimize within the system before expanding the system."**

**The agent must ALWAYS prioritize implementing tasks within existing repositories/services.**

---

## 🎯 Objective

Prevent automatic creation of new microservices when functionality can be implemented within existing services.

**Problem This Solves:**
- ❌ Agent creates unnecessary microservices
- ❌ Code duplication across services
- ❌ Increased system complexity
- ❌ Harder to maintain architecture

**Desired Outcome:**
- ✅ Code reuse and extension
- ✅ Cleaner architecture
- ✅ Controlled system growth
- ✅ Better maintainability

---

## ⚙️ MANDATORY Decision Flow

### Phase 1: Initial Analysis (Before Any Code Generation)

**Before creating ANY new service, the agent MUST:**

1. **Analyze all available repositories** in the workspace
2. **Understand existing services** and their responsibilities
3. **Review current architecture** and modules (use `docs` folder if available)
4. **Identify shared services** that could be extended

**Questions to Answer:**
- What services exist?
- What are their responsibilities?
- Where does this feature logically fit?
- Can existing services be extended?

---

### Phase 2: Feasibility Check (CRITICAL STEP)

**🚨 This step is MANDATORY and CANNOT be skipped.**

Before creating a new service, check if the requested feature/task can be implemented in:

1. **An existing service**
   - Can the feature be added as a new module/endpoint?
   - Can existing models be extended?
   - Can existing services be reused?

2. **An existing module**
   - Is there a module that handles similar functionality?
   - Can modules be refactored to accommodate new requirements?

3. **By extending current functionality**
   - Can we extend vs. create new?
   - Can we reuse vs. duplicate?

**Feasibility Check Matrix:**

| Scenario | Action |
|----------|--------|
| Feature fits existing service | ✅ Implement in existing service |
| Feature requires slight refactoring | ✅ Refactor existing service |
| Feature can use shared service | ✅ Use shared service |
| Feature has NO logical place | ⚠️ Consider new service (RARE) |

---

### Phase 3: Default Behavior (STRICT RULE)

**🚨 ALWAYS ASSUME:**

> **"This task should be implemented in an existing repository/service."**

**The agent MUST:**
- ✅ Modify existing code
- ✅ Extend current modules
- ✅ Reuse shared services/packages
- ✅ Refactor when necessary

**❌ NEVER:**
- ❌ Create a new repo/service by default
- ❌ Assume a microservice is needed
- ❌ Generate boilerplate without justification

---

### Phase 4: When New Service is Allowed (RARE CASE)

**The agent can create a new service ONLY IF ALL conditions are met:**

1. ✅ **Clear architectural boundary** exists
2. ✅ **Feature cannot logically fit** into any existing service
3. ✅ **Explicitly justified** with reasoning

**Justification Requirements:**

When creating a new service, the agent MUST provide:

1. **Why existing services cannot be used**
   - Explain architectural boundaries
   - Explain why extension is not appropriate
   - Explain why refactoring is not feasible

2. **Why a new service is required**
   - Clear separation of concerns
   - Distinct business domain
   - Independent scaling requirements
   - Different data ownership

**Justification Template:**

```markdown
## Service Creation Justification

### Proposed Service: [Service Name]

### Why Existing Services Cannot Be Used:
- [Service A]: Cannot handle because [specific reason]
- [Service B]: Architectural boundary because [specific reason]
- [Service C]: Refactoring not feasible because [specific reason]

### Why New Service is Required:
- **Separation of Concerns**: [explanation]
- **Business Domain**: [explanation]
- **Scaling Requirements**: [explanation]
- **Data Ownership**: [explanation]

### Architectural Impact:
- **Dependencies**: [list]
- **Communication**: [API/event pattern]
- **Deployment**: [strategy]
```

---

### Phase 5: Strict Prohibition

**🚨 The following behaviors are STRICTLY PROHIBITED:**

1. ❌ **Do NOT create a new repo/service by default**
   - Default assumption: existing service

2. ❌ **Do NOT assume a microservice is needed**
   - Microservices are rare, not common

3. ❌ **Do NOT generate boilerplate for new services without justification**
   - Every new service needs explicit justification

4. ❌ **Do NOT duplicate functionality**
   - Reuse > Create

5. ❌ **Do NOT create services for "future" requirements**
   - YAGNI (You Aren't Gonna Need It)

---

## 🧠 Agent Mindset Rules

### Rule 1: Optimization First
> **"Optimize within the system before expanding the system."**

### Rule 2: Extension Over Creation
> **"Extend existing functionality before creating new services."**

### Rule 3: Reuse Over Duplication
> **"Reuse shared services before duplicating logic."**

### Rule 4: Integration Over Isolation
> **"Integrate with existing services before isolating functionality."**

---

## 📊 Decision Tree

```
┌─────────────────────────────┐
│  Receive Task              │
└───────────┬─────────────────┘
            │
            ▼
┌─────────────────────────────┐
│  Analyze Existing Services  │
│  - Review all repositories  │
│  - Check /docs folders      │
│  - Map responsibilities     │
└───────────┬─────────────────┘
            │
            ▼
┌─────────────────────────────┐
│  Feasibility Check          │
│  Can this fit in existing?  │
└───────────┬─────────────────┘
            │
     ┌──────┴──────┐
     │             │
    YES           NO
     │             │
     ▼             ▼
┌──────────┐  ┌────────────┐
│ Extend   │  │ Justify    │
│ Existing │  │ New        │
│ Service  │  │ Service    │
└──────────┘  └─────┬──────┘
                   │
                   ▼
            ┌────────────┐
            │ Clear      │
            │ Boundary?  │
            └─────┬──────┘
                  │
           ┌──────┴──────┐
           │             │
          YES           NO
           │             │
           ▼             ▼
    ┌──────────┐  ┌──────────┐
    │ Create   │  │ Reuse    │
    │ New      │  │ Existing │
    │ Service  │  │ Service  │
    └──────────┘  └──────────┘
```

---

## ✅ Expected Behavior

### Prefer:
1. **Code modification** over code creation
2. **Extension** over duplication
3. **Integration** over isolation
4. **Refactoring** over new services

### Examples:

#### ❌ BAD: Automatic Service Creation
```
Task: "Add user notifications"
Agent: Creates "harborNotificationSvc" ❌
```

#### ✅ GOOD: Extend Existing Service
```
Task: "Add user notifications"
Agent: Adds notification module to harborUserSvc ✅
```

#### ❌ BAD: Unnecessary Microservice
```
Task: "Add email sending"
Agent: Creates "harborEmailSvc" ❌
```

#### ✅ GOOD: Use Shared Service
```
Task: "Add email sending"
Agent: Uses harborSharedSvc email module ✅
```

---

## 🔍 Integration with Agent Workflow

**This decision flow MUST be integrated into:**

1. **Phase 1: Task Analysis**
   - Analyze existing services before planning

2. **Phase 2: Planning**
   - Always consider existing services first
   - Require justification for new services

3. **Phase 3: Implementation**
   - Extend existing services when possible
   - Create new services only when justified

---

## 📝 Validation Checklist

Before creating a new service, verify:

- [ ] Analyzed ALL existing services
- [ ] Reviewed ALL /docs folders
- [ ] Checked for shared services
- [ ] Considered extension vs. creation
- [ ] Considered refactoring vs. new service
- [ ] Provided explicit justification (if creating new)
- [ ] Documented architectural impact (if creating new)

---

## 🚨 Error Prevention

**Common Mistakes:**
1. ❌ Creating a service because "it's separate" (not a good reason)
2. ❌ Creating a service because "it's cleaner" (use refactoring)
3. ❌ Creating a service for "future flexibility" (YAGNI)
4. ❌ Creating a service without checking existing ones

**Correct Approach:**
1. ✅ Check existing services first
2. ✅ Extend when possible
3. ✅ Refactor when needed
4. ✅ Create new service only when architecturally justified

---

## 🎯 Success Metrics

**Good Signs:**
- ✅ Most features added to existing services
- ✅ High code reuse
- ✅ Clear service boundaries
- ✅ Minimal new services

**Warning Signs:**
- ⚠️ Many new services created
- ⚠️ Duplicate functionality
- ⚠️ Unclear boundaries
- ⚠️ Rapid service proliferation

---

**Remember:** **"Optimize within the system before expanding the system."**
