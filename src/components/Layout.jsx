import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../core/supabase'
import './Layout.css'

const navMain = [
  { to: '/',          icon: 'ti-layout-dashboard', label: 'Dashboard' },
  { to: '/orders',    icon: 'ti-shopping-cart',    label: 'POS / Orders', badge: 3 },
  { to: '/menu',      icon: 'ti-tools-kitchen-2',  label: 'Menu' },
  { to: '/inventory', icon: 'ti-box',              label: 'Inventory' },
]

const navReports = [
  { to: '/sales',    icon: 'ti-chart-bar',    label: 'Sales' },
  { to: '/expenses', icon: 'ti-file-invoice', label: 'Expenses' },
]

const navSettings = [
  { to: '/staff',    icon: 'ti-users',    label: 'Staff' },
  { to: '/settings', icon: 'ti-settings', label: 'Settings' },
]

function NavSection({ items, showDivider }) {
  return (
    <div className="nav-section">
      {showDivider && <div className="nav-divider" />}
      {items.map(({ to, icon, label, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon-wrapper">
            <i className={`ti ${icon}`} aria-hidden="true" />
          </div>
          <span className="nav-text">{label}</span>
          {badge && <span className="nav-badge">{badge}</span>}
        </NavLink>
      ))}
    </div>
  )
}

export default function Layout() {
  const navigate = useNavigate()

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="layout">
      {/* ── Sidebar Wrapper: Keeps content from shifting ── */}
      <div className="sidebar-wrapper">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <i className="ti ti-mug" aria-hidden="true" />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-name">Brew & Co.</span>
              <span className="logo-sub">Cafe Management</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <NavSection items={navMain} />
            <NavSection items={navReports} showDivider />
            <NavSection items={navSettings} showDivider />
          </nav>

          <div className="sidebar-footer">
            <div className="user-row">
              <div className="avatar-wrapper">
                <div className="avatar-circle">JO</div>
              </div>
              <div className="user-info">
                <p className="user-name">John Ocampo</p>
                <span className="user-role">Admin</span>
              </div>
              <button className="signout-btn" onClick={handleSignOut} title="Sign out">
                <i className="ti ti-logout" aria-hidden="true" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}