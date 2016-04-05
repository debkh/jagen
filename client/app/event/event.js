'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: 'events',
          parent: 'main',
          views: {
              'content': {
                  templateUrl: 'app/event/views/list.html',
                  controller: 'eventListController',
                  controllerAs: 'vm',
              }
          },
          resolve: {
              query: function(){
                  return {};
              }
          },
          authenticate: true
      })
      .state('event_create', {
        url: 'events/create',
        parent: 'main',
        views: {
            'content': {
                templateUrl: 'app/event/views/create.html',
                controller: 'eventCreateController',
                controllerAs: 'vm',
            }
        },
        resolve: {
            query: function(){
                return {};
            }
        },
        authenticate: true
      })
  });
