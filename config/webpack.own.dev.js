// either take artificial stuff 1st (no JSX) or full - check book; TODO: get going!
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                use: [
                    {
                        loader: require.resolve("style-loader"),
                    },
                    {
                        loader: require.resolve("css-loader"),
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
        new HtmlWebpackPlugin({ // TODO: InterpolateHtmlPlugin (handle %PUBLIC_URL%)
            //title: "Test",
            inject: "body", // implicit "onload" (following FB 4 now)
            template: "public/index.html",
        }),
    ],
    devtool: "cheap-source-map",
}; // TODO: test-drive dev server
// TODO: (finally): prod config