const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Create Book', () => {
  it('should allow to create a book and return _id', (done) => {
    const book = { title: 'new book', author: 'unknown', genre: 'unknown' };
    agent
      .post('/api/books')
      .send(book)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.remove().exec();
    done();
  });
});
