# 组件
组件（Component）是前端在单页面应用（SPA）上最好的一种实现方式，把所有功能模块拆解成单独的组件，每个组件都有独立的作用域，且还可以相互通信



# 认识单页面应用（SPA）
在传统的页面之间跳转，是通过刷新，重新渲染一个页面而实现，在渲染的过程中势必要加载外部资源文件，页面在服务器中渲染出来是通过一系列的生命周期，在这个过程中会因为网速等硬件问题直接影响页面的加载速度，为解决这一问题，前端在新的设计模式上引入了组件的概念，页面之间的跳转变成了组件之间的切换，不需要重新加载整个页面，也不用考虑页面的生命周期，换成组件的生命周期，在性能上大大的提升了。

# Vue 的组件实现
## 全局组件
```html
    <div id="app">
        <!--组件的使用-->
        <global-component></global-component>
    </div>
```
```javascript
    //组件的定义 Vue.component(组件名称, {template})
    Vue.component('global-component', {
        template: '<h1>全局组件</h1>'
    })

    var vm = new Vue({
        el: '#app'
    })
```
最终渲染的效果
```html
    <div id="app">
        <h1>全局组件</h1>
    </div>
```
## 局部组件
```html
    <div id="app">
        <!--组件的使用-->
        <private-component></private-component>
    </div>
```
```javascript
    //组件的定义 Vue.component(组件名称, {template})
    var vm = new Vue({
        el: '#app',
        components:{
            'private-component': {
                template: '<h1>局部组件</h1>'
            }
        }
    })
```
最终渲染的效果
```html
    <div id="app">
        <h1>局部组件</h1>
    </div>
```
## 组件是一个单独的作用域
每个组件都有单独的作用域
```html
    <div id="app">
        <p>{{count}}</p>
        <component1/>
    </div>    
```
```javascript
    var vm = new Vue({
        el: '#app',
        data: {
            count: 10
        },
        methods: {
            increment: function(){
                this.count += 1;
            }
        },
        components:{
            'component1': {
                template: '<button v-on:click="increment">{{ count }}</button>',
                data: function(){
                    //在组件里面 data 一定是 function 并返回一个对象
                    return {
                        count: 0
                    }
                },
                methods: {
                    increment: function(){
                        this.count += 1;
                    }
                }
            }
        }
    })
```
渲染结果为
```html
    <div id="app">
        <p>10</p>
        <!--
            此按钮每次点击都会自增 1，而 p 标签永远都是为 10
            原因为组件的作用域是单独的
        -->
        <button>0</button>
    </div>    
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Component/component.html)

## 特殊的 HTML 结构中使用 is
比如在下拉列表（select）元素里面，子元素必须为 option，则在使用组件的时候用 is
```html
    <div id="app">
        <select>
            <option is="privateOption"></option>
        </select>
    </div>
```
```javascript
    var vm = new Vue({
        el: '#app',
        components: {
            'privateOption': {
                template: '<option value=1>1</otpion>'
            }
        }
    })
```
渲染结果
```html
    <div id="app">
        <select>
            <option value="1">1</option>
        </select>
    </div>
```

## 动态组件 - :is
```html
<div id="app" style="display: none;">
    <input type="button" value="changeLight" @click="changeLight" />
    <br/>
    <p :is="show"></p>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            show: 'red',
        },
        methods:{
            changeLight: function(){
                this.show = this.show == 'red' ? 'green' : 'red';
            }
        },
        components: {
            red: {
                template: '<h1>Red</h1>'
            },
            green: {
                template: '<h1>Green</h1>'
            }
        }
    })
</script>
```

## 组件属性
组件的属性要先声明后使用，props: ['属性名'...]
```html
    <div id="app">
        <!--组件的使用-->
        <private-component title="组件属性" :text="mess"></private-component>
    </div>
```
```javascript
    //组件的定义 Vue.component(组件名称, {template})
    var vm = new Vue({
        el: '#app',
        data: {
            mess: '-动态属性'
        }
        components:{
            'private-component': {
                template: '<h1>{{title + text}}</h1>',
                props: ['title', 'text']
            }
        }
    })
```
最终渲染的效果
```html
    <div id="app">
        <h1>组件属性-动态属性</h1>
    </div>
```
## 组件自定义事件
和组件属性不一样的在于 <组件名 v-bind:属性名="">，属性名要在组件中先声明再使用：props: ['属性名']
自定义事件：<组件名 v-on:自定义事件名="">，自定义事件名不需要声明，直接用 $emit() 触发
```html
    <div id="app">
        <p>{{total}}</p>
        <incrementTotal v-on:count="incrementTotal"></incrementTotal>
    </div>
```
```javascript
    var vm = new Vue({
        el: '#app',
        data: {
            total: 0
        },
        methods: {
            incrementTotal: function(){
                this.total += 1;
            }
        },
        components: {
            'incrementTotal': {
                template: '<input type="button" @click="incrementTotal" value="Total" />',
                data: function(){
                    return {
                        total: 0
                    }
                },
                methods: {
                    incrementTotal: function(){
                        this.total += 1;
                        this.$emit('count')
                    }
                }
            }
        }
    })
```

## slot 分发内容
Vue 组件默认是覆盖渲染，为了解决这一问题，Vue 提出了 slot 分发内容

```html
    <div id="app">
        <component1>
            <h1>Sam</h1>
            <h1>Lucy</h1>
        </component1>
    </div>
```
```javascript
    Vue.component('component1', {
        template: `
            <div>
                <h1>Tom</h1>
                <slot></slot>
            </div>
        `
    })
```
最终渲染的效果
```html
    <div id="app">
        <component1>
            <h1>Tom</h1>
            <!--
                如果在组件定义的 template 当中没有 <slot></slot>，那么下面两个 h1 标签将不会存在
                换句话说就是 <slot></slot> = <h1>Sam</h1><h1>Lucy</h1>
                <slot></slot>可以放到 <h1>Tom</h1> 上面进行位置调换
            -->
            <h1>Sam</h1>
            <h1>Lucy</h1>
        </component1>
    </div>
```

### 具名 slot
如果要将组件里面不同的子元素放到不同的地方，那就为子元素加上一个属性 slot="名称"，然后在组件定义的时候用名称对应位置 <slot name="名称"></slot>，其它没有 slot 属性的子元素将统一分发到 <slot></slot> 里面
```html
    <div id="app">
        <component1>
            <h1>Sam</h1>
            <h1 slot="lucy">Lucy</h1>
        </component1>
    </div>
```
```javascript
    Vue.component('component1', {
        template: `
            <div>
                <slot name="lucy"></slot>
                <h1>Tom</h1>
                <slot></slot>
            </div>
        `
    })
```
最终渲染的效果
```html
    <div id="app">
        <component1>
            <!--<slot name="lucy"></slot> = <h1 slot="lucy">Lucy</h1>-->
            <h1>Lucy</h1>
            <h1>Tom</h1>
            <!--其它没有 slot 属性的子元素将全部分发到 <slot></slot> 标签-->
            <h1>Sam</h1>
        </component1>
    </div>
```

## 模版写法
```html
	<template id="component1">
		<div>
		    <input type="text" v-model="name"/>
		    <p>{{name}}</p>			
		</div>
	</template>

	<div id="app">
		<component1/>
	</div>     
```
```javascript
    var vm = new Vue({
        el: '#app',
        components: {
            'component1': {
                template: '#component1',
                data: function(){
                    return {name: 'Tom'};
                }
            }
        }
    })
```