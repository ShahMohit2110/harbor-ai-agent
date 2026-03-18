# Cross-Repository Dependency Mapper

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Build comprehensive dependency graphs to understand how changes propagate across repositories

---

## 🎯 Core Philosophy

**A change in one repository often requires changes in others.**

The agent must understand:
- Which repositories depend on which
- How changes propagate through the system
- What the correct implementation order is
- Which repositories will be affected by a change

---

## Dependency Graph Construction

### Step 1: Scan All Repositories

```javascript
async function scanAllRepositories(workspace) {
  const repositories = [];

  for (const dir of workspace.directories) {
    if (isGitRepository(dir)) {
      const repo = await analyzeRepository(dir);
      repositories.push(repo);
    }
  }

  return repositories;
}
```

### Step 2: Extract Dependencies from Each Repository

```javascript
function extractRepositoryDependencies(repository) {
  const dependencies = {
    // Local dependencies (other repos in workspace)
    local: [],

    // External dependencies (npm packages)
    external: [],

    // Development dependencies
    dev: [],

    // Peer dependencies
    peer: []
  };

  // Read package.json
  const packageJson = readPackageJson(repository);

  // Extract local dependencies
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies
  };

  for (const [name, version] of Object.entries(allDeps)) {
    // Check if this is a local dependency
    if (isLocalDependency(name, workspace)) {
      dependencies.local.push({
        name,
        version,
        repository: findRepositoryByName(name, workspace)
      });
    } else {
      dependencies.external.push({ name, version });
    }
  }

  return dependencies;
}
```

### Step 3: Build Dependency Graph

```javascript
function buildDependencyGraph(repositories) {
  const graph = {
    // Nodes: repositories
    nodes: repositories.map(repo => ({
      id: repo.name,
      ...repo
    })),

    // Edges: dependencies
    edges: []
  };

  // Build edges
  for (const repo of repositories) {
    for (const dep of repo.dependencies.local) {
      graph.edges.push({
        from: repo.name,
        to: dep.repository.name,
        type: 'code-dependency',
        version: dep.version
      });
    }
  }

  return graph;
}
```

### Step 4: Detect API Dependencies

```javascript
function detectApiDependencies(repositories) {
  const apiDependencies = [];

  // For each repository, scan for API calls
  for (const repo of repositories) {
    if (repo.type === 'frontend' || repo.type === 'mobile') {
      const apiCalls = scanForApiCalls(repo);

      for (const apiCall of apiCalls) {
        const targetService = findServiceByApiPattern(apiCall, repositories);

        if (targetService) {
          apiDependencies.push({
            from: repo.name,
            to: targetService.name,
            type: 'api-dependency',
            apis: apiCall.apis
          });
        }
      }
    }
  }

  return apiDependencies;
}
```

### Step 5: Detect Data Model Dependencies

```javascript
function detectModelDependencies(repositories) {
  const modelDependencies = [];

  // For each repository, scan for model imports
  for (const repo of repositories) {
    const modelImports = scanForModelImports(repo);

    for (const modelImport of modelImports) {
      const sourceRepo = findRepositoryByImport(modelImport, repositories);

      if (sourceRepo) {
        modelDependencies.push({
          from: repo.name,
          to: sourceRepo.name,
          type: 'model-dependency',
          models: modelImport.models
        });
      }
    }
  }

  return modelDependencies;
}
```

### Step 6: Detect Shared Resource Dependencies

```javascript
function detectSharedResourceDependencies(repositories) {
  const resourceDependencies = [];

  // Scan for shared resources
  const sharedResources = [
    'translations',
    'configurations',
    'constants',
    'utilities',
    'types'
  ];

  for (const resource of sharedResources) {
    const consumers = repositories.filter(repo =>
      usesSharedResource(repo, resource)
    );

    if (consumers.length > 1) {
      resourceDependencies.push({
        type: 'shared-resource',
        resource,
        consumers: consumers.map(c => c.name)
      });
    }
  }

  return resourceDependencies;
}
```

---

## Dependency Graph Analysis

### Topological Sort for Implementation Order

