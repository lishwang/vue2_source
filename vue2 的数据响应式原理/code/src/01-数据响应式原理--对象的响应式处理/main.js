import { observe } from './observe.js';


var obj = {
  a: {
    aa: {
      aaa: 5
    }
  },
  b: 2
};
observe(obj);

obj.b = 10;
obj.a.aa.aaa++