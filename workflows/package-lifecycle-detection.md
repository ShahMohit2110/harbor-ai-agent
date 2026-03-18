# Package Lifecycle Detection

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Automatically detect and understand the complete lifecycle of package-based repositories

---

## 🎯 Core Philosophy

**Different projects handle packages differently. The agent must NOT assume any specific workflow.**

Instead, the agent must:
1. **Detect** how each repository manages its package lifecycle
2. **Infer** the correct workflow from existing patterns
3. **Apply** the detected workflow consistently
4. **Adapt** to different package management strategies

---

## Package Lifecycle Components

A package-based repository typically involves these lifecycle stages:

```
1. Source Code Changes
   ↓
2. Version Update
   ↓
3. Build/Package Generation
   ↓
4. Publishing (optional)
   ↓
5. Installation by Consumers
   ↓
6. Usage in Consumer Repositories
```

**The agent must detect which of these stages apply to each repository.**

---

## Detection Phase

### Step 1: Package Detection

**Identify if a repository behaves as a package:**

```javascript
async function detectPackageRepository(repository) {
  const indicators = {
    // Strong indicators
    hasPackageJson: await checkFileExists(repository, 'package.json'),
    hasVersion: await hasVersionField(repository),
    exportsModules: await hasExports(repository),
    noServerEntry: await lacksServerEntry(repository),

    // Weak indicators
    hasBuildScript: await hasBuildScript(repository),
    hasPrepareScript: await hasPrepareScript(repository),
    hasPublishScript: await hasPublishScript(repository),

    // Usage indicators
    importedByOthers: await checkImportedByOthers(repository),
    hasConsumers: await detectConsumers(repository)
  };

  // Calculate package confidence score
  const score = calculatePackageScore(indicators);

  return {
    isPackage: score >= 70,
    confidence: score,
    indicators: indicators,
    packageType: await determinePackageType(repository, indicators)
  };
}
```

### Package Type Classification

```javascript
async function determinePackageType(repository, indicators) {
  const types = {
    // Type 1: Shared Library (code only)
    sharedLibrary: {
      check: async () => {
        return indicators.exportsModules &&
               indicators.noServerEntry &&
               !indicators.hasBuildScript;
      },
      lifecycle: ['version', 'install']
    },

    // Type 2: Built Library (requires compilation)
    builtLibrary: {
      check: async () => {
        return indicators.exportsModules &&
               indicators.noServerEntry &&
               indicators.hasBuildScript;
      },
      lifecycle: ['version', 'build', 'install']
    },

    // Type 3: Publishable Package (published to registry)
    publishablePackage: {
      check: async () => {
        return indicators.exportsModules &&
               indicators.hasPublishScript;
      },
      lifecycle: ['version', 'build', 'publish', 'install']
    },

    // Type 4: Local Package (linked via file: or workspace:)
    localPackage: {
      check: async () => {
        const packageJson = await readPackageJson(repository);
        const consumers = await detectConsumers(repository);

        return consumers.some(c => {
          const consumerPackageJson = readPackageJson(c);
          const dep = consumerPackageJson.dependencies[repository.name];

          return dep && (dep.startsWith('file:') || dep.startsWith('workspace:'));
        });
      },
      lifecycle: ['version', 'build', 'link', 'install']
    },

    // Type 5: Monorepo Package (part of workspace)
    monorepoPackage: {
      check: async () => {
        const root = await findWorkspaceRoot(repository);
        return root && hasWorkspaceConfig(root);
      },
      lifecycle: ['version', 'build', 'install']
    }
  };

  for (const [type, config] of Object.entries(types)) {
    if (await config.check()) {
      return type;
    }
  }

  return 'unknown';
}
```

---

## Step 2: Lifecycle Detection

**For each package repository, detect its lifecycle:**

```javascript
async function detectPackageLifecycle(repository, packageType) {
  const lifecycle = {
    // Stage 1: Source Code Changes
    sourceChanges: {
      required: true,
      triggers: ['file modifications']
    },

    // Stage 2: Version Update
    versionUpdate: await detectVersionWorkflow(repository),

    // Stage 3: Build/Package Generation
    build: await detectBuildWorkflow(repository),

    // Stage 4: Publishing
    publish: await detectPublishWorkflow(repository),

    // Stage 5: Installation
    install: await detectInstallWorkflow(repository)
  };

  return lifecycle;
}
```

