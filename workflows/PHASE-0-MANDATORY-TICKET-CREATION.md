# 🚨 PHASE 0.0: MANDATORY TICKET CREATION (NON-SKIPPABLE)

**🚨 THIS IS THE ABSOLUTE FIRST STEP - CANNOT BE SKIPPED - ZERO EXCEPTIONS**

**Reference:** `CRITICAL-AUTOMATIC-TICKET-CREATION.md`

---

## 🔴 MANDATORY RULE (NON-NEGOTIABLE)

**BEFORE DOING ANYTHING ELSE, AGENT MUST:**

1. ✅ Fetch Azure DevOps task
2. ✅ **IMMEDIATELY CREATE TICKET IN TRACKER** (using bash command)
3. ✅ **IMMEDIATELY START TICKET** (using bash command)
4. ✅ Verify ticket exists in tracker
5. ✅ ONLY THEN proceed to Phase 0 (Documentation Gate)

**🚨 IF THIS STEP IS SKIPPED: CRITICAL FAILURE**

---

## 🎯 EXECUTION STEPS (MANDATORY)

### **Step 1: Fetch Azure DevOps Task**
```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai
node .azure-fetch-query.js
```

### **Step 2: EXTRACT TASK INFORMATION**

From the output, extract:
- `AZURE_DEVOPS_ID` (the task ID)
- `AZURE_DEVOPS_TITLE` (the task title)
- `AZURE_DEVOPS_DESCRIPTION` (the task description)
- `SELECTED_SERVICE` (the service to work on)

### **Step 3: CREATE TICKET IN TRACKER (MANDATORY - NON-SKIPPABLE)**

**🚨 SIMPLIFIED ONE-LINE COMMAND:**

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
./mandatory-ticket-creation.sh "${AZURE_DEVOPS_ID}" "${AZURE_DEVOPS_TITLE}" "${AZURE_DEVOPS_DESCRIPTION}" "${SELECTED_SERVICE}"
```

**This single command will:**
1. Create ticket data JSON
2. Create ticket in tracker
3. Start ticket in tracker
4. Verify ticket exists
5. Confirm success or fail

**Expected Output:**
```
🎯 MANDATORY TICKET CREATION - PHASE 0.0
======================================
📋 Task Information:
  ID: 12345
  Title: Implement feature
  Service: harborUserSvc

📝 Step 1: Creating ticket data...
✅ Ticket data created: /tmp/ticket-data.json

🎫 Step 2: Creating ticket in tracker...
✅ TICKET TKT-12345 CREATED SUCCESSFULLY

▶️  Step 4: Starting ticket...
✅ TICKET TKT-12345 STARTED SUCCESSFULLY

🎉 MANDATORY TICKET CREATION COMPLETE
======================================
✅ Ticket: TKT-12345
✅ Status: In Progress
✅ Stage: Development

