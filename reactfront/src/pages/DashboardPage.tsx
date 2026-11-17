import {useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SidebarMenu } from '../components/SidebarMenu'
import { allMenuItems } from '../data/menu'
import { t, type Language } from '../i18n'
import { ModuleViewPage } from './ModuleViewPage'
import { useAuth } from '../auth/authContext'

type DashboardProps = {
  language: Language
}

export function DashboardPage({ language }: DashboardProps) {

  const { viewKey } = useParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [allowedIds, setAllowedIds] = useState<number[] | null>(null)

  const { apiFetch } = useAuth()

  useEffect(() => {

    let ignore = false

    apiFetch('/api/user-functionalities')
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (ignore || !data) return
      const functionalities = Array.isArray(data.functionalities) ? data.functionalities : []
      setAllowedIds(functionalities.map(Number))
    })
    .catch(() => {
        if (!ignore) setAllowedIds(null)
    })

    return () => {
      ignore = true
    }      

  },[apiFetch])



  const activeView = useMemo(() => {
    if (!viewKey) {
      return null
    }

    return allMenuItems.find((item) => item.path === `/dashboard/${viewKey}`) ?? null
  }, [viewKey])

  const tt = (key: string) => t(key, language)

  return (
    <main className={`dashboard-page dashboard-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {!isSidebarOpen && (
        <button
          type="button"
          className="sidebar-hamburger"
          aria-label="Abrir menú"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      )}

      <SidebarMenu
        language={language}
        allowedIds={allowedIds}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <section className="dashboard-workspace">
        {activeView ? (
          <ModuleViewPage language={language} />
        ) : (
          <section className="dashboard-card">
            <p className="auth-kicker">{tt('dashboardTitle')}</p>
            <h2>{tt('dashboardSubtitle')}</h2>

            <div className="dashboard-grid">
              <article className="metric-card">
                <span className="metric-label">Ventas</span>
                <strong className="metric-value">$12,480</strong>
                <small>+8.2% este mes</small>
              </article>

              <article className="metric-card">
                <span className="metric-label">Productos</span>
                <strong className="metric-value">328</strong>
                <small>24 pendientes</small>
              </article>

              <article className="metric-card">
                <span className="metric-label">Pedidos</span>
                <strong className="metric-value">57</strong>
                <small>9 entregados hoy</small>
              </article>
            </div>

            <div className="dashboard-panel">
              <h3>Resumen</h3>
              <ul>
                <li>Inventario actualizado esta semana.</li>
                <li>Dos alertas de stock bajo revisadas.</li>
                <li>Revisión de pagos programada para mañana.</li>
              </ul>
            </div>
          </section>
        )}
      </section>
    </main>
  )
}
