# 🚀 QUICK START - Harbor Ticket Tracker

## 📍 **Location**

```
harbor-ai/harbor-ticket-tracker/
```

---

## 🎯 **One Command to Start Everything**

```bash
cd harbor-ai/harbor-ticket-tracker
npm run dev
```

**This starts BOTH frontend and backend!** ✨

---

## 📂 **Structure**

```
harbor-ticket-tracker/
├── frontend/          # React UI (Port: 5173)
│   ├── src/          # Components
│   ├── package.json  # Frontend deps
│   └── ...
│
├── backend/           # Express API (Port: 3001)
│   ├── src/          # API routes
│   ├── data/         # Ticket storage
│   ├── package.json  # Backend deps
│   └── ...
│
├── package.json       # Root scripts
└── README.md          # Full documentation
```

---

## 🌐 **Access Points**

- **UI:** http://localhost:5173
- **API:** http://localhost:3001
- **Health:** http://localhost:3001/api/health

---

## 🔧 **Available Scripts**

From **root directory** (`harbor-ticket-tracker/`):

```bash
npm run dev              # Start both frontend & backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run install:all      # Install all dependencies
npm run build:frontend   # Build frontend for production
npm run test:api         # Test API connection
```

---

## 🤖 **For Harbor Agent Integration**

### **Import Helper:**

```javascript
import HarborAgentTracker from './backend/src/utils/harborAgentHelper.js'
```

**Note:** The path is now from `harbor-ticket-tracker/` root!

### **Use It:**

```javascript
// Start ticket
await HarborAgentTracker.startTicket('TKT-001', 'Development', 'Starting work')

// Update progress
await HarborAgentTracker.updateProgress('TKT-001', 50, 'Development', 'Halfway')

// Complete ticket
await HarborAgentTracker.completeTicket('TKT-001', 'Done!')
```

---

## ✅ **Verify It's Working**

```bash
# 1. Check API
curl http://localhost:3001/api/health

# 2. Check UI
open http://localhost:5173

# 3. Check tickets
curl http://localhost:3001/api/tickets
```

---

## 🎉 **What Changed**

### **Before:**
```
harbor-ai/
├── harbor-ticket-api/          # Separate
└── ../harbor-ticket-tracker-ui/ # Separate (outside harbor-ai)
```

### **After:**
```
harbor-ai/
└── harbor-ticket-tracker/      # Unified!
    ├── frontend/               # React UI
    └── backend/                # Express API
```

---

## 📝 **Important Notes**

1. **Old folders still exist** (we haven't deleted them yet):
   - `harbor-ai/harbor-ticket-api/`
   - `harbor-ticket-tracker-ui/` (outside harbor-ai)

2. **New unified folder** is ready to use:
   - `harbor-ai/harbor-ticket-tracker/`

3. **Servers need to be restarted** in the new location

---

## 🚀 **Start Testing Now!**

```bash
# 1. Go to new location
cd harbor-ai/harbor-ticket-tracker

# 2. Start everything
npm run dev

# 3. Open UI
open http://localhost:5173

# 4. Test with Harbor Agent!
```

---

**Ready to test! 🎯**
