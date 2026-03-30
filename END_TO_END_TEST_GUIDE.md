# 🔄 Harbor Ticket Tracker - Complete End-to-End Test

**Purpose:** Test the entire workflow from Azure DevOps task fetch → Ticket creation → Automatic tracking → Completion

**Time:** 10-15 minutes

---

## 📋 Complete Test Flow

```
1. Fetch Azure DevOps Task
   ↓
2. Create Ticket in Tracker (Phase 0.0)
   ↓
3. Start Automatic Tracker
   ↓
4. Make Commits (Agent Work)
   ↓
5. Watch Auto-Updates
   ↓
6. Complete Ticket
   ↓
7. Verify Entire Flow
```

---

## 🚀 Step-by-Step Guide

### Step 1: Start the Backend (Terminal 1)

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend
npm run dev
```

**Keep this running!** You should see:
```
╔════════════════════════════════════════════════════════════════╗
║                    🚀 HARBOR TICKET API                         ║
╠════════════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:3001                      ║
║  ✅ Ready to integrate Harbor Agent with Ticket Tracker UI    ║
╚════════════════════════════════════════════════════════════════╝
```

---

### Step 2: Fetch Azure DevOps Task (Terminal 2)

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai
node .azure-fetch-query.js
```

**You'll see:**
```
🔍 Fetching Active tasks from Azure DevOps...
📋 Organization: xxx
📦 Project: xxx
✅ Filter: State = 'Active' ONLY

⏳ Step 1: Executing WIQL query...
✅ Found X Active tasks

📋 ACTIVE TASKS (State = Active):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] User Story - #137
📌 Title: Update create-counter-offer API to Allow Offers for Non-Negotiable Jobs
⚡ Priority: 1
👤 Assigned To: Mohit Shah
🔗 URL: https://dev.azure.com/xxx/_workitems/137

🎯 SELECTED TASK (Highest Priority):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 ID: 137
📌 Title: Update create-counter-offer API...
📦 Type: User Story
⚡ Priority: 1
👤 Assigned To: Mohit Shah
```

**Note down these values:**
- `AZURE_DEVOPS_ID=137`
- `AZURE_DEVOPS_TITLE="Update create-counter-offer API..."`
- `AZURE_DEVOPS_DESCRIPTION="Modify..."`
- `SELECTED_SERVICE="harborJobSvc"`

---

### Step 3: Create Ticket in Tracker (Phase 0.0 - MANDATORY)

**Use the mandatory ticket creation script:**

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils

# Create and start ticket in ONE command
./mandatory-ticket-creation.sh "137" "Update create-counter-offer API to Allow Offers" "Modify job-svc/create-counter-offer API to allow seekers to send counter offers for all jobs" "harborJobSvc"
```

**Expected Output:**
```
🎯 MANDATORY TICKET CREATION - PHASE 0.0
======================================
📋 Task Information:
  ID: 137
  Title: Update create-counter-offer API to Allow Offers
  Service: harborJobSvc

📝 Step 1: Creating ticket data...
✅ Ticket data created: /tmp/ticket-data.json

🎫 Step 2: Creating ticket in tracker...
✅ TICKET TKT-137 CREATED SUCCESSFULLY

▶️  Step 4: Starting ticket...
✅ TICKET TKT-137 STARTED SUCCESSFULLY

🎉 MANDATORY TICKET CREATION COMPLETE
======================================
✅ Ticket: TKT-137
✅ Status: In Progress
✅ Stage: Development

🟢 PROCEEDING TO PHASE 0: Documentation Gate
```

**What just happened:**
1. ✅ Created ticket TKT-137 in tracker
2. ✅ Set status to "In Progress"
3. ✅ Set stage to "Development"
4. ✅ Set progress to 0%
5. ✅ Ready for automatic tracking

---

### Step 4: Verify Ticket Exists (Optional but Recommended)

```bash
# Check ticket was created
curl -s http://localhost:3001/api/tickets/TKT-137 | jq
```

**You should see:**
```json
{
  "success": true,
  "data": {
    "id": "TKT-137",
    "title": "Update create-counter-offer API to Allow Offers",
    "status": "In Progress",
    "stage": "Development",
    "progress": 0,
    "harborAgentActive": true
  }
}
```

**Or check in UI:**
Open http://localhost:5173 and verify TKT-137 appears.

---

### Step 5: Start the Automatic Tracker (Terminal 3)

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
./auto-tracker.sh start
```

