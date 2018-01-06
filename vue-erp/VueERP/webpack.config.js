var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [{
            loader: 'url-loader',
            options: {query: {
                name: path.join(__dirname, 'assets/[name].[hash:7].[ext]')
              }
            }
          },{
            loader: 'image-webpack-loader',
            options: {query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              }
            }
          }
        }]
      },
      {   test: /\.css$/, 
          exclude: /node_modules/,
          loader: 'style-loader!css-loader?sourceMap' 
      },
      { 
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=80000&name=fonts/[name].[md5.hash.hex:7].[ext]'
      },
      {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
          // loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
      }   
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProvidePlugin({
       jQuery: "jquery",
       $: "jquery"
    }) 
  ])
}
