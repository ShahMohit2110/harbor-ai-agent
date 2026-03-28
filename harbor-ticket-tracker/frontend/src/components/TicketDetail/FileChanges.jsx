import { useState } from 'react'
import './FileChanges.css'

function FileChanges({ filesChanged, summary }) {
  const [expandedFile, setExpandedFile] = useState(null)

  if (!filesChanged || filesChanged.length === 0) {
    return null
  }

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'added':
        return '📝'
      case 'deleted':
        return '🗑️'
      case 'renamed':
        return '📛'
      case 'modified':
      default:
        return '✏️'
    }
  }

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'added':
        return '#10b981'
      case 'deleted':
        return '#ef4444'
      case 'renamed':
        return '#f59e0b'
      case 'modified':
      default:
        return '#3b82f6'
    }
  }

  const getFileIcon = (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase()
    const icons = {
      'js': '🟨',
      'jsx': '⚛️',
      'ts': '🔷',
      'tsx': '⚛️',
      'py': '🐍',
      'css': '🎨',
      'scss': '🎨',
      'html': '🌐',
      'json': '📋',
      'md': '📄',
      'yml': '⚙️',
      'yaml': '⚙️'
    }
    return icons[ext] || '📄'
  }

  const getLanguageClass = (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase()
    const langMap = {
      'js': 'language-javascript',
      'jsx': 'language-javascript',
      'ts': 'language-typescript',
      'tsx': 'language-typescript',
      'py': 'language-python',
      'css': 'language-css',
      'scss': 'language-scss',
      'html': 'language-html',
      'json': 'language-json'
    }
    return langMap[ext] || ''
  }

  const formatDiff = (diff) => {
    if (!diff) return null

    const lines = diff.split('\n')
    return lines.map((line, index) => {
      let className = 'diff-line'
      let content = line

      if (line.startsWith('@@')) {
        className += ' diff-hunk'
      } else if (line.startsWith('+')) {
        className += ' diff-added'
      } else if (line.startsWith('-')) {
        className += ' diff-removed'
      } else {
        className += ' diff-context'
      }

      return (
        <div key={index} className={className}>
          <pre>{content}</pre>
        </div>
      )
    })
  }

  return (
    <div className="file-changes">
      {summary && (
        <div className="changes-summary">
          <span className="summary-badge">
            {summary.totalFiles} files changed
          </span>
          <span className="summary-additions" style={{ color: '#10b981' }}>
            +{summary.additions} additions
          </span>
          <span className="summary-deletions" style={{ color: '#ef4444' }}>
            -{summary.deletions} deletions
          </span>
        </div>
      )}

      <div className="files-list">
        {filesChanged.map((file, index) => (
          <div key={index} className="file-item">
            <div
              className="file-header"
              onClick={() => setExpandedFile(expandedFile === index ? null : index)}
            >
              <span className="file-icon">{getFileIcon(file.path)}</span>
              <span className="file-path">{file.path}</span>
              <span className="file-change-badge" style={{
                backgroundColor: `${getChangeColor(file.changeType)}20`,
                color: getChangeColor(file.changeType),
                border: `1px solid ${getChangeColor(file.changeType)}40`
              }}>
                {getChangeIcon(file.changeType)} {file.changeType}
              </span>
              <span className="file-stats">
                {file.additions !== undefined && (
                  <span style={{ color: '#10b981' }}>+{file.additions}</span>
                )}
                {file.deletions !== undefined && file.deletions > 0 && (
                  <span style={{ color: '#ef4444' }}>-{file.deletions}</span>
                )}
              </span>
              <span className="expand-icon">
                {expandedFile === index ? '▼' : '▶'}
              </span>
            </div>

            {expandedFile === index && file.diff && (
              <div className="file-diff">
                <div className={`diff-content ${getLanguageClass(file.path)}`}>
                  {formatDiff(file.diff)}
                </div>
              </div>
            )}

            {expandedFile === index && !file.diff && (
              <div className="no-diff">
                <p>No diff available for this file</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileChanges
