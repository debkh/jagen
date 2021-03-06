'use strict';

(function() {

  class EventController {
      constructor($state, $mdDialog, Event, CreateDocumentService, lodash, ModalService, EventService) {
          this.$state = $state;
          this.lodash = lodash;
          this.EventService = EventService;
          this.ModalService = ModalService;
          this.$mdDialog = $mdDialog;
          this.CreateDocumentService = CreateDocumentService;
          this.Event = Event;

          this.events = [];
          this.selected = [];
          this.gridOptions = {
              order: 'title',
              rowSelection: true,
          };

          this.onInit();
      }

      onInit(){
          this.list();
      }

      list(){
          return this.EventService.query()
              .then((response) => {
                  this.events = response;
                  return this.events;
              });
      }

      modalCreateEvent(data) {
          this.ModalService.show({
              templateUrl: '/app/admin/event/views/create.html',
              locals: {prefillingData: data},
              controller: 'eventCreateController',
          })
          .then((res) => {
              if(data){
                  angular.extend(data, res);
              }else{
                  this.events.push(res);
              }
              return res;
          })
          .catch(console.log.bind(console));
      }

      remove(data) {
          return this.EventService.remove(data)
          .then((response) => {
              this.lodash.remove(this.events, {_id: data._id});
              return response;
          });
      }
  }

  angular.module('jagenApp.admin')
  .controller('EventController', EventController);

})();