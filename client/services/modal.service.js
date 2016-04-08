'use strict';

(function () {

    class ModalService{

        constructor($mdDialog) {
            this.$mdDialog = $mdDialog;
        }

        show(data) {
            let params = angular.extend({
                clickOutsideToClose: true,
                controllerAs: 'vm',
                bindToController: true,
            }, data);
            console.log(data);
            return this.$mdDialog.show(params)
                .catch(console.log.bind(console));
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
        /**
         * Cancel dialog window
         */
        cancel() {
            this.$mdDialog.cancel();
        };
    }

    angular.module('jagenApp')
        .service('ModalService', ModalService);

})();
