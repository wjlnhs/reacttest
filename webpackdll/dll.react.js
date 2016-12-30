const webpack = require('webpack');
var path=require('path');
const vendors = [
    'react',
    'react-dom'
];

module.exports = {
    output: {
        path: path.resolve(__dirname, '../build/public'),
        filename: '[name].package.js',
        library: '[name]',
    },
    entry: {
        "react": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: './webpackmanifest/[name].manifest.json',
            name: '[name]',
            context: path.join(__dirname,'webpackdll')
        }),
    ],
};
