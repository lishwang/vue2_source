
import lookup from './lookup';
import renderTemplate from './renderTemplate';

export default function parseArray (token, data) {
  let value = lookup(token[1], data);
  let domStr = '';
  for (let i = 0; i < value.length; i++) {
    domStr += renderTemplate(token[2], value[i])
  }
  return domStr;
}