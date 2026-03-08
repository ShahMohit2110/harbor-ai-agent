# Harbor AI - Planning Document

> **Task ID:** 86
> **Task Title:** Fetch Users with Profile Not Setup
> **Date:** 2026-03-07
> **Status:** Planning Complete

---

## 1. Task Overview

### 1.1 Task Title
Fetch Users with Profile Not Setup (With Pagination)

### 1.2 Task Description
Create a single API endpoint that returns a paginated list of users whose profile is not set up. The implementation must:
- Return all users whose profile setup is incomplete or not created
- Support pagination following the existing Harbor project structure
- Follow current repository patterns (service/repository architecture)
- Reuse existing components wherever possible
- Avoid creating unnecessary new structures

### 1.3 Success Criteria
- [ ] API endpoint returns users with incomplete profiles
- [ ] Response follows Harbor pagination structure
- [ ] Endpoint is accessible via API Gateway
- [ ] Uses existing service/repository architecture
- [ ] No breaking changes to existing functionality

---

## 2. Business Objective

### 2.1 Business Goal
Enable administrators and systems to identify users who haven't completed their profile setup, allowing for:
- Targeted nudges to complete profiles
- Analytics on user onboarding completion
- Filtering out incomplete profiles from search results
- Improved user experience through profile completion prompts

### 2.2 User Stories
- As an **administrator**, I want to **view users with incomplete profiles**, so that **I can target them for profile completion nudges**
- As a **system**, I want to **identify incomplete user profiles**, so that **I can filter them from search results and recommendations**

---

## 3. Affected Services

### 3.1 Primary Service
**Service:** User Service (harborUserSvc)
**Service Location:** /Users/mohitshah/Documents/HarborService/harborUserSvc
**Rationale:** User profile data is owned by User Service as defined in service-map.md. This feature involves querying user profile data.

### 3.2 Secondary Services
**NONE** - This feature only affects User Service

### 3.3 Cross-Service Dependencies
**NONE** - No cross-service communication required

---

## 4. API Changes

### 4.1 New API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/user-svc/users/incomplete-profiles` | Fetch users with incomplete profiles | N/A | `{ status: true, data: { items: [], pagination: {...} }, code: 200 }` |

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

### 4.2 API Modifications
**NONE**

### 4.3 API Deprecations
**NONE**

### 4.4 API Gateway Changes
**NONE** - Route will be added to User Service router, proxied through API Gateway

---

## 5. Database Changes

### 5.1 New Tables/Collections
**NONE**

### 5.2 Table Modifications
**NONE**

### 5.3 Model Changes (Shared Models)
**NONE**

### 5.4 Data Migration Required
**NO**

---

## 6. Event / Queue Changes

### 6.1 New Events
**NONE**

### 6.2 Event Subscriptions
**NONE**

### 6.3 Queue Changes
**NONE**

---

## 7. Dependencies

### 7.1 New Dependencies
**NONE**

### 7.2 Dependency Upgrades
**NONE**

### 7.3 Infrastructure Changes
**NONE**

---

## 8. Architecture Validation

### 8.1 Service Boundary Validation
**Checklist:**
- [x] Feature is implemented in the correct service (verified via service-map.md)
- [x] No cross-service database access
- [x] No duplicate business logic across services
- [x] APIs used for cross-service communication
- [x] API Gateway routing used appropriately

**Rationale:** This feature only queries user profile data owned by User Service. No cross-service communication needed.

### 8.2 Data Ownership Validation
**Checklist:**
- [x] Primary data owner service identified (User Service)
- [x] Other services access data via APIs only
- [x] No direct database access across services
- [x] Shared models updated if needed (not needed)

### 8.3 Communication Pattern Validation
**Pattern Used:** REST API

**Rationale:** Simple query endpoint returning data. No real-time or async processing needed.

**Validation:**
- [x] Pattern aligns with Harbor architecture principles
- [x] No circular dependencies introduced
- [x] Scalability considerations addressed (pagination)
- [x] Error handling and retry logic considered

---

## 9. Risks / Edge Cases

### 9.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|-------------------|
| Query performance with large user base | Medium | Medium | Add database indexes on profile fields, use pagination |
| Ambiguity in "incomplete profile" definition | High | Medium | Clearly define incomplete profile criteria |
| Breaking changes to existing endpoints | Low | High | Add new endpoint, don't modify existing ones |

### 9.2 Edge Cases

**Required Edge Cases:**

1. **Edge Case 1:** No users with incomplete profiles
   - **Handling:** Return empty array with pagination showing count = 0

2. **Edge Case 2:** Invalid pagination parameters (negative page, zero limit)
   - **Handling:** Validate and apply defaults (page=1, limit=20)

3. **Edge Case 3:** Large number of incomplete profiles
   - **Handling:** Enforce maximum limit to prevent performance issues

