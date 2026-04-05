import { Link } from 'react-router-dom'

function Header({ isRealTimeEnabled, onToggleRealTime, onToggleMobileMenu, isMobileMenuOpen }) {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <h1>Harbor Ticket Tracker</h1>
        </Link>
      </div>
      <div className="header-controls">
        <button
          className="realtime-toggle"
          onClick={onToggleRealTime}
          title={isRealTimeEnabled ? 'Disable real-time updates' : 'Enable real-time updates'}
        >
          <div className={`toggle-switch ${isRealTimeEnabled ? 'active' : ''}`}></div>
          <span>{isRealTimeEnabled ? 'Live' : 'Paused'}</span>
        </button>
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={onToggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
