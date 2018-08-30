// Server and Mongoose Models
import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { User, Artwork } from '../models/models.js';

// To Parse Wikipedia Information
import infobox from 'wiki-infobox';
import crypto from 'crypto';

const router = express.Router();

// Makes sure that user is logged in
router.use('/', (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(404).send();
  }
});

restify.serve(router, Artwork);

// Hash Function for Wikipedia Image Link
const md5Hash = (fileName) => {
  const hash = crypto.createHash('md5');
  hash.update(fileName);
  return hash.digest('hex');
};

const page = 'The Starry Night';

infobox(page, 'en', function(err, data){
  if (err) {
    console.log(`Server could not find wikipedia page for '${page}'`);
    return;
  }
  //console.log(data);
  const parsedData = {
    title: data.title.value,
    artist: data.artist.text,
    year: data.year.value.replace(/{{circa}}/g, 'c.'),
    city: data.city.text,
    museum: data.museum[0].text
  };
  //console.log(parsedData);
  const underscoreName = data.image_file.value.split(" ").join("_");
  const encodedURI = encodeURIComponent(underscoreName);
  const firstTwo = md5Hash(underscoreName).slice(0,2);
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + firstTwo[0]
              + '/' + firstTwo + '/' + encodedURI + '/' + '500px-' + encodedURI;
  console.log(url);
});

router.post('/artwork', (req, res, next) => {

});

export default router;
