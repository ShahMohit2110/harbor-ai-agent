# Visible Repository Analysis Process

**Version:** 1.0.0
**Last Updated:** 2026-03-18
**Purpose:** Make repository analysis fully transparent and observable with real-time progress tracking

---

## 🎯 Purpose

**Make the Harbor AI Agent's analysis process fully visible and trustworthy.**

This enhancement ensures:
- ✅ User sees exactly which repositories are being analyzed
- ✅ Analysis progress is clearly visible
- ✅ Each repository's status is tracked (Pending → In Progress → Completed)
- ✅ Detailed logs show what's happening during analysis
- ✅ Process is sequential and observable

---

## 🚨 MANDATORY: Visible Analysis on Startup

**When the agent starts (e.g., "start harbor-ai"), it MUST:**

1. **Display analysis header**
2. **Create and display progress table**
3. **Analyze repositories sequentially (one by one)**
4. **Update table in real-time**
5. **Display detailed logs during analysis**
6. **Complete ALL repositories before proceeding**

---

## Analysis Progress Table

### Table Format

The agent MUST display a live updating table:

```markdown
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                              |
| ----------------------- | ------------ | ------------------- | ---------------------------------- |
| harborSharedModels      | ✅ Completed | Shared Library      | 15 exports, versioned, no server   |
| harborUserSvc           | 🔄 In Progress | Backend Service    | Analyzing structure...             |
| harborJobSvc            | ⏳ Pending    | Unknown             | Not started                        |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started                        |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started                        |
| harborApp               | ⏳ Pending    | Unknown             | Not started                        |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started                        |

**Progress:** 1/7 repositories analyzed (14%)
```

### Status Indicators

| Status | Icon | Description |
|--------|------|-------------|
| Pending | ⏳ | Repository not yet analyzed |
| In Progress | 🔄 | Currently being analyzed |
| Completed | ✅ | Analysis complete |
| Failed | ❌ | Analysis failed (with reason) |

---

## Sequential Analysis Process

### Step 1: Initialize Analysis Table

**When analysis starts:**

```
## 🔍 Beginning Deep Repository Analysis

Workspace: /Users/mohitshah/Documents/HarborService/
Repositories Discovered: 7

## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                    |
| ----------------------- | ------------ | ------------------- | ------------------------ |
| harborSharedModels      | ⏳ Pending    | Unknown             | Not started              |
| harborUserSvc           | ⏳ Pending    | Unknown             | Not started              |
| harborJobSvc            | ⏳ Pending    | Unknown             | Not started              |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started              |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started              |
| harborApp               | ⏳ Pending    | Unknown             | Not started              |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started              |

**Progress:** 0/7 repositories analyzed (0%)
```

---

### Step 2: Analyze Each Repository Sequentially

**For EACH repository, perform the following:**

#### 2.1: Mark as "In Progress"

Update the table to show this repository is being analyzed:

```
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                              |
| ----------------------- | ------------ | ------------------- | ---------------------------------- |
| harborSharedModels      | 🔄 In Progress | Analyzing...       | Scanning folder structure...       |
| harborUserSvc           | ⏳ Pending    | Unknown             | Not started                        |
| harborJobSvc            | ⏳ Pending    | Unknown             | Not started                        |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started                        |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started                        |
| harborApp               | ⏳ Pending    | Unknown             | Not started                        |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started                        |

**Progress:** 0/7 repositories analyzed (0%)
```

#### 2.2: Display Detailed Logs

**Display step-by-step logs during analysis:**

```
### 🔍 Analyzing: harborSharedModels

📂 Scanning folder structure...
   ✅ Found: src/models/, src/types/, src/utils/
   ✅ Detected: TypeScript project

🏗️  Detecting architecture patterns...
   ✅ Pattern: Shared Library
   ✅ No server entry point found
   ✅ Barrel export pattern detected

📦 Identifying dependencies...
   ✅ No local dependencies
   ✅ External dependencies: typescript, @types/node

🎯 Understanding repository role...
   ✅ Purpose: Shared models and types library
   ✅ Exports: User, Job, Notification models
   ✅ Used by: harborUserSvc, harborJobSvc, harborNotificationSvc

📋 Detecting repository rules...
   ✅ Version management: REQUIRED (package.json version: 1.2.3)
   ✅ Export pattern: Barrel export in src/index.ts
   ✅ Model registration: Export from src/models/index.ts

✅ Analysis complete for harborSharedModels
```

#### 2.3: Mark as "Completed"

Update the table with results:

