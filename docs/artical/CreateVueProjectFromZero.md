# 如何不借助脚手架从零搭建Vue项目？
脱离cli搭建项目的好处是可以更深刻的理解项目中每个文件的依赖关系以及webpack中每项配置的作用。
### 构建项目目录
```
- src                               //项目源码目录
	- css                           //样式表目录
	- js                            //JS文件目录
	- static                        //静态资源目录
	- components                    //组件目录
	- index.html                    //首页文件
	- main.js                       //项目入口文件
- dist                              //项目打包完成后目录
- App.vue                           //项目根组件
- webpack.config.js                 //webpack配置文件
- package.json                      //项目初始化后的配置信息
- package-lock.json                 //版本号记录文件
```
### [初始化项目](https://www.cnblogs.com/WD-NewDemo/p/11141384.html)
```
npm init -y
```
会在项目根目录生成package.json文件

### 配置webpack
安装webpack：
```
npm i webpack-cli -g
npm i webpack webpack-dev-server --save-dev
```
根目录创建webpack.config.js配置文件

-  引入path模块
```javascript
var path = require('path');
```
-  引入webpack模块
```javascript
var webpack = require('webpack');
```
-  配置入口出口文件
```javascript
entry: path.join(__dirname,'./src/main.js'),//配置入口文件，webpack会从main.js开始，把所有依赖的js都加载打包,入口文件的绝对路径 , __dirname表示当前文件所在的路径
output: {
    path: path.join(__dirname, './dist'), // 项目的打包文件路径
    filename: 'bundle.js' // 打包后的文件名
},
```
-  配置vue导入路径
```javascript
resolve:{
    alias:{//修改包查找规则，解决使用import引入时自动指向vue.runtime.common.js（严格版）的问题
        "vue$":"vue/dist/vue.js"
    }
},
```
-  配置vue相关插件和加载器
```javascript
npm i vue-loader vue-template-compiler --save-dev//安装加载器
```
```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //头部导入模块
```
```javascript
plugins:[//配置插件
        new VueLoaderPlugin(),
    ],
module:{
        rules:[//配置加载器
            {test: /\.vue$/,use: ['vue-loader']},
        ]
    },
```
-  配置自动打包功能
```
npm i webpack-dev-seaver --save-dev//安装插件
```
```javascript
//package.json
"script":{
    "dev":"webpack-dev-seaver"
}
```
-  配置html模板解析插件
```
npm i html-webpack-plugin --save-dev //安装插件
```
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');//头部导入模块
const htmlPlugin = new HtmlWebpackPlugin({
	template:'./src/index.html',
	filename:'index.html'//dist下生成的html文件名
});
```
```javascript
plugins:[//配置插件
         htmlPlugin,
],
```
完整webpack.config.js
```javascript
var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//打包生成html插件
const htmlPlugin = new HtmlWebpackPlugin({
	template:'./src/index.html',
	filename:'index.html'//dist下生成的html文件名
});
module.exports = {
    mode:'development',
    entry: path.join(__dirname,'./src/main.js'),//配置入口文件，webpack会从main.js开始，把所有依赖的js都加载打包,入口文件的绝对路径 , __dirname表示当前文件所在的路径
    output: {
        path: path.join(__dirname, './dist'), // 项目的打包文件路径
        filename: 'bundle.js' // 打包后的文件名
    },
    plugins:[//插件列表
        htmlPlugin,
        new VueLoaderPlugin(),
    ],
    module:{
        rules:[//配置加载器
            {test: /\.vue$/,use: ['vue-loader']},
        ]
    },
    resolve:{
		alias:{//修改包查找规则，解决使用import引入时自动指向vue.runtime.common.js（严格版）的问题
			"vue$":"vue/dist/vue.js"
		}
	},
}
```
### 开始编写代码
#### index.html
1. 创建基本模板
2. 指定被挂载的DOM元素 <div id="app"></div>
3. 引入被打包后的入口js文件
```html
<!-- 完整代码： -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'" />
    <title>SearchMaster</title>
    <!-- <link rel="stylesheet" href="./css/index.less"> -->
</head>
<body>
    <div id="QuickSearch-chrome"></div>
</body>
</html>
```
#### main.js
1. 引入Vue
2. 引入根组件App.vue
3. 创建vm实例
4. 指定挂载目标 el:'app'
5. 把根组件挂载到页面 render:c =>c(app)
```javascript
// 完整代码：
import Vue from 'vue'
import app from '../App.vue'
var vm = new Vue({
    el:'#QuickSearch-chrome',
    render:c =>c(app),
})
```
#### App.vue
```html
<!-- 完整代码： -->
<template>
</template>
<script>
    export default {
    }
</script>
<style>
</style>
```

至此，不借助脚手架从零搭建Vue项目完成，使用`npm run dev`运行项目，使用`npm run build`打包项目。