const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/bookModel');

const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    const query = req.query;
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
      return false;
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
      return false;
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('bello everyone :\')');
});

app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
});
