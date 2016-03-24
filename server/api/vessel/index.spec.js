'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vesselCtrlStub = {
  index: 'vesselCtrl.index',
  show: 'vesselCtrl.show',
  create: 'vesselCtrl.create',
  update: 'vesselCtrl.update',
  destroy: 'vesselCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vesselIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vessel.controller': vesselCtrlStub
});

describe('Vessel API Router:', function() {

  it('should return an express router instance', function() {
    vesselIndex.should.equal(routerStub);
  });

  describe('GET /api/vessels', function() {

    it('should route to vessel.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vesselCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/vessels/:id', function() {

    it('should route to vessel.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vesselCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/vessels', function() {

    it('should route to vessel.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vesselCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/vessels/:id', function() {

    it('should route to vessel.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'vesselCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vessels/:id', function() {

    it('should route to vessel.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'vesselCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vessels/:id', function() {

    it('should route to vessel.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vesselCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
