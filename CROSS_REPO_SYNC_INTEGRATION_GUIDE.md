# Cross-Repository Synchronization - Integration Guide

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Practical guide for how the agent uses synchronization in real scenarios

---

## How the Agent Uses Synchronization

### Real-World Scenario: Adding User Availability Feature

Let's walk through exactly what the agent will do when given this task.

---

## Step-by-Step Execution Flow

### User Input

```
User: "start harbor-ai"
```

### Agent Startup Phase

```
Agent: ## 🔍 Beginning Deep Repository Analysis

Workspace: /Users/mohitshah/Documents/HarborService/
Repositories Discovered: 9

## 📊 Repository Analysis Progress

[Table shows all repos being analyzed...]

## ✅ Repository Analysis Complete

### 🔗 Synchronization Relationships Detected

**Source: harborSharedModels** (Shared Library)
- Type: Model Repository + Shared Library
- Consumers: harborUserSvc, harborJobSvc, harborNotificationSvc, harborSocketSvc

[Other relationships displayed...]
```

---

### Task Processing Phase

```
Agent: Fetching tasks from Azure DevOps...
Found task: "Add user availability status feature"
Priority: High
```

---

### Planning Phase (NEW: Sync Analysis)

```
Agent: ## 📋 Planning: Add User Availability Status Feature

### Repository Impact Analysis

**Detected Synchronization Dependencies:**

1. **Source Repository:** harborSharedModels
   - Type: Shared Library (Model definitions)
   - Impact: HIGH - Must add User.availabilityStatus field
   - Actions: Add field, update exports, bump version

2. **Consumer Repositories:**
   a. **harborUserSvc** (Direct Import)
      - Impact: HIGH - Must update to use new field
      - Actions: Update dependency version, install, add API

   b. **harborJobSvc** (Direct Import)
      - Impact: HIGH - Must update to use new field
      - Actions: Update dependency version, install, use field

   c. **harborWebsite** (API Consumption)
      - Impact: MEDIUM - Must display availability
      - Actions: Update API client, add UI components

   d. **harborApp** (API Consumption)
      - Impact: MEDIUM - Must display availability
      - Actions: Update API client, add mobile UI

**Implementation Order:**
1. harborSharedModels → 2. harborUserSvc → 3. harborJobSvc → 4. harborWebsite → 5. harborApp
```

---

### Execution Phase (NEW: Automatic Sync)

```
Agent: ## 🔨 Executing Changes

### Repository 1/5: harborSharedModels

📝 Adding User.availabilityStatus field...
✅ Added field to User model
✅ Updated export in models/index.ts
✅ Bumped version to 1.2.5

**Next: Synchronizing consumers...**

---

### Repository 2/5: harborUserSvc

🔄 Synchronizing with harborSharedModels...

📦 Updating dependency...
✅ Updated "harbor-shared-models": "1.2.5"

📥 Running install...
✅ npm install complete

🔨 Implementing availability feature...
✅ Added getAvailability() method to UserService
✅ Added setAvailability() method to UserService
✅ Created GET /user/:id/availability endpoint
✅ Created PUT /user/:id/availability endpoint

✅ harborUserSvc synchronized successfully

---

### Repository 3/5: harborJobSvc

🔄 Synchronizing with harborSharedModels...

📦 Updating dependency...
✅ Updated "harbor-shared-models": "1.2.5"

📥 Running install...
✅ npm install complete

🔨 Updating to use new field...
✅ Updated JobService to filter by availability
✅ Updated job creation logic to check availability

✅ harborJobSvc synchronized successfully

---

### Repository 4/5: harborWebsite

🔄 Synchronizing with harborSharedModels/harborUserSvc...

📦 Updating dependency...
✅ Updated "harbor-shared-models": "1.2.5"

📥 Running install...
✅ npm install complete

🔨 Updating API client...
✅ Added getAvailability() method to user API client
✅ Added setAvailability() method to user API client

🎨 Updating UI...
✅ Created AvailabilityStatus component
✅ Updated UserProfile page to display availability
✅ Updated Redux slice to store availability status

✅ harborWebsite synchronized successfully

---

### Repository 5/5: harborApp

🔄 Synchronizing with harborSharedModels/harborUserSvc...

📦 Updating dependency...
✅ Updated "harbor-shared-models": "1.2.5"

📥 Running install...
✅ npm install complete

🔨 Updating API client...
✅ Added getAvailability() method to user API client
✅ Added setAvailability() method to user API client

📱 Updating mobile UI...
✅ Created AvailabilityStatusScreen component
✅ Updated ProfileScreen to display availability
✅ Updated Redux slice to store availability status

✅ harborApp synchronized successfully

---

## ✅ Synchronization Complete

**Summary:**
- Source repository updated: 1
- Consumer repositories synchronized: 4
- Total repositories affected: 5
- All dependencies updated and aligned
```

