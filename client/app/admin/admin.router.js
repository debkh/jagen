'use strict';
(function () {

  angular.module('jagenApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    })

    .state('documents', {
      parent: 'admin',
      url: '/documents',
      templateUrl: 'app/admin/document/document.html',
      controller: 'DocumentController',
      controllerAs: 'vm',
    })

    .state('users', {
      parent: 'admin',
      url: '/users',
      templateUrl: 'app/admin/user/user.html',
      controller: 'UserController',
      controllerAs: 'vm',
    })
  });

})();