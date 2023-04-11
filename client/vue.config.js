module.exports = {
  productionSourceMap: false,
  lintOnSave: false, //关闭lint校验
  devServer: {
    open: true, //自动打开默认浏览器
    proxy: {
      '/mg': {
        // target: 'http://zhouyi.run:3001',
        target: 'http://localhost:3001', //本地服务器
        changeOrigin: true,
        pathRewrite: {
          '^/mg': ''
        }
      },
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: '@import \'~@/assets/style/public.scss\';'
      }
    }
  }
}
