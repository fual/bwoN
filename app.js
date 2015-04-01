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
    /*fb.set({
        'user' : {
            'mail' : {
                'alex@mangust' : '2001',
                'alex2@mangust' : '2002',
                'alex3@mangust' : '2003'
            },
            'password':{
                '2001' : '123',
                '2002' : '123',
                '2003' : '123'
            }
        }
    });*/
    //fb.child('user').push({"name":"alex3","password":"300"});
    //fb.child('user').push({"name":"alex3","password":"500"});


    res.render('index',
        { title : 'Home'}
    )
});

app.post('/auth', function (req, res) {
    var email = req.body.mail;
    var state;
    new Firebase('https://pppsss.firebaseio.com/user/mail/').child('alex2@mangsust').once('value', function(snap) {
        if(snap.val()==null){
            //Добавить новый пароль
            state = 'newCreate'
        } else {
            state = 'сверить логины'
        }
    });
    res.end();
    console.log(req.body)

});

app.listen(5000, function () {
    console.log('webix');
});