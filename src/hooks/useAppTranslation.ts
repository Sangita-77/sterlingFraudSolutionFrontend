import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Custom hook to use translations with language context
 * Combines i18n translations with language context awareness
 */
export const useAppTranslation = () => {
  const { t } = useTranslation();
  const { currentLanguage, isLoading } = useLanguage();

  return {
    t,
    currentLanguage,
    isLoading,
  };
};
