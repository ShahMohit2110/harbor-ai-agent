/**
 * File Changes Helper for Harbor Agent
 *
 * Simple utility to help agent report file changes to Ticket Tracker
 * without using git commands (compliant with NO_GIT policy)
 *
 * USAGE:
 * import { createFileChange } from './fileChangesHelper.js'
 *
 * // When agent creates/edits a file
 * const fileChange = createFileChange(
 *   'harborUserSvc/src/controllers/userController.js',
 *   'modified',
 *   45,  // 45 lines added
 *   12,  // 12 lines deleted
 *   '@@ -20,8 +20,53 @@\n+ export const login = async...' // Optional diff
 * )
 */

/**
 * Create a file change object
 *
 * @param {string} path - File path (relative to repo root)
 * @param {string} changeType - Type of change: 'added', 'modified', 'deleted', 'renamed'
 * @param {number} additions - Number of lines added
 * @param {number} deletions - Number of lines deleted
 * @param {string} diff - Optional git diff content
 * @returns {object} File change object
 */
export function createFileChange(path, changeType = 'modified', additions = 0, deletions = 0, diff = '') {
  return {
    path,
    changeType,
    additions,
    deletions,
    diff
  }
}

/**
 * Create a file changes summary
 *
 * @param {array} fileChanges - Array of file change objects
 * @returns {object} Summary object
 */
export function createSummary(fileChanges) {
  return {
    totalFiles: fileChanges.length,
    additions: fileChanges.reduce((sum, f) => sum + (f.additions || 0), 0),
    deletions: fileChanges.reduce((sum, f) => sum + (f.deletions || 0), 0)
  }
}

/**
 * Build complete file changes data for API
 *
 * @param {array} fileChanges - Array of file change objects
 * @returns {object} { filesChanged: [], summary: {} }
 */
export function buildFileChangesData(fileChanges) {
  return {
    filesChanged: fileChanges,
    summary: createSummary(fileChanges)
  }
}

/**
 * Convenience function: Report a single file modification
 *
 * @param {string} path - File path
 * @param {number} additions - Lines added
 * @param {number} deletions - Lines deleted
 * @param {string} diff - Optional diff
 * @returns {object} File changes data ready for API
 */
export function reportSingleFileChange(path, additions = 0, deletions = 0, diff = '') {
  const fileChange = createFileChange(path, 'modified', additions, deletions, diff)
  return buildFileChangesData([fileChange])
}

/**
 * Convenience function: Report multiple file modifications
 *
 * @param {array} files - Array of { path, additions, deletions, diff }
 * @returns {object} File changes data ready for API
 */
export function reportMultipleFileChanges(files) {
  const fileChanges = files.map(f =>
    createFileChange(f.path, 'modified', f.additions || 0, f.deletions || 0, f.diff || '')
  )
  return buildFileChangesData(fileChanges)
}

/**
 * Detect change type from file path and existence
 * Helper for agent to determine if file was added/modified
 *
 * @param {string} filePath - Full path to file
 * @param {string} relativePath - Relative path for reporting
 * @returns {object} { path, changeType }
 */
export function detectChangeType(filePath, relativePath = null) {
  const fs = require('fs')
  const path = require('path')

  const exists = fs.existsSync(filePath)
  const changeType = exists ? 'modified' : 'added'
  const reportPath = relativePath || path.basename(filePath)

  return {
    path: reportPath,
    changeType
  }
}

export default {
  createFileChange,
  createSummary,
  buildFileChangesData,
  reportSingleFileChange,
  reportMultipleFileChanges,
  detectChangeType
}
