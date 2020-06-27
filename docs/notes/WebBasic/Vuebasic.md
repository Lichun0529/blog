---
  title:Vue
---

##  一、Vue基础

###  1. 安装

最新稳定版 `npm install vue`

###  2. Vue实例

####  1.创建

` var vm = new Vue({  // 选项 }) `	

####  2.响应式系统

当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
**阻止响应：** 使用 `Object.freeze()` 

###  3. 生命周期钩子

在vm实例创建的过程中会经历实例的创建、挂载、更新和销毁四个阶段，在这个过程中同时会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

**创建阶段：**

####  1. beforeCreate() 

第一个生命周期函数，实例被完全创建出前会被调用，此时**data**和**methods**中的数据和方法都未初始化，不可调用。

####  2. created()

第二个生命周期函数，此时**data**和**methods**中数据和方法已经被初始化好，**data**和**methods**中的数据和方法最早只能在created生命周期中调用。

####  3. beforeMount()

第三个生命周期函数，模板已经在内存中编译完成，但是尚未渲染到页面中，beforeMount执行时页面中元素还没有被替换，只是之前的**模板字符串**。

####  4. mounted()

第四个生命周期函数，此时内存中模板已经挂在到页面中，用户可以看到渲染好的页面。mounted是实例创建期间最后一个生命周期函数，当执行完mounted就表示实例被完全创建好，进入到运行阶段，此时如果没有其他操作这个实例将在内存中不再变化。

**注：**如果某些插件要操作页面上的DOM节点，最早要在mounted中进行。

**运行阶段：**

####  5. beforeUpdate()

beforeUpdate执行时页面中显示内容还未改变，但data中数据已经改变。

####  6. updated()

updated执行时页面数据已和data中数据同步。

**销毁阶段：**

####  7.  beforeDestroy 

 当组件被销毁前调用，此时data中的数据和methos中的方法依然可以调用，通常用来做善后,比如计时器的关闭或第三方实例的删除 。

####  8.  destroyed  

当组件被销毁后调用，功能与beforeDestroy类似。

销毁方法：

1. 外部销毁：由组件外部因素控制销毁，例如使用`v-if`指令销毁等，此方法能销毁该组件的dom结构。
2. 内部销毁：组件内部使用` this.$destroy() `销毁，此方法 能销毁该组件的dom结构。

<img src="https://cn.vuejs.org/images/lifecycle.png" style="zoom:50%;" />

###  4. 模板语法

**数据双向绑定：**模板数据绑定到Vue对象，另外反方向数据也是绑定的。与DOM驱动的开发方式的区别。

DOM驱动(jQ)：DOM变化=>触发js监听事件=>事件中获取DOM的变化=>与后台交互=>根据返回结果更新DOM

Vue：DOM变化=>自动获取DOM的变化=>与后台交互=>自动更新DOM

![](/images/Vuebasic.assets\154994-20161224224448932-867233402.jpg)

####  模板中数据绑定的几种方式：

####    1. 插值表达式

使用“Mustache”语法 (双大括号)  ：`<span>Message: \{\{ msg \}\}</span>`

####  2.  v-text 指令

` <span v-text="msg"></span> `作用等于插值表达式

####  3. v-html指令

`<div v-html="html"></div>`

如果绑定的数据中含有html标签双大括号形式的数据绑定则会将标签直接渲染为普通字符，并不会解析为html标签，此时就需要v-html指令。

**注：** 只可对可信内容使用 HTML 插值，<span style="color:red">**绝不要**</span>对用户提供的内容使用插值。 

####  4. 给html原生属性绑定数据

 使用 v-bind指令：`  <div v-bind:id="dynamicId"></div>  `或简写为：`  <div :id="dynamicId"></div>  `

当作用在属性值为布尔型的属性上时如果属性值为 `null`、`undefined` 或 `false` 则被绑定的属性不会被渲染：

` <button v-bind:disabled="isButtonDisabled">Button</button> `

####  5. 在模板中使用JavaScript表达式

所有数据绑定方式都支持js表达式

```vue
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
​```
```

  每个绑定只能包含**单个表达式** 

```vue
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
​```
```

###  5.  computed 计算属性

通常我们会在模板中绑定表达式，模板是用来描述视图结构的。如果模板中的表达式存在过多逻辑，模板就会变得臃肿不堪，难以维护。为了简单逻辑，当某个属性依赖于其他属性的值时，我们可以使用计算属性。

