# 绑定 class
## 对象语法
v-bind:class="{样式名: 结果为 boolean 的表达式}"，表达式结果为 true，则元素 class="样式名"，否则元素 class=""
``` html
    <div :class="{classNam1: 1 == 1, className2: 1 == 2}"></div>
```
渲染结果
``` html
    <div class="classNam1"></div>
```

也可以写成
``` html
    <div :class="classObject"></div>
```
``` javascript
    data: {
        classObject: {
            className1: false,
            className2: true
        }
    }
```
渲染结果
``` html
    <div class="className2"></div>
```

还可以通过计算属性的方式
``` html
    <div :class="classObjectComputed"></div>
```
``` javascript
    computed: {
        classObjectComputed: function(){
            return{
                className1: true,
                className2: true
            }
        }
    }
```
渲染结果
``` html
    <div class="className1 className2"></div>
```

## 数组语法
v-bind:class="[]"，数组元素可以为表达式，也可以为字符串，如果是字符串则直接输出为样式名
``` html
    <div :class="[class1, class2, 'className3', active ? 'className4' : '']"></div>
```
``` javascript
    data: {
        class1: 'className1',
        class2: 'className2',
        active: true
    }
```
渲染结果
``` html
    <div class="className1 className2 className3 className4"></div>
```

也可以用数据对象的方式，解析的逻辑和对象语法一样
``` html
    <div :class="[{className1: 1 == 1, className2: 1 == 2}, 'className3' ]"></div>
```
渲染结果
``` html
    <div class="className1 className3"></div>
```

# 绑定 style
## 对象语法
在对象当中，CSS 的属性名要用驼峰式表达：fontSize 解析成 font-size
``` html
    <div :style="{color: color, fontSize: fontSize, backgroundColor: '#ccc'}"></div>
```
``` javascript
    data: {
        color: 'red',
        fontSize: '12px'
    }
```
渲染结果
``` html
    <div style="color: red, font-size: 12px; background-color: #ccc"></div>
```
## 数组语法
``` html
    <div :style="[styleObject, {backgroundColor: '#ccc'}]"></div>
```
``` javascript
    data: {
        styleObject: {
            color: 'red',
            fontSize: '12px'
        }
    }
```
渲染结果
``` html
    <div style="color: red, font-size: 12px; background-color: #ccc"></div>
```