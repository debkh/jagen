'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: {
      type: Date,
      //default: Date.now
  },
  end: {
      type: Date,
      //3default: Date.now
  },
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Event', EventSchema);
