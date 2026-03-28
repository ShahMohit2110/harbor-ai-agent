import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard({ stats, stageDistribution }) {
  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview of all tickets and their status</p>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-value">{stats.total}</div>
          <div className="stat-card-label">Total Tickets</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            {stats.pending}
          </div>
          <div className="stat-card-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
            {stats.inProgress}
          </div>
          <div className="stat-card-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            {stats.completed}
          </div>
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
          <Link to="/tickets" className="btn btn-primary">
            View All Tickets
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
