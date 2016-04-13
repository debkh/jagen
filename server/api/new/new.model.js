'use strict';

import mongoose from 'mongoose';

var NewSchema = new mongoose.Schema({
  title: String,
  description: String,
  active: Boolean
});

export default mongoose.model('New', NewSchema);
