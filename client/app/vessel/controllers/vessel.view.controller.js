'use strict';


(function() {

class vesselViewController {
    //start-non-standard
    vessel = {};
    //end-non-standard

    /**
     * @param Vessel
     * @param $state
     * @param $stateParams
     * @param $mdToast
     */
    constructor(Vessel, $state, $stateParams, $mdToast) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.id = $stateParams.id;
        this.getVessel();
    }

    /**
     * Get ifo vessels
     */
    getVessel() {
        this.vessel = this.Vessel.get({id: this.id});
    }


    /**
     * Update vessel
     * @param form
     */
    updateVessels(form) {
        console.log(form);
        if (form.$valid) {
            this.Vessel.update({id : this.vessel._id}, this.vessel).$promise.then(()=> {
                this.$state.go("vessels");
            });
            this.showSimpleToast('Информация обновлена');
        }
    }


    /**
     * Show info window
     *
     * @param text
     */
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
    .controller('vesselViewController', vesselViewController);

})();