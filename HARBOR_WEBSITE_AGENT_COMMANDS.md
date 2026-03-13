# Harbor Website AI Agent - Quick Start Commands

**Version:** 1.0.0
**Last Updated:** 2026-03-10
**Location:** `/Users/mohitshah/Documents/HarborService/harbor-ai/`

---

## 🚀 Start Commands

Use any of these commands to activate the Harbor Website AI Agent:

```
/start-harbor-website-agent
```

```
/start-website-agent
```

```
/start-frontend-agent
```

```
/harbor-website-agent
```

---

## 📋 What Happens When You Start

When you run any of the start commands, the agent will:

1. ✅ Read all agent documentation
2. ✅ Read harborWebsite/ARCHITECTURE.md
3. ✅ Read harborWebsite/RULES.md
4. ✅ Read harborWebsite/package.json
5. ✅ Navigate to harborWebsite directory
6. ✅ Initialize 6-phase workflow
7. ✅ Wait for your task

---

## 🎫 Ticket Filtering Criteria

**IMPORTANT:** The Harbor Website AI Agent only processes tickets that meet **BOTH** criteria:

| Criteria | Value | Description |
|----------|-------|-------------|
| **State** | `Active` | Ticket must be in Active state |
| **Tag** | `frontend` | Ticket must have the "frontend" tag |

### Azure DevOps Query

The agent fetches tickets using this filter:

```sql
SELECT [System.Id], [System.Title], [System.Description]
FROM WorkItems
WHERE [System.TeamProject] = 'Harbor'
  AND [System.State] = 'Active'
  AND [System.Tags] CONTAINS 'frontend'
  AND [System.WorkItemType] IN ('User Story', 'Task')
ORDER BY [Microsoft.VSTS.Common.Priority] ASC
```

### How to Tag Tickets

To assign a task to the Harbor Website AI Agent:

1. **Set State to `Active`**
2. **Add the `frontend` tag** to the ticket
3. **Provide clear requirements** in the description
4. **Include acceptance criteria**

### Example Ticket Setup

```
Title: Add user profile settings page
State: Active
Tags: frontend, settings, user-profile
Type: User Story
Priority: 2

Description:
Create a new settings page at /settings/profile where users can:
- View their profile information
- Edit their name, bio, and location
- Upload a profile picture
- Save changes to the backend API

Acceptance Criteria:
- Page accessible at /settings/profile
- Uses Ant Design Form component
- Validates input before submission
- Shows loading state while saving
- Handles errors gracefully
- Responsive design for mobile
```

### Ticket Assignment Flow

```
┌─────────────────────────────────────────┐
│  Azure DevOps Board                     │
├─────────────────────────────────────────┤
│  Ticket #123                            │
│  ├─ State: Active ✅                    │
│  ├─ Tags: frontend ✅                   │
│  └─ Type: User Story ✅                 │
└─────────────────────────────────────────┘
              ↓
    [Fetched by Website Agent]
              ↓
┌─────────────────────────────────────────┐
│  Harbor Website AI Agent                │
├─────────────────────────────────────────┤
│  ✅ Ticket accepted                     │
│  ✅ Processing starts                   │
│  ✅ 6-phase workflow begins             │
└─────────────────────────────────────────┘
```

### Tags for Different Agents

| Agent | Tag | State |
|-------|-----|-------|
| **Harbor Website AI Agent** | `frontend` | `Active` |
| **Harbor Backend AI Agent** | `backend` | `Active` |
| **Harbor General Agent** | (any tag) | `Active` |

---

## 💡 Example Usage

### Step 1: Start the Agent
```
/start-harbor-website-agent
```

### Step 2: Provide Your Task
```
Create a new notifications settings page at /settings/notifications

Requirements:
- Display notification preferences (email, push, SMS)
- Allow users to toggle each notification type
- Save changes to backend API
- Use Ant Design Form and Switch components
- Follow harborWebsite architecture and rules
- Show loading state while saving
- Handle errors gracefully
```

### Step 3: Agent Executes Automatically

The agent will:
1. **Analyze** the codebase
2. **Generate** implementation plan
3. **Create** the page and components
4. **Validate** with `yarn build`
5. **Create** Git branch from `dev`
6. **Commit** and push changes
7. **Create** Pull Request to `dev`

---

## 🎯 Task Types

The agent handles:

| Task Type | Example Command |
|-----------|-----------------|
| **New Page** | `Create a new user profile page at /profile/view` |
| **New Component** | `Create a reusable UserProfileCard component` |
| **Feature** | `Add search functionality to jobs page with filters` |
| **Bug Fix** | `Fix mobile navigation menu not closing` |
| **API Integration** | `Integrate the job search API endpoint` |
| **State Management** | `Add Redux slice for user preferences` |
| **Styling** | `Update theme colors and button styles` |

---

## 📁 Working Directory

