# Documentation Validator Tool

**Version:** 1.0.0
**Last Updated:** 2026-03-24
**Purpose:** ENFORCED documentation validation and automatic generation for ALL repositories

---

## 🚨 CRITICAL: MANDATORY EXECUTION

**This tool MUST be executed BEFORE ANY task implementation.**

**Trigger:** Automatically invoked at the start of ANY agent task

**Enforcement Level:** 🔴 **BLOCKING** - Cannot proceed until validation passes

---

## Tool Purpose

This tool provides the agent with a **foolproof mechanism** to:

1. ✅ **Validate** that `/docs` folder exists in target repository
2. ✅ **Verify** all required documentation files are present
3. ✅ **Generate** missing documentation automatically
4. ✅ **Validate** documentation completeness and accuracy
5. ✅ **Load** documentation context for task execution
6. ✅ **Enforce** documentation-first approach

**🚨 This tool makes it IMPOSSIBLE to proceed without proper documentation.**

---

## Required Documentation Files (12 Total)

### Core Documentation (MANDATORY - All Repositories)

1. **ARCHITECTURE.md** (MANDATORY)
   - Service overview and purpose
   - Microservice role in system
   - Cross-service relationships
   - Shared service classification
   - Dependency graph

2. **STRUCTURE.md** (MANDATORY)
   - Folder structure
   - Responsibilities of each layer
   - File organization conventions

3. **DEPENDENCIES.md** (MANDATORY)
   - External dependencies (packages, libraries)
   - Internal dependencies (shared packages)
   - Version constraints

4. **SERVICE_RULES.md** (CRITICAL)
   - Inter-service communication rules
   - DOs and DON'Ts for this service
   - Service boundaries and constraints

5. **SHARED_SERVICES.md** (CRITICAL)
   - List of shared services/packages used
   - How each shared service is used
   - Dependency relationships
   - Impact of changes to shared services

6. **CHANGE_IMPACT.md** (CRITICAL)
   - If this service is modified, which services are affected?
   - Impact level (low/medium/high)
   - Safe change guidelines

7. **DEVELOPMENT_RULES.md** (MANDATORY)
   - Coding standards and conventions
   - Naming conventions
   - Best practices specific to this service

8. **GIT_RULES.md** (MANDATORY)
   - 🚫 DO NOT push code directly
   - 🚫 DO NOT create/switch branches
   - ✅ Only local commits
   - PR workflow requirements

### Conditional Documentation (If Applicable)

9. **DATABASE.md** (IF DATABASE EXISTS)
   - Database type (PostgreSQL, MongoDB, MSSQL, etc.)
   - ORM used (Sequelize, TypeORM, Prisma, Mongoose, etc.)
   - Schema structure
   - Relationships and foreign keys
   - Migration strategy

10. **MODEL_FLOW.md** (IF MODELS EXIST)
    - Complete data flow: controller → service → repository → DB
    - Model lifecycle management
    - Validation logic
    - Transformation logic
    - Data mapping

11. **API_PATTERNS.md** (IF API EXISTS)
    - Request/response format
    - Error handling patterns
    - Success/error response structure
    - Authentication headers

12. **AUTH.md** (IF AUTH EXISTS)
    - Authentication method (JWT, OAuth, Session, etc.)
    - Authorization mechanism
    - Middleware and guards
    - Role-based access control

---

## Execution Workflow

### Step 1: Repository Detection

**For the current task, identify the target repository:**

```bash
# Get current working directory
pwd

# Identify repository name
basename $(git rev-parse --show-toplevel)
```

**Expected Output:** Repository name (e.g., `harborUserSvc`, `harborWebsite`, etc.)

---

### Step 2: Documentation Folder Validation

**Check if `/docs` folder exists:**

```bash
# Navigate to repository root
cd /path/to/repository

# Check if docs folder exists
if [ -d "docs" ]; then
    echo "✅ docs folder exists"
else
    echo "❌ docs folder missing - must create"
fi
```

**Decision:**

- ✅ **EXISTS** → Proceed to Step 3 (File Validation)
- ❌ **MISSING** → Proceed to Step 5 (Auto-Generation)

---

### Step 3: Required Files Validation

**Check for all required documentation files:**

```bash
# List all .md files in docs
ls -la docs/*.md

# Check for each required file
required_files=(
    "ARCHITECTURE.md"
    "STRUCTURE.md"
    "DEPENDENCIES.md"
    "SERVICE_RULES.md"
    "SHARED_SERVICES.md"
    "CHANGE_IMPACT.md"
    "DEVELOPMENT_RULES.md"
    "GIT_RULES.md"
)

for file in "${required_files[@]}"; do
    if [ -f "docs/$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done
```

