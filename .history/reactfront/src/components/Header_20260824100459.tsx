import { languages, translations, type Language } from '../i18n'

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  onNavigate: (screen: 'welcome' | 'login' | 'register') => void
}

export function Header({ language, onLanguageChange, onNavigate }: HeaderProps) {
  const text = translations[language]

  return (
    <header className="topbar">
      <button type="button" className="brand-block brand-button" onClick={() => onNavigate('welcome')}>
        <span className="brand-mark">A</span>
        <span className="brand-name">{text.brand}</span>
      </button>

      <div className="header-actions">
        <label className="language-selector" htmlFor="language-select">
          <span>{text.language}</span>
          <select
            id="language-select"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as Language)}
            aria-label={text.language}
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="nav-link" onClick={() => onNavigate('login')}>
          {text.login}
        </button>
        <button type="button" className="nav-link primary" onClick={() => onNavigate('register')}>
          {text.register}
        </button>
      </div>
    </header>
  )
}
