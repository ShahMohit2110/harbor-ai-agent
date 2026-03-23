# 🧠 Rule Inference System - Harbor AI Agent v8.0

**Version:** 1.0.0
**Last Updated:** 2026-03-19
**Purpose:** Automatically learn and infer project-specific rules from repository structure without hardcoded conditions

---

# 🎯 OVERVIEW

The Rule Inference System transforms the agent from using hardcoded rules to **dynamically learned patterns** from any project structure.

**Core Philosophy:** "Show me your code, and I'll learn your rules"

---

## 🧩 PROBLEM STATEMENT

### Current Problems:
1. ❌ Static conditions like "if repo is harborSharedModels → must publish"
2. ❌ Hardcoded repository names and patterns
3. ❌ Cannot adapt to new project structures automatically
4. ❌ Misses implicit patterns that aren't documented

### Desired State:
1. ✅ Automatically detects "this is a shared library" from code structure
2. ✅ Infers "this requires publishing" from package.json and scripts
3. ✅ Adapts to ANY project structure automatically
4. ✅ Detects both explicit and implicit patterns

---

## 🔍 RULE INFERENCE ENGINE

### 1. Automatic Repository Role Detection

**Detect repository role WITHOUT hardcoded names:**

```javascript
async function detectRepositoryRole(repository) {
  const signals = await collectSignals(repository);

  return {
    role: inferRole(signals),
    confidence: calculateConfidence(signals),
    operations: inferRequiredOperations(signals),
    constraints: inferConstraints(signals)
  };
}

async function collectSignals(repository) {
  return {
    // Package signals
    hasPackageJson: await fileExists('package.json'),
    packageJson: await readJson('package.json'),

    // Export signals
    exports: await detectExports(),
    hasIndexFile: await fileExists('index.ts') || await fileExists('index.js'),
    barrelExports: await detectBarrelExports(),

    // Dependency signals
    isDependedUpon: await checkIfOthersDependOnThis(),
    dependencies: await getDependencies(),

    // Build signals
    buildScripts: await extractBuildScripts(),
    hasBuildStep: await checkHasBuildStep(),

    // Publish signals
    publishScripts: await extractPublishScripts(),
    hasPublishStep: await checkHasPublishStep(),

    // Database signals
    hasModels: await detectModels(),
    hasMigrations: await detectMigrations(),
    hasSequelizeSync: await detectSequelizeSync(),
    hasDatabaseConnection: await detectDatabaseConnection(),

    // API signals
    hasRoutes: await detectRoutes(),
    hasControllers: await detectControllers(),
    hasApiServer: await detectApiServer(),

    // Service signals
    hasServiceLogic: await detectServiceLogic(),

    // Frontend signals
    hasReactComponents: await detectReactComponents(),
    hasNextJs: await detectNextJs(),
    hasReactNative: await detectReactNative(),

    // Configuration signals
    hasDockerfile: await fileExists('Dockerfile'),
    hasCiConfig: await detectCiConfig(),

    // Git signals
    isGitRepo: await isGitRepository(),
    hasRemote: await hasGitRemote()
  };
}
```

---

### 2. Role Inference Algorithm

**Infer repository role from collected signals:**

