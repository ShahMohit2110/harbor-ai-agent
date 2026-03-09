# Harbor AI Agent Memory

**Last Updated:** 2026-03-09

## harborSharedModels Special Workflow 🚨

**CRITICAL: These rules apply ONLY to `harborSharedModels` service. All other services follow the standard Harbor AI workflow.**

### Purpose
`harborSharedModels` is a **shared model library** containing common data models used across multiple Harbor services. Any change requires **version updates and strict handling**.

### Case 1: Updating an Existing Model
When modifying an **existing model file** (adding/removing fields or updating logic):
1. Make the required changes in the model file
2. Open `package.json`
3. **Increment the version number** to the next version

**Mandatory:** Version update in `package.json` is required whenever a model is modified.

### Case 2: Adding a New Model
When **creating a new model file**:
1. Create the new model file inside the `models` folder
2. Add an export entry in `models/index.ts`
3. Register the model in `src/index.ts`
4. **Update the version in `package.json`**

### Git Workflow Rules (DIFFERENT from standard Harbor workflow)
For `harborSharedModels`:
1. Create a **new branch from the `main` branch** (not dev)
2. Apply all required model changes
3. Commit and push changes to the new branch
4. **DO NOT CREATE A PULL REQUEST** - only push to branch

### Execution Restrictions
For `harborSharedModels` service:
- ❌ Do **NOT run tests**
- ❌ Do **NOT run `npm start`**
- ✅ Only **update and version** the service

### Scope Limitation
These rules apply **EXCLUSIVELY** to `harborSharedModels`.

For all other services (harborUserSvc, harborJobSvc, harborNotificationSvc, harborSocketSvc, harborGateway):
- Continue using the **standard Harbor AI workflow**
- Continue generating **Pull Requests to the `dev` branch**
- Continue running tests and validations

---

## Project Structure

**Working Directory:** `/Users/mohitshah/Documents/HarborService/harbor-ai`

This is the documentation directory. Code implementations go in service directories:
- **harborUserSvc** (User Service - Port 3001)
- **harborJobSvc** (Job Service - Port 3004)
- **harborNotificationSvc** (Notification Service - Port 3003)
- **harborSocketSvc** (Socket Service)
- **harborGateway** (API Gateway - Port 7000)
- **harborSharedModels** (Shared Model Library) - Uses special workflow (see above)

**CRITICAL:** Never create .ts or package.json files in harbor-ai directory. Always navigate to the correct service directory before implementing.

---

## Key Documentation Files

- `workflows/harbor-shared-models-workflow.md` - **SPECIAL workflow for harborSharedModels**
- `workflows/ai-workflow.md` - Master workflow document
- `workflows/planning.md` - Planning template
- `workflows/execution.md` - Execution workflow
- `workflows/testing.md` - Testing workflow
- `workflows/pr.md` - Pull Request workflow
- `tools/azure-devops-fetch.md` - Fetch Azure DevOps tasks
- `tools/azure-devops-update-ticket.md` - Update tickets to "Closed"
- `architecture/service-map.md` - Service responsibilities
