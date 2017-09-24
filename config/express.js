var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport');

    var flash = require('connect-flash');

    var session = require('express-session');



module.exports = function() {
    var app = express();


    app.use(flash());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'OurSuperSecretCookieSecret'
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    //use this code before any route definitions
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/shop.server.routes.js')(app);
		require('../app/routes/show.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
