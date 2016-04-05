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
    constructor(lodash, $state, $location, $mdDialog, $mdMedia, Vessel, Participant, ModalService) {
        this.lodash = lodash;
        this.Vessel = Vessel;
        this.$state = $state;
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.Participant = Participant;
        this.ModalService = ModalService;
        this.status = '  ';
        this.listVessels();
    }

    /**
     * Get list vessels
     */
    listVessels() {
        this.Vessel.query((response) => {
            this.vessels = response;
        });
    }

    /**
     * Delete vessel
     *
     * @param vessel
     */
    deleteVessel(vessel) {
        let confirm = this.$mdDialog.confirm()
            .title('Вы уверены что хотите удалить это судно?')
            .ok('Да')
            .cancel('Отмена');

        return this.$mdDialog.show(confirm).then(() => {
            vessel.$remove({id: vessel._id});
            this.vessels.splice(this.vessels.indexOf(vessel), 1);
        });
    }

    /**
     * Show participant vessel(crew)
     *
     * @param vessel
     */
    showCrew(vessel) {
        this.ModalService.show({
            templateUrl: '/app/vessel/views/crew.html',
            locals: {vessel: vessel},
            controller: 'participantListController',
        }).catch(console.log.bind(console));
    };


    /**
     * Cancel dialog window
     */
    cancel() {
        this.$mdDialog.cancel();
    };
}

angular.module('jagenApp')
    .controller('vesselListController', vesselListController);

})();