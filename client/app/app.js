'use strict';

angular.module('jagenApp', [
  'jagenApp.auth',
  'jagenApp.admin',
  'jagenApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angular-lodash',
  'ngLodash',
  'mm.acl',
  'ngMaterial',
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
