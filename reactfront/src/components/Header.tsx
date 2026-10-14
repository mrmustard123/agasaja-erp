import { Link } from 'react-router-dom'
import { languages, t, type Language } from '../i18n'

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function Header({
  language,
  onLanguageChange,
  isLoggedIn = false,
  onLogout,
}: HeaderProps) {
  const text = (key: string) => t(key, language)

  return (
    <header className="topbar">
      <Link to="/" className="brand-block brand-button">
        <span className="brand-mark">A</span>
        <span className="brand-name">{text('brand')}</span>
      </Link>

      <div className="header-actions">
        <label className="language-selector" htmlFor="language-select">
          <span>{text('language')}</span>
          <select
            id="language-select"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as Language)}
            aria-label={text('language')}
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        {isLoggedIn ? (
          <button
            type="button"
            className="nav-link"
            onClick={onLogout}
          >
            {text('logout')}
          </button>
        ) : (
          <Link to="/login" className="nav-link">
            {text('login')}
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/register" className="nav-link primary">
            {text('register')}
          </Link>
        )}
      </div>
    </header>
  )
}
