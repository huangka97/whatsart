import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});

const ArtworkSchema = new Schema({
  name: String,
  date: String,
  description: String,
  url: String,//is this what we want?
});

const User = mongoose.model("User", userSchema);
const Artwork = mongoose.model("Artwork", ArtworkSchema);

module.exports = {User: User, Artwork: Artwork};
