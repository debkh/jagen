'use strict';

(function () {

  function VesselResource($resource) {
    return $resource('/api/vessels/:id/', {
      id: '@id',
    }, {
      update: {
          method: 'PUT',
          params: {
          },
      },
      delete: {
          method: 'DELETE',
          params: {
          },
      }
    });
  }

  angular.module('jagenApp')
  .factory('Vessel', VesselResource);

})();
