# Pattern Detection System

**Version:** 1.0.0
**Last Updated:** 2026-03-17
**Purpose:** Automatically detect and learn implementation patterns from any codebase

---

## 🎯 Core Philosophy

**The agent must LEARN from the codebase, not assume.**

This system detects patterns by:
1. Reading existing code
2. Analyzing structure and conventions
3. Identifying repeated patterns
4. Inferring workflows from code

---

## Pattern Detection Categories

### 1. Shared Module Pattern Detection

**Detection Algorithm:**

```javascript
function detectSharedModulePattern(repository) {
  const indicators = {
    hasExports: checkForIndexFiles(repository),
    hasNoServer: !hasServerEntry(repository),
    hasMultipleConsumers: checkDependencyCount(repository),
    exportsTypes: checkForTypeExports(repository),
    hasVersioning: checkForPackageVersion(repository)
  };

  const confidence = calculateConfidence(indicators);

  return {
    isSharedModule: confidence > 70,
    confidence,
    detectedWorkflow: inferSharedModuleWorkflow(indicators)
  };
}
```

**Detection Indicators:**

| Indicator | Check | Weight |
|-----------|-------|--------|
| Exports in index.ts | Check for barrel files | 25% |
| No server entry | No main.js/server.js | 25% |
| Multiple consumers | Other repos depend on it | 30% |
| Type definitions | Exports .d.ts or types | 10% |
| Version management | Has package.json version | 10% |

**Inferred Workflow:**

If `isSharedModule === true`:
```
Workflow detected: SHARED_MODULE_VERSIONING

Steps:
1. Changes to shared module require version update
2. Version update follows semantic versioning
3. Dependent services update dependency version
4. Install/update required across consumers
5. Verify no breaking changes

Evidence:
- Found index.ts with exports
- No server entry point
- N other services import from this repo
```

### 2. API Service Pattern Detection

**Detection Algorithm:**

```javascript
function detectApiServicePattern(repository) {
  const indicators = {
    hasExpress: hasDependency('express'),
    hasRoutes: hasDirectory('routes') || hasDirectory('controllers'),
    hasServer: hasFile('server.js') || hasFile('app.js'),
    hasApiEndpoints: hasApiRoutes(),
    hasServiceLayer: hasDirectory('services'),
    hasDataLayer: hasDirectory('models') || hasDirectory('repositories')
  };

  const confidence = calculateConfidence(indicators);

  return {
    isApiService: confidence > 70,
    confidence,
    detectedWorkflow: inferApiServiceWorkflow(indicators)
  };
}
```

**Detection Indicators:**

| Indicator | Check | Weight |
|-----------|-------|--------|
| Express/Fastify/Nest.js | Check dependencies | 25% |
| Routes/Controllers | Check directory structure | 25% |
| Server entry | Check for server.js/app.js | 20% |
| API endpoints | Parse route files | 15% |
| Service layer | Check for services/ directory | 10% |
| Data layer | Check for models/repositories | 5% |

**Inferred Workflow:**

If `isApiService === true`:
```
Workflow detected: API_SERVICE_LAYERED

Steps:
1. Routes define endpoints
2. Controllers handle requests
3. Service layer contains business logic
4. Repository/Model layer handles data
5. Changes follow: Routes → Controllers → Services → Repositories

Evidence:
- Express present in dependencies
- Found src/routes/ directory
- Layered architecture detected
```

### 3. Frontend Pattern Detection

**Detection Algorithm:**

```javascript
function detectFrontendPattern(repository) {
  const indicators = {
    isNextjs: hasDependency('next'),
    isReact: hasDependency('react'),
    hasPages: hasDirectory('pages') || hasDirectory('app'),
    hasComponents: hasDirectory('components'),
    hasApiCalls: hasApiIntegration(),
    hasStateManagement: detectStateManagement(),
    hasStyling: detectStylingApproach()
  };

  const confidence = calculateConfidence(indicators);

  return {
    isFrontend: confidence > 70,
    framework: inferFramework(indicators),
    detectedWorkflow: inferFrontendWorkflow(indicators)
  };
}
```

