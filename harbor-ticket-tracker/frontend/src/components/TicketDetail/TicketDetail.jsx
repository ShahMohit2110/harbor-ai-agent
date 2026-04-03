import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import FileChanges from './FileChanges'
import './TicketDetail.css'

function TicketDetail({ tickets, onDeleteTicket }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedStage, setSelectedStage] = useState(null)

  const ticket = useMemo(() => tickets.find((t) => t.id === id), [tickets, id])

  // ✅ FIX: Read activities directly from the ticket object instead of filtering global array
  const ticketActivities = useMemo(
    () => ticket?.activities || [],
    [ticket]
  )

  // ✅ UPDATED: New stage sequence - Analysis → Planning → Development → Testing
  const stages = ['Analysis', 'Planning', 'Development', 'Testing']

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
    const progress = ticket.progress || 0

    // ✅ UPDATED: Use progress-based stage completion with new stage sequence
    // This ensures stages light up green incrementally as progress increases

    // If ticket is completed, mark ALL stages as completed
    if (ticket.status === 'Completed' || ticket.status === 'completed') {
      if (stageIndex <= currentIndex) return 'completed'
      return 'pending'
    }

    // ✅ UPDATED: Progress-based completion with new stage sequence:
    // Analysis: complete at 25%+ (stage 1)
    // Planning: complete at 50%+ (stage 2)
    // Development: complete at 75%+ (stage 3)
    // Testing: complete at 100% OR when status is 'Completed' (stage 4)

    if (stage === 'Analysis' && progress >= 25) return 'completed'
    if (stage === 'Planning' && progress >= 50) return 'completed'
    if (stage === 'Development' && progress >= 75) return 'completed'
    if (stage === 'Testing' && (progress >= 100 || ticket.status === 'Completed' || ticket.status === 'completed')) return 'completed'

    // Normal progression for active/in-progress
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

  const handleDelete = async () => {
    if (onDeleteTicket) {
      const deleted = await onDeleteTicket(id)
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

      {/* ✅ UPDATED: Phase Summaries with lowercase keys for new stage sequence */}
      {(ticket.phaseSummaries && Object.keys(ticket.phaseSummaries).some(key => ticket.phaseSummaries[key])) && (
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Phase Summaries
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stages.map((stage) => {
              const stageStatus = getStageStatus(stage)
              // ✅ UPDATED: Use lowercase key for phaseSummaries lookup
              // Also handle backward compatibility for existing tickets with capitalized keys
              const summary = ticket.phaseSummaries?.[stage.toLowerCase()] || ticket.phaseSummaries?.[stage] || ''

              if (!summary && stageStatus === 'pending') return null

              return (
                <div
                  key={stage}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: `1px solid ${
                      stageStatus === 'completed' ? 'rgba(34, 197, 94, 0.3)' :
                      stageStatus === 'active' ? 'rgba(59, 130, 246, 0.3)' :
                      'rgba(156, 163, 175, 0.2)'
                    }`,
                    background: (
                      stageStatus === 'completed' ? 'rgba(34, 197, 94, 0.05)' :
                      stageStatus === 'active' ? 'rgba(59, 130, 246, 0.05)' :
                      'rgba(156, 163, 175, 0.02)'
                    ),
                    borderLeft: `4px solid ${
                      stageStatus === 'completed' ? '#22c55e' :
                      stageStatus === 'active' ? '#3b82f6' :
                      '#9ca3af'
                    }`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1rem' }}>
                      {stage}
                    </strong>
                    <span className={`badge badge-${stageStatus === 'completed' ? 'completed' : stageStatus === 'active' ? 'in-progress' : 'pending'}`}>
                      {stageStatus.charAt(0).toUpperCase() + stageStatus.slice(1)}
                    </span>
                  </div>
                  {summary ? (
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {summary}
                    </p>
                  ) : (
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      {stageStatus === 'pending' ? 'Not started yet' : 'In progress...'}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

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
            <div
              className="description-text"
              dangerouslySetInnerHTML={{ __html: ticket.description }}
            />
          </div>

          {ticket.agentDescription && (
            <div className="info-section" style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderLeft: '4px solid #3b82f6'
            }}>
              <span className="info-label" style={{ color: '#3b82f6', marginBottom: '0.5rem', display: 'block' }}>
                🤖 Agent Updates
              </span>
              <div
                className="description-text"
                style={{ whiteSpace: 'pre-line', color: '#4b5563' }}
                dangerouslySetInnerHTML={{ __html: ticket.agentDescription.replace(/\n\n/g, '<br/><br/>') }}
              />
            </div>
          )}

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
