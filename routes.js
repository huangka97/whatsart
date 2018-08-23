import express from "express";
import bodyParser from 'body-parser';
//mongoose should be included from app?
import models from "./models/models.js";
const router = express.Router();

const User = models.User;
const Artwork = models.Artwork;
//maybe need Google Storage API or save url???

router.get('/', function(req, res) {

});

/*TEMPLATE TO SAVE TO MLAB*/
/*
const newUser = new User({
  email: req.body.email,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  password: req.body.password
});
newUser.save(function(error) {
  if (error)
  {
    console.log("Error saving user: ", user);
  }
  else
  {
    console.log("User successfully saved");
  }
  //do we need res.sends above?
});


const newArtwork = new Artwork({
  artist: ,
  dateViewed: ,
  dateCreated: ,
  medium: ,
  title: ,
  url: ,
});
newArtwork.save(function(error) {
  if (error)
  {
    console.log("Error saving artwork: ", user);
  }
  else
  {
    console.log("Artwork successfully saved");
  }
  //do we need res.sends above?
});
*/

module.exports = router;
