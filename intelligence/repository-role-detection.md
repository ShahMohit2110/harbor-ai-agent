# 🎯 Repository Role Detection System

**Version:** 1.0.0
**Last Updated:** 2026-03-19
**Purpose:** Pattern-based detection of repository roles without hardcoding

---

## 🎯 Core Philosophy

**Repositories earn their roles through observable patterns, not configuration.**

This system:
- ✅ Detects roles from code patterns
- ✅ No hardcoded repository names
- ✅ Works on any project structure
- ✅ Confidence-based classification
- ✅ Non-breaking enhancement

---

## 🏷️ Repository Roles

### Role 1: PUBLISHABLE_PACKAGE

**Pattern-Based Detection:**

```javascript
async function detectPublishablePackage(repository) {
  const signals = {
    // Strong indicators
    hasPublishScript: await hasScript(repository, 'publish'),
    isNotPrivate: await checkPackagePrivate(repository) === false,
    hasPublishConfig: await hasField(repository, 'publishConfig'),

    // Supporting indicators
    exportsModules: await hasExports(repository),
    hasConsumers: await hasDependents(repository),
    hasVersion: await hasVersionField(repository),

    // Context indicators
    noServerEntry: await lacksServerCode(repository),
    isLibrary: await detectLibraryPattern(repository)
  };

  // Calculate confidence score (0-100)
  const score = calculatePublishableScore(signals);

  return {
    role: score >= 70 ? 'PUBLISHABLE_PACKAGE' : null,
    confidence: score,
    signals: signals,
    requiredActions: score >= 70 ? [
      'version-update',
      'build',
      'publish'
    ] : []
  };
}

function calculatePublishableScore(signals) {
  let score = 0;

  // Critical indicators (40 points each)
  if (signals.hasPublishScript) score += 40;
  if (signals.isNotPrivate) score += 40;

  // Strong indicators (25 points each)
  if (signals.hasPublishConfig) score += 25;
  if (signals.exportsModules) score += 25;

  // Supporting indicators (15 points each)
  if (signals.hasConsumers) score += 15;
  if (signals.hasVersion) score += 15;
  if (signals.noServerEntry) score += 15;

  return Math.min(100, score);
}
```

**Required Behavior:**

When changes are made in a `PUBLISHABLE_PACKAGE`:

```javascript
async function executePublishablePackageWorkflow(repository) {
  // Step 1: Complete all changes
  await ensureChangesComplete(repository);

  // Step 2: Version update
  if (await hasVersioning(repository)) {
    await incrementVersion(repository);
  }

  // Step 3: Build (if required)
  if (await hasBuildScript(repository)) {
    const packageManager = await detectPackageManager(repository);
    await execute(`${packageManager} run build`, { cwd: repository.path });
  }

  // Step 4: Publish (BLOCKING)
  const packageManager = await detectPackageManager(repository);
  await execute(`${packageManager} publish`, { cwd: repository.path });

  // Step 5: Verify
  await verifyPackagePublished(repository);
}
```

**Enforcement:**
- This is a **BLOCKING** step
- Agent MUST NOT proceed to dependent repositories until publish completes
- Failure to publish will cause downstream breakage

---

### Role 2: DATABASE_SYNC_SERVICE

**Pattern-Based Detection:**

```javascript
async function detectDatabaseSyncService(repository) {
  const signals = {
    // Strong indicators
    hasSequelizeSync: await codeContains(repository, 'sequelize.sync('),
    hasSyncScript: await hasScript(repository, 'sync') ||
                   await hasScript(repository, 'db:sync'),

    // Supporting indicators
    hasModels: await hasDirectory(repository, 'models'),
    hasMigrations: await hasDirectory(repository, 'migrations'),
    hasDatabaseConnection: await hasDatabaseSetup(repository),

    // ORM detection
    ormType: await detectOrm(repository) // 'sequelize', 'typeorm', 'prisma', etc.
  };

  const score = calculateDatabaseSyncScore(signals);

  return {
    role: score >= 50 ? 'DATABASE_SYNC_SERVICE' : null,
    confidence: score,
    signals: signals,
    requiredActions: score >= 50 ? [
      'database-sync'
    ] : []
  };
}

function calculateDatabaseSyncScore(signals) {
  let score = 0;

  // Critical indicators (40 points each)
  if (signals.hasSequelizeSync) score += 40;
  if (signals.hasSyncScript) score += 35;

  // Strong indicators (25 points each)
  if (signals.hasMigrations) score += 25;
  if (signals.hasDatabaseConnection) score += 25;

  // Supporting indicators (15 points each)
  if (signals.hasModels) score += 15;
  if (signals.ormType) score += 15;

  return Math.min(100, score);
}
```

**Required Behavior:**

When shared models/packages are updated:

```javascript
async function executeDatabaseSyncWorkflow(repository, updatedModels) {
  // Step 1: Ensure new models are registered
  await verifyModelsRegistered(repository, updatedModels);

  // Step 2: Validate ORM configuration
  await validateOrmConfiguration(repository);

  // Step 3: Run service to sync schema
  const packageManager = await detectPackageManager(repository);
  const syncCommand = await detectSyncCommand(repository);

  await execute(syncCommand, {
    cwd: repository.path,
    env: { ...process.env }
  });

  // Step 4: Verify schema updated
  await verifySchemaSynced(repository, updatedModels);
}
```

**Enforcement:**
- MUST happen AFTER package publish
- ONLY runs if models were actually changed
- Skipping this will result in DB schema mismatch

---

## 🔄 Execution Order

The agent **automatically determines** execution order from detected roles:

