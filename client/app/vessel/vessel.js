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
                  controller: 'vListController',
                  controllerAs: 'vc',
              }
          },
          resolve: {
              query: function(Auth){
                  console.log(Auth.getCurrentUser()._id);
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
                controller: 'vCreateController',
                controllerAs: 'vc',
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
                controller: 'vViewController',
                controllerAs: 'vc',
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
                controller: 'vViewController',
                controllerAs: 'vc',
            }
        },
        authenticate: true
    })
  });
