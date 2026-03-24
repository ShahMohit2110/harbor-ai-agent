# Documentation Templates

**Version:** 1.0.0
**Purpose:** Templates for auto-generating repository documentation

**These templates are used by the Documentation Validator Tool to automatically generate documentation files.**

---

## Template 1: ARCHITECTURE.md

```markdown
# {SERVICE_NAME} Architecture

**Last Updated:** {CURRENT_DATE}
**Version:** 1.0.0
**Repository:** {REPO_NAME}

---

## Service Overview

**{SERVICE_NAME}** is a {SERVICE_TYPE} that {MAIN_PURPOSE}.

### Purpose

{DETAILED_PURPOSE}

### Key Responsibilities

- {RESPONSIBILITY_1}
- {RESPONSIBILITY_2}
- {RESPONSIBILITY_3}

### Business Value

{BUSINESS_VALUE}

---

## Microservice Role

**Type:** {BACKEND_SERVICE | FRONTEND_APPLICATION | SHARED_PACKAGE | MOBILE_APP}

**Category:** {MICROSERVICE | WEBSITE | API_GATEWAY | SHARED_LIBRARY}

**Position in System:**

{DESCRIBE_POSITION_IN_ARCHITECTURE}

---

## Technology Stack

- **Language:** {TypeScript | JavaScript | Python | Go}
- **Framework:** {Express | NestJS | Next.js | React Native}
- **Database:** {PostgreSQL | MongoDB | MSSQL | None}
- **ORM:** {Sequelize | TypeORM | Prisma | Mongoose | None}
- **Authentication:** {JWT | OAuth | Session | None}
- **API Protocol:** {REST | GraphQL | WebSocket | None}

---

## Cross-Service Relationships

### Upstream Dependencies (Services this service depends on)

| Service | Type | Purpose | Criticality |
|---------|------|---------|-------------|
| {SERVICE_1} | {API/Database/Package} | {WHY_NEEDED} | {HIGH/MEDIUM/LOW} |
| {SERVICE_2} | {API/Database/Package} | {WHY_NEEDED} | {HIGH/MEDIUM/LOW} |

### Downstream Dependents (Services that depend on this service)

| Service | Type | Usage | Impact Level |
|---------|------|-------|--------------|
| {SERVICE_1} | {CONSUMER_TYPE} | {HOW_THEY_USE_THIS} | {HIGH/MEDIUM/LOW} |
| {SERVICE_2} | {CONSUMER_TYPE} | {HOW_THEY_USE_THIS} | {HIGH/MEDIUM/LOW} |

### Shared Services Used

| Shared Service | Version | Purpose | Usage |
|----------------|---------|---------|-------|
| {@harbor/shared-model} | {VERSION} | {Shared data models} | {HOW_USED} |
| {@harbor/shared-utils} | {VERSION} | {Shared utilities} | {HOW_USED} |
| {@harbor/shared-config} | {VERSION} | {Shared configuration} | {HOW_USED} |

---

## Dependency Graph

```
                    ┌─────────────────┐
                    │   {UPSTREAM_1}  │
                    └────────┬────────┘
                             │
                             ▼
┌──────────────┐      ┌──────────────────┐      ┌──────────────┐
│ {UPSTREAM_2} │─────▶│  {THIS_SERVICE}  │─────▶│ {DOWNSTREAM_1}│
└──────────────┘      └──────────────────┘      └──────────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │{DOWNSTREAM_2}│
                      └──────────────┘
```

---

## Service Boundaries

### This Service OWNS:

- {DATA_OWNED_1}
- {DATA_OWNED_2}
- {FUNCTIONALITY_OWNED}

### This Service DOES NOT OWN:

- {DATA_NOT_OWNED} (owned by {SERVICE})
- {FUNCTIONALITY_NOT_OWNED} (handled by {SERVICE})

### Communication Rules

- ✅ **DO:** {COMMUNICATION_RULE_1}
- ✅ **DO:** {COMMUNICATION_RULE_2}
- ❌ **DON'T:** {COMMUNICATION_RULE_PROHIBITED_1}
- ❌ **DON'T:** {COMMUNICATION_RULE_PROHIBITED_2}

---

## Data Flow

### Request Flow

```
Client/API Gateway
    ↓
{ENTRY_POINT} (Controller/Handler)
    ↓
{SERVICE_LAYER}
    ↓
{REPOSITORY_LAYER}
    ↓
Database/External Service
```

### Response Flow

```
Database/External Service
    ↓
{REPOSITORY_LAYER}
    ↓
{SERVICE_LAYER} (Business Logic)
    ↓
{ENTRY_POINT} (Response Formatting)
    ↓
