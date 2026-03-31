/**
 * Harbor Agent Integration Helper
 *
 * This file provides functions for Harbor Agent to communicate with the Ticket Tracker API
 *
 * USAGE in Harbor Agent workflow:
 *
 * import { HarborAgentTracker } from './harbor-ticket-api/src/utils/harborAgentHelper.js'
 *
 * // When agent starts working on a ticket
 * await HarborAgentTracker.startTicket('TKT-001', 'Development', 'Started implementing authentication')
 *
 * // Update progress as agent works
 * await HarborAgentTracker.updateProgress('TKT-001', 45, 'Development', 'Implemented OAuth flow')
 *
 * // When agent completes a ticket
 * await HarborAgentTracker.completeTicket('TKT-001', 'Successfully completed authentication flow')
 */

const API_BASE_URL = 'http://localhost:3001/api'

class HarborAgentTracker {
  /**
   * Call the API
   */
  static async callAPI(endpoint, method = 'GET', body = null) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'API call failed')
      }

      return data
    } catch (error) {
      console.error(`❌ Harbor Agent Tracker Error:`, error.message)
      // Don't throw - allow agent to continue even if tracking fails
      return null
    }
  }

  /**
   * When Harbor Agent STARTS working on a ticket
   *
   * @param {string} ticketId - Ticket ID (e.g., "TKT-001")
   * @param {string} stage - Current stage (Planning, Analysis, Development, Testing, Deployment)
   * @param {string} message - Activity message
   * @param {object} fileChanges - File changes data { filesChanged: [], summary: {} }
   *
   * Example:
   * await HarborAgentTracker.startTicket('TKT-001', 'Development', 'Started implementing user authentication')
   */
  static async startTicket(ticketId, stage = 'Development', message = null, fileChanges = null) {
    console.log(`🎯 Harbor Agent starting ticket: ${ticketId}`)

    const requestBody = {
      ticketId,
      stage,
      message: message || `Harbor Agent started working on ${ticketId}`
    }

    // Add file changes if provided
    if (fileChanges) {
      requestBody.filesChanged = fileChanges.filesChanged || []
      requestBody.summary = fileChanges.summary || null
    }

    const result = await this.callAPI('/harbor-agent/start', 'POST', requestBody)

    if (result) {
      console.log(`✅ Ticket ${ticketId} started successfully`)
    }

    return result
  }

  /**
   * When Harbor Agent UPDATES progress on a ticket
   *
   * @param {string} ticketId - Ticket ID
   * @param {number} progress - Progress percentage (0-100)
   * @param {string} stage - Current stage
   * @param {string} message - Activity message
   * @param {object} fileChanges - File changes data { filesChanged: [], summary: {} }
   *
   * Example:
   * await HarborAgentTracker.updateProgress('TKT-001', 65, 'Development', 'Implemented OAuth flow', {
   *   filesChanged: [{ path: 'file.js', changeType: 'modified', additions: 10, deletions: 5, diff: '...' }],
   *   summary: { totalFiles: 1, additions: 10, deletions: 5 }
   * })
   */
  static async updateProgress(ticketId, progress, stage = null, message = null, fileChanges = null) {
    console.log(`📈 Harbor Agent updating progress: ${ticketId} -> ${progress}%`)

    const requestBody = {
      progress,
      stage,
      message: message || `Progress updated to ${progress}%`
    }

    // Add file changes if provided
    if (fileChanges) {
      requestBody.filesChanged = fileChanges.filesChanged || []
      requestBody.summary = fileChanges.summary || null
      console.log(`📊 Including ${fileChanges.filesChanged?.length || 0} file changes`)
    }

    const result = await this.callAPI(`/tickets/${ticketId}/progress`, 'PUT', requestBody)

    if (result) {
      console.log(`✅ Ticket ${ticketId} progress updated`)
    }

    return result
  }

  /**
   * When Harbor Agent COMPLETES a ticket
   *
   * @param {string} ticketId - Ticket ID
   * @param {string} message - Completion message
   * @param {object} fileChanges - File changes data { filesChanged: [], summary: {} }
   *
   * Example:
   * await HarborAgentTracker.completeTicket('TKT-001', 'Successfully completed authentication flow')
   */
  static async completeTicket(ticketId, message = null, fileChanges = null) {
    console.log(`🎉 Harbor Agent completing ticket: ${ticketId}`)

    const requestBody = {
      ticketId,
      message: message || `Harbor Agent completed ${ticketId}`
    }

    // Add file changes if provided
    if (fileChanges) {
      requestBody.filesChanged = fileChanges.filesChanged || []
      requestBody.summary = fileChanges.summary || null
    }

    const result = await this.callAPI('/harbor-agent/complete', 'POST', requestBody)

    if (result) {
      console.log(`✅ Ticket ${ticketId} completed successfully`)
    }

    return result
  }

  /**
   * Create a new ticket from Azure DevOps
   *
   * @param {object} ticketData - Ticket data from Azure DevOps
   *
   * Example:
   * await HarborAgentTracker.createTicket({
   *   id: 'TKT-004',
   *   title: 'New Feature',
   *   description: 'Implement new feature',
   *   priority: 'High',
   *   assignedRepos: ['harborUserSvc'],
   *   assignee: 'John Doe',
   *   tags: ['feature', 'backend']
   * })
   */
  static async createTicket(ticketData) {
    console.log(`🎫 Creating ticket: ${ticketData.id}`)

    const result = await this.callAPI('/tickets', 'POST', ticketData)

    if (result) {
      console.log(`✅ Ticket ${ticketData.id} created successfully`)
    }

    return result
  }

  /**
   * Get all tickets
   */
  static async getTickets() {
    const result = await this.callAPI('/tickets')
    return result ? result.data : []
  }

  /**
   * Get single ticket
   */
  static async getTicket(ticketId) {
    const result = await this.callAPI(`/tickets/${ticketId}`)
    return result ? result.data : null
  }

  /**
   * Update ticket details
   */
  static async updateTicket(ticketId, updates) {
    console.log(`🔄 Updating ticket: ${ticketId}`)

    const result = await this.callAPI(`/tickets/${ticketId}`, 'PUT', updates)

    if (result) {
      console.log(`✅ Ticket ${ticketId} updated successfully`)
    }

    return result
  }

  /**
   * Delete a ticket
   */
  static async deleteTicket(ticketId) {
    console.log(`🗑️  Deleting ticket: ${ticketId}`)

    const result = await this.callAPI(`/tickets/${ticketId}`, 'DELETE')

    if (result) {
      console.log(`✅ Ticket ${ticketId} deleted successfully`)
    }

    return result
  }
}

export default HarborAgentTracker

// Export for CommonJS (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HarborAgentTracker
}
