'use strict';

(function () {

  class TextEditorService{
    // vm = this;

    constructor($cookies) {
      this.options = {
        requestHeaders: {
          Authorization: 'Bearer ' + $cookies.get('token')
        },
        imageManagerLoadURL: false,
        imageUploadURL: '/api/upload/image',
        toolbarButtons: [
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
        ]
      };
    }
  }

  angular.module('jagenApp')
  .service('TextEditorService', TextEditorService);

})();