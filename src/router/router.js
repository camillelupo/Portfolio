// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue'
import Portfolio from "@/components/Portfolio.vue";
import Contact from "@/components/Contact.vue";
import { LOCALES, localePrefix } from '@/i18n/routing.js';

// Une entrée par page, indépendamment de la langue. `path` est le chemin
// canonique en français ; les autres langues en dérivent par préfixe.
export const PAGES = [
    { name: 'home',       path: '/',           component: Home },
    { name: 'about',      path: '/about',      component: About },
    { name: 'portfolio',  path: '/portfolio',  component: Portfolio },
    { name: 'contact',    path: '/contact',    component: Contact },
];

// Chaque langue a ses propres URL, donc ses propres routes : le français à la
// racine, l'anglais sous /en, le japonais sous /ja. On génère les enregistrements
// plutôt que d'utiliser un paramètre optionnel `/:locale(en|ja)?` — une route
// nommée par langue rend le matching explicite et donne à chaque page une
// `meta.locale` que le garde de navigation peut lire sans parser l'URL.
const routes = [];

for (const locale of LOCALES) {
    const prefix = localePrefix(locale);
    for (const page of PAGES) {
        routes.push({
            // `/` + '' donnerait une chaîne vide, et `/en` + `/` un double slash.
            path: (page.path === '/' ? prefix : `${prefix}${page.path}`) || '/',
            name: `${page.name}.${locale}`,
            component: page.component,
            meta: { locale, page: page.name, basePath: page.path },
        });
    }
}

// Les deux routes ci-dessous étaient déclarées avec une majuscule. vue-router
// n'étant pas sensible à la casse par défaut, les deux graphies répondaient
// et donnaient deux URL pour un même contenu. On garde une redirection pour
// ne pas casser un lien déjà partagé ; le 301 réel doit être posé côté
// serveur (Caddy), une redirection côté client n'en est pas un.
routes.push({ path: '/Portfolio', redirect: '/portfolio' });
routes.push({ path: '/Contact', redirect: '/contact' });

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
