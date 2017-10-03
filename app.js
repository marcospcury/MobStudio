var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var checkAuth = require('./utils/checkAuth');
var passport = require('passport');
var session = require('express-session');
var flash = require('express-flash');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connection = mongoose.connect(process.env.MOB_DB_PATH, {
  useMongoClient: true,
  authSource: process.env.MOB_AUTH_SOURCE,
  db: { databaseName: process.env.MOB_DB_NAME },
  user: process.env.MOB_DB_USER,
  pass: process.env.MOB_DB_PASSWORD
});

connection.on('error', function (err) { console.log(err); });
//connection.on('open', function (err) { console.log(connection); });

var Cliente = require('./models/clienteModel');
var Usuario = require('./models/usuarioModel');
var appRoutes = require('./routes/appRoutes');
var apiRoutes = require('./routes/apiRoutes');

require('./config/passport')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  cookie: { maxAge: 60000 },
  key: process.env.MOB_SESSION_KEY,
  secret: process.env.MOB_SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.msg_sucesso = req.flash('msg_sucesso');
  res.locals.msg_erro = req.flash('msg_erro');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

apiRoutes(app);
appRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
