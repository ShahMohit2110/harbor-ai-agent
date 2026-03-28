import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import FileChanges from './FileChanges'
import './TicketDetail.css'

function TicketDetail({ tickets, activities, onDeleteTicket }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedStage, setSelectedStage] = useState(null)

  const ticket = useMemo(() => tickets.find((t) => t.id === id), [tickets, id])

  const ticketActivities = useMemo(
    () => activities.filter((a) => a.ticketId === id),
    [activities, id]
  )

  const stages = ['Planning', 'Analysis', 'Development', 'Testing', 'Deployment']

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'badge-pending'
      case 'in progress':
        return 'badge-in-progress'
      case 'completed':
        return 'badge-completed'
      default:
        return 'badge-pending'
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'badge-high'
      case 'medium':
        return 'badge-medium'
      case 'low':
        return 'badge-low'
      default:
        return 'badge-medium'
    }
  }

  const getStageStatus = (stage) => {
    const currentIndex = stages.indexOf(ticket.stage)
    const stageIndex = stages.indexOf(stage)

    if (stageIndex < currentIndex) return 'completed'
    if (stageIndex === currentIndex) return 'active'
    return 'pending'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = () => {
    if (onDeleteTicket) {
      const deleted = onDeleteTicket(id)
      if (deleted) {
        navigate('/tickets')
      }
    }
  }

  if (!ticket) {
    return (
      <div className="ticket-detail">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h2>Ticket Not Found</h2>
          <p>The ticket you're looking for doesn't exist.</p>
          <Link to="/tickets" className="btn btn-primary">
            Back to Tickets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="ticket-detail">
      <div className="detail-header">
        <Link to="/tickets" className="back-link">
          ← Back to Tickets
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h1 className="page-title">{ticket.title}</h1>
            <p className="page-subtitle">{ticket.id}</p>
          </div>
          <button
            onClick={handleDelete}
            className="btn btn-delete"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.625rem 1.25rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.25)'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            🗑️ Delete Ticket
          </button>
        </div>
      </div>

      {/* Stage Stepper */}
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Progress Flow
        </h2>
        <div className="stage-stepper">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage)
            return (
              <div
                key={stage}
                className={`stage-step ${status}`}
                onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
                style={{ cursor: 'pointer' }}
              >
                <div className="stage-step-icon">{index + 1}</div>
                <div className="stage-step-label">{stage}</div>
              </div>
            )
          })}
        </div>
        <div className="current-stage-info">
          <strong>Current Stage:</strong> {ticket.stage}
        </div>
      </div>

      {/* Ticket Details */}
      <div className="detail-grid">
        <div className="card detail-info">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Ticket Information
          </h2>

          <div className="info-row">
            <span className="info-label">Status</span>
            <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Priority</span>
            <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Stage</span>
            <span className="info-value">{ticket.stage}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Assignee</span>
            <span className="info-value">{ticket.assignee}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Created</span>
            <span className="info-value">{formatDate(ticket.createdAt)}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Last Updated</span>
            <span className="info-value">{formatDate(ticket.updatedAt)}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Est. Completion</span>
            <span className="info-value">{formatDate(ticket.estimatedCompletion)}</span>
          </div>

          <div className="info-section">
            <span className="info-label">Description</span>
            <p className="description-text">{ticket.description}</p>
          </div>

          <div className="info-section">
            <span className="info-label">Assigned Repositories</span>
            <div className="tags">
              {ticket.assignedRepos.map((repo) => (
                <span key={repo} className="tag">
                  {repo}
                </span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <span className="info-label">Tags</span>
            <div className="tags">
              {ticket.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="card detail-progress">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Overall Progress
          </h2>
          <div className="progress-display">
            <div className="progress-bar-large">
              <div
                className="progress-bar-fill"
                style={{ width: `${ticket.progress}%` }}
              ></div>
            </div>
            <div className="progress-percentage">{ticket.progress}%</div>
          </div>
          <div className="progress-status">
            {ticket.progress === 100
              ? '✅ Completed'
              : ticket.progress > 50
              ? '🚀 Making great progress!'
              : ticket.progress > 0
              ? '🔄 Work in progress'
              : '📋 Just started'}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card mt-4">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Activity Timeline
        </h2>
        <div className="timeline">
          {ticketActivities.length > 0 ? (
            ticketActivities.map((activity) => (
              <div key={activity.id} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-action">{activity.action}</span>
                    <span className="timeline-time">{formatDate(activity.timestamp)}</span>
                  </div>
                  <p className="timeline-description">{activity.description}</p>
                  <p className="timeline-user">
                    <strong>By:</strong> {activity.user} | <strong>Stage:</strong>{' '}
                    {activity.stage}
                  </p>
                  {/* File Changes */}
                  {(activity.filesChanged && activity.filesChanged.length > 0) && (
                    <FileChanges
                      filesChanged={activity.filesChanged}
                      summary={activity.summary}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No activity recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
