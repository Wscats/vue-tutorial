# 实例元素 el
实例元素指的是 Vue 实例化时编译的容器元素，或者说是 Vue 作用的元素容器
``` html
    <div id="app"></div>
```
``` javascript
    var vm = new Vue({
        el: '#app'
    })
```
也可以为实例元素指定其它选择器
``` html
    <div class="app"></div>
```
``` javascript
    var vm = new Vue({
        el: '.app'
    })
```
可以有多个实例元素
``` html
    <div id="app1"></div>
    <div id="app2"></div>
```
``` javascript
    var vm = new Vue({
        el: '#app1'
    })
    var vm = new Vue({
        el: '#app2'
    })    
```
如果有多个相同的实例元素则只有第一个起效
``` html
    <div id="app"></div>
    <!--这个只当普通 html 输出，不会被 Vue 编译-->
    <div id="app"></div>
```
``` javascript
    var vm = new Vue({
        el: '#app'
    })
```
也可以在实例化的时候不指定实例元素，后面用 $mount() 手动进行挂载
``` html
    <div id="app"></div>
```
``` javascript
    var vm = new Vue({
        //option
    })

    vm.$mount("#app");
    
```
可以通过实例获取实例元素
``` javascript
    var vm = new Vue({
        el: '#app'
    })

    console.log(vm.$el)
```

# 数据对象 data
在 MVVM 模式中充当着 M(Model) 数据模型层，更多的体现于将 M 层映射到 V 层
``` html
    <div id="app">
        <!--结果为：文本-->
        <span>{{key1}}</span>
        <!--结果为：11-->
        <span>{{key2 + key3}}</span>
        <!--结果为：key4_1-->
        <span>{{key4.key4_1}}</span>
        <!--结果为：{"key5_1": "key5_1"}-->
        <span>{{JSON.stringify(key5[0])}}</span>
    </div>
```
``` javascript
    var array = [{key5_1: "key5_1"}];
    var vm = new Vue({
        el: '#app',
        data: {
            key1: '文本',
            key2: 1,
            key3: 10,
            key4: {
                key4_1: 'key4_1'
            },
            key5: array
        }
    }
```
可以通过实例获取数据对象
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {}
    })

    console.log(vm.$data)
```

# 事件处理器 methods
元素可以通过 v-on:事件 || @事件 进行绑定事件，事件中的 this 默认指向实例 vm
``` html
    <div id="app">
        <input type="button" @click="count += 1" value="监听事件">
        <span>{{count}}</span>
    </div>
```
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {
            count: 0
        }
    })
```
上面的情况仅适用于很简单的处理，复杂的处理可以需要单独处理上面的情况仅适用于很简单的处理，复杂的处理可以需要单独处理
``` html
    <div id="app">
        <input type="button" value="确认" @click="counter"/>
        <p>确认按钮被点击了 {{ counter }} 次。</p>
    </div>
```
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {
            count: 0
        },
        methods: {
            counter: function(){
                this.count += 1;
            }
        }
    })
```
在 js 的事件中默认会有个 event 对象，Vue 在事件上对 event 对象进行继承二次封装，改名为 $event，在事件当中默认传过去
``` html
    <div id="app">
        <input type="button" @click="eventer" count="1" value="event 对象">
        <span>{{count}}</span>
    </div>
```
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {
            count: 0
        },
        methods: {
            eventer: function(event){
                var _count = event.target.getAttribute('count') * 1;
                this.count += _count;
                event.target.setAttribute('count', _count);
            }
        }
    })
```
在事件中很多情况下要传参数，Vue 也可以在事件中传参数
``` html
    <div id="app">
        <input type="button" @click="parameter(10, $event)" value="事件传参数">
        <span>{{count}}</span>
    </div>
```
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {
            count: 0
        },
        methods: {
            parameter: function(n, event){
                this.count += n;
                event.target.setAttribute('disabled', true);
            }
        }
    })
```
[事件效果预览](https://dk-lan.github.io/vue-erp/VueBasic/VueBasicOptions/methods.html)

# 计算属性 computed
computed 主要是针对 data 的属性进行操作，this 的指针默认指向实例 vm
``` html
    <p>{{reversedMessage}}</p>
