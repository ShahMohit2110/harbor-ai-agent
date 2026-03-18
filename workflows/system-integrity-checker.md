# System Integrity Checker

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Verify complete implementation across all repositories and ensure system consistency

---

## 🎯 Core Philosophy

**A feature is only complete when it's fully integrated across the system.**

The agent must:
- Verify ALL impacted repositories were updated
- Ensure project conventions were respected
- Verify dependency updates were applied correctly
- Ensure shared modules remain consistent
- Verify no integration step was skipped
- Run full system consistency checks

---

## Integrity Check Phases

### Phase 1: Repository Coverage Check

### Verify All Affected Repositories Were Updated

```javascript
function verifyRepositoryCoverage(impactAnalysis, actualChanges) {
  const coverage = {
    expected: impactAnalysis.implementationOrder,
    actual: Object.keys(actualChanges),
    missing: [],
    unexpected: [],
    complete: true
  };

  // Check for missing repositories
  for (const expectedRepo of coverage.expected) {
    if (!coverage.actual.includes(expectedRepo)) {
      coverage.missing.push(expectedRepo);
      coverage.complete = false;
    }
  }

  // Check for unexpected repositories
  for (const actualRepo of coverage.actual) {
    if (!coverage.expected.includes(actualRepo)) {
      coverage.unexpected.push(actualRepo);
    }
  }

  return coverage;
}
```

---

### Phase 2: Cross-Repository Consistency Check

### Verify Consistency Across Repositories

