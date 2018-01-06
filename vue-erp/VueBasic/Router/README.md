# 路由
通过 URL 映射到对应的功能实现，Vue 的路由使用要先引入 vue-router.js

## 基本路由入门
定义 component
```javascript
    const Foo = { template: '<div><h1>Foo Content</h1></div>' };
    const Bar = { template: '<div><h1>Bar Content</h1></div>' };
```
定义路由规则
```javascript
    //每个路由应该映射一个组件。 其中"component" 可以是自定义的组件
    //当 url 为 http://localhost/index.html#/foo 页面会渲染组件 Foo
    //当 url 为 http://localhost/index.html#/bar 页面会渲染组件 Bar
    const routes = [
        {path: '/foo', component: Foo},
        {path: '/bar', component: Bar}
    ]
```
使用
```html
    <div id="app">
        <h1>Hello VueRouter</h1>
        <p>
			<!-- 使用 router-link 组件来导航. -->
			<!-- 通过传入 `to` 属性指定链接. -->
			<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <!-- 属性 `to` 对应生成  `<a>` 标签的 `href` 属性-->
            <router-link to="/foo">Foo</router-link>
            <router-link to="/bar">Bar</router-link>
        </p>
        <!--路由匹配的组件在此处渲染-->
        <router-view></router-view>
    </div>
```
```javascript
    const router = new VueRouter({
        routes // （缩写）相当于 routes: routes
    })

    new Vue({
        router
    }).$mount('#app')
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Router/router.html)

## 路由参数
```html
    <div id="app">
        <h1>Hello VueRouter</h1>
        <p>
            <router-link to="/user/1">User1</router-link>
            <router-link to="/user/2">User2</router-link>
        </p>
        <router-view></router-view>
    </div>
```
通过对象 $route.params 来获取参数
```javascript
    const User = { template: '<div><h1>{{$route.params.userid}}</h1></div>' };

    const routes = [
        {path: '/user/:userid', component: User}
    ]    

    const router = new VueRouter({
        routes
    })

    new Vue({
        router
    }).$mount('#app')
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Router/params.html)

## 嵌套路由
```html
    <div id="app">
        <h1>Hello VueRouter</h1>
        <p>
            <router-link to="/floor1">一楼</router-link>
        </p>
        <router-view></router-view>
    </div>
```
```javascript
    const Floor1 = { 
        template: `
            <div>
                <h1>一楼</h1>
                <router-link to="/floor1/floor2">二楼</router-link>
                <router-view></router-view>
            </div>` 
    };
    const Floor2 = { template: '<div><h1>二楼</h1></div>' };    

    const routes = [
        {
            path: '/floor1',
            component: Floor1,
            children: [{
                // floor2 会被渲染在 Floor1 的 <router-view> 中
                path: 'floor2',
                component: Floor2
            }]
        }
    ]    

    const router = new VueRouter({
        routes
    })

    new Vue({
        router
    }).$mount('#app')
```
[效果预览](https://github.com/wscats/vue-erp/VueBasic/Router/routerChildren.html)

## 编程式导航
用 javascript 跳转路由
```html
    <div id="app">
        <h1>Hello VueRouter</h1>
        <p>
            <!--用 `router-link` 组件进行跳转-->
            <router-link to="/floor1">一楼</router-link>
            <!--编程式导航1：router.replace-->
            <input type="button" value="一楼" @click="router.replace('/floor1')">
            <!--编程式导航2：router.push()-->
            <input type="button" value="一楼" @click="router.push('/floor1')">
            <!--编程式导航3：router.push({})-->
            <input type="button" value="一楼" @click="router.push({path: '/floor1'})">            
        </p>
        <router-view></router-view>
    </div>
```

## 命名路由
在路由映射表中添加属性 name，用以对该路由映射规则命名，在编程式导航跳转路由时可以用 router.push({name: '名称'})
```html
    <div id="app">
        <h1>Hello VueRouter</h1>
        <p>
            <router-link to="/floor1">一楼</router-link>
            <!--编程式导航4：router.push({name: '名称'})-->
            <input type="button" value="一楼" @click="router.push({name: 'floor1'})">             
        </p>
        <router-view></router-view>
    </div>
```
```javascript
    const Floor1 = { 
        template: `
            <div>
                <h1>一楼</h1>
                <router-link to="/floor1/floor2">二楼</router-link>
                <router-view></router-view>
            </div>` 
    };
    const Floor2 = { template: '<div><h1>二楼</h1></div>' };    

    const routes = [
        {
            path: '/floor1',
            component: Floor1,
            name: 'floor1', //命名
            children: [{
                // floor2 会被渲染在 Floor1 的 <router-view> 中
                path: 'floor2',
                component: Floor2,
                name: 'floor2' //命名
            }]
        }
    ]    

    const router = new VueRouter({
        routes
    })

    new Vue({
        router
    }).$mount('#app')
```

## 命名视图
```html
    <div id="app">
        <h1>Hello VueRouter</h1>
        <p>
            <router-view></router-view>
            <router-view name="a"></router-view>
            <router-view name="b"></router-view>
        </p>
    </div>
```
```javascript
    const router = new VueRouter({
        routes: [
            {
                path: '/',
                components: {
                    default: {
                        template: '<h1>defalut router view</h1>'
                    },
                    a: {
                        template: '<h1>a router view</h1>'
                    },
                    b: {
                        template: '<h1>b router view</h1>'
                    }
                }
            }
        ]
    })

    new Vue({
        el: '#app',
        router
    })
```