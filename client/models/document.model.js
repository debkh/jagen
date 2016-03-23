'use strict';

(function () {

  function DocumentResource($resource) {
    return $resource('/api/document/:id/', {
      id: '@id',
    }, {
      get: {
        method: 'GET',
        // isArray: true,
        params: {
        },
      }
    });
  }

  angular.module('jagenApp')
  .factory('Document', DocumentResource);

})();
