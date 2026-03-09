# harborSharedModels Special Workflow

**🚨 CRITICAL: These rules apply ONLY to `harborSharedModels` service. All other services follow the standard Harbor AI workflow.**

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

## Examples

**Example 1: Adding a field to an existing model**
```bash
# Edit models/User.ts to add new field
# Update package.json: 1.0.0 → 1.0.1
git checkout -b update/user-model-add-phone
git add .
git commit -m "feat: Add phone field to User model"
git push origin update/user-model-add-phone
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
git commit -m "feat: Add JobApplication shared model"
git push origin add/job-application-model
# NO PR created
```
