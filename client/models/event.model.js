'use strict';

(function () {

  function EventResource($resource) {
    return $resource('/api/events/:id/', {
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
  .factory('Event', EventResource);

})();
