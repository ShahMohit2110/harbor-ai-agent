import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import https from 'https'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Data storage (in-memory for now, can be upgraded to database)
let tickets = []
let dataFilePath = join(__dirname, '../data/tickets-data.json')

// Load data from file on startup
function loadData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
      tickets = data.tickets || []

      // ✅ MIGRATION: Convert old global activities array to ticket-specific activities
      if (data.activities && Array.isArray(data.activities)) {
        console.log(`🔄 Migrating ${data.activities.length} activities from global array to ticket-specific structure...`)

        // Initialize activities array for each ticket if not exists
        tickets.forEach(ticket => {
          if (!ticket.activities) {
            ticket.activities = []
          }
        })

        // Migrate activities to their respective tickets
        let migratedCount = 0
        data.activities.forEach(activity => {
          const ticket = tickets.find(t => t.id === activity.ticketId)
          if (ticket) {
            // Add activity to the ticket's activities array
            ticket.activities.push(activity)
            migratedCount++
          }
        })

        // Sort activities by timestamp (newest first) for each ticket
        tickets.forEach(ticket => {
          if (ticket.activities) {
            ticket.activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          }
        })

        console.log(`✅ Migrated ${migratedCount} activities to ticket-specific structure`)

        // Save the migrated data immediately
        saveData()
      }

      // Ensure all tickets have activities array
      tickets.forEach(ticket => {
        if (!ticket.activities) {
          ticket.activities = []
        }
      })

      const totalActivities = tickets.reduce((sum, ticket) => sum + (ticket.activities?.length || 0), 0)
      console.log(`✅ Loaded ${tickets.length} tickets with ${totalActivities} activities`)
    } else {
      // Initialize with sample data
      initializeSampleData()
    }
  } catch (error) {
    console.error('Error loading data:', error)
    initializeSampleData()
  }
}

