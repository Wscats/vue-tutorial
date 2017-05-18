
<template>
    <div class="allDetail">
    
    <mu-appbar title="详情" @click="atTop()" style="height:50px;background-color: rgba(153,102,255,0.9);font-family:bold;position:fixed;left:0;top:0">
        <mu-icon-button icon="close" slot="left" @click="back()"/>
        <mu-icon-menu icon="more_vert" slot="right">
            <!--<mu-menu-item class="menuItem1" title="登录" @click="login=true" style="margin-left:10px;padding-left:10px;"/>-->
            <mu-menu-item class="menuItem2" title="关于" href="#/about" style="margin-left:10px;padding-left:10px;"/>
            
        </mu-icon-menu>
    </mu-appbar>
    <!--遮罩-->
    <div class="alert-matte" v-show="login" @click="login=false"></div>
    <!--//登录框-->
    <div class="login-dialog alert" v-show="login"> 
        <input type="text" placeholder="AccessToken"> 
        <button class="lbtn">登 录</button>  
    </div>
    <h2 class="topic-title" v-show="!atBottom">{{title}}</h2>
    <div class="section" v-show="!atBottom"> 
        <div class="status"> 
            <img class="avatar" :src="img"> 
            <div class="detail"> 
                <div> 
                    <span class="tag good" v-if="tab=='share'&&good==false&&top==false">分享</span>
                    <span class="tag good" v-if="tab=='ask'&&top==false" style="background-color:#6cf">问答</span>
                    <span class="tag good" v-if="tab=='job'&&top==false" style="background-color:#999">招聘</span>
                    <span class="tag good" v-if="good==true&&top==false" style="background-color:#f70">精华</span>
                    <span class="tag good" v-if="top==true" style="background-color:red">置顶</span>
                    <span>{{name}} </span> 
                </div> 
                <div> 
                    <span> {{visit+"次浏览"}} </span> 
                    <span> 发布于:{{create|gettime}} </span> 
                </div> 
            </div> 
        </div> 
    </div>

    <div class="markdown-body">
        <mu-circular-progress class="loadmore" :size="40" v-show="atBottom"/>

        

        <div v-html="html">

        </div>

    </div>
    <h3 class="subtitle" v-show="!atBottom"> <strong>{{replies}}</strong> 个回复 </h3>
    <section class="reply-list" v-show="!atBottom">
        <div class="reply-box" v-for="arr in arrs"> 
            <div class="status"> 
                <img class="avatar" :src="arr.author.avatar_url"> 
                <i class="icon-repost"><span></span></i> 
                <i class="icon-like"><span></span>{{arr.ups.length}}</i> 
                <div class="detail"> 
                    <div>{{arr.author.loginname}}</div> 
                    <div>{{arr.create_at|gettime}}</div> 
                </div> 
            </div> 
            <hr> 
            <div>
                <div class="markdown-text">
                    <p v-html="arr.content"></p>
                </div>
            </div>  
        </div>
    </section>
    <!--我的回复-->
    <div class="myReply">
        <input type="text" placeholder="回复内容" v-model="replyContent"><button @click="send()">回复</button>
        
    </div>

    <!--回到顶部-->
    <a class="totop" v-show="true"  href="javascript:scroll(0,0)">
        <img src="../img/top2.png">
    </a>
    <!--回复是否成功弹出对应toast-->
    <div class="isSuccess" v-show="toast"></div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                arrs:[],
                html:"",
                atBottom:true,
                name:"",
                img:"",
                create:"",
                visit:"",
                title:"",
                tab:"",
                top:null,
                good:null,
                replies:"",
                login:false,
                scrollTop:0,
                toast:false,
                replyContent:""
            }
        },
         //自定义截取时间过滤器
        filters:{
            gettime:function(val){
                return val.substr(0,10)
            }
        },
        computed:{
            page:function(){
                return this.$store.getters.getTab;
            }
        },
        methods:{
            back:function(){
                location.href="#/index/list";
                
            },
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
            },
            //获取详情数据
            getData(){
                $(".loadmore").css('left',(window.innerWidth-$(".loadmore").width())/2);

                console.log(this.$route.params.id)
                
                var id=this.$route.params.id;
                var self=this;
                $.ajax({
                    url:"https://cnodejs.org/api/v1/topic/"+id,
                    
                
                    success:function(data){
                        console.log(data.data)
                        self.html=data.data.content;
                        self.title=data.data.title;
                        self.visit=data.data.visit_count;
                        self.create=data.data.create_at;
                        self.top=data.data.top;
                        self.good=data.data.good;
                        self.tab=data.data.tab;
                        self.name=data.data.author.loginname;
                        self.img=data.data.author.avatar_url;
                        self.replies=data.data.replies.length;
                        self.arrs=data.data.replies;

                        self.atBottom=false;
                    }
                })
            },
            // 回复方法
            send(){
                var id=this.$route.params.id;
                var cookie=this.getCookie("accesstoken");
                var self=this;
                if(cookie){
                    
                    $.ajax({
                        url:"https://cnodejs.org/api/v1/topic/"+id+"/replies",
                        type:"POST",
                        data:{
                            accesstoken:cookie,
                            content:self.replyContent
                        },
                        success:function(data){
                            $('.isSuccess').html('回复成功');
                            self.toast=true;

                            setTimeout(function(){
                                self.toast=false;
                            },2000)

                            self.replyContent="";
                            self.getData();
                        }
                    })
                }else{
                    self.toast=true;
                    $('.isSuccess').html('请登录');

                    setTimeout(function(){
                        self.toast=false;
                    },2000)
                }
                console.log(this.replyContent)
            }
            
        },
        mounted:function(){
            this.getData();
            
        }
    }
