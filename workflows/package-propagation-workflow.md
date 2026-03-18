# Package Propagation Workflow

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Automatically propagate package changes across all dependent repositories

---

## 🎯 Core Philosophy

**When a package repository changes, ALL dependent repositories MUST be synchronized automatically.**

This workflow detects package changes, determines the propagation strategy, and executes synchronization across all consumers.

---

## 🚨 MANDATORY: Package Propagation is NOT Optional

**ABSOLUTE RULE:**

```
❌ FORBIDDEN: Modify a package repository without updating consumers
❌ FORBIDDEN: Assume consumers will "figure it out"
❌ FORBIDDEN: Leave dependency versions outdated
❌ FORBIDDEN: Skip build steps for built packages
❌ FORBIDDEN: Skip install steps for consumers
```

**MANDATORY REQUIREMENT:**

```
✅ REQUIRED: Detect package lifecycle BEFORE making changes
✅ REQUIRED: Execute lifecycle stages IN ORDER
✅ REQUIRED: Update ALL consumers of the package
✅ REQUIRED: Verify synchronization completes successfully
✅ REQUIRED: Validate all builds pass
```

---

## Workflow Phases

### Phase 1: Pre-Implementation Analysis

**Before making ANY changes, analyze the package:**

```javascript
async function analyzePackageBeforeChanges(repository) {
  // Step 1: Detect if this is a package repository
  const packageInfo = await detectPackageRepository(repository);

  if (!packageInfo.isPackage) {
    // Not a package, no propagation needed
    return {
      isPackage: false,
      propagationRequired: false
    };
  }

  // Step 2: Build complete package lifecycle map
  const lifecycleMap = await buildPackageLifecycleMap(repository);

  // Step 3: Identify all consumers
  const consumers = lifecycleMap.consumers;

  // Step 4: Determine propagation strategy
  const strategy = await determinePropagationStrategy(lifecycleMap);

  // Step 5: Calculate implementation order
  const order = calculatePackageImplementationOrder(lifecycleMap);

  return {
    isPackage: true,
    propagationRequired: true,
    lifecycleMap: lifecycleMap,
    consumers: consumers,
    strategy: strategy,
    order: order
  };
}
```

### Phase 2: Change Implementation (Source Package)

**When implementing changes in a package repository:**

```javascript
async function implementPackageChanges(repository, task, analysis) {
  const lifecycleMap = analysis.lifecycleMap;
  const changes = [];

  // Step 1: Implement source code changes
  console.log(`📝 Implementing source code changes in ${repository.name}...`);
  const sourceChanges = await implementSourceCodeChanges(repository, task);
  changes.push(sourceChanges);

  // Step 2: Version update (if required)
  if (lifecycleMap.lifecycle.versionUpdate.required) {
    console.log(`🔢 Updating version in ${repository.name}...`);
    const versionChanges = await updatePackageVersion(repository, lifecycleMap);
    changes.push(versionChanges);
  }

  // Step 3: Build (if required)
  if (lifecycleMap.lifecycle.build.required) {
    console.log(`🔨 Building ${repository.name}...`);
    const buildChanges = await buildPackage(repository, lifecycleMap);
    changes.push(buildChanges);
  }

  // Step 4: Publish (if required)
  if (lifecycleMap.lifecycle.publish.required) {
    console.log(`📤 Publishing ${repository.name}...`);
    const publishChanges = await publishPackage(repository, lifecycleMap);
    changes.push(publishChanges);
  }

  // Step 5: Validate package is ready
  console.log(`✅ Validating ${repository.name}...`);
  const validation = await validatePackage(repository, lifecycleMap);

  if (!validation.valid) {
    throw new Error(`Package validation failed: ${validation.errors.join(', ')}`);
  }

  return {
    repository: repository,
    changes: changes,
    version: await getCurrentVersion(repository),
    status: 'complete'
  };
}
```

#### Source Code Changes Implementation

