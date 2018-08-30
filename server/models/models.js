import mongoose from 'mongoose';

// Mongoose Connection
if (!process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
  process.exit(1);
}

mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.connection.on('error', () => console.log('Failed to connect to MongoDB.'));
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Schemas
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  artworkCollection: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
  }],
});

const artworkSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  artist: {
    required: true,
    type: String,
  },
  year: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  museum: {
    required: true,
    type: String,
  },
  medium: {
    required: true,
    type: String,
  },
  dimensions: {
    required: true,
    type: String,
  },
  imageURL: {
    required: true,
    type: String,
  },
  dateViewed: {
    required: true,
    type: Date,
  },
});

// Models
const User = mongoose.model("User", userSchema);
const Artwork = mongoose.model("Artwork", artworkSchema);

export { mongoose, User, Artwork };
