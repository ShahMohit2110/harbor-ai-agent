# Harbor Platform - Global Coding Rules

> **Last Updated:** March 6, 2026
> **Version:** 1.0.0
> **Scope:** Platform-wide coding standards for all Harbor repositories

---

## 1. Purpose of This Document

This document defines **global coding rules and standards** that apply to **all Harbor platform repositories**.

### Document Hierarchy

Harbor uses a **three-tier documentation system**:

1. **Global Rules** (this document) - `.harbor-ai/coding-rules.md`
   - Platform-wide standards applicable to all services
   - Cross-service architectural principles
   - AI agent workflow and safety rules

2. **Service-Specific Rules** - `<service>/coding-rules.md`
   - Rules specific to individual services
   - Implementation patterns for that service
   - Service-level conventions

3. **Architecture Documentation** - `<service>/architecture.md`
   - Detailed architecture for each service
   - Service responsibilities and boundaries
   - Technical implementation details

### How to Use This Document

**AI Agents and Developers MUST:**
1. Follow **global rules** from this document first
2. Follow **service-specific rules** from the target service
3. Consult **architecture.md** for service-specific context

**Rule Precedence:** When conflicts exist, **service-specific rules take precedence** over global rules.

---

## 2. Rule Priority

AI agents and developers must follow rules in this order of priority:

### Priority 1: Service-Specific Rules
📄 **Location:** `<service-repository>/coding-rules.md`

**Rules contained here:**
- Service-specific coding patterns
- Local conventions and standards
- Service-specific do's and don'ts

**When to follow:** Always when modifying a specific service.

### Priority 2: Global Rules
📄 **Location:** `.harbor-ai/coding-rules.md` (this document)

**Rules contained here:**
- Platform-wide standards
- Cross-service architectural principles
- AI agent workflow and safety

**When to follow:** When service-specific rules don't address the situation.

### Priority 3: Architecture Documentation
📄 **Location:** `<service-repository>/architecture.md`

**Information contained here:**
- Service architecture and design
- Responsibility boundaries
- Technical implementation details

**When to follow:** For understanding service context and design decisions.

### Conflict Resolution

```
┌─────────────────────────────────────────┐
│  RULE CONFLICT?                          │
└──────────────┬──────────────────────────┘
               │
               ▼
        ┌──────────────┐
        │ Does service- │   YES → Use service-specific rule
        │ specific rule │
        │ exist?        │
        └──────┬────────┘
               │ NO
               ▼
        ┌──────────────┐
        │ Use global   │
        │ rule         │
        └───────────────┘
```

**Example:**
- **Global rule:** "Use camelCase for variables"
- **User Service rule:** "Use PascalCase for model classes"
- **Result:** Use PascalCase for model classes in User Service

---

## 3. Microservice Architecture Principles

Harbor is built on **microservices architecture**. All AI agents and developers MUST understand and follow these principles.

### 3.1 Core Principles

✅ **DO:**
- **Service Independence** - Each service owns its domain and operates independently
- **API-Based Communication** - Services communicate through well-defined APIs
- **Single Responsibility** - Each service has one clear purpose
- **Database Isolation** - Services never directly access another service's database
- **API Gateway Routing** - All external client requests go through API Gateway

❌ **DO NOT:**
- Create circular dependencies between services
- Implement duplicate business logic across services
- Allow one service to directly modify another service's data
- Bypass API Gateway for client-facing features
- Share authentication tokens between services

### 3.2 Service Ownership

Each service **owns specific data and functionality**:

| Service | Owns |
|---------|------|
| API Gateway | Authentication, routing, security |
| User Service | User profiles, communities, social features |
| Job Service | Jobs, applications, job payments |
| Notification Service | Notification delivery (push, email, SMS) |
| Socket Service | Real-time messaging, WebSocket connections |
| Shared Models | Database schema definitions (shared) |
| Website | Web UI, pages, components |
| Mobile App | Mobile UI, screens, components |

