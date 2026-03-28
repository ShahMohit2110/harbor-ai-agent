# 🚀 Harbor Agent + Ticket Tracker Integration Guide

## ✅ What's Been Built

**Complete integration between Harbor Agent and Ticket Tracker UI:**

1. **REST API Server** (`harbor-ticket-api`) - Port 3001
2. **Updated Ticket Tracker UI** - Fetches from API instead of local JSON
3. **Delete Ticket Functionality** - Added to UI
4. **Harbor Agent Helper** - Easy integration functions

---

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Harbor Agent   │ ───> │  REST API (3001) │ ───> │  Ticket UI (5173)│
│  (Azure DevOps) │      │  Data Storage    │      │  Real-time View  │
└─────────────────┘      └──────────────────┘      └──────────────────┘
     ↓                          ↓                          ↓
 Fetches                 Stores & Manages            Displays &
 Tickets                 Ticket Data                 Progress
                         Automatically               Live Updates
```

---

## 🚀 Quick Start

### Step 1: Start the API Server

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-api
npm run dev
```

**API will run on:** http://localhost:3001

### Step 2: Start the Ticket Tracker UI

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ticket-tracker-ui
npm run dev
```

**UI will run on:** http://localhost:5173

### Step 3: Use Harbor Agent

When Harbor Agent works on tickets, it will automatically appear in the UI!

---

## 📝 How Harbor Agent Integrates

### Method 1: Using the Helper (Recommended)

In your Harbor Agent workflow:

```javascript
import HarborAgentTracker from './harbor-ticket-api/src/utils/harborAgentHelper.js'

// When agent STARTS working on a ticket
await HarborAgentTracker.startTicket(
  'TKT-001',
  'Development',
  'Started implementing user authentication'
)

// As agent makes PROGRESS
await HarborAgentTracker.updateProgress(
  'TKT-001',
  45,
  'Development',
  'Implemented OAuth flow'
)

// When agent COMPLETES a ticket
await HarborAgentTracker.completeTicket(
  'TKT-001',
  'Successfully completed authentication flow'
)

// Create NEW ticket from Azure DevOps
await HarborAgentTracker.createTicket({
  id: 'TKT-004',
  title: 'New Feature from Azure DevOps',
  description: 'Implement new feature',
  priority: 'High',
  assignedRepos: ['harborUserSvc'],
  assignee: 'John Doe',
  tags: ['feature', 'backend']
})
```

### Method 2: Direct API Calls

```javascript
// Start working on ticket
fetch('http://localhost:3001/api/harbor-agent/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ticketId: 'TKT-001',
    stage: 'Development',
    message: 'Started working on ticket'
  })
})

// Update progress
fetch(`http://localhost:3001/api/tickets/TKT-001/progress`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    progress: 65,
    stage: 'Development',
    message: 'Made significant progress'
  })
})

// Complete ticket
fetch('http://localhost:3001/api/harbor-agent/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ticketId: 'TKT-001',
    message: 'Ticket completed successfully'
  })
})
```

---

## 🎯 What Happens Automatically

### 1. When Harbor Agent Starts
- ✅ Ticket created in API (if doesn't exist)
- ✅ Status changed to "In Progress"
- ✅ Stage set to current stage
- ✅ Activity logged: "Harbor Agent Started"
- ✅ UI updates automatically (within 5 seconds)

### 2. As Harbor Agent Works
- ✅ Progress updates automatically
- ✅ Stage transitions when thresholds reached
- ✅ Activities logged with messages
- ✅ UI shows real-time progress

### 3. When Harbor Agent Completes
- ✅ Status changed to "Completed"
- ✅ Stage set to "Deployment"
- ✅ Progress set to 100%
- ✅ Activity logged: "Harbor Agent Completed"
- ✅ UI shows completion

---

## 📊 API Endpoints

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### Progress
- `PUT /api/tickets/:id/progress` - Update ticket progress

### Harbor Agent Webhooks
- `POST /api/harbor-agent/start` - Agent starts working
- `POST /api/harbor-agent/complete` - Agent completes work

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/tickets/:id/activities` - Get ticket activities

### Health
- `GET /api/health` - Check API status

---

## 🎨 UI Features

### Dashboard
- Live statistics
- Stage distribution
- Real-time updates

### Ticket List
- **Delete button** (🗑️) for each ticket
- Search and filter
- Real-time progress bars
- Click to view details

### Ticket Detail
- **Delete Ticket** button at top
- Full ticket information
- 5-stage progress stepper
- Activity timeline
- Progress visualization

---

## 🧪 Testing

### Test 1: Check API is Running

```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-28T...",
  "ticketsCount": 3,
  "activitiesCount": 1
}
```

### Test 2: Get All Tickets

```bash
curl http://localhost:3001/api/tickets
```

### Test 3: Create Test Ticket

```bash
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "id": "TKT-TEST",
    "title": "Test Ticket",
    "description": "Testing integration",
    "priority": "High",
    "assignee": "Test User"
  }'
```

