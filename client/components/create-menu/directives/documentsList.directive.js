(function () {
  'use strict';

  directiveFunc.$inject = [];
  function directiveFunc() {
    var directive = {
      scope: {
        document: '=selectedItem',
        form: '='
      },
      require: 'ngModel',
      templateUrl: "components/create-menu/directives/documentsList.html",
      controller: DirectiveCtrl,
      controllerAs: 'vm',
      bindToController: true,
      // link: link,
    };
    return directive;
  }

  class DirectiveCtrl {

    constructor(DocumentService, lodash) {
      this.lodash = lodash;
      this.DocumentService = DocumentService;
      this.documents = [];

      this.onInit();
    }

    onInit(){
      this.getCollection().then((res) => {
        let id = this.lodash.get(this.document, '_id');
        this.document = this.lodash.find(res, {_id: id});
      });
    }

    getCollection(){
      return this.DocumentService.getCollection().then((res) => {
        this.documents = res;
        return this.documents
      });
    }

  }

  angular
  .module('jagenApp')
  .directive('documentsList', directiveFunc);

})();