# 🧪 Quick Test Guide - Harbor Ticket Tracker

**For:** Mohit
**Date:** 2026-03-30
**Purpose:** Test the fixes yourself

---

## 🎯 What I Fixed

I've created an **Automatic Tracker** that:
- ✅ Detects when agent works on tickets
- ✅ Tracks Git commits automatically
- ✅ Updates ticket progress in real-time
- ✅ Records file changes
- ✅ No manual API calls needed!

---

## 🚀 How to Test (5 Minutes)

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
║  Health check:     http://localhost:3001/api/health            ║
║  Get tickets:      http://localhost:3001/api/tickets           ║
║                                                                ║
║  ✅ Ready to integrate Harbor Agent with Ticket Tracker UI    ║
╚════════════════════════════════════════════════════════════════╝
```

---

### Step 2: Start the Automatic Tracker (Terminal 2)

```bash
cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend/src/utils
./auto-tracker.sh start
```

**You should see:**
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

ℹ️  Commands:
  ./auto-tracker.sh status  - Check tracker status
  ./auto-tracker.sh logs    - View tracker logs
  ./auto-tracker.sh stop    - Stop the tracker

✅ Tracker is now running!
```

---

### Step 3: Check Status (Terminal 2)

```bash
./auto-tracker.sh status
```

**You should see:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Harbor Agent Automatic Tracker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Automatic tracker is running

PID: 12345
Log file: /tmp/harbor-agent-tracker.log

Recent activity:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2026-03-30T...] [INFO] Starting automatic tracking...
[2026-03-30T...] [SUCCESS] Connected to Ticket Tracker API
[2026-03-30T...] [INFO] Checking for progress...
[2026-03-30T...] [INFO] Found active ticket: TKT-137
[2026-03-30T...] [INFO] Monitoring repo: /path/to/harborJobSvc

✅ Ticket Tracker API is running

📊 Harbor Agent Automatic Tracker Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 🟢 Running
Current Ticket: TKT-137
Current Repo: /Users/mohitshah/.../harborJobSvc
Current Progress: 0%
Last Commit: abc123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎫 Active Ticket in Tracker:
  ID: TKT-137
  Title: Update create-counter-offer API...
  Status: In Progress
  Stage: Development
  Progress: 0%
```

---

### Step 4: Test Automatic Updates (Terminal 3)

Now let's test if it actually works by making a commit:

```bash
# Navigate to the repo that TKT-137 is assigned to
cd /Users/mohitshah/Documents/HarborService/harborJobSvc

# Make a dummy change
echo "# Test commit for tracker" >> README.md

# Commit it
git add README.md
git commit -m "Test: Verify tracker detects commits"
```

---

### Step 5: Verify Auto-Update (Terminal 2)

**Option A: Wait 30 seconds** (tracker polls every 30s)

**Option B: Force immediate check:**
```bash
./auto-tracker.sh check
```

**You should see:**
```
ℹ️  Manual progress check...
ℹ️  Checking for progress...
ℹ️  Found active ticket: TKT-137
ℹ️  Detected 1 new commit(s)
ℹ️  Progress: 0% -> 15%
ℹ️  Files changed: 1 (+1, -0)
✅ Updated TKT-137 progress to 15%
```

---

### Step 6: Check the UI

Open **http://localhost:5173** in your browser.

**You should see:**
- ✅ TKT-137 progress bar now at **15%** (was 0%)
- ✅ New activity in timeline: "Auto-detected progress: 1 new commit(s)"
- ✅ File changes showing: `README.md` modified

---

### Step 7: Make Another Commit

```bash
# In Terminal 3 (harborJobSvc)
echo "Another test" >> test.txt
git add test.txt
git commit -m "Test: Second commit"
```

**Check tracker:**
```bash
# In Terminal 2
./auto-tracker.sh check
```

**Progress should now be 30%** (15% per commit)

---

### Step 8: Check Logs

```bash
./auto-tracker.sh logs
```

**You should see all activity:**
```
[2026-03-30T...] [INFO] Checking for progress...
[2026-03-30T...] [INFO] Found active ticket: TKT-137
[2026-03-30T...] [SUCCESS] Updated TKT-137 progress to 15%
[2026-03-30T...] [INFO] Files changed: 1 (+1, -0)
[2026-03-30T...] [INFO] Checking for progress...
[2026-03-30T...] [SUCCESS] Updated TKT-137 progress to 30%
[2026-03-30T...] [INFO] Files changed: 1 (+1, -0)
```

---

### Step 9: Complete the Test

When you're done testing, clean up:

```bash
# Stop the tracker
./auto-tracker.sh stop

# Or keep it running for real work!
```

---

## 🎯 Expected Results

### ✅ Success Indicators:

1. **Tracker starts without errors**
2. **Detects active ticket (TKT-137)**
3. **Detects your test commits**
4. **Updates progress from 0% → 15% → 30%**
5. **UI shows updated progress**
6. **File changes appear in UI**
7. **Activities logged in timeline**

### ❌ If Something Goes Wrong:

**Error: "Tracker already running"**
```bash
./auto-tracker.sh stop
./auto-tracker.sh start
```

**Error: "API not running"**
- Make sure backend is running (Step 1)
- Check http://localhost:3001/api/health

**No progress updates:**
- Check logs: `./auto-tracker.sh logs`
- Verify you're committing to the right repo
- Make sure ticket has `harborAgentActive: true`

---

## 📊 What to Verify

After testing, verify these work:

- [ ] Tracker starts successfully
- [ ] Detects TKT-137 as active ticket
- [ ] Detects commits in harborJobSvc
- [ ] Updates progress (15% per commit)
- [ ] Records file changes
- [ ] UI updates in real-time
- [ ] Activities logged correctly
- [ ] Logs show all activity

---

## 🚀 Next Steps (After Testing)

### If Everything Works:

1. **Keep tracker running** for actual agent work
2. **Start agent work** on TKT-137
3. **Watch it auto-update** as you commit
4. **Manually complete** when done:
   ```bash
   node ticketTrackerIntegration.js complete "TKT-137" "Work verified and completed"
   ```

### If Something Doesn't Work:

1. **Check the logs:** `./auto-tracker.sh logs`
2. **Review troubleshooting** in `AUTOMATIC_TRACKER_SETUP.md`
3. **Check API is running:** `curl http://localhost:3001/api/health`
4. **Let me know the error message**

---

## 📁 Files Created

1. **`automatic-tracker.js`** - Main tracking script
2. **`auto-tracker.sh`** - Wrapper script for easy use
3. **`AUTOMATIC_TRACKER_SETUP.md`** - Full setup guide
4. **`TICKET_TRACKER_ISSUE_ANALYSIS.md`** - Root cause analysis
5. **`fix-stuck-ticket.sh`** - Script to fix stuck tickets

---

## 🎉 Success Checklist

After testing, you should have:

- ✅ Automatic tracker running
- ✅ Real-time progress updates
- ✅ File changes tracked
- ✅ UI showing live updates
- ✅ No more manual API calls needed!

---

## 💡 Pro Tips

1. **Start tracker first** before agent work
2. **Keep it running** in background
3. **Check status** periodically: `./auto-tracker.sh status`
4. **Monitor logs** if issues: `./auto-tracker.sh logs`
5. **Complete manually** when work is done

---

**Happy Testing! 🚀**

If everything works, your synchronization issue is **PERMANENTLY FIXED** ✅

---

**Questions? Check:**
- `AUTOMATIC_TRACKER_SETUP.md` - Full documentation
- `TICKET_TRACKER_ISSUE_ANALYSIS.md` - Root cause analysis
- Or just ask me! 😊
