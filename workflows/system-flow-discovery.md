# System Flow Discovery & Dynamic Pipeline Construction

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Transform the Harbor AI Agent into a system-aware, workflow-driven engineering agent

---

## 🚨 CRITICAL: This is a Fundamental Architectural Upgrade

**This workflow transforms the agent from:**
- ❌ Repository-level operator
- ❌ Static rule follower
- ❌ Manual integration manager

**To:**
- ✅ System-level intelligence engine
- ✅ Dynamic workflow detector
- ✅ Autonomous pipeline executor

---

## 🎯 Core Philosophy

**The agent must understand NOT just code, but HOW THE ENTIRE SYSTEM OPERATES.**

This means:
- Understanding how changes flow across repositories
- Detecting real-world execution workflows dynamically
- Building execution pipelines based on system behavior
- Ensuring complete integration across the system

**The agent behaves like a senior engineer who understands:**
- How the system works end-to-end
- What happens after making a change
- Which steps are required for full integration
- How to validate system-level consistency

---

## 📊 System Flow Map Architecture

### What is a System Flow Map?

A System Flow Map is a **dynamic representation** of how changes propagate through the system. It captures:

1. **Source Repositories** - Where changes originate
2. **Transformation Steps** - How changes are transformed
3. **Consumer Repositories** - Where changes are consumed
4. **Execution Pipelines** - The complete workflow from change to deployment
5. **Validation Points** - Where system consistency is verified

### System Flow Map Structure

```javascript
{
  "mapId": "system-flow-v1",
  "generatedAt": "2026-03-18T10:00:00Z",
  "repositories": {
    "sources": [
      {
        "name": "harborSharedModels",
        "type": "sharedLibrary",
        "role": "source-of-truth",
        "exports": ["User", "Job", "Notification"],
        "consumers": ["harborUserSvc", "harborJobSvc", "harborNotificationSvc"]
      }
    ],
    "transformers": [
      {
        "name": "harborUserSvc",
        "type": "backendService",
        "role": "transformer",
        "transforms": [
          {
            "input": "User model from harborSharedModels",
            "transformation": "Adds business logic, validation, API exposure",
            "output": "User API endpoints, User business logic",
            "consumers": ["harborWebsite", "harborApp"]
          }
        ]
      }
    ],
    "consumers": [
      {
        "name": "harborWebsite",
        "type": "frontend",
        "role": "consumer",
        "consumes": [
          {
            "from": "harborUserSvc",
            "via": "REST API",
            "what": "User data, User operations"
          }
        ]
      }
    ]
  },
  "flows": [
    {
      "flowId": "user-model-change-flow",
      "trigger": "User model modified in harborSharedModels",
      "steps": [
        {
          "step": 1,
          "repository": "harborSharedModels",
          "action": "Update User model",
          "outputs": ["Updated User interface", "Updated exports"],
          "next": "version-update"
        },
        {
          "step": 2,
          "repository": "harborSharedModels",
          "action": "Version update",
          "detection": "package.json version bump",
          "outputs": ["New version: 1.2.4"],
          "next": "consumer-sync"
        },
        {
          "step": 3,
          "repository": "harborUserSvc",
          "action": "Update dependency version",
          "detection": "package.json dependency update",
          "outputs": ["harbor-shared-models@1.2.4"],
          "next": "install"
        },
        {
          "step": 4,
          "repository": "harborUserSvc",
          "action": "Install dependencies",
          "detection": "npm install",
          "outputs": ["Updated node_modules", "Updated lock file"],
          "next": "api-update"
        },
        {
          "step": 5,
          "repository": "harborUserSvc",
          "action": "Update API for new User fields",
          "detection": "New/modified routes, controllers, services",
          "outputs": ["Updated API endpoints"],
          "next": "build"
        },
        {
          "step": 6,
          "repository": "harborUserSvc",
          "action": "Build service",
          "detection": "npm run build",
          "outputs": ["Compiled JavaScript", "dist/ directory"],
          "next": "frontend-sync"
        },
        {
          "step": 7,
          "repository": "harborWebsite",
          "action": "Update API client",
          "detection": "API client changes",
          "outputs": ["Updated API calls"],
          "next": "ui-update"
        },
        {
          "step": 8,
          "repository": "harborWebsite",
          "action": "Update UI components",
          "detection": "Component changes",
          "outputs": ["Updated UI"],
          "next": "validation"
        },
        {
          "step": 9,
          "repository": "all",
          "action": "System validation",
          "detection": "End-to-end tests, integration tests",
          "outputs": ["System is stable", "No regressions"]
        }
      ],
      "estimatedSteps": 9,
      "repositoriesInvolved": ["harborSharedModels", "harborUserSvc", "harborWebsite"]
    }
  ]
}
```

