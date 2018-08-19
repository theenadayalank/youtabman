module.exports = { // eslint-disable-line
  productionSourceMap: false,

  chainWebpack: config => {  
    // disbale code-splitting    
    config.optimization.delete('splitChunks');
  },

  // disable hashing in css files
  css: {
    extract: {
      filename: '[name].css'
    },
  },

  // disable hashing in js files
  configureWebpack: {
    output: {
      filename: '[name].js'
    }
  }
};