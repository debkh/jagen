'use strict';


(function() {

class vCreateController {
    //start-non-standard
    vessels = [];
    vessel = {};
    //end-non-standard

    constructor(Vessel, $state, $location) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$location = $location;
    }

    addVessels(form) {
        if (form.$valid) {
            this.Vessel.save(this.vessel).$promise.then(function () {
                //this.$location.url("/vessels");
            });;
        }
    }
}

angular.module('jagenApp')
    .controller('vCreateController', vCreateController);

})();