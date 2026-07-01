import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import styles from './Analytics.module.css'

const lineData = [
  { date: 'Jun 1', ads: 4 }, { date: 'Jun 5', ads: 7 }, { date: 'Jun 8', ads: 5 },
  { date: 'Jun 11', ads: 12 }, { date: 'Jun 14', ads: 9 }, { date: 'Jun 17', ads: 14 },
  { date: 'Jun 20', ads: 11 }, { date: 'Jun 23', ads: 18 }, { date: 'Jun 26', ads: 16 }, { date: 'Jun 29', ads: 22 },
]

const platformData = [
  { name: 'Instagram', value: 38, color: '#6C63FF' },
  { name: 'Facebook', value: 25, color: '#FF6B6B' },
  { name: 'LinkedIn', value: 15, color: '#22C55E' },
  { name: 'Google', value: 12, color: '#F59E0B' },
  { name: 'YouTube', value: 6, color: '#3B82F6' },
  { name: 'Other', value: 4, color: '#6B7280' },
]

const industryData = [
  { name: 'Clothing', count: 18 }, { name: 'Electronics', count: 12 }, { name: 'Beauty', count: 9 },
  { name: 'Food', count: 8 }, { name: 'Fitness', count: 6 }, { name: 'Real Estate', count: 5 },
]

const exports = [
  { name: 'Summer Sale Campaign', platform: 'Instagram Post', format: 'PNG', size: '1.2 MB', date: '29 Jun 2025' },
  { name: 'Tech Product Launch', platform: 'Facebook Ad', format: 'JPG', size: '856 KB', date: '27 Jun 2025' },
  { name: 'Beauty Glow Ad', platform: 'Instagram Story', format: 'PNG', size: '2.1 MB', date: '25 Jun 2025' },
  { name: 'Brand Awareness Banner', platform: 'LinkedIn Post', format: 'PDF', size: '3.4 MB', date: '22 Jun 2025' },
  { name: 'Festival Offer Banner', platform: 'Google Display', format: 'PNG', size: '654 KB', date: '20 Jun 2025' },
]

const topTemplates = [
  { name: 'Urban Fashion Drop', uses: 18, img: 1536619 },
  { name: 'Tech Launch Pro', uses: 12, img: 3394650 },
  { name: 'Glow & Radiance', uses: 9, img: 3785147 },
]

const periods = ['This Week', 'This Month', 'Last 3 Months', 'Custom Range']

export default function Analytics() {
  const [activePeriod, setActivePeriod] = useState('This Month')

  return (
    <AppLayout title="Analytics">
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Analytics</h2>
          <div className={styles.periodTabs}>
            {periods.map(p => (
              <button
                key={p}
                className={`${styles.periodTab} ${activePeriod === p ? styles.periodTabActive : ''}`}
                onClick={() => setActivePeriod(p)}
              >{p}</button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className={styles.kpiRow}>
          {[
            { icon: '🎨', label: 'Total Ads Generated', value: '47', trend: '+18%', up: true, color: 'var(--primary)' },
            { icon: '⬇️', label: 'Ads Exported', value: '34', trend: '+12%', up: true, color: 'var(--success)' },
            { icon: '📋', label: 'Templates Used', value: '8', trend: '+3', up: true, color: 'var(--warning)' },
            { icon: '✨', label: 'AI Generations', value: '62', trend: '+22%', up: true, color: 'var(--primary)' },
            { icon: '🎨', label: 'Brand Kit Saves', value: '3', trend: '0', up: null, color: '#6B7280' },
          ].map((k, i) => (
            <div key={i} className={`card ${styles.kpiCard}`}>
              <div className={styles.kpiIcon} style={{ color: k.color, background: `${k.color}18` }}>{k.icon}</div>
              <p className={styles.kpiLabel}>{k.label}</p>
              <p className={styles.kpiValue}>{k.value}</p>
              <span className={`tag ${k.up === true ? 'tag-success' : k.up === false ? 'tag-danger' : 'tag-muted'}`} style={{ fontSize: 11 }}>
                {k.up === true ? '↑' : k.up === false ? '↓' : '—'} {k.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div className="card">
          <h3 className={styles.chartTitle}>Ad Generations Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4F0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: '1px solid #E4E4F0', borderRadius: 10, fontSize: 13 }} />
              <Area type="monotone" dataKey="ads" stroke="#6C63FF" strokeWidth={2.5} fill="url(#purpleGrad)" dot={{ fill: '#6C63FF', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two Charts */}
        <div className={styles.chartsRow}>
          <div className="card">
            <h3 className={styles.chartTitle}>Ads by Platform</h3>
            <div className={styles.pieWrap}>
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie data={platformData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {platformData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ border: '1px solid #E4E4F0', borderRadius: 10, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.pieLegend}>
                {platformData.map((d, i) => (
                  <div key={i} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: d.color }}></span>
                    <span className={styles.legendLabel}>{d.name}</span>
                    <span className={styles.legendValue}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className={styles.chartTitle}>Ads by Industry</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={industryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4F0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={{ border: '1px solid #E4E4F0', borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="count" fill="#6C63FF" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Export History */}
        <div className="card">
          <h3 className={styles.chartTitle}>Recent Exports</h3>
          <div className={styles.exportTable}>
            <div className={styles.tableHeader}>
              <span style={{ flex: 2 }}>Ad Name</span>
              <span style={{ flex: 1 }}>Platform</span>
              <span style={{ width: 60 }}>Format</span>
              <span style={{ width: 80 }}>Size</span>
              <span style={{ width: 100 }}>Date</span>
              <span style={{ width: 100 }}>Action</span>
            </div>
            {exports.map((e, i) => (
              <div key={i} className={`${styles.tableRow} ${i % 2 === 1 ? styles.tableRowAlt : ''}`}>
                <span style={{ flex: 2 }} className={styles.rowName}>{e.name}</span>
                <span style={{ flex: 1 }} className={styles.rowMeta}>{e.platform}</span>
                <span style={{ width: 60 }}>
                  <span className={`tag ${e.format === 'PDF' ? 'tag-danger' : e.format === 'PNG' ? 'tag-primary' : 'tag-warning'}`} style={{ fontSize: 10 }}>{e.format}</span>
                </span>
                <span style={{ width: 80 }} className={styles.rowMeta}>{e.size}</span>
                <span style={{ width: 100 }} className={styles.rowMeta}>{e.date}</span>
                <span style={{ width: 100 }}>
                  <button className={styles.reDownBtn}>⬇️ Re-download</button>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Templates */}
        <div className={styles.section}>
          <h3 className={styles.chartTitle}>Top Templates Used</h3>
          <div className={styles.topTemplates}>
            {topTemplates.map((t, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', flex: 1 }}>
                <div style={{ height: 120, overflow: 'hidden' }}>
                  <img src={`https://images.pexels.com/photos/${t.img}/pexels-photo-${t.img}.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1`} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--muted)' }}>Used {t.uses} times</p>
                  </div>
                  <span className="tag tag-primary" style={{ fontSize: 11 }}>{t.uses}×</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
