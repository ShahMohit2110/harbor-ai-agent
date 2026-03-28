import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './TicketList.css'

function TicketList({ tickets, onDeleteTicket }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Filter and search tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      const matchesStage = stageFilter === 'all' || ticket.stage === stageFilter
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesStage && matchesPriority
    })
  }, [tickets, searchQuery, statusFilter, stageFilter, priorityFilter])

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

  const handleDelete = (ticketId, ticketTitle) => {
    if (onDeleteTicket) {
      onDeleteTicket(ticketId)
    }
  }

  return (
    <div className="ticket-list">
      <h1 className="page-title">All Tickets</h1>
      <p className="page-subtitle">View and manage all tickets across the system</p>

      {/* Search Box */}
      <div className="search-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search tickets by ID, title, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
        >
          <option value="all">All Stages</option>
          <option value="Planning">Planning</option>
          <option value="Analysis">Analysis</option>
          <option value="Development">Development</option>
          <option value="Testing">Testing</option>
          <option value="Deployment">Deployment</option>
        </select>

        <select
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="results-count">
        Showing {filteredTickets.length} of {tickets.length} tickets
      </p>

      {/* Tickets Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Stage</th>
              <th>Priority</th>
              <th>Progress</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <Link
                    to={`/ticket/${ticket.id}`}
                    style={{ color: 'var(--accent-primary)', fontWeight: '600' }}
                  >
                    {ticket.id}
                  </Link>
                </td>
                <td>
                  <div className="ticket-title-cell">
                    <div className="ticket-title">{ticket.title}</div>
                    <div className="ticket-description">{ticket.description}</div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.stage}</td>
                <td>
                  <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${ticket.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{ticket.progress}%</span>
                  </div>
                </td>
                <td>{ticket.assignee}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(ticket.id, ticket.title)}
                    title="Delete ticket"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No tickets found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketList
