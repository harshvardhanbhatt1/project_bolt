import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './LandingPage.module.css'

const adMockups = [
  { headline: 'Summer Collection 2025', sub: 'Shop the latest trends', tag: 'Clothing' },
  { headline: 'Pixel Pro Max', sub: 'Camera that sees the unseen', tag: 'Electronics' },
  { headline: 'Artisan Coffee Blend', sub: 'Every sip tells a story', tag: 'Food & Beverage' },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMockup, setActiveMockup] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setActiveMockup(v => (v + 1) % adMockups.length), 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <div className={styles.navLogo}>
            <div className={styles.logoIconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4.5 13.5H11L9 22L19.5 10.5H13L15 2H13Z" fill="#6C63FF" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>AdCraft AI</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <div className={styles.navActions}>
            <Link to="/dashboard" className="btn-outline" style={{ padding: '8px 18px', fontSize: 13 }}>Login</Link>
            <Link to="/dashboard" className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={`${styles.eyebrow} tag tag-primary`}>AI Creative Agency, Not Just a Poster Maker</span>
          <h1 className={styles.heroHeading}>Generate Agency-Quality Ads in Seconds</h1>
          <p className={styles.heroSub}>Upload your product. AdCraft AI analyzes it, writes your copy, builds your design, and delivers a publication-ready advertisement — automatically.</p>
          <div className={styles.heroCtas}>
            <Link to="/generate" className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>✨ Generate Your First Ad</Link>
            <a href="#templates" className="btn-outline" style={{ padding: '14px 28px', fontSize: 15 }}>See Examples</a>
          </div>
          <div className={styles.heroTrust}>
            <span>✅ No credit card required</span>
            <span>✅ 3 free ads per day</span>
            <span>✅ No design skills needed</span>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.browserFrame}>
            <div className={styles.browserBar}>
              <div className={styles.browserDots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.browserUrl}>adcraft.ai/generate</div>
            </div>
            <div className={styles.adPreviewArea}>
              <div className={styles.glowEffect}></div>
              {adMockups.map((ad, i) => (
                <div key={i} className={`${styles.adCard} ${i === activeMockup ? styles.adCardActive : ''}`}>
                  <div className={styles.adImg}>
                    <img src={`https://images.pexels.com/photos/${[1020585, 3394650, 312418][i]}/pexels-photo-${[1020585, 3394650, 312418][i]}.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1`} alt={ad.tag} />
                  </div>
                  <div className={styles.adMeta}>
                    <span className="tag tag-primary" style={{ fontSize: 10 }}>{ad.tag}</span>
                    <p className={styles.adHeadline}>{ad.headline}</p>
                    <p className={styles.adSub}>{ad.sub}</p>
                    <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>Shop Now →</button>
                  </div>
                </div>
              ))}
              <div className={styles.aiLabel}>
                <span>🤖</span> AI generating ad...
                <div className={styles.aiProgress}><div className={styles.aiProgressBar}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <div className={styles.proofBar}>
        <div className={styles.proofItem}><strong>50,000+</strong> Ads Generated</div>
        <div className={styles.proofDivider}></div>
        <div className={styles.proofItem}><strong>12</strong> Platforms Supported</div>
        <div className={styles.proofDivider}></div>
        <div className={styles.proofItem}><strong>4.9★</strong> from 3,000+ Users</div>
        <div className={styles.proofDivider}></div>
        <div className={styles.proofItem}><strong>100+</strong> Industry Templates</div>
      </div>

      {/* HOW IT WORKS */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.sectionHeader}>
          <span className="tag tag-primary">Simple 4-Step Process</span>
          <h2>From Product to Published — In Minutes</h2>
        </div>
        <div className={styles.stepsRow}>
          {[
            { num: '01', icon: '📤', title: 'Upload Product', desc: 'Drop your product image and add basic details' },
            { num: '02', icon: '🤖', title: 'AI Analyzes', desc: 'Our AI understands your product, audience & USP' },
            { num: '03', icon: '🎨', title: 'Designs Generated', desc: '3 premium ad concepts created automatically' },
            { num: '04', icon: '⬇️', title: 'Download & Publish', desc: 'Export in any format, ready for all platforms' },
          ].map((step, i) => (
            <div key={i} className={styles.stepItem}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              {i < 3 && <div className={styles.stepArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className={styles.features} id="features">
        <div className={styles.sectionHeader}>
          <h2>Everything a Creative Agency Does — Automated</h2>
          <p>One platform to replace your entire ad production workflow</p>
        </div>
        <div className={styles.featuresGrid}>
          {[
            { icon: '🤖', title: 'AI Ad Intelligence', desc: 'Understands your product, audience & unique selling proposition automatically.' },
            { icon: '🎨', title: 'Premium Design Engine', desc: 'Agency-quality layouts and compositions, not basic poster templates.' },
            { icon: '✍️', title: 'AI Marketing Copywriter', desc: 'Headlines, slogans, CTAs, and full ad copy crafted for conversions.' },
            { icon: '🖼️', title: 'AI Image Processing', desc: 'Background removal, enhancement, and smart subject placement.' },
            { icon: '✂️', title: 'Canva-Like Editor', desc: 'Drag, drop, resize, layer, and customize every element freely.' },
            { icon: '📤', title: 'Multi-Platform Export', desc: 'Instagram, Facebook, Google, LinkedIn, YouTube — all formats covered.' },
          ].map((f, i) => (
            <div key={i} className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRY TEMPLATES */}
      <section className={styles.industriesSection} id="templates">
        <div className={styles.sectionHeader}>
          <h2>Templates for Every Industry</h2>
          <p>Professionally designed, instantly customizable</p>
        </div>
        <div className={styles.industriesScroll}>
          {[
            { label: 'Clothing', img: 1536619, color: '#FFE4E1' },
            { label: 'Electronics', img: 3394650, color: '#E8F4FD' },
            { label: 'Food & Beverage', img: 312418, color: '#FFF3E0' },
            { label: 'Beauty', img: 3785147, color: '#FCE4EC' },
            { label: 'Real Estate', img: 323780, color: '#E8F5E9' },
            { label: 'Fitness', img: 1552249, color: '#F3E5F5' },
            { label: 'Education', img: 256417, color: '#E3F2FD' },
            { label: 'Festivals', img: 1190298, color: '#FFFDE7' },
          ].map((ind, i) => (
            <div key={i} className={styles.industryCard}>
              <div className={styles.industryImg} style={{ background: ind.color }}>
                <img src={`https://images.pexels.com/photos/${ind.img}/pexels-photo-${ind.img}.jpeg?auto=compress&cs=tinysrgb&w=280&h=200&dpr=1`} alt={ind.label} />
                <div className={styles.industryOverlay}>
                  <Link to="/templates" className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>Use Template</Link>
                </div>
              </div>
              <span className={styles.industryLabel}>{ind.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM SUPPORT */}
      <section className={styles.platforms}>
        <div className={styles.sectionHeader}>
          <h2>Generate Ads for Every Platform</h2>
          <p>Perfect dimensions, every time</p>
        </div>
        <div className={styles.platformsGrid}>
          {[
            { icon: '📸', name: 'Instagram', fmt: '1080×1080 · 1080×1920' },
            { icon: '👤', name: 'Facebook', fmt: '1200×630 · 1080×1080' },
            { icon: '🔍', name: 'Google', fmt: '300×250 · 728×90' },
            { icon: '💼', name: 'LinkedIn', fmt: '1200×627 · 1080×1080' },
            { icon: '▶️', name: 'YouTube', fmt: '1280×720 · 300×250' },
            { icon: '💬', name: 'WhatsApp', fmt: '1080×1080 · Status' },
            { icon: '🛒', name: 'Amazon', fmt: '1000×1000 · 940×313' },
            { icon: '🐦', name: 'Twitter/X', fmt: '1200×675 · 1500×500' },
          ].map((p, i) => (
            <div key={i} className={styles.platformCard}>
              <div className={styles.platformIcon}>{p.icon}</div>
              <p className={styles.platformName}>{p.name}</p>
              <p className={styles.platformFmt}>{p.fmt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>Trusted by Marketing Professionals</h2>
          <p>Join 50,000+ brands creating better ads with AI</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {[
            {
              avatar: 'P', name: 'Priya Sharma', role: 'Brand Manager, Zara India',
              quote: 'AdCraft AI saves our team 20+ hours every week. The ad quality rivals our agency work at a fraction of the cost.',
              stars: 5,
            },
            {
              avatar: 'R', name: 'Rahul Mehta', role: 'Marketing Lead, Flipkart',
              quote: 'We ran a 3-day product launch campaign with 45 unique ad variants across platforms — all generated in one afternoon.',
              stars: 5,
            },
            {
              avatar: 'A', name: 'Ananya Kapoor', role: 'Founder, GlowLab Beauty',
              quote: 'The AI truly understands product marketing. The copy it writes for our beauty products outperforms what our copywriter creates.',
              stars: 5,
            },
          ].map((t, i) => (
            <div key={i} className={`card ${styles.testimonialCard}`}>
              <div className={styles.stars}>{'⭐'.repeat(t.stars)}</div>
              <p className={styles.testimonialQuote}>"{t.quote}"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.avatar}</div>
                <div>
                  <p className={styles.authorName}>{t.name}</p>
                  <p className={styles.authorRole}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <h2>Stop paying agencies. Start generating.</h2>
        <p>No design skills needed. No waiting days for revisions. Just results.</p>
        <Link to="/generate" className={styles.ctaBtn}>Get Started Free</Link>
        <p className={styles.ctaSmall}>No credit card required · 3 free ads daily · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.logoIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L4.5 13.5H11L9 22L19.5 10.5H13L15 2H13Z" fill="#6C63FF"/>
                </svg>
              </div>
              <span>AdCraft AI</span>
            </div>
            <p>AI-powered advertising that delivers agency-quality results instantly.</p>
            <div className={styles.socialLinks}>
              {['𝕏', '📘', '📷', '💼'].map((s, i) => <a key={i} href="#">{s}</a>)}
            </div>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <Link to="/templates">Templates</Link>
              <a href="#pricing">Pricing</a>
              <Link to="/generate">Generate Ad</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <a href="#">Blog</a>
              <a href="#">Support</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 AdCraft AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
