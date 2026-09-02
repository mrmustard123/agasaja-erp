export type Language = 'es' | 'en'

export const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
] as const

import es from './locales/es.json'
import en from './locales/en.json'

export const translations: Record<string, Record<string, string>> = {
  es,
  en,
}

export function t(key: string, language: Language) {
  return translations[language]?.[key] ?? key
}
