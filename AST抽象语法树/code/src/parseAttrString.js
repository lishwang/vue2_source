// 将 attrString 字符串变成固定格式的数组

export default function (attrString) {
  // let attrString = ' class="aaa bbb  ccc"   id="aa"';
  if (!attrString) {
    return [];
  }
  // 断点
  var point = 0;
  // 是否在引号内
  var isYinhao = false;
  // 结果数组
  var result = [];
  for (var i = 0; i < attrString.length; i++) {
    var chat = attrString[i];
    // 遇到了引号，就修改引号的状态
    if (chat === '"') {
      isYinhao = !isYinhao;
    } else if (/^\s*$/.test(chat) && !isYinhao) {
      // 遇到了空格，并且不在引号中，就对字符串进行分割
      let str = attrString.substring(point, i).trim();
      // 非空
      if (!/^\s*$/.test(str)) {
        result.push(str);
      }
      point = i;
    }
  }
  // 将attrString的最后一个属性k='v'推入result
  result.push(attrString.substring(point).trim());
  // console.log(result); // ['class="aaa bbb  ccc"', 'id="aa"']
  // result变成固定格式的数组
  result = result.map(item => {
    let o = item.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2]
    }
  })
  // console.log(result); // [{"name": "class","value": "aaa bbb  ccc"},{"name": "id","value": "aa"}]
  return result;
}