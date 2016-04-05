'use strict';

(function () {

    class ModalService{
        constructor($mdDialog) {
            this.$mdDialog = $mdDialog;
        }

        show(data) {
            return this.$mdDialog.show({
                templateUrl: data.templateUrl,
                clickOutsideToClose: true,
                controllerAs: 'vm',
                bindToController: true,
                locals: data.locals,
                controller: data.controller
            });
            // .catch(console.log.bind(console))
        }

        confirm(data) {
            return this.$mdDialog.confirm()
                .title(data.title)
                .textContent(data.textContent)
                .ariaLabel(data.ariaLabel)
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');
        }
    }

    angular.module('jagenApp')
        .service('ModalService', ModalService);

})();
