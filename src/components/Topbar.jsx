import styles from './Topbar.module.css'

export default function Topbar({ title }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.center}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search projects, templates..."
          />
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.bell}>
          🔔
          <span className={styles.badge}>3</span>
        </button>
        <div className={styles.avatar}>A</div>
        <span className={styles.greeting}>Hi, Arjun 👋</span>
      </div>
    </header>
  )
}
