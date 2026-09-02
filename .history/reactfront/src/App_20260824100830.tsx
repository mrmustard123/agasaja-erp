import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { translations, type Language } from './i18n'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

type Screen = 'welcome' | 'login' | 'register'

const routeMap: Record<string, Screen> = {
  '/': 'welcome',
  '/login': 'login',
  '/register': 'register',
}

function getScreenFromPath(pathname: string): Screen {
  return routeMap[pathname] ?? 'welcome'
}

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [screen, setScreen] = useState<Screen>(() => getScreenFromPath(window.location.pathname))

  const text = useMemo(() => translations[language], [language])

  const navigateTo = (nextScreen: Screen) => {
    const path = nextScreen === 'welcome' ? '/' : `/${nextScreen}`
    window.history.pushState({}, '', path)
    setScreen(nextScreen)
  }

  useEffect(() => {
    const handlePopState = () => {
      setScreen(getScreenFromPath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="app-shell">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={navigateTo}
      />

      {screen === 'welcome' && (
        <main className="welcome-page">
          <section className="hero-panel">
            <p className="eyebrow">{text.tagline}</p>
            <h1>{text.welcomeTitle}</h1>
            <p className="subtitle">{text.welcomeSubtitle}</p>

            <div className="cta-row">
              <button type="button" className="primary-button" onClick={() => navigateTo('login')}>
                {text.login}
              </button>
              <button type="button" className="secondary-button" onClick={() => navigateTo('register')}>
                {text.register}
              </button>
            </div>
          </section>
        </main>
      )}

      {screen === 'login' && <LoginPage language={language} onNavigate={navigateTo} />}
      {screen === 'register' && <RegisterPage language={language} onNavigate={navigateTo} />}
    </div>
  )
}

export default App
