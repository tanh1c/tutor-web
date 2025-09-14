import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Console logging for debugging
console.log('Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);

// Determine base path
const getBasePath = () => {
  if (process.env.VERCEL) {
    console.log('Using Vercel base path: /');
    return '/';
  } else if (process.env.NODE_ENV === 'production') {
    console.log('Using GitHub Pages base path: /Tutor/');
    return '/Tutor/';
  } else {
    console.log('Using development base path: /');
    return '/';
  }
};

const basePath = getBasePath();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable for debugging
    minify: 'esbuild', // Use esbuild instead of terser
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  },
  define: {
    __DEPLOYMENT_ENV__: JSON.stringify(process.env.VERCEL ? 'vercel' : 'github'),
    __BASE_PATH__: JSON.stringify(basePath)
  }
})
