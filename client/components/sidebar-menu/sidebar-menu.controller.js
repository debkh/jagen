// 'use strict';
//
// (function() {
//
//   class SidebarMenuController {
//
//     constructor($http) {
//       this.$http = $http;
//       this.awesomeThings = [];
//     }
//   }
//
//   angular.module('jagenApp')
//   .component('sidebarMenu', {
//     templateUrl: 'components/sidebar-menu/sidebar-menu.html',
//     controller: SidebarMenuController
//   });
//
// })();


// 'use strict';
//
// class NavbarController {
//   //start-non-standard
//   menu = [{
//     'title': 'Home',
//     'state': 'main'
//   }];
//
//   isCollapsed = true;
//   //end-non-standard
//
//   constructor(Auth) {
//     this.isLoggedIn = Auth.isLoggedIn;
//     this.isAdmin = Auth.isAdmin;
//     this.getCurrentUser = Auth.getCurrentUser;
//   }
// }
//
// angular.module('jagenApp')
//   .controller('NavbarController', NavbarController);
