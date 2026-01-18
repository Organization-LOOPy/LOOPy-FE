import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

const BUILD_VERSION = Date.now();
const withVersion = (name: string) => `${name}-v${BUILD_VERSION}`;

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
          { src: "/icon.png", sizes: "64x64", type: "image/png", purpose: "any maskable" },
          { src: "/icon2.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "/icon3.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#6970F3",
        background_color: "#555BC5",
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: [
          'index.html',
          'manifest.webmanifest',
          '**/*.{js,css,ico,png,svg,jpg,jpeg,webp}',
        ],
        runtimeCaching: [
          {
            // API 요청은 항상 네트워크 (캐시 안 씀)
            urlPattern: /^https:\/\/api\..*$/i,
            handler: 'NetworkOnly',
          },
          {
            // 외부 이미지 캐시 (버전 포함)
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|webp|gif|svg)$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: withVersion('external-images'),
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/www\.google\.com\/recaptcha\/.*$/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/www\.gstatic\.com\/recaptcha\/.*$/i,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
});
