# Multi-Repository Documentation Scan

**Version:** 1.0.0
**Last Updated:** 2026-03-24
**Purpose:** Comprehensive documentation validation and generation across ALL repositories in workspace

---

## 🚨 CRITICAL: Multi-Repository Documentation Strategy

**This workflow ensures EVERY repository in the workspace has complete, standardized documentation.**

**Key Principles:**
- 📚 **Documentation is the SINGLE SOURCE OF TRUTH** for each repository
- 🔄 **Reuse existing documentation** - Don't re-analyze if docs exist
- ✅ **Create only what's missing** - Never overwrite existing docs
- 💾 **Cache documentation in memory** - Faster subsequent runs
- 🌐 **Cross-repository awareness** - Understand relationships through docs

---

## Execution Workflow

### Step 1: Workspace Repository Discovery

**Scan the entire workspace to find ALL repositories:**

```bash
# Navigate to workspace root
WORKSPACE_ROOT=/Users/mohitshah/Documents/HarborService/
cd ${WORKSPACE_ROOT}

# Find all git repositories
find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||' | sort
```

**Expected Output:**
```
./harbor-ai
./harborBlogSvc
./harborJobSvc
./harborShared
./harborUserSvc
./harborWebsite
./shared-models
```

---

### Step 2: For Each Repository - Documentation Validation

**For EACH discovered repository, execute the following:**

#### 2.1: Check if `docs` Folder Exists

```bash
# For each repository
for repo in $(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "🔍 Checking: $repo"

    # Navigate to repository
    cd "$repo"

    # Check if docs folder exists
    if [ -d "docs" ]; then
        echo "  ✅ docs folder exists"
        echo "  📚 Reading existing documentation..."
    else
        echo "  ❌ docs folder missing"
        echo "  🔄 Will generate documentation..."
    fi

    cd "$WORKSPACE_ROOT"
done
```

#### 2.2: If `docs` EXISTS - Read and Store

**When `docs` folder exists:**

```bash
# List all documentation files
echo "📚 Documentation files in $repo:"
ls -la docs/*.md 2>/dev/null || echo "  ⚠️  No .md files found"

# Validate required files exist
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

echo "  Required files check:"
for file in "${required_files[@]}"; do
    if [ -f "docs/$file" ]; then
        echo "    ✅ $file"
    else
        echo "    ❌ $file - MISSING"
    fi
done

# Check conditional files
conditional_files=(
    "DATABASE.md"
    "MODEL_FLOW.md"
    "API_PATTERNS.md"
    "AUTH.md"
)

echo "  Conditional files check:"
for file in "${conditional_files[@]}"; do
    if [ -f "docs/$file" ]; then
        echo "    ✅ $file"
    else
        echo "    ⚠️  $file - Not present (may not be applicable)"
    fi
done
```

**Load Documentation into Memory:**

```bash
# Read all documentation files
echo "  📖 Loading documentation into memory..."

# Create repository documentation summary
cat > /tmp/${repo_name}_docs_summary.md << EOF
# ${repo_name} Documentation Summary

**Last Scanned:** $(date +%Y-%m-%d)

## Documentation Files Present:
$(ls -la docs/*.md | awk '{print "- " $9}')

## Key Information:

### Architecture
$(grep -A 10 "## Service Overview" docs/ARCHITECTURE.md 2>/dev/null || echo "Not found")

### Structure
$(grep -A 10 "## Folder Structure" docs/STRUCTURE.md 2>/dev/null || echo "Not found")

### Dependencies
$(grep -A 10 "## External Dependencies" docs/DEPENDENCIES.md 2>/dev/null || echo "Not found")

### Service Rules
$(grep -A 10 "## DO's" docs/SERVICE_RULES.md 2>/dev/null || echo "Not found")

EOF

# Store in agent memory
echo "  💾 Stored in memory: /tmp/${repo_name}_docs_summary.md"
```

#### 2.3: If `docs` DOES NOT EXIST - Generate Documentation

**When `docs` folder is missing:**

