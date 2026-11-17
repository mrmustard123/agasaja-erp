/*
sessionStorage más un handshake entre pestañas: una pestaña nueva le pide el token a las 
otras (con BroadcastChannel) y lo copia a su sessionStorage. Si se cierran todas, no 
queda nadie que responda y la sesión muere. Es lo que mejor encaja con tus dos requisitos, 
pero agrega un estado de “inicializando” (para que RequireAuth espere la respuesta antes 
de redirigir) y conviene recordar a qué ruta ibas, para volver ahí tras el login. Son unas 
30 líneas más y un par de casos borde.
*/

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './authContext'

const STORAGE = sessionStorage
const TOKEN_KEY = 'auth_token'
const CHANNEL_NAME = 'auth'
const HANDSHAKE_TIMEOUT_MS = 250

type AuthMessage =
  | { type: 'request' }
  | { type: 'token'; token: string }
  | { type: 'logout' }

function post(channel: BroadcastChannel | null, message: AuthMessage) {
  channel?.postMessage(message)
}

function isExpired(token: string): boolean {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    return typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now()
  } catch {
    return true
  }
}

function readStoredToken(): string | null {
  const token = STORAGE.getItem(TOKEN_KEY)
  if (token && isExpired(token)) {
    STORAGE.removeItem(TOKEN_KEY)
    return null
  }
  return token
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readStoredToken)
  const [isReady, setIsReady] = useState(token !== null) // con token propio no hay nada que esperar
  const tokenRef = useRef<string | null>(token)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const awaitingRef = useRef(false) // true solo mientras esperamos respuesta al handshake

  const setSession = useCallback((next: string | null) => {
    if (next) {
      STORAGE.setItem(TOKEN_KEY, next)
    } else {
      STORAGE.removeItem(TOKEN_KEY)
    }
    tokenRef.current = next
    setToken(next)
  }, [])

  const login = useCallback((next: string) => setSession(next), [setSession])

  const logout = useCallback(() => {
    setSession(null)
    post(channelRef.current, { type: 'logout' })
  }, [setSession])

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = channel
    let timer: number | undefined

    channel.onmessage = (event: MessageEvent<AuthMessage>) => {
      const message = event.data

      if (message.type === 'request') {
        const current = tokenRef.current
        if (current && !isExpired(current)) {
          post(channel, { type: 'token', token: current })
        }
      } else if (message.type === 'token') {
        // Solo lo adopta quien lo pidió; si no, una pestaña en /login
        // se loguearía sola con el token pedido por otra pestaña.
        if (awaitingRef.current && !isExpired(message.token)) {
          awaitingRef.current = false
          window.clearTimeout(timer)
          setSession(message.token)
          setIsReady(true)
        }
      } else if (message.type === 'logout') {
        setSession(null)
      }
    }

    if (tokenRef.current === null) {
      awaitingRef.current = true
      post(channel, { type: 'request' })
      timer = window.setTimeout(() => {
        awaitingRef.current = false
        setIsReady(true)
      }, HANDSHAKE_TIMEOUT_MS)
    }

    return () => {
      window.clearTimeout(timer)
      channel.close()
      channelRef.current = null
    }
  }, [setSession])

  const apiFetch = useCallback(
    async (input: string, init: RequestInit = {}) => {
      const sentToken = tokenRef.current
      const headers = new Headers(init.headers)
      headers.set('Accept', 'application/json')
      if (sentToken) {
        headers.set('Authorization', `Bearer ${sentToken}`)
      }

      const response = await fetch(input, { ...init, headers })

      if (response.status === 401 && sentToken && sentToken === tokenRef.current) {
        logout()
      }

      return response
    },
    [logout],
  )

  const value = useMemo<AuthContextValue>(
    () => ({ token, isLoggedIn: token !== null, isReady, login, logout, apiFetch }),
    [token, isReady, login, logout, apiFetch],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}