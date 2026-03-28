import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import TicketList from './components/TicketList/TicketList'
import TicketDetail from './components/TicketDetail/TicketDetail'
import Sidebar from './components/Shared/Sidebar'
import Header from './components/Shared/Header'
import './App.css'

const API_BASE_URL = 'http://localhost:3001/api'

function App() {
  const [tickets, setTickets] = useState([])
  const [activities, setActivities] = useState([])
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load initial data from API
  useEffect(() => {
    loadTickets()
    loadActivities()
  }, [])

  // Real-time updates from API
  useEffect(() => {
    if (!isRealTimeEnabled) return

    const interval = setInterval(() => {
      loadTickets() // Fetch latest data from API
    }, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [isRealTimeEnabled])

  const loadTickets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`)
      const result = await response.json()

      if (result.success) {
        setTickets(result.data)
        setError(null)
      } else {
        setError('Failed to load tickets')
      }
    } catch (error) {
      console.error('Error loading tickets:', error)
      setError('API connection failed. Make sure the API server is running on port 3001')
    } finally {
      setLoading(false)
    }
  }

  const loadActivities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`)
      const result = await response.json()

      if (result.success) {
        setActivities(result.data)
      }
    } catch (error) {
      console.error('Error loading activities:', error)
    }
  }

  const deleteTicket = async (ticketId) => {
    if (!confirm('Are you sure you want to delete this ticket?')) {
      return false
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        // Remove from local state
        setTickets(prev => prev.filter(t => t.id !== ticketId))
        // Reload activities to get deletion log
        loadActivities()
        return true
      } else {
        alert('Failed to delete ticket: ' + result.error)
        return false
      }
    } catch (error) {
      console.error('Error deleting ticket:', error)
      alert('Failed to delete ticket. Check API connection.')
      return false
    }
  }

  const getTicketStats = () => {
    return {
      total: tickets.length,
      pending: tickets.filter(t => t.status === 'Pending').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
      completed: tickets.filter(t => t.status === 'Completed').length,
      highPriority: tickets.filter(t => t.priority === 'High').length
    }
  }

  const getStageDistribution = () => {
    const stages = ['Planning', 'Analysis', 'Development', 'Testing', 'Deployment']
    return stages.map(stage => ({
      name: stage,
      count: tickets.filter(t => t.stage === stage).length
    }))
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading tickets from API...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-error">
        <div className="error-icon">⚠️</div>
        <h2>Connection Error</h2>
        <p>{error}</p>
        <button onClick={loadTickets} className="btn btn-primary">
          Retry Connection
        </button>
        <p className="error-hint">
          Make sure the Harbor Ticket API is running: <br />
          <code>cd harbor-ai/harbor-ticket-api && npm run dev</code>
        </p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          isRealTimeEnabled={isRealTimeEnabled}
          onToggleRealTime={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
        />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<Dashboard stats={getTicketStats()} stageDistribution={getStageDistribution()} />}
              />
              <Route
                path="/tickets"
                element={<TicketList tickets={tickets} onDeleteTicket={deleteTicket} />}
              />
              <Route
                path="/ticket/:id"
                element={<TicketDetail tickets={tickets} activities={activities} onDeleteTicket={deleteTicket} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
