'use strict';
(function(){

class eventListController {
    events = [];

    uiConfig = {
        calendar:{
            height: 450,
            editable: false,
            header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            eventClick: this.alertOnEventClick.bind(this),
        }
    };

    constructor($http, $state, $location,$mdDialog, EventService, uiCalendarConfig, ModalService) {
        this.EventService = EventService;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.$http = $http;
        this.$location = $location;
        this.uiCalendarConfig = uiCalendarConfig;
        this.ModalService = ModalService;
        this.list();
    }

    list(){
        return this.EventService.query()
            .then((response) => {
                this.events = response;
                this.eventSources = [response];
            });
    }

    /* alert on eventClick */
    alertOnEventClick( date, jsEvent, view, ModalService){
        //====================================
        /* here is problem, this is empty */
        //====================================
        this.ModalService.show({
            templateUrl: '/app/event/views/view.html',
            locals: {event: date},
            controller: 'eventListController',
        }).catch(console.log.bind(console));
    };

    /**
     * close dialog(popup) window
     */
    cancel(){
        this.$mdDialog.cancel();
    }

}

angular.module('jagenApp')
    .controller('eventListController', eventListController);

})();
