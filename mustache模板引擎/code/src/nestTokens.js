/**
 * 函数的功能是折叠tokens，将#和/之间的tokens能够整合起来，作为它的下标为2的项
 */

export default function nestTokens (tokens) {
  // 结果数组
  let nestedTokens = [];
  // 栈，用于存放token
  let sections = [];
  /**
   * 收集器，默认指向nestedTokens结果数组，处理tokens的过程中会改变其指向，
   * 当遇见#的时候，收集器会指向这个token的下标为2的新数组
   */
  let collector = nestedTokens;
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token[0]) {
      case '#':
        // 先将token这一项推入到结果数组nestedTokens中
        // nestedTokens.push(token);
        // 入栈
        sections.push(token);
        // 给token数组增加第三个元素并初始化为[]
        token[2] = [];
        // 改变收集器指向
        collector = token[2];
        break;
      case '/':
        // 出栈
        let section_pop = sections.pop();
        // 改变收集器指向
        collector = sections.length ? sections[sections.length - 1][2] : nestedTokens;
        collector.push(section_pop);
        break;
      default:
        // 没有匹配到的时候默认将token推入到结果数组collector
        collector.push(token);
    }
  }
  return nestedTokens;
}