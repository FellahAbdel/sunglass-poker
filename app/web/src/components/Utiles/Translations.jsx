// Dans Translations.jsx
import { useSettings } from "./SettingsContext";
import global_en from "../../translations/en/global.json";
import global_fr from "../../translations/fr/global.json";
import global_es from "../../translations/es/global.json";
import global_de from "../../translations/de/global.json";
import global_ch from "../../translations/ch/global.json";
import global_fa from "../../translations/fa/global.json";

const translations = {
  en: global_en,
  fr: global_fr,
  es: global_es,
  de: global_de,
  ch: global_ch,
  fa: global_fa,
};

export function useTranslation() {
  const { language } = useSettings();

  const getTranslatedWord = (keyPath) => {
    const keys = keyPath.split(".");
    
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
