/**
 * Created by hvming on 2016/10/12.
 */
var webpack = require('webpack');
var DEBUG = true;
var VERBOSE = 1;
var path=require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:{
       // common:'./public/javascripts/*.js'
        'common':['./public/javascripts/test.js']
    },
    output: {
       path: path.resolve(__dirname, './build/public'),
        //path: path.join(__dirname, "js"),
        //path: './build/public',
        filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
        //publicPath: "/public",
    },
    plugins: [
        new webpack.DllReferencePlugin({
            //context:__dirname,
            context: path.join(__dirname,'build/public'),
            manifest: require( './webpackmanifest/react.manifest.json' )
        })
    ],

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json','.less'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
           // loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react']
            }
        }]
    }
}