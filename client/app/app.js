'use strict';

angular.module('jagenApp', [
  'jagenApp.auth',
  'jagenApp.admin',
  'jagenApp.document',
  'ngMaterial',
  'ngMessages',
  'jagenApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angular-lodash',
  'ngLodash',
  'mm.acl',
  'ngMaterial',
  // 'angularFileUpload',
  // 'ngFileUpload',
  'lfNgMdFileInput',
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
