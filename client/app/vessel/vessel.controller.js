'use strict';


(function() {

class VesselController {
    //start-non-standard
    vessels = [];
    vessel = {};
    errors = {};
    //end-non-standard

    constructor(Vessel, $state, $http) {
        this.vessels = Vessel.query();
        this.Vessel = Vessel;
        this.$state = $state;
        this.$http = $http;
    }

    addVessel(form) {
        console.log(form);
        if (form.$valid) {
            this.vessel.$save(function() {
                this.$state.go('vessels');
            });
            /*this.Vessel.createVessels(this.vessel)
            .then(() => {
                // Logged in, redirect to home
                this.$state.go('vessels');
            });*/
        }
    }

    getVessel() {
        var data = this.Vessel.getVessels();
        console.log(data);
    }
}

angular.module('jagenApp')
    .controller('VesselController', VesselController);

})();