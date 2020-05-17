import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueTour from 'vue-tour'//新手指引
import 'vue-tour/dist/vue-tour.css'
import axios from './util/request/http.js'

// import Layout from './ant-design-vue/lib/layout'
// import Tag from './ant-design-vue/lib/tag'
// import 'ant-design-vue/lib/layout/style/index.css'
// import 'ant-design-vue/lib/tag/style/index.css'
export default ({Vue}) => {
  // Vue.use(Layout) 
  // Vue.use(Tag)
  Vue.prototype.$ajax = axios
  Vue.use(Antd)
  Vue.use(VueTour)
}