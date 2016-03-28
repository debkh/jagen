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
      authenticate: 'admin',
      resolve:{
        menuCollection: function (MenuService) {
          return MenuService.getCollection();
        }
      }
    })

    .state('documents', {
      parent: 'admin',
      url: '/documents',
      templateUrl: 'app/admin/document/document.html',
      controller: 'DocumentController',
      controllerAs: 'vm',
    })

    .state('menu', {
      parent: 'admin',
      url: '/menu',
      templateUrl: 'app/admin/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'vm',
    })

    .state('users', {
      parent: 'admin',
      url: '/users',
      templateUrl: 'app/admin/user/user.html',
      controller: 'UserController',
      controllerAs: 'vm',
    })

    .state('admin_events', {
      parent: 'admin',
      url: '/events',
      templateUrl: 'app/admin/event/event.html',
      controller: 'EventController',
      controllerAs: 'vm',
    })
  });

})();