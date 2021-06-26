import Vue from "vue";
import VueI18n from "vue-i18n";
import axios from "axios";
import messages from "@/locales/lt";

const DEFAULT_LANGUAGE_LANG = "lt";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || DEFAULT_LANGUAGE_LANG,
  fallbackLocale:
    process.env.VUE_APP_I18N_FALLBACK_LOCALE || DEFAULT_LANGUAGE_LANG,
  messages,
});

const loadedLanguages = [DEFAULT_LANGUAGE_LANG];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html").setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  return import(`@/locales/${lang}.js`).then((messages) => {
    i18n.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}

export default i18n;
