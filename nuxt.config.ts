export default defineNuxtConfig({
  compatibilityDate: '2025-02-01',
  css: ['~/assets/css/site.css'],
  app: { head: { htmlAttrs: { lang: 'ja' }, meta: [{ name: 'theme-color', content: '#ffffff' }] } }
})
