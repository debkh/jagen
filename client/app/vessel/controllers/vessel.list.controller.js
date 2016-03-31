'use strict';


(function() {

class vesselListController {
    //start-non-standard
    vessels = [];
    participants = [];
    //end-non-standard

    /**
     *
     * @param Vessel
     * @param $state
     * @param $location
     * @param $mdDialog
     * @param $mdMedia
     * @param Participant
     */
    constructor($state, $location, $mdDialog, $mdMedia, Vessel, Participant) {
        this.Vessel = Vessel;
        this.$state = $state;
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.Participant = Participant;
        this.status = '  ';
        this.listVessels();
    }

    /**
     * Get list vessels
     */
    listVessels() {
        this.vessels = this.Vessel.query();
    }

    /**
     * Delete vessel
     * @param vessel
     */
    deleteVessel(vessel) {
        vessel.remove({id: vessel._id});
        this.vessels.splice(this.vessels.indexOf(vessel), 1);
    }

    showCrew(vessel) {
        this.$mdDialog.show({
            controller: 'participantListController',
            controllerAs: 'pc',
            templateUrl: '/app/vessel/views/crew.html',
            parent: angular.element(document.body),
            locals: {
                vessel: vessel
            },
            clickOutsideToClose:true,
            fullscreen: true
        })
        .then((answer) => {
            this.status = 'You said the information was "' + answer + '".';
        }, () => {
            this.status = 'You cancelled the dialog.';
        });
    };
}

angular.module('jagenApp')
    .controller('vesselListController', vesselListController);

})();