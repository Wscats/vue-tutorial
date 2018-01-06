# 模版语法
模版语法已成为前端在数据驱动模式上 V 层最好的实现。

## 插值
``` html
<div id="app">
  <!-- 文本 当对 data.message 发生改变时，对应插值的内容也会自动改变-->
  <fieldset>
    <legend>文本</legend>
    <div>{{message}}</div>
  </fieldset>

  <!-- 纯 HTML {{}} 这种形式最终会被解释成文本，如果要想输入 HTML 结构，使用要用到 v-html="对象"-->
  <fieldset>
    <legend>纯 HTML</legend>
    <div v-html="rawHtml"></div>
  </fieldset>		

  <!-- 属性 元素的任意属性（包含自定义属性）都可以和对象绑定 :属性名(或者 v-bind:属性名)=“对象”-->
  <fieldset>
    <legend>属性</legend>
    <img :src="src" alt="" />
    <img v-bind:src="'../imgs/red.jpg'" alt="" />
  </fieldset>	

  <!-- js 表达式 {{}} 可以用来解释 js 的表达式-->
  <fieldset>
    <legend>js 表达式</legend>
    <div>{{1 + 1}}</div>
    <div>{{status ? 'YES' : 'NO'}}</div>
    <div>{{message.split('').reverse().join('')}}</div>
  </fieldset>	
</div>
```