### 3.3 Data Access Rules

🔒 **Strict Rules:**

1. **Single Source of Truth** - Each data entity has exactly one owner service
2. **Read-Only Access** - Services may read data via APIs only, never directly
3. **No Direct DB Access** - Services never connect to another service's database
4. **API-Based Updates** - All data modifications go through owner service APIs

❌ **FORBIDDEN:**
```typescript
// ❌ WRONG: User Service directly accessing Job Service database
const jobs = await JobServiceDatabase.findAll();

// ✅ CORRECT: User Service calling Job Service API
const jobs = await axios.get(`${JOB_SERVICE_URL}/jobs`);
```

### 3.4 Communication Patterns

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ API Gateway │ ◀─── All external requests
└──────┬──────┘
       │
       ├─────────▶ User Service
       ├─────────▶ Job Service
       ├─────────▶ Notification Service
       └─────────▶ Socket Service (WebSocket)
```

**Key Rules:**
- All external requests → API Gateway → Target Service
- Service-to-service → REST APIs or message queues
- Real-time features → Direct WebSocket to Socket Service

---

## 4. Service Responsibility Enforcement

### 4.1 Mandatory Service Identification

**Before implementing ANY feature, AI agents MUST:**

1. **Run dynamic workspace analysis** to discover all repositories (executed at agent startup)
2. **Identify the correct repository** using dynamic repository analysis from `agent-memory/repo-analysis/`
3. **Load repository-specific context** from the generated repository analysis
4. **Follow the service's coding-rules.md** (if present) for implementation patterns

### 4.2 Service Identification Workflow

```
┌─────────────────────────────────────┐
│  TASK: Implement feature X          │
└──────────────┬──────────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Load repository analysis │
    │ from agent-memory/       │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Identify responsible │
    │ repository           │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Load repository      │
    │ analysis context     │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Read coding-rules.md │
    │ (if present)         │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Implement feature    │
    └───────────────────────┘
```

### 4.3 Quick Service Reference

| Feature Domain | Responsible Service |
|----------------|-------------------|
| Authentication/login | API Gateway |
| User profiles/data | User Service |
| Jobs/applications | Job Service |
| Real-time messaging | Socket Service |
| Notifications delivery | Notification Service |
| Payments (user payouts) | User Service |
| Payments (job escrow) | Job Service |
| Communities/social feeds | User Service |
| Web UI | Website |
| Mobile UI | Mobile App |
| Database models | Shared Models |

### 4.4 Cross-Service Features

**If a feature requires multiple services:**

✅ **DO:**
- Implement each part in its respective service
- Use well-defined APIs for communication
- Coordinate through message queues if needed
- Document the cross-service interaction

❌ **DO NOT:**
- Implement the entire feature in one service
- Create direct database access between services
- Duplicate functionality across services

---

## 5. Code Quality Standards

### 5.1 Compilation Requirements

🔴 **MANDATORY:** All code MUST compile successfully before being considered complete.

**TypeScript Projects:**
```bash
# Must pass without errors
npm run build
# OR
tsc --noEmit
```

**Verification Steps:**
1. Run TypeScript compiler
2. Resolve all type errors
3. Fix all compilation errors
4. Ensure no `any` types unless explicitly justified

### 5.2 Import Management

✅ **DO:**
- Remove unused imports
- Use proper import ordering
- Import from relative paths for local files
- Use absolute imports for shared packages

❌ **DO NOT:**
```typescript
// ❌ WRONG: Unused imports
import { UserService } from './user.service';
import { Logger } from 'winston';

// ✅ CORRECT: Only used imports
import { UserService } from './user.service';
```

### 5.3 Code Conventions

**Follow existing project patterns:**
- Use existing code style and formatting
- Match naming conventions (camelCase, PascalCase, etc.)
- Follow the repository's existing patterns
- Don't introduce inconsistent formatting

### 5.4 Error Handling

✅ **DO:**
- Use try-catch blocks for async operations
- Return structured error responses
- Log errors appropriately
- Handle edge cases

❌ **DO NOT:**
```typescript
// ❌ WRONG: Silent failures
try {
  await riskyOperation();
} catch (error) {
  // Do nothing
}

