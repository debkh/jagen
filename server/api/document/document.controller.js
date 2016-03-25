/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/documents              ->  index
 * POST    /api/documents              ->  create
 * GET     /api/documents/:id          ->  show
 * PUT     /api/documents/:id          ->  update
 * DELETE  /api/documents/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import * as fs from 'fs';
import * as url from 'url';
import Document from './document.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
export function index(req, res) {
  return Document.find()
  .populate('user')
  .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Document from the DB
export function show(req, res) {
  return Document.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Document in the DB
export function create(req, res) {
  _.assignIn(req.body, {user: req.user._id});

  return Document.create(req.body)
    .then(function (response) {
      return Document.findById(response._id)
      .populate('user')
      .exec();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function uploadPhoto(req, res, next) {
  if(!req.files.file){
    next();
    return;
  }

  var tmp_path = req.files.file.path;
  var target_path = `client/assets/uploads/documents/${req.files.file.name}`;

  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    fs.unlink(tmp_path, function() {
      if (err) throw err;
      req.body.fileName = req.files.file.name;
      next();
    });
  });
}

// Updates an existing Document in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Document.findById(req.params.id)
    .populate('user')
    .exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Document from the DB
export function destroy(req, res) {
  return Document.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
