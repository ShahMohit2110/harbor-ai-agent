# Documentation Validation & Generation - Implementation Guide

**Version:** 1.0.0
**Purpose:** Step-by-step guide for the agent to validate and generate documentation

**This guide is for the AGENT to follow when executing the Pre-Task Validation Hook.**

---

## 🚨 CRITICAL: AGENT INSTRUCTIONS

**When ANY task is received, the agent MUST:**

1. ✅ Execute this validation workflow FIRST
2. ✅ NOT proceed to task until validation PASSES
3. ✅ Generate missing documentation AUTOMATICALLY
4. ✅ Load documentation into context
5. ✅ THEN proceed to task implementation

---

## Step-by-Step Execution

### Step 1: Detect Target Repository

**Identify which repository the task affects:**

```bash
# Get repository root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)

# Get repository name
REPO_NAME=$(basename "$REPO_ROOT")

echo "🔍 Repository: $REPO_NAME"
echo "📍 Path: $REPO_ROOT"
```

**Expected Output:**
```
🔍 Repository: harborUserSvc
📍 Path: /Users/mohitshah/Documents/HarborService/harborUserSvc
```

---

### Step 2: Check Documentation Folder

**Verify `/docs` folder exists:**

```bash
cd "$REPO_ROOT"

if [ -d "docs" ]; then
    echo "✅ docs folder exists"
    DOCS_EXISTS=true
else
    echo "❌ docs folder missing"
    DOCS_EXISTS=false
fi
```

**Decision Point:**
- ✅ **EXISTS** → Go to Step 3
- ❌ **MISSING** → Go to Step 5 (Generate)

---

### Step 3: Validate Required Files

**Check for all 12 required documentation files:**

```bash
# Define required files
MANDATORY_FILES=(
    "ARCHITECTURE.md"
    "STRUCTURE.md"
    "DEPENDENCIES.md"
    "SERVICE_RULES.md"
    "SHARED_SERVICES.md"
    "CHANGE_IMPACT.md"
    "DEVELOPMENT_RULES.md"
    "GIT_RULES.md"
)

# Check mandatory files
echo "🔍 Checking mandatory files..."
for file in "${MANDATORY_FILES[@]}"; do
    if [ -f "docs/$file" ]; then
        size=$(stat -f%z "docs/$file" 2>/dev/null || stat -c%s "docs/$file" 2>/dev/null)
        if [ "$size" -gt 500 ]; then
            echo "  ✅ $file ($size bytes)"
        else
            echo "  ⚠️  $file (too small: $size bytes)"
        fi
    else
        echo "  ❌ $file (missing)"
    fi
done

# Check conditional files
echo "🔍 Checking conditional files..."

# Check if DATABASE.md needed
if grep -qE "sequelize|typeorm|prismamongoose|pg" package.json 2>/dev/null; then
    if [ -f "docs/DATABASE.md" ]; then
        echo "  ✅ DATABASE.md (database detected)"
    else
        echo "  ❌ DATABASE.md (database detected, file missing)"
    fi
fi

# Check if MODEL_FLOW.md needed
if [ -d "src/models" ] || [ -d "src/entities" ]; then
    if [ -f "docs/MODEL_FLOW.md" ]; then
        echo "  ✅ MODEL_FLOW.md (models detected)"
    else
        echo "  ❌ MODEL_FLOW.md (models detected, file missing)"
    fi
fi

# Check if API_PATTERNS.md needed
if [ -d "src/routes" ] || [ -d "src/controllers" ] || grep -qE "express|nestjs|fastify" package.json 2>/dev/null; then
    if [ -f "docs/API_PATTERNS.md" ]; then
        echo "  ✅ API_PATTERNS.md (API detected)"
    else
        echo "  ❌ API_PATTERNS.md (API detected, file missing)"
    fi
fi

# Check if AUTH.md needed
if grep -qE "jwt|auth|passport|session" package.json 2>/dev/null; then
    if [ -f "docs/AUTH.md" ]; then
        echo "  ✅ AUTH.md (auth detected)"
    else
        echo "  ❌ AUTH.md (auth detected, file missing)"
    fi
fi
```

**Decision Point:**
- ✅ **ALL PRESENT** → Go to Step 4 (Load)
- ❌ **ANY MISSING** → Go to Step 5 (Generate)

