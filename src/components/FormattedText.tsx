import React from 'react';
import { useI18n } from '../hooks/useI18n';

interface FormattedTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Component for RTL-aware text rendering
export const FormattedText: React.FC<FormattedTextProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { isRTL } = useI18n();
  
  return (
    <Component 
      className={`${className} ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </Component>
  );
};

interface FormattedNumberProps {
  value: number;
  style?: 'decimal' | 'currency' | 'percent';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  className?: string;
}

// Component for formatted numbers
export const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  style = 'decimal',
  currency = 'USD',
  minimumFractionDigits,
  maximumFractionDigits,
  className = ''
}) => {
  const { formatNumber } = useI18n();
  
  const formattedValue = formatNumber(value, {
    style,
    currency: style === 'currency' ? currency : undefined,
    minimumFractionDigits,
    maximumFractionDigits
  });
  
  return (
    <span className={className}>
      {formattedValue}
    </span>
  );
};

interface FormattedDateProps {
  value: Date | string | number;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  format?: string;
  relative?: boolean;
  className?: string;
}

// Component for formatted dates
export const FormattedDate: React.FC<FormattedDateProps> = ({
  value,
  dateStyle = 'medium',
  timeStyle,
  format,
  relative = false,
  className = ''
}) => {
  const { formatDate, formatRelativeTime } = useI18n();
  
  const formattedValue = relative 
    ? formatRelativeTime(value)
    : formatDate(value, { dateStyle, timeStyle, format });
  
  return (
    <time className={className} dateTime={new Date(value).toISOString()}>
      {formattedValue}
    </time>
  );
};

interface FormattedCurrencyProps {
  value: number;
  currency?: string;
  className?: string;
}

// Component for formatted currency
export const FormattedCurrency: React.FC<FormattedCurrencyProps> = ({
  value,
  currency = 'USD',
  className = ''
}) => {
  const { formatCurrency } = useI18n();
  
  return (
    <span className={className}>
      {formatCurrency(value, currency)}
    </span>
  );
};

interface FormattedPercentProps {
  value: number;
  decimals?: number;
  className?: string;
}

// Component for formatted percentages
export const FormattedPercent: React.FC<FormattedPercentProps> = ({
  value,
  decimals = 1,
  className = ''
}) => {
  const { formatPercent } = useI18n();
  
  return (
    <span className={className}>
      {formatPercent(value, decimals)}
    </span>
  );
};