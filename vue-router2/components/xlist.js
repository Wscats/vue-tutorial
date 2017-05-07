//新闻列表组件
Vue.component("xlist", {
	template: `
		<div>
			<div class="weui-panel weui-panel_access">
			    <div class="weui-panel__hd">图文组合列表{{searchName}}</div>
			    <div class="weui-panel__bd">
			        <a v-for="(news,index) in newss" :href="'#/detail/'+index" class="weui-media-box weui-media-box_appmsg">
			            <div class="weui-media-box__hd">
			                <img class="weui-media-box__thumb" :src="news.picUrl" alt="">
			            </div>
			            <div class="weui-media-box__bd">
			                <h4 class="weui-media-box__title" v-text="news.title"></h4>
			                <p class="weui-media-box__desc" v-text="news.description"></p>
			            </div>
			        </a>
			    </div>
			    <div class="weui-panel__ft">
			        <a @click="getNews()" href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
			            <div class="weui-cell__bd">查看更多</div>
			            <span class="weui-cell__ft"></span>
			        </a>    
			    </div>
			</div>
			<div id="loadingToast" :style="{display:isShowLoading?'block':'none'}">
			    <div class="weui-mask_transparent"></div>
			    <div class="weui-toast">
			        <i class="weui-loading weui-icon_toast"></i>
			        <p class="weui-toast__content">数据加载中</p>
			    </div>
			</div>
		</div>
			`,
	data: function() {
		return {
			newss: [],
			page: 1,
			isShowLoading: 0
		}
	},
	computed:{
		searchName:function(){
			return this.$store.getters.getSearchName
		}
	},
	methods: {
		getNews() {
			this.isShowLoading += 1
			$.ajax({
				type: "GET",
				url: "js/meizi.json",
				data: {
					page: this.page
				},
				dataType: "json",
				success: function(data) {
					this.isShowLoading -= 1
					console.log(data)
					this.newss = this.newss.concat(data.showapi_res_body.newslist)
					console.log(this.newss)
				}.bind(this)
			})
		}
	},
	mounted() {
		this.getNews()
	}
})