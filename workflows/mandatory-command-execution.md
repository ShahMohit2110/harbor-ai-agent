# MANDATORY Command Execution Framework

**Version:** 1.0.0
**Purpose:** Agent MUST run required commands and VERIFY they succeeded

---

## 🚨 PROBLEM: Agent Updates Files But Doesn't Run Commands

**Current Issue:**
```
database-sync updated
  ✅ Files updated
  ❌ npm start NOT run
  ❌ Database NOT synced
```

**Root Cause:**
Agent treats command execution as **OPTIONAL** instead of **MANDATORY**.

---

## ✅ SOLUTION: MANDATORY Command Execution with Verification

**Agent MUST:**

1. **IDENTIFY** required commands (from documentation)
2. **EXECUTE** all required commands
3. **VERIFY** each command succeeded
4. **RETRY** if command failed
5. **NOT mark complete** until ALL commands verified

---

## 📋 Command Execution Protocol

### Phase: Command Execution & Verification

**🚨 CRITICAL: This happens AFTER implementation, BEFORE marking complete**

---

### Step 1: Identify Required Commands

**For EACH repository, READ documentation to find required commands:**

```bash
# Read COMMAND_VERIFY.md from repo
cat /path/to/repo/docs/COMMAND_VERIFY.md

# Extract required commands based on repository type
```

**Repository Type → Required Commands:**

**Shared Package (shared-models):**
```markdown
Required Commands:
1. npm run build
2. npm publish
```

**Database Infrastructure (database-sync):**
```markdown
Required Commands:
1. npm install
2. npm start (MUST run to sync database)
```

**Business Logic (job-service, user-service):**
```markdown
Required Commands:
1. npm install
2. npx tsc --noEmit (verify types)
3. npm run build (if build script exists)
```

---

### Step 2: Execute Commands MANDATORILY

**🚨 CRITICAL: Commands are NOT optional!**

```javascript
// For EACH required command
async function executeRequiredCommands(repo, task) {
  console.log(`\n🔧 Executing commands for: ${repo}`);

  // Identify required commands
  const requiredCommands = getRequiredCommands(repo, task);

  // EXECUTE EACH COMMAND MANDATORILY
  for (const cmd of requiredCommands) {
    console.log(`  Running: ${cmd}`);

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        // Execute command
        const result = await executeCommand(cmd, repo);

        // Verify command succeeded
        const success = await verifyCommandSuccess(cmd, result, repo);

        if (success) {
          console.log(`  ✅ ${cmd} succeeded`);
          break; // Move to next command
        } else {
          throw new Error(`Command verification failed: ${cmd}`);
        }

      } catch (error) {
        console.error(`  ❌ ${cmd} failed:`, error);
        attempts++;

        if (attempts >= maxAttempts) {
          throw new Error(`Failed to execute ${cmd} after ${maxAttempts} attempts`);
        }

        // Retry
        console.log(`  🔄 Retrying ${cmd}...`);
        await sleep(2000);
      }
    }
  }

  console.log(`  ✅ All commands executed successfully`);
}
```

---

### Step 3: Verify Each Command Succeeded

**🚨 CRITICAL: Execute is NOT enough - MUST verify!**

**For each command type, verify success indicators:**

#### npm install
```javascript
async function verifyNpmInstall(repo) {
  // Check success indicators
  const checks = [
    fileExists(path.join(repo, 'package-lock.json')),
    dirExists(path.join(repo, 'node_modules')),
    noErrorsInOutput(npmOutput)
  ];

  if (!checks.every(c => c)) {
    throw new Error('npm install verification failed!');
  }

  return true;
}
```

#### npm run build
```javascript
async function verifyNpmBuild(repo) {
  // Check success indicators
  const checks = [
    dirExists(path.join(repo, 'dist/')) ||
    dirExists(path.join(repo, 'build/')),
    noTypeScriptErrors(buildOutput)
  ];

  if (!checks.every(c => c)) {
    throw new Error('npm run build verification failed!');
  }

  return true;
}
```