```javascript
async function implementSourceCodeChanges(repository, task) {
  // Implement the actual feature/bug fix/changes
  // This follows the standard implementation workflow

  const changes = {
    type: 'source-code',
    files: [],
    exports: [],
    breaking: false
  };

  // Detect what changed
  const diff = await detectChanges(repository);

  // Track new exports (important for consumers)
  if (diff.exportsAdded) {
    changes.exports = diff.exportsAdded;
  }

  // Track breaking changes
  if (detectBreakingChanges(diff)) {
    changes.breaking = true;
  }

  changes.files = diff.files;

  return changes;
}
```

#### Version Update Implementation

```javascript
async function updatePackageVersion(repository, lifecycleMap) {
  const versionWorkflow = lifecycleMap.lifecycle.versionUpdate;
  const currentVersion = await getCurrentVersion(repository);

  // Determine version bump type
  const bumpType = await determineBumpType(repository, versionWorkflow);

  let newVersion;

  if (versionWorkflow.autoBump && versionWorkflow.bumpCommand) {
    // Auto-bump using tool
    console.log(`🤖 Auto-bumping version using ${versionWorkflow.strategy}...`);

    const result = await executeCommand(repository, versionWorkflow.bumpCommand);
    newVersion = await getCurrentVersion(repository);

    console.log(`✅ Version bumped: ${currentVersion} → ${newVersion}`);

  } else {
    // Manual bump
    newVersion = bumpVersion(currentVersion, bumpType);

    console.log(`🔢 Manually bumping version: ${currentVersion} → ${newVersion}`);

    // Update package.json
    await updatePackageJsonVersion(repository, newVersion);

    // Update VERSION file (if exists)
    if (await fileExists(repository, 'VERSION')) {
      await writeFile(repository, 'VERSION', newVersion);
    }

    // Update version.ts (if exists)
    if (await fileExists(repository, 'src/version.ts')) {
      await updateVersionFile(repository, 'src/version.ts', newVersion);
    }
  }

  // Commit version update
  await commitChanges(repository, `chore: bump version to ${newVersion}`);

  return {
    type: 'version-update',
    oldVersion: currentVersion,
    newVersion: newVersion,
    bumpType: bumpType,
    strategy: versionWorkflow.strategy
  };
}
```

#### Determine Bump Type

```javascript
async function determineBumpType(repository, versionWorkflow) {
  // Check if there are breaking changes
  const changes = await detectChanges(repository);

  if (changes.breaking) {
    return 'major';
  }

  // Check if there are new features
  if (changes.featuresAdded) {
    return 'minor';
  }

  // Check if there are bug fixes only
  if (changes.bugFixesOnly) {
    return 'patch';
  }

  // Default to patch
  return 'patch';
}
```

#### Build Implementation

```javascript
async function buildPackage(repository, lifecycleMap) {
  const buildWorkflow = lifecycleMap.lifecycle.build;

  console.log(`🔨 Building ${repository.name}...`);
  console.log(`   Command: ${buildWorkflow.command}`);

  // Execute build command
  const result = await executeCommand(repository, buildWorkflow.command);

  if (result.code !== 0) {
    throw new Error(`Build failed: ${result.stderr}`);
  }

  // Verify build output exists
  if (buildWorkflow.outputDir) {
    const outputExists = await directoryExists(repository, buildWorkflow.outputDir);

    if (!outputExists) {
      throw new Error(`Build output directory not found: ${buildWorkflow.outputDir}`);
    }
  }

  console.log(`✅ Build complete`);

  return {
    type: 'build',
    command: buildWorkflow.command,
    outputDir: buildWorkflow.outputDir,
    status: 'success'
  };
}
```

#### Publish Implementation

```javascript
async function publishPackage(repository, lifecycleMap) {
  const publishWorkflow = lifecycleMap.lifecycle.publish;

  if (!publishWorkflow.required) {
    return { type: 'publish', skipped: true, reason: 'Not required' };
  }

  console.log(`📤 Publishing ${repository.name}...`);
  console.log(`   Command: ${publishWorkflow.command}`);
  console.log(`   Registry: ${publishWorkflow.registry || 'default'}`);

  // Execute publish command
  const result = await executeCommand(repository, publishWorkflow.command);

  if (result.code !== 0) {
    throw new Error(`Publish failed: ${result.stderr}`);
  }

  console.log(`✅ Published successfully`);

  return {
    type: 'publish',
    command: publishWorkflow.command,
    registry: publishWorkflow.registry,
    status: 'success'
  };
}
```

