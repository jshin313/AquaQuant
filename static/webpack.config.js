const webpack = require('webpack');
const resolve = require('path').resolve;

const config = {
    devtool: 'eval-source-map',
    entry: __dirname + '/js/index.js',
    output:{
        path: resolve('../public'),
        filename: 'bundle.js',
        publicPath: resolve('../public'),
        globalObject: 'this' //!!!This line
    },
    resolve: {
        extensions: ['.js','.jsx','.css'],

    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                // options: {
                //     modules: false,
                // },
            }
        ]
    },

};

module.exports = config;
