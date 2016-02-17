var express = require('express');
var app = express();
var servidor = require('http').Server(app);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require("./config");

app.set('views', 'views');
app.set('view engine', 'html');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.static('views'));

app.use('*', function noCache (req, res, next) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

if(config.instanceType == "APP" || config.instanceType == "STANDALONE") {

    app.use('/', require('./routes/index'));
    app.use('/tweets', require('./routes/tweets'));
    app.use('/users', require('./routes/users'));
}

//app.listen(3000);
//console.log('Servidor corriendo en http://localhost:3000');
servidor.listen(config.expressPort, function(){
	console.log('Servidor corriendo en http://localhost:3000');
});