```javascript
function verifyCrossRepositoryConsistency(repositories, changes) {
  const consistency = {
    sharedModels: verifySharedModelConsistency(repositories, changes),
    apiContracts: verifyApiContractConsistency(repositories, changes),
    dependencies: verifyDependencyConsistency(repositories, changes),
    translations: verifyTranslationConsistency(repositories, changes),
    configurations: verifyConfigurationConsistency(repositories, changes)
  };

  return {
    consistent: Object.values(consistency).every(check => check.consistent),
    checks: consistency
  };
}

function verifySharedModelConsistency(repositories, changes) {
  const issues = [];

  // Find all repositories that use shared models
  const sharedModelRepo = repositories.find(r => r.type === 'Shared Library' || r.name.includes('SharedModels'));
  if (!sharedModelRepo) {
    return { consistent: true, message: 'No shared models repository found' };
  }

  // Check if shared models were updated
  const sharedModelChanges = changes[sharedModelRepo.name];
  if (!sharedModelChanges) {
    return { consistent: true, message: 'No changes to shared models' };
  }

  // Verify version was updated
  if (sharedModelChanges.includes('model') && !sharedModelChanges.includes('version')) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Shared models were changed but version was not updated',
      affected: 'All dependent services'
    });
  }

  // Verify all dependent services updated their dependency version
  const dependents = repositories.filter(r =>
    r.dependencies.local.some(dep => dep.repository === sharedModelRepo.name)
  );

  for (const dependent of dependents) {
    const dependentChanges = changes[dependent.name];
    if (!dependentChanges) {
      issues.push({
        severity: 'CRITICAL',
        message: `Dependent service ${dependent.name} was not updated`,
        action: 'Update dependency version and run install'
      });
      continue;
    }

    if (!dependentChanges.includes('dependency-update')) {
      issues.push({
        severity: 'CRITICAL',
        message: `${dependent.name} did not update dependency version`,
        action: 'Update harborSharedModels version in package.json'
      });
    }

    if (!dependentChanges.includes('install')) {
      issues.push({
        severity: 'HIGH',
        message: `${dependent.name} did not run install after dependency update`,
        action: 'Run npm install / bun install'
      });
    }
  }

  return {
    consistent: issues.length === 0,
    issues
  };
}

function verifyApiContractConsistency(repositories, changes) {
  const issues = [];

  // Find all backend services that expose APIs
  const backendServices = repositories.filter(r => r.type === 'Backend Service');

  for (const service of backendServices) {
    const serviceChanges = changes[service.name];
    if (!serviceChanges) continue;

    // Check if APIs were modified
    if (serviceChanges.includes('api')) {
      // Find all frontend clients that consume this service
      const clients = repositories.filter(r =>
        r.type === 'Frontend' || r.type === 'Mobile'
      );

      for (const client of clients) {
        const clientChanges = changes[client.name];
        if (!clientChanges) {
          issues.push({
            severity: 'HIGH',
            message: `${client.name} was not updated after API changes in ${service.name}`,
            action: 'Update API client and components'
          });
          continue;
        }

        if (!clientChanges.includes('api-client') && !clientChanges.includes('ui')) {
          issues.push({
            severity: 'MEDIUM',
            message: `${client.name} may not have updated API integration`,
            action: 'Verify API calls match new endpoints'
          });
        }
      }
    }
  }

  return {
    consistent: issues.length === 0,
    issues
  };
}

function verifyDependencyConsistency(repositories, changes) {
  const issues = [];

  for (const repo of repositories) {
    const repoChanges = changes[repo.name];
    if (!repoChanges) continue;

    // Check if dependencies were changed
    if (repoChanges.includes('dependency-change')) {
      // Verify lock file was updated
      const lockFile = getLockFile(repo);
      if (lockFile && !repoChanges.includes('lock-file-update')) {
        issues.push({
          severity: 'MEDIUM',
          message: `${repo.name} changed dependencies but lock file may not be updated`,
          action: 'Run npm install / bun install to update lock file'
        });
      }

      // Verify install was run
      if (!repoChanges.includes('install')) {
        issues.push({
          severity: 'HIGH',
          message: `${repo.name} changed dependencies but install was not run`,
          action: 'Run npm install / bun install'
        });
      }
    }
  }

  return {
    consistent: issues.length === 0,
    issues
  };
}

function verifyTranslationConsistency(repositories, changes) {
  const issues = [];

  // Find repositories with translations
  const reposWithTranslations = repositories.filter(r => hasTranslations(r));

  // Check if any changes require translation updates
  const requiresTranslation = Object.values(changes).some(repoChanges =>
    repoChanges.some(change =>
      change.includes('ui') || change.includes('new-feature')
    )
  );

  if (requiresTranslation) {
    for (const repo of reposWithTranslations) {
      const repoChanges = changes[repo.name];
      if (!repoChanges || !repoChanges.includes('translation')) {
        issues.push({
          severity: 'MEDIUM',
          message: `${repo.name} may require translation updates`,
          action: 'Add new translation keys'
        });
      }
    }
  }

  return {
    consistent: issues.length === 0,
    issues
  };
}

function verifyConfigurationConsistency(repositories, changes) {
  const issues = [];

  // Check for environment variable changes
  for (const repo of repositories) {
    const repoChanges = changes[repo.name];
    if (!repoChanges) continue;

    if (repoChanges.includes('config') || repoChanges.includes('env')) {
      // Verify .env.example was updated
      if (!repoChanges.includes('env-example-update')) {
        issues.push({
          severity: 'MEDIUM',
          message: `${repo.name} changed config but .env.example may not be updated`,
          action: 'Update .env.example with new variables'
        });
      }

      // Check if other repos need the same config
      const similarRepos = repositories.filter(r =>
        r.type === repo.type && r.name !== repo.name
      );

      for (const similarRepo of similarRepos) {
        const similarChanges = changes[similarRepo.name];
        if (!similarChanges || !similarChanges.includes('config')) {
          issues.push({
            severity: 'LOW',
            message: `${similarRepo.name} may need similar configuration changes`,
            action: 'Verify configuration consistency'
          });
        }
      }
    }
  }

  return {
    consistent: issues.length === 0,
    issues
  };
}
```

---

### Phase 3: Project Convention Verification

### Verify Project Conventions Were Followed

