/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vessels              ->  index
 * POST    /api/vessels              ->  create
 * GET     /api/vessels/:id          ->  show
 * PUT     /api/vessels/:id          ->  update
 * DELETE  /api/vessels/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Vessel from './vessel.model';

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

// Gets a list of Vessels
export function index(req, res) {
  var query = req.query.query && JSON.parse(req.query.query);
    console.log(JSON.parse(req.query.query));
  return Vessel.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Vessel from the DB
export function show(req, res) {
  return Vessel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Vessel in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Vessel.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Vessel in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Vessel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Vessel from the DB
export function destroy(req, res) {
  return Vessel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
