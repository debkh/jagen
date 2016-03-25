(function() {
  'use strict';

  angular
  .module('jagenApp')
  .directive('apsUploadFile', apsUploadFile);

  function apsUploadFile() {
    var directive = {
      scope: {
        uploadFile:'='
      },
      restrict: 'E',
      templateUrl: 'components/upload-file/aps-upload-file.directive.html',
      controller: apsUploadFileCtrl,
      controllerAs: 'vm',
      bindToController:true,
    };
    return directive;
  }

  apsUploadFileCtrl.$inject = ['$scope', '$element'];
  function apsUploadFileCtrl(scope, element) {
    let vm = this;
    let input = element.find('.file-input');
    let button = element.find('.upload-button');
    let textInput = element.find('.text-input');

    if (input.length && button.length && textInput.length) {
      button.click(function(e) {
        input.click();
      });
      textInput.click(function(e) {
        input.click();
      });
    }

    input.on('change', function(e) {
      vm.uploadFile = e.target.files[0];
      if (vm.uploadFile) {
        vm.fileName = vm.uploadFile.name;
      } else {
        vm.fileName = null;
      }
      scope.$apply();
    });
  }
})();