```
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                              |
| ----------------------- | ------------ | ------------------- | ---------------------------------- |
| harborSharedModels      | ✅ Completed | Shared Library      | 15 exports, versioned, no server   |
| harborUserSvc           | 🔄 In Progress | Analyzing...       | Scanning folder structure...       |
| harborJobSvc            | ⏳ Pending    | Unknown             | Not started                        |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started                        |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started                        |
| harborApp               | ⏳ Pending    | Unknown             | Not started                        |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started                        |

**Progress:** 1/7 repositories analyzed (14%)
```

---

### Step 3: Continue to Next Repository

**Repeat Steps 2.1 - 2.3 for each repository:**

```
### 🔍 Analyzing: harborUserSvc

📂 Scanning folder structure...
   ✅ Found: src/routes/, src/controllers/, src/services/, src/models/
   ✅ Detected: TypeScript project with Express

🏗️  Detecting architecture patterns...
   ✅ Pattern: Layered Architecture
   ✅ Server entry: src/server.ts
   ✅ API endpoints detected

📦 Identifying dependencies...
   ✅ Local: harborSharedModels@1.2.3
   ✅ External: express, sequelize, pg, jsonwebtoken

🎯 Understanding repository role...
   ✅ Purpose: User management API service
   ✅ APIs: Authentication, profiles, preferences
   ✅ Consumed by: harborWebsite, harborApp

📋 Detecting repository rules...
   ✅ Version sync: REQUIRED when harborSharedModels changes
   ✅ Route registration: Register in src/routes/index.ts
   ✅ Controller pattern: src/controllers/
   ✅ Service layer: src/services/

✅ Analysis complete for harborUserSvc
```

Update table:

```
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                              |
| ----------------------- | ------------ | ------------------- | ---------------------------------- |
| harborSharedModels      | ✅ Completed | Shared Library      | 15 exports, versioned, no server   |
| harborUserSvc           | ✅ Completed | Backend Service     | User APIs, layered architecture    |
| harborJobSvc            | 🔄 In Progress | Analyzing...       | Scanning folder structure...       |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started                        |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started                        |
| harborApp               | ⏳ Pending    | Unknown             | Not started                        |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started                        |

**Progress:** 2/7 repositories analyzed (29%)
```

---

### Step 4: Complete All Repositories

**Continue until ALL repositories are analyzed:**

```
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                              |
| ----------------------- | ------------ | ------------------- | ---------------------------------- |
| harborSharedModels      | ✅ Completed | Shared Library      | 15 exports, versioned, no server   |
| harborUserSvc           | ✅ Completed | Backend Service     | User APIs, layered architecture    |
| harborJobSvc            | ✅ Completed | Backend Service     | Job lifecycle, worker queues       |
| harborNotificationSvc   | ✅ Completed | Backend Service     | Email/SMS, SendGrid integration   |
| harborWebsite           | ✅ Completed | Frontend Web        | Next.js, React, Ant Design        |
| harborApp               | ✅ Completed | Mobile App          | React Native, iOS/Android         |
| harborApiGateway        | ✅ Completed | Gateway             | Port 7000, API routing            |

**Progress:** 7/7 repositories analyzed (100%)
```

---

## Detailed Log Messages

### Standard Log Sequence

**For each repository, display logs in this order:**

#### 1. Repository Header
```
### 🔍 Analyzing: {Repository Name}
```

#### 2. Folder Structure Scan
```
📂 Scanning folder structure...
   ✅ Found: {list of key directories}
   ✅ Detected: {project type}
```

#### 3. Architecture Pattern Detection
```
🏗️  Detecting architecture patterns...
   ✅ Pattern: {architectural pattern}
   ✅ Entry points: {list of entry points}
   ✅ Key features: {notable features}
```

#### 4. Dependency Identification
```
📦 Identifying dependencies...
   ✅ Local dependencies: {list}
   ✅ External dependencies: {key deps}
   ✅ Package manager: {npm/bun/yarn}
```

#### 5. Repository Role Understanding
```
🎯 Understanding repository role...
   ✅ Purpose: {repository purpose}
   ✅ Key features: {main features}
   ✅ Relationships: {depends on / consumed by}
```

#### 6. Repository Rules Detection
```
📋 Detecting repository rules...
   ✅ Version management: {required/not required}
   ✅ File organization: {pattern detected}
   ✅ Integration pattern: {how to integrate}
   ✅ Build process: {build commands}
   ✅ Testing: {test framework}
```

#### 7. Completion Message
```
✅ Analysis complete for {Repository Name}
```

---

## Log Message Templates

### Folder Structure Scan

**Possible messages:**
```
📂 Scanning folder structure...
   ✅ Found: src/routes/, src/controllers/, src/services/
   ✅ Detected: TypeScript project with Express
```

```
📂 Scanning folder structure...
   ✅ Found: app/, pages/, components/, public/
   ✅ Detected: Next.js project
```

