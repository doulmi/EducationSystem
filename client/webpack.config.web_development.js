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
            { test: /\.global.scss$/, loaders: ["style-loader", "css-loader?sourceMa", "sass-loader"]},
            { test: /\.global\.css$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
            { test: /\.(jpg|png|gif|svg)/, loader: 'file-loader' },
            { test: /^((?!\.global).)*\.css$/, loaders: ['style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'] },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
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