import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import styles from './CanvasEditor.module.css'

const elementTools = [
  { icon: 'T', label: 'Text' },
  { icon: '🖼️', label: 'Image' },
  { icon: '⬜', label: 'Shape' },
  { icon: '⭐', label: 'Icon' },
  { icon: '😊', label: 'Sticker' },
  { icon: '🎨', label: 'Background' },
  { icon: '📱', label: 'QR Code' },
  { icon: '—', label: 'Divider' },
]

const filters = ['None', 'Warm', 'Cool', 'B&W', 'Vivid']

const FILTER_STYLES = {
  'None': '',
  'Warm': 'sepia(0.3) saturate(1.3) hue-rotate(-10deg)',
  'Cool': 'saturate(0.8) hue-rotate(30deg)',
  'B&W': 'grayscale(1)',
  'Vivid': 'saturate(1.8) contrast(1.1)',
}

export default function CanvasEditor() {
  const [activeTab, setActiveTab] = useState('elements')
  const [selectedLayer, setSelectedLayer] = useState('text')
  const [zoom, setZoom] = useState(100)
  const [selectedFilter, setSelectedFilter] = useState('None')
  const [projectName, setProjectName] = useState('Untitled Ad')
  const [adData, setAdData] = useState(null)
  const [saved, setSaved] = useState(false)
  const [layers, setLayers] = useState([
    { id: 1, name: 'Headline Text', type: 'text', visible: true, locked: false },
    { id: 2, name: 'Product Image', type: 'image', visible: true, locked: false },
    { id: 3, name: 'CTA Button', type: 'shape', visible: true, locked: false },
    { id: 4, name: 'Background', type: 'bg', visible: true, locked: true },
  ])

  // Text properties
  const [textProps, setTextProps] = useState({ font: 'Plus Jakarta Sans', size: 32, color: '#ffffff', bold: true, italic: false, underline: false, align: 'left', letterSpacing: 0, lineHeight: 1.3, opacity: 100 })
  // Image properties
  const [imgProps, setImgProps] = useState({ brightness: 100, contrast: 100, saturation: 100, opacity: 100 })
  // Shape properties
  const [shapeProps, setShapeProps] = useState({ fill: '#6C63FF', stroke: '#4B44CC', strokeWidth: 0, radius: 8, opacity: 100 })
  // Canvas properties
  const [canvasProps, setCanvasProps] = useState({ bg: '#6C63FF', bgGradient: '' })
  // Editable text on canvas
  const [editingHeadline, setEditingHeadline] = useState(false)
  const headlineRef = useRef()

  // Canvas-level state derived from adData
  const [headline, setHeadline] = useState('Summer Collection 2025')
  const [subline, setSubline] = useState('Shop the latest trends')
  const [ctaText, setCtaText] = useState('Shop Now →')
  const [imageLayout, setImageLayout] = useState('split')

  useEffect(() => {
    const raw = sessionStorage.getItem('editAd')
    if (raw) {
      try {
        const { concept, form } = JSON.parse(raw)
        setAdData({ concept, form })
        setProjectName(`${form.productName || 'Ad'} — ${form.platform || 'Instagram Post'}`)
        setHeadline(concept.headline || 'Your Headline Here')
        setSubline(concept.subheadline || 'Your subline here')
        setCtaText(concept.cta || 'Learn More')
        setCanvasProps({ bg: concept.bg?.startsWith('linear') ? '' : concept.bg || '#6C63FF', bgGradient: concept.bg?.startsWith('linear') ? concept.bg : '' })
        setTextProps(t => ({ ...t, color: concept.textColor || '#ffffff' }))
        setShapeProps(s => ({ ...s, fill: concept.accent || '#6C63FF' }))
      } catch {}
    }
  }, [])

  if (!adData) {
    return (
      <AppLayout title="Canvas Editor">
        <div className={styles.emptyEditor}>
          <h2>No editable project loaded</h2>
          <p>Open a saved project from My Projects or generate a new ad first.</p>
          <div className={styles.emptyActions}>
            <Link to="/projects" className="btn-outline">Back to Projects</Link>
            <Link to="/generate" className="btn-primary">Generate New Ad</Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  const toggleLayerVisibility = (id) => setLayers(list => list.map(l => l.id === id ? { ...l, visible: !l.visible } : l))

  const handleSave = () => {
    setSaved(true)
    const saved_projects = JSON.parse(localStorage.getItem('adcraft_projects') || '[]')
    const existing = saved_projects.findIndex(p => p.name === projectName)
    const entry = {
      id: existing >= 0 ? saved_projects[existing].id : Date.now(),
      name: projectName,
      platform: adData?.form?.platform || 'Instagram Post',
      industry: adData?.form?.industry || 'General',
      date: 'Just now',
      status: 'Draft',
      concept: adData?.concept,
      form: adData?.form || {},
    }
    if (existing >= 0) saved_projects[existing] = entry
    else saved_projects.unshift(entry)
    localStorage.setItem('adcraft_projects', JSON.stringify(saved_projects.slice(0, 20)))
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDownload = (format) => {
    alert(`Downloading as ${format}...\n\n(In a real implementation, this would render the canvas to a file using html2canvas or similar.)`)
  }

  const bg = canvasProps.bgGradient || canvasProps.bg || (adData?.concept?.bg ?? '#6C63FF')
  const textColor = textProps.color || (adData?.concept?.textColor ?? '#ffffff')
  const accentColor = shapeProps.fill || (adData?.concept?.accent ?? '#ffffff')
  const productImages = adData?.form?.productImageUrls?.length ? adData.form.productImageUrls : adData?.form?.productImageUrl ? [adData.form.productImageUrl] : []
  const primaryProductImage = productImages[0] || null
  const secondaryProductImage = productImages[1] || null
  const logoImage = adData?.form?.logoImageUrl || null

  return (
    <div className={styles.editor}>
      {/* TOP BAR */}
      <div className={styles.topbar}>
        <div className={styles.topLeft}>
          <Link to="/projects" className={styles.backBtn}>← Back to Projects</Link>
          <div className={styles.separator}></div>
          <span
            className={styles.projectName}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => setProjectName(e.target.textContent)}
          >{projectName}</span>
        </div>
        <div className={styles.topCenter}>
          <button className={styles.toolBtn} title="Undo">↩</button>
          <button className={styles.toolBtn} title="Redo">↪</button>
          <div className={styles.separator}></div>
          <button className={styles.toolBtn} onClick={() => setZoom(z => Math.max(25, z - 10))}>−</button>
          <span className={styles.zoomLabel}>{zoom}%</span>
          <button className={styles.toolBtn} onClick={() => setZoom(z => Math.min(200, z + 10))}>+</button>
          <button className={styles.toolBtn} onClick={() => setZoom(100)} title="Reset zoom" style={{ fontSize: 10 }}>Reset</button>
        </div>
        <div className={styles.topRight}>
          <div className={styles.downloadDropdown}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginRight: 4 }}>Export as:</span>
            {['PNG', 'JPG', 'PDF'].map(f => (
              <button key={f} className={styles.toolBtn} onClick={() => handleDownload(f)}>{f}</button>
            ))}
          </div>
          <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>Share</button>
          <button className={`btn-primary ${saved ? styles.savedBtn : ''}`} style={{ padding: '8px 18px', fontSize: 13 }} onClick={handleSave}>
            {saved ? '✅ Saved' : '💾 Save'}
          </button>
        </div>
      </div>

      {/* EDITOR BODY */}
      <div className={styles.body}>
        {/* LEFT TOOLS */}
        <div className={styles.leftPanel}>
          <div className={styles.panelTabs}>
            {['elements', 'layers', 'templates'].map(t => (
              <button key={t} className={`${styles.panelTab} ${activeTab === t ? styles.panelTabActive : ''}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'elements' && (
            <div className={styles.elementsTab}>
              <div className={styles.toolsGrid}>
                {elementTools.map((t, i) => (
                  <button key={i} className={styles.toolItem} title={t.label} onClick={() => {
                    if (t.label === 'Text') { setSelectedLayer('text'); setEditingHeadline(true); headlineRef.current?.focus() }
                    else if (t.label === 'Image') setSelectedLayer('image')
                    else if (t.label === 'Shape') setSelectedLayer('shape')
                    else if (t.label === 'Background') setSelectedLayer('canvas')
                  }}>
                    <span className={styles.toolItemIcon}>{t.icon}</span>
                    <span className={styles.toolItemLabel}>{t.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.assetSearch}>
                <input className="input-field" placeholder="Search icons & assets..." style={{ fontSize: 12, padding: '8px 12px' }} />
              </div>
              <p style={{ fontSize: 11, color: 'var(--muted)', padding: '4px 0 8px' }}>Quick Add Icons</p>
              <div className={styles.iconGrid}>
                {['⭐','❤️','🏠','🛒','📷','🎯','✅','💡','🔔','📊','🎨','✈️','💎','🏆','🌟','📱'].map((ic, i) => (
                  <button key={i} className={styles.assetIcon} title={`Add ${ic}`}>{ic}</button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'layers' && (
            <div className={styles.layersTab}>
              <p style={{ fontSize: 11, color: 'var(--muted)', padding: '8px 8px 12px', fontWeight: 600 }}>LAYERS ({layers.length})</p>
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className={`${styles.layerItem} ${selectedLayer === layer.type ? styles.layerItemSelected : ''}`}
                  onClick={() => setSelectedLayer(layer.type)}
                >
                  <span className={styles.dragHandle}>⠿</span>
                  <span className={styles.layerTypeIcon}>{layer.type === 'text' ? 'T' : layer.type === 'image' ? '🖼️' : layer.type === 'shape' ? '⬜' : '🎨'}</span>
                  <span className={styles.layerName}>{layer.name}</span>
                  <button className={styles.layerAction} onClick={e => { e.stopPropagation(); toggleLayerVisibility(layer.id) }}>
                    {layer.visible ? '👁️' : '🚫'}
                  </button>
                  <span className={styles.layerAction}>{layer.locked ? '🔒' : '🔓'}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className={styles.templatesTab}>
              <select className="input-field" style={{ fontSize: 12, padding: '8px 12px', marginBottom: 12 }}>
                <option>All Industries</option>
                <option>Clothing</option><option>Electronics</option><option>Food</option><option>Beauty</option>
              </select>
              <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>Click to apply</p>
              <div className={styles.templateThumbGrid}>
                {[1536619, 3394650, 312418, 3785147, 323780, 1552249].map((img, i) => (
                  <div key={i} className={styles.templateThumb} onClick={() => alert('Template applied! (In production, this replaces canvas content)')}>
                    <img src={`https://images.pexels.com/photos/${img}/pexels-photo-${img}.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&dpr=1`} alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CENTER CANVAS */}
        <div className={styles.canvasArea}>
          <div className={styles.canvasWrap} style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            <div className={styles.ruler}></div>
            <div className={styles.canvasFrame} style={{ background: bg }}>
              <div className={styles.canvasMedia}>
                {primaryProductImage ? (
                  productImages.length > 1 ? (
                    imageLayout === 'hero' ? (
                      <div className={styles.heroImageFrame}>
                        <img
                          src={primaryProductImage}
                          alt="Primary product"
                          className={styles.heroMain}
                          style={{ filter: `${FILTER_STYLES[selectedFilter]} brightness(${imgProps.brightness}%) contrast(${imgProps.contrast}%) saturate(${imgProps.saturation}%)`, opacity: imgProps.opacity / 100 }}
                        />
                        <img
                          src={secondaryProductImage}
                          alt="Secondary product"
                          className={styles.heroInset}
                          style={{ filter: `${FILTER_STYLES[selectedFilter]} brightness(${imgProps.brightness}%) contrast(${imgProps.contrast}%) saturate(${imgProps.saturation}%)`, opacity: imgProps.opacity / 100 }}
                        />
                      </div>
                    ) : imageLayout === 'grid' ? (
                      <div className={styles.splitImageGrid}>
                        <img
                          src={primaryProductImage}
                          alt="Primary product"
                          className={styles.splitImagePrimary}
                          style={{ objectPosition: 'center top' }}
                        />
                        <img
                          src={secondaryProductImage}
                          alt="Secondary product"
                          className={styles.splitImageSecondary}
                          style={{ objectPosition: 'center bottom' }}
                        />
                      </div>
                    ) : (
                      <div className={styles.splitImageGrid}>
                        <img
                          src={primaryProductImage}
                          alt="Primary product"
                          className={styles.splitImagePrimary}
                        />
                        <img
                          src={secondaryProductImage}
                          alt="Secondary product"
                          className={styles.splitImageSecondary}
                        />
                      </div>
                    )
                  ) : (
                    <img
                      src={primaryProductImage}
                      alt="Product"
                      className={styles.canvasBg}
                      style={{ filter: `${FILTER_STYLES[selectedFilter]} brightness(${imgProps.brightness}%) contrast(${imgProps.contrast}%) saturate(${imgProps.saturation}%)`, opacity: imgProps.opacity / 100 }}
                    />
                  )
                ) : (
                  <div className={styles.canvasBgPlaceholder}></div>
                )}
                {logoImage && (
                  <img src={logoImage} alt="Logo" className={styles.logoBadge} />
                )}
              </div>

              {/* Text overlay */}
              <div className={styles.canvasOverlay}>
                <div className={styles.textElement}>
                  {selectedLayer === 'text' && (
                    <div className={styles.selectionBox}>
                      <div className={styles.handle} style={{ top: -5, left: -5 }}></div>
                      <div className={styles.handle} style={{ top: -5, right: -5 }}></div>
                      <div className={styles.handle} style={{ bottom: -5, left: -5 }}></div>
                      <div className={styles.handle} style={{ bottom: -5, right: -5 }}></div>
                    </div>
                  )}
                  <h2
                    ref={headlineRef}
                    className={styles.canvasHeadline}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => setHeadline(e.target.textContent)}
                    style={{
                      color: textColor,
                      fontFamily: textProps.font,
                      fontSize: `${textProps.size}px`,
                      fontWeight: textProps.bold ? 700 : 400,
                      fontStyle: textProps.italic ? 'italic' : 'normal',
                      textDecoration: textProps.underline ? 'underline' : 'none',
                      opacity: textProps.opacity / 100,
                      letterSpacing: `${textProps.letterSpacing}px`,
                      lineHeight: textProps.lineHeight,
                    }}
                  >{headline}</h2>
                  <p
                    className={styles.canvasSubline}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => setSubline(e.target.textContent)}
                    style={{ color: textColor, opacity: 0.8 }}
                  >{subline}</p>
                  <button
                    className={styles.canvasCta}
                    style={{ background: accentColor, color: bg === '#ffffff' || bg === '#F8F9FF' ? '#fff' : textColor === '#ffffff' ? '#12112A' : '#fff' }}
                    onClick={() => {
                      const t = prompt('Edit CTA button text:', ctaText)
                      if (t) setCtaText(t)
                    }}
                  >{ctaText}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PROPERTIES */}
        <div className={styles.rightPanel}>
          <div className={styles.propTabs}>
            {['Text', 'Image', 'Shape', 'Canvas'].map(t => (
              <button
                key={t}
                className={`${styles.propTab} ${selectedLayer === t.toLowerCase() ? styles.propTabActive : ''}`}
                onClick={() => setSelectedLayer(t.toLowerCase())}
              >{t}</button>
            ))}
          </div>

          {selectedLayer === 'text' && (
            <div className={styles.propSection}>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Font Family</label>
                <select className="input-field" style={{ fontSize: 13 }} value={textProps.font} onChange={e => setTextProps(p => ({ ...p, font: e.target.value }))}>
                  {['Plus Jakarta Sans','Inter','Playfair Display','Roboto','Montserrat','Lato','Nunito'].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div className={styles.propRow}>
                <div className={styles.propGroup} style={{ flex: 1 }}>
                  <label className={styles.propLabel}>Size (px)</label>
                  <input className="input-field" type="number" value={textProps.size} style={{ fontSize: 13 }} min={8} max={120}
                    onChange={e => setTextProps(p => ({ ...p, size: Number(e.target.value) }))} />
                </div>
                <div className={styles.propGroup} style={{ flex: 1 }}>
                  <label className={styles.propLabel}>Color</label>
                  <input type="color" value={textProps.color} className={styles.colorInput}
                    onChange={e => setTextProps(p => ({ ...p, color: e.target.value }))} />
                </div>
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Format</label>
                <div className={styles.formatRow}>
                  {[['B','bold'],['I','italic'],['U','underline']].map(([label, key]) => (
                    <button key={key} className={`${styles.fmtBtn} ${textProps[key] ? styles.fmtBtnActive : ''}`}
                      onClick={() => setTextProps(p => ({ ...p, [key]: !p[key] }))}>
                      <span style={{ fontWeight: key === 'bold' ? 700 : 400, fontStyle: key === 'italic' ? 'italic' : 'normal', textDecoration: key === 'underline' ? 'underline' : 'none' }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Letter Spacing: {textProps.letterSpacing}px</label>
                <input type="range" min={-5} max={20} value={textProps.letterSpacing} className={styles.slider}
                  onChange={e => setTextProps(p => ({ ...p, letterSpacing: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Line Height: {textProps.lineHeight}</label>
                <input type="range" min={1} max={3} step={0.1} value={textProps.lineHeight} className={styles.slider}
                  onChange={e => setTextProps(p => ({ ...p, lineHeight: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Opacity: {textProps.opacity}%</label>
                <input type="range" min={0} max={100} value={textProps.opacity} className={styles.slider}
                  onChange={e => setTextProps(p => ({ ...p, opacity: Number(e.target.value) }))} />
              </div>
            </div>
          )}

          {selectedLayer === 'image' && (
            <div className={styles.propSection}>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Filter</label>
                <div className={styles.filterRow}>
                  {filters.map(f => (
                    <button key={f} className={`${styles.filterBtn} ${selectedFilter === f ? styles.filterBtnActive : ''}`} onClick={() => setSelectedFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Image Layout</label>
                <div className={styles.layoutRow}>
                  {['split', 'hero', 'grid'].map(layout => (
                    <button
                      key={layout}
                      className={`${styles.layoutBtn} ${imageLayout === layout ? styles.layoutBtnActive : ''}`}
                      onClick={() => setImageLayout(layout)}
                    >{layout.charAt(0).toUpperCase() + layout.slice(1)}</button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  {productImages.length > 1 ? 'Both uploaded images will be used in the selected layout.' : 'Upload a second image in Generate Ad to unlock split layouts.'}
                </p>
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Brightness: {imgProps.brightness}%</label>
                <input type="range" min={0} max={200} value={imgProps.brightness} className={styles.slider}
                  onChange={e => setImgProps(p => ({ ...p, brightness: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Contrast: {imgProps.contrast}%</label>
                <input type="range" min={0} max={200} value={imgProps.contrast} className={styles.slider}
                  onChange={e => setImgProps(p => ({ ...p, contrast: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Saturation: {imgProps.saturation}%</label>
                <input type="range" min={0} max={200} value={imgProps.saturation} className={styles.slider}
                  onChange={e => setImgProps(p => ({ ...p, saturation: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Opacity: {imgProps.opacity}%</label>
                <input type="range" min={0} max={100} value={imgProps.opacity} className={styles.slider}
                  onChange={e => setImgProps(p => ({ ...p, opacity: Number(e.target.value) }))} />
              </div>
              {!primaryProductImage && (
                <div className={styles.propGroup}>
                  <p style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--bg)', padding: '8px 12px', borderRadius: 8 }}>
                    No product image uploaded. Go back to Generate Ad to upload an image.
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedLayer === 'shape' && (
            <div className={styles.propSection}>
              <div className={styles.propRow}>
                <div className={styles.propGroup} style={{ flex: 1 }}>
                  <label className={styles.propLabel}>Fill Color</label>
                  <input type="color" value={shapeProps.fill} className={styles.colorInput}
                    onChange={e => setShapeProps(p => ({ ...p, fill: e.target.value }))} />
                </div>
                <div className={styles.propGroup} style={{ flex: 1 }}>
                  <label className={styles.propLabel}>Stroke</label>
                  <input type="color" value={shapeProps.stroke} className={styles.colorInput}
                    onChange={e => setShapeProps(p => ({ ...p, stroke: e.target.value }))} />
                </div>
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Stroke Width: {shapeProps.strokeWidth}px</label>
                <input type="range" min={0} max={20} value={shapeProps.strokeWidth} className={styles.slider}
                  onChange={e => setShapeProps(p => ({ ...p, strokeWidth: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Border Radius: {shapeProps.radius}px</label>
                <input type="range" min={0} max={50} value={shapeProps.radius} className={styles.slider}
                  onChange={e => setShapeProps(p => ({ ...p, radius: Number(e.target.value) }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Opacity: {shapeProps.opacity}%</label>
                <input type="range" min={0} max={100} value={shapeProps.opacity} className={styles.slider}
                  onChange={e => setShapeProps(p => ({ ...p, opacity: Number(e.target.value) }))} />
              </div>
            </div>
          )}

          {selectedLayer === 'canvas' && (
            <div className={styles.propSection}>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Canvas Size</label>
                <p className={styles.propInfo}>{adData?.form?.platform || 'Instagram Post'}</p>
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Background Color</label>
                <input type="color" value={canvasProps.bg || '#6C63FF'} className={styles.colorInput}
                  onChange={e => setCanvasProps(p => ({ ...p, bg: e.target.value, bgGradient: '' }))} />
              </div>
              <div className={styles.propGroup}>
                <label className={styles.propLabel}>Gradient Presets</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Purple', v: 'linear-gradient(135deg, #6C63FF, #9B93FF)' },
                    { label: 'Sunset', v: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' },
                    { label: 'Ocean', v: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
                    { label: 'Gold', v: 'linear-gradient(135deg, #b8860b, #ffd700)' },
                  ].map(g => (
                    <button key={g.label} className={styles.filterBtn} style={{ background: g.v, color: '#fff', borderColor: 'transparent', fontSize: 10 }}
                      onClick={() => setCanvasProps(p => ({ ...p, bgGradient: g.v, bg: '' }))}>{g.label}</button>
                  ))}
                </div>
              </div>
              <div className={styles.propGroup}>
                <button className="btn-primary" style={{ fontSize: 12, padding: '10px 14px', justifyContent: 'center' }}
                  onClick={() => alert('AI Background Generation: In production, this calls an image generation API to create a matching background.')}>
                  ✨ AI Generate Background
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM TOOLBAR */}
      <div className={styles.bottomBar}>
        <div className={styles.alignTools}>
          <button className={styles.barBtn} title="Align Left">← Left</button>
          <button className={styles.barBtn} title="Align Center">↔ Center</button>
          <button className={styles.barBtn} title="Align Right">Right →</button>
          <button className={styles.barBtn} title="Align Top">↑ Top</button>
          <button className={styles.barBtn} title="Align Middle">⇕ Mid</button>
          <button className={styles.barBtn} title="Align Bottom">↓ Bot</button>
        </div>
        <div className={styles.barDivider}></div>
        <div className={styles.alignTools}>
          <button className={styles.barBtn}>Group</button>
          <button className={styles.barBtn}>Lock</button>
          <button className={styles.barBtn} onClick={() => { setHeadline('Summer Collection 2025'); setSubline('Shop the latest trends'); setCtaText('Shop Now →') }}>Reset Text</button>
          <button className={`${styles.barBtn} ${styles.barBtnDanger}`} onClick={() => { if (window.confirm('Clear canvas?')) { setHeadline(''); setSubline(''); setCtaText('') } }}>Clear</button>
        </div>
      </div>
    </div>
  )
}
