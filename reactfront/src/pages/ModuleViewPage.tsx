import { useParams } from 'react-router-dom'
import { allMenuItems } from '../data/menu'
import { t, type Language } from '../i18n'

type ModuleViewPageProps = {
  language: Language
}

export function ModuleViewPage({ language }: ModuleViewPageProps) {
  const { viewKey } = useParams()
  const currentPath = viewKey ? `/dashboard/${viewKey}` : '/dashboard'
  const currentItem = allMenuItems.find((item) => item.path === currentPath)
  const label = currentItem ? t(currentItem.key, language) : t('dashboardTitle', language)

  return (
    <section className="module-view-panel">
      <p className="auth-kicker">{t('dashboardTitle', language)}</p>
      <h2>{label}</h2>

      <div className="module-placeholder">
        <p>
          {language === 'es'
            ? 'Este módulo está listo para desarrollarse en una vista dedicada.'
            : 'This module is ready to be built as its own dedicated view.'}
        </p>
        <small>
          {language === 'es' ? 'Ruta actual:' : 'Current route:'} {currentPath}
        </small>
      </div>
    </section>
  )
}
