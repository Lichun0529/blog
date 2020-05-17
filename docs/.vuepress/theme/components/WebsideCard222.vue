<template>
  <div class="grid">
		<div class="website-box"  v-for="(i,index) in siteList" >
			<div class="site-info">
				<a :href="i.url" target="_blank">
					<div @mouseover="changeSite" @mouseout="overlay=false">
						<div class="av-box" >
							<a-avatar
								shape="square"
								:size="56"
								icon="global"
								:src="i.img"
							/>
						</div>
						<p class="websiteName" >{{i.name}}</p>
					</div>
				</a>
			</div>
		</div>
  </div>
</template>

<script>
	import {siteList} from '../util/siteList'
  export default {
	name:'WebsideCard',
	data(){
	  return{
		overlay:false,
		siteId:null,
		siteList:siteList
	  }
	},
	methods:{
		changeSite(e){
			// this.overlay = true
		}
	},
	props: []
  }
</script>

<style >
	.grid{
		display: flex;
		flex-wrap:wrap;
		justify-content: space-between;
	}
	.website-box {
		width: 96px;
		margin-top: 30px;
	}
		.site-info{
			text-align:center;
		}
		.websiteName {
			text-align: center;
			margin: 0;
			font-size:14px;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		}
		.av-box {
			text-align: center;
		}
		.ant-btn-primary{
			background-color: #3eaf7c;
			border-color: #3eaf7c;
		}
		.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
			color: #3eaf7c;
		}
</style>
