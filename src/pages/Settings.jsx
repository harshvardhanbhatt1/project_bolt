import { useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import styles from './Settings.module.css'

const subSections = ['Profile', 'AI Preferences', 'Notifications', 'Export Settings', 'API & Integrations', 'Account & Privacy']

const STORAGE_KEY = 'adcraft_settings'
const defaultSettings = {
  fullName: 'Arjun Sharma',
  email: 'arjun@example.com',
  role: 'Brand Manager',
  company: 'AdCraft AI Inc.',
  aiModel: 'Gemini (Google)',
  adStyle: 'Minimal',
  tone: 'Professional',
  platform: 'Instagram Post',
  bgRemoval: true,
  imgEnhance: true,
  notifs: { gen: true, export: true, weekly: false, templates: true, tips: true },
  exportFormat: 'PNG',
  resolution: '72 DPI (Web)',
  watermark: true,
  filenamePattern: '{brand}_{platform}_{date}',
  apiKeys: { gemini: '', openai: '', claude: '' },
  apiConnected: { gemini: false, openai: false, claude: false },
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Profile')
  const [s, setS] = useState(defaultSettings)
  const [saved, setSaved] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)
  const [apiTesting, setApiTesting] = useState({})
  const [apiStatus, setApiStatus] = useState({})

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setS(JSON.parse(stored)) } catch {}
    }
  }, [])

  const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const setVal = (key, val) => setS(prev => ({ ...prev, [key]: val }))
  const setNotif = (key, val) => setS(prev => ({ ...prev, notifs: { ...prev.notifs, [key]: val } }))
  const setApiKey = (service, val) => setS(prev => ({ ...prev, apiKeys: { ...prev.apiKeys, [service]: val } }))

  const testApiKey = (service) => {
    if (!s.apiKeys[service].trim()) {
      setApiStatus(prev => ({ ...prev, [service]: 'empty' }))
      return
    }
    setApiTesting(prev => ({ ...prev, [service]: true }))
    setTimeout(() => {
      const connected = s.apiKeys[service].length > 10
      setS(prev => ({ ...prev, apiConnected: { ...prev.apiConnected, [service]: connected } }))
      setApiStatus(prev => ({ ...prev, [service]: connected ? 'success' : 'fail' }))
      setApiTesting(prev => ({ ...prev, [service]: false }))
    }, 1500)
  }

  const testAll = () => {
    Object.keys(s.apiKeys).forEach(service => testApiKey(service))
  }

  const handlePasswordChange = () => {
    setPwError('')
    if (!pwForm.current) { setPwError('Enter your current password'); return }
    if (pwForm.next.length < 6) { setPwError('New password must be at least 6 characters'); return }
    if (pwForm.next !== pwForm.confirm) { setPwError('New passwords do not match'); return }
    setPwSuccess(true)
    setPwForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwSuccess(false), 3000)
  }

  const handleDeleteProjects = () => {
    if (!window.confirm('Delete ALL projects? This cannot be undone.')) return
    localStorage.removeItem('adcraft_projects')
    alert('All projects deleted.')
  }

  const Toggle = ({ checked, onChange }) => (
    <button className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`} onClick={() => onChange(!checked)}>
      <span className={styles.toggleThumb}></span>
    </button>
  )

  return (
    <AppLayout title="Settings">
      {saved && <div className={styles.toast}>✅ Settings saved!</div>}

      <div className={styles.layout}>
        {/* Sub-menu */}
        <div className={styles.subMenu}>
          {subSections.map(sec => (
            <button
              key={sec}
              className={`${styles.subMenuItem} ${activeSection === sec ? styles.subMenuItemActive : ''}`}
              onClick={() => setActiveSection(sec)}
            >{sec}</button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.settingsContent}>
          {activeSection === 'Profile' && (
            <div className="card">
              <h3 className={styles.sectionTitle}>Profile Settings</h3>
              <div className={styles.avatarRow}>
                <div className={styles.bigAvatar}>{s.fullName.charAt(0).toUpperCase()}</div>
                <div>
                  <p className={styles.avatarHint}>Your profile picture is based on your initials</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>Changes are saved locally</p>
                </div>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input className="input-field" value={s.fullName} onChange={e => setVal('fullName', e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Email <span className={styles.verifiedBadge}>✅ Verified</span></label>
                  <input className="input-field" value={s.email} readOnly style={{ background: 'var(--bg)', color: 'var(--muted)' }} />
                </div>
                <div className={styles.formGroup}>
                  <label>Role / Job Title</label>
                  <input className="input-field" value={s.role} onChange={e => setVal('role', e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <input className="input-field" value={s.company} onChange={e => setVal('company', e.target.value)} />
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={saveSettings}>💾 Save Changes</button>
            </div>
          )}

          {activeSection === 'AI Preferences' && (
            <div className="card">
              <h3 className={styles.sectionTitle}>AI Preferences</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Default AI Model</label>
                  <select className="input-field" value={s.aiModel} onChange={e => setVal('aiModel', e.target.value)}>
                    <option>Gemini (Google)</option>
                    <option>GPT-4o (OpenAI)</option>
                    <option>Claude 3.5 (Anthropic)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Default Ad Style</label>
                  <select className="input-field" value={s.adStyle} onChange={e => setVal('adStyle', e.target.value)}>
                    {['Minimal', 'Modern', 'Luxury', 'Bold', 'Corporate', 'Festive', 'Gradient'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Default Tone</label>
                  <select className="input-field" value={s.tone} onChange={e => setVal('tone', e.target.value)}>
                    {['Professional', 'Playful', 'Urgent', 'Inspirational', 'Trustworthy'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Default Platform</label>
                  <select className="input-field" value={s.platform} onChange={e => setVal('platform', e.target.value)}>
                    {['Instagram Post', 'Instagram Story', 'Facebook Ad', 'LinkedIn Post', 'Google Display'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.toggleSection}>
                <div className={styles.toggleRow}>
                  <div><p className={styles.toggleLabel}>Auto Background Removal</p><p className={styles.toggleSub}>Automatically remove backgrounds from uploaded images</p></div>
                  <Toggle checked={s.bgRemoval} onChange={v => setVal('bgRemoval', v)} />
                </div>
                <div className={styles.toggleRow}>
                  <div><p className={styles.toggleLabel}>Auto Image Enhancement</p><p className={styles.toggleSub}>Boost quality, brightness & sharpness automatically</p></div>
                  <Toggle checked={s.imgEnhance} onChange={v => setVal('imgEnhance', v)} />
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={saveSettings}>💾 Save Preferences</button>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div className="card">
              <h3 className={styles.sectionTitle}>Notification Preferences</h3>
              <div className={styles.notifList}>
                {[
                  { key: 'gen', label: 'Generation Complete Alert', sub: 'Get notified when your AI ad generation is ready' },
                  { key: 'export', label: 'Export Ready', sub: 'Notification when your ad export is complete' },
                  { key: 'weekly', label: 'Weekly Summary Email', sub: 'Receive a weekly report of your ad activity' },
                  { key: 'templates', label: 'New Template Alerts', sub: 'Be the first to know about new templates' },
                  { key: 'tips', label: 'AI Tips & Suggestions', sub: 'Helpful tips to improve your ad performance' },
                ].map(n => (
                  <div key={n.key} className={styles.toggleRow}>
                    <div><p className={styles.toggleLabel}>{n.label}</p><p className={styles.toggleSub}>{n.sub}</p></div>
                    <Toggle checked={s.notifs[n.key]} onChange={v => setNotif(n.key, v)} />
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={saveSettings}>💾 Save Notifications</button>
            </div>
          )}

          {activeSection === 'Export Settings' && (
            <div className="card">
              <h3 className={styles.sectionTitle}>Export Settings</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Default Export Format</label>
                  <select className="input-field" value={s.exportFormat} onChange={e => setVal('exportFormat', e.target.value)}>
                    <option>PNG</option><option>JPG</option><option>PDF</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Default Resolution</label>
                  <select className="input-field" value={s.resolution} onChange={e => setVal('resolution', e.target.value)}>
                    <option>72 DPI (Web)</option><option>150 DPI (Print)</option><option>300 DPI (High-Res)</option>
                  </select>
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Default Filename Pattern</label>
                  <input className="input-field" value={s.filenamePattern} onChange={e => setVal('filenamePattern', e.target.value)} />
                  <span className={styles.hint}>Variables: {'{brand}'}, {'{platform}'}, {'{date}'}, {'{style}'}</span>
                  <span className={styles.previewFilename}>Preview: {s.filenamePattern.replace('{brand}', 'MyBrand').replace('{platform}', 'Instagram').replace('{date}', '2025-06-29').replace('{style}', 'Minimal')}.{s.exportFormat.toLowerCase()}</span>
                </div>
              </div>
              <div className={styles.toggleSection}>
                <div className={styles.toggleRow}>
                  <div><p className={styles.toggleLabel}>Include Watermark</p><p className={styles.toggleSub}>Add AdCraft AI watermark on exports (Free plan)</p></div>
                  <Toggle checked={s.watermark} onChange={v => setVal('watermark', v)} />
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={saveSettings}>💾 Save Export Settings</button>
            </div>
          )}

          {activeSection === 'API & Integrations' && (
            <div className="card">
              <h3 className={styles.sectionTitle}>API & Integrations</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Connect your AI API keys to power ad generation. Keys are stored locally in your browser.</p>
              <div className={styles.apiList}>
                {[
                  { key: 'gemini', label: 'Gemini API Key', placeholder: 'AIza...', link: 'https://ai.google.dev' },
                  { key: 'openai', label: 'OpenAI API Key', placeholder: 'sk-...', link: 'https://platform.openai.com' },
                  { key: 'claude', label: 'Claude API Key', placeholder: 'sk-ant-...', link: 'https://console.anthropic.com' },
                ].map(api => (
                  <div key={api.key} className={styles.apiCard}>
                    <div className={styles.apiHeader}>
                      <div>
                        <p className={styles.apiLabel}>{api.label}</p>
                        <span className={`tag ${s.apiConnected[api.key] ? 'tag-success' : 'tag-danger'}`} style={{ fontSize: 10 }}>
                          {s.apiConnected[api.key] ? '✅ Connected' : '❌ Not Connected'}
                        </span>
                        {apiStatus[api.key] === 'empty' && <span className="tag tag-warning" style={{ fontSize: 10, marginLeft: 6 }}>Enter a key first</span>}
                        {apiStatus[api.key] === 'fail' && <span className="tag tag-danger" style={{ fontSize: 10, marginLeft: 6 }}>Invalid key</span>}
                        {apiStatus[api.key] === 'success' && <span className="tag tag-success" style={{ fontSize: 10, marginLeft: 6 }}>Connected!</span>}
                      </div>
                    </div>
                    <div className={styles.apiInputRow}>
                      <input
                        className={`input-field ${styles.apiInput}`}
                        type="password"
                        placeholder={api.placeholder}
                        value={s.apiKeys[api.key]}
                        onChange={e => setApiKey(api.key, e.target.value)}
                      />
                      <button
                        className="btn-outline"
                        style={{ padding: '10px 16px', fontSize: 13, flexShrink: 0 }}
                        onClick={() => testApiKey(api.key)}
                        disabled={apiTesting[api.key]}
                      >
                        {apiTesting[api.key] ? '⏳' : 'Test'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button className="btn-primary" onClick={saveSettings}>💾 Save API Keys</button>
                <button className="btn-outline" onClick={testAll}>🔗 Test All Connections</button>
              </div>
            </div>
          )}

          {activeSection === 'Account & Privacy' && (
            <div className={styles.accountSection}>
              <div className="card" style={{ marginBottom: 24 }}>
                <h3 className={styles.sectionTitle}>Change Password</h3>
                {pwError && <div className={styles.pwError}>{pwError}</div>}
                {pwSuccess && <div className={styles.pwSuccess}>✅ Password updated successfully!</div>}
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Current Password</label>
                    <input className="input-field" type="password" placeholder="••••••••" value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input className="input-field" type="password" placeholder="At least 6 chars" value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <input className="input-field" type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} />
                  </div>
                </div>
                <button className="btn-primary" style={{ marginTop: 8 }} onClick={handlePasswordChange}>Update Password</button>
              </div>

              <div className="card">
                <h3 className={styles.dangerTitle}>🚨 Danger Zone</h3>
                <p className={styles.dangerNote}>These actions are irreversible. Please proceed with caution.</p>
                <div className={styles.dangerActions}>
                  <div className={styles.dangerRow}>
                    <div>
                      <p className={styles.dangerLabel}>Delete All Projects</p>
                      <p className={styles.dangerSub}>This will permanently delete all your saved ad campaigns and designs from this browser.</p>
                    </div>
                    <button className="btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', flexShrink: 0 }} onClick={handleDeleteProjects}>Delete All Projects</button>
                  </div>
                  <hr className="divider" />
                  <div className={styles.dangerRow}>
                    <div>
                      <p className={styles.dangerLabel}>Delete Account</p>
                      <p className={styles.dangerSub}>Once deleted, your account and all associated data cannot be recovered.</p>
                    </div>
                    <button className="btn-danger" style={{ flexShrink: 0 }} onClick={() => setShowDeleteConfirm(true)}>Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>⚠️</div>
            <h3 className={styles.modalTitle}>Delete Account?</h3>
            <p className={styles.modalDesc}>This action is permanent and cannot be undone. All your projects, templates, brand kit, and generated ads will be deleted forever.</p>
            <div className={styles.modalActions}>
              <button className="btn-danger" onClick={() => { localStorage.clear(); setShowDeleteConfirm(false); alert('Account deleted. Redirecting...') }}>
                Yes, Delete My Account
              </button>
              <button className="btn-outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
