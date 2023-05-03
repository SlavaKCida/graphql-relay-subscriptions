/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

import relay from 'vite-plugin-relay'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore used for graphql require
import requireTransform from 'vite-plugin-require-transform'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/web',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    relay,
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
    requireTransform({}),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
