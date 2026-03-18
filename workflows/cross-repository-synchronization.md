# Cross-Repository Synchronization Workflow

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Automatically detect and handle synchronization relationships between repositories

---

## 🎯 Core Philosophy

**When a change is made in a source-of-truth repository, the agent MUST automatically propagate required updates to all dependent repositories.**

This is NOT optional - it's a fundamental requirement for maintaining system integrity.

---

## 🚨 CRITICAL RULE: Never Treat Repositories as Isolated Systems

**ABSOLUTE PROHIBITION:**

```
❌ FORBIDDEN: Make changes in one repository without checking dependent repositories
❌ FORBIDDEN: Assume a repository is standalone
❌ FORBIDDEN: Skip synchronization validation
❌ FORBIDDEN: Leave dependent repositories in inconsistent state
```

**MANDATORY REQUIREMENT:**

```
✅ REQUIRED: Always analyze repository relationships before implementation
✅ REQUIRED: Always identify synchronization dependencies
✅ REQUIRED: Always update dependent repositories when required
✅ REQUIRED: Always validate synchronization before completing task
```

---

## Synchronization Pattern Detection

### Step 1: Detect Source-of-Truth Repositories

During repository analysis, identify repositories that act as sources of truth:

```javascript
async function detectSourceOfTruthRepositories(repositories) {
  const sources = [];

  for (const repo of repositories) {
    const indicators = {
      // Pattern 1: Shared library/export-only module
      isSharedLibrary: await detectSharedLibrary(repo),

      // Pattern 2: Model/schema definition repository
      isModelRepository: await detectModelRepository(repo),

      // Pattern 3: Type definition repository
      isTypeRepository: await detectTypeRepository(repo),

      // Pattern 4: Configuration repository
      isConfigRepository: await detectConfigRepository(repo),

      // Pattern 5: Translation/localization repository
      isTranslationRepository: await detectTranslationRepository(repo)
    };

    if (Object.values(indicators).some(Boolean)) {
      sources.push({
        repository: repo,
        type: Object.entries(indicators)
          .filter(([_, is]) => is)
          .map(([type]) => type),
        syncRules: await inferSyncRules(repo)
      });
    }
  }

  return sources;
}
```

### Detection Patterns

#### Pattern 1: Shared Library Detection

**Indicators:**
- No server entry point (no `src/server.ts`, `index.js`, etc.)
- Primary export file (e.g., `src/index.ts`, `index.ts`)
- Multiple other repositories import from it
- `package.json` has no `main` or `start` script
- Barrel export pattern (exports from multiple files)

**Example:**
```typescript
// harborSharedModels/src/index.ts
export * from './models';
export * from './types';
export * from './utils';
```

#### Pattern 2: Model/Schema Repository Detection

**Indicators:**
- Contains `models/`, `schemas/`, `entities/` directories
- Type definitions for data structures
- Used by multiple services
- Version-controlled (semantic versioning)

**Example:**
```
harborSharedModels/
├── src/
│   ├── models/
│   │   ├── User.ts
│   │   ├── Job.ts
│   │   └── Notification.ts
│   └── index.ts
└── package.json (versioned)
```

#### Pattern 3: Configuration Repository Detection

**Indicators:**
- Contains configuration files
- Shared across services
- No executable code
- Imported by multiple repositories

**Example:**
```
harborConfig/
├── configs/
│   ├── database.config.ts
│   ├── cache.config.ts
│   └── api.config.ts
└── index.ts
```

#### Pattern 4: Translation Repository Detection

**Indicators:**
- Contains `locales/`, `translations/`, `i18n/` directories
- JSON/YAML files with translations
- Language-specific files
- Used by frontend and mobile apps

**Example:**
```
harborTranslations/
├── locales/
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── index.ts
```

---

### Step 2: Detect Dependent/Consumer Repositories

For each source-of-truth repository, identify all consumers:

```javascript
async function detectDependentRepositories(sources, allRepositories) {
  const dependencies = [];

  for (const source of sources) {
    const consumers = [];

    for (const repo of allRepositories) {
      if (repo.name === source.repository.name) continue;

      // Check if repo imports from source
      const importsFromSource = await checkImportRelationship(repo, source);

      if (importsFromSource) {
        consumers.push({
          repository: repo,
          integrationPattern: await detectIntegrationPattern(repo, source),
          syncRequirements: await determineSyncRequirements(repo, source)
        });
      }
    }

    if (consumers.length > 0) {
      dependencies.push({
        source: source,
        consumers: consumers
      });
    }
  }

  return dependencies;
}
```

