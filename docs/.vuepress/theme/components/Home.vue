<template>
  <main
    class="home"
    aria-labelledby="main-title"
  >
    <!-- 新手指引   -->
    <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
    <header class="hero">
      <div class="homeNav">
        <div class="Navsearch-box" >
          <a-tabs @change="tabChange" type="card" >
            <a-tab-pane tab="谷歌" :key="1"></a-tab-pane>
            <a-tab-pane tab="百度" :key="2"></a-tab-pane>
            <a-tab-pane tab="淘宝" :key="11"></a-tab-pane>
            <a-tab-pane tab="BiliBili" :key="7"></a-tab-pane>
            <a-tab-pane tab="Github" :key="10"></a-tab-pane>
            <a-tab-pane tab="StakOverflow" :key="3"></a-tab-pane>
            <a-tab-pane tab="MDN" :key="9"></a-tab-pane>
            <a-tab-pane tab="思否" :key="8"></a-tab-pane>
            <a-tab-pane tab="知乎" :key="4"></a-tab-pane>
            <a-tab-pane tab="微信" :key="5"></a-tab-pane>
            <a-tab-pane tab="Youtube" :key="6"></a-tab-pane>
            <a-tab-pane tab="京东" :key="12"></a-tab-pane>
          </a-tabs>
          <div class="SearchAw-Box">
            <SearchAw :tabId="tabId" class="SearchAw"></SearchAw>
          </div>
        </div>
        <div class="webside-box">
          <WebsideCard></WebsideCard>
        </div>
      </div>
    </header>
    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import WebsideCard from '@theme/components/WebsideCard222.vue'
import SearchAw from '@theme/components/SearchAw.vue'
export default {
  name: 'Home',
  data(){
    return{
      searchContent:'',
      tabId:1,
      steps: [{//新手指引
              target: '#v-step-1',  // We're using document.querySelector() under the hood
              content: '初次见面，你好。<br>这是一个小轮子，不同的搜索引擎可以联想不同的搜索内容。'
            },
            {//新手指引
              target: '#v-step-2',  // We're using document.querySelector() under the hood
              content: '更多地了解我&项目'
            }
      ],
      myOptions:{
        useKeyboardNavigation: false,//新手指引键盘控制
          labels: {//新手指引按钮文字
            buttonSkip: 'SKIP',
            buttonPrevious: 'PREVIOUS',
            buttonNext: 'NEXT',
            buttonStop: 'GOT IT',
            pageState:''
          }
      }
    }
  },
  components: { NavLink,WebsideCard,SearchAw},
  mounted: function () {
    if(localStorage.getItem('newUser')==null&&!this._isMobile()){//判断是否第一次打开网页
      this.$tours['myTour'].start()//开启新手指引
      localStorage.setItem('newUser', 'yes')
    }
  },
  methods:{
    _isMobile() {//判断是否是移动端
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    beforeunloadFn(e) {  
      this.pageState = ''  
    },
    tabChange(e){
     this.tabId = e//搜索引擎 id
    },
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  },
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 0 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    .Navsearch-box
      text-align center
      margin-top 100px
      margin-bottom  100px
    .webside-box
      /* // border 1px black solid */
      // position absolute
      // top 200px
    .homeNav 
      width 100%
      // position relative
  /* 新手指引背景色 */
  .v-step
    opacity 0.9 
    background-color #3eaf7c 
    .v-step__arrow
      opacity 0.9 
      border-color #3eaf7c 
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
  .SearchAw-Box
    z-index 9 
    position relative
    width 60%
    margin auto
    .SearchAw
      background-color #fff
      position absolute
      width 100%
    
</style>
