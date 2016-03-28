(function () {
  'use strict';

  class DirectiveCtrl {
    constructor(MenuService, lodash) {
      this.MenuService = MenuService;
      this.lodash = lodash;

      this.onInit();
    }

    onInit(){
      this.getMenu();
    }

    getMenu(){
      console.log(this.slug);
      return this.MenuService.getMenu(this.slug)
      .then((res)=>{
        this.menu = res;
        return this.menu;
      });
    }
  }

  directiveFunc.$inject = [];
  function directiveFunc() {
    var directive = {
      scope: {
        slug: "@"
      },
      templateUrl: "/components/bootstrap-menu/bootstrap-menu.html",
      controller: DirectiveCtrl,
      controllerAs: 'vm',
      bindToController: true,
      // link: link,
    };
    return directive;
  }

  angular
  .module('jagenApp')
  .directive('bootstrapMenu', directiveFunc);

})();