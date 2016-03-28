'use strict';
(function () {
  
  angular.module('jagenApp.admin', [
    'md.data.table',
    'textAngular',
    'froala',
  ])
  .value('froalaConfig', {
    toolbarInline: false,
    placeholderText: 'Edit Your Content Here!'
  });

})();