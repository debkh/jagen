'use strict';

(function () {

  class DocumentService {
    constructor(Document, $q, lodash, $mdDialog) {
      this.$mdDialog = $mdDialog
      this.lodash = lodash
      this.$q = $q
      this.Document = Document
      this.collection = []
    }

    getCollection() {
      return this.Document.query().$promise.then((response) => {
        angular.copy(response, this.collection);
        return this.collection;
      });
    }

    save(data) {
      let action = data._id? 'update' : 'save';
      angular.extend(data, {id: data._id});

      return this.Document[action](data).$promise.then((response) => {
        if(action == 'save'){
          this.collection.push(response);
        }

        return response;
      });
    }

    remove(data) {
      if(this.lodash.isEmpty(data)){
        return this.$q.reject(false);
      }

      let confirm = this.$mdDialog.confirm()
      .title('Would you like to delete your documens?')
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
      angular.extend(data, {id: data._id});

      return this.Document.remove(data).$promise.then((response) => {
        this.lodash.remove(this.collection, {_id: data._id});
        return response;
      });
    }
  }

  angular.module('jagenApp')
  .service('DocumentService', DocumentService);

})();