# untitled

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Déploiement

`.github/workflows/deploy.yml` : à chaque push sur `master`, build Vite puis
`rsync --delete` de `dist/` vers `/opt/portfolio/dist` sur le VPS, suivi d'un
contrôle de santé. Trois secrets de dépôt : `VPS_SSH_KEY` (clé CI dédiée),
`VPS_HOST`, `VPS_KNOWN_HOSTS`.

Le serveur web n'est pas ici. Caddy est lancé par le `docker-compose.yml` du
dépôt **AppKanjiQuizz** (dossier `api/`), qui monte `/opt/portfolio/dist` en
lecture seule sur `/srv/portfolio` et sert ce dossier comme repli du bloc
`camille-lupo.fr` de son `Caddyfile` (`try_files {path} /index.html`, le
repli history-mode de vue-router). Le même bloc sert `/mentions-legales`
depuis `api/public/` et redirige en 301 les anciennes URL `/kanjiquizz*` vers
`kanjiquizz.camille-lupo.fr`.

`.env.production` fixe l'URL du site KanjiQuizz ; `.env.development` pointe
sur le serveur Vite local de WebKanjiQuizz (port 5173, le portfolio étant sur
5180).