### Consumer Detection Methods

#### Method 1: Import Analysis

```javascript
async function checkImportRelationship(consumer, source) {
  const packageJson = await readPackageJson(consumer);

  // Check if source is in dependencies
  const sourceDependencyName = Object.keys(packageJson.dependencies || {})
    .find(dep => dep.toLowerCase().includes(source.name.toLowerCase()));

  if (!sourceDependencyName) return false;

  // Check if actually imported in code
  const sourceFiles = await findSourceFiles(consumer);
  const imports = await extractImports(sourceFiles);

  return imports.some(imp =>
    imp.includes(sourceDependencyName) ||
    imp.includes(source.name)
  );
}
```

#### Method 2: Integration Pattern Detection

```javascript
async function detectIntegrationPattern(consumer, source) {
  const patterns = {
    // Pattern 1: Direct import
    directImport: await detectDirectImport(consumer, source),

    // Pattern 2: API consumption (for model repositories)
    apiConsumption: await detectApiConsumption(consumer, source),

    // Pattern 3: Code generation
    codeGeneration: await detectCodeGeneration(consumer, source),

    // Pattern 4: File synchronization
    fileSync: await detectFileSync(consumer, source)
  };

  return Object.entries(patterns)
    .filter(([_, is]) => is)
    .map(([pattern]) => pattern);
}
```

---

## Synchronization Workflow

### Phase 1: Change Detection

When implementing a task, the agent MUST:

```javascript
async function analyzeChangeImpact(task, repositories, syncGraph) {
  const analysis = {
    affectedSources: [],
    affectedConsumers: [],
    syncActions: []
  };

  // Step 1: Identify which source repositories are affected
  for (const repo of repositories) {
    if (isSourceOfTruth(repo)) {
      const affected = await checkIfTaskAffectsSource(task, repo);
      if (affected) {
        analysis.affectedSources.push({
          repository: repo,
          changes: determineRequiredChanges(task, repo)
        });
      }
    }
  }

  // Step 2: Identify all dependent repositories
  for (const source of analysis.affectedSources) {
    const dependents = getDependents(source.repository, syncGraph);

    for (const dependent of dependents) {
      const affected = await checkIfDependentNeedsUpdate(task, source, dependent);
      if (affected) {
        analysis.affectedConsumers.push({
          repository: dependent,
          source: source.repository,
          changes: determineRequiredChanges(task, dependent)
        });
      }
    }
  }

  // Step 3: Build sync action plan
  analysis.syncActions = buildSyncActionPlan(analysis);

  return analysis;
}
```

### Phase 2: Implementation Order

**CRITICAL: Implement in dependency order**

```javascript
function getImplementationOrder(syncGraph) {
  // Topological sort based on dependencies
  const order = [];
  const visited = new Set();

  function visit(repo) {
    if (visited.has(repo)) return;
    visited.add(repo);

    // Visit dependencies first
    const dependencies = getDependencies(repo, syncGraph);
    for (const dep of dependencies) {
      visit(dep);
    }

    order.push(repo);
  }

  for (const repo of syncGraph.repositories) {
    visit(repo);
  }

  return order;
}
```

**Example Implementation Order:**

```
Task: Add "availabilityStatus" field to User model

Implementation Order:
1. harborSharedModels (source)
   - Add field to User model
   - Bump version

2. harborUserSvc (consumer)
   - Update dependency version
   - Run install
   - Update API to handle new field

3. harborJobSvc (consumer)
   - Update dependency version
   - Run install
   - Update job logic to use new field

4. harborWebsite (consumer)
   - Update dependency version
   - Run install
   - Add UI for new field

5. harborApp (consumer)
   - Update dependency version
   - Run install
   - Add mobile UI for new field
```

### Phase 3: Synchronization Execution

For each consumer repository, the agent MUST:

```javascript
async function synchronizeConsumer(consumer, source, changes) {
  const integrationPattern = consumer.integrationPattern;
  const syncActions = [];

  switch (integrationPattern) {
    case 'directImport':
      syncActions.push(...await syncDirectImport(consumer, source, changes));
      break;

    case 'apiConsumption':
      syncActions.push(...await syncApiConsumption(consumer, source, changes));
      break;

    case 'codeGeneration':
      syncActions.push(...await syncCodeGeneration(consumer, source, changes));
      break;

    case 'fileSync':
      syncActions.push(...await syncFileSync(consumer, source, changes));
      break;
  }

  return syncActions;
}
```

