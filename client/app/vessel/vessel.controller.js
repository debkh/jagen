'use strict';


(function() {

class VesselController {
    //start-non-standard
    vessels = [];
    vessel = {};
    errors = {};
    //end-non-standard

    constructor(Vessel, $state) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.getVessel();
    }

    addVessel() {
        //if (form.$valid) {
            this.Vessel.createVessels(this.vessel)
            .then(() => {
                // Logged in, redirect to home
                this.$state.go('main');
            });
        //}
    }

    getVessel() {
        console.log('getVessel');
        this.Vessel.getVessels();
    }
}

angular.module('jagenApp')
    .controller('VesselController', VesselController);

})();