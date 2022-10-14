export const def = function (obj, key, value, enumerable) {
  // 给obj对象添加key属性，添加的key属性是响应式的
  Object.defineProperty(obj, key, {
    value,
    enumerable, // 是否可枚举
    writable: true, // 可写
    configurable: true, // 可删除
  })
}