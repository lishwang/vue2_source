import vnode from './vnode';

/**
 * h() 函数可以接收的参数为1-3个
 * 情况1：h('div')
 * 情况3：h('div', {})
 * 情况2：h('div', '文字')
 * 情况4：h('div', [])
 * 情况5：h('div', h())
 * 情况6：h('div', {}, '文字')
 * 情况7：h('div', {}, [])
 * 情况8：h('div', {}, h())
 */

// 本文件编写一个低配版的h函数，要求必须接收三个参数，真实的h函数可以接收1-3个参数不等；
/**
 * 
 * @param {*} sel 选择器
 * @param {*} data 属性和样式
 * @param {*} c 文本（string/number）或者子元素（[]/h()）
 */
export default function (sel, data, c) {
  // 检查参数的个数
  if (arguments.length !== 3) {
    throw new Error('当前为低配版h函数，仅支持传入3个参数！！！')
  }
  // 检查c参数的类型
  if (typeof c === 'string' || typeof c === 'number') {
    // 情况6
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 情况7
    let children = [];
    // 遍历c数组，收集子节点的h函数
    for (let i = 0; i < c.length; i++) {
      // 检查数组中的没一项是否都是一个h函数
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组中有项不是h函数')
      }
      // 不需要执行c[i]()，因为在数组中的每一项本来就是h(...)，此时只需要收集到children中即可
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 情况8
    // 传了一个h函数，相当于只有一个子节点，直接把它放在children数组中收集起来返回vnode即可
    let children = [c]
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error('传入的第三个参数不满足要求！！！')
  }
}