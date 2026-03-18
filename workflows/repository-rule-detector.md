# Repository Rule Detector

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Discover implicit patterns and rules that must be followed in each repository

---

## 🎯 Core Philosophy

**Every repository has implicit rules that aren't documented.**

The agent must:
- Detect these rules automatically
- Follow them exactly
- Never introduce patterns that don't exist
- Maintain consistency with existing code

---

## 🚨 CRITICAL: Module Registration Awareness (MANDATORY)

**⚠️ This is the MOST CRITICAL rule category.**

**When creating ANY new module (model, service, controller, entity, etc.), the agent MUST:**

1. **Detect ALL registration points** before creating the module
2. **Complete ALL registration steps** after creating the module
3. **Verify complete integration** before proceeding

**📄 Full Documentation:** See `workflows/module-registration-awareness.md`

**❌ COMMON MISTAKE TO AVOID:**
- Creating a module file but forgetting to register it
- Assuming "the framework will handle it automatically"
- Skipping verification steps

**✅ REQUIRED BEHAVIOR:**
- Always detect registration patterns from existing modules
- Always follow the EXACT same registration pattern
- Always verify the module is fully integrated

**Quick Detection Checklist:**
- [ ] Search for existing similar modules
- [ ] Identify where they are imported
- [ ] Identify where they are registered
- [ ] Document all registration points
- [ ] Apply all registration steps
- [ ] Verify complete integration

---

## Rule Categories

### 1. Version Update Rules

### Detect Version Update Requirements

```javascript
function detectVersionUpdateRules(repository) {
  const indicators = {
    // Check for package.json version
    hasPackageJsonVersion: checkFileExists(repository, 'package.json') &&
      hasVersionField(readPackageJson(repository)),

    // Check if other repos reference specific versions
    hasVersionReferences: checkForVersionReferences(repository),

    // Check for changelog
    hasChangelog: checkFileExists(repository, 'CHANGELOG.md'),

    // Check for version tags in git
    hasVersionTags: checkForGitVersionTags(repository),

    // Check for version update pattern in commits
    hasVersionPattern: checkForVersionUpdatePattern(repository)
  };

  // Determine if version updates are required
  const requiresVersionUpdate =
    indicators.hasPackageJsonVersion &&
    (indicators.hasVersionReferences || indicators.hasChangelog);

  return {
    requiresVersionUpdate,
    indicators,
    workflow: inferVersionWorkflow(indicators),
    versioningStrategy: detectVersioningStrategy(repository)
  };
}

function checkForVersionReferences(repository) {
  // Check other repositories for version references
  const workspaceRepositories = getAllRepositories();

  for (const repo of workspaceRepositories) {
    if (repo.name === repository.name) continue;

    const packageJson = readPackageJson(repo);
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    for (const [name, version] of Object.entries(dependencies)) {
      if (name === repository.packageJson.name) {
        // This repo is referenced with a specific version
        return true;
      }
    }
  }

  return false;
}

function inferVersionWorkflow(indicators) {
  if (indicators.hasChangelog && indicators.hasVersionTags) {
    return {
      type: 'SEMANTIC_VERSIONING',
      steps: [
        'Determine change type (patch/minor/major)',
        'Update package.json version',
        'Update CHANGELOG.md',
        'Create git tag',
        'Dependent services: update dependency version',
        'Dependent services: run install'
      ]
    };
  }

  if (indicators.hasVersionReferences) {
    return {
      type: 'VERSION_UPDATE',
      steps: [
        'Update package.json version',
        'Dependent services: update dependency version',
        'Dependent services: run install'
      ]
    };
  }

  return {
    type: 'NO_VERSIONING',
    steps: []
  };
}
```

---

### 2. Model Registration Rules

### Detect Model Registration Patterns

