'use strict';

(function () {

  class NewController {

    constructor($mdDialog, NewService, ModalService, lodash) {
      this.lodash = lodash
      this.$mdDialog = $mdDialog;
      this.ModalService = ModalService;
      this.NewService = NewService;

      this.news = [];
      this.selected = [];
      this.gridOptions = {
        order: 'title',
        rowSelection: true,
      };

      this.list();
    }

    list(){
          return this.NewService.query()
              .then((response) => {
              this.news = response;
          return this.news;
      });
    }

    modalCreateNew(data) {
      this.ModalService.show({
              templateUrl: '/app/admin/new/views/create.html',
              locals: {prefillingData: data},
              controller: 'newCreateController',
          })
          .then((res) => {
          if(data){
            angular.extend(data, res);
          }else{
              this.news.push(res);
          }
          return res;
      })
      .catch(console.log.bind(console));
    }

    remove(data) {
      return this.NewService.remove(data)
          .then((response) => {
          this.lodash.remove(this.news, {_id: data._id});
      return response;
      });
    }

  }

  angular.module('jagenApp.admin')
  .controller('NewController', NewController);

})();