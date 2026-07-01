import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import styles from './GenerateAd.module.css'

const platforms = [
  { id: 'ig-post', icon: '📸', label: 'Instagram Post', size: '1080 × 1080 px', aspect: '1/1' },
  { id: 'ig-story', icon: '📱', label: 'Instagram Story', size: '1080 × 1920 px', aspect: '9/16' },
  { id: 'fb-ad', icon: '👤', label: 'Facebook Ad', size: '1200 × 630 px', aspect: '16/9' },
  { id: 'li-post', icon: '💼', label: 'LinkedIn Post', size: '1200 × 627 px', aspect: '16/9' },
  { id: 'yt-thumb', icon: '▶️', label: 'YouTube Thumbnail', size: '1280 × 720 px', aspect: '16/9' },
  { id: 'google', icon: '🔍', label: 'Google Display', size: '300 × 250 px', aspect: '4/3' },
  { id: 'ecom', icon: '🛒', label: 'E-commerce Banner', size: '940 × 313 px', aspect: '3/1' },
  { id: 'custom', icon: '📐', label: 'Custom Size', size: 'Set custom px', aspect: '1/1' },
]

const adStyles = ['Minimal', 'Modern', 'Luxury', 'Bold', 'Corporate', 'Festive', 'Gradient', 'Dark Premium']
const tones = ['Professional', 'Playful', 'Urgent', 'Inspirational', 'Trustworthy']

// Generate real ad copy based on user inputs
function generateAdConcepts(form) {
  const { productName, productDesc, brandName, industry, goal, style, tone, customColor } = form

  const name = productName || 'Your Product'
  const brand = brandName || 'Your Brand'
  const desc = productDesc || 'An amazing product'
  const keywords = desc.split(' ').filter(w => w.length > 4).slice(0, 6)
  const productImageUrls = form.productImageUrls && form.productImageUrls.length ? form.productImageUrls : (form.productImageUrl ? [form.productImageUrl] : [])
  const logoImageUrl = form.logoImageUrl || null

  const goalCopy = {
    'Brand Awareness': { ctalist: ['Discover More', 'Explore the Collection', 'Meet the New Standard'], urgency: '' },
    'Sales Promotion': { ctalist: ['Shop Now — Limited Time', 'Claim Offer', 'Buy Today, Save Big'], urgency: 'Exclusive Deal' },
    'Product Launch': { ctalist: ['Be First to Get It', 'Pre-order Now', 'Launching Soon — Join Waitlist'], urgency: 'Now Available' },
    'Lead Generation': { ctalist: ['Get a Free Demo', 'Claim Your Spot', 'Request a Sample'], urgency: 'Limited Spots' },
    'Event Promotion': { ctalist: ['Register Now', 'Secure Your Seat', 'Book Your Spot'], urgency: 'Seats Filling Fast' },
  }
  const goalData = goalCopy[goal] || goalCopy['Brand Awareness']

  const toneHeadlines = {
    'Professional': [
      `${name} — The Professional Standard`,
      `Built for Performance: ${name}`,
      `Precision & Reliability — ${name}`
    ],
    'Playful': [
      `${name} is Here to Change Everything 🎉`,
      `Make Every Day Better with ${name}`,
      `Brighten Your ${industry} Routine — ${name}`
    ],
    'Urgent': [
      `Last Chance: ${name} Deal Ends Soon!`,
      `Don't Miss Out — ${name} Selling Fast`,
      `Act Now — Limited ${name} Available`
    ],
    'Inspirational': [
      `${name}: Built for Those Who Dream Big`,
      `Your ${industry} Journey Starts with ${name}`,
      `Rise with ${name} — Designed to Inspire`
    ],
    'Trustworthy': [
      `${name} — Tested, Trusted, Proven`,
      `Trusted by Professionals — ${name}`,
      `${brand}: Quality You Can Count On`
    ],
  }
  const headlines = toneHeadlines[tone] || toneHeadlines['Professional']

  const styleConfigs = {
    'Minimal': { bg: '#ffffff', textColor: '#12112A', accent: '#6C63FF', layout: 'clean' },
    'Modern': { bg: '#F8F9FF', textColor: '#12112A', accent: '#6C63FF', layout: 'modern' },
    'Luxury': { bg: '#0a0a0a', textColor: '#D4AF37', accent: '#D4AF37', layout: 'luxury' },
    'Bold': { bg: '#12112A', textColor: '#ffffff', accent: '#FF6B6B', layout: 'bold' },
    'Corporate': { bg: '#1E3A5F', textColor: '#ffffff', accent: '#4FC3F7', layout: 'corporate' },
    'Festive': { bg: '#FF6B35', textColor: '#ffffff', accent: '#FFD700', layout: 'festive' },
    'Gradient': { bg: 'linear-gradient(135deg, #6C63FF, #FF6B6B)', textColor: '#ffffff', accent: '#ffffff', layout: 'gradient' },
    'Dark Premium': { bg: '#0d0d1a', textColor: '#E8E8FF', accent: '#9B93FF', layout: 'dark' },
  }
  const styleConf = styleConfigs[style] || styleConfigs['Minimal']
  const primaryColor = customColor || styleConf.accent

  // deterministic choice indexes for variety
  const pick = (arr, i) => arr[i % arr.length]
  const seed = (name.length + desc.length + (keywords[0]?.length || 0))

  const concepts = [
    {
      label: `Concept A — ${style} Focus`,
      headline: pick(headlines, seed),
      subheadline: `${brand} — ${industry}`,
      body: desc.length > 90 ? desc.slice(0, 90) + '...' : desc,
      cta: pick(goalData.ctalist, seed),
      urgency: goalData.urgency,
      bg: styleConf.bg,
      textColor: styleConf.textColor,
      accent: primaryColor,
      badge: goalData.urgency,
    },
    {
      label: `Concept B — ${tone} Angle`,
      headline: pick(headlines, seed + 1),
      subheadline: (keywords.length ? keywords.join(' • ') : `Premium ${industry} Product`),
      body: `Experience the difference: ${desc.slice(0, 70)}${desc.length > 70 ? '...' : ''}`,
      cta: pick(['Learn More →', 'See Details', 'Compare Options'], seed + 2),
      urgency: '',
      bg: style === 'Minimal' ? '#EFEFFF' : style === 'Luxury' ? '#1a1200' : '#12112A',
      textColor: style === 'Minimal' ? '#12112A' : '#ffffff',
      accent: primaryColor,
      badge: `By ${brand}`,
    },
    {
      label: `Concept C — ${goal} Drive`,
      headline: pick(headlines, seed + 2),
      subheadline: `${name} by ${brand}`,
      body: `Perfect for your ${industry.toLowerCase()} needs. ${goalData.urgency ? goalData.urgency + ' — ' : ''}${keywords[0] || name} you can trust.`,
      cta: pick(goalData.ctalist, seed + 3),
      urgency: goalData.urgency,
      bg: 'linear-gradient(135deg, #6C63FF 0%, #9B93FF 100%)',
      textColor: '#ffffff',
      accent: '#ffffff',
      badge: industry,
    },
  ]

  return { concepts, productImageUrls, logoImageUrl, productName: name, brand, industry }
}

