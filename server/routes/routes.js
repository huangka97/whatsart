// Server and Mongoose Models
import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { User, Artwork } from '../models/models.js';

// Wikipedia Parsing Helper Function
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

// POST route for new Artworks for a user
router.post('/artwork', (req, res, next) => {
  if (!req.body.artworkName) {
    return res.status(404).send('No Artwork Name Provided.');
  } else {
    getWikiInfo(req.body.artworkName)
    .then((data) => res.json({ success: true, artworkData: data }))
    .catch((err) => res.json({ success: false, error: err}));
  }
});

export default router;
