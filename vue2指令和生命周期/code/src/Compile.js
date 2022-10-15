
import Watcher from './数据响应式/Watcher.js';

export default class Compile {
  /**
   * 
   * @param {*} el 挂载点
   * @param {*} vue vue实例
   */
  constructor (el, vue) {
    // 实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    if (this.$el) {
      // 如果挂载点存在
      // node2Fragment函数的目的是把节点转换成fragment，fragment的作用类似于mustache中的tokens，在vue原码中实际上用的是AST，
      // 本次使用轻量级的fragment替代；
      this.$fragment = this.node2Fragment(this.$el);
      // 编译这个虚拟节点
      this.compile(this.$fragment);
      // 把这个虚拟节点上树
      this.$el.appendChild(this.$fragment);
    }
  }

  // 将el挂载点DOM转换成虚拟节点并返回
  node2Fragment (el) {
    // createDocumentFragment() 方法创建一个虚拟节点对象，这个节点对象包含所有的属性和方法
    // 这个虚拟节点对象有一个特点，只要真实元素el中的节点被放入到这个虚拟节点中，el中的该节点就会被删除
    // el 挂载点
    var fragment = document.createDocumentFragment();
    var child;
    while (child = el.firstChild) {
      // 将el中的子节点推入到fragment这个虚拟节点中，对应的el中的该子节点就会被删除掉
      fragment.appendChild(child);
    }
    console.log(el, 9998989);
    return fragment;
  }

  // 编译
  compile (el) {
    console.log(el);
    // 得到子节点
    let childNodes = el.childNodes;
    let self = this;
    let reg = /\{\{(.*)\}\}/;
    childNodes.forEach(node => {
      let text = node.textContent;
      if (node.nodeType === 1) {
        self.compileElement(node);
      } else if (node.nodeType === 3 && reg.test(text)) {
        let name = text.match(reg)[1];
        this.compileText(node, name);
      }
    })
  }

  // 编译元素
  compileElement (node) {
    let self = this;
    console.log(node);
    // 获取元素节点的属性列表（得到的是一个类数组对象）
    let nodeAttrs = node.attributes;
    console.log(nodeAttrs);
    // 将属性列表这个类数组对象转换成真正的数组
    // 或者这样写：[].slice.call(nodeAttrs)
    Array.prototype.slice.call(nodeAttrs).forEach(attr => {
      // 分析属性（包括指令）
      console.dir(attr);
      let attrName = attr.name;
      let attrValue = attr.value;
      if (attrName.startsWith('v-')) {
        // 分析指令
        let dir = attrName.substring(2);
        if (dir === 'model') {
          // 双向数据绑定的指令
          // 监听指令的表达式的值attrValue
          new Watcher(self.$vue, attrValue, newValue => {
            // 改变节点双向绑定的值
            node.value = newValue;
          })
          // 拿到当前最新的值（与输入框双向绑定attrValue的最新值）
          let currentValue = self.getVueVal(self.$vue, attrValue);
          // 给输入框赋初始值
          node.value = currentValue;
          // 监听输入框的变化
          node.addEventListener('input', e => {
            // 拿到输入框的新值
            let newVal = e.target.value;
            // 把输入框的新值赋值给data中双向绑定的变量
            self.setVueVal(self.$vue, attrValue, newVal)
          })
        } else if (dir === 'if') {
          // v-if 指令

        }
      }
    })
  }

  // 编译文本（data中定义的变量，双大括号内容）
  compileText (node, name) {
    console.log(node, name);
    // 给虚拟节点设置文本内容
    // node.textContent = this.$vue[name];
    node.textContent = this.getVueVal(this.$vue, name);
    // 监听文本变量的变化
    new Watcher(this.$vue, name, newVal => {
      // 给虚拟节点的内容赋新值，从而可以直接渲染到页面上
      node.textContent = newVal;
    })
  }

  // 处理点嵌套，a.b.c，拿到data中对应的属性值
  getVueVal (data, name) {
    let val = data;
    let names = name.split('.');
    names.forEach(key => {
      val = val[key];
    })
    return val;
  }

  // 处理点嵌套，a.b.c，给data中对应的属性值赋新值
  setVueVal (data, name, newVal) {
    let val = data;
    let names = name.split('.');
    names.forEach((key, index) => {
      if (index < names.length - 1) {
        val = val[key];
      } else {
        val[key] = newVal
      }
    })
  }
}