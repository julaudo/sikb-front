import Vue from 'vue';
import VueI18n, {LocaleMessages} from 'vue-i18n';
import {loadMessagesFiles} from 'resources';

function loadLocaleMessages(): LocaleMessages {
  const locales = loadMessagesFiles();
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

Vue.use(VueI18n);

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'fr',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'fr',
  messages: loadLocaleMessages(),
});
