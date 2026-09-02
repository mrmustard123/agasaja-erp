import { translations, type Language } from '../i18n'

type LoginPageProps = {
  language: Language
  onNavigate: (screen: 'welcome' | 'login' | 'register') => void
}

export function LoginPage({ language, onNavigate }: LoginPageProps) {
  const text = translations[language]

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">{text.login}</p>
        <h2>{text.login}</h2>

        <form className="auth-form">
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="submit" className="primary-button full-width">
            {text.login}
          </button>
        </form>

        <p className="auth-footer">
          {language === 'es' ? '¿No tienes cuenta?' : "Don't have an account?"}{' '}
          <button type="button" className="text-button" onClick={() => onNavigate('register')}>
            {text.register}
          </button>
        </p>
      </section>
    </main>
  )
}
