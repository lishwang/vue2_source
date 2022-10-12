import parseTemplateToTokens from './parseTemplateToTokens.js';
import renderTemplate from './renderTemplate.js';

// 提供一个全局的WLS_TemplateEngine对象
window.WLS_TemplateEngine = {
  render (templateStr, data) {
    // 获取tokens
    let tokens = parseTemplateToTokens(templateStr);
    // 将tokens和data融合成DOM字符串返回
    let domStr = renderTemplate(tokens, data);
    console.log(domStr);
    let container = document.getElementById('container');
    container.innerHTML = domStr;
  }
}