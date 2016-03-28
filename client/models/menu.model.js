'use strict';

(function () {
  function MenuResource($resource, RequestService) {
    return $resource('/api/menu/:action/:actionId', {
      action: '@action',
      actionId: '@actionId',
    }, {
      update: {
        method: 'PUT',
      }
    });
  }

  angular.module('jagenApp')
  .factory('MenuModel', MenuResource);

})();