---

## Step 1: System Flow Discovery (MANDATORY)

### When to Run System Flow Discovery

**🚨 MANDATORY: Run System Flow Discovery during agent initialization.**

This happens **AFTER** visible repository analysis and **BEFORE** task execution.

### Discovery Process

```javascript
async function discoverSystemFlow(repositories) {
  console.log('\n🌊 Starting System Flow Discovery...\n');

  const systemFlowMap = {
    mapId: `system-flow-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    repositories: {
      sources: [],
      transformers: [],
      consumers: []
    },
    flows: [],
    pipelines: {},
    validationPoints: []
  };

  // Phase 1: Identify Repository Roles
  console.log('📋 Phase 1: Identifying repository roles...');
  const roles = await identifyRepositoryRoles(repositories);
  systemFlowMap.repositories = roles;

  // Phase 2: Detect Integration Patterns
  console.log('🔗 Phase 2: Detecting integration patterns...');
  const integrations = await detectIntegrationPatterns(repositories, roles);
  systemFlowMap.integrations = integrations;

  // Phase 3: Build Change Flow Graph
  console.log('🌊 Phase 3: Building change flow graph...');
  const flowGraph = await buildChangeFlowGraph(repositories, roles, integrations);
  systemFlowMap.flows = flowGraph;

  // Phase 4: Infer Execution Pipelines
  console.log('⚙️ Phase 4: Inferring execution pipelines...');
  const pipelines = await inferExecutionPipelines(repositories, flowGraph);
  systemFlowMap.pipelines = pipelines;

  // Phase 5: Detect Validation Points
  console.log('✅ Phase 5: Detecting validation points...');
  const validationPoints = await detectValidationPoints(repositories, pipelines);
  systemFlowMap.validationPoints = validationPoints;

  console.log('\n✅ System Flow Discovery Complete\n');

  return systemFlowMap;
}
```

### Phase 1.1: Identify Repository Roles

```javascript
async function identifyRepositoryRoles(repositories) {
  const roles = {
    sources: [],
    transformers: [],
    consumers: [],
    orchestrators: []
  };

  for (const repo of repositories) {
    const role = await determineRepositoryRole(repo);

    switch (role.type) {
      case 'source':
        roles.sources.push({
          name: repo.name,
          path: repo.path,
          type: role.subtype,
          exports: await detectExports(repo),
          consumers: [] // Will be populated later
        });
        break;

      case 'transformer':
        roles.transformers.push({
          name: repo.name,
          path: repo.path,
          type: role.subtype,
          transforms: await detectTransforms(repo),
          consumesFrom: [],
          producesFor: []
        });
        break;

      case 'consumer':
        roles.consumers.push({
          name: repo.name,
          path: repo.path,
          type: role.subtype,
          consumes: [],
          displays: await detectDisplayMechanisms(repo)
        });
        break;

      case 'orchestrator':
        roles.orchestrators.push({
          name: repo.name,
          path: repo.path,
          orchestrates: await detectOrchestrationTargets(repo)
        });
        break;
    }
  }

  return roles;
}

