# 🚀 Quick Start - Harbor AI Agent (v11.2.0)

## ⚡ Setup in 3 Seconds

```bash
# 1. Navigate to harbor-ai directory
cd harbor-ai

# 2. Run setup script
source setup-dynamic-paths.sh

# 3. Done! Start using the agent
```

**That's it!** All paths are now configured automatically.

---

## 📝 What Just Happened?

The `setup-dynamic-paths.sh` script:
- ✅ Auto-detected your Harbor AI directory
- ✅ Auto-detected the tracker utils path
- ✅ Set environment variables
- ✅ Verified all critical files exist
- ✅ Ready to work on ANY system!

---

## 🎯 Common Commands

### **Start Automatic Tracker**
```bash
cd "$HARBOR_TRACKER_UTILS"
node automatic-tracker-global.js start
```

### **Create Ticket Manually**
```bash
cd "$HARBOR_TRACKER_UTILS"
./mandatory-ticket-creation.sh 12345 "Task Title" "Description" "harborUserSvc"
```

### **Update Progress**
```bash
cd "$HARBOR_TRACKER_UTILS"
node ticketTrackerIntegration.js update "TKT-123" 50 "Development" "In progress"
```

---

## 🔧 Troubleshooting

**Problem:** Commands don't work
```bash
# Solution: Make sure you ran setup script
source setup-dynamic-paths.sh

# Verify variables are set
echo $HARBOR_TRACKER_UTILS
```

**Problem:** Variables not saved after closing terminal
```bash
# Solution: Add to your ~/.bashrc or ~/.zshrc
echo "source /path/to/harbor-ai/setup-dynamic-paths.sh" >> ~/.bashrc
source ~/.bashrc
```

---

## 📚 Full Documentation

- **Dynamic Paths Guide:** `DYNAMIC-PATHS-MIGRATION-GUIDE.md`
- **Changes Summary:** `DYNAMIC-PATHS-CHANGES-SUMMARY.md`
- **Workflow:** `workflows/global-agent-workflow-v11.md`
- **Progress Guide:** `workflows/PROGRESS-UPDATE-MANDATORY.md`

---

## ✅ What Changed?

All hardcoded paths are now **dynamic**:
- ❌ Before: `/Users/mohitshah/Documents/HarborService/harbor-ai/...`
- ✅ After: `${HARBOR_TRACKER_UTILS}` or relative paths

**Benefits:**
- Works on ANY system
- Works from ANY directory
- No manual configuration needed
- Clone repo anywhere - it just works!

---

**Version:** 11.2.0
**Last Updated:** 2026-03-30
**Status:** ✅ Production Ready
