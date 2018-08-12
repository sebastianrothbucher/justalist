const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

// call per se node_modules/.bin/webpack --config config/webpack.own.prod.js (aka npm run buildownprod)
// can be debugged: node --inspect-brk node_modules/.bin/webpack --config config/webpack.own.dev.js - then: open devtools, click node, console: require('loadertodebug'), it appears in sources, set breakpoint & GO ;-)
module.exports = {
    entry: {
        app: path.join(__dirname, "../src/index.js"),
    },
    output: {
        path: path.join(__dirname, "../build"),
        filename: 'bundle.[hash:8].js',
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
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader", 
                    use: {
                        loader: require.resolve("css-loader"),
                        options: {
                            minimize: true,
                            sourceMap: true,
                            modules: true,
                        },
                    },
                }),
            }, 
            {
                test: /\.css$/,
                exclude: path.join(__dirname, "../src"),
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader", 
                    use: {
                        loader: require.resolve("css-loader"),
                        options: {
                            minimize: true,
                            sourceMap: true,
                        },
                    },
                }),
            }, 
            {
                test: /\.(ttf|woff2|woff|eot)$/,
                loader: require.resolve("file-loader"),
                options: {
                    name: "[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                loader: require.resolve("url-loader"),
                options: {
                    limit: 20000,
                    falback: "file-loader",
                    name: "[name].[hash:8].[ext]", // used in fallback!
                },
            },
        ],
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: "[name].[contenthash:8].css"
        }),
        new HtmlWebpackPlugin({
            //title: "Test",
            inject: "body", // implicit "onload" (following FB 4 now)
            template: "public/index.html",
        }),
        new UglifyjsWebpackPlugin({
            comments: false,
            sourceMap: true,
        }),
    ],
    devtool: "nosources-source-map", // only stack traces
};