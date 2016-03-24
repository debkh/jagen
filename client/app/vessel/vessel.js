'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vessels', {
        url: '/vessels',
        controller: 'VesselController',
        controllerAs: 'vm',
        templateUrl: 'app/vessel/list.html',
      })
    .state('vessels_add', {
        url: '/vessels/add',
        templateUrl: 'app/vessel/add.html',
        controller: 'VesselController',
        controllerAs: 'vm'
    });
  });
