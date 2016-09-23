const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
.get((req, res) => {
  const responseJson = {hi: 'there.'};
  res.json(responseJson);
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('bello everyone :\')');
});

app.listen(port, () => {
  console.log('Running on PORT: ' + port);
});
