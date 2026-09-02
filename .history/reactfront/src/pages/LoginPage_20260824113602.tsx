import { type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { t, type Language } from '../i18n'

type LoginPageProps = {
  language: Language
}

export function LoginPage({ language }: LoginPageProps) {
  const textLogin = (key: string) => t(key, language)
  const navigate = useNavigate()

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">{textLogin('login')}</p>
        <h2>{textLogin('login')}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>{textLogin('email')}</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>{textLogin('password')}</span>
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="submit" className="primary-button full-width">
            {text.login}
          </button>
        </form>

        <p className="auth-footer">
            {language === 'es' ? '¿No tienes cuenta?' : "Don't have an account?"}{' '}
          <Link to="/register" className="text-button">
            {textLogin('register')}
          </Link>
        </p>
      </section>
    </main>
  )
}
