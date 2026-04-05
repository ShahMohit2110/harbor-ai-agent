# 🚨 PHASE 0.0: MANDATORY TICKET SELECTION (NON-SKIPPABLE)

**🚨 THIS IS THE ABSOLUTE FIRST STEP - CANNOT BE SKIPPED - ZERO EXCEPTIONS**

**Reference:** `CRITICAL-AUTOMATIC-TICKET-CREATION.md`

---

## 🔴 MANDATORY RULE (NON-NEGOTIABLE)

**BEFORE DOING ANYTHING ELSE, AGENT MUST:**

1. ✅ Fetch pending ticket from **Harbor Ticket Tracker** (local JSON files)
2. ✅ **IMMEDIATELY START TICKET** (using bash command)
3. ✅ Verify ticket exists in tracker
4. ✅ ONLY THEN proceed to Phase 0 (Documentation Gate)

**🚨 IF THIS STEP IS SKIPPED: CRITICAL FAILURE**

---

## 🎯 EXECUTION STEPS (MANDATORY)

### **Step 1: Fetch Pending Ticket from Harbor Ticket Tracker**

**🎯 NEW SOURCE: Harbor Ticket Tracker JSON Files**

```bash
# Read tickets from Harbor Ticket Tracker
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/data

# View all tickets
cat tickets-data.json | jq '.tickets[] | select(.status == "pending" or .status == "In Progress") | {id, title, priority, status, assignee}'
```

**Expected Output:**
```json
{
  "id": "TKT-146",
  "title": "API Requirement: Fetch Jobs Matching User Skills",
  "priority": "High",
  "status": "pending",
  "assignee": "Harbor Agent"
}
```

### **Step 2: SELECT HIGHEST PRIORITY TICKET**

**Automatic Selection Logic:**

```bash
# Get highest priority pending ticket
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0]'
```

**Priority Order:** High > Medium > Low
**Secondary Sort:** Oldest first (by createdAt)

**Expected Output:**
```json
{
  "id": "TKT-146",
  "title": "API Requirement: Fetch Jobs Matching User Skills",
  "description": "...",
  "priority": "High",
  "status": "pending",
  "assignee": "Harbor Agent",
  "stage": "Admin",
  "progress": 0,
  "assignedRepos": [],
  "tags": ["azure-devops", "auto-synced"]
}
```

### **Step 3: EXTRACT TICKET INFORMATION**

From the selected ticket, extract:
- `TICKET_ID` (e.g., "TKT-146")
- `TICKET_TITLE` (the ticket title)
- `TICKET_DESCRIPTION` (the ticket description)
- `TICKET_PRIORITY` (High/Medium/Low)

### **Step 4: START TICKET IN TRACKER (MANDATORY - NON-SKIPPABLE)**

**🚨 SIMPLIFIED ONE-LINE COMMAND:**

```bash
# Start the ticket in Harbor Ticket Tracker
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d "{
    \"ticketId\": \"${TICKET_ID}\",
    \"stage\": \"Analysis\",
    \"message\": \"Harbor AI Agent started working on this ticket\"
  }"
```

**Expected Output:**
```json
{
  "success": true,
  "message": "Ticket started successfully",
  "data": {
    "id": "TKT-146",
    "status": "In Progress",
    "stage": "Analysis",
    "progress": 10
  }
}
```

### **Step 5: CONFIRMATION CHECKLIST (MANDATORY)**

Before proceeding to Phase 0, verify:

```bash
curl -s http://localhost:3001/api/tickets/${TICKET_ID}
```

**Expected Output:**
```json
{
  "success": true,
  "data": {
    "id": "TKT-146",
    "title": "API Requirement: Fetch Jobs Matching User Skills",
    "status": "In Progress",
    "stage": "Analysis",
    "progress": 10
  }
}
```

**If ticket doesn't exist or command fails:**
- ❌ **TASK IS BLOCKED**
- ❌ **DO NOT PROCEED TO IMPLEMENTATION**
- ❌ **DO NOT PROCEED TO PHASE 0**
- ✅ **Fix ticket start**
- ✅ **Only then proceed**

---

## 🚨 VERIFICATION (MANDATORY)

**Agent MUST execute this command and verify output:**

```bash
curl -s http://localhost:3001/api/tickets | jq ".data[] | select(.id == \"${TICKET_ID}\")"
```

**Expected Output:**
```json
{
  "id": "TKT-146",
  "title": "API Requirement: Fetch Jobs Matching User Skills",
  "status": "In Progress",
  "stage": "Analysis",
  "progress": 10
}
```

