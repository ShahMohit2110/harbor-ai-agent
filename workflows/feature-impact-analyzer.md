# Feature Impact Analyzer

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Analyze task requirements and determine ALL repositories affected by a feature

---

## 🎯 Core Philosophy

**A feature often spans multiple repositories.**

The agent must:
- Parse task requirements thoroughly
- Identify all affected repositories
- Determine the scope of changes in each repository
- Calculate the correct implementation order
- Verify no repository is missed

---

## Task Analysis Phase

### Step 1: Parse Task Requirements

```javascript
function parseTaskRequirements(task) {
  const requirements = {
    // Feature type
    featureType: identifyFeatureType(task),

    // Domain
    domain: identifyDomain(task),

    // Data models
    dataModels: extractDataModels(task),

    // APIs
    apis: extractApis(task),

    // UI components
    uiComponents: extractUiComponents(task),

    // User interactions
    userInteractions: extractUserInteractions(task),

    // Business logic
    businessLogic: extractBusinessLogic(task),

    // Non-functional requirements
    nonFunctional: extractNonFunctionalRequirements(task)
  };

  return requirements;
}
```

### Step 2: Feature Type Classification

```javascript
function identifyFeatureType(task) {
  const featureTypes = {
    // New entity/model
    newEntity: {
      keywords: ['new', 'create', 'add', 'entity', 'model', 'type'],
      indicators: ['new model', 'new entity', 'create table', 'add model']
    },

    // New API endpoint
    newApi: {
      keywords: ['endpoint', 'api', 'route', 'controller'],
      indicators: ['new endpoint', 'create api', 'add route', 'new controller']
    },

    // New UI component/page
    newUi: {
      keywords: ['page', 'component', 'screen', 'view', 'ui'],
      indicators: ['new page', 'create component', 'add screen', 'new view']
    },

    // Modify existing entity
    modifyEntity: {
      keywords: ['update', 'modify', 'change', 'entity', 'model'],
      indicators: ['update model', 'modify entity', 'change table', 'add field']
    },

    // Modify existing API
    modifyApi: {
      keywords: ['update', 'modify', 'change', 'endpoint', 'api'],
      indicators: ['update endpoint', 'modify api', 'change route']
    },

    // Modify existing UI
    modifyUi: {
      keywords: ['update', 'modify', 'change', 'page', 'component'],
      indicators: ['update page', 'modify component', 'change screen']
    },

    // Integration
    integration: {
      keywords: ['integrate', 'connect', 'sync', 'with'],
      indicators: ['integrate with', 'connect to', 'sync with']
    },

    // Configuration
    configuration: {
      keywords: ['config', 'setting', 'environment', 'feature flag'],
      indicators: ['add config', 'update setting', 'feature flag']
    }
  };

  // Match task to feature type
  for (const [type, definition] of Object.entries(featureTypes)) {
    const matchesKeywords = definition.keywords.some(keyword =>
      task.toLowerCase().includes(keyword)
    );

    const matchesIndicators = definition.indicators.some(indicator =>
      task.toLowerCase().includes(indicator)
    );

    if (matchesKeywords || matchesIndicators) {
      return type;
    }
  }

  return 'unknown';
}
```

### Step 3: Domain Identification

```javascript
function identifyDomain(task) {
  const domains = {
    user: {
      keywords: ['user', 'profile', 'account', 'authentication', 'login', 'signup'],
      repositories: ['harborUserSvc', 'harborSharedModels'],
      frontend: ['harborWebsite', 'harborApp']
    },

    job: {
      keywords: ['job', 'work', 'task', 'harbor job', 'service request', 'booking'],
      repositories: ['harborJobSvc', 'harborSharedModels'],
      frontend: ['harborWebsite', 'harborApp']
    },

    notification: {
      keywords: ['notification', 'message', 'alert', 'email', 'sms', 'push'],
      repositories: ['harborNotificationSvc'],
      frontend: ['harborWebsite', 'harborApp']
    },

    payment: {
      keywords: ['payment', 'billing', 'invoice', 'transaction', 'stripe'],
      repositories: ['harborPaymentSvc', 'harborSharedModels'],
      frontend: ['harborWebsite', 'harborApp']
    },

    review: {
      keywords: ['review', 'rating', 'feedback', 'testimonial'],
      repositories: ['harborReviewSvc', 'harborSharedModels'],
      frontend: ['harborWebsite', 'harborApp']
    },

    schedule: {
      keywords: ['schedule', 'calendar', 'availability', 'booking', 'appointment'],
      repositories: ['harborScheduleSvc', 'harborUserSvc', 'harborSharedModels'],
      frontend: ['harborWebsite', 'harborApp']
    },

    location: {
      keywords: ['location', 'geolocation', 'map', 'address', 'coordinates'],
      repositories: ['harborLocationSvc', 'harborSharedModels'],
      frontend: ['harborWebsite', 'harborApp']
    }
  };

  // Match task to domain
  for (const [domain, definition] of Object.entries(domains)) {
    const matches = definition.keywords.some(keyword =>
      task.toLowerCase().includes(keyword)
    );

    if (matches) {
      return domain;
    }
  }

  return 'general';
}
```