```javascript
async function determineExecutionOrder(repositories) {
  const analyzed = await Promise.all(
    repositories.map(async repo => ({
      repository: repo,
      packageRole: await detectPublishablePackage(repo),
      databaseRole: await detectDatabaseSyncService(repo),
      serviceRole: await detectServiceRole(repo)
    }))
  );

  // Build execution stages
  const stages = [];

  // Stage 1: Publishable packages (sources)
  const packages = analyzed
    .filter(r => r.packageRole.role === 'PUBLISHABLE_PACKAGE')
    .sort((a, b) => b.packageRole.confidence - a.packageRole.confidence);

  if (packages.length > 0) {
    stages.push({
      order: 1,
      name: 'Package Publishing',
      repositories: packages,
      reason: 'Shared code must be published before consumers can use it',
      blocking: true
    });
  }

  // Stage 2: Database sync (if models changed)
  const dbServices = analyzed
    .filter(r => r.databaseRole.role === 'DATABASE_SYNC_SERVICE')
    .sort((a, b) => b.databaseRole.confidence - a.databaseRole.confidence);

  if (dbServices.length > 0) {
    stages.push({
      order: 2,
      name: 'Database Synchronization',
      repositories: dbServices,
      reason: 'Database schema must match updated models',
      trigger: 'model-changes',
      blocking: false // Only if models changed
    });
  }

  // Stage 3: Backend services (consume packages)
  const backends = analyzed
    .filter(r => r.serviceRole?.type === 'backend-service');

  if (backends.length > 0) {
    stages.push({
      order: 3,
      name: 'Backend Services',
      repositories: backends,
      reason: 'Services consume published packages'
    });
  }

  // Stage 4: Frontend (consume backend APIs)
  const frontends = analyzed
    .filter(r => r.serviceRole?.type === 'frontend-service');

  if (frontends.length > 0) {
    stages.push({
      order: 4,
      name: 'Frontend Applications',
      repositories: frontends,
      reason: 'Frontend consumes backend APIs'
    });
  }

  return stages;
}
```

---

## ✅ Validation Logic

Before task completion, the agent verifies:

```javascript
async function validateRepositoryTasks(repositories, task) {
  const validations = [];

  for (const repo of repositories) {
    const validation = {
      repository: repo.name,
      checks: []
    };

    // Check 1: If package modified → was it published?
    const packageRole = await detectPublishablePackage(repo);
    if (packageRole.role === 'PUBLISHABLE_PACKAGE') {
      const wasModified = await checkIfModified(repo, task);
      const wasPublished = await checkIfPublished(repo);

      if (wasModified && !wasPublished) {
        validation.checks.push({
          check: 'package-publish',
          status: 'FAILED',
          reason: 'Package was modified but not published'
        });
      } else {
        validation.checks.push({
          check: 'package-publish',
          status: 'PASSED'
        });
      }
    }

    // Check 2: If DB sync service exists → was it executed?
    const databaseRole = await detectDatabaseSyncService(repo);
    if (databaseRole.role === 'DATABASE_SYNC_SERVICE') {
      const modelsChanged = await checkModelsChanged(repo, task);
      const syncExecuted = await checkSyncExecuted(repo);

      if (modelsChanged && !syncExecuted) {
        validation.checks.push({
          check: 'database-sync',
          status: 'FAILED',
          reason: 'Models changed but database sync not executed'
        });
      } else {
        validation.checks.push({
          check: 'database-sync',
          status: 'PASSED'
        });
      }
    }

    validations.push(validation);
  }

  // Check for failures
  const failures = validations.flatMap(v =>
    v.checks.filter(c => c.status === 'FAILED')
  );

  if (failures.length > 0) {
    throw new Error(
      'Validation failed:\n' +
      failures.map(f => `- ${f.reason}`).join('\n')
    );
  }

  return validations;
}
```

---

## 🧪 Expected Behavior

After this integration, the agent will:

1. **Automatically detect** repository roles from code patterns
2. **Determine execution order** based on dependencies
3. **Execute required actions** (publish, sync, etc.)
4. **Validate completion** before finishing
5. **Think like a system engineer** (not a file editor)

---

## 📊 Example Output

```
🔍 Repository Role Detection
=============================

📦 harborSharedModels
   ✅ PUBLISHABLE_PACKAGE (95% confidence)
   Signals:
   - Has publish script ✅
   - Not private ✅
   - Has exports ✅
   - Has consumers ✅
   → Will publish after changes

📦 harborUserSvc
   ✅ DATABASE_SYNC_SERVICE (82% confidence)
   Signals:
   - Has sequelize.sync() ✅
   - Has sync script ✅
   - Has models directory ✅
   → Will sync database if models change

📊 Execution Order Determined
==============================

Stage 1: Package Publishing
├─ harborSharedModels
│  └─ Actions: version → build → publish

Stage 2: Database Synchronization
├─ harborUserSvc
│  └─ Actions: database-sync (if models changed)

Stage 3: Backend Services
├─ harborUserSvc
├─ harborJobSvc

Stage 4: Frontend Applications
├─ harborWebsite
├─ harborApp

✨ All roles detected automatically from code patterns!
```

---

## 🚨 Non-Breaking Integration

This enhancement:
- ✅ Does NOT modify existing working logic
- ✅ Does NOT introduce hardcoded assumptions
- ✅ Does NOT affect unrelated flows
- ✅ Only extends the analysis phase
- ✅ Keeps logic flexible and pattern-based
- ✅ Works alongside existing detection systems

---

**Version:** 1.0.0
**Status:** 🟢 Active
**Integration:** Non-breaking enhancement

---

*Last Updated: 2026-03-19*
