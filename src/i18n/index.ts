import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import lt from './locales/lt'
import zh from './locales/zh'

const STORAGE_KEY = 'northstar-language'

export const supportedLanguages = ['en', 'lt', 'zh'] as const
export type AppLanguage = (typeof supportedLanguages)[number]

const resources = {
  en: { translation: en },
  lt: { translation: lt },
  zh: { translation: zh },
}

function getInitialLanguage(): AppLanguage {
  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (stored && (supportedLanguages as readonly string[]).includes(stored)) {
    return stored as AppLanguage
  }

  const browserLanguage = navigator.language.toLowerCase()

  if (browserLanguage.startsWith('lt')) return 'lt'
  if (browserLanguage.startsWith('zh')) return 'zh'

  return 'en'
}

function updateDocumentLanguage(language: string) {
  document.documentElement.lang = language
}

if (!i18n.isInitialized) {
  const initialLanguage = getInitialLanguage()

  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: [...supportedLanguages],
    interpolation: {
      escapeValue: false,
    },
  })

  updateDocumentLanguage(initialLanguage)

  i18n.on('languageChanged', (language) => {
    window.localStorage.setItem(STORAGE_KEY, language)
    updateDocumentLanguage(language)
  })
}

export default i18n
