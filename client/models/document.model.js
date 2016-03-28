'use strict';

(function () {
  function DocumentResource($resource, RequestService) {
    return $resource('/api/document/:action/:actionId',{
      action: '@action',
      actionId: '@actionId',
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