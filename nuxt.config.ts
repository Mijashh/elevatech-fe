// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  eslint: { config: { standalone: false } },
  colorMode: {
    preference: 'light',
  },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  runtimeConfig: {
    public: {
      api: {
        baseURL: '',
      },
      baseURL: '',
    },
  },
})