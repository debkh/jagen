'use strict';

(function() {

  class newCreateController {
      constructor($state, $mdDialog, lodash, ModalService, NewService) {
          this.$state = $state;
          this.lodash = lodash;
          this.NewService = NewService;
          this.ModalService = ModalService;
          this.$mdDialog = $mdDialog;
          this.new = {};
          this.onInit();
      }

      onInit(){
          if(this.prefillingData){
              this.new = angular.copy(this.prefillingData);
          }
      }
      save(form){
          if (form.$valid) {
              this.NewService.save(this.new)
              .then((response)=> {
                  this.$mdDialog.hide(response);
              });
          }
      }


      /**
       * close dialog(popup) window
       */
      close(){
          this.$mdDialog.cancel();
      }
  }

  angular.module('jagenApp.admin')
  .controller('newCreateController', newCreateController);

})();