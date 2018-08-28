// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
import routes from "./routes.js"
import express form "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import models from "./models/models.js";
import session from "express-session";
import passport from "passport";


const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo")(session);
const app = express();


if (!process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
  process.exit(1);
}
mongoose.connection.on("connected", () => console.log("Connected to MongoDB!"));
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));


/*OAUTH BOILERPLATE*/
const oauth2Client = new google.auth.OAuth2(
);


/*PASSPORT BOILERPLATE*/
// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// Tell passport how to read our user models
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      return done(null, false);
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false);
    }
    // auth has has succeeded
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

//MONGODB ROUTES
app.post('/newart',function(req,res){
  var newArt=new ArtWork({
    uri:req.body.uri
  })
  newArt.save()
  .then((saved)=>console.log("new art piece uri saved",saved))
  .catch((err)=>console.log("new art piece uri not saved",err))
})




app.listen(process.env.PORT || 3000);
