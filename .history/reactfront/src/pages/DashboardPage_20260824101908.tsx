export function DashboardPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="auth-kicker">Dashboard</p>
        <h2>Panel principal</h2>

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
    </main>
  )
}
