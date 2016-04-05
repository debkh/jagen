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

      modalCreateEvent() {
          this.ModalService.show({
              templateUrl: '/app/admin/event/views/create.html',
              locals: '',
              controller: 'eventCreateController',
          }).catch(console.log.bind(console));
      }

      remove(event) {
          var confirm = this.ModalService.confirm({
              title: 'Are you sure to delete the record?',
            });

          return this.$mdDialog.show(confirm).then(() => {
              event.$remove({id: event._id});
              this.events.splice(this.event.indexOf(event), 1);
          });

      }
  }

  angular.module('jagenApp.admin')
  .controller('EventController', EventController);

})();