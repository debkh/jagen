'use strict';

(function() {

  class DocumentController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
    }
  }

  angular.module('jagenApp.admin')
  .controller('DocumentController', DocumentController);

})();