---

### Phase 3: Consumer Synchronization

**After updating the package, synchronize ALL consumers:**

```javascript
async function synchronizeConsumers(packageRepository, packageChanges, analysis) {
  const consumers = analysis.lifecycleMap.consumers;
  const newVersion = packageChanges.version;

  console.log(`🔄 Synchronizing ${consumers.length} consumers...`);

  const syncResults = [];

  for (const consumer of consumers) {
    console.log(`\n📦 ${consumer.repository.name}`);
    console.log(`   Integration: ${consumer.integrationType}`);
    console.log(`   Current: ${consumer.currentVersion}`);

    const result = await synchronizeConsumer(
      consumer,
      newVersion,
      packageChanges,
      analysis
    );

    syncResults.push(result);

    if (!result.success) {
      console.error(`❌ Failed to synchronize ${consumer.repository.name}`);
      throw new Error(`Consumer synchronization failed: ${result.error}`);
    }

    console.log(`✅ ${consumer.repository.name} synchronized`);
  }

  return syncResults;
}
```

#### Synchronize Individual Consumer

```javascript
async function synchronizeConsumer(consumer, newVersion, packageChanges, analysis) {
  const repository = consumer.repository;
  const integrationType = consumer.integrationType;

  try {
    // Step 1: Update dependency version (if version-based)
    if (integrationType === 'version-based') {
      console.log(`   🔢 Updating dependency version to ${newVersion}...`);
      await updateDependencyVersion(repository, consumer, newVersion);
    }

    // Step 2: Update workspace reference (if workspace-protocol)
    if (integrationType === 'workspace-protocol') {
      console.log(`   🔗 Updating workspace reference...`);
      // Workspace packages auto-sync, but we need to ensure rebuild
      await prepareWorkspaceSync(repository);
    }

    // Step 3: Install dependencies
    console.log(`   📦 Installing dependencies...`);
    await installDependencies(repository, consumer);

    // Step 4: Update code (if needed)
    if (await requiresCodeUpdates(consumer, packageChanges)) {
      console.log(`   ✏️  Updating code to use new exports...`);
      await updateConsumerCode(consumer, packageChanges);
    }

    // Step 5: Build consumer (if required)
    if (await requiresBuild(repository)) {
      console.log(`   🔨 Building consumer...`);
      await buildRepository(repository);
    }

    // Step 6: Validate consumer
    console.log(`   ✅ Validating consumer...`);
    const validation = await validateConsumer(repository);

    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`
      };
    }

    return {
      success: true,
      repository: repository.name,
      integrationType: integrationType,
      newVersion: newVersion,
      changes: packageChanges
    };

  } catch (error) {
    return {
      success: false,
      repository: repository.name,
      error: error.message
    };
  }
}
```

#### Update Dependency Version

```javascript
async function updateDependencyVersion(consumerRepo, consumer, newVersion) {
  const packageJsonPath = path.join(consumerRepo.path, 'package.json');
  const packageJson = await readJsonFile(packageJsonPath);

  const packageName = consumer.packageName;

  // Update in dependencies
  if (packageJson.dependencies && packageJson.dependencies[packageName]) {
    packageJson.dependencies[packageName] = `^${newVersion}`;
  }

  // Update in devDependencies
  if (packageJson.devDependencies && packageJson.devDependencies[packageName]) {
    packageJson.devDependencies[packageName] = `^${newVersion}`;
  }

  // Update in peerDependencies
  if (packageJson.peerDependencies && packageJson.peerDependencies[packageName]) {
    packageJson.peerDependencies[packageName] = `^${newVersion}`;
  }

  // Write updated package.json
  await writeJsonFile(packageJsonPath, packageJson);

  // Commit the change
  await commitChanges(
    consumerRepo,
    `chore: update ${packageName} to ${newVersion}`
  );
}
```

#### Install Dependencies

```javascript
async function installDependencies(repository, consumer) {
  const installWorkflow = consumer.lifecycle?.install;
  const packageManager = installWorkflow?.packageManager || 'npm';
  const installCommand = getInstallCommand(packageManager);

  console.log(`   📦 Running: ${installCommand}`);

  const result = await executeCommand(repository, installCommand);

  if (result.code !== 0) {
    throw new Error(`Install failed: ${result.stderr}`);
  }
}
```

#### Update Consumer Code

```javascript
async function updateConsumerCode(consumer, packageChanges) {
  const repository = consumer.repository;
  const usage = consumer.usage;

  // Update imports to use new exports
  if (packageChanges.exports && packageChanges.exports.length > 0) {
    console.log(`   ✏️  Adding imports for new exports...`);

    for (const file of getSourceFilesUsingPackage(repository, usage)) {
      await addImportsForNewExports(file, packageChanges.exports);
    }
  }

  // Fix breaking changes
  if (packageChanges.breaking) {
    console.log(`   🔧 Fixing breaking changes...`);

    for (const file of getSourceFilesUsingPackage(repository, usage)) {
      await fixBreakingChanges(file, packageChanges);
    }
  }

  // Commit code updates
  await commitChanges(
    repository,
    `feat: update code for new package exports`
  );
}
```

---

### Phase 4: Validation Phase

**Validate that all repositories are synchronized:**

```javascript
async function validatePackageSynchronization(packageRepo, consumers, newVersion) {
  const validations = [];
  let hasErrors = false;

  console.log(`\n🔍 Validating synchronization...`);

  // Validate package repository
  console.log(`\n📦 Validating ${packageRepo.name}...`);
  const packageValidation = await validatePackageRepository(packageRepo);
  validations.push({
    repository: packageRepo.name,
    type: 'package',
    ...packageValidation
  });

  if (!packageValidation.valid) {
    hasErrors = true;
  }

  // Validate all consumers
  for (const consumer of consumers) {
    console.log(`\n📦 Validating ${consumer.repository.name}...`);

    const consumerValidation = await validateConsumerSynchronization(
      consumer,
      newVersion
    );

    validations.push({
      repository: consumer.repository.name,
      type: 'consumer',
      ...consumerValidation
    });

    if (!consumerValidation.valid) {
      hasErrors = true;
    }
  }

  // Validate cross-repository consistency
  console.log(`\n🔗 Validating cross-repository consistency...`);
  const consistencyValidation = await validateCrossRepositoryConsistency(
    packageRepo,
    consumers,
    newVersion
  );

  validations.push({
    repository: 'all',
    type: 'consistency',
    ...consistencyValidation
  });

  if (!consistencyValidation.valid) {
    hasErrors = true;
  }

  return {
    valid: !hasErrors,
    validations: validations
  };
}
```

#### Validate Package Repository

```javascript
async function validatePackageRepository(repository) {
  const checks = [];

  // Check 1: Version is updated
  const version = await getCurrentVersion(repository);
  checks.push({
    name: 'Version updated',
    passed: version !== null
  });

  // Check 2: Build output exists (if build required)
  const buildRequired = await requiresBuild(repository);
  if (buildRequired) {
    const buildOutput = await getBuildOutputDir(repository);
    const exists = await directoryExists(repository, buildOutput);
    checks.push({
      name: 'Build output exists',
      passed: exists
    });
  }

  // Check 3: Package.json is valid
  const packageJsonValid = await validatePackageJson(repository);
  checks.push({
    name: 'package.json valid',
    passed: packageJsonValid
  });

  // Check 4: Repository builds successfully
  const buildResult = await executeCommand(repository, 'npm run build');
  checks.push({
    name: 'Build passes',
    passed: buildResult.code === 0
  });

  const allPassed = checks.every(c => c.passed);

  return {
    valid: allPassed,
    checks: checks,
    errors: checks.filter(c => !c.passed).map(c => c.name)
  };
}
```

#### Validate Consumer Synchronization

```javascript
async function validateConsumerSynchronization(consumer, expectedVersion) {
  const repository = consumer.repository;
  const checks = [];

  // Check 1: Dependency version matches
  const currentVersion = await getDependencyVersion(repository, consumer.packageName);
  checks.push({
    name: 'Dependency version correct',
    passed: currentVersion === expectedVersion,
    expected: expectedVersion,
    actual: currentVersion
  });

  // Check 2: Dependencies installed
  const nodeModulesExists = await directoryExists(repository, 'node_modules');
  checks.push({
    name: 'Dependencies installed',
    passed: nodeModulesExists
  });

  // Check 3: Lock file updated
  const lockFileUpdated = await isLockFileUpdated(repository);
  checks.push({
    name: 'Lock file updated',
    passed: lockFileUpdated
  });

  // Check 4: Imports resolve correctly
  const importsResolve = await doImportsResolve(repository);
  checks.push({
    name: 'Imports resolve',
    passed: importsResolve
  });

  // Check 5: Repository builds successfully
  const buildResult = await executeCommand(repository, 'npm run build');
  checks.push({
    name: 'Build passes',
    passed: buildResult.code === 0
  });

  const allPassed = checks.every(c => c.passed);

  return {
    valid: allPassed,
    checks: checks,
    errors: checks.filter(c => !c.passed).map(c => ({
      check: c.name,
      expected: c.expected,
      actual: c.actual
    }))
  };
}
```

#### Validate Cross-Repository Consistency

```javascript
async function validateCrossRepositoryConsistency(packageRepo, consumers, expectedVersion) {
  const checks = [];

  // Check 1: All consumers use the same version
  const versions = await Promise.all(
    consumers.map(c => getDependencyVersion(c.repository, c.packageName))
  );

  const allSameVersion = versions.every(v => v === expectedVersion);
  checks.push({
    name: 'All consumers use same version',
    passed: allSameVersion,
    expected: expectedVersion,
    actual: versions
  });

  // Check 2: No file: references (unless workspace)
  const fileRefs = await Promise.all(
    consumers.map(async c => {
      const packageJson = await readPackageJson(c.repository);
      return {
        repo: c.repository.name,
        dep: packageJson.dependencies?.[c.packageName]
      };
    })
  );

  const noFileRefs = fileRefs.every(ref => !ref.dep?.startsWith('file:'));
  checks.push({
    name: 'No file: references',
    passed: noFileRefs,
    details: fileRefs
  });

  // Check 3: All repositories build successfully
  const buildResults = await Promise.all(
    [packageRepo, ...consumers.map(c => c.repository)].map(async repo => {
      const result = await executeCommand(repo, 'npm run build');
      return {
        repo: repo.name,
        passed: result.code === 0
      };
    })
  );

  const allBuild = buildResults.every(r => r.passed);
  checks.push({
    name: 'All repositories build',
    passed: allBuild,
    details: buildResults
  });

  const allPassed = checks.every(c => c.passed);

  return {
    valid: allPassed,
    checks: checks,
    errors: checks.filter(c => !c.passed).map(c => c.name)
  };
}
```

---

### Phase 5: Error Recovery

**If validation fails, fix the issues:**

```javascript
async function fixSynchronizationErrors(validationResults) {
  const fixes = [];

  for (const result of validationResults.validations) {
    if (!result.valid) {
      console.log(`\n🔧 Fixing errors in ${result.repository}...`);

      for (const error of result.errors) {
        const fix = await determineFix(result, error);

        console.log(`   🔧 Applying fix: ${fix.type}...`);
        await applyFix(result.repository, fix);

        fixes.push({
          repository: result.repository,
          fix: fix
        });

        // Re-validate after fix
        const revalidation = await revalidateRepository(result.repository);
        if (!revalidation.valid) {
          console.error(`❌ Fix failed for ${result.repository}`);
          throw new Error(`Could not fix ${result.repository}: ${revalidation.errors.join(', ')}`);
        }

        console.log(`✅ Fixed ${result.repository}`);
      }
    }
  }

  return fixes;
}
```

---

## Implementation Order

**The agent MUST implement changes in this order:**

```
1. Package Repository (source of truth)
   ├─ Source code changes
   ├─ Version update (if required)
   ├─ Build (if required)
   └─ Publish (if required)

