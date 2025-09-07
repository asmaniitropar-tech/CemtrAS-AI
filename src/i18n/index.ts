import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';
import zhTranslations from './locales/zh.json';
import hiTranslations from './locales/hi.json';

// Supported languages configuration
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸', rtl: false },
  es: { name: 'Español', flag: '🇪🇸', rtl: false },
  fr: { name: 'Français', flag: '🇫🇷', rtl: false },
  ar: { name: 'العربية', flag: '🇸🇦', rtl: true },
  zh: { name: '中文', flag: '🇨🇳', rtl: false },
  hi: { name: 'हिन्दी', flag: '🇮🇳', rtl: false }
};

// RTL languages list
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// Initialize i18next
i18n
  .use(Backend) // Load translations from backend/files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    // Fallback language
    fallbackLng: 'en',
    
    // Debug mode (disable in production)
    debug: import.meta.env.DEV,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cemtras_language'
    },
    
    // Interpolation options
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    // Resources (inline translations)
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      ar: { translation: arTranslations },
      zh: { translation: zhTranslations },
      hi: { translation: hiTranslations }
    },
    
    // Backend options (if loading from files)
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    
    // React options
    react: {
      useSuspense: false // Disable suspense for SSR compatibility
    }
  });

export default i18n;