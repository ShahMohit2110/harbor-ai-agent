import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Data storage (in-memory for now, can be upgraded to database)
let tickets = []
let activities = []
let dataFilePath = join(__dirname, '../data/tickets-data.json')

// Load data from file on startup
function loadData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
      tickets = data.tickets || []
      activities = data.activities || []
      console.log(`✅ Loaded ${tickets.length} tickets and ${activities.length} activities`)
    } else {
      // Initialize with sample data
      initializeSampleData()
    }
  } catch (error) {
    console.error('Error loading data:', error)
    initializeSampleData()
  }
}

// Save data to file
function saveData() {
  try {
    const dataDir = join(__dirname, '../data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(dataFilePath, JSON.stringify({ tickets, activities }, null, 2))
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

// Initialize with sample data
function initializeSampleData() {
  const now = new Date().toISOString()

  tickets = [
    {
      id: "TKT-001",
      title: "Implement User Authentication Flow",
      description: "Add OAuth2 authentication with support for Google and GitHub providers. Include session management and token refresh logic.",
      status: "In Progress",
      stage: "Development",
      priority: "High",
      assignedRepos: ["harborUserSvc", "harborApp"],
      assignee: "John Doe",
      createdAt: now,
      updatedAt: now,
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 65,
      tags: ["authentication", "security", "oauth"],
      harborAgentActive: false
    },
    {
      id: "TKT-002",
      title: "Create Real-Time Notification System",
      description: "Build WebSocket-based notification system for real-time updates across all services.",
      status: "Pending",
      stage: "Analysis",
      priority: "High",
      assignedRepos: ["harborNotificationSvc", "harborSocketSvc"],
      assignee: "Jane Smith",
      createdAt: now,
      updatedAt: now,
      estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 15,
      tags: ["websocket", "notifications", "real-time"],
      harborAgentActive: false
    },
    {
      id: "TKT-003",
      title: "Database Schema Optimization",
      description: "Optimize database queries and add proper indexing for improved performance.",
      status: "Completed",
      stage: "Deployment",
      priority: "Medium",
      assignedRepos: ["harborDatabaseSvc"],
      assignee: "Mike Johnson",
      createdAt: now,
      updatedAt: now,
      estimatedCompletion: now,
      progress: 100,
      tags: ["database", "optimization", "performance"],
      harborAgentActive: false
    }
  ]

  activities = [
    {
      id: "ACT-001",
      ticketId: "TKT-001",
      timestamp: now,
      action: "Status Update",
      description: "Ticket created and assigned to John Doe",
      user: "System",
      stage: "Development"
    }
  ]

  saveData()
  console.log('✅ Initialized with sample data')
}

// Load data on startup
loadData()

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ticketsCount: tickets.length,
    activitiesCount: activities.length
  })
})

// Get all tickets
app.get('/api/tickets', (req, res) => {
  res.json({
    success: true,
    data: tickets,
    count: tickets.length
  })
})

// Get single ticket
app.get('/api/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id)
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }
  res.json({
    success: true,
    data: ticket
  })
})

// Create new ticket (called by Harbor Agent when it starts working)
app.post('/api/tickets', (req, res) => {
  const { id, title, description, priority, assignedRepos, assignee, tags } = req.body

  // Check if ticket already exists
  const existingTicket = tickets.find(t => t.id === id)
  if (existingTicket) {
    // Update existing ticket
    Object.assign(existingTicket, req.body)
    existingTicket.updatedAt = new Date().toISOString()
    saveData()

    // Log activity
    const activity = {
      id: `ACT-${Date.now()}`,
      ticketId: id,
      timestamp: new Date().toISOString(),
      action: "Ticket Updated",
      description: "Harbor Agent updated ticket information",
      user: "Harbor Agent",
      stage: existingTicket.stage
    }
    activities.unshift(activity)

    return res.json({
      success: true,
      message: 'Ticket updated',
      data: existingTicket
    })
  }

  // Create new ticket
  const newTicket = {
    id: id || `TKT-${Date.now()}`,
    title: title || 'Untitled Ticket',
    description: description || '',
    status: 'Pending',
    stage: 'Planning',
    priority: priority || 'Medium',
    assignedRepos: assignedRepos || [],
    assignee: assignee || 'Unassigned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 0,
    tags: tags || [],
    harborAgentActive: true
  }

  tickets.push(newTicket)
  saveData()

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: newTicket.id,
    timestamp: new Date().toISOString(),
    action: "Ticket Created",
    description: "Harbor Agent created new ticket",
    user: "Harbor Agent",
    stage: "Planning"
  }
  activities.unshift(activity)

  res.json({
    success: true,
    message: 'Ticket created',
    data: newTicket
  })
})

