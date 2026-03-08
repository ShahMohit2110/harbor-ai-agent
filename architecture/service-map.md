# Harbor Platform - Service Map

> **Last Updated:** March 6, 2026
> **Version:** 1.0.0

---

## 1. Overview

**Purpose:** This document defines which service owns which functionality in the Harbor system. It serves as a quick reference for developers and AI agents to determine the correct repository/service to modify when implementing new features or fixing bugs.

**How to Use This Document:**
1. **Identify the feature or task** you need to implement
2. **Search the Service Responsibility Matrix** (Section 3) to find the responsible service
3. **Consult the Feature Placement Guidelines** (Section 4) if the feature is not explicitly listed
4. **Review the Service Ownership Rules** (Section 7) to understand boundaries

**Key Principle:** Each service has clear ownership boundaries. Features should always be implemented in the service that owns the domain/data being modified.

---

## 2. List of Services

| Service | Repository | Description | Key Responsibilities |
|---------|-----------|-------------|---------------------|
| **API Gateway** | `harborApiGateWay` | Central entry point for all external requests | • Authentication & authorization<br>• Request routing & proxying<br>• Social login (Google, Apple)<br>• OTP verification<br>• PII detection<br>• Security enforcement |
| **User Service** | `harborUserSvc` | User and profile management | • User CRUD operations<br>• Profile management (skills, qualifications)<br>• Community features (feeds, posts, groups)<br>• Payment & payout processing (Stripe)<br>• Notification dispatch<br>• Reward points system<br>• Background jobs & reminders<br>• AI resume review |
| **Job Service** | `harborJobSvc` | Job marketplace operations | • Job creation & management<br>• Geospatial job search<br>• Job applications & assignments<br>• Payment escrow & processing<br>• Job completion workflows<br>• Employer-seeker ratings<br>• Job proofs & media handling |
| **Notification Service** | `harborNotificationSvc` | Notification delivery & management | • Notification CRUD operations<br>• FCM token management<br>• Push notifications (Firebase)<br>• Email delivery (SendGrid)<br>• SMS delivery (Twilio)<br>• Notification preferences |
| **Socket Service** | `harborSocketSvc` | Real-time communication | • WebSocket connections<br>• In-app messaging<br>• Chat room management<br>• Message persistence<br>• Real-time updates<br>• Media handling (images, videos)<br>• PII filtering in messages |
| **Shared Models** | `harborSharedModels` | Data layer foundation | • Centralized database models<br>• Type-safe ORM definitions<br>• Shared across all services<br>• Version-controlled schemas |
| **Website** | `harborWebsite` | Web client application | • Next.js-based web interface<br>• User interactions<br>• API Gateway client<br>• Server-side rendering<br>• UI components |
| **Mobile App** | `HarborApp` | Mobile client applications | • React Native app (iOS & Android)<br>• Native mobile features<br>• API Gateway client<br>• Offline support<br>• Mobile UI |
| **Database Service** | `harborDatabaseSvc` | Database operations utility | • Database health checks<br>• Connection management<br>• Administrative database operations |
| **AI Service** | `harbor-ai` | AI-powered features | *(In Development)*<br>• Advanced AI capabilities<br>• Intelligent recommendations<br>• ML models |

---

## 3. Service Responsibility Matrix

### 3.1 User & Authentication Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| User registration | API Gateway | Creates user, generates JWT |
| User login (phone/social) | API Gateway | Verifies credentials, issues token |
| JWT token verification | API Gateway | Cached in Redis for performance |
| OTP generation & verification | API Gateway | SMS delivery via Twilio |
| Social login (Google/Apple) | API Gateway | OAuth token verification |
| Encrypted login links | API Gateway | Magic link authentication |
| User profile CRUD | User Service | All profile data management |
| Profile photo upload | User Service | Azure Blob Storage integration |
| Skills management | User Service | User skills CRUD |
| Qualifications/Certifications | User Service | User qualifications CRUD |
| User search | User Service | Search and filter users |
| User connections/favorites | User Service | Saved users functionality |
| User ratings | User Service + Job Service | Employer/Seeker ratings |
| User activity tracking | User Service | Last activity timestamps |
| Availability management | User Service | User availability status |

