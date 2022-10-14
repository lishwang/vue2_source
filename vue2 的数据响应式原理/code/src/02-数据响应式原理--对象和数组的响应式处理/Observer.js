import { def } from './utils.js';
import defineReactive from './defineReactive.js';
import { arrayMethods } from './array.js';
import { observe } from './observe.js'

// Observer类的目的：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object；
export default class Observer {
  constructor (value) {
    console.log('observer构造器', value)
    console.log(this);
    // 给实例添加 __ob__ 属性（不可枚举）
    def(value, '__ob__', this, false);
    // 判断是数组还是对象
    if (Array.isArray(value)) {
      // 如果是数组，就将这个数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods);
      console.log(value);
      // 相当于执行了这一行
      // value.__proto__ = arrayMethods;
      // 将数组value变成observe
      this.observeArray(value);
    } else {
      // 如果value是对象
      this.walk(value);
    }
  }
  // 遍历
  walk (value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
  // 数组的特殊遍历
  observeArray (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      // 逐项进行observe
      observe(arr[i]);
    }
  }
}