# Harbor Platform - System Architecture Overview

> **Last Updated:** March 6, 2026
> **Version:** 1.0.0

---

## 1. System Overview

**Harbor** is a comprehensive job marketplace platform designed to connect employers with job seekers. The platform facilitates job creation, discovery, applications, payments, and community engagement through multiple client applications (web, iOS, Android).

### Core Purpose

Harbor serves as a bridge between:
- **Employers** - Organizations or individuals posting jobs and seeking workers
- **Seekers** - Workers looking for job opportunities and income

### Key Features

- **Job Management**: Create, search, and manage jobs with geospatial search capabilities
- **Payment Processing**: Integrated Stripe payments for job transactions and payouts
- **User Profiles**: Comprehensive profiles for both employers and seekers with skills, qualifications, and ratings
- **Community Features**: Social feeds, community groups, posts, likes, and comments
- **Real-time Communication**: In-app messaging and notifications
- **Reward System**: Points, badges, and streaks to incentivize platform engagement
- **AI-Powered Features**: Resume review and intelligent recommendations

---

## 2. System Architecture Style

Harbor implements a **Microservices Architecture** with the following characteristics:

### Architecture Pattern

- **API Gateway Pattern**: Single entry point for all client requests
- **Service-Based Architecture**: Domain-driven service boundaries
- **Shared Data Layer**: Common database models package across services
- **Event-Driven Communication**: Message queues for async operations
- **RESTful APIs**: Synchronous HTTP communication between services

### Design Philosophy

- **Separation of Concerns**: Each service owns specific domain logic
- **Service Independence**: Services can be deployed and scaled independently
- **Shared Models**: Centralized database schema ensures consistency
- **API-First Design**: All functionality exposed through well-defined APIs

---

## 3. List of Services

| Service | Purpose | Key Responsibilities |
|---------|---------|---------------------|
| **API Gateway** (`harborApiGateWay`) | Central entry point & authentication hub | • Request routing and proxying<br>• JWT authentication & authorization<br>• Social login (Google, Apple)<br>• OTP verification<br>• PII detection in messages<br>• Security enforcement |
| **User Service** (`harborUserSvc`) | User and profile management | • User CRUD operations<br>• Profile management (skills, qualifications)<br>• Community features (feeds, posts, groups)<br>• Payment & payout processing (Stripe)<br>• Notification dispatch<br>• Reward points system<br>• Background jobs & reminders<br>• AI resume review |
| **Job Service** (`harborJobSvc`) | Job marketplace operations | • Job creation & management<br>• Geospatial job search<br>• Job applications & assignments<br>• Payment escrow & processing<br>• Job completion workflows<br>• Employer-seeker ratings<br>• Job proofs & media handling |
| **Notification Service** (`harborNotificationSvc`) | Notification delivery & management | • Notification CRUD operations<br>• FCM token management<br>• Push notifications (Firebase)<br>• Email delivery (SendGrid)<br>• SMS delivery (Twilio)<br>• Notification preferences |
| **Socket Service** (`harborSocketSvc`) | Real-time communication | • WebSocket connections<br>• In-app messaging<br>• Chat room management<br>• Message persistence<br>• Real-time updates<br>• Media handling (images, videos)<br>• PII filtering in messages |
| **Shared Models** (`harborSharedModels`) | Data layer foundation | • Centralized database models<br>• Type-safe ORM definitions<br>• Shared across all services<br>• Version-controlled schemas |
| **Website** (`harborWebsite`) | Web client application | • Next.js-based web interface<br>• User interactions<br>• API Gateway client<br>• Server-side rendering |
| **Mobile App** (`HarborApp`) | Mobile client applications | • React Native app (iOS & Android)<br>• Native mobile features<br>• API Gateway client<br>• Offline support |
| **Database Service** (`harborDatabaseSvc`) | Database operations utility | • Database health checks<br>• Connection management<br>• Administrative database operations |
| **AI Service** (`harbor-ai`) | AI-powered features | *(In Development)*<br>• Advanced AI capabilities<br>• Intelligent recommendations |

---

## 4. Service Communication

### Communication Patterns

Harbor uses multiple communication patterns:

#### 4.1 Synchronous Communication (REST APIs)

