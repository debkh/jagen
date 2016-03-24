'use strict';

(function () {

  class DocumentController {

    constructor($mdDialog, DocumentService, CreateDocumentService) {
      this.$mdDialog = $mdDialog;
      this.CreateDocumentService = CreateDocumentService;
      this.documentService = DocumentService;

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

    modalCreateDocument() {
      this.CreateDocumentService.modal()
      .catch(console.log.bind(console));
    }

  }

  angular.module('jagenApp.admin')
  .controller('DocumentController', DocumentController);

})();