```
``` javascript
    data: {
        message: 'ABC'
    },
    computed: {
        reversedMessage: function(){
            return this.message.split('').reverse().join('')
        }
    }
```
渲染结果为
``` html
    <p>CBA</p>
```
在 computed 的属性中默认有两个属性，一个是 get，我们称之为 getter，另一个是 set，我们称之为 setter，所以也可以这样写：
``` javascript
    data: {
        message: 'ABC'
    },
    computed: {
        reversedMessage: {
            get: function(){
                return this.message.split('').reverse().join('')
            }
        }
    }
```
当我们在 V 层调用 {{reversedMessage}} 的时候会自动触发 reversedMessage.get()

setter 的逻辑也是一样，当改变对应的属性时，会自动触发 set 方法
``` html
    <div id="app">
        <!--调用了 fullName.get()-->
        <p>{{fullName}}</p>
        <input type="text"  v-model="newName">
        <!--changeName 事件改变了 fullName 的值，所以会自动触发 fullName.set()-->
        <input type="button" value="changeName" @click="changeName">
    </div>
```
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {
            firstName:'DK',
            lastName: 'Lan',
            newName: ''
        },
        computed: {
            fullName:{
                get: function(){
                    return this.firstName + '.' + this.lastName
                },
                set: function(newValue){
                    this.firstName = newValue
                }
            }
        },
        methods: {
            changeName: function(){
                this.fullName = this.newName;
            }
        }
    })
```
Vue 在 getter 上面作了基于对应属性的依赖缓存，也就是说多次调用同一个属性，get 只会执行一次。而事件在每次触发时都会被调用，当然在改变该属性值的时候会再次被调用
``` html
    <div id="app">
        <!--fullName.get 只被调用一次-->
        <p>{{fullName}}</p>
        <p>{{fullName}}</p>
        <p>{{fullName}}</p>
        <!--每次点击都会调用 changeName-->
        <input type="button" value="changeName" @click="changeName('Vue')">
    </div>
```
``` javascript
    var vm = new Vue({
        el: '#app',
        data: {
            firstName:'DK',
            lastName: 'Lan',
            newName: ''
        },
        computed: {
            fullName:{
                get: function(){
                    return this.firstName + '.' + this.lastName
                },
                set: function(newValue){
                    this.firstName = newValue
                }
            }
        },
        methods: {
            changeName: function(txt){
                this.newName = txt;
                //如果在这里改变 this.fullName 的值，则会再次自动触发对应的 getter
            }
        }
    })
```
[计算属性效果预览](https://dk-lan.github.io/vue-erp/VueBasic/VueBasicOptions/computed.html)
# 监听器 watch
Vue 提供了对单个属性的监听器，当该属性发生改变的时候，自动触发，此项使用不当会影响性能，所以慎用。
```html
    <input type="text" v-model="a">
    <p>旧值：{{aOldVal}}</p>
    <p>新值：{{aNewVal}}</p>    
```
```javascript
    {
        data: {
            a: 1
        },
        watch: {
            a: function (newVal, oldVal) {
                //自动触发此方法
                console.log('new: %s, old: %s', newVal, oldVal)
            },
        }    
    }
```
也可以把方法放到 data 对象中
```javascript
    {
        data: {
            a: 1,
            changeA: function (newVal, oldVal) {
                //自动触发此方法
                console.log('new: %s, old: %s', newVal, oldVal)
            }
        },
        watch: {
            a: 'changeA'
        }    
    }
```
watch 与 compute 区别：
1. computed 创建新的属性， watch 监听 data 已有的属性
2. compute 会产生依赖缓存
3. 当 watch 监听 computed 时，watch 在这种情况下无效，仅会触发 computed.setter
```javascript
    {
        computed: {
            a: {
                get: function(){
                    return '';
                },
                set: function(newVal){
                    //会触发此项
                    console.log('set val %s', newVal);
                }
            }				 
        },
        watch: {
            a: function(){
                //不会被触发
                console.log('watch');
            }
        }    
    }
```
[监听器效果预览](https://dk-lan.github.io/vue-erp/VueBasic/VueBasicOptions/watcher.html)