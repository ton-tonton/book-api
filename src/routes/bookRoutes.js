const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });
    })
    .get((req, res) => {
      const query = req.query;
      Book.find(query, (err, books) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(books);
        }
      });
    });

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('book not found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const book = req.book;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });
    })
    .patch((req, res) => {
      const book = req.book;
      let key;
      if (req.body._id) {
        delete req.body._id;
      }
      for (key in req.body) {
        book[key] = req.body[key];
      }
      book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