🟢 PROCEEDING TO PHASE 0: Documentation Gate
```

### **Step 4: CONFIRMATION CHECKLIST (MANDATORY)**

Before proceeding to Phase 0, verify:

```bash
curl -s http://localhost:3001/api/tickets/TKT-${AZURE_DEVOPS_ID}
```

**Expected Output:**
```json
{
  "success": true,
  "data": {
    "id": "TKT-${AZURE_DEVOPS_ID}",
    "title": "${AZURE_DEVOPS_TITLE}",
    "status": "In Progress",
    "stage": "Development",
    "progress": 0
  }
}
```

**If ticket doesn't exist or command fails:**
- ❌ **TASK IS BLOCKED**
- ❌ **DO NOT PROCEED TO IMPLEMENTATION**
- ❌ **DO NOT PROCEED TO PHASE 0**
- ✅ **Fix ticket creation**
- ✅ **Only then proceed**

---

## 🚨 VERIFICATION (MANDATORY)

**Agent MUST execute this command and verify output:**

```bash
curl -s http://localhost:3001/api/tickets | grep "TKT-${AZURE_DEVOPS_ID}"
```

**Expected Output:**
```json
{
  "id": "TKT-${AZURE_DEVOPS_ID}",
  "title": "${AZURE_DEVOPS_TITLE}",
  "status": "In Progress",
  "stage": "Development",
  "progress": 0
}
```

**If output is empty or ticket doesn't exist:**
- ❌ **TASK IS BLOCKED**
- ❌ **DO NOT PROCEED TO IMPLEMENTATION**
- ❌ **DO NOT PROCEED TO PHASE 0**
- ✅ **Create ticket first**
- ✅ **Only then proceed**

---

## 🚨 ANTI-PATTERN PREVENTION

**What happens if this step is skipped:**
- ❌ Agent completes work but no ticket in tracker
- ❌ User sees nothing in Ticket Tracker UI
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
2. **PHASE 0.0: MANDATORY TICKET CREATION** ← NEW! NON-SKIPPABLE!
   - Fetch Azure DevOps task
   - Extract task information
   - Create ticket in tracker ← MANDATORY
   - Start ticket in tracker ← MANDATORY
   - Verify ticket exists ← MANDATORY
   ↓
3. PHASE 0: Documentation Gate
   - Validate documentation
   ↓
4. PHASE 0.5: Pre-Execution Intelligence Analysis
   ↓
5. PHASE 6: Implementation (with progress updates)
   ↓
6. PHASE 10: Completion
   - Complete ticket
```

---

## 🎯 EXAMPLE EXECUTION

**When user says "start harbor-ai":**

```bash
# Step 1: Fetch task
cd /Users/mohitshah/Documents/HarborService/harbor-ai
node .azure-fetch-query.js

# Output:
# 🆔 ID: 12345
# 📌 Title: Implement job recurring schedule feature
# 📦 Type: User Story

# Step 2: Set variables
AZURE_DEVOPS_ID=12345
AZURE_DEVOPS_TITLE="Implement job recurring schedule feature"
AZURE_DEVOPS_DESCRIPTION="As an employer, I want to schedule recurring jobs..."
SELECTED_SERVICE="harborJobSvc"

# Step 3: Create ticket (MANDATORY)
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
cat > /tmp/ticket-data.json << EOF
{
  "id": "TKT-12345",
  "title": "Implement job recurring schedule feature",
  "description": "As an employer, I want to schedule recurring jobs...",
  "priority": "High",
  "assignedRepos": ["harborJobSvc"],
  "assignee": "Harbor Agent",
  "tags": ["azure-devops", "automation"]
}
EOF

node ticketTrackerIntegration.js create /tmp/ticket-data.json
# Output: ✅ Ticket TKT-12345 created successfully

# Step 4: Start ticket (MANDATORY)
node ticketTrackerIntegration.js start "TKT-12345" "Development" "Starting implementation"
# Output: ✅ Ticket TKT-12345 started successfully

# Step 5: Verify (MANDATORY)
curl -s http://localhost:3001/api/tickets/TKT-12345
# Output: {"success":true,"data":{"id":"TKT-12345","status":"In Progress",...}}

# Step 6: Confirm and proceed
echo "✅ TICKET TKT-12345 CREATED AND STARTED"
echo "🟢 PROCEEDING TO PHASE 0: Documentation Gate"
```

---

## 🔴 FINAL REMINDER

**🚨 THIS STEP CANNOT BE SKIPPED - ZERO EXCEPTIONS**

**Before ANY implementation work:**
1. ✅ Fetch Azure DevOps task
2. ✅ **Create ticket in tracker** ← MANDATORY
3. ✅ **Start ticket in tracker** ← MANDATORY
4. ✅ **Verify ticket exists** ← MANDATORY
5. ✅ Only then proceed to Phase 0

**If agent skips this step:**
- ❌ **CRITICAL FAILURE**
- ❌ **Workflow execution is invalid**
- ❌ **Must restart and include this step**

---

**Last Updated:** 2026-03-28
**Version:** 1.0.0
**Status:** MANDATORY - NON-SKIPPABLE
