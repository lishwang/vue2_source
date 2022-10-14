import Dep from './Dep';

/**
 * watcher类 是一个中介，数据发生变化时通知watcher类中转，进而通知组件更新
 * 1、保存每次watcher的回调函数
 */
let uid = 0;
export default class Watcher {
  // 参考vue中的 $watch() 方法
  /**
   * @param {*} target 监听谁
   * @param {*} expression 监听什么属性（a.b.c.d）
   * @param {*} callback 回调函数
   */
  constructor (target, expression, callback) {
    debugger;
    console.log('wather');
    this.id = uid++;
    this.target = target;
    // 把expression这个表达式按照 点 来进行拆分,parsePath拿到的是一个函数，执行这个函数得到对应的属性值
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }
  update () {
    debugger;
    this.run();
  }
  get () {
    // 进入依赖收集阶段，让全局的Dep.target设置为watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    debugger;
    const obj = this.target;
    let value;
    // 只要能找，就一直找
    try {
      debugger;
      value = this.getter(obj);
      debugger;
    } finally {
      // 让全局的Dep.target设置为null，退出当前watcher的依赖收集阶段
      Dep.target = null;
    }
    return value;
  }
  run () {
    // 得到并且唤起
    this.getAndInvoke(this.callback);
  }
  getAndInvoke (cb) {
    const value = this.get();
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue);
    }
  }
};

function parsePath (str) {
  let segments = str.split('.');
  return obj => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}