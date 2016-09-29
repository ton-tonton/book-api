const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .post((req, res) => {
      const book = new Book(req.body);
      if (book.save()) {
        res.status(201).send(book);
      }
      return false;
    })
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

  bookRouter.route('/:bookId')
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
  return bookRouter;
};

module.exports = routes;
