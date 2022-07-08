const path = require('path');

module.exports = {
    entry: './src/sauce.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'sauce.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
};
