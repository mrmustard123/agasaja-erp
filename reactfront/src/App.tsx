import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { t, type Language } from './i18n'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { useAuth } from './auth/authContext'
import { RequireAuth } from './auth/RequireAuth'

function App() {
  const [language, setLanguage] = useState<Language>('es')  
  const { isLoggedIn, logout } = useAuth()  
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }


  return (
    <div className="app-shell">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main className="public-page welcome-page">
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

        <Route
          path="/login"
          element={<LoginPage language={language} />}
        />
        <Route
          path="/register"
          element={<RegisterPage language={language} />}
        />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardPage language={language} />} />
          <Route path="/dashboard/:viewKey" element={<DashboardPage language={language} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
