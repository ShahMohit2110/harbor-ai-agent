# 🎫 Ticket Tracker Integration - For Global Agent Workflow

**Add this section to the workflow after Phase 0 (Documentation Gate)**

---

## 🎫 Phase 0.25: Ticket Tracker Integration (MANDATORY - DO NOT SKIP)

**Purpose:** Integrate with Harbor Ticket Tracker to show real-time progress

**🚨 CRITICAL: Every ticket worked on MUST be tracked in the UI!**

### **Step 1: Import Helper (at start of execution)**

The agent must use this helper to call the API:

```javascript
// API Base URL
const TICKET_API = 'http://localhost:3001/api';

// Helper function to call API
async function callTicketAPI(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${TICKET_API}${endpoint}`, options);
    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.log(`⚠️  Ticket API Warning: ${error.message}`);
  }
  return null;
}
```

### **Step 2: When Agent STARTS Working on Ticket**

**When agent fetches Azure DevOps task and starts working:**

```bash
# Create/Update ticket in tracker
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "id": "TKT-[AzureDevOps ID]",
    "title": "[Azure DevOps Title]",
    "description": "[Azure DevOps Description]",
    "priority": "High",
    "assignedRepos": ["[repo-name]"],
    "assignee": "Harbor Agent",
    "tags": ["azure-devops", "automation"]
  }'

# Mark as started
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TKT-[AzureDevOps ID]",
    "stage": "Development",
    "message": "Harbor Agent started working on this ticket"
  }'
```

**Expected Output:**
```
✅ Ticket TKT-XXXXX created in tracker
✅ Tracker notified: Agent started work
```

### **Step 3: As Agent Makes Progress**

**After completing each phase of work:**

```bash
# Update progress (e.g., 25% complete)
curl -X PUT http://localhost:3001/api/tickets/TKT-[ID]/progress \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 25,
    "stage": "Development",
    "message": "Completed Phase 1: Analysis"
  }'
```

**Progress Milestones:**
- 10%: Planning complete
- 25%: Analysis complete
- 50%: Development started
- 75%: Testing started
- 90%: Ready for deployment
- 100%: Complete

### **Step 4: When Agent COMPLETES Ticket**

```bash
# Mark ticket as completed
curl -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TKT-[ID]",
    "message": "Harbor Agent completed successfully"
  }'
```

**Expected Output:**
```
✅ Ticket TKT-XXXXX marked as completed (100%)
✅ Activity logged: "Harbor Agent completed"
```

---

## 🎯 **Implementation in Workflow**

### **When Agent Executes "start harbor-ai":**

1. **Phase 0:** Documentation Gate (existing)
2. **Phase 0.25:** Ticket Tracker Integration ⬅️ **ADD THIS**
3. **Phase 0.5:** Pre-Execution Intelligence Analysis (existing)
4. **Phase 1-12:** Task Execution (existing)

### **At Each Phase:**

**Before starting work:**
```bash
# Create ticket in tracker
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d "{...ticket data...}"
```

**After each phase:**
```bash
# Update progress
curl -X PUT http://localhost:3001/api/tickets/{id}/progress \
  -H "Content-Type: application/json" \
  -d '{"progress": XX, "message": "Completed Phase Y"}'
```

**When complete:**
```bash
# Mark complete
curl -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "...", "message": "Completed"}'
```

---

## ✅ **Verification**

**Agent MUST output:**

```
✅ Ticket Tracker: Ticket TKT-XXXXX created
✅ Ticket Tracker: Progress updated to 25%
✅ Ticket Tracker: Progress updated to 50%
✅ Ticket Tracker: Ticket completed (100%)
```

**User should see ticket appear in UI:** http://localhost:5173

---

## 🚨 **CRITICAL RULES**

1. ✅ **EVERY ticket worked on MUST be tracked**
2. ✅ **API calls MUST happen at start, during, and end**
3. ✅ **Progress MUST be updated after each phase**
4. ✅ **Ticket MUST be marked completed when done**
5. ❌ **DO NOT skip ticket tracking**
6. ❌ **DO NOT work on tickets without tracking**

---

## 📊 **Example Flow**

```
Agent: "start harbor-ai"
       ↓
Fetch Azure DevOps tasks
       ↓
Select highest priority task: #12345
       ↓
Create ticket in tracker: TKT-12345 ✅
       ↓
Start working (Phase 1-12)
       ↓
Update progress: 25% ✅
Update progress: 50% ✅
Update progress: 75% ✅
       ↓
Complete ticket: 100% ✅
       ↓
UI shows completed ticket! 🎉
```

---

**This integration is MANDATORY for all future "start harbor-ai" executions!**
