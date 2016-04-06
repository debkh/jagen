'use strict';
(function(){

class eventListController {

    msg = 'this is message';
    date = new Date();
    d = this.date.getDate();
    m = this.date.getMonth();
    y = this.date.getFullYear();

    events = [
        {title: 'All Day Event',start: new Date(this.y, this.m, 1)},
        {title: 'Long Event',start: new Date(this.y,this.m, this.d - 5),end: new Date(this.y,this.m, this.d - 2)},
    ];

    uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            timezone: "local",
            header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            eventClick: this.alertOnEventClick,
            eventDrop: this.alertOnDrop,
            eventResize: this.alertOnResize,
            eventRender: this.eventRender
        }
    };

    eventSources = [this.events];
    alertMessage = 'alertMessage';


    constructor($http, $state, $location,$compile, EventService, $scope, uiCalendarConfig, ModalService) {
        this.EventService = EventService;
        this.$state = $state;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$http = $http;
        this.$location = $location;
        this.uiCalendarConfig = uiCalendarConfig;
        this.ModalService = ModalService;
        this.list();
    }

    list(){
        return this.EventService.query()
            .then((response) => {
            //this.events = response;

        console.log(this.events);
        return this.events;
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
        this.alertMessage = 'clicked';
        console.log(date);
        console.log(jsEvent);
    };
    /* alert on Drop */
    alertOnDrop(event, delta, revertFunc, jsEvent, ui, view){
        this.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    alertOnResize(event, delta, revertFunc, jsEvent, ui, view ){
        this.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };


    addEvent() {
        this.events.push({
            title: 'Open Sesame',
            start: new Date(this.y, this.m, 1),
            end: new Date(this.y, this.m, 3),
            className: ['openSesame']
        });
        console.log(this.events);

    };

    /* Render Tooltip */
    eventRender( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        //====================================
        /* here is problem, this is empty */
        //====================================
        this.$compile(element)(this);
    };

}

angular.module('jagenApp')
    .controller('eventListController', eventListController);

})();
