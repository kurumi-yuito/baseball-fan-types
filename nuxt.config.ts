export default defineNuxtConfig({
  compatibilityDate: '2025-02-01',

  runtimeConfig: {
    public: {
      emailjsPublicKey: '1XKYwuVEAjc2GvDhQ',
      emailjsServiceId: 'service_jdmtit4',
      emailjsTemplateId: 'template_afetvjq'
    }
  },

  css: ['~/assets/css/site.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },

      title: '野球民タイプ診断',

      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        },
        {
          name: 'description',
          content:
            '23の質問から、あなたの野球観戦スタイルを16タイプで診断。野球民としての個性を見つけよう。'
        },

        // OGP
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: '野球民タイプ診断'
        },
        {
          property: 'og:title',
          content: '野球民タイプ診断'
        },
        {
          property: 'og:description',
          content:
            '23の質問でわかる、あなたの野球観戦スタイル。16タイプから診断！'
        },
        {
          property: 'og:url',
          content: 'https://baseball-fan-types.dom9th-works.com/'
        },
        {
          property: 'og:image',
          content:
            'https://baseball-fan-types.dom9th-works.com/ogp.png'
        },
        {
          property: 'og:image:width',
          content: '1200'
        },
        {
          property: 'og:image:height',
          content: '630'
        },
        {
          property: 'og:image:type',
          content: 'image/png'
        },
        {
          property: 'og:image:alt',
          content: '野球民タイプ診断'
        },
        {
          property: 'og:locale',
          content: 'ja_JP'
        },

        // X (Twitter) カード
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: '野球民タイプ診断'
        },
        {
          name: 'twitter:description',
          content:
            '23の質問でわかる、あなたの野球観戦スタイル。16タイプから診断！'
        },
        {
          name: 'twitter:image',
          content:
            'https://baseball-fan-types.dom9th-works.com/ogp.png'
        },
        {
          name: 'twitter:image:alt',
          content: '野球民タイプ診断'
        }
      ],

      link: [
        // ファビコン
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        },
        {
          rel: 'apple-touch-icon',
          href: '/favicon.png'
        }
      ],

      // Google Analytics 4
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-NCZ0108874',
          async: true
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-NCZ0108874');`
        }
      ]
    }
  }
})