2. Consumer Repositories (in dependency order)
   For each consumer:
   ├─ Update dependency version
   ├─ Install dependencies
   ├─ Update code (if needed)
   ├─ Build (if required)
   └─ Validate

3. Cross-Repository Validation
   ├─ Validate all versions aligned
   ├─ Validate all imports resolve
   ├─ Validate all builds pass
   └─ Fix any issues found
```

---

## 🚨 CRITICAL: Workflow Integration

### Integration Points

**Point 1: After Repository Impact Analysis**

```markdown
## Repository Impact Analysis

### Detected Package Repositories

**Package:** harborSharedModels
- Type: Shared Library
- Lifecycle: Manual version, no build, install required
- Consumers: 3 repositories

**Synchronization Required:** YES

**Implementation Order:**
1. harborSharedModels (package)
2. harborUserSvc (consumer)
3. harborJobSvc (consumer)
4. harborWebsite (consumer)
```

**Point 2: During Execution**

```markdown
## Execution: harborSharedModels

✅ Source code changes implemented
✅ Version updated: 1.2.3 → 1.2.4
✅ Build not required

**Next: Synchronizing 3 consumers...**
```

**Point 3: After Execution**

```markdown
## Synchronization Complete

✅ harborUserSvc: Updated to v1.2.4, installed, validated
✅ harborJobSvc: Updated to v1.2.4, installed, validated
✅ harborWebsite: Updated to v1.2.4, installed, validated

