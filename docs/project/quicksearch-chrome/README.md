# QuickSearch v1.01
### 项目简介

<br>

基于Vue.js开发的chrome快速搜索功能扩展，内置Google、百度、地图、淘宝、B站、知乎、微信等多个搜索引擎。多种操作方式，自动控制焦点，全程无需鼠标，纯键盘控制切换引擎、搜索、选择联想内容并根据搜索引擎不同给出不同联想内容。

### 项目链接

<br>

[https://github.com/Lichun0529/QuickSearch-chrome](https://github.com/Lichun0529/QuickSearch-chrome)

### 技术栈

<br>

+ Vue.js
+ webpack
+ Jquery
+ Bootstrap

### 项目职责

<br>

开源项目，负责全部功能的实现和页面的制作。

### 技术描述

<br>

Chrome扩展开发与Web开发类似都是使用HTML+JS+CSS完成，Chrome扩展的HTML文件内JS代码必须由外部引入，不可直接写在/<script//>内，因此使用Vue.js可以实现在一个文件内同时写HTML+JS+CSS，同时解决了频繁操作DOM的问题，提升了开发效率。

### 项目难点

<br>

+ 项目所需的纯键盘操作方式与原生键事件和焦点选择之间的冲突问题
+ 用户输入关键字获取搜索联想内容时由于请求发送频率过快导致爬取的接口出现错误的问题
+ 作为web应用在本地调试和作为浏览器扩展在Chrome运行时请求接口方法、返回值格式不同的问题
+ 浏览器为防止XSS攻击导致JSONP请求被CSP拦截的问题

