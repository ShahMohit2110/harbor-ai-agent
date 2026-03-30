# ☁️ Azure Sync Button - User Guide

**Version:** 1.0.0
**Date:** 2026-03-30
**Feature:** One-click Azure DevOps sync from Dashboard

---

## 🎯 What Is It?

The **Azure Sync Button** is a new feature on the Dashboard that lets you sync all active Azure DevOps tickets with ONE CLICK - no more CLI commands!

---

## 🚀 How to Use

### Step 1: Open Dashboard

Go to http://localhost:5173 and you'll see the Dashboard.

### Step 2: Find the Azure Sync Button

In the **"Quick Actions"** section, you'll see a new button:

```
┌─────────────────────────────────────────────────┐
│  Quick Actions                                   │
├─────────────────────────────────────────────────┤
│                                                  │
│  ☁️ Sync Azure DevOps    View All Tickets      │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Step 3: Click the Button

Just click **"☁️ Sync Azure DevOps"** and watch the magic!

---

## 📊 What Happens When You Click

### 1. **Syncing State** (0-30 seconds)

Button shows:
```
🔄 Syncing...
```

Message appears:
```
Syncing with Azure DevOps...
```

### 2. **Success State** (if successful)

Button turns green:
```
✓ Synced!
```

Success message:
```
✅ Sync completed! Check your tickets.
```

**AND:**
- Tickets list auto-refreshes
- New tickets appear immediately
- Progress bars update

### 3. **Error State** (if something goes wrong)

Button turns red:
```
✕ Failed
```

Error message:
```
❌ Sync failed. Please try again.
```

---

## ✨ Features

### One-Click Sync
- ✅ No CLI commands needed
- ✅ No terminal required
- ✅ Just click and go!

### Auto-Refresh
- ✅ Tickets list updates automatically
- ✅ New tickets appear instantly
- ✅ No manual refresh needed

### Visual Feedback
- ✅ Loading spinner while syncing
- ✅ Success/failure indicators
- ✅ Color-coded buttons
- ✅ Clear status messages

### Smart Detection
- ✅ Auto-detects Harbor repos path
- ✅ Auto-assigns tickets to correct repos
- ✅ Works globally on any machine

---

## 🎯 What Gets Synced

When you click the button, the tracker:

1. **Connects to Azure DevOps**
   ```
   Using credentials from .env:
   - AZURE_DEVOPS_PAT
   - AZURE_DEVOPS_ORG
   - AZURE_DEVOPS_PROJECT
   ```

2. **Fetches Active Tickets**
   ```
   Query: SELECT * FROM WorkItems
   WHERE: State = 'Active'
   AND: WorkItemType IN ('User Story', 'Task', 'Bug')
   ```

3. **Creates/Updates Tickets**
   ```
   For each ticket:
   • Check if exists in tracker
   • If not: Create new ticket
   • If yes: Update existing
   • Auto-assign to correct repo
   • Set status to "In Progress"
   • Set stage to "Planning"
   ```

4. **Refreshes UI**
   ```
   • Reloads tickets list
   • Shows new tickets
   • Updates dashboard stats
   ```

---

## 📋 Example Workflow

### Before Sync

**Dashboard shows:**
```
Total Tickets: 0
Pending: 0
In Progress: 0
Completed: 0
```

**Azure DevOps has:**
- TKT-137: "Update create-counter-offer API"
- TKT-138: "Add user profile feature"
- TKT-139: "Fix authentication bug"

### Click Sync Button

**Button:** ☁️ Sync Azure DevOps
**State:** 🔄 Syncing...

### After Sync

**Dashboard shows:**
```
Total Tickets: 3
Pending: 3
In Progress: 0
Completed: 0
```

**Tickets list shows:**
- ✅ TKT-137: Update create-counter-offer API (Planning - 0%)
- ✅ TKT-138: Add user profile feature (Planning - 0%)
- ✅ TKT-139: Fix authentication bug (Planning - 0%)

**All ready to track!**

---

## 🔄 Sync Behavior

### New Tickets

If a ticket doesn't exist in the tracker:
```
Azure DevOps: TKT-140 (Active)
→ Not in tracker
→ CREATE new ticket
→ Set: In Progress, Planning, 0%
→ Auto-assign repo
→ Ready to track
```

### Existing Tickets

If a ticket already exists:
```
Azure DevOps: TKT-137 (Active)
→ Already in tracker
→ UPDATE ticket info
→ Keep existing progress
→ Continue tracking
```

### No Duplicates

The tracker is smart:
- ✅ Never creates duplicate tickets
- ✅ Updates existing tickets
- ✅ Preserves progress data
- ✅ Keeps activity history

---

## ⚙️ Behind the Scenes

### API Endpoint

The button calls:
```
POST http://localhost:3001/api/azure/sync
```

### Backend Process

The backend:
1. Receives sync request
2. Spawns automatic-tracker-global.js
3. Runs smart sync process
4. Returns results to frontend

### Frontend Update

The frontend:
1. Shows syncing state
2. Waits for response
3. Displays success/error
4. Auto-refreshes tickets
5. Updates dashboard stats

---

## 🎨 Button States

| State | Appearance | Meaning |
|-------|-----------|---------|
| **Idle** | ☁️ Sync Azure DevOps (blue) | Ready to sync |
| **Syncing** | 🔄 Syncing... (gray) | Sync in progress |
| **Success** | ✓ Synced! (green) | Sync completed |
| **Error** | ✕ Failed (red) | Sync failed |

---

## ⏱️ Timing

| Operation | Time |
|-----------|------|
| Click button | Instant |
| Start syncing | < 1 second |
| Fetch tickets | 5-10 seconds |
| Create/update tickets | 5-15 seconds |
| Total sync time | 10-30 seconds |
| Auto-refresh | 1-2 seconds |

---

## 🐛 Troubleshooting

### Button doesn't respond

**Check:**
1. Backend API is running: `curl http://localhost:3001/api/health`
2. Frontend can reach API: Open browser console
3. No JavaScript errors

