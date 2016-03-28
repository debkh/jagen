'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vessels', {
        url: '/vessels',
          templateUrl: 'app/vessel/views/list.html',
          controller: 'vListController',
          controllerAs: 'vc',
      })
    .state('vessel_create', {
        url: '/vessel/create',
        templateUrl: 'app/vessel/views/create.html',
        controller: 'vCreateController',
        controllerAs: 'vc'
    })
    .state('vessel_edit', {
        url: '/vessel/edit/:id',
        templateUrl: 'app/vessel/views/edit.html',
        controller: 'vViewController',
        controllerAs: 'vc'
    })
    .state('vessel_view', {
        url: '/vessel/:id',
        templateUrl: 'app/vessel/views/view.html',
        controller: 'vViewController',
        controllerAs: 'vc'
    })
  });