**Check for conditional files:**

```bash
# Check if database exists
if grep -q "sequelize\|typeorm\|prisma\|mongoose" package.json; then
    echo "🔍 DATABASE.md required"
    [ -f "docs/DATABASE.md" ] && echo "✅ DATABASE.md exists" || echo "❌ DATABASE.md missing"
fi

# Check if models exist
if [ -d "src/models" ] || [ -d "src/entities" ]; then
    echo "🔍 MODEL_FLOW.md required"
    [ -f "docs/MODEL_FLOW.md" ] && echo "✅ MODEL_FLOW.md exists" || echo "❌ MODEL_FLOW.md missing"
fi

# Check if API exists
if [ -d "src/routes" ] || [ -d "src/controllers" ]; then
    echo "🔍 API_PATTERNS.md required"
    [ -f "docs/API_PATTERNS.md" ] && echo "✅ API_PATTERNS.md exists" || echo "❌ API_PATTERNS.md missing"
fi

# Check if auth exists
if grep -q "jwt\|auth\|passport" package.json; then
    echo "🔍 AUTH.md required"
    [ -f "docs/AUTH.md" ] && echo "✅ AUTH.md exists" || echo "❌ AUTH.md missing"
fi
```

---

### Step 4: Documentation Quality Validation

**For existing documentation files, validate quality:**

```bash
# Check file sizes (must be > 500 bytes to be meaningful)
for file in docs/*.md; do
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    if [ "$size" -lt 500 ]; then
        echo "⚠️  $file is too small ($size bytes) - may be incomplete"
    fi
done

# Check for critical sections in key files
echo "Validating ARCHITECTURE.md..."
grep -q "Service Overview" docs/ARCHITECTURE.md && echo "✅ Has Service Overview" || echo "❌ Missing Service Overview"
grep -q "Dependency" docs/ARCHITECTURE.md && echo "✅ Has Dependencies" || echo "❌ Missing Dependencies"

echo "Validating STRUCTURE.md..."
grep -q "Folder Structure" docs/STRUCTURE.md && echo "✅ Has Folder Structure" || echo "❌ Missing Folder Structure"
```

**Decision:**

- ✅ **ALL VALID** → Proceed to Step 6 (Load Context)
- ⚠️ **INCOMPLETE** → Proceed to Step 5 (Update/Generate)

---

### Step 5: Automatic Documentation Generation

**🚨 CRITICAL: If documentation is missing or incomplete, GENERATE IT NOW.**

#### 5.1: Create /docs Folder (if missing)

```bash
# Navigate to repository root
cd /path/to/repository

# Create docs folder
mkdir -p docs
echo "✅ Created docs folder"
```

#### 5.2: Perform Repository Analysis

**Scan the repository to gather information:**

```bash
# Detect framework and technology
cat package.json

# Scan directory structure
find . -type d -name "src" -o -name "app" -o -name "lib" | head -10
ls -la src/ 2>/dev/null || ls -la app/ 2>/dev/null

# Find models
find . -path "*/models/*.ts" -o -path "*/entities/*.ts" | head -10

# Find routes/controllers
find . -path "*/routes/*.ts" -o -path "*/controllers/*.ts" | head -10

# Find database config
find . -name "*database*.ts" -o -name "*db*.ts" | head -10

# Find auth-related files
find . -iname "*auth*.ts" | head -10
```

#### 5.3: Generate Each Documentation File

**Use the repository analysis to generate complete documentation:**

**ARCHITECTURE.md Template:**
```markdown
# {Service Name} Architecture

**Last Updated:** {Current Date}
**Version:** 1.0.0

---

## Service Overview

{Service Name} is a {microservice/frontend/shared package} that...

### Purpose

{Main purpose of this service}

### Key Responsibilities

- {Responsibility 1}
- {Responsibility 2}
- {Responsibility 3}

---

## Microservice Role

**Type:** {Backend Service / Frontend Application / Shared Package}

**Position in System:**

{Describe where this fits in the overall architecture}

---

## Cross-Service Relationships

### Upstream Dependencies (Services this service depends on)

- {Service 1} - {Why it's needed}
- {Service 2} - {Why it's needed}

### Downstream Dependents (Services that depend on this service)

- {Service 1} - {How they use this service}
- {Service 2} - {How they use this service}

### Shared Services Used

- {Shared Service 1} - {Version} - {Purpose}
- {Shared Service 2} - {Version} - {Purpose}

---

## Dependency Graph

```
{Draw ASCII diagram showing service relationships}
```

---

## Technology Stack

- **Language:** {TypeScript/JavaScript}
- **Framework:** {Express/NestJS/Next.js/React}
- **Database:** {PostgreSQL/MongoDB/None}
- **ORM:** {Sequelize/TypeORM/Mongoose/None}

---

## Endpoints/Key Features

{List main endpoints or features}

---

**End of ARCHITECTURE.md**
```

