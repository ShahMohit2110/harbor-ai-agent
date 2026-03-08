# HarborService - Repository Context

**Document Version:** 1.0.0
**Last Updated:** 2025-03-06
**Repository Name:** HarborService
**Platform:** Harbor Job Marketplace

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Service Responsibilities](#service-responsibilities)
5. [API Structure](#api-structure)
6. [Database Usage](#database-usage)
7. [Inter-Service Communication](#inter-service-communication)
8. [Configuration and Environment Variables](#configuration-and-environment-variables)
9. [Coding Patterns](#coding-patterns)
10. [Important Files](#important-files)
11. [Development Workflow](#development-workflow)
12. [Rules for AI Modifications](#rules-for-ai-modifications)

---

## Repository Overview

**Repository Name:** HarborService

**Platform Purpose:**
Harbor is a comprehensive job marketplace platform that connects employers with job seekers. The platform facilitates job posting, job searching, application management, payment processing, and real-time communication between users.

**Architecture Style:**
Microservices Architecture - The platform is split into multiple independent services, each responsible for specific domain functionality. Services communicate through REST APIs, message queues, and WebSocket connections.

**Key Responsibilities:**
- User management and authentication
- Job posting and search functionality
- Payment processing via Stripe
- Real-time messaging and notifications
- API gateway for request routing
- Shared data models across services

---

## Technology Stack

### Core Technologies

**Runtime Environment:**
- **Node.js** - JavaScript runtime for all services
- **TypeScript** - Primary language for type safety and better developer experience

**Web Framework:**
- **Express.js** - HTTP server framework for all REST APIs
- **Express Middleware** - Request processing, authentication, validation, logging

**Database Technologies:**
- **PostgreSQL** - Primary relational database (via Sequelize ORM)
- **MongoDB** - Document database for specific use cases
- **Redis** - Caching and session storage (via ioredis)

**ORM/Query Layers:**
- **Sequelize** - Primary ORM for PostgreSQL (with sequelize-typescript)
- **Mongoose** - ODM for MongoDB operations

**Authentication & Security:**
- **JWT (jsonwebtoken)** - Token-based authentication
- **helmet** - Security HTTP headers
- **cors** - Cross-origin resource sharing

**Message Queues & Real-time:**
- **Bull** - Redis-based queue for job processing
- **Azure Service Bus** - Cloud messaging service (@azure/service-bus)
- **Socket.IO** - Real-time bidirectional communication (socket service)

**File Storage & Processing:**
- **Azure Blob Storage** - Cloud file storage (@azure/storage-blob)
- **Multer** - Multipart/form-data handling for file uploads
- **Sharp** - Image processing
- **Puppeteer** - Headless Chrome for PDF generation

**Communication:**
- **Axios** - HTTP client for service-to-service communication
- **Twilio** - SMS and messaging services
- **SendGrid** - Email sending service (@sendgrid/mail)

**Payment Processing:**
- **Stripe** - Payment gateway (stripe)

**Monitoring & Logging:**
- **Winston** - Logging library
- **Morgan** - HTTP request logger
- **Application Insights** - Azure monitoring (applicationinsights)

**Validation:**
- **express-validator** - Request validation middleware
- Custom validation schemas in middlewares/validations/

**API Documentation:**
- **Swagger** - API documentation (swagger-ui-express, swagger-jsdoc)

**Testing:**
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library for API testing

**Development Tools:**
- **nodemon** - Auto-restart on file changes
- **ts-node** - TypeScript execution
- **dotenv** - Environment variable management

---

## Project Structure

### Overall Repository Structure

The HarborService repository is a **monorepo** containing multiple microservices:

```
HarborService/
├── harbor-ai/                    # AI orchestration documentation
│   ├── architecture-overview.md
│   ├── service-map.md
│   ├── coding-rules.md
│   ├── task-intake.md
│   ├── planning.md
│   ├── execution.md
│   ├── testing.md
│   ├── pr.md
│   └── ai-workflow.md
│
├── harborApiGateWay/             # API Gateway service (Port 7000)
│   ├── controllers/              # Route handlers
│   ├── routes/                   # API route definitions
│   ├── middlewares/              # Express middleware
│   ├── services/                 # Business logic
│   ├── utils/                    # Utility functions
│   ├── config/                   # Configuration files
│   ├── types/                    # TypeScript type definitions
│   ├── repository/               # Data access layer
│   ├── logs/                     # Application logs
│   └── index.ts                  # Service entry point
│
├── harborUserSvc/                # User Service (Port 3001)
│   ├── controllers/              # User-related route handlers
│   ├── routes/                   # User route definitions
│   ├── service/                  # Business logic layer
│   ├── middlewares/              # Authentication & validation
│   ├── utils/                    # Utility functions
│   ├── config/                   # Database & service config
│   ├── types/                    # TypeScript types
│   ├── repository/               # Data access layer
│   ├── database/                 # Database-related files
│   ├── uploads/                  # User-uploaded files
│   └── index.ts                  # Service entry point
│
├── harborJobSvc/                 # Job Service (Port 3004)
│   ├── controllers/              # Job-related route handlers
│   ├── routes/                   # Job route definitions
│   ├── service/                  # Business logic layer
│   ├── middlewares/              # Validation & auth middleware
│   ├── utils/                    # Utility functions
│   ├── config/                   # Configuration files
│   ├── types/                    # TypeScript types
│   ├── repository/               # Data access layer
│   ├── uploads/                  # Job-related uploads
│   ├── temp/                     # Temporary files
│   ├── assets/                   # Static assets
│   └── index.ts                  # Service entry point
│
├── harborNotificationSvc/        # Notification Service (Port 3003)
│   ├── controllers/              # Notification handlers
│   ├── routes/                   # Notification routes
│   ├── service/                  # Business logic
│   ├── middlewares/              # Middleware
│   ├── utils/                    # Utilities
│   ├── config/                   # Configuration
│   ├── types/                    # Types
│   ├── repository/               # Data access
│   └── index.ts                  # Service entry point
│
├── harborSocketSvc/              # Socket Service (WebSocket)
│   ├── controllers/              # Socket event handlers
│   ├── routes/                   # Socket routes
│   ├── service/                  # Business logic
│   ├── middlewares/              # Middleware
│   ├── utils/                    # Utilities
│   ├── config/                   # Configuration
│   ├── types/                    # Types
│   ├── repository/               # Data access
│   └── index.ts                  # Service entry point
│
├── harborDatabaseSvc/            # Database Service
│   ├── controllers/
│   ├── routes/
│   ├── service/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   ├── types/
│   └── index.ts
│
├── harborSharedModels/           # Shared Database Models Package
│   ├── dist/                     # Compiled JavaScript
│   ├── models/                   # Sequelize model definitions
│   ├── interfaces/               # TypeScript interfaces
│   ├── enums/                    # Enumerations
│   └── index.ts                  # Package entry point
│
└── harborWebsite/                # Frontend Website
    └── [Frontend files]
```

### Individual Service Structure

Each microservice follows a consistent structure:

```
<service-name>/
├── controllers/          # Request handlers (Controller layer)
├── routes/               # API route definitions and mapping
├── service/ or services/  # Business logic (Service layer)
├── repository/           # Data access (Repository layer)
├── middlewares/          # Express middleware (auth, validation)
├── utils/                # Helper functions and utilities
├── config/               # Configuration files (database, AWS, etc.)
├── types/                # TypeScript type definitions
├── uploads/              # Uploaded file storage
├── logs/                 # Application logs
├── manifests/            # Kubernetes deployment manifests
├── tests/ or __tests__/   # Test files
├── swagger.json          # API documentation
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── Dockerfile             # Container image definition
├── index.ts               # Application entry point
└── run.sh                 # Start script
```

---

## Service Responsibilities

### harborApiGateWay (Port 7000)
**Purpose:** Single entry point for all client requests

**Responsibilities:**
- Route incoming requests to appropriate microservices
- Handle authentication and authorization
- Request/response transformation
- Rate limiting and throttling
- CORS management
- SSL termination
- API versioning

**Key Files:**
- `routes/` - Route definitions for proxying
- `controllers/` - Gateway-level controllers
- `middlewares/` - Auth, logging, error handling

---

### harborUserSvc (Port 3001)
**Purpose:** User management and authentication

**Responsibilities:**
- User registration and login
- JWT token generation and validation
- User profile management
- Password reset functionality
- Social authentication (Google, Apple)
- User preferences and settings
- User role management (employer, job seeker)

**Key Files:**
- `controllers/auth.ts` - Authentication endpoints
- `service/auth.ts` - Auth business logic
- `middlewares/auth.ts` - JWT verification

---

### harborJobSvc (Port 3004)
**Purpose:** Job posting and management

**Responsibilities:**
- Job creation and updates
- Job search and filtering
- Job application management
- Payment processing for jobs
- Job completion workflow
- Counter-offer management
- Job reports and analytics
- Salary calculations
- Job file uploads (images, PDFs)

**Key Files:**
- `controllers/job.ts` - Job CRUD operations
- `service/job.ts` - Job business logic
- `repository/job.ts` - Job data access

---

### harborNotificationSvc (Port 3003)
**Purpose:** Notification and communication management

**Responsibilities:**
- Email notifications (SendGrid)
- SMS notifications (Twilio)
- Push notifications (FCM)
- In-app notifications
- Notification preferences management
- Notification templates
- Event-driven notifications

**Key Files:**
- `controllers/notification.ts`
- `service/notifications.ts`

---

### harborSocketSvc
**Purpose:** Real-time bidirectional communication

**Responsibilities:**
- WebSocket connection management
- Real-time messaging
- Online/offline status
- Typing indicators
- Message delivery status
- Chat room management
- Event broadcasting

**Key Technologies:**
- Socket.IO
- Redis for pub/sub across socket instances

---

### harborDatabaseSvc
**Purpose:** Database operations and migrations

**Responsibilities:**
- Database migrations
- Database health checks
- Backup operations
- Data synchronization
- Query optimization

---

### harborSharedModels
**Purpose:** Shared database models and interfaces

**Responsibilities:**
- Define Sequelize models used across services
- Shared TypeScript interfaces
- Common enumerations
- Database schema definitions
- Type-safe database operations

**Usage:**
Installed as npm package in all services:
```json
"harbor-shared-models": "5.8.53"
```

---

## API Structure

### Route Organization

Routes are organized in the `routes/` directory of each service:

```typescript
// routes/index.ts - Main route aggregator
import job from "./job";
import user from "./user";
import plan from "./plan";

export default (): Router => {
  job(router);
  user(router);
  plan(router);
  return router;
};
```

### Route Definition Pattern

Individual route files follow this pattern:

```typescript
// routes/job.ts
export default (router: Router) => {
  router.post(
    "/job",
    authentication.verifyToken,      // Middleware 1: Auth
    jobDataValidation,               // Middleware 2: Validation
    Validation,                      // Middleware 3: Common validation
    jobController.createJob          // Handler: Controller method
  );

  router.get("/job", jobController.listJob);
  router.put("/job/:id", jobController.updateJob);
  router.delete("/job/:id", jobController.deleteJob);
};
```

### Middleware Order

Middleware is applied in this order:
1. **Authentication** - `authentication.verifyToken` (if required)
2. **Request Validation** - Schema-specific validation
3. **Common Validation** - `validation` middleware
4. **Controller Handler** - Actual request handling

### Controller Pattern

Controllers are organized as classes with dependency injection:

```typescript
// controllers/job.ts
export class JobController {
  private jobService: JobService;
  private devLogsRepository: any;

  constructor() {
    this.jobService = new JobService();
    this.devLogsRepository = new DevLogRepository();
  }

  createJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobService.createJob(req.body);
      res.status(200).json({
        status: true,
        message: "Job created successfully",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message
      });
    }
  };
}
```

### Request Validation

Validation is handled using `express-validator`:

```typescript
// middlewares/validations/job.ts
import { body } from "express-validator";

export const jobDataValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("salaryMin").isNumeric().withMessage("Salary must be numeric"),
];
```

### Response Format

Standard response format across all services:

**Success Response:**
```json
{
  "status": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "status": false,
  "message": "Error message describing what went wrong"
}
```

**Validation Error Response:**
```json
{
  "status": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

---

## Database Usage

### Database Technologies

**PostgreSQL (via Sequelize):**
- Primary database for structured data
- Used for: Users, Jobs, Payments, Notifications
- ORM: Sequelize with TypeScript decorators

**MongoDB (via Mongoose):**
- Document database for flexible schemas
- Used for: Logs, temporary data, unstructured content

**Redis:**
- Caching layer
- Session storage
- Message queue backend (Bull)

### Sequelize Models

Models are defined in `harborSharedModels` package:

```typescript
// harborSharedModels/models/Job.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "jobs" })
export class Job extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  title!: string;

  @Column({ allowNull: false })
  description!: string;

  @Column({ allowNull: false })
  employerId!: number;

  @Column({ defaultValue: "active" })
  status!: string;

  @Column({ type: DataType.JSON })
  metadata!: object;
}
```

### Repository Pattern

Data access is abstracted through repository classes:

```typescript
// repository/job.ts
export class JobRepository {
  async create(jobData: CreateJobDto): Promise<Job> {
    return await Job.create(jobData);
  }

  async findById(id: number): Promise<Job | null> {
    return await Job.findByPk(id);
  }

  async findAll(filters: JobFilters): Promise<Job[]> {
    return await Job.findAll({
      where: filters,
      limit: 20,
      offset: 0
    });
  }

  async update(id: number, data: UpdateJobDto): Promise<void> {
    await Job.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await Job.destroy({ where: { id } });
  }
}
```

### Database Configuration

Database connection is configured in `config/`:

```typescript
// config/database.ts
import { Sequelize } from "sequelize-typescript";
import { Job } from "harbor-shared-models/models";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres",
  models: [Job], // Import models
  logging: false
});

export default sequelize;
```

### Migration Strategy

- Database migrations are handled manually or via migration scripts
- No explicit migration tool seen (like Sequelize CLI)
- Migrations likely in `config/` or root of services
- Use transactions for data consistency

---

## Inter-Service Communication

### Service-to-Service HTTP Communication

Services communicate via REST APIs using Axios:

```typescript
// Example: Job Service calling User Service
import axios from "axios";

const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:3001";

async function getUserById(userId: string) {
  try {
    const response = await axios.get(`${userServiceUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw new Error("Failed to fetch user");
  }
}
```

### API Gateway Pattern

All external client requests go through API Gateway:

```
Client Request
    ↓
API Gateway (Port 7000)
    ↓
Routes to appropriate service:
    ├── /api/users/* → User Service (Port 3001)
    ├── /api/jobs/* → Job Service (Port 3004)
    ├── /api/notifications/* → Notification Service (Port 3003)
    └── /socket/* → Socket Service
```

### Message Queue Communication

Services use Bull queues for asynchronous communication:

```typescript
// Queue setup
import Queue from "bull";

const jobQueue = new Queue("job-processing", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

// Publishing events
await jobQueue.add({
  type: "job.created",
  jobId: job.id,
  employerId: job.employerId
});

// Processing events
jobQueue.process(async (job) => {
  if (job.data.type === "job.created") {
    await sendNotificationToEmployer(job.data);
  }
});
```

### Azure Service Bus

For cloud messaging, Azure Service Bus is used:

```typescript
import { ServiceBusClient } from "@azure/service-bus";

const serviceBusClient = new ServiceBusClient(
  process.env.AZURE_SERVICE_BUS_CONNECTION_STRING
);

// Publishing messages
const sender = serviceBusClient.createSender("job-notifications");
await sender.sendMessages({
  body: { jobId: 123, action: "created" }
});
```

### Real-time Communication (Socket.IO)

WebSocket communication handled by Socket Service:

```typescript
// Socket Service
import { Server } from "socket.io";

const io = new Server(port);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("new-message", data);
  });
});
```

### Shared Models Package

The `harbor-shared-models` package provides:
- Common database models
- Shared TypeScript interfaces
- Type definitions for data structures
- Ensures consistency across services

---

## Configuration and Environment Variables

### Environment Variable Management

Each service uses a `.env` file for configuration:

```bash
# .env file structure

# Environment
NODE_ENV=local

# Database Configuration
DB_NAME=harbor_db_dev
DB_USER=harbor_db_dev
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# Service Configuration
HOST_URL=localhost
HOST_PORT=3004

# JWT Configuration
JWT_SECRET=harborsecret
JWT_EXPIRATION=7d

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# External Services
STRIPE_SECRET_KEY=sk_test_...
TWILIO_ACCOUNT_SID=AC...
SENDGRID_API_KEY=SG....

# Azure Configuration
AZURE_SERVICE_BUS_CONNECTION_STRING=Endpoint=sb://...
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;...

# Service URLs
USER_SERVICE_URL=http://localhost:3001
JOB_SERVICE_URL=http://localhost:3004
NOTIFICATION_SERVICE_URL=http://localhost:3003
```

### Configuration Files

Configuration is in `config/` directory:

```
config/
├── database.ts        # Database connection setup
├── redis.ts           # Redis configuration
├── azure.ts           # Azure services config
├── aws.ts             # AWS S3/config
├── jobUpload.ts       # Multer file upload config
└── index.ts           # Config aggregator
```

### Service Startup Configuration

Each service loads configuration in `index.ts`:

```typescript
import dotenv from "dotenv";
dotenv.config(); // Load .env file

const HOST = process.env.HOST_URL ?? "localhost";
const PORT = process.env.HOST_PORT ?? 3004;

app.listen(PORT, HOST, () => {
  console.log(`Service running on http://${HOST}:${PORT}`);
});
```

---

## Coding Patterns

### Controller → Service → Repository Pattern

The platform follows a strict three-layer architecture:

#### **Layer 1: Controller** (`controllers/`)
- Handles HTTP requests and responses
- Extracts data from Request object
- Calls Service layer
- Returns formatted responses
- **NO business logic**
- **NO database access**

```typescript
// controllers/job.ts
export class JobController {
  private jobService: JobService;

  constructor() {
    this.jobService = new JobService();
  }

  createJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobService.createJob(req.body);
      res.status(200).json({ status: true, data: result });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  };
}
```

#### **Layer 2: Service** (`service/`)
- Contains business logic
- Validates business rules
- Coordinates multiple repositories
- Calls Repository layer for data access
- **NO direct HTTP handling**
- **NO direct database queries**

```typescript
// service/job.ts
export class JobService {
  private jobRepository: JobRepository;
  private notificationService: NotificationService;

  constructor() {
    this.jobRepository = new JobRepository();
    this.notificationService = new NotificationService();
  }

  async createJob(jobData: CreateJobDto): Promise<Job> {
    // Business logic
    if (jobData.salaryMin > jobData.salaryMax) {
      throw new Error("Minimum salary cannot exceed maximum");
    }

    const job = await this.jobRepository.create(jobData);

    // Trigger notification
    await this.notificationService.notifyJobCreated(job);

    return job;
  }
}
```

#### **Layer 3: Repository** (`repository/`)
- Handles all database operations
- Executes Sequelize queries
- Returns data to Service layer
- **NO business logic**
- **NO HTTP operations**

```typescript
// repository/job.ts
export class JobRepository {
  async create(jobData: CreateJobDto): Promise<Job> {
    return await Job.create(jobData);
  }

  async findById(id: number): Promise<Job | null> {
    return await Job.findByPk(id);
  }

  async findAll(filters: any): Promise<Job[]> {
    return await Job.findAll({ where: filters });
  }
}
```

### Middleware Pattern

**Authentication Middleware:**
```typescript
// middlewares/auth.ts
export class Authentication {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
```

**Validation Middleware:**
```typescript
// middlewares/validations/common.ts
import { ValidationChain, validationResult } from "express-validator";

export const Validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};
```

### Error Handling Pattern

```typescript
// Consistent error handling across controllers
try {
  const result = await this.service.method(req.body);
  res.status(200).json({ status: true, data: result });
} catch (error) {
  res.status(500).json({
    status: false,
    message: error.message || "An error occurred"
  });
}
```

### Singleton Pattern for Utilities

```typescript
// utils/common.ts
export class CommonUtils {
  private static instance: CommonUtils;

  private constructor() {}

  static getInstance(): CommonUtils {
    if (!CommonUtils.instance) {
      CommonUtils.instance = new CommonUtils();
    }
    return CommonUtils.instance;
  }

  // Utility methods
  formatDate(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
  }
}

const commonUtils = CommonUtils.getInstance();
```

---

## Important Files

### Service Entry Point

**File:** `index.ts` (in each service root)

**Purpose:**
- Express app initialization
- Middleware configuration
- Route registration
- Server startup
- Database connection

```typescript
// index.ts structure
import express from "express";
import router from "./routes";
import { connectMongoDb } from "./config/mongodb";

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

// Routes
app.use("/job-svc", router);

// Health check
app.get("/job-svc/health-check", (req, res) => {
  res.status(200).json({ health: "okay" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
```

### Route Aggregator

**File:** `routes/index.ts`

**Purpose:** Aggregates all route modules

```typescript
// routes/index.ts
import job from "./job";
import user from "./user";

export default (): Router => {
  job(router);
  user(router);
  return router;
};
```

### Controllers Export

**File:** `controllers/index.ts`

**Purpose:** Exports all controllers for easy importing

```typescript
// controllers/index.ts
export * from "./job";
export * from "./user";
export * from "./auth";
```

### Package.json Scripts

**Standard scripts across all services:**

```json
{
  "scripts": {
    "build": "tsc",
    "start": "nodemon",
    "test": "jest"
  }
}
```

### Dockerfile

**File:** `Dockerfile` (in each service)

**Purpose:** Container image definition

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3004
CMD ["npm", "start"]
```

---

## Development Workflow

### Adding a New API Endpoint

**Step 1: Define Validation Schema**
```typescript
// middlewares/validations/job.ts
export const newEndpointValidation = [
  body("field1").notEmpty().withMessage("Field1 is required"),
  body("field2").isEmail().withMessage("Field2 must be email")
];
```

**Step 2: Add Repository Method** (if new data access needed)
```typescript
// repository/job.ts
async customMethod(params: any): Promise<any> {
  return await Job.findAll({ where: params });
}
```

**Step 3: Add Service Method**
```typescript
// service/job.ts
async newEndpointMethod(data: any): Promise<any> {
  // Business logic
  return await this.jobRepository.customMethod(data);
}
```

**Step 4: Add Controller Method**
```typescript
// controllers/job.ts
newEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this.jobService.newEndpointMethod(req.body);
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
```

**Step 5: Add Route**
```typescript
// routes/job.ts
router.post(
  "/new-endpoint",
  authentication.verifyToken,
  newEndpointValidation,
  Validation,
  jobController.newEndpoint
);
```

**Step 6: Build and Test**
```bash
npm run build
npm start
# Test endpoint
curl -X POST http://localhost:3004/job-svc/new-endpoint \
  -H "Content-Type: application/json" \
  -d '{"field1": "value", "field2": "test@example.com"}'
```

### Adding Database Query

**Step 1: Add to Repository**
```typescript
// repository/job.ts
async findByCustomFilter(filters: any): Promise<Job[]> {
  return await Job.findAll({
    where: filters,
    include: [{ model: User, as: "employer" }],
    limit: 20
  });
}
```

**Step 2: Call from Service**
```typescript
// service/job.ts
async getJobsWithFilter(filters: any): Promise<Job[]> {
  return await this.jobRepository.findByCustomFilter(filters);
}
```

### Adding New Validation

**Step 1: Create Validation Schema**
```typescript
// middlewares/validations/newValidation.ts
import { body, param } from "express-validator";

export const createItemValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("age").isInt({ min: 18 }).withMessage("Must be 18 or older")
];

export const getItemValidation = [
  param("id").isInt().withMessage("Invalid ID")
];
```

**Step 2: Use in Route**
```typescript
router.post(
  "/items",
  createItemValidation,
  Validation,
  controller.createItem
);
```

---

## Rules for AI Modifications

### 1. Follow Existing Architecture

**✅ DO:**
- Follow Controller → Service → Repository pattern
- Place code in correct layer
- Maintain separation of concerns
- Use existing file structure

**❌ DO NOT:**
- Mix layers (e.g., database queries in controller)
- Create new layers without justification
- Violate separation of concerns
- Restructure without planning

---

### 2. Service Boundary Rules

**✅ DO:**
- Only modify the service specified in the task
- Use service-map.md to identify correct service
- Respect service ownership
- Use public APIs for cross-service communication

**❌ DO NOT:**
- Modify multiple services without task requirement
- Access another service's database directly
- Import internal modules from other services
- Bypass API Gateway for service-to-service calls

---

### 3. Code Placement Rules

**✅ DO:**
- Controllers in `controllers/`
- Services in `service/` or `services/`
- Repositories in `repository/`
- Middleware in `middlewares/` or `middleware/`
- Routes in `routes/`
- Types in `types/`
- Utilities in `utils/`
- Config in `config/`

**❌ DO NOT:**
- Place business logic in controllers
- Place database queries in services
- Place HTTP handling in repositories
- Create files in wrong directories

---

### 4. Maintain Consistency

**✅ DO:**
- Follow existing code style
- Use existing patterns and conventions
- Match response formats
- Use existing error handling approach

**❌ DO NOT:**
- Introduce new patterns without justification
- Change established conventions
- Mix coding styles within same file
- Create inconsistent response formats

---

### 5. Export and Import Rules

**✅ DO:**
- Export controller classes
- Export service classes
- Export repository classes
- Use named exports for controllers
- Use barrel exports (index.ts) for organization

**❌ DO NOT:**
- Export functions outside classes
- Use default exports for controllers/services
- Create circular dependencies
- Import from services you shouldn't modify

---

### 6. Validation Rules

**✅ DO:**
- Add validation in `middlewares/validations/`
- Use express-validator
- Apply validation middleware before controller
- Return consistent validation error format

**❌ DO NOT:**
- Skip validation for required fields
- Validate in controller instead of middleware
- Use inconsistent error messages
- Ignore validation in existing code

---

### 7. Error Handling Rules

**✅ DO:**
- Use try-catch in async methods
- Return consistent error response format
- Log errors appropriately
- Provide meaningful error messages

**❌ DO NOT:**
- Let errors propagate without handling
- Return inconsistent error formats
- Expose sensitive information in errors
- Swallow errors silently

---

### 8. Database Query Rules

**✅ DO:**
- All queries in repository layer
- Use Sequelize ORM methods
- Use parameterized queries
- Add indexes for performance
- Use transactions for multi-step operations

**❌ DO NOT:**
- Write raw SQL queries (unless absolutely necessary)
- Execute queries in service or controller
- Use string concatenation for queries (SQL injection risk)
- Forget to handle query errors

---

### 9. Environment Variable Rules

**✅ DO:**
- Use .env files for configuration
- Reference env vars with process.env
- Provide default values where appropriate
- Document required environment variables

**❌ DO NOT:**
- Hardcode configuration values
- Commit .env files to git (use .env.example)
- Use different naming conventions
- Assume environment variables exist

---

### 10. Testing Rules

**✅ DO:**
- Write tests for new functionality
- Place tests in `__tests__/` or `tests/`
- Test success and failure cases
- Mock external dependencies

**❌ DO NOT:**
- Skip testing entirely
- Only test success cases
- Test implementation details instead of behavior
- Write fragile tests

---

## Quick Reference for Harbor-AI

### Common Commands

```bash
# Build service
npm run build

# Start service
npm start

# Run tests
npm test

# Type checking
npx tsc --noEmit

# Linting (if configured)
npm run lint
```

### Service Ports

- **API Gateway:** 7000
- **User Service:** 3001
- **Notification Service:** 3003
- **Job Service:** 3004
- **Socket Service:** (varies, check .env)

### Health Check Endpoints

```bash
# Job Service
http://localhost:3004/job-svc/health-check

# User Service
http://localhost:3001/user-svc/health-check

# API Gateway
http://localhost:7000/api/health
```

### Import Patterns

```typescript
// Correct import order
// 1. Node.js built-ins
import { Request, Response } from "express";
import path from "path";

// 2. External packages
import axios from "axios";
import _ from "lodash";

// 3. Internal modules
import { JobService } from "../service";
import { JobRepository } from "../repository";
import { CommonUtils } from "../utils";
```

### Controller Method Signature

```typescript
methodName = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this.service.methodName(req.body);
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
```

---

**END OF REPOSITORY CONTEXT DOCUMENT**

---

*This document provides Harbor-AI with comprehensive context about the HarborService repository. Use this document as a reference when planning and implementing changes to ensure consistency with existing architecture and patterns.*