```bash
# Create docs folder
mkdir -p docs
echo "  ✅ Created docs folder"

# Perform repository analysis
echo "  🔍 Analyzing repository structure..."

# Detect repository type
if [ -f "package.json" ]; then
    echo "    📦 Node.js/TypeScript project"
    cat package.json | grep -E '"name"|"version"|"main"|"scripts"'
fi

# Scan directory structure
echo "    📁 Directory structure:"
ls -la src/ 2>/dev/null || ls -la app/ 2>/dev/null || ls -la

# Detect models
if [ -d "src/models" ] || [ -d "src/entities" ]; then
    echo "    🗂️  Models found: $(ls src/models/*.ts 2>/dev/null | wc -l) files"
    MODEL_FLOW_REQUIRED=true
else
    MODEL_FLOW_REQUIRED=false
fi

# Detect database
if grep -q "sequelize\|typeorm\|prisma\|mongoose" package.json 2>/dev/null; then
    echo "    💾 Database detected"
    DATABASE_REQUIRED=true
else
    DATABASE_REQUIRED=false
fi

# Detect API
if [ -d "src/routes" ] || [ -d "src/controllers" ]; then
    echo "    🔌 API detected"
    API_PATTERNS_REQUIRED=true
else
    API_PATTERNS_REQUIRED=false
fi

# Detect auth
if grep -q "jwt\|auth\|passport" package.json 2>/dev/null; then
    echo "    🔐 Authentication detected"
    AUTH_REQUIRED=true
else
    AUTH_REQUIRED=false
fi

echo "  ✅ Analysis complete"
```

**Generate Required Documentation Files:**

```bash
# Generate ARCHITECTURE.md
cat > docs/ARCHITECTURE.md << 'EOF'
# {REPO_NAME} Architecture

**Last Updated:** $(date +%Y-%m-%d)
**Version:** 1.0.0

---

## Service Overview

{REPO_NAME} is a {microservice/frontend/shared package} that...

### Purpose

{Main purpose based on code analysis}

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
{ASCII diagram showing service relationships}
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
EOF

echo "  ✅ Generated docs/ARCHITECTURE.md"

# Generate STRUCTURE.md
cat > docs/STRUCTURE.md << 'EOF'
# {REPO_NAME} Structure

**Last Updated:** $(date +%Y-%m-%d)

---

## Folder Structure

```
{REPO_NAME}/
├── src/
│   ├── controllers/    # API controllers
│   ├── services/       # Business logic
│   ├── repositories/   # Data access layer
│   ├── models/         # Data models
│   ├── middleware/     # Express middleware
│   └── routes/         # API routes
├── tests/              # Test suites
├── docs/               # Documentation
└── package.json        # Dependencies
```

---

## Layer Responsibilities

### Controllers Layer
- Handle HTTP requests
- Validate input
- Return responses

### Services Layer
- Business logic
- Data transformation
- Validation rules

### Repositories Layer
- Database queries
- Data persistence
- ORM operations

### Models Layer
- Data structure definition
- Relationships
- Validation schema

---

## File Organization Conventions

- **Controllers:** `src/controllers/{entity}.controller.ts`
- **Services:** `src/services/{entity}.service.ts`
- **Repositories:** `src/repositories/{entity}.repository.ts`
- **Models:** `src/models/{entity}.model.ts`
- **Routes:** `src/routes/{entity}.route.ts`

---

**End of STRUCTURE.md**
EOF

echo "  ✅ Generated docs/STRUCTURE.md"

# Generate DEPENDENCIES.md
cat > docs/DEPENDENCIES.md << 'EOF'
# {REPO_NAME} Dependencies

**Last Updated:** $(date +%Y-%m-%d)

---

## External Dependencies

### Production Dependencies

{Extracted from package.json dependencies}

### Development Dependencies

{Extracted from package.json devDependencies}

---

## Internal Dependencies

### Shared Packages

- shared-models - {Version} - Data models shared across services
- harbor-shared - {Version} - Common utilities and helpers

---

## Version Constraints

### Major Dependencies

- {Package 1}: {Version Range}
- {Package 2}: {Version Range}

---

**End of DEPENDENCIES.md**
EOF

echo "  ✅ Generated docs/DEPENDENCIES.md"

# Generate SERVICE_RULES.md
cat > docs/SERVICE_RULES.md << 'EOF'
# {REPO_NAME} Service Rules

**Last Updated:** $(date +%Y-%m-%d)

---

## Inter-Service Communication Rules

### DO's ✅

- ✅ Use APIs for cross-service communication
- ✅ Maintain backward compatibility
- ✅ Handle service failures gracefully
- ✅ Implement circuit breakers for external calls
- ✅ Cache responses when appropriate

### DON'Ts ❌

- ❌ DO NOT access another service's database directly
- ❌ DO NOT create tight coupling between services
- ❌ DO NOT assume other services are always available
- ❌ DO NOT share internal models across services
- ❌ DO NOT bypass API contracts

---

## Service Boundaries

### What This Service DOES

- {Core responsibility 1}
- {Core responsibility 2}
- {Core responsibility 3}

### What This Service Does NOT DO

- {Out of scope 1}
- {Out of scope 2}
- {Out of scope 3}

---

## Constraints

### Performance Constraints

- API response time: < {X}ms
- Database query timeout: {X}ms
- Concurrent requests: {X} max

### Security Constraints

- All endpoints must be authenticated (except public ones)
- Input validation is mandatory
- Output sanitization is required
- Rate limiting applies

---

**End of SERVICE_RULES.md**
EOF

echo "  ✅ Generated docs/SERVICE_RULES.md"

# Generate SHARED_SERVICES.md
cat > docs/SHARED_SERVICES.md << 'EOF'
# {REPO_NAME} Shared Services

**Last Updated:** $(date +%Y-%m-%d)

---

## Shared Services/Packages Used

### shared-models

**Version:** {Version}
**Purpose:** Data models shared across Harbor services

**Usage:**
```typescript
import { User, Job, Profile } from 'shared-models';
```

**Impact of Changes:**
- 🔴 **HIGH IMPACT** - Changes affect all services using these models
- Must coordinate updates across all consuming services
- Version bump required for breaking changes

---

### harbor-shared

**Version:** {Version}
**Purpose:** Common utilities and helper functions

**Usage:**
```typescript
import { logger, validator } from 'harbor-shared';
```

**Impact of Changes:**
- 🟡 **MEDIUM IMPACT** - Changes may affect utility usage
- Check all usages before modifying
- Maintain backward compatibility

---

## Dependency Relationships

```
{REPO_NAME}
    ↓ depends on
