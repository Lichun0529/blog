<template>
    <div>
        <a-input-search 
            size="large" 
            style="width: 100%;z-index: 1;" 
            v-model="searchContent"
            @search="submit"
            @change="inputting"
            @keyup="searchKeyup"
            id="v-step-1"
            />
        <div class="list-box" id="list" >
            <ul>
                <li v-for="(item,index) in data" :key="index" class="list" :class="{checked:index == selectIndex}" @click="clickItem(index)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>        
<script>
import api from '@theme/util/request/api'
import http from '@theme/util/request/http'
export default{
    name:'',
    props:['tabId'],
    data(){
        return{
            Show:true,
            searchContent:'',
            data:[],
            selectIndex:-1
        }
    },
    mounted(){
        document.body.onclick=function(e){
            if(e.target.id != "list"){
               this.Show = !this.Show
            }
        }
    },
    methods:{
        clickItem(e){
            this.submit(this.data[e])
        },
        inputting(){//打字输入时把selectIndex回归初始值
            if(this.searchContent!=''){
                this.selectIndex = -1
            }
        },
        getAwApi(){//获取联想内容
            var that = this 
            api.getAwApi(this.searchContent,this.tabId).then(res=>{
                if(this.tabId==11){//淘宝
                    this.data = []
                    for (let item of res.result) {
                        this.data.push(item[0])
                    }
                }else if(this.tabId==7){//B站
                    this.data = []
                    for (let item in res.data) {
                        this.data.push(res.data[item].value)
                    }
                }else if(this.tabId==12){//百度翻译
                    console.log(res);
                }else{
                    this.data = res.s
                }
            }).catch(res => {
                console.log(res)
            })
        },
        searchKeyup(e){
            if(this.searchContent == ''|| this.data.length==0)return false;
            if (e.keyCode === 38) {//up
                if(this.selectIndex == -1 || this.selectIndex < 1){
                    this.selectIndex = this.data.length
                }
                this.selectIndex--
                this.searchContent = this.data[this.selectIndex]
            }
            if(e.keyCode === 40){//down
                this.selectIndex++
                if(this.selectIndex==this.data.length){
                    this.selectIndex = 0
                }
               this.searchContent = this.data[this.selectIndex]
            }
        },
        submit(e){
            switch (this.tabId) {
                case 1:
                window.open(`https://www.google.com/search?q=${e?e:this.searchContent}&oq=${e?e:this.searchContent}&aqs=chrome..69i57j35i39j0l6.3735j0j8&sourceid=chrome&ie=UTF-8`)
                break;
                case 2:
                window.open(`https://www.baidu.com/s?wd=${e?e:this.searchContent}`)
                break;
                case 11:
                window.open(`https://s.taobao.com/search?q=${e?e:this.searchContent}`)
                break;
                case 7:
                window.open(`https://search.bilibili.com/all?keyword=${e?e:this.searchContent}`)
                break;
                case 6:
                window.open(`https://www.youtube.com/results?search_query=${e?e:this.searchContent}`)
                break;
                case 3:
                window.open(`https://stackoverflow.com/search?q=${e?e:this.searchContent}`)
                break;
                case 10:
                window.open(`https://github.com/search?q=${e?e:this.searchContent}`)
                break;
                case 8:
                window.open(`https://segmentfault.com/search?q=${e?e:this.searchContent}`)
                break;
                case 9:
                window.open(`https://developer.mozilla.org/zh-CN/search?q=${e?e:this.searchContent}`)
                break;
                case 10:
                window.open(`https://weixin.sogou.com/weixin?type=2&query=${e?e:this.searchContent}&ie=utf8&s_from=input&_sug_=n&_sug_type_=`)
                break;
                case 5:
                window.open(`https://www.zhihu.com/search?type=content&q=${e?e:this.searchContent}`)    
                break;
                case 12:
                window.open(`https://search.jd.com/Search?keyword=${e?e:this.searchContent}`)    
                break;
                default:
                break;
            }
    },
    },
    watch:{
        searchContent:function(){
            if(this.selectIndex == -1){//避免上下键选择联想内容时重新获取联想内容
                let timer
                if (timer) clearTimeout(timer);
                timer = setTimeout(this.getAwApi, 200);
            }
        }
    }
}
</script>
    
<style>
.checked{
    background-color: #ebebeb;
    transition: all 0.2s; 
}
.list-box{
    border: 1px solid #e8e8e8;
    border-radius: 4px;
}
.list{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    padding:4px 8px;
    margin: 0;
    list-style: none;
    text-align: left;
}
.list:hover{
    background-color: #ebebeb;
    transition: all 0.2s;
}
#list ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>