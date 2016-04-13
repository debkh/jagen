'use strict';

(function () {

  class NewService {
    constructor($q, lodash, $mdDialog, New) {
      this.$mdDialog = $mdDialog;
      this.lodash = lodash;
      this.$q = $q;
      this.New = New;
      this.document = {};
      this.events = [];
    }

    get(data) {
      // angular.extend(data, {actionId: data.slug});
      return this.Event.get(data).$promise
      .then((response) => {
        return data;
      });
    }

    query() {
      return this.New.query().$promise.then((response) => {
        return response;
      });
    }

    save(data) {
      let action = data._id ? 'update' : 'save';

      var saveData = {
        id:data._id,
        title:data.title,
        description:data.description,
      };

      return this.New[action](saveData).$promise
      .then((response) => {
        return response;
      });
    }

    remove(data) {
      if(this.lodash.isEmpty(data)){
        return this.$q.reject(false);
      }

      let confirm = this.$mdDialog.confirm()
      .title('Are you sure to delete the record?')
      .ok('YES')
      .cancel('NO');

      return this.$mdDialog.show(confirm).then((res) => {
        return this.New.remove({id: data._id}).$promise
        .then((response) => {
          return response;
        });
      });
    }
  }

  angular.module('jagenApp')
  .service('NewService', NewService);

})();
