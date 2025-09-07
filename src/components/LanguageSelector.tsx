import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface LanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  showLabel = false,
  compact = false 
}) => {
  const { currentLanguage, availableLanguages, changeLanguage, currentLanguageInfo, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          border border-gray-200/50 dark:border-gray-700/50
          hover:bg-white dark:hover:bg-gray-800
          hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500
          ${compact ? 'text-sm' : 'text-base'}
        `}
        aria-label={t('accessibility.languageSelector')}
        aria-expanded={isOpen}
      >
        <Globe className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600 dark:text-gray-400`} />
        
        {!compact && (
          <>
            <span className="text-lg">{currentLanguageInfo.flag}</span>
            {showLabel && (
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {currentLanguageInfo.name}
              </span>
            )}
          </>
        )}
        
        <ChevronDown 
          className={`
            w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl z-50 overflow-hidden">
            <div className="p-2 space-y-1">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200
                    hover:bg-gray-100/80 dark:hover:bg-gray-700/80
                    ${currentLanguage === language.code 
                      ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {language.code}
                    </div>
                  </div>
                  {currentLanguage === language.code && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {t('common.settings')} • {availableLanguages.length} {t('common.languages', { count: availableLanguages.length })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};