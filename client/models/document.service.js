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

  }

  angular.module('jagenApp')
  .service('DocumentService', DocumentService);

})();
