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
    `
  })
});