**Target Repository:** `/Users/mohitshah/Documents/HarborService/harborWebsite`

**Base Branch:** `dev`

**Key Documentation:**
- `ARCHITECTURE.md` - Full architecture reference
- `RULES.md` - Development rules and conventions
- `package.json` - Dependencies and scripts

---

## 🔄 6-Phase Workflow

```
Phase 1: Fetch & Analyze
   ├─ Read ARCHITECTURE.md
   ├─ Read RULES.md
   ├─ Analyze project structure
   └─ Understand task requirements
         ↓
Phase 2: Planning
   ├─ Generate implementation plan
   ├─ Identify files to create/modify
   ├─ Plan component structure
   ├─ Plan API integration
   └─ Verify compliance with rules
         ↓
Phase 3: Execution
   ├─ Create/modify components
   ├─ Create/modify pages
   ├─ Implement API calls
   ├─ Apply styles
   └─ Handle state
         ↓
Phase 4: Testing
   ├─ Navigate to harborWebsite
   ├─ Run yarn build
   ├─ Check TypeScript errors
   ├─ Check ESLint errors
   └─ Validate build success
         ↓
Phase 5: Git Operations
   ├─ Create branch from dev
   ├─ Stage changes
   ├─ Commit with descriptive message
   └─ Push to remote
         ↓
Phase 6: Pull Request
   ├─ Generate PR title
   ├─ Generate PR description
   ├─ Reference ticket
   └─ Target dev branch
```

---

## ✅ Quality Checks

Before committing, the agent verifies:

- ✅ Build succeeds (`yarn build`)
- ✅ No TypeScript errors
- ✅ No critical ESLint errors
- ✅ Code follows ARCHITECTURE.md guidelines
- ✅ Code follows RULES.md guidelines
- ✅ No secrets committed
- ✅ Changes tested manually if needed

---

## 🛑 Agent Control Commands

| Command | Action |
|---------|--------|
| `/start-harbor-website-agent` | Start frontend agent |
| `/start-website-agent` | Start frontend agent (short) |
| `/start-frontend-agent` | Start frontend agent (alt) |
| `/start-harbor-backend-agent` | Start backend agent |
| `/stop-agent` | Stop current agent session |
| `/agent-status` | Check current agent status |

---

## 🎨 Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Next.js | 14.2.16 (App Router) |
| **UI Library** | React | 18 |
| **Language** | TypeScript | 5 |
| **State Management** | Redux Toolkit | Latest |
| **Styling** | Ant Design + styled-components | 5 + 6 |
| **Package Manager** | Yarn | Latest |

---

## 📝 Best Practices

### 1. Provide Clear Requirements

✅ **Good Example:**
```
Create a new settings page at /settings/privacy

Requirements:
- Display privacy settings form
- Fields: profile visibility, data sharing preferences
- Save to backend API: PUT /user/privacy
- Use Ant Design Form component
- Show success message after saving
- Handle errors with user-friendly message
```

❌ **Bad Example:**
```
Add privacy settings
```

### 2. Be Specific About Routes

✅ **Good:**
```
Create page at /settings/notifications
```

❌ **Bad:**
```
Create notifications page
```

### 3. Mention Components If Known

✅ **Good:**
```
Use Ant Design Form, Switch, and Button components
```

❌ **Bad:**
```
Make it look nice
```

### 4. Specify API Endpoints

✅ **Good:**
```
Integrate with GET /api/user/profile and POST /api/user/profile/update
```

❌ **Bad:**
```
Connect to backend
```

---

## 🎯 Common Task Examples

### Example 1: Create New Page
```
/start-harbor-website-agent

Create a new job details page at /job-details/[jobId]

Requirements:
- Display job title, description, requirements
- Show company information
- Add "Apply" button
- Fetch data from backend API: GET /job-svc/jobs/{jobId}
- Handle loading and error states
- Use Ant Design Card, Typography, Button components
```

### Example 2: Create Reusable Component
```
/start-harbor-website-agent

Create a reusable JobCard component

Props:
- title: string
- company: string
- location: string
- salary: string
- onClick: function

Requirements:
- Display job information in card format
- Use Ant Design Card component
- Add hover effect with styled-components
- Make clickable with onClick handler
- Add TypeScript interfaces
```

### Example 3: Fix Bug
```
/start-harbor-website-agent

Fix the mobile navigation menu bug

Issue:
- On mobile devices, the navigation menu doesn't close after clicking a link
- User has to manually click the X button to close it

Requirements:
- Menu should auto-close after navigation
- Should work on all mobile devices
- Test on viewport widths < 768px
```

### Example 4: API Integration
```
/start-harbor-website-agent

Integrate the user profile API

Requirements:
- Create a hook useUserProfile that fetches user data
- API endpoint: GET /user-svc/profile
- Use the existing getApiData helper
- Handle loading, error, and success states
- Add TypeScript interfaces for the response
- Cache the data in Redux if appropriate
```

