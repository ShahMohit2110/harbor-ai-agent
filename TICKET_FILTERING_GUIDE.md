# Harbor Website AI Agent - Ticket Filtering Guide

**Version:** 1.0.0
**Last Updated:** 2026-03-10

---

## 🎫 Ticket Filtering Criteria

The **Harbor Website AI Agent** will **ONLY** process tickets that meet **BOTH** of these criteria:

| # | Criteria | Required Value | Description |
|---|----------|----------------|-------------|
| 1️⃣ | **State** | `Active` | Ticket must be in Active state |
| 2️⃣ | **Tag** | `frontend` | Ticket must have the "frontend" tag |

---

## ✅ Valid Ticket Example

```
┌─────────────────────────────────────────────┐
│  Azure DevOps Ticket                        │
├─────────────────────────────────────────────┤
│  ID: 123                                    │
│  Title: Add user profile settings page      │
│  State: Active ✅                            │
│  Tags: frontend, settings, user-profile ✅   │
│  Type: User Story                            │
│  Priority: 2                                │
│  Assigned To: Harbor Website AI Agent       │
└─────────────────────────────────────────────┘
```

**This ticket WILL be processed by the Harbor Website AI Agent** ✅

---

## ❌ Invalid Ticket Examples

### Example 1: Wrong State
```
┌─────────────────────────────────────────────┐
│  ID: 124                                    │
│  Title: Fix navigation bug                  │
│  State: New ❌ (Must be Active)              │
│  Tags: frontend, bug ✅                     │
└─────────────────────────────────────────────┘
```
**Result:** Will be **SKIPPED** (State is not Active)

### Example 2: Missing Frontend Tag
```
┌─────────────────────────────────────────────┐
│  ID: 125                                    │
│  Title: Update API endpoint                 │
│  State: Active ✅                            │
│  Tags: backend, api ❌ (Missing frontend)    │
└─────────────────────────────────────────────┘
```
**Result:** Will be **SKIPPED** (Missing `frontend` tag)

### Example 3: Both Criteria Missing
```
┌─────────────────────────────────────────────┐
│  ID: 126                                    │
│  Title: Database migration                  │
│  State: Closed ❌                            │
│  Tags: database, migration ❌                │
└─────────────────────────────────────────────┘
```
**Result:** Will be **SKIPPED** (Neither criteria met)

---

## 🔍 Azure DevOps Query

The agent uses this query to fetch tickets:

```sql
SELECT [System.Id], [System.Title], [System.Description],
       [System.Tags], [System.State], [System.WorkItemType],
       [Microsoft.VSTS.Common.Priority]
FROM WorkItems
WHERE [System.TeamProject] = 'Harbor'
  AND [System.State] = 'Active'
  AND [System.Tags] CONTAINS 'frontend'
  AND [System.WorkItemType] IN ('User Story', 'Task')
ORDER BY [Microsoft.VSTS.Common.Priority] ASC
```

---

## 📝 How to Assign Tasks to the Website Agent

### Step 1: Create or Edit Ticket

In Azure DevOps, create or edit a work item.

### Step 2: Set State to Active

```
State: Active
```

### Step 3: Add Frontend Tag

Add the `frontend` tag to the ticket:
```
Tags: frontend
```

You can add additional tags:
```
Tags: frontend, settings, user-profile, high-priority
```

**Important:** The `frontend` tag **MUST** be present!

### Step 4: Provide Clear Requirements

Fill in the description with:
- **Title:** Clear and descriptive
- **Description:** Detailed requirements
- **Acceptance Criteria:** Specific conditions for completion
- **Priority:** 1 (highest) to 4 (lowest)

### Example Ticket