---

## Repository Impact Analysis

### Step 4: Score Repository Impact

```javascript
function scoreRepositoryImpact(repository, task, requirements) {
  const score = {
    domainMatch: 0,
    apiMatch: 0,
    modelMatch: 0,
    uiMatch: 0,
    techFit: 0,
    consumerRelevance: 0
  };

  // Domain match (50 points)
  if (repository.domain === requirements.domain) {
    score.domainMatch = 50;
  }

  // API match (30 points)
  const hasRelevantApis = repository.apis?.some(api =>
    requirements.apis?.some(requiredApi =>
      api.toLowerCase().includes(requiredApi.toLowerCase())
    )
  );
  if (hasRelevantApis) {
    score.apiMatch = 30;
  }

  // Model match (20 points)
  const hasRelevantModels = repository.models?.some(model =>
    requirements.dataModels?.some(requiredModel =>
      model.toLowerCase().includes(requiredModel.toLowerCase())
    )
  );
  if (hasRelevantModels) {
    score.modelMatch = 20;
  }

  // UI match (20 points)
  const hasRelevantUi = repository.uiComponents?.some(component =>
    requirements.uiComponents?.some(requiredUi =>
      component.toLowerCase().includes(requiredUi.toLowerCase())
    )
  );
  if (hasRelevantUi) {
    score.uiMatch = 20;
  }

  // Technology fit (10 points)
  const techFit = calculateTechFit(repository, requirements);
  score.techFit = techFit ? 10 : 0;

  // Consumer relevance (10 points)
  const consumerRelevance = calculateConsumerRelevance(repository, requirements);
  score.consumerRelevance = consumerRelevance ? 10 : 0;

  // Total score
  const totalScore = Object.values(score).reduce((a, b) => a + b, 0);

  return {
    totalScore,
    details: score,
    classification: classifyImpact(totalScore)
  };
}

function classifyImpact(score) {
  if (score >= 70) return 'PRIMARY';
  if (score >= 40) return 'SECONDARY';
  if (score >= 20) return 'TERTIARY';
  return 'NONE';
}
```

### Step 5: Determine Affected Repositories

```javascript
function determineAffectedRepositories(task, repositories, requirements, dependencyGraph) {
  const affected = {
    primary: [],
    secondary: [],
    tertiary: [],
    implementationOrder: []
  };

  // Score all repositories
  const scoredRepositories = repositories.map(repository => {
    const impact = scoreRepositoryImpact(repository, task, requirements);

    return {
      repository,
      impact
    };
  });

  // Classify repositories
  for (const { repository, impact } of scoredRepositories) {
    switch (impact.classification) {
      case 'PRIMARY':
        affected.primary.push(repository);
        break;
      case 'SECONDARY':
        affected.secondary.push(repository);
        break;
      case 'TERTIARY':
        affected.tertiary.push(repository);
        break;
    }
  }

  // Add dependency-based repositories
  const dependencyBased = determineDependencyBasedRepositories(
    affected.primary,
    affected.secondary,
    dependencyGraph
  );

  // Merge and deduplicate
  const allAffected = new Set([
    ...affected.primary,
    ...affected.secondary,
    ...affected.tertiary,
    ...dependencyBased
  ]);

  // Calculate implementation order
  affected.implementationOrder = getImplementationOrder(
    Array.from(allAffected),
    dependencyGraph
  );

  return affected;
}
```