### 3.2 Job & Marketplace Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Job creation | Job Service | Employer posts jobs |
| Job updates/deletion | Job Service | Job modifications |
| Job search | Job Service | Including geospatial search |
| Job filtering | Job Service | By location, skills, etc. |
| Job applications | Job Service | Seeker applies to jobs |
| Job assignments | Job Service | Employer assigns seekers |
| Job completion | Job Service | Finish requests, proofs |
| Job proofs upload | Job Service | Media upload via Azure |
| Job feeds | Job Service | Public/private job feeds |
| Saved jobs | Job Service | User bookmarked jobs |
| Job ratings | Job Service | Employer ↔ Seeker ratings |
| Payment escrow | Job Service | Stripe payment holding |
| Payment release | Job Service | Release to seekers |
| Job categories/tags | Job Service | Job classification |

### 3.3 Community & Social Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Community creation | User Service | Community groups |
| Community membership | User Service | Join/leave communities |
| Community subscriptions | User Service | Paid community features |
| Community posts | User Service | Feed posts in communities |
| Feed posts | User Service | Social feed functionality |
| Feed comments | User Service | Comments on posts |
| Feed likes | User Service | Like/unlike posts |
| Feed bookmarks | User Service | Save posts for later |
| Feed reports | User Service | Report inappropriate content |
| Feed media | User Service | Images/videos in posts |
| Community guides | User Service | Community documentation |
| Community templates | User Service | Community templates |

### 3.4 Messaging & Real-time Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Chat messages | Socket Service | Real-time messaging |
| Chat rooms | Socket Service | Conversation management |
| Message media | Socket Service | Images/videos in chat |
| Typing indicators | Socket Service | Real-time status |
| Unread message count | Socket Service | Message badges |
| Online status | Socket Service | User presence |
| Message PII filtering | Socket Service | Blocks personal info |
| Push notifications | Notification Service | Via Firebase FCM |
| In-app notifications | Notification Service | Notification storage |
| Notification preferences | Notification Service | User notification settings |

### 3.5 Payment & Financial Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Stripe customer creation | User Service | Stripe account management |
| Stripe connected accounts | User Service | For seeker payouts |
| Payment intents | Job Service | Job payment processing |
| Payouts to seekers | User Service | Stripe transfers |
| Transaction records | User Service + Job Service | Payment history |
| Subscription billing | User Service | Plan subscriptions |
| Payment webhooks | User Service + Job Service | Stripe event handling |
| Withdrawal requests | User Service | Seeker payouts |
| Refund processing | User Service + Job Service | Payment refunds |

### 3.6 Notification & Communication Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Push notifications | Notification Service | Firebase FCM |
| Email notifications | Notification Service | SendGrid/Mailgun |
| SMS notifications | Notification Service | Twilio |
| FCM token management | Notification Service | Device tokens |
| Notification history | Notification Service | Past notifications |
| Bulk notifications | Notification Service | Admin broadcasts |
| Email templates | User Service | Template management |

### 3.7 Rewards & Gamification Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Reward points | User Service | Points calculation |
| Reward badges | User Service | User achievements |
| Reward streaks | User Service | Daily streaks tracking |
| Reward categories | User Service | Point types |
| Reward logs | User Service | Point history |
| Referral system | User Service | User referrals |
| Leaderboards | User Service | Rankings |

### 3.8 AI & Intelligence Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Resume review | User Service | Via OpenAI API |
| Job recommendations | User Service | AI-powered matching |
| Content moderation | Socket Service + API Gateway | PII detection |
| Intelligent search | Job Service | AI-enhanced search |
| Advanced AI features | AI Service | *(Future)* Dedicated ML models |