### Example 5: Add Redux State
```
/start-harbor-website-agent

Add Redux state for notification preferences

Requirements:
- Create a new slice: notificationSlice
- State: notifications { email: bool, push: bool, sms: bool }
- Actions: setNotificationPreferences, updateNotification
- Register in app/_store/index.ts
- Decide on persistence (persist this slice)
- Create typed hooks
```

---

## 🔗 Related Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **Agent Definition** | `harbor-ai/agents/harbor-website-agent.md` | Complete agent behavior |
| **Workflow** | `harbor-ai/workflows/frontend-workflow.md` | Detailed 6-phase workflow |
| **Coding Rules** | `harbor-ai/standards/frontend-coding-rules.md` | Coding standards |
| **Repo Context** | `harbor-ai/context/frontend-repo-context.md` | Repository context |
| **Main Guide** | `harbor-ai/README-HARBOR-WEBSITE-AGENT.md` | Complete implementation guide |

---

## 🔄 Backend vs Frontend Agents

| Aspect | Backend Agent | Frontend Agent |
|--------|---------------|----------------|
| **Command** | `/start-harbor-backend-agent` | `/start-harbor-website-agent` |
| **Target** | Microservices (Node.js) | harborWebsite (Next.js) |
| **Tasks** | API endpoints, services, DB | Pages, components, hooks |
| **Validation** | Unit tests, integration tests | `yarn build` |
| **State** | N/A | Redux Toolkit |
| **Styling** | N/A | Ant Design + styled-components |

---

## 📊 Project Structure Reference

```
harbor-ai/
├── agents/
│   └── harbor-website-agent.md          # Agent definition
├── workflows/
│   └── frontend-workflow.md             # 6-phase workflow
├── standards/
│   └── frontend-coding-rules.md         # Coding rules
├── context/
│   └── frontend-repo-context.md         # Repository context
└── HARBOR_WEBSITE_AGENT_COMMANDS.md     # This file

harborWebsite/
├── ARCHITECTURE.md                       # Architecture (read by agent)
├── RULES.md                              # Rules (read by agent)
├── package.json                          # Dependencies (read by agent)
└── app/
    ├── (routes)/                         # Route groups
    │   ├── (public)/                     # Public pages
    │   ├── (protected)/                  # Protected pages
    │   └── (settings)/                   # Settings pages
    ├── _components/                      # Shared components
    ├── _helpers/                         # API helpers
    ├── _hooks/                           # Custom hooks
    └── _store/                           # Redux store
```

---

## 🎓 Tips for Success

### Before Starting
1. ✅ Have clear requirements ready
2. ✅ Know the route path (if creating a page)
3. ✅ Identify API endpoints (if integrating)
4. ✅ Specify components to use (if known)

### During Execution
1. ✅ Review the implementation plan
2. ✅ Provide feedback if something seems wrong
3. ✅ Let the agent complete all phases
4. ✅ Check the generated Pull Request

### After Completion
1. ✅ Review the PR carefully
2. ✅ Test the changes manually
3. ✅ Merge when satisfied
4. ✅ Provide feedback for improvements

---

## 🚦 Workflow Status Indicators

During execution, the agent will show:

| Phase | Indicator | Description |
|-------|-----------|-------------|
| **Phase 1** | 🔍 Analyzing | Reading documentation and codebase |
| **Phase 2** | 📋 Planning | Generating implementation plan |
| **Phase 3** | ⚙️ Executing | Creating/modifying code |
| **Phase 4** | 🧪 Testing | Running build validation |
| **Phase 5** | 📦 Git | Creating branch and committing |
| **Phase 6** | 🔀 PR | Creating Pull Request |

---

## 💾 Agent Memory

The agent builds memory over time:
- Common component patterns
- Reusable API integrations
- Frequent issues and solutions
- Performance optimizations

Memory location: `harbor-ai/memory/harbor-website-agent-memory.md`

---

## 🆘 Troubleshooting

### Build Fails
- Agent will automatically retry
- Fix TypeScript errors
- Fix ESLint errors
- Re-run build until success

### Git Conflicts
- Agent pulls latest dev
- Resolves conflicts carefully
- Tests resolution
- Continues workflow

### API Errors
- Check endpoint URLs
- Verify request/response types
- Check authentication tokens
- Review error handling

---

## 📞 Support

For questions or issues:
1. Check documentation in `harbor-ai/`
2. Review `harborWebsite/ARCHITECTURE.md`
3. Review `harborWebsite/RULES.md`
4. Provide feedback for agent improvements

---

## 🎉 Quick Start

**Just type:** `/start-harbor-website-agent`

**Then describe your task**, and the agent will handle everything from planning to PR creation!

---

**Version:** 1.0.0
**Last Updated:** 2026-03-10
**Status:** ✅ Ready for Use
**Maintained by:** Harbor Development Team