shared-models
    ↓ used by
harborUserSvc, harborJobSvc, harborBlogSvc

{REPO_NAME}
    ↓ depends on
harbor-shared
    ↓ used by
All Harbor services
```

---

## Change Guidelines

### When updating shared services:

1. **Check impact** - Identify all services using the shared service
2. **Test thoroughly** - Ensure compatibility with all consumers
3. **Version bump** - Update version numbers appropriately
4. **Coordinate** - Update all consuming services
5. **Communicate** - Notify team of breaking changes

---

**End of SHARED_SERVICES.md**
EOF

echo "  ✅ Generated docs/SHARED_SERVICES.md"

# Generate CHANGE_IMPACT.md
cat > docs/CHANGE_IMPACT.md << 'EOF'
# {REPO_NAME} Change Impact Analysis

**Last Updated:** $(date +%Y-%m-%d)

---

## Impact Level: {LOW/MEDIUM/HIGH}

### If this service is modified, the following services are affected:

---

## Direct Dependents (Services that directly depend on this service)

### {Dependent Service 1}

**Impact Level:** {LOW/MEDIUM/HIGH}

**What breaks:**
- {API endpoint 1}
- {Data model 2}

**Safe change guidelines:**
- Maintain API contract compatibility
- Version breaking changes
- Coordinate updates before deployment

---

### {Dependent Service 2}

**Impact Level:** {LOW/MEDIUM/HIGH}

**What breaks:**
- {Shared functionality}

**Safe change guidelines:**
- Notify service maintainers
- Provide migration guide
- Coordinate deployment timing

---

## Indirect Dependents (Services affected through chain of dependencies)

### {Indirect Dependent}

**Impact Level:** {LOW/MEDIUM/HIGH}

**Path of dependency:**
- {Indirect} → {Direct} → {This Service}

**What breaks:**
- {Cascading effect}

**Safe change guidelines:**
- Test full dependency chain
- Consider API gateway changes
- Update integration tests

---

## Safe Change Guidelines

### LOW Impact Changes

- Bug fixes within service boundaries
- Performance optimizations
- Code refactoring (no API changes)
- Documentation updates

**Guidelines:**
- Standard testing required
- No coordination needed
- Can deploy independently

### MEDIUM Impact Changes

- Non-breaking API enhancements
- New endpoints/features
- Database schema additions (non-breaking)
- Dependency updates

**Guidelines:**
- Thorough testing required
- Notify dependent services
- Coordinate deployment timing
- Monitor after deployment

### HIGH Impact Changes

- Breaking API changes
- Database schema modifications
- Model changes (if shared)
- Removal of endpoints/features

**Guidelines:**
- Comprehensive testing required
- Coordinate with ALL dependent services
- Create migration plan
- Version appropriately
- Deploy during maintenance window
- Monitor extensively after deployment

---

## Change Risk Assessment

Before making changes, ask:

1. ✅ Which services depend on this service?
2. ✅ What APIs/models will be affected?
3. ✅ Are there breaking changes?
4. ✅ Have all dependents been notified?
5. ✅ Is there a rollback plan?
6. ✅ Are comprehensive tests in place?

---

**End of CHANGE_IMPACT.md**
EOF

echo "  ✅ Generated docs/CHANGE_IMPACT.md"

# Generate DEVELOPMENT_RULES.md
cat > docs/DEVELOPMENT_RULES.md << 'EOF'
# {REPO_NAME} Development Rules

**Last Updated:** $(date +%Y-%m-%d)

---

## Coding Standards

### Language and Style

- **Language:** TypeScript
- **Style Guide:** {Airbnb/Standard/Custom}
- **Linting:** ESLint with {config}
- **Formatting:** Prettier with {config}

### Naming Conventions

- **Files:** kebab-case (e.g., `user-service.ts`)
- **Classes:** PascalCase (e.g., `UserService`)
- **Functions/Variables:** camelCase (e.g., `getUserById`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Interfaces:** PascalCase with `I` prefix (e.g., `IUser`)

### Code Organization

```typescript
// Import order:
// 1. Node.js imports
// 2. External imports
// 3. Internal imports
// 4. Relative imports