**Detection Indicators:**

| Indicator | Check | Weight |
|-----------|-------|--------|
| Next.js | Check dependencies | 30% |
| React | Check dependencies | 25% |
| Pages/App directory | Check structure | 20% |
| Components | Check for components/ | 15% |
| API integration | Check for API calls | 10% |

**Inferred Workflow:**

If `isFrontend === true`:
```
Workflow detected: FRONTEND_COMPONENT_BASED

Steps:
1. Changes start in components/pages
2. API calls to backend services
3. State management (detected: Redux/Context/etc.)
4. Styling follows (detected: Ant Design/Material/etc.)

Evidence:
- Next.js present
- App router detected
- Component structure found
```

### 4. Version Management Pattern Detection

**Detection Algorithm:**

```javascript
function detectVersioningPattern(workspace) {
  const indicators = {
    hasSharedModule: detectSharedModule(workspace.sharedRepo),
    hasVersionReferences: checkVersionReferences(workspace),
    hasChangelog: hasChangelogFile(workspace.sharedRepo),
    hasVersionTags: hasGitVersionTags(workspace.sharedRepo),
    followsSemver: checkSemverCompliance(workspace)
  };

  const confidence = calculateConfidence(indicators);

  return {
    usesVersioning: confidence > 70,
    versioningStrategy: inferVersioningStrategy(indicators),
    detectedWorkflow: inferVersioningWorkflow(indicators)
  };
}
```

**Detection Indicators:**

| Indicator | Check | Weight |
|-----------|-------|--------|
| Shared module present | Detect shared library | 30% |
| Version references | Check package.json versions | 25% |
| Changelog | Check for CHANGELOG.md | 20% |
| Version tags | Check git tags | 15% |
| Semver compliance | Check version format | 10% |

**Inferred Workflow:**

If `usesVersioning === true`:
```
Workflow detected: SEMANTIC_VERSIONING

Steps:
1. Shared module changes require version bump
2. Version bump type: patch/minor/major based on changes
3. Dependent services update dependency version
4. Install/update required (npm/bun install)
5. Verify compatibility

Evidence:
- harborSharedModels has package.json version
- harborUserSvc references specific version
- Version tags found in git
```

### 5. Build Pattern Detection

**Detection Algorithm:**

```javascript
function detectBuildPattern(repository) {
  const indicators = {
    hasBuildScript: hasNpmScript('build'),
    hasDockerfile: hasFile('Dockerfile'),
    hasDockerCompose: hasFile('docker-compose.yml'),
    hasCIConfig: hasCIConfiguration(),
    requiresTests: hasTestScript(),
    requiresLint: hasLintScript()
  };

  const confidence = calculateConfidence(indicators);

  return {
    hasBuildProcess: confidence > 50,
    buildSteps: inferBuildSteps(indicators),
    detectedWorkflow: inferBuildWorkflow(indicators)
  };
}
```

**Detection Indicators:**

| Indicator | Check | Weight |
|-----------|-------|--------|
| Build script | Check package.json scripts | 30% |
| Dockerfile | Check for Dockerfile | 25% |
| Docker Compose | Check for docker-compose.yml | 20% |
| CI/CD | Check for .github/.gitlab-ci.yml | 15% |
| Tests | Check for test script | 10% |

**Inferred Workflow:**

If `hasBuildProcess === true`:
```
Workflow detected: BUILD_TEST_DEPLOY

Steps:
1. Run build (npm run build / bun run build)
2. Run tests (npm test / bun test)
3. Run lint (if available)
4. Build Docker image (if Dockerfile present)
5. Deploy (if CI/CD configured)

Evidence:
- Build script found in package.json
- Dockerfile present
- GitHub Actions workflow found
```

### 6. Dependency Pattern Detection

