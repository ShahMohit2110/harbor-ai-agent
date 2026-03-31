# Self-Auditing Verification System (SAVS)

**Version:** 1.0.0
**Purpose:** Agent verifies its own work before marking complete - NO hardcoded logic

---

## 🎯 Core Philosophy

**"Don't assume you did it right - VERIFY everything"**

**Before this system:**
- ❌ Agent creates file → assumes it's correct → moves on
- ❌ Agent forgets imports → breaks code → doesn't notice
- ❌ Agent forgets npm commands → doesn't verify

**After this system:**
- ✅ Agent creates file → verifies imports → checks compilation → then moves on
- ✅ Agent verifies all inclusions → checks dependencies → ensures completeness
- ✅ Agent verifies commands ran → checks output → confirms success

---

## 📋 Verification Layers

### Layer 1: File Creation Verification

**After creating ANY file, agent MUST:**

```markdown
## File Creation Checklist

For each file created:
- [ ] File exists at correct path
- [ ] File has content (not empty)
- [ ] File has correct syntax
- [ ] File compiles/runs without errors
- [ ] File has all required exports
- [ ] File has all required imports
```

**Example:**
```javascript
// Agent creates: models/Blog.ts

// AFTER creation, agent MUST verify:

// 1. Check file exists
if (!fileExists('models/Blog.ts')) {
  throw new Error("Blog.ts not created!");
}

// 2. Check file has content
const content = readFile('models/Blog.ts');
if (content.length === 0) {
  throw new Error("Blog.ts is empty!");
}

// 3. Check syntax
if (!hasValidTypeScriptSyntax(content)) {
  throw new Error("Blog.ts has syntax errors!");
}

// 4. Check exports
if (!content.includes('export')) {
  throw new Error("Blog.ts missing exports!");
}

// 5. Check imports are satisfied
if (content.includes('import')) {
  // Verify all imported modules exist
  verifyAllImportsExist(content);
}
```

---

### Layer 2: Import/Inclusion Verification

**🚨 THIS CATCHES THE "MISSING MODEL IMPORT" BUG**

**After creating a model, agent MUST:**

```markdown
## Model Inclusion Verification

When a new model is created:
- [ ] Find all files that should import this model
- [ ] Add import to each file
- [ ] Verify import is correct
- [ ] Verify file compiles with import
```

**How to find files dynamically (NO HARDCODING):**

```javascript
// Read documentation to understand what files need the model
async function findFilesThatNeedModel(modelName, repo) {
  const filesThatNeedModel = [];

  // 1. Read STRUCTURE.md to understand repo organization
  const structureDoc = readDocumentation(repo, 'STRUCTURE.md');

  // 2. Read ARCHITECTURE.md to understand usage patterns
  const archDoc = readDocumentation(repo, 'ARCHITECTURE.md');

  // 3. Search for patterns indicating model usage
  const allFiles = getAllFiles(repo);

  for (const file of allFiles) {
    const content = readFile(file);

    // Check if file is likely to use models
    // Based on documentation patterns
    if (file.includes('controller/') ||
        file.includes('service/') ||
        file.includes('repository/') ||
        file.includes('entity/') ||
        file.includes('model/')) {

      // Check if file already imports similar models
      if (content.includes('import') && content.includes('from')) {
        filesThatNeedModel.push(file);
      }
    }
  }

  return filesThatNeedModel;
}

// Add import to all files that need it
async function ensureModelImported(modelName, repo) {
  const files = await findFilesThatNeedModel(modelName, repo);

  for (const file of files) {
    let content = readFile(file);

    // Check if model already imported
    if (!content.includes(`import { ${modelName} }`)) {
      // Add import at the top with other imports
      content = addImportToFile(content, modelName);

      writeFile(file, content);

      // Verify file still compiles
      if (!fileCompiles(file)) {
        throw new Error(`File ${file} doesn't compile after adding ${modelName} import!`);
      }
    }
  }
}
```

**Example - Blog Model:**

```markdown
Model Created: models/Blog.ts

Step 1: Find files that need Blog model
- Search repo structure based on STRUCTURE.md
- Look for patterns in existing code
- Find files that import similar models

Step 2: Files found:
  - src/entities/index.ts (entity registry)
  - src/database/connection.ts (database config)
  - src/controllers/BlogController.ts (will use Blog)
  - src/repositories/BlogRepository.ts (will use Blog)

