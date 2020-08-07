// jshint strict: false
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.js');
 
let server;
 
exports.config = {
  allScriptsTimeout: 11000,
 
  specs: ['*.js'],
 
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox'],
    },
  },
 
  baseUrl: 'http://localhost:8000/',
 
  beforeLaunch: () => {
    const compiler = webpack(webpackConfig);
    server = new WebpackDevServer(compiler, {
      publicPath: '/bundle',
      contentBase: path.resolve(__dirname, '../app/dist'), // New
      compress: true,
      watchContentBase: true,
      watchOptions: {
        poll: true,
      },
    });
    server.listen(8000, () => {});
  },
 
  framework: 'jasmine',
 
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
};