### Step 6: Determine Dependency-Based Repositories

```javascript
function determineDependencyBasedRepositories(primary, secondary, dependencyGraph) {
  const additional = [];

  // Check if primary repositories depend on shared libraries
  for (const repo of primary) {
    const dependencies = getDependencies(repo, dependencyGraph);

    for (const dep of dependencies) {
      if (dep.type === 'Shared Library' || dep.type === 'Shared Models') {
        // Shared library must be updated
        additional.push(dep);
      }
    }
  }

  // Check if primary repositories have dependents that need updates
  for (const repo of primary) {
    const dependents = getDependents(repo, dependencyGraph);

    for (const dependent of dependents) {
      if (dependent.type === 'Frontend' || dependent.type === 'Mobile') {
        // Frontend/mobile may need updates to consume new APIs
        additional.push(dependent);
      }
    }
  }

  // Check if changes affect translations/config
  const requiresTranslationSync = primary.some(repo =>
    hasTranslations(repo) && taskAffectsTranslations(task)
  );

  if (requiresTranslationSync) {
    // Find all repositories with translations
    const translationRepos = findAllTranslationRepositories(dependencyGraph);
    additional.push(...translationRepos);
  }

  return additional;
}
```

---

## Change Scope Analysis

### Step 7: Analyze Change Scope for Each Repository

```javascript
function analyzeChangeScope(repository, task, requirements) {
  const scope = {
    // Models
    models: analyzeModelChanges(repository, requirements),

    // APIs
    apis: analyzeApiChanges(repository, requirements),

    // UI
    ui: analyzeUiChanges(repository, requirements),

    // Configuration
    config: analyzeConfigChanges(repository, requirements),

    // Dependencies
    dependencies: analyzeDependencyChanges(repository, requirements),

    // Tests
    tests: analyzeTestChanges(repository, requirements)
  };

  return scope;
}

function analyzeModelChanges(repository, requirements) {
  const changes = {
    newModels: [],
    modifiedModels: [],
    modelFields: []
  };

  if (requirements.featureType === 'newEntity') {
    changes.newModels.push(requirements.entityName);
  }

  if (requirements.featureType === 'modifyEntity') {
    changes.modifiedModels.push(requirements.entityName);
    changes.modelFields = requirements.fields || [];
  }

  return changes;
}

function analyzeApiChanges(repository, requirements) {
  const changes = {
    newEndpoints: [],
    modifiedEndpoints: [],
    deletedEndpoints: []
  };

  if (requirements.featureType === 'newApi' || requirements.featureType === 'newEntity') {
    // RESTful CRUD endpoints
    const entity = requirements.entityName;
    changes.newEndpoints = [
      `GET /api/${entity.toLowerCase()}`,
      `POST /api/${entity.toLowerCase()}`,
      `GET /api/${entity.toLowerCase()}/:id`,
      `PUT /api/${entity.toLowerCase()}/:id`,
      `DELETE /api/${entity.toLowerCase()}/:id`
    ];
  }

  if (requirements.featureType === 'modifyApi') {
    changes.modifiedEndpoints = requirements.endpoints || [];
  }

  return changes;
}

function analyzeUiChanges(repository, requirements) {
  const changes = {
    newPages: [],
    newComponents: [],
    modifiedPages: [],
    modifiedComponents: []
  };

  if (requirements.featureType === 'newUi' || requirements.featureType === 'newEntity') {
    const entity = requirements.entityName;
    changes.newPages = [
      `${entity} List`,
      `${entity} Detail`,
      `${entity} Create/Edit`
    ];
    changes.newComponents = [
      `${entity}Card`,
      `${entity}Form`,
      `${entity}List`
    ];
  }

  if (requirements.featureType === 'modifyUi') {
    changes.modifiedComponents = requirements.components || [];
  }

  return changes;
}
```

---

## Implementation Order Calculation

### Step 8: Calculate Implementation Order

