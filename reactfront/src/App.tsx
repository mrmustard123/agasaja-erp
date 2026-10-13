import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { t, type Language } from './i18n'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  const [language, setLanguage] = useState<Language>('es')

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={setLanguage} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="welcome-page">
              <section className="hero-panel">
                <p className="eyebrow">{t('tagline', language)}</p>
                <h1>{t('welcomeTitle', language)}</h1>
                <p className="subtitle">{t('welcomeSubtitle', language)}</p>

                <div className="cta-row">
                  <a href="/login" className="primary-button">
                    {t('login', language)}
                  </a>
                  <a href="/register" className="secondary-button">
                    {t('register', language)}
                  </a>
                </div>
              </section>
            </main>
          }
        />

        <Route path="/login" element={<LoginPage language={language} />} />
        <Route path="/register" element={<RegisterPage language={language} />} />
        <Route path="/dashboard" element={<DashboardPage language={language} />} />
      </Routes>
    </div>
  )
}

export default App
