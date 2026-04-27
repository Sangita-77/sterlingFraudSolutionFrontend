# Language Detection & i18n Implementation Guide

## Overview

This implementation provides automatic language detection based on user IP location with support for English, French, German, and Italian. Users can also manually override the detected language.

## Features

✅ **Automatic Language Detection** - Detects user location via IP and switches language accordingly
✅ **Manual Language Override** - Users can select their preferred language anytime
✅ **Persistent Selection** - Selected language is saved to localStorage
✅ **Fallback Strategy** - Falls back to browser language if API fails
✅ **Accessibility** - Proper aria labels and HTML lang attribute updates
✅ **Responsive UI** - Works on desktop, tablet, and mobile devices

## Architecture

### 1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)
   - Manages global language state
   - Handles language initialization with 3-step fallback:
     1. Check saved preference
     2. Detect from IP using API
     3. Use browser language
   - Provides `useLanguage()` hook for access

### 2. **Language Service** (`src/api/languageService.ts`)
   - Calls the language detection API endpoint
   - Manages localStorage for language preference
   - Validates detected language against supported languages

### 3. **i18n Configuration** (`src/i18n/config.ts`)
   - Sets up i18next with all translation files
   - Configures fallback language and interpolation

### 4. **Translation Files** (`src/locales/`)
   - Organized JSON files for each language (en, fr, de, it)
   - Grouped by namespace (common, nav, messages)

### 5. **Components**
   - **LanguageSwitcher** - Dropdown to select language (includes "Detected" indicator)
   - **LanguageDetectionBanner** - Info banner showing detected language

## Usage Examples

### Basic Translation Usage

```tsx
import { useTranslation } from 'i18next-react';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('messages.welcome')}</h1>
      <p>{t('nav.dashboard')}</p>
    </div>
  );
}
```

### Using Language Context

```tsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { currentLanguage, setLanguage, isLoading, detectedLanguage } = useLanguage();

  return (
    <div>
      <p>Current Language: {currentLanguage}</p>
      <p>Detected Language: {detectedLanguage || 'Not detected'}</p>
      <button onClick={() => setLanguage('fr')}>Switch to French</button>
    </div>
  );
}
```

### Using Custom Hook

```tsx
import { useAppTranslation } from '../hooks/useAppTranslation';

function MyComponent() {
  const { t, currentLanguage, isLoading } = useAppTranslation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{t('messages.welcome')}</h1>
      <p>Language: {currentLanguage}</p>
    </div>
  );
}
```

### Add Components to Your Layout

```tsx
import LanguageSwitcher from './features/Components/LanguageSwitcher';
import LanguageDetectionBanner from './features/Components/LanguageDetectionBanner';

function Layout() {
  return (
    <div>
      <LanguageDetectionBanner />
      <header>
        <LanguageSwitcher />
      </header>
      {/* Rest of your layout */}
    </div>
  );
}
```

## API Endpoint

**GET** `https://dreamgroupsindia.com/dev/sterlingFraudSolutionBackend/api/language/detect`

**Response:**
```json
{
  "success": true,
  "detectedLanguage": "en",
  "userIp": "123.63.213.49",
  "geoData": {
    "language": "en",
    "country": "IN",
    "city": "",
    "timezone": "Asia/Kolkata"
  }
}
```

## Adding New Translations

1. **Add to translation files** (e.g., `src/locales/en.json`):
```json
{
  "newSection": {
    "key": "Translation text"
  }
}
```

2. **Use in components**:
```tsx
const { t } = useTranslation();
t('newSection.key')
```

## Supported Languages

- **en** - English
- **fr** - Français (French)
- **de** - Deutsch (German)
- **it** - Italiano (Italian)

To add a new language:
1. Create `src/locales/[code].json`
2. Add to resources in `src/i18n/config.ts`
3. Add to language options in `LanguageSwitcher.tsx`

## Files Structure

```
src/
├── api/
│   ├── config.tsx
│   └── languageService.ts          # Language detection & management
├── contexts/
│   └── LanguageContext.tsx         # Global language state
├── features/
│   └── Components/
│       ├── LanguageSwitcher.tsx    # Language selection dropdown
│       ├── LanguageSwitcher.css
│       ├── LanguageDetectionBanner.tsx # Info banner
│       └── LanguageDetectionBanner.css
├── hooks/
│   └── useAppTranslation.ts        # Custom translation hook
├── i18n/
│   └── config.ts                   # i18next configuration
├── locales/
│   ├── en.json                     # English translations
│   ├── fr.json                     # French translations
│   ├── de.json                     # German translations
│   └── it.json                     # Italian translations
├── App.tsx                         # Updated with language sync
└── main.tsx                        # Updated with providers
```

## Debugging

### Check Current Language:
```tsx
console.log(localStorage.getItem('selectedLanguage'));
```

### View Detected Information:
Open the LanguageContext.tsx and log the `detectionResult`

### Translation Key Not Found:
Check that the key exists in all language files and uses correct namespace

## Best Practices

1. **Organize translations by feature** - Group related keys together
2. **Use consistent naming** - Use dot notation (e.g., `nav.dashboard`)
3. **Keep translations clean** - One translation per key, no logic
4. **Add context to new keys** - Include comments for translators
5. **Test all languages** - Ensure all keys exist in all language files
6. **Use semantic HTML** - i18n respects accessibility best practices

## Troubleshooting

### Language not changing?
- Check browser console for errors
- Verify i18n is initialized in main.tsx
- Ensure LanguageProvider wraps the app

### Translations showing key instead of text?
- Check key path matches translation file structure
- Verify namespace is correct
- Ensure translation files are properly imported

### API detection failing?
- Check network tab for API errors
- Verify backend endpoint is accessible
- Component will fallback to browser language automatically
