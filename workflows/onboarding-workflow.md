# Harbor Agent Onboarding Workflow

**Purpose:** Guide the agent through onboarding tickets (type="onboard")

**Version:** 1.0.0  
**Date:** 2026-04-05

---

## 🎯 What is an Onboarding Ticket?

An **onboarding ticket** is automatically created when a new Project is added. Its purpose is to:

1. **NOT** perform full repository analysis (like regular tickets)
2. **NOT** scan all repositories
3. **ONLY** create documentation structure for the target project
4. Prepare the project for future development tickets

---

## 🔍 Detecting Onboarding Tickets

**Check ticket type before processing:**

```javascript
// When agent picks a ticket
const ticketType = ticket.type || "task"  // default is "task"

if (ticketType === "onboard") {
  // → Use ONBOARDING WORKFLOW
} else {
  // → Use REGULAR WORKFLOW (unchanged)
}
```

---

## 📋 Onboarding Workflow Steps

### Step 1: Get Project Details

From the onboarding ticket, extract:
```json
{
  "id": "TKT-Onboard-XXX",
  "type": "onboard",
  "projectId": "PRJ-XXX",
  "title": "Onboarding: Project Name",
  "description": "Repository: /path/to/repo"
}
```

**API Call:**
```bash
curl -s http://localhost:3001/api/projects/{projectId} | python3 -c "import sys,json; d=json.load(sys.stdin)['data']; print(d['repoPath'])"
```

### Step 2: Create Documentation Folder Structure

**Navigate to the repository:**
```bash
cd {repoPath}/docs
```

**Create the following files (if they don't exist):**

1. **ARCHITECTURE.md** - Service overview and relationships
2. **STRUCTURE.md** - Folder structure and layer responsibilities  
3. **DEPENDENCIES.md** - External and internal dependencies
4. **SERVICE_RULES.md** - DOs and DON'Ts for the service
5. **SHARED_SERVICES.md** - Shared service inventory
6. **CHANGE_IMPACT.md** - Impact analysis guidelines
7. **DEVELOPMENT_RULES.md** - Coding standards
8. **GIT_RULES.md** - Git workflow rules
9. **API_PATTERNS.md** - Request/response patterns
10. **AUTH.md** - Authentication/authorization (if applicable)
11. **DATABASE.md** - DB schema, ORM, relationships (if applicable)
12. **MODEL_FLOW.md** - Data flow through the system

### Step 3: Fill Base Templates

Each file should contain:

**ARCHITECTURE.md Template:**
```markdown
# Architecture Documentation

## Service Overview
- **Service Name:** {projectName}
- **Purpose:** {description from project}
- **Type:** Microservice / Library / Frontend / Backend

## System Architecture
<!-- Add architecture diagram or description -->

## Dependencies
<!-- List key dependencies -->

## Data Flow
<!-- Describe how data flows through the system -->
```

**STRUCTURE.md Template:**
```markdown
# Project Structure

## Folder Organization
```
{repoPath}/
├── docs/           # Documentation
├── src/            # Source code
├── tests/          # Test files
└── package.json    # Dependencies
```

## Layer Responsibilities
<!-- Describe each layer's purpose -->
```

**...and so on for each file**

### Step 4: Update Progress

**Update progress through stages:**

```bash
# 10% - Documentation folder created
harbor-ticket-update "{ticketId}" 10 "Analysis" "Created docs/ folder structure"

# 25% - Templates filled
harbor-ticket-update "{ticketId}" 25 "Planning" "Base documentation templates created"

# 50% - Ready for development
harbor-ticket-update "{ticketId}" 50 "Development" "Project ready for development tickets"
```

### Step 5: Mark Project Onboarding Complete

```bash
curl -X POST http://localhost:3001/api/projects/{projectId}/complete
```

### Step 6: Complete Onboarding Ticket

```bash
harbor-ticket-complete "{ticketId}" "Project onboarding completed successfully"
```

---

## 🚫 DO NOT Do in Onboarding

- ❌ Do NOT perform full repository scan
- ❌ Do NOT read documentation from other repositories
- ❌ Do NOT create any implementation code
- ❌ Do NOT modify existing code
- ❌ Do NOT make any architectural decisions

---

## ✅ DO in Onboarding

- ✅ Create docs/ folder structure
- ✅ Fill in base template documentation
- ✅ Update ticket progress appropriately
- ✅ Mark project onboarding as complete when done
- ✅ Complete the onboarding ticket

---

## 🧪 Verification

After onboarding, verify:

1. ✅ `docs/` folder exists in target repository
2. ✅ All 12 documentation files created
3. ✅ Each file has relevant base content
4. ✅ `project.onboardingCompleted = true`
5. ✅ Onboarding ticket marked complete
6. ✅ Regular ticket workflow still works

---

## 📊 Example Flow

```
User creates project "Harbor User Service"
    ↓
Backend creates onboarding ticket: TKT-Onboard-ABC
    ↓
Agent picks up TKT-Onboard-ABC
    ↓
Agent detects type="onboard"
    ↓
Agent fetches project details (repoPath)
    ↓
Agent creates docs/ folder structure
    ↓
Agent fills base templates
    ↓
Agent updates project.onboardingCompleted = true
    ↓
Agent marks ticket complete
    ↓
Now project is ready for development tickets!
```

---

**Last Updated:** 2026-04-05
**Status:** ✅ Ready for Implementation
