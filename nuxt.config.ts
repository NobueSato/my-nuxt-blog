// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    baseURL: '/', // Ensure this is set correctly
  },
  runtimeConfig: {
    strapi: {
      url: 'http://localhost:1337'
    },
    public: {
      strapi: {
        url: 'http://localhost:1337'
      }
    }
  },

  modules: ['@nuxtjs/strapi',  '@nuxtjs/tailwindcss'],
  strapi: {
      url: process.env.STRAPI_URL || 'http://localhost:1337',
      prefix: '/api',
      admin: '/admin',
      version: 'v5',
      cookie: {},
      cookieName: 'strapi_jwt'
    },
    // Add global CSS files here
  css: [
    '@/src/assets/main.css'  // Adjusted path to your CSS file
  ]
})