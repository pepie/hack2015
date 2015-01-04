
var express = require('express'),
    app = exports.app = express(),
    config = require('config').settings,
    http = require('http'),
    exphbs = require('express-handlebars'),
    path = require('path');


var app = express();

// all environments
hbs = exphbs.create({
        defaultLayout: 'main'
});

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/v1').include(app);

app.listen(config.appPort, function (err) {
    if(err){
        console.log('Error launching application - ',err);
    }

    console.log('app server ready @ http://localhost:%s',config.appPort);
    console.log('express app server listening on port http://localhost:%s',config.appPort);

});
