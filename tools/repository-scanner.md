# Repository Scanner Tool

**Version:** 1.0.0
**Last Updated:** 2026-03-11
**Purpose:** Automatic workspace repository discovery and analysis

---

## 🚨 CRITICAL: When Repository Scanner Runs

**The Repository Scanner is executed as a RUNTIME workflow step during agent startup, NOT during setup.**

### Execution Trigger

The scanner runs **ONLY when the user starts the agent:**

```bash
# User executes startup command
start harbor-ai
# OR
run harbor-ai
# OR
harbor-ai start work
# OR
/start-harbor-ai
```

### Execution Flow

```
1. User: "start harbor-ai"
   ↓
2. Agent: Starting...
   ↓
3. Agent: Beginning Workspace Analysis...
   ↓
4. Scanner: Scanning workspace...
   ↓
5. Scanner: Analyzing repositories...
   ↓
6. Scanner: Generating repository memory...
   ↓
7. Agent: Workspace analysis complete
   ↓
8. Agent: Loading task from Azure DevOps...
   ↓
9. Agent: Continuing with task processing...
```

### Why This Approach?

✅ **Always Fresh Analysis**
- Every agent startup gets current workspace state
- No stale repository data
- Automatically detects new repositories

✅ **No Manual Setup**
- No pre-analysis step required
- No configuration files to update
- Works immediately on startup

✅ **Automatic Updates**
- Workspace changes detected on next startup
- Repository additions/changes handled automatically
- No manual refresh needed

❌ **What We DON'T Do:**
- Don't run scanner during installation/setup
- Don't pre-generate repository files
- Don't require manual "scan" command
- Don't run scanner as background process

---

## Overview

The Repository Scanner is a **runtime workflow component** that executes during agent startup to discover, analyze, and categorize all repositories in the workspace.

---

## Scanner Workflow

### Phase 1: Workspace Discovery

1. **Scan Parent Directory**
   - Start from workspace root (e.g., `/Users/mohitshah/Documents/HarborService/`)
   - Identify all directories that are git repositories
   - Exclude known non-repository directories (`.git`, `node_modules`, etc.)

2. **Repository Validation**
   - Check for `.git` directory
   - Verify repository is accessible
   - Gather basic metadata (name, path)

### Phase 2: Repository Analysis

For each discovered repository, analyze:

1. **Project Type Detection**
   - Read `package.json` if present
   - Detect frameworks (Next.js, React Native, Express, etc.)
   - Identify language (TypeScript, JavaScript, Python, etc.)
   - Detect project type (frontend, backend, mobile, shared library)

2. **Structure Analysis**
   - Identify source directories (`src/`, `app/`, `lib/`, etc.)
   - Locate configuration files
   - Find entry points
   - Detect routing structure

3. **Technology Stack Detection**
   - Frameworks and libraries
   - Build tools
   - Testing frameworks
   - Database ORM
   - API patterns

### Phase 3: Purpose Inference

Based on analysis, infer repository purpose:

1. **Backend Service Indicators**
   - Express/Fastify/Nest.js present
   - API routes structure
   - Database models/migrations
   - Service dependencies

2. **Frontend Website Indicators**
   - Next.js/React present
   - Pages/routes structure
   - Component libraries (Ant Design, Material-UI)
   - API client configuration

3. **Mobile App Indicators**
   - React Native/Flutter present
   - Native module imports
   - Platform-specific folders (`ios/`, `android/`)

4. **Shared Library Indicators**
   - No entry point/server
   - Export-only modules
   - Type definitions
   - Multiple dependencies from other repos

---

## Analysis Data Points

### For Each Repository, Collect:

```yaml
repository:
  name: string
  path: string
  git_remote: string
  branch: string

project_type:
  category: "backend" | "frontend" | "mobile" | "shared" | "tooling" | "unknown"
  confidence: number  # 0-100

technology:
  language: string
  runtime: string
  framework: string
  build_tool: string

structure:
  src_directories: string[]
  entry_points: string[]
  config_files: string[]
  test_directories: string[]

dependencies:
  internal: string[]  # Other workspace repos
  external: string[]  # npm packages

inferred_purpose: string
api_endpoints: string[]  # For backend services
web_routes: string[]     # For frontend
data_models: string[]    # For services with schemas
```

---

## Scanner Execution

### Automatic Execution (Default)

The scanner runs **automatically** as part of the agent startup workflow:

```
User Command: start harbor-ai
    ↓
Agent Startup
    ↓
**Workspace Analysis Phase**
    ├─ Scan workspace
    ├─ Analyze repositories
    ├─ Generate memory files
    └─ Build repository map
    ↓
Task Processing
```

