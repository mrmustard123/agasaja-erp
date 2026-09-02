import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { translations, type Language } from '../i18n'

type LoginPageProps = {
  language: Language
}

export function LoginPage({ language }: LoginPageProps) {
  const text = translations[language]
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">{text.login}</p>
        <h2>{text.login}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
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
          <Link to="/register" className="text-button">
            {text.register}
          </Link>
        </p>
      </section>
    </main>
  )
}
