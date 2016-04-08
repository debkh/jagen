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
    vm = this;
    constructor($scope, $mdDialog, DocumentService, lodash, TextEditorService, MenuService) {
      // this.menuCollection = MenuService.collection;
      this.$scope = $scope;
      this.MenuService = MenuService;
      this.lodash = lodash;
      this.DocumentService = DocumentService;
      this.$mdDialog = $mdDialog;
      this.froalaOptions = TextEditorService.options;
      this.formData = {};

      this.onInit();
    }

    // get prefillingData() {
    //   return this.prefillingData;
    // }
    // set prefillingData(val) {
    //   this.formData = val;
    //   this.formData.menu = this.lodash.map(this.formData.menu, '_id');
    //   console.log(this.lodash);
    // }

    onInit(){
      this.$scope.$watch('this.prefillingData', () => {
        angular.copy(this.prefillingData, this.formData);
        this.formData.menu = this.lodash.map(this.formData.menu, '_id');
        console.log(this.formData.menu);
      });
    }

    save(){
      if(this.formSave.$invalid){
        return;
      }

      // create document
      // this.formData.file = this.lodash.get(this.formData, 'files[0].lfFile');
      this.DocumentService.save(this.formData)
      .then((response) => {
        // set response data to document
        this.lodash.merge(this.prefillingData, response);
        // hide modal
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
