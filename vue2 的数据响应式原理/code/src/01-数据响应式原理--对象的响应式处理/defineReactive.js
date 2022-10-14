import { observe } from './observe.js';

export default function defineReactive (data, key, val) {
  console.log('defineReactive', key)
  if (arguments.length === 2) {
    val = data[key];
  }
  // 内层嵌套属性也要进行observe，至此形成递归，这个递归不是函数自己调用自己，而是多个函数、类循环调用；
  let childOb = observe(val);
  Object.defineProperty(data, key, {
    // 可枚举（for循环遍历）
    enumerable: true,
    // 可以被配置，比如可以被delete
    configurable: true,
    // getter
    get () {
      console.log('你试图访问obj的' + key + '属性');
      return val;
    },
    // setter
    set (newValue) {
      console.log('你试图改变obj的' + key + '属性', newValue);
      if (val === newValue) {
        return;
      }
      val = newValue;
      // 当设置了新值，这个新值也要被observe
      childOb = observe(newValue);
    }
  })
}