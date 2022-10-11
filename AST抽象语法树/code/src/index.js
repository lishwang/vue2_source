import parse from './parse';

var templateStr = `<div prop="ddd">
  <h3 class="aaa" prop="ddd" id="bbb">你好</h3>
  <ul id="bbb">
    <li title="ccc">A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>`;

// 调用 parse 函数，将模板字符串转换成AST抽象语法树（例如：下面的 aaa对象）
const ast = parse(templateStr);
console.log(ast);


// AST抽象语法树 形态
const aaa = {
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