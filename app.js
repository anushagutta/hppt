var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var path = require('path');
//var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var hbs = exphbs.create({
  defaultLayout: 'main'
});
var routes = require('./routes/home');
db = require('mongoskin').db('mongodb://localhost:27017/test');
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
// app.set('view engine', '.hbs')
app.use(express.static('public'));
app.use(express.static('files'));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.get('/',routes);
app.post('/login', function (req, res) {
  // var obj = {fir:fir};
  console.log('hello');
console.log(req.query);
    res.render('home');
});

app.listen(3000);