// Save data to file (new format - activities nested in tickets)
function saveData() {
  try {
    const dataDir = join(__dirname, '../data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    // Save only tickets (activities are now nested inside each ticket)
    fs.writeFileSync(dataFilePath, JSON.stringify({ tickets }, null, 2))
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
      harborAgentActive: false,
      // ✅ UPDATED: Lowercase keys for phaseSummaries
      phaseSummaries: {
        "analysis": "Analyzed OAuth2 requirements and selected providers",
        "planning": "Initial planning and architecture design completed",
        "development": "Implementing authentication flow",
        "testing": ""
      },
      activities: [
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
    },
    {
      id: "TKT-002",
      title: "Create Real-Time Notification System",
      description: "Build WebSocket-based notification system for real-time updates across all services.",
      status: "Pending",
      // ✅ UPDATED: New starting stage is 'Analysis'
      stage: "Analysis",
      priority: "High",
      assignedRepos: ["harborNotificationSvc", "harborSocketSvc"],
      assignee: "Jane Smith",
      createdAt: now,
      updatedAt: now,
      estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 15,
      tags: ["websocket", "notifications", "real-time"],
      harborAgentActive: false,
      // ✅ UPDATED: Lowercase keys for phaseSummaries
      phaseSummaries: {
        "analysis": "Analyzing WebSocket architecture and requirements",
        "planning": "Requirements gathering completed",
        "development": "",
        "testing": ""
      },
      activities: []
    },
    {
      id: "TKT-003",
      title: "Database Schema Optimization",
      description: "Optimize database queries and add proper indexing for improved performance.",
      status: "Completed",
      stage: "Testing",
      priority: "Medium",
      assignedRepos: ["harborDatabaseSvc"],
      assignee: "Mike Johnson",
      createdAt: now,
      updatedAt: now,
      estimatedCompletion: now,
      progress: 100,
      tags: ["database", "optimization", "performance"],
      harborAgentActive: false,
      // ✅ UPDATED: Lowercase keys for phaseSummaries
      phaseSummaries: {
        "analysis": "Analyzed query patterns and access frequency",
        "planning": "Identified slow queries and bottlenecks",
        "development": "Added indexes and optimized queries",
        "testing": "Performance testing completed - 50% improvement"
      },
      activities: []
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
  const totalActivities = tickets.reduce((sum, ticket) => sum + (ticket.activities?.length || 0), 0)
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ticketsCount: tickets.length,
    activitiesCount: totalActivities
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
  const { id, title, description, agentDescription, priority, assignedRepos, assignee, tags, phaseSummaries } = req.body

  // Check if ticket already exists
  const existingTicket = tickets.find(t => t.id === id)
  if (existingTicket) {
    // Update existing ticket (but preserve original description)
    if (agentDescription) {
      existingTicket.agentDescription = agentDescription
    }
    // Only update other fields if explicitly provided
    if (title) existingTicket.title = title
    if (priority) existingTicket.priority = priority
    if (assignedRepos) existingTicket.assignedRepos = assignedRepos
    if (assignee) existingTicket.assignee = assignee
    if (tags) existingTicket.tags = tags
    // ✅ NEW: Update phaseSummaries if provided
    if (phaseSummaries) {
      existingTicket.phaseSummaries = {
        ...(existingTicket.phaseSummaries || {}),
        ...phaseSummaries
      }
    }

    existingTicket.updatedAt = new Date().toISOString()

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
    // Initialize activities array if not exists
    if (!existingTicket.activities) {
      existingTicket.activities = []
    }
    existingTicket.activities.unshift(activity)

    saveData()

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
    description: description || '',  // Original Azure DevOps description
    agentDescription: agentDescription || '',  // Agent's description/updates
    status: 'Pending',
    // ✅ FIXED: New tickets start with 'Admin' stage (progress=0%, no work started yet)
    stage: 'Admin',
    priority: priority || 'Medium',
    assignedRepos: assignedRepos || [],
    assignee: assignee || 'Unassigned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 0,
    tags: tags || [],
    // ✅ FIXED: Agent is NOT active yet for Pending tickets (becomes active at 5%)
    harborAgentActive: false,
    // ✅ Initialize phaseSummaries with all stages (lowercase keys)
    phaseSummaries: phaseSummaries || {
      "admin": "",
      "analysis": "",
      "planning": "",
      "development": "",
      "testing": ""
    },
    // ✅ Initialize activities array
    activities: []
  }

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: newTicket.id,
    timestamp: new Date().toISOString(),
    action: "Ticket Created",
    description: "Harbor Agent created new ticket",
    user: "Harbor Agent",
    // ✅ FIXED: Use 'Admin' as initial stage for Pending tickets
    stage: "Admin"
  }
  newTicket.activities.unshift(activity)

  tickets.push(newTicket)
  saveData()

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

  const { progress, stage, status, message, phaseSummary } = req.body

  // ✅ UPDATED: Auto-sync stage based on progress with new stage sequence
  // New sequence: Admin → Analysis → Planning → Development → Testing
  const progressStageMap = {
    // 0% → Admin (starting stage - ticket just synced)
    [0]: 'Admin',
    // 1-9% → Admin (awaiting analysis)
    // 10% → Analysis (Admin complete, moving to Analysis)
    // 10-24% → Analysis (analyzing requirements)
    // 25% → Planning (Analysis complete, moving to Planning)
    // 26-49% → Planning (planning implementation)
    // 50% → Development (Planning complete, moving to Development)
    // 51-74% → Development (implementing)
    // 75% → Testing (Development complete, moving to Testing)
    // 76-99% → Testing (testing and validation)
    // 100% → Testing (complete)
  }

  // ✅ CRITICAL FIX: Helper function to determine stage from progress
  // Progress mapping - Stage completes when NEXT stage threshold is reached:
  // 0% = Pending (no stage active)
  // 1-9% = Admin active (agent started working)
  // 10-24% = Analysis active (Admin complete at 10%)
  // 25-49% = Planning active (Analysis complete at 25%)
  // 50-74% = Development active (Planning complete at 50%)
  // 75-99% = Testing active (Development complete at 75%)
  // 100% = Complete (Testing complete)
  const getStageFromProgress = (progress) => {
    if (progress >= 100) return 'Testing'
    if (progress >= 75) return 'Testing'
    if (progress >= 50) return 'Development'
    if (progress >= 25) return 'Planning'
    if (progress >= 10) return 'Analysis'
    if (progress > 0) return 'Admin' // 1-9% = Admin active
    return 'Admin' // 0% = Pending (will show as no active stage in UI)
  }

  // ✅ UPDATED: Initialize phaseSummaries if not exists (with lowercase keys for new stage names)
  // Also handle backward compatibility for existing tickets with capitalized keys
  if (!ticket.phaseSummaries) {
    ticket.phaseSummaries = {
      "admin": "",
      "analysis": "",
      "planning": "",
      "development": "",
      "testing": ""
    }
  }

  // ✅ MIGRATION: Convert old capitalized keys to lowercase for new structure
  // This ensures backward compatibility with existing tickets
  if (ticket.phaseSummaries.Planning !== undefined || ticket.phaseSummaries.Analysis !== undefined) {
    const oldSummaries = ticket.phaseSummaries
    ticket.phaseSummaries = {
      "admin": "",
      "analysis": oldSummaries.Analysis || oldSummaries.analysis || "",
      "planning": oldSummaries.Planning || oldSummaries.planning || "",
      "development": oldSummaries.Development || oldSummaries.development || "",
      "testing": oldSummaries.Testing || oldSummaries.testing || ""
    }
  }

  // Update ticket
  if (progress !== undefined) {
    ticket.progress = progress
    // ✅ CRITICAL FIX: Auto-set stage based on progress (agent drives progress, stage follows)
    // Only if stage is not explicitly provided
    if (stage === undefined) {
      ticket.stage = getStageFromProgress(progress)
    }
  }

  if (stage !== undefined) {
    ticket.stage = stage
  }

  if (status !== undefined) {
    ticket.status = status
  }

  // ✅ FIX: Auto-set status to "In Progress" when progress > 0%
  // This ensures that any progress update (not just start) also updates status correctly
  if (ticket.progress > 0 && ticket.status !== 'Completed' && ticket.status !== 'completed') {
    ticket.status = 'In Progress'
  }

  // ✅ UPDATED: Update phase summary for current stage if provided
  // Uses lowercase key for the stage
  if (phaseSummary) {
    const currentStage = ticket.stage.toLowerCase()
    ticket.phaseSummaries[currentStage] = phaseSummary
  }

  // Update agentDescription with the latest message
  if (message) {
    // Append to existing agentDescription or create new one
    if (ticket.agentDescription) {
      ticket.agentDescription = `${ticket.agentDescription}\n\n${message}`
    } else {
      ticket.agentDescription = message
    }
  }

  // ✅ FIX: Auto-set status to Completed when progress reaches 100%
  // This ensures ticket status reflects completion state
  if (ticket.progress >= 100) {
    ticket.status = 'Completed'
    ticket.stage = 'Testing'
    ticket.harborAgentActive = false
  }

  // ✅ FIX: When status is explicitly set to Completed, auto-set progress and stage
  // This allows manual completion via the UI or complete endpoint
  if (ticket.status === 'Completed' || ticket.status === 'completed') {
    ticket.progress = 100
    ticket.stage = 'Testing'
    ticket.harborAgentActive = false
  }

  ticket.updatedAt = new Date().toISOString()

  // Keep harborAgentActive true for in-progress tickets
  if (ticket.progress < 100 && ticket.status !== 'Completed' && ticket.status !== 'completed') {
    ticket.harborAgentActive = true
  }

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
    // Initialize activities array if not exists
    if (!ticket.activities) {
      ticket.activities = []
    }
    ticket.activities.unshift(activity)
  }

  saveData()

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

  // ✅ FIX: Auto-sync completion fields (progress, stage, status)
  // When status is set to Completed, auto-set progress to 100% and stage to Testing
  if (ticket.status === 'Completed' || ticket.status === 'completed') {
    ticket.progress = 100
    ticket.stage = 'Testing'
    ticket.harborAgentActive = false
  }

  // When progress reaches 100%, auto-set status to Completed and stage to Testing
  if (ticket.progress >= 100) {
    ticket.status = 'Completed'
    ticket.stage = 'Testing'
    ticket.harborAgentActive = false
  }

  // When stage is Testing and status is Completed, ensure progress is 100%
  if (ticket.stage === 'Testing' && (ticket.status === 'Completed' || ticket.status === 'completed')) {
    ticket.progress = 100
    ticket.harborAgentActive = false
  }

  ticket.updatedAt = new Date().toISOString()

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
  // Initialize activities array if not exists
  if (!ticket.activities) {
    ticket.activities = []
  }
  ticket.activities.unshift(activity)

  saveData()

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

  // Note: We don't log activity for deleted tickets since the ticket is gone
  // If we want to keep a record, we'd need a separate "deleted tickets" collection

  saveData()

  res.json({
    success: true,
    message: 'Ticket deleted',
    data: deletedTicket
  })
})

