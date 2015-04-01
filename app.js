'use strict';

// simple express server
var express = require('express'),
    app = express(),
    stylus = require('stylus'),
    nib = require('nib');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var Firebase = require("firebase");
var fb = new Firebase("https://pppsss.firebaseio.com");





function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
));

app.use(express.static(__dirname + '/public'));




app.get('/', function (req, res) {
    fb.child('user').set([{"name":"alex2","password":"200"}]);
    res.render('index',
        { title : 'Home'}
    )
});

app.post('/auth', function (req, res) {
    res.end();
    console.log(req.body)

});

app.listen(5000, function () {
    console.log('webix');
});