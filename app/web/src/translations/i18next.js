import global_en from "./en/global.json";
import global_fr from "./fr/global.json";

import i18next from "i18next";
import { initReactI18next, I18nextProvider } from 'react-i18next';


export const languageResources = {
  en:{ global: global_en },
  fr:{ global: global_fr },
};

// Initialize i18next instance
i18next
  .use(initReactI18next) // Use the react-i18next plugin
  .init({
    resources: languageResources, // Assign language resources
    lng: "en", // Set default language
    fallbackLng: "en", // Fallback language in case the translation is not available
    interpolation: { escapeValue: false }, // Disable HTML escaping
    debug: true, // Enable debug mode for i18next
    nsSeparator: "::", // Separator used to define namespaces in translation keys
    keySeparator: ".", // Separator used to define nested keys in translation keys
    supportedLngs: ['en', 'fr'],
    react: {
      wait: true, 
    },
    // Error handling
    errorHandler: (error) => {
      console.error("i18next encountered an error:", error);
    },
  });
export default i18next;