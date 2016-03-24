'use strict';

var app = require('../..');
import request from 'supertest';

var newVessel;

describe('Vessel API:', function() {

  describe('GET /api/vessels', function() {
    var vessels;

    beforeEach(function(done) {
      request(app)
        .get('/api/vessels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vessels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vessels.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/vessels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vessels')
        .send({
          name: 'New Vessel',
          info: 'This is the brand new vessel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVessel = res.body;
          done();
        });
    });

    it('should respond with the newly created vessel', function() {
      newVessel.name.should.equal('New Vessel');
      newVessel.info.should.equal('This is the brand new vessel!!!');
    });

  });

  describe('GET /api/vessels/:id', function() {
    var vessel;

    beforeEach(function(done) {
      request(app)
        .get('/api/vessels/' + newVessel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vessel = res.body;
          done();
        });
    });

    afterEach(function() {
      vessel = {};
    });

    it('should respond with the requested vessel', function() {
      vessel.name.should.equal('New Vessel');
      vessel.info.should.equal('This is the brand new vessel!!!');
    });

  });

  describe('PUT /api/vessels/:id', function() {
    var updatedVessel;

    beforeEach(function(done) {
      request(app)
        .put('/api/vessels/' + newVessel._id)
        .send({
          name: 'Updated Vessel',
          info: 'This is the updated vessel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVessel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVessel = {};
    });

    it('should respond with the updated vessel', function() {
      updatedVessel.name.should.equal('Updated Vessel');
      updatedVessel.info.should.equal('This is the updated vessel!!!');
    });

  });

  describe('DELETE /api/vessels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vessels/' + newVessel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vessel does not exist', function(done) {
      request(app)
        .delete('/api/vessels/' + newVessel._id)
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