// Export order:
// 1. Constants
// 2. Types/Interfaces
// 3. Functions
// 4. Classes
```

---

## Best Practices

### Error Handling

```typescript
// ✅ DO: Use try-catch with specific error types
try {
    const user = await this.userRepository.findById(id);
} catch (error) {
    if (error instanceof NotFoundError) {
        throw new UserNotFoundError(id);
    }
    throw error;
}

// ❌ DON'T: Catch-all error handlers
try {
    const user = await this.userRepository.findById(id);
} catch (error) {
    console.log(error); // Loses error context
}
```

### Async/Await

```typescript
// ✅ DO: Use async/await
async function getUser(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    return user;
}

// ❌ DON'T: Mix promises and async/await
function getUser(id: string): Promise<User> {
    return this.repository.findById(id)
        .then(user => user); // Unnecessary promise chain
}
```

### Validation

```typescript
// ✅ DO: Validate input at service layer
async createUser(data: CreateUserDto): Promise<User> {
    // Validate input
    const errors = await this.validator.validate(data);
    if (errors.length > 0) {
        throw new ValidationException(errors);
    }

    // Create user
    return this.userRepository.create(data);
}

// ❌ DON'T: Skip validation
async createUser(data: any): Promise<User> {
    return this.userRepository.create(data); // No validation!
}
```

---

## Testing Guidelines

### Unit Tests

- Test business logic in services
- Mock external dependencies
- Aim for >80% code coverage

### Integration Tests

- Test API endpoints
- Test database operations
- Test cross-service communication

### Test Structure

```typescript
describe('UserService', () => {
    describe('createUser', () => {
        it('should create a user with valid data', async () => {
            // Arrange
            const userData = { name: 'Test User' };

            // Act
            const user = await userService.create(userData);

            // Assert
            expect(user.name).toBe('Test User');
        });

        it('should throw error with invalid data', async () => {
            // Test error case
        });
    });
});
```

---

## Git Workflow

### Commit Messages

```
feat: add user registration feature
fix: resolve authentication bug
docs: update API documentation
test: add integration tests for user service
refactor: simplify user repository logic
```

### Branch Naming

```
feature/{ticket-id}-{short-description}
bugfix/{ticket-id}-{short-description}
hotfix/{ticket-id}-{short-description}
```

---

**End of DEVELOPMENT_RULES.md**
EOF

echo "  ✅ Generated docs/DEVELOPMENT_RULES.md"

# Generate GIT_RULES.md
cat > docs/GIT_RULES.md << 'EOF'
# {REPO_NAME} Git Rules

**Last Updated:** $(date +%Y-%m-%d)

---

## 🚫 CRITICAL RULES

### DO NOT Push Code Directly

🚫 **STRICTLY FORBIDDEN:**

```bash
# ❌ DO NOT DO THIS
git push origin feature-branch
```

**Why:**
- Breaking changes can be deployed accidentally
- No code review process
- Can break production systems
- Violates Harbor development workflow

**Correct Workflow:**

```bash
# ✅ DO THIS INSTEAD
# Make local commits
git add .
git commit -m "feat: add new feature"

