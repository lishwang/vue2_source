/**
 * 把依赖收集的代码封装成一个Dep类，这个Dep类用来管理依赖，每个Observer的实例成员中都有一个Dep的实例
 */
let uid = 0;
export default class Dep {
  constructor () {
    console.log('dep')
    this.id = uid++;
    // 用数组存储自己的订阅者（即：watcher的实例）
    this.subs = [];
  }
  // 添加订阅
  addSub (sub) {
    this.subs.push(sub);
  }
  // 添加依赖
  depend () {
    // Dep.target就是一个我们自己指定的全局的位置，你用window.target也行，只要是全局唯一，没有歧义就行
    // getter函数中从全局唯一的地址读取正在读取数据的watcher，并把这个watcher收集到dep当中
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  notify () {
    console.log('notify');
    // 浅克隆一份
    const subs = this.subs.slice();
    for (let i = 0, len = subs.length; i < len; i++) {
      subs[i].update();
    }
  }
}