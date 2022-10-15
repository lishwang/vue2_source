/**
 * 
 * @param {*} sel 表示选择器,div
 * @param {*} data 真实DOM上的属性和样式
 * @param {*} children 子元素
 * @param {*} text 表示文本 
 * @param {*} elm 对应的真正的DOM节点，如果是undefined就表示该虚拟DOM还没有上树
 * @returns 
 */
export default function (sel, data, children, text, elm) {
  return { sel, data, children, text, elm, key: data.key };
}