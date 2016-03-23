'use strict';

(function () {

  class DocumentController {

    constructor($mdToast, User, $timeout, DocumentService) {
      this.$timeout = $timeout;
      this.documentService = DocumentService;
      this.$mdToast = $mdToast;

      this.documents = [];
      this.gridOptions = {
        order: 'title',
      };

      this.onInit();
    }

    onInit(){
      this.getCollection()
      .catch(console.log.bind(console));
    }

    getCollection(){
      return this.documentService.getCollection()
      .then((response) => {
        this.documents = response;
        return this.documents;
      });
    }

  }

  angular.module('jagenApp.admin')
  .controller('DocumentController', DocumentController);

})();