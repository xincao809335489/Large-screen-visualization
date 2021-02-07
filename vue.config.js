const webpack = require('webpack')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
// js压缩混淆
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // 当运行vue-cli-service build时生成的生成环境构建稳健的目录
  outputDir: 'dist',
  // 存放生成的静态资源(js,css,img,fonts)的(相对于ouputDir的)目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查,安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建。
  runtimeCompiler: false,
  // 默认情况下babel-loader忽略其中的所有文件node_modules。
  transpileDependencies: [],
  // 生产环境sourceMap
  productionSourceMap: false,
  // webpack配置
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  // 添加别名
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('api', resolve('./src/api'))
      .set('assets', resolve('./src/assets'))
      .set('utils', resolve('./src/utils'))
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    // 启用 CSS modules
    modules: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
  // webpack-dev-server 相关配置
  devServer: { // 设置代理
    hot: true, // 热加载
    host: '0.0.0.0', // ip地址
    port: 9999, // 端口号
    https: false, // 关闭https
    open: 'Google Chrome', // 自动打开固定浏览器
    hotOnly: true,
    // proxy: {},
    proxy: {
      '/api': {
        // 你的真实的api地址,即真实接口地址
        target: 'http://127.0.0.1:8090',
        // 代理websocket
        // ws: true,
        changeOrigin: true,
        // 重写路径
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  pwa: {}
}
