# Documentation Enhancement Templates

**Purpose:** Make documentation more detailed so agent can understand without hardcoding

---

## 📁 For Each Repository, Add These Files to `docs/` folder

### Template 1: IMPORT_PATTERNS.md

**What this does:** Tells agent how imports work in this repo

```markdown
# Import Patterns

**Repository:** {repo-name}
**Last Updated:** {date}

---

## How Models/Entities Are Imported

### 1. Entity Registry (MANDATORY)

**File:** `src/entities/index.ts` OR `src/models/index.ts`

**Pattern:**
```typescript
// Add export for each entity
export * from './User';
export * from './Blog';
export * from './Comment';
```

**When adding new model:**
- ✅ Add `export * from './NewModel';` to this file
- ❌ Do NOT forget this step

**How to verify:**
- File should exist
- File should have exports for all models
- New model should be exported

---

### 2. Database Configuration (MANDATORY)

**File:** `src/database/connection.ts` OR `src/config/database.ts`

**Pattern:**
```typescript
// Import all entities
import { User } from '../entities/User';
import { Blog } from '../entities/Blog';
import { Comment } from '../entities/Comment';

// Register with ORM
entities: [
  User,
  Blog,
  Comment
]
```

**When adding new model:**
- ✅ Import the model at top
- ✅ Add model to entities array
- ❌ Do NOT forget this step

**How to verify:**
- Model imported at top of file
- Model in entities array
- File compiles without errors

---

### 3. Controllers (IF MODEL USED)

**File:** `src/controllers/{Model}Controller.ts`

**Pattern:**
```typescript
// Import the model
import { Blog } from '../../entities/Blog';

// Use in controller
export class BlogController {
  async getAll(): Promise<Blog[]> {
    // ...
  }
}
```

**When adding new model:**
- ✅ Import model in controller
- ✅ Only if controller uses the model
- ❌ Do NOT import if not used

**How to verify:**
- Import statement present
- Model used in controller methods
- No TypeScript errors

---

### 4. Repositories (IF MODEL USED)

**File:** `src/repositories/{Model}Repository.ts`

**Pattern:**
```typescript
// Import the model
import { Blog } from '../../entities/Blog';

// Use in repository
export class BlogRepository {
  async findAll(): Promise<Blog[]> {
    // ...
  }
}
```

**When adding new model:**
- ✅ Import model in repository
- ✅ Only if repository manages the model
- ❌ Do NOT import if not used

**How to verify:**
- Import statement present
- Model used in repository methods
- No TypeScript errors

---

## How Shared Packages Are Imported

### From shared-models

**Pattern:**
```typescript
// Import from shared-models package
import { User, Blog } from '@harbor-shared/models';
```

**When to use:**
- ✅ When using models from shared-models
- ✅ In services, controllers, repositories
- ❌ Do NOT use relative path

**How to verify:**
- Import uses `@harbor-shared/models`
- Not using relative path like `../../../shared-models`

---

## Import Verification Commands

**After adding imports, run:**

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Should show: No errors

# If errors: Fix imports before proceeding
```

---

## Common Mistakes to Avoid

### ❌ Wrong:
```typescript
// Missing export in entity registry
// Model created but not exported

// Missing import in database config
// Model exists but not registered with ORM

// Using relative path instead of package
import { Blog } from '../../../shared-models/src/entities/Blog';
```

### ✅ Right:
```typescript
// Export in entity registry
export * from './Blog';

// Import in database config
import { Blog } from '../entities/Blog';

// Use package import
import { Blog } from '@harbor-shared/models';
```

---

**Remember:** When adding a new model, ALWAYS:
1. Create the model file
2. Export from entity registry
3. Import in database config
4. Import in files that use it
5. Verify compilation succeeds

**End of Import Patterns**
```

---

### Template 2: COMMAND_VERIFY.md

**What this does:** Tells agent how to verify commands succeeded

```markdown
# Command Verification Guide

**Repository:** {repo-name}
**Last Updated:** {date}

---

## How to Verify Commands Succeeded

