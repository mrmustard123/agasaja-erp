import { languages, translations, type Language } from '../i18n'

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const text = translations[language]

  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand-mark">A</span>
        <span className="brand-name">{text.brand}</span>
      </div>

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

        <a href="/login" className="nav-link">
          {text.login}
        </a>
        <a href="/register" className="nav-link primary">
          {text.register}
        </a>
      </div>
    </header>
  )
}
