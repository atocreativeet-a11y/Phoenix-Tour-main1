import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
      },
    },
    fr: {
      translation: {
        welcome: "Bienvenue",
      },
    },
    es: {
      translation: {
        welcome: "Hola",
      },
    },
    pt: {
      translation: {
        welcome: "Olá",
      },
    },
    de: {
      translation: {
        welcome: "Willkommen",
      },
    },
  },

  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;