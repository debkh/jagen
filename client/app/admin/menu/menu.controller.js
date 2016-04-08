'use strict';

(function () {

  class MenuController {

    constructor($mdDialog, MenuService, CreateMenuService, lodash) {
      this.lodash = lodash
      this.$mdDialog = $mdDialog;
      this.CreateMenuService = CreateMenuService;
      this.MenuService = MenuService;

      this.menu = this.MenuService.collection;
      this.selected = [];
      this.gridOptions = {};
      this.formData = {};
      this.menuList = [];
      // this.radioTypeData = [];

      this.onInit();
    }

    onInit(){
      this.gridOptions = {
        order: 'title',
        rowSelection: true,
      };

      this.getMenuList()
      .catch(console.log.bind(console));
    }

    getMenuList(){
      return this.MenuService.getMenuList()
      .then((res)=>{
        angular.copy(res, this.menuList);
        console.log(this.menuList);
        return this.menuList;
      });
    }

    modalCreateMenu(data) {
      this.CreateMenuService.modal(data)
      .then((res) =>{
        this.getMenuList();
        return res;
      })
      .catch(console.log.bind(console));
    }

    remove(data) {
      return this.MenuService.remove(data)
      .then((response) => {
        this.lodash.remove(this.selected);
        return response;
      });
    }

  }

  angular.module('jagenApp.admin')
  .controller('MenuController', MenuController);

})();