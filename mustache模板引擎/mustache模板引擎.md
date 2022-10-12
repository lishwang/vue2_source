### mustache库简介

- [官方git](https://github.com/janl/mustache.js)

### mustache库的基本使用

- 必须要引入mustache库，可以在 [bootcdn](https://www.bootcdn.cn/) 上找到他
- mustache可以在node环境中使用，也可以在浏览器环境使用；

#### mustache的语法

##### 循环数组对象

- 前置条件：本次学习引用 mustache 的cdn方式引入，版本为 4.1.0；引入后，即可在全局使用 Mustache 这个对象；

- {{#arr}} 表示要循环数据中的arr数组，{{/arr}}循环结尾，注意：数据中的数组名称要与模板字符串中的一致
- **模板有两种存储方式：**
  - **方式一：写在  script  标签内，注意：type 只要不是 text/javascript 就不会被浏览器执行，因此可以写任意字符；获取存储的字符串时，只需要按照 id 获取元素，然后再拿到其 innerHTML 属性值即可**；
  - 方式二：写在模板字符串里；

```
<body>
  <div class="box"></div>
  <script src="jslib/mustache.js"></script>

  <!-- 模板写法二 -->
  <!-- 注意：type只要不是 text/javascript 就不会被浏览器执行，因此可以写任意字符 -->
  <script
    type="text/template"
    id="mytemplate"
  >
    <ul>
      {{#arr}}
        <li>
          <div>{{name}}的基本信息</div>
          <p>姓名：{{name}}</p>
          <p>性别：{{sex}}</p>
        </li>
      {{/arr}}
    </ul>
  </script>
  <script>
    console.log(Mustache);
    // 模板写法一：
    // {{#arr}} 表示要循环数据中的arr数组，{{/arr}}循环结尾
    var templateStr = `
    <ul>
      {{#arr}}
        <li>
          <div>{{name}}的基本信息</div>
          <p>姓名：{{name}}</p>
          <p>性别：{{sex}}</p>
        </li>
      {{/arr}}
    </ul>`;

    // 模板二获取：
    var mytemplateStr = document.getElementById('mytemplate').innerHTML;
    // 注意：数据中的数组名称要与模板字符串中的一致
    let data = {
      arr: [
        { 'name': 'xiaoming', 'sex': 'nan' },
        { 'name': 'xiaohong', 'sex': 'nv' }
      ]
    }
    /**
     * Mustache的render方法接收两个参数：
     * 参数一：模板字符串
     * 参数二：要渲染的数据
     * 返回值：循环过后的dom字符串
    */
    let domStr = Mustache.render(mytemplateStr, data);
    console.log(domStr);
    const boxDom = document.querySelector('.box');
    boxDom.innerHTML = domStr;
  </script>
</body>
```

##### 循环简单对象

```
<body>
  <div class="box"></div>
  <script src="jslib/mustache.js"></script>
  <script>
    console.log(Mustache);
    // {{#arr}} 表示要循环数据中的arr数组，{{/arr}}循环结尾
    var templateStr = `
    <h1>我今天买了一个{{app}}，好{{mood}}</h1>`;
    // 注意：数据中的数组名称要与模板字符串中的一致
    let data = {
      app: 'ipd',
      mood: 'happy'
    }
    /**
     * Mustache的render方法接收两个参数：
     * 参数一：模板字符串
     * 参数二：要渲染的数据
     * 返回值：循环过后的dom字符串
    */
    let domStr = Mustache.render(templateStr, data);
    console.log(domStr);
    const boxDom = document.querySelector('.box');
    boxDom.innerHTML = domStr;
  </script>
</body>
```

##### 循环简单数组

- 注意：循环模板字符串里面的 {{.}} ，其中的 . 就表示数组的每一项；

```
<body>
  <div class="box"></div>
  <script src="jslib/mustache.js"></script>
  <script>
    console.log(Mustache);
    // {{#arr}} 表示要循环数据中的arr数组，{{/arr}}循环结尾
    // 循环简单数组时，. 就表示数组的每一项
    var templateStr = `
    <ul>
      {{#arr}}
        <li>
          {{.}}
        </li>
      {{/arr}}
    </ul>`;
    // 注意：数据中的数组名称要与模板字符串中的一致
    let data = {
      arr: ['a', 'b', 'c']
    }
    /**
     * Mustache的render方法接收两个参数：
     * 参数一：模板字符串
     * 参数二：要渲染的数据
     * 返回值：循环过后的dom字符串
    */
    let domStr = Mustache.render(templateStr, data);
    console.log(domStr);
    const boxDom = document.querySelector('.box');
    boxDom.innerHTML = domStr;
  </script>
</body>
```

##### 循环复杂对象和数组嵌套

- 可以循环中使用循环 {{#xxx}} {{/xxx}}

```
<body>
  <div class="box"></div>
  <script src="jslib/mustache.js"></script>
  <script>
    console.log(Mustache);
    // {{#arr}} 表示要循环数据中的arr数组，{{/arr}}循环结尾
    var templateStr = `
    <ul>
      {{#arr}}
        <li>
          <div>{{name}}的基本信息</div>
          <p>姓名：{{name}}</p>
          <p>性别：{{sex}}</p>
          <p>爱好：
            <ol>
              {{#hobby}}
                <li>{{.}}</li>
              {{/hobby}}  
            </ol>  
          </p>
        </li>
      {{/arr}}
    </ul>`;
    // 注意：数据中的数组名称要与模板字符串中的一致
    let data = {
      arr: [
        { 'name': 'xiaoming', 'sex': 'nan', 'hobby': ['nnn', 'mmm', 'ppp'] },
        { 'name': 'xiaohong', 'sex': 'nv', 'hobby': ['t', 'b'] }
      ]
    }
    /**
     * Mustache的render方法接收两个参数：
     * 参数一：模板字符串
     * 参数二：要渲染的数据
     * 返回值：循环过后的dom字符串
    */
    let domStr = Mustache.render(templateStr, data);
    console.log(domStr);
    const boxDom = document.querySelector('.box');
    boxDom.innerHTML = domStr;
  </script>
</body>
```

##### 渲染布尔值

- {{#trueString}} 数据中的 trueString 为 true 时展示其包裹的内容，否则不展示

```
<body>
  <div class="box"></div>
  <script src="jslib/mustache.js"></script>
  <script>
    console.log(Mustache);
    // {{#trueString}} 数据中trueString为true时展示其包裹的内容，否则不展示
    var templateStr = `
      {{#trueString}}
        <h1>展示</h1>
      {{/trueString}};
      {{#falseString}}
        <h1>不展示</h1>
      {{/falseString}}`;
    // 注意：数据中的数组名称要与模板字符串中的一致
    let data = {
      'trueString': true,
      'falseString': false,
    }
    /**
     * Mustache的render方法接收两个参数：
     * 参数一：模板字符串
     * 参数二：要渲染的数据
     * 返回值：循环过后的dom字符串
    */
    let domStr = Mustache.render(templateStr, data);
    console.log(domStr);
    const boxDom = document.querySelector('.box');
    boxDom.innerHTML = domStr;
  </script>
</body>
```

### mustache库的原理

##### mustache将模板字符串与数据结合得到DOM字符串的过程

![](.\image\mustache将模板字符串与数据结合得到DOM字符串的过程.png)

##### 中间转换 tokens

![中间转换 tokens](.\image\中间转换 tokens.png)

##### mustache将模板字符串与数据结合得到DOM字符串的过程示例

![mustache将模板字符串与数据结合得到DOM字符串的过程示例](.\image\mustache将模板字符串与数据结合得到DOM字符串的过程示例.png)

##### 循环情况下的tokens

![](.\image\循环情况下的tokens.png)

##### 双重循环情况下的tokens

![双重循环情况下的tokens](.\image\双重循环情况下的tokens.png)

##### webpack的使用

![webpack的使用](.\image\webpack的使用.png)