### 3.9 Administrative & Content Features

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| CMS pages | User Service | Content management |
| FAQs | User Service | FAQ management |
| Contact forms | User Service | User inquiries |
| Tutorials | User Service | Educational content |
| Admin settings | User Service | System configuration |
| Email templates | User Service | Notification templates |
| Newsletters | User Service | Email subscriptions |

### 3.10 Client Applications

| Feature / Domain | Responsible Service | Notes |
|-----------------|-------------------|-------|
| Web UI pages | Website | Next.js pages |
| Web API integration | Website | Axios calls to API Gateway |
| Mobile UI screens | Mobile App | React Native screens |
| Mobile API integration | Mobile App | HTTP calls to API Gateway |
| WebSocket client | Website + Mobile App | Socket.io client |

---

## 4. Feature Placement Guidelines

### 4.1 General Decision Tree

```
Does the feature involve┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│
├─▶ Authentication/Login? → API Gateway
│
├─▶ User profiles/data? → User Service
│
├─▶ Job postings/applications? → Job Service
│
├─▶ Real-time messaging? → Socket Service
│
├─▶ Notifications? → Notification Service
│
├─▶ Payments/Stripe? → User Service + Job Service
│
├─▶ Community/Social feeds? → User Service
│
├─▶ UI/Web pages? → Website
│
├─▶ Mobile screens? → Mobile App
│
└─▶ Database models? → Shared Models (if shared across services)
```

### 4.2 Detailed Guidelines

#### User-Related Features
**Implement in User Service if the feature involves:**
- User profile data (name, bio, location, etc.)
- User skills, qualifications, or certifications
- User photos, galleries, or media
- User connections, favorites, or saved items
- User settings or preferences
- User activity tracking
- User availability status
- **Exception:** Authentication/login flows → **API Gateway**

#### Job-Related Features
**Implement in Job Service if the feature involves:**
- Job creation, updates, or deletion
- Job search or filtering
- Job applications or assignments
- Job completion or proofs
- Job ratings or reviews
- Job feeds or listings
- Job categories or tags
- Payment escrow for jobs
- **Exception:** Job payment payouts to seekers → **User Service**

#### Communication Features
**Implement in Socket Service if the feature involves:**
- Real-time chat messages
- Conversation or chat room management
- Typing indicators or read receipts
- Online/offline status
- Message media (images, videos)
- Real-time bidirectional updates

#### Notification Features
**Implement in Notification Service if the feature involves:**
- Push notification delivery
- Email delivery
- SMS delivery
- FCM token management
- Notification storage
- Notification preferences
- **Exception:** In-app notification business logic → **User Service**

#### Payment Features
**Implement in User Service OR Job Service if the feature involves:**
- Stripe integration
- Payment processing
- Payouts to seekers
- Transaction records
- **Rule:** If payment is for job escrow/release → **Job Service**
- **Rule:** If payment is for seeker payouts → **User Service**

#### Community & Social Features
**Implement in User Service if the feature involves:**
- Community groups or memberships
- Social feed posts
- Comments, likes, or shares
- Community subscriptions
- Social interactions

#### UI Features
**Implement in Website if the feature involves:**
- Web pages or routes
- React components
- Web-specific UI logic
- **Implement in Mobile App if the feature involves:**
- Mobile screens or navigation
- Mobile-specific UI logic
- Native device features

#### Cross-Cutting Features
**Implement in Shared Models if the feature involves:**
- Database schema changes affecting multiple services
- New data models used by multiple services
- ORM relationship definitions

---

## 5. Cross-Service Interaction Rules

### 5.1 Communication Principles

✅ **DO:**
- Use **REST APIs** for synchronous communication
- Use **message queues** (Redis/Bull) for async tasks
- Use **Azure Service Bus** for event-driven communication
- Use **WebSocket** for real-time features
- **Always** route external requests through **API Gateway**

❌ **DO NOT:**
- Directly access another service's database
- Bypass API Gateway for external client requests
- Implement duplicate business logic across services
- Make circular dependencies between services
- Share authentication tokens between services

### 5.2 Data Access Rules

