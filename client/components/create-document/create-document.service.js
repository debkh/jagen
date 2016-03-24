'use strict';

(function () {

  class CreateDocumentService{
    constructor($mdDialog) {
      this.$mdDialog = $mdDialog;
    }

    modal() {
      return this.$mdDialog.show({
        templateUrl: 'components/create-document/create-document.html',
        clickOutsideToClose: true,
        controllerAs: 'vm',
        controller: ModalController
      });
      // .catch(console.log.bind(console))
    }
  }

  class ModalController{
    constructor($mdDialog, DocumentService) {
      this.DocumentService = DocumentService;
      this.$mdDialog = $mdDialog;
    }

    save(){
      if(this.formSave.$invalid){
        return;
      }

      // create document
      this.DocumentService.create(this.formData)
      .then((response) => {
        this.$mdDialog.hide(response);
      });
    }

    close(){
      this.$mdDialog.cancel();
    }
  }

  angular.module('jagenApp')
  .service('CreateDocumentService', CreateDocumentService);

})();