```javascript
function getImplementationOrder(affectedRepositories, dependencyGraph) {
  // Start with dependency order
  const dependencyOrder = topologicalSort(dependencyGraph);

  // Filter to only affected repositories
  const affectedOrder = dependencyOrder.filter(repo =>
    affectedRepositories.some(ar => ar.name === repo)
  );

  // Within same dependency level, use priority
  const prioritized = prioritizeByImpact(affectedOrder, affectedRepositories);

  return prioritized;
}

function prioritizeByImpact(order, affectedRepositories) {
  const prioritized = [];

  // Primary repositories first
  for (const repo of order) {
    const repoData = affectedRepositories.find(r => r.name === repo);
    if (repoData && repoData.impact?.classification === 'PRIMARY') {
      prioritized.push(repo);
    }
  }

  // Then secondary
  for (const repo of order) {
    const repoData = affectedRepositories.find(r => r.name === repo);
    if (repoData && repoData.impact?.classification === 'SECONDARY') {
      prioritized.push(repo);
    }
  }

  // Then tertiary
  for (const repo of order) {
    const repoData = affectedRepositories.find(r => r.name === repo);
    if (repoData && repoData.impact?.classification === 'TERTIARY') {
      prioritized.push(repo);
    }
  }

  return prioritized;
}
```

---

## Verification Phase

### Step 9: Verify Complete Repository Coverage

```javascript
function verifyRepositoryCoverage(affectedRepositories, task, dependencyGraph) {
  const verification = {
    allAffectedFound: true,
    missingRepositories: [],
    warnings: []
  };

  // Check if shared libraries are included
  const hasModelChanges = task.requiresModelChanges();
  if (hasModelChanges) {
    const sharedModels = findSharedModelsRepository(dependencyGraph);
    if (sharedModels && !affectedRepositories.includes(sharedModels)) {
      verification.allAffectedFound = false;
      verification.missingRepositories.push({
        repository: sharedModels.name,
        reason: 'Contains shared models that are being modified'
      });
    }
  }

  // Check if all dependents are included
  for (const repo of affectedRepositories.primary) {
    const dependents = getDependents(repo, dependencyGraph);
    for (const dependent of dependents) {
      if (dependent.type === 'Frontend' || dependent.type === 'Mobile') {
        if (!affectedRepositories.includes(dependent)) {
          verification.warnings.push({
            repository: dependent.name,
            reason: `Consumes APIs from ${repo.name} and may need updates`,
            severity: 'WARNING'
          });
        }
      }
    }
  }

  return verification;
}
```

### Step 10: Generate Impact Report

```javascript
function generateImpactReport(task, affectedRepositories, implementationOrder) {
  const report = {
    task,

    affectedRepositories: {
      primary: affectedRepositories.primary.map(r => r.name),
      secondary: affectedRepositories.secondary.map(r => r.name),
      tertiary: affectedRepositories.tertiary.map(r => r.name)
    },

    implementationOrder,

    changeSummary: affectedRepositories.primary.map(repo => ({
      repository: repo.name,
      changes: analyzeChangeScope(repo, task)
    })),

    estimatedEffort: estimateEffort(affectedRepositories),

    risks: identifyRisks(affectedRepositories),

    recommendations: generateRecommendations(affectedRepositories)
  };

  return report;
}
```

---

## 🚨 CRITICAL: Decision Validation Step (MANDATORY)

### Step 11: Pre-Implementation Decision Validation

**🚨 BEFORE proceeding to implementation, the agent MUST validate its decisions.**

This step is **NON-NEGOTIABLE**. The agent must explicitly answer these questions:

```javascript
function validateImpactDecisions(task, affectedRepositories, dependencyGraph) {
  const validation = {
    questions: [],

    // Question 1: Completeness Check
    questions.push({
      id: 'Q1',
      question: 'Have I checked ALL repositories for potential impact?',
      answer: null, // Must be explicitly answered
      evidence: [], // Must provide evidence
      confidence: null // Must rate confidence (High/Medium/Low)
    }),

    // Question 2: Multi-Repository Check
    questions.push({
      id: 'Q2',
      question: 'Is this feature required in more than one repository?',
      answer: null,
      reasoning: null,
      evidence: []
    }),

    // Question 3: Cross-Platform Consistency Check
    questions.push({
      id: 'Q3',
      question: 'Are there multiple platforms serving similar roles?',
      answer: null,
      platformsIdentified: [],
      consistencyRequired: false
    }),

    // Question 4: Dependency Propagation Check
    questions.push({
      id: 'Q4',
      question: 'Will changes in one repository require updates in dependent repositories?',
      answer: null,
      dependentsIdentified: [],
      updateRequired: []
    }),

    // Question 5: Shared Resource Check
    questions.push({
      id: 'Q5',
      question: 'Are shared models/types/configurations being modified?',
      answer: null,
      sharedResourcesIdentified: [],
      allConsumersIncluded: false
    }),

    // Question 6: Feature Parity Check
    questions.push({
      id: 'Q6',
      question: 'Does this feature exist in multiple repositories that require consistency?',
      answer: null,
      featureLocations: [],
      parityRequired: false
    })
  };

  return validation;
}
```

