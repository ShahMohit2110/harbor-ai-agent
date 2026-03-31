/**
 * File Change Tracker for Harbor Agent
 *
 * This utility tracks file changes during agent execution WITHOUT using git commands.
 * It monitors file modifications and generates change information for the Ticket Tracker.
 *
 * COMPLIANCE: Does NOT use any git commands (git diff, git status, etc.)
 * COMPLIANCE: Safe to use in autonomous agent workflow
 */

import fs from 'fs'
import path from 'path'

class FileChangeTracker {
  constructor() {
    this.modifiedFiles = new Map() // Map<filePath, {originalContent, modifiedContent, changeType}>
    this.initialized = false
  }

  /**
   * Initialize tracking for a working directory
   * Stores initial state of files to detect changes later
   *
   * @param {string} workingDir - Working directory to track
   * @param {string[]} targetPatterns - File patterns to track (e.g., ['src/**/*.js'])
   */
  initialize(workingDir, targetPatterns = ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.py', '**/*.json']) {
    console.log(`🔍 File Change Tracker: Initializing for ${workingDir}`)

    this.workingDir = workingDir
    this.targetPatterns = targetPatterns
    this.modifiedFiles.clear()
    this.initialized = true

    // Note: We don't read all files upfront to avoid performance issues
    // Instead, we'll track files as they're modified

    console.log(`✅ File Change Tracker: Initialized`)
  }

  /**
   * Record a file modification
   * Call this when agent writes/edits a file
   *
   * @param {string} filePath - Path to the modified file (relative or absolute)
   * @param {string} newContent - New content of the file
   */
  recordModification(filePath, newContent) {
    if (!this.initialized) {
      console.warn(`⚠️ File Change Tracker: Not initialized, skipping`)
      return
    }

    // Normalize path
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(this.workingDir, filePath)
    const relativePath = path.relative(this.workingDir, absolutePath)

    // Check if file matches target patterns
    if (!this.matchesPattern(relativePath)) {
      return
    }

    // Read original content if file exists
    let originalContent = ''
    let changeType = 'modified'

    if (fs.existsSync(absolutePath)) {
      try {
        originalContent = fs.readFileSync(absolutePath, 'utf8')
      } catch (error) {
        console.warn(`⚠️ Could not read original file: ${relativePath}`)
        originalContent = ''
      }
    } else {
      // File doesn't exist yet - it's being created
      changeType = 'added'
      originalContent = ''
    }

    // Store the modification
    this.modifiedFiles.set(relativePath, {
      path: relativePath,
      originalContent,
      newContent,
      changeType
    })

    console.log(`📝 Tracked modification: ${relativePath} (${changeType})`)
  }

  /**
   * Check if a file matches target patterns
   */
  matchesPattern(filePath) {
    // Simple extension check
    const ext = path.extname(filePath).toLowerCase()
    const allowedExts = ['.js', '.jsx', '.ts', '.tsx', '.py', '.json', '.md', '.yml', '.yaml']
    return allowedExts.includes(ext)
  }

  /**
   * Generate file changes summary for API
   * Calculates statistics and generates simple diff format
   *
   * @returns {object} { filesChanged: [], summary: {} }
   */
  generateFileChanges() {
    if (!this.initialized) {
      console.warn(`⚠️ File Change Tracker: Not initialized`)
      return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } }
    }

    const filesChanged = []
    let totalAdditions = 0
    let totalDeletions = 0

    for (const [filePath, data] of this.modifiedFiles) {
      const { originalContent, newContent, changeType } = data

      // Calculate line changes
      const originalLines = originalContent.split('\n')
      const newLines = newContent.split('\n')

      // Simple diff statistics (not a full git diff)
      const additions = Math.max(0, newLines.length - originalLines.length)
      const deletions = Math.max(0, originalLines.length - newLines.length)

      // Generate simple diff (first 100 lines of changes)
      const diff = this.generateSimpleDiff(originalContent, newContent)

      filesChanged.push({
        path: filePath,
        changeType,
        additions,
        deletions,
        diff: diff.substring(0, 5000) // Limit diff size
      })

      totalAdditions += additions
      totalDeletions += deletions
    }

    const summary = {
      totalFiles: filesChanged.length,
      additions: totalAdditions,
      deletions: totalDeletions
    }

    console.log(`📊 File Changes: ${summary.totalFiles} files, +${summary.additions}, -${summary.deletions}`)

    return { filesChanged, summary }
  }

  /**
   * Generate a simple diff without using git
   * Shows added/removed lines in unified diff format
   */
  generateSimpleDiff(originalContent, newContent) {
    const originalLines = originalContent.split('\n')
    const newLines = newContent.split('\n')

    // Find the first and last changed lines
    let firstChange = -1
    let lastChange = -1

    const maxLines = Math.max(originalLines.length, newLines.length)

    for (let i = 0; i < maxLines; i++) {
      const originalLine = originalLines[i] || ''
      const newLine = newLines[i] || ''

      if (originalLine !== newLine) {
        if (firstChange === -1) firstChange = i
        lastChange = i
      }
    }

    // No changes
    if (firstChange === -1) {
      return '@@ No changes @@'
    }

    // Generate context window (show 3 lines before and after)
    const contextStart = Math.max(0, firstChange - 3)
    const contextEnd = Math.min(maxLines, lastChange + 4)

    // Build diff output
    let diff = `@@ -${firstChange + 1},${lastChange - firstChange + 1} +${firstChange + 1},${lastChange - firstChange + 1} @@\n`

    for (let i = contextStart; i < contextEnd; i++) {
      const originalLine = originalLines[i] || ''
      const newLine = newLines[i] || ''

      if (originalLine === newLine) {
        // Context line (unchanged)
        diff += ` ${originalLine}\n`
      } else {
        // Changed line
        if (originalLines[i] !== undefined && newLines[i] === undefined) {
          // Line deleted
          diff += `-${originalLine}\n`
        } else if (originalLines[i] === undefined && newLines[i] !== undefined) {
          // Line added
          diff += `+${newLine}\n`
        } else {
          // Line modified
          diff += `-${originalLine}\n`
          diff += `+${newLine}\n`
        }
      }
    }

    return diff
  }

  /**
   * Clear all tracked changes
   */
  clear() {
    this.modifiedFiles.clear()
    console.log(`🧹 File Change Tracker: Cleared`)
  }

  /**
   * Get count of tracked files
   */
  getTrackedFileCount() {
    return this.modifiedFiles.size
  }
}

// Singleton instance
const fileChangeTracker = new FileChangeTracker()

export default fileChangeTracker
