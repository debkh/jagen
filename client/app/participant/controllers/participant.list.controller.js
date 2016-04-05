'use strict';
(function(){

class participantListController {
    //start-non-standard
    participants = [];
    vessel = {};
    //end-non-standard

    constructor($state, Participant, ModalService, vessel, $mdDialog) {
        this.Participant = Participant;
        this.$state = $state;
        this.ModalService = ModalService;
        this.$mdDialog = $mdDialog;
        this.vessel = vessel;
        this.listParticipant();
    }

    /**
     * Get list participant
     * @return array
     */
    listParticipant() {
        this.Participant.byVessel({id:this.vessel._id}, (response) => {
            this.participants = response;
        });
    }


    /**
     * Add new participant
     *
     * @param vessel_id
     */
    addParticipant(vessel) {
        this.ModalService.show({
            templateUrl: '/app/participant/views/create.html',
            locals: {vessel: vessel},
            controller: 'participantCreateController',
        }).catch(console.log.bind(console));
    };


    /**
     * Edit participant
     *
     * @param participant
     */
    editParticipant(participant) {
        this.ModalService.show({
            templateUrl: '/app/participant/views/edit.html',
            locals: {participant: participant},
            controller: 'participantEditController',
        }).catch(console.log.bind(console));
    }

    /**
     * Delete participant
     *
     * @param participant
     */
    deleteParticipant(participant) {
        participant.$remove({id: participant._id});
        this.participants.splice(this.participants.indexOf(participant), 1);
    }


    /**
     * Cancel dialog window
     */
    cancel() {
        this.$mdDialog.cancel();
    };

}

angular.module('jagenApp')
    .controller('participantListController', participantListController);

})();
