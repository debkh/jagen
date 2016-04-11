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
          this.event = {};

          this.myDate = new Date();
          this.minDate = new Date(
              this.myDate.getFullYear(),
              this.myDate.getMonth(),
              this.myDate.getDate()
          );

          this.onInit();
      }

      onInit(){
          if(this.prefillingData){
              this.event = angular.copy(this.prefillingData);
              this.event.start = new Date(this.prefillingData.start);
              this.event.end = new Date(this.prefillingData.end);
          }
      }

      save(form){
          if (form.$valid) {
              this.event.start = new Date(this.event.start.setDate(this.event.start.getDate()+1));
              this.event.end = new Date(this.event.end.setDate(this.event.end.getDate()+1));
              this.EventService.save(this.event)
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
  .controller('eventCreateController', eventCreateController);

})();