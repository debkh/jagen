'use strict';

(function () {

  class EventService {
    constructor($q, lodash, $mdDialog, Event) {
      this.$mdDialog = $mdDialog;
      this.lodash = lodash;
      this.$q = $q;
      this.Event = Event;
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
      return this.Event.query().$promise.then((response) => {
        return response;
      });
    }

    save(data) {
      let action = data._id ? 'update' : 'save';

      var saveData = {
        title:data.title,
        start:data.start,
        end:data.end,
        description:data.description,
      };

      return this.Event[action](saveData).$promise.then((response) => {
        if(action == 'save') {
          this.events.push(response);
        }
        console.log(this.events);
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
  .service('EventService', EventService);

})();
