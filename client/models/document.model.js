'use strict';

(function () {

  function DocumentResource($resource) {
    return $resource('/api/document/:id/', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
      }
    });
  }

  angular.module('jagenApp')
  .factory('Document', DocumentResource);

})();
