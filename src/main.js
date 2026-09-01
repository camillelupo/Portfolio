import {createApp} from 'vue'
import App from './App.vue'
// Polices auto-hébergées : aucune requête vers Google Fonts, donc rien à
// déclarer côté RGPD et une graisse de moins à charger en cascade. On ne prend
// que le sous-ensemble latin et les quatre graisses réellement employées —
// 400 pour le corps, 500 pour les libellés, 600 pour les titres, 700 en appui.
import '@fontsource/schibsted-grotesk/latin-400.css';
import '@fontsource/schibsted-grotesk/latin-500.css';
import '@fontsource/schibsted-grotesk/latin-600.css';
import '@fontsource/schibsted-grotesk/latin-700.css';
import '@fontsource/roboto-mono/latin-400.css';
import '@fontsource/roboto-mono/latin-700.css';
import '@/assets/tokens.css';
import '@/assets/portfolio.css';
import router from '@/router/router.js';
import {createI18n} from 'vue-i18n'
import {DEFAULT_LOCALE, LANGUAGE_TAG, localizedPath} from '@/i18n/routing.js'
import {initTheme} from '@/composables/useTheme.js'

const imports = {
    en: import.meta.glob(`@/locales/en/*.json`, {
        eager: true,
        import: "default",
    }),
    fr: import.meta.glob(`@/locales/fr/*.json`, {
        eager: true,
        import: "default",
    }),
    jp: import.meta.glob(`@/locales/jp/*.json`, {
        eager: true,
        import: "default",
    }),
};

// The keys of the 'imports' object represent the supported languages in the project.
const locales = Object.keys(imports);

// Function to retrieve all messages
const getLocaleMessages = () =>
    // Using the reduce function to gather messages for each language
    locales.reduce(
        // The first parameter 'messages' is the main object where we combine messages for each language
        (messages, locale) => ({
            // Copy the messages from the previous language using the spread operator
            ...messages,
            // Combine messages for the current language
            [locale]: Object.values(imports[locale]).reduce(
                // The first parameter 'message' is a temporary object to combine messages for the current language
                (message, current) => ({ ...message, ...current }),
                {}
            ),
        }),
        // Starting with an empty object
        {}
    );

const i18n = createI18n({
    locale: 'fr', // marché visé : France
    fallbackLocale: 'fr', // set fallback locale
    messages: getLocaleMessages() || [], // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})
// Le thème est posé sur <html> avant la création de l'application : l'attribut
// est donc en place au premier rendu, sans clignotement clair -> sombre.
initTheme();

const app = createApp(App);

// --- Langue et URL ---------------------------------------------------------
//
// Chaque langue a ses propres URL (`/about`, `/en/about`, `/ja/about`). L'URL
// est donc la source de vérité : c'est elle qui fixe la langue, et non plus le
// <select>. Le garde ci-dessous applique la langue de la route à vue-i18n et à
// `<html lang>` avant chaque navigation — y compris au premier chargement, qui
// est lui aussi une navigation.
//
// `<html lang>` n'est écrit qu'ici : un lecteur d'écran comme un moteur de
// recherche s'y fient, et deux composants qui l'écriraient chacun de leur côté
// finiraient par se contredire.
router.beforeEach((to) => {
    const locale = (to.meta && to.meta.locale) || DEFAULT_LOCALE;
    if (i18n.global.locale !== locale) {
        i18n.global.locale = locale;
    }
    document.documentElement.lang = LANGUAGE_TAG[locale] || LANGUAGE_TAG[DEFAULT_LOCALE];
});

// `$lp('/about')` — « localized path ». Rend un `router-link` indépendant de la
// langue : il pointe vers `/about`, `/en/about` ou `/ja/about` selon la langue
// courante. Exposé en propriété globale parce que les templates concernés sont
// répartis entre `<script setup>` et l'Options API, et qu'un import par
// composant n'apporterait rien de plus. La lecture de `i18n.global.locale`
// passe par un getter sur une ref : le rendu se re-déclenche au changement.
app.config.globalProperties.$lp = (basePath) => localizedPath(basePath, i18n.global.locale);

// `$localeUrl('en')` — l'URL de la PAGE COURANTE dans une autre langue. C'est
// ce que consomme le sélecteur de langue du rail, qui est une liste de liens
// et non un <select> : changer de langue est une navigation, pas une
// affectation. `router.currentRoute` est une ref, donc les liens se
// réévaluent d'eux-mêmes à chaque navigation.
app.config.globalProperties.$localeUrl = (locale) => {
    const current = router.currentRoute.value;
    const basePath = (current.meta && current.meta.basePath) || '/';
    return localizedPath(basePath, locale);
};

app.use(i18n)
app.use(router);
app.mount('#app');