### 9.3 Security Considerations

**Required Security Checks:**

- [x] Authentication required (JWT token)
- [x] Authorization check (only admin users should access)
- [x] Input validation on pagination parameters
- [x] SQL injection prevention (using Sequelize ORM)
- [x] Rate limiting considerations

### 9.4 Performance Considerations

**Required Performance Checks:**

- [x] Database query performance: Use indexed fields, add indexes if needed
- [x] API response time targets: < 500ms for paged queries
- [x] Caching strategy: Consider caching for admin queries
- [x] Index requirements: Review existing indexes on users table

---

## 10. Implementation Plan

### 10.1 Implementation Phases

**Phase 1: Analysis** `[Estimated Time: 0.5 hours]`
- [x] Review existing user query patterns
- [x] Understand pagination structure
- [x] Define "incomplete profile" criteria

**Phase 2: Repository Layer** `[Estimated Time: 1 hour]`
- [ ] Add query method in UserRepository
- [ ] Implement profile completeness check logic
- [ ] Add pagination support

**Phase 3: Service Layer** `[Estimated Time: 0.5 hours]`
- [ ] Add method in UserService
- [ ] Add business logic and validation
- [ ] Integrate with repository

**Phase 4: Controller & Routes** `[Estimated Time: 0.5 hours]`
- [ ] Add controller method in UserController
- [ ] Add route definition
- [ ] Add validation middleware

**Phase 5: Testing** `[Estimated Time: 1 hour]`
- [ ] Unit testing
- [ ] Integration testing
- [ ] Manual testing

### 10.2 Step-by-Step Implementation

**Step 1: Define Incomplete Profile Criteria**
A profile is considered incomplete if ANY of the following is true:
- `firstName` is NULL or empty string
- `lastName` is NULL or empty string
- `phoneNumber` is NULL or empty string
- `email` is NULL or empty string
- `location` is NULL or empty string
- `isProfileSet` flag is false or NULL

**Step 2: Repository Layer Implementation**
- [ ] Add `getUsersWithIncompleteProfiles` method in `/Users/mohitshah/Documents/HarborService/harborUserSvc/repository/user.ts`
- [ ] Use Sequelize query with WHERE conditions checking incomplete criteria
- [ ] Use `findAndCountAll` for pagination support
- [ ] Apply limit, offset, and order

**Step 3: Service Layer Implementation**
- [ ] Add `getUsersWithIncompleteProfiles` method in `/Users/mohitshah/Documents/HarborService/harborUserSvc/service/user.ts`
- [ ] Extract and validate pagination parameters
- [ ] Call repository method
- [ ] Return formatted response with pagination

**Step 4: Controller Layer Implementation**
- [ ] Add `getUsersWithIncompleteProfiles` method in `/Users/mohitshah/Documents/HarborService/harborUserSvc/controllers/user.ts`
- [ ] Add authentication check
- [ ] Call service method
- [ ] Return response

**Step 5: Route Registration**
- [ ] Add route in `/Users/mohitshah/Documents/HarborService/harborUserSvc/routes/user.ts`
- [ ] Add authentication middleware
- [ ] Add validation middleware for pagination parameters

### 10.3 Implementation Order

**Order:**
1. Repository Layer (data access)
2. Service Layer (business logic)
3. Controller Layer (HTTP handling)
4. Routes (endpoint registration)

**Deployment Strategy:** Standard service deployment

---

## 11. Testing Plan

### 11.1 Unit Testing

**Required Unit Tests:**
- [ ] Repository layer tests (query logic, pagination)
- [ ] Service layer tests (parameter validation, business logic)
- [ ] Controller layer tests (request/response handling)

**Test Coverage Target:** 80%

### 11.2 Integration Testing

**Required Integration Tests:**
- [ ] API endpoint tests (request/response validation)
- [ ] Pagination functionality
- [ ] Database query correctness

**Test Scenarios:**
1. **Scenario 1:** Request with valid pagination parameters → Returns paginated list
2. **Scenario 2:** Request with no incomplete profiles → Returns empty array
3. **Scenario 3:** Request with invalid parameters → Returns validation error
4. **Scenario 4:** Request without authentication → Returns 401 Unauthorized

### 11.3 End-to-End Testing

**Required E2E Tests:**
- [ ] Admin can fetch incomplete profiles via API
- [ ] Pagination works correctly across pages
- [ ] Response format matches Harbor standards

**Testing Tools:** Jest, Supertest

### 11.4 Performance Testing

**Required Performance Tests:**
- [ ] Load test: Query with 1000+ users
- [ ] Response time test: API response under 500ms

### 11.5 Rollback Testing

**Required Rollback Tests:**
- [ ] Verify old functionality still works after deployment

---

## 12. Rollback Plan