### Version Workflow Detection

```javascript
async function detectVersionWorkflow(repository) {
  const packageJson = await readPackageJson(repository);

  const indicators = {
    // Semantic versioning
    hasVersion: !!packageJson.version,
    versionFormat: parseVersionFormat(packageJson.version),

    // Version management tools
    usesLerna: await checkDevDependency(repository, 'lerna'),
    usesChangesets: await checkDevDependency(repository, '@changesets/cli'),
    usesStandardVersion: await checkDevDependency(repository, 'standard-version'),
    usesReleaseIt: await checkDevDependency(repository, 'release-it'),

    // Changelog
    hasChangelog: await checkFileExists(repository, 'CHANGELOG.md'),
    changelogFormat: await detectChangelogFormat(repository),

    // Git tags
    usesGitTags: await detectGitTagUsage(repository),

    // Version files
    hasVersionFile: await checkFileExists(repository, 'VERSION'),
    hasVersionTs: await checkFileExists(repository, 'src/version.ts')
  };

  // Determine version strategy
  const strategy = determineVersionStrategy(indicators);

  return {
    required: indicators.hasVersion,
    strategy: strategy,
    autoBump: detectAutoBump(indicators),
    bumpCommand: detectBumpCommand(repository, strategy),
    validation: detectVersionValidation(repository, indicators)
  };
}
```

### Version Strategy Detection

```javascript
function determineVersionStrategy(indicators) {
  // Strategy 1: Manual version update
  if (indicators.hasVersion && !indicators.usesLerna && !indicators.usesChangesets) {
    return 'manual';
  }

  // Strategy 2: Lerna (monorepo)
  if (indicators.usesLerna) {
    return 'lerna';
  }

  // Strategy 3: Changesets (monorepo)
  if (indicators.usesChangesets) {
    return 'changesets';
  }

  // Strategy 4: Standard-version (conventional commits)
  if (indicators.usesStandardVersion) {
    return 'standard-version';
  }

  // Strategy 5: Release-it
  if (indicators.usesReleaseIt) {
    return 'release-it';
  }

  return 'manual';
}
```

### Build Workflow Detection

```javascript
async function detectBuildWorkflow(repository) {
  const packageJson = await readPackageJson(repository);

  const indicators = {
    // Build scripts
    hasBuildScript: !!packageJson.scripts?.build,
    hasCompileScript: !!packageJson.scripts?.compile,
    hasBundleScript: !!packageJson.scripts?.bundle,

    // Build tools
    usesTypescript: await checkDevDependency(repository, 'typescript'),
    usesWebpack: await checkDevDependency(repository, 'webpack'),
    usesRollup: await checkDevDependency(repository, 'rollup'),
    usesVite: await checkDevDependency(repository, 'vite'),
    usesEsbuild: await checkDevDependency(repository, 'esbuild'),
    usesBabel: await checkDevDependency(repository, '@babel/core'),

    // Build configuration
    hasTsconfig: await checkFileExists(repository, 'tsconfig.json'),
    hasWebpackConfig: await checkFileExists(repository, 'webpack.config.js'),
    hasRollupConfig: await checkFileExists(repository, 'rollup.config.js'),
    hasViteConfig: await checkFileExists(repository, 'vite.config.js'),

    // Build output
    hasDistDir: await checkDirectoryExists(repository, 'dist'),
    hasBuildDir: await checkDirectoryExists(repository, 'build'),
    hasOutDir: await checkDirectoryExists(repository, 'out')
  };

  const required = indicators.hasBuildScript ||
                   indicators.hasCompileScript ||
                   indicators.hasBundleScript ||
                   indicators.usesTypescript;

  const buildCommand = detectBuildCommand(repository, packageJson.scripts);
  const outputDir = detectBuildOutputDir(repository, indicators);

  return {
    required: required,
    command: buildCommand,
    outputDir: outputDir,
    tooling: detectBuildTooling(indicators),
    configuration: detectBuildConfiguration(repository, indicators)
  };
}
```

### Publish Workflow Detection

