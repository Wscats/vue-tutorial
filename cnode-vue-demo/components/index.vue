<template>
<div>
    <mu-appbar title="Title" id="cnode_top" style="height:50px;background-color: rgba(153,102,255,0.9);">
        
        <!--左边菜单-->
        <span class="myMenu" @click="changeMenu()" style="position:fixed;left:10px;top:14px;"></span>
        <mu-drawer :open="open" :docked="docked" @close="changeMenu()">
        <mu-list @itemClick="docked ? '' : changeMenu()" style="padding-top:0px">
            <p style="background:rgba(153, 102, 255, 0.9);height:50px;color:white;text-align:center;line-height:50px">
                <span style="font-size: 30px;position: fixed;left: 0px;width:50px" @click="open = false">&times;</span>
                CNode
            </p>
            <i class="logo"></i>
            <div class="info">
                <img :src="head"/>
                <span>{{name}}</span>
                
            </div>
            <div style="font-size:16px;padding-left:16px;border-bottom: 1px solid #ddd;margin-top:10px">省流量
                <mu-switch v-model="toggle" @input="economy()"  class="demo-switch" style="margin-left:120px"/>
            </div>
            <mu-list-item title="关于作者" style="border-bottom: 1px solid #ddd" href="https://github.com/stjw7098"/>
            <mu-list-item title="关于CNode社区" style="border-bottom: 1px solid #ddd" href="https://cnodejs.org/"/>
            <mu-list-item title="当前版本  1.0"/>
            <!--<mu-list-item v-if="docked" @click.native="open = false" title="关闭"/>-->
        </mu-list>
        </mu-drawer>

        <!--顶部导航-->
        <mu-tabs :value="activeTab" @change="handleTabChange" style="height:50px;background-color: rgba(255,255,255,0);font-family:bold;margin-left:20px">
            <!--<a href="#/index/list/:">-->
            
            <mu-tab value="tab1" title="全部" @click="updateTab(0)" href="javascript:scroll(0,0)"/>
            <mu-tab value="tab2" title="精华" @click="updateTab(1)" href="javascript:scroll(0,0)"/>
            <mu-tab value="tab3" title="分享" @click="updateTab(2)" href="javascript:scroll(0,0)"/>
            <mu-tab value="tab4" title="问答" @click="updateTab(3)" href="javascript:scroll(0,0)"/>
            <mu-tab value="tab5" title="招聘" @click="updateTab(4)" href="javascript:scroll(0,0)"/>
        </mu-tabs>
        <mu-icon-menu icon="more_vert" slot="right">
            <mu-menu-item class="menuItem1" title="登录" @click="login=true" style="margin-left:10px;padding-left:10px;"/>
            <mu-menu-item class="menuItem2" title="关于" href="#/about" style="margin-left:10px;padding-left:10px;font-weight:normal"/>
            
        </mu-icon-menu>
  </mu-appbar>
  <div class="isSuccess" v-show="toast"></div>
  <!--遮罩-->
  <div class="alert-matte" v-show="login" @click="login=false"></div>
  <!--//登录框-->
  <div class="login-dialog alert" v-show="login"> 
      <input class="count" v-show="!cookie" type="text" v-model="accesstoken" placeholder="AccessToken"> 
      <button class="lbtn" v-show="!cookie" @click="myLogin">登 录</button>  
      <button class="lbtn" v-show="cookie" @click="logout">退 出 登 录</button>  
  </div>
  <!--懒加载-->
  <mu-circular-progress class="loadmore" :size="40" v-show="flag"/>
  <router-view v-show="!flag"></router-view>
</div>
</template>

