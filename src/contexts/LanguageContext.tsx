import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { SupportedLanguage } from '../api/languageService';
import { detectLanguageByIP, getSavedLanguage, saveLanguage, getBrowserLanguage } from '../api/languageService';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  isLoading: boolean;
  detectedLanguage: SupportedLanguage | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage | null>(null);

  useEffect(() => {
    const initializeLanguage = async () => {
      setIsLoading(true);

      // Step 1: Check if user has a saved preference
      const savedLanguage = getSavedLanguage();
      if (savedLanguage !== 'en') {
        setCurrentLanguage(savedLanguage);
        setIsLoading(false);
        return;
      }

      // Step 2: Try to detect language from IP
      try {
        const detectionResult = await detectLanguageByIP();
        if (detectionResult && detectionResult.success) {
          const detected = detectionResult.detectedLanguage;
          setDetectedLanguage(detected);
          setCurrentLanguage(detected);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('IP detection failed:', error);
      }

      // Step 3: Fallback to browser language
      const browserLang = getBrowserLanguage();
      setCurrentLanguage(browserLang);
      setIsLoading(false);
    };

    initializeLanguage();
  }, []);

  const handleSetLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    saveLanguage(language);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage: handleSetLanguage,
    isLoading,
    detectedLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
