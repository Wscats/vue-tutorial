//头部组件
Vue.component("xheader", {
	template: `
			<div class="weui-tabbar weui-wheader">
				<p>{{name}}</p>
			</div>
			`,
	data:function(){
		return {
		}
	},
	computed:{
		name:function(){
			//vuex的state里面拿数据
			return this.$store.state.name
		},
		searchName:function(){
			//return this.$store.state.searchName
			return this.$store.getters.getSearchName
		},
	},
	ready:function(){
		console.log(this)
	}
})