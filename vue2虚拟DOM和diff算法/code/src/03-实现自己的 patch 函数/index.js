import h from './mySnabbdom/h';
import patch from './mySnabbdom/patch';

// vnode 中有文本节点
const vnode1 = h('ul', {}, [
  h('li', {}, 'a'),
  h('li', {}, 'b'),
  h('li', {}, 'ccc'),
  h('li', {}, 'd33ddd'),
]);

// vnode 中有子节点
const vnode2 = h('ul', {}, [
  h('li', { key: 'c' }, 'ccc'),
  h('li', { key: 'f' }, 'fff'),
  h('li', { key: 'd' }, 'd33ddd'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'g' }, 'ggg'),
  h('li', { key: 'b' }, 'b'),
]);
console.log(vnode1);

const container = document.getElementById('container');

patch(container, vnode1);

const btn = document.getElementById('changeDom');
btn.onclick = function () {
  patch(vnode1, vnode2);
}