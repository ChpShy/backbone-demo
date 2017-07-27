/**
 * Created by hspcadmin on 2017/7/18.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    devtool: 'module-source-map',
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
            mangle: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
    module: {
        rules: [
            {test: /\.css$/,use: ['style-loader','css-loader']},
            {test: /\.scss$/,use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(png|svg|jpg|gif)$/,use: ['file-loader']},
            {test: /\.art$/,use: ["art-template-loader"]}
        ]
    },
    externals: {
        jquery: 'window.$'
    }
};