</script>


<style scoped lang="scss">
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
    .myReply{
        position:fixed;
        left:0;
        bottom:0;
        height: 40px;
        width: 100%;
        border: 1px solid #ddd;
        input{
            width: 80%;
            height: 100%;
            padding-left: 20px;
            border: none;
        }
        button{
            width: 20%;
            height: 100%;
            background: rgba(153, 102, 255, 0.9);
            color: white;
            border:none;
        }
    }
    .totop{
        position: fixed;
        right:10px;
        bottom:50px;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: 4px solid #515151;
        img{
            width: 32px;
            height: 32px;
            margin-top: 4px;
            margin-left: 5px;
        }
    }
    .menuItem1{
        background:url('../img/login.png') no-repeat left center;
        background-size: 20px 20px;
    }
    .menuItem2{
        background:url('../img/about.png') no-repeat left center;
        background-size: 20px 20px;
    }
    .loadmore{
        margin-top: 80px;
    }

    .allDetail{
        padding-bottom: 40px;
    }

    .topic-title,.section{
        padding: 10px;
    }
    .topic-title{
        margin-top: 50px;
    }
    
    .markdown-body{
        padding: 10px;
        color: #333;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.6;
        word-wrap: break-word;
        box-sizing: border-box;
        /*background: red;*/
        max-width: 100%;
        
    }
    

    .markdown-body img{
        display: block;
        margin: 10px auto;
        border: none;
        border-radius: 10px;
        max-width: 100%;
        box-sizing: content-box;
        background-color: #fff;
    }

    .section {
        background-color: #f0f0f0;
    }

    #topic-page{
        margin: 10px auto;
    }

    .section{
        
        padding: 10px!important;
    }

    h2.topic-title {
        font-size: 16px;
        line-height: 1.7;
        color: #333;
    }

    .status {
        position: relative;
    }

    .status>img.avatar {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        margin: -25px 0;
        border-radius: 30px;
        border: 1px solid #ccc;
    }

    .status>div.detail {
    margin-left: 50px;
    padding-left: 5px;
}

.status>div.detail>div, .status>div.detail>div>span:first-child, .status>div.detail>div>span:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.status>div.detail>div>span:nth-child(2) {
    height: 30px;
    line-height: 30px;
    margin-right: 100px;
    display: block;
    font-size: 12px;
    color: #06a;
    font-family: arial,verdana,microsoft yahei;
}

.status>div.detail>div {
    height: 30px;
    line-height: 30px;
}
.status>div.detail>div>span:first-child {
    float: right;
    font-size: 12px;
}

.tag.good{
    background: #f70;
}

.tag{
    width: 40px!important;
    height: 24px!important;
    line-height: 24px!important;
    font-size: 12px;
    font-weight: 400;
    color: #fff!important;
    border-radius: 0 5px 5px 0;
    text-align: center!important;
    position: relative;
    overflow: visible!important;
}

.status>div.detail>div>span:first-child {
    width: 100px;
    height: 30px;
    line-height: 30px;
    color: #333;
    float: right;
    text-align: right;
    font-size: 12px;
}

.tag:before {
    width: 0;
    height: 0;
    content: "";
    position: absolute;
    left: -12px;
    top: 0;
    border-right: 12px solid transparent;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
}

.tag.good:before {
    border-right-color: #f70;
}

.tag:after {
    width: 6px;
    height: 6px;
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    margin: -3px;
    background-color: #fff;
    border-radius: 3px;
}

.subtitle {
    width: 150px;
    line-height: 1.8;
    margin: 20px auto!important;
    padding: 10px!important;
    border-bottom: 2px solid #42b983;
    text-align: center;
    position: relative;
}

.subtitle strong {
    color: #42b983;
}

.reply-list{
    width: 100%;
    padding:0 10px;
}

.reply-list>.reply-box {
    list-style: none;
    background: #f5f5f5;
    border-radius: 15px;
    margin: 10px auto;
    padding: 10px;
    box-shadow: 0 0 6px #999;
}

.status>img.avatar {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    margin: -25px 0;
    border-radius: 30px;
    border: 1px solid #ccc;
}

.reply-list>.reply-box [class^=icon-]{
    width: 60px;
    height: 60px;
    line-height: 60px;
    float: right;
    text-align: center;
    font-size: 22px;
}
.icon-repost span {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../img/zhuanfa.png');
    background-size: 20px 20px;
}

.reply-list>.reply-box [class^=icon-].icon-like {
    font-size: 16px;
}

.reply-list>.reply-box [class^=icon-] {
    width: 60px;
    height: 60px;
    line-height: 60px;
    float: right;
    text-align: center;
    font-size: 22px;
}

.icon-like span{
    display: inline-block;
    width: 20px;
    height: 20px;
    background:url('../img/zan.png') no-repeat;
    background-size: 20px 20px;
}

.status>div.detail {
    margin-left: 50px;
    padding-left: 5px;
}

.status>div.detail>div {
    height: 30px;
    line-height: 30px;
}

hr {
    border-bottom: 1px solid #ddd;
    margin: 10px;
    height: 0;
}

.markdown-body:before, .markdown-text:before {
    display: table;
    content: "";
}

.markdown-body:after, .markdown-text:after {
    display: table;
    clear: both;
    content: "";
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