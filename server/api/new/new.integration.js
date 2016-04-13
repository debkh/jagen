'use strict';

var app = require('../..');
import request from 'supertest';

var newNew;

describe('New API:', function() {

  describe('GET /api/news', function() {
    var news;

    beforeEach(function(done) {
      request(app)
        .get('/api/news')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          news = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      news.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/news', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/news')
        .send({
          name: 'New New',
          info: 'This is the brand new new!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNew = res.body;
          done();
        });
    });

    it('should respond with the newly created new', function() {
      newNew.name.should.equal('New New');
      newNew.info.should.equal('This is the brand new new!!!');
    });

  });

  describe('GET /api/news/:id', function() {
    var new;

    beforeEach(function(done) {
      request(app)
        .get('/api/news/' + newNew._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          new = res.body;
          done();
        });
    });

    afterEach(function() {
      new = {};
    });

    it('should respond with the requested new', function() {
      new.name.should.equal('New New');
      new.info.should.equal('This is the brand new new!!!');
    });

  });

  describe('PUT /api/news/:id', function() {
    var updatedNew;

    beforeEach(function(done) {
      request(app)
        .put('/api/news/' + newNew._id)
        .send({
          name: 'Updated New',
          info: 'This is the updated new!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNew = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNew = {};
    });

    it('should respond with the updated new', function() {
      updatedNew.name.should.equal('Updated New');
      updatedNew.info.should.equal('This is the updated new!!!');
    });

  });

  describe('DELETE /api/news/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/news/' + newNew._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when new does not exist', function(done) {
      request(app)
        .delete('/api/news/' + newNew._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