// ✅ CORRECT: Proper error handling
try {
  await riskyOperation();
} catch (error) {
  logger.error('Operation failed', error);
  return { status: false, message: error.message };
}
```

---

## 6. Modification Guidelines

### 6.1 File Modification Principles

✅ **DO:**
- Modify existing files when possible
- Follow existing file structure
- Reuse existing utilities and helpers
- Maintain consistency with existing code

❌ **DO NOT:**
- Create duplicate files or functions
- Introduce new frameworks without approval
- Ignore existing utility functions
- Create parallel implementations

### 6.2 Code Reuse

**Before creating new code, check for existing implementations:**

```
┌─────────────────────────┐
│  Need to implement X    │
└──────────┬──────────────┘
           │
           ▼
    ┌──────────────┐
    │ Search for   │
    │ existing     │
    │ implementation│
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Found?       │ → YES → Reuse existing code
    └──────┬───────┘
           │ NO
           ▼
    ┌──────────────┐
    │ Create new   │
    │ implementation│
    └───────────────┘
```

### 6.3 Framework and Library Rules

✅ **DO:**
- Use existing frameworks and libraries in the project
- Follow project's established patterns
- Check package.json before adding new dependencies

❌ **DO NOT:**
- Introduce new frameworks without approval
- Add duplicate libraries (e.g., multiple HTTP clients)
- Upgrade major versions without testing
- Add unnecessary dependencies

### 6.4 File Structure

**Follow the repository's existing structure:**

```
typical-service/
├── controllers/     # HTTP request handlers
├── services/        # Business logic
├── repository/      # Data access layer
├── middlewares/     # Express middleware
├── routes/          # API routes
├── utils/           # Utility functions
├── config/          # Configuration
├── types/           # TypeScript types
└── tests/           # Test files
```

**Maintain consistency:**
- Place files in appropriate directories
- Follow existing naming patterns
- Don't create unnecessary subdirectories

---

## 7. AI Agent Workflow Rules

### 7.1 Mandatory Workflow

AI agents MUST follow this workflow when implementing tasks:

```
Step 1: Understand Task
    │
    ▼
Step 2: Identify Service (using service-map.md)
    │
    ▼
Step 3: Read Service Architecture
    │
    ▼
Step 4: Read Service Coding Rules
    │
    ▼
Step 5: Analyze Existing Code
    │
    ▼
Step 6: Implement Changes
    │
    ▼
Step 7: Verify Compilation
    │
    ▼
Step 8: Test Changes
    │
    ▼
Step 9: Review Modifications
    │
    ▼
Step 10: Complete Task
```

### 7.2 Step-by-Step Details

**Step 1: Understand Task**
- Read task description carefully
- Identify all requirements
- Clarify ambiguities before proceeding

**Step 2: Identify Service**
- Use dynamic repository analysis from `agent-memory/repo-analysis/`
- Search repository analysis for matching capabilities
- Identify primary repository owner
- Check if multiple repositories are involved

**Step 3: Read Repository Analysis**
- Load repository analysis from `agent-memory/repo-analysis/{repo-name}.md`
- Understand repository structure and purpose
- Review detected technology stack and patterns
- Identify relevant modules and entry points

**Step 4: Read Service Coding Rules**
- Read `<service>/coding-rules.md`
- Note service-specific conventions
- Follow any local patterns or standards

**Step 5: Analyze Existing Code**
- Read relevant existing files
- Identify patterns to follow
- Find reusable utilities
- Understand data flow

**Step 6: Implement Changes**
- Modify existing files or create new ones
- Follow existing code patterns
- Maintain consistency
- Add appropriate error handling

**Step 7: Verify Compilation**
- Run TypeScript compiler
- Fix all compilation errors
- Resolve type errors
- Ensure no build failures

**Step 8: Test Changes**
- Verify functionality works as expected
- Check for breaking changes
- Ensure backward compatibility
- Test edge cases

**Step 9: Review Modifications**
- Review all changed files
- Ensure no unrelated changes
- Verify code quality standards
- Check for security issues

**Step 10: Complete Task**
- Summarize changes made
- List files modified
- Document any caveats
- Confirm task completion

### 7.3 Workflow Validation

AI agents must **verify each step** before proceeding:

```typescript
// Before proceeding to next step
if (!stepCompleted) {
  throw new Error('Step must be completed before proceeding');
}
```

---

## 8. Testing and Validation

### 8.1 Compilation Verification

🔴 **MANDATORY:** All code must compile before task completion.

**Required Checks:**
```bash
# TypeScript compilation
npm run build
# OR
tsc --noEmit

