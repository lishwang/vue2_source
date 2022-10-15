/**
 * 此文件是利用snabbdom包来实现一个从h函数到虚拟节点再到真实DOM的一个过程，主要演示了利用snabbdom包将h函数的执行结果（虚拟节点）转换成真实DOM并且渲染在浏览器环境上
 */

import {
  init,
  classModule, // 类名模块
  propsModule, // props模块
  styleModule, // 样式模块
  eventListenersModule, // 事件监听模块
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

// 创建虚拟节点
const myVnode1 = h('a', { props: { href: 'http://baidu.com', target: '_blank' } }, '百度');
// 创建嵌套虚拟节点
const myVnode2 = h('ul', { class: 'ulululul' }, [
  h('li', 'A'),
  h('li', 'B'),
  h('li', 'C'),
]);
console.log(myVnode2, '此时已上树，是否上树根据 elm 属性判断，属性值为undefined表示未上树')

const container = document.getElementById("container");

// 让虚拟节点上树
patch(container, myVnode2)