| Rule | Description |
|------|-------------|
| **Single Source of Truth** | Each data entity has exactly one owner service |
| **Read-Only Access** | Services may read data via APIs, never directly |
| **No Direct DB Access** | Services never connect to another service's database |
| **Shared Models** | Use `harbor-shared-models` for schema consistency |
| **API-Based Updates** | All data modifications go through owner service APIs |

### 5.3 Authentication Flow

```
Client Request
    │
    ▼
API Gateway (Authentication)
    │
    ├─▶ Verify JWT
    ├─▶ Attach user context
    └─▶ Proxy to service
        │
        ▼
Internal Service
    │
    └─▶ Trust user context from API Gateway
```

**Key Points:**
- API Gateway handles all authentication
- Internal services trust the forwarded user context
- Services don't re-verify JWT (they trust API Gateway)

### 5.4 Service Dependencies

```
API Gateway
    ├──▶ User Service
    ├──▶ Job Service
    ├──▶ Notification Service
    └──▶ Socket Service (WebSocket passthrough)

User Service
    ├──▶ PostgreSQL (user data)
    ├──▶ Stripe (payments)
    ├──▶ OpenAI (AI features)
    └──▶ SendGrid/Twilio (notifications)

Job Service
    ├──▶ PostgreSQL (job data)
    ├──▶ Stripe (escrow)
    └──▶ Azure Blob (media)

Notification Service
    ├──▶ PostgreSQL (notifications)
    ├──▶ Firebase (push)
    ├──▶ SendGrid (email)
    └──▶ Twilio (SMS)

Socket Service
    ├──▶ PostgreSQL (messages)
    ├──▶ Redis (queue)
    └──▶ Azure Blob (media)
```

---

## 6. Examples

### 6.1 Real-World Task Examples

| Task | Responsible Service | Why? |
|------|-------------------|------|
| Add "user without CV" filter | User Service | Involves user profile data |
| Implement job search by location | Job Service | Involves job data and search |
| Add push notification for new jobs | Notification Service | Notification delivery |
| Create chat between users | Socket Service | Real-time messaging |
| Add Stripe webhook handler | User Service + Job Service | Payment processing |
| Implement social login | API Gateway | Authentication |
| Add new page to website | Website | UI/web feature |
| Add mobile screen for profile | Mobile App | UI/mobile feature |
| Create reward point system | User Service | User gamification |
| Add PII detection to chat | Socket Service | Message filtering |
| Implement email notifications | Notification Service | Email delivery |
| Add community groups feature | User Service | Community management |
| Create job completion flow | Job Service | Job workflow |
| Add resume review feature | User Service | AI + user data |
| Implement typing indicators | Socket Service | Real-time status |
| Add notification preferences | Notification Service | Notification settings |

### 6.2 Feature Implementation Examples

#### Example 1: Add "User Availability" Feature

**Question:** Where should I implement user availability status?

**Answer:** **User Service**

**Reasoning:**
- Availability is user profile data
- It's part of user state management
- Other services may read this via API
- User Service owns user-related data

**Implementation:**
1. Add `availability` column to `users` table (Shared Models)
2. Create API endpoints in User Service (`PUT /user-svc/availability`)
3. Update to API Gateway routing
4. Client apps call API Gateway endpoints

#### Example 2: Add "Job Application Fee" Feature

**Question:** Where should I implement job application fees?

**Answer:** **Job Service** (for escrow) + **User Service** (for payouts)

**Reasoning:**
- Job Service handles job-related payments (escrow)
- User Service handles seeker payouts
- Both services integrate with Stripe

**Implementation:**
1. Job Service: Create payment intent when applying
2. Job Service: Hold payment in escrow
3. Job Service: Release payment on completion
4. User Service: Payout to seeker's bank account

#### Example 3: Add "Real-time Notification" Feature

**Question:** Where should I implement real-time notifications?

**Answer:** **Socket Service** (real-time) + **Notification Service** (delivery)

**Reasoning:**
- Socket Service handles real-time updates
- Notification Service handles push/email/SMS delivery
- Both services work together

