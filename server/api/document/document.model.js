'use strict';

import mongoose from 'mongoose';

var DocumentSchema = new mongoose.Schema({
  idAuthor: {type: String, required: true},
  title: {type: String, required: true},
  text: {type: String, required: true}
});

export default mongoose.model('Document', DocumentSchema);
