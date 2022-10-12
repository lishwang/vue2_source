// 从 http://www.webpackjs.com/ 官网照着配置

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // 设置 source-map，建立js映射文件，方便调试代码和错误，生成对应的源代码时也会生成对应的source-map文件
  devtool: 'source-map',
  output: {
    // 虚拟打包路径，就是说文件夹不会真正的生成，而是在8080端口虚拟生成
    publicPath: 'xuni',
    // 打包出来的文件名，不会真正的物理生成
    filename: 'bundle.js',
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件根目录
    contentBase: path.join(__dirname, 'www'),
    // 不压缩
    compress: false,
  }
}