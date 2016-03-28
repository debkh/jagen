/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/asdf              ->  index
 * POST    /api/asdf              ->  create
 * GET     /api/asdf/:id          ->  show
 * PUT     /api/asdf/:id          ->  update
 * DELETE  /api/asdf/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import * as fs from 'fs';
import * as url from 'url';

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

export function uploadImage(req, res, next) {
  if(!req.files.file){
    next();
    return;
  }

  var date = new Date();
  var time = date.getTime();
  var fileName = `${time}-${req.files.file.name}`;
  var tmp_path = req.files.file.path;
  var target_path = `client/assets/uploads/editor/${fileName}`;

  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    fs.unlink(tmp_path, function() {
      if (err) throw err;
      res.status(200).json({link: `assets/uploads/editor/${fileName}`});
    });
  });
}