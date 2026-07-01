import { Link } from 'react-router-dom'
import styles from './ErrorPages.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.glow}></div>
      <div className={styles.content}>
        <div className={styles.errorNum} style={{ color: '#6C63FF' }}>404</div>
        <div className={styles.illustration}>
          <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
            <rect x="40" y="60" width="120" height="100" rx="12" fill="#EFEFFF" stroke="#6C63FF" strokeWidth="2"/>
            <rect x="55" y="75" width="90" height="12" rx="6" fill="#C8C5FF"/>
            <rect x="55" y="95" width="60" height="8" rx="4" fill="#E0DEFF"/>
            <rect x="55" y="110" width="75" height="8" rx="4" fill="#E0DEFF"/>
            <circle cx="100" cy="30" r="22" fill="#EFEFFF" stroke="#6C63FF" strokeWidth="2"/>
            <circle cx="92" cy="26" r="3" fill="#6C63FF"/>
            <circle cx="108" cy="26" r="3" fill="#6C63FF"/>
            <path d="M92 36 Q100 30 108 36" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M78 60 L100 52" stroke="#6C63FF" strokeWidth="1.5" strokeDasharray="3 3"/>
            <circle cx="60" cy="155" r="8" fill="#FF6B6B" opacity="0.6"/>
            <circle cx="145" cy="145" r="5" fill="#6C63FF" opacity="0.4"/>
            <circle cx="170" cy="80" r="10" fill="#EFEFFF" stroke="#6C63FF" strokeWidth="1.5"/>
            <text x="167" y="85" fontSize="10" fill="#6C63FF">?</text>
          </svg>
        </div>
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.subtext}>Looks like this page got lost between the ad concepts. Let's get you back.</p>
        <div className={styles.actions}>
          <Link to="/dashboard" className="btn-primary" style={{ padding: '12px 28px', fontSize: 15 }}>Go to Dashboard</Link>
          <Link to="/generate" className="btn-outline" style={{ padding: '12px 28px', fontSize: 15 }}>✨ Generate an Ad</Link>
        </div>
      </div>
    </div>
  )
}
