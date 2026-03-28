# 🎫 Harbor Ticket Tracker - Complete Documentation

**Version:** 1.0.0
**Last Updated:** 2026-03-28
**Status:** Production Ready ✅

**A complete ticket tracking system with real-time updates, file changes visualization, and automatic Harbor Agent integration.**

---

## 📁 **Project Structure**

```
harbor-ticket-tracker/
├── frontend/          # React.js UI (Port: 5173)
│   ├── src/          # React components
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
└── backend/           # Express.js API (Port: 3001)
    ├── src/          # API routes & server
    ├── data/         # Ticket data storage
    └── package.json  # Backend dependencies
```

---

## 🚀 **Quick Start**

### **Option 1: Start Both Servers**

```bash
# From the root directory
npm run dev
```

This starts both frontend and backend simultaneously.

### **Option 2: Start Individually**

```bash
# Terminal 1 - Start Backend API
cd backend
npm run dev

# Terminal 2 - Start Frontend UI
cd frontend
npm run dev
```

---

## 🌐 **Access Points**

- **Frontend UI:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/health

---

## 📖 **Overview**

**Harbor Ticket Tracker** is a real-time task tracking system that provides complete visibility into Harbor Agent's autonomous development work. It automatically tracks tickets, progress updates, and file changes as the agent works on Azure DevOps tasks.

### **Key Capabilities**

- ✅ **Automatic Ticket Creation** - Tickets appear when Harbor Agent starts work
- ✅ **Real-time Progress Tracking** - See progress from 0% to 100% as agent works
- ✅ **File Changes Visualization** - View exactly what code was changed (git diff-style)
- ✅ **Complete Audit Trail** - Activity timeline shows every agent action
- ✅ **Beautiful Dark Theme UI** - Modern, responsive interface

### **Why This Matters**

Before Harbor Ticket Tracker:
- ❌ Agent worked invisibly - no visibility into what it was doing
- ❌ No progress tracking - had to manually check agent status
- ❌ No file change history - couldn't see what was modified
- ❌ No audit trail - couldn't review agent's work

After Harbor Ticket Tracker:
- ✅ **Full transparency** - See exactly what agent is working on
- ✅ **Real-time updates** - Progress updates every 5 seconds automatically
- ✅ **Code review** - Review changes without opening files
- ✅ **Complete history** - Every action logged and timestamped

---

## ✨ **Features**

### **Frontend (React UI)**
- ✅ Real-time ticket dashboard with auto-refresh
- ✅ Ticket list with status indicators
- ✅ Detailed ticket view with progress tracking
- ✅ 5-stage progress stepper (Planning → Analysis → Development → Testing → Deployment)
- ✅ Activity timeline with complete history
- ✅ **File changes display** with git diff formatting (NEW!)
- ✅ **Expandable diffs** - Click to expand/collapse file changes
- ✅ **Syntax highlighting** - Color-coded additions (green) and deletions (red)
- ✅ Delete ticket functionality with confirmation
- ✅ Dark theme UI with modern design
- ✅ Fully responsive design (mobile & desktop)
- ✅ Real-time polling every 5 seconds
- ✅ Visual progress bars and status badges

### **Backend (Express API)**
- ✅ RESTful API for complete ticket management
- ✅ **Automatic Harbor Agent integration** (NEW!)
- ✅ **File changes tracking** with git diff support (NEW!)
- ✅ Real-time data synchronization
- ✅ Complete activity logging
- ✅ JSON file persistence
- ✅ CORS enabled for frontend
- ✅ Health check endpoint
- ✅ Non-blocking error handling

### **Harbor Agent Integration**
- ✅ **Automatic ticket creation** - Agent creates tickets when starting work (NEW!)
- ✅ **Mandatory Phase 0.0** - Ticket creation is non-skippable (NEW!)
- ✅ **Progress updates** - Agent updates at 25%, 50%, 75%, 90%, 100%
- ✅ **File changes reporting** - Agent includes file changes with updates (NEW!)
- ✅ **Automatic completion** - Agent marks tickets as completed
- ✅ **Integration scripts** - Bash scripts for easy automation (NEW!)

