import express from 'express';
import routes from '../src/routes/routes.js';
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import config from '../utils/config';


const app = express();
const PORT = 4000;

// mongoose connection
mongoose.connect('mongodb://localhost/nodeExpress', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// rich url-encoded format
app.use(express.urlencoded({ extended: true }));
// body parser
app.use(express.json());

// JWT setup
app.use((req, res, next) => {
  if (req?.headers?.authorization?.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decode) => {
      if (err) {
        req.user = undefined;
      }
      // for loginRequired middleware
      req.user = decode;
      next();
    });

  } else {
    req.user = undefined;
    next();
  }
});

// routes
routes(app);

// serve static files
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send({ message: `Listening on port ${PORT}` });
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));