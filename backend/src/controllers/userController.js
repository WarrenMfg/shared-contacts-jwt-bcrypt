import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import config from '../../utils/config';


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
  // save then send response or err
  newUser.save()
    .then(user => {
      // JSON will omit properties with values of undefined
      user.hashPassword = undefined;
      res.send(user);
    })
    .catch(err => res.status(400).json({ message: err.message }));
};


export const login = (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Authentication failed. Wrong user name or password.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res.status(401).json({ message: 'Authentication failed. Wrong user name or password.' });
        } else {
          res.send({ token: jwt.sign({ email: user.email, userName: user.userName, _id: user._id }, config.secret, {expiresIn: config.expiresIn}) })
        }
      }
    })
    .catch(err => res.status(400).json({ message: err.message }));
};
