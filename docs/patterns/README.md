## 目录

- [组件声明](#组件声明)
  - [单文件组件 (SFC) - 最常用](#单文件组件-sfc---最常用)
  - [字符串模板 (ES6模板字面值)](#字符串模板-es6模板字面值)
  - [渲染函数](#渲染函数)
  - [JSX](#jsx)
  - [vue-class-component](#vue-class-component)
- [组件通信](#组件通信)
  - [Props 和 Events](#props和events)
- [组件事件处理](#组件事件处理)
- [组件条件渲染](#组件条件渲染)
  - [指令 (v-if / v-else / v-else-if / v-show)](#指令-v-if--v-else--v-else-if--v-show)
  - [JSX](#jsx-1)
- [动态组件](#动态组件)
  - [带is属性的组件](#带is属性的组件)
- [构建](#构建)
  - [基础构建](#基础构建)
  - [继承](#继承)
  - [混入](#混入)
  - [插槽 (默认)](#插槽-默认)
  - [具名插槽](#具名插槽)
  - [作用域插槽](#作用域插槽)
  - [渲染 Props](#渲染-props)
- [传递 Props](#传递-props)
- [高阶组件 (HOC)](#高阶组件-HOC)
- [依赖注入](#依赖注入)
  - [Provide / Inject](#provide--inject)
  - [@Provide / @Inject Decorator](#provide--inject-decorator)
- [错误处理](#错误处理)
  - [错误捕获钩子](#错误捕获钩子)
- [高效提示](#高效提示)
- [有帮助的链接](#有帮助的链接)
  - [风格指南](#风格指南)
  - [重构](#重构)
  - [状态管理](#状态管理)
  - [Vuex](#vuex)
  - [Mobx](#mobx)
  - [无渲染组件](#无渲染组件)
  - [文件结构](#文件结构)
  - [提示技巧](#提示技巧)
  - [路由](#路由)
  - [Anti Patterns](#anti-patterns)
  - [视频 / 音频](#视频--音频)
  - [仓库](#仓库)
  - [付费](#付费)
  - [Typescript](#typescript)
  - [Flowtype](#flowtype)
  - [GraphQL](#graphql)
  - [Misc](#misc)
- [全栈Vue图书](#全栈-vue-图书)

## 组件声明

### [单文件组件 (SFC)](https://vuejs.org/v2/guide/single-file-components.html) - 最常用

```html
<template>
  <button class="btn-primary" @click.prevent="handleClick">
    {{text}}
  </button>
</template>

<script>
export default {
  data() {
    return {
      text: 'Click me',
    };
  },
  methods: {
    handleClick() {
      console.log('clicked');
    },
  },
}
</script>

<style scoped>
.btn-primary {
  background-color: blue;
}
</style>
```

### 字符串模板 (ES6模板字面值)

```js
Vue.component('my-btn', {
  template: `
    <button class="btn-primary" @click.prevent="handleClick">
      {{text}}
    </button>
  `,
  data() {
    return {
      text: 'Click me',
    };
  },
  methods: {
    handleClick() {
      console.log('clicked');
    },
  },
});
```

### [渲染函数](https://vuejs.org/v2/guide/render-function.html)

```js
Vue.component('my-btn', {
  data() {
    return {
      text: 'Click me',
    };
  },
  methods: {
    handleClick() {
      console.log('clicked');
    },
  },
  render(h) {
    return h('button', {
        attrs: {
          class: 'btn-primary'
        },
        on: {
          click: this.handleClick,
        },
    }, this.text);
  },
});
```

### [JSX](https://vuejs.org/v2/guide/render-function.html#JSX)

```jsx
Vue.component('my-btn', {
  data() {
    return {
      text: 'Click me',
    };
  },
  methods: {
    handleClick() {
      console.log('clicked');
    },
  },
  render() {
    return (
      <button class="btn-primary" onClick={this.handleClick}>
        {{this.text}}
      </button>
    );
  },
});
```

### [vue-class-component](https://github.com/vuejs/vue-class-component)

```html
<template>
  <button class="btn-primary" @click.prevent="handleClick">
    {{text}}
  </button>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default MyBtn extends Vue {
  text = 'Click me';

  handleClick() {
    console.log('clicked');
  }
}
</script>

<style scoped>
.btn-primary {
  background-color: blue;
}
</style>
```

#### 参考:

* [Official - Single File Component](https://vuejs.org/v2/guide/single-file-components.html)
* [Official - Render Functions & JSX](https://vuejs.org/v2/guide/render-function.html)
* [7 Ways To Define A Component Template in VueJS](https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d)

## 组件通信

### Props和Events

基本上，vue组件遵循单向数据流，即props向下（[参见官方指南](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow) 和 event向上。
props是只读数据，因此无法从子组件更改props。
当props更改时，子组件将自动重新渲染（props是响应性数据源）。
子组件只能将event事件直接发送到父组件，因此父组件可以更改`data`，映射到子组件的`props`。

```html
<template>
  <button @click="$emit('click')">{{text}}</button>
</template>

<script>
export default {
  name: 'v-btn',
  props: {
    text: String,
  },
};
</script>
```

```html
<template>
  <v-btn :text="buttonText" @click="handleClick"></v-btn>
</template>

<script>
export default {
  data() {
    return {
      clickCount: 0,
      buttonText: 'initial button text',
    };
  },
  methods: {
    handleClick() {
      this.buttonText = `Button clicked ${++this.clickCount}`;
      console.log('clicked', this.buttonText);
    }
  }
};
</script>
```

#### 参考:

* [Official - Props](https://vuejs.org/v2/guide/components-props.html)
* [Vue.js Component Communication Patterns](https://alligator.io/vuejs/component-communication/)
* [Creating Custom Inputs With Vue.js](https://www.smashingmagazine.com/2017/08/creating-custom-inputs-vue-js/)
* [Vue Sibling Component Communication](https://vegibit.com/vue-sibling-component-communication/)
* [Managing State in Vue.js](https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87)
* [Vue.js communication part 2: parent-child components](https://gambardella.info/2017/09/13/vue-js-communication-part-2-parent-child-components/)

## 组件事件处理

#### 参考:

* [Official - Custom Events](https://vuejs.org/v2/guide/components-custom-events.html)
* [Leveraging Vue events to reduce prop declarations](https://itnext.io/leveraging-vue-events-to-reduce-prop-declarations-e38f5dce2aaf)
* [Vue.js Component Hooks as Events](https://alligator.io/vuejs/component-event-hooks/)
* [Creating a Global Event Bus with Vue.js](https://alligator.io/vuejs/global-event-bus/)
* [Vue.js Event Bus + Promises](https://medium.com/@jesusgalvan/vue-js-event-bus-promises-f83e73a81d72)

## 组件条件渲染

### 指令 (`v-if` / `v-else` / `v-else-if` / `v-show`)

`v-if`

```html
<h1 v-if="true">Render only if v-if condition is true</h1>
```

`v-if` and `v-else`

```html
<h1 v-if="true">Render only if v-if condition is true</h1>
<h1 v-else>Render only if v-if condition is false</h1>
```

`v-else-if`

```html
<div v-if="type === 'A'">Render only if `type` is equal to `A`</div>
<div v-else-if="type === 'B'">Render only if `type` is equal to `B`</div>
<div v-else-if="type === 'C'">Render only if `type` is equal to `C`</div>
<div v-else>Render if `type` is not `A` or `B` or `C`</div>
```

`v-show`

```html
<h1 v-show="true">Always rendered, but it should be visible only if `v-show` conditions is true</h1>
```

如果要有条件地渲染多个元素，
你可以在`<template>`元素上使用指令（`v-if` /`v-else` /`v-else-if` /`v-show`）。
请注意，`<template>`元素实际上并未渲染为DOM。 它是一个不可见的封装。

```html
<template v-if="true">
  <h1>All the elements</h1>
  <p>will be rendered into DOM</p>
  <p>except `template` element</p>
</template>
```

### JSX

如果在vue应用程序中使用JSX，则可以应用所有技术，例如`if else`和`switch case`语句以及`ternary`和`logical`运算符。

`if else` 声明

```jsx
export default {
  data() {
    return {
      isTruthy: true,
    };
  },
  render(h) {
    if (this.isTruthy) {
      return <h1>Render value is true</h1>;
    } else {
      return <h1>Render value is false</h1>;
    }
  },
};
```

`switch case` 声明

```jsx
import Info from './Info';
import Warning from './Warning';
import Error from './Error';
import Success from './Success';

export default {
  data() {
    return {
      type: 'error',
    };
  },
  render(h) {
    switch (this.type) {
      case 'info':
        return <Info text={text} />;
      case 'warning':
        return <Warning text={text} />;
      case 'error':
        return <Error text={text} />;
      default:
        return <Success text={text} />;
    }
  },
};
```

或者你可以使用 `object` 映射来简化 `switch case`

```jsx
import Info from './Info';
import Warning from './Warning';
import Error from './Error';
import Success from './Success';

const COMPONENT_MAP = {
  info: Info,
  warning: Warning,
  error: Error,
  success: Success,
};

export default {
  data() {
    return {
      type: 'error',
    };
  },
  render(h) {
    const Comp = COMPONENT_MAP[this.type || 'success'];

    return <Comp />;
  },
};
```

三元运算符

```jsx
export default {
  data() {
    return {
      isTruthy: true,
    };
  },
  render(h) {
    return (
      <div>
        {this.isTruthy ? (
          <h1>Render value is true</h1>
        ) : (
          <h1>Render value is false</h1>
        )}
      </div>
    );
  },
};
```

逻辑运算符

```jsx
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  render(h) {
    return <div>{this.isLoading && <h1>Loading ...</h1>}</div>;
  },
};
```
#### 参考

* [Official - Conditional Rendering](https://vuejs.org/v2/guide/conditional.html)
* [Difference Between v-if and v-show [With Video at End]](https://dzone.com/articles/difference-between-v-if-and-v-show-with-a-video)

## 动态组件

### 带is属性的组件

* [Example 1](https://jsfiddle.net/chrisvfritz/o3nycadu/)
* [Example 2](https://jsfiddle.net/chrisvfritz/b2qj69o1/)
* [Example 3](https://alligator.io/vuejs/dynamic-components/)

```html
<component :is="currentTabComponent"></component>
```

在上面的代码示例中，如果在`<component>`中呈现不同的组件，则将销毁渲染的组件。 如果你想让组件保持它们的实例而不在`<component>`标签中被销毁，你可以将`<component>`标签包装在`<keep-alive>`标签中，如下所示：

```html
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

#### 参考

* [Official - Dynamic Components](https://vuejs.org/v2/guide/components.html#Dynamic-Components)
* [Official - Dynamic & Async Components](https://vuejs.org/v2/guide/components-dynamic-async.html)
* [Dynamic Component Templates with Vue.js](https://medium.com/scrumpy/dynamic-component-templates-with-vue-js-d9236ab183bb)

## 构建

#### 库

* [Proppy - Functional props composition for components](https://proppyjs.com/)

### 基础构建

```html
<template>
  <div class="component-b">
    <component-a></component-a>
  </div>
</template>

<script>
import ComponentA from './ComponentA';

export default {
  components: {
    ComponentA,
  },
};
</script>
```

#### References
 
* [Official - Composing with Components](https://vuejs.org/v2/guide/#Composing-with-Components)

### 继承

当你想要继承单个vue组件时

```html
<template>
  <button class="button-primary" @click.prevent="handleClick">
    {{buttonText}}
  </button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  extends: BaseButton,
  props: ['buttonText'],
};
</script>
```

#### 参考:

* [Official - extends](https://vuejs.org/v2/api/#extends)
* [Extending VueJS Components](https://medium.com/js-dojo/extending-vuejs-components-42fefefc688b)

### 混入

```js
// closableMixin.js
export default {
  props: {
    isOpen: {
      default: true
    }
  },
  data: function() {
    return {
      shown: this.isOpen
    }
  },
  methods: {
    hide: function() {
      this.shown = false;
    },
    show: function() {
      this.shown = true;
    },
    toggle: function() {
      this.shown = !this.shown;
    }
  }
}
```

```html
<template>
  <div v-if="shown" class="alert alert-success" :class="'alert-' + type" role="alert">
    {{text}}
    <i class="pull-right glyphicon glyphicon-remove" @click="hide"></i>
  </div>
</template>

<script>
import closableMixin from './mixins/closableMixin';

export default {
  mixins: [closableMixin],
  props: ['text']
};
</script>
```

#### 参考:

* [Official - mixins](https://vuejs.org/v2/guide/mixins.html)
* [Practical use of Components and Mixins in Vue JS](http://www.qcode.in/practical-use-of-components-and-mixins-in-vue-js/)


### 插槽 (默认)

```html
<template>
  <button class="btn btn-primary">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VBtn',
};
</script>
```

```html
<template>
  <v-btn>
    <span class="fa fa-user"></span>
    Login
  </v-btn>
</template>

<script>
import VBtn from './VBtn';

export default {
  components: {
    VBtn,
  }
};
</script>
```

#### 参考:

* [Official - Slot Content](https://vuejs.org/v2/guide/components-slots.html#Slot-Content)
* [Understanding Component Slots with Vue.js](https://alligator.io/vuejs/component-slots/)
* [Composing Custom Elements With Slots And Named Slots](https://alligator.io/web-components/composing-slots-named-slots/)
* [Writing Abstract Components with Vue.js](https://alligator.io/vuejs/vue-abstract-components/)

### 具名插槽

BaseLayout.vue

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

App.vue

```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

#### 参考

* [Official - Named Slots](https://vuejs.org/v2/guide/components-slots.html#Named-Slots)

### 作用域插槽

```html
<template>
  <ul>
    <li
      v-for="todo in todos"
      v-bind:key="todo.id"
    >
      <!-- We have a slot for each todo, passing it the -->
      <!-- `todo` object as a slot prop.                -->
      <slot v-bind:todo="todo">
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      default: () => ([]),
    }
  },
};
</script>
```

```html
<template>
  <todo-list v-bind:todos="todos">
      <template slot-scope="{ todo }">
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template>
  </todo-list>
</template>

<script>
import TodoList from './TodoList';

export default {
  components: {
    TodoList,
  },
  data() {
    return {
      todos: [
        { todo: 'todo 1', isComplete: true },
        { todo: 'todo 2', isComplete: false },
        { todo: 'todo 3', isComplete: false },
        { todo: 'todo 4', isComplete: true },
      ];
    };
  },
};
</script>
```

#### 参考:

* [Official - Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)
* [Getting Your Head Around Vue.js Scoped Slots](https://medium.com/js-dojo/getting-your-head-around-vue-js-scoped-slots-281bf82a1e4e)
* [Understanding scoped slots in Vue.js](https://medium.com/corebuild-software/understanding-scoped-slots-in-vue-js-db5315a42391)
* [Scoped Component Slots in Vue.js](https://alligator.io/vuejs/scoped-component-slots/)
* [The Trick to Understanding Scoped Slots in Vue.js](https://adamwathan.me/the-trick-to-understanding-scoped-slots-in-vuejs/)
* [The Power of Scoped Slots in Vue](https://pineco.de/power-scoped-slots-vue/)
* [Building a list keyboard control component with Vue.js and scoped slots](https://medium.com/@tkwebdev/building-a-list-keyboard-control-component-with-vue-js-and-scoped-slots-c74db4fcf84f)

### 渲染 Props

在大多数情况下，您可以使用 `scoped` 插槽而不是渲染 `props`。 但是，在某些情况下它可能有用。

单文件组件(`SFC`)中

```html
<template>
  <div id="app">
    <Mouse :render="__render"/>
  </div>
</template>

<script>
import Mouse from "./Mouse.js";
export default {
  name: "app",
  components: {
    Mouse
  },
  methods: {
    __render({ x, y }) {
      return (
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      );
    }
  }
};
</script>
<style>
* {
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
```

`JSX`中

```js
const Mouse = {
  name: "Mouse",
  props: {
    render: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  methods: {
    handleMouseMove(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    }
  },
  render(h) {
    return (
      <div style={{ height: "100%" }} onMousemove={this.handleMouseMove}>
        {this.$props.render(this)}
      </div>
    );
  }
};

export default Mouse;
```

#### 参考:

* [Official - Render Functions & JSX](https://vuejs.org/v2/guide/render-function.html)
* [Leveraging Render Props in Vue](https://medium.com/@dillonchanis/leveraging-render-props-in-vue-7eb9a19c262d)
* [Use a Vue.js Render Prop!](https://medium.com/js-dojo/use-a-vue-js-render-prop-98880bc44e05)

## 传递 Props

有时，你可能希望将 `props`和 `listeners`传递给子组件，而无需声明所有子组件的 `props`。 
您可以在子组件中绑定 `$attrs` 和 `$listeners`，并将 [`inheritAttrs` 设置为 `false`](https://vuejs.org/v2/api/#inheritAttrs)（否则div和子组件都将接收属性）

子组件中:
```html
<template>
  <div>
    <h1>{{title}}</h1>
    <child-component v-bind="$attrs" v-on="$listeners"></child-component>
  </div>
</template>

<script>
export default {
  name: 'PassingPropsSample',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: 'Hello, Vue!'
    }
  }
};
</script>
```

在父组件中，你可以这样做:
```html
<template>
  <passing-props-sample
    title="Hello, Passing Props"
    childPropA="This props will properly mapped to <child-component />"
    @click="handleChildComponentClick"
  >
  </passing-props-sample>
</template>

<script>
import PassingPropsSample from './PassingPropsSample';

export default {
  components: {
    PassingPropsSample
  },
  methods: {
    handleChildComponentClick() {
      console.log('child component clicked');
    }
  }
};
</script>
```

#### 参考:

* [Transparent Wrapper Components in Vue](https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html)

## 高阶组件 (HOC)

#### 参考:

* [Higher Order Components in Vue.js](https://medium.com/bethink-pl/higher-order-components-in-vue-js-a79951ac9176)
* [Do we need Higher Order Components in Vue.js?](https://medium.com/bethink-pl/do-we-need-higher-order-components-in-vue-js-87c0aa608f48)
* [Higher-Order Components in Vue.js](https://medium.com/tldr-tech/higher-order-components-in-vue-js-38b500c6d49f)

## 依赖注入

Vue支持依赖/注入机制，无论组件层次结构有多深，只要它们位于同一父链中，就可以将`object`提供给它的所有后代。 请注意，`provide`和`inject`绑定不是响应式的，除非你传递一个观察对象。

```html
<parent-component>
  <child-component>
    <grand-child-component></grand-child-component>
  </child-component>
</parent-component>
```

在上面的示例组件层次结构中，为了从`parent-component`派生数据，您应该将数据（对象）作为`props`传递给`child-component`和`grand-child-component`。 但是，如果`parent-component``提供`数据（对象），`grand-child-component`只能从`parent-component`定义`inject`提供的对象。

#### 参考:

* [Official API](https://vuejs.org/v2/api/#provide-inject)
* [Official Guide](https://vuejs.org/v2/guide/components-edge-cases.html#Dependency-Injection)
* [Component Communication](https://alligator.io/vuejs/component-communication/#provide--inject)
* [Dependency Injection in Vue.js App with TypeScript](https://blog.kloud.com.au/2017/03/22/dependency-injection-in-vuejs-app-with-typescript/)

### Provide / Inject

```js
// ParentComponent.vue

export default {
  provide: {
    theme: {
      primaryColor: 'blue',
    },
  },
};
```

```html
// GrandChildComponent.vue

<template>
  <button :style="{ backgroundColor: primary && theme.primaryColor }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  inject: ['theme'],
  props: {
    primary: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
```

### [@Provide / @Inject Decorator](https://github.com/kaorun343/vue-property-decorator)

```js
// ParentComponent.vue

import { Component, Vue, Provide } from 'vue-property-decorator';

@Component
export class ParentComponent extends Vue {
  @Provide
  theme = {
    primaryColor: 'blue',
  };
}
```

```html
// GrandChildComponent.vue

<template>
  <button :style="{ backgroundColor: primary && theme.primaryColor }">
    <slot></slot>
  </button>
</template>

<script>
import { Component, Vue, Inject, Prop } from 'vue-property-decorator';

export class GrandChildComponent extends Vue {
  @Inject() theme;

  @Prop({ default: true })
  primary: boolean;
};
</script>
```

## 错误处理

### 错误捕获钩子

```js
export default {
  name: 'ErrorBoundary',
  data() {
    return {
      error: false,
      errorMessage: '',
    };
  },
  errorCaptured (err, vm, info) {
    this.error = true;
    this.errorMessage = `${err.stack}\n\nfound in ${info} of component`;

    return false;
  },
  render (h) {
    if (this.error) {
      return h('pre', { style: { color: 'red' }}, this.errorMessage);
    }

    return this.$slots.default[0]
  }
};
```

```
<error-boundary>
  <another-component/>
</error-boundary>
```

#### Examples

* [Example 1](https://jsfiddle.net/Linusborg/z84wspcg/)

#### 参考

* [Handling Errors in Vue with Error Boundaries](https://medium.com/@dillonchanis/handling-errors-in-vue-with-error-boundaries-91f6ead0093b)

## 高效提示

watch on create

```js
// don't
created() {
  this.fetchUserList();
},
watch: {
  searchText: 'fetchUserList',
}
```

```js
// do
watch: {
  searchText: {
    handler: 'fetchUserList',
    immediate: true,
  }
}
```
