import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import TicketList from './components/TicketList/TicketList'
import TicketDetail from './components/TicketDetail/TicketDetail'
import Sidebar from './components/Shared/Sidebar'
import Header from './components/Shared/Header'
import './App.css'
import toast, { Toaster } from 'react-hot-toast'

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
      loadActivities() // Fetch latest activities (including file changes)
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
    return new Promise((resolve) => {
      // Show warning toast first
      toast((t) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '320px' }}>
          <span style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Are you sure you want to delete this ticket?
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              onClick={async () => {
                toast.dismiss(t.id)
                const success = await handleDeleteConfirmed(ticketId)
                resolve(success)
              }}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                resolve(false)
              }}
              style={{
                background: 'transparent',
                color: '#d1d5db',
                border: '1px solid #4b5563',
                borderRadius: '6px',
                padding: '8px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#6b7280'
                e.target.style.color = '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#4b5563'
                e.target.style.color = '#d1d5db'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          color: 'white',
          borderRadius: '12px',
          padding: '20px 24px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          maxWidth: '500px'
        }
      })
    })
  }

  const handleDeleteConfirmed = async (ticketId) => {
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

        // Show success toast
        toast.success('🗑️ Ticket deleted successfully', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: 'linear-gradient(135deg, #10b981, #059669)',
            fontWeight: '600',
            borderRadius: '8px',
            padding: '12px 20px'
          },
          iconTheme: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.8)'
          }
        })

        return true
      } else {
        // Show error toast
        toast.error(`❌ Failed to delete ticket: ${result.error || 'Unknown error'}`, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            fontWeight: '600',
            borderRadius: '8px',
            padding: '12px 20px'
          }
        })
        return false
      }
    } catch (error) {
      console.error('Error deleting ticket:', error)
      toast.error('❌ Failed to delete ticket. Check API connection.', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          fontWeight: '600',
          borderRadius: '8px',
          padding: '12px 20px'
        }
      })
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
                element={<Dashboard stats={getTicketStats()} stageDistribution={getStageDistribution()} onRefresh={() => { loadTickets(); loadActivities(); }} />}
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
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: '500',
            padding: '12px 20px'
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.8)'
            },
            style: {
              background: 'linear-gradient(135deg, #10b981, #059669)'
            }
          },
          error: {
            iconTheme: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.8)'
            },
            style: {
              background: 'linear-gradient(135deg, #ef4444, #dc2626)'
            }
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)'
            }
          }
        }}
      />
    </BrowserRouter>
  )
}

export default App
