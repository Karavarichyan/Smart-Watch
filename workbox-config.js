// export default {
//     globDirectory: 'build/',
//     globPatterns:[
//         '**/*/{css.woff2,png,svg,jpg,jpeg,js}'
//     ],
//     swDest: 'build/sw.js'
// }
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Your App Name',
        short_name: 'App Name',
        description: 'Your app description',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globDirectory: 'build/',
        globPatterns: ['**/*.{css,woff2,png,svg,jpg,jpeg,js}'],
        swDest: 'build/sw.js',
      },
    }),
  ],
});
