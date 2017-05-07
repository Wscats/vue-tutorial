//搜索框组件
Vue.component("xsearch", {
	template: `
			<div class="has_header ng-scope">
				<div class="weui-search-bar" :class="{'weui-search-bar_focusing':isShowSearchBar}" id="search_bar">
					<form class="weui-search-bar__form ng-pristine">
						<div class="weui-search-bar__box">
							<i class="weui-icon-search"></i>
							<input type="search" v-model="searchName" @keyup="searchInput()" @focus="showSearchBar()" class="weui-search-bar__input ng-pristine ng-untouched ng-valid ng-empty" id="search_input" placeholder="搜索">
							<a href="javascript:" @click="searchClear()" class="weui-icon-clear" id="search_clear"></a>
						</div>
						<label for="search_input" class="weui-search-bar__label" id="search_text">
							<i class="weui-icon-search"></i>
							<span>搜索</span>
							</label>
					</form>
					<a href="javascript:" @click="isShowSearchBar=false" class="weui-search-bar__cancel-btn" id="search_cancel">取消</a>
				</div>
			</div>
			`,
	data:function(){
		return {
			isShowSearchBar:false,
			searchName:""
		}
	},
	methods:{
		showSearchBar:function(){
			this.isShowSearchBar = true
		},
		searchClear:function(){
			this.searchName = "";
			this.$store.commit('changeSearchName',this.searchName)
			$("#search_input").focus();
		},
		searchInput:function(){
			console.log(this.searchName)
			//提交数据到vuex的state里面
			this.$store.commit('changeSearchName',this.searchName)
		}
	}
})