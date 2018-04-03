module.exports = {
    entry: [
      'whatwg-fetch',
      './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        filename: 'index.bundle.js',
        contentBase: './',
        port: 3000,
        publicPath: '/',
        stats: {
            colors: true
        }
    }
};