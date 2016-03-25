'use strict';
(function () {

  class DocumentCtrl {
    constructor(lodash, document, $q) {
      this.$q = $q;
      this.document = document;
      this.lodash = lodash;
      this.onInit();
    }

    onInit(){
    }
  }

  angular.module('jagenApp.document')
  .controller('DocumentCtrl', DocumentCtrl);

})();
