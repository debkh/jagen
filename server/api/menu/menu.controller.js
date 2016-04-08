/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/menu              ->  index
 * POST    /api/menu              ->  create
 * GET     /api/menu/:id          ->  show
 * PUT     /api/menu/:id          ->  update
 * DELETE  /api/menu/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Menu from './menu.model';

function populated(obj, relations) {
  return function(response) {
    return obj.findById(response._id)
    .populate(relations)
    .exec();
  };
}

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
    var updated = _.assign(entity, updates);
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
  return Menu.find()
  .populate('document')
  .populate('menu')
  .populate({
    path: 'subItems',
    model: 'Menu',
    populate: [
      {
        path: 'document',
        model: 'Document'
      },{
        path: 'menu',
        model: 'Menu'
      }
    ]
  })
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Menu from the DB
export function show(req, res) {
  return Menu.findOne({slug: req.params.slug}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Menu in the DB
export function create(req, res) {
  delete req.body._id;
  return Menu.create(req.body)
  .then(populated(Menu, ['document', 'menu']))
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Updates an existing Menu in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Menu.findById(req.params.id)
    .exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(populated(Menu, ['document', 'menu']))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Menu from the DB
export function destroy(req, res) {
  return Menu.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
