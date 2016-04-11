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
  'md.data.table',
  // 'angularFileUpload',
  // 'ngFileUpload',
  'lfNgMdFileInput',
  'ui.calendar'
])
  .config(function($urlRouterProvider, $locationProvider, $mdIconProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $mdIconProvider
      .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  });