```
📂 Scanning folder structure...
   ✅ Found: ios/, android/, src/
   ✅ Detected: React Native project
```

```
📂 Scanning folder structure...
   ✅ Found: src/models/, src/types/, src/utils/
   ✅ Detected: Shared library
```

---

### Architecture Pattern Detection

**Possible messages:**
```
🏗️  Detecting architecture patterns...
   ✅ Pattern: Layered Architecture
   ✅ Server entry: src/server.ts
   ✅ API endpoints detected
```

```
🏗️  Detecting architecture patterns...
   ✅ Pattern: Component-Based
   ✅ Framework: Next.js with App Router
   ✅ API routes: /api/
```

```
🏗️  Detecting architecture patterns...
   ✅ Pattern: Modular
   ✅ Barrel exports detected
   ✅ No server entry point
```

---

### Dependency Identification

**Possible messages:**
```
📦 Identifying dependencies...
   ✅ Local: harborSharedModels@1.2.3
   ✅ External: express, sequelize, pg, jsonwebtoken
```

```
📦 Identifying dependencies...
   ✅ Local: None
   ✅ External: next, react, antd, axios
```

```
📦 Identifying dependencies...
   ✅ Local: harborSharedModels, harborUserSvc
   ✅ External: react-native, @react-navigation
```

---

### Repository Role Understanding

**Possible messages:**
```
🎯 Understanding repository role...
   ✅ Purpose: User management API service
   ✅ APIs: Authentication, profiles, preferences
   ✅ Consumed by: harborWebsite, harborApp
```

```
🎯 Understanding repository role...
   ✅ Purpose: Shared models and types library
   ✅ Exports: User, Job, Notification models
   ✅ Used by: harborUserSvc, harborJobSvc, harborNotificationSvc
```

```
🎯 Understanding repository role...
   ✅ Purpose: Web frontend application
   ✅ Pages: Dashboard, jobs, profile, settings
   ✅ Consumes APIs: harborUserSvc, harborJobSvc
```

---

### Repository Rules Detection

**Possible messages:**
```
📋 Detecting repository rules...
   ✅ Version sync: REQUIRED when harborSharedModels changes
   ✅ Route registration: Register in src/routes/index.ts
   ✅ Controller pattern: src/controllers/
   ✅ Service layer: src/services/
```

```
📋 Detecting repository rules...
   ✅ Version update: REQUIRED (package.json version)
   ✅ Export pattern: Barrel export in src/index.ts
   ✅ Model registration: Export from src/models/index.ts
```

```
📋 Detecting repository rules...
   ✅ API client: Update API client for new endpoints
   ✅ Components: Follow existing component structure
   ✅ State management: Redux with slices
   ✅ Styling: Ant Design components
```

---

## Analysis Summary

### After All Repositories Analyzed

**Display a comprehensive summary:**

```
## ✅ Repository Analysis Complete

**Total Repositories Analyzed:** 7
**Duration:** 45 seconds

### 📊 Repository Summary

| Repository         | Type              | Purpose                          |
| ------------------ | ----------------- | -------------------------------- |
| harborSharedModels | Shared Library    | Models and types shared across services |
| harborUserSvc      | Backend Service   | User management and authentication |
| harborJobSvc       | Backend Service   | Job lifecycle and scheduling      |
| harborNotificationSvc | Backend Service | Email and SMS notifications      |
| harborWebsite      | Frontend Web      | Web application (Next.js)         |
| harborApp          | Mobile App        | Mobile application (React Native) |
| harborApiGateway   | Gateway           | API gateway and routing           |

### 🔗 Dependency Graph

```
harborSharedModels
  ↓ exports models
  ↓
harborUserSvc → harborWebsite
  ↓ provides API
  ↓
harborApp

harborJobSvc → harborWebsite
harborNotificationSvc → harborWebsite, harborApp
```

### 📋 Detected Patterns

**Version Management:** Detected
- harborSharedModels uses semantic versioning
- Dependent services must update dependency version

**API Integration:** REST APIs
- All backend services expose REST APIs
- Frontend consumes via axios API clients

**File Organization:** Mixed
- Backend: Layered architecture (routes/controllers/services)
- Frontend: Component-based (pages/components)
- Shared: Barrel exports

**Package Management:** npm
- All repositories use npm
- Lock files: package-lock.json

### 🎯 Ready for Task Processing

Agent is now ready to process tasks with complete understanding of the workspace.
```

---

## Integration with Global Agent Workflow

### Startup Sequence Update

**When agent starts:**

1. **Display Analysis Header**
   ```
   ## 🔍 Beginning Deep Repository Analysis
   ```

2. **Initialize Progress Table**
   - Show all repositories as "Pending"

3. **Sequential Analysis Loop**
   - For each repository:
     - Mark as "In Progress"
     - Display detailed logs
     - Mark as "Completed"
     - Update progress percentage