```javascript
function inferRole(signals) {
  const scores = {
    sharedLibrary: calculateSharedLibraryScore(signals),
    backendService: calculateBackendServiceScore(signals),
    frontendWeb: calculateFrontendWebScore(signals),
    mobileApp: calculateMobileAppScore(signals),
    databaseSync: calculateDatabaseSyncScore(signals),
    apiGateway: calculateApiGatewayScore(signals),
    utilityPackage: calculateUtilityPackageScore(signals)
  };

  // Find highest score
  const maxScore = Math.max(...Object.values(scores));
  const role = Object.keys(scores).find(key => scores[key] === maxScore);

  return {
    role: role,
    score: maxScore,
    allScores: scores
  };
}

function calculateSharedLibraryScore(signals) {
  let score = 0;

  // Strong indicators
  if (signals.hasIndexFile) score += 30;
  if (signals.barrelExports.length > 0) score += 25;
  if (signals.exports.length > 5) score += 20;
  if (signals.isDependedUpon) score += 25;

  // Medium indicators
  if (signals.hasPackageJson && signals.packageJson.private === false) score += 15;
  if (signals.buildScripts.length > 0) score += 10;

  // Negative indicators
  if (signals.hasApiServer) score -= 20;
  if (signals.hasReactComponents) score -= 15;
  if (signals.hasNextJs) score -= 15;

  return Math.max(0, score);
}

function calculateDatabaseSyncScore(signals) {
  let score = 0;

  // Strong indicators
  if (signals.hasSequelizeSync) score += 40;
  if (signals.hasMigrations && signals.hasDatabaseConnection) score += 35;

  // Medium indicators
  if (signals.hasModels && signals.hasDatabaseConnection) score += 20;
  if (signals.packageJson.scripts?.includes('sync')) score += 15;

  return Math.max(0, score);
}

function calculateBackendServiceScore(signals) {
  let score = 0;

  // Strong indicators
  if (signals.hasApiServer) score += 30;
  if (signals.hasRoutes && signals.hasControllers) score += 25;

  // Medium indicators
  if (signals.hasServiceLogic) score += 15;
  if (signals.hasDatabaseConnection) score += 10;

  return Math.max(0, score);
}
```

---

### 3. Operation Inference Algorithm

**Infer required operations from signals:**

```javascript
function inferRequiredOperations(signals, role) {
  const operations = [];

  // Version update operation
  if (signals.hasPackageJson && signals.isDependedUpon) {
    operations.push({
      operation: 'version-update',
      required: true,
      confidence: 0.9,
      trigger: 'when-code-changes',
      reason: 'Repository is depended upon by others'
    });
  }

  // Build operation
  if (signals.hasBuildStep || role === 'sharedLibrary') {
    operations.push({
      operation: 'build',
      required: true,
      confidence: 0.95,
      trigger: 'after-code-changes',
      reason: 'Repository has build step'
    });
  }

  // Publish operation (CRITICAL - No hardcoded names!)
  if (shouldPublish(signals, role)) {
    operations.push({
      operation: 'publish',
      required: true,
      confidence: 0.85,
      trigger: 'after-build',
      reason: inferPublishReason(signals, role),
      registry: inferPublishRegistry(signals)
    });
  }

  // Database sync operation
  if (role === 'databaseSync' || signals.hasSequelizeSync) {
    operations.push({
      operation: 'database-sync',
      required: true,
      confidence: 0.9,
      trigger: 'after-model-changes',
      reason: 'Repository performs database synchronization'
    });
  }

  // Install operation (for consumers)
  if (signals.dependencies.local.length > 0) {
    operations.push({
      operation: 'install',
      required: true,
      confidence: 1.0,
      trigger: 'after-dependency-update',
      reason: 'Repository has local dependencies'
    });
  }

  return operations;
}

// CRITICAL: Dynamically detect if publishing is required
function shouldPublish(signals, role) {
  // Check for explicit publish scripts
  if (signals.publishScripts.length > 0) {
    return true;
  }

  // Check package.json fields
  if (signals.hasPackageJson) {
    // If not private, likely publishes
    if (signals.packageJson.private === false) {
      return true;
    }

    // Check for publish-related fields
    if (signals.packageJson.publishConfig) {
      return true;
    }
  }

  // If it's a shared library with a build step, likely publishes
  if (role === 'sharedLibrary' && signals.hasBuildStep) {
    return true;
  }

  // Check CI/CD config for publish steps
  if (signals.hasCiConfig) {
    const ciConfig = await readCiConfig();
    if (ciConfig.includes('publish') || ciConfig.includes('npm publish')) {
      return true;
    }
  }

  return false;
}
```

---

### 4. Constraint Inference Algorithm

**Infer what operations are ALLOWED/DISALLOWED:**

