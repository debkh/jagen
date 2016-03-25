'use strict';

(function () {
  function DocumentResource($resource, RequestService) {
    return $resource('/api/document/:id/', {
      id: '@id',
    }, {
      update: {
        method: 'PUT',
        transformRequest: RequestService.toFormData,
        headers: {'Content-Type': undefined},
      },
      save: {
        method:'POST',
        transformRequest: RequestService.toFormData,
        headers: {'Content-Type': undefined},
      },
    });
  }

  angular.module('jagenApp')
  .factory('DocumentModel', DocumentResource);

})();