# 🤖 Harbor Agent Integration - COMPLETE GUIDE

## 🎯 **The Problem**

Harbor Agent is running but tickets are NOT appearing in the tracker UI.

**Solution:** Harbor Agent needs to call the API to create/update tickets!

---

## 📍 **CORRECT IMPORT PATH**

### **If Harbor Agent is in `harbor-ai/` folder:**

```javascript
import HarborAgentTracker from './harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js'
```

### **If Harbor Agent is in `harbor-ticket-tracker/` folder:**

```javascript
import HarborAgentTracker from './backend/src/utils/harborAgentHelper.js'
```

---

## 🔧 **HOW TO INTEGRATE**

### **Step 1: Import the Helper**

```javascript
import HarborAgentTracker from './harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js'
```

### **Step 2: When Agent Starts Working on Ticket**

```javascript
async function startTicket(ticket) {
  console.log(`🎯 Starting work on ${ticket.id}`)

  // This will create the ticket in the API
  // and it will appear in the UI within 5 seconds!
  await HarborAgentTracker.startTicket(
    ticket.id,              // e.g., "TKT-001"
    'Development',          // Stage
    `Starting work on ${ticket.title}`  // Message
  )

  // Your existing code...
  await implementFeature(ticket)
}
```

### **Step 3: As Agent Makes Progress**

```javascript
async function updateProgress(ticketId, percent, workDone) {
  console.log(`📈 Progress: ${percent}%`)

  // This updates the progress in the UI immediately!
  await HarborAgentTracker.updateProgress(
    ticketId,       // e.g., "TKT-001"
    percent,        // e.g., 50
    'Development',  // Stage
    workDone        // e.g., "Implemented OAuth flow"
  )

  // Your existing code...
}
```

### **Step 4: When Agent Completes Ticket**

```javascript
async function completeTicket(ticketId) {
  console.log(`🎉 Completing ${ticketId}`)

  // This marks ticket as completed in the UI!
  await HarborAgentTracker.completeTicket(
    ticketId,
    `Successfully completed ${ticketId}`
  )

  // Your existing code...
}
```

---

## 🧪 **TESTING**

### **Test 1: Verify API is Running**

```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{"status":"ok","ticketsCount":0,"activitiesCount":0}
```

### **Test 2: Verify UI is Running**

Open: http://localhost:5173

### **Test 3: Manual API Test**

```bash
# Create a test ticket
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "id": "TKT-TEST",
    "title": "Test Ticket",
    "priority": "High",
    "assignee": "Harbor Agent"
  }'

# Check if it appears in API
curl http://localhost:3001/api/tickets

# Check if it appears in UI (refresh http://localhost:5173)
```

### **Test 4: Harbor Agent Integration**

Add this to your Harbor Agent code and run:

```javascript
import HarborAgentTracker from './harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js'

// Test creating a ticket
await HarborAgentTracker.startTicket(
  'TKT-AGENT-TEST',
  'Development',
  'Harbor Agent test - this should appear in UI immediately!'
)

// Wait 5 seconds and check UI
```

---

## 🐛 **TROUBLESHOOTING**

### **Issue: "Cannot find module"**

**Solution:** Check your import path!

```bash
# From harbor-ai/
ls -la harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js

# Should show the file exists
```

### **Issue: Tickets not appearing in UI**

**Check 1:** Is API running?
```bash
curl http://localhost:3001/api/health
```

**Check 2:** Are tickets in API?
```bash
curl http://localhost:3001/api/tickets
```

**Check 3:** Is UI fetching from API?
- Open browser console (F12)
- Look for API calls to `localhost:3001`
- Check for CORS errors

**Check 4:** Is Harbor Agent actually calling the API?
- Add console.log() before HarborAgentTracker calls
- Check if there are any errors

### **Issue: Harbor Agent can't connect to API**

**Solution:** Make sure API is running on port 3001

```bash
# Check if port 3001 is in use
lsof -ti:3001

# If not running, start it:
cd harbor-ticket-tracker/backend
npm run dev
```

---

## 📊 **What Should Happen**

```
1. Harbor Agent calls: startTicket('TKT-001', 'Development', 'Starting')
       ↓
2. API receives request
       ↓
3. API creates ticket + saves to file
       ↓
4. API logs activity "Harbor Agent Started"
       ↓
5. UI polls API (every 5 seconds)
       ↓
6. UI fetches new ticket
       ↓
7. Ticket appears in UI! ✨
```

**All of this happens within 5 seconds!**

---

## 🎯 **Complete Example**

```javascript
// In your Harbor Agent workflow file

import HarborAgentTracker from './harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js'

async function processAzureDevOpsTicket(ticket) {
  try {
    // 1. Notify tracker that agent is starting
    await HarborAgentTracker.startTicket(
      ticket.id,
      'Development',
      `Harbor Agent started: ${ticket.title}`
    )

    // 2. Do actual work...
    const result = await implementFeature(ticket)

    // 3. Update progress as you work
    await HarborAgentTracker.updateProgress(
      ticket.id,
      50,
      'Development',
      'Feature implementation complete'
    )

    // 4. Do more work...
    await testFeature(ticket)

    // 5. Update progress again
    await HarborAgentTracker.updateProgress(
      ticket.id,
      90,
      'Testing',
      'Testing complete'
    )

    // 6. Complete the ticket
    await HarborAgentTracker.completeTicket(
      ticket.id,
      `Successfully completed: ${ticket.title}`
    )

    console.log(`✅ Ticket ${ticket.id} completed and tracked in UI!`)

  } catch (error) {
    console.error(`❌ Error processing ticket:`, error)
  }
}
```

---

## ✅ **SUCCESS CHECKLIST**

- [ ] API running on port 3001
- [ ] UI running on port 5173
- [ ] Harbor Agent imports helper with correct path
- [ ] Harbor Agent calls `startTicket()` when starting work
- [ ] Harbor Agent calls `updateProgress()` as it works
- [ ] Harbor Agent calls `completeTicket()` when done
- [ ] Tickets appear in UI within 5 seconds
- [ ] Progress updates in real-time
- [ ] Activity log shows "Harbor Agent" actions

---

## 🚀 **Quick Test**

Run this in your Harbor Agent:

```javascript
import HarborAgentTracker from './harbor-ticket-tracker/backend/src/utils/harborAgentHelper.js'

await HarborAgentTracker.startTicket(
  'TKT-QUICK-TEST',
  'Development',
  'Quick test - check UI in 5 seconds!'
)
```

Then open http://localhost:5173 and you should see the ticket appear!

---

**If tickets still don't appear, check:**
1. Browser console for errors
2. Network tab for API calls
3. API is actually receiving requests
4. Correct import path in Harbor Agent

**Good luck! 🚀**
