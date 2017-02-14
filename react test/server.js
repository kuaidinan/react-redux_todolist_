var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.listen(3001, function (err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3001/');
})

/*'use strict';
var path = require('path');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var port = 3001;

app.use('/static', express.static(__dirname + '/static'));

(function() {

	// Step 1: Create & configure a webpack compiler
	var webpack = require('webpack');
	var webpackConfig = require('./webpack.config');
	var compiler = webpack(webpackConfig);

	// Step 2: Attach the dev middleware to the compiler & the server
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	// Step 3: Attach the hot middleware to the compiler & the server
	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
})();

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}
});*/