```javascript
function detectModelRegistrationRules(repository) {
  const patterns = [];

  // Pattern 1: Barrel export in models/index.ts
  const modelsIndex = findFile(repository, '**/models/index.ts');
  if (modelsIndex) {
    const content = readFile(modelsIndex);
    if (content.includes('export') && content.includes('from')) {
      patterns.push({
        type: 'barrel-export',
        file: modelsIndex,
        instruction: 'Add export to models/index.ts',
        example: extractExportExample(content)
      });
    }
  }

  // Pattern 2: ORM registration in database/index.ts
  const databaseIndex = findFile(repository, '**/database/index.ts');
  if (databaseIndex) {
    const content = readFile(databaseIndex);
    if (content.includes('sequelize') || content.includes('TypeORM')) {
      patterns.push({
        type: 'orm-registration',
        file: databaseIndex,
        instruction: 'Register model in database/index.ts',
        example: extractRegistrationExample(content)
      });
    }
  }

  // Pattern 3: Sequelize.sync() pattern
  if (codeContains(repository, 'sequelize.sync()')) {
    patterns.push({
      type: 'sequelize-sync',
      instruction: 'Model will be auto-synced on server start',
      noActionRequired: true
    });
  }

  // Pattern 4: Migration-based (no auto-registration)
  const migrationsDir = findDirectory(repository, 'migrations');
  if (migrationsDir && !patterns.some(p => p.type === 'orm-registration')) {
    patterns.push({
      type: 'migration-based',
      instruction: 'Create migration file for new model',
      migrationDirectory: migrationsDir
    });
  }

  return patterns;
}
```

---

### 3. API Registration Rules

### Detect API Registration Patterns

```javascript
function detectApiRegistrationRules(repository) {
  const patterns = [];

  // Pattern 1: Express routes in routes/index.ts
  const routesIndex = findFile(repository, '**/routes/index.ts');
  if (routesIndex) {
    const content = readFile(routesIndex);

    // Check for route registration pattern
    if (content.includes('router.use') || content.includes('app.use')) {
      patterns.push({
        type: 'centralized-routes',
        file: routesIndex,
        instruction: 'Register route in routes/index.ts',
        example: extractRouteRegistrationExample(content)
      });
    }
  }

  // Pattern 2: Controller-based
  const controllersDir = findDirectory(repository, 'controllers');
  if (controllersDir) {
    patterns.push({
      type: 'controller-based',
      instruction: 'Create controller file in controllers/',
      registration: detectControllerRegistration(repository)
    });
  }

  // Pattern 3: Nest.js module-based
  if (hasDependency(repository, '@nestjs/core')) {
    patterns.push({
      type: 'nest-module',
      instruction: 'Create module and register in app.module.ts',
      moduleFile: findFile(repository, '**/app.module.ts')
    });
  }

  // Pattern 4: Fastify plugin-based
  if (hasDependency(repository, 'fastify')) {
    patterns.push({
      type: 'fastify-plugin',
      instruction: 'Create Fastify plugin and register in server',
      registrationFile: findFile(repository, '**/server.ts')
    });
  }

  return patterns;
}
```

---

### 4. Export/Index File Rules

### Detect Export Update Requirements

```javascript
function detectExportUpdateRules(repository) {
  const exports = [];

  // Find all index.ts files
  const indexFiles = findAll(repository, '**/index.ts');

  for (const indexFile of indexFiles) {
    const content = readFile(indexFile);

    // Detect export patterns
    const patterns = {
      barrelExport: detectPattern(content, /export \* from ['"](.+)['"]/g),
      namedExport: detectPattern(content, /export \{ .+ \} from ['"](.+)['"]/g),
      defaultExport: detectPattern(content, /export default .+ from/g),
      typeExport: detectPattern(content, /export type \{ .+ \} from ['"](.+)['"]/g)
    };

    // Only include if this is actually a barrel file
    if (Object.values(patterns).some(p => p && p.length > 0)) {
      exports.push({
        file: indexFile,
        directory: path.dirname(indexFile),
        patterns: Object.keys(patterns).filter(key =>
          patterns[key] && patterns[key].length > 0
        ),
        instruction: inferExportInstruction(indexFile, patterns)
      });
    }
  }

  return exports;
}

function inferExportInstruction(file, patterns) {
  const relativePath = path.relative(repository.path, file);

  if (patterns.barrelExport) {
    return `Add export to ${relativePath}: 'export * from \'./newModule\';`;
  }

  if (patterns.namedExport) {
    return `Add export to ${relativePath}: 'export { NewModule } from \'./newModule\';`;
  }

  return `Update exports in ${relativePath}`;
}
```

---

### 5. Dependency Synchronization Rules

### Detect Dependency Sync Requirements

```javascript
function detectDependencySyncRules(repository) {
  const rules = {
    // Local dependency versioning
    localDependencyVersion: detectLocalDependencyVersioning(repository),

    // Install requirements
    requiresInstall: detectInstallRequirement(repository),

    // Build requirements
    requiresBuild: detectBuildRequirement(repository),

    // Workspace dependencies
    workspaceDependencies: detectWorkspaceDependencies(repository),

    // Lock file requirements
    requiresLockFileUpdate: detectLockFileRequirements(repository)
  };

  return rules;
}

