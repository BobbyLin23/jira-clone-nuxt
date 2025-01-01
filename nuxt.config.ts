// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  components: [
    '~/components/ui',
    '~/components',
    {
      path: '~/components/auth',
      pathPrefix: false,
    },
  ],
})