### Decision Validation Rules

**🚨 RULE 1: Explicit Answer Required**

For EACH validation question, the agent MUST:

1. **Provide an explicit YES/NO answer**
2. **Provide evidence/reasoning**
3. **List ALL repositories involved**
4. **Rate confidence level**

**Example - CORRECT:**
```markdown
## Decision Validation

### Q1: Have I checked ALL repositories for potential impact?

**Answer:** YES

**Evidence:**
- Analyzed 7 repositories in workspace
- Scored each repository using impact scoring algorithm
- Checked dependency graph for ripple effects
- Verified no repositories were omitted

**Repositories Analyzed:**
1. harborSharedModels - Score: 70 (SECONDARY)
2. harborUserSvc - Score: 90 (PRIMARY)
3. harborJobSvc - Score: 0 (NONE)
4. harborNotificationSvc - Score: 0 (NONE)
5. harborWebsite - Score: 60 (SECONDARY)
6. harborApp - Score: 60 (SECONDARY)
7. harborApiGateway - Score: 0 (NONE)

**Confidence:** HIGH
```

**Example - WRONG:**
```markdown
### Q1: Have I checked all repositories?

Answer: Yes, I checked the main ones.
```

### Step 12: Cross-Platform Consistency Verification

**🚨 CRITICAL: If multiple repositories serve similar roles, verify consistency.**

```javascript
function verifyCrossPlatformConsistency(task, affectedRepositories, repositoryAnalysis) {
  const verification = {
    platformsIdentified: [],
    consistencyChecks: [],
    requiredUpdates: []
  };

  // Identify platforms serving similar roles
  const platforms = identifyPlatformTypes(repositoryAnalysis);

  // Group by role
  const frontendPlatforms = platforms.filter(p => p.type === 'Frontend');
  const mobilePlatforms = platforms.filter(p => p.type === 'Mobile');
  const backendServices = platforms.filter(p => p.type === 'Backend');

  // Check if task affects multiple platforms in same category
  if (frontendPlatforms.length > 1) {
    verification.consistencyChecks.push({
      type: 'Frontend',
      platforms: frontendPlatforms.map(p => p.name),
      question: `Does this task affect ALL frontend platforms?`,
      reasoning: [],
      conclusion: null
    });
  }

  if (mobilePlatforms.length > 1) {
    verification.consistencyChecks.push({
      type: 'Mobile',
      platforms: mobilePlatforms.map(p => p.name),
      question: `Does this task affect ALL mobile platforms?`,
      reasoning: [],
      conclusion: null
    });
  }

  return verification;
}
```

**Cross-Platform Consistency Examples:**

**Example 1: User Profile Redesign**
```
Task: "Redesign the user profile page"

Analysis:
- harborWebsite has user profile page → AFFECTED
- harborApp has user profile screen → AFFECTED

Decision: BOTH must be updated
Reasoning: Both are user-facing platforms with profile functionality
```

**Example 2: User Availability Feature**
```
Task: "Add user availability status feature"

Analysis:
- harborUserSvc manages user data → AFFECTED (API)
- harborWebsite displays user data → AFFECTED (UI)
- harborApp displays user data → AFFECTED (UI)

Decision: ALL 3 must be updated
Reasoning:
- Backend: Add availability API
- Web: Add availability UI
- Mobile: Add availability UI
- Feature parity required across platforms
```

### Step 13: Final Decision Lock

**🚨 BEFORE proceeding to implementation, the agent MUST:**

1. **Complete ALL validation questions**
2. **Provide explicit YES/NO answers**
3. **List ALL affected repositories**
4. **Document reasoning for EACH decision**
5. **Confirm cross-platform consistency requirements**

