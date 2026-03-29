import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { GuidesPage } from './pages/GuidesPage'
import { HelpPage } from './pages/HelpPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </div>
  )
}

export default App
