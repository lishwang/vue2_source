import Observer from './Observer.js';

export function observe (value) {
  if (typeof value !== 'object') return;
  // 定义ob，用于存储observe实例
  var ob;
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}