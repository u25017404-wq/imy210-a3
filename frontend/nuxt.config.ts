export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      strapiBase: 'http://localhost:1337'
    }
  },
  compatibilityDate: '2025-01-01'
})