**Implementation:**
1. Notification Service: Store notification in database
2. Notification Service: Send push/email/SMS
3. Socket Service: Emit real-time event to connected users
4. Client apps: Listen for Socket Service events

---

## 7. Service Ownership Rules

### 7.1 API Gateway

**API Gateway owns:**
- ✅ Authentication & authorization (login, signup, JWT)
- ✅ Request routing & proxying
- ✅ Social login (Google, Apple)
- ✅ OTP generation & verification
- ✅ PII detection in requests
- ✅ Rate limiting (planned)
- ✅ Security middleware

**API Gateway does NOT own:**
- ❌ User profile data (→ User Service)
- ❌ Job data (→ Job Service)
- ❌ Business logic for features
- ❌ Database operations (except tokens table)

### 7.2 User Service

**User Service owns:**
- ✅ User profiles & settings
- ✅ Skills & qualifications
- ✅ Community groups & memberships
- ✅ Social feeds & posts
- ✅ Comments, likes, bookmarks
- ✅ Payment processing (Stripe)
- ✅ Payouts to seekers
- ✅ Reward points & gamification
- ✅ Background jobs & reminders
- ✅ AI features (resume review)
- ✅ Email templates & CMS content
- ✅ Notification dispatch logic

**User Service does NOT own:**
- ❌ Authentication/login (→ API Gateway)
- ❌ Job data (→ Job Service)
- ❌ Real-time messaging (→ Socket Service)
- ❌ Push notification delivery (→ Notification Service)

### 7.3 Job Service

**Job Service owns:**
- ✅ Job postings & management
- ✅ Job search & filtering
- ✅ Job applications & assignments
- ✅ Job completion workflows
- ✅ Job proofs & media
- ✅ Job ratings
- ✅ Payment escrow for jobs
- ✅ Payment release to seekers
- ✅ Saved jobs
- ✅ Job feeds

**Job Service does NOT own:**
- ❌ User profile data (→ User Service)
- ❌ Payout processing (→ User Service)
- ❌ Real-time updates (→ Socket Service)

### 7.4 Notification Service

**Notification Service owns:**
- ✅ Notification storage
- ✅ Push notification delivery (Firebase)
- ✅ Email delivery (SendGrid/Mailgun)
- ✅ SMS delivery (Twilio)
- ✅ FCM token management
- ✅ Notification preferences
- ✅ Notification history

**Notification Service does NOT own:**
- ❌ Notification business logic (→ User Service)
- ❌ Real-time messaging (→ Socket Service)
- ❌ User data (→ User Service)

### 7.5 Socket Service

**Socket Service owns:**
- ✅ WebSocket connections
- ✅ Chat messages
- ✅ Conversation/room management
- ✅ Message persistence
- ✅ Real-time event broadcasting
- ✅ Typing indicators
- ✅ Online/offline status
- ✅ Message PII filtering
- ✅ Chat media handling

**Socket Service does NOT own:**
- ❌ Notification delivery (→ Notification Service)
- ❌ User profile data (→ User Service)
- ❌ Job data (→ Job Service)

### 7.6 Shared Models

**Shared Models owns:**
- ✅ Database model definitions
- ✅ ORM relationships
- ✅ Type definitions
- ✅ Schema versioning

**Shared Models does NOT own:**
- ❌ Business logic
- ❌ API endpoints
- ❌ Database migrations (planned)

### 7.7 Website

**Website owns:**
- ✅ Web UI components
- ✅ Page routing
- ✅ API integration (calls API Gateway)
- ✅ State management (Redux)
- ✅ Server-side rendering
- ✅ Web-specific features

**Website does NOT own:**
- ❌ Business logic (→ backend services)
- ❌ Authentication (→ API Gateway)
- ❌ Data storage (→ backend services)

### 7.8 Mobile App

**Mobile App owns:**
- ✅ Mobile UI screens
- ✅ Navigation
- ✅ API integration (calls API Gateway)
- ✅ State management (Redux)
- ✅ Native device features
- ✅ Offline support

