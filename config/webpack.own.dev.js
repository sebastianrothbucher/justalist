const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// call per se node_modules/.bin/webpack --config config/webpack.own.dev.js (aka npm run buildowndev)
// can be debugged: node --inspect-brk node_modules/.bin/webpack --config config/webpack.own.dev.js - then: open devtools, click node, console: require('loadertodebug'), it appears in sources, set breakpoint & GO ;-)
module.exports = {
    entry: {
        app: path.join(__dirname, "../src/index.js"),
    },
    output: {
        path: path.join(__dirname, "../build"),
        filename: 'bundle.js',
        pathinfo: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: require.resolve("babel-loader"),
                options: {
                    cacheDirectory: true,
                    presets: [
                        "react", 
                        "env",
                    ],
                    plugins: [
                        "transform-object-rest-spread", 
                        "babel-plugin-transform-react-jsx-source",
                        "babel-plugin-transform-react-jsx-self",
                    ],
                },
            }, 
            {
                test: /\.css$/,
                include: path.join(__dirname, "../src"),
                use: [
                    {
                        loader: require.resolve("style-loader"),
                    },
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            modules: true,
                            sourceMap: true,
                        },
                    },
                ],
            }, 
            {
                test: /\.css$/,
                exclude: path.join(__dirname, "../src"),
                use: [
                    {
                        loader: require.resolve("style-loader"),
                    },
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }, 
            {
                test: /\.(ttf|woff2|woff|eot|png|jpeg|jpg|gif|svg)$/,
                loader: require.resolve("url-loader"),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            //title: "Test",
            inject: "body", // implicit "onload" (following FB 4 now)
            template: "public/index.html",
        }),
    ],
    devtool: "cheap-source-map",
};
// TODO: (finally): prod config