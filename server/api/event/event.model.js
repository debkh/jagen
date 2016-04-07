'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Event', EventSchema);
