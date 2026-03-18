# Harbor AI - Testing & Self-Validation Protocol

**Document Version:** 1.0.0
**Last Updated:** 2026-03-18
**Owner:** Harbor AI Development Team

---

## 🚨 MANDATORY PHASE - CRITICAL RULE

**This phase is MANDATORY for EVERY task.**

**❌ PROHIBITED:**
- **NEVER** skip testing under any condition
- **NEVER** assume code works without validation
- **NEVER** stop after code generation
- **NEVER** proceed to PR creation if testing fails
- **NEVER** mark a task as complete without successful testing

**✅ MANDATORY BEHAVIOR:**
1. **ALWAYS** test after code implementation
2. **ALWAYS** validate functionality end-to-end
3. **ALWAYS** fix detected issues automatically
4. **ALWAYS** re-test until everything works
5. **ONLY** proceed to PR creation after successful testing

**🎯 COMPLETION CRITERIA:**
The task is ONLY complete when:
- ✅ All tests pass
- ✅ No errors remain
- ✅ Feature works end-to-end
- ✅ All related components are functioning
- ✅ No regressions were introduced
- ✅ System is stable

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Phase Overview](#phase-overview)
3. [Step 1: Test Scenario Generation](#step-1-test-scenario-generation)
4. [Step 2: Build Validation](#step-2-build-validation)
5. [Step 3: Execute Tests](#step-3-execute-tests)
6. [Step 4: Error Detection](#step-4-error-detection)
7. [Step 5: Auto-Fix Loop](#step-5-auto-fix-loop)
8. [Step 6: Final Validation](#step-6-final-validation)
9. [Common Error Patterns and Fixes](#common-error-patterns-and-fixes)
10. [Transition to Next Phase](#transition-to-next-phase)

---

## Purpose and Scope

This document defines the **mandatory testing and self-validation protocol** that Harbor-AI MUST follow after implementing ANY code changes.

### Objectives

Transform the Harbor AI Agent into a **self-testing and self-correcting system** that:
- Validates its own work automatically
- Detects issues before deployment
- Fixes problems without user intervention
- Delivers production-ready features
- Ensures no broken implementations reach production

### When to Use This Protocol

**This protocol MUST be used after:**
- Creating new API endpoints
- Implementing UI components
- Modifying services or repositories
- Adding database schema changes
- Integrating with external services
- Refactoring existing code

**This protocol must be completed BEFORE:**
- Creating a pull request
- Marking a task as complete
- Proceeding to deployment

---

## Phase Overview

### The Testing & Self-Validation Loop

```
┌─────────────────────────────────────────────────────────┐
│            Code Implementation Complete                 │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Step 1: Test Scenario Generation                       │
│  - Analyze what was built                               │
│  - Generate realistic test scenarios                    │
│  - Identify critical paths to test                      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Step 2: Build Validation                               │
│  - TypeScript compilation check                         │
│  - Build process verification                           │
│  - Dependency validation                                │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Step 3: Execute Tests                                  │
│  - Run automated tests (if available)                   │
│  - Perform functional validation                        │
│  - Execute integration tests                            │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Step 4: Error Detection                                │
│  - Runtime errors                                       │
│  - Missing integrations                                 │
│  - Incorrect data flow                                  │
│  - Broken dependencies                                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Errors Found? │
              └────────────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
         YES                  NO
          │                   │
          ▼                   ▼
┌───────────────────┐   ┌─────────────────┐
│ Step 5: Auto-Fix  │   │ Step 6: Final   │
│  Loop             │   │  Validation     │
│  - Fix errors     │   │  - Verify       │
│  - Re-test        │   │  functionality  │
│  - Continue until │   │  - Check for    │
│    no errors      │   │    regressions  │
│  �─────────────►  │   │  - Confirm      │
│    (loop back)    │   │    stability    │
└───────────────────┘   └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Testing Complete│
                        │  ✓ Ready for PR │
                        └─────────────────┘
```

---

## Step 1: Test Scenario Generation

Before executing tests, the agent must generate test scenarios based on what was implemented.

### 1.1 Analyze What Was Built

**Identify the feature type:**

| Feature Type | Test Focus Areas |
|--------------|------------------|
| **API Endpoints** | HTTP methods, request/response format, error handling, authentication |
| **UI Components** | Rendering, user interaction, state management, data flow |
| **Database Changes** | Schema validation, migrations, CRUD operations, data integrity |
| **Services** | Business logic, error handling, integration with other services |
| **Integrations** | Data exchange, API calls, error handling, retry logic |
| **Refactoring** | Existing functionality still works, no regressions |

### 1.2 Generate Test Scenarios

**For API Endpoints:**
```typescript
// Example: GET /api/users/:id
Test Scenarios:
1. Valid request with existing user ID → Returns 200 with user data
2. Request with non-existent user ID → Returns 404
3. Request with invalid ID format → Returns 400
4. Unauthenticated request → Returns 401
5. Request without permissions → Returns 403
```

**For UI Components:**
```typescript
// Example: UserProfile component
Test Scenarios:
1. Component renders without errors
2. Displays user data correctly when loaded
3. Shows loading state while fetching data
4. Displays error message on fetch failure
5. Handles user interactions (edit, save, cancel)
```

**For Database Changes:**
```typescript
// Example: Adding email field to users table
Test Scenarios:
1. Migration runs successfully
2. New email field is created in database
3. Existing records have default/null values
4. CRUD operations work with new field
5. Model interface is updated correctly
```

### 1.3 Identify Critical Paths

**Prioritize testing:**
1. **Happy Path** - Primary use case works correctly
2. **Error Cases** - Graceful error handling
3. **Edge Cases** - Boundary conditions, null values, empty states
4. **Security** - Authentication, authorization, input validation
5. **Integration** - Data flows correctly between components

---

## Step 2: Build Validation

Before running functional tests, ensure the project builds successfully.

### 2.1 TypeScript Compilation Check

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    # Capture errors for fixing
    npx tsc --noEmit 2>&1 | tee ts-errors.log
fi
```

**Check for:**
- Type errors
- Missing imports
- Interface mismatches
- Implicit any types

### 2.2 Build Process Check

```bash
# Run the build process
npm run build 2>&1 | tee build-output.log

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    # Analyze build errors
    grep -i "error" build-output.log
fi
```

**Check for:**
- Build failures
- Module resolution errors
- Bundle size issues
- Missing dependencies

### 2.3 Dependency Check

```bash
# Check for broken dependencies
npm ls 2>&1 | grep -E "UNMET|missing|ERR" || echo "✅ All dependencies installed"

# Check for security vulnerabilities
npm audit --audit-level=high
```

**Check for:**
- Missing dependencies
- Version conflicts
- Security vulnerabilities

---

## Step 3: Execute Tests

Execute tests based on the project type and what was implemented.

### 3.1 Run Automated Tests (if available)

```bash
# Check if test script exists
if grep -q '"test"' package.json; then
    echo "Running automated tests..."
    npm test 2>&1 | tee test-output.log

    # Check exit code
    if [ $? -eq 0 ]; then
        echo "✅ All automated tests passed"
    else
        echo "❌ Some tests failed"
        # Analyze failures
        grep -A 5 "FAIL" test-output.log
    fi
else
    echo "⚠️ No automated tests configured"
fi
```

### 3.2 Functional Validation (Manual/Simulated)

**For API Endpoints:**

```bash
# Example: Test GET /api/users/:id
echo "Testing GET /api/users/123..."

# Start service in background
npm run dev &
DEV_PID=$!
sleep 5

# Test endpoint
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/users/123)
if [ "$response" = "200" ]; then
    echo "✅ GET /api/users/:id returns 200"
else
    echo "❌ GET /api/users/:id returned $response (expected 200)"
fi

# Cleanup
kill $DEV_PID
```

**For UI Components:**

```bash
# Example: Test component rendering
echo "Testing component rendering..."

# Start dev server
npm run dev &
DEV_PID=$!
sleep 10

# Check if server started
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Dev server started successfully"
    echo "✅ Component should render at /profile/view"
else
    echo "❌ Dev server failed to start"
fi

# Cleanup
kill $DEV_PID
```

**For Database Changes:**

```bash
# Example: Test migration
echo "Testing database migration..."

# Run migration
npm run migrate

# Check if migration succeeded
if [ $? -eq 0 ]; then
    echo "✅ Migration successful"

    # Verify schema
    npm run db:schema:validate
else
    echo "❌ Migration failed"
fi
```

### 3.3 Integration Testing

**Test data flow between components:**

```bash
# Example: Test service integration
echo "Testing service integration..."

# Test: User Service → Job Service
echo "Creating user..."
user_response=$(curl -s -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}')

user_id=$(echo $user_response | jq -r '.id')

echo "Creating job for user $user_id..."
job_response=$(curl -s -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"$user_id\",\"title\":\"Test Job\"}")

if echo $job_response | jq -e '.id' > /dev/null; then
    echo "✅ Integration test passed: Job created for user"
else
    echo "❌ Integration test failed"
fi
```

---

## Step 4: Error Detection

After running tests, detect and classify any errors found.

### 4.1 Error Severity Classification

| Severity | Description | Must Fix | Block PR? |
|----------|-------------|----------|-----------|
| **CRITICAL** | Feature doesn't work at all | Yes | Yes |
| **HIGH** | Major functionality broken | Yes | Yes |
| **MEDIUM** | Minor issues, workarounds exist | Yes | No |
| **LOW** | Warnings, cosmetic issues | Recommended | No |

### 4.2 Error Types and Detection

**Type 1: Runtime Errors**
```
Error: Cannot connect to database
TypeError: Cannot read property 'id' of undefined
ReferenceError: userService is not defined
```

**Type 2: Build Errors**
```
Module not found: Error: Can't resolve './userService'
error TS2307: Cannot find module 'express'
```

**Type 3: Test Failures**
```
FAIL src/__tests__/userService.test.js
  ✕ Should create user (15ms)
  ✕ Should return user by ID (8ms)
```

**Type 4: Integration Failures**
```
❌ GET /api/users/:id returned 500 (expected 200)
❌ Integration test failed: Job not created for user
```

**Type 5: Missing Features**
```
⚠️ Export 'createJob' not found in module
⚠️ Endpoint /api/users/:id not responding
```

---

## Step 5: Auto-Fix Loop

If any errors are found, enter the auto-fix loop.

### 5.1 Loop Structure

```
┌─────────────────────────────────────────────────────────┐
│  1. Detect Error                                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  2. Classify Error Severity                            │
│     - CRITICAL: Feature doesn't work                   │
│     - HIGH: Major functionality broken                │
│     - MEDIUM: Minor issues                             │
│     - LOW: Warnings                                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  3. Analyze Root Cause                                 │
│     - Read error messages                              │
│     - Check related code                               │
│     - Identify the issue                               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  4. Apply Fix                                          │
│     - Update code                                      │
│     - Add missing imports                              │
│     - Fix type errors                                  │
│     - Correct logic errors                             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  5. Re-validate                                        │
│     - Run build again                                  │
│     - Execute tests again                              │
│     - Check for errors                                 │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Errors Fixed? │
              └────────────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
         NO                  YES
          │                   │
          ▼                   ▼
    ┌─────────────┐    ┌──────────────┐
    │ Loop Back   │    │ Fix Applied  │
    │ to Step 3   │    │ Successfully │
    └─────────────┘    └──────────────┘
```

### 5.2 Auto-Fix Procedures

#### Fix 1: Missing Imports

**Detection:**
```
error TS2307: Cannot find module 'express'
error TS2552: Cannot find name 'UserService'
```

**Auto-Fix:**
```typescript
// BEFORE (missing import)
const user = await UserService.findById(id);

// AFTER (auto-fix with import)
import { UserService } from './services/UserService';

const user = await UserService.findById(id);
```

#### Fix 2: Type Errors

**Detection:**
```
error TS7006: Parameter 'req' implicitly has an 'any' type
error TS2339: Property 'userId' does not exist on type 'Request'
```

**Auto-Fix:**
```typescript
// BEFORE (implicit any)
async function createUser(req, res) {
  const userId = req.userId; // Error
}

// AFTER (proper types)
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';

async function createUser(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId; // Works!
}
```

#### Fix 3: Missing Dependencies

**Detection:**
```
error TS2307: Cannot find module '@nestjs/common'
npm ERR! missing peer dependency
```

**Auto-Fix:**
```bash
# Install missing dependency
npm install @nestjs/common

# Re-run validation
npm run build
```

#### Fix 4: Runtime Errors - Null/Undefined

**Detection:**
```
TypeError: Cannot read property 'id' of undefined
```

**Auto-Fix:**
```typescript
// BEFORE (no null check)
const userId = req.user.id;

// AFTER (with null check)
const userId = req.user?.id;
if (!userId) {
  throw new Error('User not authenticated');
}
```

#### Fix 5: Async/Await Issues

**Detection:**
```
TypeError: Cannot read property 'then' of undefined
Promise returned without await
```

**Auto-Fix:**
```typescript
// BEFORE (missing await)
const user = UserService.findById(id); // Returns Promise, not User

// AFTER (with await)
const user = await UserService.findById(id); // Returns User
```

#### Fix 6: Database Schema Mismatches

**Detection:**
```
error TS2741: Property 'email' is missing in type '...'
column "email" does not exist
```

**Auto-Fix:**
```typescript
// BEFORE (model mismatch)
interface User {
  id: string;
  name: string;
  // Missing email field
}

// AFTER (add missing field)
interface User {
  id: string;
  name: string;
  email: string; // Added
}
```

#### Fix 7: Broken Imports After File Moves

**Detection:**
```
Module not found: Error: Can't resolve './utils/helper'
```

**Auto-Fix:**
```typescript
// BEFORE (broken import after file move)
import { helper } from './utils/helper';

// AFTER (fixed path)
import { helper } from '../shared/utils/helper';
```

#### Fix 8: Export/Import Mismatch

**Detection:**
```
SyntaxError: Named export 'createJob' not found
```

**Auto-Fix:**
```typescript
// BEFORE (wrong export name in importing file)
import { createJob } from './job.service';

// AFTER (correct export name)
import { CreateJob } from './job.service';
```

### 5.3 Loop Control

**Maximum iterations:** 10
**Exit condition:** No errors remain
**Failure condition:** Unable to fix after 10 attempts

```bash
MAX_ATTEMPTS=10
attempt=1

while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo "Fix attempt $attempt of $MAX_ATTEMPTS"

    # Run validation
    npm run build > build.log 2>&1
    BUILD_EXIT_CODE=$?

    if [ $BUILD_EXIT_CODE -eq 0 ]; then
        echo "✅ No build errors detected"

        # Run tests
        npm test > test.log 2>&1
        TEST_EXIT_CODE=$?

        if [ $TEST_EXIT_CODE -eq 0 ]; then
            echo "✅ All tests passed!"
            break
        fi
    fi

    echo "❌ Errors detected. Applying fixes..."

    # Analyze and fix errors
    # (Auto-fix logic here)

    attempt=$((attempt + 1))
done

if [ $attempt -gt $MAX_ATTEMPTS ]; then
    echo "❌ Unable to fix errors after $MAX_ATTEMPTS attempts"
    echo "⚠️ Manual intervention required"
    exit 1
fi
```

---

## Step 6: Final Validation

Before completing the testing phase, perform final validation.

### 6.1 Comprehensive Build Check

```bash
echo "Running final comprehensive build..."

# Clean build
rm -rf dist/ build/
npm run build

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ Final build successful"
else
    echo "❌ Final build failed"
    exit 1
fi
```

### 6.2 Service Runtime Validation

```bash
echo "Validating service runtime..."

# Start service
npm run dev &
DEV_PID=$!
sleep 5

# Check if service is running
if ps -p $DEV_PID > /dev/null; then
    echo "✅ Service started successfully"

    # Health check
    if curl -sf http://localhost:3001/health > /dev/null; then
        echo "✅ Health check passed"
    else
        echo "⚠️ Health check endpoint not available"
    fi

    # Cleanup
    kill $DEV_PID
else
    echo "❌ Service failed to start"
    exit 1
fi
```

### 6.3 Full Feature Testing

```bash
echo "Running full feature test suite..."

# Run all available tests
if grep -q '"test"' package.json; then
    npm test

    if [ $? -eq 0 ]; then
        echo "✅ All tests passed"
    else
        echo "❌ Some tests failed"
        exit 1
    fi
else
    echo "⚠️ No automated tests configured"
fi
```

### 6.4 Regression Check

```bash
echo "Checking for regressions..."

# Test existing functionality
echo "Testing existing endpoints..."
curl -s http://localhost:3001/api/users > /dev/null && echo "✅ GET /api/users works"
curl -s http://localhost:3001/api/jobs > /dev/null && echo "✅ GET /api/jobs works"

echo "✅ No regressions detected"
```

### 6.5 Stability Confirmation

**Confirm the system is stable:**
- ✅ No build errors
- ✅ No runtime errors
- ✅ All tests pass
- ✅ Feature works end-to-end
- ✅ No regressions introduced
- ✅ Service starts and runs correctly

---

## Common Error Patterns and Fixes

### Pattern 1: Missing Type Definitions

**Error:**
```
Could not find a declaration file for module 'express'
```

**Fix:**
```bash
# Install types package
npm install -D @types/express
```

### Pattern 2: Incorrect Import Path

**Error:**
```
error TS2307: Cannot find module '../types'
```

**Fix:**
```typescript
// Find the correct file
find . -name "types.ts" -o -name "types.d.ts"

// Update import with correct path
import { User } from '../../../shared/types';
```

### Pattern 3: Missing Environment Variables

**Error:**
```
TypeError: Cannot read property 'DATABASE_URL' of undefined
```

**Fix:**
```bash
# Check if .env file exists
ls -la .env*

# Create .env if missing
cat > .env << EOF
DATABASE_URL=postgresql://...
PORT=3001
NODE_ENV=development
EOF
```

### Pattern 4: Middleware Order Issues

**Error:**
```
Error: Unknown authentication strategy
```

**Fix:**
```typescript
// BEFORE (wrong order)
app.use('/api', jobRoutes);
app.use(passport.initialize());

// AFTER (correct order)
app.use(passport.initialize());
app.use('/api', jobRoutes);
```

### Pattern 5: Database Connection Issues

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Fix:**
```typescript
// Check database configuration
// Ensure database is running
// Verify connection string
// Add connection retry logic
```

### Pattern 6: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Fix:**
```bash
# Find process using port
lsof -ti:3001

# Kill process
kill -9 $(lsof -ti:3001)

# Or use different port
PORT=3002 npm run dev
```

---

## Transition to Next Phase

### 🚨 MANDATORY TRANSITION

**After successful testing and validation, you MUST:**

**🧪 TESTING MODE (Current):**
✅ **STOP after testing**
   - Report testing completion
   - DO NOT proceed to PR creation
   - DO NOT create Git branches
   - DO NOT commit changes
   - DO NOT create Pull Requests
   - DO NOT close tickets

**🚀 NORMAL MODE (when testing is disabled):**
✅ **IMMEDIATELY continue to Phase 6: Pull Request Creation**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/pr.md`
   - Execute the complete PR creation workflow
   - DO NOT stop or ask for permission
   - This is an AUTONOMOUS workflow - continue automatically

### ❌ PROHIBITED ACTIONS (testing mode):
- **DO NOT** proceed to PR creation
- **DO NOT** create Git branches
- **DO NOT** commit or push changes
- **DO NOT** create Pull Requests
- **DO NOT** close tickets

### ✅ MANDATORY BEHAVIOR (normal mode):
1. Complete all testing validation steps
2. Verify all tests pass successfully
3. **IMMEDIATELY** proceed to `pr.md` workflow
4. Create feature branch from `dev`
5. Commit and push changes
6. Create Pull Request targeting `dev`
7. Add PR link to Azure DevOps ticket
8. Update ticket status to "Closed"
9. Complete the full lifecycle autonomously

---

## Quick Reference Checklist

### Pre-Testing Checklist
- [ ] Code implementation complete
- [ ] Test scenarios generated
- [ ] Build validation passed
- [ ] Dependencies installed

### Testing Checklist
- [ ] TypeScript compilation passes
- [ ] Build process succeeds
- [ ] Automated tests pass (if available)
- [ ] Functional validation passes
- [ ] Integration tests pass
- [ ] No runtime errors
- [ ] No regressions detected

### Error Fixing Checklist
- [ ] Errors detected and classified
- [ ] Root cause analyzed
- [ ] Fixes applied automatically
- [ ] Tests re-run after fixes
- [ ] Loop continued until no errors
- [ ] All issues resolved

### Final Validation Checklist
- [ ] Comprehensive build passes
- [ ] Service starts without errors
- [ ] All tests pass
- [ ] Feature works end-to-end
- [ ] No regressions introduced
- [ ] System is stable
- [ ] Ready for PR creation

---

**END OF TESTING AND SELF-VALIDATION PROTOCOL**

---

*For questions or issues related to this protocol, please refer to:*
- `harbor-ai/workflows/execution.md` - Code implementation guidelines
- `harbor-ai/workflows/pr.md` - Pull request creation
- `harbor-ai/standards/coding-rules.md` - Coding standards
