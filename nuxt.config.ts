// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  eslint: { config: { standalone: false } },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxt/eslint']
})