async function determineRepositoryRole(repo) {
  const indicators = {
    // Source indicators
    isSharedLibrary: await isSharedLibrary(repo),
    hasModelsOnly: await hasModelsOnly(repo),
    hasTypesOnly: await hasTypesOnly(repo),
    exportsNoServer: await exportsNoServer(repo),

    // Transformer indicators
    hasBusinessLogic: await hasBusinessLogic(repo),
    exposesAPI: await exposesAPI(repo),
    transformsData: await transformsData(repo),
    hasServiceLayer: await hasServiceLayer(repo),

    // Consumer indicators
    isFrontend: await isFrontend(repo),
    isMobile: await isMobile(repo),
    consumesAPIs: await consumesAPIs(repo),
    displaysData: await displaysData(repo),

    // Orchestrator indicators
    orchestratesServices: await orchestratesServices(repo),
    hasWorkflowEngine: await hasWorkflowEngine(repo),
    coordinatesWork: await coordinatesWork(repo)
  };

  // Determine role based on indicators
  if (indicators.isSharedLibrary || indicators.hasModelsOnly || indicators.hasTypesOnly) {
    return { type: 'source', subtype: detectSourceType(indicators) };
  }

  if (indicators.hasBusinessLogic && indicators.exposesAPI) {
    return { type: 'transformer', subtype: detectTransformerType(indicators) };
  }

  if ((indicators.isFrontend || indicators.isMobile) && indicators.consumesAPIs) {
    return { type: 'consumer', subtype: detectConsumerType(indicators) };
  }

  if (indicators.orchestratesServices || indicators.hasWorkflowEngine) {
    return { type: 'orchestrator', subtype: detectOrchestratorType(indicators) };
  }

  // Default: hybrid
  return { type: 'transformer', subtype: 'hybrid' };
}
```

### Phase 1.2: Detect Integration Patterns

```javascript
async function detectIntegrationPatterns(repositories, roles) {
  const integrations = [];

  // For each transformer, detect what it consumes and produces
  for (const transformer of roles.transformers) {
    const consumesFrom = [];
    const producesFor = [];

    // Detect what it consumes
    for (const source of roles.sources) {
      if (await importsFrom(transformer, source)) {
        const integrationType = await detectIntegrationType(transformer, source);
        consumesFrom.push({
          source: source.name,
          type: integrationType,
          importedElements: await detectImportedElements(transformer, source)
        });
      }
    }

    // Detect what it produces
    for (const consumer of roles.consumers) {
      if (await consumesFrom(consumer, transformer)) {
        const consumptionType = await detectConsumptionType(consumer, transformer);
        producesFor.push({
          consumer: consumer.name,
          type: consumptionType,
          consumedAPIs: await detectConsumedAPIs(consumer, transformer)
        });
      }
    }

    integrations.push({
      repository: transformer.name,
      role: 'transformer',
      consumesFrom: consumesFrom,
      producesFor: producesFor
    });
  }

  // For each consumer, detect direct source consumption (if any)
  for (const consumer of roles.consumers) {
    const directConsumption = [];

    for (const source of roles.sources) {
      if (await importsFrom(consumer, source)) {
        directConsumption.push({
          source: source.name,
          type: 'direct-import',
          importedElements: await detectImportedElements(consumer, source)
        });
      }
    }

    if (directConsumption.length > 0) {
      integrations.push({
        repository: consumer.name,
        role: 'consumer',
        consumesFrom: directConsumption
      });
    }
  }

  return integrations;
}

