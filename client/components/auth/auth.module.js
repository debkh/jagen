'use strict';

angular.module('jagenApp.auth', [
  'jagenApp.constants',
  'jagenApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
