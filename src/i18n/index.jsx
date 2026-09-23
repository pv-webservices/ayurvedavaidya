import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import es from './es'
import ru from './ru'

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ru', label: 'Русский', short: 'RU' },
]

const DICTIONARIES = { en, es, ru }
const STORAGE_KEY = 'av-language'
const DEFAULT_LANGUAGE = 'en'

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored && DICTIONARIES[stored] ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

function lookup(dictionary, path) {
  return path.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dictionary)
}

const I18nContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLanguage)

  const setLang = useCallback((code) => {
    if (!DICTIONARIES[code]) return
    setLangState(code)
    try { window.localStorage.setItem(STORAGE_KEY, code) } catch { /* storage unavailable: keep in memory only */ }
  }, [])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const value = useMemo(() => {
    const dictionary = DICTIONARIES[lang]
    /** Returns the translated value (string, array or object) with an English fallback. */
    const t = (path) => lookup(dictionary, path) ?? lookup(en, path) ?? path
    return { lang, setLang, t }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside LanguageProvider')
  return context
}

/** Sets the document title for the current route in the active language. */
export function usePageTitle(title) {
  const { t } = useI18n()
  useEffect(() => {
    const brand = t('meta.brand')
    document.title = title ? `${title} | ${brand}` : `${brand} | ${t('meta.homeTitle')}`
  }, [title, t])
}
