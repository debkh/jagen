'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var newCtrlStub = {
  index: 'newCtrl.index',
  show: 'newCtrl.show',
  create: 'newCtrl.create',
  update: 'newCtrl.update',
  destroy: 'newCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var newIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './new.controller': newCtrlStub
});

describe('New API Router:', function() {

  it('should return an express router instance', function() {
    newIndex.should.equal(routerStub);
  });

  describe('GET /api/news', function() {

    it('should route to new.controller.index', function() {
      routerStub.get
        .withArgs('/', 'newCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/news/:id', function() {

    it('should route to new.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'newCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/news', function() {

    it('should route to new.controller.create', function() {
      routerStub.post
        .withArgs('/', 'newCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/news/:id', function() {

    it('should route to new.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'newCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/news/:id', function() {

    it('should route to new.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'newCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/news/:id', function() {

    it('should route to new.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'newCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