// Get activities for a ticket
app.get('/api/tickets/:id/activities', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id)
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }
  const ticketActivities = ticket.activities || []
  res.json({
    success: true,
    data: ticketActivities,
    count: ticketActivities.length
  })
})

// Get all activities (aggregated from all tickets)
app.get('/api/activities', (req, res) => {
  const allActivities = []
  tickets.forEach(ticket => {
    if (ticket.activities) {
      allActivities.push(...ticket.activities)
    }
  })
  // Sort by timestamp (newest first)
  allActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  res.json({
    success: true,
    data: allActivities,
    count: allActivities.length
  })
})

// Update latest activity with file changes (called by automatic tracker)
app.put('/api/tickets/:id/activities/latest/files', (req, res) => {
  const { id } = req.params
  const { filesChanged, summary } = req.body

  // Find the ticket
  const ticket = tickets.find(t => t.id === id)

  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    })
  }

  // Initialize activities array if not exists
  if (!ticket.activities) {
    ticket.activities = []
  }

  // Find the latest activity for this ticket (first one since activities are sorted newest first)
  const latestActivity = ticket.activities[0]

  if (!latestActivity) {
    return res.status(404).json({
      success: false,
      error: 'No activity found for this ticket'
    })
  }

  // Update the latest activity with file changes
  latestActivity.filesChanged = filesChanged || []
  latestActivity.summary = summary || null

  saveData()

  res.json({
    success: true,
    message: 'File changes added to latest activity',
    data: latestActivity
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

  // ✅ UPDATED: Default to 'Admin' as the starting stage (agent just started)
  const newStage = stage || 'Admin'

  // Update ticket
  ticket.status = 'In Progress'
  ticket.stage = newStage

  // ✅ CRITICAL FIX: Set progress to 5% when agent starts (Admin stage active)
  // This ensures Admin is active at 5%, then completes at 10% when Analysis starts
  // Progress mapping:
  // 0% = Pending (no stage active)
  // 5% = Admin active (agent started working)
  // 10% = Analysis active (Admin complete, documentation analysis)
  // 25% = Planning active (Analysis complete)
  // 50% = Development active (Planning complete)
  // 75% = Testing active (Development complete)
  // 100% = Complete

  if (ticket.progress === 0 || ticket.progress === undefined) {
    if (newStage === 'Admin') {
      ticket.progress = 5   // Agent just started - Admin stage active
    } else if (newStage === 'Analysis') {
      ticket.progress = 10  // Analysis starts - Admin complete
    } else if (newStage === 'Planning') {
      ticket.progress = 25  // Planning starts - Analysis complete
    } else if (newStage === 'Development') {
      ticket.progress = 50  // Development starts - Planning complete
    } else if (newStage === 'Testing') {
      ticket.progress = 75  // Testing starts - Development complete
    } else {
      ticket.progress = 5   // Default to Admin stage starting
    }
  }
  ticket.harborAgentActive = true
  ticket.agentDescription = message || `Harbor Agent started working on ${ticket.title}`
  ticket.updatedAt = new Date().toISOString()

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
  // Initialize activities array if not exists
  if (!ticket.activities) {
    ticket.activities = []
  }
  ticket.activities.unshift(activity)

  saveData()

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
  ticket.stage = 'Testing'
  ticket.progress = 100  // Ensure progress is set to 100%
  ticket.harborAgentActive = false
  ticket.updatedAt = new Date().toISOString()

  // Log activity
  const activity = {
    id: `ACT-${Date.now()}`,
    ticketId: ticketId,
    timestamp: new Date().toISOString(),
    action: "Harbor Agent Completed",
    description: message || `Harbor Agent completed ${ticket.title}`,
    user: "Harbor Agent",
    stage: "Testing",
    filesChanged: req.body.filesChanged || [],
    summary: req.body.summary || null
  }
  // Initialize activities array if not exists
  if (!ticket.activities) {
    ticket.activities = []
  }
  ticket.activities.unshift(activity)

  saveData()

  res.json({
    success: true,
    message: 'Harbor Agent completed ticket',
    data: ticket
  })
})

