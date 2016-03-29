'use strict';


(function() {

class vListController {
    //start-non-standard
    vessels = [];
    //end-non-standard

    constructor(Vessel, $state, $location, query) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$location = $location;
        this.query = query;
        this.listVessels();
    }

    listVessels() {
        this.vessels = this.Vessel.query({query: this.query});
    }


    deleteVessel(vessel) {
        vessel.$remove({id: vessel._id});
        this.vessels.splice(this.vessels.indexOf(vessel), 1);
    }
}

angular.module('jagenApp')
    .controller('vListController', vListController);

})();