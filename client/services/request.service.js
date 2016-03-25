'use strict';

(function () {

  class RequestService {
    constructor() {
    }

    toFormData(data){
      if (data === undefined){
        return data;
      }

      var formData = new FormData();
      function set(key, value) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          if (typeof (value) != 'undefined') {
            formData.append(key, value);
          }
        }
      }

      for (var key in data) {
        set(key, data[key]);
      }
      return formData;
    }
  }

  angular.module('jagenApp')
  .service('RequestService', RequestService);

})();
