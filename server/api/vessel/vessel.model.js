'use strict';

import mongoose from 'mongoose';

var VesselSchema = new mongoose.Schema({
  title: String,
  number_sail: String,
  number_registration: String,
  windage: String,
  material: String,
  color_body: String,
  power_motor: String,
  length_body: String,
  with_body: String,
  height: String,
  capacity: String,
  crew: String,
  type_vessel: String,
  type_body: String,
  type_construction: String,
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

VesselSchema.pre('find', function(next){
    this.populate('user', 'name email');
    next();
});

VesselSchema.pre('findOne', function(next){
    this.populate('user', 'name email');
    next();
});

export default mongoose.model('Vessel', VesselSchema);
