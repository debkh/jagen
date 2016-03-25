'use strict';
(function () {

  class DocumentController {
    constructor(lodash, DocumentModel, User, $q) {
      // this.User = User;
      this.$q = $q;
      this.DocumentModel = DocumentModel;
      this.lodash = lodash;
      this.onInit();
    }

    onInit(){
      this.DocumentModel.get({
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