```javascript
function verifyProjectConventions(repository, changes) {
  const conventions = detectProjectConventions(repository);

  const verification = {
    fileStructure: verifyFileStructureConvention(repository, changes, conventions),
    codeStyle: verifyCodeStyleConvention(repository, changes, conventions),
    naming: verifyNamingConvention(repository, changes, conventions),
    imports: verifyImportConvention(repository, changes, conventions),
    errorHandling: verifyErrorHandlingConvention(repository, changes, conventions),
    testing: verifyTestingConvention(repository, changes, conventions)
  };

  return {
    conventionsFollowed: Object.values(verification).every(v => v.followed),
    verification
  };
}

function detectProjectConventions(repository) {
  return {
    // File organization
    fileStructure: detectFileStructureConvention(repository),

    // Code style
    codeStyle: detectCodeStyleConvention(repository),

    // Naming conventions
    naming: detectNamingConvention(repository),

    // Import patterns
    imports: detectImportConvention(repository),

    // Error handling
    errorHandling: detectErrorHandlingConvention(repository),

    // Testing patterns
    testing: detectTestingConvention(repository)
  };
}

function verifyFileStructureConvention(repository, changes, conventions) {
  const issues = [];

  // Get existing file structure
  const existingStructure = scanDirectoryStructure(repository);

  // Check if new files follow the structure
  for (const change of changes) {
    if (change.type === 'new-file') {
      const expectedLocation = inferFileLocation(change.fileType, conventions.fileStructure);
      const actualLocation = change.filePath;

      if (!actualLocation.startsWith(expectedLocation)) {
        issues.push({
          severity: 'MEDIUM',
          message: `File ${change.filePath} should be in ${expectedLocation}`,
          convention: 'File structure'
        });
      }
    }
  }

  return {
    followed: issues.length === 0,
    issues
  };
}

function verifyCodeStyleConvention(repository, changes, conventions) {
  const issues = [];

  // Detect code style from existing files
  const existingStyle = detectCodeStyleFromExisting(repository);

  // Check new files for style consistency
  for (const change of changes) {
    if (change.type === 'new-file') {
      const fileContent = readFile(change.filePath);
      const fileStyle = detectCodeStyle(fileContent);

      // Compare with existing style
      if (!stylesMatch(existingStyle, fileStyle)) {
        issues.push({
          severity: 'LOW',
          message: `File ${change.filePath} code style doesn't match project convention`,
          differences: getStyleDifferences(existingStyle, fileStyle)
        });
      }
    }
  }

  return {
    followed: issues.length === 0,
    issues
  };
}
```

---

### Phase 4: Build and Test Verification

### Verify All Repositories Build Successfully

```javascript
async function verifyBuilds(repositories, changes) {
  const buildResults = [];

  for (const repo of repositories) {
    const repoChanges = changes[repo.name];
    if (!repoChanges) continue;

    const buildResult = await verifyBuild(repo);
    buildResults.push({
      repository: repo.name,
      ...buildResult
    });
  }

  const allBuildsSuccessful = buildResults.every(r => r.success);

  return {
    allBuildsSuccessful,
    buildResults
  };
}

async function verifyBuild(repository) {
  const buildRules = detectBuildRules(repository);

  if (!buildRules.hasBuildProcess) {
    return {
      success: true,
      message: 'No build process defined'
    };
  }

  try {
    // Run build
    const result = await runBuildCommand(repository, buildRules.command);

    return {
      success: result.success,
      message: result.success ? 'Build successful' : result.error,
      output: result.output
    };
  } catch (error) {
    return {
      success: false,
      message: `Build failed: ${error.message}`,
      error
    };
  }
}
```

### Verify All Tests Pass

```javascript
async function verifyTests(repositories, changes) {
  const testResults = [];

  for (const repo of repositories) {
    const repoChanges = changes[repo.name];
    if (!repoChanges) continue;

    const testResult = await verifyTest(repo);
    testResults.push({
      repository: repo.name,
      ...testResult
    });
  }

  const allTestsPass = testResults.every(r => r.success);

  return {
    allTestsPass,
    testResults
  };
}

async function verifyTest(repository) {
  const testRules = detectTestingRules(repository);

  if (!testRules.hasTests) {
    return {
      success: true,
      message: 'No tests defined'
    };
  }

  try {
    // Run tests
    const result = await runTestCommand(repository, testRules.command);

    return {
      success: result.success,
      message: result.success ? 'Tests passed' : result.error,
      output: result.output
    };
  } catch (error) {
    return {
      success: false,
      message: `Tests failed: ${error.message}`,
      error
    };
  }
}
```

---

### Phase 5: Dependency Graph Verification

### Verify Dependency Graph is Valid

```javascript
function verifyDependencyGraph(dependencyGraph, changes) {
  const verification = {
    // Check for circular dependencies
    circularDependencies: detectCircularDependencies(dependencyGraph),

    // Check for missing dependencies
    missingDependencies: detectMissingDependencies(dependencyGraph, changes),

    // Check for version conflicts
    versionConflicts: detectVersionConflicts(dependencyGraph, changes),

    // Check for orphaned repositories
    orphanedRepositories: detectOrphanedRepositories(dependencyGraph)
  };

  return {
    valid: Object.values(verification).every(v => v.length === 0),
    verification
  };
}

