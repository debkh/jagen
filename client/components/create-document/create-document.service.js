'use strict';

(function () {

  class CreateDocumentService{
    constructor($mdDialog) {
      this.$mdDialog = $mdDialog;
    }

    modal(data) {
      return this.$mdDialog.show({
        templateUrl: 'components/create-document/create-document.html',
        clickOutsideToClose: true,
        controllerAs: 'vm',
        bindToController: true,
        locals: {prefillingData: data},
        controller: ModalController
      });
      // .catch(console.log.bind(console))
    }
  }

  class ModalController{
    constructor($mdDialog, DocumentService, lodash, $cookies) {
      this.lodash = lodash;
      this.DocumentService = DocumentService;
      this.$mdDialog = $mdDialog;
      
      this.formData = {};
      this.froalaOptions = {
        requestHeaders: {
          Authorization: 'Bearer ' + $cookies.get('token')
        },
        imageManagerLoadURL: false,
        imageUploadURL: '/api/upload/image',
        toolbarButtons: [
          'fullscreen',
          'bold',
          'italic',
          'underline',
          'strikeThrough', 'subscript',
          'superscript',
          'fontFamily',
          'fontSize',
          '|',
          'color',
          'emoticons',
          'inlineStyle',
          'paragraphStyle',
          '|',
          'paragraphFormat',
          'align',
          'formatOL',
          'formatUL',
          'outdent',
          'indent',
          'quote',
          'insertHR',
          '-',
          'undo',
          'redo',
          'clearFormatting',
          'selectAll',
          'html',
          'insertTable',
          'insertLink',
          'insertVideo',
          'insertImage',
          // 'insertFile',
        ]
      };

      this.onInit();
    }

    onInit(){
      this.formData = this.prefillingData;
    }

    save(){
      if(this.formSave.$invalid){
        return;
      }

      // create document
      // this.formData.file = this.lodash.get(this.formData, 'files[0].lfFile');
      this.DocumentService.save(this.formData)
      .then((response) => {
        // set response data to document
        angular.extend(this.prefillingData, response);
        // hide modal
        this.$mdDialog.hide(response);
      });
    }

    close(){
      this.$mdDialog.cancel();
    }
  }

  angular.module('jagenApp')
  .service('CreateDocumentService', CreateDocumentService);

})();