**Mobile App does NOT own:**
- ❌ Business logic (→ backend services)
- ❌ Authentication (→ API Gateway)
- ❌ Data storage (→ backend services)

### 7.9 Database Service

**Database Service owns:**
- ✅ Database health checks
- ✅ Connection monitoring
- ✅ Administrative operations

**Database Service does NOT own:**
- ❌ Business logic
- ❌ API endpoints
- ❌ Data ownership

### 7.10 AI Service

**AI Service owns:**
- ✅ Advanced AI models
- ✅ Machine learning algorithms
- ✅ Intelligent recommendations
- ✅ AI model training

**AI Service does NOT own:**
- ❌ User data (→ User Service)
- ❌ Job data (→ Job Service)
- ❌ Basic AI features (→ User Service for now)

---

## 8. Quick Reference Guide

### 8.1 Decision Checklist

When implementing a new feature, ask:

1. **Does it involve authentication/login?**
   - ✅ Yes → **API Gateway**
   - ❌ No → Continue

2. **Does it involve user profiles/data?**
   - ✅ Yes → **User Service**
   - ❌ No → Continue

3. **Does it involve jobs/applications?**
   - ✅ Yes → **Job Service**
   - ❌ No → Continue

4. **Does it involve real-time messaging?**
   - ✅ Yes → **Socket Service**
   - ❌ No → Continue

5. **Does it involve notifications delivery?**
   - ✅ Yes → **Notification Service**
   - ❌ No → Continue

6. **Does it involve UI/web pages?**
   - ✅ Yes → **Website**
   - ❌ No → Continue

7. **Does it involve mobile screens?**
   - ✅ Yes → **Mobile App**
   - ❌ No → Continue

8. **Does it involve shared data models?**
   - ✅ Yes → **Shared Models**
   - ❌ No → Review requirements

### 8.2 Common Tasks Quick Reference

| Task | Service | Endpoint/Location |
|------|---------|------------------|
| User login | API Gateway | `POST /login` |
| Social login | API Gateway | `POST /social-login` |
| Get user profile | User Service | `GET /user-svc/user` |
| Update profile | User Service | `PUT /user-svc/update-user` |
| Create job | Job Service | `POST /job-svc/job` |
| Search jobs | Job Service | `GET /job-svc/search-jobs` |
| Apply to job | Job Service | `POST /job-svc/apply` |
| Get notifications | Notification Service | `GET /notification-svc/get-notifications` |
| Send message | Socket Service | `socket.emit('send_message')` |
| Get conversation | Socket Service | `socket.emit('conversation_list')` |
| Web UI page | Website | `pages/*.tsx` |
| Mobile screen | Mobile App | `screens/*.tsx` |

---

## 9. Service Port Reference

| Service | Internal Port | Base Path |
|---------|--------------|-----------|
| API Gateway | 7000 | `/` |
| User Service | 3002 | `/user-svc` |
| Job Service | 3004 | `/job-svc` |
| Notification Service | 3006 | `/notification-svc` |
| Socket Service | 3005 | `/socket.io` |

---

## 10. Contact & Support

For questions about service ownership:
1. Review this document's **Service Responsibility Matrix** (Section 3)
2. Consult individual service **architecture.md** files
3. Check with service maintainers
4. Review code examples in each repository

---

**Document Status**: ✅ Complete
**Maintained By**: Harbor Architecture Team
**Last Review:** March 6, 2026

---

## Appendix: Architecture Document References

For detailed service-specific information, refer to:
- [API Gateway Architecture](../harborApiGateWay/architecture.md)
- [User Service Architecture](../harborUserSvc/architecture.md)
- [Job Service Architecture](../harborJobSvc/architecture.md)
- [Notification Service Architecture](../harborNotificationSvc/architecture.md)
- [Socket Service Architecture](../harborSocketSvc/architecture.md)
- [Shared Models Documentation](../harborSharedModels/architecture.md)
