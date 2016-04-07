'use strict';

(function() {

  class eventCreateController {
      constructor($state, $mdDialog, Event, lodash, ModalService, EventService) {
          this.$state = $state;
          this.lodash = lodash;
          this.EventService = EventService;
          this.ModalService = ModalService;
          this.$mdDialog = $mdDialog;
          this.Event = Event;
      }

      save(form){
          if (form.$valid) {
              this.EventService.save(this.event).then((response)=> {
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
  .controller('eventCreateController', eventCreateController);

})();