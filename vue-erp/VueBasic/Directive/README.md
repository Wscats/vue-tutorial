# 自定义指令
在某些情况下，Vue 提供给我们的指令是非常不够的，比如有一个输入框需要在点击的时候能弹出日期控件，这个功能 Vue 并不支持，但 Vue 支持我们自定义指令。

自定义指令和定义组件的方式很类式，也是有全局指令和局部指令之分

## 全局指令
```html
    <div id="app">
        <!--在这里使用了一个自定义的指令 v-global-->
        <input type="text" value="" v-global />
    </div>
```
```javascript
    // 注册一个全局自定义指令 v-global，指令名称不用加前缀 v-
    // 当元素使用了 v-global 这个指令时会触发对应的 function
    // 参数 element：使用指令的元素
    Vue.directive('global',  function(element){
        //默认触发钩子函数的 inserted
        element.value = "世界和平";
        element.focus();
    })

    var vm = new Vue({
        el: '#app'
    })
```

## 局部指令
```html
    <div id="app">
        <!--在这里使用了一个自定义的指令 v-private-->
        <input type="text" value="" v-private />
    </div>
```
```javascript
    var vm = new Vue({
        el: '#app',
        directives: {
            //注册一个局布指令 private，指令名称不用加前缀 v-
            // 当元素使用了 v-private 这个指令时会触发对应的 function
            // 参数 element：使用指令的元素
            private: function(element){
                element.style.background = '#ccc';
                element.value = "世界和平";
            }
        }
    })
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Directive/directive.html)

## 钩子函数
钩子函数可以理解成是指令的生命周期
```html
    <div id="app">
        <!--在这里使用了一个自定义的指令 v-global-->
        <input type="text" v-model="text" v-demo="{color:'red'}">
    </div>
```
```javascript
    Vue.directive('demo', {
        //被绑定元素插入父节点时调用
        //默认触发此方法 Vue.directive('demo',  function(element){})
        //后于 bind 触发 
        //参数 element： 使用指令的元素
        //参数 binding： 使用指令的属性对象
        //参数 vnode： 整个 Vue 实例
        inserted: function(element, binding, vnode){
            console.log('inserted');
        },
        //只调用一次，指令第一次绑定到元素时调用，
        //用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
        //先于 inserted 触发
        bind: function(element, binding, vnode){
            console.log('bind');
            element.style.color = binding.value.color
        },
        //被绑定元素所在的模板更新时调用，而不论绑定值是否变化
        update: function(element, binding, vnode){
            console.log('update');
        },
        //被绑定元素所在模板完成一次更新周期时调用。
        componentUpdated: function(element, binding, vnode){
            console.log('componentUpdated');
        }
    })

    var vm = new Vue({
        el: '#app',
        data:{
            text: '钩子函数'
        }
    })
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Directive/hook.html)

## 案例：自定义日期控件
这里用 boostrap 的 datepicker 插件实现
```html
    <div id="app">
        <!--直接在 jQuery 环境下使用 datepicker 插件-->
        <input type="text" id="datepicker" data-date-format="yyyy-mm-dd"/>
        <!--使用 Vue 自定义指令 v-datepicker-->
        <input type="text" v-datepicker data-date-format="yyyy-mm-dd"/>
        <input type="button" value="保存" @click="save">
        <span>{{dataform.birthday}}</span>
    </div>
```
```javascript
    //在没有使用 Vue 前，datepicker 插件在 jQuery 的环境下是这样使用
    $('#datepicker').datepicker();

    //使用 Vue 自定义指令 v-datepicker
    Vue.directive('datepicker', function(element, binding, vnode){
        // data = dataform.birthday
        $(element).datepicker({
            language: 'zh-CN',
            pickTime: false,
            todayBtn: true,
            autoclose: true
        }).on('changeDate', function(){
            //由于不是手动在 input 输入值，所以双向绑定 v-model 无效
            //所以需要手动改变实例的数据模型
            var data = $(element).data('model');
            if(data){
                // datas = ['dataform', 'birthday']
                var datas = data.split('.');
                //context = vm
                var context = vnode.context;
                //循环属性自动添加
                datas.map((ele, idx) => {
                    //最后一个属性就直接赋值
                    if(idx == datas.length - 1){
                        context[ele] = element.value
                    } else {
                        //动态添加属性
                        context = context[ele]
                    }
                })
            }
        })
    })

    var vm = new Vue({
        el: '#app',
        data: {
            dataform: {}
        },
        methods: {
            save: function(){
                //使用 $set 更新 dataform
                //更多 $set 的使用在下面继续介绍
                this.$set(this.dataform)
            }
        }
    })
```

## $set 介绍
当实例对象 data 先设置好了结构，比如：data: {dataform: {}}，在后期想添加一个属性 username 时，这个 username 不会自动绑定到视图当中，所以调用 $set(原对象，新属性名，属性值) 进行绑定到视图当中
```html
    <div id="app">
        <input type="button" value="set" @click="set">
        <span>{{dataform.username}}</span>
    </div>
```
```javascript
    var vm = new Vue({
        el: '#app',
        data: {
            dataform: {}
        },
        methods: {
            set: function(){
                // 直接赋值不会显示在视图上
                // this.dataform.username = '123'
                //改用 $set 更新可以在视图上显示
                this.$set(this.dataform, 'username', '123')
            }
        }
    })
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Directive/datepicker.html)