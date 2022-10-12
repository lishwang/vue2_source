import Scanner from './Scanner.js';
import nestTokens from './nestTokens.js';

export default function (templateStr) {
  // 实例化一个扫描器，构造的时候提供一个参数，这个参数就是模板字符串，也就是说这个扫描器就是针对这个模板字符串工作的
  let scanner = new Scanner(templateStr);
  let tokens = [];
  let works;
  while (scanner.seo()) {
    // 收集左双大括号之前的文字
    works = scanner.scanUtil('{{');
    tokens.push(['text', works.trim()]);
    // 略过左双大括号
    scanner.scan('{{');
    // 收集右双大括号之前的文字
    works = scanner.scanUtil('}}');
    if (works) {
      if (works.indexOf('#') === 0) {
        // 循环开始项
        tokens.push(['#', works.substring(1)]);
      } else if (works.indexOf('/') === 0) {
        // 循环结束项
        tokens.push(['/', works.substring(1)]);
      } else {
        // 搜集非循环项
        tokens.push(['name', works]);
      }
    }
    // 略过右双大括号
    scanner.scan('}}');
  }
  // 将tokens处理成要求的嵌套形式
  return nestTokens(tokens);
}