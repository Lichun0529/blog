import http from './http'
import md5 from './md5'
import BaiduTranslate from './BaiduTranslate'
export default{
    getAwApi(params,engineID){//联想词
        // if(engineID==1)return http.axios.jsonp('http://google.com/complete/search?output=toolbar&q=%'+params,'callback')//谷歌
        if(engineID==11){//淘宝
            return http.axios.jsonp('https://suggest.taobao.com/sug?area=etao&code=utf-8&q=' + params,'callback')
        }else if(engineID==7){//B站
            return http.axios.get('https://s.search.bilibili.com/main/suggest?func=suggest&term='+params,'func')
        }else if(engineID==12){//百度翻译
            var appid = '20200428000432638';
            var key = 'xSt5mR13aPGPztBWlDQ2';
            var salt = (new Date).getTime();
            var query = params;
            // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
            var from = 'en';
            var to = 'zh';
            var str1 = appid + query + salt +key;
            var sign = md5.MD5(str1);
            var data = {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            }
            var url = `http://fanyi-api.baidu.com/api/trans/vip/translate?q=${data.q}&from=${data.from}&to=${data.to}&appid=${data.appid}&salt=${data.salt}&sign=${data.sign}`
            var url2 = "https://fanyi.baidu.com/v2transapi?from=en&to=zh&q="
            return http.axios.jsonp(url2+params,'cb')
        }else{
            return http.axios.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + params,'cb')//百度
        }
	},
}
