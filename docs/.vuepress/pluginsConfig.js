module.exports = {
    '@vuepress/medium-zoom': {
        selector: 'img.zoom',
        options: {
          margin: 16
        }
      },
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github',
      owner: 'Lichun0529',
      repo: 'blog',
      clientId: 'd8435a3b30310d2c561c',
      clientSecret: '3629b0d2a0a02ce0c97c11a745c757d215a7d42d',
      autoCreateIssue: true,//自动创建评论框
    }
}