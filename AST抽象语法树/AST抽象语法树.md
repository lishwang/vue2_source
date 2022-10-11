### AST抽象语法树

##### 作用：

编译过程中把vue的模板语法直接变成正常的HTML语法比较困难，因此先将vue的模板语法变成AST抽象语法树，然后在变成HTML语法；

##### 本质：

AST抽象语法树本质上就是一个JS对象，同样vue也会以字符串的视角来解析我们所写的模板DOM结构；

##### AST抽象语法树 与 虚拟节点 的关系

- 注意：AST抽象语法树并不直接生成虚拟节点，AST抽象语法树的产物是渲染函数（h函数），h函数的执行形成了虚拟节点，虚拟节点进行patch操作（diff算法）最终渲染在界面上；AST抽象语法树并不会执行diff算法；

##### 从模板DOM到渲染到界面上的过程图解

![从模板DOM到渲染到界面上的过程图解](.\image\从模板DOM到渲染到界面上的过程图解.png)

##### AST抽象语法树的形态

```
// AST抽象语法树 形态
{
  "tag": "div",
  "attr": [{ "name": "class", "value": "aaa bbb" }, { "name": "id", "value": "cc" }],
  "children": [
    {
      "tag": "h3",
      "attr": [],
      "children": [
        {
          "text": "你好",
          "type": 3
        }
      ]
    },
    {
      "tag": "ul",
      "attr": [],
      "children": [
        {
          "tag": "li",
          "attr": [],
          "children": [
            {
              "text": "A",
              "type": 3
            }
          ]
        },
        {
          "tag": "li",
          "attr": [],
          "children": [
            {
              "text": "B",
              "type": 3
            }
          ]
        },
        {
          "tag": "li",
          "attr": [],
          "children": [
            {
              "text": "C",
              "type": 3
            }
          ]
        }
      ]
    }
  ]
}
```

