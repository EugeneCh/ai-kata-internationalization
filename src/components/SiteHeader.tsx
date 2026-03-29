import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Planner' },
  { to: '/guides', label: 'Travel guides' },
  { to: '/help', label: 'Help & policies' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <p className="brand-mark">Northstar Travel</p>
        <span>Curated city breaks and practical trip planning.</span>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