```javascript
function inferConstraints(signals, role) {
  const constraints = [];

  // Git push constraints
  if (role === 'sharedLibrary') {
    // Shared libraries CAN push (they're the source)
    constraints.push({
      operation: 'git-push',
      allowed: true,
      reason: 'Source repositories can push changes'
    });
  } else if (role === 'backendService' || role === 'frontendWeb') {
    // Services MAY OR MAY NOT push - infer from patterns
    const canPush = inferIfCanPush(signals);
    constraints.push({
      operation: 'git-push',
      allowed: canPush,
      reason: canPush
        ? 'Repository pattern allows pushing'
        : 'Repository pattern restricts pushing (testing phase)'
    });
  }

  // Package publishing constraints
  if (role === 'sharedLibrary' && shouldPublish(signals, role)) {
    constraints.push({
      operation: 'publish',
      allowed: true,
      reason: 'Shared library with publish capability'
    });
  } else {
    constraints.push({
      operation: 'publish',
      allowed: false,
      reason: 'Not a publishable package repository'
    });
  }

  // Database operation constraints
  if (role === 'databaseSync' || signals.hasSequelizeSync) {
    constraints.push({
      operation: 'database-sync',
      allowed: true,
      reason: 'Repository performs database operations'
    });
  } else {
    constraints.push({
      operation: 'database-sync',
      allowed: false,
      reason: 'Repository does not handle database synchronization'
    });
  }

  return constraints;
}

async function inferIfCanPush(signals) {
  // Check for testing mode indicators
  if (signals.packageJson?.scripts?.test?.includes('--no-push')) {
    return false;
  }

  // Check for environment variables
  if (process.env.HARBOR_AI_TESTING_MODE === 'true') {
    return false;
  }

  // Check CI/CD config
  if (signals.hasCiConfig) {
    const ciConfig = await readCiConfig();
    if (ciConfig.includes('skip-ci') || ciConfig.includes('dry-run')) {
      return false;
    }
  }

  // Default: allow push
  return true;
}
```

---

### 5. Pattern Detection Engine

**Detect implicit patterns from code:**

```javascript
async function detectPatterns(repository) {
  const patterns = [];

  // Model registration pattern
  const modelPattern = await detectModelRegistrationPattern(repository);
  if (modelPattern) {
    patterns.push({
      type: 'model-registration',
      pattern: modelPattern,
      confidence: modelPattern.confidence
    });
  }

  // API registration pattern
  const apiPattern = await detectApiRegistrationPattern(repository);
  if (apiPattern) {
    patterns.push({
      type: 'api-registration',
      pattern: apiPattern,
      confidence: apiPattern.confidence
    });
  }

  // Module export pattern
  const exportPattern = await detectExportPattern(repository);
  if (exportPattern) {
    patterns.push({
      type: 'module-export',
      pattern: exportPattern,
      confidence: exportPattern.confidence
    });
  }

  // Version update pattern
  const versionPattern = await detectVersionPattern(repository);
  if (versionPattern) {
    patterns.push({
      type: 'version-update',
      pattern: versionPattern,
      confidence: versionPattern.confidence
    });
  }

  return patterns;
}

async function detectModelRegistrationPattern(repository) {
  // Look for common patterns
  const patterns = [
    {
      name: 'barrel-export',
      check: async () => {
        const indexPath = 'models/index.ts';
        if (await fileExists(indexPath)) {
          const content = await readFile(indexPath);
          return content.includes('export ') && content.includes('from ');
        }
        return false;
      },
      action: 'Add export to models/index.ts'
    },
    {
      name: 'sequelize-sync',
      check: async () => {
        const content = await grepFiles('sequelize.sync()', repository);
        return content.matches.length > 0;
      },
      action: 'Run database sync'
    },
    {
      name: 'migration-based',
      check: async () => {
        const migrations = await findFiles('migrations/*.js');
        return migrations.length > 0;
      },
      action: 'Create migration file'
    }
  ];

  for (const pattern of patterns) {
    if (await pattern.check()) {
      return {
        name: pattern.name,
        action: pattern.action,
        confidence: 0.9
      };
    }
  }

  return null;
}
```

