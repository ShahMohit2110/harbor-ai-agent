import { useState, useEffect, useRef, useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import CreateProjectModal from './CreateProjectModal'
import './Projects.css'

const API_BASE_URL = 'http://localhost:3001/api'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 })
  const lastFetchTime = useRef(0)
  const isPageVisible = useRef(true)

  // Load projects (optimized)
  const loadProjects = useCallback(async () => {
    // ✅ OPTIMIZED: Prevent rapid-fire requests
    const now = Date.now()
    if (now - lastFetchTime.current < 2000) { // Minimum 2 seconds between requests
      return
    }
    lastFetchTime.current = now

    // ✅ OPTIMIZED: Only fetch when page is visible
    if (!isPageVisible.current) return

    try {
      const response = await fetch(`${API_BASE_URL}/projects`)
      const result = await response.json()

      if (result.success) {
        // ✅ OPTIMIZED: Only update if data changed
        if (result.data.length !== projects.length) {
          setProjects(result.data)
        }
        // Load stats
        const statsResponse = await fetch(`${API_BASE_URL}/projects/stats/summary`)
        const statsResult = await statsResponse.json()
        if (statsResult.success) {
          setStats(statsResult.data)
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }, [projects.length])

  // Initial load
  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // Page visibility handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // ✅ OPTIMIZED: Real-time updates with reduced frequency
  useEffect(() => {
    // ✅ CHANGED: Poll every 15 seconds instead of 3 seconds (5x less frequent)
    const interval = setInterval(() => {
      if (isPageVisible.current) {
        loadProjects()
      }
    }, 15000) // 15 seconds instead of 3

    return () => clearInterval(interval)
  }, [loadProjects])

  const handleCreateProject = async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`✅ Project "${projectData.projectName}" created successfully!`)
        setShowCreateModal(false)
        loadProjects()
      } else {
        toast.error(`❌ Failed to create project: ${result.error}`)
      }
    } catch (error) {
      toast.error(`❌ Error: ${error.message}`)
    }
  }

  const handleDeleteProject = async (projectId, projectName) => {
    return new Promise((resolve) => {
      toast((t) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '320px' }}>
          <span style={{ fontSize: '1rem', lineHeight: '1.5', color: '#EDEDEF' }}>
            Are you sure you want to delete "{projectName}"?
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              onClick={async () => {
                toast.dismiss(t.id)
                try {
                  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
                    method: 'DELETE'
                  })
                  const result = await response.json()

                  if (result.success) {
                    toast.success(`✅ Project "${projectName}" deleted`)
                    loadProjects()
                    resolve(true)
                  } else {
                    toast.error(`❌ Failed to delete: ${result.error}`)
                    resolve(false)
                  }
                } catch (error) {
                  toast.error(`❌ Error: ${error.message}`)
                  resolve(false)
                }
              }}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: '600',
                cursor: 'pointer'
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
                cursor: 'pointer'
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
          padding: '20px 24px'
        }
      })
    })
  }

  const handleCompleteOnboarding = async (projectId, projectName, onboardingTicketId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`✅ Onboarding completed for "${projectName}"!`)
        loadProjects()
      } else {
        toast.error(`❌ Failed: ${result.error}`)
      }
    } catch (error) {
      toast.error(`❌ Error: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="projects">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading Projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="projects">
      <div className="projects-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Manage your repositories and onboarding</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="projects-stats">
        <div className="stat-card">
          <div className="stat-card-value stat-total">{stats.total}</div>
          <div className="stat-card-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value stat-completed">{stats.completed}</div>
          <div className="stat-card-label">Onboarded</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value stat-pending">{stats.pending}</div>
          <div className="stat-card-label">Pending</div>
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <h2>No Projects Yet</h2>
          <p>Create a project to start tracking onboarding and documentation setup</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Your First Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.projectId} className="project-card">
              <div className="project-card-header">
                <h3 className="project-name">{project.projectName}</h3>
                <span className={`badge ${project.onboardingCompleted ? 'badge-completed' : 'badge-pending'}`}>
                  {project.onboardingCompleted ? 'Onboarded' : 'Pending'}
                </span>
              </div>

              <div className="project-card-body">
                <div className="project-info">
                  <span className="project-label">Repository:</span>
                  <span className="project-value">{project.repoPath}</span>
                </div>

                {project.description && (
                  <div className="project-info">
                  <span className="project-label">Description:</span>
                  <span className="project-value">{project.description}</span>
                </div>
                )}

                <div className="project-info">
                  <span className="project-label">Created:</span>
                  <span className="project-value">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {project.onboardingTicketId && (
                  <div className="project-info">
                    <span className="project-label">Onboarding Ticket:</span>
                    <a
                      href={`/ticket/${project.onboardingTicketId}`}
                      className="ticket-link"
                    >
                      {project.onboardingTicketId}
                    </a>
                  </div>
                )}
              </div>

              <div className="project-card-footer">
                {!project.onboardingCompleted && (
                  <button
                    className="btn-complete-onboarding"
                    onClick={() => handleCompleteOnboarding(project.projectId, project.projectName, project.onboardingTicketId)}
                    title="Mark onboarding as complete"
                  >
                    ✓ Complete Onboarding
                  </button>
                )}
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteProject(project.projectId, project.projectName)}
                  title="Delete project"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />
      )}

      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
          color: '#EDEDEF',
          borderRadius: '12px',
          padding: '14px 20px'
        }
      }} />
    </div>
  )
}

export default Projects
