/**
 * 将tokens和data融合成DOM字符串返回
 */

import lookup from './lookup';
import parseArray from './parseArray';

export default function renderTemplate (tokens, data) {
  // DOM字符串
  let domStr = '';
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token[0] === 'text') {
      // 拼接旁白字符串
      domStr += token[1];
    } else if (token[0] === 'name') {
      // 在data中找到对应的属性值，然后拼接值，注意 a.b.c 的情况
      domStr += lookup(token[1], data);
    } else if (token[0] === '#') {
      // 递归处理循环
      domStr += parseArray(token, data);
    }
  }
  return domStr;
}