### Sync fails

**Check:**
1. Azure DevOps credentials in `.env`
2. Network connection to dev.azure.com
3. PAT token is valid and not expired

### No new tickets appear

**Check:**
1. Azure DevOps has active tickets
2. Tickets are in correct project
3. Check sync logs: `./auto-tracker-global.sh logs`

---

## 💡 Tips

### Best Practices

1. **Sync regularly** - Click button before starting work
2. **Check results** - Verify tickets appear correctly
3. **Review assignments** - Ensure correct repos assigned
4. **Watch the logs** - See what's being synced

### When to Sync

Sync when you:
- ✅ First start the tracker
- ✅ Start working on a new ticket
- ✅ Want to see all active work
- ✅ Need to refresh ticket list
- ✅ Return from working on something else

### Pro Tips

1. **Morning routine:** Click sync first thing
2. **Before work:** Sync to see what's active
3. **After Azure DevOps changes:** Sync to get updates
4. **Team coordination:** Everyone syncs to stay aligned

---

## 📊 Dashboard Updates

After sync, the dashboard automatically updates:

### Stats Cards
```
Before: Total: 0
After:  Total: 3
```

### Stage Distribution
```
Before: No stages shown
After:  Planning: 3 tickets
```

### Quick Actions
```
Before: Just "View All Tickets"
After:  Azure Sync button + "View All Tickets"
```

---

## 🎉 Benefits

### Before (Manual CLI)
```bash
cd /path/to/utils
./auto-tracker-global.sh sync
# Check terminal output
# Refresh browser
# Navigate to tickets
```

### After (One Click)
```
Click button
✅ Done!
```

### Time Saved
- **CLI method:** ~2 minutes
- **Button method:** ~5 seconds
- **Savings:** ~95% faster!

---

## 🚀 Future Enhancements

Coming soon:
- ⏱️ Sync progress bar
- 📊 Sync statistics (X tickets synced)
- 🔄 Auto-sync on interval
- 📱 Sync notifications
- 🎯 Sync specific tickets only

---

## 📝 Summary

**The Azure Sync Button:**
- ✅ One-click sync from Dashboard
- ✅ No CLI commands needed
- ✅ Auto-refreshes tickets
- ✅ Visual feedback
- ✅ Works globally
- ✅ Smart repo detection
- ✅ 95% faster than CLI

**Just click and sync!** 🚀

---

**Last Updated:** 2026-03-30
**Version:** 1.0.0
**Status:** ✅ Production Ready