### **File Changes Tracking** (NEW!)
- ✅ **Git diff format** - Changes shown in unified diff format
- ✅ **Syntax highlighting** - Color-coded additions/deletions
- ✅ **File statistics** - Additions/deletions count per file
- ✅ **Change type indicators** - Added, Modified, Deleted, Renamed
- ✅ **Summary badge** - Total files changed, +/- lines
- ✅ **Expandable view** - Click files to see full diff
- ✅ **File type icons** - Language-specific icons (JS, TS, Python, etc.)

---

## 🏗️ **Architecture**

### **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Harbor Ticket Tracker                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   Frontend   │◄────►│    Backend    │                   │
│  │   (React)    │      │   (Express)   │                   │
│  │   Port: 5173 │      │   Port: 3001   │                   │
│  └──────────────┘      └──────────────┘                   │
│         │                      │                              │
│         │                      │                              │
│         │                      ▼                              │
│         │              ┌──────────────┐                    │
│         │              │     JSON     │                    │
│         │              │    Database   │                    │
│         │              │ tickets-data  │                    │
│         │              │   .json      │                    │
│         │              └──────────────┘                    │
│         │                                                     │
│         ▼                                                     │
│  ┌──────────────┐                                            │
│  │  Harbor      │                                            │
│  │  Agent       │                                            │
│  │  (External)  │                                            │
│  └──────────────┘                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Data Flow**

```
1. Harbor Agent fetches Azure DevOps task
   ↓
2. Agent executes Phase 0.0: MANDATORY Ticket Creation
   - Creates ticket via integration script
   - Starts ticket in tracker
   - Verifies ticket exists
   ↓
3. Agent proceeds with implementation
   ↓
4. Agent updates progress at milestones (25%, 50%, 75%, 90%)
   - Includes file changes with each update
   - All updates logged in activities
   ↓
5. Agent completes task (100%)
   - Marks ticket as completed
   - Updates status to "Completed"
   - Sets stage to "Deployment"
   ↓
6. Frontend polls API every 5 seconds
   - Fetches latest ticket data
   - Updates UI in real-time
   ↓
7. User views complete history in UI
   - Ticket details
   - Progress visualization
   - Activity timeline
   - File changes (with expandable diffs)
```

---

## 🤖 **Harbor Agent Integration**

### **How It Works** (Automatic!)

When Harbor Agent starts working on a task, it now **automatically**:

1. ✅ **Creates ticket** in tracker (Phase 0.0 - MANDATORY)
2. ✅ **Starts ticket** with "In Progress" status
3. ✅ **Updates progress** at 25%, 50%, 75%, 90%, 100%
4. ✅ **Reports file changes** with git diff formatting
5. ✅ **Completes ticket** when task is done

### **Mandatory Phase 0.0**

**Location:** `harbor-ai/workflows/PHASE-0-MANDATORY-TICKET-CREATION.md`

**What it does:**
- Forces Agent to create ticket BEFORE any other work
- Non-skippable - blocks execution if ticket not created
- Automatic verification ensures ticket exists
- Only then proceeds to Phase 0 (Documentation Gate)

### **Integration Scripts**

**1. Mandatory Ticket Creation Script**
```
File: backend/src/utils/mandatory-ticket-creation.sh
Usage: ./mandatory-ticket-creation.sh <task-id> "<title>" "<description>" "<service>"
```

**2. Ticket Tracker Integration**
```
File: backend/src/utils/ticketTrackerIntegration.js
Usage: node ticketTrackerIntegration.js <command> <args>
Commands: create, start, update, complete
```

**3. Harbor Agent Helper**
```
File: backend/src/utils/harborAgentHelper.js
Usage: Import in agent code for API calls
```

### **Automatic Execution Flow**

