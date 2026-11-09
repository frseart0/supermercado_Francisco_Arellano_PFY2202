import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = !repo || repo.endsWith('.github.io') ? '/' : `/${repo}/`

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
