import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { menuSections } from '../data/menu'
import { t, type Language } from '../i18n'

type SidebarMenuProps = {
  language: Language
  allowedIds?: number[] | null
}

export function SidebarMenu({ language, allowedIds }: SidebarMenuProps) {
  const location = useLocation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  console.log("allowedIds:", allowedIds);

  const effectiveAllowedIds = useMemo(() => {
    if (!allowedIds || allowedIds.length === 0) {
      return null
    }

    return allowedIds
  }, [allowedIds])

  const sections = useMemo(
    () =>
      menuSections.filter((section) =>
        section.items.some((item) => !effectiveAllowedIds || effectiveAllowedIds.includes(item.permissionId)),
      ),
    [effectiveAllowedIds],
  )

  useEffect(() => {
    const currentPath = location.pathname
    const nextExpanded: Record<string, boolean> = {}

    for (const section of menuSections) {
      if (section.items.some((item) => item.path === currentPath)) {
        nextExpanded[section.key] = true
      }
    }

    setExpanded((previous) => ({ ...previous, ...nextExpanded }))
  }, [location.pathname])

  const toggleSection = (key: string) => {
    setExpanded((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  return (
    <aside className="dashboard-sidebar">
      {sections.map((section) => {
        const isOpen = Boolean(expanded[section.key])

        return (
          <div key={section.key} className="menu-group">
            <button
              type="button"
              className="menu-section-toggle"
              aria-expanded={isOpen}
              aria-controls={`${section.key}-items`}
              onClick={() => toggleSection(section.key)}
            >
              <span>{t(section.titleKey, language)}</span>
              <span className="menu-chevron" aria-hidden="true">
                {isOpen ? '▾' : '▸'}
              </span>
            </button>

            {isOpen && (
              <nav id={`${section.key}-items`} className="menu-items" aria-label={t(section.titleKey, language)}>
                {section.items
                  .filter((item) => !effectiveAllowedIds || effectiveAllowedIds.includes(item.permissionId))
                  .map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`menu-link ${isActive ? 'active' : ''}`}
                      >
                        {t(item.key, language)}
                      </Link>
                    )
                  })}
              </nav>
            )}
          </div>
        )
      })}
    </aside>
  )
}
