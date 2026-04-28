import { BASE_URL } from './config';

export type SupportedLanguage = 'en' | 'fr' | 'de' | 'it';

export interface LanguageDetectionResponse {
  success: boolean;
  detectedLanguage: SupportedLanguage;
  userIp: string;
  geoData: {
    language: SupportedLanguage;
    country: string;
    city: string;
    timezone: string;
  };
}

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'fr', 'de', 'it'];

/**
 * Detect user language based on IP location
 */
export const detectLanguageByIP = async (): Promise<LanguageDetectionResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/language/detect`);
    
    if (!response.ok) {
      console.error('Language detection failed:', response.statusText);
      return null;
    }

    const data: LanguageDetectionResponse = await response.json();
    
    // Validate detected language is supported
    if (!SUPPORTED_LANGUAGES.includes(data.detectedLanguage)) {
      console.warn(`Detected language "${data.detectedLanguage}" not supported, falling back to English`);
      data.detectedLanguage = 'en';
    }

    return data;
  } catch (error) {
    console.error('Error detecting language:', error);
    return null;
  }
};

/**
 * Get language from localStorage or fallback to default
 */
export const getSavedLanguage = (): SupportedLanguage => {
  const saved = localStorage.getItem('selectedLanguage') as SupportedLanguage | null;
  return saved && SUPPORTED_LANGUAGES.includes(saved) ? saved : 'en';
};

/**
 * Save selected language to localStorage
 */
export const saveLanguage = (language: SupportedLanguage): void => {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    localStorage.setItem('selectedLanguage', language);
  }
};

/**
 * Get language from browser settings
 */
export const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
    ? (browserLang as SupportedLanguage)
    : 'en';
};
