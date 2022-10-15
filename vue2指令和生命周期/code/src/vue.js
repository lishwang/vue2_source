import Compile from './Compile.js';
import { observe } from './数据响应式/observe.js';
import Watcher from './数据响应式/Watcher.js';

export default class Vue {
  constructor (options) {
    // 把参数options对象存为$options，目的是可以让用户也可以使用这个对象
    this.$options = options || {};
    // 数据
    this._data = options.data || undefined;
    // 把数据变成响应式的
    observe(this._data);
    // 把默认数据data变成响应式的
    this._initData();
    // 把watch侦听器中侦听的内容放到Watch类中
    this._initWatch();
    // 模板编译
    new Compile(options.el, this);
  }

  _initData () {
    let self = this;
    Object.keys(this._data).forEach(key => {
      Object.defineProperty(self, key, {
        get () {
          return self._data[key];
        },
        set (newValue) {
          self._data[key] = newValue;
        }
      })
    })
  }

  _initWatch () {
    let self = this;
    let watch = this.$options.watch;
    Object.keys(watch).forEach(key => {
      new Watcher(this.$options, key, watch[key]);
    })
  }
}