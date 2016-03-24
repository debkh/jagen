'use strict';

import mongoose from 'mongoose';

var VesselSchema = new mongoose.Schema({
  title: String,
  number_sail: String,
  active: Boolean
});

export default mongoose.model('Vessel', VesselSchema);
