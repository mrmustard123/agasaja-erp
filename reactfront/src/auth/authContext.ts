import { createContext, useContext } from 'react'

export type AuthContextValue = {
  token: string | null
  isLoggedIn: boolean
  isReady: boolean
  login: (token: string) => void
  logout: () => void
  apiFetch: (input: string, init?: RequestInit) => Promise<Response>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}