#### Sync Pattern 1: Direct Import

**When:** Consumer imports directly from source

**Steps:**
```javascript
async function syncDirectImport(consumer, source, changes) {
  const actions = [];

  // Step 1: Update dependency version
  const newVersion = await getSourceVersion(source);
  await updateDependencyVersion(consumer, source, newVersion);
  actions.push({
    type: 'dependency-update',
    description: `Update ${source.name} to version ${newVersion}`
  });

  // Step 2: Run install
  await runInstall(consumer);
  actions.push({
    type: 'install',
    description: `Run ${getPackageManager(consumer)} install`
  });

  // Step 3: Update imports (if needed)
  if (changes.importChanges) {
    await updateImports(consumer, changes.importChanges);
    actions.push({
      type: 'import-update',
      description: 'Update imports to use new exports'
    });
  }

  // Step 4: Add implementations (if needed)
  if (changes.newImplementations) {
    await addImplementations(consumer, changes.newImplementations);
    actions.push({
      type: 'implementation',
      description: 'Add implementations for new exports'
    });
  }

  return actions;
}
```

**Example:**
```
Source: harborSharedModels adds User.availabilityStatus

Consumer: harborUserSvc

Actions:
1. Update package.json: "harbor-shared-models": "1.2.5"
2. Run: npm install
3. Update User service to use new field
4. Add API endpoint for availability status
```

#### Sync Pattern 2: API Consumption

**When:** Frontend/mobile consumes backend API that uses source models

**Steps:**
```javascript
async function syncApiConsumption(consumer, source, changes) {
  const actions = [];

  // Step 1: Identify which API endpoints are affected
  const affectedApis = await findAffectedApis(consumer, source, changes);

  // Step 2: Update API client (if needed)
  if (changes.apiChanges) {
    await updateApiClient(consumer, changes.apiChanges);
    actions.push({
      type: 'api-client-update',
      description: 'Update API client for new endpoints/fields'
    });
  }

  // Step 3: Update UI components
  if (changes.uiChanges) {
    await updateUIComponents(consumer, changes.uiChanges);
    actions.push({
      type: 'ui-update',
      description: 'Update UI components to display new data'
    });
  }

  // Step 4: Update state management (if needed)
  if (changes.stateChanges) {
    await updateStateManagement(consumer, changes.stateChanges);
    actions.push({
      type: 'state-update',
      description: 'Update state management for new data'
    });
  }

  return actions;
}
```

**Example:**
```
Source: harborSharedModels adds User.availabilityStatus
Backend: harborUserSvc adds GET /user/:id/availability API

Consumer: harborWebsite

Actions:
1. Update API client to call new endpoint
2. Update UserProfile component to display availability
3. Update Redux slice to store availability status
```

#### Sync Pattern 3: Code Generation

**When:** Consumer generates code from source (e.g., GraphQL schemas, OpenAPI specs)

**Steps:**
```javascript
async function syncCodeGeneration(consumer, source, changes) {
  const actions = [];

  // Step 1: Regenerate code
  await regenerateCode(consumer, source);
  actions.push({
    type: 'regeneration',
    description: 'Regenerate code from source'
  });

  // Step 2: Update generators (if schema changed)
  if (changes.schemaChanges) {
    await updateGenerators(consumer, changes.schemaChanges);
    actions.push({
      type: 'generator-update',
      description: 'Update code generators'
    });
  }

  // Step 3: Fix breaking changes
  if (changes.breakingChanges) {
    await fixBreakingChanges(consumer, changes.breakingChanges);
    actions.push({
      type: 'breaking-change-fix',
      description: 'Fix breaking changes in generated code'
    });
  }

  return actions;
}
```

#### Sync Pattern 4: File Synchronization

**When:** Consumer mirrors/copies files from source (e.g., translations, configs)

**Steps:**
```javascript
async function syncFileSync(consumer, source, changes) {
  const actions = [];

  // Step 1: Sync changed files
  for (const changedFile of changes.changedFiles) {
    await syncFile(consumer, source, changedFile);
    actions.push({
      type: 'file-sync',
      description: `Sync ${changedFile} from source`
    });
  }

  // Step 2: Update import paths (if needed)
  if (changes.importPathChanges) {
    await updateImportPaths(consumer, changes.importPathChanges);
    actions.push({
      type: 'import-path-update',
      description: 'Update import paths for synced files'
    });
  }

  return actions;
}
```

---

## Validation Phase (MANDATORY)

