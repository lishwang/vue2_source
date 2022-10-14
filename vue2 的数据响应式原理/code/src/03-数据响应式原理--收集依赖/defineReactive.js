import Dep from './Dep.js';
import { observe } from './observe.js';

export default function defineReactive (data, key, val) {
  // val闭包中的dep
  const dep = new Dep();
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
      debugger;
      console.log('你试图访问obj的' + key + '属性');
      // 如果现在处于依赖收集阶段，就收集依赖
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          // 对象内层属性也要收集依赖
          childOb.dep.depend();
        }
      }
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
      // 发布订阅模式，通知dep
      dep.notify();
    }
  })
}