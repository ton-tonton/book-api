const should = require('should');
const sinon = require('sinon');

class Book {
  constructor(book) {
    this.book = book;
  }

  save() {
    console.log(this.book);
  }
}

const bookController = require('../../src/controllers/bookController.js')(Book);

describe('Book Controller Test', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      const req = {
        body: {
          author: 'Unknown',
        },
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
