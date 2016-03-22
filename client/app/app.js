'use strict';

angular.module('jagenApp', [
  'jagenApp.auth',
  'jagenApp.admin',
  'ngMaterial',
  'ngMessages',
  'jagenApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
