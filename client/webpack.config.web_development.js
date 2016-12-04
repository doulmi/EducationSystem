import path from 'path'
import webpack from 'webpack'

export default {
    debug: true,
    entry: [
        `webpack-hot-middleware/client?path=/__webpack_hmr`,
        'babel-polyfill',
        './app/index.js'
    ],

    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    node: {
        net: 'empty',
        dns: 'empty'
    }
};