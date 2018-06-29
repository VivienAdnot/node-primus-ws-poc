const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrimusWebpackPlugin = require('primus-client-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './favicon.ico'
        }),

        new PrimusWebpackPlugin({
            filename: 'primus-client.[hash].js',
            primusOptions: {
                transformer: 'sockjs'
            }
        })
    ]
};