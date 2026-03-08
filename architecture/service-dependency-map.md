# Harbor Platform - Service Dependency Map

**Document Version:** 1.0.0
**Last Updated:** 2025-03-06
**Platform:** Harbor Job Marketplace

---

## Table of Contents

1. [Platform Overview](#platform-overview)
2. [Service Responsibilities](#service-responsibilities)
3. [Service Dependency Map](#service-dependency-map)
4. [Communication Patterns](#communication-patterns)
5. [Dependency Impact Rules](#dependency-impact-rules)
6. [Safe Change Guidelines for Harbor-AI](#safe-change-guidelines-for-harbor-ai)
7. [Service Dependency Matrix](#service-dependency-matrix)
8. [Example Dependency Scenarios](#example-dependency-scenarios)
9. [AI Usage Instructions](#ai-usage-instructions)

---

## Platform Overview

The Harbor platform is built on a **microservices architecture** where multiple independent services collaborate to deliver the complete job marketplace functionality. Each service owns a specific domain and communicates with other services through well-defined interfaces.

### Architecture Style

**Microservices with API Gateway Pattern:**
- All external client requests flow through the API Gateway
- Gateway routes requests to appropriate backend services
- Services communicate via REST APIs, message queues, and WebSocket
- Shared data models ensure consistency across services

### Service Independence

Each service is:
- **Independently deployable** - Can be deployed without redeploying other services
- **Independently scalable** - Can scale based on its own load
- **Domain-focused** - Owns specific business capabilities
- **Loosely coupled** - Minimizes dependencies on other services

### Service Collaboration

While services are independent, they collaborate to deliver complete features:
- A user posting a job involves User Service, Job Service, and Notification Service
- Real-time messaging involves Socket Service, Job Service, and User Service
- Payments involve Job Service, User Service, and external Stripe service

---

## Service Responsibilities

### harborApiGateWay (API Gateway)
**Port:** 7000

**Responsibilities:**
- Single entry point for all client requests
- Routes requests to appropriate microservices
- Handles authentication and authorization
- Implements CORS, rate limiting, and request validation
- Transforms requests/responses between client and services
- Manages API versioning

**Key Capabilities:**
- Request routing and proxying
- JWT token verification
- Request/response logging
- Error handling and response formatting

---

### harborUserSvc (User Service)
**Port:** 3001

**Responsibilities:**
- User registration and authentication
- User profile management
- JWT token generation and validation
- Password management and reset
- Social authentication (Google, Apple)
- User preferences and settings
- User role management (employer, job seeker, admin)

**Key Capabilities:**
- Create, read, update user profiles
- Authenticate users and issue tokens
- Manage user skills and qualifications
- Handle user search preferences
- Store user contact information

---

### harborJobSvc (Job Service)
**Port:** 3004

**Responsibilities:**
- Job posting and creation
- Job search and filtering
- Job application management
- Payment processing (via Stripe)
- Job completion workflow
- Counter-offer management
- Job reports and analytics
- Salary calculations
- Job file uploads (images, PDFs)

**Key Capabilities:**
- CRUD operations for jobs
- Job search with filters
- Payment intent creation
- Job status management
- File upload and storage

---

### harborNotificationSvc (Notification Service)
**Port:** 3003

**Responsibilities:**
- Email notifications (SendGrid)
- SMS notifications (Twilio)
- Push notifications (FCM)
- In-app notifications
- Notification preferences management
- Notification templates
- Event-driven notifications

**Key Capabilities:**
- Send transactional emails
- Send SMS alerts
- Manage push notifications
- Track notification delivery
- Handle notification preferences

---

### harborSocketSvc (Socket Service)
**Port:** Varies (check .env)

**Responsibilities:**
- Real-time bidirectional communication
- WebSocket connection management
- Real-time messaging between users
- Online/offline status tracking
- Typing indicators
- Message delivery status
- Chat room management
- Event broadcasting

**Key Capabilities:**
- WebSocket connection handling
- Real-time message delivery
- Presence management
- Room-based communication

---

### harborSharedModels (Shared Models Package)
**Version:** 5.8.53

**Responsibilities:**
- Shared database models (Sequelize)
- Shared TypeScript interfaces
- Common enumerations
- Database schema definitions
- Type-safe data structures

**Key Capabilities:**
- Define Sequelize models used across services
- Provide TypeScript interfaces for consistency
- Ensure data structure consistency
- Centralize model definitions

---

## Service Dependency Map

### Direct Dependencies

```
harborApiGateWay
  ↓ routes to
  ├─→ harborUserSvc (authentication, user data)
  ├─→ harborJobSvc (job operations)
  ├─→ harborNotificationSvc (notifications)
  └─→ harborSocketSvc (WebSocket connections)

harborJobSvc
  ↓ may call
  ├─→ harborUserSvc (employer information, user profiles)
  ├─→ harborNotificationSvc (job-related notifications)
  └─→ harborSocketSvc (real-time job updates)

harborNotificationSvc
  ↓ depends on
  ├─→ harborUserSvc (user contact details, preferences)
  └─→ harborJobSvc (job data for notifications)

harborSocketSvc
  ↓ may depend on
  ├─→ harborUserSvc (user authentication, presence)
   └─→ harborJobSvc (job-related events)

All Services
  ↓ depend on
  └─→ harborSharedModels (shared data structures)
```

### Dependency Descriptions

#### API Gateway Dependencies

**harborApiGateWay → harborUserSvc**
- **Purpose:** Route user-related requests
- **Endpoints:** `/api/users/*`, `/api/auth/*`
- **Dependency Type:** HTTP proxying
- **Criticality:** HIGH - Users cannot login or access profiles

**harborApiGateWay → harborJobSvc**
- **Purpose:** Route job-related requests
- **Endpoints:** `/api/jobs/*`, `/api/payments/*`
- **Dependency Type:** HTTP proxying
- **Criticality:** HIGH - Core job functionality

**harborApiGateWay → harborNotificationSvc**
- **Purpose:** Route notification requests
- **Endpoints:** `/api/notifications/*`
- **Dependency Type:** HTTP proxying
- **Criticality:** MEDIUM - Notifications are important but not blocking

**harborApiGateWay → harborSocketSvc**
- **Purpose:** Route WebSocket connections
- **Endpoints:** Socket connections
- **Dependency Type:** WebSocket upgrade
- **Criticality:** MEDIUM - Real-time features only

---

#### Job Service Dependencies

**harborJobSvc → harborUserSvc**
- **Purpose:** Fetch employer information, user profiles
- **Use Case:** When creating a job, verify employer exists and get profile
- **Communication:** HTTP REST API call
- **Criticality:** HIGH - Cannot create jobs without valid users
- **Example Endpoints:**
  - `GET /api/users/:id` - Get user by ID
  - `GET /api/users/:id/profile` - Get user profile

**harborJobSvc → harborNotificationSvc**
- **Purpose:** Trigger notifications when jobs are created/updated
- **Use Case:** Notify interested users when new jobs posted
- **Communication:** Event-driven (message queue or direct API)
- **Criticality:** MEDIUM - Jobs work without notifications, but UX degraded
- **Example Events:**
  - `job.created` - New job posted
  - `job.updated` - Job details changed
  - `job.completed` - Job finished

**harborJobSvc → harborSocketSvc**
- **Purpose:** Broadcast real-time job updates
- **Use Case:** Notify connected users about job changes
- **Communication:** Socket.IO events
- **Criticality:** LOW - Job functionality works without real-time
- **Example Events:**
  - `job:new` - New job available
  - `job:updated` - Job details updated

---

#### Notification Service Dependencies

**harborNotificationSvc → harborUserSvc**
- **Purpose:** Fetch user contact information, notification preferences
- **Use Case:** Get email/phone for sending notifications
- **Communication:** HTTP REST API call
- **Criticality:** HIGH - Cannot send notifications without user contact info
- **Example Endpoints:**
  - `GET /api/users/:id/contact` - Get contact details
  - `GET /api/users/:id/preferences` - Get notification preferences

**harborNotificationSvc → harborJobSvc**
- **Purpose:** Fetch job data for notification content
- **Use Case:** Include job details in notification messages
- **Communication:** HTTP REST API call
- **Criticality:** MEDIUM - Can send basic notifications without job details
- **Example Endpoints:**
  - `GET /api/jobs/:id` - Get job details

---

#### Socket Service Dependencies

**harborSocketSvc → harborUserSvc**
- **Purpose:** Authenticate users, verify user presence
- **Use Case:** Validate JWT tokens for WebSocket connections
- **Communication:** HTTP REST API call
- **Criticality:** HIGH - Socket connections require authentication
- **Example Endpoints:**
  - `GET /api/users/verify-token` - Validate JWT token

**harborSocketSvc → harborJobSvc**
- **Purpose:** Fetch job-related data for real-time updates
- **Use Case:** Broadcast job status changes
- **Communication:** HTTP REST API call or events
- **Criticality:** LOW - Socket service can work without job service data

---

#### Shared Models Dependencies

**All Services → harborSharedModels**
- **Purpose:** Shared database models and TypeScript interfaces
- **Use Case:** Ensure consistent data structures across services
- **Communication:** NPM package dependency
- **Criticality:** HIGH - All services depend on shared models
- **Version:** 5.8.53 (or higher)

---

## Communication Patterns

### 1. REST API Calls (Synchronous)

**Pattern:** Service A calls Service B via HTTP

**Use Cases:**
- Fetching data from another service
- Validating data against another service
- Triggering immediate actions

**Example:**
```typescript
// Job Service calling User Service
const response = await axios.get(`${USER_SERVICE_URL}/api/users/${employerId}`);
const employer = response.data;
```

**Services Using This Pattern:**
- harborJobSvc → harborUserSvc
- harborNotificationSvc → harborUserSvc
- harborNotificationSvc → harborJobSvc
- harborSocketSvc → harborUserSvc

---

### 2. Message Queue Events (Asynchronous)

**Pattern:** Service A publishes event, Service B subscribes

**Use Cases:**
- Triggering notifications
- Broadcasting updates
- Decoupling services

**Example:**
```typescript
// Job Service publishes event
await jobQueue.add({
  type: "job.created",
  jobId: job.id,
  employerId: job.employerId
});

// Notification Service processes event
jobQueue.process(async (job) => {
  if (job.data.type === "job.created") {
    await sendJobNotification(job.data);
  }
});
```

**Services Using This Pattern:**
- harborJobSvc → harborNotificationSvc
- harborJobSvc → harborSocketSvc

---

### 3. WebSocket Events (Real-time)

**Pattern:** Service broadcasts via Socket.IO

**Use Cases:**
- Real-time updates
- Live status changes
- Instant notifications

**Example:**
```typescript
// Socket Service broadcasts event
io.to(`job-${jobId}`).emit("job:updated", jobData);
```

**Services Using This Pattern:**
- harborSocketSvc broadcasts to clients
- Services may notify Socket Service of events

---

### 4. Shared Database Models

**Pattern:** Services use shared models via NPM package

**Use Cases:**
- Ensuring data consistency
- Type safety across services
- Shared database schemas

**Example:**
```typescript
// All services import from harbor-shared-models
import { User, Job } from "harbor-shared-models/models";
```

**Services Using This Pattern:**
- All services depend on harborSharedModels

---

## Dependency Impact Rules

### Rule 1: API Contract Stability

**When Modifying APIs in a Service, Harbor-AI MUST:**

1. **Identify Consumers**
   - Check which services call this API
   - Check if API Gateway routes to this API
   - Review service dependency map

2. **Assess Impact**
   - Will breaking change affect consumers?
   - Are there dependent services that need updates?

3. **Maintain Compatibility**
   - Prefer non-breaking changes
   - Add new endpoints instead of modifying existing ones
   - Use API versioning if breaking changes are necessary

**Example:**
```
If modifying GET /api/users/:id in User Service:
✓ Check if Job Service depends on this endpoint
✓ Check if Notification Service depends on this endpoint
✓ Check if API Gateway routes to this endpoint
✓ Ensure response format remains compatible
```

---

### Rule 2: Data Structure Changes

**When Modifying Data Models in Shared Models, Harbor-AI MUST:**

1. **Check All Consumers**
   - All services use shared models
   - Changes affect every service

2. **Maintain Backward Compatibility**
   - Add new fields as optional
   - Don't remove existing fields
   - Don't change field types

3. **Update All Services**
   - Rebuild all services after shared models update
   - Test all services for compatibility

**Example:**
```
If modifying User model in harborSharedModels:
✓ Don't remove existing fields
✓ Add new fields as optional
✓ Don't change field types
✓ Increment version number
✓ Update package.json in all services
```

---

### Rule 3: Event Schema Changes

**When Modifying Event Payloads, Harbor-AI MUST:**

1. **Identify Event Subscribers**
   - Which services subscribe to this event?
   - What do they expect in the payload?

2. **Maintain Event Structure**
   - Add new fields as optional
   - Don't remove required fields
   - Don't change field names

**Example:**
```
If modifying job.created event payload:
✓ Check Notification Service expects this event
✓ Check Socket Service expects this event
✓ Add new fields as optional
✓ Maintain existing required fields
```

---

### Rule 4: Authentication Changes

**When Modifying Authentication in User Service, Harbor-AI MUST:**

1. **Check All Services**
   - All services depend on User Service for authentication
   - JWT token format must remain consistent

2. **Maintain Token Format**
   - Don't change JWT structure
   - Don't change token expiration without coordination
   - Maintain verification endpoints

**Example:**
```
If modifying JWT token verification in User Service:
✓ All services verify tokens the same way
✓ Token payload structure must remain consistent
✓ Verification endpoint must remain available
```

---

## Safe Change Guidelines for Harbor-AI

### Guideline 1: Non-Breaking Changes First

**✅ PREFERRED APPROACH:**

**Add New API Endpoints:**
```typescript
// Instead of modifying existing endpoint
// Add new endpoint with new version
router.post("/api/jobs/v2/create", jobController.createJobV2);
```

**Add New Optional Fields:**
```typescript
// Add new fields as optional in models
@Column({ allowNull: true })
newFeatureField?: string;
```

**Extend Rather Than Modify:**
```typescript
// Extend response rather than change structure
{
  "status": true,
  "data": { /* existing data */ },
  "v2": { /* new data */ }  // New field
}
```

---

### Guideline 2: Version Breaking Changes

**When Breaking Changes Are Necessary:**

1. **Create New Version**
   - Add `/v2/` or `/v3/` to endpoint path
   - Maintain old version for backward compatibility
   - Document deprecation timeline

2. **Coordinate Rollout**
   - Update consuming services first
   - Deploy new version
   - Migrate traffic to new version
   - Deprecate old version

**Example:**
```typescript
// Old version (v1)
router.get("/api/users/:id", userController.getUserV1);

// New version (v2)
router.get("/v2/api/users/:id", userController.getUserV2);

// Maintain both during transition period
```

---

### Guideline 3: Verify Before Change

**Before Making Changes, Harbor-AI MUST:**

1. **Check Dependency Map**
   - Review service-dependency-map.md
   - Identify all dependent services

2. **Search Codebase**
   - Search for API endpoint usage across services
   - Search for model usage across services
   - Search for event subscriptions

3. **Review Documentation**
   - Check API documentation (swagger.json)
   - Check service architecture documents
   - Check coding rules

4. **Create Impact Analysis**
   - List all potentially affected services
   - List all affected endpoints
   - List all affected models

---

### Guideline 4: Test Integration Points

**After Making Changes, Harbor-AI MUST:**

1. **Test API Contracts**
   - Verify old endpoints still work
   - Verify new endpoints work correctly
   - Test error responses

2. **Test Service Communication**
   - Test service-to-service calls
   - Test event publishing/subscribing
   - Test WebSocket events

3. **Test Data Structures**
   - Verify shared models work
   - Verify data serialization
   - Verify backward compatibility

4. **Test Dependent Services**
   - Test services that depend on changed service
   - Verify they still work correctly
   - Check for integration errors

---

### Guideline 5: Document Changes

**Harbor-AI MUST Document:**

1. **API Changes**
   - New endpoints added
   - Modified endpoints
   - Deprecated endpoints
   - Breaking changes

2. **Data Model Changes**
   - New fields added
   - Modified fields
   - Deprecation notices

3. **Event Changes**
   - New events
   - Modified event payloads
   - Deprecated events

4. **Migration Requirements**
   - Steps to migrate
   - Dependencies to update
   - Testing requirements

---

## Service Dependency Matrix

### Dependency Matrix

| Service | Depends On | Communication Type | Criticality | Impact of Breakage |
|---------|------------|-------------------|-------------|-------------------|
| **api-gateway** | user-service | HTTP proxy | HIGH | Users cannot authenticate |
| **api-gateway** | job-service | HTTP proxy | HIGH | Jobs inaccessible |
| **api-gateway** | notification-service | HTTP proxy | MEDIUM | Notifications fail |
| **api-gateway** | socket-service | WebSocket | MEDIUM | Real-time features fail |
| **job-service** | user-service | HTTP REST | HIGH | Cannot verify employers |
| **job-service** | notification-service | Events | MEDIUM | Notifications not sent |
| **job-service** | socket-service | Events | LOW | Real-time updates fail |
| **notification-service** | user-service | HTTP REST | HIGH | Cannot get user contacts |
| **notification-service** | job-service | HTTP REST | MEDIUM | Missing job details |
| **socket-service** | user-service | HTTP REST | HIGH | Cannot authenticate sockets |
| **socket-service** | job-service | HTTP REST | LOW | Missing job context |
| **all services** | shared-models | NPM package | HIGH | Type errors, build failures |

---

### Impact Levels

**CRITICAL Impact (Service Down):**
- API Gateway down = Entire platform inaccessible
- User Service down = No authentication, no user data
- Shared Models broken = All services fail to build/run

**HIGH Impact (Feature Unavailable):**
- Job Service down = Cannot post/view jobs
- Notification Service down = No notifications (but platform works)
- Socket Service down = No real-time features (but platform works)

**MEDIUM Impact (Degraded UX):**
- Job Service cannot call User Service = Cannot create jobs
- Notification Service cannot call User Service = Cannot send notifications
- Socket Service cannot call Job Service = No job updates in real-time

---

## Example Dependency Scenarios

### Scenario 1: Modifying User Service API

**Change:** Add new field to user profile response

**Current Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**New Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890"  // NEW FIELD
  }
}
```

**Impact Analysis:**
```
✓ API Gateway - Routes to User Service (IMPACT: Low, new field)
✓ Job Service - Calls User Service (IMPACT: Low, additive change)
✓ Notification Service - Calls User Service (IMPACT: Low, additive change)
✓ Socket Service - Calls User Service (IMPACT: Low, additive change)
```

**Verdict:** SAFE - Additive change, backward compatible

---

### Scenario 2: Modifying Job Service API

**Change:** Remove `salaryMin` field from job response

**Current Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "title": "Software Engineer",
    "salaryMin": 80000,
    "salaryMax": 120000
  }
}
```

**New Response:**
```json
{
  "status": true,
  "data": {
    "id": 123,
    "title": "Software Engineer",
    "salaryMax": 120000
  }
}
```

**Impact Analysis:**
```
✗ API Gateway - Routes to Job Service (IMPACT: HIGH, breaking change)
✗ Frontend clients - Expect salaryMin field (IMPACT: HIGH)
✗ Notification Service - May include salary in notifications (IMPACT: MEDIUM)
```

**Verdict:** UNSAFE - Breaking change, will break consumers

**Safe Approach:**
```json
// Add new endpoint instead
{
  "status": true,
  "data": {
    "id": 123,
    "title": "Software Engineer",
    "salaryRange": {
      "min": 80000,
      "max": 120000
    }
  }
}
```

---

### Scenario 3: Modifying Shared Models

**Change:** Add `phoneNumber` field to User model

**Current Model:**
```typescript
@Table({ tableName: "users" })
export class User extends Model {
  @Column({ primaryKey: true })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  email!: string;
}
```

**New Model:**
```typescript
@Table({ tableName: "users" })
export class User extends Model {
  @Column({ primaryKey: true })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  email!: string;

  @Column({ allowNull: true })  // NEW FIELD (optional)
  phoneNumber!: string;
}
```

**Impact Analysis:**
```
✗ All Services - Use shared models (IMPACT: HIGH, requires rebuild)
✗ User Service - Uses User model (IMPACT: MEDIUM, optional field)
✗ Job Service - Uses User model (IMPACT: LOW, doesn't use phone)
✗ Notification Service - Uses User model (IMPACT: LOW, additive change)
✗ Socket Service - Uses User model (IMPACT: LOW, doesn't use phone)
```

**Verdict:** SAFE - Additive change, but requires:
1. Update harborSharedModels version
2. Update package.json in all services
3. Rebuild all services
4. Test all services

---

### Scenario 4: Modifying Event Payload

**Change:** Add `location` field to `job.created` event

**Current Event:**
```json
{
  "type": "job.created",
  "jobId": 123,
  "employerId": 456
}
```

**New Event:**
```json
{
  "type": "job.created",
  "jobId": 123,
  "employerId": 456,
  "location": "Remote"  // NEW FIELD
}
```

**Impact Analysis:**
```
✓ Notification Service - Subscribes to job.created (IMPACT: Low, additive)
✓ Socket Service - May subscribe to job.created (IMPACT: Low, additive)
```

**Verdict:** SAFE - Additive change, backward compatible

---

## AI Usage Instructions

### When to Use This Document

**Harbor-AI MUST read this document before:**

1. **Modifying any API endpoint**
   - Check if other services depend on it
   - Check if API Gateway routes to it
   - Verify impact on consumers

2. **Changing data models**
   - Check if model is in shared-models
   - Identify all services using the model
   - Plan coordinated updates

3. **Modifying event payloads**
   - Identify event subscribers
   - Verify backward compatibility
   - Update subscribers if needed

4. **Adding new features**
   - Understand service dependencies
   - Plan integration points
   - Coordinate with other services

5. **Refactoring service code**
   - Check for service boundaries
   - Verify no cross-service violations
   - Maintain API contracts

---

### Dependency Checking Workflow

**Before Implementing Changes:**

**Step 1: Identify Target Service**
```markdown
Example: Modifying harborJobSvc
```

**Step 2: Check Dependency Map**
```markdown
Review service-dependency-map.md:
- Which services depend on harborJobSvc?
- Which services does harborJobSvc depend on?
- What is the criticality of these dependencies?
```

**Step 3: Analyze Impact**
```markdown
For each dependent service:
- Will this change break them?
- Do they need to be updated?
- Can we make this change safely?
```

**Step 4: Plan Implementation**
```markdown
If safe:
- Proceed with implementation
- Follow non-breaking change guidelines
- Add new endpoints/features rather than modify

If unsafe:
- Create new version (v2, v3)
- Maintain backward compatibility
- Coordinate updates with dependent services
- Document migration path
```

**Step 5: Verify Integration**
```markdown
After implementation:
- Test all dependent services
- Verify API contracts maintained
- Test event publishing/subscribing
- Check for integration errors
```

---

### Example Decision Process

**Task:** Add `skills` array to job response

**Step 1: Check Dependencies**
```markdown
harborJobSvc is called by:
- API Gateway (routes /api/jobs/*)
- Job Service depends on User Service (for employer info)
- Notification Service may call Job Service (for job details)
```

**Step 2: Analyze Change**
```markdown
Adding skills field to job response:
- Additive change (not removing fields)
- Backward compatible (old consumers ignore new field)
- No breaking changes to API contract
```

**Step 3: Verify Safe**
```markdown
✓ API Gateway won't break (additive change)
✓ Notification Service won't break (ignores new field)
✓ Frontend clients won't break (additive change)
✓ Job Service won't break (internal change)
```

**Step 4: Implement**
```markdown
Safe to proceed with additive change
Add skills field to job response
Test all services
Document the change
```

---

### Safety Checklist

**Before Making Changes, Check:**

- [ ] Read service-dependency-map.md
- [ ] Identified all dependent services
- [ ] Analyzed impact on each dependent
- [ ] Verified change is backward compatible
- [ ] Planned update strategy if breaking
- [ ] Prepared rollback plan
- [ ] Documented all changes

---

## Quick Reference

### Service Ports

| Service | Port | Health Check |
|---------|------|--------------|
| API Gateway | 7000 | `GET /api/health` |
| User Service | 3001 | `GET /user-svc/health-check` |
| Notification Service | 3003 | `GET /notification-svc/health-check` |
| Job Service | 3004 | `GET /job-svc/health-check` |

### Critical Dependencies

**If User Service is Down:**
- ❌ No authentication
- ❌ No user data access
- ❌ Job Service cannot verify employers
- ❌ Notification Service cannot get user contacts

**If Job Service is Down:**
- ❌ No job postings
- ❌ No job search
- ❌ No payments

**If Shared Models is Broken:**
- ❌ All services fail to build
- ❌ Type errors across all services
- ❌ Database operations fail

### Safe Modification Principles

1. **Add, Don't Remove** - Add new fields/endpoints, don't remove existing ones
2. **Version Breaking Changes** - Use v2, v3 for breaking changes
3. **Maintain Contracts** - Keep API response formats consistent
4. **Test Integrations** - Test with all dependent services
5. **Document Changes** - Document all modifications and impacts

---

**END OF SERVICE DEPENDENCY MAP**

---

*For questions or issues related to service dependencies, refer to:*
- `harbor-ai/service-map.md` - Service ownership mapping
- `harbor-ai/architecture-overview.md` - System architecture
- `harbor-ai/repo-context.md` - Repository structure and patterns
*This document helps prevent breaking changes when modifying Harbor microservices.*