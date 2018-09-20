const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

// call per se node_modules/.bin/webpack --config config/webpack.own.prod.js (aka npm run buildownprod)
// can be debugged: node --inspect-brk node_modules/.bin/webpack --config config/webpack.own.dev.js - then: open devtools, click node, console: require('loadertodebug'), it appears in sources, set breakpoint & GO ;-)
module.exports = {...require('./webpack.own.prod'), 
    entry: {
        app: [
            'react-scripts/config/polyfills', // sets globals, so should suffice after externals
            'd3-color', 
            path.join(__dirname, "../src/index.js"),
        ],
        // vendor: [] (not needed for 27k)
    },
    externals: { // (see index.html)
        'react': 'React',
        'prop-types': 'PropTypes',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        'immutable': 'Immutable',
        'font-awesome/css/font-awesome.css': 'window', // a 'lil crazy: nth is ever called, just need to stop looking (load via index.html - incl. fonts)
        'bootstrap/dist/css/bootstrap.css': 'window', // (ditto before)
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: "[name].[contenthash:8].css"
        }),
        new HtmlWebpackPlugin({
            //title: "Test",
            inject: "body", // implicit "onload" (following FB 4 now)
            template: "public/indexcdn.html",
        }),
        new UglifyjsWebpackPlugin({
            comments: false,
            sourceMap: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production"),
        }),
    ],
};