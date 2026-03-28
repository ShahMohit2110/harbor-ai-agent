# 🚀 Quick Start Guide - Harbor Ticket Tracker UI

## ⚡ Fast Setup (3 Steps)

### 1️⃣ Install Dependencies
```bash
cd harbor-ticket-tracker-ui
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open Browser
Navigate to: **http://localhost:5173**

---

## 🎯 What You'll See

### Dashboard (Home Page)
- 📊 Total ticket count
- 🔄 Pending, In Progress, Completed stats
- 📈 Stage distribution with progress bars
- 🎯 Quick action buttons

### All Tickets Page
- 🔍 Search box (search by ID, title, description)
- 🎛️ Filters: Status, Stage, Priority
- 📋 Sortable table with all tickets
- 👆 Click any ticket to view details

### Ticket Detail Page
- 📝 Complete ticket information
- 🔄 5-stage progress stepper
- 📊 Overall progress with animated progress bar
- 📅 Activity timeline with history
- 🏷️ Tags and repository assignments

---

## 🎮 Key Features

### Real-Time Updates (ON by default)
- Toggle in header: **Live** / **Paused**
- Updates every 5 seconds
- Watch progress bars grow
- See status changes automatically
- Stage transitions based on progress

### Dark Theme
- Premium dark UI
- Easy on the eyes
- High contrast
- Smooth animations

### Responsive Design
- Works on desktop, tablet, mobile
- Adaptive layouts
- Touch-friendly interface

---

## 📊 Sample Data Included

- **8 Pre-configured tickets**
- **11 Activity logs**
- **Different statuses and stages**
- **Various priority levels**

---

## 🎨 Customization

### Change Update Speed
Edit `src/App.jsx`, line ~45:
```javascript
}, 5000) // Change this (milliseconds)
```

### Add Your Own Tickets
Edit `src/data/tickets.json`:
```json
{
  "id": "TKT-009",
  "title": "Your Title",
  "status": "Pending",
  "stage": "Planning",
  "priority": "High",
  "progress": 0,
  "assignee": "Your Name",
  "assignedRepos": ["repo1"],
  "tags": ["tag1"]
}
```

---

## 🔧 Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 5173
npx kill-port 5173
# Then run again
npm run dev
```

### Dependencies Issues?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Pages & Routes

| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/tickets` | All Tickets |
| `/ticket/:id` | Ticket Detail |

---

## 🎯 Ticket Stages (Auto-Progression)

1. **Planning** (0-10%)
2. **Analysis** (10-40%)
3. **Development** (40-80%)
4. **Testing** (80-95%)
5. **Deployment** (95-100%)

Tickets automatically move to next stage when progress reaches threshold!

---

## ✨ Pro Tips

1. **Use the search** - Super fast filtering
2. **Watch real-time updates** - Toggle Live mode
3. **Check activity timeline** - Full history
4. **Monitor stage stepper** - Visual progress
5. **Filter by priority** - Focus on what matters

---

## 🚀 Production Build

```bash
npm run build
npm run preview
```

Built files in `dist/` directory.

---

**Ready to track some tickets? 🎉**

Open http://localhost:5173 and enjoy!
