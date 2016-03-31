'use strict';

var app = require('../..');
import request from 'supertest';

var newParticipant;

describe('Participant API:', function() {

  describe('GET /api/participants', function() {
    var participants;

    beforeEach(function(done) {
      request(app)
        .get('/api/participants')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          participants = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      participants.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/participants', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/participants')
        .send({
          name: 'New Participant',
          info: 'This is the brand new participant!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newParticipant = res.body;
          done();
        });
    });

    it('should respond with the newly created participant', function() {
      newParticipant.name.should.equal('New Participant');
      newParticipant.info.should.equal('This is the brand new participant!!!');
    });

  });

  describe('GET /api/participants/:id', function() {
    var participant;

    beforeEach(function(done) {
      request(app)
        .get('/api/participants/' + newParticipant._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          participant = res.body;
          done();
        });
    });

    afterEach(function() {
      participant = {};
    });

    it('should respond with the requested participant', function() {
      participant.name.should.equal('New Participant');
      participant.info.should.equal('This is the brand new participant!!!');
    });

  });

  describe('PUT /api/participants/:id', function() {
    var updatedParticipant;

    beforeEach(function(done) {
      request(app)
        .put('/api/participants/' + newParticipant._id)
        .send({
          name: 'Updated Participant',
          info: 'This is the updated participant!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedParticipant = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedParticipant = {};
    });

    it('should respond with the updated participant', function() {
      updatedParticipant.name.should.equal('Updated Participant');
      updatedParticipant.info.should.equal('This is the updated participant!!!');
    });

  });

  describe('DELETE /api/participants/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/participants/' + newParticipant._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when participant does not exist', function(done) {
      request(app)
        .delete('/api/participants/' + newParticipant._id)
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
