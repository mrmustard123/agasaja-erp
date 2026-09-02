import { useMemo, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { translations, type Language } from './i18n'

function App() {
  const [language, setLanguage] = useState<Language>('es')

  const text = useMemo(() => translations[language], [language])

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={setLanguage} />

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
    </div>
  )
}

export default App