```javascript
async function detectPublishWorkflow(repository) {
  const packageJson = await readPackageJson(repository);

  const indicators = {
    // Publish scripts
    hasPublishScript: !!packageJson.scripts?.publish,
    hasReleaseScript: !!packageJson.scripts?.release,
    hasDeployScript: !!packageJson.scripts?.deploy,

    // Publish configuration
    isPrivate: packageJson.private === true,
    hasPublishConfig: !!packageJson.publishConfig,

    // Registry
    registry: detectRegistry(repository, packageJson),

    // Access
    access: packageJson.publishConfig?.access || 'public'
  };

  const required = indicators.hasPublishScript &&
                   !indicators.isPrivate;

  const publishCommand = detectPublishCommand(repository, packageJson.scripts);

  return {
    required: required,
    command: publishCommand,
    registry: indicators.registry,
    access: indicators.access,
    configuration: detectPublishConfiguration(repository, indicators)
  };
}
```

### Install Workflow Detection

```javascript
async function detectInstallWorkflow(repository) {
  const packageJson = await readPackageJson(repository);

  const indicators = {
    // Package manager
    usesNpm: await checkFileExists(repository, 'package-lock.json'),
    usesYarn: await checkFileExists(repository, 'yarn.lock'),
    usesBun: await checkFileExists(repository, 'bun.lockb'),
    usesPnpm: await checkFileExists(repository, 'pnpm-lock.yaml'),

    // Workspace features
    hasWorkspace: !!packageJson.workspaces,
    isWorkspacePackage: await isWorkspacePackage(repository),

    // Post-install scripts
    hasPostinstallScript: !!packageJson.scripts?.postinstall,

    // Preparation
    hasPrepareScript: !!packageJson.scripts?.prepare
  };

  const packageManager = detectPackageManager(indicators);
  const installCommand = getInstallCommand(packageManager);

  return {
    required: true, // Always required for packages
    packageManager: packageManager,
    command: installCommand,
    hasPostinstall: indicators.hasPostinstallScript,
    postinstallCommand: packageJson.scripts?.postinstall,
    hasPrepare: indicators.hasPrepareScript,
    prepareCommand: packageJson.scripts?.prepare,
    isWorkspacePackage: indicators.isWorkspacePackage
  };
}
```

---

## Step 3: Consumer Detection

**Identify which repositories consume this package:**

```javascript
async function detectPackageConsumers(packageRepository, allRepositories) {
  const consumers = [];
  const packageName = await getPackageName(packageRepository);

  for (const repo of allRepositories) {
    if (repo.name === packageRepository.name) continue;

    const packageJson = await readPackageJson(repo);
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies
    };

    // Check if package is in dependencies
    if (packageName in allDeps) {
      const dependency = allDeps[packageName];
      const integrationType = await detectIntegrationType(repo, packageRepository, dependency);

      consumers.push({
        repository: repo,
        dependency: dependency,
        integrationType: integrationType,
        currentVersion: dependency,
        usage: await detectPackageUsage(repo, packageRepository)
      });
    }
  }

  return consumers;
}
```

### Integration Type Detection

```javascript
async function detectIntegrationType(consumer, package, dependency) {
  // Type 1: Version-based dependency
  if (isVersionRange(dependency)) {
    return 'version-based';
  }

  // Type 2: File-based dependency (local linking)
  if (dependency.startsWith('file:')) {
    return 'file-based';
  }

  // Type 3: Workspace protocol
  if (dependency.startsWith('workspace:')) {
    return 'workspace-protocol';
  }

  // Type 4: Git-based dependency
  if (dependency.startsWith('git+') || dependency.startsWith('github:')) {
    return 'git-based';
  }

  return 'unknown';
}
```

### Package Usage Detection

```javascript
async function detectPackageUsage(consumer, package) {
  const sourceFiles = await findSourceFiles(consumer);
  const packageName = await getPackageName(package);

  const usage = {
    imports: [],
    requires: [],
    dynamicImports: []
  };

  for (const file of sourceFiles) {
    const content = await readFile(file);

    // Detect ES6 imports
    const es6Imports = content.matchAll(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g);
    for (const match of es6Imports) {
      if (match[1].includes(packageName) || match[1].startsWith(packageName)) {
        usage.imports.push({ file, import: match[0], module: match[1] });
      }
    }

    // Detect CommonJS requires
    const cjsRequires = content.matchAll(/require\(['"]([^'"]+)['"]\)/g);
    for (const match of cjsRequires) {
      if (match[1].includes(packageName) || match[1].startsWith(packageName)) {
        usage.requires.push({ file, require: match[0], module: match[1] });
      }
    }

    // Detect dynamic imports
    const dynamicImports = content.matchAll(/import\(['"]([^'"]+)['"]\)/g);
    for (const match of dynamicImports) {
      if (match[1].includes(packageName) || match[1].startsWith(packageName)) {
        usage.dynamicImports.push({ file, import: match[0], module: match[1] });
      }
    }
  }

  return usage;
}
```