**Primary Pattern**: `Client → API Gateway → Internal Services`

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────┐
│   Client    │─────▶│ API Gateway  │─────▶│  User Service   │
│  (Web/App)  │◀─────│  (Port 7000) │◀─────│  (Port 3002)    │
└─────────────┘      └──────────────┘      └─────────────────┘
                            │
                            │─────▶ Job Service (Port 3004)
                            │◀─────
                            │
                            │─────▶ Notification Service (Port 3006)
                            │◀─────
                            │
                            │─────▶ Socket Service (Port 3005)
                            │◀─────
```

**Key Points:**
- All external requests go through API Gateway
- API Gateway handles authentication before forwarding
- Direct service-to-service HTTP calls when needed
- RESTful JSON APIs

#### 4.2 Asynchronous Communication

**Message Queues (Redis/Bull)**:
- Background job processing
- Scheduled tasks (reminders, notifications)
- Delayed operations

**Azure Service Bus**:
- Inter-service event messaging
- Decoupled service communication
- Event-driven updates

#### 4.3 Real-time Communication

**WebSocket (Socket.io)**:
- Direct connection to Socket Service
- Bidirectional messaging
- Real-time updates for:
  - Chat messages
  - Notifications
  - Payment status
  - Feed activities

---

## 5. Request Flow

### 5.1 Typical Authenticated Request Flow

```
1. Client Request
   │
   ▼
2. API Gateway
   │
   ├─▶ Authentication Check
   │   ├─▶ Redis Cache Lookup (JWT session)
   │   ├─▶ JWT Verification (if cache miss)
   │   └─▶ User Context Attachment
   │
   ├─▶ Route Resolution
   │   └─▶ Determine Target Service
   │
   └─▶ Proxy to Target Service
       │
       ▼
3. Internal Service (e.g., User Service)
   │
   ├─▶ Middleware Chain
   │   ├─▶ Authentication (verify token)
   │   ├─▶ Validation (request schema)
   │   └─▶ Logging
   │
   ├─▶ Controller Layer
   │   └─▶ Extract request data
   │
   ├─▶ Service Layer
   │   ├─▶ Business logic
   │   ├─▶ External API calls
   │   └─▶ Orchestration
   │
   ├─▶ Repository Layer
   │   └─▶ Database queries
   │
   └─▶ Response
           │
           ▼
4. API Gateway
   └─▶ Return to Client
```

### 5.2 Authentication Flow

```
1. Client sends credentials
   │
   ▼
2. API Gateway (/login, /social-login, etc.)
   │
   ├─▶ Validate credentials
   │   ├─▶ Phone/country code lookup
   │   ├─▶ Social token verification
   │   └─▶ Encrypted link validation
   │
   ├─▶ Create/Update user session
   │   ├─▶ Generate JWT token
   │   ├─▶ Store in PostgreSQL
   │   └─▶ Cache in Redis (30s TTL)
   │
   └─▶ Return token + user data
       │
       ▼
3. Client stores token
   │
   ▼
4. Subsequent requests include token
   Authorization: Bearer <token>
   │
   ▼
5. API Gateway verifies token
   ├─▶ Check Redis cache (fast path)
   └─▶ Verify JWT signature (cache miss)
       │
       ▼
6. Forward to service with user context
```

### 5.3 Real-time Message Flow

```
1. Client connects to Socket Service
   │
   ▼
2. WebSocket connection established
   │
   ▼
3. Client sends message
   │
   ▼
4. Socket Service processes
   ├─▶ PII filtering
   ├─▶ Media handling
   ├─▶ Save to database
   └─▶ Emit to recipient(s)
       │
       ▼
5. Recipient clients receive message
   │
   ▼
