'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new', {
        url: '/new',
        template: '<new></new>'
      });
  });