# Create Pull Request (via GitHub/GitLab UI)
# Request review
# Merge after approval
```

---

### DO NOT Create/Switch Branches

🚫 **STRICTLY FORBIDDEN:**

```bash
# ❌ DO NOT DO THIS
git checkout -b new-feature-branch
git push origin new-feature-branch
```

**Why:**
- Agent should work locally only
- Branch management is manual
- PR creation is manual
- Avoids conflicting with developer work

**Correct Approach:**

- Agent makes local commits only
- Developer creates branches when ready
- Developer manages PR workflow

---

## ✅ ALLOWED OPERATIONS

### Local Git Operations

```bash
# ✅ ALLOWED: Local commits
git add .
git commit -m "feat: implement feature"

# ✅ ALLOWED: Check status
git status

# ✅ ALLOWED: View log
git log

# ✅ ALLOWED: Create branches (LOCAL ONLY)
git branch feature-branch  # Local only, no push

# ✅ ALLOWED: View diffs
git diff
```

---

## Pull Request Workflow

### PR Creation Process

1. **Developer creates branch** (manual)
   ```bash
   git checkout -b feature/{ticket-id}-{description}
   ```

2. **Agent makes local commits**
   ```bash
   git add .
   git commit -m "feat: implement feature"
   ```

3. **Developer pushes branch**
   ```bash
   git push origin feature/{ticket-id}-{description}
   ```

4. **Developer creates PR** (via GitHub/GitLab)

5. **Request review**

6. **Merge after approval**

### PR Requirements

- ✅ All tests pass
- ✅ Code review approved
- ✅ No merge conflicts
- ✅ Documentation updated
- ✅ Linked to ticket/issue

---

## Branch Strategy

### Branch Naming Convention

```
feature/{ticket-id}-{short-description}
bugfix/{ticket-id}-{short-description}
hotfix/{ticket-id}-{short-description}
```

**Examples:**
- `feature/123-user-registration`
- `bugfix/456-fix-login-error`
- `hotfix/789-security-patch`

### Source Branch

All feature branches must be created from:
- **`dev`** (main development branch)

### Target Branch

All Pull Requests must target:
- **`dev`** (main development branch)

---

## Commit Message Convention

### Format

```
<type>(<scope>): <short description>

<optional detailed description>

<optional footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(user): add user registration endpoint

Implement user registration with email verification
```

```
fix(auth): resolve token expiration bug

Token was expiring too early due to incorrect time calculation
```

```
docs(readme): update installation instructions

Clarified Node.js version requirement
```

---

## Repository State

### Pre-Task State

```bash
# Clean working directory
git status
# On branch dev
# nothing to commit, working tree clean
```

### Post-Task State

```bash
# Local commits only
git status
# On branch dev
# Your branch is ahead of 'origin/dev' by 2 commits
```

**IMPORTANT:** Commits are local, NOT pushed

---

## Enforcement

### Violation Detection

The system will block operations that violate these rules:

```javascript
if (operation === 'git push') {
    throw new Error('GIT PUSH NOT ALLOWED');
}

if (operation === 'git checkout -b') {
    throw new Error('BRANCH CREATION NOT ALLOWED');
}
```

### Automatic Prevention

- Pre-commit hooks validate commit messages
- Pre-push hooks block direct pushes
- CI/CD validates PR requirements

---

## Quick Reference

### ❌ FORBIDDEN

- `git push`
- `git push origin <branch>`
- Creating remote branches
- Force pushing
- Merging without PR

### ✅ ALLOWED

- `git add`
- `git commit`
- `git status`
- `git log`
- `git diff`
- Creating local branches (no push)

---

**End of GIT_RULES.md**
EOF

echo "  ✅ Generated docs/GIT_RULES.md"

# Generate conditional files (if required)

# DATABASE.md (if database detected)
if [ "$DATABASE_REQUIRED" = true ]; then
    cat > docs/DATABASE.md << 'EOF'
# {REPO_NAME} Database

**Last Updated:** $(date +%Y-%m-%d)

---

## Database Type

**Database:** PostgreSQL
**Version:** {Version}

---

## ORM

**ORM:** Sequelize / TypeORM / Prisma
**Version:** {Version}

---

## Schema Structure

### Tables

{List tables with descriptions}

### Relationships

{Describe relationships between tables}

---

## Migrations

### Migration Strategy

- Migration tool: {Sequelize migrations / TypeORM migrations / custom}
- Migration location: `{path to migrations}`

### Running Migrations

```bash
# Up
npm run migrate