export default function GenerateAd() {
  const navigate = useNavigate()
  const productImgRef = useRef(null)
  const logoImgRef = useRef(null)
  const formRef = useRef(null)

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    productName: '',
    productDesc: '',
    brandName: '',
    industry: 'Clothing',
    goal: 'Brand Awareness',
    productImage: null,
    productImageUrl: null,
    productImages: [],
    productImageUrls: [],
    logoImage: null,
    logoImageUrl: null,
    bgRemoval: true,
    imgEnhance: true,
    platform: 'ig-post',
    style: 'Minimal',
    colorMode: 'auto',
    customColor: '#6C63FF',
    tone: 'Professional',
  })
  const [dragActive, setDragActive] = useState(false)
  const [dragLogoActive, setDragLogoActive] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [genStep, setGenStep] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  // Load template prefill if coming from Templates page
  useEffect(() => {
    const prefill = sessionStorage.getItem('template_prefill')
    if (prefill) {
      try {
        const data = JSON.parse(prefill)
        const platformMap = {
          'Instagram Post': 'ig-post', 'Instagram Story': 'ig-story', 'Facebook Ad': 'fb-ad',
          'LinkedIn Post': 'li-post', 'LinkedIn': 'li-post', 'YouTube Thumbnail': 'yt-thumb',
          'Google Display': 'google', 'E-commerce Banner': 'ecom',
        }
        setForm(f => ({
          ...f,
          industry: data.industry || f.industry,
          platform: platformMap[data.platform] || f.platform,
        }))
        sessionStorage.removeItem('template_prefill')
      } catch {}
    }
  }, [])

  // keep a ref of latest form for tests/helpers to access
  useEffect(() => { formRef.current = form }, [form])

  const handleProductImage = (file) => {
    if (!file) return
    // support FileList or single File
    const fileList = file instanceof FileList ? Array.from(file) : Array.isArray(file) ? file : [file]
    const incoming = fileList.filter(f => f && f.type && f.type.startsWith('image/'))
    if (incoming.length === 0) { setError('Please upload image files (JPG, PNG, WEBP)'); return }
    // size check per file
    for (const f of incoming) { if (f.size > 10 * 1024 * 1024) { setError('Each image must be under 10MB'); return } }
    setError('')
    // merge with existing uploads and dedupe by name+size
    setForm(prev => {
      const existing = Array.isArray(prev.productImages) ? prev.productImages : []
      const combined = [...existing, ...incoming]
      const seen = new Map()
      const deduped = []
      for (const f of combined) {
        const k = `${f.name}_${f.size}`
        if (!seen.has(k)) { seen.set(k, true); deduped.push(f) }
      }
      const finalImgs = deduped.slice(0, 5)
      const urls = finalImgs.map(f => URL.createObjectURL(f))
      return { ...prev, productImages: finalImgs, productImageUrls: urls, productImage: finalImgs[0] || null, productImageUrl: urls[0] || null }
    })
  }

  const handleLogoImage = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setForm(f => ({ ...f, logoImage: file, logoImageUrl: url }))
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)
    const files = e.dataTransfer.files
    handleProductImage(files)
  }, [])

  const handleLogoDrop = useCallback((e) => {
    e.preventDefault()
    setDragLogoActive(false)
    const files = e.dataTransfer.files
    // take first file for logo
    handleLogoImage(files[0])
  }, [])

    // Expose a dev/testing hook to set test files directly from the browser context.
  // This helps automated scripts inject File objects reliably.
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.__setTestFiles = (files) => {
      try { handleProductImage(files); } catch (e) { /* ignore */ }
      try {
        let el = document.getElementById('__set_files_log')
        if (!el) {
          el = document.createElement('div')
          el.id = '__Set_files_log'
          el.style.position = 'fixed'
          el.style.left = '12px'
          el.style.top = '12px'
          el.style.background = 'rgba(0,0,0,0.7)'
          el.style.color = '#fff'
          el.style.padding = '6px'
          el.style.zIndex = 99999
          document.body.appendChild(el)
        }
        el.innerText = `__setTestFiles called: ${Array.isArray(files)?files.length: (files?.length||0)} files`;
      } catch (e) {}
    }
    // expose handler directly
    window.__handleProductImage = (files) => { try { handleProductImage(files) } catch (e) {} }
    // helper to read current form
    window.__getForm = () => formRef.current
    // helper to trigger generation directly (uses latest form via ref)
    window.__runGenerate = () => { try { handleGenerate(); } catch (e) {} }
    // expose the generator function for testing
    window.__generateAdConcepts = (frm) => { try { return generateAdConcepts(frm) } catch (e) { return null } }
    // helper to apply a result object into component state and inject a DOM copy for tests
    window.__applyResult = (res) => {
      try { setResult(res); setGenerating(false); setGenerated(true); } catch (e) {}
      try {
        let el = document.getElementById('__applied_result')
        if (!el) {
          el = document.createElement('pre')
          el.id = '__applied_result'
          el.style.position = 'fixed'
          el.style.left = '12px'
          el.style.bottom = '12px'
          el.style.width = '360px'
          el.style.maxHeight = '360px'
          el.style.overflow = 'auto'
          el.style.background = 'rgba(0,0,0,0.85)'
          el.style.color = '#0ff'
          el.style.padding = '8px'
          el.style.zIndex = 99999
          document.body.appendChild(el)
        }
        el.innerText = JSON.stringify(res, null, 2)
      } catch (e) {}
    }
    // force-generate using current form snapshot (bypasses closure issues)
    window.__forceGenerate = () => {
      try {
        const res = generateAdConcepts(formRef.current || form)
        setResult(res)
        setGenerating(false)
        setGenerated(true)
      } catch (e) { /* ignore */ }
    }
    // helper to directly set the internal `form` state for testing
    window.__setForm = (obj) => { try { setForm(f => ({ ...f, ...obj })) } catch (e) {} }
    return () => { try { delete window.__setTestFiles; delete window.__handleProductImage; delete window.__getForm; delete window.__runGenerate; delete window.__setForm; delete window.__forceGenerate } catch (e) {} }
  }, [])

  const genSteps = [
    '🔍 Analyzing your product...',
    '✍️ Writing ad copy...',
    '🎨 Building layouts...',
    '✅ Ready!',
  ]

  const handleGenerate = () => {
    if (!form.productName.trim()) { setStep(1); setError('Please enter a Product Name'); return }
    setError('')
    setGenerating(true)
    setGenStep(0)
    setGenerated(false)
    const advance = (n) => {
      if (n < genSteps.length) {
        setTimeout(() => { setGenStep(n); advance(n + 1) }, 900)
      } else {
        setTimeout(() => {
          const res = generateAdConcepts(form)
          setResult(res)
          setGenerating(false)
          setGenerated(true)
        }, 400)
      }
    }
    advance(1)
  }

  const activePlatform = platforms.find(p => p.id === form.platform)
  const progress = (step / 4) * 100

  const AdConceptCard = ({ concept, index }) => {
    const isGradient = concept.bg.startsWith('linear')
    return (
      <div className={`card ${styles.conceptCard}`}>
        <div
          className={styles.conceptPreview}
          style={{
            background: concept.bg,
            aspectRatio: activePlatform?.aspect || '1/1',
          }}
        >
          {result?.productImageUrls && result.productImageUrls.length > 0 && (
            <>
              <img
                src={result.productImageUrls[0]}
                alt="Product"
                className={styles.conceptProductImg}
                style={{ opacity: form.bgRemoval ? 0.92 : 1 }}
              />
              {result.productImageUrls.length > 1 && (
                <div className={styles.conceptThumbs}>
                  {result.productImageUrls.slice(1,5).map((u, ix) => (
                    <img key={ix} src={u} alt={`thumb-${ix}`} className={styles.conceptThumb} />
                  ))}
                </div>
              )}
            </>
          )}
          {!result?.productImageUrls?.length && (
            <div className={styles.conceptNoImg}>
              <span style={{ fontSize: 36 }}>
                {form.industry === 'Clothing' ? '👗' : form.industry === 'Electronics' ? '📱' : form.industry === 'Food' ? '🍕' : form.industry === 'Beauty' ? '💄' : form.industry === 'Fitness' ? '💪' : '📦'}
              </span>
            </div>
          )}
          <div className={styles.conceptTextOverlay} style={{ color: concept.textColor }}>
            {concept.badge && (
              <span className={styles.conceptBadge} style={{ background: concept.accent, color: isGradient || concept.bg.includes('#0') ? '#fff' : '#fff' }}>
                {concept.badge}
              </span>
            )}
            {result?.logoImageUrl && (
              <img src={result.logoImageUrl} alt="Logo" className={styles.conceptLogo} />
            )}
            <h3 className={styles.conceptHeadline}>{concept.headline}</h3>
            <p className={styles.conceptSubline}>{concept.subheadline}</p>
            <p className={styles.conceptBody}>{concept.body}</p>
            <button
              className={styles.conceptCtaBtn}
              style={{ background: concept.accent, color: concept.bg === '#ffffff' || concept.bg === '#F8F9FF' || concept.bg === '#EFEFFF' ? '#fff' : concept.textColor === '#ffffff' ? '#12112A' : '#fff' }}
            >
              {concept.cta}
            </button>
          </div>
        </div>
        <div className={styles.conceptMeta}>
          <p className={styles.conceptLabel}>{concept.label}</p>
          <p className={styles.conceptSnippet}>"{concept.headline}"</p>
          <div className={styles.conceptActions}>
            <button
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: 13 }}
              onClick={() => {
                const editForm = { ...form }
                if (form.productImageUrls && form.productImageUrls.length) editForm.productImageUrl = form.productImageUrls[0]
                if (form.logoImageUrl) editForm.logoImageUrl = form.logoImageUrl
                sessionStorage.setItem('editAd', JSON.stringify({ concept, form: editForm }))
                navigate('/editor')
              }}
            >✏️ Edit in Canvas</button>
            <button
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: 13 }}
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
                saved.unshift({
                  id: Date.now(),
                  name: `${form.productName} — ${activePlatform?.label}`,
                  platform: activePlatform?.label,
                  industry: form.industry,
                  date: 'Just now',
                  status: 'Draft',
                  concept,
                  form,
                })
                localStorage.setItem('adcraft_projects', JSON.stringify(saved.slice(0, 20)))
                alert('Saved to My Projects!')
              }}
            >💾 Save</button>
            <button className={styles.regenBtn} title="Regenerate this concept" onClick={handleGenerate}>🔄</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AppLayout title="Generate Ad">
      <div className={styles.layout}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          {/* Step progress tabs */}
          <div className={styles.stepTabs}>
            {[
              { n: 1, label: 'Product' },
              { n: 2, label: 'Assets' },
              { n: 3, label: 'Platform' },
              { n: 4, label: 'Style' },
            ].map(({ n, label }) => (
              <button
                key={n}
                className={`${styles.stepTab} ${step === n ? styles.stepTabActive : ''} ${step > n ? styles.stepTabDone : ''}`}
                onClick={() => setStep(n)}
              >
                <span className={styles.stepNum}>{step > n ? '✓' : n}</span>
                <span className={styles.stepLabel}>{label}</span>
              </button>
            ))}
          </div>

          <div className={styles.scrollArea}>
            {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

            {/* STEP 1 — Product Details */}
            {step === 1 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Product Details</h3>
                <div className={styles.formGroup}>
                  <label>Product Name <span className={styles.required}>*</span></label>
                  <input
                    className="input-field"
                    placeholder="e.g., AirPods Pro 3rd Gen"
                    value={form.productName}
                    onChange={e => set('productName', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Product Description</label>
                  <textarea
                    className={`input-field ${styles.textarea}`}
                    placeholder="Describe your product features, what makes it special, key benefits..."
                    value={form.productDesc}
                    onChange={e => set('productDesc', e.target.value)}
                  />
                  <span className={styles.charCount}>{form.productDesc.length}/500</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Brand Name</label>
                  <input
                    className="input-field"
                    placeholder="e.g., Apple"
                    value={form.brandName}
                    onChange={e => set('brandName', e.target.value)}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Industry</label>
                    <select className="input-field" value={form.industry} onChange={e => set('industry', e.target.value)}>
                      {['Clothing','Electronics','Food','Beauty','Fitness','Real Estate','Education','Festivals','Business','Technology','Other'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Campaign Goal</label>
                    <select className="input-field" value={form.goal} onChange={e => set('goal', e.target.value)}>
                      {['Brand Awareness','Sales Promotion','Product Launch','Lead Generation','Event Promotion'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Upload Assets */}
            {step === 2 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Upload Assets</h3>

                {/* Product Image Upload */}
                <div
                  className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''} ${form.productImageUrls?.length ? styles.dropzoneHasFile : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragActive(true) }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={productImgRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    aria-hidden="false"
                    tabIndex={0}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', border: 0, padding: 0, margin: 0, zIndex: 2 }}
                    onChange={e => { handleProductImage(e.target.files); try { e.target.value = '' } catch (err) {} }}
                  />
                  {form.productImageUrls && form.productImageUrls.length ? (
                    <div className={styles.uploadedPreview}>
                      <img src={form.productImageUrls[0]} alt="Product" className={styles.uploadedImg} />
                      <div className={styles.uploadedOverlay}>
                        <span>🔄 Replace Images</span>
                      </div>
                      {form.productImageUrls.length > 1 && (
                        <div className={styles.uploadThumbs}>
                          {form.productImageUrls.slice(1,5).map((u, i) => (
                            <img key={i} src={u} alt={`thumb-${i}`} className={styles.uploadThumb} />
                          ))}
                        </div>
                      )}
                      <div style={{ marginTop: 8 }}>
                        <button className="btn-outline" type="button" onClick={e => { e.stopPropagation(); productImgRef.current?.click() }} style={{ padding: '6px 10px', fontSize: 13 }}>Add Images</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.dropzoneIcon}>🖼️</div>
                      <p className={styles.dropzoneTitle}>{dragActive ? 'Drop it here!' : 'Drop your product image here'}</p>
                      <p className={styles.dropzoneNote}>JPG, PNG, WEBP up to 10MB</p>
                      <button className="btn-primary" type="button" style={{ marginTop: 12, padding: '8px 20px', fontSize: 13 }}
                        onClick={e => { e.stopPropagation(); productImgRef.current?.click() }}>
                        Browse Files
                      </button>
                    </>
                  )}
                </div>
                {(form.productImageUrls && form.productImageUrls.length) && (
                  <button className={styles.removeFileBtn} onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, productImages: [], productImageUrls: [], productImage: null, productImageUrl: null })) }}>
                    ✕ Remove images
                  </button>
                )}

                {/* Visible native multi-file input fallback for testing/multi-select (appears only on Step 2) */}
                <div style={{ marginTop: 12 }}>
                  <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: 'var(--muted)' }}>Native multi-file input (for testing):</label>
                  <input
                    id="native_multi_input"
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: 'block' }}
                    onChange={e => { handleProductImage(e.target.files); try { e.target.value = '' } catch (err) {} }}
                  />
                </div>

                {/* Logo Upload */}
                <div
                  className={`${styles.dropzone} ${styles.dropzoneSecondary} ${dragLogoActive ? styles.dropzoneActive : ''}`}
                  style={{ marginTop: 16 }}
                  onDragOver={e => { e.preventDefault(); setDragLogoActive(true) }}
                  onDragLeave={() => setDragLogoActive(false)}
                  onDrop={handleLogoDrop}
                >
                  <input
                    ref={logoImgRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    aria-hidden="false"
                    tabIndex={0}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', border: 0, padding: 0, margin: 0, zIndex: 2 }}
                    onChange={e => handleLogoImage(e.target.files[0])}
                  />
                  {form.logoImageUrl ? (
                    <div className={styles.logoPreviewSmall}>
                      <img src={form.logoImageUrl} alt="Logo" style={{ height: 40, objectFit: 'contain' }} />
                      <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>✅ Logo uploaded</span>
                    </div>
                  ) : (
                    <>
                      <div className={styles.dropzoneIcon}>🏷️</div>
                      <p className={styles.dropzoneTitle}>Upload Logo <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(Optional)</span></p>
                      <p className={styles.dropzoneNote}>PNG with transparency recommended</p>
                    </>
                  )}
                </div>

                {/* Toggles */}
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <p className={styles.toggleLabel}>Auto Remove Background</p>
                    <p className={styles.toggleSub}>AI-simulated background removal from product image</p>
                  </div>
                  <button className={`${styles.toggle} ${form.bgRemoval ? styles.toggleOn : ''}`} onClick={() => set('bgRemoval', !form.bgRemoval)}>
                    <span className={styles.toggleThumb}></span>
                  </button>
                </div>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <p className={styles.toggleLabel}>AI Image Enhancement</p>
                    <p className={styles.toggleSub}>Boost quality, brightness & sharpness</p>
                  </div>
                  <button className={`${styles.toggle} ${form.imgEnhance ? styles.toggleOn : ''}`} onClick={() => set('imgEnhance', !form.imgEnhance)}>
                    <span className={styles.toggleThumb}></span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Platform */}
            {step === 3 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Platform & Format</h3>
                <div className={styles.platformGrid}>
                  {platforms.map(p => (
                    <button
                      key={p.id}
                      className={`${styles.platformBtn} ${form.platform === p.id ? styles.platformBtnActive : ''}`}
                      onClick={() => set('platform', p.id)}
                    >
                      <span className={styles.platformBtnIcon}>{p.icon}</span>
                      <span className={styles.platformBtnLabel}>{p.label}</span>
                    </button>
                  ))}
                </div>
                {activePlatform && (
                  <div className={styles.sizeLabel}>
                    <span>📐</span> {activePlatform.size} — {activePlatform.label}
                  </div>
                )}
                {form.platform === 'custom' && (
                  <div className={styles.customSize}>
                    <div className={styles.formGroup}>
                      <label>Width (px)</label>
                      <input className="input-field" type="number" placeholder="1080" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Height (px)</label>
                      <input className="input-field" type="number" placeholder="1080" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 — Style */}
            {step === 4 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Style & Theme</h3>
                <div className={styles.formGroup}>
                  <label>Ad Style</label>
                  <div className={styles.chipRow}>
                    {adStyles.map(s => (
                      <button key={s} className={`${styles.chip} ${form.style === s ? styles.chipActive : ''}`} onClick={() => set('style', s)}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Color Preference</label>
                  <div className={styles.chipRow}>
                    <button className={`${styles.chip} ${form.colorMode === 'auto' ? styles.chipActive : ''}`} onClick={() => set('colorMode', 'auto')}>✨ Auto (AI Chooses)</button>
                    <button className={`${styles.chip} ${form.colorMode === 'custom' ? styles.chipActive : ''}`} onClick={() => set('colorMode', 'custom')}>🎨 Custom Color</button>
                  </div>
                  {form.colorMode === 'custom' && (
                    <div className={styles.colorPickerRow}>
                      <input type="color" className={styles.colorPicker} value={form.customColor} onChange={e => set('customColor', e.target.value)} />
                      <span className={styles.colorPickerLabel}>{form.customColor}</span>
                    </div>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Tone of Voice</label>
                  <div className={styles.chipRow}>
                    {tones.map(t => (
                      <button key={t} className={`${styles.chip} ${form.tone === t ? styles.chipActive : ''}`} onClick={() => set('tone', t)}>{t}</button>
                    ))}
                  </div>
                </div>

                {/* Live preview summary */}
                <div className={styles.summaryBox}>
                  <p className={styles.summaryTitle}>📋 Your Ad Summary</p>
                  <p><strong>Product:</strong> {form.productName || '—'}</p>
                  <p><strong>Brand:</strong> {form.brandName || '—'}</p>
                  <p><strong>Industry:</strong> {form.industry}</p>
                  <p><strong>Goal:</strong> {form.goal}</p>
                  <p><strong>Platform:</strong> {activePlatform?.label}</p>
                  <p><strong>Style:</strong> {form.style} · <strong>Tone:</strong> {form.tone}</p>
                  <p><strong>Images:</strong> {(form.productImageUrls && form.productImageUrls.length) ? `${form.productImageUrls.length} uploaded` : '⚠️ No image (icon will be used)'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className={styles.stepNav}>
            <div className={styles.progressWrap}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.navBtns}>
              {step > 1 && (
                <button className="btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              {step < 4 ? (
                <button
                  className="btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    if (step === 1 && !form.productName.trim()) { setError('Product Name is required'); return }
                    setError('')
                    setStep(s => s + 1)
                  }}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  className={`btn-primary ${styles.generateBtn}`}
                  onClick={handleGenerate}
                  disabled={generating}
                  style={{ flex: 1 }}
                >
                  {generating ? '⏳ Generating...' : '✨ Generate Ad'}
                </button>
              )}
            </div>
            {step === 4 && <p className={styles.generateNote}>3 unique ad concepts will be generated from your inputs</p>}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          {!generating && !generated && (
            <div className={styles.emptyState}>
              <div className={styles.emptyCanvas}>
                <div className={styles.emptyIcon}>✨</div>
                <p className={styles.emptyTitle}>Your ad will appear here</p>
                <p className={styles.emptyNote}>
                  {form.productName
                    ? `Ready to generate ads for "${form.productName}" — click Generate Ad`
                    : 'Fill in your product details on the left and click Generate Ad'}
                </p>
                {form.productName && (
                  <div className={styles.emptyReadyBadge}>
                    ✅ {form.productName}{form.brandName ? ` by ${form.brandName}` : ''} · {form.industry}
                  </div>
                )}
              </div>
            </div>
          )}

          {generating && (
            <div className={styles.generatingState}>
              <div className={styles.genAnimation}>
                <div className={styles.genRing}></div>
                <div className={styles.genRing2}></div>
                <span className={styles.genIcon}>🤖</span>
              </div>
              <p className={styles.genTitle}>Crafting your ads...</p>
              <p className={styles.genSubtitle}>Generating for: <strong>{form.productName}</strong></p>
              <div className={styles.genSteps}>
                {genSteps.map((s, i) => (
                  <div key={i} className={`${styles.genStepItem} ${genStep > i ? styles.genStepDone : ''} ${genStep === i ? styles.genStepActive : ''}`}>
                    <span className={styles.genDot}>{genStep > i ? '✓' : '○'}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {generated && result && (
            <div className={styles.conceptsArea}>
              <div className={styles.conceptsHeader}>
                <div>
                  <h3>3 Concepts for "{result.productName}"</h3>
                  <p className={styles.conceptsSubtitle}>{result.industry} · {activePlatform?.label} · {form.style} style · {form.tone} tone</p>
                </div>
                <button className="btn-outline" style={{ fontSize: 13, padding: '8px 16px' }} onClick={handleGenerate}>🔄 Regenerate</button>
              </div>
              <div className={styles.conceptsList}>
                {result.concepts.map((c, i) => (
                  <AdConceptCard key={i} concept={c} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
