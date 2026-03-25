# Service Creation Rules (CRITICAL)

> **Last Updated:** 2026-03-24
> **Priority:** CRITICAL - MUST FOLLOW
> **Version:** 1.0.0

---

## 🚨 CRITICAL RULE: NO NEW SERVICES UNLESS ABSOLUTELY NECESSARY

**The Problem:**
The AI Agent has been creating NEW services/repositories for features that should be added to EXISTING services.

**Examples of WRONG decisions made:**
- ❌ Task: "Blog creation" → Agent created `blogservice` repository
- ❌ Task: "User comments" → Agent created `commentservice` repository
- ❌ Task: "User ratings" → Agent created `ratingservice` repository

**What SHOULD have happened:**
- ✅ Blog creation → Add to `harborUserSvc` (User Service)
- ✅ User comments → Add to `harborUserSvc` or the relevant service
- ✅ User ratings → Add to `harborUserSvc`

---

## ✅ CORRECT APPROACH: Extend Existing Services

**Rule:** ALL features must be implemented in EXISTING services unless there is a compelling reason not to.

### Feature-to-Service Mapping

| Feature | Correct Service | What NOT to Create |
|---------|----------------|-------------------|
| Blog posts | harborUserSvc | blogservice ❌ |
| Articles/Content | harborUserSvc | articleservice ❌ |
| Comments | harborUserSvc/harborJobSvc | commentservice ❌ |
| Ratings/Reviews | harborUserSvc | ratingservice ❌ |
| User tags/labels | harborUserSvc | tagservice ❌ |
| Bookmarks/Favorites | harborUserSvc | bookmarkservice ❌ |
| Social feeds | harborUserSvc | socialservice ❌ |
| User preferences | harborUserSvc | prefservice ❌ |
| User notifications | harborNotificationSvc | notifservice ❌ |
| Job-related features | harborJobSvc | jobservice ❌ |

---

## 🚦 Decision Tree: New Service vs. Extend Existing

```
┌─────────────────────────────────────┐
│  TASK: Implement Feature X          │
└──────────────┬──────────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Does ANY existing service  │
    │ have related functionality?│
    └──────────────┬─────────────┘
                   │
            ┌──────┴──────┐
            │             │
           YES            NO
            │             │
            ▼             ▼
     ┌─────────────┐   ┌──────────────┐
     │ Add feature │   │ Can it fit   │
     │ to existing │   │ in ANY       │
     │ service     │   │ existing     │
     └─────────────┘   │ service?     │
                      └──────┬───────┘
                             │
                      ┌──────┴──────┐
                      │             │
                     YES            NO
                      │             │
                      ▼             ▼
               ┌────────────┐  ┌──────────┐
               │ Add to     │  │ ESCALATE │
               │ existing   │  │ to human │
               │ service    │  │ team     │
               └────────────┘  └──────────┘
```

---

## 📋 Checklist Before Creating ANY New Service

**Before creating a new service, you MUST be able to answer YES to ALL:**

- [ ] Is this domain completely separate from ALL existing services?
- [ ] Does it require different scaling patterns than existing services?
- [ ] Does it have different data retention requirements?
- [ ] Does it have separate security/compliance needs?
- [ ] Has the architecture team approved this?
- [ ] Can I prove it CANNOT fit in any existing service?

**If ANY answer is NO → DO NOT CREATE. Extend existing service instead.**

---

## 🎯 Examples of Correct Implementation

### Example 1: Blog Feature

**Task:** "Create blog functionality for users"

❌ **WRONG:**
```
1. Create new repo: harborBlogSvc
2. Set up new database
3. Create new API endpoints
4. Configure new service in API Gateway
```

✅ **CORRECT:**
```
1. Add to harborUserSvc:
   - New controller: BlogController
   - New service: BlogService
   - New repository: BlogRepository
   - New database table: blogs (in User DB)
   - New API routes: /api/blogs/*
```

### Example 2: Comments Feature

**Task:** "Add comments to user posts"

❌ **WRONG:**
```
1. Create new repo: harborCommentSvc
2. Set up new infrastructure
```

✅ **CORRECT:**
```
1. Add to harborUserSvc:
   - CommentController
   - CommentService
   - CommentRepository
   - comments table (in User DB)
   - /api/comments/* routes
```

### Example 3: Ratings/Reviews

**Task:** "Add user ratings for jobs"

❌ **WRONG:**
```
1. Create new repo: harborRatingSvc
```

✅ **CORRECT:**
```
1. Add to harborJobSvc (since it's job-related):
   - RatingController
   - RatingService
   - RatingRepository
   - ratings table (in Job DB)
   - /api/jobs/:id/ratings routes
```

---

## 🚫 Forbidden Actions

**The AI Agent MUST NOT:**
- Create new repositories for user-related features
- Create new repositories for content features
- Create new repositories for rating/review features
- Create new repositories without checking existing services first
- Create new repositories because "it seems cleaner"
- Create new repositories without explicit approval

---

## ✅ Required Actions

**The AI Agent MUST:**
1. Check ALL existing services before creating a new one
2. Add features to the most relevant existing service
3. Extend existing database schemas
4. Add new API routes to existing services
5. Escalate to human team if truly new service is needed

---

## 📊 Current Service Inventory

**ALWAYS check if your feature can fit in these services:**

| Service | Purpose | Can Handle |
|---------|---------|------------|
| harborUserSvc | All user-related data | Profiles, blogs, comments, ratings, social features, posts, content |
| harborJobSvc | All job-related data | Jobs, applications, job ratings, job comments |
| harborNotificationSvc | All notifications | Push, email, SMS, in-app notifications |
| harborSocketSvc | Real-time features | WebSocket, chat, live updates |
| harbor-ai | Agent framework | Workflow automation, agent logic |
| harborWebsite | Web UI | All frontend pages and components |

---

## 🎓 Guiding Principle

> "When in doubt, extend an existing service. Only create a new service when you have NO other choice."

**Remember:** Microservices does NOT mean "create a service for every feature." It means services should be independently deployable and have clear boundaries.

**Adding a blog controller to User Service does NOT violate microservices principles.**
**Creating a new BlogService for blog posts DOES violate our architecture.**

---

**End of SERVICE_CREATION_RULES.md**
