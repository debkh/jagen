'use strict';

(function () {

  class CreateMenuService{
    constructor($mdDialog) {
      this.$mdDialog = $mdDialog;
    }

    modal(data) {
      return this.$mdDialog.show({
        templateUrl: 'components/create-menu/create-menu.html',
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
    constructor($mdDialog, MenuService, lodash, TextEditorService) {
      // this.prefillingData.title = 'qqqqqqqqqqqqqqqqqqqq';
      this.lodash = lodash;
      this.MenuService = MenuService;
      this.$mdDialog = $mdDialog;
      this.froalaOptions = TextEditorService.options;

      this.radioTypeData = []
      this.formData = {};

      this.onInit();
    }

    onInit(){
      this.radioTypeData = [
        { label: 'Document', value: 'document' },
        { label: 'Menu', value: 'menu' },
        { label: 'Spinner', value: 'spinner' }
      ];
      this.formData.type = 'document';
      angular.extend(this.formData, this.prefillingData);
    }

    save(){
      if(this.formSave.$invalid){
        return;
      }

      // create menu
      // this.formData.file = this.lodash.get(this.formData, 'files[0].lfFile');
      this.MenuService.save(this.formData)
      .then((response) => {
        this.lodash.merge(this.prefillingData, response);

        // hide modal
        this.$mdDialog.hide(this.prefillingData);
      });
    }

    close(){
      this.$mdDialog.cancel();
    }
  }

  angular.module('jagenApp')
  .service('CreateMenuService', CreateMenuService);

})();