4. **Display Analysis Summary**
   - Show complete summary
   - Display dependency graph
   - List detected patterns

5. **Continue to Task Processing**
   - Fetch Azure DevOps tasks
   - Begin task processing

---

## Error Handling

### If Analysis Fails for a Repository

**Mark as "Failed" and continue:**

```
## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                              |
| ----------------------- | ------------ | ------------------- | ---------------------------------- |
| harborSharedModels      | ✅ Completed | Shared Library      | 15 exports, versioned              |
| harborUserSvc           | ❌ Failed     | Error               | package.json not found             |
| harborJobSvc            | 🔄 In Progress | Analyzing...       | Scanning folder structure...       |
| ...

**Progress:** 1/7 repositories analyzed (14%)
```

**Display error details:**

```
### 🔍 Analyzing: harborUserSvc

❌ Error: package.json not found
   Path: /Users/mohitshah/Documents/HarborService/harborUserSvc/package.json
   This repository may not be a valid Node.js project

⚠️  Skipping harborUserSvc and continuing...
```

---

## Performance Considerations

**This visible analysis process will take longer than silent analysis.**

**Estimated time per repository:**
- Fast repository: 3-5 seconds
- Medium repository: 5-10 seconds
- Large repository: 10-15 seconds

**For 7 repositories:**
- Minimum: 21 seconds (7 × 3s)
- Average: 49 seconds (7 × 7s)
- Maximum: 105 seconds (7 × 15s)

**This is acceptable because:**
- ✅ Transparency is more important than speed
- ✅ User sees exactly what's happening
- ✅ Builds trust in the agent
- ✅ Makes debugging easier
- ✅ One-time cost at startup

---

## 🚨 CRITICAL RULES

### Mandatory Behavior

1. **ALWAYS display analysis progress table**
   - Never skip this step
   - Never run analysis silently

2. **ALWAYS analyze repositories sequentially**
   - One repository at a time
   - Mark as "In Progress" while analyzing
   - Mark as "Completed" when done

3. **ALWAYS display detailed logs**
   - Show what's happening during analysis
   - Use consistent log format
   - Include all detected patterns

4. **NEVER skip repositories**
   - Analyze ALL discovered repositories
   - Mark as "Failed" if analysis errors
   - Continue to next repository

5. **NEVER proceed to implementation before analysis completes**
   - Wait for ALL repositories to be analyzed
   - Display summary before continuing
   - Only then fetch tasks and begin implementation

---

## Example Complete Session

```
User: "start harbor-ai"

Agent: ## 🔍 Beginning Deep Repository Analysis

Workspace: /Users/mohitshah/Documents/HarborService/
Repositories Discovered: 7

## 📊 Repository Analysis Progress

| Repository Name         | Status       | Type                | Notes                    |
| ----------------------- | ------------ | ------------------- | ------------------------ |
| harborSharedModels      | ⏳ Pending    | Unknown             | Not started              |
| harborUserSvc           | ⏳ Pending    | Unknown             | Not started              |
| harborJobSvc            | ⏳ Pending    | Unknown             | Not started              |
| harborNotificationSvc   | ⏳ Pending    | Unknown             | Not started              |
| harborWebsite           | ⏳ Pending    | Unknown             | Not started              |
| harborApp               | ⏳ Pending    | Unknown             | Not started              |
| harborApiGateway        | ⏳ Pending    | Unknown             | Not started              |

**Progress:** 0/7 repositories analyzed (0%)

### 🔍 Analyzing: harborSharedModels

📂 Scanning folder structure...
   ✅ Found: src/models/, src/types/, src/utils/
   ✅ Detected: TypeScript project

🏗️  Detecting architecture patterns...
   ✅ Pattern: Shared Library
   ✅ No server entry point found
   ✅ Barrel export pattern detected

📦 Identifying dependencies...
   ✅ No local dependencies
   ✅ External dependencies: typescript, @types/node

🎯 Understanding repository role...
   ✅ Purpose: Shared models and types library
   ✅ Exports: User, Job, Notification models
   ✅ Used by: harborUserSvc, harborJobSvc, harborNotificationSvc

📋 Detecting repository rules...
   ✅ Version management: REQUIRED (package.json version: 1.2.3)
   ✅ Export pattern: Barrel export in src/index.ts
   ✅ Model registration: Export from src/models/index.ts

✅ Analysis complete for harborSharedModels

[Table updates...]

[Continues for all repositories...]

## ✅ Repository Analysis Complete

**Total Repositories Analyzed:** 7
**Duration:** 42 seconds

[Summary displayed...]

Fetching tasks from Azure DevOps...
```

---

**End of Visible Repository Analysis Process**
