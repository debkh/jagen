'use strict';

(function () {

  function DocumentResource($resource) {
    return $resource('/api/document/:id/', {
      id: '@id',
    }, {
      update: {
        method: 'PUT',
        params: {
        },
      }
    });
  }

  angular.module('jagenApp')
  .factory('Document', DocumentResource);

})();
