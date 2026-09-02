import { Link } from 'react-router-dom'
import { translations, type Language } from '../i18n'

type RegisterPageProps = {
  language: Language
}

export function RegisterPage({ language }: RegisterPageProps) {
  const text = translations[language]

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">{text.register}</p>
        <h2>{text.register}</h2>

        <form className="auth-form">
          <label>
            <span>{language === 'es' ? 'Nombre' : 'Name'}</span>
            <input type="text" placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} />
          </label>

          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>{language === 'es' ? 'Contraseña' : 'Password'}</span>
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="submit" className="primary-button full-width">
            {text.register}
          </button>
        </form>

        <p className="auth-footer">
          {language === 'es' ? '¿Ya tienes cuenta?' : 'Already have an account?'}{' '}
          <Link to="/login" className="text-button">
            {text.login}
          </Link>
        </p>
      </section>
    </main>
  )
}