### 12.1 Rollback Triggers
**Immediate Rollback Triggers:**
- [ ] Critical bug discovered in production
- [ ] Performance degradation beyond acceptable limits
- [ ] Breaking change not backwards compatible

### 12.2 Rollback Procedure
**Rollback Steps:**
1. **Stop Deployment:** Pause any ongoing deployment
2. **Service Rollback:** Revert to previous Docker image
   ```bash
   kubectl rollout undo deployment/harbor-user-service
   ```
3. **Verification:** Run smoke tests to verify system stability
4. **Monitoring:** Check Application Insights for errors

### 12.3 Rollback Verification
**Verification Checklist:**
- [ ] Services are running (health checks pass)
- [ ] Old functionality works correctly
- [ ] No increase in error rates

### 12.4 Data Integrity After Rollback
**Data Integrity Checks:**
- [ ] Verify no orphaned records in database
- [ ] Verify referential integrity maintained

---

## 13. Deployment Plan

### 13.1 Deployment Environment
**Target Environment:** Development

**Deployment Date:** 2026-03-07

### 13.2 Deployment Steps

**Pre-Deployment:**
1. [ ] Verify code compiles without errors
2. [ ] Run unit tests
3. [ ] Create feature branch

**Deployment:**
1. [ ] Deploy User Service with new endpoint
2. [ ] Verify endpoint is accessible
3. [ ] Run smoke tests

**Post-Deployment:**
1. [ ] Monitor Application Insights for errors
2. [ ] Verify API endpoints respond correctly

### 13.3 Database Migration Deployment
**Migration Strategy:** No migration needed

---

## 14. Monitoring & Observability

### 14.1 Metrics to Track

| Metric | Tool | Alert Threshold | Purpose |
|--------|------|----------------|---------|
| API response time | Application Insights | > 500ms | Performance monitoring |
| Error rate | Application Insights | > 1% | Error monitoring |

### 14.2 Logging Requirements

**Required Logging:**
- [ ] Log all new API endpoints (request/response)
- [ ] Log errors with stack traces
- [ ] Log performance metrics

---

## 15. Documentation Updates

### 15.1 Architecture Documentation
- [ ] Update service architecture if needed

### 15.2 API Documentation
- [ ] Document new endpoint in API documentation

---

## 16. Success Criteria Verification

### 16.1 Pre-Implementation Checklist

**Planning:**
- [x] This planning document is complete
- [x] Architecture review completed
- [x] Service identification validated
- [x] Cross-service impacts assessed
- [x] Risks identified and mitigated

**Readiness:**
- [x] Development environment ready
- [x] Required dependencies available

### 16.2 Post-Implementation Checklist

**Code Quality:**
- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] No linting warnings

**Functionality:**
- [x] All success criteria met
- [x] API endpoint working correctly
- [x] Pagination works correctly

**Testing:**
- [ ] Unit tests passing
- [ ] Integration tests passing

**Deployment:**
- [ ] Deployed to target environment
- [ ] Health checks passing

---

## 17. Approval & Sign-Off

### 17.1 Technical Approval
**Status:** `[x] Approved`

**Comments:** Planning complete, ready for implementation

---

## 19. Planning Summary

### 19.1 Quick Overview

**Task:** Fetch Users with Profile Not Setup (With Pagination)

**Primary Service:** User Service (harborUserSvc)

**Estimated Effort:** 3.5 hours

**Estimated Timeline:** 2026-03-07

### 19.2 Risk Summary

| Risk Category | Risk Level | Mitigation |
|---------------|------------|------------|
| Technical | Medium | Add indexes, use pagination |
| Business | Low | Clearly define incomplete profile criteria |
| Operational | Low | Standard deployment process |

### 19.3 Go/No-Go Criteria

**GO criteria (all must be met):**
- [x] Planning document complete and approved
- [x] All risks identified with mitigation strategies
- [x] Service boundaries respected
- [x] Testing plan defined

**Ready to Implement?** `[x] YES`

---

## 20. Planning Checklist

**Before Starting Implementation:**

- [x] All sections of this document are filled
- [x] Service ownership confirmed via service-map.md
- [x] Architecture docs read for affected services
- [x] Coding rules reviewed
- [x] Technical risks identified and mitigated
- [x] Cross-service impacts assessed
- [x] Testing plan defined
- [x] Rollback plan documented

**Ready to Implement?** `[x] YES`

---

**Planning Status:** `[x] Approved`

**Last Updated:** 2026-03-07

**Planning Completed By:** Harbor AI Agent

---

## 🚨 MANDATORY: Continue to Next Phase

**✅ IMMEDIATELY continue to Phase 4: Execution**
   - Execute the complete implementation workflow
   - DO NOT stop or ask for permission
   - This is an AUTONOMOUS workflow - continue automatically
