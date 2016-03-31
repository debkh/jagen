/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/participants              ->  index
 * POST    /api/participants              ->  create
 * GET     /api/participants/:id          ->  show
 * PUT     /api/participants/:id          ->  update
 * DELETE  /api/participants/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Participant from './participant.model';

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

// Gets a list of Participants
export function index(req, res) {
    console.log(req.params);
  return Participant.find({_vessel: '56fce2fc1cdc4f160b8b2051'}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Participant from the DB
export function show(req, res) {
  return Participant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Participant in the DB
export function create(req, res) {
  return Participant.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Participant in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Participant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Participant from the DB
export function destroy(req, res) {
  return Participant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
