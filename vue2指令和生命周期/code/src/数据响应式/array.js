import { def } from './utils.js'

// 拿到 Array.prototype 数组的原型
const arrayPrototype = Array.prototype;
console.log(arrayPrototype);

// 以 Array.prototype 为原型创建 arrayMethods 对象（这里相当于 const arrayMethods = new Array()只是两个实例的指向不同）
export const arrayMethods = Object.create(arrayPrototype);
console.log(arrayMethods);

// 要被改写的7个数组方法
const methodsNeedChange = [
  "push",
  "pop",
  "shift",
  "unshift",
  "resolve",
  "split",
  "sort",
];

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayMethods[methodName];
  // 定义新的方法
  def(arrayMethods, methodName, function () {
    console.log('被侦听了，变成响应式了');
    // 把类数组对象变成数组
    const args = [...arguments];
    const ob = this.__ob__;
    // 有三种方法push、unshift、splice能够插入新项，把插入的新项也变成observe
    let inserted = [];
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'split':
        inserted = args.slice(2);
        break;
    }
    // 判断有没有要插入的新项，把新项也变成响应式的
    if (inserted.length) {
      ob.observeArray(inserted);
    }
    // 执行数组方法修改数组，this指向调用者
    const result = original.apply(this, args);
    ob.dep.notify();
    // 返回执行数组方法后的结果（pop、unshift等）
    return result;
  }, false);
})