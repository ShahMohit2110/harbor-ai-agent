# Validation & Auto-Fix Workflow Implementation

**Date:** 2026-03-13
**Status:** ✅ COMPLETE

---

## Summary

The Harbor AI Agent now has a **mandatory validation and auto-fix workflow** that runs after every code modification to ensure projects remain stable and error-free.

---

## Problem Solved

Previously, the agent would:
- ❌ Modify code without validating it compiles
- ❌ Create broken builds with TypeScript errors
- ❌ Introduce missing imports and broken dependencies
- ❌ Stop after implementation without checking if project works

**Result:** Projects would break after agent modifications, requiring manual fixes.

---

## Solution Implemented

### New Workflow Phase: Validation & Auto-Fix

**Location:** `harbor-ai/workflows/validation-and-autofix.md`

**Position in workflow:**
```
Planning → Execution → VALIDATION & AUTO-FIX → Testing → PR → Ticket Closure
```

---

## How It Works

### Phase 1: Detect Project Type

The agent analyzes the repository to determine:
- Framework (Next.js, Express, React, NestJS)
- Build commands (`npm run build`)
- Test commands (`npm test`)
- Available scripts

### Phase 2: Run Validation

The agent runs multiple validation checks:

```bash
# TypeScript compilation
npx tsc --noEmit

# Build process
npm run build

# Linting
npm run lint

# Dependency check
npm ls
```

### Phase 3: Detect Errors

If validation fails, the agent classifies errors by severity:

| Severity | Description | Must Fix |
|----------|-------------|----------|
| **CRITICAL** | Project doesn't build | Yes |
| **HIGH** | Runtime errors | Yes |
| **MEDIUM** | Linting errors | Yes |
| **LOW** | Warnings | Recommended |

### Phase 4: Auto-Fix Loop

The agent automatically fixes common errors:

**1. Missing Imports**
```typescript
// BEFORE (error: Cannot find module 'express')
const app = express();

// AFTER (auto-fix)
import express from 'express';
const app = express();
```

**2. Type Errors**
```typescript
// BEFORE (error: Parameter 'req' implicitly has 'any' type)
function createUser(req, res) { ... }

// AFTER (auto-fix)
import { Request, Response } from 'express';
function createUser(req: Request, res: Response) { ... }
```

**3. Missing Dependencies**
```bash
# Detect: Cannot find module '@types/jest'
# Auto-fix: npm install -D @types/jest
```

**4. Broken Import Paths**
```typescript
// BEFORE (error: Cannot resolve './userService')
import { UserService } from './userService';

// AFTER (auto-fix with correct path)
import { UserService } from '../services/UserService';
```

**5. Missing Async/Await**
```typescript
// BEFORE (error: Promise returned without await)
const user = UserService.findById(id);

// AFTER (auto-fix)
const user = await UserService.findById(id);
```

### Phase 5: Re-Validation Loop

After each fix, the agent re-runs validation:

```
Modify Code → Run Validation → Detect Errors → Fix Errors → Re-Validate
↑                                                        ↓
└──────────────── Continue Loop Until Stable ────────────┘
```

This loop continues until:
- ✅ Build succeeds (exit code 0)
- ✅ No TypeScript errors
- ✅ No runtime errors
- ✅ All imports resolve
- ✅ All types are correct

---

## Files Modified

### 1. Created: `validation-and-autofix.md`
- Complete validation protocol
- Auto-fix procedures for common errors
- Project detection logic
- Error classification system
- Completion conditions

### 2. Updated: `execution.md`
- Added transition to validation phase
- Updated autonomous workflow rules
- Modified testing mode to include validation

### 3. Updated: `MEMORY.md`
- Added validation workflow to default workflow
- Added critical rules about validation
- Added dedicated validation section
- Updated documentation files list

---

## Workflow Integration

### Before (Old Workflow)
```
Planning → Execution → Testing → PR → Ticket Closure
                   ❌ (broken code)
```

### After (New Workflow)
```
Planning → Execution → Validation → Testing → PR → Ticket Closure
                      ✅ (stable code)
```

---

## Critical Rules

### 🚨 MANDATORY VALIDATION RULE

**After ANY code modification, you MUST:**

