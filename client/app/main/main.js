'use strict';

angular.module('jagenApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    template: `
      <navbar></navbar>
      <main></main>
      <footer></footer>
    `,
  })

    .state('home', {
        url: '/',
        parent: 'main',
        views: {
            'content': {
                templateUrl: 'app/vessel/views/list.html',
                controller: 'vesselListController',
                controllerAs: 'vm',
            }
        },
        resolve: {
            query: function(){
                return {};
            }
        },
        authenticate: true
    })
});