**Cross-Repository Validation:**
✅ All consumers use version 1.2.4
✅ All imports resolve correctly
✅ All builds pass
```

---

## Examples

### Example 1: Simple Library Update

```
Task: Add "emailVerified" field to User model

Package: harborSharedModels
- Type: sharedLibrary
- Lifecycle: Manual version, no build

Consumers: harborUserSvc, harborJobSvc, harborWebsite

Execution:
1. harborSharedModels
   ✅ Add field to User model
   ✅ Update exports
   ✅ Bump version: 1.2.3 → 1.2.4
   ✅ Commit changes

2. harborUserSvc
   ✅ Update package.json: "harbor-shared-models": "^1.2.4"
   ✅ Run npm install
   ✅ Add email verification API

3. harborJobSvc
   ✅ Update package.json: "harbor-shared-models": "^1.2.4"
   ✅ Run npm install
   ✅ Update job logic to use field

4. harborWebsite
   ✅ Update package.json: "harbor-shared-models": "^1.2.4"
   ✅ Run npm install
   ✅ Add email verification UI

Validation:
✅ All repos use v1.2.4
✅ All builds pass
✅ No import errors
```

### Example 2: Built Library Update

```
Task: Add Button component to UI library

Package: harborUIComponents
- Type: builtLibrary
- Lifecycle: Manual version, TypeScript build required

