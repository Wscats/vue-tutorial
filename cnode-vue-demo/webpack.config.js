var webpack = require("webpack");
module.exports = {
    entry: "./index.js",
    devtool: "source-map",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader"
        }, {
            test: /\.vue$/,
            loader: "vue-loader"
        }, {
            test: /\.(jpg|png|gif|jpeg)$/,
            loader: "url-loader"
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            //cnpm install sass-loader node-sass
            test: /\.scss$/,
            loader: "sass-loader"
        }]
    },
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        // historyApiFallback: true, //不跳转
        //port 设置默认监听端口，如果省略，默认为”8080“
        inline: true //实时刷新
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        //代码压缩
        new webpack.optimize.UglifyJsPlugin()
    ]
}