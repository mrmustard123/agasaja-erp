import { type SyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { t, type Language } from '../i18n'

type RegisterPageProps = {
  language: Language
}

export function RegisterPage({ language }: RegisterPageProps) {
  const textReg = (key: string) => t(key, language)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors(null)
    setLoading(true)

    const form = event.currentTarget
    const fd = new FormData(form)
    const payload = {
      user_name: fd.get('name')?.toString() ?? '',
      email: fd.get('email')?.toString() ?? '',
      password: fd.get('password')?.toString() ?? '',
      password_confirmation: fd.get('password_confirmation')?.toString() ?? '',
    }

    try {
      const res = await fetch('http://localhost:8741/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data && data.errors) {
          const first = Object.values(data.errors)[0]
          setErrors(Array.isArray(first) ? first[0] : String(first))
        } else if (data && data.message) {
          setErrors(data.message)
        } else {
          setErrors('Registration failed')
        }

        setLoading(false)
        return
      }

      // store token and navigate
      if (data.token) localStorage.setItem('auth_token', data.token)
      navigate('/dashboard')
    } catch (err) {
      setErrors('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">{textReg('register')}</p>
        <h2>{textReg('register')}</h2>

        <form name="register" className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>{textReg('name')}</span>
            <input name="name" type="text" placeholder={textReg('name')} required />
          </label>

          <label>
            <span>{textReg('email')}</span>
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>

          <label>
            <span>{textReg('password')}</span>
            <input name="password" type="password" placeholder="••••••••" required />
          </label>

          <label>
            <span>{textReg('passwordConfirmation')}</span>
            <input name="password_confirmation" type="password" placeholder="••••••••" required />
          </label>

          {errors && <p style={{ color: 'crimson' }}>{errors}</p>}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? textReg('register') + '...' : textReg('register')}
          </button>
        </form>

        <p className="auth-footer">
          {language === 'es' ? '¿Ya tienes cuenta?' : 'Already have an account?'}{' '}
          <Link to="/login" className="text-button">
            {textReg('login')}
          </Link>
        </p>
      </section>
    </main>
  )
}
