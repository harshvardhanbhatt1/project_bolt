import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import GenerateAd from './pages/GenerateAd'
import CanvasEditor from './pages/CanvasEditor'
import MyProjects from './pages/MyProjects'
import Templates from './pages/Templates'
import BrandKit from './pages/BrandKit'
import AIAssistant from './pages/AIAssistant'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'
import EmptyStates from './pages/EmptyStates'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GenerateAd />} />
        <Route path="/editor" element={<CanvasEditor />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/brand-kit" element={<BrandKit />} />
        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/empty-states" element={<EmptyStates />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
