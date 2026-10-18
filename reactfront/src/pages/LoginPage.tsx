import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { t, type Language } from '../i18n'

type LoginPageProps = {
  language: Language
  onAuthChange?: () => void
}

export function LoginPage({ language, onAuthChange }: LoginPageProps) {
  const textLogin = (key: string) => t(key, language)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        // Your controller returns {"message":"Invalid credentials"} on failure
        setError(data?.message ?? (language === 'es' ? 'Error al iniciar sesión' : 'Login failed'))
        return
      }

      // Adjust the key to whatever your /login actually returns
      const token = data?.access_token ?? data?.token

      if (!token) {
        setError(language === 'es' ? 'Respuesta inesperada del servidor' : 'Unexpected server response')
        return
      }

      localStorage.setItem('auth_token', token)
      onAuthChange?.()
      navigate('/dashboard')
    } catch {
      setError(language === 'es' ? 'No se pudo conectar con el servidor' : 'Could not reach the server')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">{textLogin('login')}</p>
        <h2>{textLogin('login')}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>{textLogin('email')}</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            <span>{textLogin('password')}</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p role="alert">{error}</p>}

          <button type="submit" className="primary-button full-width" disabled={isSubmitting}>
            {textLogin('login')}
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