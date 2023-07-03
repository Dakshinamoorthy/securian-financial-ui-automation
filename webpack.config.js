/**
 * 
 */
const webpack = require('webpack');

module.exports = {
  // ... your existing configuration
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      //...your other variables
    }),
    //...your other plugins
  ],
};

