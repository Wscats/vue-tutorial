# 事件修饰符
对事件添加一些通用的限制，比如阻止事件冒泡，Vue 对这种事件的限制提供了特定的写法，称之为修饰符
用法：v-on:事件.修饰符

```html
    <!--阻止事件冒泡.stop-->
    <div id="div1" class="stop" @click.stop="event1(1)">
    <!--使用事件捕获模式.capture-->
    <div id="div4" class="stop" @click.capture="event1(4)">
    <!--事件只作用本身.self，类似于已阻止事件冒泡-->
    <div id="div7" class="stop" @click.self="event1(7)">
    <!--阻止浏览器默认行为.prevent-->
    <a href="https://github.com/dk-lan" target="_blank" @click.prevent="prevent">dk's github</a>
    <!--只作用一次.once-->
    <a href="https://github.com/dk-lan" target="_blank" @click.once="prevent">dk's github</a>
    <!--修饰符可以串联.click.prevent.once-->
    <a href="https://github.com/dk-lan" target="_blank" @click.prevent.once="prevent">dk's github</a>
```
[事件修饰符效果预览](https://github.com/wscats/vue-erp/VueBasic/Modifiers/eventModifiers.html)

# 表单修饰符
