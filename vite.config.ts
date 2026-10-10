import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'particles',
              test: /node_modules[\\/](@tsparticles|tsparticles)[\\/]/,
              priority: 3
            },
            {
              name: 'animations',
              test: /node_modules[\\/]motion[\\/]/,
              priority: 2
            },
            {
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|react-router-dom|scheduler)[\\/]/,
              priority: 1
            }
          ]
        }
      }
    }
  }
})