6. Push notification sent (if recipient offline)
```

---

## 6. Service Responsibility Boundaries

### Clear Domain Boundaries

| Domain | Owner Service | Scope |
|--------|--------------|-------|
| **User Identity** | User Service | • User profiles<br>• Skills & qualifications<br>• User settings<br>• Activity tracking |
| **Authentication** | API Gateway | • Login/signup<br>• JWT generation<br>• Token verification<br>• Session management |
| **Jobs** | Job Service | • Job CRUD<br>• Job search<br>• Applications<br>• Job payments |
| **Social Features** | User Service | • Feeds & posts<br>• Comments & likes<br>• Community groups<br>• Social interactions |
| **Messaging** | Socket Service | • Chat messages<br>• Conversation management<br>• Real-time updates |
| **Notifications** | Notification Service | • Notification storage<br>• Push delivery<br>• Email/SMS delivery<br>• FCM management |
| **Payments** | User Service + Job Service | • Stripe integration<br>• Escrow<br>• Payouts<br>• Transaction records |
| **Rewards** | User Service | • Points calculation<br>• Badges & achievements<br>• Streaks tracking |
| **AI Features** | User Service (via OpenAI) | • Resume review<br>• Recommendations<br>• Content analysis |

### Cross-Service Boundaries

**Services should NOT:**
- Directly modify another service's data
- Bypass API Gateway for client requests
- Implement duplicate business logic
- Access databases outside their domain

**Services SHOULD:**
- Communicate through well-defined APIs
- Use message queues for async operations
- Respect domain boundaries
- Share models through `harbor-shared-models`

---

## 7. Data Ownership

### Database Ownership

| Data Owner | Service | Database Tables |
|------------|---------|-----------------|
| **User Data** | User Service | • users<br>• userSkills<br>• userQualifications<br>• fcmTokens<br>• savedUsers |
| **Job Data** | Job Service | • jobs<br>• jobSkills<br>• userJobs<br>• savedJobs<br>• jobFinishRequests |
| **Community Data** | User Service | • communities<br>• communityMembers<br>• communitySubscriptions<br>• communityGuides |
| **Feed Data** | User Service | • feeds<br>• feedTags<br>• feedLikes<br>• feedComments |
| **Notification Data** | Notification Service | • notifications<br>• fcmTokens |
| **Message Data** | Socket Service | • conversationRooms<br>• conversationDetails<br>• socketDetails |
| **Payment Data** | User Service + Job Service | • employerTransactionDetails<br>• seekerTransactionDetails<br>• paymentIntents<br>• userPayouts |
| **Reward Data** | User Service | • rewardPointLogs<br>• rewardKeysAndPoints |
| **Auth Data** | API Gateway | • tokens<br>• otpVerification |

### Data Access Principles

1. **Single Source of Truth**: Each data entity has one owner service
2. **Read-Only Access**: Other services may read through APIs, not directly
3. **No Direct DB Access**: Services never connect to another service's database
4. **Shared Models**: All services use `harbor-shared-models` for schema consistency
5. **API-Based Updates**: All data modifications go through owner service APIs

---

## 8. Technology Stack Overview

### Frontend

| Component | Technology |
|-----------|------------|
| **Web Client** | Next.js 14, React 18, TypeScript |
| **Mobile Client** | React Native 0.75, TypeScript |
| **State Management** | Redux Toolkit, Redux Persist |
| **UI Components** | Ant Design, Styled Components |
| **Real-time** | Socket.io Client |

### Backend

| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js 20+ |
| **Language** | TypeScript 5.x |
| **Framework** | Express.js 4.x |
| **API Style** | RESTful APIs |

### Data & Storage

| Component | Technology |
|-----------|------------|
| **Primary Database** | PostgreSQL (Azure) |
| **Secondary Database** | MongoDB (limited usage) |
| **Cache & Queue** | Redis (Azure Cache) |
| **File Storage** | Azure Blob Storage |
| **ORM** | Sequelize 6.x with sequelize-typescript |

### Authentication & Security

| Component | Technology |
|-----------|------------|
| **Authentication** | JWT (JSON Web Tokens) |
| **Social Auth** | Google OAuth, Apple Sign-In |
| **SMS** | Twilio |
| **Security Headers** | Helmet |

### Communication & Messaging

| Component | Technology |
|-----------|------------|
| **Real-time** | Socket.io (WebSockets) |
| **Push Notifications** | Firebase Cloud Messaging (FCM) |
| **Email** | SendGrid (primary), Mailgun (fallback) |
| **Message Queue** | Bull (Redis-backed) |
| **Service Bus** | Azure Service Bus |

### Payment & AI

| Component | Technology |
|-----------|------------|
| **Payment Processing** | Stripe |
| **AI/ML** | OpenAI API |
| **PII Detection** | Sightengine |

### Infrastructure & DevOps

| Component | Technology |
|-----------|------------|
| **Containerization** | Docker |
| **Orchestration** | Kubernetes (AKS) |
| **CI/CD** | Azure Pipelines |
| **Container Registry** | Azure Container Registry (ACR) |
| **Secret Management** | Azure Key Vault |
| **Monitoring** | Azure Application Insights |
| **Cloud Provider** | Microsoft Azure |

---

## 9. Deployment Overview

### Deployment Architecture

Harbor services are deployed as **containerized microservices** on **Azure Kubernetes Service (AKS)**.

### Deployment Strategy

#### Container Strategy
- Each service packaged as Docker container
- Images stored in Azure Container Registry (ACR)
- Versioned tags for controlled deployments

#### Kubernetes Configuration
- **Deployments**: Stateful applications with replica management
- **Services**: Internal networking and service discovery
- **Ingress**: External access routing
- **HPA**: Horizontal Pod Autoscaling (configured but selectively enabled)

### Service Ports

| Service | Internal Port | External Exposure |
|---------|--------------|-------------------|
| API Gateway | 7000 | Public (via Ingress) |
| User Service | 3002 | Internal |
| Job Service | 3004 | Internal |
| Notification Service | 3006 | Internal |
| Socket Service | 3005 | Public (WebSocket) |
| Database Service | Varies | Internal |

### Deployment Environments

- **Local**: Development with Docker Compose
- **Dev**: Development environment on AKS
- **QA**: Quality assurance testing environment
- **Staging**: Pre-production validation
- **Production**: Live production environment

### CI/CD Pipeline

1. **Build Stage**:
   - Trigger on code commit
   - Run tests
   - Build Docker images
   - Push to Azure Container Registry

2. **Deploy Stage**:
   - Deploy to Kubernetes
   - Update manifests
   - Health checks
   - Rollback on failure

### Scalability

- **Stateless Services**: Can scale horizontally
- **Stateful Services**: Database connections managed via connection pools
- **Auto-scaling**: HPA configured for certain services
- **Load Balancing**: Kubernetes Service + Ingress controllers

---

## 10. Design Principles

### Core Architectural Principles

#### 1. Separation of Concerns
- Each service owns a specific business domain
- Clear boundaries between services
- Minimal cross-service dependencies

#### 2. Service Independence
- Services can be deployed independently
- Services can be scaled independently
- Services can be updated independently
- Failure isolation between services

#### 3. API-First Design
- All functionality exposed through APIs
- Well-defined API contracts
- Versioned APIs for backward compatibility
- RESTful design principles

#### 4. Scalability
- Horizontal scaling for stateless services
- Vertical scaling for databases
- Caching strategies to reduce load
- Queue-based processing for async tasks

#### 5. Security First
- JWT-based authentication
- Centralized auth at API Gateway
- Secret management via Azure Key Vault
- SSL/TLS for all communications
- Input validation and sanitization

#### 6. Observability
- Structured logging
- Request/response logging
- Error tracking
- Performance monitoring
- Distributed tracing

#### 7. Data Consistency
- Shared database models package
- Single source of truth for data
- ORM-based data access
- Transaction management

#### 8. Fault Tolerance
- Graceful error handling
- Retry mechanisms
- Circuit breakers (planned)
- Health checks and readiness probes
- Automatic recovery

### Development Principles

- **Type Safety**: TypeScript across all services
- **Code Quality**: Linting and formatting standards
- **Testing**: Unit and integration tests
- **Documentation**: Architecture docs for each service
- **Version Control**: Git-based workflows
- **Code Review**: Pull request process

---

## 11. Service Interactions Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENTS                                     │
│  ┌──────────────┐         ┌──────────────┐      ┌──────────────┐  │
│  │  Web Client  │         │ iOS Client   │      │ Android Client│  │
│  │  (Next.js)   │         │(React Native)│      │(React Native) │  │
│  └──────┬───────┘         └──────┬───────┘      └──────┬───────┘  │
│         │                        │                      │           │
└─────────┼────────────────────────┼──────────────────────┼───────────┘
          │                        │                      │
          └────────────────────────┼──────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │     API GATEWAY (Port 7000)  │
                    │  • Authentication            │
                    │  • Routing & Proxying        │
                    │  • PII Detection             │
                    │  • Rate Limiting (planned)   │
                    └────────┬──────────┬───────────┘
                             │          │
                ┌────────────┼──────────┼────────────┐
                │            │          │            │
                ▼            ▼          ▼            ▼
    ┌───────────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐
    │  USER SERVICE │ │   JOB    │ │NOTIFICA- │ │  SOCKET     │
    │   (Port 3002) │ │ SERVICE  │ │ TION     │ │  SERVICE    │
    │  • Profiles   │ │(Port 3004)│ │ SERVICE  │ │ (Port 3005) │
    │  • Communities│ │  • Jobs  │ │(Port 3006)│ │  • Chat     │
    │  • Payments   │ │  • Apps  │ │  • Push  │ │  • Real-time│
    │  • Rewards    │ │  • Escrow│ │  • Email │ │  • Events   │
    └───────┬───────┘ └─────┬────┘ └─────┬────┘ └──────┬──────┘
            │                │            │               │
            └────────────────┼────────────┼───────────────┘
                             │            │
                             ▼            ▼
              ┌────────────────────────────────┐
              │    SHARED INFRASTRUCTURE       │
              │  • PostgreSQL (Primary DB)     │
              │  • MongoDB (Secondary)         │
              │  • Redis (Cache & Queue)       │
              │  • Azure Blob Storage          │
              │  • Azure Service Bus           │
              │  • Azure Key Vault             │
              └────────────────────────────────┘
                             │
                             ▼
              ┌────────────────────────────────┐
              │    EXTERNAL SERVICES           │
              │  • Stripe (Payments)           │
              │  • Firebase (Push)             │
              │  • SendGrid (Email)            │
              │  • Twilio (SMS)                │
              │  • OpenAI (AI features)        │
              │  • Sightengine (PII)           │
              │  • Google/Apple (Auth)         │
              └────────────────────────────────┘
```