**Expected Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Harbor Agent Automatic Tracker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ️  Starting automatic tracker...

✅ Automatic tracker started successfully

ℹ️  PID: 12345
ℹ️  Log file: /tmp/harbor-agent-tracker.log

ℹ️  The tracker will now:
  • Monitor active tickets
  • Detect Git commits automatically
  • Update ticket progress in real-time
  • Track file changes

✅ Tracker is now running!
```

---

### Step 6: Verify Tracker Detected the Ticket

```bash
./auto-tracker.sh status
```

**You should see:**
```
✅ Automatic tracker is running

📊 Harbor Agent Automatic Tracker Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 🟢 Running
Current Ticket: TKT-137
Current Repo: /Users/mohitshah/.../harborJobSvc
Current Progress: 0%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎫 Active Ticket in Tracker:
  ID: TKT-137
  Title: Update create-counter-offer API...
  Status: In Progress
  Stage: Development
  Progress: 0%
```

**Perfect!** The tracker has detected TKT-137 and is ready to monitor it.

---

### Step 7: Simulate Agent Work - Make Test Commits (Terminal 4)

**Navigate to the assigned repo:**

```bash
cd /Users/mohitshah/Documents/HarborService/harborJobSvc
```

**Make first test commit:**

```bash
# Create a test file
echo "# Test Commit 1 - Starting work on counter-offer API" > test-progress.txt

# Commit it
git add test-progress.txt
git commit -m "feat: start implementing counter-offer API changes"
```

**Wait 30 seconds OR force immediate check:**

```bash
# Go back to Terminal 3 (tracker terminal)
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
./auto-tracker.sh check
```

**Expected Output:**
```
ℹ️  Manual progress check...
ℹ️  Checking for progress...
ℹ️  Found active ticket: TKT-137
ℹ️  Monitoring repo: /Users/mohitshah/.../harborJobSvc
ℹ️  Detected 1 new commit(s)
ℹ️  Progress: 0% -> 15%
ℹ️  Files changed: 1 (+1, -0)
✅ Updated TKT-137 progress to 15%
```

**Make second test commit:**

```bash
# Back in Terminal 4 (harborJobSvc)
cd /Users/mohitshah/Documents/HarborService/harborJobSvc

echo "# Test Commit 2 - Added validation logic" >> test-progress.txt
git add test-progress.txt
git commit -m "feat: add validation for counter-offer requests"
```

**Check tracker again (Terminal 3):**

```bash
./auto-tracker.sh check
```

**Expected Output:**
```
ℹ️  Checking for progress...
ℹ️  Found active ticket: TKT-137
ℹ️  Detected 1 new commit(s)
ℹ️  Progress: 15% -> 30%
ℹ️  Files changed: 1 (+1, -0)
✅ Updated TKT-137 progress to 30%
```

**Make third test commit:**

```bash
# Terminal 4 (harborJobSvc)
echo "# Test Commit 3 - Updated API endpoint" >> test-progress.txt
git add test-progress.txt
git commit -m "feat: update counter-offer API endpoint"
```

**Check tracker (Terminal 3):**

```bash
./auto-tracker.sh check
```

**Progress should now be 45%** (3 commits × 15% = 45%)

---

### Step 8: Verify in the UI

Open **http://localhost:5173** in your browser.

**You should see:**

1. **TKT-137 in the ticket list**
2. **Progress bar showing 45%**
3. **Stage: Development** (0-49% = Development)
4. **Status: In Progress**

**Click on TKT-137 to see details:**

5. **Activity Timeline showing:**
   - "Ticket Created"
   - "Harbor Agent Started"
   - "Auto-detected progress: 1 new commit" (×3)

6. **File Changes showing:**
   - `test-progress.txt` modified
   - 3 additions shown in green
   - Commit information

---

### Step 9: Make More Commits to Test Stage Progression

**Make 2 more commits:**

```bash
# Terminal 4 (harborJobSvc)
echo "# Test Commit 4 - Added unit tests" >> test-progress.txt
git add test-progress.txt
git commit -m "test: add unit tests for counter-offer"