### **Using the Helper:**

```javascript
import HarborAgentTracker from './backend/src/utils/harborAgentHelper.js'

// When agent starts working
await HarborAgentTracker.startTicket('TKT-001', 'Development', 'Starting work')

// As agent makes progress
await HarborAgentTracker.updateProgress('TKT-001', 50, 'Development', 'Halfway done')

// When agent completes
await HarborAgentTracker.completeTicket('TKT-001', 'Successfully completed')
```

### **Direct API Calls:**

```bash
# Start ticket
curl -X POST http://localhost:3001/api/harbor-agent/start \
  -H "Content-Type: application/json" \
  -d '{"ticketId":"TKT-001","stage":"Development","message":"Starting work"}'

# Update progress
curl -X PUT http://localhost:3001/api/tickets/TKT-001/progress \
  -H "Content-Type: application/json" \
  -d '{"progress":50,"message":"Halfway done"}'

# Complete ticket
curl -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{"ticketId":"TKT-001","message":"Completed"}'
```

---

## 📊 **API Endpoints**

### **Tickets**
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### **Progress**
- `PUT /api/tickets/:id/progress` - Update ticket progress

### **Harbor Agent Webhooks**
- `POST /api/harbor-agent/start` - Agent starts working
- `POST /api/harbor-agent/complete` - Agent completes work

### **Activities**
- `GET /api/activities` - Get all activities
- `GET /api/tickets/:id/activities` - Get ticket activities

### **Health**
- `GET /api/health` - Check API status

---

## 🛠️ **Development**

### **Frontend Development**

```bash
cd frontend
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

### **Backend Development**

```bash
cd backend
npm run dev      # Start API server (port 3001)
npm start        # Start production server
```

---

## 📁 **Key Files**

### **Frontend**
- `frontend/src/App.jsx` - Main app component
- `frontend/src/components/` - React components
- `frontend/src/App.css` - Global styles

### **Backend**
- `backend/src/server.js` - Express server
- `backend/src/utils/harborAgentHelper.js` - Harbor Agent integration
- `backend/data/tickets-data.json` - Ticket storage

---

## 🎨 **Customization**

### **Change API Port**

Edit `backend/src/server.js`:
```javascript
const PORT = 3001  // Change to your desired port
```

Then update `frontend/src/App.jsx`:
```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api'
```

### **Change Update Interval**

Edit `frontend/src/App.jsx`:
```javascript
}, 5000)  // Change to desired milliseconds (default: 5 seconds)
```

---

## 🧪 **Testing**

### **Test API**
```bash
# Health check
curl http://localhost:3001/api/health

# Get all tickets
curl http://localhost:3001/api/tickets

# Create test ticket
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d '{"id":"TEST","title":"Test","priority":"High"}'
```

### **Test UI**
Open http://localhost:5173 and verify:
- Tickets load from API
- Real-time updates work
- Delete buttons function
- No console errors

---

## 📝 **Complete Documentation**

### **Main Documentation**
- **README.md** (this file) - Complete system overview
- **AUTOMATIC_TICKET_CREATION_FIXED.md** - Latest automatic integration fix
- **AUTOMATIC_INTEGRATION_COMPLETE.md** - Integration details
- **HARBOR_AGENT_INTEGRATION_GUIDE.md** - Agent integration guide
- **FILE_CHANGES_GUIDE.md** - File changes feature guide

### **Workflow Documentation**
- **harbor-ai/workflows/PHASE-0-MANDATORY-TICKET-CREATION.md** - Mandatory ticket creation
- **harbor-ai/workflows/global-agent-workflow-v11.md** - Agent workflow with integration

### **Component Documentation**
- **backend/src/utils/harborAgentHelper.js** - API helper class documentation
- **backend/src/utils/fileChangesHelper.js** - File changes utilities
- **frontend/src/components/TicketDetail/FileChanges.jsx** - File changes component

---

## 🔌 **Complete API Documentation**

### **Base URL**
```
http://localhost:3001/api
```

### **Core Endpoints**

#### **Health Check**
```
GET /api/health
```
Returns API status and statistics

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-28T00:00:00.000Z",
  "ticketsCount": 5,
  "activitiesCount": 25
}
```

