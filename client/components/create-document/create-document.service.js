'use strict';

(function () {

  class CreateDocumentService{
    constructor($mdDialog) {
      this.$mdDialog = $mdDialog;
    }

    modal(data) {
      return this.$mdDialog.show({
        templateUrl: 'components/create-document/create-document.html',
        clickOutsideToClose: true,
        controllerAs: 'vm',
        bindToController: true,
        locals: {prefillingData: data},
        controller: ModalController
      });
      // .catch(console.log.bind(console))
    }
  }

  class ModalController{
    constructor($mdDialog, DocumentService) {
      this.DocumentService = DocumentService;
      this.$mdDialog = $mdDialog;
      this.formData = {};

      this.onInit();
    }

    onInit(){
      this.formData = this.prefillingData;
    }

    save(){
      if(this.formSave.$invalid){
        return;
      }

      // create document
      this.DocumentService.save(this.formData)
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