echo "# Test Commit 5 - Testing complete" >> test-progress.txt
git add test-progress.txt
git commit -m "test: all tests passing"
```

**Check tracker:**

```bash
# Terminal 3
./auto-tracker.sh check
```

**Progress should be 75%** (5 commits × 15% = 75%)

**Check the UI:**
- Stage should now be **"Deployment"** (75%+ = Deployment)

---

### Step 10: Check the Tracker Logs

```bash
# Terminal 3
./auto-tracker.sh logs
```

**You should see complete activity:**

```
[2026-03-30T12:00:00.000Z] [INFO] Starting automatic tracking...
[2026-03-30T12:00:00.100Z] [SUCCESS] Connected to Ticket Tracker API
[2026-03-30T12:00:30.000Z] [INFO] Checking for progress...
[2026-03-30T12:00:30.200Z] [INFO] Found active ticket: TKT-137
[2026-03-30T12:00:30.300Z] [INFO] Monitoring repo: /Users/mohitshah/.../harborJobSvc
[2026-03-30T12:01:00.000Z] [INFO] Checking for progress...
[2026-03-30T12:01:00.200Z] [INFO] Detected 1 new commit(s)
[2026-03-30T12:01:00.300Z] [INFO] Progress: 0% -> 15%
[2026-03-30T12:01:00.400Z] [INFO] Files changed: 1 (+1, -0)
[2026-03-30T12:01:00.500Z] [SUCCESS] Updated TKT-137 progress to 15%
[2026-03-30T12:02:00.000Z] [INFO] Checking for progress...
[2026-03-30T12:02:00.200Z] [INFO] Detected 1 new commit(s)
[2026-03-30T12:02:00.300Z] [SUCCESS] Updated TKT-137 progress to 30%
...and so on
```

---

### Step 11: View File Changes in Detail

The automatic tracker records file changes for each commit.

**Check what was recorded:**

```bash
curl -s http://localhost:3001/api/tickets/TKT-137/activities | jq '.data[] | select(.action | contains("Progress"))'
```

**You should see activities with file changes:**

```json
{
  "id": "ACT-xxx",
  "ticketId": "TKT-137",
  "timestamp": "2026-03-30T12:01:00.500Z",
  "action": "Progress Update",
  "description": "Auto-detected progress: 1 new commit(s), 1 file(s) changed",
  "user": "Harbor Agent",
  "stage": "Development",
  "filesChanged": [
    {
      "path": "test-progress.txt",
      "changeType": "modified",
      "additions": 1,
      "deletions": 0
    }
  ],
  "summary": {
    "totalFiles": 1,
    "additions": 1,
    "deletions": 0
  }
}
```

---

### Step 12: Complete the Ticket

When work is done, complete the ticket manually:

```bash
# Terminal 3
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils

node ticketTrackerIntegration.js complete "TKT-137" "Successfully implemented counter-offer API changes. All tests passing."
```

**Expected Output:**
```
🎉 Completing ticket: TKT-137
✅ Ticket TKT-137 completed successfully
```

---

### Step 13: Verify Completion in UI

Refresh http://localhost:5173

**You should see:**
- ✅ Status: **"Completed"**
- ✅ Stage: **"Deployment"**
- ✅ Progress: **100%**
- ✅ Final activity logged

---

### Step 14: Clean Up Test Data (Optional)

```bash
# Clean up test commits
cd /Users/mohitshah/Documents/HarborService/harborJobSvc
git reset --hard HEAD~5  # Removes the 5 test commits