在computed中可以定义一些计算属性，这个属性本质是一个方法，在使用这些属性时是把他们的名称当作属性使用，并不是当作方法调用。

**注1：**属性在使用时不要加（）去调用，直接当作属性调用即可
**注2：**计算属性的function内部任何用到的data中的数据发生变化则会立即重新计算
**注3：**计算属性的求值结果会被缓存起来方便下次调用,如果方法中任何数据都没有发生改变则不会重新计算

####  **1. 用法：**

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: {
        get:function () {
          // `this` 指向 vm 实例
          return this.message.split('').reverse().join('')
        },
        // 计算属性的 setter
        set:function () {
            this.message = 'NiHao'
        }
    }
  }
})
```

**getter: **用于获取计算后的结果，当没有setter时可以简写为 `reversedMessage：funciton （） {.....}`

**setter：**在setter中可以对被绑定的数据重新赋值，data中定义的数据也随之发生改变。

####  2. computed与methos的区别

 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的**响应式依赖**进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。 

**响应式依赖：**如果DOM中有一个插值表达式绑定了数据`Message`，计算属性`reversedMessage`中也同样`return`了`Message`，那么`Message`和`reversedMessage`就是响应式依赖关系，如果计算属性`reversedMessage`中返回了一个` Date.now() `那么他们之间就不是响应式依赖关系，因为` Date.now() `的值是实时改变的无法和`Message`双向绑定。

###  6. watch 侦听器

当被监听对象的值发生改变时会调用watch内部的函数，函数有两个参数，新的值和旧的值。当需要在数据变化时执行异步或开销较大的操作时使用watch。

####  1. 普通用法

```javascript
new Vue({
  el: '#root',
  data: {
    cityName: 'shanghai'
  },
  watch: {
    cityName(newName, oldName) {
      // ...
    }
  } 
})
```

或直接写一个监听处理函数，当每次监听到 cityName 值发生改变时，执行函数。也可以在所监听的数据后面直接加字符串形式的方法名： 

```javascript
methods:{
    nameChange(newName, oldName){
        // ...
    }
 },
watch: {
    cityName: 'nameChange'
    }
 } 
```

####  2. immediate 立即监听

当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。

比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。 

```javascript
watch: {
    cityName: {
    　　handler(newName, oldName) {
      　　// ...
    　　},
    　　immediate: true
    }
  }
```

普通用法中的函数其实就是在写这个handler方法中， immediate表示在watch中首次绑定的时候，是否执行handler，值为true则表示在watch中声明的时候，就立即执行handler方法，值为false，则和一般使用watch一样，在数据发生变化的时候才执行handler。 

####  3. deep 深度监听

假设被监听数据为一个对象： `cityName:{id:1,name:'shanghai'}`,此时侦听器无法监听到对象内部的`id`或者`name`值的变化，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。

**注:** 数组（一维、多维）的变化不需要通过深度监听，对象数组中对象的属性变化则需要deep深度监听。 

```javascript
new Vue({
  el: '#root',
  data: {
    cityName: {id: 1, name: 'shanghai'}
  },
  watch: {
    cityName: {
      handler(newName, oldName) {
      // ...
    },
    deep: true,
    immediate: true
    }
  } 
})
```

此时会给cityName的所有属性都加上这个监听器，当对象属性较多时，每个属性值的变化都会执行handler。如果只需要监听对象中的一个属性值，则可以做以下优化，使用字符串的形式监听对象属性： 

```javascript
watch: {
    'cityName.name': {
      handler(newName, oldName) {
      // ...
      },
      deep: true,
      immediate: true
    }
  }
```

###  7. class绑定

####  1. 对象语法

```html
<div
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```javascript
data: {
  isActive: true,
  hasError: false
}
```

 绑定的数据对象不必内联定义在模板里： 

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

绑定一个返回对象的计算属性:

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

####  2. 数组语法

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

三元表达式： 

```html
<div v-bind:class="[isActive ? activeClass : '']"></div>
```

 ```javascript
data: {
    isActive:true,
    activeClass: 'active',
}
 ```

数组语法中使用对象语法:

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

**注：** 当在一个自定义组件上使用 `class` 属性时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。 

###  8. style绑定

####  1. 对象语法

```html
<div v-bind:style="styleObject"></div>
```