Client
```

---

## Endpoints / Key Features

### API Endpoints (if applicable)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| {GET} | {PATH} | {PURPOSE} | {YES/NO} |
| {POST} | {PATH} | {PURPOSE} | {YES/NO} |
| {PUT} | {PATH} | {PURPOSE} | {YES/NO} |
| {DELETE} | {PATH} | {PURPOSE} | {YES/NO} |

### Key Features

- {FEATURE_1}: {DESCRIPTION}
- {FEATURE_2}: {DESCRIPTION}
- {FEATURE_3}: {DESCRIPTION}

---

## Scalability & Performance

### Current Scale

- Requests per second: {RPS}
- Concurrent users: {CONCURRENT_USERS}
- Database size: {DB_SIZE}

### Scalability Strategy

- {SCALABILITY_APPROACH_1}
- {SCALABILITY_APPROACH_2}

### Performance Considerations

- {PERFORMANCE_CONSIDERATION_1}
- {PERFORMANCE_CONSIDERATION_2}

---

## Security Considerations

### Authentication

- {AUTH_METHOD}: {DESCRIPTION}

### Authorization

- {AUTHZ_METHOD}: {DESCRIPTION}

### Data Protection

- {DATA_PROTECTION_1}
- {DATA_PROTECTION_2}

### Security Best Practices

- {SECURITY_PRACTICE_1}
- {SECURITY_PRACTICE_2}

---

## Monitoring & Observability

### Logging

- Logging framework: {FRAMEWORK}
- Log level: {LEVEL}
- Log destination: {DESTINATION}

### Metrics

- Metrics tracked: {METRICS}
- Monitoring tool: {TOOL}

### Health Checks

- Health check endpoint: {ENDPOINT}
- Health check interval: {INTERVAL}

---

## Deployment

### Deployment Method

- {DEPLOYMENT_METHOD}: {DESCRIPTION}

### Environment Configuration

- Development: {DEV_CONFIG}
- Staging: {STAGING_CONFIG}
- Production: {PROD_CONFIG}

### Infrastructure

- Hosting platform: {PLATFORM}
- Container: {DOCKER/KUBERNETES/NONE}
- Load balancer: {LOAD_BALANCER}

---

## Future Enhancements

### Planned Features

- {PLANNED_FEATURE_1}: {DESCRIPTION}
- {PLANNED_FEATURE_2}: {DESCRIPTION}

### Technical Debt

- {TECH_DEBT_1}: {DESCRIPTION}
- {TECH_DEBT_2}: {DESCRIPTION}

---

## Related Documentation

- **Structure:** See `STRUCTURE.md`
- **Dependencies:** See `DEPENDENCIES.md`
- **Model Flow:** See `MODEL_FLOW.md`
- **Service Rules:** See `SERVICE_RULES.md`
- **Change Impact:** See `CHANGE_IMPACT.md`

---

**End of ARCHITECTURE.md**
```

---

## Template 2: STRUCTURE.md

```markdown
# {SERVICE_NAME} Structure

**Last Updated:** {CURRENT_DATE}
**Version:** 1.0.0

---

## Folder Structure

```
{SERVICE_NAME}/
├── src/                    # Source code
│   ├── controllers/        # Request handlers (if API)
│   ├── services/           # Business logic
│   ├── repositories/       # Data access layer
│   ├── models/             # Data models (if applicable)
│   ├── middlewares/        # Express/HTTP middlewares
│   ├── routes/             # Route definitions
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   └── index.ts            # Entry point
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── docs/                   # Documentation
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── README.md              # Project README
```

---

## Layer Responsibilities

### Controllers Layer (`src/controllers/`)

**Purpose:** Handle HTTP requests and responses

**Responsibilities:**
- Validate incoming requests
- Call service layer
- Format responses
- Handle HTTP-specific errors

**Example:**
```typescript
// src/controllers/UserController.ts
export class UserController {
    async getUsers(req: Request, res: Response) {
        // Validate request
        // Call service
        // Format response
    }
}
```

---

### Services Layer (`src/services/`)

**Purpose:** Implement business logic

**Responsibilities:**
- Implement business rules
- Coordinate between repositories
- Handle transactions
- Validate business constraints

**Example:**
```typescript
// src/services/UserService.ts
export class UserService {
    async createUser(data: CreateUserDto) {
        // Business logic
        // Validation
        // Repository calls
    }
}
```

---

### Repositories Layer (`src/repositories/`)

**Purpose:** Data access abstraction

**Responsibilities:**
- Database queries
- ORM operations
- Data transformation
- Transaction management

**Example:**
```typescript
// src/repositories/UserRepository.ts
export class UserRepository {
    async findById(id: string) {
        // Database query
        // Return entity
    }
}
```

---

### Models Layer (`src/models/`)

**Purpose:** Define data structures

**Responsibilities:**
- Define database schema
- Define data types
- Define relationships
- Validate data

**Example:**
```typescript
// src/models/User.ts
export class User {
    id: string;
    name: string;
    email: string;
    // ...
}
```

---

## File Organization

### By Feature

**Files organized by feature:**
```
src/
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.repository.ts
│   └── user.model.ts
├── blog/
│   ├── blog.controller.ts
│   ├── blog.service.ts
│   ├── blog.repository.ts
│   └── blog.model.ts
```

### By Layer

**Files organized by layer:**
```
src/
├── controllers/
│   ├── user.controller.ts
│   └── blog.controller.ts
├── services/
│   ├── user.service.ts
│   └── blog.service.ts
├── repositories/
│   ├── user.repository.ts
│   └── blog.repository.ts
└── models/
    ├── user.model.ts
    └── blog.model.ts