---

## 12. Key Patterns & Conventions

### API Conventions

- **Route Prefix**: All services use `/service-name` prefix
- **Response Format**: `{ status: boolean, message: string, data?: any }`
- **Error Handling**: HTTP 200 with `status: false` for errors
- **Authentication**: `Authorization: Bearer <token>` header

### Database Conventions

- **ORM**: Sequelize with TypeScript decorators
- **Models**: Shared via `harbor-shared-models` package
- **Naming**: PostgreSQL snake_case, TypeScript camelCase
- **Relationships**: Defined in models, used via Sequelize associations

### Code Organization

- **Layer Pattern**: Route → Controller → Service → Repository
- **Middleware**: Auth, validation, logging
- **Utils**: Singleton classes for shared utilities
- **Config**: Environment-aware configuration loading

### Security Conventions

- **Secrets**: Azure Key Vault in production, .env locally
- **Authentication**: JWT with Redis caching
- **Authorization**: Service-level domain boundaries
- **Input Validation**: express-validator schemas

---

## 13. Future Considerations

### Planned Enhancements

1. **AI Service**: Dedicated service for AI/ML features
2. **Circuit Breakers**: Fault tolerance between services
3. **Rate Limiting**: API abuse prevention
4. **Service Mesh**: Advanced service-to-service communication
5. **Event Sourcing**: Enhanced event-driven architecture
6. **Micro-Frontends**: Modular frontend architecture

