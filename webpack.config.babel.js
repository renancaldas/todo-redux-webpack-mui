var path = require('path')
var webpack = require('webpack')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin')

const DEV_SERVER_URL = 'http://localhost:8080';
const DEVELOPMENT = process.env.NODE_ENV === 'development'
const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('Building for: ', PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT');

var entry = PRODUCTION
    ? ['./src/App.jsx']
    : [
        './src/App.jsx',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?' + DEV_SERVER_URL
      ]

var plugins = PRODUCTION
    ? [
        new webpack.optimize.UglifyJsPlugin(),
        new HTMLWebpackPlugin({ template: 'index-template.html' })
      ]
    : [
        new HTMLWebpackPlugin({ template: 'index.html' }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: DEV_SERVER_URL })
      ]

// Injecting global variables into source code
plugins.push(
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV.toLowerCase()) },
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
)

module.exports = {
    devtool: 'source-map', // to see the actual es6 code in chrome dev tools
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '/' : '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // every js file will be transpiled
            loaders: ['babel-loader'],
            exclude: '/node_modules'
        }, {
            test: /\.(png|jpg|gif)$/, // every png, jpg, gif
            loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'], //https://github.com/webpack-contrib/url-loader this will short img file name and convert a 10KB files into base64 img tag
            exclude: '/node_modules'
        }]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: plugins
}
