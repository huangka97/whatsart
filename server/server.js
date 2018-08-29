// Server Middleware
import internalIp from 'internal-ip';
import http from 'http';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

// Routes
import auth from './routes/auth';
import routes from './routes/routes.js';

// Passport
import passport from 'passport';
import crypto from 'crypto';
import { Strategy as LocalStrategy } from 'passport-local';
import { mongoose, User } from './models/models.js';

// MongoDB & Sessions
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

// Initializing Server
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server running at http://${internalIp.v4.sync()}/`);

// Initializing Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: false,
}));

// Hash Function for Passwords
const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

// Passport Methods
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (user.password !== hashPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// All Routes
app.use('/', auth(passport));
app.use('/', routes);
