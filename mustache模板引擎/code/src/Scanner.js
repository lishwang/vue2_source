/**
 * 扫描器类
 */
export default class Scanner {
  constructor (templateStr) {
    // 指针
    this.pos = 0;
    // 存储一份完整的字符串
    this.templateStr = templateStr;
    // 存储当前剩余字符串
    this.tail = templateStr;
  }

  // 功能弱，就是走过指定内容，没有返回值
  scan (tag) {
    if (this.tail.indexOf(tag) === 0) {
      // 指针后移
      this.pos += tag.length;
      // 更新剩余字符串
      this.tail = this.templateStr.substring(this.pos);
    }
  }

  // 让指针进行扫描，直达遇到指定内容，并且能够返回结束之前路过的内容
  scanUtil (stopTag) {
    // 记录执行本方法的时候的pos值
    let startPos = this.pos;
    // 当剩余字符串的开头不是stopTag的时候，就说明还没有扫描到stopTag
    while (this.tail.indexOf(stopTag) !== 0 && this.pos < this.templateStr.length) {
      console.log('☆')
      // 指针后移
      this.pos++;
      // 更新剩余字符串
      this.tail = this.templateStr.substring(this.pos);
    }
    // 返回这个函数结束之前路过的内容
    return this.templateStr.substring(startPos, this.pos);

  }

  seo () {
    return this.pos < this.templateStr.length
  }
}