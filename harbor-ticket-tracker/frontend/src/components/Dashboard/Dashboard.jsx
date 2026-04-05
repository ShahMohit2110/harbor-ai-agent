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
        background: 'linear-gradient(to bottom, rgba(94, 106, 210, 0.15), rgba(94, 106, 210, 0.05))',
        color: '#EDEDEF',
        fontWeight: '600',
        border: '1px solid rgba(94, 106, 210, 0.3)'
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
              background: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
              color: '#EDEDEF',
              fontWeight: '600',
              borderRadius: '12px',
              padding: '14px 24px',
              fontSize: '0.95rem',
              border: '1px solid rgba(34, 197, 94, 0.3)'
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
            background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
            color: '#EDEDEF',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '14px 24px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
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
        <h2 className="card-title">Quick Actions</h2>
        <div className="quick-actions">
          <button
            onClick={handleAzureSync}
            disabled={syncStatus === 'syncing'}
            className={`btn-azure-sync ${syncStatus === 'syncing' ? '' : syncStatus === 'success' ? 'btn-success' : syncStatus === 'error' ? 'btn-error' : ''}`}
            {...(syncStatus === 'syncing' ? { disabled: true } : {})}
          >
            {syncStatus === 'syncing' ? (
              <>
                <span className="spinner"></span>
                Syncing...
              </>
            ) : syncStatus === 'success' ? (
              <>✓ Synced!</>
            ) : syncStatus === 'error' ? (
              <>✕ Failed</>
            ) : (
              <>
                <span>☁️</span>
                Sync Azure DevOps
              </>
            )}
          </button>

          {syncMessage && (
            <div className={`sync-message sync-message-${syncStatus}`}>
              {syncMessage}
            </div>
          )}

          <Link to="/tickets" className="btn-view-tickets">
            View All Tickets
          </Link>
        </div>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
            color: '#EDEDEF',
            borderRadius: '12px',
            fontWeight: '500',
            padding: '14px 20px',
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
            iconTheme: {
              primary: '#5E6AD2',
              secondary: '#fff'
            },
            style: {
              background: 'linear-gradient(to bottom, rgba(94, 106, 210, 0.15), rgba(94, 106, 210, 0.05))',
              border: '1px solid rgba(94, 106, 210, 0.3)'
            }
          }
        }}
      />
    </div>
  )
}

export default Dashboard
