// 真正去创建DOM节点，将vnode虚拟节点创建为真实的DOM元素，并且返回

export default function createElement (vnode) {
  console.log('目的是把虚拟节点', vnode, '创建为真实的DOM并返回');
  // 创建一个DOM节点，这个节点现在还是孤儿节点
  let domNode = document.createElement(vnode.sel);
  // 判断有子节点还是有文本（本方法不考虑文本和子节点共存的情况）
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 内部是 文本
    // 给这个孤儿节点增加内容
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 内部是子节点，要递归创建节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i];
      let chDom = createElement(ch);
      // 给这个孤儿节点增加内容
      domNode.appendChild(chDom);
    }
  }
  // 将创建好的孤儿节点（真实DOM）放在vnode上
  vnode.elm = domNode;
  // 返回创建的孤儿节点（真实DOM）
  return vnode.elm;
}