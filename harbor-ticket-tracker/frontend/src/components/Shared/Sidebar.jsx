import { NavLink } from 'react-router-dom'

function Sidebar() {
  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/tickets', icon: '🎫', label: 'All Tickets' }
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
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
