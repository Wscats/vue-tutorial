# 过渡效果
SPA 中组件的切换有一种生硬的隐藏显示感觉，为了更好的用户体验，让组件切换时淡出淡入，Vue 提供了专门的组件 transition。

## 过滤效果应用场景
- 条件渲染 (使用 v-if)
- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

## 过渡状态
- enter：定义进入过渡的开始状态。在元素被插入时生效。
- endter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效。
- enter-to: 2.1.8版及以上 定义进入过渡的结束状态。
- leave：定义离开过渡的开始状态。在离开过渡被触发时生效。
- leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效。
- leave-to: 2.1.8版及以上 定义离开过渡的结束状态。

每个状态在使用的时候都是在 CSS 中使用，结合组件 transition 的 name 属性。如 `<transition name="fade"></transition>`，对应的是 `fade-` 加上每个状态：`fade-enter`。

## CSS 过渡
使用到组件 `transition` 的属性: `name`。
```html
<style type="text/css" media="screen">
    /*初始状态*/
    .fade-enter{opacity: 0;}
    /*已经准备就绪*/
    .fade-enter-active{transition: all .5s;}
    /*已经消失*/
    .fade-leave-active{opacity: 0; transition: all .5s;}
</style>

<div id="app">
    <input type="button" :value="show ? 'hide' : 'show'" @click="show = !show" />
    <br/>
    <transition name="fade">
        <img src="imgs/green.jpg" v-show="show" />
    </transition>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            show: true
        }
    })
</script>
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Transition/01-CSS过渡.html)

## CSS 动画
使用到组件 `transition` 的属性: `name`。
```html
<style type="text/css" media="screen">
    .fade-enter-active{animation: fade-in .5s;}

    .fade-leave-active{animation: fade-out .5s;}

    @keyframes fade-in{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    @keyframes fade-out{
        from{opacity: 1;}
        to{opacity: 0;}
    }
</style>

<div id="app">
    <input type="button" :value="show ? 'hide' : 'show'" @click="show = !show" />
    <br/>
    <transition name="fade">
        <img src="imgs/green.jpg" v-if="show" />
    </transition>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            show: true
        }
    })
</script>
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Transition/02-CSS动画.html)

## 初始渲染的过滤
第一次加载时的过渡效果，使用到组件 `transition` 的属性: `appear` `appear-class` `appear-active-class`。
```html
<style type="text/css" media="screen">
    .fade-enter{opacity: 0;}
    .fade-enter-active{transition: all 3s;}
</style>

<div id="app">
    <transition appear appear-class="fade-enter" appear-active-class="fade-enter-active">
        <img src="imgs/green.jpg" />
    </transition>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app'
    })
</script>
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Transition/03-初始渲染的过渡.html)

## 多个元素的过河效果
同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 过渡模式：
- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

使用到组件 `transition` 的属性: `mode`。
```html
<style type="text/css" media="screen">
    .fade-enter{opacity: 0;}
    .fade-enter-active{transition: all .5s;}

    .fade-leave-active{opacity: 0; transition: all .5s;}
</style>

<div id="app">
    <fieldset>
        <legend><h3>mode = in-out</h3></legend>
        <div>
            <input type="button" :value="red ? 'green' : 'red'" @click="red = !red" />
            <br/>
            <transition name="fade" mode="in-out">  
                <img src="imgs/red.jpg" v-if="red" key="red"/>
                <img src="imgs/green.jpg" v-else key="green"/>
            </transition>           
        </div>
    </fieldset>
    <fieldset>
        <legend><h3>mode = out-in</h3></legend>
        <div>
            <input type="button" :value="flag == 1 ? 'green' : flag == 2 ? 'yellw' : 'red'" @click="flag = flag == 1 ? 2 : flag == 2 ? 3 : 1" />
            <br/>
            <transition name="fade" mode="out-in">  
                <img src="imgs/red.jpg" v-if="flag == 1" key="red"/>
                <img src="imgs/green.jpg" v-else-if="flag == 2" key="green"/>
                <img src="imgs/yellow.jpg" v-else key="yellow" />
            </transition>               
        </div>
    </fieldset> 
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            red: true,
            flag: 1
        }
    })
</script>
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Transition/04-多个元素过渡.html)

## 列表(v-for)的过渡效果
v-for 生成列表过渡效果要使用组件 `transition-group`，组件提供属性 `tag` 表示该组件将会渲染成对应的 DOM 节点，其它的使用和 `transition` 一样。
```html
<style type="text/css" media="screen">
    *{list-style: none;}
    li{width: 300px; margin-bottom: 5px; padding: 10px 20px; background-color: #ccc;}

    .list-enter{opacity: 0; transform: translateX(300px);}
    .list-enter-active{transition: all .5s;}

    .list-leave-active{transition: all .5s; opacity: 0; transform: translateX(-300px);}
</style>

<div id="app">
    <p>
        <input type="button" value="AddItem" @click="addItem">
        <input type="button" value="RemoveItem" @click="removeItem">
    </p>
    <transition-group tag="ul" name="list">
        <li v-for="(item, index) in items" :key="item">Item {{index}}</li>
    </transition-group>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            items: [1,2,3]
        },
        methods: {
            randomIndex: function(){
                return  parseInt(this.items.length * Math.random());
            },
            addItem: function(){
                this.items.splice(this.randomIndex(), 0, this.items.length + 1);
            },
            removeItem: function(){
                this.items.splice(this.randomIndex(), 1);
            }
        }
    })
</script>
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Transition/06-列表的进入和离开过渡.html)

## 自定义过渡的类名
我们可以通过以下特性来自定义过渡类名：
- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)
他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。
```html
<link rel="stylesheet" type="text/css" href="animate.css">

<div id="app">
    <button @click="show = !show">Toggle render</button>
    <transition enter-active-class="animated jello" leave-active-class="animated bounceOutRight">
        <div v-if="show"><img src="./imgs/green.jpg" /></div>
    </transition>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            show: true
        }
    })
</script>
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Transition/07-自定义过渡的类名.html)

## 过渡效果钩子函数
除了用CSS过渡的动画来实现vue的组件过渡，还可以用JavaScript的钩子函数来实现，在钩子函数中直接操作DOM。我们可以在属性中声明以下钩子：
```html
<transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:enter-cancelled="enterCancelled"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
    v-on:leave-cancelled="leaveCancelled"
>
</transition>
<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        methods: {
            // 过渡进入
            // 设置过渡进入之前的组件状态
            beforeEnter: function (el) {
            // ...
            },
            // 设置过渡进入完成时的组件状态
            enter: function (el, done) {
            // ...
            done()
            },
            // 设置过渡进入完成之后的组件状态
            afterEnter: function (el) {
            // ...
            },
            enterCancelled: function (el) {
            // ...
            },
            // 过渡离开
            // 设置过渡离开之前的组件状态
            beforeLeave: function (el) {
            // ...
            },
            // 设置过渡离开完成时地组件状态
            leave: function (el, done) {
            // ...
            done()
            },
            // 设置过渡离开完成之后的组件状态
            afterLeave: function (el) {
            // ...
            },
            // leaveCancelled 只用于 v-show 中
            leaveCancelled: function (el) {
            // ...
            }
        }
    })
</script>
```