---

### Validation Phase (NEW: Sync Validation)

```
Agent: ## 🔍 Validating Synchronization

### Checking Source Repository...

✅ harborSharedModels
  - Field added to User model
  - Export updated in index.ts
  - Version bumped to 1.2.5
  - Build passes

### Checking Consumer Repositories...

✅ harborUserSvc
  - Dependency version: 1.2.5 ✓
  - Imports resolve correctly ✓
  - API endpoints added ✓
  - Build passes ✓

✅ harborJobSvc
  - Dependency version: 1.2.5 ✓
  - Imports resolve correctly ✓
  - Logic updated ✓
  - Build passes ✓

✅ harborWebsite
  - Dependency version: 1.2.5 ✓
  - Imports resolve correctly ✓
  - API client updated ✓
  - UI components added ✓
  - Build passes ✓

✅ harborApp
  - Dependency version: 1.2.5 ✓
  - Imports resolve correctly ✓
  - API client updated ✓
  - Mobile UI added ✓
  - Build passes ✓

### Version Alignment Check...

✅ All repositories use version 1.2.5
✅ No file path references found
✅ Versions consistent across all consumers

### Import Consistency Check...

✅ All imports resolve correctly
✅ No missing imports
✅ No unused imports
✅ Export/import structure consistent

### Breaking Change Check...

✅ No breaking changes introduced
✅ Backward compatibility maintained

## ✅ Synchronization Validation Passed

All repositories are properly synchronized and aligned.
```

---

### Testing Phase

```
Agent: ## 🧪 Running Tests

[Tests run for all repositories...]

All tests passed ✅
```

---

### PR Creation Phase

```
Agent: ## 🔗 Creating Pull Requests

Creating PRs for all affected repositories...

✅ harborSharedModels: PR #123 created
✅ harborUserSvc: PR #124 created
✅ harborJobSvc: PR #125 created
✅ harborWebsite: PR #126 created
✅ harborApp: PR #127 created
```

---

### Completion

```
Agent: ## ✅ Task Complete

Feature: User Availability Status
Status: Fully implemented across all repositories
PRs: 5 pull requests created
Ticket: Marked as complete

**Summary:**
- Source repository updated with new field
- All 4 consumer repositories synchronized
- All versions aligned to 1.2.5
- All implementations consistent
- All builds passing
- All tests passing

**No manual cleanup required.**
```

---

## Comparison: Before vs After

### Before Enhancement (Old Behavior)

```
Agent: ## 🔨 Executing Changes

### Repository 1/1: harborUserSvc

📝 Adding User.availabilityStatus field...
✅ Added field to User.ts
✅ Added API endpoints

## ✅ Implementation Complete

[User discovers issues:]
- harborSharedModels not updated ❌
- harborJobSvc not updated ❌
- harborWebsite not updated ❌
- harborApp not updated ❌
- System is inconsistent ❌
```

**Result:** Broken system, manual cleanup required

---

### After Enhancement (New Behavior)

```
Agent: ## 🔨 Executing Changes

### Repository 1/5: harborSharedModels
[Updates and syncs all 5 repositories]

## ✅ Synchronization Complete
## ✅ Validation Passed

[Result:]
- All repositories consistent ✅
- All versions aligned ✅
- All builds passing ✅
- No manual cleanup ✅
```

**Result:** Complete implementation, no issues

---

## Error Handling

### If Validation Fails

