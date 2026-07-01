import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import styles from './Templates.module.css'

const categories = ['All', 'Clothing', 'Electronics', 'Food & Restaurant', 'Beauty', 'Fitness', 'Real Estate', 'Education', 'Festivals', 'Business', 'Product Launch', 'Sale & Offers', 'Corporate', 'Luxury', 'Minimal']
const platforms = ['All Sizes', 'Instagram Post', 'Instagram Story', 'Facebook Ad', 'LinkedIn', 'YouTube', 'Google Display', 'E-commerce']

const templates = [
  { id: 1, name: 'Urban Fashion Drop', industry: 'Clothing', platform: 'Instagram Post', img: 1536619, premium: true },
  { id: 2, name: 'Tech Launch Pro', industry: 'Electronics', platform: 'Facebook Ad', img: 3394650, premium: false },
  { id: 3, name: 'Street Food Festival', industry: 'Food & Restaurant', platform: 'Instagram Story', img: 312418, premium: false },
  { id: 4, name: 'Glow & Radiance', industry: 'Beauty', platform: 'Instagram Post', img: 3785147, premium: true },
  { id: 5, name: 'Property Showcase', industry: 'Real Estate', platform: 'Facebook Ad', img: 323780, premium: false },
  { id: 6, name: 'Fitness Challenge', industry: 'Fitness', platform: 'Instagram Story', img: 1552249, premium: true },
  { id: 7, name: 'Diwali Dhamaka', industry: 'Festivals', platform: 'Google Display', img: 1190298, premium: false },
  { id: 8, name: 'Corporate Annual', industry: 'Business', platform: 'LinkedIn', img: 3786667, premium: false },
  { id: 9, name: 'Sale Season Blast', industry: 'Sale & Offers', platform: 'E-commerce', img: 1020585, premium: true },
  { id: 10, name: 'Premium Collection', industry: 'Luxury', platform: 'Instagram Post', img: 1370980, premium: true },
  { id: 11, name: 'Course Launch', industry: 'Education', platform: 'Facebook Ad', img: 256417, premium: false },
  { id: 12, name: 'Clean Minimal Ad', industry: 'Minimal', platform: 'LinkedIn', img: 3394650, premium: false },
]

export default function Templates() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('All')
  const [activePlat, setActivePlat] = useState('All Sizes')
  const [search, setSearch] = useState('')
  const [preview, setPreview] = useState(null)

  const filtered = templates.filter(t => {
    const catMatch = activeCat === 'All' || t.industry === activeCat || t.industry.includes(activeCat)
    const platMatch = activePlat === 'All Sizes' || t.platform === activePlat
    const searchMatch = t.name.toLowerCase().includes(search.toLowerCase())
    return catMatch && platMatch && searchMatch
  })

  const useTemplate = (t) => {
    // Pre-fill generate form with template data
    sessionStorage.setItem('template_prefill', JSON.stringify({
      industry: t.industry,
      platform: t.platform,
      templateName: t.name,
    }))
    navigate('/generate')
  }

  return (
    <AppLayout title="Templates">
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Ad Templates</h2>
          <p className={styles.pageSub}>100+ professionally designed templates, ready to customize</p>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className="input-field"
              placeholder="Search templates..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 36, borderRadius: 99, maxWidth: 480, width: '100%' }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.catScroll}>
          {categories.map(c => (
            <button
              key={c}
              className={`${styles.catTab} ${activeCat === c ? styles.catTabActive : ''}`}
              onClick={() => setActiveCat(c)}
            >{c}</button>
          ))}
        </div>

        {/* Platform Filter */}
        <div className={styles.platRow}>
          {platforms.map(p => (
            <button
              key={p}
              className={`${styles.platBtn} ${activePlat === p ? styles.platBtnActive : ''}`}
              onClick={() => setActivePlat(p)}
            >{p}</button>
          ))}
        </div>

        {/* Templates Grid */}
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No templates match your filters</h3>
            <p>Try a different category or search term</p>
            <button className="btn-outline" style={{ marginTop: 16 }} onClick={() => { setActiveCat('All'); setActivePlat('All Sizes'); setSearch('') }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(t => (
              <div key={t.id} className={`card ${styles.templateCard}`}>
                <div className={styles.templateImg}>
                  <img src={`https://images.pexels.com/photos/${t.img}/pexels-photo-${t.img}.jpeg?auto=compress&cs=tinysrgb&w=400&h=280&dpr=1`} alt={t.name} />
                  {t.premium && <span className={styles.premiumBadge}>⭐ Premium</span>}
                  <div className={styles.templateOverlay}>
                    <button className="btn-primary" style={{ padding: '9px 18px', fontSize: 13 }} onClick={() => useTemplate(t)}>Use Template</button>
                    <button className={styles.previewBtn} onClick={() => setPreview(t)}>Preview</button>
                  </div>
                </div>
                <div className={styles.templateMeta}>
                  <p className={styles.templateName}>{t.name}</p>
                  <div className={styles.templateTags}>
                    <span className="tag tag-primary" style={{ fontSize: 10 }}>{t.platform}</span>
                    <span className="tag tag-muted" style={{ fontSize: 10 }}>{t.industry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        {preview && (
          <div className={styles.modalOverlay} onClick={() => setPreview(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalLeft}>
                <img src={`https://images.pexels.com/photos/${preview.img}/pexels-photo-${preview.img}.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&dpr=1`} alt={preview.name} className={styles.modalImg} />
              </div>
              <div className={styles.modalRight}>
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>{preview.name}</h3>
                  {preview.premium && <span className={styles.premiumBadge}>⭐ Premium</span>}
                </div>
                <div className={styles.modalInfo}>
                  <div className={styles.modalInfoRow}><span>Industry</span><span>{preview.industry}</span></div>
                  <div className={styles.modalInfoRow}><span>Platform</span><span>{preview.platform}</span></div>
                  <div className={styles.modalInfoRow}><span>Dimensions</span><span>1080 × 1080 px</span></div>
                </div>
                <p className={styles.modalDesc}>A professionally designed template optimized for {preview.industry.toLowerCase()} brands. Fully customizable with your brand colors, fonts, and product images.</p>
                <div className={styles.modalCustomizable}>
                  <p className={styles.modalCustomLabel}>What you can customize:</p>
                  <ul className={styles.customList}>
                    <li>✅ Headline & body text</li>
                    <li>✅ Product image</li>
                    <li>✅ Brand colors & fonts</li>
                    <li>✅ CTA button text</li>
                    <li>✅ Logo placement</li>
                  </ul>
                </div>
                <div className={styles.modalActions}>
                  <Link to="/generate" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={() => useTemplate(preview)}>
                    Use This Template
                  </Link>
                  <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: 8 }} onClick={() => setPreview(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
