# Harbor Agent Memory

**Memory Version:** 1.0.0
**Last Updated:** 2025-03-06
**Purpose:** Persistent memory for Harbor AI agent to maintain contextual understanding of the Harbor platform

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Service Responsibilities](#service-responsibilities)
3. [Technology Stack](#technology-stack)
4. [Backend Conventions](#backend-conventions)
5. [Development Patterns](#development-patterns)
6. [Architecture Patterns](#architecture-patterns)
7. [Data Flow Patterns](#data-flow-patterns)
8. [Integration Points](#integration-points)

---

## System Overview

### Platform Purpose

Harbor is a **microservices-based job marketplace** that connects employers with workers for short-term and recurring jobs. The platform handles job posting, worker matching, scheduling, payments, and communication.

### Architecture Type

**Microservices Architecture** with:
- Service-specific databases
- API Gateway for routing
- Shared models for type safety
- Event-driven communication
- Real-time capabilities via WebSocket service

### Deployment Model

- **Development Environment:** Local development with individual service startup
- **Services:** Independent Node.js processes
- **Database:** Shared PostgreSQL instance with service-specific schemas
- **Port Allocation:** Each service assigned specific port
- **API Gateway:** Single entry point for all client requests

### Key Characteristics

- **Modular Services:** Each service has distinct responsibility
- **Shared Types:** Common models package ensures data consistency
- **Database per Service:** Logical separation through schemas
- **Gateway Routing:** All external requests pass through API Gateway
- **Real-time Features:** WebSocket service handles live updates

---

## Service Responsibilities

### API Gateway (Port 7000)

**Primary Responsibility:** Single entry point for all client requests

**Key Functions:**
- Request routing to appropriate services
- Authentication and authorization validation
- Request/response transformation
- Rate limiting and throttling
- API versioning management
- Cross-service communication orchestration

**Client-Facing Routes:**
- All user-related endpoints (delegates to user-service)
- All job-related endpoints (delegates to job-service)
- All notification endpoints (delegates to notification-service)
- WebSocket connection initiation (delegates to socket-service)

**Does NOT Handle:**
- Business logic (delegates to services)
- Direct database access
- Long-running operations

---

### User Service (Port 3001)

**Primary Responsibility:** User management and authentication

**Core Capabilities:**
- User registration and profile management
- Authentication (JWT tokens)
- Authorization and role management
- User preferences and settings
- User gallery and media management
- Employer and worker profiles
- User search and discovery
- Location management
- Payment method management

**Database Entities:**
- Users (employers and workers)
- User profiles
- User settings
- Payment methods
- User gallery/media
- Location data

**Key Operations:**
- Create/update/delete user accounts
- Authenticate users and issue tokens
- Manage user roles and permissions
- Handle profile completeness
- Process user media uploads
- Manage user locations

---

### Job Service (Port 3004)

**Primary Responsibility:** Job lifecycle management

**Core Capabilities:**
- Job creation and posting
- Job search and filtering
- Job matching and recommendations
- Job scheduling and recurrence
- Job status management
- Work proof submission
- Job completion workflows
- Salary calculations
- Payment intent creation
- Finish job requests

**Database Entities:**
- Jobs (one-time and recurring)
- Job applications
- Job matches
- Job recurrences
- Finish job requests
- Work proof
- Payment intents
- Salary calculations

**Key Operations:**
- Create jobs with detailed specifications
- Search jobs by location, category, dates
- Match jobs with workers
- Manage job status (open, in-progress, completed)
- Handle job recurrence patterns
- Process work proof submissions
- Calculate job costs and fees
- Manage job completion workflows

---

### Notification Service (Port 3003)

**Primary Responsibility:** Multi-channel communication delivery

**Core Capabilities:**
- Email notifications
- SMS notifications via Twilio
- Push notifications
- In-app notifications
- Notification preferences
- Notification history
- Template management
- Delivery tracking

**Database Entities:**
- Notifications
- Notification templates
- Notification preferences
- Delivery history

**Key Operations:**
- Send notifications based on events
- Manage user notification preferences
- Track notification delivery status
- Handle notification templates
- Process bulk notifications
- Retry failed notifications

**External Integrations:**
- SendGrid (email)
- Twilio (SMS)
- Push notification services

---

### Socket Service

**Primary Responsibility:** Real-time communication and live updates

**Core Capabilities:**
- WebSocket connection management
- Real-time messaging
- Live job updates
- Presence tracking
- Typing indicators
- Real-time notifications
- Connection authentication

**Key Operations:**
- Establish WebSocket connections
- Broadcast messages to connected clients
- Handle connection lifecycle (connect, disconnect, reconnect)
- Emit real-time events (job updates, new messages)
- Manage user presence status
- Deliver instant notifications

**Use Cases:**
- Live chat between employer and worker
- Real-time job status updates
- Instant notification delivery
- Live location tracking updates

---

### Shared Models

**Primary Responsibility:** Type definitions and data models

**Core Components:**
- Database model definitions
- TypeScript interfaces
- Shared enums and constants
- Data transfer objects (DTOs)
- Validation schemas

**Purpose:**
- Ensure type safety across services
- Maintain data contract consistency
- Enable code sharing between services
- Single source of truth for data structures
- Facilitate API contract validation

**Key Models:**
- User models
- Job models
- Notification models
- Common utility types
- Enum definitions (job status, user roles, etc.)

---

## Technology Stack

### Core Technologies

**Runtime Environment:**
- Node.js - JavaScript runtime
- TypeScript - Typed JavaScript for type safety

**Web Framework:**
- Express.js - Web application framework
- Express middleware ecosystem

**Database:**
- PostgreSQL - Primary database
- Sequelize ORM - Database interaction
- Sequelize-TypeScript - TypeScript integration

**Authentication:**
- JSON Web Tokens (JWT) - Token-based authentication
- Passport.js - Authentication middleware (if applicable)

**Real-time Communication:**
- Socket.IO (or similar) - WebSocket implementation

**External Integrations:**
- SendGrid - Email delivery
- Twilio - SMS delivery
- Stripe - Payment processing
- Azure Service Bus - Event messaging (if applicable)
- Azure Blob Storage - File storage

**Development Tools:**
- Nodemon - Development server auto-restart
- TypeScript Compiler (tsc) - TypeScript compilation
- Jest - Testing framework
- Swagger/OpenAPI - API documentation

### Package Structure

**Service-Level Dependencies:**
- Express and related middleware
- Sequelize and database drivers
- Authentication libraries
- Validation libraries (express-validator)
- Service-specific libraries

**Shared Dependencies:**
- TypeScript configuration
- Common utilities
- Shared validation schemas
- Database connection utilities

---

## Backend Conventions

### Code Organization

**Standard Directory Structure:**
```
service-name/
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── repositories/      # Database access
│   ├── models/            # Sequelize models
│   ├── middlewares/       # Express middleware
│   ├── routes/            # Route definitions
│   ├── validators/        # Request validation schemas
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   └── index.ts           # Service entry point
├── tests/
├── package.json
└── tsconfig.json
```

### Naming Conventions

**Files:**
- Controllers: `{entity}.controller.ts` or `{entity}.ts`
- Services: `{entity}.service.ts`
- Routes: `{entity}.ts` in routes directory
- Models: `{entity}.model.ts` or imported from shared-models

**Code:**
- Classes: PascalCase (e.g., `JobController`)
- Functions/Methods: camelCase (e.g., `createJob`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- Interfaces/Types: PascalCase (e.g., `JobData`)

### Route Conventions

**Route Patterns:**
- RESTful conventions where applicable
- Plural nouns for collections: `/jobs`, `/users`
- Singular nouns for single resources: `/job/:id`
- Action-based routes for complex operations: `/job/:id/complete`

**HTTP Methods:**
- GET - Retrieve resources
- POST - Create resources or trigger actions
- PUT - Update resources (full update)
- PATCH - Partial updates (less common)
- DELETE - Remove resources

**Authentication:**
- Public routes: No authentication required
- Protected routes: `authentication.verifyToken` middleware
- Role-based routes: Additional role checking middleware

### Error Handling Conventions

**Response Format:**
```typescript
{
  status: boolean,
  message: string,
  data?: any,
  error?: any
}
```

**HTTP Status Codes:**
- 200 - Success (even for some error cases)
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

**Error Response Pattern:**
- Always return consistent structure
- Include descriptive error messages
- Log errors appropriately
- Sanitize error messages for external clients

---

## Development Patterns

### Controller-Service-Repository Pattern

**Three-Layer Architecture:**

**Controllers (Request/Response Layer):**
- Handle HTTP requests and responses
- Validate request data
- Call service methods
- Format responses
- Handle HTTP-specific concerns

**Services (Business Logic Layer):**
- Implement business rules
- Coordinate between repositories
- Handle complex operations
- Implement transactions
- No knowledge of HTTP

**Repositories (Data Access Layer):**
- Direct database interactions
- Sequelize model operations
- Query construction
- Data transformation

**Benefits:**
- Separation of concerns
- Testability (mock each layer)
- Reusability of business logic
- Clear boundaries

### API Gateway Pattern

**Request Flow:**
1. Client sends request to API Gateway
2. Gateway validates authentication
3. Gateway routes to appropriate service
4. Service processes request
5. Service returns response to Gateway
6. Gateway returns response to client

**Gateway Responsibilities:**
- Route determination
- Authentication/authorization
- Request validation (basic)
- Response formatting (if needed)
- Error handling (gateway-level)

### Middleware Chain Pattern

**Request Processing Pipeline:**
1. **Logging Middleware** - Log incoming requests
2. **CORS Middleware** - Handle cross-origin requests
3. **Body Parser** - Parse request body
4. **Authentication Middleware** - Validate tokens
5. **Validation Middleware** - Validate request data
6. **Route Handler** - Process business logic
7. **Error Handler** - Catch and format errors

**Middleware Order:**
- Global middleware first
- Route-specific middleware next
- Route handler last
- Error handler catches all

### Database Transaction Pattern

**Transaction Usage:**
- Multiple related database operations
- All-or-nothing consistency
- Rollback on failure
- Commit on success

**Common Scenarios:**
- Creating job with initial settings
- Updating job with related records
- Financial operations
- Multi-table updates

### Service Communication Pattern

**Direct HTTP Communication:**
- Services call each other via HTTP
- API Gateway orchestrates multi-service calls
- Synchronous communication for immediate needs
- Asynchronous for long-running operations

**Event-Driven Communication:**
- Service Bus (Azure Service Bus) for events
- Publish-subscribe pattern
- Decoupled services
- eventual consistency

---

## Architecture Patterns

### Microservices Principles

**Service Autonomy:**
- Each service owns its data
- Services deploy independently
- Services have single responsibility
- Services expose APIs for communication

**Database per Service:**
- Logical separation via schemas
- Services access only their data
- Shared models provide type safety
- No direct database access across services

**API Gateway as Facade:**
- Single entry point for clients
- Hides service complexity
- Handles cross-cutting concerns
- Routes to appropriate services

### Modular Backend Architecture

**Separation of Concerns:**
- Clear boundaries between layers
- Each layer has specific responsibility
- Dependencies flow inward
- Outer layers depend on inner layers

**Dependency Management:**
- Shared models for type definitions
- Service-specific business logic
- Common utilities where appropriate
- Avoid tight coupling

---

## Data Flow Patterns

### Request Lifecycle

**Incoming Request:**
1. Client → API Gateway (Port 7000)
2. Gateway validates authentication
3. Gateway routes to service (e.g., user-service:3001)
4. Service validates request data
5. Service business logic processes
6. Service queries database
7. Database returns data
8. Service returns response to Gateway
9. Gateway returns response to client

### Authentication Flow

**User Login:**
1. User sends credentials to `/login`
2. User Service validates credentials
3. User Service generates JWT token
4. User Service returns token to client
5. Client stores token
6. Client includes token in subsequent requests

**Authenticated Request:**
1. Client sends request with token
2. API Gateway validates token
3. Gateway routes to service
4. Service extracts user info from token
5. Service processes request on behalf of user

### Job Creation Flow

**Standard Job Creation:**
1. Employer creates job via API
2. API Gateway routes to job-service
3. Job Service validates job data
4. Job Service creates job record
5. Job Service calculates salary
6. Job Service creates payment intent
7. Job Service returns job details
8. Employer receives confirmation

**Recurring Job Creation:**
1. Employer creates recurring job
2. Job Service creates job master record
3. Job Service creates recurrence records
4. Job Service schedules future occurrences
5. Notification Service alerts matched workers

---

## Integration Points

### External Service Integrations

**SendGrid Integration:**
- Purpose: Transactional email delivery
- Used by: Notification Service
- Use cases: Job notifications, user verification, alerts

**Twilio Integration:**
- Purpose: SMS delivery
- Used by: Notification Service
- Use cases: SMS notifications, verification codes

**Stripe Integration:**
- Purpose: Payment processing
- Used by: Job Service
- Use cases: Payment intents, payment links

**Azure Services:**
- Azure Blob Storage: File storage (work proof, user media)
- Azure Service Bus: Event messaging (if applicable)
- Azure Key Vault: Secret management (if applicable)

### Internal Service Communication

**API Gateway Orchestration:**
- Gateway calls multiple services for complex operations
- Aggregates responses from services
- Handles service failures gracefully

**Service-to-Service HTTP:**
- Direct HTTP calls for simple interactions
- Synchronous communication
- Error handling with retries

**Event-Based Communication:**
- Service Bus for asynchronous events
- Pub/sub pattern for notifications
- Decoupled service communication

### Database Interactions

**Sequelize ORM:**
- Abstracts database operations
- Provides type-safe queries
- Handles relationships
- Manages transactions

**Connection Management:**
- Connection pooling per service
- Automatic reconnection
- Query timeout handling
- Transaction management

---

## Important Development Notes

### Code Quality Standards

**Type Safety:**
- All code written in TypeScript
- Strict TypeScript configuration
- Use shared models for type definitions
- Avoid `any` type
- Enable strict null checks

**Error Handling:**
- Comprehensive error handling
- Meaningful error messages
- Proper error logging
- Graceful degradation

**Performance Considerations:**
- Database query optimization
- Index usage
- Connection pooling
- Caching strategies
- Lazy loading where appropriate

### Security Considerations

**Authentication:**
- JWT-based authentication
- Token expiration handling
- Secure token storage
- Refresh token mechanisms

**Authorization:**
- Role-based access control
- Resource-level permissions
- Owner-based access checks

**Data Validation:**
- Input validation on all endpoints
- Sanitization of user input
- Protection against injection attacks
- File upload validation

### Testing Approach

**Unit Testing:**
- Test business logic in services
- Mock repositories and external dependencies
- Test edge cases and error conditions

**Integration Testing:**
- Test API endpoints
- Test database interactions
- Test service integration

**End-to-End Testing:**
- Test complete user workflows
- Test multi-service operations
- Test error recovery

---

## Common Workflows

### Creating a New Feature

1. **Understand Requirements:**
   - Read Azure DevOps task
   - Review related documentation
   - Identify affected services

2. **Plan Implementation:**
   - Design data model changes
   - Plan API endpoints
   - Identify business logic
   - Consider impact on other services

3. **Implement Changes:**
   - Update models (in shared-models if shared)
   - Create/update repository methods
   - Implement business logic in services
   - Create/update controllers
   - Add/update routes and validations

4. **Test Changes:**
   - Write unit tests
   - Test API endpoints
   - Test integration points
   - Verify error handling

5. **Create Pull Request:**
   - Describe changes clearly
   - Link to Azure DevOps task
   - Include testing notes
   - Request review

### Debugging Issues

1. **Identify Service:**
   - Check API Gateway logs for routing
   - Identify which service handles the functionality
   - Check service-specific logs

2. **Trace Request Flow:**
   - Follow request from client to gateway
   - Trace through service layers
   - Check database queries
   - Verify external service calls

3. **Check Common Issues:**
   - Authentication/authorization problems
   - Validation failures
   - Database connection issues
   - External service failures

4. **Apply Fixes:**
   - Fix in appropriate layer
   - Add error handling if needed
   - Add logging for future debugging
   - Test thoroughly

---

## File Upload Patterns

### User Media Uploads

**File Types Supported:**
- Images: PNG, JPG, JPEG
- Documents: PDF (in some contexts)
- HEIC images (converted to PNG)

**Upload Process:**
1. Client uploads file to dedicated upload endpoint
2. Multer middleware handles file upload
3. File validation (size, type)
4. File stored in Azure Blob Storage
5. File URL saved to database
6. Client receives file URL

**File Size Limits:**
- User files: 10MB limit
- Work proof: 10MB limit
- Different limits for different contexts

### Work Proof Uploads

**Specific Requirements:**
- Images and PDFs only
- 10MB file size limit
- Stored in `job-complete-proof` container
- Associated with finish job requests

---

## Payment Processing Patterns

### Payment Intent Creation

**Purpose:** Prepare payment for job completion

**Flow:**
1. Job Service creates payment intent
2. Stripe generates payment intent
3. Client receives payment intent details
4. Client completes payment via Stripe
5. Webhook confirms payment
6. Job status updated

### Payment Link Generation

**Purpose:** Generate payment link for manual payment

**Flow:**
1. Job Service creates payment link
2. Stripe generates payment URL
3. Link sent to user (via notification)
4. User completes payment
5. Webhook confirms payment

---

## Notification Patterns

### Notification Triggers

**Common Events:**
- Job created
- Job status updated
- Worker assigned
- Job completed
- Payment received
- New message
- Review posted

**Notification Channels:**
- In-app notifications
- Email notifications
- SMS notifications
- Push notifications

### Delivery Flow

1. Event occurs in system
2. Notification Service receives event
3. Check user notification preferences
4. Create notification records
5. Send via enabled channels
6. Track delivery status
7. Retry failed deliveries

---

## Real-time Features

### WebSocket Connection Flow

1. Client authenticates with API Gateway
2. Gateway issues token
3. Client connects to Socket Service with token
4. Socket Service validates token
5. Connection established
6. Client can receive real-time updates
7. Client can send real-time messages

### Real-time Events

**Common Events:**
- New job posted
- Job status changes
- New message received
- User typing indicator
- User presence changes
- Payment status updates

---

## Summary

This memory file serves as the persistent knowledge base for the Harbor AI agent, containing:

- **System Architecture:** Microservices-based job marketplace with API Gateway
- **Service Responsibilities:** Clear separation between user, job, notification, and socket services
- **Technology Stack:** Node.js, Express, TypeScript, Sequelize, PostgreSQL
- **Backend Conventions:** Controller-Service-Repository pattern, naming conventions, error handling
- **Development Patterns:** Standard patterns for API design, data flow, and service communication
- **Integration Points:** External services and internal service communication
- **Common Workflows:** Feature creation, debugging, file uploads, payments, notifications

The agent should reference this memory file to maintain contextual understanding when executing tasks, ensuring consistency with established patterns and conventions.

**Last Updated:** 2025-03-06
**Next Review:** When significant architectural changes occur
