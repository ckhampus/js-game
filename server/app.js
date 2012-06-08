
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

/*
app.get('/:type/:asset(*.*)', function (req, res) {
  var asset = path.join(__dirname, '/../client/', req.params.type, req.params.asset);
  
  path.exists(asset, function (exists) {
    if (exists) {
      fs.readFile(asset, 'utf8', function (err, data) {
        if (err) throw err;
        res.contentType(asset);
        res.send(data);
      });
    }

    res.send(404);
  });
});
*/

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