```

**Current Organization:** {CURRENT_ORGANIZATION}

---

## Configuration Files

### Main Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `.env` | Environment variables |
| `{CONFIG_FILE}` | Application configuration |

### Build Configuration

| File | Purpose |
|------|---------|
| `{BUILD_CONFIG}` | Build configuration |
| `{WEBPACK_CONFIG}` | Webpack configuration (if applicable) |

---

## Entry Points

### Main Entry Point

**File:** `{ENTRY_POINT_FILE}`

**Purpose:** {ENTRY_POINT_PURPOSE}

**Example:**
```typescript
// src/index.ts
import express from 'express';
import { UserController } from './controllers/UserController';

const app = express();
// ... setup
app.listen(3000);
```

### Other Entry Points

- {ENTRY_POINT_2}: {PURPOSE}
- {ENTRY_POINT_3}: {PURPOSE}

---

## Naming Conventions

### Files

- **Controllers:** `{Name}.controller.ts`
- **Services:** `{Name}.service.ts`
- **Repositories:** `{Name}.repository.ts`
- **Models:** `{Name}.model.ts`
- **Middlewares:** `{Name}.middleware.ts`
- **Utils:** `{Name}.util.ts`

### Classes

- **PascalCase:** `UserService`, `UserRepository`

### Functions/Variables

- **camelCase:** `getUserById`, `createUser`

### Constants

- **UPPER_SNAKE_CASE:** `API_BASE_URL`, `MAX_RETRY_COUNT`

---

## Code Organization Best Practices

### 1. Separation of Concerns

- Controllers handle HTTP only
- Services handle business logic only
- Repositories handle data access only

### 2. Dependency Injection

- Dependencies injected via constructor
- Enables testing and modularity

### 3. Module Boundaries

- Clear boundaries between modules
- Minimal coupling between modules

### 4. Consistent Structure

- Follow established patterns
- Consistent file naming
- Consistent folder structure

---

## Related Documentation

- **Architecture:** See `ARCHITECTURE.md`
- **Dependencies:** See `DEPENDENCIES.md`
- **Development Rules:** See `DEVELOPMENT_RULES.md`

---

**End of STRUCTURE.md**
```

---

## Template 3: MODEL_FLOW.md

```markdown
# Model Flow

**Last Updated:** {CURRENT_DATE}
**Version:** 1.0.0

---

## Complete Data Flow

```
┌─────────────┐
│   REQUEST   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│   CONTROLLER LAYER          │
│ - Validate request          │
│ - Parse parameters          │
│ - Call service              │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   SERVICE LAYER             │
│ - Business logic            │
│ - Validation                │
│ - Call repository           │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   REPOSITORY LAYER          │
│ - Database queries          │
│ - ORM operations            │
│ - Data transformation       │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────┐
│  DATABASE   │
└─────────────┘
```

---

## Model Lifecycle

### 1. Define Model

**Location:** `src/models/{ModelName}.ts`

**Purpose:** Define data structure and validation

**Example:**
```typescript
// src/models/User.ts
export class User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}
```

---

### 2. Register in ORM

**Location:** `src/database/{ORM_CONFIG}`

**Purpose:** Register model with ORM (Sequelize, TypeORM, etc.)

**Example:**
```typescript
// src/database/sequelize.ts
import { User } from '../models/User';

