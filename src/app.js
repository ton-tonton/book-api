const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/bookModel');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = require('./routes/bookRoutes.js')(Book);

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('bello everyone :\')');
});

app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
});
