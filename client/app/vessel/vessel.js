'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vessels', {
          url: 'vessels',
          parent: 'main',
          views: {
              'content': {
                  templateUrl: 'app/vessel/views/list.html',
                  controller: 'vesselListController',
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
    .state('vessel_create', {

        url: 'vessel/create',
        parent: 'main',
        views: {
            'content': {
                templateUrl: 'app/vessel/views/create.html',
                controller: 'vesselCreateController',
                controllerAs: 'vm',
            }
        },
        authenticate: true
    })
    .state('vessel_edit', {
        url: 'vessel/edit/:id',
        parent: 'main',
        views: {
            'content': {
                templateUrl: 'app/vessel/views/edit.html',
                controller: 'vesselViewController',
                controllerAs: 'vm',
            }
        },
        authenticate: true
    })
    .state('vessel_view', {
        url: 'vessel/:id',
        parent: 'main',
        views: {
            'content': {
                templateUrl: 'app/vessel/views/view.html',
                controller: 'vesselViewController',
                controllerAs: 'vm',
            }
        },
        authenticate: true
    })
  });
