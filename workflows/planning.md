# Harbor AI - Planning Template

> **Template Version:** 1.0.0
> **Last Updated:** March 6, 2026
> **Purpose:** Standard planning template for all Harbor AI tasks

---

## 📋 Instructions

**HOW TO USE THIS TEMPLATE:**

1. **Copy this template** to a new planning file for your task
2. **Fill in ALL sections** before starting implementation
3. **Follow the Harbor Architecture Principles** (see `.harbor-ai/coding-rules.md`)
4. **Use `service-map.md`** to identify affected services
5. **Review architecture.md files** for affected services
6. **Get approval** if any risks are identified

**IMPORTANT:** Complete this planning document **BEFORE** writing any code.

---

## 1. Task Overview

### 1.1 Task Title
*[Brief, descriptive title of the task]*

**Example:** "Add User Availability Status Feature"

### 1.2 Task Description
*[Detailed description of what needs to be built]*

**Required Information:**
- What feature/functionality is being implemented?
- What problem does it solve?
- Who are the users/stakeholders?

### 1.3 Success Criteria
*[Define clear, measurable success criteria]*

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Example:**
- [ ] Users can set their availability status (available/busy)
- [ ] Availability status is displayed in user profiles
- [ ] Status updates in real-time via WebSocket

---

## 2. Business Objective

### 2.1 Business Goal
*[Explain WHY this feature is needed from a business perspective]*

**Required Information:**
- What business value does this provide?
- What pain point does it address?
- What metrics will improve?

### 2.2 User Stories
*[List user stories describing the feature from user perspective]*

**Format:** As a [role], I want [feature], so that [benefit].

**Example:**
- As a **job seeker**, I want to **set my availability status**, so that **employers know when I'm available for work**
- As an **employer**, I want to **see seeker availability**, so that **I can contact available candidates**

---

## 3. Affected Services

### 3.1 Primary Service
*[Identify the MAIN service that owns this feature]*

**Service:** `[Service Name]`

**Service Location:** `[Repository Name]`

**Rationale:** *[Why does this service own this feature?]*

**Example:**
```
Service: User Service
Service Location: harborUserSvc
Rationale: User availability status is user profile data,
           which is owned by User Service as defined in service-map.md
```

### 3.2 Secondary Services
*[List any other services that are affected by this feature]*

**NONE** or list each service:

| Service | Location | Impact Level | Reason |
|---------|----------|--------------|--------|
| Service Name | Repository | High/Medium/Low | Why affected |

**Impact Levels:**
- **HIGH:** Major changes required, core functionality affected
- **MEDIUM:** Minor changes, API extensions, configuration updates
- **LOW:** No changes, read-only access, or optional integration

### 3.3 Cross-Service Dependencies
*[Identify if this feature requires multiple services to work together]*

**Example:**
```
Feature: Real-time availability updates

Primary Service: User Service (manages availability data)
Secondary Service: Socket Service (broadcasts availability changes)

Flow: User Service → Azure Service Bus → Socket Service → Clients
```

---

## 4. API Changes

### 4.1 New API Endpoints
*[List any new API endpoints that need to be created]*

**Format:** `METHOD /path` - Description

