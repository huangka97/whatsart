import express from 'express';
import crypto from 'crypto';
import { User } from '../models/models.js';

const router = express.Router();

export default (passport) => {
  // POST Login Request
  router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
      res.json({ id: req.user._id, success: true });
    },
  );

  // Signup Validation Helper
  const validateSignup = userData => (userData.email && userData.firstName
    && userData.lastName && userData.username && userData.password);

  // sha256 Hashing For Passwords
  const hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  };

  // POST Signup Request
  router.post('/signup', (req, res) => {
    if (!validateSignup(req.body)) {
      res.json({ success: false });
    }
    else {
      const { firstName, lastName, password } = req.body;
      let { username, email } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();
      User.find({ $or: [ { email: email }, { username: username } ]})
      .then((users) => {
        if (users.length) {
          res.json({ success: false, emailTaken: users[0].email === email, userTaken: users[0].username === username });
        }
        else {
          const user = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashPassword(password),
            artworkCollection: [],
          });
          return user.save();
        }
      })
      .then(() => res.json({ success: true }))
      .catch((err) => res.json({ success: false, msg: 'MongoDB Error', error: err }));
    }
  });

  // GET Logout Request
  router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
  });

  return router;
};