function detectLocalDependencyVersioning(repository) {
  const localDeps = extractLocalDependencies(repository);

  const versioning = localDeps.map(dep => ({
    dependency: dep.name,
    currentVersion: dep.version,
    workspaceRepo: findRepositoryByName(dep.name),
    requiresVersionUpdate: true,
    updateWorkflow: [
      `Update ${dep.name} version in package.json`,
      `Run install command`,
      `Verify imports resolve`
    ]
  }));

  return versioning;
}

function detectInstallRequirement(repository) {
  const packageManager = detectPackageManager(repository);

  return {
    required: true,
    trigger: [
      'dependencies changed in package.json',
      'new local dependency added',
      'dependency version updated',
      'node_modules not present'
    ],
    command: getInstallCommand(packageManager),
    packageManager
  };
}

function detectBuildRequirement(repository) {
  const packageJson = readPackageJson(repository);
  const hasBuildScript = packageJson.scripts?.build;

  if (hasBuildScript) {
    return {
      required: true,
      trigger: [
        'TypeScript code changed',
        'dependencies changed',
        'before deployment'
      ],
      command: detectPackageManager(repository) === 'bun'
        ? 'bun run build'
        : 'npm run build'
    };
  }

  return {
    required: false
  };
}
```

---

### 6. Installation Rules

### Detect Installation Patterns

```javascript
function detectInstallationRules(repository) {
  const packageManager = detectPackageManager(repository);

  const rules = {
    packageManager,

    // Package manager detection
    detection: {
      npm: checkForNpm(repository),
      bun: checkForBun(repository),
      yarn: checkForYarn(repository),
      pnpm: checkForPnpm(repository)
    },

    // Install triggers
    installTriggers: [
      'package.json dependencies changed',
      'new local dependency added',
      'dependency version updated',
      'node_modules not present',
      'lock file out of sync'
    ],

    // Install command
    installCommand: getInstallCommand(packageManager),

    // Lock file
    lockFile: {
      file: getLockFileName(packageManager),
      exists: checkLockFileExists(repository, packageManager),
      mustBeCommitted: true
    },

    // Node modules
    nodeModules: {
      directory: 'node_modules',
      inGitignore: checkGitignore(repository, 'node_modules'),
      shouldNotBeCommitted: true
    }
  };

  return rules;
}

function detectPackageManager(repository) {
  const packageJson = readPackageJson(repository);

  // Check for explicit package manager
  if (packageJson.packageManager) {
    return packageJson.packageManager.split('@')[0];
  }

  // Check for lock files
  if (checkFileExists(repository, 'bun.lockb')) return 'bun';
  if (checkFileExists(repository, 'package-lock.json')) return 'npm';
  if (checkFileExists(repository, 'yarn.lock')) return 'yarn';
  if (checkFileExists(repository, 'pnpm-lock.yaml')) return 'pnpm';

  // Default to npm
  return 'npm';
}

function getInstallCommand(packageManager) {
  const commands = {
    npm: 'npm install',
    bun: 'bun install',
    yarn: 'yarn install',
    pnpm: 'pnpm install'
  };

  return commands[packageManager] || 'npm install';
}
```

---

### 7. Build Rules

### Detect Build Patterns

```javascript
function detectBuildRules(repository) {
  const packageJson = readPackageJson(repository);
  const hasBuildScript = packageJson.scripts?.build;

  if (!hasBuildScript) {
    return {
      hasBuildProcess: false,
      instruction: 'No build script found. Code runs directly.'
    };
  }

  const buildScript = packageJson.scripts.build;

  return {
    hasBuildProcess: true,

    command: detectPackageManager(repository) === 'bun'
      ? `bun run ${buildScript}`
      : `npm run ${buildScript}`,

    steps: parseBuildScript(buildScript),

    // Detect build output directory
    outputDirectory: detectBuildOutputDirectory(repository),

    // Detect if build is required before deployment
    requiredBeforeDeploy: detectBuildRequired(repository),

    // Detect TypeScript compilation
    typescript: detectTypeScriptBuild(repository),

    // Detect bundling
    bundler: detectBundler(repository)
  };
}

