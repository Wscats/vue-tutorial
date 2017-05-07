var store = new Vuex.Store({
	//存储数据的地方
	state: {
		name: "新闻",
		author: "wscats",
		searchName: ""
	},
	//修改值的方法
	//this.$store.commit('函数名',值,....)
	//this.$store.state.xxxx
	mutations: {
		//改变值的方法
		changeName(state, a, b) {
			state.name = a;
		},
		changeSearchName(state, a) {
			state.searchName = a
		}
	},
	//获取值的方法
	//this.$store.getters.xxxx
	//this.$store.state.xxxx
	//获取数据的方法
	getters: {
		getName(state) {
			return state.name
		},
		getSearchName(state) {
			return state.searchName
		}
	}
})