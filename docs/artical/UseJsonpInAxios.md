## 如何在axios中使用JSONP
### 在axios拦截器内封装一个JSONP请求
http.js  
```javascript
axios.jsonp = (url,callback) => {//调用时传入url和回调函数名
        if(!url){
            console.error('Axios.JSONP 至少需要一个url参数!')
            return;
        }
        return new Promise((resolve,reject) => {
            window.jsonCallBack =(result) => {
              resolve(result)
            }
            var JSONP=document.createElement("script");
            JSONP.type="text/javascript";
            JSONP.src=`${url}&${callback}=jsonCallBack`;
            document.getElementsByTagName("head")[0].appendChild(JSONP);
            setTimeout(() => {
                document.getElementsByTagName("head")[0].removeChild(JSONP)
            },500)
        })
    }
export default {axios}//导出axios
```
### 使用  
```javascript
http.axios.jsonp('https://suggest.taobao.com/sug?area=etao&code=utf-8&q=' + params,'callback')//以淘宝为例，不同api回调函数名不同
```
<Vssue style="margin-top:100px"/>