```
Title: Add user profile settings page

Description:
Create a new settings page at /settings/profile where users can view and edit
their profile information. The page should display current user data and allow
edits to name, bio, and location. Users should also be able to upload a new
profile picture.

Acceptance Criteria:
✓ Page accessible at /settings/profile
✓ Displays current user information
✓ Form to edit name, bio, and location
✓ Profile picture upload functionality
✓ Save changes to backend API (PUT /user/profile)
✓ Loading state while saving
✓ Success message after save
✓ Error handling with user-friendly messages
✓ Responsive design for mobile devices
✓ Uses Ant Design Form component

State: Active
Tags: frontend, settings, user-profile
Type: User Story
Priority: 2
```

---

## 🔄 Agent Comparison

Different agents use different tags:

| Agent | Tag Required | State Required |
|-------|--------------|----------------|
| **Harbor Website AI Agent** | `frontend` | `Active` |
| **Harbor Backend AI Agent** | `backend` | `Active` |
| **Harbor General Agent** | Any tag | `Active` |

---

## 📊 Ticket Flow Diagram

```
┌──────────────────────────────────────────────────────┐
│             Azure DevOps Board                        │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │Ticket A │  │Ticket B │  │Ticket C │  │Ticket D │ │
│  │State:   │  │State:   │  │State:   │  │State:   │ │
│  │Active ✅│  │Active ✅│  │New ❌   │  │Active ✅│ │
│  │Tags:    │  │Tags:    │  │Tags:    │  │Tags:    │ │
│  │frontend │  │backend  │  │frontend │  │(empty)  │ │
│  │✅       │  │         │  │✅       │  │❌       │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘ │
│       │            │            │            │       │
│       │            │            │            │       │
└───────┼────────────┼────────────┼────────────┼───────┘
        │            │            │            │
        ▼            ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
   │Website  │  │Backend  │  │SKIPPED  │  │SKIPPED  │
   │Agent    │  │Agent    │  │(Wrong   │  │(No tag) │
   │          │  │          │  │State)   │  │          │
   │PROCESSES│  │PROCESSES│  │         │  │         │
   │Ticket A │  │Ticket B │  │         │  │         │
   └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

---

## 🎯 Best Practices

### ✅ DO

1. **Always add the `frontend` tag** for frontend tasks
2. **Set state to `Active`** when ready for the agent
3. **Provide clear descriptions** with requirements
4. **Include acceptance criteria** for verification
5. **Set appropriate priority** levels

### ❌ DON'T

1. **Don't forget the `frontend` tag** (ticket will be ignored)
2. **Don't leave state as `New`** (ticket won't be processed)
3. **Don't use vague descriptions** (causes confusion)
4. **Don't skip acceptance criteria** (hard to verify)
5. **Don't mix `frontend` and `backend` tags** (use one or the other)

---

## 🔧 Troubleshooting

### Issue: Agent Not Processing My Ticket

**Check:**
1. ✅ Is the **State = Active**?
2. ✅ Does the ticket have the **`frontend` tag**?
3. ✅ Is the ticket type **User Story** or **Task**?

If all three are correct and the agent still doesn't process it:
- Check Azure DevOps connection
- Verify agent is running
- Check agent logs for errors

### Issue: Agent Processing Wrong Tickets

**Solution:**
- Review the tag on the ticket
- Ensure backend tasks have `backend` tag, not `frontend`
- Update tags accordingly

---

## 📚 Quick Reference

| Situation | Action |
|-----------|--------|
| **Create frontend task** | Add `frontend` tag, set `Active` |
| **Create backend task** | Add `backend` tag, set `Active` |
| **Pause frontend task** | Change state to `New` or `Resolved` |
| **Resume frontend task** | Change state to `Active` |
| **Reassign task** | Remove `frontend` tag, add `backend` tag |

---

## 📞 Support

For questions about ticket filtering:
1. Check this guide
2. Review agent documentation in `harbor-ai/`
3. Contact Harbor Development Team

---

**Remember:** Two requirements for the Harbor Website AI Agent to process a ticket:
1. ✅ **State = Active**
2. ✅ **Tag = frontend**

**Missing either? The ticket will be ignored!** ⚠️

---

**Version:** 1.0.0
**Last Updated:** 2026-03-10
**Maintained by:** Harbor Development Team