### Test 4: Simulate Harbor Agent

```bash
# Start ticket
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "TKT-TEST", "stage": "Development"}'

# Update progress
curl -X PUT http://localhost:3001/api/tickets/TKT-TEST/progress \
  -H "Content-Type: application/json" \
  -d '{"progress": 50, "message": "Halfway done"}'

# Complete ticket
curl -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "TKT-TEST"}'
```

---

## 🔄 How It Works

### Data Flow

1. **Harbor Agent** fetches ticket from Azure DevOps
2. **Harbor Agent** calls API: `startTicket(ticketId, stage, message)`
3. **API** stores ticket data and creates activity log
4. **UI** polls API every 5 seconds (if Live mode is on)
5. **UI** displays updated ticket with new status/progress
6. **Harbor Agent** continues working, calling `updateProgress()` as needed
7. **Harbor Agent** calls `completeTicket()` when done
8. **UI** shows completed ticket

### Real-Time Updates

- **UI polls API** every 5 seconds (configurable)
- **API stores data** in memory + persists to JSON file
- **Harbor Agent pushes updates** via API calls
- **UI reflects changes** within 5 seconds

---

## 🛠️ Configuration

### Change Polling Interval

Edit `harbor-ticket-tracker-ui/src/App.jsx`:

```javascript
}, 5000) // Change to desired milliseconds
```

### Change API Port

Edit `harbor-ticket-api/src/server.js`:

```javascript
const PORT = 3001 // Change to your desired port
```

Then update UI API URL in `harbor-ticket-tracker-ui/src/App.jsx`:

```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api'
```

---

## 📁 File Locations

### API Server
```
harbor-ai/harbor-ticket-api/
├── src/
│   ├── server.js                    # Main API server
│   └── utils/
│       └── harborAgentHelper.js     # Helper functions for Harbor Agent
├── data/
│   └── tickets-data.json            # Persisted ticket data
└── package.json
```

### Ticket Tracker UI
```
harbor-ticket-tracker-ui/
├── src/
│   ├── App.jsx                      # Main app (fetches from API)
│   ├── components/
│   │   ├── TicketList/
│   │   │   └── TicketList.jsx       # With delete functionality
│   │   └── TicketDetail/
│   │       └── TicketDetail.jsx     # With delete functionality
│   └── data/                        # No longer used (API instead)
└── package.json
```

---

## 🎯 Usage Example

### Harbor Agent Workflow Integration

```javascript
// In your Harbor Agent workflow file:

import HarborAgentTracker from './harbor-ticket-api/src/utils/harborAgentHelper.js'

async function processTicket(ticket) {
  // 1. Notify API that agent is starting
  await HarborAgentTracker.startTicket(
    ticket.id,
    'Development',
    `Starting work on ${ticket.title}`
  )

  try {
    // 2. Do actual work...
    await implementFeature(ticket)

    // 3. Update progress
    await HarborAgentTracker.updateProgress(
      ticket.id,
      50,
      'Development',
      'Implemented core feature'
    )

    // 4. Do more work...
    await testFeature(ticket)

    // 5. Update progress again
    await HarborAgentTracker.updateProgress(
      ticket.id,
      80,
      'Testing',
      'Testing completed'
    )

    // 6. Complete the ticket
    await HarborAgentTracker.completeTicket(
      ticket.id,
      `Successfully completed ${ticket.title}`
    )

  } catch (error) {
    console.error('Error processing ticket:', error)
    // Optionally update with error status
  }
}
```

---

## ✅ Verification Checklist

- [ ] API server running on port 3001
- [ ] UI running on port 5173
- [ ] UI shows tickets from API (not local JSON)
- [ ] Delete button works in ticket list
- [ ] Delete button works in ticket detail
- [ ] Real-time updates working (toggle Live/Paused)
- [ ] Harbor Agent can call API functions
- [ ] Tickets appear in UI when Harbor Agent starts
- [ ] Progress updates in UI as Harbor Agent works
- [ ] Tickets marked completed when Harbor Agent finishes

---

## 🐛 Troubleshooting

### UI shows "Connection Error"

**Problem:** API server not running
**Solution:**
```bash
cd harbor-ai/harbor-ticket-api
npm run dev
```

### Tickets not updating

**Problem:** Real-time toggled off
**Solution:** Click the toggle in header to enable "Live" mode

### Harbor Agent can't connect

**Problem:** API on wrong port
**Solution:** Check API is on port 3001, update helper if needed

### Delete button not working

**Problem:** Permission issue or API error
**Solution:** Check browser console for errors, verify API is running

---

## 🎉 Success!

**Your Harbor Agent and Ticket Tracker UI are now fully integrated!**

- Harbor Agent automatically updates UI
- Real-time progress tracking
- Delete functionality added
- Complete audit trail with activities

**Open http://localhost:5173 to see your tickets!** 🚀
