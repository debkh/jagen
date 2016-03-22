'use strict';
(function () {

  class DocumentController {
    constructor(lodash, Document, User, $q) {
      // this.User = User;
      this.$q = $q;
      this.Document = Document;
      this.lodash = lodash;
      this.onInit();
    }

    onInit(){
      this.Document.get({
        // type: 'document'
      }).$promise.then(function (response) {
        // debugger;
      }, function (response) {
        // debugger;
      })
    }
  }

  angular.module('jagenApp.document')
  .component('documentText', {
    bindings: {
    },
    templateUrl: 'app/document/text/text.html',
    controller: DocumentController,
    controllerAs: 'vm'
  });

})();
