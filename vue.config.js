const webpack = require('webpack')
const path = require('path')
function resolve (dir){
  return path.join(__dirname,dir)
}

module.exports = {
  assetsDir:'static',
  // 构建时不进行eslint校验
  // 是否在开发环境下通过 
  // eslint-loader在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave:process.env.NODE_ENV !== 'production',
  // 生产环境禁止sourcemap
  productionSourceMap:false,
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    devServer: {
      proxy: 'http://localhost:3000'
    },
    // pluginOptions: {
    //   foo: {
    //     // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    //   }
    // }
    configureWebpack: {
      plugins: [
          new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
              Popper: ['popper.js', 'default']
            })
      ]}
  }