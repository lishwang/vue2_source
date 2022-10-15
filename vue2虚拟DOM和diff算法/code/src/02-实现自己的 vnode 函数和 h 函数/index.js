import h from './mySnabbdom/h';

let vnode = h('div', { 'class': 'aaa' }, [
  h('span', {}, '哈哈'),
  h('span', {}, '嘻嘻'),
])
console.log(vnode);