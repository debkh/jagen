'use strict';

(function () {

  class DocumentController {

    constructor($mdDialog, DocumentService, CreateDocumentService, lodash) {
      this.lodash = lodash
      this.$mdDialog = $mdDialog;
      this.CreateDocumentService = CreateDocumentService;
      this.DocumentService = DocumentService;

      this.documents = [];
      this.selected = [];
      this.gridOptions = {
        order: 'title',
        rowSelection: true,
      };

      this.onInit();
    }

    onInit(){
      this.getCollection()
      .catch(console.log.bind(console));
    }

    getCollection(){
      return this.DocumentService.getCollection()
      .then((response) => {
        this.documents = response;
        return this.documents;
      });
    }

    modalCreateDocument() {
      this.CreateDocumentService.modal()
      .catch(console.log.bind(console));
    }

    remove(data) {
      return this.DocumentService.remove(data)
      .then((response) => {
        this.lodash.remove(this.selected);
        return response;
      });
    }

  }

  angular.module('jagenApp.admin')
  .controller('DocumentController', DocumentController);

})();