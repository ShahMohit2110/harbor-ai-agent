# harborSharedModels Special Workflow

**🚨 CRITICAL: These rules apply ONLY to `harborSharedModels` service. All other services follow the standard Harbor AI workflow.**

---

## 🧪 TESTING PHASE CONFIGURATION (2025-03-18)

**Current Mode:** **TESTING** 🧪

**Git Operations:** **COMPLETELY DISABLED** ❌

During testing phase, this workflow:
- ✅ Performs all implementation work
- ✅ Verifies builds succeed
- ✅ Executes validation
- ❌ **NOT** create Git branches
- ❌ **NOT** commit changes
- ❌ **NOT** push to remote repositories

**Workflow Behavior:**
After completing implementation and validation, the agent **STOPS** without Git operations.

**Purpose:**
- Prevent unwanted commits or pushes during testing
- Allow safe validation of code changes locally
- Enable testing without manual reverts

---

## Purpose

`harborSharedModels` is a **shared model library** containing common data models used across multiple Harbor services. Any change requires **version updates and strict handling**.

---

## Model Change Scenarios

### Case 1: Updating an Existing Model

When modifying an **existing model file** (adding/removing fields or updating logic):

**Steps:**
1. Make the required changes in the model file
2. Open `package.json`
3. **Increment the version number** to the next version

**Mandatory:** Version update in `package.json` is required whenever a model is modified.

---

### Case 2: Adding a New Model

When **creating a new model file**:

**Steps:**
1. Create the new model file inside the `models` folder
2. Add an export entry in `models/index.ts`
3. Register the model in `src/index.ts`
4. **Update the version in `package.json`**

This ensures the model becomes available to all services consuming the shared package.

---

## Git Workflow Rules (DIFFERENT from standard Harbor workflow)

For `harborSharedModels`:

1. Create a **new branch from the `main` branch** (not dev)
2. Apply all required model changes
3. Commit and push changes to the new branch
4. **DO NOT CREATE A PULL REQUEST** - only push to branch

**Important:** This is different from all other services which create PRs to the `dev` branch.

---

## Execution Restrictions

For `harborSharedModels` service:
- ❌ Do **NOT run tests**
- ❌ Do **NOT run `npm start`**
- ✅ Only **update and version** the service

---

## Scope Limitation

These rules apply **EXCLUSIVELY** to `harborSharedModels`.

For all other services (harborUserSvc, harborJobSvc, harborNotificationSvc, harborSocketSvc, harborGateway):
- Continue using the **standard Harbor AI workflow**
- Continue generating **Pull Requests to the `dev` branch**
- Continue running tests and validations
- Follow workflows in `workflows/` directory (planning.md → execution.md → testing.md → pr.md)

---

## Detection Logic

When a task involves `harborSharedModels`, the agent will:
1. Detect the service name in the task description or codebase
2. Apply this special workflow instead of the standard Harbor AI workflow
3. Skip testing, PR creation, and Azure DevOps ticket closure
4. Only update models and version numbers

---

## 🚨 CRITICAL: Dependency Update Rules for Other Services

**When harborSharedModels version is updated, ANY service that depends on it MUST reference the NEW VERSION NUMBER, NOT a file path.**

### Required Behavior

**Scenario:** After updating `harborSharedModels/package.json` version (e.g., from `1.2.4` to `1.2.5`), when working on another service that depends on `harbor-shared-models`:

**❌ WRONG:**
```json
"harbor-shared-models": "file:../harborSharedModels"
```

**✅ CORRECT:**
```json
"harbor-shared-models": "1.2.5"
```

### Mandatory Dependency Update Process

When updating a service that depends on `harbor-shared-models`:

1. **Read the current version** from `harborSharedModels/package.json`
2. **Update the dependency** in the other service's `package.json` to use that EXACT version number
3. **NEVER use** `file:../harborSharedModels` or any other file path reference
4. **Run `npm install`** in the service directory to update node_modules

### Example Workflow

```bash
# Step 1: After updating harborSharedModels version
cd harborSharedModels
# Updated package.json version to 1.2.5

# Step 2: When working on another service (e.g., harborUserSvc)
cd ../harborUserSvc

# Step 3: Update package.json dependency
# "harbor-shared-models": "1.2.5"  ← Use the exact version number

# Step 4: Install the updated dependency
npm install

# Step 5: Continue with implementation
```

### Services That Depend on harbor-shared-models

The following services typically depend on `harbor-shared-models` and MUST follow this rule:
- `harborUserSvc` (User Service)
- `harborJobSvc` (Job Service)
- `harborNotificationSvc` (Notification Service)
- `harborSocketSvc` (Socket Service)
- `harborGateway` (API Gateway)

**Rule:** Whenever any of these services are updated after a `harborSharedModels` version change, their `package.json` MUST reference the new version number.

### Why This Rule Exists

1. **Version Tracking:** Using version numbers instead of file paths ensures proper dependency management
2. **Reproducibility:** Exact version numbers guarantee reproducible builds
3. **Deployment:** Production deployments require published package versions, not local file references
4. **Dependency Resolution:** npm properly resolves version numbers but may have issues with file paths in production
5. **Semantic Versioning:** Following semantic versioning practices requires using version numbers

### Verification Checklist

After updating dependencies, verify:
- [ ] `harborSharedModels/package.json` version has been incremented
- [ ] Other services' `package.json` contains the new version number (NOT `file:...`)
- [ ] `npm install` has been run in the affected service
- [ ] No `file:../harborSharedModels` references exist in any service's `package.json`

## Examples

**Example 1: Adding a field to an existing model**
```bash
# Edit models/User.ts to add new field
# Update package.json: 1.0.0 → 1.0.1
git checkout -b update/user-model-add-phone
git add .

# ⚠️ TESTING MODE: Git commit/push DISABLED
# git commit -m "feat: Add phone field to User model"
# git push origin update/user-model-add-phone
# NO PR created
```

**Example 2: Creating a new model**
```bash
# Create models/JobApplication.ts
# Add export to models/index.ts
# Register in src/index.ts
# Update package.json: 1.0.0 → 1.1.0
git checkout -b add/job-application-model
git add .

# ⚠️ TESTING MODE: Git commit/push DISABLED
# git commit -m "feat: Add JobApplication shared model"
# git push origin add/job-application-model
# NO PR created
```
