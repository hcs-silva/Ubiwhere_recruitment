import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

export interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}