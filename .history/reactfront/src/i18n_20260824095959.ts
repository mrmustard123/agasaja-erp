export type Language = 'es' | 'en'

export const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
] as const

export const translations: Record<
  Language,
  {
    brand: string
    language: string
    login: string
    register: string
    welcomeTitle: string
    welcomeSubtitle: string
    tagline: string
  }
> = {
  es: {
    brand: 'Agasaja ERP',
    language: 'Idioma',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    welcomeTitle: 'Bienvenido a Agasaja ERP',
    welcomeSubtitle:
      'Gestiona tus procesos, inventario y operaciones con una experiencia clara y moderna.',
    tagline: 'Soluciones para tu negocio',
  },
  en: {
    brand: 'Agasaja ERP',
    language: 'Language',
    login: 'Login',
    register: 'Register',
    welcomeTitle: 'Welcome to Agasaja ERP',
    welcomeSubtitle:
      'Manage your processes, inventory, and operations with a clear and modern experience.',
    tagline: 'Solutions for your business',
  },
}
