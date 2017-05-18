<template>
    <div>
        <ul class="list" >
        
            <li v-for="a in arrs" href="#/index/detail" @click="showList(a.id)"> 
                <h3 class="top">
                    <span v-if="a.tab=='share'&&a.good==false&&a.top==false">分享</span>
                    <span v-if="a.tab=='ask'&&a.top==false" style="background-color:#6cf">问答</span>
                    <span v-if="a.tab=='job'&&a.top==false" style="background-color:#999">招聘</span>
                    <span v-if="a.good==true&&a.top==false" style="background-color:#f70">精华</span>
                    <span v-if="a.top==true" style="background-color:red">置顶</span>
                    {{a.title}}
                </h3> 
                <div class="status"> 
                    <img v-show="!economy" class="avatar" :src="a.author.avatar_url"> 
                    <div class="detail"> 
                        <div> 
                            <span> {{a.reply_count+'/'+a.visit_count}} </span> 
                            <span> {{a.author.loginname}} </span> 
                        </div> 
                        <div> 
                            <span>{{a.last_reply_at|gettime}}</span> 
                            <span>{{a.create_at|gettime}}</span> 
                        </div> 
                    </div> 
                </div> 
            </li>

            
        </ul>
        <mu-circular-progress id="load" :size="40" v-show="atBottom"/>
        
        <a class="totop" v-show="scrollTop>400"  href="javascript:scroll(0,0)" @click="toTop()">
            <img src="../img/top2.png">
        </a>


    </div>
</template>
<script>
    export default{
        // props:['tab'],
        data:function(){
            return{
                scrollTop:0,
                atBottom:false
            }
        },
        
    
        //自定义截取时间过滤器
        filters:{
            gettime:function(val){
                return val.substr(0,10)
            }
        },
        computed:{
            arrs:function(){
                return this.$store.getters.getChange;
            },
            tab:function(){
                return this.$store.getters.getTab;
            },
            page:function(){
                return this.$store.getters.getPage;
            },
            economy:function(){
                return this.$store.getters.getEconomy;
            }
        },
        methods:{
            showList:function(id){
                // console.log(id)
                location.href="#/detail/"+id;
            },

            toTop:function(){
                $('.list')[0].scrollTop=0;
            },
            

            //懒加载,绑在window出现各种问题，建议绑在ul上面
            // showTop:function(el){
            //     var self=this;

            //     var timer;

            //     $(window).on('scroll',function(){
            //         self.scrollTop=window.scrollY;

            //         //判断滚动列表是否到达底部
                    
            //         // console.log(window.scrollY,document.body.scrollHeight,window.innerHeight)
            //         if(window.scrollY>=document.body.scrollHeight-window.innerHeight-50){
                        
            //             if(timer){
            //                 return;
                            
            //             }
            //             self.atBottom=true;

            //             timer=setTimeout(function(){
                            
            //                 self.$store.commit('setChange',{
            //                     tab:self.tab,
            //                     page:self.page+1,
            //                     flag:false
            //                 });
            //                 // self.atBottom=false;
            //                 timer=undefined;
                            
            //             },1000)          
            //         }             
            //     })
            // }

            //懒加载
            showTop:function(el){
                var self=this;

                var timer;
                $('.list').on('scroll',function(){
                    self.scrollTop=$('.list')[0].scrollTop;
                    //判断滚动列表是否到达底部
                    
                    // console.log($('.list')[0].scrollTop,$('.list')[0].scrollHeight,$('.list').height())
                    if($('.list')[0].scrollTop>=$('.list')[0].scrollHeight-$('.list').height()-50){
                        
                        if(timer){
                            return;
                            
                        }
                        self.atBottom=true;

                        timer=setTimeout(function(){
                            
                            self.$store.commit('setChange',{
                                tab:self.tab,
                                page:self.page+1,
                                flag:false
                            });
                            self.atBottom=false;
                            timer=undefined;
                            
                        },1000)          
                    }             
                })
            }
        },
        mounted:function(){

            console.log(this.$el)

            console.log(this.$route.params.id)
            // this.getData();
            console.log(this.props)
            console.log(this.$store.getters);
            //第一次进来页面的时候改变一次exchange
            this.$store.commit('setChange',{
                tab:0,
                page:1,
                flag:true
            });
            // console.log(arrs)

             //动态设置列表的高度
            $(".list").css('height',window.innerHeight);

            this.showTop();

            // this.scroller = this.$el;

            // window.innerHeight-50

            // console.log(window.innerHeight-50)

           

            //定位底部load的图标
            $("#load").css('left',(window.innerWidth-$("#load").width())/2)
        }            
        
    }
</script>

<style scoped lang="scss">
    .demo-refresh-container{
        // width: 100%;
        // height: 600px;
        // overflow: auto;
        // -webkit-overflow-scrolling: touch;
        // border: 1px solid #d9d9d9;
        position: relative;
        // user-select: none;
    }
    .list{
        overflow: auto;

        
    }
    #load{
        margin:5px auto;
    }
    // .demo-infinite-container{
        
    //     overflow: auto;
    //     -webkit-overflow-scrolling: touch;
    //     border: 1px solid #d9d9d9;
    // }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
    .list::-webkit-scrollbar  
    {  
        width: 8px;  
        height: 2px;  
        // background-color: #7e57c2;  
    }  
    
    /*定义滚动条轨道 内阴影+圆角*/  
    .list::-webkit-scrollbar-track  
    {  
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
        border-radius: 10px;  
        background-color: #F5F5F5;  
    }  
    
    /*定义滑块 内阴影+圆角*/  
    .list::-webkit-scrollbar-thumb  
    {  
        border-radius: 20px;  
        -webkit-box-shadow: inset 0 0 6px rgb(163, 117, 255);  
        background-color: rgb(163, 117, 255);  
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
    .list{
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        margin: 0;
        padding: 0px 5px;
        margin-top: 56px;
        li{
                background-color: #fff;
                padding: 5px 10px;
                margin: 10px auto;
                border-radius: 10px;
                box-shadow: 0 0 5px #999;
                list-style: none;
                
                .top{
                    height: 25px;
                    line-height: 25px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0;
                    span{
                        // content: "\5206\4EAB";
                        background: #96f;
                        color: #fff;
                        padding: 3px 5px;
                        margin-right: 5px;
                        border-radius: 10px;
                        font-weight: 400;
                        font-size: 12px;
                    }
                }

                .status{
                    position:relative;
                    img{
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        top: 50%;
                        margin: -25px 0;
                        border-radius: 30px;
                        border: 1px solid #ccc;

                        background: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQAB…L/AIfD1mvZ4D7LbLf9z1ze+r88u/yOs4/8fgj3eZu/5f3vctTE3MCf5fh/as1s3IoxqThQ/9k=) no-repeat;
                        background-size: 50px 50px;
                    }

                    .detail{
                        margin-left: 50px;
                        padding-left: 5px;
                        div{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            height: 30px;
                            line-height: 30px;
                            span:first-child{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 100px;
                                height: 30px;
                                line-height: 30px;
                                color: #333;
                                float: right;
                                text-align: right;
                                font-size: 12px;
                            }
                            span:last-child{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                height: 30px;
                                line-height: 30px;
                                margin-right: 100px;
                                display: block;
                                font-size: 12px;
                                color: #06a;
                                font-family: arial,verdana,microsoft yahei;
                            }
                        }
                    }
                }
        }
    }
</style>