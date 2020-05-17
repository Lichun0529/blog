# Chrome扩展如何跨域？
错误1：
```
index.html:1 Access to XMLHttpRequest at 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=1' from origin 'chrome-extension://cgdmfadaikmdlhjdocfclialdjpeebdn' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
错误2：
```
Refused to load the script 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=1&cb=jsonCallBack' because it violates the following Content Security Policy directive: "script-src 'self' 'unsafe-eval'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.
```
开发扩展过程中需要用到一个百度的接口，本地调试阶段使用get请求出现跨域问题，改用JSONP请求后问题解决。把扩展装入Chrome中后运行发现出现错误2，查阅资料后发现原因在于Chrome为防止XSS攻击应用了CSP,导致JSONP无法使用。换回get方法后发送请求出现错误1。
 
### 解决方法
对于网站来说，浏览器出于安全考虑是不允许跨域，但这个规则如果同样限制Chrome扩展应用，就会使其能力大打折扣，所以Google允许Chrome扩展应用不必受限于跨域限制。但出于安全考虑，需要在Manifest的permissions属性中声明需要跨域的权限。
```json
"permissions": [
        "*://*.wikipedia.org/*",//仅wiki域名
        "https://*/",//所有hppts协议下域名
        "http://*/"//所有hppt协议下域名
    ],
```
> CSP（Content Security Policy），内容安全策略。CSP 通常是在 header 或者 HTML 的 meta 标签中定义的，它声明了一系列可以被当前网页合法引用的资源，如果不在 CSP 声明的合法范围内，浏览器会拒绝引用这些资源。