var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router variables
var indexRouter = require('./routes/index');
var carListingsRouter = require('./routes/car_listings');
var offroadCarsRouter = require('./routes/offroad_cars');
var sportCarsRouter = require('./routes/sport_cars');
var coupeRoadsterCarsRouter = require('./routes/coupe_roadster_cars');
var oldCarsRouter = require('./routes/old_cars');
var newCarsRouter = require('./routes/new_cars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/car_listings', carListingsRouter);
app.use('/offroad_cars', offroadCarsRouter);
app.use('/sport_cars', sportCarsRouter);
app.use('/coupe_roadster_cars', coupeRoadsterCarsRouter);
app.use('/old_cars', oldCarsRouter);
app.use('/new_cars', newCarsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
