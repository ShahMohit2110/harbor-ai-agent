# Harbor AI - Testing Protocol

**Document Version:** 1.0.0
**Last Updated:** 2025-03-06
**Owner:** Harbor AI Development Team

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Prerequisites](#prerequisites)
3. [Testing Workflow](#testing-workflow)
4. [Test Categories](#test-categories)
5. [Test Summary Output](#test-summary-output)
6. [Critical Testing Rules](#critical-testing-rules)
7. [Automated Fix Guidelines](#automated-fix-guidelines)
8. [Common Testing Scenarios](#common-testing-scenarios)
9. [Issue Severity Classification](#issue-severity-classification)
10. [Testing Troubleshooting](#testing-troubleshooting)
11. [Quick Reference Checklist](#quick-reference-checklist)

---

## Purpose and Scope

This document defines the **standard testing protocol** that Harbor-AI must follow after implementing code changes and before creating a pull request.

### Objectives

- Ensure all implemented changes are verified and safe
- Validate that new functionality meets requirements from `planning.md`
- Confirm existing functionality is not broken
- Identify and fix issues before pull request creation
- Provide clear documentation of testing results

### When to Use This Protocol

**This protocol MUST be used after:**
- Completing any implementation task defined in `execution.md`
- Modifying existing functionality
- Adding new features or API endpoints
- Fixing bugs
- Making database schema changes
- Implementing event/queue handlers

**This protocol must be completed BEFORE:**
- Creating a pull request
- Merging changes to main branch
- Deploying to any environment

### Testing Philosophy

The Harbor AI testing approach follows these principles:

1. **Test Only What Changed** - Focus testing on affected services and components
2. **Preserve Existing Functionality** - Ensure backward compatibility
3. **Fail Fast** - Identify critical issues early
4. **Automate When Possible** - Fix small issues automatically
5. **Document Everything** - Provide clear test results and summaries

---

## Prerequisites

### Mandatory Pre-Testing Reading

**Before starting testing, Harbor-AI MUST have:**

#### 1. Completed Execution Phase
- All code changes implemented according to `execution.md`
- Execution summary document available
- All build errors resolved
- Service compiles successfully

#### 2. Access to Documentation
- `harbor-ai/planning.md` - To understand requirements and success criteria
- `harbor-ai/execution.md` - To review what was implemented
- `harbor-ai/service-map.md` - To identify affected services
- `harbor-ai/coding-rules.md` - To verify code quality standards

#### 3. Understanding of Changes
- List of files created
- List of files modified
- APIs added or modified
- Database changes made
- Event/queue changes implemented

**Verification Checkpoint:**
- [ ] Execution phase completed successfully
- [ ] Service builds without errors
- [ ] Execution summary available
- [ ] Test environment ready
- [ ] Required dependencies installed

---

## Testing Workflow

### Step 1: Understand the Implemented Changes

#### 1.1 Review Execution Results

**Read the Execution Summary:**
```markdown
# Example Execution Summary
**Task:** Add job creation endpoint to harborJobSvc
**Files Created:** 5
**Files Modified:** 3
**APIs Added:** POST /jobs, GET /jobs/:id
**Database Changes:** Created jobs table
```

**Extract Key Information:**
- **Primary Service:** Which service was mainly modified?
- **Secondary Services:** Which services had supporting changes?
- **Impact Level:** High/Medium/Low
- **Change Types:** API, Database, Events, Configuration

#### 1.2 Identify Files Created/Modified

**List All New Files:**
```markdown
**Created Files:**
- harborJobSvc/controllers/jobController.ts
- harborJobSvc/services/jobService.ts
- harborJobSvc/repositories/jobRepository.ts
- harborJobSvc/routes/jobRoutes.ts
- harborJobSvc/validators/jobValidators.ts
- harborJobSvc/tests/services/jobService.test.ts
- harborJobSvc/tests/api/jobApi.test.ts
```

**List All Modified Files:**
```markdown
**Modified Files:**
- harborJobSvc/models/Job.ts
- harborJobSvc/app.ts
- harborJobSvc/package.json
- harborNotificationSvc/handlers/eventHandlers.ts
```

#### 1.3 Identify Affected Services

**Create Service Impact Table:**

| Service | Type | Impact | Testing Required |
|---------|------|--------|------------------|
| harborJobSvc | Primary | High | Full testing required |
| harborNotificationSvc | Secondary | Low | Event handler testing |
| harborUserSvc | Tertiary | Minimal | No testing required |

**Determine Testing Scope:**
- **Full Testing:** Primary service with high impact
- **Focused Testing:** Secondary service with specific changes
- **Validation Only:** Services with minimal or no changes

**Output of Step 1:** Clear understanding of what was changed and which services need testing.

---

### Step 2: Build Verification

#### 2.1 TypeScript Compilation Check

**Navigate to Affected Service:**
```bash
cd harborJobSvc
```

**Run TypeScript Compiler:**
```bash
# Check for compilation errors
npx tsc --noEmit

# Expected output:
# (no errors)
```

**Verify Compilation Success:**
- [ ] No TypeScript errors
- [ ] No type errors
- [ ] No missing imports
- [ ] All files compiled successfully

#### 2.2 Build Process Verification

**Run Build Command:**
```bash
# Clean build
npm run build

# Expected output:
# ✓ Compiling TypeScript
# ✓ Building dist directory
# ✓ Build completed successfully
```

**Verify Build Artifacts:**
```bash
# Check dist directory exists
ls -la dist/

# Expected files:
# - controllers/jobController.js
# - services/jobService.js
# - repositories/jobRepository.js
# - routes/jobRoutes.js
# - validators/jobValidators.js
# - app.js
# - server.js
```

**Check for Build Warnings:**
```bash
# Review build output for warnings
npm run build 2>&1 | grep -i warning

# Expected: No warnings or only acceptable warnings
```

#### 2.3 Dependency Resolution Check

**Verify All Dependencies Installed:**
```bash
# Check package.json
cat package.json | grep dependencies

# Verify node_modules
ls -la node_modules/ | grep express
ls -la node_modules/ | grep sequelize

# All dependencies should be present
```

**Check for Missing Dependencies:**
```bash
# If any import errors occurred
npm install

# Re-run build
npm run build
```

**Output of Step 2:** Confirmation that the service compiles successfully, all dependencies are resolved, and build completes without errors.

---

### Step 3: Service Startup Check

#### 3.1 Environment Configuration

**Verify Environment Variables:**
```bash
# Check .env file exists
ls -la .env

# Verify required variables
cat .env | grep DB_URL
cat .env | grep REDIS_URL
cat .env | grep PORT
```

**Set Environment Variables (if needed):**
```bash
# Copy example file
cp .env.example .env

# Edit with appropriate values
nano .env
```

#### 3.2 Database Connection Verification

**Test Database Connection:**
```bash
# Run database connection test (if available)
npm run test:db

# Or check connection manually
npm run start

# Look for log messages:
# ✓ Database connected successfully
# ✓ Tables synchronized
```

**Verify Database Migrations:**
```bash
# Run pending migrations
npm run migrate

# Expected output:
# ✓ Running migration: create_jobs_table
# ✓ Migration completed successfully
```

#### 3.3 Service Startup Test

**Start the Service:**
```bash
# Development mode
npm run dev

# Or production mode
npm run start

# Expected output:
# ✓ Server listening on port 3001
# ✓ Database connected
# ✓ Redis connected
# ✓ Message queue connected
# ✓ Service ready
```

**Monitor for Startup Errors:**
```bash
# Watch logs for errors
npm run dev 2>&1 | grep -i error

# Expected: No error messages in startup logs
```

**Verify Service Health:**
```bash
# Test health endpoint in another terminal
curl http://localhost:3001/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-03-06T10:00:00.000Z",
  "uptime": 5.234
}
```

#### 3.4 Port Availability Check

**Verify Port is Available:**
```bash
# Check if port is in use
lsof -i :3001

# If port is occupied, either:
# 1. Kill the process: kill -9 <PID>
# 2. Change port in .env file
```

**Test Service Accessibility:**
```bash
# Test that service responds
curl -I http://localhost:3001

# Expected: HTTP/1.1 200 OK
```

**Output of Step 3:** Confirmation that the service starts successfully, connects to required resources, and responds to health checks.

---

### Step 4: API Validation

#### 4.1 New API Pattern Verification

**If New APIs Were Added:**

**Check Route Registration:**
```typescript
// Verify routes are registered in app.ts
app.use('/api/jobs', jobRoutes);

// Verify route exists
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
```

**Verify Controller Methods Exist:**
```typescript
// Check controller exports
export const jobController = {
  async createJob(req: Request, res: Response) {
    // Implementation
  },
  async getJobById(req: Request, res: Response) {
    // Implementation
  }
};
```

**Validate Route Pattern:**
```bash
# List all routes (if route listing is available)
npm run list:routes

# Or check manually in routes directory
cat routes/jobRoutes.ts
```

#### 4.2 Request Structure Validation

**Verify Request Validation:**
```typescript
// Check validation middleware is used
router.post(
  '/jobs',
  validateRequest(createJobSchema),  // ✓ Validation present
  authenticateToken,                   // ✓ Auth present
  jobController.createJob
);
```

**Test Validation Schema:**
```typescript
// Verify validation rules exist
export const createJobSchema = {
  title: {
    in: ['body'],
    isString: true,
    isLength: { min: 5, max: 200 },
    errorMessage: 'Title must be between 5 and 200 characters'
  },
  description: {
    in: ['body'],
    isString: true,
    notEmpty: true
  }
};
```

#### 4.3 Response Structure Validation

**Verify Response Format:**
```typescript
// Check response follows standard format
return res.status(201).json({
  success: true,
  data: job,
  message: 'Job created successfully'
});
```

**Test Response Structure:**
```bash
# Test endpoint
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Software Engineer",
    "description": "Build great software"
  }'

# Expected response structure:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Software Engineer",
    "status": "active"
  },
  "message": "Job created successfully"
}
```

#### 4.4 HTTP Method and Status Code Verification

**Verify Correct HTTP Methods:**
- POST for creation
- GET for retrieval
- PUT/PATCH for updates
- DELETE for deletion

**Verify Correct Status Codes:**
```bash
# Test success case
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test"}'

# Expected: 201 Created

# Test validation error
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title": ""}'

# Expected: 400 Bad Request

# Test not found
curl -X GET http://localhost:3001/api/jobs/non-existent-id

# Expected: 404 Not Found
```

#### 4.5 Authentication/Authorization Check

**If API Requires Authentication:**
```bash
# Test without token
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'

# Expected: 401 Unauthorized

# Test with invalid token
curl -X POST http://localhost:3001/api/jobs \
  -H "Authorization: Bearer invalid_token" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'

# Expected: 401 Unauthorized or 403 Forbidden

# Test with valid token
curl -X POST http://localhost:3001/api/jobs \
  -H "Authorization: Bearer VALID_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'

# Expected: 201 Created or 400 Bad Request (if data invalid)
```

**Output of Step 4:** Confirmation that new APIs follow existing patterns, request/response structures are correct, and authentication works as expected.

---

### Step 5: Backward Compatibility Check

#### 5.1 Existing API Functionality Test

**Test Existing Endpoints:**
```bash
# Test GET endpoint (should still work)
curl -X GET http://localhost:3001/api/jobs

# Expected: 200 OK with existing data

# Test other existing endpoints
curl -X GET http://localhost:3001/api/jobs/valid-id
curl -X PUT http://localhost:3001/api/jobs/valid-id
```

**Verify No Breaking Changes:**
- Existing endpoints return expected responses
- Response structure hasn't changed
- Status codes remain consistent
- No required fields were removed

#### 5.2 Database Schema Compatibility

**Verify Existing Data:**
```bash
# Connect to database
psql -U user -d harbor_db

# Check existing table structure
\d jobs

# Verify existing data is accessible
SELECT * FROM jobs LIMIT 5;
```

**Test Migration Compatibility:**
```bash
# If migration was added, verify it doesn't break existing data
npm run migrate:up

# Check data integrity
SELECT COUNT(*) FROM jobs;
```

#### 5.3 Event/Queue Compatibility

**If Events Were Modified:**
```bash
# Verify existing event publishers still work
# Check logs for published events
tail -f logs/combined.log | grep "event.published"

# Verify existing event subscribers still receive events
tail -f logs/combined.log | grep "event.received"
```

**Test Event Payload Structure:**
```json
// Verify event payload hasn't changed
{
  "eventId": "evt_123",
  "eventType": "job.created",
  "timestamp": "2025-03-06T10:00:00.000Z",
  "data": {
    "jobId": "uuid",
    "employerId": "uuid"
  }
}
```

#### 5.4 Client Integration Test

**If Changes Affect API Contracts:**
```bash
# Test with sample client requests
# Use Postman collection or test scripts

# Verify client can still:
# - Authenticate
# - Create resources
# - Read resources
# - Update resources
# - Delete resources
```

**Output of Step 5:** Confirmation that existing functionality remains intact and no breaking changes were introduced.

---

### Step 6: Logical Validation

#### 6.1 Requirement Verification

**Review Planning Document:**
```markdown
# From planning.md
**Requirement:** Users must be able to create job postings with title, description, and skills

**Success Criteria:**
- Job is saved to database
- Job ID is returned
- Job status is set to "active"
- Event is published
```

**Verify Each Requirement:**
```bash
# Test job creation
curl -X POST http://localhost:3001/api/jobs \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Engineer",
    "description": "Build great software",
    "skills": ["JavaScript", "TypeScript"]
  }'

# Verify response
{
  "success": true,
  "data": {
    "id": "uuid",  // ✓ Job ID returned
    "status": "active"  // ✓ Status is active
  }
}

# Verify database
psql -c "SELECT * FROM jobs WHERE id = 'returned_uuid';"
# ✓ Record exists

# Verify event published
tail -f logs/combined.log | grep "job.created"
# ✓ Event published
```

#### 6.2 Edge Case Testing

**Test Boundary Conditions:**
```bash
# Test empty title
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "", "description": "Test"}'

# Expected: 400 Bad Request

# Test very long title
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "A very long title that exceeds maximum length...", "description": "Test"}'

# Expected: 400 Bad Request

# Test missing required fields
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test"}'

# Expected: 400 Bad Request (description missing)
```

**Test Null/Invalid Values:**
```bash
# Test null values
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": null, "description": "Test"}'

# Expected: 400 Bad Request

# Test invalid data types
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": 123}'

# Expected: 400 Bad Request
```

**Test Duplicate Cases:**
```bash
# Create job with same data
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Create again (if duplicates should be prevented)
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Expected: Either allows duplicates or returns 409 Conflict
```

#### 6.3 Business Logic Validation

**Verify Business Rules:**
```typescript
// Example: Employer cannot create more than 10 active jobs
// Test creating 11th job
for i in {1..11}; do
  curl -X POST http://localhost:3001/api/jobs \
    -d "{\"title\": \"Job $i\", \"description\": \"Description $i\"}"
done

# Expected: First 10 succeed, 11th returns 400 or 403
```

**Verify State Transitions:**
```bash
# Test status transitions
# Create job
JOB_ID=$(curl -s -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}' \
  | jq -r '.data.id')

# Update to inactive
curl -X PUT http://localhost:3001/api/jobs/$JOB_ID \
  -d '{"status": "inactive"}'

# Expected: 200 OK

# Try to update to invalid status
curl -X PUT http://localhost:3001/api/jobs/$JOB_ID \
  -d '{"status": "invalid_status"}'

# Expected: 400 Bad Request
```

#### 6.4 Data Integrity Validation

**Verify Foreign Key Constraints:**
```bash
# Test creating job with non-existent employer
curl -X POST http://localhost:3001/api/jobs \
  -H "Authorization: Bearer TOKEN_WITH_INVALID_EMPLOYER_ID" \
  -d '{"title": "Test", "description": "Test"}'

# Expected: 400 Bad Request or 404 Not Found
```

**Verify Data Consistency:**
```bash
# Create job
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Verify in database
psql -c "SELECT * FROM jobs WHERE title = 'Test';"
# ✓ Record exists with correct data

# Verify no orphaned records
psql -c "SELECT * FROM job_skills WHERE job_id NOT IN (SELECT id FROM jobs);"
# ✓ No orphaned records
```

**Output of Step 6:** Confirmation that implementation meets all requirements, handles edge cases properly, and maintains data integrity.

---

### Step 7: Dependency Safety

#### 7.1 Service-to-Service Communication

**If Changes Affect Other Services:**

**Test API Calls to Other Services:**
```typescript
// Example: Job Service calling User Service
// Verify User Service is accessible
const userResponse = await axios.get(
  `${process.env.USER_SERVICE_URL}/users/${userId}`
);

// Expected: 200 OK with user data
```

**Test Error Handling:**
```bash
# Stop User Service
# (simulating service unavailability)

# Try creating job
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Expected: 503 Service Unavailable or graceful degradation
# Job should not be created if user validation fails
```

#### 7.2 Event Publisher/Subscriber Safety

**Test Event Publishing:**
```bash
# Trigger event publisher
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Verify event was published
tail -f logs/combined.log | grep "job.created"

# Expected: Log entry showing event published
```

**Test Event Subscription:**
```bash
# Verify subscriber receives event
# In Notification Service logs
tail -f harborNotificationSvc/logs/combined.log | grep "job.created"

# Expected: Log entry showing event received and processed
```

**Test Event Payload Structure:**
```json
// Verify payload contains all required fields
{
  "eventId": "evt_123",
  "eventType": "job.created",
  "timestamp": "2025-03-06T10:00:00.000Z",
  "data": {
    "jobId": "uuid",
    "employerId": "uuid",
    "title": "Software Engineer"
    // ✓ All required fields present
  }
}
```

#### 7.3 Database Connection Safety

**Test Database Connection Recovery:**
```bash
# Stop database
# (simulate database outage)

# Try creating job
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Expected: 503 Service Unavailable or appropriate error

# Restart database
# Service should reconnect automatically

# Try again
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Expected: 201 Created (service recovered)
```

#### 7.4 External API Safety

**If Calling External APIs:**
```bash
# Test with external API down
# (simulate external service outage)

# Verify graceful error handling
# Expected: Appropriate error message, no crash

# Test with slow external API
# (simulate slow response)

# Verify timeout handling
# Expected: Request times out gracefully
```

**Output of Step 7:** Confirmation that changes don't break interactions with other services, events work correctly, and system handles failures gracefully.

---

### Step 8: Code Quality Validation

#### 8.1 Unused Code Detection

**Check for Unused Imports:**
```bash
# Run linter
npm run lint

# Look for unused import warnings
# Example:
# warning: 'validateUser' is defined but never used

# Expected: No unused import warnings
```

**Check for Unused Variables:**
```typescript
// Review code for unused variables
// ❌ INCORRECT: Unused variable
async function createJob(jobData: CreateJobDTO) {
  const unusedVar = "this is never used";
  return await Job.create(jobData);
}

// ✅ CORRECT: No unused variables
async function createJob(jobData: CreateJobDTO) {
  return await Job.create(jobData);
}
```

**Remove Commented-Out Code:**
```typescript
// ❌ INCORRECT: Commented-out code
// async function oldMethod() {
//   // Old implementation
// }

// ✅ CORRECT: Remove commented code
async function newMethod() {
  // Current implementation
}
```

#### 8.2 Coding Standards Compliance

**Verify coding-rules.md Compliance:**

**Check Controller-Service-Repository Pattern:**
```typescript
// ✅ CORRECT: Proper separation
export const jobController = {
  async createJob(req: Request, res: Response) {
    const job = await jobService.createJob(req.body);
    return res.status(201).json({ success: true, data: job });
  }
};

export const jobService = {
  async createJob(jobData: CreateJobDTO) {
    return await jobRepository.create(jobData);
  }
};

export const jobRepository = {
  async create(data: CreateJobDTO) {
    return await Job.create(data);
  }
};
```

**Check Error Handling:**
```typescript
// ✅ CORRECT: Proper error handling
export const jobController = {
  async createJob(req: Request, res: Response) {
    try {
      const job = await jobService.createJob(req.body);
      return res.status(201).json({ success: true, data: job });
    } catch (error) {
      logger.error('Failed to create job', { error });
      return res.status(500).json({
        success: false,
        error: 'Failed to create job'
      });
    }
  }
};
```

**Check Response Format:**
```typescript
// ✅ CORRECT: Standard response format
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}

// ✅ CORRECT: Standard error format
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [ /* specific errors */ ]
  }
}
```

#### 8.3 Code Structure Verification

**Verify Directory Structure:**
```
harborJobSvc/
├── controllers/
│   └── jobController.ts ✓
├── services/
│   └── jobService.ts ✓
├── repositories/
│   └── jobRepository.ts ✓
├── routes/
│   └── jobRoutes.ts ✓
├── validators/
│   └── jobValidators.ts ✓
├── models/
│   └── Job.ts ✓
└── tests/
    ├── services/
    │   └── jobService.test.ts ✓
    └── api/
        └── jobApi.test.ts ✓
```

**Verify File Naming Conventions:**
- Controllers: `*Controller.ts`
- Services: `*Service.ts`
- Repositories: `*Repository.ts`
- Routes: `*Routes.ts`
- Validators: `*Validators.ts`
- Models: PascalCase (e.g., `Job.ts`)

#### 8.4 Import Organization

**Verify Import Order:**
```typescript
// ✅ CORRECT: Proper import order
// 1. Node.js built-ins
import { Request, Response, NextFunction } from 'express';

// 2. External packages
import { DataTypes, Model } from 'sequelize';

// 3. Internal modules
import { Job } from '../models/Job';
import { validateRequest } from '../middleware/validation';
import { jobService } from '../services/jobService';
```

**Check for Circular Dependencies:**
```bash
# Run circular dependency check (if tool available)
npm run check:circular

# Expected: No circular dependencies found
```

**Output of Step 8:** Confirmation that code is clean, follows standards, and has no quality issues.

---

### Step 9: Error Handling Verification

#### 9.1 Error Response Format Check

**Verify Standard Error Format:**
```bash
# Trigger an error
curl -X POST http://localhost:3001/api/jobs \
  -d '{"invalid": "data"}'

# Expected error response:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      },
      {
        "field": "description",
        "message": "Description is required"
      }
    ]
  }
}
```

#### 9.2 Try-Catch Block Verification

**Check All Async Operations:**
```typescript
// ✅ CORRECT: All async operations wrapped
async function createJob(jobData: CreateJobDTO) {
  try {
    const job = await Job.create(jobData);
    await messageQueue.publish('job.created', { jobId: job.id });
    return job;
  } catch (error) {
    logger.error('Failed to create job', { error, jobData });
    throw new Error('Job creation failed');
  }
}
```

**Check Error Logging:**
```bash
# Trigger an error and check logs
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": ""}'

# Check error logs
tail -f logs/error.log

# Expected: Detailed error log with context
```

#### 9.3 Graceful Degradation

**Test Service Unavailability:**
```bash
# Stop dependent service
# (e.g., User Service)

# Try operation
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'

# Expected: Graceful error, not crash
{
  "success": false,
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "User service is unavailable. Please try again later."
  }
}
```

**Test Database Errors:**
```bash
# Trigger database error
# (e.g., violate unique constraint)

curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Duplicate", "description": "Test"}'
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Duplicate", "description": "Test"}'

# Expected: Appropriate error, not crash
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ENTRY",
    "message": "A job with this title already exists"
  }
}
```

#### 9.4 Input Validation Errors

**Test Validation Error Handling:**
```bash
# Test missing required field
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test"}'
# Missing description

# Expected: Clear validation error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "description",
        "message": "Description is required"
      }
    ]
  }
}
```

**Test Type Validation:**
```bash
# Test invalid type
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": 123, "description": "Test"}'
# Title should be string, not number

# Expected: Validation error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title must be a string"
      }
    ]
  }
}
```

**Output of Step 9:** Confirmation that all errors are handled properly, responses follow standard format, and system degrades gracefully.

---

### Step 10: Final Validation Before PR

#### 10.1 Comprehensive Build Check

**Clean Build:**
```bash
# Remove build artifacts
rm -rf dist/

# Rebuild
npm run build

# Verify success
echo $?
# Expected: 0
```

**Verify All Files Compiled:**
```bash
# Check dist directory
ls -la dist/

# Expected: All .ts files compiled to .js
# - controllers/jobController.js
# - services/jobService.js
# - repositories/jobRepository.js
# - etc.
```

#### 10.2 Service Runtime Verification

**Start Service:**
```bash
# Start in background
npm run start &

# Save PID
SERVICE_PID=$!

# Wait for startup
sleep 5
```

**Verify Service Health:**
```bash
# Check health endpoint
curl http://localhost:3001/health

# Expected:
{
  "status": "healthy",
  "timestamp": "2025-03-06T10:00:00.000Z",
  "uptime": 5.234
}
```

**Verify No Runtime Errors:**
```bash
# Check logs for errors
tail -100 logs/combined.log | grep -i error

# Expected: No error messages

# Or check error log specifically
cat logs/error.log

# Expected: Empty or only expected errors
```

#### 10.3 Full Feature Testing

**Test Complete User Flow:**
```bash
# Example: Complete job creation flow

# 1. Create job
JOB_RESPONSE=$(curl -s -X POST http://localhost:3001/api/jobs \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Engineer",
    "description": "Build great software",
    "skills": ["JavaScript", "TypeScript"]
  }')

# Extract job ID
JOB_ID=$(echo $JOB_RESPONSE | jq -r '.data.id')

# 2. Verify job created
curl -s -X GET http://localhost:3001/api/jobs/$JOB_ID

# Expected: Job details returned

# 3. Update job
curl -s -X PUT http://localhost:3001/api/jobs/$JOB_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'

# Expected: 200 OK

# 4. Verify update
curl -s -X GET http://localhost:3001/api/jobs/$JOB_ID

# Expected: Updated status

# 5. Delete job
curl -s -X DELETE http://localhost:3001/api/jobs/$JOB_ID \
  -H "Authorization: Bearer TOKEN"

# Expected: 200 OK

# 6. Verify deletion
curl -s -X GET http://localhost:3001/api/jobs/$JOB_ID

# Expected: 404 Not Found
```

#### 10.4 Performance Validation

**Check Response Times:**
```bash
# Measure response time
time curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test"}'

# Expected: < 500ms for simple operations
```

**Check Database Query Performance:**
```bash
# Enable query logging (if available)
# Run operation
# Check query times in logs

# Expected: All queries < 100ms
```

#### 10.5 Cross-Service Integration

**If Multiple Services Modified:**
```bash
# Start all affected services
cd harborUserSvc && npm run start &
cd harborJobSvc && npm run start &
cd harborNotificationSvc && npm run start &

# Test cross-service workflow
# Example: Create user → Create job → Verify notification

# Expected: Complete workflow succeeds
```

#### 10.6 Final Code Quality Check

**Run All Quality Checks:**
```bash
# Linting
npm run lint
# Expected: No errors

# Type checking
npx tsc --noEmit
# Expected: No errors

# Tests (if available)
npm test
# Expected: All tests pass
```

**Stop Service:**
```bash
# Clean shutdown
kill $SERVICE_PID

# Or if running in foreground
# Ctrl+C

# Verify service stopped
lsof -i :3001
# Expected: No process using port
```

**Output of Step 10:** Final confirmation that everything works correctly and is ready for pull request.

---

## Test Categories

### Category 1: Compilation Tests
**Purpose:** Verify code compiles without errors

**Tests:**
- TypeScript compilation
- Build process
- Dependency resolution

**Success Criteria:**
- Zero compilation errors
- Zero build warnings (or only acceptable warnings)
- All dependencies resolved

---

### Category 2: Startup Tests
**Purpose:** Verify service starts correctly

**Tests:**
- Service startup
- Database connection
- External service connection
- Configuration loading

**Success Criteria:**
- Service starts without crashes
- All connections established
- Health check returns healthy status

---

### Category 3: API Tests
**Purpose:** Verify API endpoints work correctly

**Tests:**
- New endpoints functionality
- Request validation
- Response format
- Authentication/authorization
- HTTP methods and status codes

**Success Criteria:**
- All endpoints respond correctly
- Validation works as expected
- Response format matches standards
- Authentication enforced appropriately

---

### Category 4: Backward Compatibility Tests
**Purpose:** Verify existing functionality not broken

**Tests:**
- Existing endpoints
- Existing data access
- Existing event flows
- Database schema compatibility

**Success Criteria:**
- All existing endpoints work
- Existing data accessible
- No breaking changes introduced

---

### Category 5: Logic Tests
**Purpose:** Verify implementation meets requirements

**Tests:**
- Requirement validation
- Edge case handling
- Business logic
- Data integrity

**Success Criteria:**
- All requirements met
- Edge cases handled
- Business rules enforced
- Data integrity maintained

---

### Category 6: Integration Tests
**Purpose:** Verify service interactions work correctly

**Tests:**
- Service-to-service communication
- Event publishing/subscribing
- External API calls
- Database operations

**Success Criteria:**
- Services communicate correctly
- Events flow properly
- External calls handled gracefully
- Database operations succeed

---

### Category 7: Code Quality Tests
**Purpose:** Verify code meets quality standards

**Tests:**
- Unused code detection
- Coding standards compliance
- Code structure verification
- Import organization

**Success Criteria:**
- No unused code
- Follows coding standards
- Proper structure
- Organized imports

---

### Category 8: Error Handling Tests
**Purpose:** Verify errors handled properly

**Tests:**
- Error response format
- Try-catch coverage
- Graceful degradation
- Validation errors

**Success Criteria:**
- Standard error format
- All async operations wrapped
- Graceful failure handling
- Clear validation errors

---

## Test Summary Output

After completing all testing steps, Harbor-AI MUST produce a comprehensive test summary.

### Test Summary Template

```markdown
# Test Summary Report

## Test Overview
**Task:** [Task name from planning.md]
**Test Date:** [YYYY-MM-DD HH:MM:SS]
**Tester:** Harbor-AI
**Testing Duration:** [X minutes]

## Tested Services

| Service | Type | Tests Run | Passed | Failed | Status |
|---------|------|-----------|--------|--------|--------|
| harborJobSvc | Primary | 45 | 45 | 0 | ✅ PASS |
| harborNotificationSvc | Secondary | 8 | 8 | 0 | ✅ PASS |

## Files Validated

### Created Files (Validated)
- ✅ `harborJobSvc/controllers/jobController.ts` - Controller methods verified
- ✅ `harborJobSvc/services/jobService.ts` - Business logic verified
- ✅ `harborJobSvc/repositories/jobRepository.ts` - Data access verified
- ✅ `harborJobSvc/routes/jobRoutes.ts` - Routes registered correctly
- ✅ `harborJobSvc/validators/jobValidators.ts` - Validation rules verified

### Modified Files (Verified)
- ✅ `harborJobSvc/models/Job.ts` - Schema changes verified
- ✅ `harborJobSvc/app.ts` - Route registration verified
- ✅ `harborJobSvc/package.json` - Dependencies verified
- ✅ `harborNotificationSvc/handlers/eventHandlers.ts` - Event handler verified

## APIs Verified

### New APIs
- ✅ POST /api/jobs - Creates job successfully
  - Request validation: ✅ PASS
  - Response format: ✅ PASS
  - Authentication: ✅ PASS
  - Error handling: ✅ PASS

- ✅ GET /api/jobs/:id - Returns job details
  - Response format: ✅ PASS
  - Error handling (404): ✅ PASS

### Existing APIs (Backward Compatibility)
- ✅ GET /api/jobs - Still works correctly
- ✅ PUT /api/jobs/:id - Still works correctly
- ✅ DELETE /api/jobs/:id - Still works correctly

## Test Results by Category

### 1. Compilation Tests
- ✅ TypeScript compilation: PASS (0 errors)
- ✅ Build process: PASS
- ✅ Dependency resolution: PASS

### 2. Startup Tests
- ✅ Service startup: PASS
- ✅ Database connection: PASS
- ✅ Health check: PASS (200 OK)

### 3. API Tests
- ✅ New endpoints: PASS (2/2)
- ✅ Request validation: PASS
- ✅ Response format: PASS
- ✅ Authentication: PASS

### 4. Backward Compatibility Tests
- ✅ Existing endpoints: PASS (3/3)
- ✅ Database compatibility: PASS
- ✅ Event compatibility: PASS

### 5. Logic Tests
- ✅ Requirements met: PASS (5/5)
- ✅ Edge cases: PASS (8/8)
- ✅ Business logic: PASS
- ✅ Data integrity: PASS

### 6. Integration Tests
- ✅ Service communication: PASS
- ✅ Event publishing: PASS
- ✅ Event subscription: PASS
- ✅ Database operations: PASS

### 7. Code Quality Tests
- ✅ No unused code: PASS
- ✅ Coding standards: PASS
- ✅ Code structure: PASS
- ✅ Import organization: PASS

### 8. Error Handling Tests
- ✅ Error response format: PASS
- ✅ Try-catch coverage: PASS
- ✅ Graceful degradation: PASS
- ✅ Validation errors: PASS

## Issues Found

### Critical Issues (0)
*None*

### Major Issues (0)
*None*

### Minor Issues (0)
*None*

### Warnings (0)
*None*

## Automated Fixes Applied
*None*

## Performance Metrics

### Response Times
- POST /api/jobs: 45ms average
- GET /api/jobs/:id: 12ms average
- PUT /api/jobs/:id: 38ms average

### Database Queries
- Average query time: 8ms
- Maximum query time: 25ms

## Security Validation

### Input Validation
- ✅ SQL injection prevention: PASS
- ✅ XSS prevention: PASS
- ✅ CSRF protection: PASS

### Authentication/Authorization
- ✅ JWT validation: PASS
- ✅ Role-based access: PASS
- ✅ Permission checks: PASS

## Final Validation

### Pre-PR Checklist
- [x] All compilation errors resolved
- [x] All tests passing
- [x] Service starts successfully
- [x] No runtime errors
- [x] No critical issues found
- [x] Code quality validated
- [x] Documentation updated

## Pull Request Readiness

**Status:** ✅ READY FOR PULL REQUEST

**Summary:**
All tests passed successfully. The implementation meets all requirements from planning.md, maintains backward compatibility, and follows all coding standards. No critical or major issues were found. The service is stable and ready for pull request creation.

**Recommended Actions:**
1. Create pull request
2. Request code review
3. Merge after approval

**Confidence Level:** HIGH

---
**Test Report Generated:** 2025-03-06 10:30:00
**Test Report By:** Harbor-AI Testing Protocol v1.0.0
```

### Test Summary with Issues

```markdown
# Test Summary Report

## Test Overview
**Task:** Add job creation endpoint
**Test Date:** 2025-03-06 10:30:00
**Tester:** Harbor-AI

## Issues Found

### Critical Issues (1)
❌ **CRITICAL:** Service crashes when creating job with null employer ID
- **File:** `harborJobSvc/services/jobService.ts`
- **Line:** 45
- **Impact:** High - Causes service to crash
- **Fix Required:** YES

**Error Details:**
```
TypeError: Cannot read property 'id' of null
    at jobService.createJob (jobService.ts:45)
```

**Recommended Fix:**
```typescript
// Add null check
if (!employerId) {
  throw new Error('Employer ID is required');
}
```

### Major Issues (1)
⚠️ **MAJOR:** Event publishing fails silently
- **File:** `harborJobSvc/services/jobService.ts`
- **Line:** 52
- **Impact:** Medium - Notifications not sent
- **Fix Required:** YES

**Issue:** Event publishing errors are caught and logged but not re-thrown

**Recommended Fix:**
```typescript
// Either re-throw error or implement retry logic
try {
  await messageQueue.publish('job.created', { jobId: job.id });
} catch (error) {
  logger.error('Failed to publish event', { error, jobId: job.id });
  // Re-throw if event publishing is critical
  throw error;
}
```

### Minor Issues (2)
ℹ️ **MINOR:** Unused import in validator
- **File:** `harborJobSvc/validators/jobValidators.ts`
- **Line:** 3
- **Impact:** Low - Code cleanliness
- **Fix Required:** YES (Automated)

**Automated Fix Applied:** Removed unused import

ℹ️ **MINOR:** Missing JSDoc comment on public method
- **File:** `harborJobSvc/controllers/jobController.ts`
- **Method:** createJob
- **Impact:** Low - Documentation
- **Fix Required:** NO (Optional)

## Pull Request Readiness

**Status:** ❌ NOT READY FOR PULL REQUEST

**Blocking Issues:** 2 (1 Critical, 1 Major)

**Required Actions:**
1. Fix null employer ID crash (CRITICAL)
2. Fix event publishing error handling (MAJOR)
3. Re-run tests after fixes
4. Verify no regressions

**Non-Blocking Improvements:**
- Add JSDoc comments (Optional)

**Next Steps:**
1. Apply fixes for critical and major issues
2. Re-run full test suite
3. Generate new test summary
4. Proceed to PR if all tests pass

**Confidence Level:** LOW (Critical issues present)

---
**Test Report Generated:** 2025-03-06 10:45:00
```

---

## Critical Testing Rules

### Rule 1: No PR with Critical Issues
**❌ PROHIBITED:**
- Creating pull request with critical issues
- Creating pull request with build failures
- Creating pull request with compilation errors
- Creating pull request with failing tests

**✅ REQUIRED:**
- All critical issues must be fixed
- Service must build successfully
- All tests must pass
- Zero compilation errors

---

### Rule 2: Test Only Affected Services
**❌ PROHIBITED:**
- Testing services that weren't modified
- Running tests for entire platform unnecessarily
- Modifying other services to "fix" tests

**✅ REQUIRED:**
- Test only primary service (high impact)
- Test only secondary services with actual changes
- Skip testing for unaffected services

---

### Rule 3: Preserve Existing Functionality
**❌ PROHIBITED:**
- Breaking existing APIs
- Changing database schemas without migration
- Modifying event payloads without versioning
- Removing required fields

**✅ REQUIRED:**
- All existing endpoints must work
- Existing data must remain accessible
- Event payloads must be backward compatible
- Required fields must remain required

---

### Rule 4: Fail Fast and Report Clearly
**❌ PROHIBITED:**
- Hiding test failures
- Ignoring warning signs
- Continuing after critical errors
- Vague issue descriptions

**✅ REQUIRED:**
- Stop testing immediately on critical errors
- Report issues with clear descriptions
- Provide exact file and line numbers
- Include suggested fixes when possible

---

### Rule 5: Document Everything
**❌ PROHIBITED:**
- Skipping test documentation
- Incomplete test summaries
- Missing issue details

**✅ REQUIRED:**
- Complete test summary for every testing phase
- Detailed issue descriptions
- Clear pass/fail status for each test
- Evidence of testing (logs, screenshots if applicable)

---

## Automated Fix Guidelines

### What Can Be Fixed Automatically

#### Category 1: Simple Code Issues
**Automatic Fixes:**
- Remove unused imports
- Remove unused variables
- Remove commented-out code
- Fix simple formatting issues
- Add missing semicolons (if required)

**Example:**
```typescript
// Before (unused import)
import { validateJob, validateUser } from './validators';

// After (automatically fixed)
import { validateJob } from './validators';
```

#### Category 2: Simple Validation Issues
**Automatic Fixes:**
- Add missing validation for required fields
- Add missing error messages
- Add missing try-catch blocks

**Example:**
```typescript
// Before (missing validation)
async function createJob(jobData: CreateJobDTO) {
  return await Job.create(jobData);
}

// After (automatically fixed)
async function createJob(jobData: CreateJobDTO) {
  if (!jobData.title) {
    throw new Error('Title is required');
  }
  return await Job.create(jobData);
}
```

### What Cannot Be Fixed Automatically

#### Category 1: Logic Issues
**Requires Human Review:**
- Business logic errors
- Complex validation issues
- Data integrity problems
- Performance issues

#### Category 2: Architectural Issues
**Requires Human Review:**
- Service boundary violations
- Incorrect service modifications
- Breaking changes
- Security vulnerabilities

#### Category 3: Integration Issues
**Requires Human Review:**
- Cross-service communication failures
- Event system issues
- Database schema conflicts
- External API problems

### Automated Fix Procedure

```bash
# 1. Identify fixable issue
npm run lint
# Output: 'validateUser' is defined but never used

# 2. Apply fix automatically
npm run lint -- --fix

# 3. Verify fix
npm run lint
# Output: No errors

# 4. Rebuild service
npm run build

# 5. Document fix in test summary
# "Automated Fix Applied: Removed unused import 'validateUser'"
```

---

## Common Testing Scenarios

### Scenario 1: New API Endpoint Addition

**Testing Focus:**
1. New endpoint functionality
2. Request validation
3. Response format
4. Authentication/authorization
5. Backward compatibility of existing endpoints

**Test Commands:**
```bash
# Test new endpoint
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test"}'

# Test validation
curl -X POST http://localhost:3001/api/jobs \
  -d '{"invalid": "data"}'

# Test authentication
curl -X POST http://localhost:3001/api/jobs \
  -H "Authorization: Bearer INVALID_TOKEN"

# Test existing endpoints still work
curl -X GET http://localhost:3001/api/jobs
```

---

### Scenario 2: Database Schema Modification

**Testing Focus:**
1. Migration execution
2. New table/column accessible
3. Existing data intact
4. No data loss
5. Backward compatibility

**Test Commands:**
```bash
# Run migration
npm run migrate

# Verify new table
psql -c "\d new_table"

# Verify existing data
psql -c "SELECT COUNT(*) FROM existing_table"

# Test accessing new data via API
curl -X POST http://localhost:3001/api/new-resource \
  -d '{"field": "value"}'

# Test existing functionality
curl -X GET http://localhost:3001/api/existing-resource
```

---

### Scenario 3: Event Handler Addition

**Testing Focus:**
1. Event publishing
2. Event receiving
3. Event payload structure
4. Handler execution
5. Error handling

**Test Commands:**
```bash
# Trigger event publisher
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test"}'

# Check publisher logs
tail -f logs/combined.log | grep "event.published"

# Check subscriber logs
tail -f harborNotificationSvc/logs/combined.log | grep "event.received"

# Verify handler executed
tail -f harborNotificationSvc/logs/combined.log | grep "handler.executed"
```

---

### Scenario 4: Bug Fix

**Testing Focus:**
1. Bug is fixed
2. Fix doesn't break existing functionality
3. Edge cases handled
4. No regressions

**Test Commands:**
```bash
# Test bug scenario (previously failing)
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "Test", "description": "Test"}'
# Should now work

# Test edge cases
curl -X POST http://localhost:3001/api/jobs \
  -d '{"title": "", "description": "Test"}'

# Test existing functionality
curl -X GET http://localhost:3001/api/jobs
```

---

### Scenario 5: Service Configuration Change

**Testing Focus:**
1. Service starts with new config
2. Configuration values applied
3. No breaking changes
4. Environment variables work

**Test Commands:**
```bash
# Update configuration
nano .env

# Restart service
npm run start

# Verify configuration applied
curl http://localhost:3001/health

# Check logs for config values
tail -f logs/combined.log | grep "config.loaded"
```

---

## Issue Severity Classification

### Critical Issues
**Definition:** Issues that prevent the service from functioning or cause data loss/corruption

**Examples:**
- Service crashes on startup
- Service crashes during normal operation
- Data loss or corruption
- Security vulnerabilities (SQL injection, XSS, etc.)
- Complete feature failure

**Action:** STOP - Must fix immediately before proceeding

---

### Major Issues
**Definition:** Issues that significantly impact functionality but have workarounds

**Examples:**
- Important feature not working
- Event publishing/subscribing fails
- Service communication failures
- Performance degradation (>50% slower)
- Missing error handling

**Action:** FIX - Must fix before creating PR

---

### Minor Issues
**Definition:** Issues that have minimal impact on functionality

**Examples:**
- Unused imports or variables
- Missing comments
- Inconsistent formatting
- Non-critical validation issues
- Small UI/UX issues

**Action:** FIX (can be automated) - Should fix before PR

---

### Warnings
**Definition:** Potential issues that don't affect current functionality

**Examples:**
- Deprecated API usage
- Future compatibility concerns
- Performance optimization opportunities
- Code style improvements

**Action:** DOCUMENT - Note in summary but don't block PR

---

### Informational
**Definition:** Observations that don't require action

**Examples:**
- Successful test results
- Performance metrics
- Configuration notes

**Action:** RECORD - Document in summary

---

## Testing Troubleshooting

### 🚨 CRITICAL: Missing Environment Variables

**ABSOLUTE RULE: Missing environment variables MUST NOT terminate the testing workflow.**

**Symptoms:**
```bash
npm run start
# Service fails to start with:
# Error: Required environment variable STRIPE_SECRET_KEY is not defined
```

**Diagnosis:**
- Service or test fails due to missing required configuration
- Error mentions missing environment variable

**CRITICAL RECOVERY PROCESS:**
1. **Ask the user ONCE** for the missing value:
   - "Required environment variable [VARIABLE_NAME] is missing. Please provide the value so testing can continue."
2. **Store it immediately** in the service's .env file:
   ```bash
   # Navigate to service directory
   cd /path/to/service
   echo "VARIABLE_NAME=value" >> .env
   ```
3. **Reload environment** and continue testing automatically
4. **NEVER ask for the same variable again** - always check .env first

**CRITICAL RULES:**
- Missing env vars MUST NOT stop the testing workflow
- After storing, continue with: Complete testing → Git → PR → Ticket closure
- Configuration values are persistent - once provided, they're remembered
- Do NOT say "testing complete" and stop - continue to the next phase

---

### Issue: "Service Won't Start"

**Symptoms:**
```bash
npm run start
# Service fails to start
# No response on health endpoint
```

**Diagnosis:**
1. Check port availability: `lsof -i :3001`
2. Check environment variables: `cat .env` (see Missing Environment Variables above)
3. Check database connection
4. Review error logs: `tail -f logs/error.log`

**Solutions:**
```bash
# If port in use
kill -9 <PID>

# If env variables missing
cp .env.example .env
nano .env

# If database not accessible
# Check database is running
# Check connection string

# Rebuild service
npm run build
npm run start
```

---

### Issue: "Tests Pass but Service Fails in Production"

**Symptoms:**
- All tests pass locally
- Service fails when deployed

**Diagnosis:**
1. Environment differences (dev vs prod)
2. Missing environment variables in prod
3. Database schema differences
4. Dependency version mismatches

**Solutions:**
```bash
# Test in staging environment first
# Verify all environment variables
# Run migrations in staging
# Check dependency versions match

# Use docker for consistent environment
docker-compose up
```

---

### Issue: "Cannot Reproduce Issue in Testing"

**Symptoms:**
- Issue reported but tests pass
- Cannot reproduce error

**Diagnosis:**
1. Incomplete test coverage
2. Missing edge case scenarios
3. Race conditions
4. Data state differences

**Solutions:**
```bash
# Add more comprehensive tests
# Test with realistic data volumes
# Test concurrent requests
# Test with various data states

# Review the issue description carefully
# Ask for exact steps to reproduce
# Request additional context
```

---

### Issue: "Performance Degradation Detected"

**Symptoms:**
- API response times increased
- Database queries slowed down
- Memory usage increased

**Diagnosis:**
1. N+1 query problems
2. Missing database indexes
3. Inefficient algorithms
4. Memory leaks

**Solutions:**
```bash
# Profile database queries
# Add missing indexes
# Use eager loading instead of N+1
# Fix memory leaks

# Before (N+1 problem):
async function getJobs() {
  const jobs = await Job.findAll();
  for (const job of jobs) {
    job.employer = await User.findByPk(job.employerId);
  }
  return jobs;
}

# After (fixed):
async function getJobs() {
  return await Job.findAll({
    include: [{ model: User, as: 'employer' }]
  });
}
```

---

## Quick Reference Checklist

### Before Testing
- [ ] Execution phase completed
- [ ] Execution summary reviewed
- [ ] Affected services identified
- [ ] Test environment ready
- [ ] Required dependencies installed

### During Testing
- [ ] Build verification completed
- [ ] Service starts successfully
- [ ] New APIs tested
- [ ] Existing APIs verified
- [ ] Logic validated
- [ ] Dependencies checked
- [ ] Code quality verified
- [ ] Error handling tested

### After Testing
- [ ] All critical issues resolved
- [ ] All major issues resolved
- [ ] Minor issues fixed or documented
- [ ] Test summary generated
- [ ] PR readiness determined

### PR Creation Criteria
- [ ] Zero critical issues
- [ ] Zero major issues
- [ ] All tests passing
- [ ] Service builds successfully
- [ ] Documentation complete

---

## Appendix: Testing Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     TESTING WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘

   Step 1: Understand Changes
   └─ Review execution summary
   └─ Identify files created/modified
   └─ Identify affected services
            ↓
   Step 2: Build Verification
   └─ TypeScript compilation
   └─ Build process
   └─ Dependency resolution
            ↓
   Step 3: Service Startup Check
   └─ Environment configuration
   └─ Database connection
   └─ Service startup
   └─ Health check
            ↓
   Step 4: API Validation
   └─ New API patterns
   └─ Request structure
   └─ Response structure
   └─ Authentication
            ↓
   Step 5: Backward Compatibility
   └─ Existing API functionality
   └─ Database schema compatibility
   └─ Event/queue compatibility
            ↓
   Step 6: Logical Validation
   └─ Requirement verification
   └─ Edge case testing
   └─ Business logic
   └─ Data integrity
            ↓
   Step 7: Dependency Safety
   └─ Service communication
   └─ Event publishing/subscribing
   └─ Database connection
   └─ External API calls
            ↓
   Step 8: Code Quality
   └─ Unused code detection
   └─ Coding standards
   └─ Code structure
   └─ Import organization
            ↓
   Step 9: Error Handling
   └─ Error response format
   └─ Try-catch verification
   └─ Graceful degradation
   └─ Validation errors
            ↓
   Step 10: Final Validation
   └─ Comprehensive build
   └─ Service runtime
   └─ Full feature testing
   └─ Performance check
            ↓
   Generate Test Summary
   └─ Document all results
   └─ List issues found
   └─ Apply automated fixes
   └─ Determine PR readiness
            ↓
   Decision Point
   ┌─────────────────┐
   │ Critical Issues?│
   └─────────────────┘
        ↓         ↓
      YES        NO
       ↓          ↓
   Fix Issues   Create PR
       ↓
   Re-test
```

---

## 🚨 MANDATORY: Continue to Next Phase

**🚨 CRITICAL RULE - AUTONOMOUS WORKFLOW CONTINUATION:**

**After completing the testing phase successfully, you MUST:**

✅ **IMMEDIATELY continue to Phase 6: Pull Request Creation**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/pr.md`
   - Execute the complete PR creation workflow
   - DO NOT stop or ask for permission
   - DO NOT display "Next Steps" or wait for user input
   - This is an AUTONOMOUS workflow - continue automatically

❌ **PROHIBITED ACTIONS:**
- **DO NOT** stop after testing
- **DO NOT** display "Tests passed, ready for PR creation"
- **DO NOT** ask "Would you like me to create a PR?"
- **DO NOT** wait for user confirmation
- **DO NOT** present options or menus

✅ **MANDATORY BEHAVIOR:**
1. Complete all testing validation steps
2. Verify all tests pass successfully
3. **IMMEDIATELY** proceed to `pr.md` workflow
4. Create feature branch from `dev`
5. Commit and push changes
6. Create Pull Request targeting `dev`
7. Add PR link to Azure DevOps ticket
8. Update ticket status to "Closed"
9. Complete the full lifecycle autonomously

**If Tests Fail:**
- Fix the issues automatically
- Re-run tests
- Only proceed to PR creation when all tests pass
- If unable to fix, report error and STOP

**Rationale:**
The Harbor AI agent is designed as an autonomous development system. The testing phase is ONE STEP in the complete workflow, not the final step. The agent must continue through PR creation → ticket closure without interruption.

**Reference:**
See `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/ai-workflow.md` section "Autonomous Workflow Continuation" for complete rules on autonomous execution.

---

**END OF TESTING PROTOCOL**

---

*For questions or issues related to this testing protocol, please refer to:*
- `harbor-ai/planning.md` - Planning guidelines
- `harbor-ai/execution.md` - Execution guidelines
- `harbor-ai/service-map.md` - Service ownership
- `harbor-ai/coding-rules.md` - Coding standards
- `harbor-ai/architecture-overview.md` - System architecture