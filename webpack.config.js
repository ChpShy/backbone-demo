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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // Enable HMR
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname),
    },
    module: {
        rules: [
            {test: /\.css$/,use: ['style-loader','css-loader']},
            {test: /\.scss$/,use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(png|svg|jpg|gif)$/,use: ['file-loader']},
            {test: /\.art$/,use: ["art-template-loader"]}
        ]
    },
    externals: {
        jquery: 'window.$',
        underscore: 'window._',
        backbone: 'window.backbone',
        local: 'window.local'
    },
};