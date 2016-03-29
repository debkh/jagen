'use strict';


(function() {

class vCreateController {
    //start-non-standard
    vessels = [];
    vessel = {};
    //end-non-standard

    constructor(Vessel, $state, $location, Auth) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$location = $location;
        this.currentUser = Auth.getCurrentUser();
    }

    createVessels(form) {
        if (form.$valid) {
            console.log(this.vessel);
            this.Vessel.save(this.vessel).$promise.then(function () {
                //this.$location.url("/vessels");
            });
        }
    }
}

angular.module('jagenApp')
    .controller('vCreateController', vCreateController);

})();