async function detectIntegrationType(from, to) {
  // Check for import-based integration
  if (await hasImportStatements(from, to)) {
    return 'import-based';
  }

  // Check for API-based integration
  if (await hasAPIConsumption(from, to)) {
    return 'api-based';
  }

  // Check for code generation
  if (await hasCodeGeneration(from, to)) {
    return 'code-generation';
  }

  // Check for file sync
  if (await hasFileSync(from, to)) {
    return 'file-sync';
  }

  return 'unknown';
}
```

### Phase 1.3: Build Change Flow Graph

```javascript
async function buildChangeFlowGraph(repositories, roles, integrations) {
  const flows = [];

  // For each source, build a flow
  for (const source of roles.sources) {
    const flow = {
      flowId: `${source.name}-change-flow`,
      trigger: `Changes to ${source.name}`,
      source: source.name,
      steps: [],
      repositoriesInvolved: [source.name]
    };

    let currentStep = 1;

    // Step 1: Source change
    flow.steps.push({
      step: currentStep++,
      repository: source.name,
      action: 'Implement change',
      type: 'implementation'
    });

    // Detect if source requires version update
    const requiresVersion = await requiresVersionUpdate(source);
    if (requiresVersion) {
      flow.steps.push({
        step: currentStep++,
        repository: source.name,
        action: 'Version update',
        type: 'versioning',
        detection: await detectVersioningMethod(source)
      });
    }

    // Detect if source requires build
    const requiresBuild = await requiresBuildStep(source);
    if (requiresBuild) {
      flow.steps.push({
        step: currentStep++,
        repository: source.name,
        action: 'Build',
        type: 'build',
        detection: await detectBuildCommand(source)
      });
    }

    // Find all transformers that consume this source
    const consumingTransformers = integrations.filter(
      i => i.role === 'transformer' && i.consumesFrom.some(c => c.source === source.name)
    );

    // For each transformer, add sync steps
    for (const transformer of consumingTransformers) {
      const integration = transformer.consumesFrom.find(c => c.source === source.name);

      // Step: Update dependency/version
      flow.steps.push({
        step: currentStep++,
        repository: transformer.repository,
        action: 'Update dependency/reference',
        type: 'dependency-update',
        integration: integration.type
      });

      // Step: Install
      flow.steps.push({
        step: currentStep++,
        repository: transformer.repository,
        action: 'Install dependencies',
        type: 'install',
        detection: await detectInstallCommand(transformer)
      });

      // Step: Update transformer code
      flow.steps.push({
        step: currentStep++,
        repository: transformer.repository,
        action: 'Update transformer logic',
        type: 'code-update',
        detection: await detectTransformerUpdatePattern(transformer, integration)
      });

      // Step: Build transformer
      if (await requiresBuildStep(transformer)) {
        flow.steps.push({
          step: currentStep++,
          repository: transformer.repository,
          action: 'Build transformer',
          type: 'build'
        });
      }

      flow.repositoriesInvolved.push(transformer.repository);

      // Find consumers of this transformer
      const consumingConsumers = integrations.filter(
        i => i.role === 'consumer' && i.consumesFrom.some(c => c.source === transformer.repository)
      );

      // For each consumer, add sync steps
      for (const consumer of consumingConsumers) {
        // Step: Update consumer
        flow.steps.push({
          step: currentStep++,
          repository: consumer.repository,
          action: 'Update consumer',
          type: 'consumer-update',
          detection: await detectConsumerUpdatePattern(consumer, transformer)
        });

        // Step: Build consumer
        if (await requiresBuildStep(consumer)) {
          flow.steps.push({
            step: currentStep++,
            repository: consumer.repository,
            action: 'Build consumer',
            type: 'build'
          });
        }

        flow.repositoriesInvolved.push(consumer.repository);
      }
    }

    // Find direct consumers of source
    const directConsumers = integrations.filter(
      i => i.role === 'consumer' && i.consumesFrom.some(c => c.source === source.name)
    );

    // For each direct consumer, add sync steps
    for (const consumer of directConsumers) {
      // Step: Update consumer
      flow.steps.push({
        step: currentStep++,
        repository: consumer.repository,
        action: 'Update consumer',
        type: 'consumer-update'
      });

      // Step: Build consumer
      if (await requiresBuildStep(consumer)) {
        flow.steps.push({
          step: currentStep++,
          repository: consumer.repository,
          action: 'Build consumer',
          type: 'build'
        });
      }

      flow.repositoriesInvolved.push(consumer.repository);
    }

    // Final step: System validation
    flow.steps.push({
      step: currentStep++,
      repository: 'all',
      action: 'System validation',
      type: 'validation'
    });

    flow.estimatedSteps = currentStep - 1;
    flows.push(flow);
  }

  return flows;
}
```

### Phase 1.4: Infer Execution Pipelines

```javascript
async function inferExecutionPipelines(repositories, flowGraph) {
  const pipelines = {};

  for (const flow of flowGraph) {
    const pipeline = {
      pipelineId: flow.flowId,
      stages: [],
      totalStages: flow.steps.length,
      estimatedDuration: await estimatePipelineDuration(flow),
      rollbackPlan: await generateRollbackPlan(flow)
    };

    // Group steps into stages
    let currentStage = {
      stageNumber: 1,
      repository: flow.steps[0].repository,
      actions: []
    };

    for (const step of flow.steps) {
      // If repository changed, start new stage
      if (step.repository !== currentStage.repository) {
        pipeline.stages.push(currentStage);
        currentStage = {
          stageNumber: pipeline.stages.length + 1,
          repository: step.repository,
          actions: []
        };
      }

      currentStage.actions.push({
        action: step.action,
        type: step.type,
        detection: step.detection
      });
    }

    pipeline.stages.push(currentStage);
    pipelines[flow.flowId] = pipeline;
  }

  return pipelines;
}
```

### Phase 1.5: Detect Validation Points

```javascript
async function detectValidationPoints(repositories, pipelines) {
  const validationPoints = [];

  // Add validation after each pipeline
  for (const [pipelineId, pipeline] of Object.entries(pipelines)) {
    validationPoints.push({
      pointId: `validation-${pipelineId}`,
      location: 'after-pipeline',
      pipeline: pipelineId,
      checks: [
        'build-success',
        'imports-resolve',
        'no-breaking-changes',
        'integration-tests-pass'
      ]
    });
  }

  // Add inter-repository validation
  validationPoints.push({
    pointId: 'cross-repo-validation',
    location: 'after-all-sync',
    checks: [
      'version-alignment',
      'import-consistency',
      'no-missing-dependencies',
      'all-builds-pass'
    ]
  });

  return validationPoints;
}
```

---

## Step 2: Dynamic Pipeline Construction

### When to Construct Execution Pipeline

**🚨 MANDATORY: Construct execution pipeline BEFORE implementing any task.**

```javascript
async function constructExecutionPipeline(task, systemFlowMap) {
  console.log('\n⚙️ Constructing Execution Pipeline...\n');

  // Step 1: Analyze task to identify affected repositories
  const affectedRepos = await identifyAffectedRepositories(task, systemFlowMap);
  console.log(`📊 Affected Repositories: ${affectedRepos.map(r => r.name).join(', ')}`);

  // Step 2: Select relevant flow from system flow map
  const relevantFlow = await selectRelevantFlow(task, affectedRepos, systemFlowMap);
  console.log(`🌊 Selected Flow: ${relevantFlow.flowId}`);

  // Step 3: Customize flow based on task
  const customizedFlow = await customizeFlowForTask(relevantFlow, task, affectedRepos);

  // Step 4: Generate execution plan
  const executionPlan = await generateExecutionPlan(customizedFlow);

  console.log('\n✅ Execution Pipeline Constructed\n');
  console.log(`📋 Total Stages: ${executionPlan.stages.length}`);
  console.log(`⏱️  Estimated Duration: ${executionPlan.estimatedDuration}ms\n`);

  return executionPlan;
}

