var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var _ = require("underscore");


/* GET home page. */
router.get('/', function (req, res, next) {

    var client = new Twitter({
        consumer_key: 'bhVNWnTvINuBLJKooYaRywtfx',
        consumer_secret: 'MYYWj3JZ2jCSJpwICD39oRpinvZAyfIQwUVLHe5xy5BdBUDrl0',
        access_token_key: '300988756-kbDHGNojWP05bIJiUT15fffhxarsPNZYuW6uGsqN',
        access_token_secret: 'XdoEy4hj6H18lDE7JGj1SWpVCJO08ZiwFgX5Xpu7kEX58'
    });

    var tweetsJson;
    //'4.635365,-74.101628,2000000km'
    client.get('search/tweets', { q: req.param('q'), geocode: req.param('geocode'), count: 100 }, function (error, tweets, response) {
        tweetsJson = tweets;
        res.json(tweets);
        //tweetsJson = _.reject(tweetsJson.statuses, function(obj){ return obj.geo == null; });
    });

    console.log(req.param);
});

/* POST home page. */
router.post('/', function (req, res, next) {

    var client = new Twitter({
        consumer_key: 'bhVNWnTvINuBLJKooYaRywtfx',
        consumer_secret: 'MYYWj3JZ2jCSJpwICD39oRpinvZAyfIQwUVLHe5xy5BdBUDrl0',
        access_token_key: '300988756-kbDHGNojWP05bIJiUT15fffhxarsPNZYuW6uGsqN',
        access_token_secret: 'XdoEy4hj6H18lDE7JGj1SWpVCJO08ZiwFgX5Xpu7kEX58'
    });

    var tweetsJson;

    client.get('search/tweets', { q: req.body.busqueda, until: req.body.fecha_lim, geocode: req.body.latlon + ',' + req.body.radio + 'km', count: 300 }, function (error, tweets, response) {
        tweetsJson = tweets;
        tweetsJson.statuses = _.reject(tweetsJson.statuses, function (obj) { return obj.geo == null; });
        res.json(tweetsJson);
    });
    console.log(req.body.latlon + ',' + req.body.radio + 'km');
    console.log(req.body);
});

module.exports = router;

