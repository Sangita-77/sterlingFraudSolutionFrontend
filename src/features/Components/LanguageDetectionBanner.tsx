import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import './LanguageDetectionBanner.css';

const LanguageDetectionBanner: React.FC = () => {
  const { currentLanguage, detectedLanguage, isLoading } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  if (isLoading || !isVisible || !detectedLanguage) return null;

  const wasDetected = detectedLanguage !== currentLanguage;

  return (
    <div className={`language-detection-banner ${wasDetected ? 'auto-detected' : 'user-selected'}`}>
      <div className="banner-content">
        <span className="banner-icon">🌐</span>
        <div className="banner-text">
          {wasDetected ? (
            <>
              <strong>{t('messages.languageDetected')}</strong>
              <p>
                {t('common.selectLanguage')} {detectedLanguage.toUpperCase()}
              </p>
            </>
          ) : (
            <>
              <strong>Language set to {currentLanguage.toUpperCase()}</strong>
              <p>You can change this anytime using the language selector</p>
            </>
          )}
        </div>
      </div>
      <button
        className="banner-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        ✕
      </button>
    </div>
  );
};

export default LanguageDetectionBanner;
