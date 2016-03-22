'use strict';
(function () {

  class DocumentController {
    constructor(lodash) {
      this.lodash = lodash;
    }
  }

  angular.module('jagenApp.document')
  .component('documentText', {
    templateUrl: 'app/document/text/text.html',
    controller: DocumentController
  });

})();
