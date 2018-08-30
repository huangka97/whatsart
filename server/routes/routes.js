// Server and Mongoose Models
import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { User, Artwork } from '../models/models.js';

// Wikipedia Parsing
import getWikiInfo from '../helpers/wikiparse.js';
import axios from 'axios';

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
    Promise.all([
      getWikiInfo(req.body.artworkName),
      axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&exintro=1&exsentences=4&titles=' +
        req.body.artworkName.replace(/ /g, '+'))
    ])
    .then((responses) => {
      const [artworkDetails, wikiResponse] = responses;
      const artworkSummary = Object.values(wikiResponse.data.query.pages)[0].extract;
      res.json({ success: true, artworkDetails: artworkDetails, artworkSummary: artworkSummary });
    })
    .catch((err) => res.status(404).json({ success: false, error: err}));
  }
});

export default router;
