import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppLayout({ title, children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <Topbar title={title} />
      <main className="main-with-sidebar">
        {children}
      </main>
    </div>
  )
}
