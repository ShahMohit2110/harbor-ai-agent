# 🚀 Harbor Agent Automatic Tracker - Setup Guide

**Version:** 1.0.0
**Date:** 2026-03-30
**Status:** Ready to Use ✅

---

## 📋 What This Does

The **Automatic Tracker** solves the synchronization issue by:

1. ✅ **Monitors active tickets** - Detects when agent is working on a ticket
2. ✅ **Tracks Git commits** - Auto-detects new commits in real-time
3. ✅ **Updates progress** - Automatically updates ticket progress (15% per commit)
4. ✅ **Records file changes** - Tracks which files were changed
5. ✅ **Completes tickets** - Auto-marks tickets as complete when work is done

**No more manual updates! The tracker just works.**

---

## 🎯 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Automatic Tracker                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Polls for active tickets every 30 seconds                │
│     ↓                                                        │
│  2. When active ticket found, monitors its repo              │
│     ↓                                                        │
│  3. Detects new Git commits                                  │
│     ↓                                                        │
│  4. Calculates progress (15% per commit, max 95%)            │
│     ↓                                                        │
│  5. Gets file changes from Git diff                          │
│     ↓                                                        │
│  6. Calls Ticket Tracker API to update progress              │
│     ↓                                                        │
│  7. Repeats until ticket is complete                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Step 1: Start the Ticket Tracker Backend

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend
npm run dev
```

**Keep this running!** The tracker API must be available.

### Step 2: Start the Automatic Tracker

In a **new terminal**:

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
./auto-tracker.sh start
```

You should see:
```
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

### Step 3: Verify It's Working

```bash
./auto-tracker.sh status
```

You should see:
```
✅ Automatic tracker is running
✅ Ticket Tracker API is running

📊 Harbor Agent Automatic Tracker Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 🟢 Running
Current Ticket: TKT-137
Current Repo: /Users/mohitshah/.../harborJobSvc
Current Progress: 0%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4: Test It

1. Create a ticket (or use existing active ticket)
2. Make some commits in the assigned repo
3. Wait 30 seconds (or run `./auto-tracker.sh check`)
4. Check the UI at http://localhost:5173
5. See the progress automatically updated! ✅

---

## 🎮 Commands

### Start Tracker
```bash
./auto-tracker.sh start
```
Starts automatic tracking in background.

### Stop Tracker
```bash
./auto-tracker.sh stop
```
Stops automatic tracking.

### Check Status
```bash
./auto-tracker.sh status
```
Shows current tracker status and active ticket.

### View Logs
```bash
./auto-tracker.sh logs
```
Shows live tracker logs (press Ctrl+C to exit).

### Manual Check
```bash
./auto-tracker.sh check
```
Checks for progress once (manual trigger).

### Restart
```bash
./auto-tracker.sh restart
```
Restarts the tracker.

---

## 📊 What Gets Tracked

### Automatic Progress Updates

| Activity | Progress Increase |
|----------|------------------|
| 1 commit | +15% |
| 2 commits | +30% |
| 3 commits | +45% |
| ... | ... |
| Max auto-progress | 95% |

**Note:** We stop at 95% automatically. The last 5% is for manual completion to ensure work is actually done.

### File Changes Tracking

For each commit, the tracker records:
- ✅ Which files were changed
- ✅ Number of additions (green in UI)
- ✅ Number of deletions (red in UI)
- ✅ Total files changed
- ✅ Summary statistics

### Stage Progression

The tracker automatically updates the ticket stage:
- **0-49%:** Development
- **50-74%:** Testing
- **75-95%:** Deployment
- **100%:** Completed (manual)

---

## 🔍 How to Monitor

### Option 1: Status Command
```bash
./auto-tracker.sh status
```

Shows:
- Tracker running status
- Current active ticket
- Current progress
- Recent commits

### Option 2: Live Logs
```bash
./auto-tracker.sh logs
```

Shows real-time tracking activity:
```
[2026-03-30T...] [INFO] Checking for progress...
[2026-03-30T...] [INFO] Found active ticket: TKT-137
[2026-03-30T...] [INFO] Detected 2 new commit(s)
[2026-03-30T...] [SUCCESS] Updated TKT-137 progress to 30%
[2026-03-30T...] [INFO] Files changed: 3 (+45, -12)
```

### Option 3: Ticket Tracker UI

Open http://localhost:5173 and watch:
- Progress bar updating automatically
- Stage changing as work progresses
- File changes appearing in real-time
- Activities being logged

---

## ⚙️ Configuration

You can customize the tracker by editing `automatic-tracker.js`:

```javascript
const CONFIG = {
  checkInterval: 30000,      // How often to check (30 seconds)
  progressPerCommit: 15,     // Progress per commit (15%)
  maxProgress: 95,           // Max auto-progress (95%)
  reposPath: '/Users/mohitshah/Documents/HarborService',
  log: true                  // Enable logging
};
```

### Recommended Settings

| Setting | Value | Description |
|---------|-------|-------------|
| checkInterval | 30000 (30s) | Balance between responsiveness and performance |
| progressPerCommit | 15 | Reasonable progress per commit |
| maxProgress | 95 | Save 5% for manual completion |
| reposPath | Your path | Path to your repositories |

---

## 🐛 Troubleshooting

### Issue: "Automatic tracker is already running"

**Solution:**
```bash
./auto-tracker.sh stop
./auto-tracker.sh start
```

### Issue: "Ticket Tracker API is not running"

**Solution:** Start the backend first:
```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend
npm run dev
```

Then start the tracker again.

### Issue: Tracker not detecting commits

**Solution:** Check that:
1. The ticket has `harborAgentActive: true`
2. The ticket has an assigned repo
3. The repo path is correct in CONFIG
4. You're committing to the right repo

