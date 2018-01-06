<template>
	<div class="dk-container">
		<dk-header></dk-header>
		<div class="dk-body">
			<dk-nav></dk-nav>
			<div class="dk-content">
				<div class="dk-toolbar" style="background: #fff;">
					<a href="javascript:" class="btn btn-primary btn-sm" :class="value.class" v-if="toolList" v-for="(value,key) in toolList" @click="click(value)">{{value.text ? value.text : key}}</a>
				</div>
				<router-view class="dk-viewer"></router-view>
			</div>
		</div>
		<div class="dk-footer">@dk</div>
	</div>	
</template>

<script type="text/javascript">
	import './home.scss'
	import nav from './nav/nav.vue'
	import header from './header/header.vue'

	export default {
		components: {
			'dk-nav': nav,
			'dk-header': header
		},
		data(){
			return {
				toolList: null
			}
		},
		methods: {
			addTool(arg){
				this.toolList = arg
			},
			click(arg){
				if(arg.event){
					arg.event()
				}
			}
		},
		created(){
			// this.$on('dk', (a) => {
			// 	// this.msg = 'dk'
			// 	console.log(a)
			// })
		}
	}
</script>