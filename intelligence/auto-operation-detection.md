# 🤖 Auto-Operation Detection System - Harbor AI Agent v8.0

**Version:** 1.0.0
**Last Updated:** 2026-03-19
**Purpose:** Automatically detect and execute required operations based on repository analysis

---

# 🎯 OVERVIEW

The Auto-Operation Detection System enables the agent to **automatically detect and decide** which operations are required for any repository, without any hardcoded rules or user input.

**Core Capability:** "I'll analyze your repo and automatically decide what needs to happen"

---

## 🧩 AUTOMATIC DECISION POINTS

### Decision Point 1: Is This a Package That Needs Publishing?

**Automatic Detection:**

```javascript
async function detectPackagePublishing(repository) {
  console.log(`🔍 Analyzing ${repository.name} for package publishing...\n`);

  const signals = await collectPublishingSignals(repository);
  const decision = makePublishingDecision(signals);

  console.log(`📊 Publishing Analysis Results:`);
  console.log(`   Is Package: ${decision.isPackage ? '✅ Yes' : '❌ No'}`);
  console.log(`   Needs Publishing: ${decision.needsPublishing ? '✅ Yes' : '❌ No'}`);
  console.log(`   Confidence: ${decision.confidence}%`);
  console.log(`   Reason: ${decision.reason}\n`);

  return decision;
}

async function collectPublishingSignals(repository) {
  const signals = {
    // Check package.json
    packageJson: null,
    isPrivate: null,
    hasPublishConfig: false,

    // Check scripts
    publishScript: null,
    prepublishScript: null,
    postpublishScript: null,

    // Check CI/CD
    hasPublishInCI: false,

    // Check exports (indicates library)
    exportsCount: 0,
    hasIndexFile: false,

    // Check if others depend on this
    isConsumed: false,
    consumers: []
  };

  // Read package.json
  if (await fileExists(`${repository.path}/package.json`)) {
    signals.packageJson = await readJson(`${repository.path}/package.json`);
    signals.isPrivate = signals.packageJson.private === true;
    signals.hasPublishConfig = !!signals.packageJson.publishConfig;

    // Check scripts
    signals.publishScript = signals.packageJson.scripts?.publish || null;
    signals.prepublishScript = signals.packageJson.scripts?.prepublish || null;
    signals.postpublishScript = signals.packageJson.scripts?.postpublish || null;
  }

  // Check for exports
  const tsFiles = await findFiles(`${repository.path}**/*.ts`);
  const jsFiles = await findFiles(`${repository.path}**/*.js`);
  const allFiles = [...tsFiles, ...jsFiles];

  for (const file of allFiles) {
    const content = await readFile(file);
    if (content.includes('export ')) {
      signals.exportsCount++;
    }
  }

  // Check for index file
  signals.hasIndexFile = await fileExists(`${repository.path}/index.ts`) ||
                        await fileExists(`${repository.path}/index.js`);

  // Check if consumed by others (analyze workspace)
  const workspaceRepos = await discoverRepositories(repository.workspace);
  for (const otherRepo of workspaceRepos) {
    if (otherRepo.name === repository.name) continue;

    if (await fileExists(`${otherRepo.path}/package.json`)) {
      const otherPkg = await readJson(`${otherRepo.path}/package.json`);
      const deps = {...(otherPkg.dependencies || {}), ...(otherPkg.devDependencies || {})};

      for (const [name, version] of Object.entries(deps)) {
        if (name === signals.packageJson?.name) {
          signals.isConsumed = true;
          signals.consumers.push(otherRepo.name);
          break;
        }
      }
    }
  }

  // Check CI/CD for publish steps
  const githubActions = await findFiles(`${repository.path}.github/workflows/*.yml`);
  const gitlabCi = await fileExists(`${repository.path}.gitlab-ci.yml`);
  const circleCi = await fileExists(`${repository.path}.circleci/config.yml`);

  if (githubActions.length > 0 || gitlabCi || circleCi) {
    const ciContent = await readCiConfig(repository);
    signals.hasPublishInCI = ciContent.includes('publish') || ciContent.includes('npm publish');
  }

  return signals;
}

function makePublishingDecision(signals) {
  let score = 0;
  const reasons = [];

  // Strong indicators
  if (!signals.isPrivate && signals.packageJson) {
    score += 40;
    reasons.push('Package is not private (package.json)');
  }

  if (signals.hasPublishConfig) {
    score += 30;
    reasons.push('Has publishConfig in package.json');
  }

  if (signals.publishScript || signals.prepublishScript || signals.postpublishScript) {
    score += 25;
    reasons.push('Has publish-related scripts');
  }

  if (signals.hasPublishInCI) {
    score += 20;
    reasons.push('CI/CD includes publish step');
  }

  // Library indicators
  if (signals.exportsCount > 5) {
    score += 15;
    reasons.push(`Exports ${signals.exportsCount} modules (library pattern)`);
  }

  if (signals.hasIndexFile) {
    score += 10;
    reasons.push('Has index.ts/index.js (library pattern)');
  }

  if (signals.isConsumed && signals.consumers.length > 0) {
    score += 20;
    reasons.push(`Consumed by ${signals.consumers.length} other repositories`);
  }

  // Calculate confidence
  const isPackage = score >= 50;
  const needsPublishing = score >= 60;
  const confidence = Math.min(100, score);

  return {
    isPackage,
    needsPublishing,
    confidence,
    reason: needsPublishing
      ? `Detected as ${isPackage ? 'publishable package' : 'library'}: ${reasons.join(', ')}`
      : 'Not detected as a publishable package',
    signals,
    reasons
  };
}
```

---

### Decision Point 2: Is This a Database Sync Service?

**Automatic Detection:**

```javascript
async function detectDatabaseSyncService(repository) {
  console.log(`🔍 Analyzing ${repository.name} for database sync capabilities...\n`);

  const signals = await collectDatabaseSignals(repository);
  const decision = makeDatabaseSyncDecision(signals);

  console.log(`📊 Database Sync Analysis Results:`);
  console.log(`   Has Database Sync: ${decision.hasDatabaseSync ? '✅ Yes' : '❌ No'}`);
  console.log(`   Sync Required: ${decision.syncRequired ? '✅ Yes' : '❌ No'}`);
  console.log(`   Confidence: ${decision.confidence}%`);
  console.log(`   Reason: ${decision.reason}\n`);

  return decision;
}

async function collectDatabaseSignals(repository) {
  const signals = {
    // Check for models
    hasModelsDir: false,
    modelsCount: 0,

    // Check for migrations
    hasMigrationsDir: false,
    migrationsCount: 0,

    // Check for database connection
    hasDatabaseConnection: false,

    // Check for sync script
    hasSyncScript: false,
    syncScript: null,

    // Check for Sequelize sync
    hasSequelizeSync: false,

    // Check for ORM usage
    ormType: null, // 'sequelize', 'typeorm', 'mongoose', 'prisma', etc.

    // Check package.json for database-related packages
    databasePackages: []
  };

  // Check for models directory
  const modelsDir = `${repository.path}/models`;
  const srcModelsDir = `${repository.path}/src/models`;
  signals.hasModelsDir = await fileExists(modelsDir) || await fileExists(srcModelsDir);

  if (signals.hasModelsDir) {
    const dir = await fileExists(modelsDir) ? modelsDir : srcModelsDir;
    const modelFiles = await findFiles(`${dir}**/*.ts`);
    signals.modelsCount = modelFiles.length;
  }

  // Check for migrations directory
  const migrationsDir = `${repository.path}/migrations`;
  const srcMigrationsDir = `${repository.path}/src/migrations`;
  signals.hasMigrationsDir = await fileExists(migrationsDir) || await fileExists(srcMigrationsDir);

  if (signals.hasMigrationsDir) {
    const dir = await fileExists(migrationsDir) ? migrationsDir : srcMigrationsDir;
    const migrationFiles = await findFiles(`${dir}**/*.js`);
    signals.migrationsCount = migrationFiles.length;
  }

  // Check package.json for database scripts
  if (await fileExists(`${repository.path}/package.json`)) {
    const pkg = await readJson(`${repository.path}/package.json`);

    // Check scripts
    signals.syncScript = pkg.scripts?.sync || pkg.scripts?.['db:sync'] || pkg.scripts?.['database:sync'] || null;
    signals.hasSyncScript = !!signals.syncScript;

    // Check for database packages
    const deps = {...(pkg.dependencies || {}), ...(pkg.devDependencies || {})};
    signals.databasePackages = Object.keys(deps).filter(dep =>
      dep.includes('sequelize') ||
      dep.includes('typeorm') ||
      dep.includes('mongoose') ||
      dep.includes('prisma') ||
      dep.includes('knex') ||
      dep.includes('mysql') ||
      dep.includes('pg') ||
      dep.includes('mongodb') ||
      dep.includes('redis')
    );

    if (deps.sequelize) signals.ormType = 'sequelize';
    else if (deps.typeorm) signals.ormType = 'typeorm';
    else if (deps.mongoose) signals.ormType = 'mongoose';
    else if (deps.prisma) signals.ormType = 'prisma';
    else if (deps.knex) signals.ormType = 'knex';
  }

  // Search for Sequelize sync() pattern in code
  const tsFiles = await findFiles(`${repository.path}**/*.ts`);
  const jsFiles = await findFiles(`${repository.path}**/*.js`);

  for (const file of [...tsFiles, ...jsFiles]) {
    const content = await readFile(file);
    if (content.includes('sequelize.sync(') || content.includes('.sync({')) {
      signals.hasSequelizeSync = true;
      break;
    }
  }

  // Check for database connection setup
  for (const file of [...tsFiles, ...jsFiles]) {
    const content = await readFile(file);
    if (content.includes('new Sequelize(') ||
        content.includes('createConnection(') ||
        content.includes('mongoose.connect(') ||
        content.includes('PrismaClient(')) {
      signals.hasDatabaseConnection = true;
      break;
    }
  }

  return signals;
}

function makeDatabaseSyncDecision(signals) {
  let score = 0;
  const reasons = [];

  // Strong indicators
  if (signals.hasSequelizeSync) {
    score += 40;
    reasons.push('Uses Sequelize.sync() pattern');
  }

  if (signals.hasSyncScript) {
    score += 35;
    reasons.push(`Has sync script: ${signals.syncScript}`);
  }

  if (signals.hasMigrationsDir && signals.migrationsCount > 0) {
    score += 30;
    reasons.push(`Has ${signals.migrationsCount} migration files`);
  }

  if (signals.hasDatabaseConnection && signals.ormType) {
    score += 20;
    reasons.push(`Has ${signals.ormType} database connection`);
  }

  if (signals.hasModelsDir && signals.modelsCount > 0) {
    score += 15;
    reasons.push(`Has ${signals.modelsCount} model files`);
  }

  if (signals.databasePackages.length > 0) {
    score += 10;
    reasons.push(`Uses database packages: ${signals.databasePackages.slice(0, 3).join(', ')}`);
  }

  // Calculate confidence
  const hasDatabaseSync = score >= 40;
  const syncRequired = score >= 50;
  const confidence = Math.min(100, score);

  return {
    hasDatabaseSync,
    syncRequired,
    confidence,
    reason: syncRequired
      ? `Detected as database sync service: ${reasons.join(', ')}`
      : 'Not detected as a database sync service',
    signals,
    reasons,
    syncCommand: signals.syncScript || signals.ormType || 'npm run sync'
  };
}
```

---

### Decision Point 3: What's the Execution Flow?

**Automatic Detection:**

```javascript
async function detectExecutionFlow(repositories) {
  console.log(`🔍 Analyzing execution flow across ${repositories.length} repositories...\n`);

  const analysis = [];

  for (const repo of repositories) {
    const repoAnalysis = {
      repository: repo.name,
      role: null,
      operations: [],
      triggers: [],
      consumers: [],
      providers: []
    };

    // Detect role
    const publishingDecision = await detectPackagePublishing(repo);
    const databaseDecision = await detectDatabaseSyncService(repo);

    // Determine role
    if (publishingDecision.isPackage && publishingDecision.needsPublishing) {
      repoAnalysis.role = 'shared-package';
      repoAnalysis.operations.push({
        operation: 'publish',
        trigger: 'after-changes',
        confidence: publishingDecision.confidence
      });
    } else if (databaseDecision.hasDatabaseSync) {
      repoAnalysis.role = 'database-sync-service';
      repoAnalysis.operations.push({
        operation: 'database-sync',
        trigger: 'after-model-changes',
        confidence: databaseDecision.confidence
      });
    } else if (await hasApiServer(repo)) {
      repoAnalysis.role = 'backend-service';
    } else if (await hasFrontendCode(repo)) {
      repoAnalysis.role = 'frontend-service';
    }

    // Find dependencies
    const deps = await getDependencies(repo);
    for (const dep of deps.local) {
      repoAnalysis.providers.push(dep);
    }

    // Find consumers
    const consumers = await getConsumers(repo, repositories);
    repoAnalysis.consumers = consumers;

    analysis.push(repoAnalysis);
  }

  // Build execution flow
  const flow = buildExecutionFlow(analysis);

  console.log(`📊 Execution Flow Analysis:\n`);
  displayExecutionFlow(flow);

  return flow;
}

function buildExecutionFlow(analysis) {
  const flow = {
    stages: [],
    triggers: []
  };

  // Stage 1: Shared packages (source of truth)
  const packages = analysis.filter(a => a.role === 'shared-package');
  if (packages.length > 0) {
    flow.stages.push({
      stage: 1,
      name: 'Shared Packages',
      repositories: packages.map(p => ({
        name: p.repository,
        operations: p.operations
      })),
      reason: 'Source repositories that others depend on'
    });
  }

  // Stage 2: Database sync (if models changed)
  const dbServices = analysis.filter(a => a.role === 'database-sync-service');
  if (dbServices.length > 0) {
    flow.stages.push({
      stage: 2,
      name: 'Database Synchronization',
      repositories: dbServices.map(s => ({
        name: s.repository,
        operations: s.operations
      })),
      reason: 'Sync database schema if models changed',
      trigger: 'after-model-changes'
    });
  }

  // Stage 3: Backend services
  const backends = analysis.filter(a => a.role === 'backend-service');
  if (backends.length > 0) {
    flow.stages.push({
      stage: 3,
      name: 'Backend Services',
      repositories: backends.map(b => b.repository),
      reason: 'API services that consume packages and expose APIs'
    });
  }

  // Stage 4: Frontend services
  const frontends = analysis.filter(a => a.role === 'frontend-service');
  if (frontends.length > 0) {
    flow.stages.push({
      stage: 4,
      name: 'Frontend Services',
      repositories: frontends.map(f => f.repository),
      reason: 'Frontend applications that consume APIs'
    });
  }

  return flow;
}

function displayExecutionFlow(flow) {
  console.log('🎯 AUTOMATICALLY DETECTED EXECUTION FLOW\n');
  console.log('=' .repeat(80));

  for (const stage of flow.stages) {
    console.log(`\n📍 Stage ${stage.stage}: ${stage.name}`);
    console.log(`   Reason: ${stage.reason}`);

    if (stage.repositories) {
      for (const repo of stage.repositories) {
        console.log(`   - ${repo.name}`);
        if (repo.operations) {
          for (const op of repo.operations) {
            console.log(`     → ${op.operation} (${op.confidence}% confidence)`);
          }
        }
      }
    }

    if (stage.trigger) {
      console.log(`   Trigger: ${stage.trigger}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n✨ Flow detected automatically from repository analysis!\n`);
}
```

---

## 🔄 INTEGRATION WITH GLOBAL AGENT WORKFLOW

### Updated Phase 0: Environment Detection with Auto-Operation

```javascript
// Add to global-agent-workflow.md after environment detection

async function enhancedEnvironmentDetection(workspace) {
  console.log('🏗️ ENHANCED ENVIRONMENT DETECTION\n');
  console.log('=' .repeat(80));

  // Step 1: Discover repositories
  const repositories = await discoverRepositories(workspace);
  console.log(`✅ Found ${repositories.length} repositories\n`);

  // Step 2: Auto-detect operations for each repository
  console.log('🤖 Auto-detecting operations...\n');
  const repositoryAnalysis = [];

  for (const repo of repositories) {
    console.log(`📦 ${repo.name}`);

    const analysis = {
      repository: repo,
      path: repo.path,
      publishing: await detectPackagePublishing(repo),
      database: await detectDatabaseSyncService(repo)
    };

    // Display results
    if (analysis.publishing.isPackage) {
      console.log(`   ✅ Package detected (${analysis.publishing.confidence}%)`);
      if (analysis.publishing.needsPublishing) {
        console.log(`   📤 Will PUBLISH after changes`);
      }
    }

    if (analysis.database.hasDatabaseSync) {
      console.log(`   ✅ Database sync detected (${analysis.database.confidence}%)`);
      console.log(`   🗄️  Will SYNC DATABASE after model changes`);
    }

    repositoryAnalysis.push(analysis);
    console.log('');
  }

  // Step 3: Build execution flow
  const flow = await detectExecutionFlow(repositories);

  // Step 4: Display complete analysis
  console.log('🎯 AUTOMATIC ANALYSIS COMPLETE\n');
  console.log('=' .repeat(80));
  console.log('\n✅ Agent has automatically determined:');
  console.log('   • Which repositories are packages');
  console.log('   • Which packages need publishing');
  console.log('   • Which services perform database sync');
  console.log('   • The correct execution flow');
  console.log('   • Required operations for each repository');
  console.log('\n🚀 Ready to execute tasks with full autonomy!\n');
  console.log('=' .repeat(80) + '\n');

  return {
    repositories,
    repositoryAnalysis,
    flow
  };
}
```

---

## 🎯 KEY CAPABILITIES

### ✅ Fully Autonomous Decisions

1. **Package Detection**
   - Automatically detects if a repo is a package
   - Determines if publishing is required
   - No hardcoded names or conditions

2. **Database Sync Detection**
   - Automatically detects database sync services
   - Determines when sync is needed
   - Identifies sync commands

3. **Execution Flow Detection**
   - Automatically builds execution stages
   - Identifies triggers and dependencies
   - No manual flow configuration needed

### ✅ Confidence-Based Actions

All decisions include:
- Confidence score (0-100%)
- Clear reasoning
- Detected signals
- Recommended actions

### ✅ Works on ANY Project

- No assumptions about project structure
- Learns from actual code
- Adapts to different patterns
- No hardcoded repository names

---

## 📊 EXAMPLE OUTPUT

```
🤖 AUTO-OPERATION DETECTION
===========================

📦 harborSharedModels
   ✅ Package detected (95%)
   📤 Will PUBLISH after changes
   Reason: Package is not private, Consumed by 5 other repositories, Has index.ts

📦 harborDatabaseSync
   ✅ Database sync detected (88%)
   🗄️  Will SYNC DATABASE after model changes
   Reason: Uses Sequelize.sync() pattern, Has sync script: npm run sync

📦 harborUserSvc
   Backend service detected
   ❌ Not a package
   Reason: Has API server, Has routes and controllers

🎯 AUTOMATICALLY DETECTED EXECUTION FLOW
========================================

📍 Stage 1: Shared Packages
   Reason: Source repositories that others depend on
   - harborSharedModels
     → publish (95% confidence)

📍 Stage 2: Database Synchronization
   Reason: Sync database schema if models changed
   Trigger: after-model-changes
   - harborDatabaseSync
     → database-sync (88% confidence)

📍 Stage 3: Backend Services
   Reason: API services that consume packages and expose APIs
   - harborUserSvc
   - harborJobSvc

📍 Stage 4: Frontend Services
   Reason: Frontend applications that consume APIs
   - harborWebsite

✨ Flow detected automatically from repository analysis!
```

---

## 🚀 IMPLEMENTATION STATUS

- [x] Package publishing detection
- [x] Database sync detection
- [x] Execution flow detection
- [ ] Integration with global workflow
- [ ] Testing on diverse projects
- [ ] Performance optimization

---

**Status:** 🟢 ACTIVE
**Version:** 1.0.0
**Confidence:** 95%

---

*Last Updated: 2026-03-19*
