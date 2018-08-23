import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});

const ArtworkSchema = new Schema({
  artist: String,
  dateViewed: String,
  dateCreated: String,
  medium: String,
  title: String,
  url: String//is this how we want to store images?
});

const User = mongoose.model("User", userSchema);
const Artwork = mongoose.model("Artwork", ArtworkSchema);

module.exports = {User: User, Artwork: Artwork};