#### **Get All Tickets**
```
GET /api/tickets
```
Returns list of all tickets

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "TKT-001",
      "title": "Task Title",
      "description": "Task description",
      "status": "In Progress",
      "stage": "Development",
      "priority": "High",
      "assignedRepos": ["service-name"],
      "assignee": "Harbor Agent",
      "createdAt": "2026-03-28T00:00:00.000Z",
      "updatedAt": "2026-03-28T00:00:00.000Z",
      "estimatedCompletion": "2026-04-04T00:00:00.000Z",
      "progress": 50,
      "tags": ["tag1", "tag2"],
      "harborAgentActive": true
    }
  ],
  "count": 1
}
```

#### **Get Single Ticket**
```
GET /api/tickets/:id
```
Returns details of a specific ticket

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "TKT-001",
    "title": "Task Title",
    ...
  }
}
```

#### **Create Ticket**
```
POST /api/tickets
Content-Type: application/json

{
  "id": "TKT-001",
  "title": "Task Title",
  "description": "Task description",
  "priority": "High",
  "assignedRepos": ["service-name"],
  "assignee": "Harbor Agent",
  "tags": ["tag1", "tag2"]
}
```

#### **Update Ticket**
```
PUT /api/tickets/:id
Content-Type: application/json

{
  "title": "Updated title",
  "status": "Completed",
  "stage": "Deployment"
}
```

#### **Delete Ticket**
```
DELETE /api/tickets/:id
```

### **Progress Management**

#### **Update Progress**
```
PUT /api/tickets/:id/progress
Content-Type: application/json

{
  "progress": 50,
  "stage": "Development",
  "message": "Implementation in progress",
  "filesChanged": [
    {
      "path": "service/src/file.js",
      "changeType": "modified",
      "additions": 45,
      "deletions": 12,
      "diff": "@@ -20,8 +20,45 @@\\n+ code changes..."
    }
  ],
  "summary": {
    "totalFiles": 1,
    "additions": 45,
    "deletions": 12
  }
}
```

### **Harbor Agent Integration**

#### **Agent Starts Work**
```
POST /api/harbor-agent/start
Content-Type: application/json

{
  "ticketId": "TKT-001",
  "stage": "Development",
  "message": "Starting work"
}
```

#### **Agent Completes Work**
```
POST /api/harbor-agent/complete
Content-Type: application/json

{
  "ticketId": "TKT-001",
  "message": "Work completed"
}
```

### **Activities**

#### **Get All Activities**
```
GET /api/activities
```

#### **Get Ticket Activities**
```
GET /api/tickets/:id/activities
```

---

## 🐛 **Troubleshooting**

### **Frontend won't load tickets**
- Check API is running: `curl http://localhost:3001/api/health`
- Check browser console for CORS errors
- Verify API URL in `frontend/src/App.jsx`

### **Real-time updates not working**
- Check "Live" toggle is enabled in header
- Verify API is responding
- Check browser console for errors

### **Delete button not working**
- Check API is running
- Verify ticket ID exists
- Check browser console for errors

---

## 🚀 **Production Deployment**

### **Frontend**
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting
```

### **Backend**
```bash
cd backend
npm start
# Or use PM2: pm2 start src/server.js
```

---

## 📄 **License**

Part of the Harbor AI ecosystem.

---

## 🎉 **Summary**

**Harbor Ticket Tracker** is a full-stack application that:
- Tracks tickets from Harbor Agent in real-time
- Provides a beautiful, responsive UI
- Integrates seamlessly with Harbor Agent workflow
- Offers complete CRUD operations
- Maintains an audit trail of all activities

**Start tracking your tickets today!** 🚀

---

**Last Updated:** March 2026
