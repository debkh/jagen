'use strict';

import mongoose from 'mongoose';
import _ from 'lodash';
var Schema = mongoose.Schema;
var mongooseSlug = require('mongoose-slug');
import User from '../user/user.model';
import Menu from '../menu/menu.model';

var DocumentSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  slug: {type: String},
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // menu : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  // fileName: {type: String}
});

DocumentSchema.post('save', function (next) {
  // updateMenuPostSave(this);
});

function updateMenuPostSave(_this) {
  // delete not selected documents from the menu
  Menu.find({'document': _this._id})
  .where('_id').nin(_this.menu)
  .exec(function (err, entities) {
    if (err) return handleError(err);

    _.forEach(entities, (entity, i) => {
      entity.document = _.filter(entity.document, function(id) {
        return id.toString() != _this._id;
      });
      entity.save(function (err,entities) {
        if(err) {
          console.error('ERROR!');
        }
      })
    });
  });

  // save selected documents from the menu
  Menu.find({
    '_id': { $in: _this.menu}
  }, function(err, entities){
    if (err) return handleError(err);
    // add document _id
    _.forEach(entities, (entity, i) => {
      if(entity.document.indexOf(_this._id) < 0){
        entity.document.push(_this._id);
      }
      entity.save(function (err) {
        if(err) {
          console.error('ERROR!');
        }
      });
    });
  });
}

DocumentSchema.plugin(mongooseSlug('title'));

export default mongoose.model('Document', DocumentSchema);
