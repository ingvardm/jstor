module.exports = {
    entry: {
        home: './src/index.js'
    },
    output: {
        globalObject: 'typeof self !== \'undefined\' ? self : this',
        library: 'jstor',
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