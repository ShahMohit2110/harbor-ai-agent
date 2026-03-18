# System Flow Discovery - Quick Reference

**Version:** 6.0.0
**Last Updated:** 2026-03-18

---

## 🚀 Quick Start

### What is System Flow Discovery?

System Flow Discovery transforms the Harbor AI Agent from a repository-level operator to a **system-aware engineering agent** that understands how the entire system operates.

### Key Concepts

| Concept | Description |
|---------|-------------|
| **System Flow Map** | A dynamic representation of how changes flow across repositories |
| **Repository Roles** | Sources, Transformers, Consumers |
| **Change Flows** | The path a change takes through the system |
| **Execution Pipeline** | Stages, steps, validation points for implementing a change |

---

## 🌊 System Flow Discovery Phases

### Phase 1: Identify Repository Roles

**What:** Classify each repository by its role in the system

**Roles:**
- **Sources** - Where changes originate (shared libraries, models)
- **Transformers** - Services that transform data (backend services)
- **Consumers** - Applications that consume data (frontend, mobile)
- **Orchestrators** - Workflow engines, coordinators

**Example:**
```javascript
{
  sources: [
    { name: "harborSharedModels", type: "sharedLibrary" }
  ],
  transformers: [
    { name: "harborUserSvc", type: "backendService" }
  ],
  consumers: [
    { name: "harborWebsite", type: "frontend" }
  ]
}
```

### Phase 2: Detect Integration Patterns

**What:** Identify how repositories integrate with each other

**Patterns:**
- **Import-based** - Direct imports (TypeScript/JavaScript)
- **API-based** - REST/GraphQL APIs
- **Code generation** - Generated from schemas
- **File sync** - File synchronization

**Example:**
```javascript
{
  repository: "harborUserSvc",
  consumesFrom: [
    { source: "harborSharedModels", type: "import-based" }
  ],
  producesFor: [
    { consumer: "harborWebsite", type: "api-based" }
  ]
}
```

### Phase 3: Build Change Flow Graph

**What:** For each source, trace how changes propagate

**Example:**
```javascript
{
  flowId: "user-model-change-flow",
  trigger: "User model modified",
  steps: [
    { step: 1, repository: "harborSharedModels", action: "Update model" },
    { step: 2, repository: "harborSharedModels", action: "Version update" },
    { step: 3, repository: "harborUserSvc", action: "Update dependency" },
    { step: 4, repository: "harborUserSvc", action: "Update API" },
    { step: 5, repository: "harborWebsite", action: "Update UI" }
  ]
}
```

### Phase 4: Infer Execution Pipelines

**What:** Group flow steps into executable stages

**Example:**
```javascript
{
  "user-model-change-flow": {
    stages: [
      {
        stageNumber: 1,
        repository: "harborSharedModels",
        actions: ["Update model", "Version update"]
      },
      {
        stageNumber: 2,
        repository: "harborUserSvc",
        actions: ["Update dependency", "Update API", "Build"]
      },
      {
        stageNumber: 3,
        repository: "harborWebsite",
        actions: ["Update UI", "Build"]
      }
    ]
  }
}
```

---

## ⚙️ Dynamic Pipeline Construction

### When to Run

During the **Planning Phase**, after task intake and before implementation.

### Steps

1. **Identify Affected Repositories**
   ```bash
   Which repositories are impacted by this task?
   ```

2. **Select Relevant Flow**
   ```bash
   Which system flow matches this change?
   ```

3. **Customize for Task**
   ```bash
   Add task-specific context and details
   ```

4. **Generate Execution Plan**
   ```bash
   Create stages, steps, validation points
   ```

### Output

An Execution Plan with:
- **Stages** - High-level phases
- **Steps** - Individual actions
- **Validation Points** - Where to verify
- **Rollback Plan** - How to revert

---

## 🚀 Pipeline Execution

### How It Works

```javascript
for (const stage of executionPlan.stages) {
  // Execute each stage
  const result = await executeStage(stage);

  if (!result.success) {
    // Rollback on failure
    await executeRollback(executionPlan.rollbackPlan);
    break;
  }

  // Validate after each stage
  await validate(stage.validationPoints);
}
```

