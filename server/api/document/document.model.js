'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var mongooseSlug = require('mongoose-slug');
import User from '../user/user.model';

var DocumentSchema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, required: true},
  text: {type: String, required: true},
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // fileName: {type: String}
});

// DocumentSchema.pre('save', function (next) {
//   delete this.title;
//   next();
// });
DocumentSchema.plugin(mongooseSlug('title'));

export default mongoose.model('Document', DocumentSchema);
