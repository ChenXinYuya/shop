module.exports = {
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      // 服务器反向代理 基于node
      '/conner': {
        // 以 /conner 开头请求  代理到target这个地址
        target: 'https://api.it120.cc',
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '^/conner': '/conner'
        }
      }
    }
  }
}
