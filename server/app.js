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
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.errorHandler());

  var requirejs = require('requirejs');

  var sourceDir = path.join(__dirname, '/../client', 'js'),
      publicDir = path.join(__dirname, '/public', 'js');

  var config = {
    baseUrl: sourceDir,
    name: 'lib/almond',
    //include: ['game'],
    //insertRequire: ['game'],
    out: path.join(publicDir, 'game-built.js'),
    wrap: true,
    mainConfigFile: path.join(sourceDir, 'game.js')
  };

  requirejs.optimize(config, function (buildResponse) {
    console.log('Files optimized');
  });
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
