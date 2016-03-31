'use strict';


(function() {

class vesselCreateController {
    //start-non-standard
    vessels = [];
    vessel = {};
    //end-non-standard

    constructor(Vessel, $http, $state, $location, Auth) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$http = $http;
        this.$location = $location;
        this.currentUser = Auth.getCurrentUser();
    }

    $onInit(){

    }

    createVessels(form) {
        if (form.$valid) {
            console.log(this.vessel);
            this.Vessel.save(this.vessel).$promise.then(()=> {
                this.$state.go('vessels');
            });
        }
    }
}

angular.module('jagenApp')
    .controller('vesselCreateController', vesselCreateController);

})();