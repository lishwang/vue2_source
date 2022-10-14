import { observe } from './observe.js';


var obj = {
  a: {
    aa: {
      aaa: 5
    }
  },
  b: 2,
  c: [1, 2, 3]
};

// 调用observe方法，侦听obj的属性，将obj变成响应式的
observe(obj);

obj.b = 10;
obj.a.aa.aaa++
obj.c.push(5);
obj.c.splice(2, 1, [5, 6]);
console.log(obj.c)