# Down
npm run migrate:undo
```

---

**End of DATABASE.md**
EOF
    echo "  ✅ Generated docs/DATABASE.md"
fi

# MODEL_FLOW.md (if models detected)
if [ "$MODEL_FLOW_REQUIRED" = true ]; then
    cat > docs/MODEL_FLOW.md << 'EOF'
# {REPO_NAME} Model Flow

**Last Updated:** $(date +%Y-%m-%d)

---

## Complete Data Flow

### Request → Controller → Service → Repository → Database

```
┌─────────────┐
│   Request   │
│  (Express)  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Controller  │ ← Validate input, call service
│  Layer      │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Service   │ ← Business logic, validation
│   Layer     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Repository  │ ← Database queries
│   Layer     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Database   │ ← Data persistence
│  (PostgreSQL)│
└─────────────┘
```

---

## Model Lifecycle

### 1. Model Definition

**Location:** `src/models/{entity}.model.ts`

**Example:**
```typescript
export class User extends Model {
    id!: number;
    name!: string;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;
}
```

### 2. Repository Layer

**Location:** `src/repositories/{entity}.repository.ts`

**Responsibilities:**
- CRUD operations
- Database queries
- ORM interactions

**Example:**
```typescript
export class UserRepository {
    async findById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }

    async create(data: CreateUserDto): Promise<User> {
        return User.create(data);
    }
}
```

### 3. Service Layer

**Location:** `src/services/{entity}.service.ts`

**Responsibilities:**
- Business logic
- Data validation
- Transformation

**Example:**
```typescript
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async getUser(id: number): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError(id);
        }

        return this.toDto(user);
    }

    private toDto(user: User): UserDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}
```

### 4. Controller Layer

**Location:** `src/controllers/{entity}.controller.ts`

**Responsibilities:**
- HTTP request handling
- Input validation
- Response formatting

**Example:**
```typescript
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUser(id);
            res.json(user);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
```

---

## Validation Logic

### Input Validation

**Location:** Controller / Service

**Example:**
```typescript
// Controller validates input format
const id = parseInt(req.params.id);
if (isNaN(id)) {
    throw new ValidationException('Invalid ID format');
}

// Service validates business rules
if (user.email.includes('admin')) {
    throw new ValidationException('Invalid email address');
}
```

### Model Validation

**Location:** Model definition

**Example:**
```typescript
export class User extends Model {
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    })
    email!: string;
}
```

---

## Transformation Logic

### Entity → DTO

**Why:** Separate internal models from API responses

**Example:**
```typescript
// Internal model (with all fields)
class User {
    id: number;
    name: string;
    email: string;
    passwordHash: string; // Sensitive!
    createdAt: Date;
    updatedAt: Date;
}

// DTO (what we expose)
class UserDto {
    id: number;
    name: string;
    email: string;
    // No password!
}

// Transformation function
private toDto(user: User): UserDto {
    return {
        id: user.id,
        name: user.name,
        email: user.email
        // Explicitly exclude sensitive fields
    };
}
```

---

## Data Mapping

### Request → Model

```typescript
// HTTP Request
{ "name": "John", "email": "john@example.com" }

        ↓ (Controller validates)

// DTO (Data Transfer Object)
CreateUserDto { name: string; email: string; }

        ↓ (Service processes)

// Model
User { id: 1; name: "John"; email: "john@example.com"; passwordHash: "..."; }
```

### Model → Response

```typescript
// Model
User { id: 1; name: "John"; email: "john@example.com"; passwordHash: "..."; }

        ↓ (Service transforms)

// DTO
UserDto { id: 1; name: "John"; email: "john@example.com"; }

        ↓ (Controller formats)

// HTTP Response
{ "id": 1, "name": "John", "email": "john@example.com" }
```

---

## Common Patterns

### Pagination

```typescript
// Repository
async findAll(limit: number, offset: number): Promise<User[]> {
    return User.findAll({ limit, offset });
}