**Detection Algorithm:**

```javascript
function detectDependencyPattern(workspace) {
  const dependencyGraph = buildDependencyGraph(workspace);

  const indicators = {
    hasSharedLibraries: detectSharedLibraries(dependencyGraph),
    hasServiceDependencies: detectServiceDependencies(dependencyGraph),
    hasCircularDependencies: detectCycles(dependencyGraph),
    hasVersionConflicts: detectVersionConflicts(dependencyGraph)
  };

  return {
    dependencyGraph,
    dependencyOrder: topologicalSort(dependencyGraph),
    detectedWorkflow: inferDependencyWorkflow(indicators)
  };
}
```

**Detection Indicators:**

| Indicator | Check | Purpose |
|-----------|-------|---------|
| Shared libraries | Find libraries used by multiple repos | Identify shared deps |
| Service dependencies | Find service-to-service dependencies | Identify call chains |
| Circular dependencies | Detect cycles in dependency graph | Prevent issues |
| Version conflicts | Find version mismatches | Identify compatibility issues |

**Inferred Workflow:**

```
Workflow detected: DEPENDENCY_ORDERED_IMPLEMENTATION

Implementation Order:
1. harborSharedModels (shared library)
2. harborUserSvc (depends on models)
3. harborWebsite (depends on User API)
4. harborApp (depends on User API)

Evidence:
- harborSharedModels has no internal dependencies
- harborUserSvc imports from harborSharedModels
- harborWebsite calls harborUserSvc APIs
```

---

## Pattern Inference Process

### Step 1: Code Analysis

For each repository, analyze:

```javascript
const analysis = {
  // Files to read
  filesToRead: [
    'package.json',
    'tsconfig.json',
    'README.md',
    '.env.example',
    'Dockerfile',
    'docker-compose.yml'
  ],

  // Directories to scan
  directoriesToScan: [
    'src/',
    'app/',
    'pages/',
    'components/',
    'routes/',
    'controllers/',
    'services/',
    'models/',
    'lib/'
  ],

  // Patterns to search
  patternsToSearch: [
    'import statements',
    'export statements',
    'API route definitions',
    'Component definitions',
    'Model definitions',
    'Function signatures'
  ]
};
```

### Step 2: Pattern Recognition

```javascript
function recognizePatterns(analysis) {
  const patterns = {
    // File organization patterns
    fileOrganization: detectFilePattern(analysis),

    // Code structure patterns
    codeStructure: detectCodePattern(analysis),

    // Import/export patterns
    moduleSystem: detectModulePattern(analysis),

    // API patterns
    apiDesign: detectApiPattern(analysis),

    // State management patterns
    stateManagement: detectStatePattern(analysis),

    // Error handling patterns
    errorHandling: detectErrorPattern(analysis)
  };

  return patterns;
}
```

### Step 3: Workflow Inference

```javascript
function inferWorkflow(patterns) {
  const workflow = {
    // How to structure new files
    fileStructure: patterns.fileOrganization,

    // How to write code
    codeStyle: patterns.codeStructure,

    // How to import/export
    moduleUsage: patterns.moduleSystem,

    // How to define APIs
    apiPattern: patterns.apiDesign,

    // How to manage state
    stateApproach: patterns.stateManagement,

    // How to handle errors
    errorApproach: patterns.errorHandling
  };

  return workflow;
}
```

---

## Example: Pattern Detection in Action

### Scenario: Harbor Shared Models Update

**Detection Phase:**

```
1. Analyze harborSharedModels repository:
   ✅ Found index.ts with exports
   ✅ No server entry point
   ✅ Multiple services import from it
   ✅ Has package.json with version
   ✅ Has CHANGELOG.md

   Detection: SHARED_MODULE with version management

2. Analyze dependent services:
   ✅ harborUserSvc package.json has:
      "harborSharedModels": "1.2.3"
   ✅ harborJobSvc package.json has:
      "harborSharedModels": "1.2.3"
   ✅ harborWebsite package.json has:
      "harborSharedModels": "1.2.3"

   Detection: Services use specific versions

3. Infer workflow:
   ✅ harborSharedModels changes → version bump required
   ✅ Dependent services → update dependency version
   ✅ All services → run npm install/bun install
```

