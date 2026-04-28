import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../../api/languageService';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage, detectedLanguage } = useLanguage();
  const { t } = useTranslation();

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: t('common.english') },
    { code: 'fr', label: t('common.french') },
    { code: 'de', label: t('common.german') },
    { code: 'it', label: t('common.italian') },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as SupportedLanguage;
    setLanguage(language);
  };

  return (
    <div className="language-switcher">
      <label htmlFor="language-select" className="language-label">
        {t('common.selectLanguage')}
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="language-select"
        aria-label={t('common.language')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
            {detectedLanguage === lang.code && ' (Detected)'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
