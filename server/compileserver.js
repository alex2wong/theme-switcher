/**
 * author: alex2wong
 * git: https://github.com/alex2wong
 **/

var express = require('express'),
path = require('path'),
app = express(),
fs = require('fs'),
{exec} = require('child_process'),

server = require('http').createServer(app);

app.set('port', process.env.PORT || 3002);
app.set('app', __dirname);
// serve static file in root dir. for url: "", return: "".
app.use(express.static(path.join(__dirname, '../public/')));

// config CORS to provide service to cross domain page.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("Content-Type", "application/json");
  next();
})

// config the default HTML. set rootPath in res.send(path[,option])
app.get('/', function(req, res) {
  res.sendFile('./public/styles.css',{
    root: __dirname
  });
});

app.post('/customtheme', function(req, res) {
  // cp and change ./public/index.less
  console.warn('got POST req: ', req);
  exec('yarn "build:css"', function(err, output, stErr) {
    if (output) {
      console.log('compiled custom theme success.., ready2res');
    }
    res.sendFile('./public/styles.css');
  });
})


server.listen(app.get('port'), function() {
  console.log(`start listening ${app.get('port')}`);
})
