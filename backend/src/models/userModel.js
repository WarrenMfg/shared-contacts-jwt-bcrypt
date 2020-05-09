import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
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

export const User = mongoose.model('User', UserSchema);


UserSchema.methods.comparePassword = (password, hashPassword) => {
  // password from user is encrypted at this point so bcrypt can compare hash-to-hash
  return bcrypt.compareSync(password, hashPassword);
};