Step 3: Add imports to each file:
  - src/entities/index.ts: Add export * from './Blog'
  - src/database/connection.ts: Add import { Blog } from '../entities/Blog'
  - src/controllers/BlogController.ts: Add import { Blog } from '../../entities/Blog'
  - src/repositories/BlogRepository.ts: Add import { Blog } from '../../entities/Blog'

Step 4: Verify each file compiles
- Run TypeScript compiler check
- Fix any import errors
- Confirm all files compile
```

---

### Layer 3: Command Execution Verification

**🚨 THIS CATCHES THE "FORGOT NPM START" BUG**

**After running ANY command, agent MUST:**

```markdown
## Command Execution Verification

For every command run:
- [ ] Command executed successfully
- [ ] Command output checked
- [ ] Errors detected and reported
- [ ] Success confirmed
- [ ] Side effects verified
```

**Example - npm commands:**

```javascript
// Run npm install
async function runNpmInstall(repo) {
  const result = execSync('npm install', { cwd: repo });

  // Verify success
  if (result.status !== 0) {
    throw new Error("npm install failed!");
  }

  // Check output
  if (result.output.includes('ERR!')) {
    throw new Error("npm install had errors!");
  }

  // Verify package-lock.json updated
  if (!fileExists('package-lock.json')) {
    throw new Error("package-lock.json not created!");
  }

  // Verify node_modules exists
  if (!dirExists('node_modules')) {
    throw new Error("node_modules not created!");
  }

  return true; // Verified!
}

// Run npm start (for database-sync)
async function runNpmStart(repo) {
  // Run in background
  const process = spawn('npm', ['start'], {
    cwd: repo,
    detached: true
  });

  // Wait for startup
  await sleep(5000);

  // Check if process is still running
  if (processExited(process)) {
    throw new Error("npm start failed - process exited!");
  }

  // Check output for success message
  const logs = readLogs(repo);
  if (!logs.includes('Server started') && !logs.includes('Database synced')) {
    throw new Error("npm start didn't show success message!");
  }

  // Verify database changes
  const dbChanges = verifyDatabaseChanges(repo);
  if (!dbChanges.success) {
    throw new Error("Database sync failed!");
  }

  return true; // Verified!
}
```

**Example - database-sync:**

```markdown
Repository: database-sync

Step 1: Update package.json
- Version updated to 2.1.0

Step 2: Run npm install
- Command: npm install
- Verify: ✅ package-lock.json created
- Verify: ✅ node_modules updated
- Verify: ✅ No errors in output

Step 3: Register Blog model
- File: src/models/index.ts updated
- Import added: import { Blog } from '@shared-models/blog'

Step 4: Run npm start
- Command: npm start
- Wait for process to start
- Verify: ✅ Process still running (not crashed)
- Verify: ✅ Logs show "Database synced"
- Verify: ✅ Blog table exists in database
- Verify: ✅ No errors in logs

Step 5: Stop process
- Command: Kill npm start process
- Verify: ✅ Process stopped

Result: ✅ Database sync verified!
```

---

### Layer 4: Continuation Verification

**🚨 THIS PREVENTS "AGENT GOT STUCK" BUG**

**After completing work on a repo, agent MUST:**

```markdown
## Continuation Checklist

Before moving to next repo:
- [ ] Current repo work complete
- [ ] All verifications passed
- [ ] All files created
- [ ] All imports added
- [ ] All commands run and verified
- [ ] Documentation updated (if needed)
- [ ] Ready to proceed to next repo

