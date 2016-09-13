var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
.get(function(req, res) {
  var responseJson = {hi: 'there.'};
  res.json(responseJson);
});

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('bello everyone :)');
});

app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});
