import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import styles from './Dashboard.module.css'

const defaultProjects = [
  { id: 1, name: 'Summer Sale Campaign', platform: 'Instagram Post', date: '2 hours ago', img: 1536619, status: 'Exported' },
  { id: 2, name: 'Product Launch - AirPods', platform: 'Facebook Ad', date: 'Yesterday', img: 3394650, status: 'Draft' },
  { id: 3, name: 'Diwali Special Offer', platform: 'Google Display', date: '3 days ago', img: 1190298, status: 'In Progress' },
]

const defaultInProgress = [
  { name: 'Black Friday Banner', time: '1 hour ago', img: 3786667 },
  { name: 'New Arrivals Reel', time: '3 hours ago', img: 1020585 },
  { name: 'Brand Awareness Campaign', time: 'Yesterday', img: 323780 },
]

const templates = [
  { label: 'Fashion Sale', industry: 'Clothing', img: 1536619 },
  { label: 'Tech Launch', industry: 'Electronics', img: 3394650 },
  { label: 'Food Festival', industry: 'Food', img: 312418 },
  { label: 'Beauty Glow', industry: 'Beauty', img: 3785147 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, templates: 8, exports: 0 })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    if (saved.length > 0) {
      setProjects(saved.slice(0, 3))
      setStats({
        total: saved.length + 44,
        thisMonth: Math.min(saved.length + 9, 99),
        templates: 8 + Math.floor(saved.length / 3),
        exports: saved.filter(p => p.status === 'Exported').length + 32,
      })
    } else {
      setProjects(defaultProjects)
      setStats({ total: 47, thisMonth: 12, templates: 8, exports: 34 })
    }
  }, [])

  const deleteProject = (id) => {
    const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    const updated = saved.filter(p => p.id !== id)
    localStorage.setItem('adcraft_projects', JSON.stringify(updated))
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <AppLayout title="Dashboard">
      <div className={styles.content}>
        {/* Welcome Banner */}
        <div className={styles.welcomeBanner}>
          <div className={styles.welcomeLeft}>
            <h2 className={styles.welcomeTitle}>Welcome back, Arjun! 🚀</h2>
            <p className={styles.welcomeSub}>Your AI creative agency is ready. Let's build something great.</p>
            <Link to="/generate" className={styles.welcomeBtn}>✨ Generate New Ad</Link>
          </div>
          <div className={styles.welcomeIllustration}>
            <div className={styles.sparkle1}>✦</div>
            <div className={styles.sparkle2}>✦</div>
            <div className={styles.sparkle3}>✦</div>
            <div className={styles.mockAd}>
              <div className={styles.mockAdLine}></div>
              <div className={styles.mockAdLine} style={{ width: '70%' }}></div>
              <div className={styles.mockAdLine} style={{ width: '40%' }}></div>
              <div className={styles.mockAdBtn}></div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {[
            { icon: '🎨', label: 'Total Ads Generated', value: stats.total, trend: null, color: '#6C63FF', bg: 'rgba(108,99,255,0.08)' },
            { icon: '📅', label: 'This Month', value: stats.thisMonth, trend: '+18%', color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
            { icon: '📋', label: 'Templates Used', value: stats.templates, trend: '+3', color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
            { icon: '⬇️', label: 'Exports', value: stats.exports, trend: '+5', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
          ].map((stat, i) => (
            <div key={i} className={`card ${styles.statCard}`}>
              <div className={styles.statIcon} style={{ background: stat.bg, color: stat.color }}>{stat.icon}</div>
              <div className={styles.statBody}>
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
              </div>
              {stat.trend && <span className={`tag tag-success ${styles.statTrend}`}>{stat.trend}</span>}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <Link to="/generate" className={`${styles.actionCard} ${styles.actionPrimary}`}>
            <div className={styles.actionIcon}>✨</div>
            <div>
              <p className={styles.actionLabel}>Generate New Ad</p>
              <p className={styles.actionSub}>Start from scratch</p>
            </div>
            <span className={styles.actionArrow}>→</span>
          </Link>
          <Link to="/templates" className={styles.actionCard}>
            <div className={styles.actionIcon}>📋</div>
            <div>
              <p className={styles.actionLabel}>Browse Templates</p>
              <p className={styles.actionSub}>100+ ready designs</p>
            </div>
            <span className={styles.actionArrow}>→</span>
          </Link>
          <Link to="/generate" className={styles.actionCard}>
            <div className={styles.actionIcon}>🖼️</div>
            <div>
              <p className={styles.actionLabel}>Upload Product Image</p>
              <p className={styles.actionSub}>AI background removal</p>
            </div>
            <span className={styles.actionArrow}>→</span>
          </Link>
          <Link to="/brand-kit" className={styles.actionCard}>
            <div className={styles.actionIcon}>🎨</div>
            <div>
              <p className={styles.actionLabel}>Open Brand Kit</p>
              <p className={styles.actionSub}>Manage your identity</p>
            </div>
            <span className={styles.actionArrow}>→</span>
          </Link>
        </div>

        {/* Recent Projects */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Recent Projects</h3>
            <Link to="/projects" className={styles.viewAll}>View All →</Link>
          </div>
          {projects.length === 0 ? (
            <div className={styles.emptyProjects}>
              <span>📁</span>
              <p>No projects yet. <Link to="/generate" style={{ color: 'var(--primary)', fontWeight: 600 }}>Generate your first ad →</Link></p>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {projects.map((p, i) => (
                <div key={p.id || i} className={`card ${styles.projectCard}`}>
                  <div className={styles.projectImg}>
                    {p.concept ? (
                      <div style={{ width: '100%', height: '100%', background: p.concept.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                        <p style={{ color: p.concept.textColor, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.4 }}>{p.concept.headline}</p>
                      </div>
                    ) : (
                      <img src={`https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&w=400&h=220&dpr=1`} alt={p.name} />
                    )}
                    <span className={`tag tag-primary ${styles.platformBadge}`}>{p.platform}</span>
                  </div>
                  <div className={styles.projectMeta}>
                    <p className={styles.projectName}>{p.name}</p>
                    <p className={styles.projectDate}>{p.date}</p>
                    <div className={styles.projectActions}>
                      <span className={`tag ${p.status === 'Exported' ? 'tag-success' : p.status === 'Draft' ? 'tag-muted' : 'tag-warning'}`}>{p.status}</span>
                      <div className={styles.projectBtns}>
                        <button className={styles.iconBtn} title="Edit" onClick={() => navigate('/editor')}>✏️</button>
                        <button className={styles.iconBtn} title="Delete" onClick={() => deleteProject(p.id)}>🗑️</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Two Column */}
        <div className={styles.twoCol}>
          <div className={`card ${styles.continueCard}`}>
            <h3 className={styles.cardTitle}>Continue Editing</h3>
            <div className={styles.progressList}>
              {defaultInProgress.map((p, i) => (
                <div key={i} className={styles.progressItem}>
                  <div className={styles.progressThumb}>
                    <img src={`https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&dpr=1`} alt={p.name} />
                  </div>
                  <div className={styles.progressInfo}>
                    <p className={styles.progressName}>{p.name}</p>
                    <p className={styles.progressTime}>Last edited {p.time}</p>
                  </div>
                  <Link to="/editor" className="btn-primary" style={{ padding: '8px 16px', fontSize: 13, flexShrink: 0 }}>Continue</Link>
                </div>
              ))}
            </div>
          </div>
          <div className={`card ${styles.tipCard}`}>
            <div className={styles.tipHeader}>
              <span className={styles.tipIcon}>🤖</span>
              <div>
                <h4 className={styles.tipTitle}>AI Tip of the Day</h4>
                <p className={styles.tipLabel}>Ad Performance Insight</p>
              </div>
            </div>
            <p className={styles.tipText}>
              Adding a person using your product increases ad click-through rates by <strong>38%</strong>. Try our lifestyle image feature to see the difference!
            </p>
            <Link to="/assistant" className={styles.tipLink}>Try AI Assistant →</Link>
          </div>
        </div>

        {/* Template Recommendations */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Recommended Templates for You</h3>
            <Link to="/templates" className={styles.viewAll}>Browse All →</Link>
          </div>
          <div className={styles.templatesRow}>
            {templates.map((t, i) => (
              <div key={i} className={`card ${styles.templateCard}`}>
                <div className={styles.templateImg}>
                  <img src={`https://images.pexels.com/photos/${t.img}/pexels-photo-${t.img}.jpeg?auto=compress&cs=tinysrgb&w=280&h=160&dpr=1`} alt={t.label} />
                  <div className={styles.templateOverlay}>
                    <Link to="/generate" className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>Use Template</Link>
                  </div>
                </div>
                <div className={styles.templateMeta}>
                  <p className={styles.templateLabel}>{t.label}</p>
                  <span className="tag tag-primary" style={{ fontSize: 11 }}>{t.industry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
