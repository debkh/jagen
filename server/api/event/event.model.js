'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  title: String,
  start: {
      type: Date,
      default: Date.now
  },
  end: {
      type: Date,
      default: Date.now },
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Event', EventSchema);
