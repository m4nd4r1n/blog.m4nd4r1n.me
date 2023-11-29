// @ts-check
/** @type {import('./types').BlogConfig} */
const BLOG = {
  title: 'Devlog.',
  author: 'm4nd4r1n',
  email: 'kdh@m4nd4r1n.me',
  link: 'https://blog.m4nd4r1n.me',
  description: "m4nd4r1n's Devlog.",
  lang: 'ko-KR', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  timezone: 'Asia/Seoul', // Your Notion posts' date will be interpreted as this timezone. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for all options.
  appearance: 'auto', // ['light', 'dark', 'auto'],
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#18181B', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2022, // If leave this empty, current year will be used.
  postsPerPage: 6,
  sortByDate: true,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  socialLink: 'https://github.com/m4nd4r1n',
  seo: {
    keywords: ['m4nd4r1n', 'Blog', 'Notion'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  analytics: {
    provider: 'ga', // Currently we support Google Analytics, please fill with 'ga', leave it empty to disable it.
    gaConfig: {
      measurementId: 'G-MNDTLSB5DF' // e.g: G-XXXXXXXXXX
    }
  },
  comment: {
    // support provider: utterances, giscus
    provider: 'giscus', // leave it empty if you don't need any comment plugin
    utterancesConfig: {
      repo: ''
    },
    giscusConfig: {
      repo: 'm4nd4r1n/blog-comment',
      repoId: 'R_kgDOKHzBrw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOKHzBr84CYpHD',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'ko',
      loading: 'lazy'
    }
  },
  isProd: process.env.NODE_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}

module.exports = BLOG
