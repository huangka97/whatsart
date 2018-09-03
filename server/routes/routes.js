// Server and Mongoose Models
import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { User, Artwork } from '../models/models.js';

// Wikipedia Parsing
import getWikiInfo from '../helpers/wikiparse.js';

// Router & Routes
const router = express.Router();

// Checks that User is Logged In Before Accessing Other Routes
// router.use('/', (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.status(404).send("User is not logged in.");
//   }
// });

// RESTIFY API for Accessing Artworks
restify.serve(router, Artwork);

// POST route for Users to add new Artworks
router.post('/artwork', (req, res, next) => {
  if (!req.body.artworkName) {
    return res.status(404).send('No Artwork Name Provided.');
  } else {
    let artworkInfoOutter = null;
    getWikiInfo(req.body.artworkName)
    .then((info) => {
      artworkInfoOutter = { ...info, dateViewed: new Date() };
      return Artwork.findOrCreate({ title: info.title });
    })
    .then(({ doc }) => {
      return Object.assign(doc, artworkInfoOutter).save();
    })
    .then((artwork) => {
      //req.user.userCollection.push(artwork._id);
      //req.user.save();
      res.json({ success: true, artworkInfo: artwork });
    })
    .catch(err =>{ console.log(err); res.status(404).json({ success: false, error: err }) });
  }
});

export default router;