<script>
var list=require("./list.vue");
export default {
  data () {
    return {
      activeTab: 'tab1',
      id:"",
      atBottom:false,
      currentTab:'',
      login:false,

      open: false,
      docked: true,
      toggle:false,

      accesstoken:"",
      toast:false,

      name:"未登录",
      head:require('../img/about.png'),

      cookie:""
    }
  },
  components: {
      wlist:list
  },
  computed: {
      flag:function(){
            console.log(this.$store.getters.getFlag)
            return this.$store.getters.getFlag;
        },
  },

  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    //改变tab切换
    updateTab:function(tab){
        this.currentTab=tab;

        this.atBottom=true;
        this.$store.commit('setChange',{
            tab:tab,
            page:1,
            flag:true
        });
        //  this.atBottom=false;
    },
    //控制左边菜单的开关
    changeMenu (flag) {
      this.open = !this.open
    //   this.docked = !flag
    },
    economy(){
        this.$store.commit('setEconomy',this.toggle);
    },
    myLogin(){
        //隐藏遮罩和登录框
        this.login=false;
        var self=this;
        // 登录请求
        $.ajax({
            url:"https://cnodejs.org/api/v1/accesstoken",
            type:"POST",
            data:{
                accesstoken:self.accesstoken
            },
            //登录成功回调
            success:function(data){
                if(data){
                    $('.isSuccess').html('登录成功');
                    
                    
                    self.toast=true;
                    console.log(data)

                    self.name=data.loginname;
                    self.head=data.avatar_url;

                    //设置有效期为30天的cookie
                    var date=new Date();
					date.setDate(date.getDate()+30);
                    self.setCookie('accesstoken',self.accesstoken,date)

                    var cookie=self.getCookie('accesstoken')

                    self.cookie=cookie;

                    setTimeout(function(){
                        self.toast=false;
                    },2000)
                }
            },
            //登陆失败回调
            error:function(){
                $('.isSuccess').html('登录失败');
                self.toast=true;
                setTimeout(function(){
                    self.toast=false;
                },2000)
            }
        })
    
    },
    //退出登录
    logout(){
        //隐藏退出框
        this.login=false;

        this.name="未登录";
        this.head=require('../img/about.png');

        this.cookie="";

        var cookie=this.getCookie("accesstoken")
        var date=new Date();
        date.setDate(date.getDate()-31);
        this.setCookie("accesstoken",cookie,date);
    },
    // 设置cookie方法
    setCookie(name,val,expires,path){
        var cookieStr = name + '=' + val;

        if(expires){
            cookieStr += ';expires=' + expires;
        }

        if(path){
            cookieStr += ';path=' + path;
        }

        // 写入cookie
        document.cookie = cookieStr;//'name=laoxie'
    },
    // 获取cookie方法
    getCookie(name){
        var cookie = document.cookie.split('; ');
        var res;

        for(var i=0;i<cookie.length;i++){
            var arr = cookie[i].split('=');
            if(arr[0] === name){
                res = arr[1];
                break;
            }
        }

        return res;
    }

  },
  mounted:function(){
      $(".loadmore").css('left',(window.innerWidth-$(".loadmore").width())/2)

      //一上来判断是否有cookie
      var cookie=this.getCookie('accesstoken')

      this.cookie=cookie;
      if(cookie){
          var self=this;
          $.ajax({
            url:"https://cnodejs.org/api/v1/accesstoken",
            type:"POST",
            data:{
                accesstoken:cookie
            },
            //登录成功回调
            success:function(data){
                if(data){
                    

                    self.name=data.loginname;
                    self.head=data.avatar_url;

                    
                }
            }
        })
      }
  }
}
</script>
<style scoped lang="scss">
    .info{
        padding-left: 16px;
        font-size: 16px;
        height: 40px;
        
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        span{
            margin-left: 10px;
            vertical-align: top;
            height: 40px;
            line-height: 40px;
        }
    }
    .isSuccess{
        width: 100px;
        height: 30px;
        background: rgba(51, 51, 51, 0.8);
        color: white;
        position: fixed;
        left:140px;
        top:300px;
        line-height: 30px;
        border-radius: 20px;
        text-align: center;
    }
    .count{
        outline: none;
    }
    .logo{
        background:url('../img/cnode.jpg') no-repeat;
        background-size: 200px 200px;
        width: 200px;
        height: 200px;
        display: inline-block;
        margin-left: 27px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .myMenu{
        background:url('../img/menu.png') no-repeat;
        background-size: 24px 24px;
        display: inline-block;
        width: 24px;
        height: 24px;
    }
    .menuItem1{
        background:url('../img/login.png') no-repeat left center;
        background-size: 20px 20px;
    }
    .menuItem2{
        background:url('../img/about.png') no-repeat left center;
        background-size: 20px 20px;
    }
    #cnode_top{
        position: fixed;
        top:0;
    }
    .loadmore{
        margin-top: 80px;
    }

    .alert {
        width: 280px;
        left: 50%;
        margin-left: -140px;
        margin-top: 50px;
        position: fixed;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        box-shadow: 0 5px 15px #555;
        text-align: center;
        color: #f70;
        z-index: 20000;
    }

    .login-dialog input[type=text] {
        border: 2px solid rgba(153, 102, 255, 0.9);
        border-radius: 5px;
        color: rgba(153, 102, 255, 0.9);
        -webkit-transition: all .2s ease;
        transition: all .2s ease;
    }

    .login-dialog input {
        margin-bottom: 10px;
        width: 100%;
        line-height: 30px;
        padding: 5px;
        display: block;
    }

    .btn, .lbtn {
        margin: 10px auto;
        padding: 0;
        display: block;
        background-color: rgba(153, 102, 255, 0.9);
        color: #fff;
        font-size: 14px;
    }

    .lbtn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border: none;
        border-radius: 5px;
    }

    .alert-matte {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #000;
        opacity: .7;
        z-index: 15000;
        top:0px;
    }
   
</style>