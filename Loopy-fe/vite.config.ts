import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [
    react(), 
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "LOOPy",
        name: "LOOPy | 고객의 루틴에 나의 커피를 더하다",
        icons: [
          {
            src: "/icon.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/icon2.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icon3.png",
            type: "image/png",
            sizes: "512x512",
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#6970F3",        
        background_color: "#6970F3"
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        
        globPatterns: [
          'index.html',
          'manifest.webmanifest',
          '**/*.{js,css,ico,png,svg,jpg,jpeg,webp}'
        ],
        runtimeCaching: [
          {
            // API 요청은 항상 네트워크
            urlPattern: /^https:\/\/api\..*$/i,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'loopy-pwa-cache-v1',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            // 외부 이미지 요청은 캐시
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|webp|gif|svg)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'external-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      }
    }),
  ],
});
