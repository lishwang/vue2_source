import { def } from './utils.js';
import defineReactive from './defineReactive.js';

// Observer类的目的：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object；
export default class Observer {
  constructor (value) {
    console.log('observer构造器', value)
    // 给实例添加 __ob__ 属性（不可枚举）
    def(value, '__ob__', this, false);
    this.walk(value)
  }
  // 遍历
  walk (value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
}