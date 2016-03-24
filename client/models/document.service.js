'use strict';

(function () {

  class DocumentService{
    constructor(Document){
      this.Document = Document
      this.collection = []
    }

    getCollection(){
      return this.Document.query().$promise.then((response) => {
        angular.copy(response, this.collection);
        return this.collection;
      });
    }

    create(data){
      return this.Document.save(data).$promise.then((response) => {
        this.collection.push(response);
        return response;
      });
    }

  }

  angular.module('jagenApp')
  .service('DocumentService', DocumentService);

})();