async function identifyAffectedRepositories(task, systemFlowMap) {
  const affected = [];

  // Check if task affects source repositories
  for (const source of systemFlowMap.repositories.sources) {
    if (await taskAffectsRepository(task, source)) {
      affected.push({
        repository: source,
        impactLevel: 'high',
        changesRequired: await determineChangesRequired(task, source)
      });
    }
  }

  // Check if task affects transformers
  for (const transformer of systemFlowMap.repositories.transformers) {
    if (await taskAffectsRepository(task, transformer)) {
      affected.push({
        repository: transformer,
        impactLevel: 'medium',
        changesRequired: await determineChangesRequired(task, transformer)
      });
    }
  }

  // Check if task affects consumers
  for (const consumer of systemFlowMap.repositories.consumers) {
    if (await taskAffectsRepository(task, consumer)) {
      affected.push({
        repository: consumer,
        impactLevel: 'low',
        changesRequired: await determineChangesRequired(task, consumer)
      });
    }
  }

  return affected;
}

async function selectRelevantFlow(task, affectedRepos, systemFlowMap) {
  // Find the flow that matches the task's impact
  const primaryAffected = affectedRepos[0];
  const primaryRepo = primaryAffected.repository;

  // Find flow for this repository
  const relevantFlow = systemFlowMap.flows.find(
    f => f.source === primaryRepo.name || f.repositoriesInvolved.includes(primaryRepo.name)
  );

  if (!relevantFlow) {
    // Generate ad-hoc flow if none exists
    return await generateAdHocFlow(task, affectedRepos);
  }

  return relevantFlow;
}