export const sequelize = new Sequelize(...);
export const UserModel = sequelize.define('User', User);
```

---

### 3. Create Repository

**Location:** `src/repositories/{ModelName}Repository.ts`

**Purpose:** Data access operations

**Example:**
```typescript
// src/repositories/UserRepository.ts
export class UserRepository {
    async findById(id: string) {
        return UserModel.findByPk(id);
    }

    async create(data: CreateUserDto) {
        return UserModel.create(data);
    }
}
```

---

### 4. Create Service

**Location:** `src/services/{ModelName}Service.ts`

**Purpose:** Business logic

**Example:**
```typescript
// src/services/UserService.ts
export class UserService {
    constructor(private repo: UserRepository) {}

    async getUser(id: string) {
        // Business logic
        return this.repo.findById(id);
    }
}
```

---

### 5. Create Controller

**Location:** `src/controllers/{ModelName}Controller.ts`

**Purpose:** HTTP request handling

**Example:**
```typescript
// src/controllers/UserController.ts
export class UserController {
    constructor(private service: UserService) {}

    async getUser(req: Request, res: Response) {
        const user = await this.service.getUser(req.params.id);
        res.json(user);
    }
}
```

---

## Model Relationships

### One-to-Many

**Example:** User has many Posts

```typescript
// User model
export class User {
    hasMany(Post) {
        // Relationship definition
    }
}

// Post model
export class Post {
    belongsTo(User) {
        // Relationship definition
    }
}
```

### Many-to-Many

**Example:** User has many Roles (and vice versa)

```typescript
// User model
export class User {
    belongsToMany(Role, { through: 'UserRole' }) {
        // Relationship definition
    }
}

// Role model
export class Role {
    belongsToMany(User, { through: 'UserRole' }) {
        // Relationship definition
    }
}
```

---

## Data Transformation

### Input Transformation (Request → Model)

**Controller:** Validate and parse request
**Service:** Apply business rules
**Repository:** Transform to database format

### Output Transformation (Model → Response)

**Repository:** Return entity
**Service:** Apply business logic
**Controller:** Format response (DTO)

---

## Validation

### Request Validation

**Location:** Controller layer

**Purpose:** Validate HTTP request

**Example:**
```typescript
// Validate required fields
if (!req.body.email) {
    throw new BadRequestException('Email required');
}
```

### Business Validation

**Location:** Service layer

**Purpose:** Validate business rules

**Example:**
```typescript
// Check if email already exists
const existing = await this.repo.findByEmail(email);
if (existing) {
    throw new ConflictException('Email already exists');
}
```

### Data Validation

**Location:** Model/Repository layer

**Purpose:** Validate data constraints

**Example:**
```typescript
// ORM validation
User.init({
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    }
});
```

---

## Transactions

### Transaction Management

**Location:** Service layer

**Purpose:** Ensure data consistency

**Example:**
```typescript
async createUserWithProfile(userData, profileData) {
    const transaction = await this.sequelize.transaction();

    try {
        const user = await this.userRepo.create(userData, { transaction });
        await this.profileRepo.create({ ...profileData, userId: user.id }, { transaction });

        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
```

---

## Database Sync

### Sync Process

**Location:** `src/database/sync.ts`

**Purpose:** Sync models to database

**Example:**
```typescript
export async function syncDatabase() {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
}
```

---

## Related Documentation

- **Architecture:** See `ARCHITECTURE.md`
- **Database:** See `DATABASE.md`
- **Service Rules:** See `SERVICE_RULES.md`

---

**End of MODEL_FLOW.md**
```

---

## Template Usage Instructions

### How to Use These Templates

**When auto-generating documentation:**

1. **Analyze repository structure**
   ```bash
   find . -name "*.ts" -o -name "*.js"
   cat package.json
   ls -la src/
   ```

2. **Detect service information**
   ```bash
   # Detect framework
   grep -E "express|nestjs|fastify" package.json

   # Detect database
   grep -E "sequelize|typeorm|prisma" package.json

   # Detect models
   find . -path "*/models/*.ts" -o -path "*/entities/*.ts"
   ```

3. **Fill template variables**
   - `{SERVICE_NAME}` → From package.json name
   - `{SERVICE_TYPE}` → From framework detection
   - `{FRAMEWORK}` → From dependencies
   - `{DATABASE}` → From ORM detection
   - etc.

4. **Write generated file**
   ```bash
   cat > docs/ARCHITECTURE.md << 'EOF'
   {Filled template}
   EOF
   ```

---

**End of Documentation Templates**
