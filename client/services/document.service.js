'use strict';

(function () {

  class DocumentService {
    constructor(DocumentModel, $q, lodash, $mdDialog) {
      this.$mdDialog = $mdDialog
      this.lodash = lodash
      this.$q = $q
      this.DocumentModel = DocumentModel
      this.collection = []
      this.document = {};
    }

    get(data) {
      // angular.extend(data, {actionId: data.slug});
      return this.DocumentModel.get(data).$promise
      .then((response) => {
        angular.copy(response, this.document);
        return this.document;
      });
    }

    getCollection() {
      return this.DocumentModel.query().$promise.then((response) => {
        angular.copy(response, this.collection);
        return this.collection;
      });
    }

    save(data) {
      let action = data._id? 'update' : 'save';

      // debugger;
      // angular.extend(data, {id: data._id});
      // delete data.user;

      // var saveData = angular.copy(data);
      // angular.extend(saveData, {id: saveData._id});
      // delete saveData.user;

      var saveData = {
        actionId:data._id,
        file:data.file,
        title:data.title,
        text:data.text,
        slug:data.slug,
      }

      return this.DocumentModel[action](saveData).$promise.then((response) => {
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
      angular.extend(data, {actionId: data._id});

      return this.DocumentModel.remove(data).$promise.then((response) => {
        this.lodash.remove(this.collection, {_id: data._id});
        return response;
      });
    }
  }

  angular.module('jagenApp')
  .service('DocumentService', DocumentService);

})();