async function customizeFlowForTask(flow, task, affectedRepos) {
  const customized = { ...flow };

  // Customize steps based on task
  customized.steps = await Promise.all(customized.steps.map(async step => {
    const customizedStep = { ...step };

    // Add task-specific context
    customizedStep.taskContext = {
      taskId: task.id,
      taskType: task.type,
      taskDescription: task.description
    };

    // Customize action based on task
    if (step.type === 'implementation') {
      customizedStep.implementationDetails = await generateImplementationDetails(step, task);
    }

    return customizedStep;
  }));

  return customized;
}

async function generateExecutionPlan(flow) {
  return {
    planId: `execution-plan-${Date.now()}`,
    flow: flow.flowId,
    stages: await buildExecutionStages(flow),
    totalStages: flow.estimatedSteps,
    estimatedDuration: await estimatePipelineDuration(flow),
    validationPoints: await identifyValidationPoints(flow),
    rollbackPlan: await generateRollbackPlan(flow)
  };
}
```

---

## Step 3: Execution & Validation Loop

### Execute Pipeline

```javascript
async function executePipeline(executionPlan) {
  console.log('\n🚀 Executing Pipeline...\n');

  const executionResults = {
    planId: executionPlan.planId,
    startTime: new Date().toISOString(),
    stages: [],
    validations: [],
    status: 'in-progress'
  };

  try {
    // Execute each stage
    for (const stage of executionPlan.stages) {
      console.log(`\n📍 Stage ${stage.stageNumber}: ${stage.repository}`);
      console.log(`   Actions: ${stage.actions.map(a => a.action).join(', ')}`);

      const stageResult = await executeStage(stage);
      executionResults.stages.push(stageResult);

      if (!stageResult.success) {
        throw new Error(`Stage ${stage.stageNumber} failed: ${stageResult.error}`);
      }

      console.log(`   ✅ Stage ${stage.stageNumber} complete`);
    }

    // Run validations
    console.log('\n✅ Running validations...\n');
    for (const validationPoint of executionPlan.validationPoints) {
      const validationResult = await runValidation(validationPoint);
      executionResults.validations.push(validationResult);

      if (!validationResult.passed) {
        console.error(`❌ Validation failed: ${validationPoint.pointId}`);
        throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
      }
    }

    executionResults.status = 'success';
    executionResults.endTime = new Date().toISOString();

    console.log('\n✅ Pipeline execution complete\n');

  } catch (error) {
    executionResults.status = 'failed';
    executionResults.error = error.message;
    executionResults.endTime = new Date().toISOString();

    console.error(`\n❌ Pipeline execution failed: ${error.message}\n`);

    // Attempt rollback
    console.log('\n🔄 Attempting rollback...\n');
    await executeRollback(executionPlan.rollbackPlan);
  }

  return executionResults;
}

async function executeStage(stage) {
  const result = {
    stageNumber: stage.stageNumber,
    repository: stage.repository,
    actions: [],
    success: true,
    error: null
  };

  for (const action of stage.actions) {
    const actionResult = await executeAction(action);
    result.actions.push(actionResult);

    if (!actionResult.success) {
      result.success = false;
      result.error = actionResult.error;
      break;
    }
  }

  return result;
}