---

### Step 4: Load Documentation Context

**Read all documentation files and load into context:**

```bash
echo "📚 Loading documentation context..."

for file in docs/*.md; do
    if [ -f "$file" ]; then
        echo ""
        echo "=== $file ==="
        cat "$file"
    fi
done
```

**Store in memory:**
- Architecture understanding
- Service boundaries
- Model flow patterns
- Dependencies
- Rules and constraints

**✅ VALIDATION COMPLETE - Proceed to task**

---

### Step 5: Generate Missing Documentation

**🚨 ONLY execute this step if validation FAILED.**

#### 5.1: Create /docs Folder (if missing)

```bash
if [ ! -d "docs" ]; then
    mkdir -p docs
    echo "✅ Created docs folder"
fi
```

#### 5.2: Analyze Repository Structure

**Gather information for documentation:**

```bash
echo "🔍 Analyzing repository structure..."

# Detect framework
if grep -q "express" package.json 2>/dev/null; then
    FRAMEWORK="Express"
    SERVICE_TYPE="Backend Service"
elif grep -q "next" package.json 2>/dev/null; then
    FRAMEWORK="Next.js"
    SERVICE_TYPE="Frontend Website"
elif grep -q "react-native" package.json 2>/dev/null; then
    FRAMEWORK="React Native"
    SERVICE_TYPE="Mobile App"
else
    FRAMEWORK="Unknown"
    SERVICE_TYPE="Unknown"
fi

# Detect database
if grep -q "sequelize" package.json 2>/dev/null; then
    DATABASE="PostgreSQL"
    ORM="Sequelize"
elif grep -q "typeorm" package.json 2>/dev/null; then
    DATABASE="PostgreSQL"
    ORM="TypeORM"
elif grep -q "mongoose" package.json 2>/dev/null; then
    DATABASE="MongoDB"
    ORM="Mongoose"
else
    DATABASE="None"
    ORM="None"
fi

# Detect models
if [ -d "src/models" ]; then
    HAS_MODELS=true
else
    HAS_MODELS=false
fi

# Detect API
if [ -d "src/routes" ] || [ -d "src/controllers" ]; then
    HAS_API=true
else
    HAS_API=false
fi

# Detect auth
if grep -qE "jwt|auth" package.json 2>/dev/null; then
    HAS_AUTH=true
    AUTH_METHOD="JWT"
else
    HAS_AUTH=false
    AUTH_METHOD="None"
fi

echo "  Framework: $FRAMEWORK"
echo "  Service Type: $SERVICE_TYPE"
echo "  Database: $DATABASE"
echo "  ORM: $ORM"
echo "  Has Models: $HAS_MODELS"
echo "  Has API: $HAS_API"
echo "  Has Auth: $HAS_AUTH"
```

#### 5.3: Generate Each File

**Use the templates from `/harbor-ai/templates/ARCHITECTURE_TEMPLATE.md`**

**Example: Generate ARCHITECTURE.md**

```bash
cat > docs/ARCHITECTURE.md << EOF
# $REPO_NAME Architecture

**Last Updated:** $(date +%Y-%m-%d)
**Version:** 1.0.0
**Repository:** $REPO_NAME

---

## Service Overview

**$REPO_NAME** is a $SERVICE_TYPE built with $FRAMEWORK.

### Purpose

(This section describes the main purpose of the service)

### Key Responsibilities

- (Responsibility 1)
- (Responsibility 2)
- (Responsibility 3)

---

## Technology Stack

- **Framework:** $FRAMEWORK
- **Database:** $DATABASE
- **ORM:** $ORM
- **Authentication:** $AUTH_METHOD

---

## Service Boundaries

### This Service OWNS:

- (Data owned by this service)
- (Functionality owned by this service)

### This Service DOES NOT OWN:

- (Data not owned - specify owner)
- (Functionality not owned - specify handler)

---

## Related Documentation

- **Structure:** See \`STRUCTURE.md\`
- **Dependencies:** See \`DEPENDENCIES.md\`
$(if [ "$HAS_MODELS" = true ]; then echo "- **Model Flow:** See \`MODEL_FLOW.md\`"; fi)
$(if [ "$HAS_API" = true ]; then echo "- **API Patterns:** See \`API_PATTERNS.md\`"; fi)

---

**End of ARCHITECTURE.md**
EOF

echo "✅ Generated ARCHITECTURE.md"
```

