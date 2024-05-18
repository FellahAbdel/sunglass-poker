import { useSettings } from "./SettingsContext";
import global_en from "../../translations/en/global.json";
import global_fr from "../../translations/fr/global.json";
import global_es from "../../translations/es/global.json";
import global_de from "../../translations/de/global.json";
import global_ch from "../../translations/ch/global.json";
import global_fa from "../../translations/fa/global.json";

// Dictionary of available translations mapped by language codes.
const translations = {
  en: global_en,
  fr: global_fr,
  es: global_es,
  de: global_de,
  ch: global_ch,
  fa: global_fa,
};

/**
 * Custom hook to provide translated strings based on the current application language.
 * Falls back to English if the translation in the selected language is not available.
 * 
 * @returns {Object} Object containing a single function `getTranslatedWord` to fetch a translated string.
 */
export function useTranslation() {
  const { language } = useSettings();

  /**
   * Retrieves a translated word or phrase based on the provided key path.
   * @param {string} keyPath - A dot-separated path representing the translation key in the JSON structure.
   * @returns {string} The translated string or the keyPath itself if no valid translation is found.
   */
  const getTranslatedWord = (keyPath) => {
    const keys = keyPath.split(".");
    
    /**
     * Attempts to find a translation for a specific language.
     * @param {string} lang - The language code for which to find the translation.
     * @returns {string|null} The translated string if found, or null if not found.
     */
    const findTranslation = (lang) => {
      let result = translations[lang];
      for (const key of keys) {
        result = result ? result[key] : null;
        if (!result) return null;
      }
      return result;
    };
    
    let translation = findTranslation(language);

    if (!translation) {
      translation = findTranslation('en');
    }

    return translation || keyPath;
  };

  return { getTranslatedWord };
}
