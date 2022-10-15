const path = require('path');

module.exports = {
  // mode: 'development', // webpack5可以不用配置，webpack4需要配置
  // entry: './src/01-snabbdom学习/snabbdom_test.js',
  // entry: './src/01-snabbdom学习/snabbdom_myTest.js',
  // entry: './src/02-实现自己的 vnode 函数和 h 函数/index.js',
  entry: './src/03-实现自己的 patch 函数/index.js',
  output: {
    // 这里尽量采用publicPath，表示虚拟打包路径，文件夹不会真正生成，而是在8080端口虚拟生成，可以访问http://localhost:8080/xuni/bundle.js看到
    // path: path.resolve(__dirname, 'dist'),
    publicPath: 'xuni',
    // 打包出来的文件名
    filename: 'bundle.js',
  },
  devServer: {
    // 端口号
    port: '8080',
    // 静态资源文件夹
    contentBase: 'wls'
  }
};