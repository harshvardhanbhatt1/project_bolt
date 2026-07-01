import { useState, useRef } from 'react'
import AppLayout from '../components/AppLayout'
import styles from './AIAssistant.module.css'

const contentTypes = ['Headlines', 'Slogans', 'CTAs', 'Ad Copy', 'Product Description', 'Feature Highlights', 'Campaign Ideas', 'Audience Strategy', 'Seasonal Ideas']

// Generate content dynamically from inputs
function generateContent(form) {
  const { productName, productDesc, industry, goal, audience, types } = form
  const name = productName || 'Your Product'
  const desc = productDesc || 'a high-quality product'
  const ind = industry || 'Business'
  const aud = audience || 'general consumers'
  const keywords = desc.split(' ').filter(w => w.length > 3).slice(0, 6)
  const kw = keywords.join(', ')

  const goalWords = {
    'Brand Awareness': { action: 'Discover', urgency: '', benefit: 'loved by thousands' },
    'Sales Promotion': { action: 'Shop', urgency: 'Limited Time', benefit: 'save big today' },
    'Product Launch': { action: 'Get', urgency: 'Now Available', benefit: 'be among the first' },
    'Lead Generation': { action: 'Book', urgency: 'Free Consultation', benefit: 'see results faster' },
    'Event Promotion': { action: 'Join', urgency: 'Register Today', benefit: 'don\'t miss out' },
  }
  const gw = goalWords[goal] || goalWords['Brand Awareness']

  const result = {}

  if (types.includes('Headlines')) {
    result.headlines = [
      { text: `${name} — The ${ind} Solution Everyone's Talking About`, strength: { clarity: 92, impact: 88, emotion: 76 } },
      { text: `Introducing ${name}: ${desc.slice(0, 50)}${desc.length > 50 ? '...' : ''}`, strength: { clarity: 97, impact: 82, emotion: 70 } },
      { text: `Why ${aud.split(' ')[0] || 'Smart People'} Choose ${name} Over Everything Else`, strength: { clarity: 85, impact: 93, emotion: 88 } },
      { text: `${gw.urgency ? gw.urgency + ': ' : ''}${name} — ${gw.benefit.charAt(0).toUpperCase() + gw.benefit.slice(1)}`, strength: { clarity: 96, impact: 91, emotion: 72 } },
      { text: `Transform Your ${ind} Experience with ${name}`, strength: { clarity: 89, impact: 84, emotion: 81 } },
    ]
  }

  if (types.includes('Slogans')) {
    // produce a wider variety of slogan styles: punchy, benefit-led, question, rhythmic, and short-tag
    const punch = `${name} — Better ${ind}`
    const benefit = `${name}: ${gw.benefit.charAt(0).toUpperCase() + gw.benefit.slice(1)}`
    const question = keywords[0] ? `Want ${keywords[0]}? Choose ${name}` : `Looking for better ${ind}? ${name}`
    const rhythmic = `${name} — Love It. Use It. Share It.`
    const short = `${name}. Simply Superior.`
    const trust = `${name}: Proven in ${ind}`
    const witty = keywords[0] ? `${keywords[0]} Done Right — ${name}` : `${name}: It Just Works`
    const numbers = `Top Choice for ${ind} — ${name}`

    result.slogans = [
      { text: punch, tone: 'Punchy' },
      { text: benefit, tone: 'Benefit-led' },
      { text: question, tone: 'Question' },
      { text: rhythmic, tone: 'Rhythmic' },
      { text: short, tone: 'Short' },
      { text: trust, tone: 'Trust' },
      { text: witty, tone: 'Witty' },
      { text: numbers, tone: 'Authority' },
      { text: `${name}: Elevate Your ${ind}`, tone: 'Aspirational' },
      { text: `${name} — Designed for ${aud}`, tone: 'Audience' },
    ]
  }

  if (types.includes('CTAs')) {
    // stronger, more varied CTAs with clarity + urgency + benefit
    const verb = gw.action || 'Get'
    result.ctaBtns = [
      `${verb} ${name} Now`,
      `Try ${name} Free — No Risk`,
      `Shop ${name} — Limited Offer`,
      `See How ${name} Works`,
      `Get Yours Today`,
      `Claim 20% Off — ${name}`,
      `Reserve ${name} Now`,
      `Compare Plans`,
      `Book a Free Demo`,
      `Join ${name} Users →`,
    ]
  }

  if (types.includes('Ad Copy')) {
    result.adCopy = {
      short: `🔥 ${name} is here!\n\n${desc.slice(0, 80)}${desc.length > 80 ? '...' : ''}\n\n${gw.urgency ? gw.urgency + ' — ' : ''}${gw.benefit.charAt(0).toUpperCase() + gw.benefit.slice(1)}.\n\n👉 ${gw.action} ${name} Now`,
      medium: `Introducing ${name} — the ${ind} product designed for ${aud}.\n\n${desc}\n\n✅ ${keywords[0] || 'Premium quality'}\n✅ ${keywords[1] || 'Proven results'}\n✅ ${keywords[2] || 'Trusted brand'}\n\n${gw.urgency ? '⚡ ' + gw.urgency + ': ' : ''}${gw.benefit.charAt(0).toUpperCase() + gw.benefit.slice(1)}.\n\n👉 ${gw.action} now before it's too late!`,
      long: `Are you looking for the best ${ind.toLowerCase()} product? Look no further than ${name}.\n\n${desc}\n\nDesigned specifically for ${aud}, ${name} delivers results that matter. Whether you're ${gw.benefit}, our product has been crafted to exceed your expectations.\n\nHere's what makes ${name} different:\n• ${keywords[0] || 'Industry-leading quality'}\n• ${keywords[1] || 'Proven performance'}\n• ${keywords[2] || 'Exceptional value'}\n• Trusted by thousands of satisfied customers\n\n${gw.urgency ? '⚡ ' + gw.urgency + ' — ' : ''}Join thousands who have already made the switch. ${gw.benefit.charAt(0).toUpperCase() + gw.benefit.slice(1)}.\n\n👉 ${gw.action} ${name} today — you won't regret it!`,
    }
  }

  if (types.includes('Feature Highlights')) {
    result.features = keywords.length > 0 ? keywords.map(kw => ({
      title: kw.charAt(0).toUpperCase() + kw.slice(1),
      desc: `${name}'s ${kw} feature ensures ${aud} get the best ${ind.toLowerCase()} experience possible.`
    })) : [
      { title: 'Premium Quality', desc: `${name} is crafted with the finest materials for lasting performance.` },
      { title: 'Easy to Use', desc: `Designed with ${aud} in mind — intuitive and effortless.` },
      { title: 'Proven Results', desc: `Thousands of customers trust ${name} for consistent, reliable results.` },
    ]
  }

  if (types.includes('Campaign Ideas')) {
    result.campaigns = [
      {
        name: `${name} ${goal.split(' ')[0]} Blitz`,
        desc: `A 7-day intensive campaign targeting ${aud} across digital channels with daily content drops showcasing ${name}'s key benefits.`,
        platforms: ind === 'Clothing' ? ['Instagram', 'Pinterest', 'TikTok'] : ind === 'Electronics' ? ['YouTube', 'Google', 'LinkedIn'] : ['Facebook', 'Instagram', 'Google'],
        angle: `${goal} via social proof and ${desc.slice(0, 40)}`,
      },
      {
        name: `${name} ${ind} Authority Campaign`,
        desc: `Position ${name} as the go-to ${ind.toLowerCase()} solution through educational content, testimonials, and expert endorsements targeting ${aud}.`,
        platforms: ['LinkedIn', 'YouTube', 'Google Display'],
        angle: 'Thought leadership + trust building',
      },
      {
        name: `${gw.urgency || 'Exclusive'} ${name} Offer Push`,
        desc: `High-urgency campaign with limited-time offers and countdown timers to drive immediate action from ${aud}.`,
        platforms: ['Facebook', 'Instagram', 'Google Shopping'],
        angle: `FOMO + ${gw.urgency || 'urgency'} + direct response`,
      },
    ]
  }

  if (types.includes('Audience Strategy')) {
    result.audienceStrategy = {
      'Primary Audience': `${aud}`,
      'Demographics': ind === 'Clothing' ? '18–35, urban, fashion-conscious, mid-to-high income' : ind === 'Electronics' ? '20–45, tech-savvy, early adopters, professionals' : ind === 'Food' ? '25–45, health-conscious, urban, family-oriented' : `25–45, ${ind.toLowerCase()} enthusiasts, income-stable`,
      'Psychographics': `Quality-seeking, value-conscious, ${ind.toLowerCase()}-interested, ${goal === 'Brand Awareness' ? 'open to discovery' : 'action-ready and conversion-prone'}`,
      'Pain Points': `Difficulty finding reliable ${ind.toLowerCase()} solutions; skeptical of claims; time-constrained`,
      'Message Angle': `${name} solves ${aud}'s core ${ind.toLowerCase()} needs — ${gw.benefit}`,
      'Recommended Platforms': ind === 'Clothing' ? 'Instagram, Pinterest, TikTok' : ind === 'Electronics' ? 'YouTube, Google, Reddit' : ind === 'Business' ? 'LinkedIn, Google, Email' : 'Facebook, Instagram, Google',
      'Best Ad Formats': goal === 'Sales Promotion' ? 'Carousel Ads, Shopping Ads, Retargeting' : goal === 'Brand Awareness' ? 'Video Ads, Stories, Display' : 'Lead Forms, Click-to-Web, Sponsored Content',
    }
  }

  if (types.includes('Seasonal Ideas')) {
    result.seasonal = [
      { season: '🎄 Christmas/New Year', idea: `${name} Gift Guide Campaign — Position ${name} as the perfect gift for ${aud}. "Gift the best ${ind.toLowerCase()} experience."` },
      { season: '🌞 Summer', idea: `Summer ${ind} Upgrade — ${name} helps ${aud} make the most of summer. Bright visuals, energetic copy.` },
      { season: '🎯 Back to Business', idea: `New Season, New ${name} — Target ${aud} refreshing their ${ind.toLowerCase()} setup. Professional tone, productivity angle.` },
      { season: '🛍️ Sale Season', idea: `${gw.urgency || 'Black Friday'} ${name} Deal — Maximum urgency campaign with countdown timer. "Best price of the year for ${name}."` },
    ]
  }

  if (types.includes('Product Description')) {
    result.productDescription = {
      short: `${name} — ${desc.slice(0, 100)}${desc.length > 100 ? '...' : ''} Perfect for ${aud}.`,
      seo: `Buy ${name} online. ${desc} Ideal for ${aud} in the ${ind.toLowerCase()} space. ${kw}. ${gw.benefit.charAt(0).toUpperCase() + gw.benefit.slice(1)}.`,
      detailed: `${name} is a premium ${ind.toLowerCase()} product designed for ${aud}. ${desc}\n\nKey Features:\n${keywords.slice(0, 4).map(k => `• ${k.charAt(0).toUpperCase() + k.slice(1)}`).join('\n')}\n\nIdeal for: ${aud}\nCategory: ${ind}`,
    }
  }

  return result
}

