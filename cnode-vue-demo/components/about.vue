<template>
      <div>
      <mu-appbar title="关于" style="height:50px;background-color: rgba(153,102,255,0.9);font-family:bold;position:fixed;left:0;top:0">
        <mu-icon-button icon="close" slot="left" @click="back()"/>
        <mu-icon-menu icon="more_vert" slot="right">
            <!--<mu-menu-item class="menuItem1" title="登录" @click="login=true" style="margin-left:10px;padding-left:10px;"/>-->
            <mu-menu-item class="menuItem2" title="关于" style="margin-left:10px;padding-left:10px;"/>
            
        </mu-icon-menu>
      </mu-appbar>
      <!--遮罩-->
      <div class="alert-matte" v-show="login" @click="login=false"></div>
      <!--//登录框-->
      <div class="login-dialog alert" v-show="login"> 
          <input type="text" placeholder="AccessToken"> 
          <button class="lbtn">登 录</button>  
      </div>
      <div id="about-page">
           <div class="logo"></div> 
           <h3>关于CNode社区</h3> 
           <hr> 
           <p> CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。 </p> 
           <p> CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。 </p> <p _v-43bc6a0c=""> CNode 的 SLA 保证是，一个9，即 90.000000%。 </p> 
           <p> 社区目前由 @alsotang 在维护，有问题请联系：
               <a href="https://github.com/alsotang">alsotang</a> 请关注我们的官方微博：
               <a href="http://weibo.com/cnodejs">官方微博</a> 
            </p> 
            <h3>关于此项目</h3> 
            <hr> 
            <p> 此项目由 
                <a href="https://github.com/stjw7098/vue-demo">stjw</a> 开发, 项目源码地址 
                <a href="https://github.com/stjw7098/vue-demo">源码地址</a> 
            </p> 
            <p> 此vue-cnode是一个使用 vue实现 和 webpack 打包的 html5 web 应用, 使用 ES6 进行编写. 后端使用的是 cnodejs社区 提供的API, 需要手动复制cnode社区的accesstoken方可登录. </p>
            <p> 此项目具备 cnodejs 社区提供的所有api的功能, 包含 用户登录(通过accesstoken), 帖子列表, 分类(精华, 分享, 问答等), 主题页面, 点赞, 回复帖子, 个人消息, 用户中心, 发表新帖子. 另外还增加代码高亮功能和 markdown排版美化. </p> 
            <p> 技术上部分借鉴了 
                <a href="https://github.com/shinygang/Vue-cnodejs">Vue-cnodejs</a> 和 
                <a href="https://github.com/vuejs/vue-hackernews">vue-hackernews</a>.
                <strong>代码完全重写, UI完全重做, 无任何复制粘贴</strong>. webpack插件配置部分借鉴
                <a href="http://webpack.github.io/docs/webpack-dev-server.html">webpack官网</a>
            </p>
        </div>
        </div>

</template>
<script>
    export default{
        data:function(){
            return{
                login:false
            }
        },
        methods:{
            back:function(){
                location.href="#/index/list";
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menuItem1{
        background:url('../img/login.png') no-repeat left center;
        background-size: 20px 20px;
    }
    .menuItem2{
        background:url('../img/about.png') no-repeat left center;
        background-size: 20px 20px;
    }
    #about-page {
        padding: 60px 10px 10px;
        background: #fff;
    }
    #about-page .logo {
        width: 100px;
        height: 100px;
        background: url("../img/cnode.jpg") no-repeat;
        background-size: 100px 100px;
        margin: 10px auto;
        -webkit-transition: all .7s ease;
        transition: all .7s ease;
    }
    #about-page h3, #about-page p {
        line-height: 1.8;
    }
    #about-page h3:not(:first-child) {
        margin-top: 20px;
    }
    #about-page hr {
        margin: 10px 0;
        border-bottom-color: #ddd;
    }
    hr {
        border-bottom: 1px solid #eee;
        margin: 10px;
        height: 0;
    }
    a, abbr, address, b, blockquote, cit, code, dd, del, dfn, dl, dt, em, fieldset, h1, h2, h3, h4, h5, h6, hr, i, ins, label, legend, li, ol, p, pre, q, samp, small, strong, sub, sup, ul {
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        margin: 0;
        padding: 0;
    }
    #about-page h3 a, #about-page p a {
        color: #06a;
        text-decoration: underline;
    }

    #about-page h3 strong, #about-page p strong {
        color: #42b983;
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