```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

####  2. 数组语法

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

###  9. 条件渲染

####  1. v-if

 `v-if` 是一个指令，所以必须将它添加到一个元素上。如果想切换多个元素可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含` <template>` 元素。 

**注：** **不推荐**同时使用 `v-if` 和 `v-for`。 

####  2. v-else

 `v-if` 的“else 块” ，必须跟在 `v-if` 或者 `v-else-if` 后。

####  3.  v-else-if 

`v-if` 的“if else 块”，可以连续使用。

####  4. v-show

用法与v-if大致一样。

####  5. v-show与v-if的区别

**v-if初始渲染**

初始值为 **false** 组件**不会**渲染，生命周期钩子**不会**执行，**v-if** 的渲染是**惰性**的。
初始值为 **true** 时，组件会进行渲染，并依次执行 beforeCreate,created,beforeMount,mounted 钩子。

**v-if切换**

**false => true：**依次执行 beforeCreate,created,beforeMount,mounted 钩子。
**true => false：**依次执行 beforeDestroy,destroyed 钩子。



**v-show初始渲染**

**v-show**只是简单地给元素的 CSS 属性 `display`添加`none`。无论初始状态如何，组件都会渲染， 依次执行 beforeCreate,created,beforeMount,mounted 钩子，**v-show** 的渲染是**非惰性**的。 

**v-show切换**

对生命周期钩子无影响，切换时组件始终保持在 mounted 钩子。 

###  10. v-for 列表渲染

用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `(item , index) in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**，`index` 是当前项的索引，`index`参数可选用 。

**注：**在组件中使用`v-for`时必须加`key`，且`key`值只能为唯一数字或字符串。

####   1. 普通数组

```javascript
data:{
	list:[1,2,3]
}
```

```html
<div v-for="item in list">...</div>
```

####  2. 对象数组

```js
data:{
	arr:[
        {id:1,name:'user1'},
        {id:2,name:'user2'},
        {id:3,name:'user3'}
    ]
}
```

```html
<div v-for="(item,index) in arr">
	{{item.id}}---{{item.name}}
</div>
```

####  3. 对象

```javascript
data: {
    obj:{
        id:1,
        name:'Leo',
        gender:'male'
    }
}
```

```html
<div v-for="(value,key,index) in obj">
	value = {{value}}---key = {{key}}---index = {{index}}
</div>
```

####  4. 数字

```html
<div v-for="count in 10">
	{{count}}
</div>
```

###  11. 事件

可以用 `v-on`（简写为“@”） 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

####  1.监听事件

用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。  

```html
<button v-on:click="greet">Greet</button>
```

 用 JavaScript 直接调用方法 

```javascript
Vue实例名称.greet()
```

使用 `$event`访问原始DOM事件

```html
<button @click="warn('abc', $event)">Submit</button>
```

```javascript
methods:{
	warn(e){
		console.log(e)
	}
}
```

对象语法

```html
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

####  2. 事件修饰符

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 主要用于优化浏览器页面滚动的性能，让页面滚动更顺滑 -->
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<!-- 注：不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略 -->
<div v-on:scroll.passive="onScroll">...</div>
```

**注:** 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。 

####  3. 按键修饰符

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

