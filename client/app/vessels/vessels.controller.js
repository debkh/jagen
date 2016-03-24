'use strict';


(function() {

class VesselsController {
    //start-non-standard
    vessels = [];
    vessel = {};
    errors = {};
    //end-non-standard

    constructor(Vessel, $state) {
        this.Vessel = Vessel;
        this.$state = $state;
    }

    addVessel(form) {
        if (form.$valid) {
            this.Vessel.createVessel(this.vessel)
            .then(() => {
                // Logged in, redirect to home
                this.$state.go('main');
            });
        }
    }
}

angular.module('jagenApp')
    .controller('VesselsController', VesselsController);

})();