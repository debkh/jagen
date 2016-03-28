'use strict';
(function () {
  
  angular.module('jagenApp.document')
  .config(function ($stateProvider) {
    $stateProvider
    .state('document', {
      parent: 'main',
      url: 'document/:slug',
      views: {
        'content': {
          controller: 'DocumentCtrl',
          controllerAs: 'vm',
          templateUrl: 'app/document/document.html'
        }
      },
      resolve:{
        document: getDocumentResolve
      }
    })
    
  });

  getDocumentResolve.$inject = ['DocumentService', '$stateParams'];
  function getDocumentResolve(DocumentService, $stateParams) {
    return DocumentService.get({actionId:$stateParams.slug});
  }

})()
