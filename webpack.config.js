"use strict";

var webpack = require("webpack"),
    path = require("path"),
    dfltPort = 8088,
    ip = require('ip').address(),
    currentTime = new Date().getTime(), //当前时间戳
    HtmlWebpackPlugin = require('html-webpack-plugin'), //入口首页生成插件
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    ZipPlugin = require('zip-webpack-plugin'),//自动压缩打包后的文件
    mode = process.argv[2] ? process.argv[2].replace('--', '') : '',
    publicPath = mode === "dev" ? "/assets/" : "./assets/";

    // babel的拓展包(Polyfill)
    var babelpolyfill = require("babel-polyfill");

console.log("当前运行环境：", mode === "dev" ? "dev" : "pro")

module.exports = {
    entry: {
        app: [
            './src/app.js' //webpack2唯一入口文件
        ]
    },
    output: {
        path: path.join(__dirname, '/dist/assets'),
        filename: mode === "dev" ? 'app.js' : 'app' + currentTime + '.js',
        publicPath: publicPath
    },
    devServer: {
        port: dfltPort,
        host: 'localhost',
        contentBase: "./src",
        historyApiFallback: true,
        disableHostCheck: true,//解决invalid host header
        /*开发模式代理相应Ajax请求到指定服务器*/
        proxy: {
            '/pixiv/*': {
                target: "https://api.imjad.cn", //测试地址
                changeOrigin: true,
                pathRewrite: {
                  '^/pixiv': '/pixiv'
                }
            },
            '/api/*': {
                target: "http://localhost:3000", //测试地址
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/api'
                }
            }
        },
        publicPath: publicPath,
        noInfo: false
    },
    cache: mode === "dev",   
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2', 'react']
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //resolve-url-loader may be chained before sass-loader if necessary
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml']
            },  
            {
    　　　　　　test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=10000&name=imgs/[hash:8].[name].[ext]']
    　　　　 },          
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: ['url-loader?limit=10000&name=fonts/[md5:hash:base64:10].[ext]']
            },                    
            {
                test: /\.(mp4|ogg)$/,
                use: ['file-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            '@':path.resolve('src'),
            'components':path.resolve('src/components'),
            'api':path.resolve('src/api'),
            'styles':path.resolve('src/assets/styles'),
            'assets':path.resolve('src/assets'),
            'vendors':path.resolve('src/assets/vendors'),
            'actions':path.resolve('src/actions'),
            'stores':path.resolve('src/stores')
        }
    },
    devtool: mode === "dev" ? "#source-map" : undefined,
    plugins: mode === "dev" ? [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'             
            },
            '__API__': '""',
            '__MOCK__':'""'
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),//热替换插件
        // new webpack.NoEmitOnErrorsPlugin(),//遇到错误继续
    ] :
        [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'                  
                },
                '__API__': '"https://api.imjad.cn"',
                '__MOCK__':'"http://localhost:3000"'
            }),        
            new HtmlWebpackPlugin({
                // favicon: 'src/imgs/favicon.ico',
                template: 'src/prod.html',
                filename: '../index.html',
                inject: 'body'
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,
                },
                compress: {
                    warnings: false
                },
                /**以下字段，不进行混淆*/
                mangle: true
            }),
            //优化打包代码
            // new webpack.optimize.AggressiveMergingPlugin(), 合并压缩代码
            new ExtractTextPlugin("styles.css"),
            new webpack.optimize.CommonsChunkPlugin({
                name: "commons",
                filename: "commons.js",
                minChunks: 2,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ZipPlugin({
                path: path.join(__dirname, './dist'),
                filename: 'dist.zip',
                pathPrefix: 'assets'
            })
        ]
};

