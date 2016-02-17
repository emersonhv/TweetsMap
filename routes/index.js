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

    client.get('search/tweets', { q: 'coca-cola', geocode: '4.635365,-74.101628,200000km' }, function (error, tweets, response) {
        tweetsJson = tweets.statuses;
        tweetsJson = _.reject(tweetsJson, function (obj) { return obj.geo == null; });
        console.log(tweetsJson.length);
    });

    res.render('index', { "data": tweetsJson });
});

module.exports = router;
