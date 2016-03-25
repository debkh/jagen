'use strict';

import mongoose from 'mongoose';
import User from '../user/user.model';

var DocumentSchema = new mongoose.Schema({
  // idAuthor: {type: String, required: true},
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {type: String, required: true},
  text: {type: String, required: true},
  fileName: {type: String}
});

export default mongoose.model('Document', DocumentSchema);