# Must exit with code 0 (success)
```

**Failure Resolution:**
- Fix all TypeScript errors
- Resolve all type mismatches
- Remove unused imports
- Ensure all dependencies are installed

### 8.2 Import Validation

✅ **DO:**
- Verify all imports resolve correctly
- Ensure no circular dependencies
- Use proper import paths
- Remove unused imports

❌ **DO NOT:**
```typescript
// ❌ WRONG: Unresolved import
import { Something } from './non-existent-file';

// ❌ WRONG: Unused import
import { Unused } from './file';

// ✅ CORRECT: Valid, used import
import { Used } from './file';
```

### 8.3 Breaking Changes

🔴 **CRITICAL:** Avoid breaking existing APIs and functionality.

**Before Modifying:**
- Check if function/method is public API
- Identify all usages in the codebase
- Consider backward compatibility
- Document breaking changes if unavoidable

**Breaking Change Protocol:**
1. Identify all consumers of the API
2. Update all consumers
3. Document the change
4. Ensure all tests pass

### 8.4 Edge Cases

✅ **DO:**
- Consider null/undefined cases
- Handle empty arrays/objects
- Validate user input
- Handle API failures gracefully

❌ **DO NOT:**
```typescript
// ❌ WRONG: No null handling
function getName(user: User) {
  return user.name.split(' '); // Crashes if user.name is null
}

// ✅ CORRECT: Proper handling
function getName(user: User) {
  if (!user?.name) return ['Unknown'];
  return user.name.split(' ');
}
```

---

## 9. Pull Request Preparation

### 9.1 Change Isolation

✅ **DO:**
- Modify only files related to the task
- Make changes in the correct service
- Keep PRs focused and atomic
- Group related changes together

❌ **DO NOT:**
- Modify unrelated services
- Include refactoring in feature PRs
- Mix multiple features in one PR
- Change configuration without reason

### 9.2 PR Description Requirements

Every PR MUST include:

**Required Information:**
- Clear summary of changes
- List of files modified
- Reason for changes
- Any breaking changes
- Testing performed

**Template:**
```markdown
## Summary
[Brief description of changes]

## Files Modified
- `file1.ts` - Description of changes
- `file2.ts` - Description of changes

## Changes Made
- [ ] Feature implemented
- [ ] Tests updated
- [ ] Documentation updated

## Breaking Changes
- [ ] None / List breaking changes