```
Agent: ## ❌ Validation Failed

### Error: Version Mismatch

harborJobSvc is using version 1.2.4, should be 1.2.5

### Fixing...

📦 Updating harborJobSvc dependency...
✅ Updated "harbor-shared-models": "1.2.5"
✅ Ran npm install

### Re-validating...

✅ All versions now aligned
✅ Synchronization complete

## ✅ Task Complete
```

---

## Key Features

### 1. Automatic Detection

The agent automatically detects:
- ✅ Source-of-truth repositories
- ✅ All dependent consumers
- ✅ Integration patterns
- ✅ Required synchronization actions

### 2. Dependency Order Execution

The agent automatically implements in correct order:
- ✅ Source repositories first
- ✅ Consumers in dependency order
- ✅ Respects all relationships

### 3. Pattern Following

The agent follows existing patterns:
- ✅ Direct import → version + install
- ✅ API consumption → client + UI
- ✅ Code generation → regenerate
- ✅ File sync → sync files

### 4. Complete Validation

The agent validates everything:
- ✅ All consumers updated
- ✅ Version alignment
- ✅ Import consistency
- ✅ No breaking changes
- ✅ All builds pass

---

## Rules for the Agent

### 🚨 NEVER Skip These Steps

1. **NEVER** assume a repository is standalone
2. **NEVER** make changes without checking for dependencies
3. **NEVER** skip consumer synchronization
4. **NEVER** proceed without validation
5. **NEVER** leave system in inconsistent state

### ✅ ALWAYS Follow These Steps

1. **ALWAYS** analyze repository relationships
2. **ALWAYS** detect synchronization dependencies
3. **ALWAYS** implement in dependency order
4. **ALWAYS** synchronize all consumers
5. **ALWAYS** validate complete synchronization

---

## Example Scenarios

### Scenario 1: Add Field to Shared Model

**Task:** Add `phoneNumber` to User model

**Agent Action:**
1. Detect harborSharedModels as source
2. Add field to User model
3. Identify 4 consumers
4. Sync all consumers
5. Validate all updated
6. Create 5 PRs

**Result:** Complete implementation ✅

---

### Scenario 2: Add New Shared Model

**Task:** Add `Device` model for multi-device support

**Agent Action:**
1. Detect harborSharedModels as source
2. Create Device model
3. Add export
4. Identify consumers that need Device
5. Sync consumers (add usage)
6. Validate
7. Create PRs

**Result:** Complete implementation ✅

---

### Scenario 3: Update Translation

**Task:** Add new translation key "maintenance_mode"

**Agent Action:**
1. Detect harborTranslations as source
2. Add key to all locale files
3. Identify consumers (harborWebsite, harborApp)
4. Sync locale files to consumers
5. Update usage in consumers
6. Validate
7. Create PRs

**Result:** Complete implementation ✅

---

### Scenario 4: Backend API Change

**Task:** Add new API endpoint in harborUserSvc

**Agent Action:**
1. Detect harborUserSvc as affected service
2. Add API endpoint
3. Identify frontend consumers (harborWebsite, harborApp)
4. Sync API clients in consumers
5. Add UI components
6. Validate
7. Create PRs

**Result:** Complete implementation ✅

---

## Performance Notes

### Time Breakdown

**Task: Add field to shared model**

| Step | Time | Notes |
|------|------|-------|
| Detect relationships | 5-10s | One-time at startup |
| Implement in source | 1-2 min | Add field, bump version |
| Sync consumer 1 | 30-60s | Version + install + implementation |
| Sync consumer 2 | 30-60s | Version + install + usage |
| Sync consumer 3 | 1-2 min | Version + install + API + UI |
| Sync consumer 4 | 1-2 min | Version + install + API + mobile UI |
| Validate | 10-20s | Check all repos |
| **Total** | **4-8 min** | Complete, consistent implementation |

**Without sync:** 1-2 min + hours of manual cleanup

**ROI:** 2-3x more time upfront, 100x less time fixing issues

---

## Conclusion

The Harbor AI Agent now:

1. ✅ Detects synchronization relationships automatically
2. ✅ Identifies all affected repositories
3. ✅ Implements in correct dependency order
4. ✅ Synchronizes all consumers automatically
5. ✅ Validates complete synchronization
6. ✅ Never leaves system in inconsistent state

**This ensures complete, consistent implementations across all repositories, every time.**

---

**End of Integration Guide**