你还可以通过全局 config.keyCodes 对象**自定义按键修饰符别名**：[对照表]( https://blog.csdn.net/qq_38128179/article/details/88974226 )

```javascript
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

**注：**keyCode 的事件用法**已经被废弃了**并可能不会被最新的浏览器支持。

####  4. 系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。 

- `.ctrl`

- `.alt`

- `.shift`

- `.meta`

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。 

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

鼠标按键修饰符会限制处理函数仅响应特定的鼠标按钮：

- `.left`
- `.right`
- `.middle`

###   12. v-modle

`v-model` 指令用于在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。 

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。需要通过 JavaScript 在组件的 `data` 选项中声明初始值。 

`v-model` 不会实时更新处理输入法组合文字的过程，需要使用 `input` 事件。 

####  1. 文本

```html
<input v-model="message" placeholder="edit me">
```

多行文本：

```html
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

**注：**文本域中使用插值表达式不会生效，需要使用`v-model`。

####  2. 选择

复选框：

```html
<input type="checkbox" id="checkbox" v-model="checked">
```

 多个复选框，绑定到同一个数组： 

```html
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

```javascript
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
```

单选按钮：

```html
 <input type="radio" id="one" v-model="picked">
```

单选选择框：

```html
<select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
```

多选选择框：

```html
 <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
```

```javascript
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```

与`v-for`结合使用：

```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```

```javascript
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

####  2. 值绑定

####  3. 修饰符

`.lazy`

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

`.number`

```html
<!-- 将用户输入的值转换为数值类型 -->
<input v-model.number="age" type="number">
```

`.trim`

```html
<!-- 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg">
```

###  13. 自定义指令

用于对普通 DOM 元素进行底层操作

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

局部指令注册方法与组件相似，组件中添加一个directive属性即可。

####  1. 钩子函数 

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

- `unbind`：只调用一次，指令与元素解绑时调用。

####  2. 参数

  指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。

- ```
  binding
  ```

  ：一个对象，包含以下属性：

  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

  **注：**除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

####  3. 动态指令

非动态：

```html
 <p v-pin="200">Stick me 200px from the top of the page</p>
```

```javascript
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample'
})
```

动态：

```html
 <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
```

```javascript
ue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```

####  4.对象指令值

指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```javascript
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

####  5. 函数简写

在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。

```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

###  14. 过滤器

自定义全局过滤器，局部过滤器创建方法与自定义指令类似

```javascript
Vue.filter('timeFilter',function(ctime){//用于时间格式转换过滤器
				var dt = new Date(ctime);
				var y = dt.getFullYear();
				var m = dt.getMonth()+1;// padStart填充字符串函数最大2位，以0填充
				var d = dt.getDate();
				var h = dt.getHours();
				var min = dt.getMinutes();
				var s = dt.getSeconds();
				return `${y}-${m}-${d}  ${h}:${min}:${s}` //模板字符串
			})
```

过滤器函数会接收表达式的值作为第一个参数

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

串联

```html
{{ message | filterA | filterB }} //message作为参数传入filterA中，然后结果作为参数传入filterB中
```

接收参数

```
{{ message | filterA('arg1', arg2) }}//message作为第一个参数，arg1作为第二个参数，以此类推
```

###  15. 插件

##  二、组件

组件是可复用的 Vue 实例，组件的出现是为了拆分Vue实例的代码量，能够让我们以不同的组件来区分不同的功能，需要什么功能调用什么组件即可。

组件与模块的区别：

模块化是从**代码逻辑角度**划分，方便分层开发，保证每个模块职能单一。

组件化是从**UI界面角度**划分，前端组件化方便UI组件的复用。

###  1. 组件基础

####  1. 模板基础格式

**定义：**

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () { //组件的data属性
    return {
      count: 0
    }
  },
  template: '<button >You clicked me </button>'//组件的template属性
})
```

**使用：**

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

template属性的值也可以是一个元素的id：

```javascript
template:'#com1'
```

然后在vm实例控制的区域外定义html结构：

```html
<div id="app"><com1></com1></div>
<template id="com1">
    <h3>这是组件</h3>
</template>
```

**注:** 

+ 一个组件的 `data` 选项必须是一个函数。
+ 组件中的模板必须由一个根元素包裹其他元素。

####  2. 定义组件名 

 **使用 kebab-case (短横线分隔命名)  :**

```javascript
Vue.component('my-component-name', { /* ... */ })
```

**使用 PascalCase (首字母大写命名):  **

```javascript
Vue.component('MyComponentName', { /* ... */ })
```

**注：**尽量不要使用驼峰命名法。

###  2. 组件注册

####  1. 全局注册

在Vue实例前定义组件:

```javascript
Vue.component(
    'component-a', { //组件名称
    	template: '<div>123</div>' //组件的模板属性
    })
Vue.component('component-c', { /* ... */ })
new Vue({ el: '#app' })
```

```html
<div id="app">
  <component-c></component-c>
</div>
```

此时在组件c中也可以使用组件

####  2. 局部注册

在Vue实例内声明一个components属性：

```javascript
new Vue({
  el: '#app',
  components: {
    'component-a': { //组件名称
        template: '<div>123</div>' //组件的模板属性
    }
  }
})
```

###   3. 单独封装一个组件

1.新建一个subcom.vue文件

2.在需要使用组件的页面引入组件

```javascript
import subcom from '../subcomponets/subcom.vue'
```

3.父组件中components属性下注册子组件

```javascript
components:{
	'subcom-box':subcom
}
```

4.使用组件

```html
<div id="app">
  <subcom-box></subcom-box>