// Azure DevOps Sync endpoint
app.post('/api/azure/sync', async (req, res) => {
  try {
    // Load environment variables
    const envPath = join(__dirname, '../.env')
    let AZURE_DEVOPS_PAT, AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT

    // Try to load from .env file
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        const value = valueParts.join('=').trim()
        if (key && value && !key.startsWith('#')) {
          if (key.trim() === 'AZURE_DEVOPS_PAT') AZURE_DEVOPS_PAT = value
          if (key.trim() === 'AZURE_DEVOPS_ORG') AZURE_DEVOPS_ORG = value
          if (key.trim() === 'AZURE_DEVOPS_PROJECT') AZURE_DEVOPS_PROJECT = value
        }
      })
    }

    // Use process.env as fallback
    AZURE_DEVOPS_PAT = AZURE_DEVOPS_PAT || process.env.AZURE_DEVOPS_PAT
    AZURE_DEVOPS_ORG = AZURE_DEVOPS_ORG || process.env.AZURE_DEVOPS_ORG
    AZURE_DEVOPS_PROJECT = AZURE_DEVOPS_PROJECT || process.env.AZURE_DEVOPS_PROJECT

    if (!AZURE_DEVOPS_PAT || !AZURE_DEVOPS_ORG || !AZURE_DEVOPS_PROJECT) {
      return res.status(400).json({
        success: false,
        error: 'Azure DevOps credentials not configured'
      })
    }

    const auth = Buffer.from(`:${AZURE_DEVOPS_PAT}`).toString('base64')

    // WIQL Query to fetch active tickets
    const wiqlQuery = {
      query: `
        SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType],
               [Microsoft.VSTS.Common.Priority], [System.AssignedTo],
               [System.Description], [System.Tags], [System.AreaPath],
               [System.IterationPath], [Microsoft.VSTS.Common.ValueArea],
               [Microsoft.VSTS.Common.ActivatedDate]
        FROM WorkItems
        WHERE [System.TeamProject] = '${AZURE_DEVOPS_PROJECT}'
          AND [System.State] = 'Active'
          AND [System.WorkItemType] IN ('User Story', 'Task', 'Bug')
        ORDER BY [Microsoft.VSTS.Common.Priority] ASC, [System.ChangedDate] ASC
      `
    }

    // Function to make HTTPS request to Azure DevOps
    function makeAzureRequest(apiPath, method = 'GET', body = null) {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'dev.azure.com',
          path: `/${AZURE_DEVOPS_ORG}/${apiPath}`,
          method: method,
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }

        if (body) {
          options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body))
        }

        const req = https.request(options, (res) => {
          let data = ''
          res.on('data', (chunk) => { data += chunk })
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try {
                resolve(JSON.parse(data))
              } catch (e) {
                resolve(data)
              }
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`))
            }
          })
        })

        req.on('error', reject)

        if (body) {
          req.write(JSON.stringify(body))
        }

        req.end()
      })
    }

    // Execute WIQL query
    const queryResult = await makeAzureRequest(
      `${AZURE_DEVOPS_PROJECT}/_apis/wit/wiql?api-version=6.0`,
      'POST',
      wiqlQuery
    )

    if (!queryResult.workItems || queryResult.workItems.length === 0) {
      return res.json({
        success: true,
        message: 'No active tickets found in Azure DevOps',
        synced: 0
      })
    }

    // Get work item IDs
    const workItemIds = queryResult.workItems.map(wi => wi.id)

    // Batch fetch work item details
    const batchSize = 200
    const batches = []
    for (let i = 0; i < workItemIds.length; i += batchSize) {
      batches.push(workItemIds.slice(i, i + batchSize))
    }

    let allTickets = []
    for (const batch of batches) {
      const ids = batch.join(',')
      const detailsResult = await makeAzureRequest(
        `${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems?ids=${ids}&$expand=all&api-version=6.0`
      )
      if (detailsResult.value) {
        allTickets = allTickets.concat(detailsResult.value)
      }
    }

    // Process and sync tickets
    let synced = 0
    let updated = 0

    for (const task of allTickets) {
      const fields = task.fields
      const ticketId = `TKT-${task.id}`
      const title = fields['System.Title'] || 'No Title'
      const description = fields['System.Description'] || ''
      const priority = fields['Microsoft.VSTS.Common.Priority'] || 3
      const areaPath = fields['System.AreaPath'] || ''

      // Determine repo from area path
      let assignedRepos = []
      const areaLower = areaPath.toLowerCase()
      if (areaLower.includes('harborjobsvc') || areaLower.includes('job')) {
        assignedRepos = ['harborJobSvc']
      } else if (areaLower.includes('harborusersvc') || areaLower.includes('user')) {
        assignedRepos = ['harborUserSvc']
      } else if (areaLower.includes('harborwebsite') || areaLower.includes('website')) {
        assignedRepos = ['harborWebsite']
      }

      // Check if ticket exists
      const existingTicket = tickets.find(t => t.id === ticketId)

      if (existingTicket) {
        // Update existing ticket
        Object.assign(existingTicket, {
          title,
          description,
          priority: priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low',
          assignedRepos,
          updatedAt: new Date().toISOString()
        })
        updated++
      } else {
        // Create new ticket
        const newTicket = {
          id: ticketId,
          title,
          description,
          status: 'Pending',
          stage: 'Admin',
          priority: priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low',
          assignedRepos,
          assignee: 'Harbor Agent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 0,
          tags: ['azure-devops', 'auto-synced'],
          // ✅ FIXED: Agent is NOT active yet for Pending tickets
          harborAgentActive: false,
          // ✅ Initialize phaseSummaries for all stages
          phaseSummaries: {
            "admin": "",
            "analysis": "",
            "planning": "",
            "development": "",
            "testing": ""
          },
          activities: []
        }

        // Log activity
        const activity = {
          id: `ACT-${Date.now()}`,
          ticketId,
          timestamp: new Date().toISOString(),
          action: "Ticket Created",
          description: "Azure DevOps ticket synced automatically",
          user: "Azure DevOps",
          stage: "Admin"
        }
        newTicket.activities.unshift(activity)

        tickets.push(newTicket)

        synced++
      }
    }

    saveData()

    res.json({
      success: true,
      message: `Synced ${synced} new tickets, updated ${updated} existing tickets`,
      synced,
      updated,
      total: synced + updated
    })

  } catch (error) {
    console.error('Azure sync error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Start Automatic Tracker (for real-time file changes capture)
let trackerProcess = null

function startAutomaticTracker() {
  try {
    const trackerPath = join(__dirname, 'utils/automatic-tracker-global.js')

    // Check if tracker file exists
    if (!fs.existsSync(trackerPath)) {
      console.log('⚠️  Automatic tracker not found, skipping...')
      return
    }

    console.log('🔄 Starting Automatic Tracker...')

    // Spawn the tracker process
    trackerProcess = spawn('node', [trackerPath, 'start'], {
      cwd: __dirname,
      detached: false,
      stdio: 'ignore'
    })

    trackerProcess.on('error', (error) => {
      console.error('❌ Failed to start automatic tracker:', error.message)
    })

    trackerProcess.on('exit', (code, signal) => {
      if (code !== 0 && code !== null) {
        console.log(`⚠️  Automatic tracker exited with code ${code}`)
      }
      console.log('🔄 Automatic tracker stopped')
    })

    // Give it a moment to start
    setTimeout(() => {
      if (trackerProcess.pid) {
        console.log(`✅ Automatic tracker started (PID: ${trackerProcess.pid})`)
      }
    }, 2000)

  } catch (error) {
    console.error('❌ Error starting automatic tracker:', error.message)
  }
}

// Cleanup function to stop tracker when server stops
function cleanup() {
  if (trackerProcess) {
    console.log('🛑 Stopping automatic tracker...')
    trackerProcess.kill('SIGTERM')
    trackerProcess = null
  }
}

// Handle shutdown signals
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down gracefully...')
  cleanup()
  process.exit(0)
})

process.on('SIGTERM', () => {
  cleanup()
  process.exit(0)
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
║  Azure Sync:       http://localhost:${PORT}/api/azure/sync        ║
║                                                                ║
║  ✅ Ready to integrate Harbor Agent with Ticket Tracker UI    ║
║  ✅ Azure DevOps sync endpoint active                          ║
║  🔄 Automatic tracker starting...                              ║
╚════════════════════════════════════════════════════════════════╝
  `)

  // Start automatic tracker
  startAutomaticTracker()
})
