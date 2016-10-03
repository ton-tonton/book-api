const bookController = (Book) => {
  const index = (req, res) => {
    const query = req.query;
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  const get = (req, res) => {
    res.json(req.book);
  };

  const post = (req, res) => {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
      return;
    }
    book.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(book);
      }
    });
  };

  const put = (req, res) => {
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
  };

  const patch = (req, res) => {
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
  };

  const remove = (req, res) => {
    const book = req.book;
    book.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('removed');
      }
    });
  };

  return {
    index,
    get,
    post,
    put,
    patch,
    remove,
  };
};

module.exports = bookController;