async function executeAction(action) {
  // Execute based on action type
  switch (action.type) {
    case 'implementation':
      return await executeImplementation(action);

    case 'versioning':
      return await executeVersioning(action);

    case 'build':
      return await executeBuild(action);

    case 'dependency-update':
      return await executeDependencyUpdate(action);

    case 'install':
      return await executeInstall(action);

    case 'code-update':
      return await executeCodeUpdate(action);

    case 'consumer-update':
      return await executeConsumerUpdate(action);

    case 'validation':
      return await executeValidation(action);

    default:
      return {
        success: false,
        error: `Unknown action type: ${action.type}`
      };
  }
}
```

---

## Step 4: System Consistency Validation

### Comprehensive Validation

```javascript
async function validateSystemConsistency(executionResults) {
  console.log('\n🔍 Validating System Consistency...\n');

  const validationResults = {
    timestamp: new Date().toISOString(),
    checks: [],
    overallStatus: 'unknown'
  };

  // Check 1: All repositories involved are updated
  const repositoryUpdateCheck = await checkRepositoryUpdates(executionResults);
  validationResults.checks.push(repositoryUpdateCheck);

  // Check 2: Version alignment
  const versionAlignmentCheck = await checkVersionAlignment(executionResults);
  validationResults.checks.push(versionAlignmentCheck);

  // Check 3: Import consistency
  const importConsistencyCheck = await checkImportConsistency(executionResults);
  validationResults.checks.push(importConsistencyCheck);

  // Check 4: Build success
  const buildSuccessCheck = await checkBuildSuccess(executionResults);
  validationResults.checks.push(buildSuccessCheck);

  // Check 5: No breaking changes
  const breakingChangesCheck = await checkBreakingChanges(executionResults);
  validationResults.checks.push(breakingChangesCheck);

  // Determine overall status
  const allPassed = validationResults.checks.every(c => c.status === 'passed');
  validationResults.overallStatus = allPassed ? 'passed' : 'failed';

  console.log(`\n${validationResults.overallStatus === 'passed' ? '✅' : '❌'} System Consistency Validation: ${validationResults.overallStatus.toUpperCase()}\n`);

  return validationResults;
}
```

---

## 🚨 CRITICAL: Integration with Global Agent Workflow

### Where System Flow Discovery Fits

```
1. Agent Initialization
   ├─> Visible Repository Analysis
   ├─> Deep Repository Analysis
   └─> **NEW: System Flow Discovery** 🌊

2. Task Intake
   └─> Fetch Azure DevOps tasks

3. Planning
   └─> Analyze task requirements

4. Repository Impact Analysis
   ├─> Analyze affected repositories
   └─> **NEW: Select relevant system flow** 🌊

5. **NEW: Dynamic Pipeline Construction** ⚙️
   ├─> Build execution pipeline
   ├─> Customize for task
   └─> Generate execution plan

6. Execution
   ├─> Implement changes
   ├─> **NEW: Execute pipeline stages** ⚙️
   └─> **NEW: Follow system flow** 🌊

7. Pattern Consistency Verification

8. Testing & Self-Validation

9. **NEW: System Consistency Validation** ✅

10. PR Creation
```

---

## 🚨 CRITICAL: Update Global Agent Workflow

The main `global-agent-workflow.md` file must be updated to include System Flow Discovery.

**Add after Deep Repository Analysis:**

```markdown
## 🌊 System Flow Discovery (MANDATORY)

**CRITICAL: After repository analysis, the agent MUST discover the system flow.**

### What This Does

Builds a comprehensive understanding of:
- How changes flow across repositories
- Which repositories are sources, transformers, consumers
- What integration patterns exist
- What execution pipelines are required

### How It Works

1. **Identify Repository Roles**
   - Source repositories (shared libraries, models)
   - Transformer repositories (backend services)
   - Consumer repositories (frontend, mobile)
   - Orchestrator repositories (workflow engines)

2. **Detect Integration Patterns**
   - Import-based integration
   - API-based integration
   - Code generation
   - File synchronization

3. **Build Change Flow Graph**
   - For each source, trace how changes propagate
   - Identify all repositories involved
   - Determine the complete workflow

4. **Infer Execution Pipelines**
   - Group steps into stages
   - Estimate duration
   - Generate rollback plans

5. **Detect Validation Points**
   - After each pipeline
   - Cross-repository validation
   - System consistency checks

### Output

A System Flow Map that guides all future task execution.
```

**Add after Repository Impact Analysis:**

```markdown
## ⚙️ Dynamic Pipeline Construction (MANDATORY)

**CRITICAL: Before implementation, construct the execution pipeline.**

### What This Does

Builds a customized execution pipeline based on:
- The task requirements
- Affected repositories
- System flow map
- Integration patterns

