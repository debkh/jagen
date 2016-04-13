'use strict';

(function () {

  function NewResource($resource) {
    return $resource('/api/news/:id/', {
      id: '@id',
    }, {
      update: {
          method: 'PUT',
          params: {
          },
      },
    });
  }

  angular.module('jagenApp')
  .factory('New', NewResource);

})();
