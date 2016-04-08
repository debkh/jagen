(function () {
  'use strict';

  directiveFunc.$inject = [];
  function directiveFunc() {
    var directive = {
      scope: {
        item: '=selectedItem',
        self: '=',
        required: '=',
        form: '='
      },
      require: 'ngModel',
      templateUrl: "components/create-menu/directives/menuList.html",
      controller: DirectiveCtrl,
      controllerAs: 'vm',
      bindToController: true,
      // link: link,
    };
    return directive;
  }

  class DirectiveCtrl {

    constructor(MenuService, lodash) {
      this.lodash = lodash;
      this.MenuService = MenuService;
      this.menu = this.MenuService.collection;
      this.document = this.document || null;
      this.self = this.self || null
      this.onInit();
    }

    onInit(){
      this.getCollection().then((res) => {
        let id = this.lodash.get(this.item, '_id');
        this.item = this.lodash.find(this.menu, {_id: id});
      });
    }

    getCollection(){
      return this.MenuService.getCollection();
    }

  }

  angular
  .module('jagenApp')
  .directive('menuList', directiveFunc);

})();