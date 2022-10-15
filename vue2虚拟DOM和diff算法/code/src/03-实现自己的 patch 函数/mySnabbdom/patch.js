import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';

export default function (oldVnode, newVnode) {
  console.log(oldVnode, newVnode)
  // 判断传入的第一个参数是真实DOM节点还是虚拟节点（真实DOM节点没有选择器sel属性）
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 真实DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  // 判断oldVnode和newVnode是不是同一个节点（同一个节点：key相同且选择器相同）
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 精细化比较
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一个节点，暴力删除旧的节点，插入新的节点
    // 拿到创建的孤儿节点（真实DOM）
    let newVnodeElm = createElement(newVnode);
    if (oldVnode.elm.parentNode && newVnodeElm) {
      // 将这个孤儿节点（真实DOM）插入在旧DOM节点之前
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
      // 删除旧节点
      oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
  }
}