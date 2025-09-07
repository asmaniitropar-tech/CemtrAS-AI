import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { format, formatDistance, formatRelative } from 'date-fns';
import { enUS, es, fr, ar, zhCN, hi } from 'date-fns/locale';
import { SUPPORTED_LANGUAGES, RTL_LANGUAGES } from '../i18n';

// Date-fns locale mapping
const DATE_LOCALES = {
  en: enUS,
  es: es,
  fr: fr,
  ar: ar,
  zh: zhCN,
  hi: hi
};

// Number formatting options
interface NumberFormatOptions {
  style?: 'decimal' | 'currency' | 'percent';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

// Date formatting options
interface DateFormatOptions {
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  format?: string;
}

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  const isRTL = RTL_LANGUAGES.includes(currentLanguage);
  
  // Change language function
  const changeLanguage = useCallback(async (lng: string) => {
    await i18n.changeLanguage(lng);
    
    // Update document direction and language
    document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Store preference
    localStorage.setItem('cemtras_language', lng);
  }, [i18n]);
  
  // Format numbers with locale-specific formatting
  const formatNumber = useCallback((
    number: number, 
    options: NumberFormatOptions = {}
  ): string => {
    try {
      return new Intl.NumberFormat(currentLanguage, {
        style: options.style || 'decimal',
        currency: options.currency || 'USD',
        minimumFractionDigits: options.minimumFractionDigits,
        maximumFractionDigits: options.maximumFractionDigits
      }).format(number);
    } catch (error) {
      console.warn('Number formatting failed, falling back to default:', error);
      return number.toString();
    }
  }, [currentLanguage]);
  
  // Format currency with locale-specific formatting
  const formatCurrency = useCallback((
    amount: number, 
    currency: string = 'USD'
  ): string => {
    return formatNumber(amount, { style: 'currency', currency });
  }, [formatNumber]);
  
  // Format percentage with locale-specific formatting
  const formatPercent = useCallback((
    value: number, 
    decimals: number = 1
  ): string => {
    return formatNumber(value / 100, { 
      style: 'percent', 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals 
    });
  }, [formatNumber]);
  
  // Format dates with locale-specific formatting
  const formatDate = useCallback((
    date: Date | string | number, 
    options: DateFormatOptions = {}
  ): string => {
    try {
      const dateObj = new Date(date);
      const locale = DATE_LOCALES[currentLanguage as keyof typeof DATE_LOCALES] || enUS;
      
      if (options.format) {
        return format(dateObj, options.format, { locale });
      }
      
      return new Intl.DateTimeFormat(currentLanguage, {
        dateStyle: options.dateStyle || 'medium',
        timeStyle: options.timeStyle
      }).format(dateObj);
    } catch (error) {
      console.warn('Date formatting failed, falling back to default:', error);
      return new Date(date).toLocaleDateString();
    }
  }, [currentLanguage]);
  
  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = useCallback((
    date: Date | string | number
  ): string => {
    try {
      const dateObj = new Date(date);
      const locale = DATE_LOCALES[currentLanguage as keyof typeof DATE_LOCALES] || enUS;
      return formatDistance(dateObj, new Date(), { addSuffix: true, locale });
    } catch (error) {
      console.warn('Relative time formatting failed:', error);
      return formatDate(date);
    }
  }, [currentLanguage, formatDate]);
  
  // Format time only
  const formatTime = useCallback((
    date: Date | string | number
  ): string => {
    return formatDate(date, { timeStyle: 'short' });
  }, [formatDate]);
  
  // Get available languages
  const availableLanguages = useMemo(() => {
    return Object.entries(SUPPORTED_LANGUAGES).map(([code, info]) => ({
      code,
      ...info
    }));
  }, []);
  
  // Get current language info
  const currentLanguageInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES] || SUPPORTED_LANGUAGES.en;
  }, [currentLanguage]);
  
  // Pluralization helper
  const plural = useCallback((
    count: number, 
    key: string, 
    options?: Record<string, any>
  ): string => {
    return t(key, { count, ...options });
  }, [t]);
  
  // Translation with fallback
  const translate = useCallback((
    key: string, 
    options?: Record<string, any>, 
    fallback?: string
  ): string => {
    const translation = t(key, options);
    return translation === key && fallback ? fallback : translation;
  }, [t]);
  
  return {
    // Core translation functions
    t: translate,
    plural,
    
    // Language management
    currentLanguage,
    currentLanguageInfo,
    availableLanguages,
    changeLanguage,
    isRTL,
    
    // Formatting functions
    formatNumber,
    formatCurrency,
    formatPercent,
    formatDate,
    formatTime,
    formatRelativeTime,
    
    // Utilities
    isLoading: !i18n.isInitialized
  };
};