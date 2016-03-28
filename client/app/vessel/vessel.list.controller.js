'use strict';


(function() {

class vListController {
    //start-non-standard
    vessels = [];
    //end-non-standard

    constructor(Vessel, $state, $location) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$location = $location;
        this.listVessels();
    }

    listVessels() {
        this.vessels = this.Vessel.query();
    }


    deleteVessel(vessel) {
        console.log(vessel);
        vessel.$remove({id: vessel._id});
        this.vessels.splice(this.vessels.indexOf(vessel), 1);
    }
}

angular.module('jagenApp')
    .controller('vListController', vListController);

})();