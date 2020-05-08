import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized user!' });
  }
};

export const register = (req, res) => {
  const newUser = new User(req.body);
  // encrypt first
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      user.hashPassword = undefined;
      res.send(user);
    }
  });
};

export const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res.status(401).json({ message: 'Authentication failed. No user found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        res.send({ token: jwt.sign({ email: user.email, username: user.username, _id: user._id }, 'restfulAPI') })
      }
    }
  });
};