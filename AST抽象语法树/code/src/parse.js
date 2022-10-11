

import parseAttrString from './parseAttrString';

// 将模板字符串转换成AST抽象语法树 的方法
export default function (templateStr) {
  // 指针
  var index = 0;
  // 模板字符串剩余部分
  var rest = templateStr;
  // 栈1，存储开始标签
  var stack1 = [];
  // 栈2，存储临时的AST抽象语法树
  var stack2 = [{ children: [] }];
  // 开始标签正则
  var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  // 结束标签正则
  var endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 文本内容正则
  var wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;

  while (index < templateStr.length - 1) {
    // 更新模板字符串剩余部分
    rest = templateStr.substring(index);
    // 识别当前模板字符串是不是以一个 开始标签 开头
    if (startRegExp.test(rest)) {
      // 拿到这个开始标签
      let tag = rest.match(startRegExp)[1];
      // 拿到开始标签上面的attr属性
      let attrString = rest.match(startRegExp)[2];
      debugger;
      console.log(attrString, 99)
      let attrStringArr = parseAttrString(attrString);
      console.log(attrStringArr, 9009)
      // 将 开始标签 推入到 栈1 中
      stack1.push(tag);
      // 将 这个开始标签字符串转换为AST树 然后推入到 栈2 中
      stack2.push({ 'tag': tag, 'children': [], 'attr': attrStringArr });
      // 指针后移
      let length = attrString ? attrString.length : 0
      index += tag.length + 2 + length;
    } else if (endRegExp.test(rest)) {
      // 识别当前模板字符串是不是以一个 结束标签 开头
      // 拿到这个结束标签
      let tag = rest.match(endRegExp)[1];
      // 拿到 栈1 的栈顶的 开始标签，并出栈
      let tag_start = stack1.pop();
      // 此时，tag 和 tag_start 一定是对应的标签，内容相同
      if (tag === tag_start) {
        // 拿到 栈2 的栈顶的 AST树，并出栈
        let obj_ast = stack2.pop();
        // 将这部分的AST树推入到 栈2 的栈顶的 AST树的children数组上
        stack2[stack2.length - 1].children.push(obj_ast);
      } else {
        // 如果tag 和 tag_start 不是对应的标签，就抛出一个错误
        throw new Error(tag_start + '标签没有闭合！！！')
      }
      index += tag.length + 3;
    } else if (wordRegExp.test(rest)) {
      // 识别当前模板字符串是不是以一个 文本内容 开头
      // 拿到这个文本内容
      let word = rest.match(wordRegExp)[1];
      // 判断这个文本内容是否为空
      if (!/^\s+$/.test(word)) {
        // 不全是空
        // console.log('检测到文字', word);
        // 把这个文本内容推入到 栈2 的栈顶的 AST树的children数组内
        stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 });
      }
      // 移动指针
      index += word.length;
    } else {
      index++;
    }
  }

  console.log(stack1, stack2);
  return stack2[0].children[0];
}