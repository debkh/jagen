'use strict';


(function() {

class vViewController {
    //start-non-standard
    vessel = {};
    //end-non-standard

    constructor(Vessel, $state, $stateParams) {
        this.Vessel = Vessel;
        this.$state = $state;
        console.log($stateParams);
        this.id = $stateParams.id;
        this.getVessel();
    }

    getVessel() {
        this.vessel = this.Vessel.get({id: this.id});
    }

}

angular.module('jagenApp')
    .controller('vViewController', vViewController);

})();