const WebpackServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.babel.js');

const compiler = webpack(config);
const server = new WebpackServer(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});
server.listen(8080);
