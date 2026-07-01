import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

const navItems = [
  { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
  { icon: '✨', label: 'Generate Ad', path: '/generate' },
  { icon: '📁', label: 'My Projects', path: '/projects' },
  { icon: '📋', label: 'Templates', path: '/templates' },
  { icon: '🖼️', label: 'Brand Kit', path: '/brand-kit' },
  { icon: '🤖', label: 'AI Assistant', path: '/assistant' },
  { icon: '📊', label: 'Analytics', path: '/analytics' },
  { icon: '⚙️', label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L4.5 13.5H11L9 22L19.5 10.5H13L15 2H13Z" fill="#6C63FF" stroke="#6C63FF" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className={styles.logoText}>AdCraft AI</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.bottom}>
        <Link to="#" className={styles.navItem}>
          <span className={styles.navIcon}>❓</span>
          <span className={styles.navLabel}>Help & Support</span>
        </Link>
        <Link to="/" className={`${styles.navItem} ${styles.logout}`}>
          <span className={styles.navIcon}>🚪</span>
          <span className={styles.navLabel}>Logout</span>
        </Link>
      </div>
    </aside>
  )
}