```javascript
function getImplementationOrder(dependencyGraph) {
  // Kahn's algorithm for topological sort
  const sorted = [];
  const queue = [];

  // Find all nodes with no dependencies
  const inDegree = {};
  for (const node of dependencyGraph.nodes) {
    inDegree[node.id] = 0;
  }
  for (const edge of dependencyGraph.edges) {
    inDegree[edge.to]++;
  }

  // Start with nodes that have no incoming edges
  for (const node of dependencyGraph.nodes) {
    if (inDegree[node.id] === 0) {
      queue.push(node.id);
    }
  }

  // Process nodes
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    // Find all nodes that depend on current
    const dependents = dependencyGraph.edges
      .filter(e => e.from === current)
      .map(e => e.to);

    for (const dependent of dependents) {
      inDegree[dependent]--;
      if (inDegree[dependent] === 0) {
        queue.push(dependent);
      }
    }
  }

  return sorted;
}
```

### Detect Circular Dependencies

```javascript
function detectCircularDependencies(dependencyGraph) {
  const visited = new Set();
  const recursionStack = new Set();
  const cycles = [];

  function dfs(node, path) {
    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    const neighbors = dependencyGraph.edges
      .filter(e => e.from === node)
      .map(e => e.to);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, [...path]);
      } else if (recursionStack.has(neighbor)) {
        // Cycle detected
        const cycleStart = path.indexOf(neighbor);
        cycles.push([...path.slice(cycleStart), neighbor]);
      }
    }

    recursionStack.delete(node);
  }

  for (const node of dependencyGraph.nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id, []);
    }
  }

  return cycles;
}
```

### Calculate Ripple Effect

```javascript
function calculateRippleEffect(dependencyGraph, changedRepository) {
  const affected = new Set();
  const queue = [changedRepository];

  while (queue.length > 0) {
    const current = queue.shift();

    // Find all repositories that depend on current
    const dependents = dependencyGraph.edges
      .filter(e => e.to === current)
      .map(e => e.from);

    for (const dependent of dependents) {
      if (!affected.has(dependent)) {
        affected.add(dependent);
        queue.push(dependent);
      }
    }
  }

  return Array.from(affected);
}
```

---

## Change Impact Analysis

### Analyze Change Impact

```javascript
function analyzeChangeImpact(dependencyGraph, changedRepository, changeType) {
  const impact = {
    // Direct impact
    direct: [],

    // Transitive impact
    transitive: [],

    // Required actions
    actions: [],

    // Implementation order
    order: []
  };

  // Calculate direct dependents
  const directDependents = dependencyGraph.edges
    .filter(e => e.to === changedRepository)
    .map(e => e.from);

  impact.direct = directDependents;

  // Calculate transitive dependents
  const transitiveDependents = new Set();
  for (const dependent of directDependents) {
    const transitive = calculateRippleEffect(dependencyGraph, dependent);
    transitive.forEach(t => transitiveDependents.add(t));
  }

  impact.transitive = Array.from(transitiveDependents);

  // Determine required actions based on change type
  switch (changeType) {
    case 'model-change':
      impact.actions = [
        'Update model in shared repository',
        'Update version in package.json',
        'Dependent services: update dependency version',
        'Dependent services: run install',
        'Dependent services: update imports if needed'
      ];
      break;

    case 'api-change':
      impact.actions = [
        'Update API endpoints in service',
        'Frontend: update API client',
        'Frontend: update components using API',
        'Mobile: update API client',
        'Mobile: update screens using API'
      ];
      break;

    case 'breaking-change':
      impact.actions = [
        'Update version (major bump)',
        'Update CHANGELOG.md',
        'ALL dependent services: update version',
        'ALL dependent services: update code for breaking changes',
        'ALL dependent services: run install',
        'ALL dependent services: test integration'
      ];
      break;
  }

  // Calculate implementation order
  impact.order = getImplementationOrder(dependencyGraph);

  return impact;
}
```

---

## Dependency Visualization

### Generate Dependency Graph

