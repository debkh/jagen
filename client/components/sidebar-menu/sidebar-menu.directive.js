// 'use strict';
//
// angular.module('jagenApp')
//   .directive('navbar', () => ({
//     templateUrl: 'components/navbar/navbar.html',
//     restrict: 'E',
//     controller: 'NavbarController',
//     controllerAs: 'nav'
//   }));


'use strict';

(function() {

  class SidebarMenuController {

    constructor($http) {
      this.$http = $http;
      // this.awesomeThings = [];
    }
  }

  angular.module('jagenApp')
  .component('sidebarMenu', {
    bindings: {
      items: "<"
    },
    templateUrl: 'components/sidebar-menu/sidebar-menu.html',
    controller: SidebarMenuController
  });

})();