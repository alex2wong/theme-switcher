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
app.use(express.static(path.join(__dirname, './public/')));

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

app.get('/customtheme', function(req, res) {
  // cp and change ./public/index.less
  console.warn('got POST req: ', req);
  changeGlobalStyleFile('#' + req.query.primaryColor);
  exec('yarn "build:css"', function(err, output) {
    if (output) {
      console.log('compiled custom theme success.., ready2res');
    }
    res.sendFile('./public/styles.css',{
      root: __dirname
    });
  });
})

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function changeGlobalStyleFile(primary) {
  var originalStyle = fs.readFileSync('./src/assets/customTemplate.less');
  // if primaryColor belong to dark, then apply light text color. vice versa..
  var fontColor = hexToRgb(primary).r + hexToRgb(primary).g + hexToRgb(primary).b < 250 ?
    '#ddd' : '#333';
  
  var newStyle = originalStyle.toString()
    .replace('$primary;', `${primary};`)
    .replace('$primary-color', fontColor);
  fs.writeFileSync('./src/assets/custom.less', newStyle);
  // console.log('updated custom.less: ', fs.readFileSync('./src/assets/custom.less'));
}


server.listen(app.get('port'), function() {
  console.log(`start listening ${app.get('port')}`);
})