## Testing
- [ ] Compilation verified
- [ ] Manual testing completed
- [ ] Edge cases tested
```

### 9.3 Code Review Checklist

Before submitting PR, verify:

- [ ] Code compiles successfully
- [ ] No TypeScript errors
- [ ] No unused imports
- [ ] Follows service coding rules
- [ ] Follows global coding rules
- [ ] No unrelated changes
- [ ] Proper error handling
- [ ] Backward compatible
- [ ] Documentation updated

---

## 10. AI Safety Rules

### 10.1 Scope Limitations

🔴 **STRICT:** AI agents MUST work within defined boundaries.

✅ **ALLOWED:**
- Modify files in the identified service
- Create new files following service structure
- Update dependencies if required
- Fix bugs in the identified service

❌ **FORBIDDEN:**
- Modify multiple services without explicit task requirement
- Refactor large code sections without approval
- Delete existing functionality without confirmation
- Make arbitrary architectural changes
- Modify infrastructure configuration

### 10.2 Modification Constraints

**Single Service Rule:**
```
IF task involves feature X
AND feature X is owned by Service Y
THEN modify ONLY Service Y
```

**Example:**
- ❌ Task: "Add user profile field" → Modifying User Service + Job Service
- ✅ Task: "Add user profile field" → Modifying User Service ONLY

### 10.3 Refactoring Restrictions

🔴 **RESTRICTED:** Large-scale refactoring requires explicit approval.

**Without Approval:**
- Fix bugs in existing code
- Improve error handling
- Add missing validation
- Optimize specific functions

**Requires Approval:**
- Refactor entire modules
- Change service architecture
- Modify service boundaries
- Restructure databases

### 10.4 Deletion Safety

⚠️ **CAUTION:** Never delete code without confirmation.

**Before Deleting:**
- Verify code is not used
- Check for external references
- Confirm with task requirements
- Document reason for deletion

**Safe Deletion Process:**
```
1. Search for all references
2. Verify no active usage
3. Confirm deletion is required
4. Document deletion reason
5. Proceed with deletion
```

### 10.5 Backward Compatibility

✅ **MAINTAIN:** Preserve existing APIs and functionality.

**Rules:**
- Don't remove existing methods
- Don't change function signatures without cause
- Don't modify API contracts without documentation
- Don't break existing integrations

**If Breaking Change is Necessary:**
1. Document the change clearly
2. Update all consumers
3. Provide migration guide
4. Get explicit approval

### 10.6 AI Agent Limitations

**AI Agents MUST NOT:**
- Make architectural decisions
- Change service boundaries
- Modify deployment configurations
- Access production databases
- Manage cloud infrastructure
- Handle security credentials
- Modify CI/CD pipelines

**For These Tasks:**
- Escalate to human developers
- Provide recommendations only
- Document requirements clearly

---

## 11. Common Pitfalls to Avoid

### 11.1 Service Boundary Violations

❌ **COMMON MISTAKE:** Implementing features in the wrong service

**Example:**
```
❌ WRONG: Implementing user profile updates in Job Service
✅ CORRECT: Implementing user profile updates in User Service
```

**Prevention:** Always use dynamic repository analysis from `agent-memory/repo-analysis/` to identify the correct repository.

### 11.2 Direct Database Access

❌ **COMMON MISTAKE:** One service accessing another's database

**Example:**
```typescript
❌ WRONG: User Service directly querying Job Service database
const jobs = await JobServiceDB.findAll();