**If output is empty or ticket doesn't exist:**
- ❌ **TASK IS BLOCKED**
- ❌ **DO NOT PROCEED TO IMPLEMENTATION**
- ❌ **DO NOT PROCEED TO PHASE 0**
- ✅ **Start ticket first**
- ✅ **Only then proceed**

---

## 🚨 ANTI-PATTERN PREVENTION

**What happens if this step is skipped:**
- ❌ Agent completes work but no ticket status update
- ❌ User sees incorrect status in Ticket Tracker UI
- ❌ No progress tracking
- ❌ No file changes visible
- ❌ Complete waste of agent execution

**Why this step is MANDATORY:**
- ✅ User visibility into agent work
- ✅ Real-time progress tracking
- ✅ File changes display
- ✅ Activity timeline
- ✅ Complete audit trail

---

## 📋 COMPLETE WORKFLOW WITH PHASE 0.0

```
1. User says: "start harbor-ai"
   ↓
2. **PHASE 0.0: MANDATORY TICKET SELECTION** ← NON-SKIPPABLE!
   - Read tickets from Harbor Ticket Tracker JSON
   - Filter for pending/In Progress status
   - Select highest priority ticket
   - Start ticket in tracker ← MANDATORY
   - Verify ticket started ← MANDATORY
   ↓
3. PHASE 0: Documentation Gate
   - Validate documentation
   ↓
4. PHASE 0.5: Pre-Execution Intelligence Analysis
   ↓
5. PHASE 1-12: Implementation (with progress updates)
   ↓
6. COMPLETION: Mark ticket as completed
```

---

## 🎯 EXAMPLE EXECUTION

**When user says "start harbor-ai":**

```bash
# Step 1: Read tickets from Harbor Ticket Tracker
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/data

# Step 2: Get highest priority pending ticket
cat tickets-data.json | jq '[.tickets[] | select(.status == "pending" or .status == "In Progress")] | sort_by(.priority, .createdAt) | .[0]'

# Output:
# {
#   "id": "TKT-146",
#   "title": "API Requirement: Fetch Jobs Matching User Skills",
#   "priority": "High",
#   "status": "pending"
# }

# Step 3: Set variables
TICKET_ID="TKT-146"
TICKET_TITLE="API Requirement: Fetch Jobs Matching User Skills"
TICKET_DESCRIPTION="We need to create a new API endpoint..."
TICKET_PRIORITY="High"

# Step 4: Start ticket (MANDATORY)
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d "{
    \"ticketId\": \"${TICKET_ID}\",
    \"stage\": \"Analysis\",
    \"message\": \"Harbor AI Agent started working on this ticket\"
  }"

# Output: ✅ Ticket TKT-146 started successfully

# Step 5: Verify (MANDATORY)
curl -s http://localhost:3001/api/tickets/TKT-146 | jq '.data.status'
# Output: "In Progress"

# Step 6: Confirm and proceed
echo "✅ TICKET ${TICKET_ID} STARTED"
echo "🟢 PROCEEDING TO PHASE 0: Documentation Gate"
```

---

## 🔴 FINAL REMINDER

**🚨 THIS STEP CANNOT BE SKIPPED - ZERO EXCEPTIONS**

**Before ANY implementation work:**
1. ✅ Read tickets from Harbor Ticket Tracker JSON
2. ✅ **Start ticket in tracker** ← MANDATORY
3. ✅ **Verify ticket started** ← MANDATORY
4. ✅ Only then proceed to Phase 0

**If agent skips this step:**
- ❌ **CRITICAL FAILURE**
- ❌ **Workflow execution is invalid**
- ❌ **Must restart and include this step**

---

## 🆕 vs 🔄 COMPARISON

### **OLD FLOW (Azure DevOps):**
```bash
node .azure-fetch-query.js
# → Fetches from Azure DevOps API
# → Creates new ticket in tracker
```

### **NEW FLOW (Harbor Ticket Tracker):**
```bash
cat tickets-data.json | jq '.tickets[] | select(.status == "pending")'
# → Reads from local JSON file
# → Starts existing ticket in tracker
```

**Key Differences:**
- ✅ No external API calls to Azure DevOps
- ✅ No new ticket creation (ticket already exists)
- ✅ Direct read from local JSON file
- ✅ Faster and more reliable
- ✅ Better integration with Ticket Tracker UI

---

**Last Updated:** 2026-04-04
**Version:** 2.0.0 - Harbor Ticket Tracker Integration
**Status:** MANDATORY - NON-SKIPPABLE
