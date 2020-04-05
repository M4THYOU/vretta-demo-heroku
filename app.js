const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Define routes here.
const gamesRouter = require('./routes/api/games');
const messagesRouter = require('./routes/api/messages');
const playersRouter = require('./routes/api/players');
const awsRouter = require('./routes/api/aws');

const app = express();

// Middleware.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// Add routes here.
app.use('/api/games', gamesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/players', playersRouter);

app.use('/api/aws', awsRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// DB Config
const dbURI = require('./config/keys').mongoURI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This section sets up the error handling page and the view engine. The view engine is only setup to work with the
// error handlers. React handles the rest.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
