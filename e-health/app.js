var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var multer = require('multer');



var doctorRouter = require('./routes/doctor');
var patientRouter = require('./routes/patient');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/health', { useNewUrlParser: true });

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);



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

app.listen(8080, () => {
    console.log(`Server started on port`);
});
module.exports = app;