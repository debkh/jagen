'use strict';

angular.module('jagenApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    template: `
      <navbar></navbar>
      <main></main>
      <footer></footer>
    `,
    // resolve:{
    //   menuCollection: function (MenuService) {
    //     return MenuService.getCollection();
    //   }
    // }
  })
});
