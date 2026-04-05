import { useState, useEffect } from 'react'
import './TicketModal.css'

const API_BASE_URL = 'http://localhost:3001/api'

// Available priorities
const PRIORITIES = ['Low', 'Medium', 'High']

function TicketModal({ isOpen, onClose, onTicketCreated, editingTicket = null }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    priority: 'Medium'
  })

  // Reset form when modal opens/closes or editing ticket changes
  useEffect(() => {
    if (isOpen) {
      if (editingTicket) {
        setFormData({
          id: editingTicket.id || '',
          title: editingTicket.title || '',
          description: editingTicket.description || '',
          priority: editingTicket.priority || 'Medium'
        })
      } else {
        setFormData({
          id: `TKT-${Date.now().toString().slice(-4)}`,
          title: '',
          description: '',
          priority: 'Medium'
        })
      }
    }
  }, [isOpen, editingTicket])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      alert('Please enter a ticket title')
      return
    }

    if (!formData.description.trim()) {
      alert('Please enter a ticket description')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          status: 'Pending',
          stage: 'Admin',
          progress: 0,
          assignee: 'Unassigned',
          assignedRepos: [],
          tags: []
        })
      })

      const result = await response.json()

      if (result.success) {
        onTicketCreated(result.data || formData)
        onClose()
      } else {
        alert(`Failed to create ticket: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      alert('Failed to create ticket. Please check API connection.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Ticket ID */}
          <div className="form-group">
            <label htmlFor="id">Ticket ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="TKT-0001"
              required
            />
          </div>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the ticket requirements..."
              rows="6"
              required
            />
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              {PRIORITIES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTicket ? 'Update Ticket' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TicketModal
