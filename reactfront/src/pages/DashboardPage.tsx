import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SidebarMenu } from '../components/SidebarMenu'
import { allMenuItems } from '../data/menu'
import { t, type Language } from '../i18n'
import { ModuleViewPage } from './ModuleViewPage'

type DashboardProps = {
  language: Language
}

export function DashboardPage({ language }: DashboardProps) {
  const { viewKey } = useParams()
  const [allowedIds, setAllowedIds] = useState<number[] | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      return
    }

    fetch('/api/user-functionalities', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return null
        }

        return response.json()
      })
      .then((data) => {
        if (!data) {
          return
        }

        const functionalites = Array.isArray(data.functionalities) ? data.functionalities : []
        setAllowedIds(functionalites.map(Number))
      })
      .catch(() => {
        setAllowedIds(null)
      })
  }, [])

  const activeView = useMemo(() => {
    if (!viewKey) {
      return null
    }

    return allMenuItems.find((item) => item.path === `/dashboard/${viewKey}`) ?? null
  }, [viewKey])

  const tt = (key: string) => t(key, language)

  return (
    <main className="dashboard-page dashboard-layout">
      <SidebarMenu language={language} allowedIds={allowedIds} />

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