### How It Works

1. **Identify Affected Repositories**
   - Which repositories are impacted
   - Impact level (high/medium/low)
   - Changes required

2. **Select Relevant Flow**
   - Choose appropriate system flow
   - Or generate ad-hoc flow

3. **Customize Flow for Task**
   - Add task-specific context
   - Generate implementation details

4. **Generate Execution Plan**
   - Define stages
   - Estimate duration
   - Identify validation points
   - Create rollback plan

### Output

An Execution Plan that guides the implementation process.
```

**Update Execution section:**

```markdown
## 🚀 Pipeline Execution (MANDATORY)

**CRITICAL: Execute the implementation according to the constructed pipeline.**

### What This Does

Executes the implementation plan:
- Follows the system flow
- Executes each stage in order
- Runs validations after each stage
- Handles errors with rollback

### How It Works

1. **Execute Stages**
   - Implement changes in each repository
   - Follow the dependency order
   - Update all consumers

2. **Run Validations**
   - Build success
   - Import resolution
   - No breaking changes
   - Integration tests

3. **Handle Failures**
   - Detect errors
   - Apply fixes
   - Re-validate
   - Rollback if needed

### Output

Execution results with full traceability.
```

**Add before PR Creation:**

```markdown
## ✅ System Consistency Validation (MANDATORY)

**CRITICAL: Before PR creation, validate system consistency.**

### What This Does

Ensures the entire system is consistent:
- All repositories updated
- Versions aligned
- Imports consistent
- All builds pass
- No breaking changes

### How It Works

1. **Check Repository Updates**
   - All affected repositories updated
   - No partial updates

2. **Check Version Alignment**
   - All consumers use correct versions
   - No version mismatches

3. **Check Import Consistency**
   - All imports resolve
   - No missing imports

4. **Check Build Success**
   - All repositories build
   - No build errors

5. **Check Breaking Changes**
   - No unintended breaking changes
   - Breaking changes documented

### Output

System consistency validation results.
```

---

## Examples

### Example 1: Add User Field

**Task:** Add `availabilityStatus` field to User model

**System Flow Discovery Output:**

```
🌊 System Flow Map

Source: harborSharedModels
├─ Exports: User, Job, Notification
└─ Consumers: harborUserSvc, harborJobSvc

Flow: user-model-change-flow
├─ Step 1: Update User model in harborSharedModels
├─ Step 2: Bump version in harborSharedModels
├─ Step 3: Update dependency in harborUserSvc
├─ Step 4: Install in harborUserSvc
├─ Step 5: Update API in harborUserSvc
├─ Step 6: Build harborUserSvc
├─ Step 7: Update API client in harborWebsite
├─ Step 8: Update UI in harborWebsite
└─ Step 9: System validation
```

**Dynamic Pipeline Construction:**

```
⚙️ Execution Pipeline

Stage 1: harborSharedModels
├─ Update User model
├─ Update exports
├─ Bump version
└─ No build required

Stage 2: harborUserSvc
├─ Update dependency version
├─ Install dependencies
├─ Update API endpoints
└─ Build service

Stage 3: harborWebsite
├─ Update API client
├─ Update UI components
└─ Build frontend

Validation: System consistency check
```

**Execution Results:**

```
✅ Stage 1: harborSharedModels - Complete
✅ Stage 2: harborUserSvc - Complete
✅ Stage 3: harborWebsite - Complete
✅ Validation: System consistency - Passed

Total Duration: 4m 32s
Status: SUCCESS
```

---

## Quick Reference

### System Flow Discovery Commands

- **When to run:** After repository analysis, before task execution
- **Input:** Repository analysis results
- **Output:** System Flow Map
- **Duration:** 10-30 seconds

### Pipeline Construction Commands

- **When to run:** After task analysis, before implementation
- **Input:** Task requirements, System Flow Map
- **Output:** Execution Plan
- **Duration:** 5-10 seconds

### Validation Commands

- **When to run:** After implementation, before PR creation
- **Input:** Execution results
- **Output:** Validation results
- **Duration:** 1-2 minutes

---

**End of System Flow Discovery & Dynamic Pipeline Construction**