``` javascript
var vm = new Vue({
  el: '#app',
  data: {
    message: '我是文本',
    rawHtml: '<h1>我是 h1 标签</h1>',
    src: '../imgs/green.jpg',
    status: true,
  }
})
```
[插值效果预览](https://github.com/wscats/vue-erp/VueBasic/TemplateSyntax/Interpolations.html)

## 缩写
### v-bind 缩写
``` html
  <!--完整写法-->
  <img v-bind:src="'../imgs/red.jpg'" alt="" />
  <!--缩写-->
  <img :src="src" alt="" />
```
### v-on 缩写
``` html
  <!--完整语法-->
  <button v-on:click="greet">Greet</button>
  <!--缩写语法-->
  <button @click="greet">Greet</button>  
```

## 指令
指令（Directive），换句话说就是元素的自定义属性，在 Vue 中是以 v- 为前缀的自定义属性，属性值为对象或 js 表达式

<table>
  <thead>
    <tr>
      <th>指令</th><th>类型</th><th>用法</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>v-text</td><td>string</td><td><!--v-text-->
      
  ``` html
    <span v-text="msg"></span>
    <!--效果等同于-->
    <!--v-text 的权重高于 {{}}-->
    <span>{{msg}}</span>
  ```
  
   </td></tr>
    <tr><td>v-html</td><td>string</td><td><!--v-html-->
      
  ``` html
    <div v-html="html"></div>
  ```
  
   </td></tr> 
    <tr><td>v-show</td><td>boolean</td><td><!--v-show-->
      
  ``` html
    <!--show 的值会直接影响 div 在文档中是否显示-->
    <div v-show="show"></div>
  ```
  
   </td></tr>    
    <tr><td>v-if</td><td>boolean</td><td><!--v-if-->
      
  ``` html
    <!--status 的值会直接影响 div 在文档中是否存在-->
    <div v-if="status"></div>
  ```
  
   </td></tr>
    <tr><td>v-else-if</td><td>boolean</td><td><!--v-else-if-->
      
  ``` html
    <div v-if="flag == 1">1</div>
    <!--必须跟 v-if 或者 v-else-if 元素后面-->
    <div v-else-if="flag == 2">2</div>
  ```
  
   </td></tr>      
    <tr><td>v-else</td><td>不需要表达式</td><td><!--v-else-->
      
  ``` html
    <div v-if="flag == 1">1</div>
    <div v-else-if="flag == 2">2</div>
    <!--必须跟 v-if 或者 v-else-if 元素后面-->
    <div v-else>2</div>
  ```
  
   </td></tr>    
    <tr><td>v-for</td><td>Array | Object | Number | String</td><td><!--v-for-->
      
  ``` html
    <!--
      data = 3 
      结果会生成 3 个 div，
      value 的值分类为 1, 2, 3 
      index 的值分别为 0, 1, 2
    -->
    <div v-for="(value, index) in data">
      <span v-text="value"></span>
      <span>{{index}}</span>
    </div>
    <!--也可以这样写-->
    <div v-for="value in data">
      <span v-text="value"></span>
    </div>

    <!--
      data = "abc" 
      结果会生成 data.length 个 div，
      value 的值分类为 a, b, c 
      index 的值分别为 0, 1, 2
    -->
    <div v-for="(value, index) in data">
      <span v-text="value"></span>
      <span>{{index}}</span>
    </div>   
    <!--也可以这样写-->
    <div v-for="value in data">
      <span v-text="value"></span>
    </div>

    <!--
      data = {name: 'dk', age: 18} 
      结果会生成 data 属性个数 个 div，
      value 的值分类为 dk, 18 
      key 的值分别为 name, age
    -->
    <div v-for="(value, key) in data">
      <span v-text="key"></span>
      <span>{{value}}</span>
    </div>
    <!--也可以这样写-->
    <div v-for="value in data">
      <span v-text="value"></span>
    </div>

    <!--
      data = [{name: 'dk1', age: 18}, {name: 'dk2', age: 20}] 
      结果会生成 data.length 个 div，
      obj 的值分类为 data[0], data[1] 
      index 的值分别为0, 1
    -->
    <div v-for="(obj, index) in data">
      <span v-text="JSON.stringify(obj)"></span>
      <span>{{index}}</span>
    </div>    
    <!--也可以这样写-->
    <div v-for="obj in data">
      <span v-text="JSON.stringify(obj)"></span>
    </div>    
  ```
  
   </td></tr> 
    <tr><td>v-on</td><td>Function</td><td><!--v-on-->
      
  ``` html
    <!--click事件直接绑定一个方法-->
    <button v-on:click="say1">say1</button>
    <!--缩写方式-->
    <!--click事件使用内联语句-->
    <button @click="say2('调用了 say2', $event)">say2</button>     
  ```
  
   </td></tr> 
       <tr><td>v-bind</td><td>Object</td><td><!--v-bind-->
      
  ``` html
    <img v-bind:src="'imgs/red.jpg'" />
    <!--缩写方式-->
    <img :src="'imgs/yellow.jpg'" />
  ```
  
   </td></tr>    
      <tr><td>v-model</td><td>表单元素的值</td><td><!--v-model-->
      
  ``` html
    <!--仅限于表单元素，双向绑定-->
    <input type="text" v-model="mess"/>
  ```
  
   </td></tr>  
      <tr><td>v-pre</td><td>不需要表达式</td><td><!--v-pre-->
      
  ``` html
    <!--{{}} 不编译，当字符串输出-->
    <span v-pre>{{mess}}</span>
  ```
  
   </td></tr>  
      <tr><td>v-cloak</td><td>不需要表达式</td><td><!--v-cloak-->
      
  ``` html
    <!--
      mess = 'abc'
      span 还没被 vue 解析的时候会显示 {{mess}}
      解析后会显示 123
      用于解决这两个转换的过程不友好的显示
      尤其是在页面加载过慢的情况很容易出现这种情况
    -->
    <span v-cloak>{{mess}}</span>
  ```
  
   </td></tr>     
      <tr><td>v-once</td><td>不需要表达式</td><td><!--v-once-->
      
  ``` html
    <!--内容只解释一次，当改变 mess 时不会再次映射到 span-->
    <span v-once>{{mess}}</span>
  ```
  
   </td></tr>              
  </tbody>
</table>

[指令效果预览](https://github.com/wscats/vue-erp/VueBasic/TemplateSyntax/Directives.html)

[综合案例预览](https://github.com/wscats/vue-erp/VueBasic/TemplateSyntax/Example.html)