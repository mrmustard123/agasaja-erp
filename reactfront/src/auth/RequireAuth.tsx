import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './authContext'

export function RequireAuth() {
  const { isLoggedIn, isReady } = useAuth()

  if (!isReady) return null
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}