```javascript
function generateDependencyGraphViz(dependencyGraph) {
  let dot = 'digraph DependencyGraph {\n';
  dot += '  rankdir=LR;\n';
  dot += '  node [shape=box];\n\n';

  // Add nodes
  for (const node of dependencyGraph.nodes) {
    dot += `  "${node.id}" [label="${node.id}\\n${node.type}"];\n`;
  }

  // Add edges
  for (const edge of dependencyGraph.edges) {
    dot += `  "${edge.from}" -> "${edge.to}" [label="${edge.type}"];\n`;
  }

  dot += '}\n';

  return dot;
}
```

### Generate Layered View

```javascript
function generateLayeredView(dependencyGraph) {
  const layers = {
    shared: [],
    backend: [],
    frontend: [],
    mobile: [],
    infrastructure: []
  };

  // Classify repositories into layers
  for (const node of dependencyGraph.nodes) {
    switch (node.type) {
      case 'Shared Library':
        layers.shared.push(node.id);
        break;
      case 'Backend Service':
        layers.backend.push(node.id);
        break;
      case 'Frontend Web':
        layers.frontend.push(node.id);
        break;
      case 'Mobile App':
        layers.mobile.push(node.id);
        break;
      case 'Infrastructure':
        layers.infrastructure.push(node.id);
        break;
    }
  }

  return layers;
}
```

---

## Practical Application

### Example: Harbor Workspace

```javascript
const harborDependencyGraph = {
  nodes: [
    { id: 'harborSharedModels', type: 'Shared Library' },
    { id: 'harborUserSvc', type: 'Backend Service' },
    { id: 'harborJobSvc', type: 'Backend Service' },
    { id: 'harborNotificationSvc', type: 'Backend Service' },
    { id: 'harborWebsite', type: 'Frontend Web' },
    { id: 'harborApp', type: 'Mobile App' },
    { id: 'harborApiGateway', type: 'Gateway' }
  ],

  edges: [
    { from: 'harborUserSvc', to: 'harborSharedModels', type: 'code-dependency' },
    { from: 'harborJobSvc', to: 'harborSharedModels', type: 'code-dependency' },
    { from: 'harborNotificationSvc', to: 'harborSharedModels', type: 'code-dependency' },
    { from: 'harborWebsite', to: 'harborUserSvc', type: 'api-dependency' },
    { from: 'harborWebsite', to: 'harborJobSvc', type: 'api-dependency' },
    { from: 'harborApp', to: 'harborUserSvc', type: 'api-dependency' },
    { from: 'harborApp', to: 'harborJobSvc', type: 'api-dependency' }
  ]
};

// Implementation order
const implementationOrder = getImplementationOrder(harborDependencyGraph);
// Result: ['harborSharedModels', 'harborUserSvc', 'harborJobSvc', 'harborNotificationSvc', 'harborWebsite', 'harborApp', 'harborApiGateway']

// Impact analysis for harborSharedModels change
const impact = analyzeChangeImpact(harborDependencyGraph, 'harborSharedModels', 'model-change');
// Result:
// {
//   direct: ['harborUserSvc', 'harborJobSvc', 'harborNotificationSvc'],
//   transitive: ['harborWebsite', 'harborApp'],
//   actions: [
//     'Update model in harborSharedModels',
//     'Update version in package.json',
//     'harborUserSvc, harborJobSvc, harborNotificationSvc: update dependency version',
//     'harborUserSvc, harborJobSvc, harborNotificationSvc: run install',
//     'harborWebsite, harborApp: update API calls if needed'
//   ]
// }
```

---

## 🚨 CRITICAL: Dependency Graph Must Be Built Before Implementation

**ABSOLUTE RULE:**

```
DO NOT implement changes without building the dependency graph first.

Implementation WITHOUT dependency understanding = BROKEN SYSTEM
```

**Dependency Analysis Checklist:**

- [ ] All repositories scanned
- [ ] Code dependencies extracted
- [ ] API dependencies detected
- [ ] Model dependencies detected
- [ ] Shared resource dependencies detected
- [ ] Dependency graph built
- [ ] Implementation order calculated
- [ ] Circular dependencies checked (should be none)
- [ ] Ripple effect calculated for proposed changes

**Only when ALL checks pass → Continue to implementation**

---

**End of Cross-Repository Dependency Mapper**