**Primary Service Endpoints:**

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/user-svc/availability` | Set user availability | `{ status: 'available' \| 'busy' }` | `{ status: true, data: {...} }` |
| GET | `/user-svc/availability/:userId` | Get user availability | N/A | `{ status: true, data: { availability: 'available' } }` |
| PUT | `/user-svc/availability` | Update availability | `{ status: 'busy' }` | `{ status: true, data: {...} }` |

### 4.2 API Modifications
*[List any existing API endpoints that need to be modified]*

**NONE** or:

| Endpoint | Current Behavior | New Behavior | Breaking Change? |
|----------|-----------------|--------------|-----------------|
| GET /user-svc/user | Returns user without availability | Returns user WITH availability field | YES - response structure changes |

### 4.3 API Deprecations
*[List any APIs that will be deprecated or removed]*

**NONE** or list deprecated APIs:

| Endpoint | Deprecation Reason | Migration Path |
|----------|--------------------|-----------------|
| Old endpoint | Why deprecated | Use new endpoint instead |

### 4.4 API Gateway Changes
*[List any changes needed in API Gateway]*

**NONE** or:

- [ ] New route to add
- [ ] Route modification needed
- [ ] Middleware changes required
- [ ] PII detection rules update

---

## 5. Database Changes

### 5.1 New Tables/Collections
*[List any new database tables or collections]*

**NONE** or:

**Table Name:** `user_availability`

**Service:** User Service

**Schema:**

```sql
CREATE TABLE user_availability (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  status VARCHAR(20) NOT NULL, -- 'available', 'busy', 'offline'
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_userId (userId),
  INDEX idx_status (status)
);
```

### 5.2 Table Modifications
*[List any modifications to existing tables]*

**NONE** or:

| Table | Modification | Type | Breaking Change? |
|-------|-------------|------|------------------|
| users | Add `availability` column | ADD COLUMN VARCHAR(20) | NO - nullable |

### 5.3 Model Changes (Shared Models)
*[List any changes to harbor-shared-models]*

**NONE** or:

**File:** `harborSharedModels/src/models/user.model.ts`

**Changes:**
- Add `availability` property to User model
- Update type definitions

### 5.4 Data Migration Required
*[Is data migration needed? If yes, describe the migration]*

**YES** or **NO**

**If YES:**
- Migration script location: `[path to migration script]`
- Migration timing: `[before deployment / after deployment / during downtime]`
- Rollback plan: `[how to rollback migration]`

---

## 6. Event / Queue Changes

### 6.1 New Events
*[List any new events that will be published]*

**NONE** or:

| Event Name | Publisher | Payload | Trigger |
|------------|----------|--------|---------|
| `user.availability.changed` | User Service | `{ userId, status, timestamp }` | User updates availability |

### 6.2 Event Subscriptions
*[List any events that services will subscribe to]*

**NONE** or:

| Service | Subscribes To | Action |
|---------|---------------|--------|
| Socket Service | `user.availability.changed` | Broadcast to connected clients |

### 6.3 Queue Changes
*[List any changes to Bull queues or message queues]*

**NONE** or:

**Queue:** `availability-update-queue`

**Producer:** User Service

**Consumer:** Socket Service

**Job Data:**
```typescript
{
  userId: number,
  status: 'available' | 'busy',
  timestamp: Date
}
```

---

## 7. Dependencies

### 7.1 New Dependencies
*[List any new npm packages or external services]*

**NONE** or:

| Package/Service | Version | Purpose | Service |
|-----------------|---------|---------|---------|
| package-name | ^1.2.3 | Description | Service Name |

### 7.2 Dependency Upgrades
*[List any existing dependencies that need to be upgraded]*

**NONE** or:

| Package | Current Version | New Version | Reason | Breaking Changes? |
|---------|----------------|--------------|-------|-------------------|

### 7.3 Infrastructure Changes
*[List any infrastructure changes required]*

**NONE** or:

- [ ] Azure Key Vault secrets needed
- [ ] Azure Blob Storage containers needed
- [ ] Kubernetes configuration changes
- [ ] CI/CD pipeline updates
- [ ] Monitoring/logging updates

---

## 8. Architecture Validation

### 8.1 Service Boundary Validation
*[Confirm that this feature respects service boundaries]*

**Checklist:**

- [ ] Feature is implemented in the correct service (verified via service-map.md)
- [ ] No cross-service database access
- [ ] No duplicate business logic across services
- [ ] APIs used for cross-service communication
- [ ] API Gateway routing used appropriately

**Rationale:** *[Explain why this approach respects service boundaries]*

### 8.2 Data Ownership Validation
*[Confirm data ownership is respected]*

**Checklist:**

- [ ] Primary data owner service identified
- [ ] Other services access data via APIs only
- [ ] No direct database access across services
- [ ] Shared models updated if needed (harbor-shared-models)

### 8.3 Communication Pattern Validation
*[Validate the communication pattern chosen]*

**Pattern Used:** [REST API / Message Queue / WebSocket / Hybrid]

**Rationale:** *[Why is this pattern appropriate for this feature?]*

**Validation:**
- [ ] Pattern aligns with Harbor architecture principles
- [ ] No circular dependencies introduced
- [ ] Scalability considerations addressed
- [ ] Error handling and retry logic considered

---

## 9. Risks / Edge Cases

### 9.1 Technical Risks
*[Identify technical risks and mitigation strategies]*

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|-------------------|
| Database performance degradation with new queries | Medium | High | Add database indexes, query optimization |
| Increased latency on user profile endpoint | Low | Medium | Implement caching strategy |
| Real-time updates may overwhelm clients | Medium | Medium | Throttle updates, use connection pooling |

### 9.2 Edge Cases
*[List edge cases that must be handled]*

**Required Edge Cases:**

1. **Edge Case 1:** User availability status when offline
   - **Handling:** Store last known status, show "offline" when user disconnects

2. **Edge Case 2:** Multiple concurrent updates from different devices
   - **Handling:** Use last-write-wins strategy, timestamp-based conflict resolution

3. **Edge Case 3:** Database connection failure during status update
   - **Handling:** Implement retry logic, queue updates for later processing

### 9.3 Security Considerations
*[List security implications and how they will be addressed]*

**Required Security Checks:**

- [ ] Input validation on all new endpoints
- [ ] Authentication/authorization requirements
- [ ] PII data handling compliance
- [ ] Rate limiting considerations
- [ ] SQL injection prevention
- [ ] XSS prevention

### 9.4 Performance Considerations
*[List performance implications and optimization strategies]*

**Required Performance Checks:**

- [ ] Database query performance: [describe]
- [ ] API response time targets: [SLA requirements]
- [ ] Caching strategy: [if applicable]
- [ ] Index requirements: [list indexes needed]
- [ ] Load testing: [required? if yes, describe plan]

---

## 10. Implementation Plan

### 10.1 Implementation Phases
*[Break down the implementation into logical phases]*

**Phase 1: Preparation** `[Estimated Time: X hours]`
- [ ] Update shared models (harbor-shared-models)
- [ ] Add database migration scripts
- [ ] Create database indexes

**Phase 2: Backend Implementation** `[Estimated Time: X hours]`
- [ ] Implement new API endpoints in primary service
- [ ] Add business logic in service layer
- [ ] Implement repository layer (data access)
- [ ] Add validation middleware

**Phase 3: Cross-Service Integration** `[Estimated Time: X hours]`
- [ ] Implement event publishing
- [ ] Add event subscriptions in secondary services
- [ ] Update API Gateway routing if needed
- [ ] Test cross-service communication

**Phase 4: Frontend Integration** `[Estimated Time: X hours]`
- [ ] Update web client (Website)
- [ ] Update mobile client (Mobile App)
- [ ] Test client integration

**Phase 5: Testing & Validation** `[Estimated Time: X hours]`
- [ ] Unit testing
- [ ] Integration testing
- [ ] End-to-end testing
- [ ] Performance testing

### 10.2 Step-by-Step Implementation

**Detailed Steps:**

**Step 1: Update Shared Models**
- [ ] Add `availability` property to User model
- [ ] Update TypeScript types
- [ ] Version bump harbor-shared-models
- [ ] Publish to npm registry

**Step 2: Database Schema Update**
- [ ] Create migration script for `user_availability` table
- [ ] Add `availability` column to `users` table
- [ ] Create database indexes
- [ ] Test migration on development environment

**Step 3: User Service Implementation**
- [ ] Create `availability.repository.ts`
- [ ] Create `availability.service.ts` with business logic
- [ ] Create `availability.controller.ts` with endpoints
- [ ] Add validation middleware
- [ ] Add unit tests

**Step 4: Socket Service Integration**
- [ ] Subscribe to `user.availability.changed` event
- [ ] Implement broadcast logic to connected clients
- [ ] Add error handling for disconnected clients

**Step 5: API Gateway Configuration**
- [ ] No changes needed (routes go through existing proxy)

**Step 6: Documentation**
- [ ] Update API documentation
- [ ] Update architecture.md for affected services
- [ ] Document new event contracts

**Step 7: Testing**
- [ ] Unit tests for all new code
- [ ] Integration tests for cross-service communication
- [ ] Manual testing with client applications
- [ ] Performance testing

### 10.3 Implementation Order
*[Specify the order in which components should be implemented and deployed]*

**Order:**

1. **harbor-shared-models** - Must be deployed first (other services depend on it)
2. **User Service** - Primary service for the feature
3. **Socket Service** - Secondary service for real-time updates
4. **Testing** - Validate all components together
5. **Client Applications** - Deploy last (depend on backend APIs)

**Deployment Strategy:** Rolling deployment with zero downtime

---

## 11. Testing Plan

### 11.1 Unit Testing
*[Describe unit testing approach]*

**Required Unit Tests:**

- [ ] Repository layer tests (data access)
- [ ] Service layer tests (business logic)
- [ ] Controller layer tests (API endpoints)
- [ ] Validation middleware tests
- [ ] Event publishing tests

**Test Coverage Target:** `[e.g., 80% coverage]`

### 11.2 Integration Testing
*[Describe integration testing approach]*

**Required Integration Tests:**

- [ ] API endpoint tests (request/response validation)
- [ ] Cross-service communication tests
- [ ] Event publishing/consuming tests
- [ ] Database integration tests

**Test Scenarios:**

1. **Scenario 1:** User sets availability → Available in database
2. **Scenario 2:** User updates availability → Event published
3. **Scenario 3:** Socket Service receives event → Broadcasts to clients
4. **Scenario 4:** Client queries availability → Returns current status

### 11.3 End-to-End Testing
*[Describe E2E testing approach]*

**Required E2E Tests:**

- [ ] User sets availability via API → Verified in database
- [ ] User updates availability via WebSocket → Clients receive update
- [ ] Multiple concurrent users updating availability → No conflicts
- [ ] User goes offline → Status shows "offline" to other users

**Testing Tools:** `[e.g., Jest, Supertest, Postman, Browser automation]`

### 11.4 Performance Testing
*[Describe performance testing approach if applicable]*

**Required Performance Tests:**

- [ ] Load test: `[number] concurrent users`
- [ ] Stress test: Maximum load before degradation
- [ ] Response time test: API response under `[X] ms`
- [ ] Database query performance test: Query under `[X] ms`

**Performance Targets:**

| Metric | Target | Acceptable |
|--------|--------|-----------|
| API response time (p95) | < 200ms | < 500ms |
| Database query time | < 100ms | < 200ms |
| WebSocket message latency | < 50ms | < 100ms |

### 11.5 Rollback Testing
*[Describe rollback testing approach]*

**Required Rollback Tests:**

- [ ] Verify old functionality still works after rollback
- [ ] Verify no data corruption after rollback
- [ ] Verify services can operate without new feature
- [ ] Verify client applications work with old version

---

## 12. Rollback Plan

### 12.1 Rollback Triggers
*[Define conditions that would trigger a rollback]*

**Immediate Rollback Triggers:**

- [ ] Critical bug discovered in production
- [ ] Performance degradation beyond acceptable limits
- [ ] Data corruption or loss detected
- [ ] Security vulnerability identified
- [ ] Breaking change not backwards compatible

### 12.2 Rollback Procedure
*[Step-by-step rollback procedure]*

**Rollback Steps:**

1. **Stop Deployment:** Pause any ongoing deployment
2. **Database Rollback:** Execute database rollback script
   ```bash
   # Example rollback command
   npm run rollback:migration
   ```
3. **Service Rollback:** Revert to previous Docker image
   ```bash
   # Example rollback command
   kubectl rollout undo deployment/user-service
   ```
4. **Verification:** Run smoke tests to verify system stability
5. **Monitoring:** Check Application Insights for errors
6. **Communication:** Notify team of rollback

### 12.3 Rollback Verification
*[How to verify rollback was successful]*

**Verification Checklist:**

- [ ] Services are running (health checks pass)
- [ ] Old functionality works correctly
- [ ] No database errors
- [ ] No increase in error rates (Application Insights)
- [ ] Client applications function normally
- [ ] API response times are normal

### 12.4 Data Integrity After Rollback
*[How to ensure data integrity]*

**Data Integrity Checks:**

- [ ] Verify no orphaned records in database
- [ ] Verify referential integrity maintained
- [ ] Verify no data corruption in shared models
- [ ] Run database consistency checks if applicable

---

## 13. Deployment Plan

### 13.1 Deployment Environment
*[Specify the deployment environment]*

**Target Environment:** [Development / QA / Staging / Production]

**Deployment Date:** `[Date and time]`

**Deployment Window:** `[Maintenance window if applicable]`

### 13.2 Deployment Steps
*[List deployment steps in order]*

**Pre-Deployment:**

1. [ ] Back up current database
2. [ ] Take snapshot of current running containers
3. [ ] Notify stakeholders of deployment
4. [ ] Disable health checks (to prevent premature traffic)

**Deployment:**

1. [ ] Deploy harbor-shared-models (if changed)
2. [ ] Run database migrations
3. [ ] Deploy User Service (if changed)
4. [ ] Deploy Socket Service (if changed)
5. [ ] Update API Gateway (if needed)
6. [ ] Enable health checks

**Post-Deployment:**

1. [ ] Run smoke tests
2. [ ] Monitor Application Insights for errors
3. [ ] Verify API endpoints respond correctly
4. [ ] Verify WebSocket connections work
5. [ ] Monitor performance metrics

### 13.3 Database Migration Deployment
*[How will database changes be deployed]*

**Migration Strategy:** [Zero-downtime migration / Blue-green deployment]

**Migration Timing:**
- [ ] Before service deployment
- [ ] After service deployment (with compatibility mode)
- [ ] During maintenance window

**Rollback if Migration Fails:** *[Describe rollback procedure]*

---

## 14. Monitoring & Observability

### 14.1 Metrics to Track
*[List key metrics to monitor post-deployment]*

| Metric | Tool | Alert Threshold | Purpose |
|--------|------|----------------|---------|
| API response time | Application Insights | > 500ms | Performance monitoring |
| Error rate | Application Insights | > 1% | Error monitoring |
| Database connection pool | Application Insights | > 80% usage | Resource monitoring |
| WebSocket connections | Socket Service logs | Track trends | Usage monitoring |
| Event publishing rate | Service Bus metrics | Track trends | Integration monitoring |

### 14.2 Logging Requirements
*[Specify logging requirements]*

**Required Logging:**

- [ ] Log all new API endpoints (request/response)
- [ ] Log event publishing and consuming
- [ ] Log database operations (insert, update, delete)
- [ ] Log errors with stack traces
- [ ] Log performance metrics

**Log Locations:**

- Application Insights (production)
- Local log files (development)

### 14.3 Alert Configuration
*[Configure alerts for critical issues]*

**Alert Rules:**

- [ ] Error rate > 1% for 5 minutes → Alert team
- [ ] API response time > 1s for 5 minutes → Alert team
- [ ] Database connection failures → Immediate alert
- [ ] Event publishing failures → Alert team

---

## 15. Documentation Updates

### 15.1 Architecture Documentation
*[List architecture documentation that needs to be updated]*

- [ ] Update `.harbor-ai/architecture-overview.md` if new services added
- [ ] Update `.harbor-ai/service-map.md` if service responsibilities changed
- [ ] Update `harborUserSvc/architecture.md` - Add availability feature section
- [ ] Update `harborSocketSvc/architecture.md` - Add event subscription section

### 15.2 API Documentation
*[List API documentation updates needed]*

- [ ] Update Swagger/OpenAPI documentation
- [ ] Document new endpoints in API Gateway
- [ ] Document event contracts (payload schemas)

### 15.3 Runbook Updates
*[List runbook or operational documentation updates]*

- [ ] Add troubleshooting guide for availability feature
- [ ] Add operational procedures for handling failures
- [ ] Update deployment runbook

---

## 16. Success Criteria Verification

### 16.1 Pre-Implementation Checklist
*[Checklist to complete BEFORE starting implementation]*

**Planning:**
- [ ] This planning document is complete
- [ ] Architecture review completed
- [ ] Service identification validated
- [ ] Cross-service impacts assessed
- [ ] Risks identified and mitigated
- [ ] Team approval obtained

**Readiness:**
- [ ] All stakeholders notified
- [ ] Development environment ready
- [ ] Required dependencies available
- [ ] Testing environment prepared

### 16.2 Post-Implementation Checklist
*[Checklist to complete AFTER implementation]*

**Code Quality:**
- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] No linting warnings
- [ ] Code reviewed and approved
- [ ] All tests passing

**Functionality:**
- [ ] All success criteria met (Section 1.3)
- [ ] API endpoints working correctly
- [ ] Database schema updated
- [ ] Events publishing/consuming correctly
- [ ] Frontend integration working

**Testing:**
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing
- [ ] Performance tests meet targets
- [ ] Security tests passing

**Deployment:**
- [ ] Deployed to target environment
- [ ] Database migrations successful
- [ ] Health checks passing
- [ ] Monitoring configured
- [ ] Rollback plan tested

---

## 17. Approval & Sign-Off

### 17.1 Technical Approval
*[Technical review and approval]*

**Reviewed By:** `[Name, Role]`

**Approval Items:**
- [ ] Architecture approach
- [ ] Service boundary compliance
- [ ] API design
- [ ] Database schema changes
- [ ] Security review
- [ ] Performance impact

**Status:** `[ ] Approved / [ ] Approved with Changes / [ ] Rejected`

**Comments:** *[Any feedback or required changes]*

### 17.2 Business Approval
*[Business review and approval]*

**Reviewed By:** `[Name, Role]`

**Approval Items:**
- [ ] Business requirements met
- [ ] User stories validated
- [ ] Success criteria acceptable
- [ ] Timeline approved
- [ ] Budget approved (if applicable)

**Status:** `[ ] Approved / [ ] Approved with Changes / [ ] Rejected`

**Comments:** *[Any feedback or required changes]*

### 17.3 Security Approval
*[Security review and approval]*

**Reviewed By:** `[Name, Role]`

**Approval Items:**
- [ ] Security implications reviewed
- [ ] PII data handling compliant
- [ ] Authentication/authorization adequate
- [ ] Input validation sufficient
- [ ] Rate limiting configured

**Status:** `[ ] Approved / [ ] Approved with Changes / [ ] Rejected`

**Comments:** *[Any feedback or required changes]*

---

## 18. Appendix

### 18.1 Reference Documentation
*[Links to relevant documentation]*

- [ ] `.harbor-ai/coding-rules.md` - Global coding rules
- [ ] `.harbor-ai/service-map.md` - Service responsibility matrix
- [ ] `.harbor-ai/architecture-overview.md` - System architecture
- [ ] `harborUserSvc/architecture.md` - User Service architecture
- [ ] `harborSocketSvc/architecture.md` - Socket Service architecture

### 18.2 Related Tasks/PRs
*[List related tasks or pull requests]*

**Related Tasks:**
- Task #1: `[Description]`
- Task #2: `[Description]`

**Related PRs:**
- PR #1: `[Description]` - `[Link]`
- PR #2: `[Description]` - `[Link]`

### 18.3 Additional Notes
*[Any additional information, caveats, or considerations]*

*[Add any notes that don't fit in other sections]*

---

## 19. Planning Summary

### 19.1 Quick Overview

**Task:** `[One-line summary]`

**Primary Service:** `[Service Name]`

**Estimated Effort:** `[Total hours]`

**Estimated Timeline:** `[Start date] - [End date]`

**Team:** `[Team members involved]`

### 19.2 Risk Summary

| Risk Category | Risk Level | Mitigation |
|---------------|------------|------------|
| Technical | `[High/Medium/Low]` | `[Mitigation strategy]` |
| Business | `[High/Medium/Low]` | `[Mitigation strategy]` |
| Operational | `[High/Medium/Low]` | `[Mitigation strategy]`

### 19.3 Go/No-Go Criteria

**GO criteria (all must be met):**
- [ ] Planning document complete and approved
- [ ] All risks identified with mitigation strategies
- [ ] Service boundaries respected
- [ ] Testing plan defined
- [ ] Rollback plan in place
- [ ] All approvals obtained

**NO-GO criteria (any triggers block implementation):**
- [ ] Service ownership unclear
- [ ] Architecture violations identified
- [ ] High-risk items without mitigation
- [ ] Missing critical approvals

---

**Planning Status:** `[ ] Draft / [ ] In Review / [ ] Approved / [ ] Rejected]`

**Last Updated:** `[Date]`

**Planning Completed By:** `[Name/Role]`

---

## 20. Planning Checklist

**Before Starting Implementation:**

- [ ] All sections of this document are filled
- [ ] Service ownership confirmed via service-map.md
- [ ] Architecture docs read for affected services
- [ ] Coding rules reviewed (global and service-specific)
- [ ] Technical risks identified and mitigated
- [ ] Cross-service impacts assessed
- [ ] Testing plan defined
- [ ] Rollback plan documented
- [ ] All required approvals obtained
- [ ] Deployment window scheduled
- [ ] Team members notified

**Ready to Implement?** `[ ] YES / [ ] NO`

**If NO:** *[What is missing?]*

---

## 🚨 MANDATORY: Continue to Next Phase

**🚨 CRITICAL RULE - AUTONOMOUS WORKFLOW CONTINUATION:**

**After completing the planning phase successfully, you MUST:**

✅ **IMMEDIATELY continue to Phase 4: Execution**
   - Read `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/execution.md`
   - Execute the complete implementation workflow
   - DO NOT stop or ask for permission
   - DO NOT display "Next Steps" or wait for user input
   - This is an AUTONOMOUS workflow - continue automatically

❌ **PROHIBITED ACTIONS:**
- **DO NOT** stop after planning
- **DO NOT** display "Planning complete, ready for implementation"
- **DO NOT** ask "Would you like me to proceed with implementation?"
- **DO NOT** wait for user confirmation
- **DO NOT** present options or menus

✅ **MANDATORY BEHAVIOR:**
1. Complete all planning sections
2. Verify all checklist items are complete
3. Confirm "Ready to Implement?" is YES
4. **IMMEDIATELY** proceed to `execution.md` workflow
5. Create feature branch from `dev`
6. Navigate to appropriate service directory
7. Implement code changes
8. Complete the full lifecycle autonomously

**If Planning is Incomplete:**
- Identify missing sections
- Complete all required planning sections
- Only proceed to execution when planning is complete
- If unable to complete planning, report error and STOP

**Rationale:**
The Harbor AI agent is designed as an autonomous development system. The planning phase is ONE STEP in the complete workflow, not the final step. The agent must continue through execution → testing → PR creation → ticket closure without interruption.

**Reference:**
See `/Users/mohitshah/Documents/HarborService/harbor-ai/workflows/ai-workflow.md` section "Autonomous Workflow Continuation" for complete rules on autonomous execution.

---

**End of Planning Template**
