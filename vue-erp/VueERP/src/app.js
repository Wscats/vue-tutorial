import './assets/bootstrap/css/bootstrap.min.css'
import './assets/common/common.scss'
// import './assets/font-awesome/css/font-awesome.min.css'
import './assets/font-awesome/font-awesome.css'
import './assets/jquery-confirm/jquery-confirm.css'
// import './assets/bootstrap/css/hp.min.css'
import './assets/bootstrap/datepicker/css/datepicker.css'

import './assets/bootstrap/datepicker/js/bootstrap-datepicker'
import './assets/jquery-validation-1.15.0/dist/jquery.validate.js'
import './assets/jquery-validation-1.15.0/dist/localization/messages_zh.js'
import './assets/jquery-confirm/jquery-confirm.js'

import $ from 'jquery'
import Vue from 'vue';
import store from './vuex/store'
import router from './router/'
import App from './App.vue'

Vue.directive('datepicker', {
	inserted: (element, binding, vnode) => {
		var _datepicker = $(element).datepicker({
			language: 'zh-CN',
			pickTime: false,
			todayBtn: true,
			autoclose: true
		}).on('changeDate', (ev) => {
			var model = vnode.data.attrs['data-model'];
			if(model){
				var models = model.split('.')
				var context = vnode.context
				models.map((ele, idx) => {
					if(idx == models.length - 1){
						context[ele] = vnode.elm.value
					} else {
						context = context[ele]
					}
				})
			}
		});
	}
})

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})