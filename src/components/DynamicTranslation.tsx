import { useTranslation } from 'react-i18next';

interface TranslationHelperProps {
  text: string;
  namespace?: string;
}

/**
 * Helper component for dynamic text that might not be pre-translated
 * Falls back to original text if translation doesn't exist
 */
export const DynamicText: React.FC<TranslationHelperProps> = ({ text, namespace = 'dynamic' }) => {
  const { t } = useTranslation();

  // Create a key from the text (sanitize it)
  const key = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

  // Try to get translation, fallback to original text
  const translatedText = t(`${namespace}.${key}`, { defaultValue: text });

  return <span>{translatedText}</span>;
};

/**
 * Hook for dynamic translation with fallback
 */
export const useDynamicTranslation = () => {
  const { t } = useTranslation();

  const translateDynamic = (text: string, namespace = 'dynamic') => {
    const key = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    return t(`${namespace}.${key}`, { defaultValue: text });
  };

  return { translateDynamic };
};