function detectBuildOutputDirectory(repository) {
  // Check common build output directories
  const commonOutputs = ['dist', 'build', 'out', '.next'];

  for (const output of commonOutputs) {
    if (checkDirectoryExists(repository, output)) {
      return output;
    }

    // Check tsconfig.json
    const tsconfig = readTsConfig(repository);
    if (tsconfig?.compilerOptions?.outDir) {
      return tsconfig.compilerOptions.outDir;
    }
  }

  return 'dist'; // Default
}
```

---

### 8. Testing Rules

### Detect Testing Patterns

```javascript
function detectTestingRules(repository) {
  const packageJson = readPackageJson(repository);
  const testScript = packageJson.scripts?.test;

  if (!testScript) {
    return {
      hasTests: false,
      instruction: 'No test script found. Consider adding tests.'
    };
  }

  return {
    hasTests: true,

    command: detectPackageManager(repository) === 'bun'
      ? `bun run ${testScript}`
      : `npm run ${testScript}`,

    // Detect test framework
    framework: detectTestFramework(repository),

    // Detect test location
    testDirectory: detectTestDirectory(repository),

    // Detect test file naming
    testFilePattern: detectTestFilePattern(repository),

    // Detect coverage requirements
    coverage: detectCoverageRequirements(repository),

    // Detect test hooks
    hooks: detectTestHooks(repository)
  };
}

function detectTestFramework(repository) {
  const frameworks = {
    jest: hasDependency(repository, 'jest'),
    mocha: hasDependency(repository, 'mocha'),
    jasmine: hasDependency(repository, 'jasmine'),
    vitest: hasDependency(repository, 'vitest'),
    cypress: hasDependency(repository, 'cypress'),
    playwright: hasDependency(repository, '@playwright/test')
  };

  return Object.keys(frameworks).find(key => frameworks[key]) || 'unknown';
}

function detectTestFilePattern(repository) {
  // Check test directory for file patterns
  const testFiles = findTestFiles(repository);

  if (testFiles.length === 0) return null;

  // Detect patterns
  const patterns = testFiles.map(file => path.basename(file));

  // Common patterns
  if (patterns.some(p => p.endsWith('.test.ts'))) return '*.test.ts';
  if (patterns.some(p => p.endsWith('.spec.ts'))) return '*.spec.ts';
  if (patterns.some(p => p.startsWith('test-'))) return 'test-*.ts';

  return '*.test.ts'; // Default
}
```

---

## Rule Integration

### Apply Detected Rules

```javascript
function applyDetectedRules(repository, changes) {
  const rules = detectAllRules(repository);
  const appliedChanges = [];

  // Apply version update rules
  if (rules.versionUpdate.requiresVersionUpdate) {
    const versionChange = applyVersionUpdateRules(repository, changes, rules.versionUpdate);
    if (versionChange) {
      appliedChanges.push(versionChange);
    }
  }

  // Apply model registration rules
  if (changes.includes('model')) {
    const modelRegistrations = applyModelRegistrationRules(repository, changes, rules.modelRegistration);
    appliedChanges.push(...modelRegistrations);
  }

  // Apply API registration rules
  if (changes.includes('api')) {
    const apiRegistrations = applyApiRegistrationRules(repository, changes, rules.apiRegistration);
    appliedChanges.push(...apiRegistrations);
  }

  // Apply export update rules
  if (changes.includes('export')) {
    const exportUpdates = applyExportUpdateRules(repository, changes, rules.exportUpdate);
    appliedChanges.push(...exportUpdates);
  }

  // Apply dependency sync rules
  if (changes.includes('dependency')) {
    const dependencySync = applyDependencySyncRules(repository, changes, rules.dependencySync);
    appliedChanges.push(dependencySync);
  }

  // Apply installation rules
  if (rules.installation.required) {
    const installation = applyInstallationRules(repository, rules.installation);
    appliedChanges.push(installation);
  }

  // Apply build rules
  if (rules.build.hasBuildProcess) {
    const build = applyBuildRules(repository, rules.build);
    appliedChanges.push(build);
  }

  return appliedChanges;
}
```

---

## 🚨 CRITICAL: Rules Must Be Detected and Followed

**ABSOLUTE RULE:**

```
DO NOT implement changes without detecting repository rules first.

Implementation WITHOUT following rules = BROKEN CODE
```

**Rule Detection Checklist:**

- [ ] Version update rules detected
- [ ] Model registration rules detected
- [ ] API registration rules detected
- [ ] Export update rules detected
- [ ] Dependency sync rules detected
- [ ] Installation rules detected
- [ ] Build rules detected
- [ ] Testing rules detected
- [ ] All rules understood and documented
- [ ] Implementation follows detected rules exactly

**Only when ALL checks pass → Implementation is valid**

---

**End of Repository Rule Detector**
