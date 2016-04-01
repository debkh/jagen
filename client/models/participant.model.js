'use strict';

(function () {

  function ParticipantResource($resource) {
    return $resource('/api/participants/:controller/:id', {
      id: '@id',
    }, {
      update: {
          method: 'PUT',
          params: {
          },
      },

      byVessel: {
        method: 'GET',
        isArray: true,
        params: {
            controller: 'vessel',
        }
      }
    });
  }

  angular.module('jagenApp')
  .factory('Participant', ParticipantResource);

})();
