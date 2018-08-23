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

module.exports = router;
