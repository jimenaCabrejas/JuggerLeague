process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport'),
    streaming = require('./public/streaming.js');


var db = mongoose(),
    app = express();
var passport = passport();


var server = app.listen(config.port,()=>{
  console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);
});

streaming(server);

module.exports = app;