Consumers: harborWebsite, harborApp

Execution:
1. harborUIComponents
   ✅ Add Button component
   ✅ Update exports
   ✅ Bump version: 2.0.0 → 2.1.0
   ✅ Build: npm run build (TypeScript)
   ✅ Verify dist/ created

2. harborWebsite
   ✅ Update package.json: "harbor-ui-components": "^2.1.0"
   ✅ Run npm install
   ✅ Import Button component
   ✅ Add to page

3. harborApp
   ✅ Update package.json: "harbor-ui-components": "^2.1.0"
   ✅ Run npm install
   ✅ Import Button component
   ✅ Add to screen

Validation:
✅ All repos use v2.1.0
✅ All builds pass
✅ Component works in both web and mobile
```

### Example 3: Workspace Package Update

```
Task: Add utility function

Package: harborSharedUtils
- Type: monorepoPackage
- Lifecycle: Changesets auto-version, workspace protocol

Consumers: harborWeb, harborApp (both workspace:*)

Execution:
1. harborSharedUtils
   ✅ Add utility function
   ✅ Export from index.ts
   ✅ Changeset: "Add utility function"
   ✅ Auto-bump version
   ✅ Build: turbo run build

2. harborWeb
   ✅ Workspace auto-sync (no version update needed)
   ✅ Import utility function
   ✅ Use in component

3. harborApp
   ✅ Workspace auto-sync (no version update needed)
   ✅ Import utility function
   ✅ Use in screen

Validation:
✅ Workspace protocol working
✅ All builds pass
✅ Function accessible in both repos
```

---

**End of Package Propagation Workflow**
