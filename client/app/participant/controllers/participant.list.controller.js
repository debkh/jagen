'use strict';
(function(){

class participantListController {
    //start-non-standard
    participants = [];
    vessel = {};
    //end-non-standard

    constructor($state, Participant, $mdDialog, vessel) {
        this.Participant = Participant;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.vessel = vessel;
        this.listParticipant();
    }

    /**
     * Get list participant
     * @return array
     */
    listParticipant() {
        console.log(this.vessel);

        this.participants = this.Participant.byVessel({id:this.vessel._id}, function(response) {
            console.log(response);
        });
    }


    /**
     * Add new participant
     *
     * @param vessel_id
     */
    addParticipant(vessel) {
        this.$mdDialog.show({
            controller: 'participantCreateController',
            controllerAs: 'pc',
            templateUrl: '/app/participant/views/create.html',
            parent: angular.element(document.body),
            locals: {
                vessel: vessel
            },
            clickOutsideToClose:true,
            fullscreen: true
        });
    };


    /**
     * Edit participant
     *
     * @param participant
     */
    editParticipant(participant) {
        this.$mdDialog.show({
            controller: 'participantEditController',
            controllerAs: 'pc',
            templateUrl: '/app/participant/views/edit.html',
            parent: angular.element(document.body),
            locals: {
                participant: participant
            },
            clickOutsideToClose:true,
            fullscreen: true
        });
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

}

angular.module('jagenApp')
    .controller('participantListController', participantListController);

})();
