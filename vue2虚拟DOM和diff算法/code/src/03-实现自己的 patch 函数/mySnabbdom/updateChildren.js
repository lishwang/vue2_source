
import patchVnode from './patchVnode';
import createElement from './createElement';

/**
 * @param {*} parentElm 父节点
 * @param {*} oldCh 旧 子节点children
 * @param {*} newCh 新 子节点children
 */
export default function updateChildren (parentElm, oldCh, newCh) {
  let oldStartIdx = 0; // 旧前
  let newStartIdx = 0; // 新前
  let oldEndIdx = oldCh.length - 1; // 旧后
  let newEndIdx = newCh.length - 1; // 新后

  let oldStartVnode = oldCh[0]; // 旧前 节点
  let newStartVnode = newCh[0]; // 新前 节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧后 节点
  let newEndVnode = newCh[newEndIdx]; // 新后 节点

  let keyMap = null; // 用于存储旧节点的key以及对应的下标

  /**
   * 循环规则：
   * 新前与旧前；
   * 新后与旧后；
   * 新后与旧前，需要移动节点，将旧前指向的节点移动到旧后的后面，并将这个旧前节点标记为undefined；
   * 新前与旧后，需要移动节点，将旧后指向的节点移动到旧前的前面，并将这个旧后节点标记为undefined；
   * 
   * 详细：先循环对比 新前与旧前是不是同一个节点，如果是，就对比patch，然后新前与后前指针后移，继续对比新前与
   * 后前，直到新前与旧前不是同一节点；然后循环对比 新后与旧后是不是同一节点，如果是，就patch，然后新后与
   * 旧后指针前移，直到新后与旧后不是同一节点；然后再循环对比 新后与旧前是不是同一节点，如果是，就patch，
   * 然后新后指针前移，旧前指针后移，需要移动节点，将旧前指向的节点移动到旧后的后面，并将旧前标记为undefined；
   * 直到新后与旧前不是同一节点；然后再循环对比 新前与旧后是不是同一节点，如果是，就patch，然后新前节点
   * 后移，旧后节点前移，再将旧后指向的节点移动到旧前的前面，并将旧后节点标记为undefined；
   * while循环结束的标志是 新前指针大于新后指针，或者旧前指针大于旧后指针；
   * 
   * while循环结束后：
   * 如果旧节点有剩余，就删除旧节点；
   * 如果新节点有剩余，就挂载新节点；
   * 如果新旧节点都有剩余，就循环旧节点，在旧节点中遍历查找新节点，如果是同一节点，就patch，然后将这个
   * 旧节点标记为undefined，剩余的旧节点删除，剩余的新节点挂载；
   */
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('★★★★★');
    // 先略过已经标记为undefined的节点
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(newStartVnode, oldStartVnode)) {
      // 新前 与 旧前 是同一个节点
      console.log('★ 新前 与 旧前 是同一个节点');
      // 同一个节点进行patch对比
      patchVnode(oldStartVnode, newStartVnode);
      // 新前 与 旧前 移动位置，并且指针后移
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(newEndVnode, oldEndVnode)) {
      // 新后 与 旧后 是同一节点
      console.log('★ 新后 与 旧后 是同一节点');
      // 同一个节点进行patch对比
      patchVnode(oldEndVnode, newEndVnode);
      // 新后 与 旧后 移动位置，并且指针前移
      newEndVnode = newCh[--newEndIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (checkSameVnode(newEndVnode, oldStartVnode)) {
      // 新后 与 旧前 是同一节点
      console.log('★ 新后 与 旧前 是同一节点');
      // 同一个节点进行patch对比
      patchVnode(oldStartVnode, newEndVnode);
      // 如何移动节点？？ 只要你插入一个已经在DOM树上的节点，它就会被移动；
      // 需要移动节点，将旧前指向的节点移动到旧后的后面，并将这个旧前节点标记为undefined；
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      // 新后 与 旧后 移动位置，并且指针前移
      newEndVnode = newCh[--newEndIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 旧后 与 新前 是同一节点
      console.log('★ 旧后 与 新前 是同一节点');
      // 同一个节点进行patch对比
      patchVnode(oldEndVnode, newStartVnode);
      // 需要移动节点，将旧后指向的节点移动到旧前的前面，并将这个旧后节点标记为undefined；
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // 新后 与 旧后 移动位置，并且指针前移
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 四种循环规则都没命中，此时拿到新节点的newStartVnode在遍历节点的key，在旧节点中找与newStartVnode的key相同的项（同一节点）；
      // 先将旧节点中的key与下标index存储到keyMap中缓存
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i < oldEndIdx; i++) {
          const key = oldCh[i] && oldCh[i].key;
          if (key) {
            keyMap[key] = i;
          }
        }
      }
      // 寻找当前的新节点newStartVnode在旧节点中映射的位置
      const idxInOld = keyMap[newStartVnode.key];
      // 如果没有找到，这个新节点就是全新的项，就需要创建后插入；如果找到了，就只需要patch并在旧节点中移动位置
      if (idxInOld) {
        console.log('找到了')
        // 如果找到了，就只需要patch并在旧节点中移动位置
        // 拿到这个相同节点的旧节点
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 将旧节点数组中的这一相同节点标记为undefined
        oldCh[idxInOld] = undefined;
        // 将这个相同节点的旧节点插入到旧节点的开始节点（旧前）之前
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      } else {
        console.log('新节点')
        // 如果没有找到，这个新节点就需要创建后插入
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      }
      // 指针移动，更新newStartVnode
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // while 循环结束：
  // 继续处理剩余节点
  if (newStartIdx <= newEndIdx) {
    console.log('★ new新节点还没有处理完');
    // oldCh处理完了，newCh还有剩余，将剩余的新节点先转换为真实DOM，然后追加到 newEndIdx+1 的前面，如果为null，相当于appendChild
    // 场景：新节点 相当于 旧节点中间插入了节点
    // const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null，就会自动排到队尾去，此时相当于appendChild
      // before 如果为null，相当于appendChild(xxx)
      // createElement(newCh[i]): 新节点都是虚拟节点，都没有上树，没有elm属性；因此需要调用createElement将虚拟节点创建成真实的DOM
      // 旧节点都已经上树，都存在elm属性（DOM元素）；
      parentElm.insertBefore(createElement(newCh[i]), oldStartVnode?.elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('★ old旧节点还没有处理完');
    // newCh处理完了，oldCh还有剩余，将剩余的旧节点从父元素上移除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      oldCh[i] && parentElm.removeChild(oldCh[i].elm);
    }
  }
}

// 是否是同一个节点
function checkSameVnode (a, b) {
  return a.sel === b.sel && a.key === b.key;
}