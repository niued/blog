/**
 * @author djqq
 */
var path = require('path');
var express = require('express');
var app = express.createServer();
var routes = require('./routes');
var config = require('./config').config;
var common = require('./libs/common.js');

app.configure(function(){
	app.set('view engine','htm');
	app.set('view','/views');
	app.set("view options",{layout: true });
	app.register('.htm',require('ejs'));
	app.use(express.bodyParser({uploadDir:'./static/upload'}));
	app.use(express.cookieParser());
	app.use(express.session({
		secret: config.session_secret,
	}));
	
})


app.helpers({
	config: config,
	common: common
});

var static_dir = path.join(__dirname, 'static');
app.configure('development', function(){
	app.use(express.static(__dirname + "/static"));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	var maxAge = 3600000 * 24 * 30;
	app.use(express.static(__dirname + "/static", { maxAge: maxAge }));
	app.use(express.errorHandler()); 
	app.set('view cache', true);
});

routes(app);

app.listen(2929);
 