---

## Step 4: Dependency Synchronization Rules Detection

**Detect how changes to the package must be propagated:**

```javascript
async function detectSyncRules(package, consumers) {
  const rules = {
    // Rule 1: Version update required
    versionUpdate: detectVersionUpdateRule(package, consumers),

    // Rule 2: Build required before update
    buildBeforeUpdate: detectBuildRule(package),

    // Rule 3: Install required in consumers
    installInConsumers: detectInstallRule(consumers),

    // Rule 4: Lock file update required
    lockFileUpdate: detectLockFileRule(consumers),

    // Rule 5: Workspace-specific rules
    workspaceRules: await detectWorkspaceRules(package, consumers)
  };

  return rules;
}
```

### Version Update Rule Detection

```javascript
function detectVersionUpdateRule(package, consumers) {
  // Check if all consumers use version-based dependencies
  const allVersionBased = consumers.every(c =>
    c.integrationType === 'version-based'
  );

  // Check if package has version
  const hasVersion = package.lifecycle.versionUpdate.required;

  return {
    required: allVersionBased && hasVersion,
    strategy: package.lifecycle.versionUpdate.strategy,
    bumpType: detectBumpType(package),
    autoBump: package.lifecycle.versionUpdate.autoBump
  };
}
```

### Build Rule Detection

```javascript
function detectBuildRule(package) {
  // Build is required if:
  // 1. Package has build script
  // 2. Package uses TypeScript
  // 3. Package has build output directory

  const buildWorkflow = package.lifecycle.build;

  return {
    required: buildWorkflow.required,
    command: buildWorkflow.command,
    outputDir: buildWorkflow.outputDir,
    mustSucceed: true
  };
}
```

### Install Rule Detection

```javascript
function detectInstallRule(consumers) {
  // Install is required if:
  // 1. Consumers have package managers (lock files)
  // 2. Consumers are workspace packages

  const installRequired = consumers.some(c => {
    return c.lifecycle.install.required;
  });

  const packageManagers = [...new Set(
    consumers
      .map(c => c.lifecycle.install.packageManager)
      .filter(Boolean)
  )];

  return {
    required: installRequired,
    packageManagers: packageManagers,
    commands: packageManagers.map(getInstallCommand)
  };
}
```

### Workspace Rules Detection

```javascript
async function detectWorkspaceRules(package, consumers) {
  // Check if this is a workspace package
  const isWorkspacePackage = package.lifecycle.install.isWorkspacePackage;

  if (!isWorkspacePackage) {
    return { isWorkspace: false };
  }

  // Workspace-specific rules
  const workspaceConsumers = consumers.filter(c =>
    c.integrationType === 'workspace-protocol'
  );

  return {
    isWorkspace: true,
    workspaceProtocol: true,
    syncMode: detectWorkspaceSyncMode(package),
    consumersCount: workspaceConsumers.length,
    autoSync: detectAutoSync(package)
  };
}
```

---

## Package Lifecycle Map

**After detection, build a complete lifecycle map:**

```javascript
async function buildPackageLifecycleMap(repository) {
  const packageInfo = await detectPackageRepository(repository);

  if (!packageInfo.isPackage) {
    return null;
  }

  const lifecycle = {
    repository: repository,
    packageType: packageInfo.packageType,
    confidence: packageInfo.confidence,

    // Lifecycle stages
    lifecycle: {
      sourceChanges: true,
      versionUpdate: await detectVersionWorkflow(repository),
      build: await detectBuildWorkflow(repository),
      publish: await detectPublishWorkflow(repository),
      install: await detectInstallWorkflow(repository)
    },

    // Consumer information
    consumers: await detectPackageConsumers(repository, allRepositories),

    // Synchronization rules
    syncRules: await detectSyncRules(repository, consumers)
  };

  return lifecycle;
}
```