### Manual Trigger (Optional)

For testing or debugging, the scanner can be triggered manually:

```bash
# Trigger full workspace scan
scan-workspace --path /Users/mohitshah/Documents/HarborService/

# Analyze single repository
analyze-repo --path /Users/mohitshah/Documents/HarborService/harborUserSvc

# Force refresh repository memory
update-repo-memory --force
```

**Note:** Manual triggers are **optional** and primarily for debugging. Normal operation uses automatic execution during agent startup.

---

## Framework Detection Patterns

### Backend Frameworks

| Pattern | Framework | Category |
|---------|-----------|----------|
| `express` in dependencies | Express.js | Backend API |
| `@nestjs/core` | NestJS | Backend API |
| `fastify` | Fastify | Backend API |
| `src/routes/` or `api/` folder | API Service | Backend |
| `package.json` has `main: server.js` | Node Service | Backend |

### Frontend Frameworks

| Pattern | Framework | Category |
|---------|-----------|----------|
| `next` in dependencies | Next.js | Frontend Web |
| `react` + `vite` | React + Vite | Frontend Web |
| `app/` or `pages/` directory | Next.js/App Router | Frontend |
| `antd` or `@mui/material` | Component Library | Frontend |

### Mobile Frameworks

| Pattern | Framework | Category |
|---------|-----------|----------|
| `react-native` | React Native | Mobile App |
| `flutter` | Flutter | Mobile App |
| `ios/` and `android/` folders | Native/React Native | Mobile |

### Shared Libraries

| Pattern | Type | Category |
|---------|------|----------|
| No `main` or `start` script | Library | Shared |
| Mostly exports in `index.ts` | Library | Shared |
| Multiple other repos depend on it | Library | Shared |

---

## Implementation Notes

### Scanning Algorithm

1. List all directories in workspace parent
2. For each directory, check if `.git` exists
3. If git repo, proceed with analysis
4. Read `package.json` if present
5. Scan directory structure
6. Detect frameworks and technologies
7. Infer purpose based on patterns
8. Generate analysis document

### Performance Considerations

- Cache repository analysis for 24 hours
- Skip `.git` directories and `node_modules`
- Use git commands for metadata (fast)
- Limit directory scan depth

---

## Output Format

### Generated Analysis File

Location: `harbor-ai/agent-memory/repo-analysis/{repo-name}.md`

```markdown
# Repository Analysis: {repo-name}

**Scanned:** 2026-03-11
**Confidence:** 85%

## Basic Information

- **Name:** {repo-name}
- **Path:** {full-path}
- **Type:** Backend Service
- **Language:** TypeScript

## Technology Stack

- **Framework:** Express.js
- **Runtime:** Node.js
- **Database:** PostgreSQL + Sequelize
- **Testing:** Jest

## Structure

```
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
└── utils/
```

## Purpose

User profile and authentication service. Handles user CRUD, profiles, skills, qualifications, and social features.

## APIs Detected

- POST /user-svc/user
- GET /user-svc/user/:id
- PUT /user-svc/user/:id

## Dependencies

**Internal:** harborSharedModels
**External:** express, sequelize, pg, jsonwebtoken

## Related Repositories

- Used by: harborWebsite, HarborApp
- Uses: harborSharedModels

## Notes

- Port: 3002
- Base path: /user-svc
- Authentication: JWT (via API Gateway)
```

---

## Error Handling

### Missing package.json

- Proceed with directory structure analysis
- Look for other indicators (pom.xml, requirements.txt, go.mod)
- Mark as "unknown" if no clear pattern

### No Clear Framework

- Analyze directory structure
- Look for common patterns (src/, app/, lib/)
- Infer from folder names

### Access Denied

- Log warning
- Skip repository
- Continue with others

---

## Integration with Agent

The scanner is invoked automatically at agent startup:

1. Agent starts → Scan workspace
2. Generate/Update repository analysis files
3. Build repository map in memory
4. Use map for task routing and planning

---

## Maintenance

### When to Re-scan

- New repository added to workspace
- Repository structure significantly changed
- New framework/technology adopted
- Manual trigger via command

### Partial Updates

- Single repository analysis (not full scan)
- Update specific analysis file
- Refresh repository map

---

## Future Enhancements

- Detect API endpoints from route files
- Parse OpenAPI/Swagger specs
- Analyze dependency graphs
- Detect microservice communication patterns
- Generate service architecture diagrams
- Track repository relationships over time

---

**Status:** ✅ Ready for Implementation
