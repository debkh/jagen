'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var mongooseSlug = require('mongoose-slug');

var MenuSchema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, required: true},
  index: {type: String, default: 1},
  type: {type: String, required: true},
  menu: {type: Schema.Types.ObjectId, ref: 'Menu'},
  document: {type: Schema.Types.ObjectId, ref: 'Document'},
  subItems: [{type: Schema.Types.ObjectId, ref: 'Menu'}]
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

//populate SLUG field
MenuSchema.plugin(mongooseSlug('title'));

//exclude fields
MenuSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    switch (ret.type) {
      case 'menu':
        delete ret.document;
        break;
      case 'document':
        // delete ret.document;
        delete ret.subItems;
        break;
      case 'spinner':
        delete ret.document;
        delete ret.subItems;
        break;
    }
    return ret;
  }
});

MenuSchema.post('save', updateSubItemsPostSave);
function updateSubItemsPostSave(next) {
  let self = this
  if(!this.menu){
    return
  }

  // delete not selected subItems from the menu
  MenuModel.find({'subItems': this._id})
  .where('_id').nin(self.menu)
  .exec(function (err, res) {
    if (err) return handleError(err);

    _.forEach(res, (entity, i) => {
      entity.subItems = _.filter(entity.subItems, function(id) {
        return id.toString() != self._id;
      });
      entity.save();
    });
  });


  // save subItem documents from the menu
  MenuModel.findById(this.menu, function (err, res) {
    if (err) return handleError(err);
    if(res.subItems.indexOf(self._id) < 0){
      res.subItems.push(self._id);
      res.save();
    }
  });
}

let MenuModel = mongoose.model('Menu', MenuSchema);
export default MenuModel;
