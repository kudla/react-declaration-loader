var path = require('path');

var config = {
    entry: path.join(__dirname, 'app/index.jsx'),
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loaders: ['react-declaration-loader', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.css'
        ]
    }
};

module.exports = config;
