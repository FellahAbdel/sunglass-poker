// Dans Translations.jsx
import { useContext } from "react";
import { useSettings } from "./SettingsContext"; // Utilisez useSettings ici
import global_en from "../../translations/en/global.json";
import global_fr from "../../translations/fr/global.json";
import global_es from "../../translations/es/global.json";
import global_de from "../../translations/de/global.json";

const translations = {
  en: global_en,
  fr: global_fr,
  es: global_es,
  de: global_de,
};

export function useTranslation() {
  const { language } = useSettings();

  const getTranslatedWord = (keyPath) => {
    const keys = keyPath.split(".");
    let result = translations[language];

    for (const key of keys) {
      result = result ? result[key] : null;
      if (!result) break;
    }

    return result || keyPath;
  };

  return { getTranslatedWord };
}