Run manual check:
```bash
./auto-tracker.sh check
```

### Issue: Progress not updating in UI

**Solution:**
1. Check tracker logs: `./auto-tracker.sh logs`
2. Verify API is running: `curl http://localhost:3001/api/health`
3. Check ticket status in API: `curl http://localhost:3001/api/tickets`
4. Refresh browser (Ctrl+Shift+R)

### Issue: Tracker stopped working

**Solution:**
```bash
# Restart the tracker
./auto-tracker.sh restart

# If that doesn't work, check logs
./auto-tracker.sh logs

# Look for errors in the logs
```

---

## 📝 Log Files

### Tracker Log
**Location:** `/tmp/harbor-agent-tracker.log`

Contains:
- All tracker activities
- API calls
- Progress updates
- Error messages

**View with:**
```bash
./auto-tracker.sh logs
# or
tail -f /tmp/harbor-agent-tracker.log
```

### State File
**Location:** `/tmp/harbor-agent-tracker-state.json`

Contains:
- Current ticket ID
- Current repo path
- Last commit hash
- Current progress
- Running status

**View with:**
```bash
cat /tmp/harbor-agent-tracker-state.json
```

---

## 🔄 Workflow Integration

### With Harbor Agent Workflow

The automatic tracker integrates seamlessly with the Harbor Agent workflow:

1. **Phase 0.0:** Agent creates ticket → Tracker detects it ✅
2. **Phase 6:** Agent makes commits → Tracker detects and updates ✅
3. **Phase 10:** Agent completes work → You manually mark 100% ✅

### Manual Completion (Recommended)

Even with automatic tracking, manually complete tickets:

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
node ticketTrackerIntegration.js complete "TKT-137" "Successfully completed"
```

**Why manual completion?**
- Ensures work is actually done
- Allows final verification
- Can add completion notes
- Prevents premature completion

---

## 🎯 Best Practices

### 1. Start Tracker Early

Start the tracker BEFORE agent begins work:
```bash
# 1. Start backend
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend
npm run dev

# 2. Start tracker (in new terminal)
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
./auto-tracker.sh start

# 3. Start agent work
# Now everything is tracked automatically!
```

### 2. Monitor Progress

Check status periodically:
```bash
./auto-tracker.sh status
```

### 3. Review Logs

If something seems off, check logs:
```bash
./auto-tracker.sh logs
```

### 4. Manual Completion

Always manually verify and complete:
```bash
node ticketTrackerIntegration.js complete "TKT-ID" "Verified and completed"
```

---

## 📊 Expected Behavior

### Normal Operation

```
[12:00:00] Starting automatic tracking...
[12:00:00] Connected to Ticket Tracker API
[12:00:30] Checking for progress...
[12:00:30] Found active ticket: TKT-137
[12:00:30] Monitoring repo: /path/to/harborJobSvc
[12:01:00] Checking for progress...
[12:01:00] Detected 1 new commit(s)
[12:01:00] Progress: 0% -> 15%
[12:01:00] Files changed: 2 (+25, -5)
[12:01:00] Updated TKT-137 progress to 15%
[12:01:30] Checking for progress...
[12:01:30] No new commits detected
```

### When Ticket is Completed

```
[12:30:00] Checking for progress...
[12:30:00] Found active ticket: TKT-137
[12:30:00] Progress: 95%
[12:30:30] No new commits detected
[12:31:00] No new commits detected
```

Now you manually complete:
```bash
node ticketTrackerIntegration.js complete "TKT-137" "Work verified"
```

---

## 🚀 Production Deployment

### Run as Background Service

For production, use PM2 or systemd:

#### Using PM2
```bash
# Install PM2
npm install -g pm2

# Start tracker with PM2
pm2 start /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils/automatic-tracker.js --name harbor-auto-tracker -- start

# Check status
pm2 status

# View logs
pm2 logs harbor-auto-tracker

# Stop
pm2 stop harbor-auto-tracker

# Restart
pm2 restart harbor-auto-tracker
```

#### Using systemd (Linux)

Create `/etc/systemd/system/harbor-auto-tracker.service`:
```ini
[Unit]
Description=Harbor Agent Automatic Tracker
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
ExecStart=/usr/bin/node automatic-tracker.js start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable harbor-auto-tracker
sudo systemctl start harbor-auto-tracker
sudo systemctl status harbor-auto-tracker
```

---

## 📈 Monitoring & Maintenance

### Daily Checks

1. **Check tracker is running:**
   ```bash
   ./auto-tracker.sh status
   ```

2. **Check for errors in logs:**
   ```bash
   grep ERROR /tmp/harbor-agent-tracker.log
   ```

3. **Verify API connectivity:**
   ```bash
   curl http://localhost:3001/api/health
   ```

### Weekly Maintenance

1. **Rotate logs:**
   ```bash
   mv /tmp/harbor-agent-tracker.log /tmp/harbor-agent-tracker.log.old
   ```

2. **Clean old state:**
   ```bash
   rm /tmp/harbor-agent-tracker-state.json
   ```

3. **Restart tracker:**
   ```bash
   ./auto-tracker.sh restart
   ```

---

## 🎉 Summary

**The Automatic Tracker:**
- ✅ Solves the synchronization issue
- ✅ Tracks progress automatically
- ✅ Records file changes
- ✅ Requires no manual intervention
- ✅ Runs in background
- ✅ Easy to monitor and manage

**You focus on coding, the tracker handles the rest!**

---

## 📞 Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review tracker logs: `./auto-tracker.sh logs`
3. Check API status: `curl http://localhost:3001/api/health`
4. Review the main analysis: `TICKET_TRACKER_ISSUE_ANALYSIS.md`

---

**Last Updated:** 2026-03-30
**Status:** Production Ready ✅
