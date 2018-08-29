import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { User, Artwork } from '../models/models.js';

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

export default router;