#### npm start (database-sync) ← THIS IS YOUR ISSUE!
```javascript
async function verifyNpmStart(repo) {
  console.log('  🔄 Starting npm start...');

  // Start process in background
  const process = spawn('npm', ['start'], {
    cwd: repo,
    detached: true,
    stdio: 'ignore'
  });

  const pid = process.pid;

  // Wait for startup
  console.log('  ⏳ Waiting for startup (5 seconds)...');
  await sleep(5000);

  // CRITICAL CHECKS:

  // 1. Check if process still running
  try {
    process.kill(pid, 0); // Check if process exists
    console.log(`  ✅ Process running (PID: ${pid})`);
  } catch (error) {
    throw new Error(`npm start process died! Error: ${error.message}`);
  }

  // 2. Check logs for success message
  const logFile = path.join(repo, 'logs/app.log');
  if (fileExists(logFile)) {
    const logs = readFile(logFile, { encoding: 'utf8' });
    const hasSuccessMessage =
      logs.includes('Server started') ||
      logs.includes('Database synced') ||
      logs.includes('Listening on');

    if (!hasSuccessMessage) {
      throw new Error('npm start logs don\'t show success message!');
    }
    console.log('  ✅ Logs show success');
  }

  // 3. Check database for table creation
  const dbName = getDatabaseName(repo);
  const tables = await listDatabaseTables(dbName);
  const expectedTables = getExpectedTables(repo);

  const allTablesCreated = expectedTables.every(table =>
    tables.includes(table)
  );

  if (!allTablesCreated) {
    throw new Error('Database tables not created!');
  }
  console.log('  ✅ Database tables created');

  // 4. Stop the process
  console.log('  🛑 Stopping npm start...');
  try {
    process.kill(pid, 'SIGTERM');
    // Wait for graceful shutdown
    await sleep(2000);
  } catch (error) {
    console.log('  ⚠️ Process already stopped');
  }

  console.log('  ✅ npm start verified and stopped');

  return true;
}
```

#### npm publish
```javascript
async function verifyNpmPublish(repo, packageName, version) {
  // Check success indicators
  const result = execSync(`npm view ${packageName} versions`, {
    encoding: 'utf8'
  });

  if (!result.includes(version)) {
    throw new Error(`Package ${packageName}@${version} not found in registry!`);
  }

  return true;
}
```

---

### Step 4: Documentation-Based Command Identification

**🚨 NO HARDCODING - Read from documentation!**

```javascript
// Read COMMAND_VERIFY.md to identify required commands
async function getRequiredCommands(repo, task) {
  const commandVerifyDoc = readDocumentation(repo, 'COMMAND_VERIFY.md');

  const commands = [];

  // Parse documentation for command patterns
  if (commandVerifyDoc.includes('npm install')) {
    commands.push('npm install');
  }

  if (commandVerifyDoc.includes('npm run build')) {
    commands.push('npm run build');
  }

  if (commandVerifyDoc.includes('npm start')) {
    commands.push('npm start');
  }

  if (commandVerifyDoc.includes('npm publish')) {
    commands.push('npm publish');
  }

  return commands;
}
```

**Example - database-sync/docs/COMMAND_VERIFY.md:**

```markdown
# Command Verification for database-sync

## Required Commands

### npm install
When: After updating package.json
Verify: package-lock.json updated, node_modules exists

### npm start ← MANDATORY!
When: After registering new models
Verify: Process running, logs show "synced", tables created

🚨 CRITICAL: npm start MUST be run to sync database models!
```

**Agent reads this and KNOWS npm start is MANDATORY!**

---

## 📊 Complete Command Execution Flow

```
Repository: database-sync
Task: Register new Blog model

Step 1: Implement changes
  ✅ Update package.json
  ✅ Import Blog model
  ✅ Add Blog to entities array

Step 2: Identify required commands (from COMMAND_VERIFY.md)
  Required: npm install, npm start

Step 3: Execute npm install
  Running: npm install
  Verify: package-lock.json exists ✅
  Verify: node_modules exists ✅
  Result: ✅ Success

Step 4: Execute npm start ← THIS WAS MISSING!
  Running: npm start &
  PID: 12345
  Waiting: 5 seconds...
  Verify: Process still running ✅
  Verify: Logs show "Database synced" ✅
  Verify: Blog table created ✅
  Stopping process...
  Result: ✅ Success

Step 5: Mark complete
  ✅ All changes implemented
  ✅ All commands executed
  ✅ All commands verified
  ✅ Repository complete
```

---

## 🚨 Enforcement Rules

**Agent CANNOT mark repository complete until:**

```markdown
## Command Completion Checklist

**Repository:** {repo-name}

### Commands Identified (from COMMAND_VERIFY.md)
- [ ] Read COMMAND_VERIFY.md
- [ ] Identified required commands
- [ ] Understand verification requirements

### Commands Executed
- [ ] npm install executed (if required)
- [ ] npm run build executed (if required)
- [ ] npm start executed (if required) ← MANDATORY for database-sync!
- [ ] npm publish executed (if required)

### Commands Verified
- [ ] npm install verified (package-lock.json, node_modules)
- [ ] npm run build verified (dist/ created, no errors)
- [ ] npm start verified (process ran, logs show success, tables created) ← MANDATORY!
- [ ] npm publish verified (package in registry)

### Failure Handling
- [ ] If command failed: Retry up to 3 times
- [ ] If verification failed: Fix and retry
- [ ] If all retries failed: Report error, don't mark complete

**Only when ALL items checked:**
  ✅ Mark repository complete
  ✅ Move to next repository
```

