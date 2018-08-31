import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

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
  userCollection: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
  }],
});

const artworkSchema = new Schema({
  title: {
    default: '',
    type: String,
  },
  artist: {
    default: '',
    type: String,
  },
  year: {
    default: '',
    type: String,
  },
  city: {
    default: '',
    type: String,
  },
  museum: {
    default: '',
    type: String,
  },
  medium: {
    default: '',
    type: String,
  },
  dimensions: {
    default: '',
    type: String,
  },
  imgURL: {
    default: '',
    type: String,
  },
  dateViewed: {
    default: null,
    type: Date,
  },
});

// Plugins
artworkSchema.plugin(findOrCreate);

// Models
const User = mongoose.model("User", userSchema);
const Artwork = mongoose.model("Artwork", artworkSchema);

export { mongoose, User, Artwork };
