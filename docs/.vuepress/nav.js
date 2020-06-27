//顶部导航栏
module.exports = [
    {text: 'About Me',link: '/aboutme/'},
    {
        text: 'Projects',
        items: [//顶部二级标题
            {text: 'QuickSearch', link: '/project/quicksearch-chrome/'},
            {text: '个人Blog', link: '/project/blog/'},
            {text: '民无忧', link: '/project/minwuyou/'},
			{text: '极简新闻', link: '/project/news/'},
            {text: '头条新闻', link: '/project/wangyinews/'},
        ]
    },
    {
        text: 'Notes',//顶部一级标题，可无限嵌套
		items: [//顶部二级标题
            // {text: 'Web基础', link: '/notes/WebBasic/JSbasic.md'},
            {text: 'JavaScript', link: '/notes/WebBasic/JSbasic.md'},
            {text: 'Vue', link: '/notes/WebBasic/Vuebasic.md'},
        ]
    },
    {
        text: 'Articales',
		items: [
            {text: '关于JavaScript中的面向对象思想', link: '/artical/OOPinJavaScript.md'},
            {text: '如何不借助脚手架从零搭建Vue项目？', link: '/artical/CreateVueProjectFromZero.md'},
            {text: '如何使用Vue.js开发Chrome插件？', link: '/artical/CreateChromeExtensionsWithVue.md'},
            {text: 'Chrome扩展可以对浏览器做哪些事情？', link: '/artical/Chrome-Extensions-API.md'},
            {text: 'Learn How To Learn学习笔记(1)——拖延症的成因及解决方法', link: '/artical/LearnHowToLearn-1.md'},
            {text: 'Chrome扩展如何跨域？', link: '/artical/ChromeExtensionsCROS.md'},
            {text: '如何一键打包+推送Vuepress博客？', link: '/artical/Vuepress-AutoPush.md'},
            {text: '如何在axios中使用JSONP？', link: '/artical/UseJsonpInAxios.md'},
        ]
    },
    {
        text: 'Tools',
        items: [
			{
                text: '在线编辑',
				items: [//顶部三级标题
					{text: '图片压缩', link: 'https://tinypng.com/'}
				]
            },
			{
                text: '在线服务',
				items: [
					{text: '阿里云', link: 'https://www.aliyun.com/'},
					{text: '腾讯云', link: 'https://cloud.tencent.com/'}
				]
            },
			{
                text: '博客指南',
				items: [
					{text: '掘金', link: 'https://juejin.im/'},
					{text: 'CSDN', link: 'https://blog.csdn.net/'}
				]
            }
        ]
    }
]
// nav配置注意点

// nav可以支持本地目录和链接

// nav由text、link、items组成

// text：栏目名（项名）
// link：链接，可以指向本地目录和http地址
// items：可以包含多个text和link，可以继续反复套用组成复杂的菜单
// nav配置时需要与本地的目录对应

// 如上述我配置了懵逼指南和面试宝典栏目
// 懵逼指南：对应的事/guide/，则我需要再docs目录下创建一个guide目录
// 面试宝典：对应的是/baodian/，则我需要在docs目录下创建一个baodian目录
// baodian子目录：上述配置中baodian下有2个子目录，则我需要在下面新建2个子目录与之对应