**Inferred Workflow:**

```
Workflow: SHARED_MODULE_VERSION_UPDATE

Steps:
1. Update models in harborSharedModels
2. Determine version bump type (patch/minor/major)
3. Update package.json version
4. Update CHANGELOG.md
5. For EACH dependent service:
   a. Update harborSharedModels version in package.json
   b. Run npm install/bun install
   c. Verify imports resolve
   d. Run build to verify
6. Commit and push changes
```

---

## Pattern-Based Implementation

### When Implementing Changes:

**1. Load Detected Patterns**
```javascript
const patterns = loadPatternsForRepository(repository);
```

**2. Follow Patterns Exactly**
```javascript
function implementFeature(repository, feature) {
  const patterns = loadPatternsForRepository(repository);

  // Follow detected file organization
  const filePath = patterns.fileOrganization.resolvePath(feature.type);

  // Follow detected code style
  const code = patterns.codeStyle.generateCode(feature);

  // Follow detected import pattern
  const imports = patterns.moduleSystem.generateImports(feature.dependencies);

  // Combine
  const fullCode = combineImportsAndCode(imports, code);

  // Write file
  writeFile(filePath, fullCode);
}
```

**3. Verify Pattern Compliance**
```javascript
function verifyPatternCompliance(repository, changes) {
  const patterns = loadPatternsForRepository(repository);

  const checks = {
    followsFileStructure: patterns.fileOrganization.check(changes),
    followsCodeStyle: patterns.codeStyle.check(changes),
    followsModulePattern: patterns.moduleSystem.check(changes),
    followsApiPattern: patterns.apiPattern.check(changes)
  };

  return allChecksPass(checks);
}
```

---

## Pattern Memory & Updates

### Storing Detected Patterns

```javascript
// Store detected patterns in memory
const patternMemory = {
  repository: 'harborUserSvc',
  lastAnalyzed: '2026-03-17',
  patterns: {
    fileOrganization: 'layered-architecture',
    codeStyle: 'typescript-semicolons',
    moduleSystem: 'commonjs',
    apiPattern: 'rest-express',
    stateManagement: 'none',
    errorHandling: 'try-catch-async'
  }
};
```

### Updating Patterns

```javascript
// Update patterns if project structure changes
function updatePatternMemory(repository) {
  const currentPatterns = analyzeRepository(repository);
  const storedPatterns = loadPatternMemory(repository);

  if (patternsChanged(currentPatterns, storedPatterns)) {
    savePatternMemory(repository, currentPatterns);
    notifyUser('Repository patterns updated');
  }
}
```

---

## Adaptive Pattern Selection

### Multiple Pattern Detection

If a repository shows multiple patterns:

```javascript
function selectBestPattern(detectedPatterns) {
  // Score each pattern by confidence
  const scoredPatterns = detectedPatterns.map(pattern => ({
    pattern,
    confidence: calculateConfidence(pattern),
    prevalence: calculatePrevalence(pattern)
  }));

  // Select highest confidence, most prevalent
  return scoredPatterns.sort((a, b) =>
    b.confidence - a.confidence || b.prevalence - a.prevalence
  )[0].pattern;
}
```

---

## Pattern Detection Checklist

For each repository, verify:

- [ ] File organization pattern detected
- [ ] Code style pattern detected
- [ ] Module system pattern detected
- [ ] API design pattern detected
- [ ] State management pattern detected
- [ ] Error handling pattern detected
- [ ] Build workflow pattern detected
- [ ] Dependency pattern detected
- [ ] Version management pattern detected
- [ ] Testing pattern detected

---

**End of Pattern Detection System**
