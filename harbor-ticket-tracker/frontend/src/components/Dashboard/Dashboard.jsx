import { Link } from 'react-router-dom'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import './Dashboard.css'

const API_BASE_URL = 'http://localhost:3001/api'

function Dashboard({ stats, stageDistribution, onRefresh }) {
  const [syncStatus, setSyncStatus] = useState('idle') // idle, syncing, success, error
  const [syncMessage, setSyncMessage] = useState('')

  const handleAzureSync = async () => {
    setSyncStatus('syncing')
    setSyncMessage('Syncing with Azure DevOps...')

    // Show loading toast
    const toastId = toast.loading('☁️ Syncing with Azure DevOps...', {
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        fontWeight: '600'
      }
    })

    try {
      const response = await fetch(`${API_BASE_URL}/azure/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()

      // Dismiss loading toast
      toast.dismiss(toastId)

      if (result.success || response.ok) {
        setSyncStatus('success')

        // Show success toast with details
        const synced = result.synced || 0
        const updated = result.updated || 0
        const total = result.total || synced + updated

        toast.success(
          `☁️ Sync completed! ${total} ticket${total !== 1 ? 's' : ''} synced (${synced} new, ${updated} updated)`,
          {
            duration: 4000,
            position: 'top-right',
            style: {
              background: 'linear-gradient(135deg, #10b981, #059669)',
              fontWeight: '600',
              borderRadius: '8px',
              padding: '14px 24px',
              fontSize: '0.95rem'
            }
          }
        )

        // Refresh tickets after sync
        if (onRefresh) {
          setTimeout(() => {
            onRefresh()
          }, 1000)
        }

        // Reset status after 3 seconds
        setTimeout(() => {
          setSyncStatus('idle')
          setSyncMessage('')
        }, 3000)
      } else {
        setSyncStatus('error')

        // Show error toast
        toast.error(`❌ Sync failed: ${result.error || 'Unknown error'}`, {
          duration: 5000,
          position: 'top-right',
          style: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            fontWeight: '600',
            borderRadius: '8px',
            padding: '14px 24px'
          }
        })

        setTimeout(() => {
          setSyncStatus('idle')
          setSyncMessage('')
        }, 3000)
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(toastId)

      setSyncStatus('error')

      toast.error(`❌ Error: ${error.message}`, {
        duration: 5000,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          fontWeight: '600',
          borderRadius: '8px',
          padding: '14px 24px'
        }
      })

      setTimeout(() => {
        setSyncStatus('idle')
        setSyncMessage('')
      }, 3000)
    }
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview of all tickets and their status</p>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-value stat-total">{stats.total}</div>
          <div className="stat-card-label">Total Tickets</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value stat-pending">{stats.pending}</div>
          <div className="stat-card-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value stat-in-progress">{stats.inProgress}</div>
          <div className="stat-card-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value stat-completed">{stats.completed}</div>
          <div className="stat-card-label">Completed</div>
        </div>
      </div>

      {/* Stage Distribution */}
      <div className="card mb-4">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Stage Distribution
        </h2>
        <div className="stage-distribution">
          {stageDistribution.map((stage) => (
            <div key={stage.name} className="stage-item">
              <div className="stage-info">
                <span className="stage-name">{stage.name}</span>
                <span className="stage-count">{stage.count} tickets</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(stage.count / stats.total) * 100 || 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Quick Actions
        </h2>
        <div className="quick-actions">
          <button
            onClick={handleAzureSync}
            disabled={syncStatus === 'syncing'}
            className={`btn ${syncStatus === 'syncing' ? 'btn-disabled' : 'btn-azure'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              borderRadius: '8px',
              border: 'none',
              cursor: syncStatus === 'syncing' ? 'not-allowed' : 'pointer',
              background: syncStatus === 'syncing'
                ? 'linear-gradient(135deg, #6b7280, #4b5563)'
                : syncStatus === 'success'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : syncStatus === 'error'
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #0078d4, #106ebe)',
              color: 'white',
              transition: 'all 0.2s'
            }}
          >
            {syncStatus === 'syncing' ? (
              <>
                <span className="spinner" style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                Syncing...
              </>
            ) : syncStatus === 'success' ? (
              '✓ Synced!'
            ) : syncStatus === 'error' ? (
              '✕ Failed'
            ) : (
              <>
                <span style={{ fontSize: '1.2rem' }}>☁️</span>
                Sync Azure DevOps
              </>
            )}
          </button>

          {syncMessage && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              borderRadius: '6px',
              background: syncStatus === 'success'
                ? 'rgba(16, 185, 129, 0.1)'
                : syncStatus === 'error'
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(59, 130, 246, 0.1)',
              color: syncStatus === 'success'
                ? '#10b981'
                : syncStatus === 'error'
                ? '#ef4444'
                : '#3b82f6',
              fontSize: '0.875rem',
              border: `1px solid ${syncStatus === 'success'
                ? '#10b981'
                : syncStatus === 'error'
                ? '#ef4444'
                : '#3b82f6'
              }`
            }}>
              {syncMessage}
            </div>
          )}

          <Link to="/tickets" className="btn btn-primary" style={{ marginLeft: '0' }}>
            View All Tickets
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .btn-azure:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
        }

        .btn-disabled {
          opacity: 0.6;
        }
      `}</style>
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
            iconTheme: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.8)'
            },
            style: {
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)'
            }
          }
        }}
      />
    </div>
  )
}

export default Dashboard