### What Happens

1. **Navigate to repository**
2. **Load repository context**
3. **Implement changes**
4. **Run validation**
5. **Continue to next stage**

---

## ✅ System Consistency Validation

### What It Checks

| Check | Description |
|-------|-------------|
| **Repository Updates** | All affected repositories updated |
| **Version Alignment** | All consumers use correct versions |
| **Import Consistency** | All imports resolve correctly |
| **Build Success** | All repositories build successfully |
| **Breaking Changes** | No unintended breaking changes |

### When It Runs

- After implementation
- Before PR creation
- After testing

---

## 📋 Quick Checklist

### For Agent Users

**Before Starting:**
- [ ] Agent initialized
- [ ] System Flow Map generated
- [ ] Task loaded

**During Planning:**
- [ ] Affected repositories identified
- [ ] Relevant flow selected
- [ ] Execution plan generated

**During Execution:**
- [ ] Pipeline stages executing
- [ ] Validations passing
- [ ] No failures

**After Completion:**
- [ ] System consistency validated
- [ ] All repositories updated
- [ ] Ready for PR

### For Agent Developers

**When Adding New Features:**
- [ ] Update System Flow Detection
- [ ] Add integration patterns
- [ ] Update pipeline construction
- [ ] Add validation checks

**When Testing:**
- [ ] Test system flow discovery
- [ ] Test pipeline construction
- [ ] Test pipeline execution
- [ ] Test validation logic

---

## 🔧 Common Patterns

### Pattern 1: Shared Library Update

**Flow:** Source → Transformers → Consumers

**Example:**
```
harborSharedModels (source)
  → harborUserSvc (transformer)
    → harborWebsite (consumer)
```

**Pipeline:**
1. Update source
2. Update transformers
3. Update consumers

### Pattern 2: Backend API Change

**Flow:** Backend → Frontend → Mobile

**Example:**
```
harborUserSvc (backend)
  → harborWebsite (frontend)
  → harborApp (mobile)
```

**Pipeline:**
1. Update backend API
2. Update frontend API client
3. Update mobile API client

### Pattern 3: Translation Update

**Flow:** Translation Source → Consumers

**Example:**
```
harborTranslations (source)
  → harborWebsite (consumer)
  → harborApp (consumer)
```

**Pipeline:**
1. Update translations
2. Update all consumers

---

## 🚨 Troubleshooting

### Issue: No Flow Found

**Symptom:** "No relevant flow found for this task"

**Solution:**
- Agent generates ad-hoc flow
- Flow may be less optimized
- Consider adding flow to System Flow Map

### Issue: Validation Failed

**Symptom:** "System consistency validation failed"

**Solution:**
- Check which validation failed
- Fix the issue
- Re-run validation
- Proceed only when all pass

### Issue: Pipeline Execution Failed

**Symptom:** "Stage X failed: error message"

**Solution:**
- Check error message
- Fix the issue in current repository
- Re-run stage
- Or rollback and start over

---

## 📚 Related Documentation

- **System Flow Discovery:** `workflows/system-flow-discovery.md`
- **Global Agent Workflow:** `workflows/global-agent-workflow.md` (v6.0.0)
- **Upgrade Summary:** `SYSTEM_FLOW_DISCOVERY_UPGRADE.md`
- **Package Propagation:** `workflows/package-propagation-workflow.md`
- **Cross-Repository Sync:** `workflows/cross-repository-synchronization.md`

---

## 🎯 Best Practices

### For Users

1. **Let the agent discover the system flow** - Don't skip initialization
2. **Review the execution plan** - Understand what will happen
3. **Trust the pipeline** - It's built from system analysis
4. **Check validation results** - Ensure system consistency

### For Developers

1. **Detect patterns dynamically** - Don't hardcode
2. **Build flexible pipelines** - Handle edge cases
3. **Validate comprehensively** - Check system-wide consistency
4. **Provide clear feedback** - Show what's happening

---

**End of Quick Reference**
