# Harbor AI - Validation and Auto-Fix Protocol

**Document Version:** 1.0.0
**Last Updated:** 2026-03-13
**Owner:** Harbor AI Development Team

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Critical Validation Rule](#critical-validation-rule)
3. [Validation Workflow](#validation-workflow)
4. [Auto-Fix Loop](#auto-fix-loop)
5. [Project Detection](#project-detection)
6. [Validation Commands](#validation-commands)
7. [Common Error Patterns and Fixes](#common-error-patterns-and-fixes)
8. [Completion Conditions](#completion-conditions)
9. [Transition to Next Phase](#transition-to-next-phase)

---

## Purpose and Scope

This document defines the **mandatory validation and auto-fix protocol** that Harbor-AI MUST follow after making ANY code modifications.

### Objectives

- Ensure code changes don't break the project
- Automatically detect build failures, runtime errors, type errors, and broken dependencies
- Fix detected issues automatically without user intervention
- Continue the fix-and-validate loop until the project is stable

### When to Use This Protocol

**This protocol MUST be used after:**
- Creating or modifying ANY TypeScript/JavaScript file
- Adding new dependencies to package.json
- Changing database schema or models
- Modifying configuration files
- Updating API endpoints or services
- Refactoring existing code

**This protocol must be completed BEFORE:**
- Moving to testing phase
- Creating a pull request
- Considering the task as "done"

---

## Critical Validation Rule

### 🚨 MANDATORY VALIDATION - NEVER SKIP

**ABSOLUTE RULE: After ANY code modification, you MUST validate the project works correctly.**

**❌ PROHIBITED ACTIONS:**
- **NEVER** assume code changes are correct without validation
- **NEVER** proceed to testing without running validation
- **NEVER** stop after code implementation without verifying the project builds
- **NEVER** create a PR if the project has build errors
- **NEVER** mark a task as complete if validation fails

**✅ MANDATORY BEHAVIOR:**
1. **ALWAYS** run validation after code changes
2. **ALWAYS** fix detected errors automatically
3. **ALWAYS** re-validate after fixes
4. **ALWAYS** continue the loop until the project is stable
5. **ONLY** proceed to next phase after successful validation

---

## Validation Workflow

### Phase 1: Detect How the Project Runs

Before running validation, determine the correct commands for the project:

```bash
# Check package.json for available scripts
cat package.json | grep -A 20 '"scripts"'

# Common scripts to look for:
# - "build" or "compile" - Build the project
# - "dev" or "start" - Start the development server
# - "test" - Run tests
# - "lint" - Run linting
# - "type-check" - Type checking
```

**For each service type:**

| Service Type | Build Command | Start Command | Test Command |
|-------------|---------------|---------------|--------------|
| Node.js/Express | `npm run build` | `npm run dev` | `npm test` |
| Next.js | `npm run build` | `npm run dev` | `npm test` |
| React | `npm run build` | `npm start` | `npm test` |
| TypeScript Library | `npm run build` | N/A | `npm test` |

**Detect dependencies:**
```bash
# Check if node_modules exists
ls -la node_modules 2>/dev/null && echo "Dependencies installed" || echo "Need to install dependencies"

# Install dependencies if missing
npm install
```

---

### Phase 2: Run Initial Validation

Execute validation commands in order:

#### Step 2.1: TypeScript Compilation Check

```bash
# Check for TypeScript errors
npx tsc --noEmit

# OR if project uses build script
npm run build 2>&1 | tee build-output.log
```

**Check for:**
- TypeScript compilation errors
- Type errors
- Missing imports
- Interface mismatches

#### Step 2.2: Build Process Check

```bash
# Run the build process
npm run build

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    # Capture errors for fixing
    cat build-output.log
fi
```

**Check for:**
- Build failures
- Webpack/Vite errors
- Bundle size issues
- Missing dependencies

#### Step 2.3: Linting Check

```bash
# Run linter if available
npm run lint 2>&1 | tee lint-output.log

# OR use ESLint directly
npx eslint . --ext .ts,.tsx,.js,.jsx 2>&1 | tee lint-output.log
```

**Check for:**
- Linting errors
- Code style violations
- Unused variables
- Missing semicolons

#### Step 2.4: Dependency Check

```bash
# Check for broken dependencies
npm ls 2>&1 | grep -E "UNMET|missing|ERR"

# Check for security vulnerabilities
npm audit --audit-level=high

# Check for outdated packages
npm outdated
```

**Check for:**
- Missing dependencies
- Version conflicts
- Security vulnerabilities
- Outdated packages

#### Step 2.5: Runtime Validation (Optional but Recommended)

```bash
# Start the service in background
npm run dev &
DEV_PID=$!

# Wait for service to start
sleep 5

# Check if service is running
if ps -p $DEV_PID > /dev/null; then
    echo "✅ Service started successfully"

    # Check logs for errors
    curl -s http://localhost:3001/health || echo "⚠️ Health check failed"

    # Kill the background process
    kill $DEV_PID
else
    echo "❌ Service failed to start"
fi
```

---

### Phase 3: Error Detection and Classification

If validation fails, classify the error:

#### Error Severity Classification

| Severity | Description | Must Fix | Examples |
|----------|-------------|----------|----------|
| **CRITICAL** | Project doesn't build | Yes | TS errors, missing imports |
| **HIGH** | Runtime errors | Yes | Uncaught exceptions, startup failures |
| **MEDIUM** | Linting errors | Yes | Code style, unused variables |
| **LOW** | Warnings | Recommended | Deprecation warnings |

#### Error Types and Detection

**Type 1: TypeScript Compilation Errors**
```
error TS2307: Cannot find module 'express'
error TS2339: Property 'userId' does not exist on type 'Request'
error TS7006: Parameter 'req' implicitly has an 'any' type
```

**Type 2: Build Errors**
```
Module not found: Error: Can't resolve './userService'
Cannot read property 'map' of undefined
TypeError: Cannot destructure property 'user' of 'undefined'
```

**Type 3: Runtime Errors**
```
Error: Cannot connect to database
TypeError: Cannot read property 'id' of undefined
ReferenceError: userService is not defined
```

**Type 4: Import/Export Errors**
```
SyntaxError: Named export 'createJob' not found
Error: Cannot find module '@harborapp/types'
```

**Type 5: Dependency Errors**
```
npm ERR! missing script: build
npm ERR! code ELIFECYCLE
UNMET PEER DEPENDENCY react@^18.0.0
```

---

## Auto-Fix Loop

### Loop Structure

```
┌─────────────────────┐
│ 1. Modify Code      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 2. Run Validation   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 3. Detect Errors    │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
  No Errors   Errors Found
     │           │
     │           ▼
     │    ┌──────────────────┐
     │    │ 4. Analyze Error  │
     │    └─────────┬────────┘
     │              │
     │              ▼
     │    ┌──────────────────┐
     │    │ 5. Fix Error      │
     │    └─────────┬────────┘
     │              │
     │              └──────────┐
     │                         │
     │            ┌────────────┘
     │            │
     ▼            ▼
┌─────────────────────────┐
│ 6. Run Validation Again │
└──────────┬──────────────┘
           │
           └──────► Loop back to Step 3
```

### Auto-Fix Procedures

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

**Procedure:**
1. Identify the missing module/interface
2. Find the correct import path
3. Add the import at the top of the file
4. Re-run validation

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

**Procedure:**
1. Add type annotations to parameters
2. Create or import proper type definitions
3. Extend interfaces if needed
4. Re-run validation

#### Fix 3: Missing Dependencies

**Detection:**
```
error TS2307: Cannot find module '@nestjs/common'
npm ERR! missing peer dependency
```

**Auto-Fix:**
```bash
# Identify missing package
grep -r "from '@nestjs/common'" . --include="*.ts"

# Install missing dependency
npm install @nestjs/common

# Re-run validation
npm run build
```

**Procedure:**
1. Identify the missing package from error
2. Determine correct version (check peer dependencies)
3. Install the package
4. Re-run validation

#### Fix 4: Broken Imports After File Moves

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

**Procedure:**
1. Find where the imported file is located
2. Calculate correct relative path
3. Update the import statement
4. Re-run validation

#### Fix 5: Export/Import Mismatch

**Detection:**
```
SyntaxError: Named export 'createJob' not found. The requested module exports 'CreateJobDto'
```

**Auto-Fix:**
```typescript
// BEFORE (wrong export name in importing file)
import { createJob } from './job.service';

// AFTER (correct export name)
import { CreateJob } from './job.service';
```

**Procedure:**
1. Check the exported name in the source file
2. Update the import to match the export
3. Re-run validation

#### Fix 6: Missing Async/Await

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

**Procedure:**
1. Identify function returning Promise
2. Add `await` keyword
3. Ensure function is marked as `async`
4. Re-run validation

#### Fix 7: Database Schema Mismatches

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

**Procedure:**
1. Check database schema
2. Update TypeScript interface
3. Update Sequelize model if applicable
4. Re-run validation

---

## Project Detection

### Frontend Projects (Next.js, React)

**Validation Commands:**
```bash
# Install dependencies
npm install

# Type check
npm run type-check || npx tsc --noEmit

# Build
npm run build

# Lint
npm run lint

# Start dev server (optional)
npm run dev &
```

**Project Indicators:**
- `next.config.js` or `next.config.ts`
- `pages/` or `app/` directory
- `package.json` contains `"next"`

### Backend Projects (Node.js/Express)

**Validation Commands:**
```bash
# Install dependencies
npm install

# TypeScript check
npx tsc --noEmit

# Build
npm run build

# Start service (test)
npm run dev &
DEV_PID=$!
sleep 3
curl http://localhost:${PORT}/health || echo "Health check failed"
kill $DEV_PID 2>/dev/null
```

**Project Indicators:**
- `src/` directory with `index.ts`
- `package.json` contains `"express"`
- Database migrations in `migrations/`

### Shared Libraries (TypeScript)

**Validation Commands:**
```bash
# Install dependencies
npm install

# Type check
npx tsc --noEmit

# Build
npm run build

# Check exports
cat package.json | grep -A 10 '"exports"'
```

**Project Indicators:**
- `package.json` contains `"type": "module"`
- No `src/index.ts` but multiple exports
- Used as dependency by other services

---

## Validation Commands by Framework

### Next.js

```bash
# Full validation
npm run lint
npm run type-check
npm run build
```

### Express with TypeScript

```bash
# Full validation
npx tsc --noEmit
npm run lint
npm run build
```

### React with Vite

```bash
# Full validation
npm run lint
npm run type-check
npm run build
```

### NestJS

```bash
# Full validation
npm run lint
npm run build
npm run test:e2e  # If available
```

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

# For other packages
npm install -D @types/node @types/jest
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

# Reload environment
source .env
```

### Pattern 4: Sequelize Model Issues

**Error:**
```
error TS2339: Property 'findAll' does not exist on type 'typeof User'
```

**Fix:**
```typescript
// BEFORE (wrong import)
import { User } from './models/User';

// AFTER (correct import)
import { User } from './models/User.model';

// Or ensure model is properly initialized
const { User } = require('./models');
```

### Pattern 5: Middleware Order Issues

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

---

## Completion Conditions

### ✅ Validation Successful

The validation phase is **COMPLETE** when ALL of the following are true:

1. ✅ **Build Success:** `npm run build` completes with exit code 0
2. ✅ **No TypeScript Errors:** `npx tsc --noEmit` shows no errors
3. ✅ **No Critical Runtime Errors:** Service starts without crashing
4. ✅ **No Missing Dependencies:** All imports resolve correctly
5. ✅ **No Type Errors:** All types are properly defined
6. ✅ **No Linting Errors** (or only warnings that can be ignored)

### ✅ Exit Criteria

**You MAY proceed to the next phase ONLY when:**

```bash
# Run final validation
npm run build && echo "✅ BUILD PASSED"

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ Validation successful - Ready for next phase"
    exit 0
else
    echo "❌ Validation failed - Fix errors and retry"
    exit 1
fi
```

### ❌ Failure Scenarios

**Validation has FAILED if:**

- ❌ Build exits with non-zero code
- ❌ TypeScript compiler shows errors
- ❌ Service crashes on startup
- ❌ Import errors are present
- ❌ Type errors exist
- ❌ Tests fail (if tests exist)

**If validation fails:**
1. Analyze the error
2. Apply the appropriate fix
3. Re-run validation
4. Continue until successful

---

## Auto-Fix Loop Implementation

### Loop Control

```bash
#!/bin/bash
MAX_ATTEMPTS=10
attempt=1

while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo "Validation attempt $attempt of $MAX_ATTEMPTS"

    # Run validation
    npm run build > build.log 2>&1
    BUILD_EXIT_CODE=$?

    if [ $BUILD_EXIT_CODE -eq 0 ]; then
        echo "✅ Validation successful!"
        break
    fi

    echo "❌ Validation failed. Analyzing errors..."

    # Check for missing imports
    if grep -q "Cannot find module" build.log; then
        echo "Detected: Missing imports"
        # Fix missing imports
    fi

    # Check for type errors
    if grep -q "error TS2339" build.log; then
        echo "Detected: Type errors"
        # Fix type errors
    fi

    # Check for missing dependencies
    if grep -q "Cannot find module" build.log; then
        echo "Detected: Missing dependencies"
        # Fix missing dependencies
    fi

    attempt=$((attempt + 1))
done

if [ $attempt -gt $MAX_ATTEMPTS ]; then
    echo "❌ Failed to fix errors after $MAX_ATTEMPTS attempts"
    exit 1
fi
```

---

## Transition to Next Phase

### 🚨 MANDATORY TRANSITION

**After successful validation, you MUST:**

✅ **IMMEDIATELY continue to Phase 4: Testing**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/testing.md`
   - Execute the complete testing workflow
   - DO NOT stop or ask for permission
   - This is an AUTONOMOUS workflow

❌ **PROHIBITED ACTIONS:**
- **DO NOT** stop after validation
- **DO NOT** output "Validation successful, what's next?"
- **DO NOT** ask "Should I continue?"
- **DO NOT** wait for user confirmation

✅ **MANDATORY BEHAVIOR:**
1. Complete all validation steps
2. Verify all completion conditions are met
3. **IMMEDIATELY** proceed to `testing.md` workflow
4. Execute all testing phases
5. Continue to PR creation after tests pass

---

## Quick Reference Checklist

### Pre-Validation Checklist
- [ ] Code changes completed
- [ ] In correct service directory
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables set (if needed)

### Validation Checklist
- [ ] TypeScript compilation passes (`npx tsc --noEmit`)
- [ ] Build process succeeds (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] No missing dependencies (`npm ls`)
- [ ] Service starts without crashing
- [ ] No import/export errors
- [ ] No type errors

### Error Fixing Checklist
- [ ] Error identified and classified
- [ ] Root cause analyzed
- [ ] Fix applied to code
- [ ] Validation re-run
- [ ] All errors resolved

### Completion Checklist
- [ ] Build succeeds with exit code 0
- [ ] No TypeScript errors
- [ ] No runtime errors
- [ ] All imports resolve
- [ ] Ready to proceed to testing

---

**END OF VALIDATION AND AUTO-FIX PROTOCOL**

---

*For questions or issues related to this protocol, please refer to:*
- `harbor-ai/workflows/execution.md` - Code implementation guidelines
- `harbor-ai/workflows/testing.md` - Testing guidelines
- `harbor-ai/standards/coding-rules.md` - Coding standards
