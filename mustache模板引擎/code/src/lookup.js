/**
 * 根据传入的 key 和 data，在data中找到key属性对应的的值，特别处理 key 为 a.b.c 的情况；
 * 比如：key = 'a.b.c';
 * data = {
 *    a: {
 *        b: {
 *           c: 123,
 *        }
 *    }
 * };
 * 本方法返回 123
 */
export default function lookup (key, data) {
  debugger;
  if (key.indexOf('.') !== -1) {
    if (typeof data !== 'object') {
      // 如果data是一个基本数据类型，直接返回，例如 key==='.'; data = 1; 遍历简单的一维数组时；
      return data;
    }
    // key 中有 . 的情况
    let keys = key.split('.');
    // 设置一个临时变量，用于一层层的找属性值
    let temp = data;
    for (let i = 0; i < keys.length; i++) {
      temp = temp[keys[i]];
    }
    return temp;
  }
  // key 中没有 . 时直接返回key对应的属性值
  return data[key];
}