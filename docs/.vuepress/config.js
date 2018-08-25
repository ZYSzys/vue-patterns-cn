module.exports = {
  base: '/vue-patterns-cn/',
  title: 'Vue Patterns',
  description: '有用的Vue模式，技巧，提示和技巧以及有帮助的精选链接。',
  serviceWorker: true,
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    repo: 'ZYSzys/vue-patterns-cn',
    editLinks: true,
    locales: {
      '/': {
        lastUpdated: 'Last Updated',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Docs', link: '/patterns/' },
          {
            text: 'Translations',
            items: [{
                text: 'English',
                link: 'https://learn-vuejs.github.io/vue-patterns/',
              },
              {
                text: '繁體中文',
                link: 'https://github.com/yoyoys/vue-patterns-cht',
              },
            ],
          },
        ],
        sidebar: [
          ['/patterns/', 'Patterns'],
        ],
      },
    },
  },
}