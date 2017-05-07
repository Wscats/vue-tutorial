Vue.component("xdetail", {
	template: `
		<article class="weui-article">
		    <h1>大标题</h1>
		    <section>
		        <section>
		            <h3>{{newsDetail.title}}</h3>
		            <p>
		                {{newsDetail.description}}
		            </p>
		            <p>
		                <img :src="newsDetail.picUrl" alt="">
		            </p>
		        </section>
		    </section>
		</article>
	`,
	data:function(){
		return {
			newsDetail:""
		}
	},
	mounted() {
		console.log(this)
		console.log(this.$route.params.id)
		this.$http.get("js/meizi.json", {
			params: {
				page: 1
			}
		}).then(function(data) {
			console.log(data)
			this.newsDetail = data.data.showapi_res_body.newslist[this.$route.params.id]
		}, function(err) {

		})
	}
})