import { format, formatDistance, formatRelative, isValid } from 'date-fns';
import { enUS, es, fr, ar, zhCN, hi } from 'date-fns/locale';

// Locale mapping for date-fns
export const DATE_LOCALES = {
  en: enUS,
  es: es,
  fr: fr,
  ar: ar,
  zh: zhCN,
  hi: hi
} as const;

// Number formatting utilities
export class NumberFormatter {
  private locale: string;
  
  constructor(locale: string = 'en') {
    this.locale = locale;
  }
  
  // Format basic numbers
  formatNumber(
    number: number, 
    options: Intl.NumberFormatOptions = {}
  ): string {
    try {
      return new Intl.NumberFormat(this.locale, options).format(number);
    } catch (error) {
      console.warn('Number formatting failed:', error);
      return number.toString();
    }
  }
  
  // Format currency
  formatCurrency(
    amount: number, 
    currency: string = 'USD',
    options: Intl.NumberFormatOptions = {}
  ): string {
    return this.formatNumber(amount, {
      style: 'currency',
      currency,
      ...options
    });
  }
  
  // Format percentage
  formatPercent(
    value: number, 
    decimals: number = 1
  ): string {
    return this.formatNumber(value / 100, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
  
  // Format file sizes
  formatFileSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);
    
    return `${this.formatNumber(size, { maximumFractionDigits: 1 })} ${sizes[i]}`;
  }
  
  // Format compact numbers (1K, 1M, etc.)
  formatCompactNumber(number: number): string {
    return this.formatNumber(number, { notation: 'compact' });
  }
}

// Date formatting utilities
export class DateFormatter {
  private locale: string;
  private dateFnsLocale: Locale;
  
  constructor(locale: string = 'en') {
    this.locale = locale;
    this.dateFnsLocale = DATE_LOCALES[locale as keyof typeof DATE_LOCALES] || enUS;
  }
  
  // Format date with Intl.DateTimeFormat
  formatDate(
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
  ): string {
    try {
      const dateObj = new Date(date);
      if (!isValid(dateObj)) throw new Error('Invalid date');
      
      return new Intl.DateTimeFormat(this.locale, options).format(dateObj);
    } catch (error) {
      console.warn('Date formatting failed:', error);
      return 'Invalid Date';
    }
  }
  
  // Format date with date-fns
  formatDateWithPattern(
    date: Date | string | number,
    pattern: string = 'PPP'
  ): string {
    try {
      const dateObj = new Date(date);
      if (!isValid(dateObj)) throw new Error('Invalid date');
      
      return format(dateObj, pattern, { locale: this.dateFnsLocale });
    } catch (error) {
      console.warn('Date pattern formatting failed:', error);
      return 'Invalid Date';
    }
  }
  
  // Format relative time
  formatRelativeTime(date: Date | string | number): string {
    try {
      const dateObj = new Date(date);
      if (!isValid(dateObj)) throw new Error('Invalid date');
      
      return formatDistance(dateObj, new Date(), { 
        addSuffix: true, 
        locale: this.dateFnsLocale 
      });
    } catch (error) {
      console.warn('Relative time formatting failed:', error);
      return this.formatDate(date);
    }
  }
  
  // Format time only
  formatTime(date: Date | string | number): string {
    return this.formatDate(date, { timeStyle: 'short' });
  }
  
  // Format date and time
  formatDateTime(date: Date | string | number): string {
    return this.formatDate(date, { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });
  }
}

// RTL text utilities
export class RTLFormatter {
  private isRTL: boolean;
  
  constructor(isRTL: boolean = false) {
    this.isRTL = isRTL;
  }
  
  // Apply RTL-aware text direction
  applyTextDirection(text: string): string {
    if (!this.isRTL) return text;
    
    // Add RTL mark for proper text rendering
    return `\u202B${text}\u202C`;
  }
  
  // Format mixed content (numbers in RTL text)
  formatMixedContent(text: string): string {
    if (!this.isRTL) return text;
    
    // Wrap numbers and Latin text in LTR marks
    return text.replace(/([0-9]+|[a-zA-Z]+)/g, '\u202D$1\u202C');
  }
  
  // Get CSS direction value
  getDirection(): 'ltr' | 'rtl' {
    return this.isRTL ? 'rtl' : 'ltr';
  }
  
  // Get text alignment for RTL
  getTextAlign(): 'left' | 'right' {
    return this.isRTL ? 'right' : 'left';
  }
}

// Utility functions for common formatting tasks
export const formatters = {
  // Create formatters for a specific locale
  create: (locale: string, isRTL: boolean = false) => ({
    number: new NumberFormatter(locale),
    date: new DateFormatter(locale),
    rtl: new RTLFormatter(isRTL)
  }),
  
  // Quick format functions
  currency: (amount: number, currency: string = 'USD', locale: string = 'en') => 
    new NumberFormatter(locale).formatCurrency(amount, currency),
    
  percent: (value: number, locale: string = 'en') => 
    new NumberFormatter(locale).formatPercent(value),
    
  fileSize: (bytes: number, locale: string = 'en') => 
    new NumberFormatter(locale).formatFileSize(bytes),
    
  relativeTime: (date: Date | string | number, locale: string = 'en') => 
    new DateFormatter(locale).formatRelativeTime(date),
    
  shortDate: (date: Date | string | number, locale: string = 'en') => 
    new DateFormatter(locale).formatDate(date, { dateStyle: 'short' }),
    
  longDate: (date: Date | string | number, locale: string = 'en') => 
    new DateFormatter(locale).formatDate(date, { dateStyle: 'full' })
};