'use strict';

// simple express server
var express = require('express'),
    app = express(),
    stylus = require('stylus'),
    nib = require('nib'),
    md5 = require('MD5'),
    bodyParser = require('body-parser');

//Firebase
var Firebase = require("firebase");
var fb = new Firebase("https://pppsss.firebaseio.com");
/***********************
 *
 * Express Settings
 *
 **********************/
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/***********************
 *
 * Express Settings
 *
 **********************/
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}


/***********************
 *
 * Css Generation
 *
 **********************/
app.use(stylus.middleware(
    {
        src: __dirname + '/public'
        , compile: compile
    }
));

app.use(express.static(__dirname + '/public'));


/***********************
 *
 * Page Generation
 *
 **********************/
app.get('/', function (req, res) {
    res.render('index',
        {title: 'Home'}
    )
});

/***********************
 *
 * Auth
 *
 **********************/
app.post('/auth', function (req, res) {
    var login = req.body.userLogin,
        password = md5(req.body.userPas),
        state = '',
        response = null;
    if (login && password) {
        fb.child('users').orderByChild('login').equalTo(login).on("value", function (snapshot) {
            response = snapshot.val();
        });

        if (response == null) {
            fb.child('users').push({"login": login, "password": password});
            state = 'newCreate';
        } else {
            console.log(response);
            console.log( password + ' = ' + response['password'] );
            if (password == response.password) {
                state = 'success Login';
            } else {
                state = 'that login is using!';
            }
        }
    }

    res.send(state);
});

app.listen(5000, function () {
    console.log('webix');
});