import process from 'node:process'

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
    '@nuxtjs/supabase',
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
  supabase: {
    redirectOptions: {
      login: '/sign-in',
      callback: '/confirm',
      include: undefined,
      exclude: ['/sign-in', '/sign-up'],
      cookieRedirect: false,
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
})