**Decision Lock Format:**

```markdown
## 🚨 FINAL DECISION LOCK

**Task:** {task title}

**Affected Repositories:** {count}

**Repository List:**
1. {repository-name} - {Impact Level} - {Reasoning}
2. {repository-name} - {Impact Level} - {Reasoning}
...

**Cross-Platform Consistency:** {REQUIRED/NOT REQUIRED}

**If Consistency Required:**
- Platform Group: {Frontend/Mobile/Backend}
- Repositories in Group: {list}
- Consistency Reasoning: {reasoning}

**Implementation Order:**
1. {repository} - {reason}
2. {repository} - {reason}
...

**Validation Confirmation:**
- [ ] All validation questions answered
- [ ] All repositories explicitly listed
- [ ] Cross-platform consistency verified
- [ ] Implementation order determined
- [ ] NO repositories omitted without explicit reasoning
- [ ] NO assumptions made without evidence

**Decision Status:** LOCKED ✅

**Proceeding to implementation with {count} repositories.**
```

**🚨 ABSOLUTE RULE:**

```
IF ANY validation question is unanswered → DO NOT PROCEED
IF cross-platform consistency is uncertain → RE-ANALYZE
IF implementation order is unclear → RE-ANALYZE
IF confidence is LOW → RE-ANALYZE
```

### Step 14: Uncertainty Resolution

**IF the agent is uncertain about ANY repository impact:**

```javascript
function resolveUncertainty(task, uncertainRepositories, dependencyGraph) {
  const resolution = {
    questions: [],
    additionalAnalysis: [],
    finalDecision: null
  };

  // For each uncertain repository
  for (const repo of uncertainRepositories) {
    // Additional analysis steps:
    // 1. Search repository for related code
    // 2. Check API endpoints/routes
    // 3. Check UI components/pages
    // 4. Check model definitions
    // 5. Check dependencies on this repo

    resolution.additionalAnalysis.push({
      repository: repo.name,
      analysisRequired: [
        'Code search for relevant keywords',
        'API endpoint scan',
        'UI component scan',
        'Dependency check'
      ]
    });
  }

  return resolution;
}
```

**Resolution Actions:**

1. **Search repository code** for task-related keywords
2. **Check API endpoints** for relevant endpoints
3. **Check UI components** for related screens/pages
4. **Verify dependencies** - does this repo depend on affected code?
5. **Check dependents** - do other repos depend on this repo?

**After additional analysis, re-run validation questions.**

---

## 🚨 CRITICAL: Impact Analysis Must Complete Before Planning

**ABSOLUTE RULE:**

```
DO NOT create implementation plan until impact analysis is complete.

Planning WITHOUT impact analysis = INCOMPLETE IMPLEMENTATION

Impact analysis WITHOUT decision validation = INCOMPLETE ANALYSIS
```

**Impact Analysis Checklist:**

- [ ] Task requirements parsed
- [ ] Feature type classified
- [ ] Domain identified
- [ ] Data models extracted
- [ ] APIs extracted
- [ ] UI components extracted
- [ ] All repositories scored
- [ ] Affected repositories determined
- [ ] Dependency-based repositories included
- [ ] Change scope analyzed for each repository
- [ ] Implementation order calculated
- [ ] Coverage verified
- [ ] **Decision validation questions answered** ✨ NEW
- [ ] **Cross-platform consistency verified** ✨ NEW
- [ ] **Decision lock confirmed** ✨ NEW
- [ ] **Uncertainties resolved** ✨ NEW
- [ ] Impact report generated

**Only when ALL checks pass → Continue to planning**

---

## 🚨 Enforcement: Agent Cannot Skip This Step

**The agent workflow MUST enforce:**

1. **Impact analysis is MANDATORY** - Cannot proceed without it
2. **Decision validation is MANDATORY** - Must answer all 6 questions
3. **Cross-platform check is MANDATORY** - Must verify if multiple platforms affected
4. **Decision lock is MANDATORY** - Must explicitly confirm decision before proceeding

**If agent attempts to skip:**
- **STOP immediately**
- **Re-run complete feature impact analysis**
- **Complete ALL validation questions**
- **Lock decision before proceeding**

---

**End of Feature Impact Analyzer**