**Repeat similar generation for all missing files:**

```bash
# Generate STRUCTURE.md
if [ ! -f "docs/STRUCTURE.md" ]; then
    cat > docs/STRUCTURE.md << EOF
# $REPO_NAME Structure

**Last Updated:** $(date +%Y-%m-%d)

---

## Folder Structure

\`\`\`
$REPO_NAME/
├── src/              # Source code
$(if [ -d "src/controllers" ]; then echo "│   ├── controllers/    # Request handlers"; fi)
$(if [ -d "src/services" ]; then echo "│   ├── services/       # Business logic"; fi)
$(if [ -d "src/repositories" ]; then echo "│   ├── repositories/   # Data access"; fi)
$(if [ -d "src/models" ]; then echo "│   ├── models/         # Data models"; fi)
├── tests/            # Tests
├── docs/             # Documentation
└── package.json      # Dependencies
\`\`\`

---

## Layer Responsibilities

### Controllers Layer $(if [ -d "src/controllers" ]; then echo "(src/controllers/)"; else echo "(N/A)"; fi)

**Purpose:** Handle HTTP requests and responses

### Services Layer $(if [ -d "src/services" ]; then echo "(src/services/)"; else echo "(N/A)"; fi)

**Purpose:** Implement business logic

### Repositories Layer $(if [ -d "src/repositories" ]; then echo "(src/repositories/)"; else echo "(N/A)"; fi)

**Purpose:** Data access abstraction

---

**End of STRUCTURE.md**
EOF
    echo "✅ Generated STRUCTURE.md"
fi

# Generate DEPENDENCIES.md
if [ ! -f "docs/DEPENDENCIES.md" ]; then
    cat > docs/DEPENDENCIES.md << EOF
# Dependencies

**Last Updated:** $(date +%Y-%m-%d)

---

## Production Dependencies

\`\`\`json
$(cat package.json | grep -A 100 '"dependencies"' | grep -B 100 '"devDependencies"' | head -n -1)
\`\`\`

## Development Dependencies

\`\`\`json
$(cat package.json | grep -A 100 '"devDependencies"')
\`\`\`

---

**End of DEPENDENCIES.md**
EOF
    echo "✅ Generated DEPENDENCIES.md"
fi

# Generate SERVICE_RULES.md
if [ ! -f "docs/SERVICE_RULES.md" ]; then
    cat > docs/SERVICE_RULES.md << EOF
# Service Rules

**Last Updated:** $(date +%Y-%m-%d)

---

## DOs

✅ **DO:** Follow the layer architecture (Controller → Service → Repository)
✅ **DO:** Use shared models from @harbor/shared-model
✅ **DO:** Validate all inputs
✅ **DO:** Handle errors gracefully
✅ **DO:** Write unit tests for business logic

## DON'Ts

❌ **DON'T:** Access another service's database directly
❌ **DON'T:** Duplicate model definitions
❌ **DON'T:** Bypass the service layer
❌ **DON'T:** Hardcode configuration values
❌ **DON'T:** Ignore error handling

## Service Boundaries

**This service owns:**
- (Data owned by this service)

**This service doesn't own:**
- (Data owned by other services)

**Communication:**
- Use APIs to communicate with other services
- Respect service boundaries
- Maintain backward compatibility

---

**End of SERVICE_RULES.md**
EOF
    echo "✅ Generated SERVICE_RULES.md"
fi

# Generate SHARED_SERVICES.md
if [ ! -f "docs/SHARED_SERVICES.md" ]; then
    cat > docs/SHARED_SERVICES.md << EOF
# Shared Services

**Last Updated:** $(date +%Y-%m-%d)

---

## Shared Services Used

| Shared Service | Version | Purpose | Usage |
|----------------|---------|---------|-------|
| @harbor/shared-model | (version) | Shared data models | (how used) |

## Impact of Changes

**If @harbor/shared-model changes:**
- Impact: HIGH
- Action Required: Review model changes, update code
- Testing Required: Yes

---

**End of SHARED_SERVICES.md**
EOF
    echo "✅ Generated SHARED_SERVICES.md"
fi

# Generate CHANGE_IMPACT.md
if [ ! -f "docs/CHANGE_IMPACT.md" ]; then
    cat > docs/CHANGE_IMPACT.md << EOF
# Change Impact Analysis

**Last Updated:** $(date +%Y-%m-%d)

---

## Impact Level: {LOW | MEDIUM | HIGH}

**Current Impact Level:** (To be determined based on service dependencies)

---

## If This Service Changes

### Affected Services

| Service | Impact | Reason |
|---------|--------|--------|
| (Service 1) | (HIGH/MEDIUM/LOW) | (Why affected) |

### Safe Change Guidelines

1. **API Changes:**
   - Maintain backward compatibility
   - Version new endpoints
   - Deprecate old endpoints gracefully

2. **Model Changes:**
   - Coordinate with shared-model maintainers
   - Update dependent services
   - Run integration tests

3. **Database Changes:**
   - Create migrations
   - Test in development first
   - Back up production data

---

**End of CHANGE_IMPACT.md**
EOF
    echo "✅ Generated CHANGE_IMPACT.md"
fi

# Generate DEVELOPMENT_RULES.md
if [ ! -f "docs/DEVELOPMENT_RULES.md" ]; then
    cat > docs/DEVELOPMENT_RULES.md << EOF
# Development Rules

**Last Updated:** $(date +%Y-%m-%d)

---

## Coding Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful comments
- Keep functions small and focused

## Naming Conventions

- **Classes:** PascalCase (e.g., \`UserService\`)
- **Functions:** camelCase (e.g., \`getUserById\`)
- **Constants:** UPPER_SNAKE_CASE (e.g., \`API_BASE_URL\`)
- **Files:** kebab-case (e.g., \`user.service.ts\`)

## Best Practices

1. **Separation of Concerns:**
   - Controllers handle HTTP only
   - Services handle business logic only
   - Repositories handle data access only

2. **Error Handling:**
   - Always handle errors
   - Use meaningful error messages
   - Log errors appropriately

3. **Testing:**
   - Write unit tests for services
   - Write integration tests for APIs
   - Maintain test coverage above 80%

---

**End of DEVELOPMENT_RULES.md**
EOF
    echo "✅ Generated DEVELOPMENT_RULES.md"
fi

# Generate GIT_RULES.md
if [ ! -f "docs/GIT_RULES.md" ]; then
    cat > docs/GIT_RULES.md << EOF
# Git Rules

**Last Updated:** $(date +%Y-%m-%d)

---

## PROHIBITED ACTIONS

❌ **DO NOT** push code directly to main branch
❌ **DO NOT** push code directly to dev branch
❌ **DO NOT** create branches (use local branches only)
❌ **DO NOT** force push

## REQUIRED WORKFLOW

✅ **DO** work on local branches
✅ **DO** create pull requests for review
✅ **DO** update Azure DevOps task status
✅ **DO** include task ID in commit messages

## Commit Message Format

\`\`\`
feat: add new feature
fix: resolve issue
docs: update documentation
refactor: refactor code
test: add tests
\`\`\`

## Pull Request Process

1. Create local branch
2. Make changes
3. Commit changes
4. Create pull request to \`dev\` branch
5. Update Azure DevOps task
6. Wait for review and approval

---

**End of GIT_RULES.md**
EOF
    echo "✅ Generated GIT_RULES.md"
fi

# Generate conditional files
if [ "$HAS_MODELS" = true ] && [ ! -f "docs/MODEL_FLOW.md" ]; then
    cat > docs/MODEL_FLOW.md << EOF
# Model Flow

**Last Updated:** $(date +%Y-%m-%d)

---

## Complete Data Flow

\`\`\`
Request → Controller → Service → Repository → Database
\`\`\`

## Model Lifecycle

1. **Define Model** (\`src/models/\`)
2. **Register in ORM** (\`src/database/\`)
3. **Create Repository** (\`src/repositories/\`)
4. **Create Service** (\`src/services/\`)
5. **Create Controller** (\`src/controllers/\`)

---

**End of MODEL_FLOW.md**
EOF
    echo "✅ Generated MODEL_FLOW.md"
fi

if [ "$HAS_API" = true ] && [ ! -f "docs/API_PATTERNS.md" ]; then
    cat > docs/API_PATTERNS.md << EOF
# API Patterns

**Last Updated:** $(date +%Y-%m-%d)

---

## Request Format

**Success Response:**
\`\`\`json
{
  "success": true,
  "data": { ... }
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "success": false,
  "error": {
    "message": "...",
    "code": "..."
  }
}
\`\`\`

## Error Handling

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

---

**End of API_PATTERNS.md**
EOF
    echo "✅ Generated API_PATTERNS.md"
fi

if [ "$HAS_AUTH" = true ] && [ ! -f "docs/AUTH.md" ]; then
    cat > docs/AUTH.md << EOF
# Authentication & Authorization

**Last Updated:** $(date +%Y-%m-%d)

---

## Authentication Method

**Method:** $AUTH_METHOD

**Flow:**
1. User logs in
2. Server generates JWT
3. Client stores JWT
4. Client sends JWT in headers
5. Server validates JWT

## Authorization

**Middleware:**
- \`authenticate.middleware.ts\` - Validates JWT
- \`authorize.middleware.ts\` - Checks permissions

## Protected Routes

All routes except \`/auth/login\` and \`/auth/register\` require authentication.

---

**End of AUTH.md**
EOF
    echo "✅ Generated AUTH.md"
fi

if [ "$DATABASE" != "None" ] && [ ! -f "docs/DATABASE.md" ]; then
    cat > docs/DATABASE.md << EOF
# Database

**Last Updated:** $(date +%Y-%m-%d)

---

## Database Configuration

**Type:** $DATABASE
**ORM:** $ORM

## Connection

\`\`\`typescript
// src/database/connection.ts
export const connection = new $ORM({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
\`\`\`

## Migrations

Run migrations: \`npm run migrate\`
Rollback: \`npm run migrate:undo\`

---

**End of DATABASE.md**
EOF
    echo "✅ Generated DATABASE.md"
fi
```

