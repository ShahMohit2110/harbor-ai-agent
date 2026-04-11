import { NavLink } from 'react-router-dom'

function Sidebar({ isMobileMenuOpen, onCloseMobileMenu }) {
  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/tickets', icon: '🎫', label: 'All Tickets' },
    { path: '/projects', icon: '📁', label: 'Projects' },
    { path: '/revenue-strategy', icon: '💰', label: 'Revenue Strategy' }
  ]

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (onCloseMobileMenu && window.innerWidth < 768) {
      onCloseMobileMenu()
    }
  }

  return (
    <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
