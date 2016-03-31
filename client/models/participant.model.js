'use strict';

(function () {

  function ParticipantResource($resource) {
    return $resource('/api/participants/:id', {
      id: '@id',
    }, {
        get: {
            method: 'GET',
            params: {
                _vessel: '56fce2fc1cdc4f160b8b2051'
            }
        },
      update: {
          method: 'PUT',
          params: {
          },
      },
      getParicipant: {
        method: 'GET',
        params: {
          controller: 'participant'
        }
      }
    });
  }

  angular.module('jagenApp')
  .factory('Participant', ParticipantResource);

})();