</div>
```



###  4. 父组件通过 Prop 向子组件传递数据

####  1. 方法

props是组件的一个属性，可以在props中自定义一些属性，当一个值传递给props中的属性的时候，那么这个值就变成了组件实例的属性，可以当作data中数据一样操作和使用。

**接收：**

```javascript
Vue.component('blog-post', {
  props: ['title','id'],
  template: '<h3>{{ title }}</h3>'
})
```

**发送：**

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id" //可以使用v-bind发送动态的值
  v-bind:title="post.title + ' by ' + post.author.name"//也可以使用表达式
  v-bind="post" //也可以直接传入对象
></blog-post>
```

**注：**DOM中驼峰命名法不可用。

对象形式的props：

```javascript
props: {//属性的名称和值分别是 prop 各自的名称和类型
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

####  2. 单向数据流

prop中的数据流为单向的，父组件=>子组件，为防止子组件意外改变父级组件的状态**不应该在一个子组件内部改变 prop**。

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。**在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

   ```javascript
   props: ['initialCounter'],
   data: function () {
     return {
       counter: this.initialCounter
     }
   }
   ```

2. **这个 prop 以一种原始的值传入且需要进行转换。**在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

   ```javascript
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```

####  3. prop验证

####  4. 非 prop 的 attribute 

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。这些 attribute 会被添加到这个组件的根元素上。

###  5. 父组件调用子组件中的数据

####  1. 使用$emit的第二个参数抛出一个值

子组件中：

```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

父组件中：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

如果enlarge-text是一个方法那么`$event`的值将是这个方法的第一个参数

###  6. 子组件调用父组件中的方法

在父组件中给子组件添加自定义事件，并在事件中写下需要的操作

```html
<blog-post v-on:enlarge-text="Do something" ></blog-post>
```

在子组件中使用$emit触发上面自定义的事件

```html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

###  7. 组件中使用v-model

```html
<custom-input v-model="searchText"></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

```javascript
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

###  8. slot 插槽

###  9. 切换组件

使用component + is可以动态的切换组件

```html
<component v-bind:is="componentName"></component>
```

###  10. 动态组件 & 异步组件

####  1. keep-alive 动态组件

使用is切换组件时每次切换完成后上一个组件都会被销毁，因此上一个组件的状态信息等也会随之消失，keep-alive主要用于保留组件状态或避免重新渲染。

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

####  2. 异步组件

###  11. 过渡&动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

使用`<transition>`元素包裹需要过渡效果的元素：

```html
<transition name="fade">
	<p v-if="show">hello</p>
</transition>
```

`name`属性值为过度类名前缀，不添加`name`属性默认为v-

定义过渡效果：

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

####  1. 过渡类名

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。

4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

   ![](/images/Vuebasic.assets/transition.png)

####  2. JavaScript钩子实现动画

```html
<transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
    	<div class="ball" v-show="flag4"></div>
</transition>
```

```javascript
beforeEnter(el){
    //表示动画入场前，此时动画尚未开始，可以设置元素的初始样式
    el.style.transform = "translate(0,0)";//设置小球初始位置
}
```

**注：**当只用 JavaScript 过渡的时候，**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。否则，它们将被同步调用，过渡会立即完成。

####  3. 初始渲染过渡

```html
<transition appear>
  <!-- ... -->
</transition>
```

####  4. 渲染多个元素

当有**相同标签名**的元素切换时，需要通过 `key` attribute 设置唯一的值。

####  5. 过度模式

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

####  6. 多个组件过渡

使用动态组件

####  7. 状态过渡



##  三、vue-router 路由

###  1. 路由分类

**后端路由：**后端通过接收到的URL地址向前端分发对应的资源的过程

**前端路由：**在单页面应用程序中通过URL地址中(Hash) “#号”切换页面的方式。注：HTTP请求中不回包含Hash相关的内容

###  2. 使用方法

1.引入vue-router路由模块

2.创建一个路由对象,当导入路由模块后在window全局对象中就有了一个路由构造函数: VueRouter

```javascript
var routerObj = new VueRouter({
			//在new路由对象时候可以为构造函数传递匹配对象
			routes:[//路由匹配规则
				//每个路由规则都是一个对象，每个对象上必须有两个属性
				//属性1 path：表示监听哪个路由地址
				//属性2 component：表示如果路由匹配到前面的path则展示component属性对应的组件
				{path:'/login',component:login},//注：component的属性值只能为一个对象，不能为字符串形式的组件名，字符串形式的组件名仅用作<>内使用
				{path:'/register',component:register},
				// {path:'/',component:login}//设置默认展示组件（不推荐）
				{path:'/',redirect:'/login'}//重定向组件 (推荐)
			],
			linkActiveClass:'myactive'//自定义选中的路由样式激活类名
		})