export default function AIAssistant() {
  const [form, setForm] = useState({
    productName: '',
    productDesc: '',
    industry: 'Clothing',
    goal: 'Brand Awareness',
    audience: '',
    types: ['Headlines', 'Slogans', 'CTAs'],
  })
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('Headlines')
  const [adCopyMode, setAdCopyMode] = useState('short')
  const [error, setError] = useState('')
  const [recentPrompts, setRecentPrompts] = useState([
    { productName: 'Nike Air Max 2025', industry: 'Clothing', goal: 'Brand Awareness', audience: 'Young athletes aged 18-30' },
    { productName: 'iPhone 16 Pro', industry: 'Electronics', goal: 'Product Launch', audience: 'Tech enthusiasts' },
  ])
  const [copiedIdx, setCopiedIdx] = useState(null)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleType = (t) => setForm(f => ({
    ...f,
    types: f.types.includes(t) ? f.types.filter(x => x !== t) : [...f.types, t]
  }))

  const handleGenerate = () => {
    if (!form.productName.trim()) { setError('Enter a product name to generate content'); return }
    if (form.types.length === 0) { setError('Select at least one content type'); return }
    setError('')
    setGenerating(true)
    setTimeout(() => {
      const res = generateContent({ ...form })
      setResult(res)
      setGenerated(true)
      setGenerating(false)
      const firstAvailableTab = form.types[0]
      setActiveTab(firstAvailableTab)
      // Save to recent
      setRecentPrompts(prev => [{ productName: form.productName, industry: form.industry, goal: form.goal, audience: form.audience }, ...prev.slice(0, 2)])
    }, 1500)
  }

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  const loadRecent = (p) => {
    setForm(f => ({ ...f, productName: p.productName, industry: p.industry, goal: p.goal, audience: p.audience || '' }))
    setGenerated(false)
  }

  const availableTabs = result ? Object.keys(result) : []

  const tabLabels = {
    headlines: 'Headlines', slogans: 'Slogans', ctaBtns: 'CTAs', adCopy: 'Ad Copy',
    productDescription: 'Product Description', features: 'Feature Highlights',
    campaigns: 'Campaign Ideas', audienceStrategy: 'Audience Strategy', seasonal: 'Seasonal Ideas',
  }

  const StrengthBar = ({ value, color }) => (
    <div className={styles.strengthTrack}>
      <div className={styles.strengthFill} style={{ width: `${value}%`, background: color }}></div>
    </div>
  )

  return (
    <AppLayout title="AI Marketing Assistant">
      <div className={styles.layout}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>🤖</span>
            <div>
              <h3 className={styles.panelTitle}>AI Marketing Assistant</h3>
              <p className={styles.panelSub}>Describe your product and I'll generate real marketing content</p>
            </div>
          </div>

          <div className={styles.formScroll}>
            {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

            <div className={styles.formGroup}>
              <label>Product Name <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input
                className="input-field"
                placeholder="e.g., Nike Air Max 2025"
                value={form.productName}
                onChange={e => set('productName', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Product Description</label>
              <textarea
                className={`input-field ${styles.textarea}`}
                placeholder="Describe features, benefits, what makes it special..."
                value={form.productDesc}
                onChange={e => set('productDesc', e.target.value)}
              />
              <span style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right' }}>{form.productDesc.length} chars — more detail = better content</span>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Industry</label>
                <select className="input-field" value={form.industry} onChange={e => set('industry', e.target.value)}>
                  {['Clothing','Electronics','Food','Beauty','Fitness','Real Estate','Education','Festivals','Business','Technology'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Campaign Goal</label>
                <select className="input-field" value={form.goal} onChange={e => set('goal', e.target.value)}>
                  {['Brand Awareness','Sales Promotion','Product Launch','Lead Generation','Event Promotion'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Target Audience</label>
              <input
                className="input-field"
                placeholder="e.g., Young professionals aged 25–35"
                value={form.audience}
                onChange={e => set('audience', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Generate Content For <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 11 }}>({form.types.length} selected)</span></label>
              <div className={styles.chips}>
                {contentTypes.map(t => (
                  <button
                    key={t}
                    className={`${styles.chip} ${form.types.includes(t) ? styles.chipActive : ''}`}
                    onClick={() => toggleType(t)}
                  >{t}</button>
                ))}
              </div>
            </div>

            <button
              className={`btn-primary ${styles.generateBtn}`}
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? '⏳ Generating...' : '✨ Generate Marketing Content'}
            </button>

            <div className={styles.recentSection}>
              <p className={styles.recentLabel}>Recent Prompts</p>
              {recentPrompts.map((p, i) => (
                <button key={i} className={styles.recentItem} onClick={() => loadRecent(p)}>
                  <span>🕐</span>
                  <span>{p.productName} — {p.industry}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          {generating && (
            <div className={styles.emptyState}>
              <div className={styles.genSpinner}></div>
              <h3>Generating for "{form.productName}"...</h3>
              <p>Crafting {form.types.length} content type{form.types.length > 1 ? 's' : ''} — this takes just a moment</p>
            </div>
          )}

          {!generating && !generated && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✨</div>
              <h3>Your AI-generated marketing content will appear here</h3>
              <p>Fill in your product details and click Generate</p>
              {form.productName && <p className={styles.readyBadge}>Ready to generate for: <strong>{form.productName}</strong></p>}
            </div>
          )}

          {!generating && generated && result && (
            <div className={styles.outputArea}>
              <div className={styles.outputHeader}>
                <div>
                  <h3>{form.productName} — Marketing Content</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)' }}>{form.industry} · {form.goal} · {Object.keys(result).length} content types generated</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-outline" style={{ fontSize: 12, padding: '7px 14px' }} onClick={handleGenerate}>🔄 Regenerate</button>
                  <span className="tag tag-success">✅ Ready</span>
                </div>
              </div>

              <div className={styles.outputTabs}>
                {Object.keys(result).map(key => (
                  <button
                    key={key}
                    className={`${styles.outputTab} ${activeTab === key ? styles.outputTabActive : ''}`}
                    onClick={() => setActiveTab(key)}
                  >{tabLabels[key] || key}</button>
                ))}
              </div>

              {/* HEADLINES */}
              {activeTab === 'headlines' && result.headlines && (
                <div className={styles.tabContent}>
                  {result.headlines.map((h, i) => (
                    <div key={i} className={styles.headlineCard}>
                      <div className={styles.headlineTop}>
                        <span className={styles.headlineNum}>#{i + 1}</span>
                        <p className={styles.headlineText}>{h.text}</p>
                        <button className={`${styles.copyBtn} ${copiedIdx === `h${i}` ? styles.copyBtnDone : ''}`} onClick={() => copyToClipboard(h.text, `h${i}`)}>
                          {copiedIdx === `h${i}` ? '✅' : '📋'}
                        </button>
                      </div>
                      <div className={styles.strengthBars}>
                        <div className={styles.strengthItem}><span>Clarity</span><StrengthBar value={h.strength.clarity} color="var(--primary)" /><span className={styles.strengthVal}>{h.strength.clarity}%</span></div>
                        <div className={styles.strengthItem}><span>Impact</span><StrengthBar value={h.strength.impact} color="var(--accent)" /><span className={styles.strengthVal}>{h.strength.impact}%</span></div>
                        <div className={styles.strengthItem}><span>Emotion</span><StrengthBar value={h.strength.emotion} color="var(--warning)" /><span className={styles.strengthVal}>{h.strength.emotion}%</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SLOGANS */}
              {activeTab === 'slogans' && result.slogans && (
                <div className={styles.tabContent}>
                  {result.slogans.map((s, i) => (
                    <div key={i} className={styles.sloganCard}>
                      <div className={styles.sloganLeft}>
                        <span className="tag tag-primary" style={{ fontSize: 10 }}>{s.tone}</span>
                        <p className={styles.sloganText}>{s.text}</p>
                      </div>
                      <button className={`${styles.copyBtn} ${copiedIdx === `s${i}` ? styles.copyBtnDone : ''}`} onClick={() => copyToClipboard(s.text, `s${i}`)}>{copiedIdx === `s${i}` ? '✅' : '📋'}</button>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              {activeTab === 'ctaBtns' && result.ctaBtns && (
                <div className={styles.ctaGrid}>
                  {result.ctaBtns.map((cta, i) => (
                    <div key={i} className={styles.ctaItem}>
                      <button className={styles.ctaPreviewBtn}>{cta}</button>
                      <button className={`${styles.copyBtn} ${copiedIdx === `cta${i}` ? styles.copyBtnDone : ''}`} onClick={() => copyToClipboard(cta, `cta${i}`)}>{copiedIdx === `cta${i}` ? '✅' : '📋'}</button>
                    </div>
                  ))}
                </div>
              )}

              {/* AD COPY */}
              {activeTab === 'adCopy' && result.adCopy && (
                <div className={styles.tabContent}>
                  <div className={styles.adCopyToggles}>
                    {[['short', 'Short-form'], ['medium', 'Medium-form'], ['long', 'Long-form']].map(([key, label]) => (
                      <button key={key} className={`${styles.modeBtn} ${adCopyMode === key ? styles.modeBtnActive : ''}`} onClick={() => setAdCopyMode(key)}>{label}</button>
                    ))}
                  </div>
                  <div className={styles.adCopyBlock}>
                    <pre className={styles.adCopyText}>{result.adCopy[adCopyMode]}</pre>
                    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                      <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => copyToClipboard(result.adCopy[adCopyMode], 'adcopy')}>
                        {copiedIdx === 'adcopy' ? '✅ Copied!' : '📋 Copy Full Ad Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FEATURE HIGHLIGHTS */}
              {activeTab === 'features' && result.features && (
                <div className={styles.tabContent}>
                  {result.features.map((f, i) => (
                    <div key={i} className={styles.featureCard}>
                      <div className={styles.featureNum}>#{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</p>
                        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</p>
                      </div>
                      <button className={`${styles.copyBtn} ${copiedIdx === `f${i}` ? styles.copyBtnDone : ''}`} onClick={() => copyToClipboard(`${f.title}: ${f.desc}`, `f${i}`)}>{copiedIdx === `f${i}` ? '✅' : '📋'}</button>
                    </div>
                  ))}
                </div>
              )}

              {/* CAMPAIGN IDEAS */}
              {activeTab === 'campaigns' && result.campaigns && (
                <div className={styles.tabContent}>
                  {result.campaigns.map((c, i) => (
                    <div key={i} className={styles.campaignCard}>
                      <h4 className={styles.campaignName}>{c.name}</h4>
                      <p className={styles.campaignDesc}>{c.desc}</p>
                      <div className={styles.campaignMeta}>
                        <div><span className={styles.metaLabel}>Platforms: </span>{c.platforms.map(p => <span key={p} className="tag tag-primary" style={{ fontSize: 10, marginRight: 4 }}>{p}</span>)}</div>
                        <p><span className={styles.metaLabel}>Angle: </span>{c.angle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* AUDIENCE STRATEGY */}
              {activeTab === 'audienceStrategy' && result.audienceStrategy && (
                <div className={styles.audienceCard}>
                  {Object.entries(result.audienceStrategy).map(([key, val]) => (
                    <div key={key} className={styles.audienceRow}>
                      <div className={styles.audienceKey}>{key}</div>
                      <div className={styles.audienceVal}>{val}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* SEASONAL IDEAS */}
              {activeTab === 'seasonal' && result.seasonal && (
                <div className={styles.tabContent}>
                  {result.seasonal.map((s, i) => (
                    <div key={i} className={styles.campaignCard}>
                      <h4 className={styles.campaignName}>{s.season}</h4>
                      <p className={styles.campaignDesc}>{s.idea}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* PRODUCT DESCRIPTION */}
              {activeTab === 'productDescription' && result.productDescription && (
                <div className={styles.tabContent}>
                  {Object.entries(result.productDescription).map(([type, text]) => (
                    <div key={type} className={styles.adCopyBlock}>
                      <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, textTransform: 'capitalize' }}>{type} Version</p>
                      <pre className={styles.adCopyText}>{text}</pre>
                      <button className="btn-outline" style={{ marginTop: 10, padding: '7px 14px', fontSize: 12 }} onClick={() => copyToClipboard(text, `pd${type}`)}>
                        {copiedIdx === `pd${type}` ? '✅ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
