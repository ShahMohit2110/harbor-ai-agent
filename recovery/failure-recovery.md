# Harbor AI - Failure Recovery Protocol

**Document Version:** 1.0.0
**Last Updated:** 2025-03-06
**Platform:** Harbor Job Marketplace

---

## Table of Contents

1. [Failure Detection](#failure-detection)
2. [Error Analysis](#error-analysis)
3. [TypeScript Compilation Failures](#typescript-compilation-failures)
4. [Service Startup Failures](#service-startup-failures)
5. [Test Failures](#test-failures)
6. [API Contract Issues](#api-contract-issues)
7. [CI/CD Pipeline Failures](#cicd-pipeline-failures)
8. [Pull Request Merge Conflicts](#pull-request-merge-conflicts)
9. [Retry Strategy](#retry-strategy)
10. [Escalation Procedures](#escalation-procedures)
11. [Recovery Checklist](#recovery-checklist)

---

## Failure Detection

### Monitoring Points

Harbor-AI must continuously monitor for failures at these workflow stages:

#### 1. TypeScript Compilation

**Monitor For:**
- `npx tsc --noEmit` exit code
- `npm run build` exit code
- Compilation error output
- Type error messages

**Detection Commands:**
```bash
# TypeScript type check
npx tsc --noEmit
EXPECTED_EXIT_CODE: 0

# Build process
npm run build
EXPECTED_EXIT_CODE: 0
```

**Failure Indicators:**
- Exit code ≠ 0
- Error messages in stdout/stderr
- Build interruption
- Type errors listed

---

#### 2. Service Startup

**Monitor For:**
- Service process exit
- Port binding failures
- Crash on startup
- Initialization errors
- Database connection failures

**Detection Commands:**
```bash
# Start service
npm run start &
SERVICE_PID=$!

# Wait for startup
sleep 5

# Check if still running
ps -p $SERVICE_PID
EXPECTED: Process exists

# Test health endpoint
curl http://localhost:3004/job-svc/health-check
EXPECTED: 200 OK with health status
```

**Failure Indicators:**
- Process exits immediately
- Port already in use errors
- "ECONNREFUSED" on health check
- Crash logs in error output

---

#### 3. API Validation

**Monitor For:**
- HTTP 4xx/5xx responses
- Timeout errors
- Response format mismatches
- Missing response fields
- Incorrect status codes

**Detection Commands:**
```bash
# Test API endpoint
curl -X POST http://localhost:3004/job-svc/job \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'

# Check response
EXPECTED: 200 OK with proper JSON structure
```

**Failure Indicators:**
- 400/401/403/404/500 status codes (unexpected)
- Malformed JSON response
- Missing expected fields
- Incorrect data types

---

#### 4. Test Execution

**Monitor For:**
- Test failures (Jest exit code)
- Test timeouts
- Assertion failures
- Unhandled exceptions in tests

**Detection Commands:**
```bash
# Run tests
npm test
EXPECTED_EXIT_CODE: 0

# Check test output
# All tests should pass
```

**Failure Indicators:**
- Exit code ≠ 0
- "FAIL" in test output
- Test timeout errors
- Unhandled exceptions

---

#### 5. CI/CD Pipeline Execution

**Monitor For:**
- Pipeline failure status
- Lint errors
- Build failures in CI
- Test failures in CI environment
- Deployment failures

**Detection Methods:**
- Check CI pipeline status (Azure DevOps, GitHub Actions)
- Review CI logs
- Monitor build status
- Check deployment logs

**Failure Indicators:**
- Pipeline shows "failed" status
- Red X in CI interface
- Error logs in CI output

---

#### 6. Pull Request Validation

**Monitor For:**
- Merge conflicts
- PR check failures
- Reviewer rejection
- Automated check failures

**Detection Methods:**
- Git status during merge
- PR validation checks
- Reviewer comments

**Failure Indicators:**
- "CONFLICT" markers in files
- Failed PR checks
- "Changes requested" status

---

### Failure Response Protocol

**When ANY Failure is Detected:**

```
1. PAUSE current workflow immediately
2. ENTER recovery mode
3. DO NOT proceed to next phase
4. ANALYZE the failure
5. ATTEMPT automatic recovery
6. RE-VALIDATE after recovery
7. ESCALATE if unresolvable
```

---

## Error Analysis

### Error Analysis Process

**When a failure is detected, Harbor-AI must:**

#### Step 1: Capture Error Context

**Information to Collect:**
```bash
# Capture full error message
ERROR_OUTPUT=$(command 2>&1)

# Capture exit code
EXIT_CODE=$?

# Capture timestamp
TIMESTAMP=$(date)

# Capture working directory
WORKING_DIR=$(pwd)

# Capture git status
GIT_STATUS=$(git status --porcelain)
```

**Error Context Template:**
```markdown
## Error Report

**Timestamp:** [TIMESTAMP]
**Working Directory:** [WORKING_DIR]
**Command:** [FAILED COMMAND]
**Exit Code:** [EXIT_CODE]
**Error Output:**
\`\`
[FULL ERROR OUTPUT]
\`\`

**Git Status:**
\`\`
[GIT_STATUS]
\`\`
```

---

#### Step 2: Identify Error Type

**Common Error Types:**

**Type 1: TypeScript Compilation Errors**
- Pattern: `error TS####: [description]`
- Indicators: Type mismatches, missing imports, syntax errors

**Type 2: Build/Compilation Errors**
- Pattern: Build fails, linker errors
- Indicators: Missing dependencies, incorrect configuration

**Type 3: Runtime Errors**
- Pattern: Service crashes, unhandled exceptions
- Indicators: Process exits, stack traces

**Type 4: Test Failures**
- Pattern: Test assertions fail
- Indicators: "FAIL" in test output, assertion errors

**Type 5: Configuration Errors**
- Pattern: Missing env vars, incorrect config
- Indicators: "undefined" values, connection failures

**Type 6: Integration Errors**
- Pattern: Service communication fails
- Indicators: ECONNREFUSED, timeout errors

**Type 7: Dependency Errors**
- Pattern: Missing modules, version conflicts
- Indicators: "Cannot find module", version mismatches

---

#### Step 3: Identify Error Location

**Locate the Source File:**

```bash
# From TypeScript error
error TS2339: Property 'x' does not exist on type 'Y'.
  at file.ts:10:5
# LOCATION: file.ts, line 10, column 5

# From build error
Error: Cannot find module './utils'
# LOCATION: Import statement in current file

# From runtime error
Error: Cannot read property 'x' of undefined
    at Object.method (/path/to/file.ts:25:15)
# LOCATION: /path/to/file.ts, line 25, column 15

# From test failure
  ● JobService › should create job
    Expected: "success"
    Received: "error"
    at Object.<anonymous> (/path/to/test.ts:45:20)
# LOCATION: test file and line number
```

---

#### Step 4: Determine Root Cause

**Root Cause Analysis:**

**Question 1: Is this a syntax error?**
- Check for: Missing brackets, semicolons, quotes
- Check for: Incorrect syntax
- Fix: Correct syntax

**Question 2: Is this a type error?**
- Check for: Type mismatches, missing types
- Check for: Implicit any, incorrect types
- Fix: Add correct types

**Question 3: Is this an import error?**
- Check for: Missing imports, wrong paths
- Check for: Module not found
- Fix: Add/fix imports

**Question 4: Is this a logic error?**
- Check for: Incorrect business logic
- Check for: Wrong algorithm
- Fix: Correct logic

**Question 5: Is this a configuration error?**
- Check for: Missing env vars, wrong config
- Check for: Incorrect settings
- Fix: Update configuration

**Question 6: Is this a dependency error?**
- Check for: Missing packages, version conflicts
- Check for: Incompatible versions
- Fix: Install/update dependencies

---

## TypeScript Compilation Failures

### Common TypeScript Errors

#### Error 1: Type Mismatch

**Error Pattern:**
```typescript
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

**Analysis:**
- **Cause:** Passing wrong type to function
- **Impact:** Compilation fails
- **Severity:** HIGH - Blocks build

**Recovery Steps:**
```typescript
// ❌ INCORRECT
function processId(id: number) {
  return id * 2;
}

processId("123");  // Error: string is not assignable to number

// ✅ CORRECT
function processId(id: number) {
  return id * 2;
}

processId(123);  // Correct
```

**Automatic Fix:**
1. Identify the function parameter type
2. Check the argument being passed
3. Convert argument to correct type if appropriate
4. Or fix the parameter type if it's incorrect

---

#### Error 2: Property Does Not Exist

**Error Pattern:**
```typescript
error TS2339: Property 'x' does not exist on type 'Y'.
```

**Analysis:**
- **Cause:** Accessing non-existent property
- **Impact:** Compilation fails
- **Severity:** HIGH - Blocks build

**Recovery Steps:**
```typescript
// ❌ INCORRECT
interface User {
  name: string;
  email: string;
}

const user: User = { name: "John", email: "john@example.com" };
console.log(user.phoneNumber);  // Error: phoneNumber doesn't exist

// ✅ CORRECT - Add missing property
interface User {
  name: string;
  email: string;
  phoneNumber?: string;  // Add property
}

const user: User = {
  name: "John",
  email: "john@example.com",
  phoneNumber: "1234567890"
};
console.log(user.phoneNumber);
```

**Automatic Fix:**
1. Check if property should exist on type
2. Add property to interface if missing
3. Or fix property name if typo
4. Or remove reference if property doesn't exist

---

#### Error 3: Missing Import

**Error Pattern:**
```typescript
error TS2304: Cannot find name 'Request'.
```

**Analysis:**
- **Cause:** Missing import statement
- **Impact:** Compilation fails
- **Severity:** HIGH - Blocks build

**Recovery Steps:**
```typescript
// ❌ INCORRECT
export function handler(req: Request, res: Response) {
  // Error: Cannot find name 'Request'
}

// ✅ CORRECT
import { Request, Response } from "express";

export function handler(req: Request, res: Response) {
  // Works correctly
}
```

**Automatic Fix:**
1. Identify the missing import
2. Add import statement at top of file
3. Verify import path is correct
4. Rebuild to verify fix

---

#### Error 4: Implicit Any

**Error Pattern:**
```typescript
error TS7006: Parameter 'x' implicitly has an 'any' type.
```

**Analysis:**
- **Cause:** Missing type annotation
- **Impact:** Compilation fails (with strict settings)
- **Severity:** MEDIUM - Type safety issue

**Recovery Steps:**
```typescript
// ❌ INCORRECT
function processData(data) {  // Error: implicit any
  return data * 2;
}

// ✅ CORRECT
function processData(data: number): number {
  return data * 2;
}
```

**Automatic Fix:**
1. Add explicit type annotation
2. Or use interface/type if complex
3. Rebuild to verify fix

---

#### Error 5: Module Not Found

**Error Pattern:**
```typescript
error TS2307: Cannot find module './utils' or its corresponding type declarations.
```

**Analysis:**
- **Cause:** Incorrect import path or module doesn't exist
- **Impact:** Compilation fails
- **Severity:** HIGH - Blocks build

**Recovery Steps:**
```typescript
// ❌ INCORRECT
import { utils } from './utils';  // Module doesn't exist

// ✅ CORRECT
import { utils } from '../utils';  // Correct relative path
```

**Automatic Fix:**
1. Check if file exists at specified path
2. Correct import path if wrong
3. Or create file if it should exist
4. Verify file extension (.ts, .js)

---

### TypeScript Compilation Recovery Workflow

**When TypeScript Compilation Fails:**

```
1. RUN: npx tsc --noEmit
   Capture all errors

2. FOR EACH ERROR:
   a. Identify error type
   b. Locate source file and line
   c. Apply appropriate fix
   d. Verify fix compiles

3. REBUILD: npm run build
   Verify zero errors

4. IF STILL FAILING:
   Repeat steps 2-3

5. IF UNRESOLVABLE:
   Escalate to human developer
```

---

## Service Startup Failures

### Common Startup Errors

#### Error 1: Port Already in Use

**Error Pattern:**
```
Error: listen EADDRINUSE: address already in use :::3004
```

**Analysis:**
- **Cause:** Another process using the port
- **Impact:** Service cannot start
- **Severity:** HIGH - Blocks service

**Recovery Steps:**
```bash
# Find process using port
lsof -i :3004

# Kill the process
kill -9 <PID>

# OR change port in .env
# PORT=3005
```

**Automatic Fix:**
1. Check if port is in use
2. Kill conflicting process if safe to do so
3. Or suggest changing port in .env
4. Restart service

---

#### Error 2: Missing Environment Variable

**Error Pattern:**
```
Error: undefined is not a function (reading 'split')
    at new Connection (/path/to/config/db.ts:15:25)
```

**Analysis:**
- **Cause:** Environment variable not set
- **Impact:** Service fails during initialization
- **Severity:** HIGH - Blocks service

**Recovery Steps:**
```bash
# Check .env file exists
ls -la .env

# Check if variable is defined
grep DB_HOST .env

# Add missing variable
echo "DB_HOST=localhost" >> .env
```

**Automatic Fix:**
1. Identify missing environment variable
2. Add to .env file with appropriate default
3. Or prompt user for required value
4. Restart service

---

#### Error 3: Database Connection Failed

**Error Pattern:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Analysis:**
- **Cause:** Database not running or wrong connection details
- **Impact:** Service cannot start
- **Severity:** HIGH - Blocks service

**Recovery Steps:**
```bash
# Check if database is running
pg_isready -h localhost -p 5432

# Check connection string
cat .env | grep DB_

# If database is down, start it
# If wrong connection details, fix .env
```

**Automatic Fix:**
1. Verify database server status
2. Check connection string in .env
3. Suggest starting database if down
4. Cannot auto-fix database issues - escalate

---

#### Error 4: Module Initialization Error

**Error Pattern:**
```
Error: Cannot read property 'init' of undefined
    at Object.<anonymous> (/path/to/service/index.ts:20:10)
```

**Analysis:**
- **Cause:** Module not properly imported or initialized
- **Impact:** Service fails during initialization
- **Severity:** HIGH - Blocks service

**Recovery Steps:**
```typescript
// ❌ INCORRECT
import { JobService } from "./service";

const jobService = new JobService();
jobService.init();  // Error if init is undefined

// ✅ CORRECT
import { JobService } from "./service";

const jobService = new JobService();
// Call init only if it exists
if (jobService.init && typeof jobService.init === 'function') {
  jobService.init();
}
```

**Automatic Fix:**
1. Check if module is imported correctly
2. Verify module has required methods
3. Fix initialization code
4. Check for circular dependencies

---

### Service Startup Recovery Workflow

**When Service Fails to Start:**

```
1. START SERVICE:
   npm run start &
   SERVICE_PID=$!

2. WAIT FOR STARTUP:
   sleep 5

3. CHECK PROCESS:
   ps -p $SERVICE_PID
   IF process exists → Service started successfully
   IF process doesn't exist → Proceed to recovery

4. CHECK ERROR LOGS:
   tail -50 logs/error.log
   Identify error type

5. APPLY FIX BASED ON ERROR TYPE:
   - Port in use → Kill process or change port
   - Missing env var → Add to .env
   - Database down → Suggest starting database
   - Module error → Fix import/initialization

6. RETRY STARTUP:
   npm run start &

7. IF STILL FAILING:
   Escalate to human developer with full error logs
```

---

## Test Failures

### Common Test Failures

#### Failure 1: Assertion Error

**Error Pattern:**
```javascript
● JobService › should create job
  expect(received).toBe(expected) // Expected: "success", Received: "error"
```

**Analysis:**
- **Cause:** Implementation doesn't match expected behavior
- **Impact:** Test fails, cannot proceed
- **Severity:** HIGH - Blocks workflow

**Recovery Steps:**
```typescript
// Test expects:
expect(result.status).toBe("success");

// But implementation returns:
if (error) {
  return { status: "error" };  // Wrong
}

// ✅ CORRECT
if (error) {
  return { status: "success" };  // Fixed logic
}
```

**Automatic Fix:**
1. Read the failing test
2. Identify expected vs actual behavior
3. Review implementation code
4. Fix implementation to match test expectation
5. Re-run test

---

#### Failure 2: Test Timeout

**Error Pattern:**
```javascript
● JobService › should create job
  Timeout - Async callback was not invoked within the 5000 ms timeout
```

**Analysis:**
- **Cause:** Async operation not completing
- **Impact:** Test hangs then fails
- **Severity:** MEDIUM - Test infrastructure issue

**Recovery Steps:**
```typescript
// ❌ INCORRECT - Missing await
it("should create job", async () => {
  const result = jobService.createJob(data);  // Missing await
  expect(result.status).toBe("success");
});

// ✅ CORRECT
it("should create job", async () => {
  const result = await jobService.createJob(data);  // Added await
  expect(result.status).toBe("success");
});
```

**Automatic Fix:**
1. Check for missing await in async operations
2. Verify promises are being returned
3. Fix async/await usage
4. Re-run test

---

#### Failure 3: Cannot Find Module

**Error Pattern:**
```javascript
● JobService › should create job
  Cannot find module './service' from './tests/job.test.ts'
```

**Analysis:**
- **Cause:** Incorrect import path in test file
- **Impact:** Test cannot run
- **Severity:** HIGH - Blocks tests

**Recovery Steps:**
```typescript
// ❌ INCORRECT
import { JobService } from './service';  // Wrong path

// ✅ CORRECT
import { JobService } from '../service';  // Correct relative path
```

**Automatic Fix:**
1. Check import path in test file
2. Correct relative path
3. Verify file exists
4. Re-run test

---

#### Failure 4: Mock Not Called

**Error Pattern:**
```javascript
● JobService › should create job
  expect(jest.fn()).toHaveBeenCalled()
  Expected number of calls: >= 1
  Received number of calls: 0
```

**Analysis:**
- **Cause:** Mock not configured correctly or test not calling function
- **Impact:** Test fails
- **Severity:** MEDIUM - Test setup issue

**Recovery Steps:**
```typescript
// ❌ INCORRECT
test("should create job", async () => {
  const mockFn = jest.fn();
  await jobService.createJob(data);
  expect(mockFn).toHaveBeenCalled();  // mockFn never called
});

// ✅ CORRECT - Fix implementation or test
test("should create job", async () => {
  const spy = jest.spyOn(jobRepository, 'create');
  await jobService.createJob(data);
  expect(spy).toHaveBeenCalled();  // Spied on actual method
});
```

**Automatic Fix:**
1. Check if function is actually being called
2. Verify mock/spy setup
3. Fix test or implementation
4. Re-run test

---

### Test Failure Recovery Workflow

**When Tests Fail:**

```
1. RUN TESTS:
   npm test
   Capture output

2. IDENTIFY FAILING TESTS:
   List all failing tests

3. FOR EACH FAILING TEST:
   a. Read error message
   b. Identify failure reason
   c. Check if it's implementation bug or test bug

4. IF IMPLEMENTATION BUG:
   a. Review implementation code
   b. Fix the bug
   c. Re-run test
   d. Verify test passes

5. IF TEST BUG:
   a. Review test code
   b. Fix test setup
   c. Re-run test
   d. Verify test passes

6. DO NOT:
   - Remove tests
   - Skip tests
   - Modify tests to pass incorrectly

7. IF ALL TESTS PASS:
   Continue to next phase

8. IF TESTS STILL FAILING:
   Escalate to human developer
```

---

## API Contract Issues

### Common API Contract Violations

#### Issue 1: Response Structure Mismatch

**Problem:** API response doesn't match expected format

**Expected Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "title": "Software Engineer"
  }
}
```

**Actual Response:**
```json
{
  "success": true,  // Wrong field name
  "job": {  // Wrong structure
    "id": 123,
    "title": "Software Engineer"
  }
}
```

**Analysis:**
- **Cause:** Inconsistent response format
- **Impact:** Breaking change for consumers
- **Severity:** HIGH - Breaks integration

**Recovery:**
```typescript
// ❌ INCORRECT
res.status(200).json({
  success: true,  // Wrong field
  job: data
});

// ✅ CORRECT
res.status(200).json({
  status: true,  // Correct field
  data: job
});
```

**Automatic Fix:**
1. Verify expected response format
2. Fix response structure in controller
3. Test endpoint manually
4. Verify response matches contract

---

#### Issue 2: Wrong Status Code

**Problem:** Incorrect HTTP status code returned

**Expected:** 201 Created
**Actual:** 200 OK

**Analysis:**
- **Cause:** Wrong status code in response
- **Impact:** API contract violation
- **Severity:** MEDIUM - Consumers expect correct codes

**Recovery:**
```typescript
// ❌ INCORRECT
res.status(200).json({ status: true, data: job });

// ✅ CORRECT
res.status(201).json({ status: true, data: job });
```

**Automatic Fix:**
1. Identify correct status code for operation:
   - POST (create): 201
   - GET: 200
   - PUT: 200
   - DELETE: 200
2. Fix status code in controller
3. Test endpoint manually

---

#### Issue 3: Missing Required Fields

**Problem:** Response missing expected fields

**Expected Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "title": "Job",
    "description": "Description",
    "location": "Remote"
  }
}
```

**Actual Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "title": "Job"
    // Missing: description, location
  }
}
```

**Analysis:**
- **Cause:** Incomplete data returned
- **Impact:** Breaking change for consumers
- **Severity:** HIGH - Missing data

**Recovery:**
```typescript
// ❌ INCORRECT
const result = {
  id: job.id,
  title: job.title
  // Missing fields
};

// ✅ CORRECT
const result = {
  id: job.id,
  title: job.title,
  description: job.description,
  location: job.location
};
```

**Automatic Fix:**
1. Identify all required fields
2. Ensure all fields included in response
3. Verify data completeness
4. Test endpoint manually

---

### API Contract Recovery Workflow

**When API Contract Issues Detected:**

```
1. IDENTIFY CONTRACT VIOLATION:
   - Check response format
   - Check status codes
   - Check required fields

2. VERIFY EXPECTED CONTRACT:
   - Review swagger.json
   - Review API documentation
   - Check existing responses

3. FIX IMPLEMENTATION:
   - Update response structure
   - Fix status codes
   - Add missing fields

4. TEST MANUALLY:
   curl -X POST http://localhost:3004/job-svc/job \
     -H "Content-Type: application/json" \
     -d '{"title": "Test"}'
   Verify response matches contract

5. VERIFY BACKWARD COMPATIBILITY:
   - Test with existing consumers
   - Ensure no breaking changes

6. IF BACKWARD INCOMPATIBLE:
   - Create new endpoint version (v2)
   - Maintain old version
   - Document migration path
```

---

## CI/CD Pipeline Failures

### Common CI Failures

#### Failure 1: Lint Errors

**Error Pattern:**
```yaml
CI Pipeline Stage: Lint
Status: Failed
Errors:
  - 5 errors found by ESLint
```

**Analysis:**
- **Cause:** Code doesn't meet linting standards
- **Impact:** CI pipeline fails
- **Severity:** MEDIUM - Code quality issue

**Recovery Steps:**
```bash
# Run linter locally
npm run lint

# View errors
npm run lint -- --format=verbose

# Auto-fix if possible
npm run lint -- --fix

# Manual fix if needed
# Fix specific linting errors

# Verify fix
npm run lint
```

**Common Linting Errors:**
- Unused imports
- Unused variables
- Inconsistent quotes
- Missing semicolons
- Trailing whitespace

**Automatic Fix:**
1. Run linter with --fix flag
2. Review auto-fixed changes
3. Manually fix remaining issues
4. Commit fixes
5. Push new commit to branch

---

#### Failure 2: Build Failures in CI

**Error Pattern:**
```yaml
CI Pipeline Stage: Build
Status: Failed
Errors:
  - TypeScript compilation failed
  - 15 type errors found
```

**Analysis:**
- **Cause:** Code doesn't compile in CI environment
- **Impact:** CI pipeline fails
- **Severity:** HIGH - Blocks deployment

**Recovery Steps:**
```bash
# Build locally in same environment
npm ci
npm run build

# Verify no errors
echo $?

# If build fails locally:
# Fix TypeScript errors
# Rebuild

# If build succeeds locally but fails in CI:
# Check for environment differences
# Check node version (use .nvmrc)
# Check for missing dependencies
```

**Automatic Fix:**
1. Reproduce build failure locally
2. Fix TypeScript errors
3. Verify build succeeds
4. Commit fixes
5. Push new commit to branch
6. Verify CI passes

---

#### Failure 3: Test Failures in CI

**Error Pattern:**
```yaml
CI Pipeline Stage: Test
Status: Failed
Errors:
  - 2 tests failing
  - Test timeout in CI environment
```

**Analysis:**
- **Cause:** Tests fail in CI but pass locally
- **Impact:** CI pipeline fails
- **Severity:** HIGH - Blocks deployment

**Possible Causes:**
- Environment differences
- Race conditions
- Time-dependent tests
- Database state differences

**Recovery Steps:**
```bash
# Run tests locally
npm test

# If tests pass locally but fail in CI:
# Check for environment-specific issues
# Check for time-dependent logic
# Check for database state issues

# Add retries for flaky tests
retry(times: 3, delay: 1000, async () => {
  await flakyTest();
});

# Fix timing issues
await waitForCondition();

# Commit fixes
```

**Automatic Fix:**
1. Identify why tests fail in CI
2. Fix test or implementation
3. Add retries if flaky
4. Commit fixes
5. Push new commit
6. Verify CI passes

---

#### Failure 4: Deployment Failures

**Error Pattern:**
```yaml
CI Pipeline Stage: Deploy
Status: Failed
Errors:
  - Deployment to staging failed
  - Container image not found
  - Health check timeout
```

**Analysis:**
- **Cause:** Deployment process fails
- **Impact:** Cannot deploy to staging/production
- **Severity:** HIGH - Blocks deployment

**Recovery Steps:**
```bash
# Check deployment logs
# Verify container image exists
# Check health endpoint

# If health check timeout:
# Ensure service starts properly
# Increase timeout if needed
# Fix startup issues

# Re-deploy after fix
```

**Automatic Fix:**
1. Review deployment logs
2. Identify deployment failure reason
3. Fix configuration or code
4. Commit fixes
5. Push new commit
6. Trigger new deployment

---

### CI/CD Recovery Workflow

**When CI Pipeline Fails:**

```
1. CHECK CI STATUS:
   Azure DevOps or GitHub Actions

2. IDENTIFY FAILED STAGE:
   - Lint
   - Build
   - Test
   - Deploy

3. REPRODUCE LOCALLY:
   Run same commands that CI runs

4. FIX THE ISSUE:
   - Lint errors: Run lint --fix, fix remaining
   - Build errors: Fix TypeScript errors
   - Test errors: Fix tests or implementation
   - Deploy errors: Fix deployment configuration

5. VERIFY FIX:
   Run checks again locally

6. COMMIT AND PUSH:
   git commit -m "fix: resolve CI failures"
   git push origin feature-branch

7. VERIFY CI PASSES:
   Wait for new CI run
   Verify all stages pass
```

---

## Pull Request Merge Conflicts

### Common Conflict Scenarios

#### Conflict 1: Diverged Branch History

**Error Pattern:**
```bash
git merge main
Auto-merging file.ts
CONFLICT (content): Merge conflict in file.ts
Automatic merge failed; fix conflicts and then commit the result.
```

**Analysis:**
- **Cause:** Base branch has new commits that conflict with feature branch
- **Impact:** Cannot merge PR
- **Severity:** HIGH - Blocks PR completion

**Recovery Steps:**

```bash
# 1. Fetch latest changes
git fetch origin main

# 2. Rebase feature branch onto main
git checkout feature/HARBOR-123-add-job-filter
git rebase origin/main

# 3. Resolve conflicts
# Open conflicted files
# Look for conflict markers: <<<<<<<, =======, >>>>>>

# 4. For each conflict:
# a. Understand both sets of changes
# b. Decide which to keep or merge both
# c. Remove conflict markers

# Example conflict resolution:
<<<<<<< HEAD
const newField = "feature";
=======
const existingField = "main";
>>>>>>> origin/main

# Resolve to:
const newField = "feature";
const existingField = "main";  // Keep both if appropriate

# 5. Mark conflicts as resolved
git add <resolved-files>

# 6. Continue rebase
git rebase --continue

# 7. If rebase successful, force push
git push --force-with-lease origin feature/HARBOR-123-add-job-filter
```

**Automatic Fix:**
1. Identify conflicted files
2. For each conflict:
   - Read both versions
   - Merge appropriately
   - Remove conflict markers
3. Stage resolved files
4. Complete rebase
5. Push updated branch

---

#### Conflict 2: Dependency Version Conflicts

**Error Pattern:**
```bash
npm install
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Analysis:**
- **Cause:** package.json conflicts with latest main
- **Impact:** Cannot install dependencies
- **Severity:** HIGH - Blocks build

**Recovery Steps:**

```bash
# 1. Check package.json changes
git diff main package.json

# 2. Resolve dependency conflicts
# Check if dependencies were updated in main
# Merge dependencies appropriately

# 3. Delete node_modules and package-lock.json
rm -rf node_modules
rm package-lock.json

# 4. Reinstall dependencies
npm install

# 5. Rebuild
npm run build

# 6. Commit resolved dependencies
git add package.json package-lock.json
git commit -m "fix: resolve dependency conflicts"
```

**Automatic Fix:**
1. Identify dependency conflicts
2. Merge package.json appropriately
3. Update lock file
4. Reinstall dependencies
5. Commit resolution

---

### Merge Conflict Recovery Workflow

**When Merge Conflicts Occur:**

```
1. ATTEMPT AUTOMATED MERGE:
   git merge main
   git rebase origin/main

2. IF CONFLICTS DETECTED:
   List all conflicted files

3. FOR EACH CONFLICTED FILE:
   a. Read both versions (HEAD and incoming)
   b. Understand the changes
   c. Merge changes appropriately
   d. Remove conflict markers
   e. Test that code compiles
   f. Stage resolved file

4. COMPLETE MERGE/REBASE:
   git add <resolved-files>
   git rebase --continue
   (or git commit for merge)

5. IF CONFLICTS RESOLVED:
   Force push branch
   git push --force-with-lease origin feature-branch

6. IF CONFLICTS CANNOT BE RESOLVED:
   Abort merge/rebase
   git rebase --abort
   (or git merge --abort)

7. ESCALATE TO HUMAN:
   Provide conflict details
   Explain both sides of conflict
   Suggest resolution approach
```

---

## Retry Strategy

### Automatic Retry Guidelines

**Harbor-AI should automatically retry:**

#### Retry Immediately (Transient Errors):
- Network timeouts (retry once)
- File system temporary errors (retry once)
- Port temporarily occupied (kill process, retry)

#### Retry with Fixes (Fixable Errors):
- TypeScript compilation errors (fix, retry)
- Lint errors (auto-fix, retry)
- Missing imports (add import, retry)
- Syntax errors (fix, retry)

#### Do Not Retry (Requires Manual Intervention):
- Logic errors (require analysis)
- Business rule violations (require clarification)
- Database schema errors (require migration)
- API contract changes (require coordination)

---

### Retry Limits

**Maximum Retry Attempts:**
- **TypeScript Compilation:** 3 attempts
- **Service Startup:** 3 attempts
- **Test Execution:** 3 attempts
- **CI/CD Pipeline:** 1 attempt (then escalate)

**Backoff Strategy:**
- Wait 5 seconds between retry attempts
- Apply fixes before retrying
- Log each retry attempt

---

### Retry Workflow

```
1. FIRST ATTEMPT:
   Execute operation
   IF success → Continue workflow
   IF failure → Proceed to step 2

2. ANALYZE FAILURE:
   Identify error type
   Check if auto-fixable

3. IF AUTO-FIXABLE:
   Apply automatic fix
   Proceed to step 4

4. IF NOT AUTO-FIXABLE:
   Escalate to human

5. RETRY OPERATION:
   Execute operation again
   IF success → Continue workflow
   IF failure → Increment retry count

6. CHECK RETRY COUNT:
   IF retry count < max:
     Go back to step 2
   ELSE:
     Escalate to human with full error history
```

---

## Escalation Procedures

### When to Escalate

**Harbor-AI MUST escalate to human developer when:**

1. **Unresolvable Compilation Errors**
   - TypeScript errors that cannot be fixed automatically
   - Complex type errors requiring design decisions
   - Circular dependencies that cannot be resolved

2. **Ambiguous Requirements**
   - Unclear business logic
   - Conflicting requirements
   - Missing information

3. **Architecture Decisions**
   - Service boundary violations
   - Major refactoring needs
   - Breaking changes that affect multiple services

4. **Test Failures That Cannot Be Fixed**
   - Test requirements unclear
   - Contradictory test expectations
   - Test infrastructure issues

5. **Merge Conflicts That Cannot Be Resolved**
   - Complex conflicts requiring business logic decisions
   - Conflicts in multiple files
   - Conflicts that require understanding of intent

---

### Escalation Template

**When escalating, Harbor-AI must provide:**

```markdown
# Escalation Request

## Error Summary
**Phase:** [Execution/Testing/PR Creation]
**Severity:** [Critical/High/Medium/Low]
**Retry Attempts:** [number]

## Error Details
**Error Type:** [TypeScript/Runtime/Test/etc]
**Error Message:**
\`\`
[FULL ERROR OUTPUT]
\`\`

**File:** [file path]
**Line:** [line number]
**Function:** [function name]

## Context
**Task:** [Task being performed]
**Command:** [Command that failed]
**Working Directory:** [directory]

## Attempted Fixes
1. [Fix attempt 1]
2. [Fix attempt 2]
3. [Fix attempt 3]

## Why Escalating
[Reason why auto-recovery failed]

## Suggested Actions
[What human developer should do]

## Additional Information
[Logs, screenshots, or other context]
```

---

### Escalation Contact Points

**Depending on the severity and type:**

1. **For Technical Issues:**
   - Senior Developer
   - Tech Lead

2. **For Business Logic Issues:**
   - Product Owner
   - Business Analyst

3. **For Architecture Issues:**
   - System Architect
   - Engineering Manager

4. **For CI/CD Issues:**
   - DevOps Engineer
   - Infrastructure Team

---

## Recovery Checklist

### Pre-Recovery Checklist

**Before attempting recovery:**
- [ ] Error captured completely
- [ ] Error type identified
- [ ] Error location identified
- [ ] Root cause analyzed
- [ ] Impact assessed

### During Recovery Checklist

**While attempting recovery:**
- [ ] Automatic fix attempted (if applicable)
- [ ] Fix verified
- [ ] Changes committed
- [ ] Build re-run
- [ ] Tests re-run
- [ ] Service restarted

### Post-Recovery Checklist

**After successful recovery:**
- [ ] Original error resolved
- [ ] No new errors introduced
- [ ] Build succeeds
- [ ] Tests pass
- [ ] Service runs without errors
- [ ] Workflow can continue

### Post-Escalation Checklist

**After escalating to human:**
- [ ] Escalation submitted with complete details
- [ ] Error context provided
- [ ] Attempted fixes documented
- [ ] Suggested actions provided
- [ ] Workflow paused awaiting human intervention

---

## Recovery Best Practices

### 1. Log Everything

**Harbor-AI MUST:**
- Log all errors with full context
- Log all attempted fixes
- Log all retry attempts
- Log final resolution

**Example:**
```markdown
## Error Log

**Timestamp:** 2025-03-06 10:30:00
**Error:** TypeScript compilation failed
**File:** controllers/job.ts
**Line:** 45
**Message:** Property 'createJob' does not exist on type 'JobController'

**Fix Attempt 1:**
Added createJob method to JobController class
Result: Still failing

**Fix Attempt 2:**
Verified method inside export
Result: SUCCESS - Compilation succeeded

**Resolution:**
Method was incorrectly placed outside export. Moved inside class export.
```

---

### 2. Verify Fixes Thoroughly

**After Applying Fix:**
```bash
# 1. Clean build
rm -rf dist/
npm run build

# 2. Verify no errors
echo $?
# Expected: 0

# 3. Start service
npm run start &
SERVICE_PID=$!
sleep 5

# 4. Test service
curl http://localhost:3004/job-svc/health-check

# 5. Stop service
kill $SERVICE_PID
```

---

### 3. Document Learnings

**After Resolving Issue:**
- Document what went wrong
- Document how it was fixed
- Document how to prevent in future
- Update coding-rules.md if needed

---

### 4. Maintain State

**During Recovery:**
- Keep track of retry attempts
- Keep track of applied fixes
- Keep track of rollback points
- Keep track of working state

---

## Recovery Decision Tree

```
                    ┌─────────────────┐
                    │   Error Detected │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │    Can Auto-Fix?     │
                └────────────┬────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                 YES                 NO
                    │                 │
         ┌──────────▼──────────┐   ┌───▼────────────┐
         │  Apply Fix         │   │  Can Fix Manually?│
         │  Retry Operation   │   └───┬────────────┘
         └──────────┬──────────┘      │
                    │           ┌────┴────┐
                    │           │         │
            ┌───────▼───────┐   YES        NO
            │ Success?      │   │         │
            └───────┬───────┘   │         │
                │           │         │
           ┌────┴────┐     │    ┌────▼────┐
           │        │     │    │         │
          YES       NO    │    │    ┌────▼────┐
           │        │     │    │    │  Escalate│
           │        │     └────┘    │  to Human │
    ┌───────▼───────▼────┐        └─────────┘
    │  Continue Workflow│
    │  Log Resolution  │
    └──────────────────┘
```

---

**END OF FAILURE RECOVERY PROTOCOL**

---

*For questions or issues related to failure recovery, refer to:*
- `harbor-ai/execution.md` - Execution phase error handling
- `harbor-ai/testing.md` - Testing validation
- `harbor-ai/pr.md` - Pull request issues
- `harbor-ai/service-dependency-map.md` - Service dependency issues
*This document ensures Harbor-AI can recover from failures and continue development workflow.*