```

3.将路由对象注册到vm实例，用来监听URL地址变化然后展示对应组件

```javascript
var vm = new Vue({
			el:'#app',
			data:{},
			methods:{},
			router:routerObj//3.将路由对象注册到vm实例，用来监听URL地址变化然后展示对应组件
		})
```

4.使用 router-link 组件来导航

```html
<router-link to="/login" tag="span">登录</router-link>
```

 `to` 属性表示目标路由的链接

 `tag` 属性用于决定`<router-link>`渲染成什么标签

5.使用router-view作为容器，router-view用于展示路由规则匹配到的组件，是一个占位符

```html
<router-view></router-view>
```

###  3. 路由传参

####  1. query

**发送：**

```html
<router-link to="/login?id=10&name=aa">登录</router-link>
```

**接收：**

```javascript
console.log(this.$route.query.id); //10
console.log(this.$route.query.name); //aa
```

query方式**不需要**修改路由规则

####  2. params方式

**发送：**

```html
<router-link to="/register/11/bb">注册</router-link>
```

**接收：**

```javascript
console.log(this.$route.params.id); //11
console.log(this.$route.params.name); //bb
```

params方式**需要**修改路由规则:

```javascript
routes:[
    {path:'/login',component:login},
    {path:'/register/:id/:name',component:register},//params方式需要修改路由规则
    {path:'/',redirect:'login'},
]
```

###  4. 路由嵌套

1.在路由规则中添加children属性

```javascript
routes:[
    {
        path:'/account',
        component:account,
        children:[//1.通过children属性设置子路由，子路由路径开头不可加 '/'，否则永远以根路径开始请求
            {path:'login',component:login},
            {path:'register',component:register},
        ]
    },
],
```

2.在父组件中添加子组件容器

```html
<router-view></router-view>
```

###  5. 命名路由视图

1.在路由匹配规则中使用component**s**属性为视图命名(注意不是component)

```javascript
routes:[
    {path:'/',components:{
        'default':header,//默认名称
        'left':leftBox,
        'main':mainBox
    }},
]
```

2.使用name属性匹配视图

```html
<div id="app">
    <router-view></router-view>
    <div class="container">
        <router-view name="left"></router-view>
        <router-view name="main"></router-view>
    </div>
</div>
```

##  四、 Vuex

用于存放组件数据的存储中心（仓库），如果组件间有需要共享的数据则可存放在Vuex中，以避免繁多的组件间传值
**配置方法：**	
1.安装 `npm install vuex --save`
2.导入`import Vuex from 'vuex'`
3.注册`Vue.use(Vuex)`
4.创建一个数据仓储对象`const store = new Vuex.Store({})`
5.挂在到VM实例:vm实例中添加store对象
**访问方法：**	 `this.$store.state.***`
**数据操作方法**： `this.$store.commit("***")`
**注意事项：**	

1. 如果需要操作state的值只能通过mutations提供的方法，把需要的操作写在mutations中的方法里，且方法第一个参数永远为state，不要用`this.$store.state.***`直接操作数据，因为一旦发生vuex中数据混乱不能快速定位到错误原因
2. mutations的函数参数列表中最多传两个参数
3. 如果state中的数据对外提供时候需要进行操作，则推荐用getters（作用和使用方法类似过滤器）：`this.$store.getters.***`
4. Vue实例中的放置数据的属性：

+ props：父组件传来的数据
+ data：组件内私有数据
+ Vuex：共享的数据

##  五、什么是Vue-cli

Vue官方提供的一个cli(脚手架)，用于快速创建一个基于webpack模板的项目

由来:require.js > webpack >Vue-cli

###  1. 安装

`npm install -g @vue/cli`

###  2. 创建一个项目

+ 命令行：`vue create hello-world`
+ 图形化界面：`vue ui`

###  3. 运行项目

第一步：`cd hello-world`
第二步：`npm run serve`

###  4. 快速原型开发

可以对单个文件进行开发而无需额外配置，适合进行快速原型开发，不适合实际项目开发。
需提前安装全局扩展：`npm install -g @vue/cli-service-global`

+ 运行 `vue serve`，则会启动一个本地服务
+ 运行 `vue build`，则打包输出包含html、js、css的文件