### 1. npm install

**When to run:** After updating package.json dependencies

**Command:**
```bash
npm install
```

**Success Indicators:**
- ✅ `package-lock.json` file updated/created
- ✅ `node_modules/` directory exists
- ✅ No `ERR!` messages in output
- ✅ Exit code is 0

**How to verify:**
```bash
# Check package-lock.json exists
ls -la package-lock.json
# Should exist

# Check node_modules exists
ls -la node_modules/
# Should exist and have packages

# Check for errors in output
# If you see "ERR!" something failed

# Check exit code
echo $?
# Should be 0
```

**What to do if failed:**
- Check error messages
- Fix dependency issues
- Try `npm install` again
- Do NOT proceed until successful

---

### 2. npm run build

**When to run:** After making TypeScript changes

**Command:**
```bash
npm run build
```

**Success Indicators:**
- ✅ `dist/` directory created (or build output directory)
- ✅ No TypeScript errors
- ✅ No "Cannot find module" errors
- ✅ Exit code is 0

**How to verify:**
```bash
# Check dist directory exists
ls -la dist/
# Should exist and have .js files

# Check for TypeScript errors
# If you see TS errors, fix them first

# Check exit code
echo $?
# Should be 0
```

**What to do if failed:**
- Check TypeScript errors
- Fix import issues
- Fix type errors
- Try `npm run build` again
- Do NOT proceed until successful

---

### 3. npm start (For database-sync)

**When to run:** After registering new models

**Command:**
```bash
npm start
```