// Service
async getUsers(page: number, pageSize: number): Promise<PaginatedResult<UserDto>> {
    const users = await this.userRepository.findAll(
        pageSize,
        (page - 1) * pageSize
    );

    return {
        data: users.map(u => this.toDto(u)),
        page,
        pageSize,
        total: users.length
    };
}
```

### Filtering

```typescript
// Repository
async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
}

// Service
async getUserByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
        throw new UserNotFoundError(email);
    }
    return this.toDto(user);
}
```

### Relationships

```typescript
// User has many Jobs
class User extends Model {
    jobs?: Job[];
}

// Repository with eager loading
async findByIdWithJobs(id: number): Promise<User | null> {
    return User.findByPk(id, {
        include: [Job]
    });
}
```

---

**End of MODEL_FLOW.md**
EOF
    echo "  ✅ Generated docs/MODEL_FLOW.md"
fi

# API_PATTERNS.md (if API detected)
if [ "$API_PATTERNS_REQUIRED" = true ]; then
    cat > docs/API_PATTERNS.md << 'EOF'
# {REPO_NAME} API Patterns

**Last Updated:** $(date +%Y-%m-%d)

---

## Request/Response Format

### Standard Request Format

```typescript
// GET request
GET /api/users/{id}

// POST request
POST /api/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}

// PUT request
PUT /api/users/{id}
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com"
}

// DELETE request
DELETE /api/users/{id}
```

---

### Standard Response Format

#### Success Response

```typescript
// Single item
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}

// Paginated list
{
    "data": [...],
    "page": 1,
    "pageSize": 10,
    "total": 100
}

// Created (201)
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}
```

#### Error Response

```typescript
// Validation error (400)
{
    "error": "Validation Error",
    "message": "Invalid email format",
    "details": [
        {
            "field": "email",
            "message": "Email must be valid"
        }
    ]
}

// Not found (404)
{
    "error": "Not Found",
    "message": "User with ID 999 not found"
}

// Server error (500)
{
    "error": "Internal Server Error",
    "message": "An unexpected error occurred"
}
```

---

## Error Handling Patterns

### Controller Error Handling

```typescript
async getById(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);
        const user = await this.userService.getUser(id);
        res.json(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({
                error: "Not Found",
                message: error.message
            });
        } else if (error instanceof ValidationException) {
            res.status(400).json({
                error: "Validation Error",
                message: error.message,
                details: error.details
            });
        } else {
            res.status(500).json({
                error: "Internal Server Error",
                message: "An unexpected error occurred"
            });
        }
    }
}
```

### Service Error Handling

```typescript
async getUser(id: number): Promise<UserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }

    return this.toDto(user);
}
```

---

## HTTP Status Codes

### Success Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE (no response body)

### Error Codes

- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## Endpoint Patterns

### Standard CRUD Endpoints

```
GET    /api/users          - List all users (paginated)
GET    /api/users/{id}     - Get user by ID
POST   /api/users          - Create new user
PUT    /api/users/{id}     - Update user (full)
PATCH  /api/users/{id}     - Update user (partial)
DELETE /api/users/{id}     - Delete user
```

### Custom Endpoints

```
POST   /api/users/{id}/jobs     - Add job to user
GET    /api/users/{id}/jobs     - Get user's jobs
DELETE /api/users/{id}/jobs/{id} - Remove job from user
```

---

## Authentication

### Bearer Token Authentication

```bash
# Request
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```typescript
// Middleware
function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
```

---

## Rate Limiting

### Configuration

```typescript
// Rate limit: 100 requests per 15 minutes
const rateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests
    message: 'Too many requests, please try again later'
});

app.use('/api/', rateLimit);
```

### Response

```json
{
    "error": "Too Many Requests",
    "message": "Rate limit exceeded. Please try again later."
}
```

---

## Pagination

### Request

```
GET /api/users?page=1&pageSize=10
```

### Response

```json
{
    "data": [...],
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
}
```

---

## Filtering

### Request

```
GET /api/users?name=John&status=active
```

### Response

```json
{
    "data": [
        { "id": 1, "name": "John Doe", "status": "active" },
        { "id": 5, "name": "John Smith", "status": "active" }
    ],
    "total": 2
}
```

---

## Sorting

### Request

```
GET /api/users?sortBy=name&order=asc
```

### Response

```json
{
    "data": [
        { "id": 1, "name": "Alice" },
        { "id": 2, "name": "Bob" },
        { "id": 3, "name": "Charlie" }
    ]
}
```

