(function () {
  'use strict';

  class DirectiveCtrl {
    constructor() {
    }

  }

  directiveFunc.$inject = [];
  function directiveFunc() {
    var directive = {
      scope: {},
      templateUrl: "components/menu/menu.html",
      controller: DirectiveCtrl,
      controllerAs: 'vm',
      bindToController: true,
      // link: link,
    };
    return directive;
  }

  angular
  .module('jagenApp')
  .directive('menuMiddle', directiveFunc);

})();