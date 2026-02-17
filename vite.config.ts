import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  build: {
    // Optimizaciones de rendimiento
    rollupOptions: {
      output: {
        // Code splitting manual para mejor caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          d3: ['d3-geo']
        }
      }
    },
    // Optimizar el tamaño del bundle (esbuild por defecto; compatible con main app)
    minify: 'esbuild',
    // Aumentar el límite de advertencia de chunk size
    chunkSizeWarningLimit: 1000
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'three', '@react-three/fiber', '@react-three/drei']
  }
})
