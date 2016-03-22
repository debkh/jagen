'use strict';
(function () {
  
  angular.module('jagenApp.document')
  .config(function ($stateProvider) {
    $stateProvider
    .state('document', {
      parent: 'main',
      url: 'document',
      views: {
        'content': {
          template: '<div ui-view="document"></div>'
        }
      },
    })
    .state('text', {
      parent: 'document',
      url: '/text/:id',
      views: {
        'document': {
          template: '<document-text></document-text>'
        }
      },
    });
  });
})()
