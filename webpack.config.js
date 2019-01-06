module.exports = {
    entry: {
        home: './src/my-little-store.js'
    },
    output: {
        globalObject: 'typeof self !== \'undefined\' ? self : this',
        library: 'my-little-store',
        libraryTarget: 'umd',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
  };