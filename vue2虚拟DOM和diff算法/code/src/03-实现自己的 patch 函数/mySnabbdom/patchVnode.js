
import updateChildren from './updateChildren.js';
import createElement from './createElement.js';

export default function (oldVnode, newVnode) {
  // 1、oldVnode 和 newVNode 是同一个对象
  if (oldVnode === newVnode) return;
  // 2、newVNode有text属性，没有children属性
  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children && newVnode.children.length === 0)) {
    // 2.1、如果newVNode的text属性值和oldVNode的text的属性值相同，且oldVNode也没有children属性时，直接返回
    if (newVnode.text === oldVnode.text) {
      return;
    } else {
      // 2.2、newVnode的text属性和oldVnode的text属性值不相同，直接写入旧的elm中即可，不管旧的elm中有什么，都会被直接删掉；
      oldVnode.elm.innerText = newVnode.text;
    }
  }
  // 3、oldVnode中有text属性，没有children属性
  if (oldVnode.text !== undefined && (oldVnode.children === undefined || oldVnode.children && oldVnode.children.length === 0)) {
    console.log('oldVnode中有text属性，没有children属性');
    // 3.1、清空oldVnode中的text
    oldVnode.elm.innerHTML = '';
    // 3.2、把newVnode中的children转换成元素添加旧节点的DOM中
    let dom = createElement(newVnode);
    oldVnode.elm.appendChild(dom);
  } else {
    // 4、最复杂的情况，新旧节点都有children，递归采用patch对新旧vnode的children节点做diff算法
    updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
  }
}