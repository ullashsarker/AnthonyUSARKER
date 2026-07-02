import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'copy-root-images',
        closeBundle() {
          const rootDir = process.cwd();
          const distDir = path.resolve(rootDir, 'dist');
          if (!fs.existsSync(distDir)) return;
          const files = fs.readdirSync(rootDir);
          files.forEach(file => {
            if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
              try {
                fs.copyFileSync(path.resolve(rootDir, file), path.resolve(distDir, file));
                console.log(`Copied root asset ${file} to dist/`);
              } catch (err) {
                console.error(`Failed to copy ${file}:`, err);
              }
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
  };
});