### Areas for Improvement

1. **Service Size**: Some services are large and could be split
2. **Testing Coverage**: Increase automated testing
3. **Documentation**: API documentation and Swagger specs
4. **Monitoring**: Enhanced observability and alerting
5. **Performance**: Optimization of database queries and caching
6. **Security**: Restrictive CORS, rate limiting, input sanitization

---

## 14. Documentation References

For detailed information about each service, refer to:

- [API Gateway Architecture](../harborApiGateWay/architecture.md)
- [User Service Architecture](../harborUserSvc/architecture.md)
- [Job Service Architecture](../harborJobSvc/architecture.md)
- [Notification Service Architecture](../harborNotificationSvc/architecture.md)
- [Socket Service Architecture](../harborSocketSvc/architecture.md)
- [Shared Models Documentation](../harborSharedModels/architecture.md)

---

## 15. Quick Reference

### Service Endpoints

| Service | Base Path | Port |
|---------|-----------|------|
| API Gateway | `/` | 7000 |
| User Service | `/user-svc` | 3002 |
| Job Service | `/job-svc` | 3004 |
| Notification Service | `/notification-svc` | 3006 |
| Socket Service | `/socket.io` | 3005 |

### Contact Points

For questions about Harbor architecture:
- Review individual service architecture docs
- Check service-specific README files
- Consult with service maintainers

---

**Document Status**: ✅ Complete
**Maintained By**: Harbor Architecture Team
**Last Review**: March 6, 2026