**CRITICAL: Before completing ANY task, the agent MUST validate synchronization.**

```javascript
async function validateSynchronization(syncGraph, changes) {
  const validationResults = [];
  let hasErrors = false;

  // Step 1: Validate all sources updated
  for (const source of changes.affectedSources) {
    const result = await validateSourceUpdate(source);
    validationResults.push(result);

    if (!result.valid) {
      hasErrors = true;
    }
  }

  // Step 2: Validate all consumers updated
  for (const consumer of changes.affectedConsumers) {
    const result = await validateConsumerUpdate(consumer);
    validationResults.push(result);

    if (!result.valid) {
      hasErrors = true;
    }
  }

  // Step 3: Validate version alignment
  const versionValidation = await validateVersionAlignment(changes);
  validationResults.push(versionValidation);

  if (!versionValidation.valid) {
    hasErrors = true;
  }

  // Step 4: Validate import consistency
  const importValidation = await validateImportConsistency(changes);
  validationResults.push(importValidation);

  if (!importValidation.valid) {
    hasErrors = true;
  }

  // Step 5: Validate no breaking changes
  const breakingChangeValidation = await validateNoBreakingChanges(changes);
  validationResults.push(breakingChangeValidation);

  if (!breakingChangeValidation.valid) {
    hasErrors = true;
  }

  return {
    valid: !hasErrors,
    results: validationResults
  };
}
```

### Validation Checklist

**Before task completion, verify ALL of these:**

- [ ] **Source repository updated**
  - [ ] New structures added
  - [ ] Existing structures modified
  - [ ] Version bumped (if versioned)
  - [ ] Exports updated
  - [ ] Build passes

- [ ] **All consumer repositories identified**
  - [ ] Direct import consumers found
  - [ ] API consumers found
  - [ ] Code generation consumers found
  - [ ] File sync consumers found

- [ ] **All consumers updated**
  - [ ] Dependency versions updated
  - [ ] Install commands run
  - [ ] Imports updated
  - [ ] Implementations added
  - [ ] API clients updated
  - [ ] UI components updated
  - [ ] State management updated

- [ ] **Version alignment verified**
  - [ ] All consumers use correct source version
  - [ ] No file path references (e.g., `file:../`)
  - [ ] Version numbers consistent

- [ ] **Import consistency verified**
  - [ ] All imports resolve correctly
  - [ ] No missing imports
  - [ ] No unused imports
  - [ ] Export/import structure consistent

- [ ] **No breaking changes introduced**
  - [ ] Backward compatibility maintained (if required)
  - [ ] Breaking changes documented (if intentional)
  - [ ] All consumers handle breaking changes

- [ ] **Build passes in all repositories**
  - [ ] Source repository builds
  - [ ] All consumer repositories build
  - [ ] No build errors
  - [ ] No critical warnings

---

## Error Recovery

### If Validation Fails

**DO NOT proceed with PR creation. Fix the issues.**

```javascript
async function fixValidationFailures(validationResults) {
  const fixes = [];

  for (const result of validationResults) {
    if (!result.valid) {
      for (const error of result.errors) {
        const fix = await determineFix(error);

        switch (fix.type) {
          case 'missing-consumer-update':
            await updateConsumer(fix.consumer, fix.changes);
            break;

          case 'version-mismatch':
            await alignVersions(fix.repositories);
            break;

          case 'import-error':
            await fixImports(fix.repository, fix.imports);
            break;

          case 'breaking-change':
            await handleBreakingChange(fix.repository, fix.change);
            break;
        }

        fixes.push(fix);
      }
    }
  }

  // Re-validate after fixes
  return await validateSynchronization();
}
```

---

## 🚨 CRITICAL: Integration with Agent Workflow

### Where This Fits in the Workflow

```
1. Task Intake
2. Planning
3. Repository Impact Analysis
   └─> **NEW: Build sync graph**
   └─> **NEW: Identify sync dependencies**
4. Execution
   └─> **NEW: Implement in dependency order**
   └─> **NEW: Sync consumers automatically**
5. Pattern Consistency Verification
6. Validation & Auto-Fix
   └─> **NEW: Validate synchronization**
   └─> **NEW: Fix sync issues**
7. Testing
8. PR Creation
9. Ticket Closure
```

### Mandatory Integration Points

**Point 1: After Repository Impact Analysis**

