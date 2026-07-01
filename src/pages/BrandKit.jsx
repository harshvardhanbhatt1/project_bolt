import { useState, useEffect, useRef } from 'react'
import AppLayout from '../components/AppLayout'
import styles from './BrandKit.module.css'

const personalities = ['Professional', 'Playful', 'Luxurious', 'Bold', 'Minimalist', 'Trustworthy', 'Youthful', 'Authoritative']
const tones = ['Professional', 'Friendly', 'Luxury', 'Urgent', 'Inspirational']
const fonts = ['Plus Jakarta Sans', 'Inter', 'Playfair Display', 'Roboto', 'Montserrat', 'Lato', 'Raleway', 'DM Sans', 'Nunito', 'Poppins']
const STORAGE_KEY = 'adcraft_brand_kit'

const defaultKit = {
  brandName: '',
  industry: 'Technology',
  tagline: '',
  selectedPersonalities: ['Professional', 'Trustworthy'],
  primaryColor: '#6C63FF',
  secondaryColor: '#4B44CC',
  accentColor: '#FF6B6B',
  bgColor: '#F8F9FF',
  extraColors: [],
  headingFont: 'Plus Jakarta Sans',
  bodyFont: 'Inter',
  selectedTone: 'Professional',
  targetAudience: '',
  usps: ['Premium Quality', 'Fast Delivery'],
  logoUrl: null,
  logoSecondaryUrl: null,
  watermarkUrl: null,
}