---

### 6. Dependency Chain Inference

**Automatically build dependency chain without hardcoding:**

```javascript
async function inferDependencyChain(repositories) {
  const graph = {};

  // Build dependency graph
  for (const repo of repositories) {
    graph[repo.name] = {
      dependencies: [],
      dependents: [],
      role: repo.role,
      operations: repo.operations
    };

    // Check package.json dependencies
    if (repo.signals.hasPackageJson) {
      const deps = repo.signals.packageJson.dependencies || {};
      const devDeps = repo.signals.packageJson.devDependencies || {};

      // Find which dependencies are local repositories
      for (const [name, version] of Object.entries({...deps, ...devDeps})) {
        const localRepo = repositories.find(r =>
          r.signals.packageJson?.name === name
        );

        if (localRepo) {
          graph[repo.name].dependencies.push({
            name: localRepo.name,
            version: version,
            type: 'local'
          });

          graph[localRepo.name].dependents.push({
            name: repo.name,
            version: version
          });
        }
      }
    }

    // Check import statements for dependencies
    const imports = await detectImports(repo);
    for (const imp of imports) {
      const localRepo = repositories.find(r =>
        imp.path.includes(r.name) || imp.path.includes(r.signals.packageJson?.name)
      );

      if (localRepo && localRepo.name !== repo.name) {
        if (!graph[repo.name].dependencies.find(d => d.name === localRepo.name)) {
          graph[repo.name].dependencies.push({
            name: localRepo.name,
            type: 'import-based'
          });

          if (!graph[localRepo.name].dependents.find(d => d.name === repo.name)) {
            graph[localRepo.name].dependents.push({
              name: repo.name,
              type: 'import-based'
            });
          }
        }
      }
    }
  }

  return graph;
}
```

---

### 7. Complete Inference Workflow

**Main workflow that ties everything together:**

```javascript
async function runRuleInference(workspace) {
  console.log('🧠 Starting Rule Inference...\n');

  // Step 1: Discover repositories
  const repositories = await discoverRepositories(workspace);
  console.log(`✅ Found ${repositories.length} repositories\n`);

  // Step 2: Collect signals from each repository
  console.log('📡 Collecting signals from repositories...');
  for (const repo of repositories) {
    repo.signals = await collectSignals(repo);
    repo.roleInference = inferRole(repo.signals);
    repo.operations = inferRequiredOperations(repo.signals, repo.roleInference.role);
    repo.constraints = inferConstraints(repo.signals, repo.roleInference.role);
    console.log(`   ✅ ${repo.name}: ${repo.roleInference.role} (${repo.roleInference.score}%)`);
  }

  // Step 3: Detect patterns in each repository
  console.log('\n🔍 Detecting patterns...');
  for (const repo of repositories) {
    repo.patterns = await detectPatterns(repo);
    console.log(`   ✅ ${repo.name}: ${repo.patterns.length} patterns detected`);
  }

  // Step 4: Build dependency chain
  console.log('\n🔗 Building dependency chain...');
  const dependencyGraph = await inferDependencyChain(repositories);
  console.log('✅ Dependency chain built\n');

  // Step 5: Calculate execution order
  const executionOrder = calculateExecutionOrder(dependencyGraph);

  // Step 6: Display inference results
  displayInferenceResults(repositories, dependencyGraph, executionOrder);

  return {
    repositories,
    dependencyGraph,
    executionOrder,
    timestamp: Date.now()
  };
}

function displayInferenceResults(repositories, dependencyGraph, executionOrder) {
  console.log('\n📊 RULE INFERENCE RESULTS\n');
  console.log('=' .repeat(80));

  for (const repo of repositories) {
    console.log(`\n📦 Repository: ${repo.name}`);
    console.log(`   Role: ${repo.roleInference.role}`);
    console.log(`   Confidence: ${repo.roleInference.score}%`);

    console.log(`\n   Required Operations:`);
    for (const op of repo.operations) {
      console.log(`   - ${op.operation}: ${op.confidence * 100}% (${op.reason})`);
    }

    console.log(`\n   Constraints:`);
    for (const constraint of repo.constraints) {
      console.log(`   - ${constraint.operation}: ${constraint.allowed ? '✅ ALLOWED' : '❌ NOT ALLOWED'} (${constraint.reason})`);
    }

    if (repo.patterns.length > 0) {
      console.log(`\n   Detected Patterns:`);
      for (const pattern of repo.patterns) {
        console.log(`   - ${pattern.type}: ${pattern.pattern.name} (${pattern.confidence * 100}%)`);
      }
    }

    const deps = dependencyGraph[repo.name].dependencies;
    if (deps.length > 0) {
      console.log(`\n   Dependencies: ${deps.map(d => d.name).join(', ')}`);
    }

    const dependents = dependencyGraph[repo.name].dependents;
    if (dependents.length > 0) {
      console.log(`   Dependents: ${dependents.map(d => d.name).join(', ')}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n🎯 Execution Order:`);
  executionOrder.forEach((repo, index) => {
    console.log(`   ${index + 1}. ${repo}`);
  });
  console.log('\n');
}
```