**Success Indicators:**
- ✅ Process stays running (doesn't exit immediately)
- ✅ Logs show "Server started" or "Database synced"
- ✅ Logs show model/table creation
- ✅ No error messages in logs
- ✅ Database tables created

**How to verify:**
```bash
# Start process
npm start &
PID=$!

# Wait for startup
sleep 5

# Check if still running
ps -p $PID
# Should show process exists

# Check logs for success message
tail -f logs/app.log
# Should see "Server started" or "Database synced"

# Check database
# Connect to database and list tables
# Should see new tables created

# Stop process
kill $PID
```

**What to do if failed:**
- Check error logs
- Check database connection
- Verify model imports
- Verify model registration
- Fix issues and try again
- Do NOT proceed until successful

---

### 4. npm publish (For shared-models)

**When to run:** After updating models and bumping version

**Command:**
```bash
npm publish
```

**Success Indicators:**
- ✅ Package published to registry
- ✅ Can see package in registry
- ✅ New version available
- ✅ No "E404" errors
- ✅ Exit code is 0

**How to verify:**
```bash
# Check if package published
npm view {package-name} versions
# Should show new version

# Try installing in another repo
cd /path/to/other-repo
npm install {package-name}@{new-version}
# Should install successfully

# Check exit code
echo $?
# Should be 0
```

**What to do if failed:**
- Check you're logged in (`npm whoami`)
- Check package.json version is bumped
- Check build succeeded before publish
- Check registry URL
- Fix issues and try again
- Do NOT proceed until successful

---

### 5. TypeScript Type Check

**When to run:** After making any code changes

**Command:**
```bash
npx tsc --noEmit
```

**Success Indicators:**
- ✅ No TypeScript errors
- ✅ No "Cannot find module" errors
- ✅ No type errors
- ✅ Exit code is 0

**How to verify:**
```bash
# Run type check
npx tsc --noEmit

# Check output
# Should show nothing (no errors)

# Check exit code
echo $?
# Should be 0
```

**What to do if failed:**
- Check TypeScript errors
- Fix missing imports
- Fix type errors
- Fix interface mismatches
- Run again until no errors
- Do NOT proceed until successful

---

## Command Verification Checklist

**Before marking task complete, verify:**

```markdown
### For npm install:
- [ ] package-lock.json exists/updated
- [ ] node_modules/ exists
- [ ] No ERR! in output
- [ ] Exit code 0

### For npm run build:
- [ ] dist/ or build/ directory created
- [ ] No TypeScript errors
- [ ] No missing modules
- [ ] Exit code 0

### For npm start (database-sync):
- [ ] Process stays running
- [ ] Logs show success message
- [ ] Database tables created
- [ ] No errors in logs

### For npm publish:
- [ ] Package visible in registry
- [ ] New version installable
- [ ] No E404 errors
- [ ] Exit code 0

### For TypeScript check:
- [ ] No type errors
- [ ] No missing imports
- [ ] All modules found
- [ ] Exit code 0
```

---

## Common Issues and Solutions

### Issue: npm install fails
```
ERESOLVE unable to resolve dependency tree
```
**Solution:**
- Check package.json versions
- Use `--legacy-peer-deps` if needed
- Fix version conflicts

### Issue: npm run build fails
```
TS2307: Cannot find module
```
**Solution:**
- Check import paths
- Verify module exists
- Install missing dependency

### Issue: npm start fails
```
Error: connect ECONNREFUSED
```
**Solution:**
- Check database connection
- Verify database running
- Check connection string

### Issue: npm publish fails
```
E404 Not Found
```
**Solution:**
- Check you're logged in
- Check package name
- Check registry URL

---

**End of Command Verification Guide**
```

---

### Template 3: VERIFICATION_CHECKLIST.md

**What this does:** Checklist for agent to verify repo is complete

```markdown
# Repository Verification Checklist

**Repository:** {repo-name}
**Last Updated:** {date}

---

## 🚨 CRITICAL: Before Marking This Repository Complete

**Go through ENTIRE checklist. Do NOT skip.**

---

## Phase 1: File Creation Verification

### Models/Entities Created
- [ ] Model file created (e.g., `src/entities/Blog.ts`)
- [ ] Model file has content (not empty)
- [ ] Model has all required fields
- [ ] Model has decorators (if using TypeORM)
- [ ] Model exported correctly

### Controllers Created
- [ ] Controller file created (e.g., `src/controllers/BlogController.ts`)
- [ ] Controller has ALL CRUD methods:
  - [ ] `getAll()` or `findAll()`
  - [ ] `getById(id)` or `findOne(id)`
  - [ ] `create(data)`
  - [ ] `update(id, data)`
  - [ ] `delete(id)`
- [ ] Controller has error handling
- [ ] Controller exported correctly

### Services Created
- [ ] Service file created (e.g., `src/services/BlogService.ts`)
- [ ] Service has ALL business logic methods:
  - [ ] `getAll()` or `findAll()`
  - [ ] `getById(id)` or `findOne(id)`
  - [ ] `create(data)`
  - [ ] `update(id, data)`
  - [ ] `delete(id)`
- [ ] Service has business rules
- [ ] Service exported correctly

### Repositories Created
- [ ] Repository file created (e.g., `src/repositories/BlogRepository.ts`)
- [ ] Repository has ALL data access methods:
  - [ ] `findAll()` or `find()`
  - [ ] `findById(id)` or `findOne(id)`
  - [ ] `create(data)`
  - [ ] `update(id, data)`
  - [ ] `delete(id)`
- [ ] Repository has error handling
- [ ] Repository exported correctly

### Routes Created
- [ ] Routes file created (e.g., `src/routes/blog.routes.ts`)
- [ ] Routes has ALL endpoints:
  - [ ] `GET /api/resource`
  - [ ] `GET /api/resource/:id`
  - [ ] `POST /api/resource`
  - [ ] `PUT /api/resource/:id`
  - [ ] `DELETE /api/resource/:id`
- [ ] Routes registered in app
- [ ] Routes exported correctly

### DTOs Created
- [ ] CreateDTO file created
- [ ] UpdateDTO file created
- [ ] ResponseDTO file created
- [ ] DTOs have validation decorators
- [ ] DTOs exported correctly

---

## Phase 2: Import & Inclusion Verification

### Entity Registry (CRITICAL)
- [ ] Entity registry file exists (`src/entities/index.ts`)
- [ ] New entity exported from registry
- [ ] Export uses correct pattern: `export * from './EntityName'`
- [ ] File compiles without errors

**Example check:**
```typescript
// src/entities/index.ts
export * from './User';
export * from './Blog';  // ← Add this
export * from './Comment';
```

### Database Configuration (CRITICAL)
- [ ] Database config file exists
- [ ] New entity imported in config
- [ ] New entity added to entities array
- [ ] File compiles without errors

**Example check:**
```typescript
// src/database/connection.ts
import { Blog } from '../entities/Blog';  // ← Add this

entities: [
  User,
  Blog,  // ← Add this
  Comment
]
```

### Controllers
- [ ] Entity imported in controller
- [ ] Import uses correct path
- [ ] Entity used in controller methods
- [ ] File compiles without errors

**Example check:**
```typescript
// src/controllers/BlogController.ts
import { Blog } from '../../entities/Blog';  // ← Add this

export class BlogController {
  async getAll(): Promise<Blog[]> {  // ← Used here
    // ...
  }
}
```

### Repositories
- [ ] Entity imported in repository
- [ ] Import uses correct path
- [ ] Entity used in repository methods
- [ ] File compiles without errors

**Example check:**
```typescript
// src/repositories/BlogRepository.ts
import { Blog } from '../../entities/Blog';  // ← Add this

export class BlogRepository {
  async findAll(): Promise<Blog[]> {  // ← Used here
    // ...
  }
}
```

---

## Phase 3: Command Execution Verification

### npm install (If dependencies updated)
- [ ] Command executed: `npm install`
- [ ] package-lock.json updated/created
- [ ] node_modules/ directory exists
- [ ] No ERR! messages in output
- [ ] Exit code is 0

### npm run build (If TypeScript changes)
- [ ] Command executed: `npm run build`
- [ ] dist/ directory created
- [ ] No TypeScript errors
- [ ] No missing module errors
- [ ] Exit code is 0

### npx tsc --noEmit (Type check)
- [ ] Command executed: `npx tsc --noEmit`
- [ ] No type errors
- [ ] No missing imports
- [ ] All modules found
- [ ] Exit code is 0

### npm start (If database-sync repo)
- [ ] Command executed: `npm start`
- [ ] Process stays running (doesn't crash)
- [ ] Logs show "Server started" or "Database synced"
- [ ] New tables created in database
- [ ] No errors in logs

### npm publish (If shared-models repo)
- [ ] Version bumped in package.json
- [ ] Command executed: `npm run build`
- [ ] Command executed: `npm publish`
- [ ] Package visible in registry
- [ ] New version installable

---

## Phase 4: Integration Testing

### TypeScript Compilation
- [ ] All files compile without errors
- [ ] No type errors
- [ ] No missing imports
- [ ] No unused imports

### Runtime Testing
- [ ] Service starts without errors
- [ ] No runtime exceptions
- [ ] Database operations work
- [ ] API endpoints respond

### Database Verification (If applicable)
- [ ] Tables created in database
- [ ] Table schema correct
- [ ] Indexes created
- [ ] Constraints applied

---

## Phase 5: Self-Audit Questions

**Before moving to next repo, ask yourself:**

### Question 1: File Completeness
- Did I create ALL required files?
- Are ALL files non-empty?
- Do ALL files compile?

**If NO:** Create missing files, fix compilation errors

---

### Question 2: Import Completeness
- Did I export new model from entity registry?
- Did I import new model in database config?
- Did I import new model in files that use it?

**If NO:** Add missing imports, recheck compilation

---

### Question 3: Command Completeness
- Did I run npm install (if needed)?
- Did I run npm run build (if needed)?
- Did I run npm start (if database-sync)?
- Did I run npm publish (if shared-models)?

**If NO:** Run missing commands, verify success

---

### Question 4: Testing Completeness
- Did I verify TypeScript compilation?
- Did I verify runtime execution?
- Did I verify database changes (if applicable)?

**If NO:** Run missing tests, verify results

---

### Question 5: Am I Truly Done?
- Is EVERYTHING verified?
- Are ALL checks green?
- Can I safely move to next repo?

**If NO:** Fix issues, re-verify

**Only if ALL YES:** Mark repo complete, move to next repo

---

## Phase 6: Documentation Updates (If Needed)

- [ ] ARCHITECTURE.md updated (if structure changed)
- [ ] CHANGELOG.md updated (if shared package)
- [ ] API_PATTERNS.md updated (if API changed)
- [ ] MODEL_FLOW.md updated (if model flow changed)

---

## Final Verification

**Before saying "I'm done with this repo":**

Run this final check:

```bash
# 1. Check all files exist
find src -name "*.ts" -type f | grep -E "(Controller|Service|Repository|routes|dto)"

# 2. Check TypeScript compiles
npx tsc --noEmit
# Should show no errors

# 3. Check tests pass (if tests exist)
npm test
# Should pass

# 4. Check service starts (if applicable)
npm start &
# Wait 5 seconds
# Should stay running
# Then kill it
```

**If ALL checks pass:**
✅ Repo is complete
✅ Move to next repo

**If ANY check fails:**
❌ Repo is NOT complete
❌ Fix issues
❌ Re-verify
❌ Only then proceed

---

## Anti-Pattern Prevention

### ❌ Don't Do This:
- Create file but forget to export it
- Create model but forget to register it
- Run command but don't verify it succeeded
- Assume everything works without testing
- Move to next repo with incomplete work

### ✅ Do This Instead:
- Create file AND verify it exists
- Create model AND export it AND register it
- Run command AND verify it succeeded
- Test everything before proceeding
- Only move to next repo when 100% complete

---

**Remember:** It's better to spend extra time verifying than to have broken code!

**End of Verification Checklist**
```

---

### Template 4: REPOSITORY_COMPLETION.md

**What this does:** Step-by-step completion guide

```markdown
# Repository Completion Guide

**Repository:** {repo-name}
**Repository Type:** {Shared Package | Database Infrastructure | Business Logic | Gateway | Frontend}

---

## 🚀 How to Complete Work in This Repository

### Step 1: Create Required Files

**Based on repository type, create these files:**

**If Business Logic:**
```
src/controllers/{Resource}Controller.ts
src/services/{Resource}Service.ts
src/repositories/{Resource}Repository.ts
src/routes/{resource}.routes.ts
src/dto/{resource}.dto.ts
```

**If Shared Package:**
```
src/models/{Model}.ts
src/types/{model}.ts
```

**If Database Infrastructure:**
```
src/config/models.ts (update with new model)
```

**For EACH file:**
- [ ] File created at correct path
- [ ] File has content (not empty)
- [ ] File has correct syntax
- [ ] File compiles without errors

---

### Step 2: Add All Imports

**For NEW models created:**

1. **Export from entity registry:**
   ```bash
   File: src/entities/index.ts
   Add: export * from './NewModel';
   Verify: File compiles
   ```

2. **Import in database config:**
   ```bash
   File: src/database/connection.ts
   Add: import { NewModel } from '../entities/NewModel';
   Add: NewModel to entities array
   Verify: File compiles
   ```

3. **Import in using files:**
   ```bash
   Files: src/controllers/*, src/repositories/*
   Add: import { NewModel } from '../../entities/NewModel';
   Verify: Files compile
   ```

**For SHARED packages:**
- [ ] Import from package name (not relative path)
- [ ] Verify package installed
- [ ] Verify import resolves

---

### Step 3: Implement ALL Methods

**For Controllers:**
- [ ] `getAll()` - GET /api/resource
- [ ] `getById(id)` - GET /api/resource/:id
- [ ] `create(data)` - POST /api/resource
- [ ] `update(id, data)` - PUT /api/resource/:id
- [ ] `delete(id)` - DELETE /api/resource/:id

**For Services:**
- [ ] `getAll()` business logic
- [ ] `getById(id)` business logic
- [ ] `create(data)` business logic
- [ ] `update(id, data)` business logic
- [ ] `delete(id)` business logic

**For Repositories:**
- [ ] `findAll()` data access
- [ ] `findById(id)` data access
- [ ] `create(data)` data access
- [ ] `update(id, data)` data access
- [ ] `delete(id)` data access

**For Routes:**
- [ ] GET /api/resource
- [ ] GET /api/resource/:id
- [ ] POST /api/resource
- [ ] PUT /api/resource/:id
- [ ] DELETE /api/resource/:id

---

### Step 4: Run Required Commands

**Based on repository type:**

**If Shared Package:**
```bash
1. npm run build
   Verify: dist/ created, no errors

2. npm publish
   Verify: Package in registry, version installable

3. Update CHANGELOG.md
   Verify: Changes documented
```

**If Database Infrastructure:**
```bash
1. npm install
   Verify: package-lock.json updated, node_modules exists

2. npm start
   Verify: Process running, logs show success, tables created

3. Stop process
   Verify: Clean shutdown
```

**If Business Logic:**
```bash
1. npm install
   Verify: package-lock.json updated, node_modules exists

2. npx tsc --noEmit
   Verify: No type errors

3. npm run build (if build script exists)
   Verify: dist/ created, no errors
```

---

### Step 5: Verify Everything

**Run these checks:**

```bash
# Check all files exist
find src -name "*.ts" -type f

# Check TypeScript compiles
npx tsc --noEmit

# Check tests pass (if applicable)
npm test

# Check service runs (if applicable)
npm start &
# Wait, check logs, stop
```

**If ANY check fails:**
- Fix the issue
- Re-run the check
- Only proceed when ALL pass

---

### Step 6: Self-Audit

**Ask yourself these questions:**

1. **Are ALL required files created?**
   - If NO → Create missing files

2. **Are ALL imports added?**
   - If NO → Add missing imports

3. **Are ALL methods implemented?**
   - If NO → Implement missing methods

4. **Are ALL commands run successfully?**
   - If NO → Run and verify commands

5. **Does EVERYTHING compile and run?**
   - If NO → Fix errors, re-verify

6. **Can I safely move to next repo?**
   - Only if ALL above are YES

---

### Step 7: Mark Complete

**Only when ALL checks pass:**
- ✅ All files created
- ✅ All imports added
- ✅ All methods implemented
- ✅ All commands verified
- ✅ Everything compiles
- ✅ Everything runs

**Then:**
- Mark repo as complete
- Move to next repo
- Update documentation (if needed)

---

**End of Repository Completion Guide**
```

---

## 🎯 How to Use These Templates

### For Each Repository:

1. **Copy the templates** to `docs/` folder
2. **Customize** for the specific repo
3. **Update** as repo structure changes

### Example - For shared-models repo:

```bash
cd /path/to/shared-models
mkdir -p docs

# Copy templates
cp IMPORT_PATTERNS.md docs/
cp COMMAND_VERIFY.md docs/
cp VERIFICATION_CHECKLIST.md docs/
cp REPOSITORY_COMPLETION.md docs/

# Customize for shared-models
# Edit each file, replace {repo-name} with "shared-models"
# Add specific patterns for this repo
```

### Example - For database-sync repo:

```bash
cd /path/to/database-sync
mkdir -p docs

# Copy templates
cp IMPORT_PATTERNS.md docs/
cp COMMAND_VERIFY.md docs/
cp VERIFICATION_CHECKLIST.md docs/
cp REPOSITORY_COMPLETION.md docs/

# Customize for database-sync
# Edit each file, replace {repo-name} with "database-sync"
# Add specific patterns for this repo
```

---

## ✅ Benefits of Enhanced Documentation

### For the Agent:
- ✅ Knows exactly where to add imports
- ✅ Knows how to verify commands succeeded
- ✅ Knows what checks to perform
- ✅ Knows when repo is truly complete
- ✅ No guessing, no assumptions

### For You:
- ✅ Less broken code
- ✅ Fewer missing imports
- ✅ Fewer forgotten commands
- ✅ More reliable agent
- ✅ Better documentation overall

---

**Remember:** Good documentation = Smart agent (without hardcoding!)

**End of Documentation Enhancement Templates**
