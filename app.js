var express = require('express');
var exphbs  = require('express-handlebars');
//var cookieParser = require('cookie-parser');
var app = express();
var path = require('path');
//var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');
// var sanitize =  require('./utils/sanitize');
// var csrf = require('csurf');
// var session = require('express-session');
var hbs = exphbs.create({
  defaultLayout: 'main'
});
var routes = require('./routes/home');
db = require('mongoskin').db('mongodb://localhost:27017/test');
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
// app.set('view engine', '.hbs')
// app.use(expressValidator());
// app.use(sanitize);
// app.use(csrf({cookie:true}));
// app.use(session({secret: 'ssshhhhh',
//                 resave:true,
//                 saveUninitialized:false,
//                 cookie:{
//                   path:'/',
//                   // domain:props.domain,
//                   httpOnly:true,
//                   maxAge:900000
//                 }
// }));
app.use(express.static('public'));
app.use(express.static('files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(cookieParser());
app.use('/static', express.static('public'));
app.get('/',routes);
app.post('/login', function (req, res) {
  // var obj = {fir:fir};
  console.log('hello');
console.log(req.query);
    res.render('home');
});

app.post('/save/crime',function(req,res){
  var data = req.body;
  db.collection('fir').insert(data,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  })
});
// catch 404 and forward to error handler
app.use(function(req,res,next){
  console.log(res.statusCode);
  next();
})
app.use(function(req,res,next){
  console.log('before send the response');
//  res.set('csrf-token',req.csrfToken());
  next();
});
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500 );
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err,req,res,next){
  console.log(err.status);
  next();
})
app.use(function(err, req, res, next) {
    res.status(err.status || 500 );
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(3000);
