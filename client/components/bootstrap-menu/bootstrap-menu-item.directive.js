(function () {
  'use strict';

  class DirectiveCtrl {
    constructor(MenuService, lodash, $compile, $element, $scope) {
      this.$compile = $compile;
      this.$element = $element;
      this.$scope = $scope;
      this.MenuService = MenuService;
      this.lodash = lodash;

      this.onInit();
    }

    onInit(){
      let initMenu = this.$scope.$watch('vm.menu._id', (el) => {
        if(el){
          let itemTemplate = this.menuWithSubItems(this.menu);
          this.$element.replaceWith(this.$compile(itemTemplate)(this.$scope));
          initMenu();
        }
      })
    }

    menuWithSubItems(menu) {
      let menuTemplate = `<ul class="dropdown-menu" role="menu">`;
      this.lodash.forEach(menu.subItems, (item) => {
        switch (item.type) {
          case 'spinner':
            menuTemplate += `<li class="divider"></li>`;
            break;
          case 'document':
            menuTemplate += `
              <li><a ui-sref="document({slug: '${item.document.slug}'})">${item.title}</a></li>
            `;
            break;
          case 'menu':
            menuTemplate += `
              <li class="dropdown-submenu">
                <a tabindex="-1" href="#">${item.title}</a>
                ${this.menuWithSubItems(item)}
              </li>
            `;
            break;
        }
      });
      menuTemplate += `</ul>`;
      return menuTemplate;
    }

    getMenu(){
      return this.MenuService.getMenu('m1');
    }
  }

  directiveFunc.$inject = [];
  function directiveFunc() {
    var directive = {
      scope: {
        menu: '='
      },
      replace: true,
      controller: DirectiveCtrl,
      controllerAs: 'vm',
      bindToController: true,
      // link: link,
    };
    return directive;
  }

  angular
  .module('jagenApp')
  .directive('bootstrapMenuItem', directiveFunc);

})();