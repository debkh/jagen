'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vessels', {
        url: '/vessels',
        controller: 'VesselsController',
        templateUrl: 'app/vessels/vessels.html',
      })
    .state('vessels_add', {
        url: '/vessels/add',
        templateUrl: 'app/vessels/add.html',
        controller: 'VesselsController',
        controllerAs: 'vm'
    });
  });