**Repeat similar generation for all required files...**

#### 5.4: Write Generated Files

```bash
# Write each generated file
cat > docs/ARCHITECTURE.md << 'EOF'
{Generated content}
EOF

cat > docs/STRUCTURE.md << 'EOF'
{Generated content}
EOF

# ... repeat for all required files
```

---

### Step 6: Load Documentation Context

**After validation/generation, load all documentation into context:**

```bash
# Read all documentation files
for file in docs/*.md; do
    echo "=== $file ==="
    cat "$file"
    echo ""
done
```

**Store in context:**

1. ✅ Architecture understanding
2. ✅ Service boundaries
3. ✅ Model flow
4. ✅ Dependencies
5. ✅ Rules and constraints
6. ✅ API patterns
7. ✅ Database schema

---

## Validation Summary

### ✅ PASS Condition

**Proceed to task execution ONLY when:**

- [ ] `/docs` folder exists
- [ ] All 8 MANDATORY files present
- [ ] All conditional files present (if applicable)
- [ ] All files > 500 bytes (meaningful content)
- [ ] Critical sections present in key files
- [ ] Documentation loaded into context

### ❌ FAIL Condition

**BLOCK execution and GENERATE documentation when:**

- [ ] `/docs` folder missing
- [ ] Any MANDATORY file missing
- [ ] Any conditional file missing (when applicable)
- [ ] Any file too small (< 500 bytes)
- [ ] Critical sections missing

---

## Enforcement Mechanism

### Automatic Invocation

**This tool is automatically invoked:**

1. ✅ At start of ANY agent task
2. ✅ Before ANY code implementation
3. ✅ Before ANY file modification
4. ✅ Cannot be skipped or bypassed

### Blocking Behavior

**If validation fails:**

```
🚨 DOCUMENTATION VALIDATION FAILED

Missing Files:
- docs/ARCHITECTURE.md
- docs/STRUCTURE.md
- docs/MODEL_FLOW.md

🔄 AUTO-GENERATING DOCUMENTATION...

✅ Documentation generated successfully
✅ Validation passed
✅ Proceeding to task execution
```

---

## Quick Reference Commands

```bash
# Validate docs folder exists
[ -d "docs" ] && echo "✅ docs exists" || echo "❌ docs missing"

# Check all required files
for f in ARCHITECTURE.md STRUCTURE.md DEPENDENCIES.md SERVICE_RULES.md SHARED_SERVICES.md CHANGE_IMPACT.md DEVELOPMENT_RULES.md GIT_RULES.md; do
    [ -f "docs/$f" ] && echo "✅ $f" || echo "❌ $f missing"
done

# Check conditional files
[ -f "docs/DATABASE.md" ] && echo "✅ DATABASE.md" || echo "⚠️  DATABASE.md missing (if DB exists)"
[ -f "docs/MODEL_FLOW.md" ] && echo "✅ MODEL_FLOW.md" || echo "⚠️  MODEL_FLOW.md missing (if models exist)"

# Validate file sizes
find docs -name "*.md" -size -500c -exec echo "⚠️  {} too small" \;

# Load all docs
for file in docs/*.md; do cat "$file"; echo ""; done
```

---

## Integration with Agent Workflow

### Phase 0 Trigger

**When ANY agent task starts:**

1. **Automatic Tool Invocation**
   - Agent detects task start
   - Automatically invokes Documentation Validator Tool
   - No manual trigger needed

2. **Validation Execution**
   - Check `/docs` folder
   - Validate all required files
   - Check documentation quality

3. **Auto-Generation (if needed)**
   - Generate missing files
   - Update incomplete files
   - Ensure completeness

4. **Context Loading**
   - Read all documentation
   - Load into agent context
   - Use for task execution

5. **Proceed to Implementation**
   - Only after validation passes
   - With full documentation context
   - Ready for informed implementation

---

## Success Criteria

### ✅ Successful Validation

- All required files exist
- All files have meaningful content
- Documentation accurately reflects codebase
- Agent has loaded documentation context
- Ready to proceed with task

### ❌ Validation Failure

- Missing `/docs` folder
- Missing required files
- Files too small or incomplete
- Documentation doesn't match code
- **BLOCKED** - Must generate/update documentation

---

**End of Documentation Validator Tool**
