import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { build, defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
})

optimizeDeps: {
  exclude: ['heavy-lib'] 

}
build: {sourcemap:false}