// Update ticket progress (called by Harbor Agent as it works)
app.put('/api/tickets/:id/progress', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id)
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }

  const { progress, stage, status, message } = req.body

  // Update ticket
  if (progress !== undefined) ticket.progress = progress
  if (stage) ticket.stage = stage
  if (status) ticket.status = status
  ticket.updatedAt = new Date().toISOString()
  ticket.harborAgentActive = true

  saveData()

  // Log activity
  if (message) {
    const activity = {
      id: `ACT-${Date.now()}`,
      ticketId: ticket.id,
      timestamp: new Date().toISOString(),
      action: "Progress Update",
      description: message,
      user: "Harbor Agent",
      stage: ticket.stage,
      filesChanged: req.body.filesChanged || [],
      summary: req.body.summary || null
    }
    activities.unshift(activity)
  }

  res.json({
    success: true,
    message: 'Ticket progress updated',
    data: ticket
  })
})

// Update ticket details
app.put('/api/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id)
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }

  // Update allowed fields
  const allowedUpdates = ['title', 'description', 'status', 'stage', 'priority', 'assignee', 'tags', 'assignedRepos']
  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      ticket[field] = req.body[field]
    }
  })

  ticket.updatedAt = new Date().toISOString()
  saveData()

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: ticket.id,
    timestamp: new Date().toISOString(),
    action: "Ticket Updated",
    description: `Updated ${Object.keys(req.body).join(', ')}`,
    user: "User",
    stage: ticket.stage
  }
  activities.unshift(activity)

  res.json({
    success: true,
    message: 'Ticket updated',
    data: ticket
  })
})

// Delete ticket
app.delete('/api/tickets/:id', (req, res) => {
  const ticketIndex = tickets.findIndex(t => t.id === req.params.id)
  if (ticketIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }

  const deletedTicket = tickets.splice(ticketIndex, 1)[0]
  saveData()

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: req.params.id,
    timestamp: new Date().toISOString(),
    action: "Ticket Deleted",
    description: `Ticket "${deletedTicket.title}" was deleted`,
    user: "User",
    stage: deletedTicket.stage
  }
  activities.unshift(activity)

  res.json({
    success: true,
    message: 'Ticket deleted',
    data: deletedTicket
  })
})

// Get activities for a ticket
app.get('/api/tickets/:id/activities', (req, res) => {
  const ticketActivities = activities.filter(a => a.ticketId === req.params.id)
  res.json({
    success: true,
    data: ticketActivities,
    count: ticketActivities.length
  })
})

// Get all activities
app.get('/api/activities', (req, res) => {
  res.json({
    success: true,
    data: activities,
    count: activities.length
  })
})

// Harbor Agent webhook - When agent starts working on a ticket
app.post('/api/harbor-agent/start', (req, res) => {
  const { ticketId, stage, message } = req.body

  const ticket = tickets.find(t => t.id === ticketId)
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }

  // Update ticket
  ticket.status = 'In Progress'
  ticket.stage = stage || 'Development'
  ticket.harborAgentActive = true
  ticket.updatedAt = new Date().toISOString()

  saveData()

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: ticketId,
    timestamp: new Date().toISOString(),
    action: "Harbor Agent Started",
    description: message || `Harbor Agent started working on ${ticket.title}`,
    user: "Harbor Agent",
    stage: ticket.stage,
    filesChanged: req.body.filesChanged || [],
    summary: req.body.summary || null
  }
  activities.unshift(activity)

  res.json({
    success: true,
    message: 'Harbor Agent started working on ticket',
    data: ticket
  })
})

// Harbor Agent webhook - When agent completes a ticket
app.post('/api/harbor-agent/complete', (req, res) => {
  const { ticketId, message } = req.body

  const ticket = tickets.find(t => t.id === ticketId)
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }

  // Update ticket
  ticket.status = 'Completed'
  ticket.stage = 'Deployment'
  ticket.progress = 100
  ticket.harborAgentActive = false
  ticket.updatedAt = new Date().toISOString()

  saveData()

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: ticketId,
    timestamp: new Date().toISOString(),
    action: "Harbor Agent Completed",
    description: message || `Harbor Agent completed ${ticket.title}`,
    user: "Harbor Agent",
    stage: "Deployment",
    filesChanged: req.body.filesChanged || [],
    summary: req.body.summary || null
  }
  activities.unshift(activity)

  res.json({
    success: true,
    message: 'Harbor Agent completed ticket',
    data: ticket
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    🚀 HARBOR TICKET API                         ║
╠════════════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}                      ║
║  Health check:     http://localhost:${PORT}/api/health            ║
║  Get tickets:      http://localhost:${PORT}/api/tickets           ║
║                                                                ║
║  ✅ Ready to integrate Harbor Agent with Ticket Tracker UI    ║
╚════════════════════════════════════════════════════════════════╝
  `)
})
