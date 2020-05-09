import mongoose from 'mongoose';
import { Contact } from '../models/contactModel';


// one
export const addNewContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.send(newContact);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactID).lean().exec();

    if (!contact) {
      res.status(400).json({ message: 'No contact found.' });
    } else {
      res.send(contact);
    }

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate({ _id: req.params.contactID}, req.body, { new: true }).lean().exec();

    if (!updatedContact) {
      res.status(400).json({ message: 'No contact found.' });
    } else {
      res.send(updatedContact);
    }

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndRemove({ _id: req.params.contactID}).lean().exec();

    if (!deletedContact) {
      res.status(400).json({ message: 'No contact found.' });
    } else {
      res.send(deletedContact);
    }

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};




// many
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).lean().exec();

    res.send(contacts);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};