---

**End of API_PATTERNS.md**
EOF
    echo "  ✅ Generated docs/API_PATTERNS.md"
fi

# AUTH.md (if auth detected)
if [ "$AUTH_REQUIRED" = true ]; then
    cat > docs/AUTH.md << 'EOF'
# {REPO_NAME} Authentication & Authorization

**Last Updated:** $(date +%Y-%m-%d)

---

## Authentication Method

### JWT (JSON Web Token)

**Algorithm:** HS256
**Secret:** {Environment variable}

---

## Authentication Flow

### 1. User Login

```
POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "User Name"
    }
}
```

### 2. Token Usage

**Include token in subsequent requests:**

```
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Token Refresh

```
POST /api/auth/refresh
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
    "token": "new_token_here"
}
```

---

## Authorization

### Role-Based Access Control (RBAC)

**Roles:**
- `admin` - Full access
- `user` - Limited access
- `guest` - Read-only access

### Permission Matrix

| Resource   | Admin | User | Guest |
|------------|-------|------|-------|
| Users      | CRUD  | R    | R     |
| Jobs       | CRUD  | CRUD | R     |
| Profiles   | CRUD  | R    | R     |

---

## Middleware

### Authentication Middleware

```typescript
export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
```

### Authorization Middleware

```typescript
export function authorize(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    };
}
```

---

## Guards

### Route Guards

```typescript
// Public route
router.get('/public', (req, res) => { ... });

// Authenticated route
router.get('/protected', authenticate, (req, res) => { ... });

// Admin-only route
router.delete('/users/:id',
    authenticate,
    authorize('admin'),
    (req, res) => { ... }
);
```

---

## Token Structure

### JWT Payload

```json
{
    "sub": "123",
    "email": "user@example.com",
    "role": "user",
    "iat": 1516239022,
    "exp": 1516325422
}
```

**Fields:**
- `sub` - User ID
- `email` - User email
- `role` - User role
- `iat` - Issued at
- `exp` - Expiration time

---

## Security Best Practices

### Token Storage

- ✅ **DO:** Store tokens in httpOnly cookies
- ✅ **DO:** Use secure flag in production
- ✅ **DO:** Implement token expiration
- ❌ **DON'T:** Store tokens in localStorage
- ❌ **DON'T:** Send tokens over HTTP

### Password Security

```typescript
// Hash passwords with bcrypt
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify passwords
const isValid = await bcrypt.compare(password, hashedPassword);
```

---

## Public Routes

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/health
```

## Protected Routes

```
GET    /api/users          - Authenticated
GET    /api/users/:id      - Authenticated
POST   /api/users          - Admin only
```

---

**End of AUTH.md**
EOF
    echo "  ✅ Generated docs/AUTH.md"
fi

echo "  ✅ Documentation generation complete"
```

---

### Step 3: Store Documentation in Memory

**After validating/generating documentation for all repositories, store in memory:**

```bash
# Create repository documentation index
cat > /tmp/harbor_repositories_documentation_index.md << 'EOF'
# Harbor Repositories Documentation Index

**Last Updated:** $(date +%Y-%m-%d)

---

## Repositories with Documentation

{List all repositories and their documentation status}

---

## Documentation Summary by Repository

{Summary of each repository's documentation}

---

## Cross-Repository Dependencies

{Map of dependencies between repositories}

EOF

echo "💾 Stored in memory: /tmp/harbor_repositories_documentation_index.md"
```

---

## Execution Summary

### ✅ Success Indicators

- All repositories have `docs` folder
- All required files present
- All conditional files present (if applicable)
- Documentation loaded into memory
- Ready to proceed with task

### ❌ Failure Indicators

- Any repository missing `docs` folder
- Any required file missing
- Documentation generation failed

---

## Quick Reference

```bash
# Check all repositories
find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'

# For each repo, check docs
for repo in $(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    echo "Checking: $repo"
    [ -d "$repo/docs" ] && echo "  ✅ docs exists" || echo "  ❌ docs missing"
done

# Load documentation from all repos
for repo in $(find . -maxdepth 2 -type d -name ".git" | sed 's|/.git||'); do
    if [ -d "$repo/docs" ]; then
        echo "=== $repo ==="
        cat "$repo/docs"/*.md
    fi
done
```

---

**End of Multi-Repository Documentation Scan**
