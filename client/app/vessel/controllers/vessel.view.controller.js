'use strict';


(function() {

class vViewController {
    //start-non-standard
    vessel = {};
    //end-non-standard

    constructor(Vessel, $state, $stateParams, $mdToast) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.id = $stateParams.id;
        this.getVessel();
    }

    getVessel() {
        this.vessel = this.Vessel.get({id: this.id});
    }


    updateVessels(form) {
        console.log(form);
        if (form.$valid) {
            this.Vessel.update({id : this.vessel._id}, this.vessel).$promise.then(()=> {
                this.$state.go("vessels");
            });
            this.showSimpleToast('Информация обновлена');
        }
    }


    showSimpleToast (text) {
        this.$mdToast.show(
            this.$mdToast.simple({
                    hideDelay   : 3000,
                    //position    : 'bottom right',
                    type        : 'confirm',
                    textContent : text
            })
        );
    };
}

angular.module('jagenApp')
    .controller('vViewController', vViewController);

})();