If any item failed:
- [ ] Fix the issue
- [ ] Re-verify
- [ ] Only then proceed
```

**Self-Audit Loop:**

```javascript
async function workOnRepo(repo, task) {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      // Do the work
      await implementChanges(repo, task);

      // Verify the work
      await verifyAllChanges(repo, task);

      // If we get here, all verifications passed
      console.log(`✅ ${repo} completed successfully`);

      // Self-audit: Ask "Am I done?"
      const auditResult = await selfAudit(repo, task);

      if (auditResult.complete) {
        // Yes, I'm done - move to next repo
        return { success: true, repo };
      } else {
        // Not done - fix issues
        console.log(`⚠️ Audit found issues, fixing...`);
        await fixAuditIssues(auditResult.issues);
        attempts++;
      }

    } catch (error) {
      // Something failed
      console.error(`❌ Error working on ${repo}:`, error);

      // Try to fix
      await fixError(error);
      attempts++;

      if (attempts >= maxAttempts) {
        throw new Error(`Failed to complete ${repo} after ${maxAttempts} attempts`);
      }
    }
  }
}
```

**Self-Audit Questions:**

```javascript
async function selfAudit(repo, task) {
  const issues = [];

  // Question 1: Did I create all required files?
  const requiredFiles = getRequiredFiles(repo, task);
  for (const file of requiredFiles) {
    if (!fileExists(file)) {
      issues.push({ type: 'MISSING_FILE', file });
    }
  }

  // Question 2: Did I add all required imports?
  const createdFiles = getCreatedFiles(repo);
  for (const file of createdFiles) {
    const content = readFile(file);
    const requiredImports = getRequiredImports(file, repo);
    for (const imp of requiredImports) {
      if (!content.includes(imp)) {
        issues.push({ type: 'MISSING_IMPORT', file, import: imp });
      }
    }
  }

  // Question 3: Did I run all required commands?
  const requiredCommands = getRequiredCommands(repo, task);
  for (const cmd of requiredCommands) {
    if (!commandRanSuccessfully(cmd)) {
      issues.push({ type: 'COMMAND_FAILED', command: cmd });
    }
  }

  // Question 4: Does everything compile?
  if (!repoCompiles(repo)) {
    issues.push({ type: 'COMPILATION_ERROR' });
  }

  // Question 5: Did I test the changes?
  if (!changesTested(repo)) {
    issues.push({ type: 'NOT_TESTED' });
  }

  return {
    complete: issues.length === 0,
    issues
  };
}
```

**Anti-Stuck Mechanism:**

```javascript
// Before moving to next repo, check if stuck
async function checkIfStuck(repo) {
  // 1. Check if I'm making progress
  const lastProgress = getLastProgressTimestamp();
  const timeSinceProgress = Date.now() - lastProgress;

  if (timeSinceProgress > 60000) { // 1 minute
    // I'm stuck!
    console.log("⚠️ No progress for 1 minute, checking...");

    // 2. Check what I was doing
    const currentTask = getCurrentTask();
    console.log(`Current task: ${currentTask}`);

    // 3. Check if task is complete
    const isComplete = await isTaskComplete(currentTask);

    if (isComplete) {
      // Task is complete, I just forgot to mark it done
      console.log("✅ Task was complete, moving on");
      markTaskComplete(currentTask);
      return true;
    } else {
      // Task is not complete, resume work
      console.log("⚠️ Task not complete, resuming...");
      resumeTask(currentTask);
      return false;
    }
  }

  return false; // Not stuck
}
```

---

### Layer 5: Cross-Repo Dependency Verification

**🚨 THIS VERIFIES DEPENDENCIES BETWEEN REPOS**

```markdown
## Cross-Repo Verification

Before marking task complete:
- [ ] All repos updated
- [ ] All dependencies satisfied
- [ ] All version updates propagated
- [ ] All imports work
- [ ] All integrations tested
```

**Example:**

```javascript
// After working on all repos
async function verifyCrossRepoDependencies(repos) {
  // For each repo
  for (const repo of repos) {
    // Read package.json
    const packageJson = readPackageJson(repo);

    // Check all dependencies
    for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
      // Is this a workspace/internal dependency?
      if (isInternalDependency(depName)) {
        // Verify the dependency exists and is published
        const depExists = await verifyInternalDependencyPublished(depName, depVersion);

        if (!depExists) {
          throw new Error(`Dependency ${depName}@${depVersion} not found! Did you publish it?`);
        }
      }
    }

    // Try to install dependencies
    const installResult = runNpmInstall(repo);
    if (!installResult.success) {
      throw new Error(`npm install failed in ${repo}!`);
    }

    // Try to compile
    const compileResult = runNpmRunBuild(repo);
    if (!compileResult.success) {
      throw new Error(`npm run build failed in ${repo}!`);
    }
  }

  return true; // All cross-deps verified
}
```

---

## 📊 Enhanced Workflow

### Before SAVS:
```
Agent creates file
  → Assumes it's correct
  → Moves on
  → ❌ Something broken
```

### After SAVS:
```
Agent creates file
  → Verifies file exists
  → Verifies file has content
  → Verifies file compiles
  → Verifies all imports present
  → Verifies all imports work
  → Runs npm commands
  → Verifies commands succeeded
  → Tests changes
  → Self-audit: Am I done?
  → Only THEN moves on
  → ✅ Everything works
```

---

## 🎯 Verification Checklist (For Agent Use)

**Agent MUST go through this checklist before marking ANY repo complete:**

```markdown
## Repository Completion Verification

**Repository:** {repo-name}