---

## 🚨 CRITICAL: Package Detection Must Run Before Implementation

**ABSOLUTE RULE:**

```
DO NOT modify a package repository without detecting its lifecycle first.

Implementation WITHOUT lifecycle detection = BROKEN PACKAGE FLOW
```

**Package Detection Checklist:**

- [ ] Package status detected (is it a package?)
- [ ] Package type classified
- [ ] Lifecycle stages detected
- [ ] Version workflow understood
- [ ] Build workflow understood
- [ ] Publish workflow understood
- [ ] Install workflow understood
- [ ] All consumers identified
- [ ] Integration types detected
- [ ] Package usage analyzed
- [ ] Sync rules determined
- [ ] Dependency order calculated

**Only when ALL checks pass → Continue to implementation**

---

## Integration with Agent Workflow

### Where This Fits

```
1. Task Intake
2. Repository Impact Analysis
   └─> **NEW: Detect package repositories**
   └─> **NEW: Build package lifecycle maps**
3. Dependency Graph Construction
   └─> **ENHANCED: Include package relationships**
4. Execution
   └─> **NEW: Follow detected package lifecycles**
5. Validation
   └─> **NEW: Validate package synchronization**
```

---

## Examples

### Example 1: Shared Models Library (Manual Version)

```javascript
{
  repository: 'harborSharedModels',
  packageType: 'sharedLibrary',
  lifecycle: {
    sourceChanges: true,
    versionUpdate: {
      required: true,
      strategy: 'manual',
      autoBump: false,
      bumpCommand: null,
      validation: 'semantic-versioning'
    },
    build: {
      required: false,
      command: null,
      outputDir: null
    },
    publish: {
      required: false,
      command: null
    },
    install: {
      required: true,
      packageManager: 'npm',
      command: 'npm install'
    }
  },
  consumers: [
    {
      repository: 'harborUserSvc',
      integrationType: 'version-based',
      currentVersion: '^1.2.3',
      usage: { imports: [...], requires: [...] }
    }
  ],
  syncRules: {
    versionUpdate: { required: true, strategy: 'manual' },
    buildBeforeUpdate: { required: false },
    installInConsumers: { required: true, packageManagers: ['npm'] }
  }
}
```

### Example 2: Built Library (TypeScript)

```javascript
{
  repository: 'harborUIComponents',
  packageType: 'builtLibrary',
  lifecycle: {
    sourceChanges: true,
    versionUpdate: {
      required: true,
      strategy: 'manual',
      autoBump: false
    },
    build: {
      required: true,
      command: 'npm run build',
      outputDir: 'dist',
      tooling: 'typescript'
    },
    publish: {
      required: false,
      command: null
    },
    install: {
      required: true,
      packageManager: 'npm',
      command: 'npm install'
    }
  },
  consumers: [
    {
      repository: 'harborWebsite',
      integrationType: 'version-based',
      currentVersion: '^2.0.0'
    },
    {
      repository: 'harborApp',
      integrationType: 'version-based',
      currentVersion: '^2.0.0'
    }
  ],
  syncRules: {
    versionUpdate: { required: true },
    buildBeforeUpdate: { required: true, command: 'npm run build' },
    installInConsumers: { required: true }
  }
}
```

### Example 3: Monorepo Package

```javascript
{
  repository: 'harmonSharedUtils',
  packageType: 'monorepoPackage',
  lifecycle: {
    sourceChanges: true,
    versionUpdate: {
      required: true,
      strategy: 'changesets',
      autoBump: true
    },
    build: {
      required: true,
      command: 'turbo run build',
      outputDir: 'dist'
    },
    publish: {
      required: false,
      command: null
    },
    install: {
      required: true,
      packageManager: 'pnpm',
      command: 'pnpm install',
      isWorkspacePackage: true
    }
  },
  consumers: [
    {
      repository: 'harborWeb',
      integrationType: 'workspace-protocol',
      currentVersion: 'workspace:*'
    }
  ],
  syncRules: {
    versionUpdate: { required: true, strategy: 'changesets' },
    buildBeforeUpdate: { required: true },
    installInConsumers: { required: true },
    workspaceRules: {
      isWorkspace: true,
      workspaceProtocol: true,
      autoSync: true
    }
  }
}
```

---

**End of Package Lifecycle Detection**