✅ CORRECT: User Service calling Job Service API
const jobs = await axios.get(`${JOB_SERVICE_URL}/jobs`);
```

### 11.3 Duplicate Code

❌ **COMMON MISTAKE:** Creating duplicate implementations

**Prevention:**
- Search existing code before implementing
- Reuse utility functions
- Follow DRY (Don't Repeat Yourself) principle

### 11.4 Skipping Workflow Steps

❌ **COMMON MISTAKE:** Not reading architecture/docs before implementing

**Prevention:** Follow the AI Agent Workflow (Section 7) strictly.

---

## 12. Troubleshooting Guide

### 12.1 Compilation Errors

**TypeScript Error: Cannot find module**
```
Solution:
1. Check import path is correct
2. Verify file exists
3. Run npm install to ensure dependencies
```

**TypeScript Error: Property does not exist**
```
Solution:
1. Check type definitions
2. Verify object structure
3. Add type annotations if needed
```

### 12.2 Service Identification Issues

**Unsure which repository owns a feature?**
```
Solution:
1. Load repository analysis from agent-memory/repo-analysis/
2. Search for similar features in analysis files
3. Check detected APIs and capabilities
4. Use dynamic resolution algorithm
5. Ask for clarification if still unsure
```

### 12.3 Import Problems

**Import path issues**
```
Solution:
1. Use relative paths for local imports
2. Use absolute paths for shared packages
3. Verify tsconfig.json paths configuration
```

---

## 13. Quick Reference Checklist

### Before Implementing Any Feature

- [ ] Read and understood task requirements
- [ ] Identified correct repository using dynamic analysis
- [ ] Loaded repository analysis from agent-memory/
- [ ] Read coding-rules.md (if present)
- [ ] Analyzed existing code patterns
- [ ] Identified files to modify
- [ ] Verified no breaking changes

### During Implementation

- [ ] Following existing code patterns
- [ ] Reusing existing utilities
- [ ] Maintaining code consistency
- [ ] Adding proper error handling
- [ ] Including appropriate validation

### After Implementation

- [ ] Code compiles successfully
- [ ] No TypeScript errors
- [ ] No unused imports
- [ ] No console.log statements left
- [ ] Changes are isolated to relevant service
- [ ] Backward compatibility maintained

---

## 14. Escalation Guidelines

### When to Escalate

AI agents should escalate to human developers when:

🔴 **CRITICAL:**
- Task requirements are unclear
- Service ownership is ambiguous
- Breaking changes are required
- Architecture changes are needed
- Security implications exist
- Performance concerns arise

🟡 **IMPORTANT:**
- Multiple services need modification
- Database schema changes are required
- API contracts need modification
- External dependencies need updates

### Escalation Process

```
1. Document the issue clearly
2. Provide context and research
3. Suggest possible solutions
4. Escalate to human developer
5. Wait for guidance
6. Proceed with approved approach
```

---

## 15. Document Maintenance

### Version Control

- This document is version-controlled
- Changes require approval
- Version number must be updated
- Change log must be maintained

### Update Frequency

- Reviewed quarterly
- Updated when architecture changes
- Revised when new services are added
- Modified when patterns emerge

### Feedback Loop

If you encounter:
- Ambiguous rules
- Missing scenarios
- Contradictions
- Outdated information

**Report to:** Harbor Architecture Team

---

## 16. Compliance Summary

### ✅ DOs

1. **Follow the workflow** - Use dynamic repository analysis → Load context → Apply coding rules
2. **Respect boundaries** - Modify only the identified repository
3. **Maintain quality** - Ensure compilation, no errors, clean code
4. **Reuse code** - Use existing utilities and patterns
5. **Test changes** - Verify functionality and edge cases
6. **Document clearly** - Explain changes and reasoning
7. **Stay safe** - Don't delete or refactor without approval

### ❌ DON'Ts

1. **Skip identification** - Don't implement without identifying service
2. **Cross boundaries** - Don't modify multiple services unnecessarily
3. **Break APIs** - Don't break existing functionality
4. **Duplicate code** - Don't recreate existing implementations
5. **Ignore errors** - Don't leave compilation errors
6. **Refactor freely** - Don't refactor without approval
7. **Access databases** - Don't access other services' databases directly

---

## 17. Additional Resources

### Internal Documentation

- **Dynamic Repository Analysis:** `agent-memory/repo-analysis/` (generated at runtime)
- **Repository Scanner:** `tools/repository-scanner.md`
- **Dynamic Workflow:** `workflows/dynamic-workflow.md`
- **Service Rules:** `<service>/coding-rules.md` (if present)

### External References

- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- Express.js Guide: https://expressjs.com/en/guide/routing.html

---

**Document Status:** ✅ Active
**Maintained By:** Harbor Architecture Team
**Last Review:** March 6, 2026
**Next Review:** June 6, 2026

---

**End of Global Coding Rules Document**
