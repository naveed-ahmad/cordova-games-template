const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryFile = path.join(__dirname + '/../src/index.js');

module.exports = function (options) {
  return {
    mode: options.mode,
    entry: entryFile,

    resolve: {
      extensions: ['.js', '.json', '.vue'],
      modules: [path.join(__dirname, '../src'), 'node_modules'],
      alias: {
        'src': path.resolve(__dirname, '../src/'),
        'assets': path.resolve(__dirname, '../src/assets/')
      }
    },

    output: {
      pathinfo: true,
      devtoolLineToLine: true,
      filename: '[hash].[name].js',
      sourceMapFilename: "[hash].[name].js.map",
      path: path.join(__dirname, '../www')
    },

    module: {
      rules: [{
          test: /\.(png|jpe?g|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf|mp3|wav)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.svg$/,
          loader: 'url-loader'
        },
        {
          test: /\.scss$/,
          loader: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.sass$/,
          loader: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
        },
        {
          test: /\.js$/,
          exclude: /node_modules(\/|\\)(\/|\\).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-runtime', 'transform-object-rest-spread']
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(options.mode)
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        platform: process.argv.length > 5 ? process.argv[5].replace(/[- ]/g, '') : "",
        inject: true,
        minify: {
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          decodeEntities: true,
          collapseWhitespace: true,
          minifyCSS: true
        }
      })
    ]
  }
}
