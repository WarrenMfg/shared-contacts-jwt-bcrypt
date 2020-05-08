import {
  addNewContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contactController';
import {
  loginRequired,
  register,
  login
} from '../controllers/userController';


const routes = app => {

  // registration
  app.route('/auth/register')
    .post(register)



  // login
  app.route('/auth/login')
    .post(login)



  // one
  app.route('/contact')
    .all(loginRequired)
    .post(addNewContact);

  app.route('/contact/:contactID')
    .all(loginRequired)
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);



  // many
  app.route('/contacts')
    .all(loginRequired)
    .get(getContacts);

};

export default routes;