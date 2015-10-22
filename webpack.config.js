var path = require('path');

module.exports = {
    entry: {
        app: [
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'app/main.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: /app/
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }, {
            test: /\.woff$/,
            loader: 'url?limit=100000'
        }]
    }

};