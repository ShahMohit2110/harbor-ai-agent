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
      stage: "Testing",
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
  const { id, title, description, agentDescription, priority, assignedRepos, assignee, tags } = req.body

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
    description: description || '',  // Original Azure DevOps description
    agentDescription: agentDescription || '',  // Agent's description/updates
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

  // ✅ FIX: Auto-sync stage based on progress (agent controls progress, stage follows)
  const progressStageMap = {
    // 0% → Planning
    [0]: 'Planning',
    // 1-32% → Planning (not yet started Analysis)
    // 33% → Analysis (Analysis complete)
    // 34-66% → Analysis (in Development)
    // 67% → Development (Development complete)
    // 68-99% → Development (in Testing)
    // 100% → Testing (complete)
  }

  // Helper function to determine stage from progress
  const getStageFromProgress = (progress) => {
    if (progress >= 100) return 'Testing'
    if (progress >= 67) return 'Development'
    if (progress >= 33) return 'Analysis'
    return 'Planning'
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

  // Update agentDescription with the latest message
  if (message) {
    // Append to existing agentDescription or create new one
    if (ticket.agentDescription) {
      ticket.agentDescription = `${ticket.agentDescription}\n\n${message}`
    } else {
      ticket.agentDescription = message
    }
  }

  // ✅ FIX: Auto-sync ALL completion-related fields
  // When progress reaches 100%, auto-set stage and status
  if (ticket.progress >= 100) {
    ticket.stage = 'Testing'
    ticket.status = 'Completed'
    ticket.harborAgentActive = false
  }

  // ✅ FIX: When status is set to Completed, auto-set progress and stage
  if (ticket.status === 'Completed' || ticket.status === 'completed') {
    ticket.progress = 100
    ticket.stage = 'Testing'
    ticket.harborAgentActive = false
  }

  ticket.updatedAt = new Date().toISOString()

  // Keep harborAgentActive true for in-progress tickets
  if (ticket.progress < 100 && ticket.status !== 'Completed') {
    ticket.harborAgentActive = true
  }

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

// Update latest activity with file changes (called by automatic tracker)
app.put('/api/tickets/:id/activities/latest/files', (req, res) => {
  const { id } = req.params
  const { filesChanged, summary } = req.body

  // Find the latest activity for this ticket
  const latestActivity = activities.find(a => a.ticketId === id)

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

  const newStage = stage || 'Planning'  // ✅ FIX: Default to 'Planning', not 'Development'

  // Update ticket
  ticket.status = 'In Progress'
  ticket.stage = newStage
  // ✅ CRITICAL FIX: Don't auto-set progress based on stage
  // Let agent control progress through explicit updateProgress() calls
  // Only set progress if it's currently 0 (first time starting)
  if (ticket.progress === 0 || ticket.progress === undefined) {
    ticket.progress = 0  // Start at 0%, agent will update as it progresses
  }
  ticket.harborAgentActive = true
  ticket.agentDescription = message || `Harbor Agent started working on ${ticket.title}`
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
  ticket.stage = 'Testing'
  ticket.progress = 100  // Ensure progress is set to 100%
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
    stage: "Testing",
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
          stage: 'Planning',
          priority: priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low',
          assignedRepos,
          assignee: 'Harbor Agent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 0,
          tags: ['azure-devops', 'auto-synced'],
          harborAgentActive: true
        }

        tickets.push(newTicket)

        // Log activity
        const activity = {
          id: `ACT-${Date.now()}`,
          ticketId,
          timestamp: new Date().toISOString(),
          action: "Ticket Created",
          description: "Azure DevOps ticket synced automatically",
          user: "Azure DevOps",
          stage: "Planning"
        }
        activities.unshift(activity)

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
