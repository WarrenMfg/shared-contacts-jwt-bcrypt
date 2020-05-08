import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  // password from user is encrypted at this point so bcrypt can compare hash-to-hash
  return bcrypt.compareSync(password, hashPassword);
};