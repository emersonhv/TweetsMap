module.exports = function () {
    var express = require('express');
    var app = express();
    var index = require('../routes/index');
    var tweets = require('../routes/tweets');
    var users = require('../routes/users');

    function initRoutes() {
        app.use('/', index);
        app.use('/tweets', tweets);
        app.use('/users', users);
    }   
} 