```markdown
## Repository Impact Analysis

### Detected Synchronization Relationships

**Source:** harborSharedModels
- Type: Shared Library
- Changes: Adding User.availabilityStatus field

**Consumers:**
1. harborUserSvc (direct import)
   - Requires: Dependency update, install, API implementation
   - Pattern: Direct Import + API Exposure

2. harborJobSvc (direct import)
   - Requires: Dependency update, install, logic update
   - Pattern: Direct Import

3. harborWebsite (API consumption)
   - Requires: API client update, UI update
   - Pattern: API Consumption

4. harborApp (API consumption)
   - Requires: API client update, mobile UI update
   - Pattern: API Consumption

**Implementation Order:** harborSharedModels → harborUserSvc → harborJobSvc → harborWebsite → harborApp
```

**Point 2: During Execution**

```markdown
## Execution: harborSharedModels

✅ Added User.availabilityStatus field
✅ Updated exports in models/index.ts
✅ Bumped version to 1.2.5

**Next: Synchronizing consumers...**
```

**Point 3: Before Validation**

```markdown
## Synchronization Validation

Validating 4 consumers...

✅ harborUserSvc: Version 1.2.5, imports updated
✅ harborJobSvc: Version 1.2.5, logic updated
✅ harborWebsite: API client updated, UI added
✅ harborApp: API client updated, mobile UI added

**All consumers synchronized successfully**
```

---

## 🚨 ABSOLUTE RULES

1. **NEVER assume a repository is standalone**
   - Always check for synchronization relationships
   - Always identify source-of-truth repositories
   - Always identify consumer dependencies

2. **NEVER skip synchronization**
   - If a source changes, consumers MUST be updated
   - If a consumer is missed, the task is incomplete
   - Synchronization is NOT optional

3. **NEVER proceed without validation**
   - Validate ALL consumers are updated
   - Validate version alignment
   - Validate import consistency
   - Fix any issues before proceeding

4. **NEVER hardcode repository names**
   - Detect relationships dynamically
   - Adapt to any project structure
   - Work with any repository naming convention

5. **ALWAYS follow existing patterns**
   - Detect integration patterns from code
   - Follow the pattern used in each repository
   - Don't introduce new patterns unless necessary

---

## Examples

### Example 1: Add User Availability Feature

**Task:** Add user availability status feature

**Analysis:**

```
Source Repository: harborSharedModels
- Type: Shared Library (models)
- Changes: Add User.availabilityStatus field

Consumers:
1. harborUserSvc
   - Pattern: Direct Import + API
   - Actions: Update version, install, add API endpoint

2. harborJobSvc
   - Pattern: Direct Import
   - Actions: Update version, install, use new field

3. harborWebsite
   - Pattern: API Consumption
   - Actions: Update API client, add UI component

4. harborApp
   - Pattern: API Consumption
   - Actions: Update API client, add mobile UI
```

**Execution:**

```
1. harborSharedModels
   ✅ Add field to User model
   ✅ Export in models/index.ts
   ✅ Bump version to 1.2.5

2. harborUserSvc
   ✅ Update dependency: "harbor-shared-models": "1.2.5"
   ✅ Run npm install
   ✅ Add availability API endpoint
   ✅ Update user service

3. harborJobSvc
   ✅ Update dependency: "harbor-shared-models": "1.2.5"
   ✅ Run npm install
   ✅ Update job logic to check availability

4. harborWebsite
   ✅ Update API client for new endpoint
   ✅ Add availability status to profile page
   ✅ Update Redux slice

5. harborApp
   ✅ Update API client for new endpoint
   ✅ Add availability status to profile screen
```

**Validation:**

```
✅ All repositories use version 1.2.5
✅ All imports resolve correctly
✅ All builds pass
✅ No breaking changes
```

### Example 2: Add Translation Key

**Task:** Add new translation key for "availability_status"

**Analysis:**

```
Source Repository: harborTranslations
- Type: Translation Repository
- Changes: Add "availability_status" key to all locale files

Consumers:
1. harborWebsite
   - Pattern: File Sync + Import
   - Actions: Sync locale files, update usage

2. harborApp
   - Pattern: File Sync + Import
   - Actions: Sync locale files, update usage
```

**Execution:**

```
1. harborTranslations
   ✅ Add "availability_status": "Availability Status" to en.json
   ✅ Add "availability_status": "Estado de Disponibilidad" to es.json
   ✅ Bump version

2. harborWebsite
   ✅ Sync locale files from harborTranslations
   ✅ Update component to use t('availability_status')

3. harborApp
   ✅ Sync locale files from harborTranslations
   ✅ Update screen to use t('availability_status')
```

---

**End of Cross-Repository Synchronization Workflow**
