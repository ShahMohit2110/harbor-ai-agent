#!/usr/bin/env node

/**
 * File Change Capture Helper
 *
 * This helps the Harbor Agent capture file changes during work
 * and send them to the Ticket Tracker
 *
 * Usage in Agent workflow:
 *
 * import { captureFileChanges } from './captureFileChanges.js'
 *
 * // Before starting work
 * const beforeSnapshot = captureFileChanges('/path/to/repo')
 *
 * // ... do work ...
 *
 * // After completing work
 * const afterSnapshot = captureFileChanges('/path/to/repo')
 * const fileChanges = getDiffFileChanges(beforeSnapshot, afterSnapshot, '/path/to/repo')
 *
 * // Send to tracker
 * await HarborAgentTracker.updateProgress(ticketId, progress, stage, message, {
 *   filesChanged: fileChanges.filesChanged,
 *   summary: fileChanges.summary
 * })
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Get current git state as snapshot
 */
function captureGitSnapshot(repoPath) {
  try {
    const commitHash = execSync('git rev-parse HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    const commitCount = parseInt(execSync('git rev-list --count HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim());

    const status = execSync('git status --porcelain', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    return {
      commitHash,
      commitCount,
      timestamp: Date.now(),
      hasChanges: status.length > 0
    };
  } catch (error) {
    console.error('Error capturing snapshot:', error.message);
    return null;
  }
}

/**
 * Get file changes between two snapshots
 */
function getDiffFileChanges(beforeSnapshot, afterSnapshot, repoPath) {
  try {
    if (!beforeSnapshot || !afterSnapshot) {
      return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
    }

    const commitsChanged = afterSnapshot.commitCount - beforeSnapshot.commitCount;

    // If no new commits, check for uncommitted changes
    if (commitsChanged === 0 && afterSnapshot.hasChanges) {
      return getUncommittedChanges(repoPath);
    }

    // Get changes between commits
    const diffCommand = `git diff ${beforeSnapshot.commitHash} ${afterSnapshot.commitHash}`;
    const statCommand = `git diff --stat ${beforeSnapshot.commitHash} ${afterSnapshot.commitHash}`;

    const fullDiff = execSync(diffCommand, {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    const statOutput = execSync(statCommand, {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    return parseGitDiff(statOutput, fullDiff, repoPath);
  } catch (error) {
    console.error('Error getting diff:', error.message);
    return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
  }
}

/**
 * Get uncommitted changes (staged or unstaged)
 */
function getUncommittedChanges(repoPath) {
  try {
    const statOutput = execSync('git diff --stat HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    const fullDiff = execSync('git diff HEAD', {
      cwd: repoPath,
      encoding: 'utf8'
    }).trim();

    return parseGitDiff(statOutput, fullDiff, repoPath);
  } catch (error) {
    return { filesChanged: [], summary: { totalFiles: 0, additions: 0, deletions: 0 } };
  }
}

/**
 * Parse git diff output into file changes
 */
function parseGitDiff(statOutput, fullDiff, repoPath) {
  const filesChanged = [];
  const lines = statOutput.split('\n');

  for (const line of lines) {
    const match = line.match(/(.*)\s+\|\s+(\d+)(\s+[+-]+)?/);
    if (match) {
      const [, filePath, changes, type] = match;

      const additions = type ? (type.match(/\+/g) || []).length : 0;
      const deletions = type ? (type.match(/-/g) || []).length : 0;

      // Determine change type
      let changeType = 'modified';
      if (filePath.includes('new file')) {
        changeType = 'added';
      } else if (filePath.includes('deleted')) {
        changeType = 'deleted';
      }

      // Extract diff for this file
      const fileDiff = extractFileDiff(fullDiff, filePath, changeType);

      filesChanged.push({
        path: filePath.trim().replace(/(\s+\|\s+\d+.*$)/, ''),
        changeType,
        additions,
        deletions,
        diff: fileDiff
      });
    }
  }

  return {
    filesChanged,
    summary: {
      totalFiles: filesChanged.length,
      additions: filesChanged.reduce((sum, f) => sum + f.additions, 0),
      deletions: filesChanged.reduce((sum, f) => sum + f.deletions, 0)
    }
  };
}

/**
 * Extract diff for a specific file
 */
function extractFileDiff(fullDiff, filePath, changeType) {
  try {
    const cleanPath = filePath.trim().replace(/(\s+\|\s+\d+.*$)/, '');

    const lines = fullDiff.split('\n');
    let fileDiff = '';
    let inOurFile = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this is our file's diff header
      if (line.includes(`a/${cleanPath}`) || line.includes(`b/${cleanPath}`) ||
          line.includes(`dev/null`) && (i > 0 && lines[i-1].includes(cleanPath))) {
        inOurFile = true;
      }

      if (inOurFile) {
        fileDiff += line + '\n';

        // Stop at next file
        if (line.startsWith('diff ') && i > 0 && !line.includes(cleanPath)) {
          // Remove the last line (next file header)
          fileDiff = fileDiff.substring(0, fileDiff.lastIndexOf('\n'));
          break;
        }
      }
    }

    return fileDiff.trim();
  } catch (error) {
    return '';
  }
}

/**
 * Capture current state (for starting point)
 */
function captureInitialState(repoPath) {
  return captureGitSnapshot(repoPath);
}

/**
 * Get changes since initial state
 */
function getChangesSince(initialState, repoPath) {
  const currentState = captureGitSnapshot(repoPath);
  return getDiffFileChanges(initialState, currentState, repoPath);
}

export {
  captureGitSnapshot,
  getDiffFileChanges,
  captureInitialState,
  getChangesSince,
  getUncommittedChanges
};

export default {
  captureGitSnapshot,
  getDiffFileChanges,
  captureInitialState,
  getChangesSince,
  getUncommittedChanges
};
