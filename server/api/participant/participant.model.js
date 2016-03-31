'use strict';

import mongoose from 'mongoose';

var ParticipantSchema = new mongoose.Schema({
    last_name: String,
    first_name: String,
    middle_name: String,
    dob: String,
    phone: String,
    phone_family: String,
    email: String,
    sports_category: String,
    country: String,
    index: String,
    city: String,
    street: String,
    home: String,
    _vessel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vessel'
    }
});

ParticipantSchema.pre('find', function(next){
    this.populate('_vessel', 'title');
    next();
});

ParticipantSchema.pre('findOne', function(next){
    this.populate('_vessel', 'title');
    next();
});

export default mongoose.model('Participant', ParticipantSchema);
