import { useState, useEffect, useRef, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import TicketList from './components/TicketList/TicketList'
import TicketDetail from './components/TicketDetail/TicketDetail'
import Projects from './components/Projects/Projects'
import RevenueStrategy from './components/RevenueStrategy/RevenueStrategy'
import Sidebar from './components/Shared/Sidebar'
import Header from './components/Shared/Header'
import BackgroundBlobs from './components/Shared/BackgroundBlobs'
import './App.css'
import toast, { Toaster } from 'react-hot-toast'

const API_BASE_URL = 'http://localhost:3001/api'

function App() {
  const [tickets, setTickets] = useState([])
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastFetchTime = useRef(0)
  const isPageVisible = useRef(true)

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Load initial data from API
  useEffect(() => {
    loadTickets()
  }, [])

  // Page visibility handler - pause polling when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Optimized real-time updates from API
  useEffect(() => {
    if (!isRealTimeEnabled) return

    // ✅ OPTIMIZED: Increased polling interval to 10 seconds to reduce CPU usage
    // Only poll when page is visible to save resources
    const interval = setInterval(() => {
      if (isPageVisible.current) {
        loadTickets()
      }
    }, 10000) // ✅ CHANGED: Poll every 10 seconds (was 2 seconds) - 5x less frequent!

    return () => clearInterval(interval)
  }, [isRealTimeEnabled])

  const loadTickets = useCallback(async () => {
    // ✅ OPTIMIZED: Prevent rapid-fire requests with throttling
    const now = Date.now()
    if (now - lastFetchTime.current < 1000) { // Minimum 1 second between requests
      return
    }
    lastFetchTime.current = now

    try {
      const response = await fetch(`${API_BASE_URL}/tickets`)
      const result = await response.json()

      if (result.success) {
        // ✅ OPTIMIZED: Only update if data actually changed (cheap comparison first)
        setTickets(prevTickets => {
          // Quick check - if length changed, data definitely changed
          if (result.data.length !== prevTickets.length) {
            return result.data
          }

          // ✅ OPTIMIZED: Only deep compare if necessary (check progress/status)
          // This is much faster than full JSON.stringify
          const hasChanges = result.data.some((newTicket, index) => {
            const oldTicket = prevTickets[index]
            return !oldTicket ||
              newTicket.progress !== oldTicket.progress ||
              newTicket.status !== oldTicket.status ||
              newTicket.stage !== oldTicket.stage
          })

          return hasChanges ? result.data : prevTickets
        })
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
  }, [])

  const deleteTicket = async (ticketId) => {
    return new Promise((resolve) => {
      // Show warning toast first
      toast((t) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '320px' }}>
          <span style={{ fontSize: '1rem', lineHeight: '1.5', color: '#EDEDEF' }}>
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
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.3), 0 4px 12px rgba(239, 68, 68, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 0 0 1px rgba(239, 68, 68, 0.5), 0 6px 16px rgba(239, 68, 68, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 0 0 1px rgba(239, 68, 68, 0.3), 0 4px 12px rgba(239, 68, 68, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
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
                color: '#8A8F98',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.target.style.color = '#EDEDEF'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.color = '#8A8F98'
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
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
          color: '#EDEDEF',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 64px rgba(0, 0, 0, 0.3)',
          maxWidth: '500px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
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

        // Show success toast
        toast.success('🗑️ Ticket deleted successfully', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
            color: '#EDEDEF',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '14px 20px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff'
          }
        })

        return true
      } else {
        // Show error toast
        toast.error(`❌ Failed to delete ticket: ${result.error || 'Unknown error'}`, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
            color: '#EDEDEF',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '14px 20px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
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
          background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
          color: '#EDEDEF',
          fontWeight: '600',
          borderRadius: '12px',
          padding: '14px 20px',
          border: '1px solid rgba(239, 68, 68, 0.3)'
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
    }
  }

  const getStageDistribution = () => {
    const stages = {}
    tickets.forEach(ticket => {
      stages[ticket.stage] = (stages[ticket.stage] || 0) + 1
    })

    // Convert object to array format expected by Dashboard
    return Object.entries(stages).map(([name, count]) => ({
      name,
      count
    }))
  }

  const handleTicketCreated = (newTicket) => {
    setTickets(prev => [...prev, newTicket])
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading Harbor Ticket Tracker...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Connection Error</h2>
          <p className="error-message">{error}</p>
          <button 
            className="error-button"
            onClick={() => {
              setError(null)
              setLoading(true)
              loadTickets()
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="app">
        <BackgroundBlobs />
        <Header
          isRealTimeEnabled={isRealTimeEnabled}
          onToggleRealTime={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
          onToggleMobileMenu={handleToggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="app-container">
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            onCloseMobileMenu={handleCloseMobileMenu}
          />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<Dashboard stats={getTicketStats()} stageDistribution={getStageDistribution()} onRefresh={loadTickets} />}
              />
              <Route
                path="/tickets"
                element={<TicketList tickets={tickets} onDeleteTicket={deleteTicket} onTicketCreated={handleTicketCreated} />}
              />
              <Route
                path="/ticket/:id"
                element={<TicketDetail tickets={tickets} onDeleteTicket={deleteTicket} />}
              />
              <Route
                path="/projects"
                element={<Projects />}
              />
              <Route
                path="/revenue-strategy"
                element={<RevenueStrategy />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
            color: '#EDEDEF',
            borderRadius: '12px',
            padding: '14px 20px',
            fontWeight: '500',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2)'
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff'
            },
            style: {
              background: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            },
            style: {
              background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }
          },
          loading: {
            style: {
              background: 'linear-gradient(to bottom, rgba(94, 106, 210, 0.15), rgba(94, 106, 210, 0.05))',
              border: '1px solid rgba(94, 106, 210, 0.3)'
            }
          }
        }}
      />
    </BrowserRouter>
  )
}

export default App
