import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // Port fixe : WebKanjiQuizz garde le 5173 par défaut de Vite, et
  // `.env.development` pointe dessus. Sans ça, le premier projet lancé prendrait
  // 5173 et le lien local vers KanjiQuizz tomberait sur le portfolio lui-même.
  server: {
    port: 5180,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
