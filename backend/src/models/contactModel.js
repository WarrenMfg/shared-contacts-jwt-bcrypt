import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

export const Contact = mongoose.model('Contact', ContactSchema);