1. ✅ **ALWAYS** run validation after code changes
2. ✅ **ALWAYS** fix detected errors automatically
3. ✅ **ALWAYS** re-validate after fixes
4. ✅ **ALWAYS** continue the loop until the project is stable
5. ✅ **ONLY** proceed to next phase after successful validation

### ❌ PROHIBITED ACTIONS

- **NEVER** assume code changes are correct without validation
- **NEVER** proceed to testing without running validation
- **NEVER** stop after code implementation without verifying the project builds
- **NEVER** create a PR if the project has build errors
- **NEVER** mark a task as complete if validation fails

---

## Testing Mode Status

**Current Status:** Testing mode is still active

**Testing Mode Workflow:**
1. Fetch active Azure DevOps tasks
2. Analyze and prioritize tasks
3. Begin working on highest priority task
4. Follow workflow: Task Intake → Planning → Execution
5. **Run Validation & Auto-Fix loop** ← NEW
6. **STOP after Validation phase (when project builds successfully)** ← UPDATED
7. Output: "Code changes completed and validated successfully. Project builds without errors."

**To Re-enable Full Workflow:**
1. Edit `harbor-ai/workflows/execution.md`
2. Uncomment the Git operations section and "Continue to Next Phase" section
3. Remove the testing mode stop instruction
4. Validation will continue to Testing → PR → Ticket Closure

---

## Benefits

### ✅ For the Agent
- Ensures all code changes are valid before proceeding
- Automatically fixes common errors
- Reduces manual intervention
- Improves code quality

### ✅ For the User
- Projects never break after agent modifications
- No manual fixing of TypeScript errors
- No broken builds
- No missing imports
- Guaranteed working code

---

## Example Scenarios

### Scenario 1: Missing Import

**Agent creates file:** `userService.ts`
```typescript
export class UserService {
  findById(id: string) { ... }
}
```

**Agent uses service in:** `userController.ts`
```typescript
const user = UserService.findById(id); // ❌ Error: Cannot find name 'UserService'
```

**Validation runs:**
```
error TS2307: Cannot find module 'UserService'
```

**Auto-fix applied:**
```typescript
import { UserService } from './UserService';
const user = UserService.findById(id); // ✅ Fixed
```

**Re-validation:**
```
✅ Build successful
```

---

### Scenario 2: Type Error

**Agent creates endpoint:**
```typescript
async function createUser(req, res) {
  const userId = req.userId; // ❌ Error: Property 'userId' does not exist
}
```

**Validation runs:**
```
error TS2339: Property 'userId' does not exist on type 'Request'
```

**Auto-fix applied:**
```typescript
import { AuthenticatedRequest } from '../types';

async function createUser(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId; // ✅ Fixed
}
```

**Re-validation:**
```
✅ Build successful
```

---

### Scenario 3: Missing Dependency

**Agent creates file:** `emailService.ts`
```typescript
import { SendGrid } from '@sendgrid/mail'; // ❌ Error: Cannot find module
```

**Validation runs:**
```
error TS2307: Cannot find module '@sendgrid/mail'
```

**Auto-fix applied:**
```bash
npm install @sendgrid/mail
```

**Re-validation:**
```
✅ Build successful
```

---

## Next Steps

### For Testing Mode (Current)
- Agent will run validation after code implementation
- Agent will fix detected errors automatically
- Agent will stop after validation succeeds
- User can review changes before enabling full workflow

### For Production Mode (When Testing Disabled)
- Agent will run validation after code implementation
- Agent will fix detected errors automatically
- Agent will continue to testing phase
- Agent will create PR
- Agent will close ticket

---

## Documentation

**Full workflow documentation:**
- `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/validation-and-autofix.md`

**Memory updates:**
- `/Users/mohitshah/.claude/projects/-Users-mohitshah-Documents-HarborService-harbor-ai/memory/MEMORY.md`

**Execution workflow integration:**
- `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`

---

## Status

✅ **Validation & Auto-Fix Workflow: IMPLEMENTED**
✅ **Execution.md: UPDATED**
✅ **MEMORY.md: UPDATED**
✅ **Testing Mode: CONFIGURED**
✅ **Ready for Testing**

**The Harbor AI Agent will now automatically validate and fix code changes, ensuring projects remain stable and error-free.**

---

**Last Updated:** 2026-03-13