# Or keep them for testing
```

---

## ✅ Verification Checklist

After the complete test, verify:

- [ ] Backend API started successfully
- [ ] Azure DevOps task fetched correctly
- [ ] Ticket created via mandatory script
- [ ] Ticket started with "In Progress" status
- [ ] Automatic tracker detected the ticket
- [ ] First commit detected → 15% progress
- [ ] Second commit detected → 30% progress
- [ ] Third commit detected → 45% progress
- [ ] Stage changed from "Development" to "Deployment" at 75%
- [ ] File changes recorded for each commit
- [ ] UI updated in real-time
- [ ] Activities logged correctly
- [ ] Ticket completed successfully
- [ ] Final status shows "Completed"

---

## 📊 Expected Timeline

| Time | Activity | Expected Result |
|------|----------|-----------------|
| 0:00 | Start backend | API running |
| 0:30 | Fetch Azure task | Task selected |
| 1:00 | Create ticket | TKT-137 created |
| 1:30 | Start tracker | Tracker running |
| 2:00 | Make commit 1 | Progress → 15% |
| 2:30 | Make commit 2 | Progress → 30% |
| 3:00 | Make commit 3 | Progress → 45% |
| 3:30 | Make commit 4 | Progress → 60% |
| 4:00 | Make commit 5 | Progress → 75% |
| 4:30 | Check UI | All updates visible |
| 5:00 | Complete ticket | Status → Completed |

**Total: ~5 minutes for complete end-to-end test**

---

## 🎯 Success Criteria

The test is **SUCCESSFUL** if:

1. ✅ **Ticket Creation:** Phase 0.0 creates ticket automatically
2. ✅ **Automatic Detection:** Tracker finds active ticket
3. ✅ **Commit Detection:** Every commit is detected
4. ✅ **Progress Updates:** Progress increases by 15% per commit
5. ✅ **Stage Progression:** Stage changes appropriately
6. ✅ **File Changes:** All file changes recorded
7. ✅ **UI Updates:** Real-time updates in browser
8. ✅ **Completion:** Manual completion works
9. ✅ **No Manual API Calls:** Everything automatic except final completion

---

## 🐛 Common Issues & Solutions

### Issue: "Tracker doesn't detect commits"

**Solution:**
```bash
# Verify you're in the right repo
pwd
# Should be: /Users/mohitshah/Documents/HarborService/harborJobSvc

# Check ticket has repo assigned
curl -s http://localhost:3001/api/tickets/TKT-137 | jq '.data.assignedRepos'

# Force check
./auto-tracker.sh check
```

### Issue: "Progress not updating in UI"

**Solution:**
- Hard refresh browser (Ctrl+Shift+R)
- Check API is responding: `curl http://localhost:3001/api/health`
- Check tracker logs: `./auto-tracker.sh logs`

### Issue: "Wrong repo being monitored"

**Solution:**
- Verify `assignedRepos` in ticket data
- Check `reposPath` in `automatic-tracker.js` CONFIG
- Make sure repo path is correct

---

## 🎉 What This Proves

If the test succeeds, you've verified:

1. ✅ **Complete workflow works** from Azure DevOps to completion
2. ✅ **Automatic tracking works** without manual intervention
3. ✅ **File changes are recorded** automatically
4. ✅ **Progress updates work** in real-time
5. ✅ **UI updates automatically** as work progresses
6. ✅ **Synchronization issue is FIXED**

---

## 📝 Notes

- **Test commits are safe** - Can be undone with `git reset`
- **Tracker polls every 30s** - Or use `./auto-tracker.sh check` for immediate
- **Progress max is 95% auto** - Last 5% requires manual completion
- **File changes use git diff** - Accurate change tracking
- **Logs saved to `/tmp`** - Can review full history

---

**Ready to test the complete end-to-end flow?** 🚀

Start with Step 1 and work through all 14 steps!

