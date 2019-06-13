module.exports = {
  devServer: {
    compress: true,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
}