### File Creation
- [ ] All required files created
- [ ] All files have content
- [ ] All files have correct syntax
- [ ] All files compile successfully

### Imports & Dependencies
- [ ] All required imports added
- [ ] All imports resolve correctly
- [ ] No circular dependencies
- [ ] All types/interfaces available

### Model Inclusions (if model created)
- [ ] Model exported from its file
- [ ] Model imported in entity registry
- [ ] Model imported in database config
- [ ] Model imported in files that use it
- [ ] Model registered with ORM

### Commands Executed
- [ ] npm install run (if needed)
- [ ] npm run build run (if needed)
- [ ] npm start run (if needed)
- [ ] All commands succeeded
- [ ] All command outputs verified

### Testing
- [ ] Changes tested locally
- [ ] No compilation errors
- [ ] No runtime errors
- [ ] Database changes verified (if applicable)

### Documentation
- [ ] DOCUMENTATION.md updated (if needed)
- [ ] CHANGELOG.md updated (if shared package)

### Self-Audit
- [ ] Am I truly done with this repo?
- [ ] Did I miss anything?
- [ ] Is everything verified?
- [ ] Can I safely move to next repo?

Only when ALL items checked:
  ✅ Mark repo complete
  ✅ Move to next repo
```

---

## 🔧 How Agent Uses SAVS

### Integration Point:

```javascript
// In agent execution loop
async function executeTask(task) {
  const repos = getAffectedRepos(task);

  for (const repo of repos) {
    console.log(`\n🔧 Working on: ${repo}`);

    // Do the work
    await implementChanges(repo, task);

    // VERIFY the work (SAVS)
    const verification = await verifyRepository(repo, task);

    if (!verification.success) {
      console.log(`❌ Verification failed for ${repo}`);
      console.log(`Issues:`, verification.issues);

      // Fix issues
      await fixVerificationIssues(verification.issues);

      // Re-verify
      const recheck = await verifyRepository(repo, task);
      if (!recheck.success) {
        throw new Error(`Failed to verify ${repo} after fixes!`);
      }
    }

    console.log(`✅ ${repo} verified successfully`);
  }

  // Final cross-repo verification
  await verifyCrossRepoDependencies(repos);

  console.log(`\n✅ All repos verified successfully!`);
}
```

---

## 📚 Documentation Enhancement

**To make SAVS work better, enhance documentation:**

### In each repo's docs/ folder, add:

#### 1. IMPORT_PATTERNS.md
```markdown
# Import Patterns

## How models are imported in this repo:

### Entity Registry
- File: `src/entities/index.ts`
- Pattern: `export * from './ModelName'`
- When adding model: Add export here

### Database Configuration
- File: `src/database/connection.ts`
- Pattern: `import { ModelName } from '../entities/ModelName'`
- When adding model: Import here

### Controllers
- File: `src/controllers/*Controller.ts`
- Pattern: `import { ModelName } from '../../entities/ModelName'`
- When adding model: Import in controller that uses it

### Repositories
- File: `src/repositories/*Repository.ts`
- Pattern: `import { ModelName } from '../../entities/ModelName'`
- When adding model: Import in repository that uses it
```

#### 2. COMMAND_VERIFY.md
```markdown
# Command Verification

## How to verify commands succeeded:

### npm install
- Success indicator: `package-lock.json` updated
- Success indicator: `node_modules/` directory exists
- Success indicator: No `ERR!` in output

### npm run build
- Success indicator: `dist/` directory created
- Success indicator: No TypeScript errors
- Success indicator: Exit code 0

### npm start (database-sync)
- Success indicator: Process stays running
- Success indicator: Logs show "Server started"
- Success indicator: Logs show "Database synced"
- Success indicator: Tables created in database
```

#### 3. VERIFICATION_CHECKLIST.md
```markdown
# Repository Verification Checklist

## Before marking this repo complete:

### Files Created
- [ ] All required files exist at correct paths
- [ ] All files have content (not empty)
- [ ] All files compile without errors

### Imports Added
- [ ] All models exported from entity registry
- [ ] All models imported in database config
- [ ] All models imported in using files

### Commands Run
- [ ] npm install succeeded
- [ ] npm run build succeeded (if needed)
- [ ] npm start succeeded (if needed)

### Testing
- [ ] Changes tested locally
- [ ] No errors in logs
- [ ] Database changes verified (if applicable)
```

---

**Version:** 1.0.0
**Last Updated:** 2026-03-25
**Purpose:** Self-verification system - NO hardcoded logic
