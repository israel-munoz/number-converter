const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const cssPlugin = require('mini-css-extract-plugin');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [{
                loader: cssPlugin.loader,
                options: {
                    publicPath: 'css/',
                    minimize: true
                }
            }, {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.(svg|png)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    emitFile: true
                }
            }],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new htmlPlugin({
            title: 'Numbers Converter',
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new cssPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimizer: [
            new uglifyPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCssPlugin({})
        ]
    }
}
