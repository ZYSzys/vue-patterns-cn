module.exports = {
  base: '/vue-patterns-cn/',
  title: 'Vue Patterns CN',
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
          { text: '首页', link: '/' },
          { text: '文档', link: '/patterns/' },
          {
            text: '翻译',
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
          ['/patterns/', '模式'],
          ['/useful-links/', '链接'],
          ['/sponsors/', '赞助商']
        ],
      },
    },
  },
}