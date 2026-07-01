import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import styles from './MyProjects.module.css'

const defaultProjects = [
  { id: 101, name: 'Summer Sale Campaign', platform: 'Instagram Post', industry: 'Clothing', date: '2 hours ago', status: 'Exported', img: 1536619 },
  { id: 102, name: 'Product Launch - AirPods', platform: 'Facebook Ad', industry: 'Electronics', date: 'Yesterday', status: 'Draft', img: 3394650 },
  { id: 103, name: 'Diwali Special Offer', platform: 'Google Display', industry: 'Festivals', date: '3 days ago', status: 'In Progress', img: 1190298 },
  { id: 104, name: 'Black Friday Banner', platform: 'E-commerce Banner', industry: 'Business', date: '5 days ago', status: 'Exported', img: 3786667 },
  { id: 105, name: 'Brand Awareness Campaign', platform: 'LinkedIn Post', industry: 'Corporate', date: '1 week ago', status: 'Draft', img: 323780 },
  { id: 106, name: 'Fitness App Promo', platform: 'Instagram Story', industry: 'Fitness', date: '2 weeks ago', status: 'Exported', img: 1552249 },
  { id: 107, name: 'Skincare Glow Series', platform: 'Instagram Post', industry: 'Beauty', date: '2 weeks ago', status: 'In Progress', img: 3785147 },
  { id: 108, name: 'Real Estate Open House', platform: 'Facebook Ad', industry: 'Real Estate', date: '3 weeks ago', status: 'Exported', img: 1370980 },
]

const filterOptions = ['All', 'Recent', 'Instagram', 'Facebook', 'LinkedIn', 'Google', 'Exported']

