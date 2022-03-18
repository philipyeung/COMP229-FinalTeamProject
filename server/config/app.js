/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Entry Point of the applicaiton - app.js
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//Database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error'));
mongoDB.once('open', ()=> {
  console.log('connected to MongoDB...');
});

//Those are the routes, called routers
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let questionsRouter = require('../routes/question');
let surveysRouter = require('../routes/survey');
let surveyAnsweredRouter = require('../routes/surveyAnswered');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../public'))); 
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors());

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration
//create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

//Implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

//Set up a strategy to get a token and find the user by token ID
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => {
    return done(err, false);
  });
});

passport.use(strategy);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/question-list', questionsRouter);
app.use('/surveys', surveysRouter);
app.use('/surveyAnswered', surveyAnsweredRouter);

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
res.render('error', {title: 'Error'});
});

module.exports = app;
