import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/index.jsx'],
            refresh: true,
        }),
        react(), // Handles JSX
    ],
    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        hmr: {
            host: '127.0.0.1'
        },
    },
    resolve: {
        alias: {
            '@': '/resources/js', // Optional: Set up alias for cleaner imports
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    css: {
        postcss: {
          plugins: [tailwindcss()]
        }
      }
});