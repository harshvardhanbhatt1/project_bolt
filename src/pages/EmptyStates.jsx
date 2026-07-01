import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import styles from './EmptyStates.module.css'

const EmptyCard = ({ icon, title, sub, btnLabel, btnTo, outline }) => (
  <div className={`card ${styles.emptyCard}`}>
    <div className={styles.emptyIllustration}>
      <span className={styles.emptyIcon}>{icon}</span>
      <div className={styles.emptyCircle}></div>
    </div>
    <h3 className={styles.emptyTitle}>{title}</h3>
    <p className={styles.emptySub}>{sub}</p>
    {outline ? (
      <button className="btn-outline" style={{ marginTop: 16 }}>{btnLabel}</button>
    ) : (
      <Link to={btnTo || '#'} className="btn-primary" style={{ marginTop: 16 }}>{btnLabel}</Link>
    )}
  </div>
)

export default function EmptyStates() {
  return (
    <AppLayout title="Empty States">
      <div className={styles.pageHeader}>
        <h2>Empty State Components</h2>
        <p>Reusable empty state components for AdCraft AI</p>
      </div>
      <div className={styles.grid}>
        <EmptyCard
          icon="📁"
          title="No projects yet"
          sub="Generate your first AI-powered ad to see it here"
          btnLabel="✨ Generate Ad"
          btnTo="/generate"
        />
        <EmptyCard
          icon="🔍"
          title="No templates match your filters"
          sub="Try a different category or search term"
          btnLabel="Clear Filters"
          outline
        />
        <EmptyCard
          icon="⬇️"
          title="Nothing exported yet"
          sub="Generate and export your first ad to see it here"
          btnLabel="✨ Generate Ad"
          btnTo="/generate"
        />
        <EmptyCard
          icon="🎨"
          title="Your brand kit is empty"
          sub="Add your brand colors, logo, and fonts to get started"
          btnLabel="Set Up Brand Kit"
          btnTo="/brand-kit"
        />
        <EmptyCard
          icon="🤖"
          title="Waiting for your first generation"
          sub="Fill in your product details and hit Generate"
          btnLabel="Get Started"
          btnTo="/generate"
        />
      </div>
    </AppLayout>
  )
}
