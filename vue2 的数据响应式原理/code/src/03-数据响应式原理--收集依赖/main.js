import { observe } from './observe.js';
import Watcher from './Watcher.js';


var obj = {
  a: {
    aa: {
      aaa: 5
    }
  },
  b: 2,
  c: [8, 1, 2, 3]
};

// 调用observe方法，侦听obj的属性，将obj变成响应式的
observe(obj);
let app = document.getElementById('app');
let btn = document.getElementById('btn');
app.innerText = obj.c;
// app.innerText = obj.a.aa.aaa;

btn.onclick = () => {
  new Watcher(obj, 'c', val => {
    console.log('☆☆☆☆☆☆☆☆☆☆☆☆☆', val)
    debugger;
    app.innerText = obj.c;
  })
  debugger;
  obj.c.split(0, 1); // 不是响应式的
  // obj.c.sort(); // 是响应式的
  // obj.c.slice(0, 1); // 不是响应式的
  // obj.c.push(66); // 是响应式的
  // obj.c = [66, 99]; // 是响应式的

  // debugger
  // new Watcher(obj, 'a.aa.aaa', val => {
  //   console.log('☆☆☆☆☆☆☆☆☆☆☆☆☆', val)
  //   app.innerText = obj.a.aa.aaa;
  // })
  // debugger;
  // obj.a.aa.aaa = 88;
};
console.log(obj);
