module.exports = {
    entry: {
        home: './src/MyLittleStore.js'
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
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        ]
    }
};