export default function MyProjects() {
  const navigate = useNavigate()
  const [allProjects, setAllProjects] = useState([])
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Newest First')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    setAllProjects([...saved, ...defaultProjects])
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const deleteProject = (id) => {
    if (!window.confirm('Delete this project?')) return
    const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    localStorage.setItem('adcraft_projects', JSON.stringify(saved.filter(p => p.id !== id)))
    setAllProjects(prev => prev.filter(p => p.id !== id))
    showToast('Project deleted')
  }

  const duplicateProject = (p) => {
    const clone = { ...p, id: Date.now(), name: `${p.name} (Copy)`, date: 'Just now', status: 'Draft' }
    const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    saved.unshift(clone)
    localStorage.setItem('adcraft_projects', JSON.stringify(saved))
    setAllProjects(prev => [clone, ...prev])
    showToast('Project duplicated!')
  }

  const openProject = (project) => {
    if (project.concept && project.form) {
      sessionStorage.setItem('editAd', JSON.stringify({ concept: project.concept, form: project.form }))
      navigate('/editor')
    } else {
      showToast('This project does not include editable ad content')
    }
  }

  const markExported = (id) => {
    setAllProjects(prev => prev.map(p => p.id === id ? { ...p, status: 'Exported' } : p))
    const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    localStorage.setItem('adcraft_projects', JSON.stringify(saved.map(p => p.id === id ? { ...p, status: 'Exported' } : p)))
    showToast('Marked as Exported ✅')
  }

  const filtered = allProjects.filter(p => {
    const matchFilter = filter === 'All' ? true
      : filter === 'Exported' ? p.status === 'Exported'
      : filter === 'Recent' ? true
      : p.platform?.toLowerCase().includes(filter.toLowerCase())
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || p.industry?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Name A–Z') return (a.name || '').localeCompare(b.name || '')
    if (sort === 'Oldest') return (a.id || 0) - (b.id || 0)
    return (b.id || 0) - (a.id || 0)
  })

  return (
    <AppLayout title="My Projects">
      {toast && <div className={styles.toast}>{toast}</div>}
      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h2 className={styles.pageTitle}>My Projects</h2>
            <p className={styles.pageSub}>All your saved ad campaigns and designs — {allProjects.length} total</p>
          </div>
          <div className={styles.headerActions}>
            <Link to="/generate" className="btn-primary" style={{ padding: '10px 18px', fontSize: 14 }}>+ New Project</Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                className="input-field"
                placeholder="Search by name or industry..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 34, borderRadius: 99 }}
              />
            </div>
            <div className={styles.filterPills}>
              {filterOptions.map(f => (
                <button key={f} className={`${styles.filterPill} ${filter === f ? styles.filterPillActive : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className={styles.filterRight}>
            <select className="input-field" style={{ fontSize: 13, padding: '8px 12px', width: 'auto' }} value={sort} onChange={e => setSort(e.target.value)}>
              <option>Newest First</option>
              <option>Oldest</option>
              <option>Name A–Z</option>
            </select>
            <div className={styles.viewToggle}>
              <button className={`${styles.viewBtn} ${view === 'grid' ? styles.viewBtnActive : ''}`} onClick={() => setView('grid')}>⊞</button>
              <button className={`${styles.viewBtn} ${view === 'list' ? styles.viewBtnActive : ''}`} onClick={() => setView('list')}>☰</button>
            </div>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📁</div>
            <h3>{search || filter !== 'All' ? 'No projects match your filters' : 'No projects yet'}</h3>
            <p>{search || filter !== 'All' ? 'Try clearing the search or changing filters' : 'Start by generating your first AI-powered ad'}</p>
            {(search || filter !== 'All') && <button className="btn-outline" style={{ marginTop: 12 }} onClick={() => { setSearch(''); setFilter('All') }}>Clear Filters</button>}
            <Link to="/generate" className="btn-primary" style={{ marginTop: 12 }}>✨ Generate Ad</Link>
          </div>
        ) : view === 'grid' ? (
          <div className={styles.projectsGrid}>
            {sorted.map((p, i) => (
              <div key={p.id || i} className={`card ${styles.projectCard}`}>
                <div className={styles.projectImg}>
                  {p.concept ? (
                    <div style={{ width: '100%', height: '100%', background: p.concept.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                      <p style={{ color: p.concept.textColor || '#fff', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 11, textAlign: 'center', lineHeight: 1.4 }}>{p.concept.headline}</p>
                    </div>
                  ) : (
                    <img src={`https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&w=400&h=220&dpr=1`} alt={p.name} />
                  )}
                  <span className={`tag tag-primary ${styles.platformBadge}`}>{p.platform}</span>
                  <span className={`tag ${p.status === 'Exported' ? 'tag-success' : p.status === 'Draft' ? 'tag-muted' : 'tag-warning'} ${styles.statusBadge}`}>{p.status}</span>
                </div>
                <div className={styles.projectMeta}>
                  <p className={styles.projectName}>{p.name}</p>
                  <div className={styles.projectInfo}>
                    <span className="tag tag-muted" style={{ fontSize: 11 }}>{p.industry}</span>
                    <span className={styles.projectDate}>{p.date}</span>
                  </div>
                  <div className={styles.projectActions}>
                    <button className={styles.actionBtn} onClick={() => openProject(p)}>✏️ Edit</button>
                    <button className={styles.actionBtn} onClick={() => { markExported(p.id); showToast('Downloading...') }}>⬇️ Download</button>
                    <button className={styles.actionBtn} onClick={() => duplicateProject(p)}>⧉ Duplicate</button>
                    <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={() => deleteProject(p.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.listView}>
            <div className={styles.listHeader}>
              <span style={{ width: 60 }}>Preview</span>
              <span style={{ flex: 2 }}>Project Name</span>
              <span style={{ flex: 1 }}>Platform</span>
              <span style={{ flex: 1 }}>Industry</span>
              <span style={{ flex: 1 }}>Last Edited</span>
              <span style={{ width: 100 }}>Status</span>
              <span style={{ width: 140 }}>Actions</span>
            </div>
            {sorted.map((p, i) => (
              <div key={p.id || i} className={`${styles.listRow} ${i % 2 === 1 ? styles.listRowAlt : ''}`}>
                <div style={{ width: 60 }}>
                  {p.img ? <img src={`https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&w=60&h=44&dpr=1`} alt="" className={styles.listThumb} />
                    : <div className={styles.listThumb} style={{ background: p.concept?.bg || 'var(--light-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: p.concept?.textColor || 'var(--primary)', padding: 2 }}>Ad</div>}
                </div>
                <span style={{ flex: 2 }} className={styles.listName}>{p.name}</span>
                <span style={{ flex: 1 }} className={styles.listMeta}>{p.platform}</span>
                <span style={{ flex: 1 }} className={styles.listMeta}>{p.industry}</span>
                <span style={{ flex: 1 }} className={styles.listMeta}>{p.date}</span>
                <span style={{ width: 100 }}>
                  <span className={`tag ${p.status === 'Exported' ? 'tag-success' : p.status === 'Draft' ? 'tag-muted' : 'tag-warning'}`} style={{ fontSize: 11 }}>{p.status}</span>
                </span>
                <div style={{ width: 140, display: 'flex', gap: 5 }}>
                  <button className={styles.listActionBtn} onClick={() => openProject(p)} title="Edit">✏️</button>
                  <button className={styles.listActionBtn} onClick={() => duplicateProject(p)} title="Duplicate">⧉</button>
                  <button className={styles.listActionBtn} onClick={() => showToast('Downloading...')} title="Download">⬇️</button>
                  <button className={`${styles.listActionBtn} ${styles.listActionBtnDanger}`} onClick={() => deleteProject(p.id)} title="Delete">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