export default function BrandKit() {
  const [kit, setKit] = useState(defaultKit)
  const [saved, setSaved] = useState(false)
  const [uspInput, setUspInput] = useState('')
  const logoRef = useRef()
  const logo2Ref = useRef()
  const watermarkRef = useRef()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setKit(JSON.parse(stored)) } catch {}
    }
  }, [])

  const setK = (key, val) => setKit(k => ({ ...k, [key]: val }))

  const saveKit = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kit))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const togglePersonality = (p) => setK('selectedPersonalities', kit.selectedPersonalities.includes(p) ? kit.selectedPersonalities.filter(x => x !== p) : [...kit.selectedPersonalities, p])

  const addUsp = (e) => {
    if (e.key === 'Enter' && uspInput.trim()) {
      setK('usps', [...kit.usps, uspInput.trim()])
      setUspInput('')
    }
  }
  const removeUsp = (i) => setK('usps', kit.usps.filter((_, idx) => idx !== i))

  const handleLogo = (e, key) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setK(key, url)
  }

  const suggestColors = () => {
    if (!kit.brandName) return
    const hue = (kit.brandName.charCodeAt(0) * 47) % 360
    setK('primaryColor', `hsl(${hue}, 65%, 55%)`)
    setK('secondaryColor', `hsl(${(hue + 30) % 360}, 60%, 40%)`)
    setK('accentColor', `hsl(${(hue + 150) % 360}, 70%, 55%)`)
  }

  const suggestFonts = () => {
    const ind = kit.industry
    const pairs = {
      Technology: ['Plus Jakarta Sans', 'Inter'],
      Fashion: ['Playfair Display', 'Raleway'],
      Food: ['Nunito', 'Inter'],
      Beauty: ['Montserrat', 'Lato'],
      Fitness: ['Roboto', 'Inter'],
      Corporate: ['Plus Jakarta Sans', 'Inter'],
      Education: ['DM Sans', 'Inter'],
    }
    const pair = pairs[ind] || pairs.Corporate
    setK('headingFont', pair[0])
    setK('bodyFont', pair[1])
  }

  return (
    <AppLayout title="Brand Kit">
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h2 className={styles.pageTitle}>Brand Kit</h2>
            <p className={styles.pageSub}>Store your brand identity so every ad stays consistent</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {saved && <span className="tag tag-success">✅ Saved!</span>}
            <button className="btn-primary" style={{ padding: '10px 22px' }} onClick={saveKit}>💾 Save Brand Kit</button>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.leftCol}>
            {/* Brand Basics */}
            <div className="card">
              <h3 className={styles.cardTitle}>Brand Basics</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Brand Name</label>
                  <input className="input-field" placeholder="e.g., AdCraft AI" value={kit.brandName} onChange={e => setK('brandName', e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Industry</label>
                  <select className="input-field" value={kit.industry} onChange={e => setK('industry', e.target.value)}>
                    {['Technology', 'Fashion', 'Food', 'Beauty', 'Fitness', 'Finance', 'Education', 'Healthcare', 'Real Estate', 'Business'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Tagline</label>
                  <input className="input-field" placeholder="e.g., Generate. Stand Out. Grow." value={kit.tagline} onChange={e => setK('tagline', e.target.value)} />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Brand Personality <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 11 }}>({kit.selectedPersonalities.length} selected)</span></label>
                  <div className={styles.chips}>
                    {personalities.map(p => (
                      <button key={p} className={`${styles.chip} ${kit.selectedPersonalities.includes(p) ? styles.chipActive : ''}`} onClick={() => togglePersonality(p)}>{p}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logos & Assets */}
            <div className="card" style={{ marginTop: 24 }}>
              <h3 className={styles.cardTitle}>Logos & Assets</h3>
              <div className={styles.logoGrid}>
                <div>
                  <p className={styles.logoLabel}>Primary Logo</p>
                  <input ref={logoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleLogo(e, 'logoUrl')} />
                  {kit.logoUrl ? (
                    <div className={styles.logoPreview}>
                      <img src={kit.logoUrl} alt="Logo" style={{ maxHeight: 60, objectFit: 'contain', maxWidth: '100%' }} />
                      <div className={styles.logoActions}>
                        <button className={styles.smallBtn} onClick={() => logoRef.current?.click()}>Replace</button>
                        <button className={`${styles.smallBtn} ${styles.smallBtnDanger}`} onClick={() => setK('logoUrl', null)}>Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.uploadZone} onClick={() => logoRef.current?.click()}>
                      <span>📁</span>
                      <p>Upload Primary Logo</p>
                      <span className={styles.uploadNote}>PNG recommended</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className={styles.logoLabel}>Secondary Logo <span>(Optional)</span></p>
                  <input ref={logo2Ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleLogo(e, 'logoSecondaryUrl')} />
                  {kit.logoSecondaryUrl ? (
                    <div className={styles.logoPreview}>
                      <img src={kit.logoSecondaryUrl} alt="Logo 2" style={{ maxHeight: 60, objectFit: 'contain', maxWidth: '100%' }} />
                      <button className={`${styles.smallBtn} ${styles.smallBtnDanger}`} onClick={() => setK('logoSecondaryUrl', null)}>Remove</button>
                    </div>
                  ) : (
                    <div className={styles.uploadZone} onClick={() => logo2Ref.current?.click()}>
                      <span>📁</span>
                      <p>Upload Secondary Logo</p>
                      <span className={styles.uploadNote}>Alternate version</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className={styles.logoLabel}>Watermark <span>(Optional)</span></p>
                  <input ref={watermarkRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleLogo(e, 'watermarkUrl')} />
                  {kit.watermarkUrl ? (
                    <div className={styles.logoPreview}>
                      <img src={kit.watermarkUrl} alt="Watermark" style={{ maxHeight: 40, opacity: 0.5 }} />
                      <button className={`${styles.smallBtn} ${styles.smallBtnDanger}`} onClick={() => setK('watermarkUrl', null)}>Remove</button>
                    </div>
                  ) : (
                    <div className={styles.uploadZone} onClick={() => watermarkRef.current?.click()}>
                      <span>💧</span>
                      <p>Upload Watermark</p>
                      <span className={styles.uploadNote}>Transparent PNG</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            {/* Brand Colors */}
            <div className="card">
              <h3 className={styles.cardTitle}>Brand Colors</h3>
              <div className={styles.colorList}>
                {[
                  { label: 'Primary Color', key: 'primaryColor' },
                  { label: 'Secondary Color', key: 'secondaryColor' },
                  { label: 'Accent Color', key: 'accentColor' },
                  { label: 'Background Color', key: 'bgColor' },
                ].map(c => (
                  <div key={c.key} className={styles.colorRow}>
                    <input type="color" value={kit[c.key]} onChange={e => setK(c.key, e.target.value)} className={styles.colorSwatch} />
                    <div className={styles.colorInfo}>
                      <p className={styles.colorLabel}>{c.label}</p>
                      <input
                        className={`input-field ${styles.hexInput}`}
                        value={kit[c.key]}
                        onChange={e => setK(c.key, e.target.value)}
                        onBlur={e => { if (!/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setK(c.key, '#6C63FF') }}
                      />
                    </div>
                    <div className={styles.colorPreviewBox} style={{ background: kit[c.key] }}></div>
                  </div>
                ))}
              </div>
              {kit.extraColors.map((c, i) => (
                <div key={i} className={styles.colorRow} style={{ marginTop: 8 }}>
                  <input type="color" value={c} onChange={e => setK('extraColors', kit.extraColors.map((ec, ei) => ei === i ? e.target.value : ec))} className={styles.colorSwatch} />
                  <input className={`input-field ${styles.hexInput}`} value={c} onChange={e => setK('extraColors', kit.extraColors.map((ec, ei) => ei === i ? e.target.value : ec))} />
                  <button className={styles.smallBtn} style={{ marginLeft: 4 }} onClick={() => setK('extraColors', kit.extraColors.filter((_, ei) => ei !== i))}>✕</button>
                </div>
              ))}
              <button className={styles.addColor} onClick={() => setK('extraColors', [...kit.extraColors, '#000000'])}>+ Add Another Color</button>
              <button
                className="btn-primary"
                style={{ marginTop: 14, padding: '9px 16px', fontSize: 13, width: '100%', justifyContent: 'center' }}
                onClick={suggestColors}
                disabled={!kit.brandName}
                title={kit.brandName ? 'Auto-detect colors from brand name' : 'Enter a brand name first'}
              >
                ✨ Auto-detect from Logo
              </button>
            </div>

            {/* Typography */}
            <div className="card" style={{ marginTop: 24 }}>
              <h3 className={styles.cardTitle}>Brand Fonts</h3>
              <div className={styles.fontGroup}>
                <div>
                  <label className={styles.fontLabel}>Heading Font</label>
                  <select className="input-field" value={kit.headingFont} onChange={e => setK('headingFont', e.target.value)} style={{ marginBottom: 8 }}>
                    {fonts.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <p className={styles.fontPreview} style={{ fontFamily: kit.headingFont }}>The quick brown fox</p>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label className={styles.fontLabel}>Body Font</label>
                  <select className="input-field" value={kit.bodyFont} onChange={e => setK('bodyFont', e.target.value)} style={{ marginBottom: 8 }}>
                    {fonts.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <p className={styles.fontPreviewBody} style={{ fontFamily: kit.bodyFont }}>The quick brown fox jumps over the lazy dog</p>
                </div>
                <button
                  className="btn-primary"
                  style={{ marginTop: 16, padding: '9px 16px', fontSize: 13, width: '100%', justifyContent: 'center' }}
                  onClick={suggestFonts}
                >
                  ✨ Recommend Fonts for {kit.industry || 'My Brand'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Voice */}
        <div className="card">
          <h3 className={styles.cardTitle}>Tone & Voice</h3>
          <div className={styles.voiceGrid}>
            <div className={styles.formGroup}>
              <label>Tone of Voice</label>
              <div className={styles.chips}>
                {tones.map(t => (
                  <button key={t} className={`${styles.chip} ${kit.selectedTone === t ? styles.chipActive : ''}`} onClick={() => setK('selectedTone', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Target Audience</label>
              <input className="input-field" placeholder="e.g., Young professionals aged 25–35" value={kit.targetAudience} onChange={e => setK('targetAudience', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Key USPs <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 11 }}>(Enter to add)</span></label>
              <div className={styles.tagInput}>
                {kit.usps.map((u, i) => (
                  <span key={i} className={styles.uspTag}>{u}<button onClick={() => removeUsp(i)} className={styles.uspRemove}>×</button></span>
                ))}
                <input className={styles.inlineInput} placeholder="Add USP..." value={uspInput} onChange={e => setUspInput(e.target.value)} onKeyDown={addUsp} />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="card">
          <h3 className={styles.cardTitle}>Brand Kit Preview</h3>
          <p className={styles.previewNote}>Live preview using your brand identity — updates as you edit</p>
          <div className={styles.brandPreview} style={{ background: kit.primaryColor }}>
            <div className={styles.brandPreviewContent}>
              <div className={styles.brandLogo} style={{ background: 'rgba(255,255,255,0.2)' }}>
                {kit.logoUrl ? <img src={kit.logoUrl} alt="Logo" style={{ height: 20, marginRight: 6, objectFit: 'contain' }} /> : '⚡'}
                {kit.brandName || 'Your Brand'}
              </div>
              <h2 className={styles.brandHeadline} style={{ fontFamily: kit.headingFont, color: '#fff' }}>
                {kit.tagline || `${kit.brandName ? kit.brandName + ':' : ''} Built for Excellence`}
              </h2>
              <p className={styles.brandDesc} style={{ fontFamily: kit.bodyFont }}>
                {kit.targetAudience ? `For ${kit.targetAudience}` : 'Consistent, professional, and uniquely yours'}
              </p>
              {kit.usps.length > 0 && (
                <div className={styles.brandUsps}>
                  {kit.usps.slice(0, 3).map((u, i) => <span key={i} className={styles.brandUspTag}>✓ {u}</span>)}
                </div>
              )}
              <button className={styles.brandCta} style={{ background: kit.accentColor, fontFamily: kit.bodyFont }}>
                Discover More
              </button>
            </div>
            <div className={styles.brandColorSwatches}>
              {[kit.primaryColor, kit.secondaryColor, kit.accentColor, kit.bgColor].map((c, i) => (
                <div key={i} className={styles.swatchBox} style={{ background: c }}></div>
              ))}
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 6 }}>Color palette</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
