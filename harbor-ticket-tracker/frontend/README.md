# 🎯 Harbor Ticket Tracker UI

A modern, real-time ticket tracking dashboard built with React.js and Vite. Features a beautiful dark theme, live updates, and comprehensive ticket management capabilities.

## 🚀 Features

### Core Functionality
- ✅ **Real-Time Updates** - Live ticket status and progress updates every 5 seconds
- 📊 **Dashboard Overview** - Visual statistics and stage distribution
- 🎫 **Ticket Management** - Complete ticket listing with advanced filtering
- 📄 **Detailed Ticket View** - In-depth ticket information with activity timeline
- 🎨 **Modern Dark Theme** - Premium, eye-friendly dark UI design
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

### UI Components
- **Dashboard** - Overview with stats cards and stage distribution
- **Ticket List** - Searchable, filterable table with all tickets
- **Ticket Detail** - Comprehensive view with progress tracking
- **Stage Stepper** - Visual 5-stage progress indicator
- **Activity Timeline** - Complete history of ticket changes
- **Status Badges** - Color-coded status and priority indicators
- **Progress Bars** - Animated progress visualization

### Data Management
- **Local JSON Storage** - No backend required
- **Sample Data Included** - 8 pre-configured tickets with full activity logs
- **Real-Time Simulation** - Automatic progress updates and stage transitions

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to the project directory:**
   ```bash
   cd harbor-ticket-tracker-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

## 🎯 Usage

### Dashboard
- View overall ticket statistics
- Check stage distribution
- Navigate to detailed views

### Ticket List
- **Search** - Filter tickets by ID, title, or description
- **Filter by Status** - All, Pending, In Progress, Completed
- **Filter by Stage** - Planning, Analysis, Development, Testing, Deployment
- **Filter by Priority** - High, Medium, Low
- **Click on any ticket** - View detailed information

### Ticket Detail
- View complete ticket information
- Track progress through 5 stages
- Monitor activity timeline
- See assigned repositories and tags

### Real-Time Toggle
- Toggle live updates on/off from the header
- Watch progress update automatically
- See status changes in real-time

## 🎨 Customization

### Adding New Tickets

Edit `src/data/tickets.json`:

```json
{
  "id": "TKT-009",
  "title": "Your Ticket Title",
  "description": "Ticket description",
  "status": "Pending",
  "stage": "Planning",
  "priority": "High",
  "assignedRepos": ["repo1", "repo2"],
  "assignee": "John Doe",
  "createdAt": "2026-03-28T09:00:00Z",
  "updatedAt": "2026-03-28T09:00:00Z",
  "estimatedCompletion": "2026-04-05T18:00:00Z",
  "progress": 0,
  "tags": ["tag1", "tag2"]
}
```

### Adding Activity Logs

Edit `src/data/activityLogs.json`:

```json
{
  "id": "ACT-012",
  "ticketId": "TKT-009",
  "timestamp": "2026-03-28T10:00:00Z",
  "action": "Status Update",
  "description": "Activity description",
  "user": "John Doe",
  "stage": "Planning"
}
```

### Modifying Real-Time Update Interval

Edit `src/App.jsx`:

```javascript
const interval = setInterval(() => {
  simulateRealTimeUpdates()
}, 5000) // Change 5000 to desired interval in milliseconds
```

### Customizing Colors

Edit `src/App.css` - modify CSS variables:

```css
:root {
  --accent-primary: #6366f1;    /* Primary accent color */
  --accent-secondary: #8b5cf6;  /* Secondary accent color */
  --bg-primary: #0a0e1a;        /* Main background */
  /* ... more colors ... */
}
```

## 📁 Project Structure

```
harbor-ticket-tracker-ui/
├── src/
│   ├── components/
│   │   ├── Dashboard/         # Dashboard components
│   │   ├── TicketList/        # Ticket list components
│   │   ├── TicketDetail/      # Ticket detail components
│   │   └── Shared/            # Shared components (Header, Sidebar)
│   ├── data/
│   │   ├── tickets.json       # Ticket data
│   │   └── activityLogs.json  # Activity logs
│   ├── App.jsx               # Main app component
│   ├── App.css               # Global styles
│   └── main.jsx              # Entry point
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Features Highlights

### Real-Time Updates
- Automatic progress increments
- Stage transitions based on progress
- Status updates
- Timestamp tracking

### Visual Elements
- Animated progress bars with shimmer effect
- Smooth transitions and hover effects
- Color-coded badges and tags
- Responsive grid layouts

### User Experience
- Intuitive navigation
- Fast search and filtering
- Clear visual hierarchy
- Accessible design

## 🚀 Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📝 Ticket Stages

Tickets progress through 5 stages:

1. **Planning** (0-10% progress)
2. **Analysis** (10-40% progress)
3. **Development** (40-80% progress)
4. **Testing** (80-95% progress)
5. **Deployment** (95-100% progress)

## 🎯 Status Types

- **Pending** - Ticket not yet started
- **In Progress** - Work actively being done
- **Completed** - Ticket finished

## 🏷️ Priority Levels

- **High** - Urgent, needs immediate attention
- **Medium** - Standard priority
- **Low** - Can be addressed later

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of the Harbor Service ecosystem.

---

**Built with ❤️ using React + Vite**

**Last Updated:** March 2026
