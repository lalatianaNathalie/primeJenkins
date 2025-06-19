import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: frTranslation },
    en: { translation: enTranslation }
  },
  lng: 'fr', // Définit le français comme langue par défaut
  fallbackLng: 'fr', // Utilise le français si la langue n'est pas définie
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
