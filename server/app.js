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
    name: 'game',
    out: path.join(publicDir, 'game-built.js'),
    mainConfigFile: path.join(sourceDir, 'game.js'),
    wrap: true
  };

  requirejs.optimize(config, function (buildResponse) {
    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    //var contents = fs.readFileSync(config.out, 'utf8');
    console.log('Files optimized');
  });
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