function detectMissingDependencies(dependencyGraph, changes) {
  const missing = [];

  for (const [repoName, repoChanges] of Object.entries(changes)) {
    if (!repoChanges.includes('dependency-change')) continue;

    const repo = dependencyGraph.nodes.find(n => n.id === repoName);
    if (!repo) continue;

    // Check if all declared dependencies are installed
    for (const dep of repo.dependencies.local) {
      const depInstalled = checkDependencyInstalled(repo, dep);
      if (!depInstalled) {
        missing.push({
          repository: repoName,
          dependency: dep.name,
          message: 'Dependency is declared but not installed',
          action: 'Run npm install / bun install'
        });
      }
    }
  }

  return missing;
}

function detectVersionConflicts(dependencyGraph, changes) {
  const conflicts = [];

  // Check for version mismatches
  for (const edge of dependencyGraph.edges) {
    const fromRepo = dependencyGraph.nodes.find(n => n.id === edge.from);
    const toRepo = dependencyGraph.nodes.find(n => n.id === edge.to);

    const declaredVersion = fromRepo.dependencies.local.find(d => d.repository === toRepo.name)?.version;
    const actualVersion = toRepo.packageJson.version;

    if (declaredVersion && actualVersion && declaredVersion !== actualVersion) {
      conflicts.push({
        repository: fromRepo.name,
        dependency: toRepo.name,
        declared: declaredVersion,
        actual: actualVersion,
        message: 'Version mismatch between declared and actual',
        action: `Update ${toRepo.name} dependency in package.json`
      });
    }
  }

  return conflicts;
}
```

---

### Phase 6: Integration Verification

### Verify End-to-End Integration

```javascript
async function verifyEndToEndIntegration(repositories, changes) {
  const integration = {
    apiIntegration: await verifyApiIntegration(repositories, changes),
    dataFlow: await verifyDataFlow(repositories, changes),
    userJourneys: await verifyUserJourneys(repositories, changes)
  };

  return {
    integrated: Object.values(integration).every(i => i.success),
    integration
  };
}

async function verifyApiIntegration(repositories, changes) {
  const issues = [];

  // For each API change, verify frontend can call it
  const backendServices = repositories.filter(r => r.type === 'Backend Service');

  for (const service of backendServices) {
    const serviceChanges = changes[service.name];
    if (!serviceChanges || !serviceChanges.includes('api')) continue;

    // Get new API endpoints
    const newEndpoints = extractNewEndpoints(serviceChanges);

    // Find frontend clients
    const clients = repositories.filter(r => r.type === 'Frontend' || r.type === 'Mobile');

    for (const client of clients) {
      const clientChanges = changes[client.name];
      if (!clientChanges) {
        issues.push({
          severity: 'HIGH',
          message: `${client.name} was not updated to integrate with ${service.name} APIs`,
          service: service.name,
          client: client.name
        });
        continue;
      }

      // Verify API client exists
      const apiClient = findApiClient(client, service);
      if (!apiClient) {
        issues.push({
          severity: 'HIGH',
          message: `${client.name} does not have API client for ${service.name}`,
          service: service.name,
          client: client.name,
          action: 'Create API client'
        });
        continue;
      }

      // Verify API client has new endpoints
      const missingEndpoints = newEndpoints.filter(endpoint =>
        !apiClientHasEndpoint(apiClient, endpoint)
      );

      if (missingEndpoints.length > 0) {
        issues.push({
          severity: 'MEDIUM',
          message: `${client.name} API client missing endpoints: ${missingEndpoints.join(', ')}`,
          service: service.name,
          client: client.name,
          missingEndpoints,
          action: 'Add missing endpoints to API client'
        });
      }
    }
  }

  return {
    success: issues.length === 0,
    issues
  };
}

async function verifyDataFlow(repositories, changes) {
  const issues = [];

  // Verify data flows correctly from backend to frontend
  // This would involve tracing data paths through the system

  return {
    success: issues.length === 0,
    issues
  };
}

