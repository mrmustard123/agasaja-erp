import { useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { translations, type Language } from './i18n'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const text = useMemo(() => translations[language], [language])

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={setLanguage} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="welcome-page">
              <section className="hero-panel">
                <p className="eyebrow">{text.tagline}</p>
                <h1>{text.welcomeTitle}</h1>
                <p className="subtitle">{text.welcomeSubtitle}</p>

                <div className="cta-row">
                  <a href="/login" className="primary-button">
                    {text.login}
                  </a>
                  <a href="/register" className="secondary-button">
                    {text.register}
                  </a>
                </div>
              </section>
            </main>
          }
        />

        <Route path="/login" element={<LoginPage language={language} />} />
        <Route path="/register" element={<RegisterPage language={language} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default App