---

## 🔧 Implementation

```javascript
// In main execution flow
async function completeRepository(repo, task) {
  console.log(`\n🔧 Working on: ${repo}`);

  // Step 1: Implement changes
  await implementChanges(repo, task);
  console.log('  ✅ Changes implemented');

  // Step 2: Execute commands MANDATORILY
  await executeRequiredCommands(repo, task);
  console.log('  ✅ Commands executed');

  // Step 3: Verify everything
  const verification = await verifyRepository(repo, task);
  if (!verification.success) {
    throw new Error(`Verification failed: ${verification.issues}`);
  }
  console.log('  ✅ Verification passed');

  // Step 4: Self-audit
  const audit = await selfAudit(repo, task);
  if (!audit.complete) {
    throw new Error(`Audit failed: ${audit.issues}`);
  }
  console.log('  ✅ Self-audit passed');

  console.log(`  ✅ ${repo} complete`);
}
```

---

## 📁 Required Documentation Update

**For EACH repository, ensure COMMAND_VERIFY.md has:**

### database-sync/docs/COMMAND_VERIFY.md
```markdown
# Command Verification for database-sync

## MANDATORY Commands

### npm install
**When:** After updating package.json
**Verify:**
- package-lock.json exists/updated
- node_modules/ directory exists
- No ERR! in output

### npm start ← MANDATORY! DO NOT SKIP!
**When:** After registering new models
**Why:** MUST run to sync database models
**Verify:**
- Process stays running (doesn't crash)
- Logs show "Database synced" or "Server started"
- New tables created in database
- No errors in logs

**🚨 CRITICAL:** npm start MUST be run every time models are added/updated!
```

### shared-models/docs/COMMAND_VERIFY.md
```markdown
# Command Verification for shared-models

## MANDATORY Commands

### npm run build
**When:** After updating models
**Verify:**
- dist/ directory created
- No TypeScript errors
- Exit code 0

### npm publish
**When:** After bumping version
**Verify:**
- Package visible in registry
- Can install new version
- No E404 errors
```

### job-service/docs/COMMAND_VERIFY.md
```markdown
# Command Verification for job-service

## MANDATORY Commands

### npm install
**When:** After updating package.json
**Verify:**
- package-lock.json updated
- node_modules/ exists

### npx tsc --noEmit
**When:** After code changes
**Verify:**
- No TypeScript errors
- No missing imports
- Exit code 0
```

---

## ✅ Verification

**Before marking ANY repository complete, agent MUST ask:**

```markdown
## Self-Audit Questions

### Question 1: Did I run ALL required commands?
- [ ] Read COMMAND_VERIFY.md
- [ ] Identified all required commands
- [ ] Executed all required commands
- [ ] Verified all commands succeeded

**If NO:** Run missing commands, verify, don't mark complete

### Question 2: Did I verify npm start for database-sync?
- [ ] npm start executed
- [ ] Process ran successfully
- [ ] Logs showed sync success
- [ ] Database tables created
- [ ] Process stopped cleanly

**If NO:** Run npm start, verify, don't mark complete

### Question 3: Can I confidently mark this repo complete?
- [ ] All changes implemented
- [ ] All commands executed
- [ ] All commands verified
- [ ] All tests pass

**Only if ALL YES:** Mark complete, move to next repo
```

---

## 🎯 Example: database-sync Complete Flow

```markdown
Repository: database-sync
Task: Register Blog model

Implementation:
  ✅ package.json updated
  ✅ Blog model imported
  ✅ Blog added to entities array

Command Execution:
  📖 Reading: COMMAND_VERIFY.md
  Required commands found: npm install, npm start

  Executing: npm install
  ✅ package-lock.json updated
  ✅ node_modules exists
  ✅ npm install verified

  Executing: npm start ← THIS WAS MISSING BEFORE!
  Starting process...
  PID: 12345
  Waiting 5 seconds...
  ✅ Process still running
  ✅ Logs show "Database synced"
  ✅ Blog table created in database
  Stopping process...
  ✅ Process stopped

Verification:
  ✅ All files created
  ✅ All imports added
  ✅ All commands executed
  ✅ All commands verified

Self-Audit:
  ✅ Did I run npm install? YES
  ✅ Did I run npm start? YES ← FIXED!
  ✅ Did I verify success? YES
  ✅ Can I mark complete? YES

Result: ✅ database-sync complete
```

---

**End of MANDATORY Command Execution Framework**

**Key Principle:**
> **"COMMANDS ARE NOT OPTIONAL - EXECUTE AND VERIFY EVERYTHING"**
