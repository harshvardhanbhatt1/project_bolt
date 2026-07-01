import { Link } from 'react-router-dom'
import styles from './ErrorPages.module.css'

export default function ServerError() {
  return (
    <div className={styles.page} style={{ background: '#FFF8F8' }}>
      <div className={styles.glow} style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)' }}></div>
      <div className={styles.content}>
        <div className={styles.errorNum} style={{ color: '#EF4444' }}>500</div>
        <div className={styles.illustration}>
          <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
            <circle cx="100" cy="80" r="50" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
            <circle cx="88" cy="68" r="4" fill="#EF4444"/>
            <circle cx="112" cy="68" r="4" fill="#EF4444"/>
            <path d="M85 92 Q100 84 115 92" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M100 130 L100 160" stroke="#9CA3AF" strokeWidth="3"/>
            <path d="M80 160 L120 160" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"/>
            <path d="M80 148 L100 160" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
            <path d="M120 148 L100 160" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
            <path d="M125 45 L135 35 L140 40 L130 50Z" fill="#F59E0B" opacity="0.8"/>
            <path d="M65 45 L55 35 L60 28 L70 38Z" fill="#EF4444" opacity="0.6"/>
            <circle cx="150" cy="100" r="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
            <text x="147" y="105" fontSize="10" fill="#EF4444">!</text>
            <path d="M55 110 Q50 90 60 80" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" fill="none"/>
          </svg>
        </div>
        <h1 className={styles.heading}>Something Went Wrong</h1>
        <p className={styles.subtext}>Our AI engine hit a snag. We're already on it — please try again in a moment.</p>
        <div className={styles.actions}>
          <button className="btn-primary" style={{ padding: '12px 28px', fontSize: 15 }} onClick={() => window.location.reload()}>Try Again</button>
          <Link to="/" className="btn-outline" style={{ padding: '12px 28px', fontSize: 15 }}>Go to Home</Link>
        </div>
      </div>
    </div>
  )
}
