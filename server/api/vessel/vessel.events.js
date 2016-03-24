/**
 * Vessel model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vessel from './vessel.model';
var VesselEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VesselEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vessel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VesselEvents.emit(event + ':' + doc._id, doc);
    VesselEvents.emit(event, doc);
  }
}

export default VesselEvents;
