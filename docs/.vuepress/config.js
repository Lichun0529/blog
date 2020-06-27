module.exports = {
    title: 'Li',
    plugins:require("./pluginsConfig.js"),
    description: 'My note Book.',
    theme: 'reco',//thindark    
    dest: './dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: './favicon.png'}],//相当于html文档中的head，可以引入css js等
    ],
    base:"/blog/",
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // type: 'blog',
        nav: require("./nav.js"),//导入顶部导航栏
        sidebar: require("./sidebar.js"),//导入侧边栏
        // sidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！',
        
    }
}