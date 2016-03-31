/**
 * Participant model events
 */

'use strict';

import {EventEmitter} from 'events';
import Participant from './participant.model';
var ParticipantEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ParticipantEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Participant.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ParticipantEvents.emit(event + ':' + doc._id, doc);
    ParticipantEvents.emit(event, doc);
  }
}

export default ParticipantEvents;