async function verifyUserJourneys(repositories, changes) {
  const issues = [];

  // Verify critical user journeys work
  // This would involve running integration tests or manual verification

  return {
    success: issues.length === 0,
    issues
  };
}
```

---

## Issue Resolution

### Auto-Fix Resolvable Issues

```javascript
async function fixIntegrityIssues(issues, repositories) {
  const fixed = [];
  const remaining = [];

  for (const issue of issues) {
    if (issue.autoFixable) {
      const fixedIssue = await fixIssue(issue, repositories);
      fixed.push(fixedIssue);
    } else {
      remaining.push(issue);
    }
  }

  return { fixed, remaining };
}

async function fixIssue(issue, repositories) {
  switch (issue.type) {
    case 'missing-dependency-install':
      return await fixMissingDependencyInstall(issue, repositories);

    case 'lock-file-outdated':
      return await fixLockFile(issue, repositories);

    case 'missing-export':
      return await fixMissingExport(issue, repositories);

    case 'version-mismatch':
      return await fixVersionMismatch(issue, repositories);

    default:
      return { ...issue, status: 'cannot-auto-fix' };
  }
}

async function fixMissingDependencyInstall(issue, repositories) {
  const repo = repositories.find(r => r.name === issue.repository);
  const installCommand = detectInstallCommand(repo);

  try {
    await runCommand(repo.path, installCommand);
    return { ...issue, status: 'fixed' };
  } catch (error) {
    return { ...issue, status: 'fix-failed', error };
  }
}
```

---

## Final Integrity Report

### Generate Comprehensive Report

```javascript
function generateIntegrityReport(verifications) {
  const report = {
    timestamp: new Date().toISOString(),

    overall: {
      complete: verifications.every(v => v.success),
      issues: verifications.flatMap(v => v.issues || [])
    },

    repositoryCoverage: verifications.repositoryCoverage,
    crossRepositoryConsistency: verifications.crossRepositoryConsistency,
    projectConventions: verifications.projectConventions,
    buildVerification: verifications.buildVerification,
    testVerification: verifications.testVerification,
    dependencyGraph: verifications.dependencyGraph,
    integrationVerification: verifications.integrationVerification,

    summary: {
      totalIssues: verifications.flatMap(v => v.issues || []).length,
      criticalIssues: verifications.flatMap(v => v.issues || []).filter(i => i.severity === 'CRITICAL').length,
      highIssues: verifications.flatMap(v => v.issues || []).filter(i => i.severity === 'HIGH').length,
      mediumIssues: verifications.flatMap(v => v.issues || []).filter(i => i.severity === 'MEDIUM').length,
      lowIssues: verifications.flatMap(v => v.issues || []).filter(i => i.severity === 'LOW').length
    },

    recommendations: generateRecommendations(verifications),

    readyToProceed: verifications.every(v => v.success) &&
      verifications.flatMap(v => v.issues || []).filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH').length === 0
  };

  return report;
}
```

---

## 🚨 CRITICAL: Integrity Must Pass Before Completion

**ABSOLUTE RULE:**

```
DO NOT mark task as complete until ALL integrity checks pass.

Implementation WITHOUT integrity verification = INCOMPLETE FEATURE
```

**Integrity Check Checklist:**

- [ ] All affected repositories were modified
- [ ] No repositories were missed
- [ ] Shared models are consistent across all repos
- [ ] API contracts are consistent between backend and frontend
- [ ] Dependencies are synchronized
- [ ] Translations are consistent (if applicable)
- [ ] Configurations are consistent (if applicable)
- [ ] File structure conventions were followed
- [ ] Code style conventions were followed
- [ ] Naming conventions were followed
- [ ] Import conventions were followed
- [ ] Error handling conventions were followed
- [ ] Testing conventions were followed
- [ ] All repositories build successfully
- [ ] All tests pass
- [ ] No circular dependencies introduced
- [ ] No missing dependencies
- [ ] No version conflicts
- [ ] No orphaned repositories
- [ ] API integration works end-to-end
- [ ] Data flow is correct
- [ ] User journeys work

**Only when ALL checks pass → Feature is complete**

---

**End of System Integrity Checker**
