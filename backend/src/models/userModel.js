import mongoose from 'mongoose';


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

export default mongoose.model('User', UserSchema);
