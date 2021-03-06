var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'bundle.css'
});

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
    // publicPath: '/dist'
	},
	module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',  // 這個後 (順序很重要)
          'css-loader' // 這個先
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }
    ]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(function(){
			// ...
		}),
    extractPlugin,
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
		})
	]
}
