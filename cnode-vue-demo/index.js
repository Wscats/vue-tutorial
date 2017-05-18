var $ = require('jquery');
window.$ = $;


import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './css/style.css';

var index = require("./components/index.vue");
// var all = require("./components/all.vue");
// var jinghua = require("./components/jinghua.vue");
// var share = require("./components/share.vue");
// var ask = require("./components/ask.vue");
// var zhaopin = require("./components/zhaopin.vue");

var list = require("./components/list.vue");
var detail = require("./components/detail.vue");
var about = require("./components/about.vue");

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(MuseUI)

var router = new VueRouter({
    routes: [{
        path: "/index",
        component: index,
        children: [{
            path: "list",
            component: list
        }]
    }, {
        path: "/about",
        component: about
    }, {
        path: "/detail/:id",
        component: detail
    }, {
        path: "/",
        redirect: "/index/list"

    }]
});

var store = new Vuex.Store({
    state: {
        tab: "",
        exchange: [],
        page: null,
        flag: true,

        economy: null
            //tab表示当前tab 0-4
            //exchange表示列表数据数组
            //page每次懒加载触发page+1
            //flag当页面切换tab时候用来判断是否成功，成功隐藏加载图案
    },

    mutations: {
        // setPage:function(state,page){

        // },
        setChange: function(state, val) {
            console.log(val)
            state.tab = val.tab;

            state.page = val.page;

            state.flag = val.flag;

            //在另一个页面commit时候触发，state是上面的state属性，val是commit函数的第二
            // 个参数，commit函数的第一个参数是setChange
            // state.exchange = val;

            var res = Number(val.tab);
            var type = "";
            switch (res) {
                case 0:
                    type = "";
                    break;
                case 1:
                    type = "good";
                    break;
                case 2:
                    type = "share";
                    break;
                case 3:
                    type = "ask";
                    break;
                case 4:
                    type = "job";
                    break;
            }

            $.ajax({
                dataType: "JSON",
                url: "https://cnodejs.org/api/v1/topics",
                data: {
                    limit: 10,
                    tab: type,
                    page: val.page
                },
                success: function(data) {

                    state.flag = false;

                    if (val.page == 1) {
                        state.exchange = data.data;
                    } else {
                        state.exchange = state.exchange.concat(data.data);
                    }
                }
            })



        }

        ,
        setEconomy: function(state, val) {
            state.economy = val;
        }
    },
    getters: {
        //作用，某页面获取数据，例如:this.$store.getters.getChange;
        getChange: function(state) {
            return state.exchange;
        },
        getTab: function(state) {
            return state.tab;
        },
        getPage: function(state) {
            return state.page;
        },
        getFlag: function(state) {
            return state.flag;
        },
        getEconomy: function(state) {
            return state.economy;
        }
    }
});

new Vue({
    el: "#mode",
    router,
    store,
    data: {

    },
    mounted: function() {

    }


})