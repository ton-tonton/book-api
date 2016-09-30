const express = require('express');

const routes = (Book, bookController) => {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.index);

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
    .get(bookController.get)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.remove);
  return bookRouter;
};

module.exports = routes;