#### 5.4: Validate Generated Files

**Re-run validation to ensure all files are present:**

```bash
echo "🔍 Validating generated files..."

# Check all files again
MISSING=false
for file in "${MANDATORY_FILES[@]}"; do
    if [ ! -f "docs/$file" ]; then
        echo "  ❌ $file still missing"
        MISSING=true
    else
        echo "  ✅ $file exists"
    fi
done

if [ "$MISSING" = false ]; then
    echo "✅ All files generated successfully"
else
    echo "❌ Some files still missing - manual intervention required"
    exit 1
fi
```

---

### Step 6: Load Documentation Context

**After validation/generation, load all documentation:**

```bash
echo "📚 Loading documentation context..."

for file in docs/*.md; do
    if [ -f "$file" ]; then
        echo ""
        echo "=== $file ==="
        cat "$file"
    fi
done

echo ""
echo "✅ Documentation loaded successfully"
echo "✅ Ready to proceed with task"
```

---

## Summary

### Validation States

**✅ PASS:**
```
🔍 Repository: harborUserSvc
📋 Validation: STARTED
✅ docs folder exists
✅ All 12 files present
✅ All files validated
📚 Context loaded (23.4 KB)
✅ VALIDATION COMPLETE - Proceed to task
```

**❌ FAIL → GENERATE:**
```
🔍 Repository: harborBlogSvc
📋 Validation: STARTED
❌ docs folder missing
🔄 Auto-generating documentation...
✅ Generated 12 files
✅ Validation passed
📚 Context loaded (18.7 KB)
✅ READY - Proceed to task
```

---

## Quick Reference Commands

```bash
# Validate documentation
[ -d "docs" ] && echo "✅ docs exists" || echo "❌ docs missing"

# Check all files
for f in ARCHITECTURE.md STRUCTURE.md DEPENDENCIES.md SERVICE_RULES.md SHARED_SERVICES.md CHANGE_IMPACT.md DEVELOPMENT_RULES.md GIT_RULES.md; do
    [ -f "docs/$f" ] && echo "✅ $f" || echo "❌ $f missing"
done

# Load context
for file in docs/*.md; do cat "$file"; done
```

---

**End of Implementation Guide**