---

## 🎯 KEY PRINCIPLES

### 1. NO HARDCODED NAMES
- ❌ DON'T: `if (repo.name === 'harborSharedModels')`
- ✅ DO: `if (repo.role === 'sharedLibrary' && repo.operations.includes('publish'))`

### 2. SIGNAL-BASED INFERENCE
- Collect multiple signals from codebase
- Use weighted scoring to infer role
- Provide confidence levels with all inferences

### 3. AUTOMATIC PATTERN LEARNING
- Detect patterns from code structure
- Learn from existing code
- Adapt to any project structure

### 4. CONFIDENCE-BASED DECISIONS
- All inferences include confidence scores
- Low confidence triggers additional analysis
- High confidence enables autonomous action

---

## 📊 INFERENCE EXAMPLES

### Example 1: Shared Library Detection

**Input:**
```javascript
{
  hasIndexFile: true,
  barrelExports: ['User', 'Job', 'Notification'],
  exports: 12,
  isDependedUpon: true,
  hasBuildStep: true,
  packageJson: { private: false }
}
```

**Inference:**
```javascript
{
  role: 'sharedLibrary',
  confidence: 0.92,
  operations: [
    { operation: 'version-update', required: true, confidence: 0.9 },
    { operation: 'build', required: true, confidence: 0.95 },
    { operation: 'publish', required: true, confidence: 0.85 }
  ],
  constraints: [
    { operation: 'publish', allowed: true, reason: 'Detected from package.json and dependencies' }
  ]
}
```

### Example 2: Database Sync Detection

**Input:**
```javascript
{
  hasSequelizeSync: true,
  hasModels: true,
  hasDatabaseConnection: true,
  packageJson: {
    scripts: {
      start: 'node src/server.js',
      sync: 'node scripts/sync-database.js'
    }
  }
}
```

**Inference:**
```javascript
{
  role: 'databaseSync',
  confidence: 0.88,
  operations: [
    { operation: 'database-sync', required: true, confidence: 0.9 }
  ],
  constraints: [
    { operation: 'database-sync', allowed: true, reason: 'Detected sync script and Sequelize usage' }
  ]
}
```

---

## 🚀 IMPLEMENTATION CHECKLIST

- [ ] Implement signal collection system
- [ ] Implement role inference algorithm
- [ ] Implement operation inference algorithm
- [ ] Implement constraint inference algorithm
- [ ] Implement pattern detection engine
- [ ] Implement dependency chain inference
- [ ] Add confidence scoring for all inferences
- [ ] Create inference result display system
- [ ] Test on multiple project types
- [ ] Validate against different architectures

---

**Status:** 🟢 ACTIVE DEVELOPMENT
**Version:** 1.0.0
**Next Update:** Add machine learning for pattern recognition

---

*Last Updated: 2026-03-19*
