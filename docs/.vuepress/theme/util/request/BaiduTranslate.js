import './md5'
import http from './http'
export function BaiduTranslate(params){
    var appid = '20200428000432638';
    var key = 'xSt5mR13aPGPztBWlDQ2';
    var salt = (new Date).getTime();
    var query = params;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en';
    var to = 'zh';
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);
    var data = {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
    }
    var url = `https://fanyi-api.baidu.com/api/trans/vip/translate?${data.q+data.from+data.to+data.appid+data.salt+data.sign}`
    return http.axios.get(url)
}
// var appid = '20200428000432638';
// var key = 'xSt5mR13aPGPztBWlDQ2';
// var salt = (new Date).getTime();
// var query = 'apple';
// // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
// var from = 'en';
// var to = 'zh';
// var str1 = appid + query + salt +key;
// var sign = MD5(str1);
// $.ajax({
//     url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
//     type: 'get',
//     dataType: 'jsonp',
//     data: {
//         q: query,
//         appid: appid,
//         salt: salt,
//         from: from,
//         to: to,
//         sign: sign
//     },
//     success: function (data) {
//         console.log(data);
//     } 
// });

