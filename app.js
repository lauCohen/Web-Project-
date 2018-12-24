const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const errorMiddleware = require('./middleware/error');
const config = require('./config');

// import routes
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const moviesRoutes=require('./routes/movie');
const ConvRoutes=require('./routes/conversation');
const contactRoutes=require('./routes/contact-us');
var resetPasswordRoutes = require('./routes/resetPassword');
// initialize the app
const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
// TODO: change to '/user' and '/message'
app.use(`${config.root}/users`, userRoutes);
app.use(`${config.root}/messages`, messageRoutes);
app.use(`${config.root}/movies`, moviesRoutes);
app.use(`${config.root}/conversations`, ConvRoutes);
app.use(`${config.root}/contact-us`, contactRoutes);
app.use(`${config.root}/mail`, contactRoutes);

// set error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send("Invalid Endpoint");
});


module.exports = app;
