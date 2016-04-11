'use strict';

(function () {

  class MenuService {
    constructor(MenuModel, $q, lodash, $mdDialog) {
      this.$mdDialog = $mdDialog;
      this.lodash = lodash;
      this.$q = $q;
      this.MenuModel = MenuModel;
      this.collection = [];
      // this.menu = {};
    }

    get(data) {
      // angular.extend(data, {actionId: data.slug});
      return this.MenuModel.get(data).$promise;
      // .then((response) => {
      //     angular.copy(response, this.menu);
      //   return this.menu;
      // });
    }

    getMenuList() {
      // return this.getCollection({config:{update:true}})
      return this.getCollection({}, {update: true})
      .then((res)=> {

        // get top level menu
        let menu = this.lodash.filter(res, (el) => {
          return !el.menu;
        });

        // create menu
        menu = this.lodash.map(menu, (el) => {
          // return this.getMenu(el.slug);
          return this.menuWithSubItems(res, el.slug);
        });

        return this.createList(menu);
      });
    }

    createList(res, deep = 1) {
      let list = [];
      this.lodash.forEach(res, (menu)=> {
        menu.deep = menu.subItems ? deep - 1 : deep;
        list.push(menu);
        this.lodash.forEach(menu.subItems, (subItem)=> {
          if (subItem.subItems) {
            let subItems = this.createList([subItem], deep + 1);
            list = list.concat(subItems);
          } else {
            subItem.deep = deep;
            list.push(subItem);
          }
        });
      });
      return list;
    }

    getMenu(slug) {
      return this.getCollection()
      .then((res)=> {
        let menu = this.menuWithSubItems(res, slug);
        return menu;
      });
    }

    menuWithSubItems(res, slug) {
      let menu = this.lodash.find(res, {slug: slug});
      if(!menu){
        return;
      }

      menu.subItems = this.lodash.map(menu.subItems, (item) => {
        if (item.subItems) {
          item = this.menuWithSubItems(res, item.slug);
        }
        return item;
      });
      menu.subItems = this.lodash.sortBy(menu.subItems, function (item) {
        return +item.index
      });
      return menu;
    }

    getCollection(...rest) {
      let [params={}, config={}] = rest;

      let requestToServer = () => {
        return this.collectionPromise.then((response) => {
          angular.copy(response, this.collection);
          return this.collection;
        });
      };

      if (this.collection.length && !config.update) {
        return this.$q.when(this.collection);
      } else if (this.collectionPromise && !config.update) {
        return requestToServer();
      } else {
        this.collectionPromise = this.MenuModel.query().$promise;
        return requestToServer();
      }
    }

    save(data) {
      let action = data._id ? 'update' : 'save';
      angular.extend(data, {
        actionId: data._id,
      });

      return this.MenuModel[action](data).$promise
      .then((response) => {
        if (action == 'save') {
          this.collection.push(response);
        }

        return response;
      });
    }

    remove(data) {
      if (this.lodash.isEmpty(data)) {
        return this.$q.reject(false);
      }

      let confirm = this.$mdDialog.confirm()
      .title('Would you like to delete your menu?')
      .ok('YES')
      .cancel('NO');

      return this.$mdDialog.show(confirm).then(() => {
        let prom = [];

        if (angular.isArray(data)) {
          angular.forEach(data, (el)=> {
            prom.push(this.removeOneElement(el));
          });
        } else {
          prom.push(this.removeOneElement(data));
        }

        return this.$q.all(prom).then(function (response) {
          return response;
        })
      });
    }

    removeOneElement(data) {
      angular.extend(data, {actionId: data._id});

      return this.MenuModel.remove(data).$promise.then((response) => {
        this.lodash.remove(this.collection, {_id: data._id});
        return response;
      });
    }
  }

  angular.module('jagenApp')
  .service('MenuService', MenuService);

})();
